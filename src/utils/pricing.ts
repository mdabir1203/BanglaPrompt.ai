import {
  marketPricingBenchmarks,
  type MarketPricingBenchmark,
} from "@/data/marketPricing";

export interface PromptPricingInput {
  floorPriceUsd: number;
  highestBidUsd: number;
  bidHistoryUsd: number[];
  watchers: number;
  bidVelocity: number;
}

export interface PromptPricingResult {
  recommendedBidUsd: number;
  recommendedAskUsd: number;
  bidBandUsd: [number, number];
  recommendedBidEur: number;
  recommendedAskEur: number;
  bidBandEur: [number, number];
  momentumScore: number;
  demandScore: number;
  marketRangeUsd: [number, number];
  marketRangeEur: [number, number];
  marketComparables: MarketComparable[];
}

export interface MarketComparable {
  market: string;
  offering: MarketPricingBenchmark["offering"];
  usdRange: [number, number];
  eurRange: [number, number];
  usdPremiumAnchor: number;
  eurPremiumAnchor: number;
  sampleSize: number;
  notes: MarketPricingBenchmark["notes"];
  sourceUrl: string;
  lastUpdated: string;
}

const USD_TO_EUR_RATE = 0.92;

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const convertUsdToEur = (value: number) => Number((value * USD_TO_EUR_RATE).toFixed(2));

