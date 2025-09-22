import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Brain,
  Clock,
  LineChart,
  Lightbulb,
  Palette,
  Sparkles,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { computeOptimizedPromptPricing } from "@/utils/pricing";

interface LocalizedCopy {
  en: string;
  bn: string;
}

interface ExchangeListing {
  id: string;
  title: LocalizedCopy;
  category: LocalizedCopy;
  floorPrice: number;
  highestBid: number;
  watchers: number;
  bidVelocity: number;
  bidHistory: number[];
}

const INITIAL_LISTINGS: ExchangeListing[] = [
  {
    id: "enterprise-toolkit",
    title: {
      en: "Enterprise compliance assistant",
      bn: "এন্টারপ্রাইজ কমপ্লায়েন্স সহকারী",
    },
    category: { en: "Governance", bn: "গভর্নেন্স" },
    floorPrice: 280,
    highestBid: 342,
    watchers: 186,
    bidVelocity: 5.2,
    bidHistory: [260, 272, 281, 296, 302, 315, 325, 329, 333, 338, 340, 342],
  },
  {
    id: "creative-campaign",
    title: {
      en: "Diaspora brand storytelling kit",
      bn: "ডায়াসপোরা ব্র্যান্ড স্টোরিটেলিং কিট",
    },
    category: { en: "Marketing", bn: "মার্কেটিং" },
    floorPrice: 190,
    highestBid: 255,
    watchers: 143,
    bidVelocity: 3.8,
    bidHistory: [175, 180, 188, 194, 205, 213, 221, 227, 233, 240, 249, 255],
  },
  {
    id: "operations-suite",
    title: {
      en: "Microfinance collections co-pilot",
      bn: "মাইক্রোফাইন্যান্স কালেকশনস কো-পাইলট",
    },
    category: { en: "Operations", bn: "অপারেশনস" },
    floorPrice: 210,
    highestBid: 298,
    watchers: 162,
    bidVelocity: 4.4,
    bidHistory: [198, 204, 213, 220, 227, 233, 242, 250, 266, 274, 289, 298],
  },
  {
    id: "education",
    title: {
      en: "HSC study accelerator bundle",
      bn: "এইচএসসি স্টাডি অ্যাক্সেলারেটর বান্ডেল",
    },
    category: { en: "Education", bn: "শিক্ষা" },
    floorPrice: 95,
    highestBid: 134,
    watchers: 201,
    bidVelocity: 6.1,
    bidHistory: [84, 87, 92, 97, 102, 108, 113, 118, 122, 126, 130, 134],
  },
];

type IconKey = "sparkles" | "palette" | "brain" | "video";

const iconMap: Record<IconKey, LucideIcon> = {
  sparkles: Sparkles,
  palette: Palette,
  brain: Brain,
  video: Video,
};

interface PromptEntry {
  title: LocalizedCopy;
  instructions: LocalizedCopy;
  psychology: LocalizedCopy;
}

interface PromptPlaybook {
  id: string;
  icon: IconKey;
  title: LocalizedCopy;
  description: LocalizedCopy;
  prompts: PromptEntry[];
}

