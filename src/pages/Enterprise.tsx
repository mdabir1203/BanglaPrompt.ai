import React, { Suspense } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import SEOHead from "@/components/SEOHead";
import RootLayout from "@/components/RootLayout";
import { LazyAbout } from "@/components/LazyComponents";
import { useLanguage } from "@/contexts/LanguageContext";

const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
  </div>
);

const Enterprise = () => {
  useAnalytics();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <SEOHead
        title="Enterprise Solutions | PromptBazar.AI"
        description="Assess compliance, localisation, and deployment workflows crafted for enterprise AI teams in Bangladesh and beyond."
        url="https://promptbazaar.ai/enterprise"
      />
      <RootLayout>
        <section className="section pb-0">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <p className="section-eyebrow">
              {isEnglish ? "Enterprise" : "এন্টারপ্রাইজ"}
            </p>
            <h1 className="section-heading">
              {isEnglish
                ? "Compliance, procurement, and localisation pathways"
                : "কমপ্লায়েন্স, প্রোকিউরমেন্ট ও লোকালাইজেশনের পথ"}
            </h1>
            <p className="section-subheading mt-4 text-muted-foreground">
              {isEnglish
                ? "Equip enterprise stakeholders with audit trails, bilingual packaging, and governance-ready tooling."
                : "এন্টারপ্রাইজ স্টেকহোল্ডারদের জন্য অডিট ট্রেইল, দ্বিভাষিক প্যাকেজিং ও গভর্নেন্স-প্রস্তুত টুলিং সরবরাহ করুন।"}
            </p>
          </div>
        </section>
        <Suspense fallback={<SectionLoader />}>
          <LazyAbout />
        </Suspense>
      </RootLayout>
    </>
  );
};

export default Enterprise;
