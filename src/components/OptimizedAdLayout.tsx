import React from 'react';
import AdsterraAds from './AdsterraAds';
import MonetizationAds from './MonetizationAds';

interface OptimizedAdLayoutProps {
  children: React.ReactNode;
}

const OptimizedAdLayout: React.FC<OptimizedAdLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      {/* Header Ad - High CPM Banner */}
      <div className="w-full bg-muted/30 py-2">
        <div className="container mx-auto px-4">
          <AdsterraAds format="banner" placement="header" className="mx-auto" />
        </div>
      </div>

      {/* Main Content with Sidebar Ads */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Native and Banner Ads */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-4 space-y-6">
              {/* Native Ad for better integration */}
              <div className="bg-card border rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 font-bengali">
                  প্রস্তাবিত কন্টেন্ট
                </h3>
                <AdsterraAds format="native" placement="sidebar" />
              </div>

              {/* Traditional Banner */}
              <AdsterraAds format="banner" placement="sidebar" />

              {/* Google AdSense for comparison */}
              <MonetizationAds placement="sidebar" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {children}
            
            {/* In-content ads for better engagement */}
            <div className="my-12">
              <AdsterraAds format="native" placement="content" className="max-w-2xl mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Ad */}
      <div className="w-full bg-muted/30 py-4 mt-12">
        <div className="container mx-auto px-4">
          <AdsterraAds format="banner" placement="footer" className="mx-auto" />
        </div>
      </div>

      {/* Mobile-specific ads */}
      <div className="block lg:hidden">
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <AdsterraAds format="banner" placement="mobile" className="mx-auto" />
        </div>
      </div>

      {/* High-CPM Background Ads */}
      <AdsterraAds format="popunder" placement="content" />
      <AdsterraAds format="social-bar" placement="footer" />
      <AdsterraAds format="in-page-push" placement="content" />
    </div>
  );
};

export default OptimizedAdLayout;