const promptPlaybooks: PromptPlaybook[] = [
  {
    id: "bidder-magnet",
    icon: "sparkles",
    title: {
      en: "Bidder magnet ChatGPT prompts",
      bn: "বিডার আকর্ষণকারী চ্যাটজিপিটি প্রম্পট",
    },
    description: {
      en: "Persona-level scripts that nudge auction buyers using urgency, trust cues, and clarity.",
      bn: "জরুরিতা, আস্থার সংকেত ও স্বচ্ছ বার্তায় নিলাম ক্রেতাদের উৎসাহিত করার পার্সোনা-ভিত্তিক স্ক্রিপ্ট।",
    },
    prompts: [
      {
        title: {
          en: "Campaign-driven advertising brief",
          bn: "ক্যাম্পেইন-নির্ভর বিজ্ঞাপন ব্রিফ",
        },
        instructions: {
          en: "Act as an advertiser who can design a full-funnel campaign that attracts serious bidders to our upcoming online auction of rare vintage comics. Ask me questions about the bidder personas, highlight messaging angles that build urgency, recommend the best ad channels, and finish with a week-by-week launch plan.",
          bn: "একজন বিজ্ঞাপন বিশেষজ্ঞের ভূমিকায় নিন যিনি আমাদের আসন্ন বিরল ভিনটেজ কমিকস অনলাইন নিলামের জন্য সিরিয়াস বিডারদের আকৃষ্ট করতে পূর্ণাঙ্গ ফানেল ক্যাম্পেইন তৈরি করবেন। বিডার পার্সোনা সম্পর্কে প্রশ্ন করুন, জরুরিতা বাড়ায় এমন মেসেজিং এঙ্গেল তুলে ধরুন, সেরা বিজ্ঞাপন চ্যানেল সুপারিশ করুন এবং সপ্তাহভিত্তিক লঞ্চ প্ল্যান দিয়ে শেষ করুন।",
        },
        psychology: {
          en: "Frames scarcity and a clear plan so analytical bidders feel prepared.",
          bn: "দুর্লভতা ও স্পষ্ট পরিকল্পনা তুলে ধরে বিশ্লেষণধর্মী বিডারদের প্রস্তুত বোধ করায়।",
        },
      },
      {
        title: {
          en: "Influencer-led buzz builder",
          bn: "ইনফ্লুয়েন্সার-নেতৃত্বাধীন বাজ নির্মাতা",
        },
        instructions: {
          en: "You are a social media influencer known for hyping exclusive drops. Draft a TikTok script, Instagram carousel captions, and a YouTube Shorts outline that entice luxury handbag enthusiasts to register and bid in our charity auction. Include hooks, calls-to-action, and collaboration ideas.",
          bn: "আপনি এক জন সোশ্যাল মিডিয়া ইনফ্লুয়েন্সার যিনি এক্সক্লুসিভ ড্রপ নিয়ে উত্তেজনা তৈরি করার জন্য পরিচিত। আমাদের চ্যারিটি নিলামে রেজিস্টার করে বিড করতে লাক্সারি হ্যান্ডব্যাগ অনুরাগীদের অনুপ্রাণিত করতে একটি টিকটক স্ক্রিপ্ট, ইনস্টাগ্রাম ক্যারোসেল ক্যাপশন এবং ইউটিউব শর্টস আউটলাইন লিখুন। আকর্ষণীয় হুক, কল-টু-অ্যাকশন এবং সহযোগিতার আইডিয়া অন্তর্ভুক্ত করুন।",
        },
        psychology: {
          en: "Uses social proof and FOMO loops to energize trend-seeking bidders.",
          bn: "সোশ্যাল প্রুফ ও FOMO লুপ ব্যবহার করে ট্রেন্ড-পিপাসু বিডারদের উদ্দীপ্ত করে।",
        },
      },
      {
        title: {
          en: "Cross-platform community manager",
          bn: "ক্রস-প্ল্যাটফর্ম কমিউনিটি ম্যানেজার",
        },
        instructions: {
          en: "Take the role of our auction’s social media manager. Build a 10-day publishing calendar (Twitter, LinkedIn, Facebook, and email) that nurtures interested buyers, answers common bidding questions, spotlights high-value lots, and nudges followers to place early bids.",
          bn: "আমাদের নিলামের সোশ্যাল মিডিয়া ম্যানেজারের ভূমিকায় নিন। টুইটার, লিংকডইন, ফেসবুক ও ইমেইলের জন্য ১০ দিনের পাবলিশিং ক্যালেন্ডার তৈরি করুন যা আগ্রহী ক্রেতাদের লালন করে, সাধারণ বিডিং প্রশ্নের উত্তর দেয়, উচ্চ-মূল্যের লটকে হাইলাইট করে এবং অনুসারীদের আগেভাগে বিড করতে উৎসাহিত করে।",
        },
        psychology: {
          en: "Reduces friction by answering objections while reinforcing high-ticket value.",
          bn: "অভিযোগের জবাব দিয়ে ঘর্ষণ কমায় এবং উচ্চমূল্যের লটের মূল্য তুলে ধরে।",
        },
      },
      {
        title: {
          en: "Brand positioning strategist",
          bn: "ব্র্যান্ড পজিশনিং স্ট্র্যাটেজিস্ট",
        },
        instructions: {
          en: "Serve as a creative branding strategist for a premium real-estate bidding platform. Craft positioning statements, visual cues, tone-of-voice guidelines, and experiential marketing ideas that make affluent investors feel confident about placing multi-million-dollar bids.",
          bn: "একটি প্রিমিয়াম রিয়েল-এস্টেট বিডিং প্ল্যাটফর্মের জন্য সৃজনশীল ব্র্যান্ডিং স্ট্র্যাটেজিস্টের ভূমিকায় কাজ করুন। পজিশনিং স্টেটমেন্ট, ভিজ্যুয়াল সংকেত, টোন-অব-ভয়েস নির্দেশিকা এবং অভিজ্ঞতাভিত্তিক মার্কেটিং আইডিয়া তৈরি করুন যাতে সচ্ছল বিনিয়োগকারীরা বহু-মিলিয়ন ডলারের বিড করতে আত্মবিশ্বাসী হন।",
        },
        psychology: {
          en: "Establishes trust signals and identity for status-driven bidders.",
          bn: "স্ট্যাটাসকেন্দ্রিক বিডারদের জন্য আস্থার সংকেত ও পরিচয় নির্মাণ করে।",
        },
      },
      {
        title: {
          en: "High-conversion sales outreach",
          bn: "হাই-কনভার্সন সেলস আউটরিচ",
        },
        instructions: {
          en: "Role-play as an enterprise sales rep calling procurement directors. Draft a persuasive cold-call script and follow-up email sequence that convinces them to pre-register for our reverse-bid marketplace, emphasizing the exclusivity of suppliers and the cost-saving potential.",
          bn: "একজন এন্টারপ্রাইজ সেলস রিপ হিসেবে প্রোকিউরমেন্ট ডিরেক্টরদের ফোন করুন। সরবরাহকারীদের এক্সক্লুসিভিটি ও খরচ সাশ্রয়ের সম্ভাবনা জোর দিয়ে তাদেরকে আমাদের রিভার্স-বিড মার্কেটপ্লেসে প্রি-রেজিস্টার করতে রাজি করানোর জন্য প্রভাবশালী কোল্ড-কল স্ক্রিপ্ট ও ফলো-আপ ইমেইল সিকোয়েন্স লিখুন।",
        },
        psychology: {
          en: "Leverages exclusivity and ROI framing to persuade cost-focused buyers.",
          bn: "এক্সক্লুসিভিটি ও ROI কাঠামো ব্যবহার করে ব্যয়সচেতন ক্রেতাদের রাজি করায়।",
        },
      },
      {
        title: {
          en: "Event-based engagement planner",
          bn: "ইভেন্ট-ভিত্তিক এনগেজমেন্ট প্ল্যানার",
        },
        instructions: {
          en: "Plan a live-streamed preview night for our NFT art auction. Outline the event flow, featured speakers/artists, audience interaction tactics, and pre/post-event marketing that maximizes bidder sign-ups and live attendance.",
          bn: "আমাদের NFT আর্ট নিলামের জন্য একটি লাইভস্ট্রিমড প্রিভিউ নাইট পরিকল্পনা করুন। ইভেন্ট ফ্লো, বিশেষ বক্তা/শিল্পী, দর্শকদের সম্পৃক্ততার কৌশল এবং ইভেন্টের আগে-পরে মার্কেটিং পরিকল্পনা করুন যা বিডার সাইন-আপ ও লাইভ উপস্থিতি সর্বাধিক করে।",
        },
        psychology: {
          en: "Combines immersive preview and community interaction to convert curious spectators.",
          bn: "ইমার্সিভ প্রিভিউ ও কমিউনিটি ইন্টারঅ্যাকশন একত্রে এনে কৌতূহলী দর্শকদের রূপান্তরিত করে।",
        },
      },
    ],
  },
  {
    id: "midjourney",
    icon: "palette",
    title: {
      en: "Midjourney scene prompts for trust-first bidding UIs",
      bn: "ট্রাস্ট-প্রথম বিডিং UI-এর জন্য মিডজার্নি দৃশ্য প্রম্পট",
    },
    description: {
      en: "Visual design blueprints that balance confidence, urgency, and simplicity for your marketplace creatives.",
      bn: "আপনার মার্কেটপ্লেস ক্রিয়েটিভের জন্য আত্মবিশ্বাস, জরুরিতা ও সরলতার ভারসাম্য রক্ষা করা ভিজ্যুয়াল ডিজাইন ব্লুপ্রিন্ট।",
    },
    prompts: [
      {
        title: {
          en: "Trust-building hero visual",
          bn: "আস্থা সৃষ্টিকারী হিরো ভিজ্যুয়াল",
        },
        instructions: {
          en: `/imagine Hero illustration for a transparent bidding dashboard, confident Bangladeshi entrepreneur placing a bid on a floating holo screen, warm aurora gradients, soft ambient light, inclusive product design details, UI overlay with trust badges and realtime analytics, ultra clean digital art --ar 16:9 --style raw --s 750 --q 2`,
          bn: `/imagine স্বচ্ছ বিডিং ড্যাশবোর্ডের জন্য হিরো ইলাস্ট্রেশন, আত্মবিশ্বাসী বাংলাদেশি উদ্যোক্তা ভাসমান হলোগ্রাফিক স্ক্রিনে বিড দিচ্ছেন, উষ্ণ অরোরা গ্রেডিয়েন্ট, কোমল অ্যাম্বিয়েন্ট লাইট, অন্তর্ভুক্তিমূলক প্রোডাক্ট ডিজাইন ডিটেইল, ট্রাস্ট ব্যাজ ও রিয়েলটাইম অ্যানালিটিক্সসহ UI ওভারলে, অতিরিক্ত পরিষ্কার ডিজিটাল আর্ট --ar 16:9 --style raw --s 750 --q 2`,
        },
        psychology: {
          en: "Uses eye contact, warm hues, and transparency cues to reduce bidder anxiety.",
          bn: "চোখের যোগাযোগ, উষ্ণ রং ও স্বচ্ছতার সংকেত ব্যবহার করে বিডারের উদ্বেগ কমায়।",
        },
      },
      {
        title: {
          en: "Calm urgency countdown module",
          bn: "শান্ত জরুরিতা কাউন্টডাউন মডিউল",
        },
        instructions: {
          en: `/imagine Minimalist countdown widget for an auction marketplace, rounded edges, breathable white space, soft teal and amber palette, motion blur accents, microcopy that reads "Early bids close in 02:45", design thinking aesthetic emphasizing calm urgency, UX shot --ar 4:5 --v 6 --style raw`,
          bn: `/imagine নিলাম মার্কেটপ্লেসের জন্য মিনিমালিস্ট কাউন্টডাউন উইজেট, গোলাকার প্রান্ত, স্বচ্ছন্দ সাদা স্থান, কোমল টিল ও অ্যাম্বার রঙের প্যালেট, হালকা মোশন ব্লার অ্যাকসেন্ট, "Early bids close in 02:45" মাইক্রোকপি সহ, শান্ত জরুরিতাকে জোর দেয় এমন ডিজাইন থিংকিং নান্দনিকতা, UX শট --ar 4:5 --v 6 --style raw`,
        },
        psychology: {
          en: "Signals time pressure without panic so planners stay engaged.",
          bn: "প্যানিক ছাড়াই সময়ের চাপের সংকেত দিয়ে পরিকল্পনাকারীদের সম্পৃক্ত রাখে।",
        },
      },
      {
        title: {
          en: "Community proof mosaic",
          bn: "কমিউনিটি প্রুফ মোজাইক",
        },
        instructions: {
          en: `/imagine Collage of diverse bidders smiling during a hybrid auction event, mix of live video frames and UI screenshots, gentle depth of field, celebratory confetti particles, headline overlay "Trusted by 12,400 bidders", brand colors emerald and saffron, cinematic lighting --ar 3:2 --style raw --q 2`,
          bn: `/imagine হাইব্রিড নিলাম ইভেন্টে হাসিমুখের বৈচিত্র্যময় বিডারদের কোলাজ, লাইভ ভিডিও ফ্রেম ও UI স্ক্রিনশটের মিশ্রণ, কোমল ডেপথ অফ ফিল্ড, উদযাপনমূলক কনফেটি পার্টিকল, "Trusted by 12,400 bidders" হেডলাইন ওভারলে, ব্র্যান্ডের রং এমেরাল্ড ও জাফরানি, সিনেমাটিক লাইটিং --ar 3:2 --style raw --q 2`,
        },
        psychology: {
          en: "Stacks social proof imagery to normalize bidding commitment.",
          bn: "সোশ্যাল প্রুফের ইমেজারি স্তরবিন্যাস করে বিডিং প্রতিশ্রুতি স্বাভাবিক করে তোলে।",
        },
      },
    ],
  },
  {
    id: "google-nano-banana",
    icon: "brain",
    title: {
      en: "Google Gemini Nano “Banana” micro-prompts",
      bn: "গুগল জেমিনি ন্যানো “বানানা” মাইক্রো-প্রম্পট",
    },
    description: {
      en: "On-device assistants tuned for quick reassurance loops, bias-free nudges, and contextual bidding guidance.",
      bn: "অন-ডিভাইস সহকারী যেগুলো দ্রুত আশ্বাস, পক্ষপাতহীন নাজ ও প্রাসঙ্গিক বিডিং গাইডেন্সের জন্য টিউন করা।",
    },
    prompts: [
      {
        title: {
          en: "Bid alert digest",
          bn: "বিড অ্যালার্ট ডাইজেস্ট",
        },
        instructions: {
          en: "Gemini Nano, act as a privacy-safe notifier named Banana Breeze. Summarize the top three bids I received in the last hour with amount, bidder intent sentiment, and one recommended response action. Keep the update under 80 words so I can glance at it between meetings.",
          bn: "জেমিনি ন্যানো, তুমি বানানা ব্রিজ নামে একটি প্রাইভেসি-নিরাপদ নোটিফায়ার হিসেবে কাজ করো। গত এক ঘণ্টায় পাওয়া শীর্ষ তিনটি বিড পরিমাণ, বিডারের অভিপ্রায়ের সেন্টিমেন্ট এবং একটি প্রস্তাবিত প্রতিক্রিয়া পদক্ষেপসহ সংক্ষেপে তুলে ধরো। আপডেটটি ৮০ শব্দের মধ্যে রাখো যাতে মিটিংয়ের ফাঁকে দ্রুত পড়ে নিতে পারি।",
        },
        psychology: {
          en: "Delivers concise reassurance that the market is active without overwhelming the seller.",
          bn: "বিক্রেতাকে অপ্রয়োজনীয় চাপ না দিয়ে বাজার সক্রিয় আছে এমন আশ্বাস সংক্ষেপে দেয়।",
        },
      },
      {
        title: {
          en: "Negotiation microcopy coach",
          bn: "আলোচনা মাইক্রোকপি কোচ",
        },
        instructions: {
          en: "Gemini Nano Banana, rewrite this counter-offer message so it keeps our premium tone but adds a cooperative line that reduces defensiveness. Output three variations ranked by how friendly, firm, and fast they feel.",
          bn: "জেমিনি ন্যানো বানানা, এই কাউন্টার-অফার বার্তাটি পুনর্লিখন করো যাতে আমাদের প্রিমিয়াম টোন বজায় থাকে কিন্তু আত্মরক্ষামূলক মনোভাব কমাতে সহযোগিতামূলক একটি লাইন যোগ হয়। বন্ধুত্বপূর্ণ, দৃঢ় ও দ্রুততার অনুভূতির ভিত্তিতে তিনটি ভ্যারিয়েশন শ্রেণিবদ্ধ করে দাও।",
        },
        psychology: {
          en: "Balances authority with warmth so buyers stay in the negotiation.",
          bn: "অধিকার প্রতিষ্ঠার সাথে উষ্ণতা বজায় রাখে যাতে ক্রেতারা আলোচনায় থাকেন।",
        },
      },
      {
        title: {
          en: "Voice note sentiment mirror",
          bn: "ভয়েস নোট সেন্টিমেন্ট মিরর",
        },
        instructions: {
          en: "Banana, analyze this bidder voice memo and return a quick mirror script I can play back acknowledging their concern, restating value, and inviting the next step. Cap it at 20 seconds for smooth playback.",
          bn: "বানানা, এই বিডারের ভয়েস মেমো বিশ্লেষণ করে একটি দ্রুত মিরর স্ক্রিপ্ট দাও যাতে তাদের উদ্বেগ স্বীকার করা, মূল মূল্য পুনরায় ব্যাখ্যা করা এবং পরবর্তী ধাপের আমন্ত্রণ থাকে। মসৃণ প্লেব্যাকের জন্য ২০ সেকেন্ডের মধ্যে রাখো।",
        },
        psychology: {
          en: "Reflects empathy to keep hesitant bidders emotionally engaged.",
          bn: "সমবেদনা প্রতিফলিত করে দ্বিধাগ্রস্ত বিডারদের আবেগগতভাবে সম্পৃক্ত রাখে।",
        },
      },
    ],
  },
  {
    id: "video-prompts",
    icon: "video",
    title: {
      en: "Video prompt scripts for auction storytelling",
      bn: "নিলাম স্টোরিটেলিংয়ের জন্য ভিডিও প্রম্পট স্ক্রিপ্ট",
    },
    description: {
      en: "Storyboard-ready prompts for Runway, Pika, or Synthesia clips that drive bids through narrative emotion.",
      bn: "রানওয়ে, পিকা বা সিন্থেসিয়া ক্লিপের জন্য স্টোরিবোর্ড প্রস্তুত প্রম্পট যা গল্পের আবেগ দিয়ে বিড বাড়ায়।",
    },
    prompts: [
      {
        title: {
          en: "30-second preview trailer",
          bn: "৩০ সেকেন্ডের প্রিভিউ ট্রেলার",
        },
        instructions: {
          en: `Generate a 30-second video script for a hybrid auction preview. Scene 1: close-up of premium lots with overlay stats. Scene 2: bidder testimonials in split-screen. Scene 3: host invite with animated countdown. Aim for uplifting music cues and end on a clear "Bid live this Friday" call-to-action.`,
          bn: `একটি হাইব্রিড নিলাম প্রিভিউর জন্য ৩০ সেকেন্ডের ভিডিও স্ক্রিপ্ট তৈরি করুন। দৃশ্য ১: প্রিমিয়াম লটের ক্লোজ-আপ ওভারলে পরিসংখ্যানসহ। দৃশ্য ২: স্প্লিট-স্ক্রিনে বিডার টেস্টিমোনিয়াল। দৃশ্য ৩: এনিমেটেড কাউন্টডাউনসহ হোস্টের আমন্ত্রণ। উদ্দীপক সঙ্গীত নির্দেশ রাখুন এবং "Bid live this Friday" স্পষ্ট কল-টু-অ্যাকশনে শেষ করুন।`,
        },
        psychology: {
          en: "Stacks authority, proof, and urgency in one micro-story to trigger commitment.",
          bn: "একটি মাইক্রো-স্টোরিতে কর্তৃত্ব, প্রমাণ ও জরুরিতা একত্রে এনে প্রতিশ্রুতি উদ্দীপিত করে।",
        },
      },
      {
        title: {
          en: "Buyer success reel",
          bn: "ক্রেতা সফলতার রিল",
        },
        instructions: {
          en: "Write a vertical video prompt that spotlights three bidder wins. Use motion typography for their savings percentages, overlay friendly host narration, and close with a swipe-up CTA to join the bidding room. Keep clips under 8 seconds each for social retention.",
          bn: "তিনটি বিডারের সফলতা তুলে ধরার জন্য একটি ভার্টিকাল ভিডিও প্রম্পট লিখুন। তাদের সাশ্রয়ের শতাংশ মোশন টাইপোগ্রাফিতে দেখান, বন্ধুত্বপূর্ণ হোস্টের বর্ণনা ওভারলে করুন এবং বিডিং রুমে যোগ দেওয়ার জন্য সুইপ-আপ CTA দিয়ে শেষ করুন। সোশ্যাল রিটেনশনের জন্য প্রতিটি ক্লিপ ৮ সেকেন্ডের মধ্যে রাখুন।",
        },
        psychology: {
          en: "Celebrates peer wins so prospective bidders imagine their own outcome.",
          bn: "সহকর্মীদের সাফল্য উদযাপন করে সম্ভাব্য বিডারদের নিজেদের ফলাফল কল্পনা করতে সাহায্য করে।",
        },
      },
      {
        title: {
          en: "Live-room atmosphere loop",
          bn: "লাইভ রুম আবহ লুপ",
        },
        instructions: {
          en: "Prompt a looping background video that shows the bidding room interface, subtle cursor movements, ambient chat bubbles, and a slow zoom toward the featured lot. Keep colors warm and typography crisp to suggest momentum without stress.",
          bn: "একটি লুপিং ব্যাকগ্রাউন্ড ভিডিওর জন্য প্রম্পট লিখুন যেখানে বিডিং রুম ইন্টারফেস, সূক্ষ্ম কার্সর চলাচল, অ্যাম্বিয়েন্ট চ্যাট বাবল এবং ফিচার্ড লটের দিকে ধীর জুম দেখা যায়। রং উষ্ণ ও টাইপোগ্রাফি তীক্ষ্ণ রাখুন যাতে চাপ ছাড়াই গতি নির্দেশ করে।",
        },
        psychology: {
          en: "Keeps attention anchored in the space so viewers feel ready to participate.",
          bn: "দর্শকের মনোযোগকে সেই পরিবেশে স্থির রাখে যাতে তারা অংশ নিতে প্রস্তুত বোধ করে।",
        },
      },
    ],
  },
];

