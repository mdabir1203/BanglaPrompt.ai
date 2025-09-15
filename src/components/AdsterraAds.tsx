import React, { useEffect } from 'react';

interface AdsterraAdProps {
  format: 'banner' | 'native' | 'popunder' | 'social-bar' | 'in-page-push' | 'interstitial';
  placement: 'header' | 'sidebar' | 'content' | 'footer' | 'mobile';
  className?: string;
}

const AdsterraAds: React.FC<AdsterraAdProps> = ({ format, placement, className = '' }) => {
  useEffect(() => {
    // Load Adsterra scripts dynamically
    const loadAdsterraScript = () => {
      if (format === 'popunder') {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
          atOptions = {
            'key' : '27024475',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `;
        document.head.appendChild(script);

        const popScript = document.createElement('script');
        popScript.type = 'text/javascript';
        popScript.src = ''//pl27124974.revenuecpmgate.com/da/88/42/da88421aef35c6fe964f97bd3ba57f3f.js'>';
        document.head.appendChild(popScript);
      }

      if (format === 'social-bar') {
        const script = document.createElement('script');
        script.innerHTML = `
          (function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',YOUR_SOCIAL_BAR_ZONE,document.head);
        `;
        document.head.appendChild(script);
      }
    };

    loadAdsterraScript();
  }, [format]);

  const getAdConfig = () => {
    switch (format) {
      case 'banner':
        return {
          width: placement === 'sidebar' ? 300 : 728,
          height: placement === 'sidebar' ? 250 : 90,
          zone: 'YOUR_BANNER_ZONE',
          className: 'adsterra-banner'
        };
      case 'native':
        return {
          width: '100%',
          height: 'auto',
          zone: 'YOUR_NATIVE_ZONE',
          className: 'adsterra-native'
        };
      case 'social-bar':
        return {
          width: '100%',
          height: 'auto',
          zone: 'YOUR_SOCIAL_BAR_ZONE',
          className: 'adsterra-social-bar'
        };
      default:
        return {
          width: 728,
          height: 90,
          zone: 'YOUR_DEFAULT_ZONE',
          className: 'adsterra-default'
        };
    }
  };

  const adConfig = getAdConfig();

  const renderAd = () => {
    switch (format) {
      case 'banner':
        return (
          <div className={`adsterra-ad ${adConfig.className} ${className}`}>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
                  atOptions = {
                    'key' : '${adConfig.zone}',
                    'format' : 'iframe',
                    'height' : ${adConfig.height},
                    'width' : ${adConfig.width},
                    'params' : {}
                  };
                `
              }}
            />
            <script
              type="text/javascript"
              src={`//www.topcreativeformat.com/${adConfig.zone}/invoke.js`}
            />
          </div>
        );

      case 'native':
        return (
          <div className={`adsterra-native ${className}`}>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
                  atOptions = {
                    'key' : '${adConfig.zone}',
                    'format' : 'iframe',
                    'height' : 300,
                    'width' : 300,
                    'params' : {}
                  };
                `
              }}
            />
            <script
              type="text/javascript"
              src={`//www.topcreativeformat.com/${adConfig.zone}/invoke.js`}
            />
            <div className="text-center text-xs text-muted-foreground mt-2 font-bengali">
              স্পনসর্ড কন্টেন্ট
            </div>
          </div>
        );

      case 'social-bar':
        return (
          <div
            id="adsterra-social-bar"
            className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}
            data-zone={adConfig.zone}
          />
        );

      case 'in-page-push':
        return (
          <div className={`adsterra-in-page-push ${className}`}>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('inklinkor.com',${adConfig.zone},document.createElement('script'))
                `
              }}
            />
          </div>
        );

      case 'popunder':
        return (
          <div className={`adsterra-popunder ${className}`}>
            {/* Popunder loads automatically on page load */}
          </div>
        );

      default:
        return null;
    }
  };

  // Don't render popunder and social-bar as visible components
  if (format === 'popunder' || format === 'social-bar') {
    return renderAd();
  }

  return (
    <div className={`adsterra-container ${className}`}>
      {renderAd()}
    </div>
  );
};

export default AdsterraAds;
