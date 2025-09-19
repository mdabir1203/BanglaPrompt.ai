import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  return (
    <section id="cta" className="py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-amber-50 px-8 py-12 text-foreground shadow-[var(--shadow-elevated)] md:px-16 md:py-16">
          <div className="absolute -right-24 top-[-6rem] h-72 w-72 rounded-full bg-sungold-200/55 blur-3xl" />
          <div className="absolute -left-24 bottom-[-8rem] h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-emerald-100/35" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                {isEnglish ? "Start today" : "এখনই শুরু করুন"}
              </p>
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
                {isEnglish ? "Shape the future of AI creation." : "এআই সৃজনশীলতার ভবিষ্যৎ গড়ুন।"}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {isEnglish
                  ? "Join the Bengali-first prompt commerce network built for modern creators and enterprise buyers. We streamline monetisation, licensing, and compliance so you can focus on crafting high-impact prompts."
                  : "আধুনিক নির্মাতা ও এন্টারপ্রাইজ ক্রেতাদের জন্য নির্মিত বাঙালি প্রম্পট কমার্স নেটওয়ার্কে যোগ দিন। আয়, লাইসেন্সিং ও কমপ্লায়েন্স আমরা সামলাই—আপনি উচ্চমানের প্রম্পট নির্মাণে মন দিন।"}
              </p>
            </div>

            <div className="space-y-5 rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
                {isEnglish ? "Choose your path" : "আপনার পথ বেছে নিন"}
              </p>
              <div className="grid gap-3 text-sm font-semibold text-foreground">
                <Link
                  to="/community/submit"
                  className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 transition-all hover:bg-emerald-100/80"
                >
                  <span>{isEnglish ? "Creator onboarding" : "ক্রিয়েটর অনবোর্ডিং"}</span>
                  <span aria-hidden className="text-emerald-700">→</span>
                </Link>
                <Link
                  to="/enterprise"
                  className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 transition-all hover:bg-emerald-100/80"
                >
                  <span>{isEnglish ? "Enterprise discovery" : "এন্টারপ্রাইজ ডিসকভারি"}</span>
                  <span aria-hidden className="text-emerald-700">→</span>
                </Link>
                <Link
                  to="/insights"
                  className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 transition-all hover:bg-emerald-100/80"
                >
                  <span>{isEnglish ? "Download insights" : "ইনসাইটস ডাউনলোড"}</span>
                  <span aria-hidden className="text-emerald-700">→</span>
                </Link>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/90 p-4 text-sm text-muted-foreground">
                <p className="font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {isEnglish ? "72h Creator Care" : "৭২ ঘণ্টার ক্রিয়েটর কেয়ার"}
                </p>
                <p className="mt-1 text-foreground">
                  {isEnglish
                    ? "Dedicated bilingual concierge ensures every creator or enterprise request is resolved within three days."
                    : "প্রতিটি ক্রিয়েটর বা এন্টারপ্রাইজ অনুরোধ ৩ দিনের মধ্যে সমাধান নিশ্চিত করতে ডেডিকেটেড কনসিয়ার্জ।"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
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
