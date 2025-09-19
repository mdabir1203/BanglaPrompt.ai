import React, { Suspense } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import SEOHead from "@/components/SEOHead";
import RootLayout from "@/components/RootLayout";
import FinalCTA from "@/components/FinalCTA";
import { LazyContact } from "@/components/LazyComponents";
import { useLanguage } from "@/contexts/LanguageContext";

const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
  </div>
);

const Support = () => {
  useAnalytics();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <SEOHead
        title="Support & Contact | PromptBazar.AI"
        description="Reach the PromptBazar.AI support desk for onboarding, billing, or compliance requests across Bengali and English."
        url="https://promptbazaar.ai/support"
      />
      <RootLayout>
        <section className="section pb-0">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <p className="section-eyebrow">
              {isEnglish ? "Support" : "সাপোর্ট"}
            </p>
            <h1 className="section-heading">
              {isEnglish
                ? "72-hour bilingual support for every partner"
                : "প্রতিটি পার্টনারের জন্য ৭২ ঘণ্টার দ্বিভাষিক সাপোর্ট"}
            </h1>
            <p className="section-subheading mt-4 text-muted-foreground">
              {isEnglish
                ? "Contact our team for onboarding, compliance reviews, marketplace questions, or dedicated enterprise care."
                : "অনবোর্ডিং, কমপ্লায়েন্স রিভিউ, মার্কেটপ্লেস প্রশ্ন বা এন্টারপ্রাইজ সহায়তার জন্য আমাদের টিমের সাথে যোগাযোগ করুন।"}
            </p>
          </div>
        </section>
        <Suspense fallback={<SectionLoader />}>
          <LazyContact />
        </Suspense>
        <FinalCTA />
      </RootLayout>
    </>
  );
};

export default Support;
