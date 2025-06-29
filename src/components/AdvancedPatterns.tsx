
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Lightbulb, Target, Zap } from 'lucide-react';

const AdvancedPatterns = () => {
  const patterns = [
    {
      icon: Brain,
      title: 'চেইন অফ থট প্রম্পটিং',
      description: 'ধাপে ধাপে চিন্তা প্রক্রিয়া দিয়ে জটিল সমস্যার সমাধান',
      example: 'আমি এই সমস্যাটি ধাপে ধাপে সমাধান করব...'
    },
    {
      icon: Target,
      title: 'ফিউ-শট লার্নিং',
      description: 'কয়েকটি উদাহরণ দিয়ে AI কে শেখানোর কৌশল',
      example: 'এখানে ৩টি উদাহরণ: 1. ... 2. ... 3. ...'
    },
    {
      icon: Lightbulb,
      title: 'রোল প্লেয়িং প্রম্পট',
      description: 'AI কে নির্দিষ্ট ভূমিকায় অভিনয় করতে বলা',
      example: 'আপনি একজন বিশেষজ্ঞ শিক্ষক হিসেবে...'
    },
    {
      icon: Zap,
      title: 'টেমপ্লেট বেসড প্রম্পট',
      description: 'পুনরায় ব্যবহারযোগ্য প্রম্পট টেমপ্লেট তৈরি',
      example: '[প্রসঙ্গ] + [কাজ] + [ফরম্যাট] + [শর্ত]'
    }
  ];

  return (
    <section id="advanced-patterns" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bengali text-gray-900 mb-4">
            উন্নত প্রম্পট প্যাটার্ন
          </h2>
          <p className="text-xl text-gray-600 font-bengali max-w-3xl mx-auto">
            প্রফেশনাল লেভেলের প্রম্পট ইঞ্জিনিয়ারিং কৌশল শিখুন
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {patterns.map((pattern, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <pattern.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="font-bengali text-lg">{pattern.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-bengali text-center mb-4">
                  {pattern.description}
                </CardDescription>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm font-bengali text-gray-700 italic">
                    "{pattern.example}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedPatterns;
