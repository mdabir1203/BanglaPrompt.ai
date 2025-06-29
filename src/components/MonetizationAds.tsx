
import React from 'react';
import GoogleAd from './GoogleAd';

interface MonetizationAdsProps {
  placement: 'header' | 'sidebar' | 'content' | 'footer' | 'mobile';
  className?: string;
}

const MonetizationAds: React.FC<MonetizationAdsProps> = ({ placement, className = '' }) => {
  const getAdConfig = () => {
    switch (placement) {
      case 'header':
        return {
          slot: '1234567890',
          format: 'auto' as const,
          className: 'mb-6'
        };
      case 'sidebar':
        return {
          slot: '2345678901',
          format: 'vertical' as const,
          className: 'sticky top-4'
        };
      case 'content':
        return {
          slot: '3456789012',
          format: 'rectangle' as const,
          className: 'my-8'
        };
      case 'footer':
        return {
          slot: '4567890123',
          format: 'auto' as const,
          className: 'mt-6'
        };
      case 'mobile':
        return {
          slot: '5678901234',
          format: 'fluid' as const,
          className: 'block md:hidden my-4'
        };
      default:
        return {
          slot: '1234567890',
          format: 'auto' as const,
          className: ''
        };
    }
  };

  const adConfig = getAdConfig();

  return (
    <div className={`monetization-ad ${adConfig.className} ${className}`}>
      <GoogleAd 
        slot={adConfig.slot} 
        format={adConfig.format}
        className="w-full"
      />
      
      {/* Native ad placeholder for better monetization */}
      <div className="text-center text-xs text-gray-500 mt-2 font-bengali">
        বিজ্ঞাপন
      </div>
    </div>
  );
};

export default MonetizationAds;
