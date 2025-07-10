import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, Clock, Users, TrendingUp, Gift, Zap, Star, Shield } from 'lucide-react';
import { csrfProtection, formRateLimiter } from '@/utils/security';

const NewsletterConversionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes urgency
  const [currentViewers, setCurrentViewers] = useState(47);
  const [isTyping, setIsTyping] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Generate CSRF token
    const token = csrfProtection.setToken();
    setCsrfToken(token);

    // Show popup after 15 seconds of engagement
    const timer = setTimeout(() => {
      const hasSeenNewsletter = localStorage.getItem('newsletterPopupSeen');
      const lastShown = localStorage.getItem('newsletterPopupLastShown');
      const now = Date.now();
      
      // Show if never seen or if it's been more than 6 hours
      if (!hasSeenNewsletter || (lastShown && now - parseInt(lastShown) > 6 * 60 * 60 * 1000)) {
        setIsOpen(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (isOpen && timeLeft > 0) {
      countdown = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(countdown);
  }, [isOpen, timeLeft]);

  // Simulate live viewer count fluctuation
  useEffect(() => {
    if (isOpen) {
      const viewerInterval = setInterval(() => {
        setCurrentViewers(prev => {
          const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
          return Math.max(35, Math.min(68, prev + change));
        });
      }, 3000);
      return () => clearInterval(viewerInterval);
    }
  }, [isOpen]);

  // Typing effect simulation
  useEffect(() => {
    if (isOpen) {
      const typingInterval = setInterval(() => {
        setIsTyping(prev => !prev);
      }, 8000);
      return () => clearInterval(typingInterval);
    }
  }, [isOpen]);

  const handleJoinNewsletter = () => {
    // Rate limiting check
    const clientId = `newsletter_popup_${navigator.userAgent}_${window.location.hostname}`;
    if (!formRateLimiter.isAllowed(clientId)) {
      return; // Silently prevent spam clicks
    }

    // CSRF validation
    if (!csrfProtection.validateToken(csrfToken)) {
      console.error('CSRF token validation failed');
      return;
    }

    localStorage.setItem('newsletterPopupSeen', 'true');
    localStorage.setItem('newsletterPopupLastShown', Date.now().toString());
    
    // Secure window opening
    const mediumUrl = 'https://medium.com/@md.abir1203';
    const secureWindow = window.open();
    if (secureWindow) {
      secureWindow.opener = null; // Prevent access to parent window
      secureWindow.location = mediumUrl;
    }
    
    setIsOpen(false);
  };

  const handleClose = () => {
    localStorage.setItem('newsletterPopupSeen', 'true');
    localStorage.setItem('newsletterPopupLastShown', Date.now().toString());
    setIsOpen(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completionPercentage = ((180 - timeLeft) / 180) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl border-0 p-0 overflow-hidden bg-gradient-to-br from-green-50 via-white to-red-50 animate-scale-in shadow-2xl">
        {/* Urgency Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Close button */}
        <div className="absolute right-4 top-4 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0 hover:bg-white/50 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Live Activity Header */}
        <div className="bg-gradient-to-r from-green-600 to-red-600 text-white px-6 py-3 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-bold font-bengali text-sm">🔥 লাইভ এখনই</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                <Users className="w-3 h-3" />
                <span className="font-mono font-bold">{currentViewers}</span>
                <span className="font-bengali">জন দেখছেন</span>
              </div>
            </div>
            <div className="bg-red-500 px-3 py-1 rounded-full font-mono font-bold text-sm pulse">
              <Clock className="w-4 h-4 inline mr-1" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Attention-Grabbing Headline */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-100 border-2 border-yellow-400 px-4 py-2 rounded-full mb-3">
              <Zap className="w-5 h-5 text-yellow-600 animate-pulse" />
              <span className="font-bengali font-bold text-yellow-800">একচেটিয়া সুযোগ!</span>
            </div>
            <h2 className="font-bengali text-2xl font-bold text-gray-900 mb-2 leading-tight">
              🚀 <span className="bg-gradient-to-r from-green-600 to-red-600 text-transparent bg-clip-text">বাংলাদেশের #১ AI সিক্রেটস</span> আনলক করুন!
            </h2>
            <p className="font-bengali text-gray-600 text-lg">
              ১০০০+ পেশাদার যে গোপন কৌশল ব্যবহার করে মাসে লাখ টাকা আয় করছেন
            </p>
          </div>

          {/* Social Proof Ticker */}
          <div className="bg-white rounded-lg p-4 border-2 border-green-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-400"></div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">১৫,০০০+</div>
                <div className="text-xs font-bengali text-gray-600">ফলোয়ার</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-yellow-600">৪.৯</span>
                </div>
                <div className="text-xs font-bengali text-gray-600">রেটিং</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">৮৫%</div>
                <div className="text-xs font-bengali text-gray-600">সফলতার হার</div>
              </div>
            </div>
          </div>

          {/* Exclusive Benefits with Checkmarks */}
          <div className="space-y-3">
            <h3 className="font-bengali font-bold text-lg text-center flex items-center justify-center gap-2">
              <Gift className="w-5 h-5 text-purple-600" />
              আপনি যা পাবেন (বিনামূল্যে):
            </h3>
            <div className="space-y-2">
              {[
                "🎯 সাপ্তাহিক এক্সক্লুসিভ AI প্রম্পট কৌশল",
                "💰 প্রমাণিত আয়ের গোপন ফর্মুলা",
                "🔥 ইন্ডাস্ট্রি এক্সপার্টদের ভিআইপি টিপস",
                "📈 মাসিক ১ লাখ+ আয়ের রোডম্যাপ",
                "⚡ নতুন AI টুলস এর আর্লি এক্সেস"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">✓</div>
                  <span className="font-bengali text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scarcity + FOMO */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4 text-center relative">
            <div className="absolute top-2 right-2">
              <TrendingUp className="w-5 h-5 text-red-500 animate-bounce" />
            </div>
            <p className="font-bengali text-red-800 font-bold text-sm mb-2">
              ⚠️ <span className="bg-red-200 px-2 py-1 rounded">মাত্র আজকের জন্য!</span>
            </p>
            <p className="font-bengali text-red-700 text-xs">
              এই মুহূর্তে জয়েন না করলে পরবর্তী মাসের <strong>৫০,০০০ টাকার</strong> এক্সক্লুসিভ কন্টেন্ট মিস করবেন!
            </p>
          </div>

          {/* Typing Effect */}
          {isTyping && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
              <span className="font-bengali text-blue-700 text-sm italic">
                আরও ৩ জন এই মুহূর্তে সাইন আপ করছেন...
              </span>
            </div>
          )}

          {/* Powerful CTA */}
          <div className="space-y-3">
            <Button 
              onClick={handleJoinNewsletter} 
              className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white font-bold py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              <ExternalLink className="w-6 h-6 mr-3" />
              <span className="font-bengali">🎁 এখনই ফ্রি এক্সেস নিন (মূল্য ৫,০০০ টাকা)</span>
            </Button>
            
            <div className="text-center">
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 font-bengali text-sm underline transition-colors"
              >
                না, আমি সুযোগ হাতছাড়া করতে চাই 😢
              </button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="text-center border-t pt-4">
            <p className="font-bengali text-xs text-gray-500 mb-2">
              ✅ ১০০% নিরাপদ ও বিনামূল্যে • ✅ স্প্যাম নেই • ✅ যেকোনো সময় আনসাবস্ক্রাইব
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mb-2">
              <span>🇧🇩 Made in Bangladesh</span>
              <span>🔒 GDPR Compliant</span>
              <span>⭐ 15K+ Happy Subscribers</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-green-600">
              <Shield className="w-3 h-3" />
              <span className="font-bengali">SSL এনক্রিপ্টেড ও হ্যাকার প্রুফ</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterConversionPopup;