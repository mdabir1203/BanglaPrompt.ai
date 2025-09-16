import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Filter, CreditCard, Repeat } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createScopedLogger } from "@/lib/logger";
import type { Tables } from "@/integrations/supabase/types";
import {
  ACTIVE_SUBSCRIPTION_STATUSES,
  initiateOneOffPurchase,
  initiateSubscriptionPurchase,
} from "@/utils/payments";

const logger = createScopedLogger("tools-marketplace-page");

type CreatorTool = Tables<"creator_tools">;
type SubscriptionRecord = Pick<
  Tables<"tool_subscriptions">,
  "tool_id" | "status" | "purchase_type"
>;

const formatCurrency = (valueInCents: number, currency: string) => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
    }).format(valueInCents / 100);
  } catch (error) {
    logger.warn("Falling back to default currency formatting", { error, currency });
    return `$${(valueInCents / 100).toFixed(0)}`;
  }
};

const getIntervalLabel = (tool: CreatorTool) => {
  if (tool.pricing_type === "subscription") {
    return tool.subscription_interval
      ? `/${tool.subscription_interval}`
      : "/month";
  }

  return "";
};

const pricingIcon = (tool: CreatorTool) =>
  tool.pricing_type === "subscription" ? <Repeat className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />;

const ToolsMarketplace = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [processingToolId, setProcessingToolId] = useState<string | null>(null);

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

  const userId = userQuery.data?.id ?? null;

  const accessQuery = useQuery<SubscriptionRecord[]>({
    queryKey: ["buyer-subscriptions", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tool_subscriptions")
        .select("tool_id, status, purchase_type")
        .eq("buyer_id", userId);

      if (error) {
        logger.error("Failed to load buyer subscriptions", { error });
        throw error;
      }

      return data ?? [];
    },
    staleTime: 60 * 1000,
  });

  const { data: tools, isLoading, isError, error } = useQuery<CreatorTool[]>({
    queryKey: ["creator-tools", "marketplace"],
    queryFn: async () => {
      const { data, error: toolsError } = await supabase
        .from("creator_tools")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (toolsError) {
        logger.error("Failed to load creator tools", { error: toolsError });
        throw toolsError;
      }

      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const categories = useMemo(() => {
    if (!tools) {
      return [] as string[];
    }

    const unique = new Set<string>();

    tools.forEach((tool) => {
      if (tool.category) {
        unique.add(tool.category);
      }
    });

    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [tools]);

  const maxPriceValue = useMemo(() => {
    if (!tools || tools.length === 0) {
      return 0;
    }

    const maxPriceCents = Math.max(...tools.map((tool) => tool.price_cents));
    return Math.ceil(maxPriceCents / 100);
  }, [tools]);

  const accessibleToolIds = useMemo(() => {
    if (!accessQuery.data) {
      return new Set<string>();
    }

    const activeStatuses = new Set<string>(ACTIVE_SUBSCRIPTION_STATUSES);
    const allowed = new Set<string>();

    accessQuery.data.forEach((record) => {
      if (
        (record.purchase_type === "subscription" && activeStatuses.has(record.status)) ||
        (record.purchase_type === "one_time" && record.status === "completed")
      ) {
        allowed.add(record.tool_id);
      }
    });

    return allowed;
  }, [accessQuery.data]);

  useEffect(() => {
    if (maxPriceValue === 0) {
      return;
    }

    setPriceRange((previous) => {
      const clampedMin = Math.min(previous[0], maxPriceValue);

      if (previous[1] === 0 || previous[1] !== maxPriceValue || previous[0] !== clampedMin) {
        return [clampedMin, maxPriceValue];
      }

      return previous;
    });
  }, [maxPriceValue]);

  const filteredTools = useMemo(() => {
    if (!tools) {
      return [] as CreatorTool[];
    }

    const [minPrice, maxPrice] = priceRange;

    return tools.filter((tool) => {
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      const price = tool.price_cents / 100;
      const matchesPrice = price >= minPrice && price <= maxPrice;

      return matchesCategory && matchesPrice;
    });
  }, [tools, priceRange, selectedCategory]);

  const handlePurchase = useCallback(
    async (tool: CreatorTool, hasActiveAccess: boolean) => {
      try {
        if (hasActiveAccess) {
          toast({
            title: "আপনি ইতিমধ্যেই অ্যাক্সেস পেয়েছেন",
            description: "বর্তমান সাবস্ক্রিপশন বা কেনাকাটা সক্রিয় রয়েছে।",
          });
          return;
        }

        setProcessingToolId(tool.id);

        const metadata = {
          toolSlug: tool.slug,
          toolName: tool.name,
          category: tool.category,
        } satisfies Record<string, unknown>;

        const result =
          tool.pricing_type === "subscription"
            ? await initiateSubscriptionPurchase({
                toolId: tool.id,
                priceCents: tool.price_cents,
                currency: tool.currency,
                metadata,
              })
            : await initiateOneOffPurchase({
                toolId: tool.id,
                priceCents: tool.price_cents,
                currency: tool.currency,
                metadata,
              });

        if (result.checkoutUrl) {
          toast({
            title: "Redirecting to checkout",
            description: "Hold tight! We're sending you to our payment partner to finish the purchase.",
          });
          window.location.assign(result.checkoutUrl);
          return;
        }

        toast({
          title: "Checkout initiated",
          description: "We saved your request. You'll receive the final payment link shortly.",
        });
      } catch (purchaseError) {
        const message = purchaseError instanceof Error ? purchaseError.message : "Unable to start checkout.";
        toast({
          title: "Payment could not start",
          description: message,
          variant: "destructive",
        });
      } finally {
        setProcessingToolId(null);
      }
    },
    [toast],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-100">
      <SEOHead
        title="ক্রিয়েটর টুল মার্কেটপ্লেস"
        description="বাংলা AI নির্মাতাদের তৈরি প্রোডাক্টিভিটি টুল, অটোমেশন এবং প্লাগইন খুঁজে নিন। সাবস্ক্রিপশন বা এককালীন কেনাকাটার মাধ্যমে এক্সেস নিন।"
        keywords="বাংলা AI টুলস, Creator marketplace, Prompt Tools"
        url="https://promptshiksha.com/tools"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-5 py-2 text-sm font-bengali shadow">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span>বাংলা AI মেকারদের বানানো টুল সংগ্রহ</span>
          </div>
          <h1 className="mt-6 text-4xl font-display text-rose-600 md:text-5xl">
            ক্রিয়েটর টুল মার্কেটপ্লেস
          </h1>
          <p className="mt-4 mx-auto max-w-2xl font-bengali text-lg text-slate-700">
            প্রোডাক্টিভিটি, অটোমেশন এবং ক্রিয়েটিভ অ্যাপ্লিকেশন নিয়ে সাজানো আমাদের মার্কেটপ্লেস থেকে আপনার প্রয়োজন অনুযায়ী টুল বেছে নিন।
          </p>
        </div>

        <div className="mt-12 rounded-3xl bg-white/80 p-8 shadow-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 font-bengali text-slate-700">
              <Filter className="h-5 w-5 text-rose-500" />
              <span>ফিল্টার করুন</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <p className="font-bengali text-sm text-muted-foreground">ক্যাটেগরি</p>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="font-bengali">
                    <SelectValue placeholder="সব টুল" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব টুল</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="font-bengali text-sm text-muted-foreground">সর্বোচ্চ মূল্য</p>
                <div>
                  <Slider
                    value={priceRange}
                    min={0}
                    max={Math.max(maxPriceValue, 50)}
                    step={5}
                    onValueChange={(value) => {
                      if (value.length === 2) {
                        setPriceRange([value[0], value[1]]);
                      }
                    }}
                  />
                  <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                    <span>৳{priceRange[0]}</span>
                    <span>৳{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-bengali text-sm text-muted-foreground">মোট টুল</p>
                <div className="rounded-2xl bg-rose-50 p-4 text-center font-bengali text-rose-600">
                  {filteredTools.length} / {tools?.length ?? 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="cartoon-card">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}

          {isError && (
            <Card className="md:col-span-2 xl:col-span-3">
              <CardHeader>
                <CardTitle className="font-bengali text-rose-600">টুল লোড করতে সমস্যা হয়েছে</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bengali text-slate-700">
                  {error instanceof Error ? error.message : "অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন।"}
                </p>
              </CardContent>
            </Card>
          )}

          {!isLoading && !isError && filteredTools.length === 0 && (
            <Card className="md:col-span-2 xl:col-span-3">
              <CardHeader>
                <CardTitle className="font-bengali text-rose-600">কোনও টুল পাওয়া যায়নি</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-bengali text-slate-700">
                  আপনার নির্বাচিত ফিল্টার অনুযায়ী বর্তমানে কোনও টুল নেই। ভিন্ন ফিল্টার ব্যবহার করে আবার খোঁজ করুন।
                </p>
              </CardContent>
            </Card>
          )}

          {filteredTools.map((tool) => {
            const priceLabel = formatCurrency(tool.price_cents, tool.currency);
            const intervalLabel = getIntervalLabel(tool);

            const hasAccess = accessibleToolIds.has(tool.id);

            return (
              <Card key={tool.id} className="cartoon-card flex h-full flex-col justify-between">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-3 text-xl font-display text-rose-600">
                    <span>{tool.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-bengali capitalize">
                        {tool.pricing_type === "subscription" ? "সাবস্ক্রিপশন" : "এককালীন"}
                      </Badge>
                      {hasAccess && (
                        <Badge variant="outline" className="font-bengali border-emerald-200 text-emerald-600">
                          অ্যাক্সেস সক্রিয়
                        </Badge>
                      )}
                    </div>
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {pricingIcon(tool)}
                    <span className="font-bengali text-base text-rose-500">
                      {priceLabel} <span className="text-sm text-muted-foreground">{intervalLabel}</span>
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-bengali text-slate-700">{tool.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="font-bengali">
                      {tool.category}
                    </Badge>
                    {tool.tags.map((tag) => (
                      <Badge key={`${tool.id}-${tag}`} variant="outline" className="font-bengali">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full font-bengali"
                    disabled={processingToolId === tool.id || hasAccess}
                    onClick={() => handlePurchase(tool, hasAccess)}
                  >
                    {processingToolId === tool.id
                      ? "চলমান..."
                      : hasAccess
                        ? "অ্যাক্সেস আছে"
                        : tool.pricing_type === "subscription"
                          ? "সাবস্ক্রাইব করুন"
                          : "কিনুন"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl bg-rose-600 p-10 text-center text-white">
          <h2 className="text-3xl font-display">নিজের টুল তৈরি করেছেন?</h2>
          <p className="mt-3 font-bengali text-lg text-rose-50">
            আমাদের ক্রিয়েটর পোর্টালে যোগ দিয়ে আপনার টুল সাবমিট করুন এবং সাবস্ক্রাইবার ও ক্রেতাদের কাছে পৌঁছে যান।
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild variant="secondary" className="bg-white text-rose-600 hover:bg-rose-50">
              <a href="/creator/onboarding">ক্রিয়েটর হিসেবে যোগ দিন</a>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <a href="/creator/submit">নতুন টুল সাবমিট করুন</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsMarketplace;
