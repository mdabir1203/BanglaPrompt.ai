import React, { useEffect } from 'react';

const AdsterraSetup: React.FC = () => {
  useEffect(() => {
    // Add Adsterra anti-adblock script
    const antiAdBlockScript = document.createElement('script');
    antiAdBlockScript.innerHTML = `
      (function(a,b,c,d,e){function f(){var b=a.createElement("script");b.async=!0,b.src="//syndication.realsrv.com/splash.php?idzone=YOUR_SPLASH_ZONE&capping=0";var c=a.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}function g(){return"undefined"==typeof syndication_realsrv}f(),a.addEventListener?a.addEventListener("DOMContentLoaded",function(){g()&&f()},!1):a.attachEvent&&a.attachEvent("onreadystatechange",function(){"complete"===a.readyState&&g()&&f()})})(document);
    `;
    document.head.appendChild(antiAdBlockScript);

    // Add Interstitial ad script
    const interstitialScript = document.createElement('script');
    interstitialScript.innerHTML = `
      (function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',YOUR_INTERSTITIAL_ZONE,document.head);
    `;
    document.head.appendChild(interstitialScript);

    // Add Direct Link monetization for social traffic
    const directLinkScript = document.createElement('script');
    directLinkScript.innerHTML = `
      var _client = new XMLHttpRequest();
      _client.open('GET', 'https://syndication.realsrv.com/splash.php?idzone=YOUR_DIRECT_LINK_ZONE');
      _client.send();
    `;
    document.head.appendChild(directLinkScript);

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(antiAdBlockScript);
      document.head.removeChild(interstitialScript);
      document.head.removeChild(directLinkScript);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AdsterraSetup;