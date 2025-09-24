import React, { Suspense } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import SEOHead from "@/components/SEOHead";
import RootLayout from "@/components/RootLayout";
import Features from "@/components/Features";
import { LazyAdvancedPatterns } from "@/components/LazyComponents";
import { useLanguage } from "@/contexts/LanguageContext";

const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
  </div>
);

const Marketplace = () => {
  useAnalytics();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <SEOHead
        title="Marketplace | PromptBazar.AI"
        description="Explore curated Bengali-first AI prompts, storefront capabilities, and marketplace intelligence tailored for creators and buyers."
        url="https://promptbazaar.ai/marketplace"
      />
      <RootLayout>
        <section className="section pb-0">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <p className="section-eyebrow">
              {isEnglish ? "Marketplace" : "মার্কেটপ্লেস"}
            </p>
            <h1 className="section-heading">
              {isEnglish
                ? "Curated Bengali-first prompt commerce"
                : "বাংলা-প্রথম কিউরেটেড প্রম্পট কমার্স"}
            </h1>
            <p className="section-subheading mt-4 text-muted-foreground">
              {isEnglish
                ? "Review the marketplace value pillars, bidding analytics, and prompt discovery flows that power PromptBazar.AI."
                : "PromptBazar.AI-এর মার্কেটপ্লেসের ভ্যালু পিলার, বিডিং অ্যানালিটিক্স এবং প্রম্পট ডিসকভারি ফ্লো সম্পর্কে জানুন।"}
            </p>
          </div>
        </section>
        <Features />
        <Suspense fallback={<SectionLoader />}>
          <LazyAdvancedPatterns />
        </Suspense>
      </RootLayout>
    </>
  );
};

export default Marketplace;
