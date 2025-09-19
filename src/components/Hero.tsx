const Hero = () => {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-full w-[55%] bg-[var(--gradient-midnight)] opacity-[0.92]" />
        <div className="absolute -right-32 bottom-[-10rem] h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-10">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground shadow-sm backdrop-blur">
              <span className="text-foreground">🇧🇩 Bangladesh Born</span>
              <span className="text-muted-foreground/70">|</span>
              <span className="text-primary">বাংলা হৃদয়ের স্পন্দন</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
                <span className="block">Bangladesh-born. World-ready.</span>
                <span className="block bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-aurora)" }}>
                  The Global AI Prompt Marketplace.
                </span>
                <span className="mt-4 block text-2xl font-medium text-white/90 md:text-3xl">
                  বাংলাদেশের মাটিতে জন্ম, বিশ্বজুড়ে প্রভাব। গ্লোবাল এআই প্রম্পট মার্কেটপ্লেস।
                </span>
              </h1>

              <div className="grid gap-6 text-base md:text-lg">
                <p className="bilingual-copy max-w-2xl text-foreground">
                  Imagineering Bengali-first storytelling for a global stage while keeping revenue, compliance, and community at the centre—crafted with Walt Disney’s wonder and Steve Jobs’ clarity.
                </p>
                <p className="bilingual-copy max-w-2xl">
                  বাঙালি নির্মাতাদের কণ্ঠে বিশ্বজুড়ে AI অভিজ্ঞতা—ডিজনির গল্পের জাদু ও স্টিভ জবসের মিতব্যয়ী নিখুঁততার মিলনে। ন্যায়সংগত আয়, সাংস্কৃতিক সূক্ষ্মতা ও এন্টারপ্রাইজ মান রক্ষিত।
                </p>
              </div>

              <ul className="grid gap-4 text-sm md:grid-cols-2 md:text-base">
                <li className="rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-sm backdrop-blur">
                  <span className="block font-semibold text-foreground">Imagine Global Storyworlds</span>
                  <span className="text-sm text-muted-foreground">Dhaka থেকে Lagos—AI narrative staging tailored to culture.</span>
                  <span className="mt-1 block text-sm text-muted-foreground">ঢাকা থেকে লাগোস—সংস্কৃতি-ভিত্তিক এআই স্টোরিওয়ার্ল্ড।</span>
                </li>
                <li className="rounded-2xl border border-white/60 bg-white/70 px-5 py-4 shadow-sm backdrop-blur">
                  <span className="block font-semibold text-foreground">Design for Fortune 500 Velocity</span>
                  <span className="text-sm text-muted-foreground">Audit-grade governance, predictive royalties, 72-hour payouts.</span>
                  <span className="mt-1 block text-sm text-muted-foreground">অডিট-গ্রেড গভর্নেন্স, প্রেডিক্টিভ রয়্যালটি, ৭২ ঘণ্টায় পেমেন্ট।</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#marketplace"
                className="rounded-full bg-[var(--gradient-aurora)] px-8 py-3 text-base font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
              >
                <span className="block">Explore Prompts</span>
                <span className="text-sm font-medium text-white/80">প্রম্পট দেখুন</span>
              </a>
              <a
                href="#creators"
                className="rounded-full border border-white/70 bg-white/70 px-8 py-3 text-base font-semibold text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="block">Become a Creator</span>
                <span className="text-sm font-medium text-muted-foreground">ক্রিয়েটর হোন</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="gradient-border glass-panel relative overflow-hidden rounded-[2rem] p-8 text-white">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-secondary/40 blur-3xl" />
              <div className="absolute -bottom-16 left-12 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />

              <div className="relative space-y-8">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Global Creator Constellation</span>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight">
                    Curated for 2025 enterprise demand.
                    <span className="block text-base font-normal text-white/70">
                      ২০২৫ এন্টারপ্রাইজ ডিমান্ডের জন্য কিউরেটেড প্রম্পট ইউনিভার্স।
                    </span>
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {[{ value: "42K+", en: "curated prompts", bn: "কিউরেটেড প্রম্পট" }, { value: "70+", en: "countries activated", bn: "দেশে ব্যবহৃত" }, { value: "72h", en: "creator payouts", bn: "ক্রিয়েটর পেআউট" }, { value: "300+", en: "enterprise teams", bn: "এন্টারপ্রাইজ টিম" }].map((stat) => (
                    <div key={stat.value} className="rounded-2xl border border-white/30 bg-white/10 px-4 py-5 shadow-sm backdrop-blur">
                      <div className="text-3xl font-semibold">{stat.value}</div>
                      <div className="text-sm uppercase tracking-[0.2em] text-white/70">{stat.en}</div>
                      <div className="text-sm text-white/70">{stat.bn}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-white/25 bg-white/10 px-6 py-5 shadow-sm backdrop-blur">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
                    <div>
                      <span className="font-semibold uppercase tracking-[0.25em] text-secondary">Launch Corridors</span>
                      <p className="mt-1 text-white/80">
                        Dhaka • Singapore • Dubai • New York • Lagos
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/60">Vision Track</p>
                      <p className="text-sm text-white/80">Disney Imagineering × Jobsian focus</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    সাংস্কৃতিক গল্প বলার মাধুর্য এবং ডিজাইনের নিখুঁততা একসাথে এনে গ্লোবাল শ্রোতাদের জন্য প্রম্পট কিউরেশন।
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
