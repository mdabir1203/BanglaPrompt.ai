
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Users, BookOpen, Star } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, number: '১০,০০০+', label: 'শিক্ষার্থী' },
    { icon: BookOpen, number: '৫০+', label: 'কোর্স মডিউল' },
    { icon: Award, number: '৯৮%', label: 'সন্তুষ্ট শিক্ষার্থী' },
    { icon: Star, number: '৪.৯', label: 'গড় রেটিং' }
  ];

  return (
    <section id="about" className="py-20 bangladesh-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 border border-primary/20">
            <span className="text-xl">🌱</span>
            <span className="font-bengali font-medium">আমাদের শেকড় ও স্বপ্ন</span>
          </div>
          <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
            আমাদের সম্পর্কে
          </h2>
          <p className="text-xl text-gray-600 font-bengali max-w-3xl mx-auto leading-relaxed">
            বাংলার মাটি থেকে জন্ম নেওয়া, বিশ্বমানের AI শিক্ষার স্বপ্ন নিয়ে
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold font-bengali text-gray-900 mb-6">
              আমাদের মিশন
            </h3>
            <p className="text-lg font-bengali text-gray-700 mb-6 leading-relaxed">
              আমরা বিশ্বাস করি যে প্রযুক্তির সাথে আমাদের মাতৃভাষার সমন্বয়ে 
              তৈরি হবে নতুন সম্ভাবনার জগৎ। বাংলাদেশের তরুণ প্রজন্মকে AI যুগের 
              নেতৃত্ব দেওয়ার জন্য প্রস্তুত করাই আমাদের লক্ষ্য।
            </p>
            <p className="text-lg font-bengali text-gray-700 leading-relaxed">
              আমাদের দেশীয় প্রজ্ঞা আর আধুনিক প্রযুক্তির মেলবন্ধনে গড়ে তুলছি 
              এমন একটি শিক্ষাব্যবস্থা যা প্রতিটি বাঙালিকে বিশ্বমানের দক্ষতায় 
              এগিয়ে নিয়ে যাবে।
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </CardTitle>
                  <CardDescription className="font-bengali">
                    {stat.label}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="cultural-card rounded-2xl p-8 text-center border-primary/20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-3xl">🇧🇩</span>
            <h3 className="text-2xl font-bold font-display text-primary">
              কেন প্রম্পট শিক্ষা বেছে নেবেন?
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🌏</span>
              </div>
              <h4 className="font-bold font-bengali mb-2 text-primary">বাংলায় শিক্ষা</h4>
              <p className="font-bengali text-gray-600">
                মাতৃভাষায় গভীর জ্ঞান অর্জন
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="font-bold font-bengali mb-2 text-secondary">দেশীয় উদাহরণ</h4>
              <p className="font-bengali text-gray-600">
                বাংলাদেশি প্রেক্ষাপটে ব্যবহারিক শিক্ষা
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-bold font-bengali mb-2 text-accent">কমিউনিটি</h4>
              <p className="font-bengali text-gray-600">
                দেশব্যাপী সাপোর্ট নেটওয়ার্ক
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
