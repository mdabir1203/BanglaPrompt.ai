-- Marketplace infrastructure for creator tools and subscriptions
CREATE TABLE public.creator_tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  thumbnail_url TEXT,
  pricing_type TEXT NOT NULL CHECK (pricing_type IN ('one_time', 'subscription')),
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  currency TEXT NOT NULL DEFAULT 'usd',
  subscription_interval TEXT,
  trial_period_days INTEGER,
  metadata JSONB,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.creator_tools IS 'Catalog of tools submitted by creators for marketplace discovery.';
COMMENT ON COLUMN public.creator_tools.pricing_type IS 'Either one_time or subscription.';
COMMENT ON COLUMN public.creator_tools.subscription_interval IS 'Billing cadence (e.g. month, year) when pricing_type = subscription.';

ALTER TABLE public.creator_tools
  ADD CONSTRAINT creator_tools_subscription_interval_check
  CHECK (
    pricing_type = 'subscription' OR subscription_interval IS NULL
  );

ALTER TABLE public.creator_tools
  ADD CONSTRAINT creator_tools_trial_period_check
  CHECK (
    pricing_type = 'subscription' OR trial_period_days IS NULL
  );

CREATE INDEX idx_creator_tools_creator
  ON public.creator_tools(creator_id);

CREATE INDEX idx_creator_tools_category
  ON public.creator_tools(category);

CREATE INDEX idx_creator_tools_active
  ON public.creator_tools(is_active)
  WHERE is_active = true;

CREATE INDEX idx_creator_tools_pricing_type
  ON public.creator_tools(pricing_type);

CREATE TRIGGER creator_tools_set_updated_at
BEFORE UPDATE ON public.creator_tools
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.creator_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published tools are visible to everyone"
  ON public.creator_tools
  FOR SELECT
  USING (
    is_active = true
    OR auth.uid() = creator_id
    OR auth.role() = 'service_role'
  );

CREATE POLICY "Creators manage their own tools"
  ON public.creator_tools
  FOR ALL
  TO authenticated
  USING (auth.uid() = creator_id)
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Service role manages all tools"
  ON public.creator_tools
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');


CREATE TABLE public.tool_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID NOT NULL REFERENCES public.creator_tools(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES auth.users(id),
  purchase_type TEXT NOT NULL CHECK (purchase_type IN ('one_time', 'subscription')),
  status TEXT NOT NULL DEFAULT 'pending',
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  currency TEXT NOT NULL DEFAULT 'usd',
  payment_reference TEXT,
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tool_subscriptions IS 'Records for both one-off purchases and recurring subscriptions to tools.';
COMMENT ON COLUMN public.tool_subscriptions.purchase_type IS 'Indicates whether the record is a one_time purchase or subscription.';

CREATE INDEX idx_tool_subscriptions_tool
  ON public.tool_subscriptions(tool_id);

CREATE INDEX idx_tool_subscriptions_buyer
  ON public.tool_subscriptions(buyer_id);

CREATE INDEX idx_tool_subscriptions_status
  ON public.tool_subscriptions(status);

CREATE UNIQUE INDEX uniq_tool_subscriptions_active
  ON public.tool_subscriptions(tool_id, buyer_id)
  WHERE purchase_type = 'subscription' AND status IN ('active', 'trialing');

CREATE TRIGGER tool_subscriptions_set_updated_at
BEFORE UPDATE ON public.tool_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.tool_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Buyers can view their subscriptions"
  ON public.tool_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id);

CREATE POLICY "Creators can view tool sales"
  ON public.tool_subscriptions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.creator_tools ct
      WHERE ct.id = tool_id AND ct.creator_id = auth.uid()
    )
  );

CREATE POLICY "Buyers can create subscription records"
  ON public.tool_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Buyers manage their subscription status"
  ON public.tool_subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = buyer_id)
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Service role manages all subscription records"
  ON public.tool_subscriptions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Creators can update subscriber status"
  ON public.tool_subscriptions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.creator_tools ct
      WHERE ct.id = tool_id AND ct.creator_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.creator_tools ct
      WHERE ct.id = tool_id AND ct.creator_id = auth.uid()
    )
  );

CREATE POLICY "Creators can cancel subscriptions"
  ON public.tool_subscriptions
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.creator_tools ct
      WHERE ct.id = tool_id AND ct.creator_id = auth.uid()
    )
  );
