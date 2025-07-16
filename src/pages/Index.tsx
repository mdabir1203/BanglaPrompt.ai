import React, { Suspense } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { LoadTester } from "@/components/LoadTester";
import SEOHead from "@/components/SEOHead";
import SecurityHeaders from "@/components/SecurityHeaders";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OptimizedAdLayout from "@/components/OptimizedAdLayout";
import CookieConsent from "@/components/CookieConsent";
import { 
  LazyAdvancedPatterns, 
  LazyPromptTemplates, 
  LazyAbout, 
  LazyContact,
  LazyMediumSubscriptionPopup,
  LazyNewsletterConversionPopup
} from "@/components/LazyComponents";
import Footer from "@/components/Footer";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  // Initialize analytics tracking
  useAnalytics();
  
  return (
    <div className="min-h-screen">
      <SEOHead />
      <SecurityHeaders />
      <PerformanceOptimizer />
      
      <OptimizedAdLayout>
        <Navbar />
        <Hero />
        <Features />
        
        {/* Lazy loaded components for better performance */}
        <Suspense fallback={<LoadingFallback />}>
          <LazyAdvancedPatterns />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <LazyPromptTemplates />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <LazyAbout />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <LazyContact />
        </Suspense>
        
        {/* Load Testing Dashboard */}
        <LoadTester />
        
        <Footer />
      </OptimizedAdLayout>
      
      {/* GDPR Cookie Consent */}
      <CookieConsent />
      
      {/* Lazy loaded popups */}
      <Suspense fallback={null}>
        <LazyMediumSubscriptionPopup />
      </Suspense>
      
      <Suspense fallback={null}>
        <LazyNewsletterConversionPopup />
      </Suspense>
    </div>
  );
};

export default Index;
