import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Sparkles, AlertTriangle } from "lucide-react";

import SEOHead from "@/components/SEOHead";
import PromptCard from "@/components/PromptCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCommunityIdentity } from "@/hooks/useCommunityIdentity";
import { supabase } from "@/integrations/supabase/client";
import { createScopedLogger } from "@/lib/logger";
import type { CommunityPrompt } from "@/types/community";

const logger = createScopedLogger("community-prompts-page");

const CommunityPrompts = () => {
  const { identity, isReady } = useCommunityIdentity();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => window.clearTimeout(timeout);
  }, [searchTerm]);

  const identityKey = identity ?? "anon";

  const { data: prompts, isLoading, isError, error } = useQuery({
    queryKey: ["community-prompts", identityKey],
    queryFn: async () => {
      const { data, error: promptsError } = await supabase
        .from("prompts")
        .select(
          `
          id,
          title,
          prompt,
          description,
          use_case,
          language,
          tags,
          submitter_name,
          created_at,
          prompt_upvotes(count),
          prompt_comments(count)
        `,
        )
        .order("created_at", { ascending: false });

      if (promptsError) {
        logger.error("Failed to load community prompts", { error: promptsError });
        throw promptsError;
      }

      const mapped = (data ?? []).map((item) => {
        const upvotesArray = Array.isArray(item.prompt_upvotes) ? item.prompt_upvotes : [];
        const commentsArray = Array.isArray(item.prompt_comments) ? item.prompt_comments : [];

        const promptData: CommunityPrompt = {
          id: item.id,
          title: item.title,
          prompt: item.prompt,
          description: item.description,
          use_case: item.use_case,
          language: item.language,
          tags: item.tags ?? [],
          submitter_name: item.submitter_name,
          created_at: item.created_at,
          upvote_count: upvotesArray[0]?.count ?? 0,
          comment_count: commentsArray[0]?.count ?? 0,
          user_has_upvoted: false,
        };

        return promptData;
      });

      if (!identity) {
        return mapped;
      }

      const { data: upvotesData, error: upvotesError } = await supabase
        .from("prompt_upvotes")
        .select("prompt_id")
        .eq("community_identity", identity);

      if (upvotesError) {
        logger.error("Failed to load current user upvotes", { error: upvotesError });
        return mapped;
      }

      const upvotedIds = new Set((upvotesData ?? []).map((row) => row.prompt_id));

      return mapped.map((item) => ({
        ...item,
        user_has_upvoted: upvotedIds.has(item.id),
      }));
    },
    staleTime: 60_000,
  });

  const availableTags = useMemo(() => {
    if (!prompts) {
      return [] as string[];
    }

    const tagSet = new Set<string>();
    prompts.forEach((promptItem) => {
      promptItem.tags.forEach((tag) => {
        if (tag) {
          tagSet.add(tag);
        }
      });
    });

    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    if (!prompts) {
      return [] as CommunityPrompt[];
    }

    const term = debouncedSearch.toLowerCase();

    return prompts.filter((promptItem) => {
      const matchesTag = selectedTag ? promptItem.tags.includes(selectedTag) : true;

      if (!term) {
        return matchesTag;
      }

      const haystacks = [
        promptItem.title,
        promptItem.prompt,
        promptItem.description ?? "",
        promptItem.use_case ?? "",
      ].map((value) => value.toLowerCase());

      const matchesSearch = haystacks.some((value) => value.includes(term));

      return matchesTag && matchesSearch;
    });
  }, [prompts, debouncedSearch, selectedTag]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100">
      <SEOHead
        title="কমিউনিটি প্রম্পট লাইব্রেরি - প্রম্পট শিক্ষা"
        description="বাংলা ভাষাভাষী কমিউনিটির তৈরি প্রম্পটগুলির সংগ্রহ। পছন্দের প্রম্পট আপভোট করুন এবং নিজের অভিজ্ঞতা শেয়ার করুন।"
        url="https://promptshiksha.com/community/prompts"
        keywords="বাংলা প্রম্পট, কমিউনিটি প্রম্পট, Prompt Library"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-white/80 px-5 py-2 text-sm font-bengali shadow">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span>বাংলা AI কমিউনিটির শেয়ার করা সেরা প্রম্পট</span>
          </div>
          <h1 className="mt-6 text-4xl font-display text-purple-700 md:text-5xl">
            কমিউনিটি প্রম্পট লাইব্রেরি
          </h1>
          <p className="mt-4 max-w-2xl mx-auto font-bengali text-lg text-slate-700">
            বাস্তব ব্যবহারকারীদের হাতে বানানো প্রম্পটগুলো খুঁজে বের করুন, নিজের মতামত জানান এবং নতুন আইডিয়া নিয়ে এক্সপেরিমেন্ট করুন।
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="secondary" className="font-bengali">
              <Link to="/community/submit">আপনার প্রম্পট শেয়ার করুন</Link>
            </Button>
            <Button asChild variant="link" className="font-bengali">
              <Link to="/">হোমপেজে ফিরে যান</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          <div className="cartoon-card bg-white p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="প্রম্পট, ব্যবহার ক্ষেত্র বা লেখকের নাম দিয়ে সার্চ করুন"
                  className="pl-9 font-bengali"
                />
              </div>
              <Badge variant="outline" className="px-4 py-2 text-sm font-bengali">
                মোট প্রম্পট: {prompts?.length ?? 0}
              </Badge>
            </div>

            {availableTags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={selectedTag ? "outline" : "default"}
                  onClick={() => setSelectedTag(null)}
                  className="rounded-full font-bengali"
                >
                  সব দেখুন
                </Button>
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    size="sm"
                    variant={selectedTag === tag ? "default" : "outline"}
                    onClick={() => setSelectedTag((current) => (current === tag ? null : tag))}
                    className="rounded-full font-bengali"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {isError && (
            <Alert variant="destructive" className="border-2 border-red-300">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>ডেটা লোড করা যায়নি</AlertTitle>
              <AlertDescription className="font-bengali">
                {error instanceof Error
                  ? error.message
                  : "দুঃখিত! প্রম্পটগুলো এখন দেখানো যাচ্ছে না। পরে আবার চেষ্টা করুন।"}
              </AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="grid gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-56 w-full rounded-3xl border-4 border-dashed border-slate-200" />
              ))}
            </div>
          )}

          {!isLoading && filteredPrompts.length === 0 && (
            <div className="cartoon-card bg-white p-8 text-center">
              <h2 className="text-2xl font-display text-purple-600">কোনো মিল পাওয়া যায়নি</h2>
              <p className="mt-2 font-bengali text-slate-600">
                আপনার অনুসন্ধানের সাথে মিলে এমন কোনো প্রম্পট পাওয়া যায়নি। অন্য কীওয়ার্ড ব্যবহার করে দেখুন অথবা ফিল্টার পরিবর্তন করুন।
              </p>
            </div>
          )}

          <div className="grid gap-6">
            {filteredPrompts.map((promptItem) => (
              <PromptCard
                key={promptItem.id}
                prompt={promptItem}
                identity={identity}
                identityReady={isReady}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPrompts;
