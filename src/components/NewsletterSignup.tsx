
import { useState } from "react";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("আপনি সফলভাবে সাবস্ক্রাইব করেছেন!");
      
      // Redirect to Medium profile after successful subscription
      window.open("https://medium.com/@md.abir1203", "_blank");
    }, 1000);
  };

  return (
    <section className="section bg-amber-100 border-y-4 border-amber-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1 bg-amber-200 border-2 border-amber-600 rounded-lg transform -rotate-1">
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-amber-800 tracking-tight">
              আমাদের নিউজলেটার সাবস্ক্রাইব করুন
            </h2>
          </div>
          
          <p className="font-serif text-amber-800/90 text-lg mb-8">
            সর্বশেষ প্রম্পট ইঞ্জিনিয়ারিং টিপস, আপডেট এবং রিসোর্স প্রতি সপ্তাহে আপনার ইনবক্সে পেতে সাবস্ক্রাইব করুন
          </p>
          
          <div className="bg-white p-6 border-4 border-amber-600 rounded-xl shadow-[8px_8px_0px_rgba(217,119,6,0.5)] max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="আপনার ইমেইল অ্যাড্রেস"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg bg-amber-50 border-2 border-amber-400 text-amber-800 placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                required
              />
              <button 
                type="submit" 
                className="group px-6 py-3 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold font-mono transition-all duration-300 hover:shadow-lg hover:shadow-amber-700/20 active:scale-[0.98] flex items-center justify-center gap-2 border-2 border-amber-700 shadow-[4px_4px_0px_rgba(146,64,14,1)]"
                disabled={loading}
              >
                {loading ? "সাবস্ক্রাইব হচ্ছে..." : (
                  <>
                    <span>সাবস্ক্রাইব করুন</span>
                    <ExternalLink size={16} className="opacity-90 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </button>
            </form>
            
            <p className="text-amber-700 text-sm mt-4 font-serif">
              সাবস্ক্রাইব করে আপনি আমাদের{" "}
              <a 
                href="https://medium.com/@md.abir1203" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-mono underline underline-offset-4 decoration-wavy decoration-amber-500 hover:text-amber-800 transition-colors"
              >
                মিডিয়াম ব্লগ
              </a>
              -এর সাথেও যুক্ত হবেন
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
