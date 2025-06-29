
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
      if (adRef.current) {
        // @ts-ignore - Google AdSense global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading Google Ad:', error);
    }
  }, [slot]);

  return (
    <div className={`google-ad ${className}`} ref={adRef}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6185927994614530"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      ></ins>
    </div>
  );
};

export default GoogleAd;
