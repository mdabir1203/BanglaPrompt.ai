import React, { useEffect } from 'react';

interface AdsterraAdProps {
  format: 'native' | 'social-bar';
  className?: string;
}

const SOCIAL_BAR_ZONE = 'YOUR_SOCIAL_BAR_ZONE';
const NATIVE_BANNER_ZONE = 'YOUR_NATIVE_BANNER_ZONE';

const AdsterraAds: React.FC<AdsterraAdProps> = ({ format, className = '' }) => {
  useEffect(() => {
    if (format === 'social-bar') {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js','${SOCIAL_BAR_ZONE}',document.head);
      `;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [format]);

  if (format === 'social-bar') {
    return (
      <div
        id="adsterra-social-bar"
        className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}
        data-zone={SOCIAL_BAR_ZONE}
      />
    );
  }

  return (
    <div className={`adsterra-native ${className}`}>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key' : '${NATIVE_BANNER_ZONE}',
              'format' : 'iframe',
              'height' : 300,
              'width' : 300,
              'params' : {}
            };
          `,
        }}
      />
      <script
        type="text/javascript"
        src={`//www.topcreativeformat.com/${NATIVE_BANNER_ZONE}/invoke.js`}
      />
      <div className="text-center text-xs text-muted-foreground mt-2 font-bengali">
        স্পনসর্ড কন্টেন্ট
      </div>
    </div>
  );
};

export default AdsterraAds;
