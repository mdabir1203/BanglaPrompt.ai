import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { bn } from "date-fns/locale";
import { MessageCircle, Send, ThumbsUp, Loader2, Copy } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createScopedLogger } from "@/lib/logger";
import { getStoredCommunityDisplayName, persistCommunityDisplayName } from "@/lib/community/profile";
import { supabase } from "@/integrations/supabase/client";
import { withCommunityIdentity } from "@/integrations/supabase/community";
import type { CommunityPrompt, PromptComment } from "@/types/community";

interface PromptCardProps {
  prompt: CommunityPrompt;
  identity: string | null;
  identityReady: boolean;
}

const logger = createScopedLogger("prompt-card");
const MAX_COMMENT_LENGTH = 500;

const formatRelativeTime = (date: string) =>
  formatDistanceToNow(new Date(date), { addSuffix: true, locale: bn });

const PromptCard = ({ prompt, identity, identityReady }: PromptCardProps) => {
  const queryClient = useQueryClient();

  const [localUpvotes, setLocalUpvotes] = useState(prompt.upvote_count);
  const [localComments, setLocalComments] = useState(prompt.comment_count);
  const [userHasUpvoted, setUserHasUpvoted] = useState(prompt.user_has_upvoted);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [displayName, setDisplayName] = useState(getStoredCommunityDisplayName);
  const [comment, setComment] = useState("");

  useEffect(() => {
    setLocalUpvotes(prompt.upvote_count);
    setLocalComments(prompt.comment_count);
    setUserHasUpvoted(prompt.user_has_upvoted);
  }, [prompt]);

  const { data: comments, isLoading: isCommentsLoading, refetch: refetchComments } = useQuery({
    queryKey: ["prompt-comments", prompt.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prompt_comments")
        .select("id, prompt_id, author_name, content, created_at")
        .eq("prompt_id", prompt.id)
        .order("created_at", { ascending: true });

      if (error) {
        logger.error("Failed to fetch prompt comments", { error, promptId: prompt.id });
        throw error;
      }

      return (data ?? []) as PromptComment[];
    },
    enabled: isCommentsOpen,
    staleTime: 30_000,
  });

  const updatePromptCache = (updater: (current: CommunityPrompt) => CommunityPrompt) => {
    queryClient.setQueryData<CommunityPrompt[] | undefined>(["community-prompts"], data => {
      if (!data) {
        return data;
      }

      return data.map(item => (item.id === prompt.id ? updater(item) : item));
    });
  };

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      if (!identityReady || !identity) {
        throw new Error("identity-not-ready");
      }

      if (userHasUpvoted) {
        const builder = withCommunityIdentity(supabase.from("prompt_upvotes"), identity);
        const { error } = await builder
          .delete()
          .eq("prompt_id", prompt.id)
          .eq("community_identity", identity);

        if (error) {
          throw error;
        }

        return false;
      }

      const { error } = await supabase
        .from("prompt_upvotes")
        .upsert(
          [
            {
              prompt_id: prompt.id,
              community_identity: identity,
            },
          ],
          { onConflict: "prompt_id,community_identity" },
        );

      if (error) {
        throw error;
      }

      return true;
    },
    onSuccess: async (hasUpvotedNow) => {
      const nextCount = hasUpvotedNow
        ? localUpvotes + 1
        : Math.max(localUpvotes - 1, 0);

      setLocalUpvotes(nextCount);
      setUserHasUpvoted(hasUpvotedNow);

      updatePromptCache(current => ({
        ...current,
        upvote_count: nextCount,
        user_has_upvoted: hasUpvotedNow,
      }));

      await queryClient.invalidateQueries({ queryKey: ["community-prompts"] });
    },
    onError: error => {
      if ((error as Error).message === "identity-not-ready") {
        toast.info("কমিউনিটি প্রোফাইল প্রস্তুত হচ্ছে। একটু পর আবার চেষ্টা করুন।");
        return;
      }

      logger.error("Failed to toggle upvote", { error, promptId: prompt.id });
      toast.error("আপভোট করা যায়নি। পরে আবার চেষ্টা করুন।");
    },
  });

  const commentMutation = useMutation({
    mutationFn: async () => {
      if (!identityReady || !identity) {
        throw new Error("identity-not-ready");
      }

      const trimmed = comment.trim();
      if (!trimmed) {
        throw new Error("empty-comment");
      }

      const { error } = await supabase.from("prompt_comments").insert({
        prompt_id: prompt.id,
        community_identity: identity,
        author_name: displayName.trim() || null,
        content: trimmed,
      });

      if (error) {
        throw error;
      }
    },
    onSuccess: async () => {
      setComment("");
      const nextCount = localComments + 1;
      setLocalComments(nextCount);

      updatePromptCache(current => ({
        ...current,
        comment_count: nextCount,
      }));

      await queryClient.invalidateQueries({ queryKey: ["community-prompts"] });
      await refetchComments();
      toast.success("মন্তব্য যুক্ত হয়েছে!");
    },
    onError: error => {
      const message = (error as Error).message;
      if (message === "identity-not-ready") {
        toast.info("কমিউনিটি প্রোফাইল প্রস্তুত হচ্ছে। একটু পর আবার চেষ্টা করুন।");
        return;
      }

      if (message === "empty-comment") {
        toast.warning("অনুগ্রহ করে আপনার মন্তব্য লিখুন।");
        return;
      }

      logger.error("Failed to create comment", { error, promptId: prompt.id });
      toast.error("মন্তব্য পাঠাতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
    },
  });

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      toast.success("প্রম্পট কপি করা হয়েছে!");
    } catch (error) {
      logger.error("Failed to copy prompt to clipboard", { error, promptId: prompt.id });
      toast.error("কপি করা যায়নি। আপনার ব্রাউজার অনুমতি দিচ্ছে কি না দেখুন।");
    }
  };

  const promptTags = useMemo(() => prompt.tags.filter(Boolean), [prompt.tags]);

  const upvoteDisabled = !identityReady || !identity || upvoteMutation.isPending;
  const commentDisabled =
    !identityReady || !identity || commentMutation.isPending || comment.trim().length === 0;

  return (
    <Card className="border-4 border-black shadow-lg bg-white">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-3 items-start justify-between">
          <CardTitle className="text-2xl font-display text-purple-600">
            {prompt.title}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-bengali">
              {prompt.submitter_name ? `${prompt.submitter_name} ✨` : "কমিউনিটি সদস্য"}
            </span>
            <span aria-hidden="true">•</span>
            <span className="font-bengali">{formatRelativeTime(prompt.created_at)}</span>
          </div>
        </div>
        {prompt.use_case && (
          <p className="text-base font-bengali text-slate-700 bg-orange-100 border border-orange-300 px-3 py-2 rounded-lg inline-block">
            {prompt.use_case}
          </p>
        )}
        <p className="font-bengali text-lg text-slate-800 whitespace-pre-wrap leading-relaxed">
          {prompt.prompt}
        </p>
        {prompt.description && (
          <p className="font-bengali text-base text-muted-foreground bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg">
            {prompt.description}
          </p>
        )}
        {promptTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {promptTags.map(tag => (
              <Badge key={tag} variant="secondary" className="rounded-full border border-black/10">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center justify-between gap-3 border border-dashed border-slate-200 rounded-xl px-4 py-3 bg-slate-50">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant={userHasUpvoted ? "default" : "outline"}
              onClick={() => upvoteMutation.mutate()}
              disabled={upvoteDisabled}
              className={cn(
                "flex items-center gap-2 font-bengali",
                userHasUpvoted ? "bg-purple-600 hover:bg-purple-700" : "",
              )}
            >
              {upvoteMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ThumbsUp className="h-4 w-4" />
              )}
              <span>{userHasUpvoted ? "আপভোট হয়েছে" : "আপভোট"}</span>
              <span className="font-semibold">{localUpvotes}</span>
            </Button>
            <Button
              type="button"
              variant={isCommentsOpen ? "default" : "outline"}
              onClick={() => setIsCommentsOpen(value => !value)}
              className="flex items-center gap-2 font-bengali"
            >
              <MessageCircle className="h-4 w-4" />
              <span>মন্তব্য</span>
              <span className="font-semibold">{localComments}</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {prompt.language && (
              <Badge variant="outline" className="font-bengali border-2 border-black/20">
                {prompt.language}
              </Badge>
            )}
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-2"
              onClick={copyPrompt}
            >
              <Copy className="h-4 w-4" />
              <span className="font-bengali">কপি</span>
            </Button>
          </div>
        </div>
      </CardContent>
      {isCommentsOpen && (
        <CardFooter className="flex-col items-start gap-6">
          <div className="w-full space-y-4">
            <Separator className="bg-slate-200" />
            <div className="space-y-3">
              <h4 className="font-display text-lg">কমিউনিটি আলোচনা</h4>
              {isCommentsLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-16 w-full rounded-lg" />
                  ))}
                </div>
              ) : comments && comments.length > 0 ? (
                <ul className="space-y-3">
                  {comments.map(item => (
                    <li
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="font-bengali">
                          {item.author_name || "কমিউনিটি সদস্য"}
                        </span>
                        <span>{formatRelativeTime(item.created_at)}</span>
                      </div>
                      <p className="mt-2 text-slate-800 font-bengali leading-relaxed whitespace-pre-wrap">
                        {item.content}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground font-bengali">
                  এখনও কোনো মন্তব্য নেই। আপনি সবার আগে আপনার মতামত জানান!
                </p>
              )}
            </div>
          </div>

          <form
            className="w-full space-y-3 rounded-xl border-2 border-dashed border-purple-200 bg-purple-50 p-4"
            onSubmit={event => {
              event.preventDefault();
              commentMutation.mutate();
            }}
          >
            <h5 className="font-display text-lg text-purple-700">নিজের অভিজ্ঞতা শেয়ার করুন</h5>
            <Input
              value={displayName}
              placeholder="আপনার নাম (ঐচ্ছিক)"
              onChange={event => {
                setDisplayName(event.target.value);
                persistCommunityDisplayName(event.target.value);
              }}
              className="font-bengali"
            />
            <Textarea
              value={comment}
              onChange={event => {
                if (event.target.value.length <= MAX_COMMENT_LENGTH) {
                  setComment(event.target.value);
                }
              }}
              placeholder="আপনার মন্তব্য লিখুন..."
              rows={4}
              maxLength={MAX_COMMENT_LENGTH}
              className="font-bengali"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{comment.length}/{MAX_COMMENT_LENGTH}</span>
              <Button type="submit" disabled={commentDisabled} className="flex items-center gap-2">
                {commentMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="font-bengali">মন্তব্য পাঠান</span>
              </Button>
            </div>
          </form>
        </CardFooter>
      )}
    </Card>
  );
};

export default PromptCard;
