import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import GlassCard from "@/components/ui-custom/GlassCard";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        {/* Advanced Prompt Patterns Section */}
        <section id="advanced-patterns" className="section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="highlight-text">উন্নত প্রম্পটিং</span> প্যাটার্ন
              </h2>
              <p className="text-muted-foreground text-lg">
                এআই-এর সম্পূর্ণ সম্ভাবনা উন্মোচন করতে এই উন্নত প্যাটার্নগুলি ব্যবহার করুন
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">রোল প্রম্পটিং</h3>
                <p className="text-gray-700 mb-4">এআই-কে একটি নির্দিষ্ট ভূমিকায় রাখা, যেমন একজন শিক্ষক, বিশেষজ্ঞ, বা মেন্টর।</p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-semibold mb-2">উদাহরণ:</h4>
                  <p className="text-sm text-gray-700">
                    "তুমি একজন অভিজ্ঞ ডাটা সায়েন্টিস্ট। আমি মেশিন লার্নিং নিয়ে কাজ করছি এবং আমার ডাটাসেটে অনেক মিসিং ভ্যালু আছে। আমাকে এই সমস্যা সমাধানের সেরা পদ্ধতিগুলি ব্যাখ্যা করো এবং প্রতিটি পদ্ধতির সুবিধা ও অসুবিধা বর্ণনা করো।"
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold mb-4 text-violet-600">কন্টেক্সট প্রম্পটিং</h3>
                <p className="text-gray-700 mb-4">এআই-কে সম্পর্কিত পটভূমি বা প্রসঙ্গ প্রদান করা যাতে আরও সঠিক উত্তর পাওয়া যায়।</p>
                <div className="bg-violet-50 p-4 rounded-lg border border-violet-100">
                  <h4 className="text-sm font-semibold mb-2">উদাহরণ:</h4>
                  <p className="text-sm text-gray-700">
                    "আমি বাংলাদেশের একটি মাধ্যমিক বিদ্যালয়ের শিক্ষক এবং আমি আমার ৯ম শ্রেণীর ছাত্র-ছাত্রীদের জন্য জলবায়ু পরিবর্তন বিষয়ে একটি ইন্টারেক্টিভ পাঠ পরিকল্পনা তৈরি করতে চাই। আমাদের বিদ্যালয়ে ইন্টারনেট সংযোগ সীমিত এবং প্রযুক্তিগত সম্পদও কম। তাই এমন কিছু কার্যকলাপ প্রস্তাব করো যা সম্পদ-কম পরিবেশেও কার্যকর হবে।"
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-600">Few-Shot প্রম্পটিং</h3>
                <p className="text-gray-700 mb-4">এআই-কে কয়েকটি উদাহরণ দেওয়া, যাতে সে আপনি ঠিক কী ধরনের উত্তর চান তা বুঝতে পারে।</p>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h4 className="text-sm font-semibold mb-2">উদাহরণ:</h4>
                  <p className="text-sm text-gray-700">
                    "নিম্নলিখিত বাক্যগুলিকে ইতিবাচক আকারে রূপান্তর করো:\n\nইনপুট: আমি আজ খুব ক্লান্ত।\nআউটপুট: আমি আজ বিশ্রাম নিয়ে শক্তি পুনরুদ্ধার করব।\n\nইনপুট: এই কাজটা খুব কঠিন।\nআউটপুট: এই কাজটা আমাকে নতুন দক্ষতা অর্জনে সাহায্য করবে।\n\nইনপুট: আমি পরীক্ষায় ভালো করতে পারিনি।\nআউটপুট:"
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold mb-4 text-pink-600">চেইন-অফ-থট প্রম্পটিং</h3>
                <p className="text-gray-700 mb-4">এআই-কে ধাপে ধাপে চিন্তা করতে নির্দেশ দেওয়া, যা জটিল সমস্যা সমাধানে সাহায্য করে।</p>
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
                  <h4 className="text-sm font-semibold mb-2">উদাহরণ:</h4>
                  <p className="text-sm text-gray-700">
                    "একটি স্কুলে ছাত্রদের মধ্যে স্মার্টফোন ব্যবহার নিয়ে নীতি নির্ধারণ করতে হবে। এই সমস্যার সমাধান করার জন্য ধাপে ধাপে চিন্তা করো:\n\nধাপ 1: স্কুলে স্মার্টফোন ব্যবহারের সম্ভাব্য সুবিধা তালিকাভুক্ত করো।\nধাপ 2: স্কুলে স্মার্টফোন ব্যবহারের সম্ভাব্য অসুবিধা তালিকাভুক্ত করো।\nধাপ 3: বিভিন্ন বয়সের গ্রুপের জন্য ভিন্ন ভিন���ন নীতি বিবেচনা করো।\nধাপ 4: তোমার চূড়ান্ত সুপারিশ দাও এবং কেন এটি সবচেয়ে ভারসাম্যপূর্ণ পদ্ধতি তা ব্যাখ্যা করো।"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Prompt Template Library Section */}
        <section id="prompt-templates" className="section bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="highlight-text">প্রম্পট</span> টেমপ্লেট
              </h2>
              <p className="text-muted-foreground text-lg">
                আপনার কাজকে আরও দ্রুত ও সহজ করতে এই প্রম্পট টেমপ্লেটগুলি কপি এবং ব্যবহার করুন
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <GlassCard>
                <h3 className="text-xl font-semibold mb-4">কন্টেন্ট রাইটিং টেমপ্লেট</h3>
                <div className="p-4 bg-gray-50/80 rounded-lg mb-4">
                  <p className="text-sm whitespace-pre-line">
{`তুমি একজন পেশাদার কন্টেন্ট রাইটার। আমাকে নিম্নলিখিত বিষয়ে একটি [ব্লগ পোস্ট/আর্টিকেল/সোশ্যাল মিডিয়া পোস্ট] লিখে দাও:

বিষয়: [বিষয় এখানে]

টারগেট অডিয়েন্স: [টারগেট অডিয়েন্স এখানে]

টোন: [ফর্মাল/ইনফর্মাল/শিক্ষামূলক/মজার/ইত্যাদি]

কী পয়েন্ট অন্তর্ভুক্ত করতে হবে:
- [পয়েন্ট ১]
- [পয়েন্ট ২]
- [পয়েন্ট ৩]

শব্দ সংখ্যা: [অনুমানিত শব্দ সংখ্যা]`}
                  </p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">কপি করুন</button>
              </GlassCard>
              
              <GlassCard>
                <h3 className="text-xl font-semibold mb-4">কোডিং প্রম্পট টেমপ্লেট</h3>
                <div className="p-4 bg-gray-50/80 rounded-lg mb-4">
                  <p className="text-sm whitespace-pre-line">
{`তুমি একজন সিনিয়র সফটওয়্যার ডেভেলপার। আমাকে নিচের সমস্যার সমাধান করতে সাহায্য করো:

প্রোগ্রামিং ল্যাঙ্গুয়েজ: [ল্যাঙ্গুয়েজ]

সমস্যার বিবরণ: 
[সমস্যা বিবরণ এখানে]

অপেক্ষিত আউটপুট/ফাংশনালিটি:
[কী আউটপুট বা ফাংশনালিটি প্রয়োজন]

বিশেষ প্রয়োজনীয়তা (যদি থাকে):
- [প্রয়োজনীয়তা ১]
- [প্রয়োজ��ীয়তা ২]

দয়া করে কোড লেখার সময় প্রতিটি ধাপ বাংলায় ব্যাখ্যা করো এবং যেখানে প্রয়োজ্য সেখানে কোডের ভিতরে কমেন্ট অন্তর্ভুক্ত করো।`}
                  </p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">কপি করুন</button>
              </GlassCard>
              
              <GlassCard>
                <h3 className="text-xl font-semibold mb-4">ইমেজ প্রম্পট টেমপ্লেট</h3>
                <div className="p-4 bg-gray-50/80 rounded-lg mb-4">
                  <p className="text-sm whitespace-pre-line">
{`[প্রধান বিষয়বস্তু], [সেটিং/লোকেশন], [ভিজ্যুয়াল স্টাইল], [লাইটিং], [মুড/এমোশন], [ক্যামেরা অ্যাঙ্গেল], [রেজোলিউশন], [অতিরিক্ত বিবরণ]

উদাহরণ:
একটি বাঙালি ছেলে, পদ্মা নদীর তীরে, সূর্যাস্তের সময়, ফটোরিয়ালিস্টিক স্টাইল, ড্রামাটিক লাইটিং, স্যুর্যের আলো চারপাশে ছড়িয়ে পড়ছে, উষ্ণ ও শান্ত মুড, মিড শট, 8K রেজোলিউশন, বিস্তারিত টেক্সচার, চোখের ডিটেইল খুব স্পষ্ট।`}
                  </p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">কপি করুন</button>
              </GlassCard>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="highlight-text">ব্যবহারকারীদের</span> অভিজ্ঞতা
              </h2>
              <p className="text-muted-foreground text-lg">
                আমাদের ওয়েবসাইট ব্যবহারকারীরা কি বলেন তা দেখুন
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="বাংলায় প্রম্পট ইঞ্জিনিয়ারিং শেখার এমন সহজবোধ্য রিসোর্স আগে কখনো পাইনি। এখন আমি ভাল প্রম্পট লিখতে পারি এবং এআই থেকে সঠিক উত্তর পেতে সক্ষম।"
                name="রহিম আহমেদ"
                role="ফ্রিল্যান্স কন্টেন্ট রাইটার"
              />
              
              <TestimonialCard
                quote="আমার ব্যবসায় এআই ব্যবহার করতে গিয়ে সবসময় ভাষাগত বাধার সম্মুখীন হতাম। এই ওয়েবসাইটের উদাহরণগুলি আমাকে বাংলায় কার্যকরী প্রম্পট লিখতে সাহায্য করেছে।"
                name="সাবরিনা আক্তার"
                role="ছোট ব্যবসার মালিক"
              />
              
              <TestimonialCard
                quote="প্রম্পট টেমপ্লেটগুলি আমার জন্য গেম-চেঞ্জার! আমি এখন মিনিটে ক্লাসের জন্য অসাধারণ শিক্ষামূলক কন্টেন্ট তৈরি করতে পারি। ধন্যবাদ!"
                name="কামাল হোসেন"
                role="মাধ্যমিক বিদ্যালয়ের শিক্ষক"
              />
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

