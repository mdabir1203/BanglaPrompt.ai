import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  AlertCircle,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
} from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  fetchMarketplacePrompts,
  formatCurrency,
  purchaseMarketplacePrompt,
} from "@/integrations/marketplace"
import type { MarketplacePrompt } from "@/types/marketplace"

const Marketplace = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [activePrompt, setActivePrompt] = useState<MarketplacePrompt | null>(
    null,
  )
  const [buyerEmail, setBuyerEmail] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    data: prompts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["marketplace", "prompts"],
    queryFn: fetchMarketplacePrompts,
    staleTime: 60_000,
  })

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    prompts.forEach((prompt) => {
      prompt.tags.forEach((tag) => {
        if (tag) {
          tagSet.add(tag)
        }
      })
    })

    return Array.from(tagSet).sort((a, b) => a.localeCompare(b))
  }, [prompts])

  const filteredPrompts = useMemo(() => {
    if (!prompts.length) {
      return []
    }

    const normalized = searchTerm.trim().toLowerCase()

    return prompts.filter((prompt) => {
      const matchesTag = selectedTag ? prompt.tags.includes(selectedTag) : true

      if (!normalized) {
        return matchesTag
      }

      const haystacks = [
        prompt.title,
        prompt.description ?? "",
        prompt.authorName,
        prompt.tags.join(" "),
      ].map((value) => value.toLowerCase())

      const matchesSearch = haystacks.some((value) => value.includes(normalized))

      return matchesTag && matchesSearch
    })
  }, [prompts, searchTerm, selectedTag])

  const purchaseMutation = useMutation({
    mutationFn: purchaseMarketplacePrompt,
    onSuccess: (result) => {
      toast({
        title: "ক্রয় সফল", // Purchase Successful
        description: `আপনার মোট মূল্য ${formatCurrency(result.saleAmountCents)}। প্রম্পটটি এখন আপনার ইমেইলে পাঠানো হবে।`,
      })
      setIsDialogOpen(false)
      setActivePrompt(null)
      setBuyerEmail("")
    },
    onError: (mutationError) => {
      const description =
        mutationError instanceof Error
          ? mutationError.message
          : "অজানা কারণে পেমেন্ট সম্পন্ন হয়নি।" // Unknown error
      toast({
        title: "ক্রয় ব্যর্থ", // Purchase failed
        description,
        variant: "destructive",
      })
    },
  })

  const openPurchaseDialog = (prompt: MarketplacePrompt) => {
    setActivePrompt(prompt)
    setIsDialogOpen(true)
  }

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) {
      setActivePrompt(null)
      setBuyerEmail("")
    }
  }

  const handleConfirmPurchase = () => {
    if (!activePrompt) {
      return
    }

    purchaseMutation.mutate({
      promptId: activePrompt.id,
      buyerEmail: buyerEmail.trim() || undefined,
    })
  }

  const renderLoadingState = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={`skeleton-${index}`} className="border border-orange-100/60">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-20" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100">
      <SEOHead
        title="বাজার - প্রিমিয়াম প্রম্পট মার্কেটপ্লেস"
        description="বিশ্বস্ত বাংলা প্রম্পট নির্মাতাদের কাছ থেকে প্রিমিয়াম প্রম্পট কিনুন এবং আপনার নিজস্ব সংগ্রহ তৈরি করুন।"
        url="https://promptshiksha.com/marketplace"
        keywords="Bangla prompt marketplace, premium prompts, বাংলা প্রম্পট"
      />

      <section className="border-b border-orange-200/60 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-lg">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            বাংলা প্রম্পট মার্কেটপ্লেস
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            শীর্ষস্থানীয় প্রম্পট নির্মাতাদের দক্ষতা দিয়ে তৈরি প্রিমিয়াম প্রম্পট সংগ্রহ। যাচাই করা ফর্মুলা ও বাংলা কনটেক্সটে অপ্টিমাইজড স্ট্র্যাটেজি দিয়ে আপনার জেনারেটিভ এআই ফলাফল উন্নত করুন।
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
              <span>নিরাপদ ডিজিটাল পেমেন্ট</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700">
              <TrendingUp className="h-5 w-5" />
              <span>কমিশন ট্র্যাকিং স্বয়ংক্রিয়</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-rose-700">
              <Sparkles className="h-5 w-5" />
              <span>কমিউনিটি যাচাইকৃত নির্মাতা</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-6 rounded-3xl bg-white/80 p-8 shadow-xl shadow-orange-200/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                প্রিমিয়াম প্রম্পট সংগ্রহ
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                পারফরমেন্স প্রমাণিত প্রম্পট গুলো থেকে বেছে নিন। প্রতিটি ক্রয়ে নির্মাতার জন্য স্বয়ংক্রিয় কমিশন রেকর্ড হয়।
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="প্রম্পট খুঁজুন..."
                className="pl-10"
              />
            </div>
          </div>

          {availableTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-600">শ্রেণি:</span>
              {availableTags.map((tag) => {
                const isActive = selectedTag === tag
                return (
                  <Badge
                    key={tag}
                    variant={isActive ? "default" : "secondary"}
                    className={`cursor-pointer px-3 py-1 ${
                      isActive
                        ? "bg-orange-500 text-white hover:bg-orange-500"
                        : "bg-orange-100/80 text-orange-700 hover:bg-orange-200"
                    }`}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                  >
                    #{tag}
                  </Badge>
                )
              })}
              {selectedTag && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                >
                  ফিল্টার রিসেট
                </Button>
              )}
            </div>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>ডেটা লোড ব্যর্থ</AlertTitle>
              <AlertDescription>
                {error instanceof Error
                  ? error.message
                  : "সার্ভার থেকে তথ্য আনতে সমস্যা হচ্ছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।"}
              </AlertDescription>
            </Alert>
          )}

          {isLoading && renderLoadingState()}

          {!isLoading && filteredPrompts.length === 0 && (
            <Card className="border border-dashed border-orange-200 bg-orange-50/70 text-center">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">
                  কোন প্রম্পট পাওয়া যায়নি
                </CardTitle>
                <CardDescription>
                  আপনার সার্চ বা ফিল্টারের সাথে মিলে এমন কোন প্রম্পট এই মুহূর্তে নেই। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {!isLoading && filteredPrompts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((prompt) => (
                <Card
                  key={prompt.id}
                  className="group flex h-full flex-col border border-orange-100/80 bg-white/90 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-200/60"
                >
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-3 text-lg text-slate-900">
                      <span>{prompt.title}</span>
                      <Badge className="bg-gradient-to-r from-orange-500 to-rose-500 text-white">
                        {formatCurrency(prompt.priceCents, prompt.currency)}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm text-slate-600">
                      {prompt.description || "বিস্তারিত বিবরণ উপলভ্য।"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <div className="space-y-1 text-sm text-slate-500">
                      <p className="font-medium text-slate-700">
                        নির্মাতা: {prompt.authorName}
                      </p>
                      <p>কমিশন: {(prompt.commissionRate * 100).toFixed(0)}%</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {prompt.tags.map((tag) => (
                        <Badge
                          key={`${prompt.id}-${tag}`}
                          variant="outline"
                          className="border-orange-200 text-orange-700"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      সর্বশেষ আপডেট {new Date(prompt.updatedAt).toLocaleDateString("bn-BD")}
                    </div>
                    <Button onClick={() => openPurchaseDialog(prompt)}>
                      <ShoppingCart className="mr-2 h-4 w-4" /> ক্রয় করুন
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>প্রম্পট ক্রয় নিশ্চিতকরণ</DialogTitle>
            <DialogDescription>
              প্রম্পটটি কেনার জন্য নিচের তথ্য যাচাই করে নিশ্চিত করুন। পেমেন্ট সফল হলে ইমেইলের মাধ্যমে প্রম্পটটি পাঠানো হবে।
            </DialogDescription>
          </DialogHeader>

          {activePrompt && (
            <div className="space-y-4">
              <div className="rounded-xl bg-orange-50/80 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">{activePrompt.title}</p>
                <p className="mt-1 text-slate-600">
                  মূল্য: {formatCurrency(activePrompt.priceCents, activePrompt.currency)}
                </p>
                <p className="text-slate-500">
                  নির্মাতা কমিশন স্বয়ংক্রিয়ভাবে {(
                    activePrompt.commissionRate * 100
                  ).toFixed(0)}% হিসেবে যোগ হবে।
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buyer-email">ইমেইল (ঐচ্ছিক)</Label>
                <Input
                  id="buyer-email"
                  type="email"
                  autoComplete="email"
                  placeholder="আপনার ইমেইল লিখুন"
                  value={buyerEmail}
                  onChange={(event) => setBuyerEmail(event.target.value)}
                  disabled={purchaseMutation.isPending}
                />
                <p className="text-xs text-slate-500">
                  আমরা প্রম্পট ফাইল এবং ভবিষ্যৎ আপডেট এই ইমেইলে পাঠাবো।
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogChange(false)}
              disabled={purchaseMutation.isPending}
            >
              বাতিল
            </Button>
            <Button
              type="button"
              onClick={handleConfirmPurchase}
              disabled={purchaseMutation.isPending || !activePrompt}
            >
              {purchaseMutation.isPending ? "প্রসেস হচ্ছে..." : "পেমেন্ট সম্পন্ন করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Marketplace
