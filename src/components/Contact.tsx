
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        throw error;
      }

      toast.success('আপনার বার্তা সফলভাবে পাঠানো হয়েছে!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error('বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bangladesh-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 border border-primary/20">
            <span className="text-xl">📞</span>
            <span className="font-bengali font-medium">আমাদের সাথে থাকুন</span>
          </div>
          <h2 className="text-4xl font-bold font-display text-gray-900 mb-4">
            যোগাযোগ করুন
          </h2>
          <p className="text-xl text-gray-600 font-bengali max-w-3xl mx-auto leading-relaxed">
            আপনার AI শেখার যাত্রায় আমরা সবসময় পাশে আছি
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold font-bengali text-gray-900 mb-6">
              আমাদের সাথে যোগাযোগ করুন
            </h3>
            <p className="text-lg font-bengali text-gray-700 mb-6 leading-relaxed">
              আপনার কোন প্রশ্ন, পরামর্শ বা সহযোগিতার প্রয়োজন হলে আমাদের জানান। 
              বাংলাদেশের AI শিক্ষার ভবিষ্যৎ গড়তে আমরা সবসময় আপনার পাশে।
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

          <Card className="cultural-card border-primary/20">
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
                <Button type="submit" className="w-full" disabled={loading}>
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
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
