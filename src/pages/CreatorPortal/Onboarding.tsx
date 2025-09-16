import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Sparkles, Globe } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createScopedLogger } from "@/lib/logger";

const onboardingSchema = z.object({
  brandName: z.string().min(2, "ব্র্যান্ডের নাম অন্তত ২ অক্ষরের হতে হবে"),
  contactEmail: z
    .string()
    .email("সঠিক ইমেইল লিখুন")
    .transform((value) => value.trim().toLowerCase()),
  website: z
    .string()
    .url("সঠিক ওয়েবসাইট লিংক দিন")
    .or(z.literal(""))
    .optional(),
  primaryCategory: z.string().min(2, "ক্যাটেগরি উল্লেখ করুন"),
  pricingModel: z.enum(["one_time", "subscription"], {
    required_error: "প্রাইসিং মডেল নির্বাচন করুন",
  }),
  price: z.coerce.number({ invalid_type_error: "মূল্য সংখ্যায় লিখুন" }).min(0, "মূল্য শূন্যের কম হতে পারবে না"),
  currency: z.string().min(3).max(3),
  subscriptionInterval: z.string().optional(),
  trialPeriodDays: z.coerce
    .number({ invalid_type_error: "দিন সংখ্যা লিখুন" })
    .min(0)
    .max(365)
    .optional(),
  mission: z.string().min(10, "আপনার টুল সম্পর্কে আরও বিস্তারিত লিখুন"),
  tags: z.string().optional(),
  payoutPreference: z.string().min(2, "পেমেন্ট পদ্ধতি নির্বাচন করুন"),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const logger = createScopedLogger("creator-onboarding");

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

const Onboarding = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      brandName: "",
      contactEmail: "",
      website: "",
      primaryCategory: "",
      pricingModel: "subscription",
      price: 25,
      currency: "usd",
      subscriptionInterval: "month",
      trialPeriodDays: 14,
      mission: "",
      tags: "",
      payoutPreference: "bank_transfer",
    },
  });

  const handleSubmit = async (values: OnboardingFormValues) => {
    try {
      setIsSubmitting(true);

      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        logger.error("Failed to load user for onboarding", { error: userError });
        throw new Error("আপনাকে আগে সাইন ইন করতে হবে।");
      }

      const userId = userData.user?.id;

      if (!userId) {
        throw new Error("আপনাকে আগে সাইন ইন করতে হবে।");
      }

      const slug = slugify(values.brandName);

      if (!slug) {
        throw new Error("ব্র্যান্ড নাম থেকে সঠিক স্লাগ তৈরি করা যায়নি। অন্য নাম ব্যবহার করুন।");
      }

      const priceCents = Math.round(values.price * 100);
      const normalizedCurrency = values.currency.toLowerCase();
      const tags = (values.tags ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 10);

      const { error: insertError } = await supabase.from("creator_tools").insert({
        creator_id: userId,
        name: values.brandName.trim(),
        slug,
        category: values.primaryCategory.trim(),
        description: values.mission.trim(),
        pricing_type: values.pricingModel,
        price_cents: priceCents,
        currency: normalizedCurrency,
        subscription_interval:
          values.pricingModel === "subscription"
            ? (values.subscriptionInterval && values.subscriptionInterval.trim()) || "month"
            : null,
        trial_period_days:
          values.pricingModel === "subscription" && typeof values.trialPeriodDays === "number"
            ? values.trialPeriodDays
            : null,
        tags,
        metadata: {
          contactEmail: values.contactEmail,
          website: values.website && values.website.trim() !== "" ? values.website : null,
          payoutPreference: values.payoutPreference,
          onboardingCompletedAt: new Date().toISOString(),
        },
        is_active: false,
      });

      if (insertError) {
        if ("code" in insertError && insertError.code === "23505") {
          throw new Error("এই স্লাগ দিয়ে একটি টুল ইতিমধ্যেই আছে। অন্য নাম নির্বাচন করুন।");
        }

        logger.error("Failed to insert onboarding tool", { error: insertError, values });
        throw new Error("অনবোর্ডিং সম্পন্ন করা যায়নি। পরে আবার চেষ্টা করুন।");
      }

      toast({
        title: "স্বাগতম, ক্রিয়েটর!",
        description: "আপনার টুলের খসড়া সংরক্ষণ করা হয়েছে। এখন বিস্তারিত তথ্য যোগ করতে সাবমিশন ফর্মে যান।",
      });

      form.reset({
        ...values,
        mission: "",
        tags: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "অনবোর্ডিং ব্যর্থ হয়েছে";
      toast({
        title: "অনবোর্ডিং সম্পন্ন হয়নি",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-100">
      <SEOHead
        title="ক্রিয়েটর অনবোর্ডিং - প্রম্পট শিক্ষা"
        description="বাংলা AI টুল নির্মাতাদের জন্য অনবোর্ডিং ফর্ম। আপনার টুলের তথ্য যুক্ত করুন এবং মার্কেটপ্লেসে তালিকাভুক্ত করুন।"
        url="https://promptshiksha.com/creator/onboarding"
        keywords="creator onboarding, tool marketplace"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="cartoon-card bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge className="flex items-center gap-2 bg-rose-100 text-rose-600">
                <Sparkles className="h-4 w-4" />
                <span className="font-bengali">Creator Launchpad</span>
              </Badge>
              <h1 className="text-3xl font-display text-rose-600 md:text-4xl">আপনার টুল অনবোর্ড করুন</h1>
              <p className="font-bengali text-slate-600">
                ব্যবসায়িক তথ্য, মূল্য নির্ধারণ এবং যোগাযোগের বিবরণ যোগ করুন। অনুমোদনের পর আপনার টুল মার্কেটপ্লেসে প্রকাশিত হবে।
              </p>
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-dashed border-rose-200 bg-rose-50/70 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-emerald-500" />
                <div>
                  <h2 className="font-display text-lg text-rose-600">আমরা কী যাচাই করি</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 font-bengali text-sm text-slate-600">
                    <li>যোগাযোগযোগ্য ইমেইল ও সাপোর্ট ব্যবস্থা</li>
                    <li>রিলেভেন্ট ক্যাটেগরি ও পরিষ্কার প্রোডাক্ট বিবরণ</li>
                    <li>মূল্য ও বিলিং কাঠামো</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="mt-1 h-5 w-5 text-sky-500" />
                <div>
                  <h2 className="font-display text-lg text-rose-600">টিপস</h2>
                  <p className="font-bengali text-sm text-slate-600">
                    আপনার ওয়েবসাইট বা ডেমো লিংক দিলে ব্যবহারকারীরা দ্রুত আস্থা পায়। প্রাসঙ্গিক ট্যাগ ব্যবহার করলে খোঁজে আসা সহজ হয়।
                  </p>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8 grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bengali text-rose-600">প্রোডাক্ট তথ্য</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="brandName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">টুল/ব্র্যান্ড নাম</FormLabel>
                          <FormControl>
                            <Input placeholder="উদাহরণ: Prompt Automator" className="font-bengali" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="primaryCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">প্রধান ক্যাটেগরি</FormLabel>
                          <FormControl>
                            <Input placeholder="উদাহরণ: Productivity" className="font-bengali" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">সাপোর্ট ইমেইল</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="support@example.com" className="font-bengali" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">ওয়েবসাইট (ঐচ্ছিক)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://" className="font-bengali" {...field} />
                          </FormControl>
                          <FormDescription className="font-bengali text-xs">
                            ডেমো বা ডকুমেন্টেশন লিংক শেয়ার করতে পারেন।
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bengali text-rose-600">প্রাইসিং</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="pricingModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">প্রাইসিং মডেল</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="font-bengali">
                                <SelectValue placeholder="প্রাইসিং বেছে নিন" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="subscription">সাবস্ক্রিপশন</SelectItem>
                              <SelectItem value="one_time">এককালীন</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">মূল্য</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="1" className="font-bengali" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">কারেন্সি</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="font-bengali uppercase">
                                <SelectValue placeholder="USD" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="usd">USD</SelectItem>
                              <SelectItem value="bdt">BDT</SelectItem>
                              <SelectItem value="inr">INR</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("pricingModel") === "subscription" && (
                      <>
                        <FormField
                          control={form.control}
                          name="subscriptionInterval"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">বিলিং ইন্টারভ্যাল</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="font-bengali">
                                    <SelectValue placeholder="মাসিক" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="week">সাপ্তাহিক</SelectItem>
                                  <SelectItem value="month">মাসিক</SelectItem>
                                  <SelectItem value="quarter">ত্রৈমাসিক</SelectItem>
                                  <SelectItem value="year">বার্ষিক</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="trialPeriodDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">ট্রায়াল (দিন)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" max="60" className="font-bengali" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bengali text-rose-600">বিবরণ ও ট্যাগ</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="mission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">সংক্ষিপ্ত বিবরণ</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="আপনার টুল কীভাবে সাহায্য করে তার বিস্তারিত লিখুন"
                              className="font-bengali"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">ট্যাগ</FormLabel>
                          <FormControl>
                            <Input placeholder="automation, marketing, ai" className="font-bengali" {...field} />
                          </FormControl>
                          <FormDescription className="font-bengali text-xs">
                            কমা দিয়ে আলাদা করে সর্বোচ্চ ১০টি ট্যাগ যোগ করুন।
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="payoutPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bengali">পেআউট পদ্ধতি</FormLabel>
                          <FormControl>
                            <Input placeholder="উদাহরণ: Bank Transfer" className="font-bengali" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting} className="min-w-[200px] font-bengali">
                    {isSubmitting ? "সংরক্ষণ হচ্ছে..." : "অনবোর্ডিং সম্পন্ন করুন"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
