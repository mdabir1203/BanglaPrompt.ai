
import SEOHead from '@/components/SEOHead';
import { Cookie, Settings, BarChart, Target } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <SEOHead 
        title="কুকি নীতি - প্রম্পট শিক্ষা | GDPR Cookie Compliance"
        description="প্রম্পট শিক্ষার কুকি নীতি। জানুন আমরা কীভাবে কুকি ব্যবহার করি এবং আপনার পছন্দ কীভাবে নিয়ন্ত্রণ করবেন।"
        keywords="কুকি নীতি, কুকি ব্যবহার, ট্র্যাকিং, GDPR কুকি"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="cartoon-border bg-white inline-block p-6 transform rotate-1">
              <Cookie className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h1 className="cartoon-subtitle text-4xl bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
                কুকি নীতি
              </h1>
              <p className="font-bengali text-black/70 mt-2">কুকি এবং অনুরূপ প্রযুক্তির ব্যবহার</p>
            </div>
          </div>

          {/* Content */}
          <div className="cartoon-card bg-white">
            <div className="space-y-8">
              {/* What are Cookies */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="text-blue-500 w-6 h-6" />
                  <h2 className="cartoon-subtitle text-2xl">কুকি কী?</h2>
                </div>
                <p className="font-bengali text-black/80 leading-relaxed">
                  কুকি হল ছোট টেক্সট ফাইল যা আপনার ডিভাইসে সংরক্ষিত হয় যখন আপনি আমাদের ওয়েবসাইট ভিজিট করেন। 
                  এগুলি আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং সাইটের কার্যকারিতা নিশ্চিত করতে সাহায্য করে।
                </p>
              </section>

              {/* Types of Cookies */}
              <section>
                <h2 className="cartoon-subtitle text-2xl mb-6">কুকির ধরন</h2>
                
                <div className="space-y-6">
                  {/* Necessary Cookies */}
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="text-green-500 w-5 h-5" />
                      <h3 className="font-bengali font-bold text-lg">প্রয়োজনীয় কুকি</h3>
                    </div>
                    <p className="font-bengali text-black/80 text-sm">
                      এই কুকিগুলি ওয়েবসাইটের মৌলিক কার্যকারিতার জন্য আবশ্যক। এগুলি নিষ্ক্রিয় করা যাবে না।
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm font-bengali text-black/70">
                      <li>সেশন পরিচালনা</li>
                      <li>নিরাপত্তা বৈশিষ্ট্য</li>
                      <li>কুকি সম্মতি পছন্দ</li>
                    </ul>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart className="text-blue-500 w-5 h-5" />
                      <h3 className="font-bengali font-bold text-lg">বিশ্লেষণ কুকি</h3>
                    </div>
                    <p className="font-bengali text-black/80 text-sm">
                      এই কুকিগুলি আমাদের ওয়েবসাইটের ব্যবহার বুঝতে এবং উন্নতি করতে সাহায্য করে।
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm font-bengali text-black/70">
                      <li>Microsoft Clarity (ব্যবহারকারীর আচরণ বিশ্লেষণ)</li>
                      <li>পৃষ্ঠা ভিউ গণনা</li>
                      <li>ট্রাফিক উৎস ট্র্যাকিং</li>
                    </ul>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="text-purple-500 w-5 h-5" />
                      <h3 className="font-bengali font-bold text-lg">বিপণন কুকি</h3>
                    </div>
                    <p className="font-bengali text-black/80 text-sm">
                      এই কুকিগুলি আপনার আগ্রহ অনুযায়ী বিজ্ঞাপন দেখানোর জন্য ব্যবহৃত হয়।
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm font-bengali text-black/70">
                      <li>Google AdSense</li>
                      <li>সামাজিক মিডিয়া শেয়ারিং</li>
                      <li>লক্ষ্যবস্তু বিজ্ঞাপন</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Managing Cookies */}
              <section>
                <h2 className="cartoon-subtitle text-2xl mb-4">কুকি পরিচালনা</h2>
                <div className="font-bengali text-black/80 space-y-3">
                  <p>
                    আপনি আমাদের কুকি ব্যানারের মাধ্যমে আপনার পছন্দ নিয়ন্ত্রণ করতে পারেন। 
                    এছাড়াও আপনি আপনার ব্রাউজার সেটিংসের মাধ্যমে কুকি নিয়ন্ত্রণ করতে পারেন।
                  </p>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <p className="font-bold">মনে রাখবেন:</p>
                    <p>কুকি নিষ্ক্রিয় করলে ওয়েবসাইটের কিছু বৈশিষ্ট্য সঠিকভাবে কাজ নাও করতে পারে।</p>
                  </div>
                </div>
              </section>

              {/* Third Party Cookies */}
              <section>
                <h2 className="cartoon-subtitle text-2xl mb-4">তৃতীয় পক্ষের কুকি</h2>
                <div className="font-bengali text-black/80">
                  <p>আমাদের ওয়েবসাইটে নিম্নলিখিত তৃতীয় পক্ষের সেবা রয়েছে:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Google AdSense:</strong> বিজ্ঞাপন প্রদর্শনের জন্য</li>
                    <li><strong>Microsoft Clarity:</strong> ব্যবহারকারী বিশ্লেষণের জন্য</li>
                  </ul>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h2 className="cartoon-subtitle text-2xl mb-4">যোগাযোগ</h2>
                <p className="font-bengali text-black/80">
                  কুকি নীতি সম্পর্কে কোনো প্রশ্ন থাকলে যোগাযোग করুন: 
                  <a href="mailto:privacy@promptshiksha.com" className="text-blue-600 underline ml-1">
                    privacy@promptshiksha.com
                  </a>
                </p>
              </section>

              {/* Last Updated */}
              <section className="border-t pt-6">
                <p className="font-bengali text-black/60 text-sm">
                  শেষ আপডেট: ২৯ জুন, ২০২৫
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
