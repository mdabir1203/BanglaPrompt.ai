import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { BarChart3, DollarSign, RefreshCcw, Users } from "lucide-react"

import SEOHead from "@/components/SEOHead"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import {
  fetchSellerCommissionSummary,
  fetchSellerPrompts,
  formatCurrency,
} from "@/integrations/marketplace"
import { supabase } from "@/integrations/supabase/client"
import { createScopedLogger } from "@/lib/logger"
import type {
  MarketplacePrompt,
  SellerCommissionSummary,
} from "@/types/marketplace"

const logger = createScopedLogger("seller-dashboard")

const SellerDashboard = () => {
  const { toast } = useToast()
  const [sellerId, setSellerId] = useState<string | null>(null)
  const [manualSellerId, setManualSellerId] = useState("")
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const resolveUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        logger.error("Failed to load current user", { error })
      }

      if (data?.user?.id) {
        setSellerId(data.user.id)
        setManualSellerId(data.user.id)
      }

      setAuthChecked(true)
    }

    resolveUser()
  }, [])

  const sellerPromptsQuery = useQuery({
    queryKey: ["marketplace", "seller-prompts", sellerId],
    queryFn: () => fetchSellerPrompts(sellerId as string),
    enabled: Boolean(sellerId),
    staleTime: 60_000,
  })

  const commissionSummaryQuery = useQuery({
    queryKey: ["marketplace", "commission-summary", sellerId],
    queryFn: () => fetchSellerCommissionSummary(sellerId as string),
    enabled: Boolean(sellerId),
    staleTime: 30_000,
  })

  const combinedPrompts = useMemo(() => {
    if (!sellerPromptsQuery.data) {
      return [] as Array<{
        prompt: MarketplacePrompt
        summary: SellerCommissionSummary
      }>
    }

    const summaryMap = new Map(
      (commissionSummaryQuery.data ?? []).map((entry) => [entry.promptId, entry]),
    )

    return sellerPromptsQuery.data.map((prompt) => ({
      prompt,
      summary:
        summaryMap.get(prompt.id) ?? {
          promptId: prompt.id,
          promptTitle: prompt.title,
          totalSales: 0,
          totalRevenueCents: 0,
          totalCommissionCents: 0,
          totalPayoutCents: 0,
        },
    }))
  }, [sellerPromptsQuery.data, commissionSummaryQuery.data])

  const totals = useMemo(() => {
    return combinedPrompts.reduce(
      (acc, entry) => ({
        totalSales: acc.totalSales + entry.summary.totalSales,
        totalRevenueCents: acc.totalRevenueCents + entry.summary.totalRevenueCents,
        totalCommissionCents:
          acc.totalCommissionCents + entry.summary.totalCommissionCents,
        totalPayoutCents: acc.totalPayoutCents + entry.summary.totalPayoutCents,
        activePrompts: acc.activePrompts + (entry.prompt.isActive ? 1 : 0),
      }),
      {
        totalSales: 0,
        totalRevenueCents: 0,
        totalCommissionCents: 0,
        totalPayoutCents: 0,
        activePrompts: 0,
      },
    )
  }, [combinedPrompts])

  const isLoading =
    sellerPromptsQuery.isLoading || commissionSummaryQuery.isLoading
  const hasError = sellerPromptsQuery.isError || commissionSummaryQuery.isError

  const activeError = sellerPromptsQuery.error ?? commissionSummaryQuery.error

  const handleManualLoad = () => {
    const trimmed = manualSellerId.trim()
    if (!trimmed) {
      toast({
        title: "সেলার আইডি প্রয়োজন",
        description: "ড্যাশবোর্ড দেখতে আপনার সেলার আইডি দিন।",
        variant: "destructive",
      })
      return
    }

    setSellerId(trimmed)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <SEOHead
        title="সেলার ড্যাশবোর্ড - প্রম্পট মার্কেটপ্লেস"
        description="আপনার প্রিমিয়াম প্রম্পট বিক্রয়, আয় এবং কমিশন ট্র্যাক করুন।"
        url="https://promptshiksha.com/seller"
        keywords="Seller dashboard, prompt marketplace earnings"
      />

      <section className="border-b border-slate-200/60 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
              সেলার পারফরমেন্স ড্যাশবোর্ড
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
              মার্কেটপ্লেসে আপনার প্রকাশিত প্রম্পটগুলোর বিক্রয়, আয় এবং কমিশন রিয়েল-টাইমে ট্র্যাক করুন। Supabase ফাংশনের মাধ্যমে কমিশন স্বয়ংক্রিয়ভাবে আপডেট হয়।
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>সেলার আইডি যাচাই</CardTitle>
                <CardDescription>
                  Supabase অথেন্টিকেশন থেকে আমরা আপনার ইউজার আইডি সংগ্রহের চেষ্টা করি। প্রয়োজন হলে ম্যানুয়ালি আইডি দিন।
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  value={manualSellerId}
                  onChange={(event) => setManualSellerId(event.target.value)}
                  placeholder="আপনার সেলার আইডি"
                  className="sm:w-64"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleManualLoad}
                >
                  লোড করুন
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/80 p-4 text-sm text-emerald-700">
                  <p className="font-medium">বর্তমান সেলার আইডি</p>
                  <p className="truncate text-base font-semibold text-emerald-900">
                    {sellerId ?? "অজানা"}
                  </p>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50/80 p-4 text-sm text-amber-700">
                  <p className="font-medium">অথেন্টিকেশন অবস্থা</p>
                  <p className="font-semibold text-amber-900">
                    {authChecked
                      ? sellerId
                        ? "Supabase থেকে আইডি শনাক্ত করা হয়েছে"
                        : "ম্যানুয়াল আইডি প্রয়োজন"
                      : "পরীক্ষা চলছে..."}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <RefreshCcw className="h-4 w-4" />
              <span>সেলার আইডি পরিবর্তন করলে ডেটা স্বয়ংক্রিয়ভাবে রিফ্রেশ হবে।</span>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>সেলারের দ্রুত পর্যালোচনা</CardTitle>
              <CardDescription>
                মোট বিক্রয় এবং আয়ের সারাংশ Supabase ফাংশন থেকে সংগ্রহ করা হয়েছে।
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-slate-100/70 px-4 py-2">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <Users className="h-4 w-4" /> মোট বিক্রয়
                </span>
                <span className="font-semibold text-slate-900">{totals.totalSales}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-100/70 px-4 py-2">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  <DollarSign className="h-4 w-4" /> মোট আয়
                </span>
                <span className="font-semibold text-emerald-600">
                  {formatCurrency(totals.totalRevenueCents)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-100/70 px-4 py-2">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  কমিশন
                </span>
                <span className="font-semibold text-rose-600">
                  {formatCurrency(totals.totalCommissionCents)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-100/70 px-4 py-2">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  আপনার আয়
                </span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(totals.totalPayoutCents)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-100/70 px-4 py-2">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  সক্রিয় প্রম্পট
                </span>
                <span className="font-semibold text-slate-900">{totals.activePrompts}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 rounded-3xl bg-white/90 p-6 shadow-xl shadow-amber-100/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                প্রম্পট পারফরমেন্স
              </h2>
              <p className="text-sm text-slate-600">
                প্রতিটি ক্রয়ে Supabase ফাংশনের মাধ্যমে কমিশন ও পেআউট ট্র্যাক করা হয়।
              </p>
            </div>
            <div className="text-sm text-slate-500">
              সর্বশেষ আপডেট {new Date().toLocaleString("bn-BD")}
            </div>
          </div>

          {!sellerId && (
            <Alert className="mt-6" variant="destructive">
              <AlertTitle>সেলার আইডি প্রয়োজন</AlertTitle>
              <AlertDescription>
                ড্যাশবোর্ড লোড করতে আপনার Supabase ইউজার আইডি প্রদান করুন অথবা লগইন করুন।
              </AlertDescription>
            </Alert>
          )}

          {hasError && (
            <Alert className="mt-6" variant="destructive">
              <AlertTitle>ডেটা লোড ব্যর্থ</AlertTitle>
              <AlertDescription>
                {activeError instanceof Error
                  ? activeError.message
                  : "Supabase থেকে তথ্য আনতে সমস্যা হয়েছে।"}
              </AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="mt-6 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={`seller-row-${index}`} className="h-12 w-full" />
              ))}
            </div>
          )}

          {!isLoading && sellerId && combinedPrompts.length === 0 && !hasError && (
            <Card className="mt-6 border border-dashed border-amber-200 bg-amber-50/70 text-center">
              <CardHeader>
                <CardTitle>এখনও কোন প্রম্পট প্রকাশ করেননি</CardTitle>
                <CardDescription>
                  আপনার প্রম্পট প্রকাশ করলে বিক্রয় ও কমিশন এখানে দেখা যাবে।
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {!isLoading && combinedPrompts.length > 0 && (
            <div className="mt-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>শিরোনাম</TableHead>
                    <TableHead>মূল্য</TableHead>
                    <TableHead>মোট বিক্রয়</TableHead>
                    <TableHead>মোট আয়</TableHead>
                    <TableHead>কমিশন</TableHead>
                    <TableHead>আপনার অংশ</TableHead>
                    <TableHead>অবস্থা</TableHead>
                    <TableHead>আপডেট</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {combinedPrompts.map(({ prompt, summary }) => (
                    <TableRow key={prompt.id} className="hover:bg-amber-50/40">
                      <TableCell className="max-w-xs font-medium text-slate-800">
                        <div className="line-clamp-2">{prompt.title}</div>
                      </TableCell>
                      <TableCell>{formatCurrency(prompt.priceCents, prompt.currency)}</TableCell>
                      <TableCell>{summary.totalSales}</TableCell>
                      <TableCell>{formatCurrency(summary.totalRevenueCents)}</TableCell>
                      <TableCell className="text-rose-600">
                        {formatCurrency(summary.totalCommissionCents)}
                      </TableCell>
                      <TableCell className="text-emerald-600">
                        {formatCurrency(summary.totalPayoutCents)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={prompt.isActive ? "default" : "secondary"}
                          className={
                            prompt.isActive
                              ? "bg-emerald-500 text-white hover:bg-emerald-500"
                              : "bg-slate-200 text-slate-700"
                          }
                        >
                          {prompt.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(prompt.updatedAt).toLocaleDateString("bn-BD")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default SellerDashboard
