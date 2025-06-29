
import SEOHead from '@/components/SEOHead';
import { Shield, Eye, Lock, Users, Mail, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <SEOHead 
        title="গোপনীয়তা নীতি - প্রম্পট শিক্ষা | GDPR Compliant"
        description="প্রম্পট শিক্ষার গোপনীয়তা নীতি। EU GDPR অনুযায়ী আপনার ব্যক্তিগত তথ্য সুরক্ষা এবং ব্যবহারের নীতি।"
        keywords="গোপনীয়তা নীতি, GDPR, ডাটা সুরক্ষা, ব্যক্তিগত তথ্য"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="cartoon-border bg-white inline-block p-6 transform -rotate-1">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h1 className="cartoon-subtitle text-4xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                গোপনীয়তা নীতি
              </h1>
              <p className="font-bengali text-black/70 mt-2">EU GDPR অনুযায়ী</p>
            </div>
          </div>

          {/* Content */}
          <div className="cartoon-card bg-white">
            <div className="space-y-8">
              {/* Introduction */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="text-orange-500 w-6 h-6" />
                  <h2 className="cartoon-subtitle text-2xl">ভূমিকা</h2>
                </div>
                <p className="font-bengali text-black/80 leading-relaxed">
                  প্রম্পট শিক্ষায় আমরা আপনার গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দিই। এই নীতিটি EU General Data Protection Regulation (GDPR) 
                  অনুযায়ী প্রস্তুত করা হয়েছে এবং আমরা আপনার ব্যক্তিগত তথ্য কীভাবে সংগ্রহ, ব্যবহার এবং সুরক্ষা করি তা ব্যাখ্যা করে।
                </p>
              </section>

              {/* Data Collection */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="text-green-500 w-6 h-6" />
                  <h2 className="cartoon-subtitle text-2xl">তথ্য সংগ্রহ</h2>
                </div>
                <div className="font-bengali text-black/80 space-y-3">
                  <p><strong>আমরা যে তথ্য সংগ্রহ করি:</strong></p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>ইমেইল ঠিকানা (নিউজলেটার সাবস্ক্রিপশনের জন্য)</li>
                    <li>IP ঠিকানা এবং ব্রাউজিং তথ্য (বিশ্লেষণের জন্য)</li>
                    <li>কুকি এবং অনুরূপ প্রযুক্তি</li>
                    <li>ওয়েবসাইট ব্যবহারের তথ্য</li>
                  </ul>
                </div>
              </section>

              {/* Legal Basis */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="text-purple-500 w-6 h-6" />
                  <h2 className="cartoon-subtitle text-2xl">আইনি ভিত্তি</h2>
                </div>
                <div className="font-bengali text-black/80 space-y-3">
                  <p>GDPR অনুযায়ী আমাদের তথ্য প্রক্রিয়াকরণের আইনি ভিত্তি:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>সম্মতি:</strong> নিউজলেটার এবং বিপণন যোগাযোগের জন্য</li>
                    <li><strong>বৈধ স্বার্থ:</strong> ওয়েবসাইট বিশ্লেষণ এবং উন্নতির জন্য</li>
                    <li><strong>আইনি বাধ্যবাধকতা:</strong> আইনি প্রয়োজনীয়তা পূরণের জন্য</li>
                  </ul>
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-blue-500 w-6 h-6" />
                  <h2 className="cartoon-subtitle text-2xl">আপনার অধিকার</h2>
                </div>
                <div className="font-bengali text-black/80 space-y-3">
                  <p>GDPR অনুযায়ী আপনার নিম্নলিখিত অধিকার রয়েছে:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>প্রবেশাধিকার:</strong> আপনার তথ্য দেখার অধিকার</li>
                    <li><strong>সংশোধন:</strong> ভুল তথ্য সংশোধনের অধিকার</li>
                    <li><strong>মুছে ফেলা:</strong> তথ্য মুছে ফেলার অধিকার (Right to be forgotten)</li>
                    <li><strong>প্রক্রিয়াকরণ সীমিত করা:</strong> তথ্য প্রক্রিয়াকরণ বন্ধ করার অধিকার</li>
                    <li><strong>তথ্য বহনযোগ্যতা:</strong> তথ্য স্থানান্তরের অধিকার</li>
                    <li><strong>আপত্তি:</strong> প্রক্রিয়াকরণে আপত্তি জানানোর অধিকার</li>
                  </ul>
                </div>
              </section>

              {/* Contact */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="text-red-500 w-6 h-6" />
                  <h2 className="cartoon-subtitle text-2xl">যোগাযোগ</h2>
                </div>
                <div className="font-bengali text-black/80">
                  <p>
                    গোপনীয়তা সংক্রান্ত কোনো প্রশ্ন বা আপনার অধিকার প্রয়োগের জন্য যোগাযোগ করুন:
                  </p>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p><strong>ইমেইল:</strong> privacy@promptshiksha.com</p>
                    <p><strong>Data Protection Officer:</strong> dpo@promptshiksha.com</p>
                  </div>
                </div>
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

export default PrivacyPolicy;
