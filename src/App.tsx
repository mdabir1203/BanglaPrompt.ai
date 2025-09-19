import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createScopedLogger } from "@/lib/logger";
import EnvironmentDebug from "@/components/EnvironmentDebug";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";
import {
  LazyMediumSubscriptionPopup,
  LazyNewsletterConversionPopup,
} from "@/components/LazyComponents";

const Index = React.lazy(() => import("./pages/Index"));
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const Exchange = React.lazy(() => import("./pages/Exchange"));
const Creators = React.lazy(() => import("./pages/Creators"));
const Enterprise = React.lazy(() => import("./pages/Enterprise"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Insights = React.lazy(() => import("./pages/Insights"));
const Support = React.lazy(() => import("./pages/Support"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = React.lazy(() => import("./pages/CookiePolicy"));
const CommunityPrompts = React.lazy(() => import("./pages/Community/Prompts"));
const SubmitPrompt = React.lazy(() => import("./pages/Community/SubmitPrompt"));
const ToolsMarketplace = React.lazy(() => import("./pages/ToolsMarketplace"));
const CreatorDashboard = React.lazy(() => import("./pages/CreatorPortal/Dashboard"));
const CreatorOnboarding = React.lazy(() => import("./pages/CreatorPortal/Onboarding"));
const CreatorSubmitTool = React.lazy(() => import("./pages/CreatorPortal/SubmitTool"));

// Initialize Google AdSense
const adsLogger = createScopedLogger("adsense");

const initAds = () => {
  try {
    // @ts-expect-error - AdSense global
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    adsLogger.error("Failed to initialize Google AdSense queue", { error: e });
  }
};

// Initialize the query client with optimizations for 1000+ users
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 2,
    },
  },
});

const App = () => {
  // Initialize ads when the component mounts
  useEffect(() => {
    initAds();
  }, []);

  return (
    <HelmetProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <a className="skip-link" href="#main-content">
              Skip to main content
            </a>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<div className="p-4">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/exchange" element={<Exchange />} />
                  <Route path="/creators" element={<Creators />} />
                  <Route path="/enterprise" element={<Enterprise />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/community/prompts" element={<CommunityPrompts />} />
                  <Route path="/community/submit" element={<SubmitPrompt />} />
                  <Route path="/tools" element={<ToolsMarketplace />} />
                  <Route path="/creator/dashboard" element={<CreatorDashboard />} />
                  <Route path="/creator/onboarding" element={<CreatorOnboarding />} />
                  <Route path="/creator/submit" element={<CreatorSubmitTool />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
            <CookieConsent />
            <Suspense fallback={null}>
              <LazyMediumSubscriptionPopup />
            </Suspense>
            <Suspense fallback={null}>
              <LazyNewsletterConversionPopup />
            </Suspense>
            <EnvironmentDebug />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;
