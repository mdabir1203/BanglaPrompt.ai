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

const DEFAULT_CHECKOUT_NAME = "PromptBazar Tool Access";

const isJsonRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toJsonRecord = (value: unknown): JsonRecord =>
  isJsonRecord(value) ? (value as JsonRecord) : {};

const deriveToolName = (metadata: JsonRecord | null | undefined) => {
  if (!metadata) {
    return DEFAULT_CHECKOUT_NAME;
  }

  const candidates = [metadata.toolName, metadata.name, metadata.title];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim().length > 0) {
      return candidate.trim();
    }
  }

  return DEFAULT_CHECKOUT_NAME;
};

const getSiteOrigin = (): string => {
  if (typeof window !== "undefined" && typeof window.location?.origin === "string") {
    return window.location.origin;
  }

  try {
    const env = (import.meta as ImportMeta).env as Record<string, string | undefined>;
    const candidates = [
      env?.VITE_SITE_URL,
      env?.VITE_PUBLIC_SITE_URL,
      env?.VITE_APP_URL,
      env?.PUBLIC_SITE_URL,
    ];

    for (const value of candidates) {
      if (typeof value === "string" && value.length > 0) {
        return value;
      }
    }
  } catch (error) {
    logger.debug("Site origin resolution failed", { error });
  }

  return "https://promptbazaar.ai";
};

interface StripeCheckoutSessionResult {
  checkoutUrl?: string;
  sessionId?: string;
  paymentIntentId?: string | null;
  stripeSubscriptionId?: string | null;
  clientSecret?: string | null;
}

const parseStripeJson = async (response: Response) => {
  try {
    const data = await response.json();
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return data as Record<string, unknown>;
    }
  } catch (error) {
    logger.warn("Failed to parse Stripe response body", { error });
  }

  return {} as Record<string, unknown>;
};

const requestStripeCheckoutSession = async (
  subscription: ToolSubscriptionRow,
  input: CheckoutInput,
  userEmail: string | null | undefined,
): Promise<StripeCheckoutSessionResult> => {
  const baseMetadata = toJsonRecord(subscription.metadata);
  const siteOrigin = getSiteOrigin();

  const payload = {
    subscriptionId: subscription.id,
    toolId: subscription.tool_id,
    toolName: deriveToolName(baseMetadata),
    priceCents: subscription.price_cents,
    currency: subscription.currency,
    pricingType: input.pricingType,
    paymentReference: subscription.payment_reference ?? undefined,
    metadata: {
      ...baseMetadata,
      paymentProcessor: "stripe",
      checkoutOrigin: siteOrigin,
    },
    buyerEmail: userEmail ?? undefined,
    billingInterval: input.pricingType === "subscription" ? input.billingInterval : undefined,
    successUrl: `${siteOrigin}/tools?checkout=success`,
    cancelUrl: `${siteOrigin}/tools?checkout=cancelled`,
    trialPeriodDays:
      input.pricingType === "subscription" && typeof input.trialPeriodDays === "number"
        ? input.trialPeriodDays
        : undefined,
    clientReferenceId: subscription.id,
  } satisfies Record<string, unknown>;

  try {
    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await parseStripeJson(response);

    if (!response.ok) {
      const message =
        typeof json.error === "string"
          ? json.error
          : typeof json.error === "object" && json.error && "message" in json.error
            ? String((json.error as { message?: unknown }).message ?? "Unable to create checkout session")
            : "Unable to create checkout session. Please try again.";

      throw new Error(message);
    }

    return {
      checkoutUrl: typeof json.checkoutUrl === "string" ? json.checkoutUrl : undefined,
      sessionId: typeof json.sessionId === "string" ? json.sessionId : undefined,
      paymentIntentId:
        typeof json.paymentIntentId === "string"
          ? json.paymentIntentId
          : json.paymentIntentId === null
            ? null
            : undefined,
      stripeSubscriptionId:
        typeof json.stripeSubscriptionId === "string"
          ? json.stripeSubscriptionId
          : json.stripeSubscriptionId === null
            ? null
            : undefined,
      clientSecret: typeof json.clientSecret === "string" ? json.clientSecret : undefined,
    } satisfies StripeCheckoutSessionResult;
  } catch (error) {
    logger.error("Failed to create Stripe checkout session", {
      error,
      subscriptionId: subscription.id,
      toolId: subscription.tool_id,
    });

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Unable to start checkout session. Please try again.");
  }
};

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
): Pick<
  CheckoutResponse,
  "checkoutUrl" | "clientSecret" | "stripeSessionId" | "stripePaymentIntentId" | "stripeSubscriptionId"
