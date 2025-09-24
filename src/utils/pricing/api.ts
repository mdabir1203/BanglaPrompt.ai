import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type PricingAudienceRow = Tables<"pricing_audiences">;
type PricingFeatureRow = Tables<"pricing_features">;
type PricingHighlightRow = Tables<"pricing_highlights">;

export type PricingAudienceWithFeatures = PricingAudienceRow & {
  features: PricingFeatureRow[];
};

export type PricingContent = {
  audiences: PricingAudienceWithFeatures[];
  highlights: PricingHighlightRow[];
};

const sortByOrder = <T extends { sort_order: number }>(items: T[]) =>
  [...items].sort((a, b) => a.sort_order - b.sort_order);

export const fetchPricingContent = async (): Promise<PricingContent> => {
  const [audiencesResult, featuresResult, highlightsResult] = await Promise.all([
    supabase
      .from("pricing_audiences")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("pricing_features")
      .select("*")
      .eq("is_active", true),
    supabase
      .from("pricing_highlights")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  if (audiencesResult.error) {
    throw audiencesResult.error;
  }

  if (featuresResult.error) {
    throw featuresResult.error;
  }

  if (highlightsResult.error) {
    throw highlightsResult.error;
  }

  const audiences = (audiencesResult.data ?? []).map<PricingAudienceWithFeatures>(audience => ({
    ...audience,
    features: sortByOrder(
      (featuresResult.data ?? []).filter(feature => feature.audience_id === audience.id),
    ),
  }));

  return {
    audiences,
    highlights: sortByOrder(highlightsResult.data ?? []),
  };
};
