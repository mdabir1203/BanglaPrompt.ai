import { Lightbulb, ShieldCheck, Sparkle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const pillars = [
  {
    icon: Sparkle,
    titleEn: "Built for Bengali Creators",
    titleBn: "বাংলা নির্মাতাদের জন্য নির্মিত",
    descriptionEn: "Earn globally with prompts tuned to Bengali idioms, festivals, and heritage while staying performance-ready for GPT-4.1, Claude 3, and Gemini Ultra.",
    descriptionBn: "বাংলা বাগধারা, উৎসব ও ঐতিহ্যকে কেন্দ্র করে প্রম্পট তৈরি করে বিশ্বজুড়ে আয় করুন—GPT-4.1, Claude 3, Gemini Ultra-র জন্য অপ্টিমাইজড।",
  },
  {
    icon: ShieldCheck,
    titleEn: "Fair & Transparent Revenue",
    titleBn: "ন্যায্য ও স্বচ্ছ আয়",
    descriptionEn: "Keep up to 80% per sale, monitor predictive royalties, and access a 72-hour payout promise backed by compliance reporting.",
    descriptionBn: "প্রতি বিক্রয়ে ৮০% পর্যন্ত আয় রাখুন, প্রেডিক্টিভ রয়্যালটি ট্র্যাক করুন এবং কমপ্লায়েন্স রিপোর্টসহ ৭২ ঘণ্টায় পেমেন্ট পান।",
  },
  {
    icon: Lightbulb,
    titleEn: "Global Demand Engine",
    titleBn: "গ্লোবাল ডিমান্ড ইঞ্জিন",
    descriptionEn: "Surface on dashboards used by Fortune 500 teams with localized curation, audit trails, and shared analytics hubs.",
    descriptionBn: "লোকালাইজড কিউরেশন, অডিট ট্রেইল ও শেয়ারড অ্যানালিটিক্স হাবের মাধ্যমে Fortune 500 টিমের সামনে আপনার প্রম্পট পৌঁছে দিন।",
  },
];

const Features = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section id="value" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(247, 255, 246, 0.82) 0%, rgba(255, 246, 223, 0.7) 55%, rgba(255, 255, 255, 0.9) 100%)",
          }}
        />
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(34, 94, 56, 0.18)" }} />
        <div className="absolute -bottom-28 right-[-12%] h-80 w-80 rounded-full blur-[130px]" style={{ background: "rgba(217, 119, 6, 0.2)" }} />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Creator Economy 2025</p>
          <h2 className="section-heading">
            {isEnglish ? "Fortune 500 confidence. Bengali soul." : "ফর্চুন ৫০০ মানের নিশ্চয়তা। বাঙালি আবেগের সুর।"}
          </h2>
          <p className="section-subheading mx-auto mt-6">
            {isEnglish
              ? "Human-centred prompt commerce keeps Bengali creativity visible while packaging revenue clarity, governance, and accessibility for enterprise teams."
              : "মানব-কেন্দ্রিক প্রম্পট কমার্স বাংলা সৃজনশীলতাকে সামনে আনে, একই সাথে এন্টারপ্রাইজ টিমের জন্য স্বচ্ছ আয়, গভর্নেন্স ও অ্যাক্সেসিবিলিটি নিশ্চিত করে।"}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.titleEn}
              className="glass-panel flex h-full flex-col gap-5 rounded-3xl p-8 text-left shadow-[0_32px_65px_-40px_rgba(34,94,56,0.45)]"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_24px_40px_-24px_rgba(27,67,50,0.65)]"
                style={{ backgroundImage: "var(--gradient-aurora)" }}
              >
                <pillar.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {isEnglish ? pillar.titleEn : pillar.titleBn}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {isEnglish ? pillar.descriptionEn : pillar.descriptionBn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
