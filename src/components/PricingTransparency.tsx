import { useState } from "react";
import { Coins, LineChart, ShieldCheck } from "lucide-react";

type Audience = "creators" | "enterprise";

const tiers: Record<Audience, {
  headlineEn: string;
  headlineBn: string;
  price: string;
  priceBn: string;
  descriptionEn: string;
  descriptionBn: string;
  features: string[];
  featuresBn: string[];
  cta: string;
  ctaBn: string;
}> = {
  creators: {
    headlineEn: "Creator revenue share",
    headlineBn: "ক্রিয়েটর রেভিনিউ শেয়ার",
    price: "Keep up to 80%",
    priceBn: "৮০% পর্যন্ত আপনার",
    descriptionEn:
      "No listing fees. Automated royalty forecasts. Instant dashboards for payouts across USD, BDT, EUR, SAR.",
    descriptionBn:
      "লিস্টিং ফি নেই। স্বয়ংক্রিয় রয়্যালটি পূর্বাভাস। USD, BDT, EUR, SAR এ তাৎক্ষণিক পেআউট ড্যাশবোর্ড।",
    features: [
      "Dynamic pricing guidance", "72-hour payout commitment", "Collaboration rooms with legal templates",
    ],
    featuresBn: [
      "ডায়নামিক প্রাইসিং নির্দেশিকা", "৭২ ঘণ্টায় পেমেন্ট নিশ্চিত", "লিগ্যাল টেমপ্লেটসহ সহযোগিতা স্পেস",
    ],
    cta: "Join as creator",
    ctaBn: "ক্রিয়েটর হিসেবে যোগ দিন",
  },
  enterprise: {
    headlineEn: "Enterprise localisation suite",
    headlineBn: "এন্টারপ্রাইজ লোকালাইজেশন স্যুইট",
    price: "Custom annual partnership",
    priceBn: "কাস্টম বার্ষিক পার্টনারশিপ",
    descriptionEn:
      "Dedicated curator pods, compliance vaults, and co-marketing launches across 70+ countries.",
    descriptionBn:
      "ডেডিকেটেড কিউরেটর টিম, কমপ্লায়েন্স ভল্ট ও ৭০+ দেশে কো-মার্কেটিং লঞ্চ।",
    features: [
      "Global prompt orchestration", "Governance workshops", "Executive analytics briefings",
    ],
    featuresBn: [
      "গ্লোবাল প্রম্পট অর্কেস্ট্রেশন", "গভর্নেন্স ওয়ার্কশপ", "এক্সিকিউটিভ অ্যানালিটিক্স ব্রিফিং",
    ],
    cta: "Book enterprise session",
    ctaBn: "এন্টারপ্রাইজ সেশন বুক করুন",
  },
};

const PricingTransparency = () => {
  const [audience, setAudience] = useState<Audience>("creators");
  const tier = tiers[audience];

  return (
    <section id="pricing" className="section bg-gradient-to-b from-primary/5 via-transparent to-background">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center">
          <p className="section-eyebrow">Pricing & Revenue Transparency</p>
          <h2 className="section-heading">
            Predictable economics for every collaborator.
            <span className="block text-xl font-medium text-muted-foreground md:text-2xl">
              প্রত্যেক অংশীদারের জন্য পূর্বানুমানযোগ্য অর্থনীতি।
            </span>
          </h2>
          <p className="section-subheading mx-auto mt-6">
            Built with Jobsian simplicity and Disney-level generosity—clear splits, no hidden fees, and proactive growth insights.
          </p>
          <p className="section-subheading mx-auto mt-2 text-muted-foreground">
            জবসের সরলতা ও ডিজনির উদারতার মেলবন্ধনে গড়া—স্বচ্ছ ভাগাভাগি, কোন লুকানো চার্জ নেই, এবং অগ্রগতির পূর্বাভাস।
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setAudience("creators")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              audience === "creators"
                ? "bg-primary text-white shadow-[var(--shadow-soft)]"
                : "bg-white text-muted-foreground hover:text-foreground"
            }`}
          >
            Creators • নির্মাতা
          </button>
          <button
            type="button"
            onClick={() => setAudience("enterprise")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              audience === "enterprise"
                ? "bg-primary text-white shadow-[var(--shadow-soft)]"
                : "bg-white text-muted-foreground hover:text-foreground"
            }`}
          >
            Enterprise • এন্টারপ্রাইজ
          </button>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{tier.headlineEn}</p>
                <p className="text-sm font-medium text-primary/80">{tier.headlineBn}</p>
              </div>
              <Coins className="h-6 w-6 text-primary" />
            </div>

            <div className="mt-6">
              <p className="text-3xl font-semibold text-foreground">{tier.price}</p>
              <p className="text-lg text-muted-foreground">{tier.priceBn}</p>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{tier.descriptionEn}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{tier.descriptionBn}</p>

            <div className="mt-8 grid gap-3 text-sm text-muted-foreground">
              {tier.features.map((feature, index) => (
                <div key={feature} className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-4">
                  <p className="text-foreground">{feature}</p>
                  <p className="text-muted-foreground">{tier.featuresBn[index]}</p>
                </div>
              ))}
            </div>

            <a
              href={audience === "creators" ? "/community/submit" : "#enterprise"}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--gradient-aurora)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
            >
              {tier.cta} • {tier.ctaBn}
            </a>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="flex items-center gap-3">
                <LineChart className="h-6 w-6 text-secondary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Predictive royalty modeling</p>
                  <p className="text-xs text-muted-foreground">প্রেডিক্টিভ রয়্যালটি মডেলিং</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                See future payout trends before you launch. Toggle between USD, BDT, EUR, and SAR projections in a single pane.
              </p>
              <p className="text-sm text-muted-foreground">
                লঞ্চের আগেই পেআউট ট্রেন্ড দেখে নিন। USD, BDT, EUR ও SAR পূর্বাভাস একসাথে পর্যবেক্ষণ করুন।
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Fairness charter</p>
                  <p className="text-xs text-muted-foreground">ফেয়ারনেস চার্টার</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Transparent dispute resolution, co-creation credits, and legal-safe collaboration agreements.
              </p>
              <p className="text-sm text-muted-foreground">
                স্বচ্ছ বিরোধ নিষ্পত্তি, কো-ক্রিয়েশন ক্রেডিট এবং আইন-সম্মত সহযোগিতা চুক্তি।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTransparency;
