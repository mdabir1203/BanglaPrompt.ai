import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createScopedLogger } from "@/lib/logger";

const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = React.lazy(() => import("./pages/CookiePolicy"));
const CommunityPrompts = React.lazy(() => import("./pages/Community/Prompts"));
const SubmitPrompt = React.lazy(() => import("./pages/Community/SubmitPrompt"));
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const SellerDashboard = React.lazy(() => import("./pages/SellerDashboard"));

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
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="p-4">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/community/prompts" element={<CommunityPrompts />} />
                <Route path="/community/submit" element={<SubmitPrompt />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/seller" element={<SellerDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
