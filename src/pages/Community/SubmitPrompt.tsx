import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Sparkles, Lightbulb, PenSquare } from "lucide-react";
import { toast } from "sonner";

import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCommunityIdentity } from "@/hooks/useCommunityIdentity";
import { supabase } from "@/integrations/supabase/client";
import { createScopedLogger } from "@/lib/logger";
import { getStoredCommunityDisplayName, persistCommunityDisplayName } from "@/lib/community/profile";

const logger = createScopedLogger("submit-community-prompt");

const MAX_PROMPT_LENGTH = 2000;

interface PromptFormState {
  title: string;
  prompt: string;
  description: string;
  use_case: string;
  language: string;
  tags: string;
  submitter_name: string;
  submitter_email: string;
}

const defaultFormState = (): PromptFormState => ({
  title: "",
  prompt: "",
  description: "",
  use_case: "",
  language: "Bangla",
  tags: "",
  submitter_name: getStoredCommunityDisplayName(),
  submitter_email: "",
});

const SubmitPrompt = () => {
  const queryClient = useQueryClient();
  const { isReady } = useCommunityIdentity();
  const [formState, setFormState] = useState(defaultFormState);

  const trimmedTitle = formState.title.trim();
  const trimmedPrompt = formState.prompt.trim();
  const trimmedDescription = formState.description.trim();
  const trimmedUseCase = formState.use_case.trim();
  const trimmedName = formState.submitter_name.trim();
  const trimmedEmail = formState.submitter_email.trim();

  const tagList = useMemo(
    () =>
      formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 8),
    [formState.tags],
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (!trimmedTitle) {
        throw new Error("title-required");
      }

      if (trimmedPrompt.length < 20) {
        throw new Error("prompt-too-short");
      }

      if (trimmedPrompt.length > MAX_PROMPT_LENGTH) {
        throw new Error("prompt-too-long");
      }

      if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        throw new Error("invalid-email");
      }

      const { error } = await supabase.from("prompts").insert({
        title: trimmedTitle,
        prompt: trimmedPrompt,
        description: trimmedDescription || null,
        use_case: trimmedUseCase || null,
        language: formState.language || "Bangla",
        tags: tagList,
        submitter_name: trimmedName || null,
        submitter_email: trimmedEmail || null,
      });

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("আপনার প্রম্পটটি সংরক্ষণ করা হয়েছে! যাচাইয়ের পর লাইব্রেরিতে যুক্ত হবে।");
      persistCommunityDisplayName(trimmedName);
      setFormState((current) => ({
        ...defaultFormState(),
        submitter_name: trimmedName,
        submitter_email: trimmedEmail,
      }));
      queryClient.invalidateQueries({ queryKey: ["community-prompts"] });
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "unknown";

      switch (message) {
        case "title-required":
          toast.warning("প্রম্পটের জন্য একটি শিরোনাম দিন।");
          return;
        case "prompt-too-short":
          toast.warning("প্রম্পটটি আরও বিস্তারিতভাবে লিখুন (কমপক্ষে ২০ অক্ষর)।");
          return;
        case "prompt-too-long":
          toast.warning(`প্রম্পটের দৈর্ঘ্য ${MAX_PROMPT_LENGTH} অক্ষরের মধ্যে রাখতে হবে।`);
          return;
        case "invalid-email":
          toast.warning("সঠিক ইমেইল ঠিকানা লিখুন অথবা ফিল্ডটি ফাঁকা রাখুন।");
          return;
        default:
          logger.error("Failed to submit community prompt", { error });
          toast.error("দুঃখিত! প্রম্পট জমা দেয়া যায়নি। পরে আবার চেষ্টা করুন।");
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-100">
      <SEOHead
        title="কমিউনিটি প্রম্পট জমা দিন - প্রম্পট শিক্ষা"
        description="আপনার প্রিয় বাংলা প্রম্পট শেয়ার করুন। কমিউনিটির সাথে নতুন আইডিয়া বিনিময় করুন এবং অনুপ্রেরণা দিন।"
        url="https://promptshiksha.com/community/submit"
        keywords="প্রম্পট জমা, বাংলা প্রম্পট শেয়ার"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="cartoon-card bg-white p-8 shadow-lg">
            <div className="flex flex-col gap-3 text-center">
              <div className="inline-flex items-center justify-center gap-3 self-center rounded-full bg-purple-100 px-5 py-2 text-sm font-bengali text-purple-700">
                <Sparkles className="h-4 w-4" />
                <span>প্রম্পট শিক্ষা কমিউনিটি</span>
              </div>
              <h1 className="text-3xl font-display text-purple-700 md:text-4xl">
                আপনার প্রম্পট শেয়ার করুন
              </h1>
              <p className="font-bengali text-slate-600">
                অনুপ্রেরণাদায়ী প্রম্পটটি কমিউনিটির সাথে ভাগ করুন। যতটা সম্ভব প্রেক্ষাপট ও ব্যবহার পদ্ধতি যোগ করুন যাতে সবাই উপকৃত হয়।
              </p>
            </div>

            <div className="mt-6 grid gap-3 rounded-2xl border border-dashed border-purple-200 bg-purple-50 p-4 text-left">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-1 h-5 w-5 text-amber-500" />
                <div>
                  <h2 className="font-display text-lg text-purple-700">শেয়ারের আগে কয়েকটি টিপস</h2>
                  <ul className="mt-2 list-disc space-y-1 pl-5 font-bengali text-sm text-slate-600">
                    <li>প্রম্পটটির উদ্দেশ্য এবং ব্যবহার ক্ষেত্র পরিষ্কারভাবে লিখুন।</li>
                    <li>যদি নির্দিষ্ট টুল বা মডেলের জন্য হয়, তা উল্লেখ করুন।</li>
                    <li>ট্যাগ ব্যবহার করে অন্যদের খুঁজে পেতে সহজ করুন।</li>
                  </ul>
                </div>
              </div>
            </div>

            <form
              className="mt-8 space-y-6"
              onSubmit={(event) => {
                event.preventDefault();
                mutation.mutate();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="prompt-title" className="font-bengali text-base">
                  প্রম্পটের শিরোনাম
                </Label>
                <Input
                  id="prompt-title"
                  value={formState.title}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, title: event.target.value }))
                  }
                  required
                  maxLength={120}
                  className="font-bengali"
                  placeholder="উদাহরণ: বাংলা ব্লগ পোস্টের জন্য SEO আইডিয়া জেনারেটর"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt-body" className="font-bengali text-base">
                  প্রম্পটের মূল অংশ
                </Label>
                <Textarea
                  id="prompt-body"
                  value={formState.prompt}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, prompt: event.target.value }))
                  }
                  required
                  rows={8}
                  maxLength={MAX_PROMPT_LENGTH}
                  className="font-bengali"
                  placeholder="আপনার প্রম্পটটি বাংলায় লিখুন..."
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>ন্যূনতম ২০ অক্ষর</span>
                  <span>{trimmedPrompt.length}/{MAX_PROMPT_LENGTH}</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="prompt-use-case" className="font-bengali text-base">
                    ব্যবহার ক্ষেত্র (ঐচ্ছিক)
                  </Label>
                  <Input
                    id="prompt-use-case"
                    value={formState.use_case}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, use_case: event.target.value }))
                    }
                    className="font-bengali"
                    placeholder="যেমন: SEO কন্টেন্ট, শিক্ষামূলক ভিডিও"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prompt-language" className="font-bengali text-base">
                    ভাষা
                  </Label>
                  <Input
                    id="prompt-language"
                    value={formState.language}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, language: event.target.value || "Bangla" }))
                    }
                    className="font-bengali"
                    placeholder="Bangla"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt-description" className="font-bengali text-base">
                  অতিরিক্ত নির্দেশনা (ঐচ্ছিক)
                </Label>
                <Textarea
                  id="prompt-description"
                  value={formState.description}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, description: event.target.value }))
                  }
                  rows={4}
                  maxLength={600}
                  className="font-bengali"
                  placeholder="এই প্রম্পটটি ব্যবহার করার সময় বিশেষ কোনো নির্দেশনা থাকলে লিখুন"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt-tags" className="font-bengali text-base">
                  ট্যাগ (কমা দিয়ে আলাদা করুন)
                </Label>
                <Input
                  id="prompt-tags"
                  value={formState.tags}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, tags: event.target.value }))
                  }
                  className="font-bengali"
                  placeholder="যেমন: শিক্ষা, ব্লগ, SEO"
                />
                {tagList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tagList.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-bengali">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="submitter-name" className="font-bengali text-base">
                    আপনার নাম (ঐচ্ছিক)
                  </Label>
                  <Input
                    id="submitter-name"
                    value={formState.submitter_name}
                    onChange={(event) => {
                      const value = event.target.value;
                      setFormState((current) => ({ ...current, submitter_name: value }));
                      persistCommunityDisplayName(value);
                    }}
                    className="font-bengali"
                    placeholder="আপনার নাম"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="submitter-email" className="font-bengali text-base">
                    ইমেইল (ঐচ্ছিক)
                  </Label>
                  <Input
                    id="submitter-email"
                    type="email"
                    value={formState.submitter_email}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, submitter_email: event.target.value }))
                    }
                    className="font-bengali"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-sm font-bengali text-muted-foreground">
                  জমা দেয়ার মাধ্যমে আপনি আমাদের কমিউনিটি গাইডলাইন মেনে চলতে সম্মত হচ্ছেন।
                </div>
                <div className="flex items-center gap-3">
                  <Button asChild variant="ghost" className="font-bengali">
                    <Link to="/community/prompts">লাইব্রেরি দেখুন</Link>
                  </Button>
                  <Button
                    type="submit"
                    disabled={mutation.isPending || !isReady}
                    className="flex items-center gap-2"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <PenSquare className="h-4 w-4" />
                    )}
                    <span className="font-bengali">প্রম্পট জমা দিন</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPrompt;
