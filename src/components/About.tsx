
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
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bengali text-gray-900 mb-4">
            আমাদের সম্পর্কে
          </h2>
          <p className="text-xl text-gray-600 font-bengali max-w-3xl mx-auto">
            বাংলায় প্রম্পট ইঞ্জিনিয়ারিং শিক্ষার অগ্রদূত
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold font-bengali text-gray-900 mb-6">
              আমাদের মিশন
            </h3>
            <p className="text-lg font-bengali text-gray-700 mb-6 leading-relaxed">
              আমরা বিশ্বাস করি যে প্রম্পট ইঞ্জিনিয়ারিং হল ভবিষ্যতের একটি অত্যাবশ্যক দক্ষতা। 
              আমাদের লক্ষ্য হল বাংলাভাষী সকলের কাছে এই জ্ঞান পৌঁছে দেওয়া।
            </p>
            <p className="text-lg font-bengali text-gray-700 leading-relaxed">
              আমরা বিশেষজ্ঞ দল এবং আধুনিক শিক্ষা পদ্ধতির মাধ্যমে আপনাকে 
              AI এর যুগে এগিয়ে থাকতে সাহায্য করি।
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

        <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold font-bengali mb-4">
            কেন প্রম্পট শিক্ষা বেছে নেবেন?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div>
              <h4 className="font-bold font-bengali mb-2">বাংলায় শিক্ষা</h4>
              <p className="font-bengali text-blue-100">
                সম্পূর্ণ কোর্স বাংলায় তৈরি
              </p>
            </div>
            <div>
              <h4 className="font-bold font-bengali mb-2">ব্যবহারিক জ্ঞান</h4>
              <p className="font-bengali text-blue-100">
                বাস্তব প্রয়োগযোগ্য উদাহরণ
              </p>
            </div>
            <div>
              <h4 className="font-bold font-bengali mb-2">বিশেষজ্ঞ সহায়তা</h4>
              <p className="font-bengali text-blue-100">
                ২৪/৭ কমিউনিটি সাপোর্ট
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
