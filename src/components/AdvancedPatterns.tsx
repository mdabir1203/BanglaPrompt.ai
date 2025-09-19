import { useMemo, useState } from "react";
import { Globe2, Map, Search } from "lucide-react";

const industries = ["Marketing", "Finance", "Education", "Healthcare", "Media"] as const;
const useCases = ["Campaign", "Insight", "Training", "Service", "Story"] as const;
const models = ["GPT-4.1", "Claude 3", "Gemini Ultra"] as const;

const marketplacePrompts = [
  {
    titleEn: "Dhaka retail festival narrative",
    titleBn: "ঢাকা রিটেল উৎসব কাহিনি",
    descriptionEn:
      "Localized storytelling prompt for launching seasonal retail campaigns across Bangladesh and diaspora hubs.",
    descriptionBn:
      "বাংলাদেশ ও প্রবাসী বাজারে মৌসুমি রিটেল ক্যাম্পেইন চালু করার জন্য লোকালাইজড স্টোরিটেলিং প্রম্পট।",
    industry: "Marketing" as const,
    useCase: "Campaign" as const,
    model: "GPT-4.1" as const,
    region: "Dhaka • Toronto • Dubai",
  },
  {
    titleEn: "Sharia-compliant SME finance advisor",
    titleBn: "শরিয়াহ-সম্মত এসএমই ফাইন্যান্স উপদেষ্টা",
    descriptionEn:
      "Conversational assistant that guides Bangladeshi SMEs through ethical financing instruments with regulatory context.",
    descriptionBn:
      "বাংলাদেশি এসএমই-কে নৈতিক ফাইন্যান্সিং সমাধান বেছে নিতে সহায়তাকারী কথোপকথন-ভিত্তিক সহকারী, প্রাসঙ্গিক নীতিমালা সহ।",
    industry: "Finance" as const,
    useCase: "Service" as const,
    model: "Claude 3" as const,
    region: "Chattogram • Kuala Lumpur • Doha",
  },
  {
    titleEn: "Heritage curriculum co-designer",
    titleBn: "ঐতিহ্যবাহী কারিকুলাম সহ-ডিজাইনার",
    descriptionEn:
      "Lesson co-pilot balancing Bengali literature with global STEM storytelling for blended classrooms.",
    descriptionBn:
      "বাঙালি সাহিত্য ও গ্লোবাল STEM গল্পের ভারসাম্য রেখে ব্লেন্ডেড ক্লাসরুমের জন্য পাঠ পরিকল্পনা সহকারী।",
    industry: "Education" as const,
    useCase: "Training" as const,
    model: "Gemini Ultra" as const,
    region: "Sylhet • London • Singapore",
  },
  {
    titleEn: "Cross-border telehealth navigator",
    titleBn: "সীমান্ত-পার টেলিহেলথ নেভিগেটর",
    descriptionEn:
      "Prompt suite enabling multilingual symptom triage with cultural nuance for caregivers across South Asia.",
    descriptionBn:
      "দক্ষিণ এশিয়ার কেয়ারগিভারদের জন্য বহুভাষিক উপসর্গ মূল্যায়নে সাংস্কৃতিক প্রেক্ষাপট বজায় রাখা প্রম্পট সেট।",
    industry: "Healthcare" as const,
    useCase: "Service" as const,
    model: "GPT-4.1" as const,
    region: "Dhaka • Delhi • Riyadh",
  },
  {
    titleEn: "Diaspora news personalization",
    titleBn: "প্রবাসী সংবাদ ব্যক্তিগতকরণ",
    descriptionEn:
      "Content orchestration for bilingual media rooms serving Bangladeshi audiences across 5 continents.",
    descriptionBn:
      "পাঁচ মহাদেশে বিস্তৃত বাংলাদেশি শ্রোতাদের জন্য দ্বিভাষিক মিডিয়া রুমে কন্টেন্ট সংগঠনের প্রম্পট।",
    industry: "Media" as const,
    useCase: "Insight" as const,
    model: "Claude 3" as const,
    region: "New York • Sydney • Dhaka",
  },
];