> => {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    const typed = metadata as JsonRecord;

    const stripePaymentIntentId = typed.stripePaymentIntentId;
    const stripeSubscriptionId = typed.stripeSubscriptionId;

    return {
      checkoutUrl: typeof typed.checkoutUrl === "string" ? typed.checkoutUrl : undefined,
      clientSecret: typeof typed.clientSecret === "string" ? typed.clientSecret : undefined,
      stripeSessionId: typeof typed.stripeSessionId === "string" ? typed.stripeSessionId : undefined,
      stripePaymentIntentId:
        typeof stripePaymentIntentId === "string" || stripePaymentIntentId === null
          ? (stripePaymentIntentId as string | null)
          : undefined,
      stripeSubscriptionId:
        typeof stripeSubscriptionId === "string" || stripeSubscriptionId === null
          ? (stripeSubscriptionId as string | null)
          : undefined,
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

  const user = userData.user;
  const userId = user?.id;

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

  let subscription = data as ToolSubscriptionRow;

  let stripeSession: StripeCheckoutSessionResult;
  try {
    stripeSession = await requestStripeCheckoutSession(
      subscription,
      input,
      user?.email ?? null,
    );
  } catch (stripeError) {
    const failureMetadata = {
      ...toJsonRecord(subscription.metadata),
      paymentProcessor: "stripe",
      checkoutError:
        stripeError instanceof Error ? stripeError.message : "stripe_session_failed",
    } satisfies JsonRecord;

    const sanitizedFailureMetadata = Object.fromEntries(
      Object.entries(failureMetadata).filter(([, value]) => value !== undefined),
    ) as JsonRecord;

    await supabase
      .from("tool_subscriptions")
      .update({
        status: "pending",
        metadata: sanitizedFailureMetadata,
      })
      .eq("id", subscription.id);

    throw stripeError;
  }

  const existingMetadata = toJsonRecord(subscription.metadata);
  const enhancedMetadata: JsonRecord = {
    ...existingMetadata,
    paymentProcessor: "stripe",
  };

  if (stripeSession.checkoutUrl) {
    enhancedMetadata.checkoutUrl = stripeSession.checkoutUrl;
  }

  if (stripeSession.clientSecret) {
    enhancedMetadata.clientSecret = stripeSession.clientSecret;
  }

  if (stripeSession.sessionId) {
    enhancedMetadata.stripeSessionId = stripeSession.sessionId;
  }

  if (stripeSession.paymentIntentId !== undefined) {
    enhancedMetadata.stripePaymentIntentId = stripeSession.paymentIntentId;
  }

  if (stripeSession.stripeSubscriptionId !== undefined) {
    enhancedMetadata.stripeSubscriptionId = stripeSession.stripeSubscriptionId;
  }

  const sanitizedMetadata = Object.fromEntries(
    Object.entries(enhancedMetadata).filter(([, value]) => value !== undefined),
  ) as JsonRecord;

  const { data: updated, error: updateError } = await supabase
    .from("tool_subscriptions")
    .update({ metadata: sanitizedMetadata })
    .eq("id", subscription.id)
    .select()
    .single();

  if (updateError) {
    logger.warn("Failed to persist Stripe checkout metadata", {
      error: updateError,
      subscriptionId: subscription.id,
    });
    subscription = {
      ...subscription,
      metadata: sanitizedMetadata,
    };
  } else if (updated) {
    subscription = updated as ToolSubscriptionRow;
  }

  const artifacts = extractMetadataArtifacts(subscription.metadata ?? sanitizedMetadata);

  return {
    subscription,
    checkoutUrl: stripeSession.checkoutUrl ?? artifacts.checkoutUrl,
    clientSecret: stripeSession.clientSecret ?? artifacts.clientSecret,
    stripeSessionId: stripeSession.sessionId ?? artifacts.stripeSessionId,
    stripePaymentIntentId:
      stripeSession.paymentIntentId !== undefined
        ? stripeSession.paymentIntentId
        : artifacts.stripePaymentIntentId,
    stripeSubscriptionId:
      stripeSession.stripeSubscriptionId !== undefined
        ? stripeSession.stripeSubscriptionId
        : artifacts.stripeSubscriptionId,
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
