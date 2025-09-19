import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, Headset } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useRateLimit } from "@/hooks/useRateLimit";
import { createScopedLogger } from "@/lib/logger";
import { useLanguage } from "@/contexts/LanguageContext";

const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_ATTEMPTS = 3;

const contactLogger = createScopedLogger("contact-form");

const Contact = () => {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(true);
  const { checkRateLimit, resetTime, remainingAttempts } = useRateLimit({
    maxAttempts: RATE_LIMIT_ATTEMPTS,
    timeWindow: RATE_LIMIT_WINDOW,
    identifier: "contact-form",
  });

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) return;

    if (!navigator.onLine) {
      toast.error(
        isEnglish ? "No internet connection. Please try again later." : "ইন্টারনেট সংযোগ নেই। পরে আবার চেষ্টা করুন।",
      );
      return;
    }

    if (!checkRateLimit()) {
      const waitMs = Math.max(resetTime - Date.now(), 0);
      const waitMinutes = Math.ceil(waitMs / 60000);
      const attemptsLeft = Math.max(remainingAttempts, 0);
      const warningMessage = isEnglish
        ? `You've reached the submission limit. Try again in ${waitMinutes} minute(s). (${attemptsLeft} attempts left)`
        : `আপনি বার্তা পাঠানোর সীমা অতিক্রম করেছেন। ${waitMinutes} মিনিট পরে আবার চেষ্টা করুন। (${attemptsLeft} প্রচেষ্টা বাকি)`;
      toast.warning(warningMessage);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) {
        throw error;
      }

      toast.success(isEnglish ? "Your message has been sent!" : "আপনার বার্তা সফলভাবে পাঠানো হয়েছে!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      contactLogger.error("Error sending contact form message", { error });
      toast.error(
        isEnglish ? "We couldn’t send your message. Please try again." : "বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      );
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="support" className="section bg-gradient-to-b from-background to-primary/10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <p className="section-eyebrow">{isEnglish ? "Global Support" : "গ্লোবাল সাপোর্ট"}</p>
            <h2 className="section-heading">
              {isEnglish
                ? "Concierge for creators and enterprises."
                : "ক্রিয়েটর ও এন্টারপ্রাইজের জন্য কনসিয়ার্জ সহায়তা।"}
            </h2>
            <p className="section-subheading">
              {isEnglish
                ? "Our bilingual strategy desk guides licensing, go-to-market localisation, and enterprise integrations with measurable precision."
                : "লাইসেন্সিং নির্দেশনা, গো-টু-মার্কেট লোকালাইজেশন ও এন্টারপ্রাইজ ইন্টিগ্রেশন—সবকিছুতেই পরিমিত নির্ভুলতা নিয়ে আমাদের দ্বিভাষিক স্ট্র্যাটেজি ডেস্ক পাশে আছে।"}
            </p>

            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur">
              <div className="flex items-center gap-3">
                <Headset className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isEnglish ? "Response in under 12 hours" : "১২ ঘণ্টার মধ্যে সাড়া"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isEnglish ? "Priority queue for verified partners" : "যাচাইকৃত পার্টনারদের জন্য অগ্রাধিকার"}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
                <div className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-4">
                  <p className="text-foreground font-semibold">
                    {isEnglish ? "Enterprise Hotline" : "এন্টারপ্রাইজ হটলাইন"}
                  </p>
                  <p>+880 1841 603 542</p>
                  <p className="text-muted-foreground">
                    {isEnglish ? "72h onboarding guarantee" : "৭২ ঘণ্টায় অনবোর্ডিং নিশ্চয়তা"}
                  </p>
                </div>
                <div className="rounded-2xl border border-muted-foreground/20 bg-background/80 p-4">
                  <p className="text-foreground font-semibold">
                    {isEnglish ? "Creator Success" : "ক্রিয়েটর সাকসেস"}
                  </p>
                  <p>creators@promptbazaar.ai</p>
                  <p className="text-muted-foreground">
                    {isEnglish ? "Guides, payouts, strategy" : "গাইড, পেআউট, স্ট্র্যাটেজি"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
              <div className="rounded-2xl border border-muted-foreground/20 bg-white/80 p-4 shadow-sm">
                <Mail className="mb-2 h-5 w-5 text-primary" />
                <p className="font-semibold text-foreground">abir.abbas@proton.me</p>
                <p>{isEnglish ? "Primary strategic liaison" : "প্রধান কৌশলগত যোগাযোগ"}</p>
              </div>
              <div className="rounded-2xl border border-muted-foreground/20 bg-white/80 p-4 shadow-sm">
                <MapPin className="mb-2 h-5 w-5 text-secondary" />
                <p className="font-semibold text-foreground">Dhaka • Singapore • New York</p>
                <p>{isEnglish ? "Hybrid coverage model" : "হাইব্রিড কাভারেজ মডেল"}</p>
              </div>
            </div>
          </div>

          <Card className="rounded-[2rem] border border-white/60 bg-white/90 shadow-[var(--shadow-soft)] backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                {isEnglish ? "Partner with promptbazaar.ai" : "promptbazaar.ai-এর সাথে পার্টনার হোন"}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {isEnglish
                  ? "Share your goal—we’ll orchestrate the right prompts, governance, and go-live runway."
                  : "আপনার লক্ষ্য জানান—সঠিক প্রম্পট, গভর্নেন্স ও গো-লাইভ সাপোর্ট আমরা নিশ্চিত করব।"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    name="name"
                    placeholder={isEnglish ? "Name" : "নাম"}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder={isEnglish ? "Work email" : "কর্মস্থলের ইমেইল"}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Input
                  name="subject"
                  placeholder={isEnglish ? "Project focus" : "প্রকল্পের বিষয়"}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  name="message"
                  placeholder={isEnglish ? "Tell us about your goals" : "আপনার লক্ষ্য সম্পর্কে বলুন"}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="submit"
                  className="w-full rounded-full bg-[var(--gradient-aurora)] text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
                  disabled={loading}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {loading
                    ? isEnglish
                      ? "Sending..."
                      : "পাঠানো হচ্ছে..."
                    : isEnglish
                      ? "Start the conversation"
                      : "বার্তা পাঠান"}
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