const AdvancedPatterns = () => {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState<(typeof industries)[number] | "All">("All");
  const [useCaseFilter, setUseCaseFilter] = useState<(typeof useCases)[number] | "All">("All");
  const [modelFilter, setModelFilter] = useState<(typeof models)[number] | "All">("All");

  const filteredPrompts = useMemo(() => {
    return marketplacePrompts.filter((prompt) => {
      const matchesSearch = `${prompt.titleEn} ${prompt.titleBn} ${prompt.descriptionEn} ${prompt.descriptionBn}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesIndustry = industryFilter === "All" || prompt.industry === industryFilter;
      const matchesUseCase = useCaseFilter === "All" || prompt.useCase === useCaseFilter;
      const matchesModel = modelFilter === "All" || prompt.model === modelFilter;
      return matchesSearch && matchesIndustry && matchesUseCase && matchesModel;
    });
  }, [industryFilter, modelFilter, search, useCaseFilter]);

  const renderFilterGroup = <T extends string>(
    labelEn: string,
    labelBn: string,
    options: readonly T[],
    active: T | "All",
    onSelect: (value: T | "All") => void,
  ) => (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-muted-foreground">
        {labelEn}
        <span className="block text-xs font-medium text-muted-foreground/80">{labelBn}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
            active === "All"
              ? "border-transparent bg-primary text-white shadow-sm"
              : "border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground"
          }`}
          onClick={() => onSelect("All")}
        >
          All
        </button>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              active === option
                ? "border-transparent bg-primary text-white shadow-sm"
                : "border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground"
            }`}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="marketplace" className="section bg-gradient-to-b from-white to-primary/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <p className="section-eyebrow">Marketplace Explorer</p>
            <h2 className="section-heading">
              Discover 42,000+ culturally fluent prompts.
              <span className="block text-xl font-medium text-muted-foreground md:text-2xl">
                ৪২,০০০+ সাংস্কৃতিকভাবে প্রাসঙ্গিক প্রম্পট আবিষ্কার করুন।
              </span>
            </h2>
            <p className="section-subheading">
              Filter by industry, use case, and foundation model to curate the perfect prompt stack. Every listing is verified for linguistic nuance, brand safety, and enterprise readiness.
            </p>
            <p className="section-subheading text-muted-foreground">
              ইন্ডাস্ট্রি, ইউজ কেস ও মডেল অনুযায়ী ফিল্টার করে আপনার প্রয়োজন অনুযায়ী প্রম্পট বাছাই করুন। প্রতিটি লিস্টিং ভাষার সূক্ষ্মতা, ব্র্যান্ড সেফটি ও এন্টারপ্রাইজ মান যাচাই করা।
            </p>

            <div className="grid gap-4 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Globe2 className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Bengali-first, global reach</span>
                <span className="text-muted-foreground/70">•</span>
                <span>EN | বাংলা side-by-side copy for teams.</span>
                <span className="text-muted-foreground/70">•</span>
                <span className="text-foreground">ISO 27001 & GDPR alignment</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Map className="h-5 w-5 text-secondary" />
                <span>Localized tags: Dhaka, Singapore, Dubai, Lagos, New York</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-8">
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-muted-foreground/20 bg-background/60 px-4 py-3">
              <Search className="h-5 w-5 text-primary" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search prompts by industry, tone, or model… / ইন্ডাস্ট্রি, টোন, মডেল দিয়ে খুঁজুন…"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-8">
              {renderFilterGroup("Industry", "ইন্ডাস্ট্রি", industries, industryFilter, setIndustryFilter)}
              {renderFilterGroup("Use Case", "ইউজ কেস", useCases, useCaseFilter, setUseCaseFilter)}
              {renderFilterGroup("Model", "মডেল", models, modelFilter, setModelFilter)}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.map((prompt) => (
            <div key={prompt.titleEn} className="glass-panel flex h-full flex-col gap-4 rounded-3xl p-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {prompt.titleEn}
                  <span className="mt-1 block text-base font-medium text-primary/80">{prompt.titleBn}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{prompt.descriptionEn}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{prompt.descriptionBn}</p>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{prompt.industry}</span>
                <span className="rounded-full bg-secondary/20 px-3 py-1 text-secondary">{prompt.useCase}</span>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-accent">{prompt.model}</span>
                <span className="rounded-full border border-muted-foreground/30 px-3 py-1 text-muted-foreground">
                  {prompt.region}
                </span>
              </div>
            </div>
          ))}

          {filteredPrompts.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-muted-foreground/30 bg-white/70 p-10 text-center text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">No prompts match your filters yet.</p>
              <p className="mt-2">আপনার নির্বাচিত ফিল্টারে কোনো প্রম্পট নেই। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdvancedPatterns;
