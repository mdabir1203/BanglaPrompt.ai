import React from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import SEOHead from "@/components/SEOHead";
import RootLayout from "@/components/RootLayout";
import BidExchange from "@/components/BidExchange";
import { useLanguage } from "@/contexts/LanguageContext";

const Exchange = () => {
  useAnalytics();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <SEOHead
        title="Live Bidding Exchange | PromptBazar.AI"
        description="Access real-time bidding dashboards, liquidity signals, and auction workflows for Bengali AI prompts."
        url="https://promptbazaar.ai/exchange"
      />
      <RootLayout>
        <section className="section pb-0">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <p className="section-eyebrow">
              {isEnglish ? "Live bidding" : "লাইভ বিডিং"}
            </p>
            <h1 className="section-heading">
              {isEnglish
                ? "Liquidity intelligence for prompt auctions"
                : "প্রম্পট নিলামের জন্য লিকুইডিটি ইন্টেলিজেন্স"}
            </h1>
            <p className="section-subheading mt-4 text-muted-foreground">
              {isEnglish
                ? "Monitor exchange health, buyer demand, and deal velocity to activate the right prompt bundles."
                : "এক্সচেঞ্জের স্বাস্থ্য, ক্রেতার চাহিদা ও চুক্তির গতি পর্যবেক্ষণ করে সঠিক প্রম্পট বান্ডেল সক্রিয় করুন।"}
            </p>
          </div>
        </section>
        <BidExchange />
      </RootLayout>
    </>
  );
};

export default Exchange;
