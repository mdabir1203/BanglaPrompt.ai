import { useId } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const marketplaceStats = [
  { value: "42K+", en: "curated prompts", bn: "কিউরেটেড প্রম্পট" },
  { value: "70+", en: "countries activated", bn: "দেশে ব্যবহৃত" },
  { value: "72h", en: "creator payouts", bn: "ক্রিয়েটর পেআউট" },
  { value: "300+", en: "enterprise teams", bn: "এন্টারপ্রাইজ টিম" },
];

const highlightFeatures = [
  {
    key: "toolkit",
    en: {
      title: "Creator storefront toolkit",
      description: "Upload prompt bundles, manage licensing, and share preview outputs in minutes.",
    },
    bn: {
      title: "ক্রিয়েটর স্টোরফ্রন্ট টুলকিট",
      description: "মিনিটেই প্রম্পট বান্ডেল আপলোড, লাইসেন্স নির্ধারণ ও প্রিভিউ আউটপুট শেয়ার করুন।",
    },
  },
  {
    key: "enterprise",
    en: {
      title: "Enterprise buying confidence",
      description: "Contracts, compliance, and analytics that help procurement teams activate your prompts fast.",
    },
    bn: {
      title: "এন্টারপ্রাইজ ক্রয়ের আত্মবিশ্বাস",
      description: "চুক্তি, কমপ্লায়েন্স ও অ্যানালিটিক্স দিয়ে প্রোকিউরমেন্ট টিম দ্রুত আপনার প্রম্পট চালু করতে পারে।",
    },
  },
];

