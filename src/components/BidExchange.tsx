import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Clock,
  LineChart,
  Sparkles,
  Users,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LocalizedCopy {
  en: string;
  bn: string;
}

interface ExchangeListing {
  id: string;
  title: LocalizedCopy;
  category: LocalizedCopy;
  floorPrice: number;
  highestBid: number;
  watchers: number;
  bidVelocity: number;
  bidHistory: number[];
}

const INITIAL_LISTINGS: ExchangeListing[] = [
  {
    id: "enterprise-toolkit",
    title: {
      en: "Enterprise compliance assistant",
      bn: "এন্টারপ্রাইজ কমপ্লায়েন্স সহকারী",
    },
    category: { en: "Governance", bn: "গভর্নেন্স" },
    floorPrice: 280,
    highestBid: 342,
    watchers: 186,
    bidVelocity: 5.2,
    bidHistory: [260, 272, 281, 296, 302, 315, 325, 329, 333, 338, 340, 342],
  },
  {
    id: "creative-campaign",
    title: {
      en: "Diaspora brand storytelling kit",
      bn: "ডায়াসপোরা ব্র্যান্ড স্টোরিটেলিং কিট",
    },
    category: { en: "Marketing", bn: "মার্কেটিং" },
    floorPrice: 190,
    highestBid: 255,
    watchers: 143,
    bidVelocity: 3.8,
    bidHistory: [175, 180, 188, 194, 205, 213, 221, 227, 233, 240, 249, 255],
  },
  {
    id: "operations-suite",
    title: {
      en: "Microfinance collections co-pilot",
      bn: "মাইক্রোফাইন্যান্স কালেকশনস কো-পাইলট",
    },
    category: { en: "Operations", bn: "অপারেশনস" },
    floorPrice: 210,
    highestBid: 298,
    watchers: 162,
    bidVelocity: 4.4,
    bidHistory: [198, 204, 213, 220, 227, 233, 242, 250, 266, 274, 289, 298],
  },
  {
    id: "education",
    title: {
      en: "HSC study accelerator bundle",
      bn: "এইচএসসি স্টাডি অ্যাক্সেলারেটর বান্ডেল",
    },
    category: { en: "Education", bn: "শিক্ষা" },
    floorPrice: 95,
    highestBid: 134,
    watchers: 201,
    bidVelocity: 6.1,
    bidHistory: [84, 87, 92, 97, 102, 108, 113, 118, 122, 126, 130, 134],
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);

const BidExchange = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [listings, setListings] = useState<ExchangeListing[]>(INITIAL_LISTINGS);
  const [marketPulse, setMarketPulse] = useState({
    totalBids: 186,
    volume: 48250,
    avgClosing: 312,
    trend: 5.6,
  });
  const [activeListing, setActiveListing] = useState<ExchangeListing | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setListings((current) =>
        current.map((listing) => {
          const drift = (Math.random() - 0.35) * 8;
          const nextHighest = Math.max(
            listing.floorPrice * 0.85,
            listing.highestBid + drift,
          );
          const updatedHistory = [...listing.bidHistory.slice(-11), Number(nextHighest.toFixed(2))];
          const watcherDrift = Math.max(
            60,
            listing.watchers + Math.round((Math.random() - 0.3) * 4),
          );
          const velocityDrift = Math.max(
            0.8,
            Number((listing.bidVelocity + (Math.random() - 0.5) * 0.6).toFixed(2)),
          );

          return {
            ...listing,
            highestBid: Number(nextHighest.toFixed(2)),
            bidHistory: updatedHistory,
            watchers: watcherDrift,
            bidVelocity: velocityDrift,
          };
        }),
      );

      setMarketPulse((prev) => {
        const nextTrend = Math.min(
          14,
          Math.max(2, Number((prev.trend + (Math.random() - 0.5)).toFixed(1))),
        );
        const nextTotalBids = Math.max(
          120,
          prev.totalBids + Math.round((Math.random() - 0.35) * 6),
        );
        const nextVolume = Math.max(
          32000,
          prev.volume + Math.round((Math.random() - 0.45) * 1800),
        );
        const nextAvgClosing = Math.max(
          180,
          Number((prev.avgClosing + (Math.random() - 0.5) * 4).toFixed(1)),
        );

        return {
          totalBids: nextTotalBids,
          volume: nextVolume,
          avgClosing: nextAvgClosing,
          trend: nextTrend,
        };
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const topCategory = useMemo(() => {
    const tally = listings.reduce<Record<string, { watchers: number; copy: LocalizedCopy }>>(
      (acc, listing) => {
        const key = listing.category.en;
        const categoryData = acc[key] ?? { watchers: 0, copy: listing.category };
        acc[key] = {
          watchers: categoryData.watchers + listing.watchers,
          copy: categoryData.copy,
        };
        return acc;
      },
      {},
    );

    const [category] = Object.values(tally).sort((a, b) => b.watchers - a.watchers);
    return category?.copy;
  }, [listings]);

  const averageVelocity = useMemo(() => {
    if (!listings.length) {
      return 0;
    }

    const total = listings.reduce((sum, listing) => sum + listing.bidVelocity, 0);
    return Number((total / listings.length).toFixed(1));
  }, [listings]);

  const handleOpenBid = (listing: ExchangeListing) => {
    setActiveListing(listing);
    setBidAmount("");
    setIsDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setActiveListing(null);
      setBidAmount("");
    }
  };

  const handleConfirmBid = () => {
    if (!activeListing) {
      return;
    }

    const parsedAmount = Number.parseFloat(bidAmount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: isEnglish ? "Enter a valid amount" : "সঠিক বিড লিখুন",
        description: isEnglish
          ? "Add a bid amount greater than zero to continue."
          : "আগাতে শূন্যের বেশি বিড মূল্য দিন।",
        variant: "destructive",
      });
      return;
    }

    setListings((current) =>
      current.map((listing) => {
        if (listing.id !== activeListing.id) {
          return listing;
        }

        const nextHighest = Math.max(parsedAmount, listing.highestBid);
        const updatedHistory = [...listing.bidHistory.slice(-11), Number(nextHighest.toFixed(2))];

        return {
          ...listing,
          highestBid: Number(nextHighest.toFixed(2)),
          bidHistory: updatedHistory,
          watchers: listing.watchers + 5,
          bidVelocity: Number((listing.bidVelocity + 0.6).toFixed(1)),
        };
      }),
    );

    setMarketPulse((prev) => ({
      totalBids: prev.totalBids + 1,
      volume: prev.volume + Math.round(parsedAmount),
      avgClosing: Number(((prev.avgClosing * 0.85 + parsedAmount * 0.15)).toFixed(1)),
      trend: Math.min(14, Number((prev.trend + 0.6).toFixed(1))),
    }));

    toast({
      title: isEnglish ? "Bid submitted" : "বিড জমা হয়েছে",
      description: isEnglish
        ? "Your prompt bid is now live on the exchange."
        : "আপনার প্রম্পট বিড এখন এক্সচেঞ্জে লাইভ।",
    });

    setIsDialogOpen(false);
    setActiveListing(null);
    setBidAmount("");
  };

  const getTrendMeta = (history: number[]) => {
    if (history.length < 2) {
      return { direction: "steady" as const, change: 0 };
    }

    const change = history[history.length - 1] - history[history.length - 2];
    if (change > 1.5) {
      return { direction: "up" as const, change };
    }
    if (change < -1.5) {
      return { direction: "down" as const, change };
    }
    return { direction: "steady" as const, change };
  };

  return (
    <section id="exchange" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(247, 255, 246, 0.88) 45%, rgba(255, 246, 223, 0.82) 100%)",
          }}
        />
        <div
          className="absolute -top-32 left-[12%] h-80 w-80 rounded-full blur-[150px]"
          style={{ background: "rgba(34, 94, 56, 0.18)" }}
        />
        <div
          className="absolute -bottom-36 right-[8%] h-72 w-72 rounded-full blur-[130px]"
          style={{ background: "rgba(217, 119, 6, 0.2)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <p className="section-eyebrow">
              {isEnglish ? "Prompt bidding exchange" : "প্রম্পট বিডিং এক্সচেঞ্জ"}
            </p>
            <h2 className="section-heading text-balance">
              {isEnglish
                ? "Bid, sell, and watch market data update in real time."
                : "বিড করুন, বিক্রি করুন এবং বাজারের তথ্য দেখুন তাৎক্ষণিকভাবে।"}
            </h2>
            <p className="section-subheading">
              {isEnglish
                ? "The PromptBazar live exchange lets creators invite bids on premium workflows while enterprises track liquidity, price momentum, and buyer intent with streaming analytics."
                : "PromptBazar লাইভ এক্সচেঞ্জে ক্রিয়েটররা প্রিমিয়াম ওয়ার্কফ্লোতে বিড আহ্বান করতে পারে এবং এন্টারপ্রাইজ টিম তাৎক্ষণিক অ্যানালিটিক্সে লিকুইডিটি, মূল্যগত গতি ও ক্রেতাদের আগ্রহ ট্র্যাক করতে পারে।"}
            </p>
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-900 shadow-sm">
              <Activity className="h-4 w-4" />
              <span>
                {isEnglish
                  ? `Avg. ${averageVelocity} bids/min`
                  : `গড়ে মিনিটে ${averageVelocity}টি বিড`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start rounded-full border border-emerald-200/70 bg-white/80 p-2 shadow-sm">
            {(["buy", "sell"] as const).map((nextMode) => (
              <Button
                key={nextMode}
                type="button"
                variant={mode === nextMode ? "default" : "ghost"}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-semibold",
                  mode === nextMode
                    ? "bg-[var(--gradient-aurora)] text-white shadow-[var(--shadow-soft)] hover:bg-[var(--gradient-aurora)]"
                    : "text-emerald-900 hover:bg-emerald-50",
                )}
                onClick={() => setMode(nextMode)}
              >
                {isEnglish
                  ? nextMode === "buy"
                    ? "Buy-side bids"
                    : "Sell-side offers"
                  : nextMode === "buy"
                  ? "ক্রয় বিড"
                  : "বিক্রয় অফার"}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-panel order-2 space-y-6 rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-[0_32px_65px_-42px_rgba(34,94,56,0.55)] backdrop-blur lg:order-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {isEnglish ? "Live analytics" : "লাইভ অ্যানালিটিক্স"}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-emerald-900">
                  {isEnglish ? "Market pulse" : "বাজারের পালস"}
                </h3>
              </div>
              <LineChart className="h-6 w-6 text-primary" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/80 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-900/70">
                  {isEnglish ? "Active bids" : "সক্রিয় বিড"}
                </p>
                <p className="mt-3 text-3xl font-semibold text-emerald-950">
                  {marketPulse.totalBids.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>
                    {isEnglish
                      ? `Up ${marketPulse.trend.toFixed(1)}% QoQ`
                      : `ত্রৈমাসিকে ${marketPulse.trend.toFixed(1)}% বৃদ্ধি`}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100/80 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {isEnglish ? "24h volume" : "২৪ ঘণ্টার ভলিউম"}
                </p>
                <p className="mt-3 text-3xl font-semibold text-emerald-900">
                  {formatCurrency(marketPulse.volume)}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <Clock className="h-4 w-4" />
                  <span>{isEnglish ? "Rolling window" : "রোলিং উইন্ডো"}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100/80 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {isEnglish ? "Average closing" : "গড় ক্লোজিং"}
                </p>
                <p className="mt-3 text-3xl font-semibold text-emerald-900">
                  {formatCurrency(marketPulse.avgClosing)}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <Activity className="h-4 w-4" />
                  <span>
                    {isEnglish
                      ? `${averageVelocity} bids/min`
                      : `মিনিটে ${averageVelocity} বিড`}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100/80 bg-emerald-900 p-5 text-white shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-100/80">
                  {isEnglish ? "Top liquidity" : "সর্বোচ্চ লিকুইডিটি"}
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  {topCategory ? (isEnglish ? topCategory.en : topCategory.bn) : "—"}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-100/85">
                  <Users className="h-4 w-4" />
                  <span>
                    {isEnglish
                      ? "Most watched category"
                      : "সর্বাধিক নজরকাড়া ক্যাটাগরি"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-6 lg:order-2">
            {listings.map((listing) => {
              const trendMeta = getTrendMeta(listing.bidHistory);
              const maxHistory = Math.max(...listing.bidHistory);

              return (
                <div
                  key={listing.id}
                  className="glass-panel flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-[0_32px_65px_-42px_rgba(34,94,56,0.55)] backdrop-blur"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <Badge className="mb-3 w-fit rounded-full bg-emerald-100 text-emerald-900">
                        {isEnglish ? listing.category.en : listing.category.bn}
                      </Badge>
                      <h3 className="text-xl font-semibold text-emerald-950">
                        {isEnglish ? listing.title.en : listing.title.bn}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {isEnglish
                          ? "Streaming price book updated every five seconds."
                          : "প্রতি পাঁচ সেকেন্ডে আপডেট হওয়া স্ট্রিমিং প্রাইস বুক।"}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="rounded-2xl border border-emerald-100/80 bg-white px-4 py-3 text-right shadow-sm">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          {isEnglish ? "Highest bid" : "সর্বোচ্চ বিড"}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-emerald-900">
                          {formatCurrency(listing.highestBid)}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/80 px-4 py-3 text-right shadow-sm">
                        <p className="text-xs uppercase tracking-[0.3em] text-emerald-900/70">
                          {isEnglish ? "Floor" : "ফ্লোর"}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-emerald-900">
                          {formatCurrency(listing.floorPrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex flex-1 flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-3 py-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span>
                          {isEnglish
                            ? `${listing.watchers.toLocaleString()} watching`
                            : `${listing.watchers.toLocaleString()} জন নজরে রাখছে`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-3 py-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span>
                          {isEnglish
                            ? `${listing.bidVelocity} bids/min`
                            : `মিনিটে ${listing.bidVelocity} বিড`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-3 py-2">
                        {trendMeta.direction === "down" ? (
                          <ArrowDownRight className="h-4 w-4 text-amber-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                        )}
                        <span>
                          {trendMeta.direction === "steady"
                            ? isEnglish
                              ? "Flat momentum"
                              : "স্থিতিশীল গতি"
                            : isEnglish
                            ? `${trendMeta.direction === "up" ? "Bullish" : "Cooling"} ${formatCurrency(Math.abs(trendMeta.change))}`
                            : `${trendMeta.direction === "up" ? "উর্ধ্বমুখী" : "শীতল"} ${formatCurrency(Math.abs(trendMeta.change))}`}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="rounded-full bg-[var(--gradient-aurora)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
                      onClick={() => handleOpenBid(listing)}
                    >
                      {isEnglish
                        ? mode === "buy"
                          ? "Place buy bid"
                          : "List sell offer"
                        : mode === "buy"
                        ? "ক্রয় বিড দিন"
                        : "বিক্রির অফার দিন"}
                    </Button>
                  </div>

                  <div className="flex items-end gap-2">
                    {listing.bidHistory.map((point, index) => (
                      <div
                        key={`${listing.id}-history-${index}`}
                        className="flex-1 rounded-full bg-gradient-to-t from-emerald-200 to-emerald-500/70"
                        style={{
                          height: `${Math.max(8, (point / maxHistory) * 60)}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEnglish ? "Submit bid" : "বিড জমা দিন"}
            </DialogTitle>
            <DialogDescription>
              {isEnglish
                ? activeListing
                  ? `Add your ${mode === "buy" ? "buy bid" : "sell ask"} for ${activeListing.title.en}.`
                  : "Add a bid to publish it to the exchange."
                : activeListing
                ? `${activeListing.title.bn} এর জন্য ${mode === "buy" ? "ক্রয় বিড" : "বিক্রয় মূল্য"} যোগ করুন।`
                : "এক্সচেঞ্জে প্রকাশ করতে একটি বিড যোগ করুন।"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border/40 bg-muted/40 p-4 text-sm">
              <p className="font-semibold text-foreground">
                {activeListing
                  ? isEnglish
                    ? activeListing.title.en
                    : activeListing.title.bn
                  : "—"}
              </p>
              {activeListing && (
                <p className="mt-2 text-muted-foreground">
                  {isEnglish
                    ? `Current highest bid: ${formatCurrency(activeListing.highestBid)}`
                    : `বর্তমান সর্বোচ্চ বিড: ${formatCurrency(activeListing.highestBid)}`}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="bid-amount" className="text-sm font-medium text-foreground">
                {isEnglish ? "Bid amount (USD)" : "বিড পরিমাণ (USD)"}
              </label>
              <Input
                id="bid-amount"
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                value={bidAmount}
                onChange={(event) => setBidAmount(event.target.value)}
                placeholder={isEnglish ? "Enter amount" : "পরিমাণ লিখুন"}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 flex gap-3">
            <Button type="button" variant="ghost" onClick={() => handleDialogChange(false)}>
              {isEnglish ? "Cancel" : "বাতিল"}
            </Button>
            <Button type="button" onClick={handleConfirmBid}>
              {isEnglish ? "Confirm bid" : "বিড নিশ্চিত করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BidExchange;
