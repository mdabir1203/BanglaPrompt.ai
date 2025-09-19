import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, Users, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MediumSubscriptionPopup = () => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!isBn) {
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('mediumPopupSeen');
      const lastShown = localStorage.getItem('mediumPopupLastShown');
      const now = Date.now();

      if (!hasSeenPopup || (lastShown && now - parseInt(lastShown) > 24 * 60 * 60 * 1000)) {
        setIsOpen(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [isBn]);

  useEffect(() => {
    if (!isBn || !isOpen || timeLeft <= 0) {
      return;
    }

    const countdown = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(countdown);
  }, [isBn, isOpen, timeLeft]);

  const handleSubscribe = () => {
    localStorage.setItem('mediumPopupSeen', 'true');
    localStorage.setItem('mediumPopupLastShown', Date.now().toString());
    window.open('https://medium.com/@md.abir1203', '_blank');
    setIsOpen(false);
  };

  const handleClose = () => {
    localStorage.setItem('mediumPopupSeen', 'true');
    localStorage.setItem('mediumPopupLastShown', Date.now().toString());
    setIsOpen(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isBn) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg border-0 p-0 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 animate-scale-in">
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

        {/* Header with urgency */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 animate-pulse" />
              <span className="font-bold font-bengali">সীমিত সময়ের অফার!</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full font-mono font-bold">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Main headline */}
          <div className="text-center">
            <h2 className="font-bengali text-2xl font-bold text-gray-900 mb-2">
              🚀 এক্সক্লুসিভ AI সিক্রেটস আনলক করুন!
            </h2>
            <p className="font-bengali text-gray-600 text-lg">
              প্রতি সপ্তাহে ৫০০+ পেশাদার যা শিখছেন, তা আপনিও শিখুন
            </p>
          </div>

          {/* Social proof */}
          <div className="bg-white rounded-lg p-4 border-2 border-green-200">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="font-bengali font-semibold">১২,০০০+ ফলোয়ার</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bengali font-semibold">৪.৮ রেটিং</span>
              </div>
            </div>
          </div>

          {/* Benefits list */}
          <div className="space-y-3">
            <h3 className="font-bengali font-bold text-lg text-center">আপনি যা পাবেন:</h3>
            <div className="space-y-2">
              {[
                "🎯 সাপ্তাহিক এক্সক্লুসিভ প্রম্পট টেকনিক",
                "💡 ইন্ডাস্ট্রি এক্সপার্টদের গোপন টিপস", 
                "📈 আয় বৃদ্ধির প্রমাণিত কৌশল",
                "🔥 সবার আগে নতুন AI আপডেট"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-lg">{benefit.split(' ')[0]}</span>
                  <span className="font-bengali text-gray-700">{benefit.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Urgency message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
            <p className="font-bengali text-sm text-yellow-800">
              ⚠️ <strong>মাত্র আজকেই!</strong> এই মুহূর্তে জয়েন না করলে পরবর্তী সপ্তাহের এক্সক্লুসিভ কন্টেন্ট মিস করবেন!
            </p>
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleSubscribe} 
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              <span className="font-bengali">🎁 ফ্রি এক্সেস নিন (মূল্য ৫০০ টাকা)</span>
            </Button>
            
            <button 
              onClick={handleClose}
              className="w-full text-gray-500 hover:text-gray-700 font-bengali text-sm underline transition-colors"
            >
              না, আমি সুযোগ হাতছাড়া করতে চাই
            </button>
          </div>

          {/* Trust signal */}
          <div className="text-center">
            <p className="font-bengali text-xs text-gray-500">
              ✅ ১০০% ফ্রি • ✅ স্প্যাম নেই • ✅ যেকোনো সময় আনসাবস্ক্রাইব
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediumSubscriptionPopup;