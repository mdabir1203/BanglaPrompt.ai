import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldErrors, Resolver } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PenSquare, CheckCircle2 } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { createScopedLogger } from "@/lib/logger";

type PricingType = "one_time" | "subscription";

type SubmissionFormValues = {
  name: string;
  description: string;
  category: string;
  pricingType: PricingType;
  price: number;
  currency: string;
  subscriptionInterval?: string;
  trialPeriodDays?: number;
  tags: string;
  thumbnailUrl: string;
  demoUrl: string;
  documentationUrl: string;
  isActive: boolean;
  slug: string;
};

const isValidUrl = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};

const parseNumberInput = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }

    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : NaN;
  }

  return NaN;
};

const submissionResolver: Resolver<SubmissionFormValues> = async (rawValues) => {
  const errors: FieldErrors<SubmissionFormValues> = {};

  const name = typeof rawValues.name === "string" ? rawValues.name.trim() : "";
  const description = typeof rawValues.description === "string" ? rawValues.description.trim() : "";
  const category = typeof rawValues.category === "string" ? rawValues.category.trim() : "";
  const pricingType = rawValues.pricingType === "subscription" || rawValues.pricingType === "one_time"
    ? rawValues.pricingType
    : "subscription";
  const price = parseNumberInput(rawValues.price);
  const currency = typeof rawValues.currency === "string" ? rawValues.currency.trim().toLowerCase() : "";
  const subscriptionInterval = typeof rawValues.subscriptionInterval === "string"
    ? rawValues.subscriptionInterval.trim()
    : undefined;
  const trialPeriodDays = parseNumberInput(rawValues.trialPeriodDays);
  const tags = typeof rawValues.tags === "string" ? rawValues.tags.trim() : "";
  const thumbnailUrl = typeof rawValues.thumbnailUrl === "string" ? rawValues.thumbnailUrl.trim() : "";
  const demoUrl = typeof rawValues.demoUrl === "string" ? rawValues.demoUrl.trim() : "";
  const documentationUrl = typeof rawValues.documentationUrl === "string" ? rawValues.documentationUrl.trim() : "";
  const slug = typeof rawValues.slug === "string" ? rawValues.slug.trim() : "";
  const isActive = !!rawValues.isActive;

  if (name.length < 2) {
    errors.name = { type: "manual", message: "নাম প্রয়োজন" };
  }

  if (description.length < 10) {
    errors.description = { type: "manual", message: "প্রোডাক্টের বিবরণ অন্তত ১০ অক্ষর" };
  }

  if (category.length < 2) {
    errors.category = { type: "manual", message: "ক্যাটেগরি প্রয়োজন" };
  }

  if (Number.isNaN(price) || price === null) {
    errors.price = { type: "manual", message: "মূল্য সংখ্যায় লিখুন" };
  } else if (price < 0) {
    errors.price = { type: "manual", message: "মূল্য শূন্যের কম হতে পারবে না" };
  }

  if (!currency || currency.length !== 3) {
    errors.currency = { type: "manual", message: "কারেন্সি তিন অক্ষরের হতে হবে" };
  }

  if (pricingType === "subscription" && (!subscriptionInterval || subscriptionInterval.length < 2)) {
    errors.subscriptionInterval = { type: "manual", message: "বিলিং ইন্টারভ্যাল নির্বাচন করুন" };
  }

  if (trialPeriodDays !== null && trialPeriodDays !== undefined) {
    if (Number.isNaN(trialPeriodDays)) {
      errors.trialPeriodDays = { type: "manual", message: "দিন সংখ্যা লিখুন" };
    } else if (trialPeriodDays < 0 || trialPeriodDays > 365) {
      errors.trialPeriodDays = { type: "manual", message: "ট্রায়াল ০-৩৬৫ দিনের মধ্যে হতে হবে" };
    }
  }

  if (thumbnailUrl && !isValidUrl(thumbnailUrl)) {
    errors.thumbnailUrl = { type: "manual", message: "সঠিক থাম্বনেইল লিংক দিন" };
  }

  if (demoUrl && !isValidUrl(demoUrl)) {
    errors.demoUrl = { type: "manual", message: "সঠিক ডেমো লিংক দিন" };
  }

  if (documentationUrl && !isValidUrl(documentationUrl)) {
    errors.documentationUrl = { type: "manual", message: "সঠিক ডকুমেন্টেশন লিংক দিন" };
  }

  if (Object.keys(errors).length > 0) {
    return {
      values: {} as SubmissionFormValues,
      errors,
    };
  }

  return {
    values: {
      name,
      description,
      category,
      pricingType,
      price: price ?? 0,
      currency,
      subscriptionInterval: pricingType === "subscription" ? subscriptionInterval : undefined,
      trialPeriodDays:
        pricingType === "subscription" && typeof trialPeriodDays === "number" && !Number.isNaN(trialPeriodDays)
          ? trialPeriodDays
          : undefined,
      tags,
      thumbnailUrl,
      demoUrl,
      documentationUrl,
      isActive,
      slug,
    },
    errors: {},
  };
};

