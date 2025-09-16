-- Marketplace prompts schema for monetized listings
CREATE TABLE public.marketplace_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  description TEXT,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  currency TEXT NOT NULL DEFAULT 'BDT',
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  author_avatar_url TEXT,
  commission_rate NUMERIC(6,5) NOT NULL DEFAULT 0.20000 CHECK (commission_rate >= 0 AND commission_rate <= 1),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  preview TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_marketplace_prompts_active_price
  ON public.marketplace_prompts (is_active, price_cents DESC);

CREATE INDEX idx_marketplace_prompts_tags
  ON public.marketplace_prompts USING GIN (tags);

CREATE TRIGGER marketplace_prompts_set_updated_at
BEFORE UPDATE ON public.marketplace_prompts
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.marketplace_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Marketplace prompts visible to everyone"
  ON public.marketplace_prompts
  FOR SELECT
  USING (is_active);

CREATE POLICY "Sellers manage their marketplace prompts"
  ON public.marketplace_prompts
  FOR ALL
  TO authenticated
  USING (auth.uid() = author_id OR auth.role() = 'service_role')
  WITH CHECK (auth.uid() = author_id OR auth.role() = 'service_role');

CREATE POLICY "Service role manages marketplace prompts"
  ON public.marketplace_prompts
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Track purchases and platform commissions
CREATE TABLE public.marketplace_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES public.marketplace_prompts(id) ON DELETE CASCADE,
  buyer_email TEXT,
  sale_amount_cents INTEGER NOT NULL CHECK (sale_amount_cents >= 0),
  commission_cents INTEGER NOT NULL CHECK (commission_cents >= 0),
  seller_earnings_cents INTEGER NOT NULL CHECK (seller_earnings_cents >= 0),
  payment_reference TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_marketplace_sales_prompt_id_created_at
  ON public.marketplace_sales (prompt_id, created_at DESC);

ALTER TABLE public.marketplace_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Marketplace sales visible to sellers"
  ON public.marketplace_sales
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.marketplace_prompts mp
      WHERE mp.id = prompt_id
        AND mp.author_id = auth.uid()
    )
  );

CREATE POLICY "Service role manages marketplace sales"
  ON public.marketplace_sales
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Function to record sales and commissions centrally
CREATE OR REPLACE FUNCTION public.record_marketplace_sale(
  p_prompt_id UUID,
  p_buyer_email TEXT DEFAULT NULL,
  p_payment_reference TEXT DEFAULT NULL,
  p_sale_amount_cents INTEGER DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS TABLE (
  sale_id UUID,
  prompt_id UUID,
  sale_amount_cents INTEGER,
  commission_cents INTEGER,
  seller_earnings_cents INTEGER,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  prompt_record public.marketplace_prompts;
  sale_amount INTEGER;
  commission INTEGER;
  seller_earnings INTEGER;
  computed_metadata JSONB;
BEGIN
  SELECT *
    INTO prompt_record
  FROM public.marketplace_prompts
  WHERE id = p_prompt_id
    AND is_active
  FOR UPDATE;

  IF prompt_record.id IS NULL THEN
    RAISE EXCEPTION 'Prompt not available for sale';
  END IF;

  sale_amount := COALESCE(p_sale_amount_cents, prompt_record.price_cents);

  IF sale_amount < 0 THEN
    RAISE EXCEPTION 'Sale amount must be positive';
  END IF;

  commission := floor(sale_amount * COALESCE(prompt_record.commission_rate, 0))::INTEGER;
  IF commission < 0 THEN
    commission := 0;
  END IF;

  seller_earnings := sale_amount - commission;
  IF seller_earnings < 0 THEN
    seller_earnings := 0;
  END IF;

  computed_metadata := COALESCE(p_metadata, '{}'::jsonb) || jsonb_build_object(
    'currency', prompt_record.currency,
    'commission_rate', prompt_record.commission_rate
  );

  RETURN QUERY
  INSERT INTO public.marketplace_sales (
    prompt_id,
    buyer_email,
    sale_amount_cents,
    commission_cents,
    seller_earnings_cents,
    payment_reference,
    metadata
  )
  VALUES (
    prompt_record.id,
    NULLIF(TRIM(p_buyer_email), ''),
    sale_amount,
    commission,
    seller_earnings,
    NULLIF(TRIM(p_payment_reference), ''),
    computed_metadata
  )
  RETURNING id, prompt_id, sale_amount_cents, commission_cents, seller_earnings_cents, created_at;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

COMMENT ON FUNCTION public.record_marketplace_sale IS 'Records a prompt sale and calculates platform commission / seller earnings.';

-- Aggregated commission stats per seller
CREATE OR REPLACE FUNCTION public.get_seller_commission_summary(p_author_id UUID)
RETURNS TABLE (
  prompt_id UUID,
  prompt_title TEXT,
  total_sales BIGINT,
  total_revenue_cents BIGINT,
  total_commission_cents BIGINT,
  total_payout_cents BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    mp.id,
    mp.title,
    COUNT(ms.id) AS total_sales,
    COALESCE(SUM(ms.sale_amount_cents), 0)::BIGINT AS total_revenue_cents,
    COALESCE(SUM(ms.commission_cents), 0)::BIGINT AS total_commission_cents,
    COALESCE(SUM(ms.seller_earnings_cents), 0)::BIGINT AS total_payout_cents
  FROM public.marketplace_prompts mp
  LEFT JOIN public.marketplace_sales ms ON ms.prompt_id = mp.id
  WHERE mp.author_id = p_author_id
  GROUP BY mp.id, mp.title
  ORDER BY mp.title;
END;
$$ LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public;

COMMENT ON FUNCTION public.get_seller_commission_summary IS 'Provides aggregate commission and payout metrics for a seller.''s marketplace prompts.';
GRANT EXECUTE ON FUNCTION public.record_marketplace_sale(UUID, TEXT, TEXT, INTEGER, JSONB) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_seller_commission_summary(UUID) TO authenticated;
