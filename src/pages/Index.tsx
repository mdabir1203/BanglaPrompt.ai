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

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead />
      <Navbar />
      <Hero />
      <Features />
      <AdvancedPatterns />
      <PromptTemplates />
      <About />
      <Contact />
      <Footer />
      
      {/* GDPR Cookie Consent */}
      <CookieConsent />
    </div>
  );
};

export default Index;