type CreatorTool = Tables<"creator_tools">;

type MetadataRecord = Record<string, unknown>;

const logger = createScopedLogger("creator-submit-tool");

const isMetadataRecord = (value: unknown): value is MetadataRecord =>
  !!value && typeof value === "object" && !Array.isArray(value);

const SubmitTool = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  const userQuery = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      return data.user;
    },
    staleTime: 60 * 1000,
  });

  const creatorId = userQuery.data?.id ?? null;

  const toolsQuery = useQuery<{ tools: CreatorTool[] }>({
    queryKey: ["creator-tools", creatorId, "manage"],
    enabled: !!creatorId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("creator_tools")
        .select("*")
        .eq("creator_id", creatorId)
        .order("created_at", { ascending: false });

      if (error) {
        logger.error("Failed to load creator tools for submission", { error });
        throw error;
      }

      return { tools: data ?? [] };
    },
  });

  const tools = useMemo(() => toolsQuery.data?.tools ?? [], [toolsQuery.data?.tools]);

  useEffect(() => {
    if (!selectedToolId && tools.length > 0) {
      setSelectedToolId(tools[0].id);
    }
  }, [tools, selectedToolId]);

  const selectedTool = useMemo(
    () => tools.find((tool) => tool.id === selectedToolId) ?? null,
    [tools, selectedToolId],
  );

  const form = useForm<SubmissionFormValues>({
    resolver: submissionResolver,
    defaultValues: {
      name: "",
      description: "",
      category: "",
      pricingType: "subscription",
      price: 0,
      currency: "usd",
      subscriptionInterval: "month",
      trialPeriodDays: undefined,
      tags: "",
      thumbnailUrl: "",
      demoUrl: "",
      documentationUrl: "",
      isActive: false,
      slug: "",
    },
  });

  useEffect(() => {
    if (!selectedTool) {
      return;
    }

    const metadata = isMetadataRecord(selectedTool.metadata) ? selectedTool.metadata : {};

    form.reset({
      name: selectedTool.name,
      description: selectedTool.description ?? "",
      category: selectedTool.category,
      pricingType: selectedTool.pricing_type as "one_time" | "subscription",
      price: selectedTool.price_cents / 100,
      currency: selectedTool.currency,
      subscriptionInterval: selectedTool.subscription_interval ?? "month",
      trialPeriodDays: selectedTool.trial_period_days ?? undefined,
      tags: selectedTool.tags.join(", "),
      thumbnailUrl: selectedTool.thumbnail_url ?? "",
      demoUrl: typeof metadata.demoUrl === "string" ? metadata.demoUrl : "",
      documentationUrl:
        typeof metadata.documentationUrl === "string" ? metadata.documentationUrl : "",
      isActive: selectedTool.is_active,
      slug: selectedTool.slug,
    });
  }, [selectedTool, form]);

  const handleSubmit = async (values: SubmissionFormValues) => {
    if (!selectedTool) {
      toast({
        title: "কোনও টুল নির্বাচন করা হয়নি",
        description: "ফর্ম সংরক্ষণের আগে একটি টুল নির্বাচন করুন।",
        variant: "destructive",
      });
      return;
    }

    try {
      const priceCents = Math.round(values.price * 100);
      const tagList = (values.tags ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 15);

      const currentMetadata = isMetadataRecord(selectedTool.metadata)
        ? { ...selectedTool.metadata }
        : {};

      const metadataPayload: MetadataRecord = {
        ...currentMetadata,
        demoUrl: values.demoUrl && values.demoUrl.trim() !== "" ? values.demoUrl.trim() : null,
        documentationUrl:
          values.documentationUrl && values.documentationUrl.trim() !== ""
            ? values.documentationUrl.trim()
            : null,
      };

      const { error } = await supabase
        .from("creator_tools")
        .update({
          name: values.name.trim(),
          description: values.description.trim(),
          category: values.category.trim(),
          pricing_type: values.pricingType,
          price_cents: priceCents,
          currency: values.currency.toLowerCase(),
          subscription_interval:
            values.pricingType === "subscription"
              ? (values.subscriptionInterval && values.subscriptionInterval.trim()) || "month"
              : null,
          trial_period_days:
            values.pricingType === "subscription" && typeof values.trialPeriodDays === "number"
              ? values.trialPeriodDays
              : null,
          tags: tagList,
          thumbnail_url: values.thumbnailUrl && values.thumbnailUrl.trim() !== ""
            ? values.thumbnailUrl.trim()
            : null,
          metadata: metadataPayload,
          is_active: values.isActive,
        })
        .eq("id", selectedTool.id);

      if (error) {
        logger.error("Failed to update creator tool", { error, values });
        throw new Error("টুল আপডেট করা যায়নি। পরে আবার চেষ্টা করুন।");
      }

      toast({
        title: "টুল সফলভাবে হালনাগাদ হয়েছে",
        description: values.isActive
          ? "আপনার টুলটি মার্কেটপ্লেসে লাইভ অবস্থায় রয়েছে।"
          : "টুলের খসড়া সংরক্ষিত হয়েছে। প্রকাশ করতে আবার সক্রিয় করুন।",
      });

      queryClient.invalidateQueries({ queryKey: ["creator-tools", creatorId, "manage"] });
    } catch (error) {
      const message = error instanceof Error ? error.message : "অজানা ত্রুটি";
      toast({
        title: "আপডেট ব্যর্থ হয়েছে",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-100">
      <SEOHead
        title="টুল সাবমিশন - ক্রিয়েটর পোর্টাল"
        description="আপনার টুলের বিবরণ হালনাগাদ করুন, থাম্বনেইল যুক্ত করুন এবং প্রকাশ করুন।"
        url="https://promptshiksha.com/creator/submit"
        keywords="tool submission, creator portal"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="cartoon-card bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge className="flex items-center gap-2 bg-orange-100 text-orange-600">
                <PenSquare className="h-4 w-4" />
                <span className="font-bengali">Submission Workspace</span>
              </Badge>
              <h1 className="text-3xl font-display text-orange-600 md:text-4xl">
                টুল সাবমিশন ও আপডেট
              </h1>
              <p className="font-bengali text-slate-600">
                প্রোডাক্ট ডিটেইল, স্ক্রিনশট এবং পাবলিশিং স্ট্যাটাস পরিচালনা করুন।
              </p>
            </div>

            {userQuery.isLoading && (
              <div className="mt-6 space-y-3">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}

            {userQuery.isError && (
              <Card className="mt-6 border-destructive/40 bg-destructive/10">
                <CardHeader>
                  <CardTitle className="font-bengali text-destructive">লগইন প্রয়োজন</CardTitle>
                  <CardDescription className="font-bengali text-destructive">
                    সাবমিশনের জন্য প্রথমে লগইন করুন।
                  </CardDescription>
                </CardHeader>
              </Card>
            )}

            {creatorId && toolsQuery.isSuccess && tools.length === 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="font-bengali text-rose-600">কোনও টুল পাওয়া যায়নি</CardTitle>
                  <CardDescription className="font-bengali text-slate-600">
                    অনবোর্ডিং সম্পন্ন করে একটি টুল তৈরি করুন, তারপর এখানে আপডেট করুন।
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="secondary" className="font-bengali">
                    <a href="/creator/onboarding">অনবোর্ডিং ফর্ম খুলুন</a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {creatorId && tools.length > 0 && (
              <div className="mt-6 space-y-6">
                <div>
                  <p className="font-bengali text-sm text-muted-foreground">আপনার টুল নির্বাচন করুন</p>
                  <Select
                    value={selectedToolId ?? undefined}
                    onValueChange={(value) => setSelectedToolId(value)}
                  >
                    <SelectTrigger className="mt-2 font-bengali">
                      <SelectValue placeholder="টুল বাছাই করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {tools.map((tool) => (
                        <SelectItem key={tool.id} value={tool.id}>
                          {tool.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-bengali text-orange-600">প্রোডাক্ট তথ্য</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">টুলের নাম</FormLabel>
                              <FormControl>
                                <Input className="font-bengali" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">ক্যাটেগরি</FormLabel>
                              <FormControl>
                                <Input className="font-bengali" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">স্লাগ</FormLabel>
                              <FormControl>
                                <Input className="font-bengali" disabled {...field} />
                              </FormControl>
                              <FormDescription className="font-bengali text-xs">
                                অনবোর্ডিং এর সময় স্লাগ নির্ধারিত হয়েছে। পরিবর্তনের জন্য সাপোর্টে যোগাযোগ করুন।
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="thumbnailUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">থাম্বনেইল URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://" className="font-bengali" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="demoUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">ডেমো লিংক</FormLabel>
                              <FormControl>
                                <Input placeholder="https://" className="font-bengali" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="documentationUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">ডকুমেন্টেশন লিংক</FormLabel>
                              <FormControl>
                                <Input placeholder="https://" className="font-bengali" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="font-bengali text-orange-600">বিবরণ</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">বর্ণনা</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={5}
                                  placeholder="টুলের ব্যবহার ক্ষেত্র ও মূল ফিচারগুলো লিখুন"
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
                                <Input placeholder="automation, marketing, creator" className="font-bengali" {...field} />
                              </FormControl>
                              <FormDescription className="font-bengali text-xs">
                                কমা দিয়ে আলাদা করে সর্বোচ্চ ১৫টি ট্যাগ যোগ করুন।
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="font-bengali text-orange-600">মূল্য ও সাবস্ক্রিপশন</CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="pricingType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bengali">প্রাইসিং মডেল</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="font-bengali">
                                    <SelectValue placeholder="বেছে নিন" />
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

                        {form.watch("pricingType") === "subscription" && (
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
                        <CardTitle className="font-bengali text-orange-600">প্রকাশনা সেটিংস</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-2xl border border-dashed border-orange-200 p-4">
                              <div>
                                <FormLabel className="font-bengali flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                  মার্কেটপ্লেসে প্রকাশ করুন
                                </FormLabel>
                                <FormDescription className="font-bengali text-xs">
                                  প্রকাশিত টুলগুলো মার্কেটপ্লেস তালিকায় দৃশ্যমান হবে এবং ইউজাররা কিনতে পারবে।
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    <div className="flex justify-end">
                      <Button type="submit" className="min-w-[180px] font-bengali">
                        সংরক্ষণ করুন
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitTool;
