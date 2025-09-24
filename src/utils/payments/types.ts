import type { Tables } from "@/integrations/supabase/types";

export type PricingType = "one_time" | "subscription";

export type ToolSubscriptionStatus =
  | "pending"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "completed";

export interface BaseCheckoutInput {
  toolId: string;
  priceCents: number;
  currency?: string;
  paymentReference?: string;
  metadata?: Record<string, unknown>;
}

export interface OneTimeCheckoutInput extends BaseCheckoutInput {
  pricingType: "one_time";
}

export interface SubscriptionCheckoutInput extends BaseCheckoutInput {
  pricingType: "subscription";
  currentPeriodEnd?: string;
  trialEndsAt?: string;
  billingInterval?: "day" | "week" | "month" | "year";
  trialPeriodDays?: number | null;
}

export type CheckoutInput = OneTimeCheckoutInput | SubscriptionCheckoutInput;

export interface CheckoutResponse {
  subscription: Tables<"tool_subscriptions">;
  checkoutUrl?: string;
  clientSecret?: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string | null;
  stripeSubscriptionId?: string | null;
}

export interface SubscriptionAccessCheck {
  toolId: string;
  userId: string;
}

export interface SubscriptionAccessResult {
  hasAccess: boolean;
  activeSubscription?: Tables<"tool_subscriptions"> | null;
}

export const ACTIVE_SUBSCRIPTION_STATUSES: ToolSubscriptionStatus[] = [
  "trialing",
  "active",
];
