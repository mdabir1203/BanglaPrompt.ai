import React, { Suspense } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import SEOHead from "@/components/SEOHead";
import RootLayout from "@/components/RootLayout";
import GlobalCommunity from "@/components/GlobalCommunity";
import { LazyPromptTemplates } from "@/components/LazyComponents";
import { useLanguage } from "@/contexts/LanguageContext";

const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
  </div>
);

const Creators = () => {
  useAnalytics();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <SEOHead
        title="Creator Hub | PromptBazar.AI"
        description="Design storefronts, package bilingual prompt templates, and connect with the PromptBazar.AI community."
        url="https://promptbazaar.ai/creators"
      />
      <RootLayout>
        <section className="section pb-0">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <p className="section-eyebrow">
              {isEnglish ? "Creator hub" : "ক্রিয়েটর হাব"}
            </p>
            <h1 className="section-heading">
              {isEnglish
                ? "Launch and scale bilingual prompt storefronts"
                : "দ্বিভাষিক প্রম্পট স্টোরফ্রন্ট চালু ও স্কেল করুন"}
            </h1>
            <p className="section-subheading mt-4 text-muted-foreground">
              {isEnglish
                ? "Access templates, workflows, and community data to grow as a PromptBazar.AI creator."
                : "PromptBazar.AI ক্রিয়েটর হিসেবে এগিয়ে যেতে টেমপ্লেট, ওয়ার্কফ্লো ও কমিউনিটি ডেটা ব্যবহার করুন।"}
            </p>
          </div>
        </section>
        <Suspense fallback={<SectionLoader />}>
          <LazyPromptTemplates />
        </Suspense>
        <GlobalCommunity />
      </RootLayout>
    </>
  );
};

export default Creators;
