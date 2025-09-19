import React from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import SEOHead from "@/components/SEOHead";
import RootLayout from "@/components/RootLayout";
import PricingTransparency from "@/components/PricingTransparency";
import FinalCTA from "@/components/FinalCTA";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  useAnalytics();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <SEOHead
        title="Pricing & Revenue | PromptBazar.AI"
        description="Understand revenue share, subscription tiers, and payout predictability for PromptBazar.AI creators and buyers."
        url="https://promptbazaar.ai/pricing"
      />
      <RootLayout>
        <section className="section pb-0">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <p className="section-eyebrow">
              {isEnglish ? "Pricing" : "প্রাইসিং"}
            </p>
            <h1 className="section-heading">
              {isEnglish
                ? "Transparent economics for every workflow"
                : "প্রতিটি ওয়ার্কফ্লোর জন্য স্বচ্ছ ইকোনমিকস"}
            </h1>
            <p className="section-subheading mt-4 text-muted-foreground">
              {isEnglish
                ? "Model pricing for prompt bundles, subscriptions, and enterprise licensing with predictive payouts."
                : "প্রম্পট বান্ডেল, সাবস্ক্রিপশন ও এন্টারপ্রাইজ লাইসেন্সিংয়ের জন্য প্রেডিক্টিভ পেআউটসহ প্রাইসিং মডেল করুন।"}
            </p>
          </div>
        </section>
        <PricingTransparency />
        <FinalCTA />
      </RootLayout>
    </>
  );
};

export default Pricing;
