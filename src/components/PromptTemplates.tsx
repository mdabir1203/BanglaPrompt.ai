
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, FileText, MessageSquare, PenTool } from 'lucide-react';

const PromptTemplates = () => {
  const templates = [
    {
      icon: FileText,
      title: 'বিষয়বস্তু লেখার টেমপ্লেট',
      description: 'ব্লগ পোস্ট, আর্টিকেল এবং কন্টেন্ট তৈরির জন্য',
      template: `আপনি একজন অভিজ্ঞ কন্টেন্ট রাইটার। আমি যে বিষয়ে লিখতে চাই সেটি হল: [বিষয়]

দয়া করে নিম্নলিখিত কাঠামো অনুসরণ করুন:
1. আকর্ষণীয় শিরোনাম
2. সূচনা প্যারাগ্রাফ
3. মূল বিষয়বস্তু (৩-৫টি পয়েন্ট)
4. উপসংহার

লেখার স্টাইল: [আনুষ্ঠানিক/অনানুষ্ঠানিক]
শব্দ সীমা: [সংখ্যা] শব্দ`
    },
    {
      icon: MessageSquare,
      title: 'কথোপকথনের টেমপ্লেট',
      description: 'AI এর সাথে কার্যকর কথোপকথনের জন্য',
      template: `আমি [আপনার পরিচয়/ভূমিকা] হিসেবে আপনার সাথে কথা বলছি।

আমার প্রশ্ন/সমস্যা: [বিস্তারিত বর্ণনা]

আমি চাই আপনি:
- [নির্দিষ্ট অনুরোধ ১]
- [নির্দিষ্ট অনুরোধ ২]
- [নির্দিষ্ট অনুরোধ ৩]

উত্তর দেওয়ার সময় দয়া করে [বিশেষ নির্দেশনা] মনে রাখবেন।`
    },
    {
      icon: PenTool,
      title: 'সৃজনশীল লেখার টেমপ্লেট',
      description: 'গল্প, কবিতা এবং সৃজনশীল কাজের জন্য',
      template: `আপনি একজন দক্ষ সৃজনশীল লেখক। আমি চাই আপনি একটি [গল্প/কবিতা/স্ক্রিপ্ট] লিখুন।

বিষয়: [মূল থিম]
পরিবেশ: [সময় এবং স্থান]
চরিত্র: [প্রধান চরিত্রের বর্ণনা]
মেজাজ: [হাসি/গম্ভীর/রোমান্টিক/রহস্যময়]

অতিরিক্ত নির্দেশনা:
- [বিশেষ প্রয়োজনীয়তা]
- দৈর্ঘ্য: [শব্দ/পৃষ্ঠা সংখ্যা]`
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section id="prompt-templates" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bengali text-gray-900 mb-4">
            প্রম্পট টেমপ্লেট সংগ্রহ
          </h2>
          <p className="text-xl text-gray-600 font-bengali max-w-3xl mx-auto">
            তৈরি টেমপ্লেট ব্যবহার করে আরও কার্যকর প্রম্পট লিখুন
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <template.icon className="w-10 h-10 text-green-600 mb-3" />
                <CardTitle className="font-bengali">{template.title}</CardTitle>
                <CardDescription className="font-bengali">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm font-mono text-gray-700 max-h-48 overflow-y-auto">
                  {template.template}
                </div>
                <Button 
                  onClick={() => copyToClipboard(template.template)}
                  className="w-full"
                  variant="outline"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  কপি করুন
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromptTemplates;
