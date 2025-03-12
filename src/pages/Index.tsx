
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        {/* Testimonials Section */}
        <section id="testimonials" className="section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="highlight-text">শিক্ষার্থীদের</span> অভিজ্ঞতা
              </h2>
              <p className="text-muted-foreground text-lg">
                আমাদের ছাত্র-ছাত্রীরা কি বলেন তা দেখুন
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="প্রম্পট শিক্ষার কোর্সটি আমাকে এআই-এর সাথে কাজ করার দক্ষতা অনেক উন্নত করতে সাহায্য করেছে। বাংলায় শেখার সুযোগ পেয়ে আমি খুব খুশি।"
                name="রহিম আহমেদ"
                role="ফ্রিল্যান্স কন্টেন্ট রাইটার"
              />
              
              <TestimonialCard
                quote="আমি যখন পাশ্চাত্য কোর্সগুলি বুঝতে সমস্যায় পড়ছিলাম, তখন এই প্ল্যাটফর্মটি আমার জন্য আশীর্বাদ হয়ে এসেছিল। এখন আমি আত্মবিশ্বাসের সাথে প্রম্পট লিখতে পারি।"
                name="সাবরিনা আক্তার"
                role="ডিজিটাল মার্কেটিং স্পেশালিস্ট"
              />
              
              <TestimonialCard
                quote="বাংলায় প্রম্পট ইঞ্জিনিয়ারিং শেখার সেরা প্ল্যাটফর্ম! এখন আমি দক্ষতার সাথে এআই মডেলগুলি ব্যবহার করে আমার কাজের দক্ষতা বাড়াতে পারি।"
                name="কামাল হোসেন"
                role="সফটওয়্যার ডেভেলপার"
              />
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section id="resources" className="section bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="highlight-text">শিক্ষামূলক</span> রিসোর্স
              </h2>
              <p className="text-muted-foreground text-lg">
                আমাদের শিক্ষামূলক সামগ্রী অন্বেষণ করুন
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card hover:translate-y-[-5px] transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-blue-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">প্রম্পট ইঞ্জিনিয়ারিং গাইড</h3>
                  <p className="text-muted-foreground mb-4">আমাদের বিস্তৃত গাইড থেকে প্রম্পট ইঞ্জিনিয়ারিং এর মৌলিক বিষয়গুলি শিখুন।</p>
                  <a href="#" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">গাইড দেখুন →</a>
                </div>
              </div>
              
              <div className="card hover:translate-y-[-5px] transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-violet-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">ভিডিও টিউটোরিয়াল</h3>
                  <p className="text-muted-foreground mb-4">আমাদের বিশেষজ্ঞদের দ্বারা তৈরি করা প্রম্পট ইঞ্জিনিয়ারিং ভিডিও টিউটোরিয়াল দেখুন।</p>
                  <a href="#" className="text-violet-600 font-medium hover:text-violet-700 transition-colors">ভিডিও দেখুন →</a>
                </div>
              </div>
              
              <div className="card hover:translate-y-[-5px] transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-green-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">ওয়েবিনার সিরিজ</h3>
                  <p className="text-muted-foreground mb-4">আমাদের নিয়মিত ওয়েবিনার সিরিজে যোগ দিন এবং প্রম্পট ইঞ্জিনিয়ারিং বিশেষজ্ঞদের থেকে শিখুন।</p>
                  <a href="#" className="text-green-600 font-medium hover:text-green-700 transition-colors">সিরিজ দেখুন →</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
                    আমাদের সম্পর্কে
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    <span className="highlight-text">বাংলাভাষী</span> জনগণের জন্য প্রম্পট ইঞ্জিনিয়ারিং শিক্ষা
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    আমরা বিশ্বাস করি যে প্রম্পট ইঞ্জিনিয়ারিং জ্ঞান সকলের জন্য অ্যাক্সেসযোগ্য হওয়া উচিত। আমাদের মিশন হল বাংলাভাষী জনগণকে এই নতুন কৌশলগুলি শিখতে এবং এআই-এর শক্তি ব্যবহার করতে সক্ষম করা।
                  </p>
                  <p className="text-muted-foreground text-lg mb-6">
                    আমাদের প্ল্যাটফর্মে, আমরা বাধা অপসারণ করেছি এবং আমাদের মাতৃভাষায় প্রম্পট ইঞ্জিনিয়ারিং শেখার একটি সুযোগ তৈরি করেছি।
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#features" className="btn-primary flex items-center justify-center gap-2">
                      আমাদের কোর্স দেখুন
                    </a>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/10 rounded-full -z-10 animate-float" style={{ animationDelay: "0.2s" }} />
                  <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-violet-500/10 rounded-full -z-10 animate-float" style={{ animationDelay: "0.5s" }} />
                  
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4">
                        <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
                        <p className="text-gray-500">কোর্স</p>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-4xl font-bold text-violet-600 mb-2">1000+</div>
                        <p className="text-gray-500">শিক্ষার্থী</p>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-4xl font-bold text-green-600 mb-2">10+</div>
                        <p className="text-gray-500">বিশেষজ্ঞ</p>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-4xl font-bold text-orange-600 mb-2">4.9</div>
                        <p className="text-gray-500">গড় রেটিং</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="section bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="highlight-text">যোগাযোগ</span> করুন
              </h2>
              <p className="text-muted-foreground text-lg">
                আমাদের সাথে যোগাযোগ করতে নিচের ফর্মটি পূরণ করুন
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <form className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      নাম
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="আপনার নাম"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      ইমেইল
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="আপনার ইমেইল"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    বিষয়
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="বিষয়"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    বার্তা
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="আপনার বার্তা লিখুন"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  বার্তা পাঠান
                </button>
              </form>
            </div>
          </div>
        </section>
        
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
