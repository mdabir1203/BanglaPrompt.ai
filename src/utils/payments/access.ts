import { supabase } from "@/integrations/supabase/client";
import { createScopedLogger } from "@/lib/logger";
import type { SubscriptionAccessCheck, SubscriptionAccessResult, ToolSubscriptionStatus } from "./types";
import { ACTIVE_SUBSCRIPTION_STATUSES } from "./types";

const logger = createScopedLogger("payments-access");

const ACCESS_STATUSES: ToolSubscriptionStatus[] = [
  ...ACTIVE_SUBSCRIPTION_STATUSES,
  "completed",
];

export const getSubscriptionAccess = async (
  params: SubscriptionAccessCheck,
): Promise<SubscriptionAccessResult> => {
  const { data, error } = await supabase
    .from("tool_subscriptions")
    .select("*")
    .eq("tool_id", params.toolId)
    .eq("buyer_id", params.userId)
    .in("status", ACCESS_STATUSES)
    .order("purchased_at", { ascending: false })
    .limit(1);

  if (error) {
    logger.error("Failed to evaluate subscription access", { error, params });
    throw new Error("Unable to verify subscription status. Please try again.");
  }

  const subscription = Array.isArray(data) && data.length > 0 ? data[0] : null;

  if (!subscription) {
    return {
      hasAccess: false,
      activeSubscription: null,
    };
  }

  return {
    hasAccess: true,
    activeSubscription: subscription,
  };
};

export const requireSubscriptionAccess = async (params: SubscriptionAccessCheck) => {
  const result = await getSubscriptionAccess(params);

  if (!result.hasAccess) {
    throw new Error("An active purchase or subscription is required to access this tool.");
  }

  return result.activeSubscription;
};
