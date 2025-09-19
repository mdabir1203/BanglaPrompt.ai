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
        <div className="absolute inset-0 opacity-95" style={{ background: "var(--surface-hero)" }} />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(circle at 2% 12%, rgba(34, 94, 56, 0.24), transparent 55%), radial-gradient(circle at 98% 10%, rgba(217, 119, 6, 0.25), transparent 55%), radial-gradient(circle at 82% 82%, rgba(220, 38, 38, 0.18), transparent 60%)",
          }}
        />
        <div className="absolute -left-32 top-6 h-80 w-80 rounded-full blur-3xl" style={{ background: "rgba(34, 94, 56, 0.16)" }} />
        <div className="absolute right-[-18rem] top-20 h-[28rem] w-[28rem] rounded-full blur-[140px]" style={{ background: "rgba(217, 119, 6, 0.22)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-10">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground shadow-sm backdrop-blur">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-aurora)" }}>
                {isEnglish
                  ? "🇧🇩 Bangladesh’s First AI Prompt Marketplace"
                  : "🇧🇩 বাংলাদেশের প্রথম এআই প্রম্পট মার্কেটপ্লেস"}
              </span>
            </div>

            <div className="rounded-[2.5rem] border border-white/70 bg-white/90 p-10 shadow-[var(--shadow-soft)] backdrop-blur-lg">
              <div className="space-y-8">
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
                </div>

                <ul className="grid gap-5 text-sm md:grid-cols-2 md:text-base">
                  <li className="illuminated-card rounded-2xl border border-white/70 px-5 py-5 backdrop-blur">
                    <span className="block font-semibold text-foreground">
                      {isEnglish ? "Creator storefront toolkit" : "ক্রিয়েটর স্টোরফ্রন্ট টুলকিট"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {isEnglish
                        ? "Upload prompt bundles, manage licensing, and share preview outputs in minutes."
                        : "মিনিটেই প্রম্পট বান্ডেল আপলোড, লাইসেন্স নির্ধারণ ও প্রিভিউ আউটপুট শেয়ার করুন।"}
                    </span>
                  </li>
                  <li className="illuminated-card rounded-2xl border border-white/70 px-5 py-5 backdrop-blur">
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

                <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#marketplace"
                    className="rounded-full bg-[var(--gradient-aurora)] px-8 py-3 text-base font-semibold text-white shadow-[0_24px_45px_-18px_rgba(34,94,56,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_70px_-30px_rgba(34,94,56,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--emerald))]"
                  >
                    <span className="block">{isEnglish ? "Browse Marketplace" : "মার্কেটপ্লেস দেখুন"}</span>
                  </a>
                  <a
                    href="#creators"
                    className="rounded-full border border-emerald-500/30 bg-white/95 px-8 py-3 text-base font-semibold text-foreground shadow-[0_18px_40px_-20px_rgba(217,119,6,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-28px_rgba(217,119,6,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--sungold))]"
                  >
                    <span className="block">{isEnglish ? "Start Selling Prompts" : "প্রম্পট বিক্রি শুরু করুন"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="gradient-border relative overflow-hidden rounded-[2.5rem] p-[1px]">
              <div className="hero-panel rounded-[2.45rem] p-8 text-white">
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl" style={{ background: "rgba(255, 255, 255, 0.16)" }} />
                <div className="absolute -bottom-16 left-12 h-56 w-56 rounded-full blur-3xl" style={{ background: "rgba(255, 255, 255, 0.12)" }} />

                <div className="relative space-y-8">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
                      {isEnglish ? "Marketplace snapshot" : "মার্কেটপ্লেস স্ন্যাপশট"}
                    </span>
                    <h2 className="mt-3 text-3xl font-semibold leading-tight">
                      {isEnglish ? "Built for prompt commerce in 2025." : "২০২৫ সালের প্রম্পট কমার্সের জন্য কিউরেটেড মার্কেটপ্লেস।"}
                    </h2>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {marketplaceStats.map((stat) => (
                      <div
                        key={stat.value}
                        className="rounded-2xl border border-white/35 bg-white/10 px-4 py-5 shadow-[0_18px_38px_-24px_rgba(15,23,42,0.65)] backdrop-blur"
                      >
                        <div className="text-3xl font-semibold">{stat.value}</div>
                        <div className="text-sm uppercase tracking-[0.2em] text-white/75">
                          {isEnglish ? stat.en : stat.bn}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/30 bg-white/10 px-6 py-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.65)] backdrop-blur">
                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                      <div>
                        <span className="font-semibold uppercase tracking-[0.25em] text-secondary">
                          {isEnglish ? "Priority buyer hubs" : "প্রাথমিক ক্রেতা কেন্দ্র"}
                        </span>
                        <p className="mt-1 text-white/90">Dhaka • Singapore • Dubai • New York • Lagos</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/65">
                          {isEnglish ? "Marketplace flywheel" : "মার্কেটপ্লেস ফ্লাইহুইল"}
                        </p>
                        <p className="text-sm text-white/80">
                          {isEnglish ? "Discovery → Licensing → Revenue care" : "ডিসকভারি → লাইসেন্সিং → রেভিনিউ কেয়ার"}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-white/80">
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