const formatCurrency = (value: number, currency: "USD" | "EUR" = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: value >= 100 ? 0 : 2,
  }).format(value);

const BidExchange = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [listings, setListings] = useState<ExchangeListing[]>(INITIAL_LISTINGS);
  const [marketPulse, setMarketPulse] = useState({
    totalBids: 186,
    volume: 48250,
    avgClosing: 312,
    trend: 5.6,
  });
  const [activeListing, setActiveListing] = useState<ExchangeListing | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");

  const optimizedPricingById = useMemo(() => {
    return listings.reduce<
      Record<string, ReturnType<typeof computeOptimizedPromptPricing>>
    >((accumulator, listing) => {
      accumulator[listing.id] = computeOptimizedPromptPricing({
        floorPriceUsd: listing.floorPrice,
        highestBidUsd: listing.highestBid,
        bidHistoryUsd: listing.bidHistory,
        watchers: listing.watchers,
        bidVelocity: listing.bidVelocity,
      });
      return accumulator;
    }, {});
  }, [listings]);

  const activeListingPricing = activeListing ? optimizedPricingById[activeListing.id] : null;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setListings((current) =>
        current.map((listing) => {
          const drift = (Math.random() - 0.35) * 8;
          const nextHighest = Math.max(
            listing.floorPrice * 0.85,
            listing.highestBid + drift,
          );
          const updatedHistory = [...listing.bidHistory.slice(-11), Number(nextHighest.toFixed(2))];
          const watcherDrift = Math.max(
            60,
            listing.watchers + Math.round((Math.random() - 0.3) * 4),
          );
          const velocityDrift = Math.max(
            0.8,
            Number((listing.bidVelocity + (Math.random() - 0.5) * 0.6).toFixed(2)),
          );

          return {
            ...listing,
            highestBid: Number(nextHighest.toFixed(2)),
            bidHistory: updatedHistory,
            watchers: watcherDrift,
            bidVelocity: velocityDrift,
          };
        }),
      );

      setMarketPulse((prev) => {
        const nextTrend = Math.min(
          14,
          Math.max(2, Number((prev.trend + (Math.random() - 0.5)).toFixed(1))),
        );
        const nextTotalBids = Math.max(
          120,
          prev.totalBids + Math.round((Math.random() - 0.35) * 6),
        );
        const nextVolume = Math.max(
          32000,
          prev.volume + Math.round((Math.random() - 0.45) * 1800),
        );
        const nextAvgClosing = Math.max(
          180,
          Number((prev.avgClosing + (Math.random() - 0.5) * 4).toFixed(1)),
        );

        return {
          totalBids: nextTotalBids,
          volume: nextVolume,
          avgClosing: nextAvgClosing,
          trend: nextTrend,
        };
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const topCategory = useMemo(() => {
    const tally = listings.reduce<Record<string, { watchers: number; copy: LocalizedCopy }>>(
      (acc, listing) => {
        const key = listing.category.en;
        const categoryData = acc[key] ?? { watchers: 0, copy: listing.category };
        acc[key] = {
          watchers: categoryData.watchers + listing.watchers,
          copy: categoryData.copy,
        };
        return acc;
      },
      {},
    );

    const [category] = Object.values(tally).sort((a, b) => b.watchers - a.watchers);
    return category?.copy;
  }, [listings]);

  const averageVelocity = useMemo(() => {
    if (!listings.length) {
      return 0;
    }

    const total = listings.reduce((sum, listing) => sum + listing.bidVelocity, 0);
    return Number((total / listings.length).toFixed(1));
  }, [listings]);

  const handleOpenBid = (listing: ExchangeListing) => {
    setActiveListing(listing);
    setBidAmount("");
    setIsDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setActiveListing(null);
      setBidAmount("");
    }
  };

  const handleConfirmBid = () => {
    if (!activeListing) {
      return;
    }

    const parsedAmount = Number.parseFloat(bidAmount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: isEnglish ? "Enter a valid amount" : "সঠিক বিড লিখুন",
        description: isEnglish
          ? "Add a bid amount greater than zero to continue."
          : "আগাতে শূন্যের বেশি বিড মূল্য দিন।",
        variant: "destructive",
      });
      return;
    }

    setListings((current) =>
      current.map((listing) => {
        if (listing.id !== activeListing.id) {
          return listing;
        }

        const nextHighest = Math.max(parsedAmount, listing.highestBid);
        const updatedHistory = [...listing.bidHistory.slice(-11), Number(nextHighest.toFixed(2))];

        return {
          ...listing,
          highestBid: Number(nextHighest.toFixed(2)),
          bidHistory: updatedHistory,
          watchers: listing.watchers + 5,
          bidVelocity: Number((listing.bidVelocity + 0.6).toFixed(1)),
        };
      }),
    );

    setMarketPulse((prev) => ({
      totalBids: prev.totalBids + 1,
      volume: prev.volume + Math.round(parsedAmount),
      avgClosing: Number(((prev.avgClosing * 0.85 + parsedAmount * 0.15)).toFixed(1)),
      trend: Math.min(14, Number((prev.trend + 0.6).toFixed(1))),
    }));

    toast({
      title: isEnglish ? "Bid submitted" : "বিড জমা হয়েছে",
      description: isEnglish
        ? "Your prompt bid is now live on the exchange."
        : "আপনার প্রম্পট বিড এখন এক্সচেঞ্জে লাইভ।",
    });

    setIsDialogOpen(false);
    setActiveListing(null);
    setBidAmount("");
  };

  const getTrendMeta = (history: number[]) => {
    if (history.length < 2) {
      return { direction: "steady" as const, change: 0 };
    }

    const change = history[history.length - 1] - history[history.length - 2];
    if (change > 1.5) {
      return { direction: "up" as const, change };
    }
    if (change < -1.5) {
      return { direction: "down" as const, change };
    }
    return { direction: "steady" as const, change };
  };

  return (
    <section id="exchange" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(247, 255, 246, 0.88) 45%, rgba(255, 246, 223, 0.82) 100%)",
          }}
        />
        <div
          className="absolute -top-32 left-[12%] h-80 w-80 rounded-full blur-[150px]"
          style={{ background: "rgba(34, 94, 56, 0.18)" }}
        />
        <div
          className="absolute -bottom-36 right-[8%] h-72 w-72 rounded-full blur-[130px]"
          style={{ background: "rgba(217, 119, 6, 0.2)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <p className="section-eyebrow">
              {isEnglish ? "Prompt bidding exchange" : "প্রম্পট বিডিং এক্সচেঞ্জ"}
            </p>
            <h2 className="section-heading text-balance">
              {isEnglish
                ? "Bid, sell, and watch market data update in real time."
                : "বিড করুন, বিক্রি করুন এবং বাজারের তথ্য দেখুন তাৎক্ষণিকভাবে।"}
            </h2>
            <p className="section-subheading">
              {isEnglish
                ? "The PromptBazar live exchange lets creators invite bids on premium workflows while enterprises track liquidity, price momentum, and buyer intent with streaming analytics."
                : "PromptBazar লাইভ এক্সচেঞ্জে ক্রিয়েটররা প্রিমিয়াম ওয়ার্কফ্লোতে বিড আহ্বান করতে পারে এবং এন্টারপ্রাইজ টিম তাৎক্ষণিক অ্যানালিটিক্সে লিকুইডিটি, মূল্যগত গতি ও ক্রেতাদের আগ্রহ ট্র্যাক করতে পারে।"}
            </p>
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-900 shadow-sm">
              <Activity className="h-4 w-4" />
              <span>
                {isEnglish
                  ? `Avg. ${averageVelocity} bids/min`
                  : `গড়ে মিনিটে ${averageVelocity}টি বিড`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start rounded-full border border-emerald-200/70 bg-white/80 p-2 shadow-sm">
            {(["buy", "sell"] as const).map((nextMode) => (
              <Button
                key={nextMode}
                type="button"
                variant={mode === nextMode ? "default" : "ghost"}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-semibold",
                  mode === nextMode
                    ? "bg-[var(--gradient-aurora)] text-white shadow-[var(--shadow-soft)] hover:bg-[var(--gradient-aurora)]"
                    : "text-emerald-900 hover:bg-emerald-50",
                )}
                onClick={() => setMode(nextMode)}
              >
                {isEnglish
                  ? nextMode === "buy"
                    ? "Buy-side bids"
                    : "Sell-side offers"
                  : nextMode === "buy"
                  ? "ক্রয় বিড"
                  : "বিক্রয় অফার"}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-panel order-2 space-y-6 rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-[0_32px_65px_-42px_rgba(34,94,56,0.55)] backdrop-blur lg:order-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {isEnglish ? "Live analytics" : "লাইভ অ্যানালিটিক্স"}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-emerald-900">
                  {isEnglish ? "Market pulse" : "বাজারের পালস"}
                </h3>
              </div>
              <LineChart className="h-6 w-6 text-primary" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/80 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-900/70">
                  {isEnglish ? "Active bids" : "সক্রিয় বিড"}
                </p>
                <p className="mt-3 text-3xl font-semibold text-emerald-950">
                  {marketPulse.totalBids.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>
                    {isEnglish
                      ? `Up ${marketPulse.trend.toFixed(1)}% QoQ`
                      : `ত্রৈমাসিকে ${marketPulse.trend.toFixed(1)}% বৃদ্ধি`}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100/80 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {isEnglish ? "24h volume" : "২৪ ঘণ্টার ভলিউম"}
                </p>
                <p className="mt-3 text-3xl font-semibold text-emerald-900">
                  {formatCurrency(marketPulse.volume)}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <Clock className="h-4 w-4" />
                  <span>{isEnglish ? "Rolling window" : "রোলিং উইন্ডো"}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100/80 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {isEnglish ? "Average closing" : "গড় ক্লোজিং"}
                </p>
                <p className="mt-3 text-3xl font-semibold text-emerald-900">
                  {formatCurrency(marketPulse.avgClosing)}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <Activity className="h-4 w-4" />
                  <span>
                    {isEnglish
                      ? `${averageVelocity} bids/min`
                      : `মিনিটে ${averageVelocity} বিড`}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100/80 bg-emerald-900 p-5 text-white shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-100/80">
                  {isEnglish ? "Top liquidity" : "সর্বোচ্চ লিকুইডিটি"}
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  {topCategory ? (isEnglish ? topCategory.en : topCategory.bn) : "—"}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-100/85">
                  <Users className="h-4 w-4" />
                  <span>
                    {isEnglish
                      ? "Most watched category"
                      : "সর্বাধিক নজরকাড়া ক্যাটাগরি"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-6 lg:order-2">
            {listings.map((listing) => {
              const optimized = optimizedPricingById[listing.id];
              const sellBandUsd = optimized
                ? ([optimized.recommendedAskUsd, optimized.bidBandUsd[1]] as [number, number])
                : null;
              const sellBandEur = optimized
                ? ([optimized.recommendedAskEur, optimized.bidBandEur[1]] as [number, number])
                : null;
              const trendMeta = getTrendMeta(listing.bidHistory);
              const maxHistory = Math.max(...listing.bidHistory);

              return (
                <div
                  key={listing.id}
                  className="glass-panel flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-[0_32px_65px_-42px_rgba(34,94,56,0.55)] backdrop-blur"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <Badge className="mb-3 w-fit rounded-full bg-emerald-100 text-emerald-900">
                        {isEnglish ? listing.category.en : listing.category.bn}
                      </Badge>
                      <h3 className="text-xl font-semibold text-emerald-950">
                        {isEnglish ? listing.title.en : listing.title.bn}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {isEnglish
                          ? "Streaming price book updated every five seconds."
                          : "প্রতি পাঁচ সেকেন্ডে আপডেট হওয়া স্ট্রিমিং প্রাইস বুক।"}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="rounded-2xl border border-emerald-100/80 bg-white px-4 py-3 text-right shadow-sm">
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                          {isEnglish ? "Highest bid" : "সর্বোচ্চ বিড"}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-emerald-900">
                          {formatCurrency(listing.highestBid)}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/80 px-4 py-3 text-right shadow-sm">
                        <p className="text-xs uppercase tracking-[0.3em] text-emerald-900/70">
                          {isEnglish ? "Floor" : "ফ্লোর"}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-emerald-900">
                          {formatCurrency(listing.floorPrice)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex flex-1 flex-col gap-4 text-sm text-muted-foreground">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-3 py-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span>
                          {isEnglish
                            ? `${listing.watchers.toLocaleString()} watching`
                            : `${listing.watchers.toLocaleString()} জন নজরে রাখছে`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-3 py-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        <span>
                          {isEnglish
                            ? `${listing.bidVelocity} bids/min`
                            : `মিনিটে ${listing.bidVelocity} বিড`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-3 py-2">
                        {trendMeta.direction === "down" ? (
                          <ArrowDownRight className="h-4 w-4 text-amber-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                        )}
                        <span>
                          {trendMeta.direction === "steady"
                            ? isEnglish
                              ? "Flat momentum"
                              : "স্থিতিশীল গতি"
                            : isEnglish
                            ? `${trendMeta.direction === "up" ? "Bullish" : "Cooling"} ${formatCurrency(Math.abs(trendMeta.change))}`
                            : `${trendMeta.direction === "up" ? "উর্ধ্বমুখী" : "শীতল"} ${formatCurrency(Math.abs(trendMeta.change))}`}
                        </span>
                      </div>
                      </div>

                      {optimized && (
                        <>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl border border-emerald-100/80 bg-white/70 p-4 shadow-sm">
                              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                {isEnglish ? "Optimized buy bid" : "অপ্টিমাইজড ক্রয় বিড"}
                              </p>
                              <p className="mt-2 text-lg font-semibold text-emerald-900">
                                {formatCurrency(optimized.recommendedBidUsd)}
                                <span className="ml-2 text-sm text-muted-foreground">
                                  {formatCurrency(optimized.recommendedBidEur, "EUR")}
                                </span>
                              </p>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {isEnglish
                                  ? `Entry band ${formatCurrency(optimized.bidBandUsd[0])} – ${formatCurrency(optimized.recommendedBidUsd)}`
                                  : `এন্ট্রি পরিসর ${formatCurrency(optimized.bidBandUsd[0])} – ${formatCurrency(optimized.recommendedBidUsd)}`}
                                <br />
                                <span className="text-[11px] text-muted-foreground/80">
                                  {formatCurrency(optimized.bidBandEur[0], "EUR")} –
                                  {" "}
                                  {formatCurrency(optimized.recommendedBidEur, "EUR")}
                                </span>
                              </p>
                            </div>

                            <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/80 p-4 shadow-sm">
                              <p className="text-xs uppercase tracking-[0.3em] text-emerald-900/70">
                                {isEnglish ? "Optimized sell ask" : "অপ্টিমাইজড বিক্রয় অফার"}
                              </p>
                              <p className="mt-2 text-lg font-semibold text-emerald-900">
                                {formatCurrency(optimized.recommendedAskUsd)}
                                <span className="ml-2 text-sm text-emerald-700">
                                  {formatCurrency(optimized.recommendedAskEur, "EUR")}
                                </span>
                              </p>
                              {sellBandUsd && sellBandEur && (
                                <p className="mt-2 text-xs text-emerald-900/80">
                                  {isEnglish
                                    ? `Exit band ${formatCurrency(sellBandUsd[0])} – ${formatCurrency(sellBandUsd[1])}`
                                    : `প্রস্থান পরিসর ${formatCurrency(sellBandUsd[0])} – ${formatCurrency(sellBandUsd[1])}`}
                                  <br />
                                  <span className="text-[11px] text-emerald-900/70">
                                    {formatCurrency(sellBandEur[0], "EUR")} –
                                    {" "}
                                    {formatCurrency(sellBandEur[1], "EUR")}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>

                          <p className="mt-3 text-xs text-muted-foreground">
                            {isEnglish
                              ? `Momentum score ${optimized.momentumScore.toFixed(2)} · Demand score ${optimized.demandScore.toFixed(2)}`
                              : `গতির স্কোর ${optimized.momentumScore.toFixed(2)} · চাহিদা স্কোর ${optimized.demandScore.toFixed(2)}`}
                          </p>

                          <div className="mt-3 space-y-3">
                            <div className="rounded-2xl border border-emerald-100/80 bg-white/70 p-4 shadow-sm">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                    {isEnglish ? "Market-clearing range" : "বাজার-সমন্বিত পরিসর"}
                                  </p>
                                  <p className="mt-2 text-sm font-semibold text-emerald-900">
                                    {formatCurrency(optimized.marketRangeUsd[0])} – {formatCurrency(optimized.marketRangeUsd[1])}
                                    <span className="ml-2 text-xs text-muted-foreground">
                                      {formatCurrency(optimized.marketRangeEur[0], "EUR")} –
                                      {" "}
                                      {formatCurrency(optimized.marketRangeEur[1], "EUR")}
                                    </span>
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {isEnglish
                                      ? "Grounded in PromptBase and Upwork prompt packages."
                                      : "PromptBase ও Upwork প্রম্পট প্যাকেজের উপর ভিত্তি করে।"}
                                  </p>
                                </div>
                                <LineChart className="h-5 w-5 text-emerald-600" />
                              </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                              {optimized.marketComparables.map((comparable) => (
                                <div
                                  key={`${listing.id}-${comparable.market}-${comparable.lastUpdated}`}
                                  className="rounded-2xl border border-emerald-100/80 bg-white/70 p-4 shadow-sm"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                        {comparable.market}
                                      </p>
                                      <p className="mt-2 text-sm font-semibold text-emerald-900">
                                        {isEnglish ? comparable.offering.en : comparable.offering.bn}
                                      </p>
                                    </div>
                                    <Badge className="rounded-full bg-emerald-100 text-emerald-900">
                                      n={comparable.sampleSize}
                                    </Badge>
                                  </div>
                                  <p className="mt-3 text-sm text-emerald-900">
                                    {formatCurrency(comparable.usdRange[0])} – {formatCurrency(comparable.usdRange[1])}
                                    <span className="ml-2 text-xs text-muted-foreground">
                                      {formatCurrency(comparable.eurRange[0], "EUR")} –
                                      {" "}
                                      {formatCurrency(comparable.eurRange[1], "EUR")}
                                    </span>
                                  </p>
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    {isEnglish
                                      ? `Top sellers reach ${formatCurrency(comparable.usdPremiumAnchor)} (${formatCurrency(comparable.eurPremiumAnchor, "EUR")}).`
                                      : `শীর্ষ বিক্রেতারা পৌঁছায় ${formatCurrency(comparable.usdPremiumAnchor)} (${formatCurrency(comparable.eurPremiumAnchor, "EUR")}).`}
                                  </p>
                                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                                    <span>
                                      {isEnglish
                                        ? `Updated ${comparable.lastUpdated}`
                                        : `${comparable.lastUpdated} আপডেট`}
                                    </span>
                                    <a
                                      href={comparable.sourceUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800"
                                    >
                                      {isEnglish ? "Source" : "সূত্র"}
                                      <ArrowUpRight className="h-3 w-3" />
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <Button
                      type="button"
                      className="rounded-full bg-[var(--gradient-aurora)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
                      onClick={() => handleOpenBid(listing)}
                    >
                      {isEnglish
                        ? mode === "buy"
                          ? "Place buy bid"
                          : "List sell offer"
                        : mode === "buy"
                        ? "ক্রয় বিড দিন"
                        : "বিক্রির অফার দিন"}
                    </Button>
                  </div>

                  <div className="flex items-end gap-2">
                    {listing.bidHistory.map((point, index) => (
                      <div
                        key={`${listing.id}-history-${index}`}
                        className="flex-1 rounded-full bg-gradient-to-t from-emerald-200 to-emerald-500/70"
                        style={{
                          height: `${Math.max(8, (point / maxHistory) * 60)}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="section-eyebrow">
              {isEnglish ? "Design psychology playbooks" : "ডিজাইন সাইকোলজি প্লেবুক"}
            </p>
            <h3 className="section-heading text-balance text-emerald-950">
              {isEnglish
                ? "Pre-built bidder flows you can paste into your favorite models."
                : "আপনার পছন্দের মডেলে পেস্ট করার মতো বিডার-কেন্দ্রিক ফ্লো তৈরি করা আছে।"}
            </h3>
            <p className="section-subheading">
              {isEnglish
                ? "Each card pairs a high-intent prompt with the psychology lever it activates so you ship assets fast."
                : "প্রতিটি কার্ডে উচ্চ-ইচ্ছুক প্রম্পটের সাথে তার মনস্তাত্ত্বিক ট্রিগারও দেওয়া হয়েছে—যাতে দ্রুত সম্পদ তৈরি করতে পারেন।"}
            </p>
          </div>

          <div className="grid gap-8">
            {promptPlaybooks.map((playbook) => {
              const Icon = iconMap[playbook.icon];
              return (
                <div
                  key={playbook.id}
                  className="glass-panel space-y-6 rounded-3xl border border-emerald-100 bg-white/85 p-8 shadow-[0_32px_65px_-42px_rgba(34,94,56,0.55)] backdrop-blur"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-emerald-950">
                        {isEnglish ? playbook.title.en : playbook.title.bn}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {isEnglish ? playbook.description.en : playbook.description.bn}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-900">
                      <Icon className="h-4 w-4" />
                      <span>{isEnglish ? "Design cues" : "ডিজাইন সংকেত"}</span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {playbook.prompts.map((prompt) => (
                      <div
                        key={prompt.title.en}
                        className="rounded-2xl border border-emerald-100/70 bg-white/70 p-5 shadow-sm"
                      >
                        <h5 className="text-base font-semibold text-emerald-950">
                          {isEnglish ? prompt.title.en : prompt.title.bn}
                        </h5>
                        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                          {isEnglish ? prompt.instructions.en : prompt.instructions.bn}
                        </p>
                        <div className="mt-4 flex items-start gap-2 text-xs font-semibold text-emerald-700">
                          <Lightbulb className="mt-0.5 h-4 w-4" />
                          <span>
                            {isEnglish ? prompt.psychology.en : prompt.psychology.bn}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEnglish ? "Submit bid" : "বিড জমা দিন"}
            </DialogTitle>
            <DialogDescription>
              {isEnglish
                ? activeListing
                  ? `Add your ${mode === "buy" ? "buy bid" : "sell ask"} for ${activeListing.title.en}.`
                  : "Add a bid to publish it to the exchange."
                : activeListing
                ? `${activeListing.title.bn} এর জন্য ${mode === "buy" ? "ক্রয় বিড" : "বিক্রয় মূল্য"} যোগ করুন।`
                : "এক্সচেঞ্জে প্রকাশ করতে একটি বিড যোগ করুন।"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border/40 bg-muted/40 p-4 text-sm">
              <p className="font-semibold text-foreground">
                {activeListing
                  ? isEnglish
                    ? activeListing.title.en
                    : activeListing.title.bn
                  : "—"}
              </p>
              {activeListing && (
                <p className="mt-2 text-muted-foreground">
                  {isEnglish
                    ? `Current highest bid: ${formatCurrency(activeListing.highestBid)}`
                    : `বর্তমান সর্বোচ্চ বিড: ${formatCurrency(activeListing.highestBid)}`}
                </p>
              )}
              {activeListingPricing && (
                <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-xs text-emerald-900">
                  <p className="font-semibold">
                    {isEnglish ? "Optimized guidance" : "অপ্টিমাইজড নির্দেশনা"}
                  </p>
                  <p className="mt-1">
                    {isEnglish
                      ? `Suggested bid ${formatCurrency(activeListingPricing.recommendedBidUsd)} · ${formatCurrency(activeListingPricing.recommendedBidEur, "EUR")}`
                      : `প্রস্তাবিত বিড ${formatCurrency(activeListingPricing.recommendedBidUsd)} · ${formatCurrency(activeListingPricing.recommendedBidEur, "EUR")}`}
                  </p>
                  <p className="mt-1 text-emerald-900/80">
                    {isEnglish
                      ? `Band ${formatCurrency(activeListingPricing.bidBandUsd[0])} – ${formatCurrency(activeListingPricing.bidBandUsd[1])}`
                      : `পরিসর ${formatCurrency(activeListingPricing.bidBandUsd[0])} – ${formatCurrency(activeListingPricing.bidBandUsd[1])}`}
                    <br />
                    <span className="text-[11px] text-emerald-900/70">
                      {formatCurrency(activeListingPricing.bidBandEur[0], "EUR")} –
                      {" "}
                      {formatCurrency(activeListingPricing.bidBandEur[1], "EUR")}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="bid-amount" className="text-sm font-medium text-foreground">
                {isEnglish ? "Bid amount (USD)" : "বিড পরিমাণ (USD)"}
              </label>
              <Input
                id="bid-amount"
                type="number"
                min={0}
                step="0.01"
                inputMode="decimal"
                value={bidAmount}
                onChange={(event) => setBidAmount(event.target.value)}
                placeholder={isEnglish ? "Enter amount" : "পরিমাণ লিখুন"}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 flex gap-3">
            <Button type="button" variant="ghost" onClick={() => handleDialogChange(false)}>
              {isEnglish ? "Cancel" : "বাতিল"}
            </Button>
            <Button type="button" onClick={handleConfirmBid}>
              {isEnglish ? "Confirm bid" : "বিড নিশ্চিত করুন"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BidExchange;
