import React from "react";
import { Link } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import SEOHead from "@/components/SEOHead";
import SecurityHeaders from "@/components/SecurityHeaders";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import Hero from "@/components/Hero";
import FinalCTA from "@/components/FinalCTA";
import CreatorToolsShowcase from "@/components/CreatorToolsShowcase";
import RootLayout from "@/components/RootLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const discoveryLinks = [
  {
    to: "/marketplace",
    titleEn: "Marketplace",
    titleBn: "মার্কেটপ্লেস",
    descriptionEn: "Discover curated Bengali-first prompts and industry bundles.",
    descriptionBn: "বাংলা-প্রথম কিউরেটেড প্রম্পট ও ইন্ডাস্ট্রি বান্ডেল আবিষ্কার করুন।",
  },
  {
    to: "/exchange",
    titleEn: "Live bidding",
    titleBn: "লাইভ বিডিং",
    descriptionEn: "Match demand with real-time liquidity signals from verified buyers.",
    descriptionBn: "যাচাইকৃত ক্রেতাদের রিয়েল-টাইম চাহিদা সংকেতের সাথে লেনদেন মিল করুন।",
  },
  {
    to: "/creators",
    titleEn: "Creator hub",
    titleBn: "ক্রিয়েটর হাব",
    descriptionEn: "Package storefronts, prompt templates, and global launch playbooks.",
    descriptionBn: "স্টোরফ্রন্ট, প্রম্পট টেমপ্লেট ও গ্লোবাল লঞ্চ প্লেবুক সাজিয়ে তুলুন।",
  },
  {
    to: "/enterprise",
    titleEn: "Enterprise",
    titleBn: "এন্টারপ্রাইজ",
    descriptionEn: "Review compliance, localisation, and integration paths for teams.",
    descriptionBn: "টিমের জন্য কমপ্লায়েন্স, লোকালাইজেশন ও ইন্টিগ্রেশন পথ মূল্যায়ন করুন।",
  },
  {
    to: "/pricing",
    titleEn: "Pricing",
    titleBn: "প্রাইসিং",
    descriptionEn: "Model revenue splits, subscriptions, and predictive royalty flows.",
    descriptionBn: "রাজস্ব ভাগ, সাবস্ক্রিপশন ও প্রেডিক্টিভ রয়্যালটির পরিকল্পনা করুন।",
  },
  {
    to: "/insights",
    titleEn: "Insights",
    titleBn: "ইনসাইটস",
    descriptionEn: "Download research on the 2025 Bengali creator economy and AI ops.",
    descriptionBn: "২০২৫ বাংলা ক্রিয়েটর ইকোনমি ও এআই অপারেশনের গবেষণা ডাউনলোড করুন।",
  },
];

const Index = () => {
  useAnalytics();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <SEOHead />
      <SecurityHeaders />
      <PerformanceOptimizer />
      <RootLayout>
        <Hero />
        <section className="section bg-gradient-to-b from-white via-white to-muted/20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-eyebrow">
                {isEnglish ? "Explore the platform" : "প্ল্যাটফর্ম অন্বেষণ করুন"}
              </p>
              <h2 className="section-heading">
                {isEnglish
                  ? "Structured routes for every team"
                  : "প্রতিটি টিমের জন্য সাজানো পথ"}
              </h2>
              <p className="section-subheading mt-4 text-muted-foreground">
                {isEnglish
                  ? "Navigate focused pages for marketplace discovery, bidding intelligence, creator tooling, enterprise compliance, and customer care."
                  : "মার্কেটপ্লেস, বিডিং ইন্টেলিজেন্স, ক্রিয়েটর টুলিং, এন্টারপ্রাইজ কমপ্লায়েন্স ও সাপোর্টের জন্য আলাদা পৃষ্ঠায় দ্রুত পৌঁছে যান।"}
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {discoveryLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-emerald-100/60 bg-white/90 p-6 text-left shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] focus-visible:outline focus-visible:outline-emerald-500/60 focus-visible:outline-offset-2"
                >
                  <div className="space-y-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700/80">
                      {isEnglish ? "Navigate" : "ন্যাভিগেট"}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {isEnglish ? item.titleEn : item.titleBn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isEnglish ? item.descriptionEn : item.descriptionBn}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    {isEnglish ? "View page" : "পৃষ্ঠা দেখুন"}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <CreatorToolsShowcase />
        <FinalCTA />
      </RootLayout>
    </>
  );
};

export default Index;
