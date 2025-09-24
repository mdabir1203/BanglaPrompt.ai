-- Pricing transparency content stored in Supabase for dynamic management
CREATE TABLE public.pricing_audiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  headline_en TEXT NOT NULL,
  headline_bn TEXT NOT NULL,
  toggle_label_en TEXT NOT NULL,
  toggle_label_bn TEXT NOT NULL,
  price_text_en TEXT NOT NULL,
  price_text_bn TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_bn TEXT NOT NULL,
  cta_label_en TEXT NOT NULL,
  cta_label_bn TEXT NOT NULL,
  cta_link TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TRIGGER pricing_audiences_set_updated_at
BEFORE UPDATE ON public.pricing_audiences
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.pricing_audiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pricing audiences readable by everyone"
  ON public.pricing_audiences
  FOR SELECT
  USING (is_active);

CREATE POLICY "Service role manages pricing audiences"
  ON public.pricing_audiences
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE TABLE public.pricing_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audience_id UUID NOT NULL REFERENCES public.pricing_audiences(id) ON DELETE CASCADE,
  feature_en TEXT NOT NULL,
  feature_bn TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_pricing_features_audience_sort
  ON public.pricing_features (audience_id, sort_order);

CREATE TRIGGER pricing_features_set_updated_at
BEFORE UPDATE ON public.pricing_features
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.pricing_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pricing features readable by everyone"
  ON public.pricing_features
  FOR SELECT
  USING (is_active);

CREATE POLICY "Service role manages pricing features"
  ON public.pricing_features
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE TABLE public.pricing_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon_key TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_bn TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TRIGGER pricing_highlights_set_updated_at
BEFORE UPDATE ON public.pricing_highlights
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.pricing_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pricing highlights readable by everyone"
  ON public.pricing_highlights
  FOR SELECT
  USING (is_active);

CREATE POLICY "Service role manages pricing highlights"
  ON public.pricing_highlights
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Seed default content to match the launch experience
WITH creators AS (
  INSERT INTO public.pricing_audiences (
    slug,
    headline_en,
    headline_bn,
    toggle_label_en,
    toggle_label_bn,
    price_text_en,
    price_text_bn,
    description_en,
    description_bn,
    cta_label_en,
    cta_label_bn,
    cta_link,
    sort_order
  )
  VALUES (
    'creators',
    'Creator revenue share',
    'ক্রিয়েটর রেভিনিউ শেয়ার',
    'Creators',
    'ক্রিয়েটরস',
    'Keep up to 80%',
    '৮০% পর্যন্ত আপনার',
    'No listing fees. Automated royalty forecasts. Instant dashboards for payouts across USD, BDT, EUR, SAR.',
    'লিস্টিং ফি নেই। স্বয়ংক্রিয় রয়্যালটি পূর্বাভাস। USD, BDT, EUR, SAR এ তাৎক্ষণিক পেআউট ড্যাশবোর্ড।',
    'Join as creator',
    'ক্রিয়েটর হিসেবে যোগ দিন',
    '/community/submit',
    1
  )
  RETURNING id
), enterprise AS (
  INSERT INTO public.pricing_audiences (
    slug,
    headline_en,
    headline_bn,
    toggle_label_en,
    toggle_label_bn,
    price_text_en,
    price_text_bn,
    description_en,
    description_bn,
    cta_label_en,
    cta_label_bn,
    cta_link,
    sort_order
  )
  VALUES (
    'enterprise',
    'Enterprise localisation suite',
    'এন্টারপ্রাইজ লোকালাইজেশন স্যুইট',
    'Enterprise',
    'এন্টারপ্রাইজ',
    'Custom annual partnership',
    'কাস্টম বার্ষিক পার্টনারশিপ',
    'Dedicated curator pods, compliance vaults, and co-marketing launches across 70+ countries.',
    'ডেডিকেটেড কিউরেটর টিম, কমপ্লায়েন্স ভল্ট ও ৭০+ দেশে কো-মার্কেটিং লঞ্চ।',
    'Book enterprise session',
    'এন্টারপ্রাইজ সেশন বুক করুন',
    '#enterprise',
    2
  )
  RETURNING id
)
INSERT INTO public.pricing_features (audience_id, feature_en, feature_bn, sort_order)
SELECT c.id, f.feature_en, f.feature_bn, f.sort_order
FROM creators c
CROSS JOIN (VALUES
  ('Dynamic pricing guidance', 'ডায়নামিক প্রাইসিং নির্দেশিকা', 1),
  ('72-hour payout commitment', '৭২ ঘণ্টায় পেমেন্ট নিশ্চিত', 2),
  ('Collaboration rooms with legal templates', 'লিগ্যাল টেমপ্লেটসহ সহযোগিতা স্পেস', 3)
) AS f(feature_en, feature_bn, sort_order)
UNION ALL
SELECT e.id, f.feature_en, f.feature_bn, f.sort_order
FROM enterprise e
CROSS JOIN (VALUES
  ('Global prompt orchestration', 'গ্লোবাল প্রম্পট অর্কেস্ট্রেশন', 1),
  ('Governance workshops', 'গভর্নেন্স ওয়ার্কশপ', 2),
  ('Executive analytics briefings', 'এক্সিকিউটিভ অ্যানালিটিক্স ব্রিফিং', 3)
) AS f(feature_en, feature_bn, sort_order);

INSERT INTO public.pricing_highlights (
  icon_key,
  title_en,
  title_bn,
  description_en,
  description_bn,
  sort_order
)
VALUES
  (
    'line-chart',
    'Predictive royalty modeling',
    'প্রেডিক্টিভ রয়্যালটি মডেলিং',
    'See future payout trends before you launch. Toggle between USD, BDT, EUR, and SAR projections in a single pane.',
    'লঞ্চের আগেই পেআউট ট্রেন্ড দেখে নিন। USD, BDT, EUR ও SAR পূর্বাভাস একসাথে পর্যবেক্ষণ করুন।',
    1
  ),
  (
    'shield-check',
    'Fairness charter',
    'ফেয়ারনেস চার্টার',
    'Transparent dispute resolution, co-creation credits, and legal-safe collaboration agreements.',
    'স্বচ্ছ বিরোধ নিষ্পত্তি, কো-ক্রিয়েশন ক্রেডিট এবং আইন-সম্মত সহযোগিতা চুক্তি।',
    2
  );
