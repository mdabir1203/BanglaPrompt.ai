import { useEffect, useMemo, useState } from "react";
import { Coins, LineChart, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchPricingContent, type PricingContent } from "@/utils/pricing/api";

const FALLBACK_TIMESTAMP = "1970-01-01T00:00:00Z";

const fallbackContent: PricingContent = {
  audiences: [
    {
      id: "fallback-creators",
      slug: "creators",
      headline_en: "Creator revenue share",
      headline_bn: "ক্রিয়েটর রেভিনিউ শেয়ার",
      toggle_label_en: "Creators",
      toggle_label_bn: "ক্রিয়েটরস",
      price_text_en: "Keep up to 80%",
      price_text_bn: "৮০% পর্যন্ত আপনার",
      description_en:
        "No listing fees. Automated royalty forecasts. Instant dashboards for payouts across USD, BDT, EUR, SAR.",
      description_bn:
        "লিস্টিং ফি নেই। স্বয়ংক্রিয় রয়্যালটি পূর্বাভাস। USD, BDT, EUR, SAR এ তাৎক্ষণিক পেআউট ড্যাশবোর্ড।",
      cta_label_en: "Join as creator",
      cta_label_bn: "ক্রিয়েটর হিসেবে যোগ দিন",
      cta_link: "/community/submit",
      sort_order: 1,
      is_active: true,
      created_at: FALLBACK_TIMESTAMP,
      updated_at: FALLBACK_TIMESTAMP,
      features: [
        {
          id: "fallback-creators-feature-1",
          audience_id: "fallback-creators",
          feature_en: "Dynamic pricing guidance",
          feature_bn: "ডায়নামিক প্রাইসিং নির্দেশিকা",
          sort_order: 1,
          is_active: true,
          created_at: FALLBACK_TIMESTAMP,
          updated_at: FALLBACK_TIMESTAMP,
        },
        {
          id: "fallback-creators-feature-2",
          audience_id: "fallback-creators",
          feature_en: "72-hour payout commitment",
          feature_bn: "৭২ ঘণ্টায় পেমেন্ট নিশ্চিত",
          sort_order: 2,
          is_active: true,
          created_at: FALLBACK_TIMESTAMP,
          updated_at: FALLBACK_TIMESTAMP,
        },
        {
          id: "fallback-creators-feature-3",
          audience_id: "fallback-creators",
          feature_en: "Collaboration rooms with legal templates",
          feature_bn: "লিগ্যাল টেমপ্লেটসহ সহযোগিতা স্পেস",
          sort_order: 3,
          is_active: true,
          created_at: FALLBACK_TIMESTAMP,
          updated_at: FALLBACK_TIMESTAMP,
        },
      ],
    },
    {
      id: "fallback-enterprise",
      slug: "enterprise",
      headline_en: "Enterprise localisation suite",
      headline_bn: "এন্টারপ্রাইজ লোকালাইজেশন স্যুইট",
      toggle_label_en: "Enterprise",
      toggle_label_bn: "এন্টারপ্রাইজ",
      price_text_en: "Custom annual partnership",
      price_text_bn: "কাস্টম বার্ষিক পার্টনারশিপ",
      description_en:
        "Dedicated curator pods, compliance vaults, and co-marketing launches across 70+ countries.",
      description_bn: "ডেডিকেটেড কিউরেটর টিম, কমপ্লায়েন্স ভল্ট ও ৭০+ দেশে কো-মার্কেটিং লঞ্চ।",
      cta_label_en: "Book enterprise session",
      cta_label_bn: "এন্টারপ্রাইজ সেশন বুক করুন",
      cta_link: "#enterprise",
      sort_order: 2,
      is_active: true,
      created_at: FALLBACK_TIMESTAMP,
      updated_at: FALLBACK_TIMESTAMP,
      features: [
        {
          id: "fallback-enterprise-feature-1",
          audience_id: "fallback-enterprise",
          feature_en: "Global prompt orchestration",
          feature_bn: "গ্লোবাল প্রম্পট অর্কেস্ট্রেশন",
          sort_order: 1,
          is_active: true,
          created_at: FALLBACK_TIMESTAMP,
          updated_at: FALLBACK_TIMESTAMP,
        },
        {
          id: "fallback-enterprise-feature-2",
          audience_id: "fallback-enterprise",
          feature_en: "Governance workshops",
          feature_bn: "গভর্নেন্স ওয়ার্কশপ",
          sort_order: 2,
          is_active: true,
          created_at: FALLBACK_TIMESTAMP,
          updated_at: FALLBACK_TIMESTAMP,
        },
        {
          id: "fallback-enterprise-feature-3",
          audience_id: "fallback-enterprise",
          feature_en: "Executive analytics briefings",
          feature_bn: "এক্সিকিউটিভ অ্যানালিটিক্স ব্রিফিং",
          sort_order: 3,
          is_active: true,
          created_at: FALLBACK_TIMESTAMP,
          updated_at: FALLBACK_TIMESTAMP,
        },
      ],
    },
  ],
  highlights: [
    {
      id: "fallback-highlight-1",
      icon_key: "line-chart",
      title_en: "Predictive royalty modeling",
      title_bn: "প্রেডিক্টিভ রয়্যালটি মডেলিং",
      description_en:
        "See future payout trends before you launch. Toggle between USD, BDT, EUR, and SAR projections in a single pane.",
      description_bn:
        "লঞ্চের আগেই পেআউট ট্রেন্ড দেখে নিন। USD, BDT, EUR ও SAR পূর্বাভাস একসাথে পর্যবেক্ষণ করুন।",
      sort_order: 1,
      is_active: true,
      created_at: FALLBACK_TIMESTAMP,
      updated_at: FALLBACK_TIMESTAMP,
    },
    {
      id: "fallback-highlight-2",
      icon_key: "shield-check",
      title_en: "Fairness charter",
      title_bn: "ফেয়ারনেস চার্টার",
      description_en:
        "Transparent dispute resolution, co-creation credits, and legal-safe collaboration agreements.",
      description_bn: "স্বচ্ছ বিরোধ নিষ্পত্তি, কো-ক্রিয়েশন ক্রেডিট এবং আইন-সম্মত সহযোগিতা চুক্তি।",
      sort_order: 2,
      is_active: true,
      created_at: FALLBACK_TIMESTAMP,
      updated_at: FALLBACK_TIMESTAMP,
    },
  ],
};

