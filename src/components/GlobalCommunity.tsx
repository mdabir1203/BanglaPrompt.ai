import { Globe2, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const regions = [
  {
    regionEn: "South Asia",
    regionBn: "দক্ষিণ এশিয়া",
    highlightEn: "Bangladesh, India, Pakistan",
    highlightBn: "বাংলাদেশ, ভারত, পাকিস্তান",
    adoptionEn: "37% of creator base",
    adoptionBn: "ক্রিয়েটর বেসের ৩৭%",
  },
  {
    regionEn: "Middle East",
    regionBn: "মধ্যপ্রাচ্য",
    highlightEn: "Saudi Arabia, UAE, Qatar",
    highlightBn: "সৌদি আরব, ইউএই, কাতার",
    adoptionEn: "Enterprise telco & retail",
    adoptionBn: "এন্টারপ্রাইজ টেলকো ও রিটেল",
  },
  {
    regionEn: "North America",
    regionBn: "উত্তর আমেরিকা",
    highlightEn: "USA, Canada",
    highlightBn: "যুক্তরাষ্ট্র, কানাডা",
    adoptionEn: "Diaspora media & fintech",
    adoptionBn: "প্রবাসী মিডিয়া ও ফিনটেক",
  },
  {
    regionEn: "Europe & UK",
    regionBn: "ইউরোপ ও যুক্তরাজ্য",
    highlightEn: "UK, Germany, Netherlands",
    highlightBn: "যুক্তরাজ্য, জার্মানি, নেদারল্যান্ডস",
    adoptionEn: "Cultural institutions",
    adoptionBn: "সাংস্কৃতিক প্রতিষ্ঠান",
  },
];

const GlobalCommunity = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(247, 255, 246, 0.84) 40%, rgba(255, 246, 223, 0.78) 100%)",
          }}
        />
        <div className="absolute -top-24 right-[10%] h-80 w-80 rounded-full blur-[140px]" style={{ background: "rgba(34, 94, 56, 0.2)" }} />
        <div className="absolute -bottom-28 left-[5%] h-72 w-72 rounded-full blur-[120px]" style={{ background: "rgba(217, 119, 6, 0.22)" }} />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <p className="section-eyebrow">{isEnglish ? "Global Community" : "গ্লোবাল কমিউনিটি"}</p>
            <h2 className="section-heading">
              {isEnglish
                ? "Bengali ingenuity powering 70+ countries."
                : "৭০+ দেশে এআই টিমকে শক্তি জোগাচ্ছে বাঙালি উদ্ভাবন।"}
            </h2>
            <p className="section-subheading">
              {isEnglish
                ? "A global constellation of creators, enterprises, and partners shaping culturally aware AI—bridging Dhaka’s imagination with New York boardrooms and Lagos innovation hubs."
                : "একটি বৈশ্বিক নক্ষত্রপুঞ্জ যেখানে নির্মাতা, এন্টারপ্রাইজ ও পার্টনাররা একসাথে সাংস্কৃতিকভাবে সচেতন এআই গড়ছে—ঢাকার কল্পনাকে নিউ ইয়র্কের বোর্ডরুম ও লাগোসের উদ্ভাবনী কেন্দ্রের সাথে যুক্ত করছে।"}
            </p>

            <div className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-[0_32px_65px_-40px_rgba(34,94,56,0.45)]">
              <div className="flex items-center gap-3">
                <Globe2 className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isEnglish ? "70+ countries" : "৭০+ দেশ"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isEnglish ? "Bengali-first prompt exchanges" : "বাংলা-প্রথম প্রম্পট এক্সচেঞ্জ"}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
                <div className="illuminated-card rounded-2xl border border-white/70 p-4 backdrop-blur">
                  <p className="text-foreground font-semibold">
                    {isEnglish ? "300+ enterprise teams" : "৩০০+ এন্টারপ্রাইজ টিম"}
                  </p>
                  <p>{isEnglish ? "Fortune 500, telco, fintech" : "ফরচুন ৫০০, টেলকো, ফিনটেক"}</p>
                </div>
                <div className="illuminated-card rounded-2xl border border-white/70 p-4 backdrop-blur">
                  <p className="text-foreground font-semibold">
                    {isEnglish ? "42,000+ prompts" : "৪২,০০০+ প্রম্পট"}
                  </p>
                  <p>{isEnglish ? "Localized to industry & tone" : "ইন্ডাস্ট্রি ও টোন অনুযায়ী লোকালাইজড"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] border border-white/70 p-6 shadow-[0_32px_65px_-40px_rgba(34,94,56,0.45)]">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                {isEnglish ? "Regional adoption heatmap" : "রিজিওনাল অ্যাডপশন হিটম্যাপ"}
              </h3>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {isEnglish
                ? "Explore how PromptBazar.AI is embedded across creative, operational, and compliance teams."
                : "ক্রিয়েটিভ, অপারেশনাল ও কমপ্লায়েন্স টিমে PromptBazar.AI কীভাবে প্রয়োগ হচ্ছে তা জানুন।"}
            </p>

            <div className="mt-6 grid gap-4">
              {regions.map((region) => (
                <div
                  key={region.regionEn}
                  className="illuminated-card flex items-center justify-between rounded-2xl border border-white/70 p-4 backdrop-blur"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {isEnglish ? region.regionEn : region.regionBn}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isEnglish ? region.highlightEn : region.highlightBn}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold text-primary shadow-[0_10px_25px_-18px_rgba(34,94,56,0.7)]"
                    style={{ background: "rgba(34, 94, 56, 0.12)" }}
                  >
                    {isEnglish ? region.adoptionEn : region.adoptionBn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCommunity;