export const computeOptimizedPromptPricing = (
  input: PromptPricingInput,
): PromptPricingResult => {
  const { floorPriceUsd, highestBidUsd, bidHistoryUsd, watchers, bidVelocity } = input;

  const priceSpread = Math.max(5, highestBidUsd - floorPriceUsd);
  const normalizedWatchers = Math.min(watchers / 240, 2);
  const normalizedVelocity = Math.min(bidVelocity / 4.5, 2);

  const historyLength = bidHistoryUsd.length;
  const lookbackIndex = Math.max(0, historyLength - 6);
  const lookbackPrice = bidHistoryUsd[lookbackIndex] ?? floorPriceUsd;
  const latestPrice = bidHistoryUsd[historyLength - 1] ?? highestBidUsd;
  const trendGrowth = lookbackPrice > 0 ? (latestPrice - lookbackPrice) / lookbackPrice : 0;

  const momentumScoreRaw = trendGrowth * 0.6 + (bidVelocity - 3.2) * 0.08;
  const demandScoreRaw = normalizedWatchers * 0.42 + normalizedVelocity * 0.33 + Math.max(trendGrowth, 0) * 0.25;

  const momentumScore = Number(momentumScoreRaw.toFixed(2));
  const demandScore = Number(demandScoreRaw.toFixed(2));

  const marketComparables: MarketComparable[] = marketPricingBenchmarks.map((benchmark) => ({
    market: benchmark.market,
    offering: benchmark.offering,
    usdRange: [
      Number(benchmark.usdRange[0].toFixed(2)),
      Number(benchmark.usdRange[1].toFixed(2)),
    ],
    eurRange: [
      convertUsdToEur(benchmark.usdRange[0]),
      convertUsdToEur(benchmark.usdRange[1]),
    ],
    usdPremiumAnchor: Number(benchmark.usdPremiumAnchor.toFixed(2)),
    eurPremiumAnchor: convertUsdToEur(benchmark.usdPremiumAnchor),
    sampleSize: benchmark.sampleSize,
    notes: benchmark.notes,
    sourceUrl: benchmark.sourceUrl,
    lastUpdated: benchmark.lastUpdated,
  }));

  const aggregatedRangeLowUsd = marketPricingBenchmarks.length
    ? Math.min(...marketPricingBenchmarks.map((benchmark) => benchmark.usdRange[0]))
    : floorPriceUsd;

  const aggregatedRangeHighUsd = marketPricingBenchmarks.length
    ? Math.max(
        ...marketPricingBenchmarks.map((benchmark) =>
          benchmark.usdPremiumAnchor ?? benchmark.usdRange[1],
        ),
      )
    : highestBidUsd;

  const aggregatedMidUsd = marketPricingBenchmarks.length
    ?
        marketPricingBenchmarks.reduce(
          (sum, benchmark) => sum + (benchmark.usdRange[0] + benchmark.usdRange[1]) / 2,
          0,
        ) / marketPricingBenchmarks.length
    : (floorPriceUsd + highestBidUsd) / 2;

  const marketRangeUsd: [number, number] = [
    Number(aggregatedRangeLowUsd.toFixed(2)),
    Number(aggregatedRangeHighUsd.toFixed(2)),
  ];
  const marketRangeEur: [number, number] = [
    convertUsdToEur(aggregatedRangeLowUsd),
    convertUsdToEur(aggregatedRangeHighUsd),
  ];

  const marketWeight = marketPricingBenchmarks.length
    ? clamp((normalizedWatchers + normalizedVelocity) / 4, 0.25, 0.85)
    : 0;

  const optimizedSupport = floorPriceUsd + priceSpread * (0.45 + demandScoreRaw * 0.18);
  const optimizedBid = clamp(
    optimizedSupport * (1 + Math.max(momentumScoreRaw, 0) * 0.2),
    floorPriceUsd * 1.02,
    highestBidUsd * 0.995,
  );

  const optimizedAsk = clamp(
    highestBidUsd * (1 + demandScoreRaw * 0.14 + Math.max(momentumScoreRaw, 0) * 0.1),
    optimizedBid + priceSpread * 0.18,
    highestBidUsd * 1.2,
  );

  const bidLowerBoundUsd = Math.max(floorPriceUsd * 1.02, aggregatedRangeLowUsd);
  const bidUpperCandidateUsd = Math.min(highestBidUsd * 0.995, aggregatedRangeHighUsd * 0.9);
  const bidUpperBoundUsd = Math.max(bidLowerBoundUsd, bidUpperCandidateUsd);

  const anchoredBidUsd = marketPricingBenchmarks.length
    ? clamp(
        optimizedBid * (1 - marketWeight) + aggregatedMidUsd * marketWeight,
        bidLowerBoundUsd,
        bidUpperBoundUsd,
      )
    : optimizedBid;

  const askLowerBoundUsd = Math.max(anchoredBidUsd + priceSpread * 0.18, aggregatedRangeLowUsd * 1.15);
  const askUpperCandidateUsd = Math.min(highestBidUsd * 1.2, aggregatedRangeHighUsd);
  const askUpperBoundUsd = Math.max(askLowerBoundUsd, askUpperCandidateUsd);

  const anchoredAskUsd = marketPricingBenchmarks.length
    ? clamp(
        optimizedAsk * (1 - marketWeight) + aggregatedRangeHighUsd * marketWeight,
        askLowerBoundUsd,
        askUpperBoundUsd,
      )
    : optimizedAsk;

  const bandLowUsd = clamp(anchoredBidUsd * 0.97, floorPriceUsd, anchoredBidUsd);
  const bandHighUsd = clamp(anchoredAskUsd * 1.03, anchoredAskUsd, anchoredAskUsd * 1.2);

  const recommendedBidUsd = Number(anchoredBidUsd.toFixed(2));
  const recommendedAskUsd = Number(anchoredAskUsd.toFixed(2));
  const bidBandUsd: [number, number] = [Number(bandLowUsd.toFixed(2)), Number(bandHighUsd.toFixed(2))];

  return {
    recommendedBidUsd,
    recommendedAskUsd,
    bidBandUsd,
    recommendedBidEur: convertUsdToEur(recommendedBidUsd),
    recommendedAskEur: convertUsdToEur(recommendedAskUsd),
    bidBandEur: [convertUsdToEur(bandLowUsd), convertUsdToEur(bandHighUsd)],
    momentumScore,
    demandScore,
    marketRangeUsd,
    marketRangeEur,
    marketComparables,
  };
};
