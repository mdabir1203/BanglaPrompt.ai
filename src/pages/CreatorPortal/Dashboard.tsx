import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Users, Wallet } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { createScopedLogger } from "@/lib/logger";

const logger = createScopedLogger("creator-dashboard");

type CreatorTool = Tables<"creator_tools">;
type ToolSubscription = Tables<"tool_subscriptions">;

interface SubscriptionWithTool extends ToolSubscription {
  creator_tools?: Pick<CreatorTool, "name" | "slug" | "subscription_interval"> | null;
}

const ACTIVE_STATUSES = ["active", "trialing"];
const COMPLETED_STATUSES = ["completed", "active", "trialing"];

const intervalToMonthlyFactor: Record<string, number> = {
  week: 4,
  month: 1,
  quarter: 1 / 3,
  year: 1 / 12,
};

const formatCurrencySummary = (values: Map<string, number>) => {
  if (values.size === 0) {
    return "—";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return Array.from(values.entries())
    .map(([currency, cents]) => {
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency.toUpperCase(),
          maximumFractionDigits: 0,
        }).format(cents / 100);
      } catch (error) {
        logger.warn("Failed to format currency", { currency, error });
        return formatter.format(cents / 100);
      }
    })
    .join(" · ");
};

const formatBuyer = (buyerId: string) => `${buyerId.slice(0, 8)}…${buyerId.slice(-4)}`;

