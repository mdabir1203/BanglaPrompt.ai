import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, X } from 'lucide-react';

const MediumSubscriptionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('mediumPopupSeen');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = () => {
    localStorage.setItem('mediumPopupSeen', 'true');
    window.open('https://medium.com/@md.abir1203', '_blank');
    setIsOpen(false);
  };

  const handleClose = () => {
    localStorage.setItem('mediumPopupSeen', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DialogHeader>
          <DialogTitle className="font-bengali text-xl">
            আরও গভীর জ্ঞানের জন্য আমাদের মিডিয়াম ব্লগ ফলো করুন
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="font-bengali text-gray-600">
            প্রম্পট ইঞ্জিনিয়ারিং, AI টুলস এবং টেকনোলজি নিয়ে বিস্তারিত আর্টিকেল পড়তে 
            আমাদের মিডিয়াম ব্লগ ভিজিট করুন।
          </p>
          <div className="flex gap-2">
            <Button onClick={handleSubscribe} className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              মিডিয়াম ব্লগ দেখুন
            </Button>
            <Button variant="outline" onClick={handleClose}>
              পরে দেখব
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediumSubscriptionPopup;