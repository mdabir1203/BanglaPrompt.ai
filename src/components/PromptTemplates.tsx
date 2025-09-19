import { useState } from "react";
import { PlayCircle, Sparkles, TrendingUp } from "lucide-react";

const creators = [
  {
    id: "aurora",
    name: "Aurora Studio",
    nameBn: "অরোরা স্টুডিও",
    location: "Dhaka → Singapore",
    industry: "Enterprise brand storytelling",
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
    industry: "Financial services automation",
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
    industry: "Media localisation",
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

const PromptTemplates = () => {
  const [activeCreatorId, setActiveCreatorId] = useState(creators[0].id);

  const activeCreator = creators.find((creator) => creator.id === activeCreatorId) ?? creators[0];

  return (
    <section id="creators" className="section">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <p className="section-eyebrow">Creator Success Stories</p>
            <h2 className="section-heading">
              From Dhaka studios to global boardrooms.
              <span className="block text-xl font-medium text-muted-foreground md:text-2xl">
                ঢাকার স্টুডিও থেকে বিশ্বব্যাপী বোর্ডরুমে।
              </span>
            </h2>
            <p className="section-subheading">
              Stories curated with Disney-grade narrative arcs and Jobsian refinement, showcasing how Bangla-first creators thrive on a global revenue stage.
            </p>
            <p className="section-subheading text-muted-foreground">
              ডিজনির গল্পের আর্ক ও স্টিভ জবসের মিতব্যয়ী পরিমার্জনে গড়া সাফল্যের কাহিনি—যেখানে বাংলা নির্মাতারা গ্লোবাল আয়ের মঞ্চে দ্যুতি ছড়াচ্ছেন।
            </p>

            <div className="glass-panel rounded-[2rem] p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Imagineering Cohort 2025</span>
                <span className="text-muted-foreground/60">•</span>
                <span>72h payout track record</span>
                <span className="text-muted-foreground/60">•</span>
                <span>Global rights-managed catalog</span>
              </div>

              <div className="mt-6 rounded-2xl border border-muted-foreground/20 bg-background/80 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground">{activeCreator.name}</h3>
                <p className="text-sm font-medium text-primary/80">{activeCreator.nameBn}</p>
                <p className="mt-2 text-sm text-muted-foreground">{activeCreator.location}</p>
                <p className="text-sm text-muted-foreground">{activeCreator.industry}</p>

                <blockquote className="mt-6 space-y-2 border-l-4 border-primary/60 pl-4">
                  <p className="text-sm leading-relaxed text-foreground">“{activeCreator.quoteEn}”</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">“{activeCreator.quoteBn}”</p>
                </blockquote>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-primary/10 p-4 text-sm font-medium text-primary">
                    <p className="text-foreground">{activeCreator.revenue}</p>
                    <p className="text-muted-foreground">{activeCreator.revenueBn}</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/20 p-4 text-sm font-medium text-secondary">
                    <p className="text-foreground">{activeCreator.prompts}</p>
                    <p className="text-muted-foreground">{activeCreator.promptsBn}</p>
                  </div>
                  <div className="rounded-2xl bg-accent/15 p-4 text-sm font-medium text-accent">
                    <p className="text-foreground">{activeCreator.sectors}</p>
                    <p className="text-muted-foreground">{activeCreator.sectorsBn}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">Select a creator journey</h3>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose from the spotlight journeys to explore bilingual playbooks, revenue dashboards, and enterprise references.
              </p>
              <p className="text-sm text-muted-foreground">
                স্পটলাইট জার্নি বেছে নিয়ে দ্বিভাষিক প্লেবুক, রেভিনিউ ড্যাশবোর্ড ও এন্টারপ্রাইজ রেফারেন্স দেখুন।
              </p>

              <div className="mt-6 grid gap-3">
                {creators.map((creator) => (
                  <button
                    key={creator.id}
                    type="button"
                    onClick={() => setActiveCreatorId(creator.id)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                      creator.id === activeCreatorId
                        ? "border-transparent bg-primary text-white shadow-[var(--shadow-soft)]"
                        : "border-muted-foreground/30 bg-white/50 text-foreground hover:border-muted-foreground/60"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{creator.name}</p>
                      <p
                        className={`text-xs ${
                          creator.id === activeCreatorId ? "text-white/80" : "text-muted-foreground"
                        }`}
                      >
                        {creator.nameBn}
                      </p>
                    </div>
                    <PlayCircle className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <h3 className="text-base font-semibold text-foreground">Creator Operating System</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Access revenue forecasting, compliance vaults, and co-marketing playbooks curated for Bengali-first storytellers.
              </p>
              <p className="text-sm text-muted-foreground">
                বাঙালি গল্পকারদের জন্য রেভিনিউ পূর্বাভাস, কমপ্লায়েন্স ভল্ট ও কো-মার্কেটিং প্লেবুক এখন এক প্ল্যাটফর্মে।
              </p>
              <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                <div className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-3">
                  360° analytics dashboard • 360° অ্যানালিটিক্স ড্যাশবোর্ড
                </div>
                <div className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-3">
                  Trust badges & SOC 2 documentation • ট্রাস্ট ব্যাজ ও SOC 2 ডকুমেন্টেশন
                </div>
                <div className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-3">
                  Royalty simulator with currency switch • কারেন্সি সুইচসহ রয়্যালটি সিমুলেটর
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptTemplates;
