import React from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AdvancedPatterns from "@/components/AdvancedPatterns";
import PromptTemplates from "@/components/PromptTemplates";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import MediumSubscriptionPopup from "@/components/MediumSubscriptionPopup";
import NewsletterConversionPopup from "@/components/NewsletterConversionPopup";
import OptimizedAdLayout from "@/components/OptimizedAdLayout";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead />
      
      <OptimizedAdLayout>
        <Navbar />
        <Hero />
        <Features />
        <AdvancedPatterns />
        <PromptTemplates />
        <About />
        <Contact />
        <Footer />
      </OptimizedAdLayout>
      
      {/* GDPR Cookie Consent */}
      <CookieConsent />
      
      {/* Medium Subscription Popup */}
      <MediumSubscriptionPopup />
      
      {/* Newsletter Conversion Popup */}
      <NewsletterConversionPopup />
    </div>
  );
};

export default Index;
