
import { ArrowRight } from "lucide-react";
import GlassCard from "./ui-custom/GlassCard";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10" />
      
      {/* Abstract shapes */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 left-[5%] w-72 h-72 bg-violet-500/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
            বাংলায় প্রম্পট ইঞ্জিনিয়ারিং শিখুন
          </div>
          
          <h1 className="heading animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="highlight-text">AI প্রম্পট ইঞ্জিনিয়ারিং</span> শিখুন বাংলায়
          </h1>
          
          <p className="subheading mt-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            এআই প্রম্পট ইঞ্জিনিয়ারিং-এর মাধ্যমে আপনার দক্ষতা উন্নত করুন। আমাদের বিশেষজ্ঞ-ডিজাইন করা কোর্সগুলি আপনাকে AI মডেলগুলির সাথে কার্যকরভাবে যোগাযোগ করতে সাহায্য করবে।
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a href="#features" className="btn-primary flex items-center justify-center gap-2">
              আরও জানুন
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              যোগাযোগ করুন
            </a>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <GlassCard className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">বাংলায় শিক্ষা</h3>
              <p className="text-muted-foreground text-sm">নিজের মাতৃভাষায় সহজবোধ্য প্রম্পট ইঞ্জিনিয়ারিং শিখুন</p>
            </div>
          </GlassCard>
          
          <GlassCard className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">হাতে-কলমে প্রশিক্ষণ</h3>
              <p className="text-muted-foreground text-sm">ব্যবহারিক প্রকল্পের মাধ্যমে আত্মবিশ্বাসী হয়ে উঠুন</p>
            </div>
          </GlassCard>
          
          <GlassCard className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">দক্ষতা উন্নয়ন</h3>
              <p className="text-muted-foreground text-sm">আধুনিক এআই টুল ব্যবহারে দক্ষতা অর্জন করুন</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Hero;
