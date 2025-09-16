export interface MarketplacePrompt {
  id: string
  title: string
  description?: string | null
  prompt: string
  tags: string[]
  priceCents: number
  currency: string
  authorName: string
  authorAvatarUrl?: string | null
  commissionRate: number
  preview?: string | null
  metadata: Record<string, unknown>
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface MarketplacePurchaseRequest {
  promptId: string
  buyerEmail?: string
  paymentReference?: string
}

export interface MarketplacePurchaseResult {
  saleId: string
  promptId: string
  saleAmountCents: number
  commissionCents: number
  sellerEarningsCents: number
  createdAt: string
}

export interface SellerCommissionSummary {
  promptId: string
  promptTitle: string
  totalSales: number
  totalRevenueCents: number
  totalCommissionCents: number
  totalPayoutCents: number
}
