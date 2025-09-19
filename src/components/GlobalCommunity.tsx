import { Globe2, Users } from "lucide-react";

const regions = [
  {
    region: "South Asia",
    regionBn: "দক্ষিণ এশিয়া",
    highlightEn: "Bangladesh, India, Pakistan",
    highlightBn: "বাংলাদেশ, ভারত, পাকিস্তান",
    adoption: "37% of creator base",
    adoptionBn: "ক্রিয়েটর বেসের ৩৭%",
  },
  {
    region: "Middle East",
    regionBn: "মধ্যপ্রাচ্য",
    highlightEn: "Saudi Arabia, UAE, Qatar",
    highlightBn: "সৌদি আরব, ইউএই, কাতার",
    adoption: "Enterprise telco & retail",
    adoptionBn: "এন্টারপ্রাইজ টেলকো ও রিটেল",
  },
  {
    region: "North America",
    regionBn: "উত্তর আমেরিকা",
    highlightEn: "USA, Canada",
    highlightBn: "যুক্তরাষ্ট্র, কানাডা",
    adoption: "Diaspora media & fintech",
    adoptionBn: "প্রবাসী মিডিয়া ও ফিনটেক",
  },
  {
    region: "Europe & UK",
    regionBn: "ইউরোপ ও যুক্তরাজ্য",
    highlightEn: "UK, Germany, Netherlands",
    highlightBn: "যুক্তরাজ্য, জার্মানি, নেদারল্যান্ডস",
    adoption: "Cultural institutions",
    adoptionBn: "সাংস্কৃতিক প্রতিষ্ঠান",
  },
];

const GlobalCommunity = () => {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <p className="section-eyebrow">Global Community</p>
            <h2 className="section-heading">
              Bengali ingenuity powering 70+ countries.
              <span className="block text-xl font-medium text-muted-foreground md:text-2xl">
                ৭০+ দেশে এআই টিমকে শক্তি জোগাচ্ছে বাঙালি উদ্ভাবন।
              </span>
            </h2>
            <p className="section-subheading">
              A global constellation of creators, enterprises, and partners shaping culturally aware AI—bridging Dhaka’s imagination with New York boardrooms and Lagos innovation hubs.
            </p>
            <p className="section-subheading text-muted-foreground">
              একটি বৈশ্বিক নক্ষত্রপুঞ্জ যেখানে নির্মাতা, এন্টারপ্রাইজ ও পার্টনাররা একসাথে সাংস্কৃতিকভাবে সচেতন এআই গড়ছে—ঢাকার কল্পনাকে নিউ ইয়র্কের বোর্ডরুম ও লাগোসের উদ্ভাবনী কেন্দ্রের সাথে যুক্ত করছে।
            </p>

            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="flex items-center gap-3">
                <Globe2 className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">70+ countries • ৭০+ দেশ</p>
                  <p className="text-xs text-muted-foreground">Bengali-first prompt exchanges</p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
                <div className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-4">
                  <p className="text-foreground font-semibold">300+ enterprise teams</p>
                  <p>Fortune 500, telco, fintech</p>
                  <p className="text-muted-foreground">ফরচুন ৫০০, টেলকো, ফিনটেক</p>
                </div>
                <div className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-4">
                  <p className="text-foreground font-semibold">42,000+ prompts</p>
                  <p>Localized to industry & tone</p>
                  <p className="text-muted-foreground">ইন্ডাস্ট্রি ও টোন অনুযায়ী লোকালাইজড</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">Regional adoption heatmap</h3>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Explore how BanglaPrompt.ai is embedded across creative, operational, and compliance teams.
            </p>
            <p className="text-sm text-muted-foreground">
              ক্রিয়েটিভ, অপারেশনাল ও কমপ্লায়েন্স টিমে BanglaPrompt.ai কীভাবে প্রয়োগ হচ্ছে তা জানুন।
            </p>

            <div className="mt-6 grid gap-4">
              {regions.map((region) => (
                <div key={region.region} className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{region.region}</p>
                      <p className="text-xs text-muted-foreground">{region.regionBn}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {region.adoption}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{region.highlightEn}</p>
                  <p className="text-sm text-muted-foreground">{region.highlightBn}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                    {region.adoptionBn}
                  </p>
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
