const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
} as const;

interface StripeCheckoutRequest {
  subscriptionId?: string;
  toolId?: string;
  toolName?: string;
  priceCents?: number;
  currency?: string;
  pricingType?: "one_time" | "subscription";
  paymentReference?: string;
  metadata?: Record<string, unknown>;
  buyerEmail?: string;
  billingInterval?: "day" | "week" | "month" | "year";
  successUrl?: string;
  cancelUrl?: string;
  trialPeriodDays?: number;
  clientReferenceId?: string;
}

interface StripeCheckoutResponseBody {
  checkoutUrl?: string;
  sessionId?: string;
  paymentIntentId?: string | null;
  stripeSubscriptionId?: string | null;
  clientSecret?: string | null;
}

interface ErrorBody {
  error: string;
  details?: unknown;
}

const createErrorResponse = (status: number, body: ErrorBody) =>
  new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS,
  });

const parseRequest = async (request: Request): Promise<StripeCheckoutRequest> => {
  try {
    return (await request.json()) as StripeCheckoutRequest;
  } catch (error) {
    throw createErrorResponse(400, {
      error: "Invalid JSON body",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

const serializeMetadata = (metadata: Record<string, unknown> | undefined) => {
  const params = new URLSearchParams();

  if (!metadata) {
    return params;
  }

  Object.entries(metadata).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    const normalizedKey = key.replace(/[^a-zA-Z0-9_]/g, "_");
    params.set(`metadata[${normalizedKey}]`, String(value));
  });

  return params;
};

const withBaseMetadata = (input: StripeCheckoutRequest) => {
  const params = new URLSearchParams();

  if (input.subscriptionId) {
    params.set("metadata[subscription_id]", input.subscriptionId);
  }

  if (input.toolId) {
    params.set("metadata[tool_id]", input.toolId);
  }

  if (input.paymentReference) {
    params.set("metadata[payment_reference]", input.paymentReference);
  }

  return params;
};

const appendParams = (target: URLSearchParams, source: URLSearchParams) => {
  for (const [key, value] of source.entries()) {
    target.set(key, value);
  }
};

const normalizeCurrency = (currency?: string) => currency?.toLowerCase() ?? "usd";

const sanitizeInterval = (
  interval?: string,
): "day" | "week" | "month" | "year" => {
  switch ((interval ?? "month").toLowerCase()) {
    case "day":
    case "week":
    case "year":
      return interval.toLowerCase() as "day" | "week" | "year";
    default:
      return "month";
  }
};

const sanitizeTrialPeriod = (trialPeriodDays?: number) => {
  if (typeof trialPeriodDays !== "number" || Number.isNaN(trialPeriodDays)) {
    return undefined;
  }

  if (trialPeriodDays <= 0) {
    return undefined;
  }

  return Math.floor(trialPeriodDays);
};

const buildCheckoutPayload = (input: Required<
  Pick<StripeCheckoutRequest, "priceCents" | "currency" | "pricingType" | "toolName">
> &
  StripeCheckoutRequest) => {
  const params = new URLSearchParams();

  params.set("success_url", input.successUrl ?? "https://promptbazaar.ai/tools?checkout=success");
  params.set("cancel_url", input.cancelUrl ?? "https://promptbazaar.ai/tools?checkout=cancelled");
  params.set("mode", input.pricingType === "subscription" ? "subscription" : "payment");
  params.set("line_items[0][quantity]", "1");
  params.set("line_items[0][price_data][currency]", normalizeCurrency(input.currency));
  params.set("line_items[0][price_data][product_data][name]", input.toolName);
  params.set("line_items[0][price_data][unit_amount]", String(input.priceCents));

  if (input.pricingType === "subscription") {
    const interval = sanitizeInterval(input.billingInterval);
    params.set("line_items[0][price_data][recurring][interval]", interval);

    const normalizedTrial = sanitizeTrialPeriod(input.trialPeriodDays);
    if (typeof normalizedTrial === "number") {
      params.set("subscription_data[trial_period_days]", String(normalizedTrial));
    }
  }

  if (input.buyerEmail) {
    params.set("customer_email", input.buyerEmail);
  }

  if (input.clientReferenceId) {
    params.set("client_reference_id", input.clientReferenceId);
  }

  appendParams(params, withBaseMetadata(input));
  appendParams(params, serializeMetadata(input.metadata));

  return params;
};

const createStripeCheckoutSession = async (
  secretKey: string,
  payload: StripeCheckoutRequest,
): Promise<StripeCheckoutResponseBody> => {
  const priceCents = payload.priceCents;
  const currency = payload.currency;
  const pricingType = payload.pricingType;
  const toolName = payload.toolName;

  if (
    typeof priceCents !== "number" ||
    Number.isNaN(priceCents) ||
    priceCents <= 0 ||
    typeof currency !== "string" ||
    typeof pricingType !== "string" ||
    typeof toolName !== "string" ||
    toolName.length === 0
  ) {
    throw createErrorResponse(400, {
      error: "Missing or invalid payment fields",
    });
  }

  const body = buildCheckoutPayload({
    ...payload,
    priceCents,
    currency,
    pricingType,
    toolName,
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
  });

  const json = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    throw createErrorResponse(response.status, {
      error:
        typeof json?.error === "object" && json.error && "message" in json.error
          ? String((json.error as { message?: unknown }).message ?? "Stripe error")
          : "Failed to create Stripe checkout session",
      details: json,
    });
  }

  return {
    checkoutUrl: typeof json.url === "string" ? json.url : undefined,
    sessionId: typeof json.id === "string" ? json.id : undefined,
    paymentIntentId:
      typeof json.payment_intent === "string" ? json.payment_intent : null,
    stripeSubscriptionId:
      typeof json.subscription === "string" ? json.subscription : null,
    clientSecret: typeof json.client_secret === "string" ? json.client_secret : null,
  };
};

export const onRequestPost = async ({ request, env }: { request: Request; env: Record<string, string | undefined> }) => {
  if (request.method !== "POST") {
    return createErrorResponse(405, { error: "Method not allowed" });
  }

  const secretKey = env?.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return createErrorResponse(500, { error: "Stripe secret key is not configured" });
  }

  try {
    const payload = await parseRequest(request);
    const result = await createStripeCheckoutSession(secretKey, payload);

    return new Response(JSON.stringify(result satisfies StripeCheckoutResponseBody), {
      status: 200,
      headers: JSON_HEADERS,
    });
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }

    return createErrorResponse(500, {
      error: "Unexpected error while creating checkout session",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};
