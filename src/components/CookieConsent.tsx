
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Shield, Cookie } from 'lucide-react';
import { createScopedLogger } from '@/lib/logger';

const cookieLogger = createScopedLogger('cookie-consent');

// Extend Window interface to include clarity
declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gdpr-consent', JSON.stringify(consentData));
    setShowBanner(false);
    
    // Initialize analytics if accepted
    if (consentData.analytics) {
      initializeAnalytics();
    }
  };

  const handleAcceptSelected = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gdpr-consent', JSON.stringify(consentData));
    setShowBanner(false);

    if (preferences.analytics) {
      initializeAnalytics();
    }
  };

  const handleRejectAll = () => {
    const consentData = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gdpr-consent', JSON.stringify(consentData));
    setShowBanner(false);
  };

  const initializeAnalytics = () => {
    // Initialize Microsoft Clarity only if analytics consent is given
    if (window.clarity) {
      cookieLogger.info('Analytics initialized with user consent');
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-blue-500 shadow-lg cartoon-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <Cookie className="text-orange-500 w-8 h-8" />
            <div>
              <h3 className="font-bengali text-xl font-bold text-black mb-2">
                আমরা কুকিজ ব্যবহার করি
              </h3>
              <p className="font-bengali text-black/80 text-sm leading-relaxed">
                আমরা আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং সাইট বিশ্লেষণের জন্য কুকিজ ব্যবহার করি। 
                EU GDPR অনুযায়ী আপনার সম্মতি প্রয়োজন।
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 lg:ml-auto">
            <div className="flex flex-col gap-2 mb-4 sm:mb-0">
              <label className="flex items-center gap-2 font-bengali text-sm">
                <input 
                  type="checkbox" 
                  checked={preferences.necessary} 
                  disabled 
                  className="rounded"
                />
                প্রয়োজনীয় (বাধ্যতামূলক)
              </label>
              <label className="flex items-center gap-2 font-bengali text-sm">
                <input 
                  type="checkbox" 
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                  className="rounded"
                />
                বিশ্লেষণ কুকিজ
              </label>
              <label className="flex items-center gap-2 font-bengali text-sm">
                <input 
                  type="checkbox" 
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                  className="rounded"
                />
                বিপণন কুকিজ
              </label>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button onClick={handleAcceptAll} className="cartoon-button bg-green-500 hover:bg-green-600">
                সব গ্রহণ করুন
              </Button>
              <Button onClick={handleAcceptSelected} variant="outline" className="cartoon-button">
                নির্বাচিত গ্রহণ করুন
              </Button>
              <Button onClick={handleRejectAll} variant="outline" className="text-sm">
                সব প্রত্যাখ্যান করুন
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs font-bengali text-black/60">
          <a href="/privacy-policy" className="underline hover:text-blue-600">গোপনীয়তা নীতি</a> এবং 
          <a href="/cookie-policy" className="underline hover:text-blue-600 ml-1">কুকি নীতি</a> পড়ুন
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
