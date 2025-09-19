import { useState } from "react";
import { PlayCircle, Sparkles, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const creators = [
  {
    id: "aurora",
    name: "Aurora Studio",
    nameBn: "অরোরা স্টুডিও",
    location: "Dhaka → Singapore",
    locationBn: "ঢাকা → সিঙ্গাপুর",
    industry: "Enterprise brand storytelling",
    industryBn: "এন্টারপ্রাইজ ব্র্যান্ড স্টোরিটেলিং",
    quoteEn:
      "We staged a multilingual product launch for a Southeast Asian telco in six days—Bangla nuance intact, enterprise compliance satisfied.",
    quoteBn:
      "মাত্র ছয় দিনে আমরা একটি দক্ষিণ-পূর্ব এশীয় টেলকোর জন্য বহুভাষিক প্রোডাক্ট লঞ্চ প্রস্তুত করেছি—বাংলা সূক্ষ্মতা বজায় রেখেই এন্টারপ্রাইজ কমপ্লায়েন্স সম্পন্ন।",
    revenue: "$38K in 90 days",
    revenueBn: "৯০ দিনে $৩৮ হাজার",
    prompts: "63 premium prompts",
    promptsBn: "৬৩টি প্রিমিয়াম প্রম্পট",
    sectors: "Telecom • OTT • Public Sector",
    sectorsBn: "টেলিকম • ওটিটি • পাবলিক সেক্টর",
  },
  {
    id: "luminous",
    name: "Luminous Labs",
    nameBn: "লুমিনাস ল্যাবস",
    location: "Chattogram → New York",
    locationBn: "চট্টগ্রাম → নিউ ইয়র্ক",
    industry: "Financial services automation",
    industryBn: "ফাইন্যান্সিয়াল সার্ভিস অটোমেশন",
    quoteEn:
      "Predictive royalty forecasting gave us confidence to scale pricing while staying fair to diaspora SMEs.",
    quoteBn:
      "প্রেডিক্টিভ রয়্যালটি পূর্বাভাস আমাদের দাম বাড়াতে সাহস দিয়েছে—প্রবাসী এসএমইদের প্রতি ন্যায্য থেকেও।",
    revenue: "$22K recurring",
    revenueBn: "মাসিক পুনরাবৃত্ত $২২ হাজার",
    prompts: "41 regulatory prompts",
    promptsBn: "৪১টি রেগুলেটরি প্রম্পট",
    sectors: "Fintech • Microfinance • Islamic Banking",
    sectorsBn: "ফিনটেক • মাইক্রোফাইন্যান্স • ইসলামিক ব্যাংকিং",
  },
  {
    id: "canvas",
    name: "Canvas Collective",
    nameBn: "ক্যানভাস কালেকটিভ",
    location: "Rajshahi → London",
    locationBn: "রাজশাহী → লন্ডন",
    industry: "Media localisation",
    industryBn: "মিডিয়া লোকালাইজেশন",
    quoteEn:
      "Our cinematic prompts now run in 14 countries. Revenue split transparency keeps every collaborator inspired.",
    quoteBn:
      "আমাদের সিনেমাটিক প্রম্পট এখন ১৪ দেশে ব্যবহৃত। স্বচ্ছ রেভিনিউ ভাগাভাগি প্রতিটি সহযোগীকে অনুপ্রাণিত রাখে।",
    revenue: "$29K hybrid",
    revenueBn: "হাইব্রিড আয় $২৯ হাজার",
    prompts: "52 streaming prompts",
    promptsBn: "৫২টি স্ট্রিমিং প্রম্পট",
    sectors: "Broadcast • Streaming • Culture",
    sectorsBn: "ব্রডকাস্ট • স্ট্রিমিং • সংস্কৃতি",
  },
];

const highlightItems = [
  { en: "Prompt Commerce Cohort 2025", bn: "প্রম্পট কমার্স কোহর্ট ২০২৫" },
  { en: "72h payout track record", bn: "৭২ ঘণ্টার পেআউট রেকর্ড" },
  { en: "Global rights-managed catalog", bn: "গ্লোবাল রাইটস-ম্যানেজড ক্যাটালগ" },
];

const operatingSystemFeatures = [
  {
    en: "360° analytics dashboard",
    bn: "৩৬০° অ্যানালিটিক্স ড্যাশবোর্ড",
  },
  {
    en: "Trust badges & SOC 2 documentation",
    bn: "ট্রাস্ট ব্যাজ ও SOC 2 ডকুমেন্টেশন",
  },
  {
    en: "Royalty simulator with currency switch",
    bn: "কারেন্সি সুইচসহ রয়্যালটি সিমুলেটর",
  },
];

const PromptTemplates = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [activeCreatorId, setActiveCreatorId] = useState(creators[0].id);
  const activeCreator = creators.find((creator) => creator.id === activeCreatorId) ?? creators[0];

  return (
    <section id="creators" className="section">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <p className="section-eyebrow">{isEnglish ? "Creator Success Stories" : "ক্রিয়েটর সফলতার গল্প"}</p>
            <h2 className="section-heading">
              {isEnglish ? "From Dhaka studios to global boardrooms." : "ঢাকার স্টুডিও থেকে বিশ্বব্যাপী বোর্ডরুমে।"}
            </h2>
            <p className="section-subheading">
              {isEnglish
                ? "Spotlight journeys showing how Bengali prompt creators package expertise, grow recurring revenue, and earn trust from international buyers."
                : "বাংলাভাষী প্রম্পট নির্মাতারা কীভাবে অভিজ্ঞতাকে প্যাকেজ করছেন, পুনরাবৃত্ত আয় বাড়াচ্ছেন এবং বৈশ্বিক ক্রেতাদের আস্থা অর্জন করছেন—সেসব বাস্তব যাত্রার আলোকপাত।"}
            </p>

            <div className="glass-panel rounded-[2rem] p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                {highlightItems.map((item, index) => (
                  <span key={item.en} className="flex items-center gap-3 text-muted-foreground">
                    <span>{isEnglish ? item.en : item.bn}</span>
                    {index < highlightItems.length - 1 && (
                      <span className="text-muted-foreground/60">•</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-muted-foreground/20 bg-background/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">
                  {isEnglish ? activeCreator.name : activeCreator.nameBn}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {isEnglish ? activeCreator.location : activeCreator.locationBn}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isEnglish ? activeCreator.industry : activeCreator.industryBn}
                </p>

                <blockquote className="mt-6 border-l-4 border-primary/60 pl-4 text-sm leading-relaxed text-foreground">
                  “{isEnglish ? activeCreator.quoteEn : activeCreator.quoteBn}”
                </blockquote>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-primary/10 p-4 text-sm font-medium text-primary">
                    <p className="text-foreground">
                      {isEnglish ? activeCreator.revenue : activeCreator.revenueBn}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-secondary/20 p-4 text-sm font-medium text-secondary">
                    <p className="text-foreground">
                      {isEnglish ? activeCreator.prompts : activeCreator.promptsBn}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-accent/15 p-4 text-sm font-medium text-accent">
                    <p className="text-foreground">
                      {isEnglish ? activeCreator.sectors : activeCreator.sectorsBn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">
                  {isEnglish ? "Select a creator journey" : "একজন ক্রিয়েটরের যাত্রা বেছে নিন"}
                </h3>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {isEnglish
                  ? "Choose from the spotlight journeys to explore playbooks, revenue dashboards, and enterprise references."
                  : "স্পটলাইট জার্নি বেছে নিয়ে প্লেবুক, রেভিনিউ ড্যাশবোর্ড ও এন্টারপ্রাইজ রেফারেন্স দেখুন।"}
              </p>

              <div className="mt-6 grid gap-3">
                {creators.map((creator) => {
                  const isActive = creator.id === activeCreatorId;
                  return (
                    <button
                      key={creator.id}
                      type="button"
                      onClick={() => setActiveCreatorId(creator.id)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                        isActive
                          ? "border-transparent bg-primary text-white shadow-[var(--shadow-soft)]"
                          : "border-muted-foreground/30 bg-white/50 text-foreground hover:border-muted-foreground/60"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {isEnglish ? creator.name : creator.nameBn}
                        </p>
                        <p className={`text-xs ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                          {isEnglish ? creator.location : creator.locationBn}
                        </p>
                      </div>
                      <PlayCircle className="h-5 w-5" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <h3 className="text-base font-semibold text-foreground">
                {isEnglish ? "Creator Operating System" : "ক্রিয়েটর অপারেটিং সিস্টেম"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {isEnglish
                  ? "Access revenue forecasting, compliance vaults, and co-marketing playbooks curated for Bengali-first storytellers."
                  : "বাঙালি গল্পকারদের জন্য রেভিনিউ পূর্বাভাস, কমপ্লায়েন্স ভল্ট ও কো-মার্কেটিং প্লেবুক এখন এক প্ল্যাটফর্মে।"}
              </p>
              <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                {operatingSystemFeatures.map((feature) => (
                  <div key={feature.en} className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-3">
                    {isEnglish ? feature.en : feature.bn}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptTemplates;
