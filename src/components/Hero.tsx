
import { ArrowRight } from "lucide-react";
import GlassCard from "./ui-custom/GlassCard";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bangladesh-pattern">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      
      {/* Traditional decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/10 blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Cultural badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-8 border border-primary/20">
            <span className="text-2xl">🇧🇩</span>
            <span className="font-bengali font-medium">বাংলাদেশের প্রথম AI শিক্ষা প্ল্যাটফর্ম</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
            প্রম্পট শিক্ষা
          </h1>
          <p className="text-xl md:text-2xl font-bengali text-gray-700 mb-4 leading-relaxed">
            বাংলায় AI এর শক্তি আনলক করুন
          </p>
          <p className="text-lg font-bengali text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            দেশের সবচেয়ে বড় প্রম্পট ইঞ্জিনিয়ারিং কমিউনিটিতে যোগ দিন। 
            বিশেষজ্ঞদের থেকে শিখুন, নিজের দক্ষতা বাড়ান এবং AI যুগে এগিয়ে থাকুন।
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#features" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-4 text-lg font-bengali rounded-lg shadow-cultural transition-all duration-200 hover:scale-105">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              শেখা শুরু করুন
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 px-8 py-4 text-lg font-bengali rounded-lg transition-all duration-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 015 0H17m-5 8l-3-3h6l-3 3z" />
              </svg>
              ডেমো দেখুন
            </a>
          </div>
          
          {/* Cultural statistics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="cultural-card p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary font-display">১০,০০০+</div>
              <div className="text-sm font-bengali text-gray-600">শিক্ষার্থী</div>
            </div>
            <div className="cultural-card p-4 rounded-lg">
              <div className="text-2xl font-bold text-accent font-display">৯৮%</div>
              <div className="text-sm font-bengali text-gray-600">সফলতার হার</div>
            </div>
            <div className="cultural-card p-4 rounded-lg">
              <div className="text-2xl font-bold text-secondary font-display">৫০+</div>
              <div className="text-sm font-bengali text-gray-600">কোর্স মডিউল</div>
            </div>
            <div className="cultural-card p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary font-display">২৪/৭</div>
              <div className="text-sm font-bengali text-gray-600">সাপোর্ট</div>
            </div>
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