const Hero = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const headingId = useId();
  const descriptionId = useId();
  const statsHeadingId = useId();
  const statsSummaryId = useId();
  const ctaSupportId = useId();

  const features = highlightFeatures.map(({ key, en, bn }) => ({
    key,
    ...(isEnglish ? en : bn),
  }));

  const ariaDescription = [descriptionId, statsSummaryId].join(" ");

  return (
    <section
      id="main-content"
      aria-labelledby={headingId}
      aria-describedby={ariaDescription}
      tabIndex={-1}
      className="relative isolate overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "var(--surface-hero)" }} />
        <div className="absolute -left-24 top-8 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute right-[-16rem] top-16 h-[26rem] w-[26rem] rounded-full bg-amber-200/40 blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-start gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-10">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 shadow-sm">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-aurora)" }}>
                {isEnglish
                  ? "🇧🇩 Bangladesh’s First AI Prompt Marketplace"
                  : "🇧🇩 বাংলাদেশের প্রথম এআই প্রম্পট মার্কেটপ্লেস"}
              </span>
            </div>

            <div className="rounded-[2.5rem] border border-emerald-100/80 bg-white/95 p-10 shadow-[var(--shadow-soft)]">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1
                    id={headingId}
                    className="text-balance text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl"
                  >
                    {isEnglish ? (
                      <>
                        <span className="block">Bangladesh’s first AI prompt marketplace.</span>
                        <span className="block bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-aurora)" }}>
                          Sell Bengali brilliance to global teams.
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="block">বাংলাদেশের প্রথম এআই প্রম্পট মার্কেটপ্লেস।</span>
                        <span className="block bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-aurora)" }}>
                          বাংলা সৃজনশীলতা এখন বিশ্বব্যাপী টিমের হাতে।
                        </span>
                      </>
                    )}
                  </h1>

                  <p
                    id={descriptionId}
                    className="bilingual-copy max-w-2xl text-base text-muted-foreground md:text-lg"
                  >
                    {isEnglish
                      ? "Launch your prompt storefront, package workflows for GPT-4.1, Claude 3, and Gemini Ultra, and reach verified buyers with transparent revenue tools."
                      : "আপনার প্রম্পট স্টোরফ্রন্ট চালু করুন, GPT-4.1, Claude 3 ও Gemini Ultra’র জন্য ওয়ার্কফ্লো প্রস্তুত করুন এবং স্বচ্ছ আয়ের ড্যাশবোর্ড নিয়ে যাচাইকৃত ক্রেতাদের কাছে পৌঁছান।"}
                  </p>
                </div>

                <ul
                  className="grid gap-5 text-sm md:grid-cols-2 md:text-base"
                  role="list"
                  aria-label={isEnglish ? "Marketplace advantages" : "মার্কেটপ্লেসের সুবিধা"}
                >
                  {features.map((feature) => (
                    <li
                      key={feature.key}
                      className="rounded-2xl border border-emerald-100/80 bg-emerald-50/80 px-5 py-5 shadow-sm transition-shadow focus-within:outline focus-within:outline-emerald-500/60 focus-within:outline-offset-2 hover:shadow-md"
                    >
                      <span className="block text-base font-semibold text-emerald-900">{feature.title}</span>
                      <span className="mt-2 block text-sm text-emerald-900/80 md:text-base">{feature.description}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#marketplace"
                    aria-describedby={ctaSupportId}
                    className="rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-sungold-500 px-8 py-3 text-center text-base font-semibold text-white shadow-[0_20px_45px_-18px_rgba(34,94,56,0.55)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--emerald))]"
                  >
                    <span className="block">{isEnglish ? "Browse Marketplace" : "মার্কেটপ্লেস দেখুন"}</span>
                  </a>
                  <a
                    href="#creators"
                    aria-describedby={ctaSupportId}
                    className="rounded-full border border-emerald-300 bg-white px-8 py-3 text-center text-base font-semibold text-foreground shadow-[0_18px_40px_-20px_rgba(217,119,6,0.4)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--sungold))]"
                  >
                    <span className="block">{isEnglish ? "Start Selling Prompts" : "প্রম্পট বিক্রি শুরু করুন"}</span>
                  </a>
                </div>

                <p id={ctaSupportId} className="text-sm text-muted-foreground">
                  {isEnglish
                    ? "Guided onboarding and weekly creator office hours keep every workflow accessible."
                    : "নির্দেশিত অনবোর্ডিং ও সাপ্তাহিক সহায়তা সেশন প্রতিটি সৃজনশীল প্রবাহকে সবার জন্য সহজ রাখে।"}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="gradient-border relative overflow-hidden rounded-[2.5rem] border border-emerald-200/70 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 p-[1px] text-white shadow-[var(--shadow-elevated)]">
              <div
                role="complementary"
                aria-labelledby={statsHeadingId}
                aria-describedby={statsSummaryId}
                className="relative rounded-[2.45rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 p-8"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 left-12 h-56 w-56 rounded-full bg-sungold-200/10 blur-3xl" />

                <div className="relative space-y-8">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100/80">
                      {isEnglish ? "Marketplace snapshot" : "মার্কেটপ্লেস স্ন্যাপশট"}
                    </span>
                    <h2 id={statsHeadingId} className="mt-3 text-3xl font-semibold leading-tight text-white">
                      {isEnglish ? "Built for prompt commerce in 2025." : "২০২৫ সালের প্রম্পট কমার্সের জন্য কিউরেটেড মার্কেটপ্লেস।"}
                    </h2>
                  </div>

                  <p id={statsSummaryId} className="text-sm text-emerald-100/80">
                    {isEnglish
                      ? "Transparent stats help neurodivergent creators skim, scan, and decide faster."
                      : "স্বচ্ছ পরিসংখ্যান নিউরোডাইভারজেন্ট ক্রিয়েটরদের দ্রুত স্কিম, স্ক্যান ও সিদ্ধান্ত নিতে সহায়তা করে।"}
                  </p>

                  <dl
                    className="grid gap-6 sm:grid-cols-2"
                    aria-label={isEnglish ? "Marketplace performance highlights" : "মার্কেটপ্লেস পারফরম্যান্স হাইলাইট"}
                  >
                    {marketplaceStats.map((stat) => (
                      <div
                        key={stat.value}
                        className="rounded-2xl border border-white/30 bg-white/10 px-4 py-5 shadow-[0_18px_38px_-24px_rgba(15,23,42,0.65)]"
                      >
                        <dt className="text-3xl font-semibold text-white">{stat.value}</dt>
                        <dd className="mt-2 text-sm uppercase tracking-[0.2em] text-emerald-100/85">
                          {isEnglish ? stat.en : stat.bn}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div
                    className="rounded-2xl border border-white/25 bg-white/10 px-6 py-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.65)]"
                    role="group"
                    aria-label={isEnglish ? "Global service promise" : "গ্লোবাল সেবা প্রতিশ্রুতি"}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                      <div>
                        <span className="font-semibold uppercase tracking-[0.25em] text-secondary">
                          {isEnglish ? "Priority buyer hubs" : "প্রাথমিক ক্রেতা কেন্দ্র"}
                        </span>
                        <p className="mt-1 text-white/90">Dhaka • Singapore • Dubai • New York • Lagos</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                          {isEnglish ? "Marketplace flywheel" : "মার্কেটপ্লেস ফ্লাইহুইল"}
                        </p>
                        <p className="text-sm text-emerald-100/85">
                          {isEnglish ? "Discovery → Licensing → Revenue care" : "ডিসকভারি → লাইসেন্সিং → রেভিনিউ কেয়ার"}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-emerald-100/80">
                      {isEnglish
                        ? "Culturally rich catalogs, licensing, and global support combine to create a commerce-ready marketplace."
                        : "সংস্কৃতিময় প্রম্পট ক্যাটালগ, লাইসেন্সিং ও গ্লোবাল সমর্থনের সমন্বয়ে বানিজ্যিকভাবে প্রস্তুত মার্কেটপ্লেস।"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
