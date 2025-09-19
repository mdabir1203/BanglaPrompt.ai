import { useLanguage } from "@/contexts/LanguageContext";


const footerLinks = [
  {
    headingEn: "Product",
    headingBn: "প্রোডাক্ট",
    links: [
      { labelEn: "Marketplace", labelBn: "মার্কেটপ্লেস", href: "#marketplace" },
      { labelEn: "Live Bidding", labelBn: "লাইভ বিডিং", href: "#exchange" },
      { labelEn: "Creator Hub", labelBn: "ক্রিয়েটর হাব", href: "#creators" },
      { labelEn: "Pricing", labelBn: "প্রাইসিং", href: "#pricing" },
    ],
  },
  {
    headingEn: "Solutions",
    headingBn: "সমাধান",
    links: [
      { labelEn: "Enterprise", labelBn: "এন্টারপ্রাইজ", href: "#enterprise" },
      { labelEn: "Compliance", labelBn: "কমপ্লায়েন্স", href: "#enterprise" },
      { labelEn: "Insights", labelBn: "ইনসাইটস", href: "#insights" },
    ],
  },
  {
    headingEn: "Company",
    headingBn: "কোম্পানি",
    links: [
      { labelEn: "Support", labelBn: "সাপোর্ট", href: "#support" },
      { labelEn: "Community", labelBn: "কমিউনিটি", href: "/community/prompts" },
      { labelEn: "Security", labelBn: "সিকিউরিটি", href: "#enterprise" },
    ],
  },
];

const complianceItems = [
  { en: "GDPR Ready", bn: "GDPR প্রস্তুত" },
  { en: "ISO 27001", bn: "ISO 27001" },
  { en: "SOC 2", bn: "SOC 2" },
  { en: "Bangladesh Data Protection", bn: "বাংলাদেশ ডেটা প্রোটেকশন" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <footer className="bg-[#0C1115] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/promptbazar-logo.svg"
                alt="PromptBazar.AI logo"
                className="h-12 w-12 rounded-xl border border-white/20 bg-white/90 p-1.5 shadow-[var(--shadow-soft)]"
              />
              <div>
                <p className="text-base font-semibold">PromptBazar.AI</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  {isEnglish
                    ? "Bangladesh’s first prompt marketplace • Global reach"
                    : "বাংলাদেশের প্রথম প্রম্পট মার্কেটপ্লেস • গ্লোবাল রিচ"}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70 md:text-base">
              {isEnglish
                ? "A global AI prompt marketplace connecting Bengali prompt creators with international buyers through bilingual storefronts, transparent revenue operations, live bidding exchanges, and compliance-ready tooling."
                : "দ্বিভাষিক স্টোরফ্রন্ট, স্বচ্ছ আয় ব্যবস্থাপনা, লাইভ বিডিং এক্সচেঞ্জ ও কমপ্লায়েন্স-প্রস্তুত টুলিংয়ের মাধ্যমে বাংলা প্রম্পট নির্মাতাদেরকে আন্তর্জাতিক ক্রেতাদের সাথে যুক্ত করে PromptBazar.AI।"}
            </p>
          </div>

          <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80 backdrop-blur">
            <p className="font-semibold uppercase tracking-[0.3em] text-white/60">
              {isEnglish ? "Stay ahead" : "আপডেট থাকুন"}
            </p>
            <p className="text-sm text-white/80">
              {isEnglish
                ? "Subscribe for insights on the 2025 creator economy, localisation strategy, and responsible AI practices."
                : "২০২৫ ক্রিয়েটর ইকোনমি, লোকালাইজেশন কৌশল ও রেসপনসিবল এআই সম্পর্কে ইনসাইটস পেতে সাবস্ক্রাইব করুন।"}
            </p>
            <form className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder={isEnglish ? "Work email" : "কর্মস্থলের ইমেইল"}
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-[var(--gradient-aurora)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
              >
                {isEnglish ? "Subscribe" : "সাবস্ক্রাইব"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {footerLinks.map((group) => (
            <div key={group.headingEn}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                {isEnglish ? group.headingEn : group.headingBn}
              </p>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {group.links.map((link) => (
                  <li key={link.labelEn}>
                    <a href={link.href} className="transition-colors hover:text-white">
                      {isEnglish ? link.labelEn : link.labelBn}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              {isEnglish ? "Compliance" : "কমপ্লায়েন্স"}
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              {complianceItems.map((item) => (
                <li key={item.en}>{isEnglish ? item.en : item.bn}</li>
              ))}
            </ul>
            <p className="text-xs text-white/60">
              {isEnglish
                ? "Data residency: Singapore • Frankfurt • Mumbai • Dhaka"
                : "ডাটা রেসিডেন্সি: সিঙ্গাপুর • ফ্রাঙ্কফুর্ট • মুম্বাই • ঢাকা"}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} PromptBazar.AI. {isEnglish ? "All rights reserved." : "সমস্ত স্বত্ব সংরক্ষিত।"}</p>
          <p>{isEnglish ? "Built with Bengali creativity for global teams." : "বাংলা সৃজনশীলতায় নির্মিত—গ্লোবাল টিমের জন্য।"}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
