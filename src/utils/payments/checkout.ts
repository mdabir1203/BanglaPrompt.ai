import { supabase } from "@/integrations/supabase/client";
import { createScopedLogger } from "@/lib/logger";
import type {
  CheckoutInput,
  CheckoutResponse,
  OneTimeCheckoutInput,
  SubscriptionCheckoutInput,
  ToolSubscriptionStatus,
} from "./types";
import { ACTIVE_SUBSCRIPTION_STATUSES } from "./types";

type ToolSubscriptionRow = CheckoutResponse["subscription"];

type JsonRecord = Record<string, unknown>;

const logger = createScopedLogger("payments-checkout");

const generateReference = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `ref_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const deriveInitialStatus = (
  input: CheckoutInput,
): ToolSubscriptionStatus => {
  if (input.pricingType === "subscription") {
    return input.trialEndsAt ? "trialing" : "active";
  }

  return "pending";
};

const extractMetadataArtifacts = (
  metadata: unknown,
): Pick<CheckoutResponse, "checkoutUrl" | "clientSecret"> => {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    const typed = metadata as JsonRecord;
    return {
      checkoutUrl: typeof typed.checkoutUrl === "string" ? typed.checkoutUrl : undefined,
      clientSecret: typeof typed.clientSecret === "string" ? typed.clientSecret : undefined,
    };
  }

  return {};
};

const normalizeCurrency = (currency?: string) =>
  (currency ?? "usd").toLowerCase();

const mapInsertError = (error: unknown): Error => {
  if (typeof error === "object" && error && "code" in error) {
    const pgError = error as { code?: string; message?: string };
    if (pgError.code === "23505") {
      return new Error(
        "An active subscription already exists for this tool. Please cancel the current subscription before starting a new one.",
      );
    }
  }

  return error instanceof Error
    ? error
    : new Error("Unable to start checkout session. Please try again.");
};

const createCheckoutRecord = async (input: CheckoutInput): Promise<CheckoutResponse> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    logger.error("Failed to load authenticated user", { error: userError });
    throw new Error("Authentication failed. Please sign in to continue.");
  }

  const userId = userData.user?.id;

  if (!userId) {
    throw new Error("You must be signed in to start a checkout session.");
  }

  const reference = input.paymentReference ?? generateReference();
  const initialStatus = deriveInitialStatus(input);

  const { data, error } = await supabase
    .from("tool_subscriptions")
    .insert({
      tool_id: input.toolId,
      buyer_id: userId,
      price_cents: input.priceCents,
      currency: normalizeCurrency(input.currency),
      purchase_type: input.pricingType,
      status: initialStatus,
      payment_reference: reference,
      current_period_end:
        input.pricingType === "subscription" ? input.currentPeriodEnd ?? null : null,
      metadata: {
        ...(input.metadata ?? {}),
        intent: input.pricingType,
        trialEndsAt: input.pricingType === "subscription" ? input.trialEndsAt ?? null : null,
      },
    })
    .select()
    .single();

  if (error) {
    logger.error("Failed to insert checkout record", { error, input });
    throw mapInsertError(error);
  }

  const artifacts = extractMetadataArtifacts(data?.metadata ?? null);

  return {
    subscription: data as ToolSubscriptionRow,
    ...artifacts,
  };
};

export const initiateOneOffPurchase = async (
  input: Omit<OneTimeCheckoutInput, "pricingType">,
): Promise<CheckoutResponse> => {
  return createCheckoutRecord({
    ...input,
    pricingType: "one_time",
  });
};

export const initiateSubscriptionPurchase = async (
  input: Omit<SubscriptionCheckoutInput, "pricingType">,
): Promise<CheckoutResponse> => {
  return createCheckoutRecord({
    ...input,
    pricingType: "subscription",
  });
};

export const isActiveSubscription = (subscription: ToolSubscriptionRow | null | undefined) => {
  if (!subscription) {
    return false;
  }

  return ACTIVE_SUBSCRIPTION_STATUSES.includes(
    subscription.status as ToolSubscriptionStatus,
  );
};
