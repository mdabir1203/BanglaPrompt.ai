
import { ArrowRight } from "lucide-react";
import GlassCard from "./ui-custom/GlassCard";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-amber-50 -z-10" />
      
      {/* Abstract shapes - cartoon style */}
      <div className="absolute top-40 right-[15%] w-32 h-32 bg-purple-500/30 rounded-full blur-sm -z-10 cartoon-wiggle" />
      <div className="absolute top-20 left-[10%] w-48 h-48 bg-orange-500/20 rounded-full blur-sm -z-10" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-10 right-[5%] w-64 h-64 bg-blue-500/20 rounded-full blur-sm -z-10" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 text-white text-sm font-bold mb-6 animate-wiggle border-2 border-black">
            <span className="flex h-2 w-2 rounded-full bg-white mr-2"></span>
            বাংলায় প্রম্পট ইঞ্জিনিয়ারিং শিখুন
          </div>
          
          <h1 className="cartoon-title animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span>AI প্রম্পট</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">ইঞ্জিনিয়ারিং</span>
          </h1>
          
          <p className="font-bengali mt-6 text-xl sm:text-2xl max-w-3xl text-black/80 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            এআই প্রম্পট ইঞ্জিনিয়ারিং-এর মাধ্যমে আপনার দক্ষতা উন্নত করুন। আমাদের বিশেষজ্ঞ-ডিজাইন করা কোর্সগুলি আপনাকে AI মডেলগুলির সাথে কার্যকরভাবে যোগাযোগ করতে সাহায্য করবে।
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a href="#features" className="cartoon-button flex items-center justify-center gap-2">
              আরও জানুন
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="cartoon-button bg-gradient-to-r from-purple-500 to-blue-500">
              যোগাযোগ করুন
            </a>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="cartoon-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-4 border-4 border-black">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="cartoon-subtitle mb-2">বাংলায় শিক্ষা</h3>
              <p className="font-bengali text-black/70 text-lg">নিজের মাতৃভাষায় সহজবোধ্য প্রম্পট ইঞ্জিনিয়ারিং শিখুন</p>
            </div>
          </div>
          
          <div className="cartoon-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center mb-4 border-4 border-black">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="cartoon-subtitle mb-2">হাতে-কলমে প্রশিক্ষণ</h3>
              <p className="font-bengali text-black/70 text-lg">ব্যবহারিক প্রকল্পের মাধ্যমে আত্মবিশ্বাসী হয়ে উঠুন</p>
            </div>
          </div>
          
          <div className="cartoon-card animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-4 border-4 border-black">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="cartoon-subtitle mb-2">দক্ষতা উন্নয়ন</h3>
              <p className="font-bengali text-black/70 text-lg">আধুনিক এআই টুল ব্যবহারে দক্ষতা অর্জন করুন</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
