
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-bengali text-gray-900 mb-4">
            যোগাযোগ করুন
          </h2>
          <p className="text-xl text-gray-600 font-bengali max-w-3xl mx-auto">
            আমাদের সাথে যোগাযোগ করতে নিচের ফর্ম পূরণ করুন
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold font-bengali text-gray-900 mb-6">
              আমাদের সাথে যোগাযোগ করুন
            </h3>
            <p className="text-lg font-bengali text-gray-700 mb-8 leading-relaxed">
              আপনার কোন প্রশ্ন, মতামত বা পরামর্শ থাকলে আমাদের জানান। 
              আমরা সর্বদা আপনার সেবায় নিয়োজিত।
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold font-bengali">ইমেইল</h4>
                  <p className="text-gray-600">abir.abbas@proton.me</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold font-bengali">ফোন</h4>
                  <p className="text-gray-600">+৮৮০১৮৪১৬০৩৫৪২</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold font-bengali">ঠিকানা</h4>
                  <p className="text-gray-600">ঢাকা, বাংলাদেশ</p>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-bengali">মেসেজ পাঠান</CardTitle>
              <CardDescription className="font-bengali">
                আমরা যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="আপনার নাম"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="আপনার ইমেইল"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder="বিষয়"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="আপনার বার্তা লিখুন..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  বার্তা পাঠান
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
