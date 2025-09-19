import { useState } from "react";
import { BarChart3, Building2, ShieldCheck } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

const enterpriseTracks = [
  {
    key: "ops",
    icon: Building2,
    titleEn: "Multilingual Prompt Ops",
    titleBn: "মাল্টিলিঙ্গুয়াল প্রম্পট অপারেশন",
    descriptionEn:
      "Deploy curated prompt libraries across South Asia, the Middle East, and diaspora markets with governance guardrails and co-creation workflows.",
    descriptionBn:
      "দক্ষিণ এশিয়া, মধ্যপ্রাচ্য ও প্রবাসী বাজারে শাসনব্যবস্থা ও কো-ক্রিয়েশন ওয়ার্কফ্লোসহ কিউরেটেড প্রম্পট লাইব্রেরি চালু করুন।",
    highlights: [
      "Localized tone packs for English, Bangla, Arabic, Hindi",
      "Role-based access with SOC 2-ready audit logs",
      "Enterprise SLA with 24/7 bilingual concierge",
    ],
    highlightsBn: [
      "ইংরেজি, বাংলা, আরবি, হিন্দির জন্য টোন প্যাক",
      "রোল-ভিত্তিক অ্যাক্সেস ও SOC 2-রেডি অডিট লগ",
      "২৪/৭ দ্বিভাষিক কনসিয়ার্জসহ এন্টারপ্রাইজ SLA",
    ],
  },
  {
    key: "compliance",
    icon: ShieldCheck,
    titleEn: "Compliance Toolkit",
    titleBn: "কমপ্লায়েন্স টুলকিট",
    descriptionEn:
      "Mitigate risk with embedded legal reviews, consent capture, and GDPR/SR5K-ready documentation.",
    descriptionBn:
      "নির্মিত লিগ্যাল রিভিউ, সম্মতি সংগ্রহ ও GDPR/SR5K ডকুমেন্টেশন দিয়ে ঝুঁকি কমান।",
    highlights: [
      "Dynamic PII masking with cultural context",
      "Responsible AI playbooks co-written with Dhaka legal partners",
      "Localized procurement decks for Fortune 500 teams",
    ],
    highlightsBn: [
      "সাংস্কৃতিক প্রেক্ষাপটসহ ডায়নামিক PII মাস্কিং",
      "ঢাকার আইন বিশেষজ্ঞদের সঙ্গে তৈরি রেসপনসিবল AI প্লেবুক",
      "ফর্চুন ৫০০ টিমের জন্য লোকালাইজড প্রোকিউরমেন্ট ডেক",
    ],
  },
  {
    key: "analytics",
    icon: BarChart3,
    titleEn: "Analytics & Governance",
    titleBn: "অ্যানালিটিক্স ও গভর্নেন্স",
    descriptionEn:
      "Monitor impact through predictive dashboards, localization insights, and collaborative performance reviews.",
    descriptionBn:
      "প্রেডিক্টিভ ড্যাশবোর্ড, লোকালাইজেশন ইনসাইট ও যৌথ পারফরম্যান্স রিভিউ দিয়ে প্রভাব পরিমাপ করুন।",
    highlights: [
      "Cross-market benchmarking for 70+ countries",
      "Creator-enterprise shared KPI cockpit",
      "Currency-aware royalty and usage forecasting",
    ],
    highlightsBn: [
      "৭০+ দেশের ক্রস-মার্কেট বেঞ্চমার্ক",
      "ক্রিয়েটর ও এন্টারপ্রাইজের যৌথ KPI ককপিট",
      "কারেন্সি সংবেদনশীল রয়্যালটি ও ব্যবহারের পূর্বাভাস",
    ],
  },
];

const complianceBadges = [
  { labelEn: "GDPR Ready", labelBn: "GDPR প্রস্তুত" },
  { labelEn: "ISO 27001", labelBn: "ISO 27001" },
  { labelEn: "SOC 2", labelBn: "SOC 2" },
  { labelEn: "Bangladesh Data Protection", labelBn: "বাংলাদেশ ডেটা প্রোটেকশন" },
];

const About = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [activeTrack, setActiveTrack] = useState(enterpriseTracks[0].key);
  const track = enterpriseTracks.find((item) => item.key === activeTrack) ?? enterpriseTracks[0];

  return (
    <section id="enterprise" className="section bg-gradient-to-b from-primary/5 via-transparent to-background">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <p className="section-eyebrow">{isEnglish ? "Enterprise Solutions" : "এন্টারপ্রাইজ সল্যুশন"}</p>
            <h2 className="section-heading">
              {isEnglish
                ? "Cultural intelligence with enterprise rigour."
                : "সাংস্কৃতিক বুদ্ধিমত্তা, এন্টারপ্রাইজ কঠোরতার সাথে।"}
            </h2>
            <p className="section-subheading">
              {isEnglish
                ? "Launch culturally fluent AI experiences across South Asia, the Middle East, and diaspora markets with audit-grade oversight."
                : "দক্ষিণ এশিয়া, মধ্যপ্রাচ্য ও প্রবাসী বাজারে সাংস্কৃতিকভাবে প্রাসঙ্গিক এআই অভিজ্ঞতা চালু করুন, অডিটযোগ্য নজরদারির নিশ্চয়তাসহ।"}
            </p>

            <div className="glass-panel rounded-[2rem] p-8">
              <div className="grid gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
                {complianceBadges.map((badge) => (
                  <span key={badge.labelEn} className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-center shadow-sm">
                    {isEnglish ? badge.labelEn : badge.labelBn}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                {isEnglish
                  ? "Each enterprise deployment includes bilingual onboarding, governance workshops, and white-glove migration from legacy prompt repositories."
                  : "প্রতিটি এন্টারপ্রাইজ ডিপ্লয়মেন্টে থাকে অনবোর্ডিং, গভর্নেন্স ওয়ার্কশপ এবং লেগেসি প্রম্পট রিপোজিটরি থেকে হোয়াইট-গ্লাভ মাইগ্রেশন।"}
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
            <div className="flex flex-wrap gap-2">
              {enterpriseTracks.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTrack(item.key)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    activeTrack === item.key
                      ? "bg-primary text-white shadow-[var(--shadow-soft)]"
                      : "bg-white text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isEnglish ? item.titleEn : item.titleBn}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-muted-foreground/20 bg-background/80 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <track.icon className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  {isEnglish ? track.titleEn : track.titleBn}
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {isEnglish ? track.descriptionEn : track.descriptionBn}
              </p>

              <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                {(isEnglish ? track.highlights : track.highlightsBn).map((highlight) => (
                  <div key={highlight} className="rounded-2xl border border-muted-foreground/20 bg-white/80 p-3">
                    <p className="text-foreground">{highlight}</p>
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

export default About;
