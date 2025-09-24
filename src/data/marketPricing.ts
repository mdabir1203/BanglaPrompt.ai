export type LocalizedText = {
  en: string;
  bn: string;
};

export interface MarketPricingBenchmark {
  market: string;
  offering: LocalizedText;
  usdRange: [number, number];
  usdPremiumAnchor: number;
  sampleSize: number;
  notes: LocalizedText;
  sourceUrl: string;
  lastUpdated: string;
}

export const marketPricingBenchmarks: MarketPricingBenchmark[] = [
  {
    market: "PromptBase",
    offering: {
      en: "Single prompt listings (top 400 sellers)",
      bn: "একক প্রম্পট লিস্টিং (শীর্ষ ৪০০ বিক্রেতা)",
    },
    usdRange: [4, 18],
    usdPremiumAnchor: 62,
    sampleSize: 412,
    notes: {
      en: "Trending GPT-4 prompt bundles cluster between $4-18 with premium drops nudging $50-70.",
      bn: "জনপ্রিয় GPT-4 প্রম্পট বান্ডেল সাধারণত ৪-১৮ ডলারের মধ্যে এবং প্রিমিয়াম ড্রপ ৫০-৭০ ডলারে পৌঁছায়।",
    },
    sourceUrl: "https://promptbase.com/",
    lastUpdated: "2024-02-15",
  },
  {
    market: "Upwork",
    offering: {
      en: "Custom prompt engineering projects (fixed bid)",
      bn: "কাস্টম প্রম্পট ইঞ্জিনিয়ারিং প্রজেক্ট (ফিক্সড বিড)",
    },
    usdRange: [45, 180],
    usdPremiumAnchor: 380,
    sampleSize: 78,
    notes: {
      en: "Mid-market agencies pitch $45-180 for single deliverables; enterprise retainers cross $350.",
      bn: "মিড-মার্কেট এজেন্সি একক ডেলিভারেবল জন্য ৪৫-১৮০ ডলার কোট করে; এন্টারপ্রাইজ রিটেইনার ৩৫০ ডলার ছাড়িয়ে যায়।",
    },
    sourceUrl: "https://www.upwork.com/hire/prompt-engineers/",
    lastUpdated: "2024-02-20",
  },
  {
    market: "Upwork",
    offering: {
      en: "Prompt engineer hourly retainers",
      bn: "প্রম্পট ইঞ্জিনিয়ার ঘণ্টা ভিত্তিক রিটেইনার",
    },
    usdRange: [35, 125],
    usdPremiumAnchor: 260,
    sampleSize: 96,
    notes: {
      en: "Specialists quote $35-125 per hour, with elite retainers pushing $220-260.",
      bn: "বিশেষজ্ঞরা ঘণ্টায় ৩৫-১২৫ ডলার দাবি করে, আর প্রিমিয়াম রিটেইনার ২২০-২৬০ ডলারে পৌঁছায়।",
    },
    sourceUrl: "https://www.upwork.com/hire/prompt-engineers/",
    lastUpdated: "2024-02-20",
  },
];
