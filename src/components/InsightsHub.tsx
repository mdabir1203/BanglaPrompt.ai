import { FileText, Library, NotebookPen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const resources = [
  {
    titleEn: "2025 Generative AI Localization Report",
    titleBn: "২০২৫ জেনারেটিভ এআই লোকালাইজেশন রিপোর্ট",
    summaryEn:
      "Benchmarking AI prompt adoption across South Asia, MENA, and diaspora regions with case studies from telecom, retail, and finance.",
    summaryBn:
      "দক্ষিণ এশিয়া, মেনা ও প্রবাসী বাজারে এআই প্রম্পট ব্যবহারের বেঞ্চমার্ক—টেলিকম, রিটেল ও ফাইন্যান্স কেস স্টাডি সহ।",
    link: "#",
    icon: FileText,
  },
  {
    titleEn: "Creator Economy Benchmarks",
    titleBn: "ক্রিয়েটর ইকোনমি বেঞ্চমার্ক",
    summaryEn:
      "Revenue, retention, and collaboration metrics for Bengali-first creators operating on global stages.",
    summaryBn:
      "গ্লোবাল প্ল্যাটফর্মে কাজ করা বাংলা নির্মাতাদের রেভিনিউ, রিটেনশন ও সহযোগিতার মেট্রিকস।",
    link: "#",
    icon: Library,
  },
  {
    titleEn: "Responsible AI Handbook",
    titleBn: "রেসপনসিবল এআই হ্যান্ডবুক",
    summaryEn:
      "Policy templates, ethical guidelines, and consent frameworks co-authored with Bangladeshi legal partners.",
    summaryBn:
      "বাংলাদেশি লিগ্যাল পার্টনারদের সাথে তৈরি নীতিমালা টেমপ্লেট, নৈতিক নির্দেশিকা ও সম্মতি কাঠামো।",
    link: "#",
    icon: NotebookPen,
  },
];

const InsightsHub = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <section id="insights" className="section bg-gradient-to-b from-background to-primary/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">{isEnglish ? "Insights & Research" : "ইনসাইটস ও রিসার্চ"}</p>
          <h2 className="section-heading">
            {isEnglish
              ? "Intelligence hub for the Bengali prompt economy."
              : "বাংলা প্রম্পট অর্থনীতির ইন্টেলিজেন্স হাব।"}
          </h2>
          <p className="section-subheading mx-auto mt-6">
            {isEnglish
              ? "Strategic research grounded in product rigour and cultural intelligence—built to help teams scale prompt commerce responsibly."
              : "পণ্যের নিখুঁততা ও সাংস্কৃতিক বুদ্ধিমত্তার মেলবন্ধনে তৈরি কৌশলগত রিসার্চ—যা টিমগুলোকে দায়িত্বশীলভাবে প্রম্পট কমার্স স্কেল করতে সহায়তা করে।"}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.titleEn}
              href={resource.link}
              className="group rounded-[2rem] border border-white/60 bg-white/80 p-6 text-left shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <resource.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {isEnglish ? resource.titleEn : resource.titleBn}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {isEnglish ? resource.summaryEn : resource.summaryBn}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {isEnglish ? "Download briefing" : "ব্রিফিং ডাউনলোড"}
                <span aria-hidden>→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsHub;
