import React from 'react';
import AdsterraAds from './AdsterraAds';
import MonetizationAds from './MonetizationAds';

interface OptimizedAdLayoutProps {
  children: React.ReactNode;
}

const OptimizedAdLayout: React.FC<OptimizedAdLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      {/* Header Ad */}
      <div className="w-full bg-muted/30 py-2">
        <div className="container mx-auto px-4">
          <MonetizationAds placement="header" />
        </div>
      </div>

      {/* Main Content with Sidebar Ads */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-4">
              <MonetizationAds placement="sidebar" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {children}

            <div className="my-12">
              <AdsterraAds format="native" className="max-w-2xl mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Ad */}
      <div className="w-full bg-muted/30 py-4 mt-12">
        <div className="container mx-auto px-4">
          <MonetizationAds placement="footer" />
        </div>
      </div>

      {/* Mobile-specific ads */}
      <div className="block lg:hidden">
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <MonetizationAds placement="mobile" />
        </div>
      </div>

      {/* Social Bar */}
      <AdsterraAds format="social-bar" />
    </div>
  );
};

export default OptimizedAdLayout;
