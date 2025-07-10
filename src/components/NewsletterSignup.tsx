
import { useState } from "react";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import GoogleAd from "./GoogleAd";
import { supabase } from "@/integrations/supabase/client";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    try {
      // Check if email already exists
      const { data: existingSubscription } = await supabase
        .from('newsletter_subscriptions')
        .select('id')
        .eq('email', email)
        .single();

      if (existingSubscription) {
        toast.info("আপনি আগেই সাবস্ক্রাইব করেছেন!");
        setEmail("");
        setLoading(false);
        return;
      }

      // Subscribe new email
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email, source: 'website' }]);

      if (error) {
        throw error;
      }

      setEmail("");
      toast.success("আপনি সফলভাবে সাবস্ক্রাইব করেছেন!");
      
      // Redirect to Medium profile after successful subscription
      window.open("https://medium.com/@md.abir1203", "_blank");
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      toast.error("সাবস্ক্রিপশনে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-500/20 rounded-full blur-sm -z-10 cartoon-wiggle" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-sm -z-10" style={{ animationDelay: "0.7s" }} />
      
      <div className="container mx-auto px-4 md:px-6">
        <GoogleAd slot="1234567890" className="mb-12" />
        
        <div className="max-w-3xl mx-auto text-center relative">
          {/* 90s style heading with cartoon border */}
          <div className="inline-block mb-10 cartoon-border transform rotate-2 bg-white">
            <h2 className="cartoon-subtitle text-4xl md:text-5xl bg-gradient-to-r from-orange-500 to-rose-500 text-transparent bg-clip-text px-4 py-2">
              আমাদের নিউজলেটার সাবস্ক্রাইব করুন
            </h2>
          </div>
          
          <p className="font-bengali text-black/80 text-xl mb-10 max-w-2xl mx-auto">
            সর্বশেষ প্রম্পট ইঞ্জিনিয়ারিং টিপস, আপডেট এবং রিসোর্স প্রতি সপ্তাহে আপনার ইনবক্সে পেতে সাবস্ক্রাইব করুন
          </p>
          
          <div className="cartoon-card max-w-md mx-auto transform -rotate-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="আপনার ইমেইল অ্যাড্রেস"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg font-bengali text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-purple-300"
                required
              />
              <button 
                type="submit" 
                className="cartoon-button group"
                disabled={loading}
              >
                {loading ? "সাবস্ক্রাইব হচ্ছে..." : (
                  <>
                    <span>সাবস্ক্রাইব করুন</span>
                    <ExternalLink size={18} className="opacity-90 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </button>
            </form>
            
            <p className="text-black/70 text-lg mt-4 font-bengali">
              সাবস্ক্রাইব করে আপনি আমাদের{" "}
              <a 
                href="https://medium.com/@md.abir1203" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 font-bold underline decoration-wavy decoration-orange-500 hover:text-purple-800 transition-colors"
              >
                মিডিয়াম ব্লগ
              </a>
              -এর সাথেও যুক্ত হবেন
            </p>
          </div>
        </div>
        
        <GoogleAd slot="9876543210" className="mt-12" />
      </div>
    </section>
  );
};

export default NewsletterSignup;
