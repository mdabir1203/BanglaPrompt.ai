
import React, { useEffect, useRef } from 'react';

interface GoogleAdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  responsive?: boolean;
  className?: string;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // If the Ad has already been loaded, refresh it
      if (adRef.current && adRef.current.innerHTML !== '') {
        // @ts-ignore - Google AdSense global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading Google Ad:', error);
    }
  }, [slot]);

  return (
    <div className={`google-ad ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1234567890123456" // Replace with your actual AdSense Publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        ref={adRef}
      ></ins>
    </div>
  );
};

export default GoogleAd;
