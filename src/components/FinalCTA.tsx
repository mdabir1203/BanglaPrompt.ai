import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section id="cta" className="py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[var(--gradient-midnight)] px-8 py-12 text-white shadow-[var(--shadow-elevated)] md:px-16 md:py-16">
          <div className="absolute -right-24 top-[-6rem] h-72 w-72 rounded-full bg-secondary/40 blur-3xl" />
          <div className="absolute -left-24 bottom-[-8rem] h-72 w-72 rounded-full bg-primary/40 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                {isEnglish ? "Start today" : "এখনই শুরু করুন"}
              </p>
              <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
                {isEnglish ? "Shape the future of AI creation." : "এআই সৃজনশীলতার ভবিষ্যৎ গড়ুন।"}
              </h2>
              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                {isEnglish
                  ? "Join the Bengali-first prompt commerce network built for modern creators and enterprise buyers. We streamline monetisation, licensing, and compliance so you can focus on crafting high-impact prompts."
                  : "আধুনিক নির্মাতা ও এন্টারপ্রাইজ ক্রেতাদের জন্য নির্মিত বাঙালি প্রম্পট কমার্স নেটওয়ার্কে যোগ দিন। আয়, লাইসেন্সিং ও কমপ্লায়েন্স আমরা সামলাই—আপনি উচ্চমানের প্রম্পট নির্মাণে মন দিন।"}
              </p>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/40 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                {isEnglish ? "Choose your path" : "আপনার পথ বেছে নিন"}
              </p>
              <div className="grid gap-3 text-sm font-semibold">
                <a
                  href="/community/submit"
                  className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/20 px-4 py-3 transition-all hover:bg-white/30"
                >
                  <span>{isEnglish ? "Creator onboarding" : "ক্রিয়েটর অনবোর্ডিং"}</span>
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#enterprise"
                  className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/20 px-4 py-3 transition-all hover:bg-white/30"
                >
                  <span>{isEnglish ? "Enterprise discovery" : "এন্টারপ্রাইজ ডিসকভারি"}</span>
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#insights"
                  className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/20 px-4 py-3 transition-all hover:bg-white/30"
                >
                  <span>{isEnglish ? "Download insights" : "ইনসাইটস ডাউনলোড"}</span>
                  <span aria-hidden>→</span>
                </a>
              </div>

              <div className="rounded-2xl border border-white/40 bg-white/20 p-4 text-sm text-white/80">
                <p className="font-semibold uppercase tracking-[0.2em]">
                  {isEnglish ? "72h Creator Care" : "৭২ ঘণ্টার ক্রিয়েটর কেয়ার"}
                </p>
                <p className="mt-1">
                  {isEnglish
                    ? "Dedicated bilingual concierge ensures every creator or enterprise request is resolved within three days."
                    : "প্রতিটি ক্রিয়েটর বা এন্টারপ্রাইজ অনুরোধ ৩ দিনের মধ্যে সমাধান নিশ্চিত করতে ডেডিকেটেড কনসিয়ার্জ।"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
                <span>Dhaka</span>
                <span>•</span>
                <span>Singapore</span>
                <span>•</span>
                <span>Dubai</span>
                <span>•</span>
                <span>New York</span>
                <span>•</span>
                <span>Lagos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
