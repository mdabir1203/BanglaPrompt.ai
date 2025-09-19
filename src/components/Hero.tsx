import { useLanguage } from "@/contexts/LanguageContext";

const marketplaceStats = [
  { value: "42K+", en: "curated prompts", bn: "কিউরেটেড প্রম্পট" },
  { value: "70+", en: "countries activated", bn: "দেশে ব্যবহৃত" },
  { value: "72h", en: "creator payouts", bn: "ক্রিয়েটর পেআউট" },
  { value: "300+", en: "enterprise teams", bn: "এন্টারপ্রাইজ টিম" },
];

const Hero = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-full w-[55%] bg-[var(--gradient-midnight)] opacity-[0.92]" />
        <div className="absolute -right-32 bottom-[-10rem] h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-10">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/40 bg-white/75 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground shadow-sm backdrop-blur">
              <span className="text-foreground">
                {isEnglish
                  ? "🇧🇩 Bangladesh’s First AI Prompt Marketplace"
                  : "🇧🇩 বাংলাদেশের প্রথম এআই প্রম্পট মার্কেটপ্লেস"}
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
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

              <div className="grid gap-6 text-base md:text-lg">
                <p className="bilingual-copy max-w-2xl text-foreground">
                  {isEnglish
                    ? "Launch your prompt storefront, package workflows for GPT-4.1, Claude 3, and Gemini Ultra, and reach verified buyers with transparent revenue tools."
                    : "আপনার প্রম্পট স্টোরফ্রন্ট চালু করুন, GPT-4.1, Claude 3 ও Gemini Ultra’র জন্য ওয়ার্কফ্লো প্রস্তুত করুন এবং স্বচ্ছ আয়ের ড্যাশবোর্ড নিয়ে যাচাইকৃত ক্রেতাদের কাছে পৌঁছান।"}
                </p>
              </div>

              <ul className="grid gap-4 text-sm md:grid-cols-2 md:text-base">
                <li className="rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-sm backdrop-blur">
                  <span className="block font-semibold text-foreground">
                    {isEnglish ? "Creator storefront toolkit" : "ক্রিয়েটর স্টোরফ্রন্ট টুলকিট"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {isEnglish
                      ? "Upload prompt bundles, manage licensing, and share preview outputs in minutes."
                      : "মিনিটেই প্রম্পট বান্ডেল আপলোড, লাইসেন্স নির্ধারণ ও প্রিভিউ আউটপুট শেয়ার করুন।"}
                  </span>
                </li>
                <li className="rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-sm backdrop-blur">
                  <span className="block font-semibold text-foreground">
                    {isEnglish ? "Enterprise buying confidence" : "এন্টারপ্রাইজ ক্রয়ের আত্মবিশ্বাস"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {isEnglish
                      ? "Contracts, compliance, and analytics that help procurement teams activate your prompts fast."
                      : "চুক্তি, কমপ্লায়েন্স ও অ্যানালিটিক্স দিয়ে প্রোকিউরমেন্ট টিম দ্রুত আপনার প্রম্পট চালু করতে পারে।"}
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#marketplace"
                className="rounded-full bg-[var(--gradient-aurora)] px-8 py-3 text-base font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="block">{isEnglish ? "Browse Marketplace" : "মার্কেটপ্লেস দেখুন"}</span>
              </a>
              <a
                href="#creators"
                className="rounded-full border border-white/70 bg-white/70 px-8 py-3 text-base font-semibold text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="block">{isEnglish ? "Start Selling Prompts" : "প্রম্পট বিক্রি শুরু করুন"}</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="gradient-border glass-panel relative overflow-hidden rounded-[2rem] p-8 text-white">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-secondary/40 blur-3xl" />
              <div className="absolute -bottom-16 left-12 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />

              <div className="relative space-y-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                    {isEnglish ? "Marketplace snapshot" : "মার্কেটপ্লেস স্ন্যাপশট"}
                  </span>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight">
                    {isEnglish ? "Built for prompt commerce in 2025." : "২০২৫ সালের প্রম্পট কমার্সের জন্য কিউরেটেড মার্কেটপ্লেস।"}
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {marketplaceStats.map((stat) => (
                    <div key={stat.value} className="rounded-2xl border border-white/30 bg-white/10 px-4 py-5 shadow-sm backdrop-blur">
                      <div className="text-3xl font-semibold">{stat.value}</div>
                      <div className="text-sm uppercase tracking-[0.2em] text-white/70">
                        {isEnglish ? stat.en : stat.bn}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/25 bg-white/10 px-6 py-5 shadow-sm backdrop-blur">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                    <div>
                      <span className="font-semibold uppercase tracking-[0.25em] text-secondary">
                        {isEnglish ? "Priority buyer hubs" : "প্রাথমিক ক্রেতা কেন্দ্র"}
                      </span>
                      <p className="mt-1 text-white/80">Dhaka • Singapore • Dubai • New York • Lagos</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                        {isEnglish ? "Marketplace flywheel" : "মার্কেটপ্লেস ফ্লাইহুইল"}
                      </p>
                      <p className="text-sm text-white/80">
                        {isEnglish ? "Discovery → Licensing → Revenue care" : "ডিসকভারি → লাইসেন্সিং → রেভিনিউ কেয়ার"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
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
    </section>
  );
};

export default Hero;
