import React from 'react';
import AdsterraAds from './AdsterraAds';

interface OptimizedAdLayoutProps {
  children: React.ReactNode;
}

const OptimizedAdLayout: React.FC<OptimizedAdLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 py-8">
        {children}

        <div className="my-12">
          <AdsterraAds format="native" className="max-w-2xl mx-auto" />
        </div>
      </div>

      <AdsterraAds format="social-bar" />
    </div>
  );
};

export default OptimizedAdLayout;