const highlightIcons = {
  "line-chart": LineChart,
  "shield-check": ShieldCheck,
  coins: Coins,
};

const PricingTransparency = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [selectedAudienceSlug, setSelectedAudienceSlug] = useState<string>(fallbackContent.audiences[0].slug);

  const { data: pricingContent, isError } = useQuery({
    queryKey: ["pricing-transparency"],
    queryFn: fetchPricingContent,
  });

  useEffect(() => {
    if (isError) {
      console.error("Failed to load pricing transparency content from Supabase");
    }
  }, [isError]);

  const audiences = useMemo(
    () => (pricingContent?.audiences?.length ? pricingContent.audiences : fallbackContent.audiences),
    [pricingContent?.audiences],
  );

  const highlights = useMemo(
    () => (pricingContent?.highlights?.length ? pricingContent.highlights : fallbackContent.highlights),
    [pricingContent?.highlights],
  );

  useEffect(() => {
    if (audiences.length > 0 && !audiences.some(audience => audience.slug === selectedAudienceSlug)) {
      setSelectedAudienceSlug(audiences[0].slug);
    }
  }, [audiences, selectedAudienceSlug]);

  const activeAudience = audiences.find(audience => audience.slug === selectedAudienceSlug) ?? audiences[0];
  const tierHeadline = isEnglish ? activeAudience.headline_en : activeAudience.headline_bn;
  const tierPrice = isEnglish ? activeAudience.price_text_en : activeAudience.price_text_bn;
  const tierDescription = isEnglish ? activeAudience.description_en : activeAudience.description_bn;
  const tierFeatures = activeAudience.features.map(feature => ({
    id: feature.id,
    text: isEnglish ? feature.feature_en : feature.feature_bn,
  }));
  const tierCtaLabel = isEnglish ? activeAudience.cta_label_en : activeAudience.cta_label_bn;

  return (
    <section id="pricing" className="section bg-gradient-to-b from-primary/5 via-transparent to-background">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <p className="section-eyebrow">
            {isEnglish ? "Pricing & Revenue Transparency" : "প্রাইসিং ও রেভিনিউ স্বচ্ছতা"}
          </p>
          <h2 className="section-heading">
            {isEnglish ? "Predictable economics for every collaborator." : "প্রত্যেক অংশীদারের জন্য পূর্বানুমানযোগ্য অর্থনীতি।"}
          </h2>
          <p className="section-subheading mx-auto mt-6">
            {isEnglish
              ? "Designed for prompt sellers and enterprise buyers alike—clear splits, zero hidden fees, and proactive growth insights."
              : "প্রম্পট নির্মাতা ও এন্টারপ্রাইজ ক্রেতা—দু’পক্ষের জন্যই স্বচ্ছ ভাগাভাগি, কোন গোপন চার্জ নয় এবং অগ্রগতির পূর্বাভাস।"}
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {audiences.map(audience => (
            <button
              key={audience.id}
              type="button"
              onClick={() => setSelectedAudienceSlug(audience.slug)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                audience.slug === selectedAudienceSlug
                  ? "bg-primary text-white shadow-[var(--shadow-soft)]"
                  : "bg-white text-muted-foreground hover:text-foreground"
              }`}
            >
              {isEnglish ? audience.toggle_label_en : audience.toggle_label_bn}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{tierHeadline}</p>
              </div>
              <Coins className="h-6 w-6 text-primary" />
            </div>

            <div className="mt-6">
              <p className="text-3xl font-semibold text-foreground">{tierPrice}</p>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{tierDescription}</p>

            <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
              {tierFeatures.map(feature => (
                <div
                  key={feature.id}
                  className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-4"
                >
                  <p className="text-foreground">{feature.text}</p>
                </div>
              ))}
            </div>

            <a
              href={activeAudience.cta_link}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--gradient-aurora)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
            >
              {tierCtaLabel}
            </a>
          </div>

          <div className="space-y-6">
            {highlights.map(highlight => {
              const Icon = highlightIcons[highlight.icon_key as keyof typeof highlightIcons] ?? ShieldCheck;
              return (
                <div
                  key={highlight.id}
                  className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {isEnglish ? highlight.title_en : highlight.title_bn}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {isEnglish ? highlight.description_en : highlight.description_bn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTransparency;