const Dashboard = () => {
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
    queryKey: ["creator-tools", creatorId, "dashboard"],
    enabled: !!creatorId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("creator_tools")
        .select("*")
        .eq("creator_id", creatorId);

      if (error) {
        logger.error("Failed to load creator tools", { error });
        throw error;
      }

      return { tools: data ?? [] };
    },
  });

  const tools = useMemo(() => toolsQuery.data?.tools ?? [], [toolsQuery.data?.tools]);

  const toolMap = useMemo(() => {
    const map = new Map<string, CreatorTool>();
    tools.forEach((tool) => map.set(tool.id, tool));
    return map;
  }, [tools]);

  const toolIds = useMemo(() => tools.map((tool) => tool.id), [tools]);
  const toolIdKey = useMemo(() => toolIds.slice().sort().join(","), [toolIds]);

  const subscriptionsQuery = useQuery<SubscriptionWithTool[]>({
    queryKey: ["creator-subscriptions", toolIdKey],
    enabled: toolIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tool_subscriptions")
        .select("*, creator_tools(name, slug, subscription_interval)")
        .in("tool_id", toolIds);

      if (error) {
        logger.error("Failed to load tool subscriptions", { error });
        throw error;
      }

      return (data ?? []) as SubscriptionWithTool[];
    },
  });

  const subscriptions = useMemo(
    () => subscriptionsQuery.data ?? [],
    [subscriptionsQuery.data],
  );

  const stats = useMemo(() => {
    const revenueByCurrency = new Map<string, number>();
    const mrrByCurrency = new Map<string, number>();
    let activeSubscribers = 0;
    const pendingPayouts: SubscriptionWithTool[] = [];
    const upcomingRenewals: SubscriptionWithTool[] = [];
    const subscriberList: SubscriptionWithTool[] = [];
    const salesByTool = new Map<
      string,
      { toolId: string; toolName: string; revenue: Map<string, number>; count: number }
    >();

    subscriptions.forEach((subscription) => {
      const currency = (subscription.currency ?? "usd").toLowerCase();
      const tool = toolMap.get(subscription.tool_id);
      const revenueBucket = revenueByCurrency.get(currency) ?? 0;

      if (COMPLETED_STATUSES.includes(subscription.status)) {
        revenueByCurrency.set(currency, revenueBucket + subscription.price_cents);
      }

      if (subscription.purchase_type === "subscription" && ACTIVE_STATUSES.includes(subscription.status)) {
        activeSubscribers += 1;
        subscriberList.push(subscription);

        const interval = tool?.subscription_interval ?? "month";
        const factor = intervalToMonthlyFactor[interval] ?? 1;
        const monthlyValue = Math.round(subscription.price_cents * factor);
        const currentMrr = mrrByCurrency.get(currency) ?? 0;
        mrrByCurrency.set(currency, currentMrr + monthlyValue);

        if (subscription.current_period_end) {
          upcomingRenewals.push(subscription);
        }
      }

      if (subscription.status === "pending") {
        pendingPayouts.push(subscription);
      }

      const existing = salesByTool.get(subscription.tool_id);
      const revenueMap = existing?.revenue ?? new Map<string, number>();
      const currentRevenue = revenueMap.get(currency) ?? 0;
      revenueMap.set(currency, currentRevenue + subscription.price_cents);

      salesByTool.set(subscription.tool_id, {
        toolId: subscription.tool_id,
        toolName: tool?.name ?? subscription.creator_tools?.name ?? "Unknown Tool",
        revenue: revenueMap,
        count: (existing?.count ?? 0) + 1,
      });
    });

    upcomingRenewals.sort((a, b) => {
      const aTime = a.current_period_end ? new Date(a.current_period_end).getTime() : Number.MAX_SAFE_INTEGER;
      const bTime = b.current_period_end ? new Date(b.current_period_end).getTime() : Number.MAX_SAFE_INTEGER;
      return aTime - bTime;
    });

    const topTools = Array.from(salesByTool.values()).sort((a, b) => {
      const revenueA = Array.from(a.revenue.values()).reduce((sum, value) => sum + value, 0);
      const revenueB = Array.from(b.revenue.values()).reduce((sum, value) => sum + value, 0);
      return revenueB - revenueA;
    });

    return {
      revenueByCurrency,
      mrrByCurrency,
      activeSubscribers,
      pendingPayouts,
      upcomingRenewals: upcomingRenewals.slice(0, 5),
      subscriberList: subscriberList.slice(0, 5),
      topTools: topTools.slice(0, 5),
    };
  }, [subscriptions, toolMap]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-100">
      <SEOHead
        title="ক্রিয়েটর ড্যাশবোর্ড"
        description="বিক্রি, সাবস্ক্রাইবার এবং পেআউট অনুরোধের হালনাগাদ পরিসংখ্যান।"
        url="https://promptshiksha.com/creator/dashboard"
        keywords="creator analytics, sales dashboard"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="cartoon-card bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-3 text-center">
              <Badge className="flex items-center gap-2 bg-slate-100 text-slate-700">
                <BarChart3 className="h-4 w-4" />
                <span className="font-bengali">Growth Analytics</span>
              </Badge>
              <h1 className="text-3xl font-display text-slate-700 md:text-4xl">ড্যাশবোর্ড সারাংশ</h1>
              <p className="font-bengali text-slate-600">
                বিক্রি, সাবস্ক্রাইবার এবং পেআউট অবস্থা এক নজরে দেখুন।
              </p>
            </div>

            {userQuery.isLoading && (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={`dashboard-skeleton-${index}`} className="h-32 w-full" />
                ))}
              </div>
            )}

            {userQuery.isError && (
              <Card className="mt-8 border-destructive/40 bg-destructive/10">
                <CardHeader>
                  <CardTitle className="font-bengali text-destructive">লগইন প্রয়োজন</CardTitle>
                </CardHeader>
              </Card>
            )}

            {creatorId && (
              <div className="mt-8 space-y-8">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-bengali text-slate-700">মোট বিক্রি</CardTitle>
                        <p className="text-sm text-muted-foreground">সমস্ত সফল অর্ডারের মোট</p>
                      </div>
                      <Wallet className="h-5 w-5 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold text-slate-700">
                        {formatCurrencySummary(stats.revenueByCurrency)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-bengali text-slate-700">MRR</CardTitle>
                        <p className="text-sm text-muted-foreground">মাসিক পুনরাবৃত্ত আয়</p>
                      </div>
                      <BarChart3 className="h-5 w-5 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold text-slate-700">
                        {formatCurrencySummary(stats.mrrByCurrency)}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-bengali text-slate-700">সক্রিয় সাবস্ক্রাইবার</CardTitle>
                        <p className="text-sm text-muted-foreground">লাইভ সাবস্ক্রিপশন সংখ্যার সারাংশ</p>
                      </div>
                      <Users className="h-5 w-5 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold text-slate-700">{stats.activeSubscribers}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-bengali text-slate-700">পেআউট অনুরোধ</CardTitle>
                        <p className="text-sm text-muted-foreground">পেমেন্ট প্রসেসিং-এ থাকা অর্ডার</p>
                      </div>
                      <Wallet className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-xl font-semibold text-slate-700">{stats.pendingPayouts.length}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-bengali text-slate-700">শীর্ষ টুল পারফরম্যান্স</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>টুল</TableHead>
                            <TableHead>বিক্রয়</TableHead>
                            <TableHead>রাজস্ব</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {stats.topTools.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={3} className="font-bengali text-center text-muted-foreground">
                                এখনও কোনও বিক্রি নেই
                              </TableCell>
                            </TableRow>
                          )}
                          {stats.topTools.map(({ toolId, toolName, count, revenue }) => (
                            <TableRow key={toolId}>
                              <TableCell className="font-bengali">
                                {toolMap.get(toolId)?.name ?? toolName}
                              </TableCell>
                              <TableCell>{count}</TableCell>
                              <TableCell>{formatCurrencySummary(revenue)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="font-bengali text-slate-700">সক্রিয় সাবস্ক্রাইবার</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>সাবস্ক্রাইবার</TableHead>
                            <TableHead>টুল</TableHead>
                            <TableHead>স্ট্যাটাস</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {stats.subscriberList.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={3} className="font-bengali text-center text-muted-foreground">
                                এখনও কোনও সক্রিয় সাবস্ক্রাইবার নেই
                              </TableCell>
                            </TableRow>
                          )}
                          {stats.subscriberList.map((subscription) => (
                            <TableRow key={subscription.id}>
                              <TableCell>{formatBuyer(subscription.buyer_id)}</TableCell>
                              <TableCell className="font-bengali">
                                {toolMap.get(subscription.tool_id)?.name ?? subscription.creator_tools?.name ?? "Unknown"}
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="font-bengali capitalize">
                                  {subscription.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bengali text-slate-700">পেআউট অনুরোধ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>টুল</TableHead>
                          <TableHead>ক্রেতা</TableHead>
                          <TableHead>পরিমাণ</TableHead>
                          <TableHead>অবস্থা</TableHead>
                          <TableHead>তৈরির সময়</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stats.pendingPayouts.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="font-bengali text-center text-muted-foreground">
                              বর্তমানে কোনও পেআউট অনুরোধ নেই
                            </TableCell>
                          </TableRow>
                        )}
                        {stats.pendingPayouts.map((subscription) => (
                          <TableRow key={subscription.id}>
                            <TableCell className="font-bengali">
                              {toolMap.get(subscription.tool_id)?.name ?? subscription.creator_tools?.name ?? "Unknown"}
                            </TableCell>
                            <TableCell>{formatBuyer(subscription.buyer_id)}</TableCell>
                            <TableCell>
                              {formatCurrencySummary(
                                new Map([[subscription.currency ?? "usd", subscription.price_cents]]),
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-bengali capitalize">
                                {subscription.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {format(new Date(subscription.created_at), "PPp")}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableCaption className="font-bengali">
                        পেমেন্ট প্রসেসিং সম্পন্ন হলে স্ট্যাটাস স্বয়ংক্রিয়ভাবে পরিবর্তিত হবে।
                      </TableCaption>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-bengালি text-slate-700">আসন্ন নবায়ন</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>টুল</TableHead>
                          <TableHead>সাবস্ক্রাইবার</TableHead>
                          <TableHead>নবায়নের তারিখ</TableHead>
                          <TableHead>অবশিষ্ট সময়</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stats.upcomingRenewals.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="font-bengali text-center text-muted-foreground">
                              নিকট ভবিষ্যতে কোনও নবায়ন নেই
                            </TableCell>
                          </TableRow>
                        )}
                        {stats.upcomingRenewals.map((subscription) => {
                          const endDate = subscription.current_period_end
                            ? new Date(subscription.current_period_end)
                            : null;

                          return (
                            <TableRow key={`renewal-${subscription.id}`}>
                              <TableCell className="font-bengali">
                                {toolMap.get(subscription.tool_id)?.name ?? subscription.creator_tools?.name ?? "Unknown"}
                              </TableCell>
                              <TableCell>{formatBuyer(subscription.buyer_id)}</TableCell>
                              <TableCell>
                                {endDate ? format(endDate, "PP") : "—"}
                              </TableCell>
                              <TableCell>
                                {endDate ? formatDistanceToNow(endDate, { addSuffix: true }) : "—"}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
