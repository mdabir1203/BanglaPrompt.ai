
import { useState } from "react";
import { toast } from "sonner";

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
    }, 1000);
  };

  return (
    <section className="section bg-gradient-to-r from-blue-500 to-violet-500 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            আমাদের নিউজলেটার সাবস্ক্রাইব করুন
          </h2>
          <p className="text-white/80 text-lg mb-8">
            সর্বশেষ প্রম্পট ইঞ্জিনিয়ারিং টিপস, আপডেট এবং রিসোর্স প্রতি সপ্তাহে আপনার ইনবক্সে পেতে সাবস্ক্রাইব করুন
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল অ্যাড্রেস"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 flex-grow focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button 
              type="submit" 
              className="px-6 py-3 rounded-full bg-white text-blue-600 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/20 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "সাবস্ক্রাইব হচ্ছে..." : "সাবস্ক্রাইব করুন"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
