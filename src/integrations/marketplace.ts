import { supabase } from "@/integrations/supabase/client"
import type { Tables } from "@/integrations/supabase/types"
import { createScopedLogger } from "@/lib/logger"
import type {
  MarketplacePrompt,
  MarketplacePurchaseRequest,
  MarketplacePurchaseResult,
  SellerCommissionSummary,
} from "@/types/marketplace"

const logger = createScopedLogger("marketplace-integration")

const mapPrompt = (row: Tables<"marketplace_prompts">): MarketplacePrompt => ({
  id: row.id,
  title: row.title,
  description: row.description,
  prompt: row.prompt,
  tags: row.tags ?? [],
  priceCents: row.price_cents,
  currency: row.currency,
  authorName: row.author_name,
  authorAvatarUrl: row.author_avatar_url ?? undefined,
  commissionRate: Number(row.commission_rate ?? "0"),
  preview: row.preview ?? undefined,
  metadata: (typeof row.metadata === "object" && row.metadata !== null
    ? (row.metadata as Record<string, unknown>)
    : {}),
  isActive: Boolean(row.is_active),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

export const fetchMarketplacePrompts = async (): Promise<MarketplacePrompt[]> => {
  const { data, error } = await supabase
    .from("marketplace_prompts")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    logger.error("Failed to fetch marketplace prompts", { error })
    throw error
  }

  return (data ?? []).map(mapPrompt)
}

export const fetchSellerPrompts = async (
  authorId: string,
): Promise<MarketplacePrompt[]> => {
  const { data, error } = await supabase
    .from("marketplace_prompts")
    .select("*")
    .eq("author_id", authorId)
    .order("created_at", { ascending: false })

  if (error) {
    logger.error("Failed to fetch seller prompts", { error, authorId })
    throw error
  }

  return (data ?? []).map(mapPrompt)
}

export const fetchSellerCommissionSummary = async (
  authorId: string,
): Promise<SellerCommissionSummary[]> => {
  const { data, error } = await supabase.rpc("get_seller_commission_summary", {
    p_author_id: authorId,
  })

  if (error) {
    logger.error("Failed to fetch seller commission summary", { error, authorId })
    throw error
  }

  return (data ?? []).map((entry) => ({
    promptId: entry.prompt_id,
    promptTitle: entry.prompt_title,
    totalSales: Number(entry.total_sales ?? 0),
    totalRevenueCents: Number(entry.total_revenue_cents ?? 0),
    totalCommissionCents: Number(entry.total_commission_cents ?? 0),
    totalPayoutCents: Number(entry.total_payout_cents ?? 0),
  }))
}

interface MarketplacePurchaseOptions extends MarketplacePurchaseRequest {
  saleAmountCents?: number
}

export const purchaseMarketplacePrompt = async (
  request: MarketplacePurchaseOptions,
): Promise<MarketplacePurchaseResult> => {
  const metadata = {
    source: "marketplace-web",
    requested_amount: request.saleAmountCents,
  }

  const { data, error } = await supabase.rpc("record_marketplace_sale", {
    p_prompt_id: request.promptId,
    p_buyer_email: request.buyerEmail,
    p_payment_reference: request.paymentReference,
    p_sale_amount_cents: request.saleAmountCents,
    p_metadata: metadata,
  })

  if (error) {
    logger.error("Failed to record marketplace sale", { error, request })
    throw error
  }

  const saleRecord = data?.[0]

  if (!saleRecord) {
    const err = new Error("Sale was not recorded by Supabase")
    logger.error("Missing sale record in RPC response", { request })
    throw err
  }

  return {
    saleId: saleRecord.sale_id,
    promptId: saleRecord.prompt_id,
    saleAmountCents: saleRecord.sale_amount_cents,
    commissionCents: saleRecord.commission_cents,
    sellerEarningsCents: saleRecord.seller_earnings_cents,
    createdAt: saleRecord.created_at,
  }
}

export const formatCurrency = (cents: number, currency = "BDT") => {
  try {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(cents / 100)
  } catch (error) {
    logger.warn("Falling back to manual currency formatting", { error, cents, currency })
    return `${(cents / 100).toFixed(2)} ${currency}`
  }
}
