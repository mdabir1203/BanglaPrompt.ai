import { FileText, Library, NotebookPen } from "lucide-react";

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
  return (
    <section id="insights" className="section bg-gradient-to-b from-background to-primary/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Insights & Research</p>
          <h2 className="section-heading">
            Intelligence hub for the Bengali prompt economy.
            <span className="block text-xl font-medium text-muted-foreground md:text-2xl">
              বাংলা প্রম্পট অর্থনীতির ইন্টেলিজেন্স হাব।
            </span>
          </h2>
          <p className="section-subheading mx-auto mt-6">
            Strategic research crafted with the meticulousness of Steve Jobs and the narrative richness of Walt Disney—designed to help teams localise responsibly.
          </p>
          <p className="section-subheading mx-auto mt-2 text-muted-foreground">
            স্টিভ জবসের নিখুঁততা ও ওয়াল্ট ডিজনির গল্পের বৈচিত্র্যে তৈরি কৌশলগত রিসার্চ—যা টিমগুলোকে দায়িত্বশীলভাবে লোকালাইজ করতে সাহায্য করে।
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
                {resource.titleEn}
                <span className="mt-1 block text-base font-medium text-primary/80">{resource.titleBn}</span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{resource.summaryEn}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{resource.summaryBn}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Download briefing • ব্রিফিং ডাউনলোড
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
