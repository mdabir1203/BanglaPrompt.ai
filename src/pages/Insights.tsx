import React from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import SEOHead from "@/components/SEOHead";
import RootLayout from "@/components/RootLayout";
import InsightsHub from "@/components/InsightsHub";
import { useLanguage } from "@/contexts/LanguageContext";

const Insights = () => {
  useAnalytics();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <>
      <SEOHead
        title="Insights & Research | PromptBazar.AI"
        description="Download research, playbooks, and measurement frameworks for Bengali AI localisation and marketplace growth."
        url="https://promptbazaar.ai/insights"
      />
      <RootLayout>
        <section className="section pb-0">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <p className="section-eyebrow">
              {isEnglish ? "Insights" : "ইনসাইটস"}
            </p>
            <h1 className="section-heading">
              {isEnglish
                ? "Research and measurement for Bengali AI"
                : "বাংলা এআইয়ের জন্য গবেষণা ও মেজারমেন্ট"}
            </h1>
            <p className="section-subheading mt-4 text-muted-foreground">
              {isEnglish
                ? "Stay ahead with localisation reports, governance templates, and performance benchmarks."
                : "লোকালাইজেশন রিপোর্ট, গভর্নেন্স টেমপ্লেট ও পারফরম্যান্স বেঞ্চমার্কের মাধ্যমে এগিয়ে থাকুন।"}
            </p>
          </div>
        </section>
        <InsightsHub />
      </RootLayout>
    </>
  );
};

export default Insights;
