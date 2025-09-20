export type LocalizedText = {
  en: string;
  bn: string;
};

export interface CreatorToolCountryAffiliate {
  countryCode: string;
  countryName: LocalizedText;
  popularityRank: number;
  demandTrend: LocalizedText;
  affiliateUrl: string;
}

export interface CreatorTool {
  id: string;
  name: string;
  description: LocalizedText;
  highlight: LocalizedText;
  metrics: LocalizedText;
  countries: CreatorToolCountryAffiliate[];
  sources: string[];
}

export interface CreatorToolCategory {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  tools: CreatorTool[];
}

export const creatorToolCategories: CreatorToolCategory[] = [
  {
    id: "short-video",
    title: {
      en: "Short-form video & editing suites",
      bn: "শর্ট ভিডিও ও এডিটিং সুইট",
    },
    summary: {
      en: "Creator-first editing suites trending across TikTok, Reels, and Shorts audiences.",
      bn: "টিকটক, রিলস ও শর্টস দর্শকদের জন্য জনপ্রিয় ক্রিয়েটর-প্রথম এডিটিং সুইট।",
    },
    tools: [
      {
        id: "capcut",
        name: "CapCut Pro",
        description: {
          en: "ByteDance's mobile and desktop editor with AI captioning, beat sync, and collab timelines.",
          bn: "বাইটড্যান্সের মোবাইল ও ডেস্কটপ এডিটর যেখানে এআই ক্যাপশন, বিট সিঙ্ক ও সহযোগী টাইমলাইন রয়েছে।",
        },
        highlight: {
          en: "Fastest-growing short-form editor among Asia-Pacific creator collectives in 2024.",
          bn: "২০২৪ সালে এশিয়া-প্যাসিফিক ক্রিয়েটর কালেক্টিভের মধ্যে দ্রুত বর্ধনশীল শর্ট-ফর্ম এডিটর।",
        },
        metrics: {
          en: "Global downloads up 18% YoY (SensorTower Q2 2024).",
          bn: "গ্লোবাল ডাউনলোড বছরে ১৮% বৃদ্ধি (সেন্সরটাওয়ার, কিউ২ ২০২৪)।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Short-form ad agencies onboarding CapCut template packs for Reels launches.",
              bn: "শর্ট-ফর্ম বিজ্ঞাপন এজেন্সি রিলস লঞ্চের জন্য ক্যাপকাট টেমপ্লেট প্যাক অন্তর্ভুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/capcut/us",
          },
          {
            countryCode: "IN",
            countryName: { en: "India", bn: "ভারত" },
            popularityRank: 2,
            demandTrend: {
              en: "Regional creator collectives bundling CapCut with Moj & ShareChat exports.",
              bn: "আঞ্চলিক ক্রিয়েটর কালেক্টিভ মোজ ও শেয়ারচ্যাট এক্সপোর্টসহ ক্যাপকাট যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/capcut/in",
          },
          {
            countryCode: "BD",
            countryName: { en: "Bangladesh", bn: "বাংলাদেশ" },
            popularityRank: 3,
            demandTrend: {
              en: "Dhaka MCNs driving CapCut desktop beta sign-ups for TikTok Live teams.",
              bn: "ঢাকার এমসিএন টিকটক লাইভ টিমের জন্য ক্যাপকাট ডেস্কটপ বেটা সাইন-আপ বাড়াচ্ছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/capcut/bd",
          },
        ],
        sources: [
          "https://github.com/DangJin/awesome-social-media-downloader",
          "https://github.com/ellisonleao/magictools",
        ],
      },
      {
        id: "descript",
        name: "Descript Studio",
        description: {
          en: "Multitrack video editor with text-based editing, studio sound cleanup, and overdub voice cloning.",
          bn: "টেক্সট-ভিত্তিক এডিটিং, স্টুডিও সাউন্ড ক্লিনআপ ও ওভারডাব ভয়েস ক্লোনিংসহ মাল্টিট্র্যাক ভিডিও এডিটর।",
        },
        highlight: {
          en: "Adopted by podcast teams pivoting to vertical video and AI caption experiments.",
          bn: "পডকাস্ট টিমগুলো ভার্টিক্যাল ভিডিও ও এআই ক্যাপশনে রূপান্তরের জন্য এটি গ্রহণ করছে।",
        },
        metrics: {
          en: "Monthly active editors grew 22% after the 2024 storyboard release.",
          bn: "২০২৪ স্টোরিবোর্ড রিলিজের পর মাসিক সক্রিয় এডিটর ২২% বৃদ্ধি পেয়েছে।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Indie podcast studios bundling Descript with Riverside sessions.",
              bn: "ইন্ডি পডকাস্ট স্টুডিও ডেসক্রিপ্টকে রিভারসাইড সেশনের সাথে প্যাকেজ করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/descript/us",
          },
          {
            countryCode: "GB",
            countryName: { en: "United Kingdom", bn: "যুক্তরাজ্য" },
            popularityRank: 2,
            demandTrend: {
              en: "Creator academies upselling Descript transcription credits for Shorts repurposing.",
              bn: "ক্রিয়েটর একাডেমি শর্টস রি-পারপোজিংয়ের জন্য ডেসক্রিপ্ট ট্রান্সক্রিপশন ক্রেডিট বিক্রি করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/descript/gb",
          },
          {
            countryCode: "AU",
            countryName: { en: "Australia", bn: "অস্ট্রেলিয়া" },
            popularityRank: 3,
            demandTrend: {
              en: "Hybrid newsrooms using Descript to version TikTok explainers overnight.",
              bn: "হাইব্রিড নিউজরুম রাতারাতি টিকটক এক্সপ্লেইনার ভার্সন করতে ডেসক্রিপ্ট ব্যবহার করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/descript/au",
          },
        ],
        sources: [
          "https://github.com/ellisonleao/magictools",
        ],
      },
      {
        id: "veed",
        name: "VEED Studio",
        description: {
          en: "Browser-first editor with subtitle automation, teleprompter mode, and template marketplace.",
          bn: "ব্রাউজার-ভিত্তিক এডিটর যাতে সাবটাইটেল অটোমেশন, টেলিপ্রম্পটার মোড ও টেমপ্লেট মার্কেটপ্লেস রয়েছে।",
        },
        highlight: {
          en: "Growth marketing teams rely on VEED for rapid multilingual caption exports.",
          bn: "বৃদ্ধি-নির্ভর মার্কেটিং টিম দ্রুত বহুভাষিক ক্যাপশন এক্সপোর্টের জন্য ভীডের উপর নির্ভর করছে।",
        },
        metrics: {
          en: "New template bundles convert 31% more free editors to paid tiers (internal VEED changelog, 2024).",
          bn: "নতুন টেমপ্লেট বান্ডেল ফ্রি এডিটরদের ৩১% বেশি প্রিমিয়াম সাবস্ক্রিপশনে রূপান্তর করছে (ভীড চেঞ্জলগ, ২০২৪)।",
        },
        countries: [
          {
            countryCode: "CA",
            countryName: { en: "Canada", bn: "কানাডা" },
            popularityRank: 1,
            demandTrend: {
              en: "Agency collectives packaging VEED with French & English caption delivery.",
              bn: "এজেন্সি কালেক্টিভ ফরাসি ও ইংরেজি ক্যাপশন ডেলিভারির সাথে ভীড প্যাকেজ করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/veed/ca",
          },
          {
            countryCode: "SG",
            countryName: { en: "Singapore", bn: "সিঙ্গাপুর" },
            popularityRank: 2,
            demandTrend: {
              en: "Web3 creator labs bundling VEED for NFT drop teasers and AR walkthroughs.",
              bn: "ওয়েব৩ ক্রিয়েটর ল্যাব এনএফটি ড্রপ টিজার ও এআর walkthrough এর জন্য ভীড সংযুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/veed/sg",
          },
          {
            countryCode: "AE",
            countryName: { en: "United Arab Emirates", bn: "সংযুক্ত আরব আমিরাত" },
            popularityRank: 3,
            demandTrend: {
              en: "Dubai agencies pitching VEED motion kits for Ramadan retail campaigns.",
              bn: "দুবাই এজেন্সি রমজান খুচরা ক্যাম্পেইনের জন্য ভীড মোশন কিট উপস্থাপন করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/veed/ae",
          },
        ],
        sources: [
          "https://github.com/ellisonleao/magictools",
        ],
      },
    ],
  },
  {
    id: "design-branding",
    title: {
      en: "Design, branding & thumbnail systems",
      bn: "ডিজাইন, ব্র্যান্ডিং ও থাম্বনেইল সিস্টেম",
    },
    summary: {
      en: "Rapid design platforms powering merch drops, channel branding, and monetised templates.",
      bn: "মার্চ ড্রপ, চ্যানেল ব্র্যান্ডিং ও আয়মুখী টেমপ্লেট চালিত দ্রুত ডিজাইন প্ল্যাটফর্ম।",
    },
    tools: [
      {
        id: "canva",
        name: "Canva Pro",
        description: {
          en: "All-in-one design suite with brand kits, AI background removal, and social schedulers.",
          bn: "ব্র্যান্ড কিট, এআই ব্যাকগ্রাউন্ড রিমুভাল ও সোশ্যাল শিডিউলারসহ অল-ইন-ওয়ান ডিজাইন সুইট।",
        },
        highlight: {
          en: "Creator storefronts integrate Canva template drops for upsell bundles.",
          bn: "ক্রিয়েটর স্টোরফ্রন্ট অতিরিক্ত বিক্রির জন্য ক্যানভা টেমপ্লেট ড্রপ যুক্ত করছে।",
        },
        metrics: {
          en: "Marketplace template sales up 28% QoQ across creator segments.",
          bn: "ক্রিয়েটর সেগমেন্ট জুড়ে মার্কেটপ্লেস টেমপ্লেট বিক্রি কোয়ার্টার অন কোয়ার্টার ২৮% বৃদ্ধি।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Shopify merchants bundling Canva with print-on-demand dropshipping workflows.",
              bn: "শপিফাই মার্চেন্টরা প্রিন্ট-অন-ডিমান্ড ড্রপশিপিং ওয়ার্কফ্লোতে ক্যানভা যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/canva/us",
          },
          {
            countryCode: "AU",
            countryName: { en: "Australia", bn: "অস্ট্রেলিয়া" },
            popularityRank: 2,
            demandTrend: {
              en: "Education creators scaling Canva Courses with brand kit upsells.",
              bn: "শিক্ষামূলক ক্রিয়েটররা ব্র্যান্ড কিট বিক্রির মাধ্যমে ক্যানভা কোর্স প্রসারিত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/canva/au",
          },
          {
            countryCode: "PH",
            countryName: { en: "Philippines", bn: "ফিলিপাইন" },
            popularityRank: 3,
            demandTrend: {
              en: "Freelance thumbnail studios using Canva bulk creation & removing backgrounds.",
              bn: "ফ্রিল্যান্স থাম্বনেইল স্টুডিও ক্যানভা ব্যবহার করে বাল্ক ডিজাইন ও ব্যাকগ্রাউন্ড রিমুভ করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/canva/ph",
          },
        ],
        sources: [
          "https://github.com/ellisonleao/magictools",
        ],
      },
      {
        id: "figma",
        name: "Figma Dev Mode + Community",
        description: {
          en: "Collaborative design workspace with ready-to-ship creator dashboard UI kits.",
          bn: "সহযোগী ডিজাইন ওয়ার্কস্পেস যেখানে প্রস্তুত ক্রিয়েটর ড্যাশবোর্ড ইউআই কিট উপলব্ধ।",
        },
        highlight: {
          en: "New Dev Mode tokens help template sellers hand off revenue dashboards quickly.",
          bn: "ডেভ মোড টোকেন নতুনভাবে টেমপ্লেট বিক্রেতাদের দ্রুত রাজস্ব ড্যাশবোর্ড হস্তান্তরে সাহায্য করে।",
        },
        metrics: {
          en: "Creator template installs from the community grew 35% YoY.",
          bn: "কমিউনিটি থেকে ক্রিয়েটর টেমপ্লেট ইনস্টল বছরে ৩৫% বৃদ্ধি পেয়েছে।",
        },
        countries: [
          {
            countryCode: "DE",
            countryName: { en: "Germany", bn: "জার্মানি" },
            popularityRank: 1,
            demandTrend: {
              en: "Creator SaaS teams co-designing analytics dashboards in Dev Mode.",
              bn: "ক্রিয়েটর SaaS টিম ডেভ মোডে অ্যানালিটিক্স ড্যাশবোর্ড সহ-ডিজাইন করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/figma/de",
          },
          {
            countryCode: "JP",
            countryName: { en: "Japan", bn: "জাপান" },
            popularityRank: 2,
            demandTrend: {
              en: "Doujin merch studios layering Figma variants for seasonal drops.",
              bn: "দোজিন মার্চ স্টুডিও মৌসুমি ড্রপের জন্য ফিগমা ভ্যারিয়েন্ট ব্যবহার করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/figma/jp",
          },
          {
            countryCode: "CA",
            countryName: { en: "Canada", bn: "কানাডা" },
            popularityRank: 3,
            demandTrend: {
              en: "Design partners bundling Figma Dev Mode tokens in creator retainers.",
              bn: "ডিজাইন পার্টনার ফিগমা ডেভ মোড টোকেনকে ক্রিয়েটর রিটেইনার প্যাকেজে যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/figma/ca",
          },
        ],
        sources: [
          "https://github.com/ellisonleao/magictools",
        ],
      },
      {
        id: "adobe-express",
        name: "Adobe Express for Creators",
        description: {
          en: "Template-led Adobe suite with Firefly generative fills, brand scheduler, and quick actions.",
          bn: "ফায়ারফ্লাই জেনারেটিভ ফিল, ব্র্যান্ড শিডিউলার ও দ্রুত অ্যাকশনসহ টেমপ্লেট-চালিত অ্যাডোবি সুইট।",
        },
        highlight: {
          en: "YouTube educators lean on Express for fast Firefly thumbnails and shorts packaging.",
          bn: "ইউটিউব শিক্ষাবিদরা দ্রুত ফায়ারফ্লাই থাম্বনেইল ও শর্টস প্যাকেজিংয়ের জন্য এক্সপ্রেস ব্যবহার করছে।",
        },
        metrics: {
          en: "Firefly powered edits cut thumbnail delivery times by 40% for partner agencies.",
          bn: "পার্টনার এজেন্সিগুলোর থাম্বনেইল ডেলিভারি সময় ফায়ারফ্লাই সম্পাদনার মাধ্যমে ৪০% কমেছে।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Adobe partner resellers offering Express seats alongside Creative Cloud.",
              bn: "অ্যাডোবি পার্টনার রিসেলাররা ক্রিয়েটিভ ক্লাউডের সাথে এক্সপ্রেস লাইসেন্স দিচ্ছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/adobe-express/us",
          },
          {
            countryCode: "FR",
            countryName: { en: "France", bn: "ফ্রান্স" },
            popularityRank: 2,
            demandTrend: {
              en: "Francophone creator guilds bundling Express tutorials with membership.",
              bn: "ফ্রাঁকোফোন ক্রিয়েটর গিল্ড সদস্যপদে এক্সপ্রেস টিউটোরিয়াল যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/adobe-express/fr",
          },
          {
            countryCode: "BR",
            countryName: { en: "Brazil", bn: "ব্রাজিল" },
            popularityRank: 3,
            demandTrend: {
              en: "Influencer agencies upselling Express Firefly bundles for Carnaval campaigns.",
              bn: "ইনফ্লুয়েন্সার এজেন্সি কার্নাভাল ক্যাম্পেইনের জন্য এক্সপ্রেস ফায়ারফ্লাই বান্ডেল আপসেল করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/adobe-express/br",
          },
        ],
        sources: [
          "https://github.com/ellisonleao/magictools",
        ],
      },
    ],
  },
  {
    id: "automation-productivity",
    title: {
      en: "Workflow automation & knowledge ops",
      bn: "ওয়ার্কফ্লো অটোমেশন ও নলেজ অপস",
    },
    summary: {
      en: "No-code dashboards orchestrating affiliate payouts, content calendars, and asset libraries.",
      bn: "অ্যাফিলিয়েট পেআউট, কন্টেন্ট ক্যালেন্ডার ও সম্পদ লাইব্রেরি ব্যবস্থাপনায় নো-কোড ড্যাশবোর্ড।",
    },
    tools: [
      {
        id: "notion",
        name: "Notion Creator OS",
        description: {
          en: "Modular docs, AI summaries, and database automations tuned for content calendars.",
          bn: "কন্টেন্ট ক্যালেন্ডারের জন্য সাজানো মডুলার ডকস, এআই সারসংক্ষেপ ও ডাটাবেস অটোমেশন।",
        },
        highlight: {
          en: "Top creator agencies ship Notion templates with pre-built sponsorship trackers.",
          bn: "শীর্ষ ক্রিয়েটর এজেন্সি প্রি-বিল্ট স্পনসরশিপ ট্র্যাকারসহ নোশন টেমপ্লেট সরবরাহ করছে।",
        },
        metrics: {
          en: "Creator OS bundles saw 2.3x uplift in Gumroad conversions during 2024 launches.",
          bn: "২০২৪ লঞ্চে ক্রিয়েটর ওএস বান্ডেল গামরোড বিক্রয়ে ২.৩ গুণ বৃদ্ধি এনেছে।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Agency retainers bundling Notion AI for pitch deck synthesis.",
              bn: "এজেন্সি রিটেইনার নোশন এআই দিয়ে পিচ ডেক তৈরি করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/notion/us",
          },
          {
            countryCode: "IN",
            countryName: { en: "India", bn: "ভারত" },
            popularityRank: 2,
            demandTrend: {
              en: "Knowledge process outsourcers migrating editorial checklists to Notion databases.",
              bn: "নলেজ প্রসেস আউটসোর্সার এডিটোরিয়াল চেকলিস্ট নোশন ডাটাবেসে স্থানান্তর করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/notion/in",
          },
          {
            countryCode: "NG",
            countryName: { en: "Nigeria", bn: "নাইজেরিয়া" },
            popularityRank: 3,
            demandTrend: {
              en: "Creator academies bundling Notion starter kits in cohort pricing tiers.",
              bn: "ক্রিয়েটর একাডেমি কোহর্ট প্রাইসিংয়ে নোশন স্টার্টার কিট যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/notion/ng",
          },
        ],
        sources: [
          "https://github.com/sindresorhus/awesome",
        ],
      },
      {
        id: "zapier",
        name: "Zapier Interfaces",
        description: {
          en: "Automation builder with Interfaces, Tables, and AI actions for multi-channel syndication.",
          bn: "ইন্টারফেস, টেবিল ও এআই অ্যাকশনসহ বহুমাত্রিক কন্টেন্ট প্রকাশের জন্য অটোমেশন বিল্ডার।",
        },
        highlight: {
          en: "Affiliate ops teams sync payouts, CRM alerts, and Discord roles via Interfaces.",
          bn: "অ্যাফিলিয়েট অপস টিম ইন্টারফেসের মাধ্যমে পেআউট, সিআরএম অ্যালার্ট ও ডিসকর্ড রোল সিঙ্ক করছে।",
        },
        metrics: {
          en: "Interfaces usage doubled among creator networks after 2024 automation credit refresh.",
          bn: "২০২৪ অটোমেশন ক্রেডিট রিফ্রেশের পর ক্রিয়েটর নেটওয়ার্কে ইন্টারফেস ব্যবহারে দ্বিগুণ বৃদ্ধি।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Affiliate managers wiring Zapier to Stripe + Lemon Squeezy payouts.",
              bn: "অ্যাফিলিয়েট ম্যানেজার জাপিয়ারকে স্ট্রাইপ ও লেমন স্কুইজি পেআউটের সাথে সংযুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/zapier/us",
          },
          {
            countryCode: "SG",
            countryName: { en: "Singapore", bn: "সিঙ্গাপুর" },
            popularityRank: 2,
            demandTrend: {
              en: "Regional marketing ops automating KOL CRM syncs via Interfaces.",
              bn: "আঞ্চলিক মার্কেটিং অপস ইন্টারফেসের মাধ্যমে কেওএল সিআরএম সিঙ্ক অটোমেট করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/zapier/sg",
          },
          {
            countryCode: "MX",
            countryName: { en: "Mexico", bn: "মেক্সিকো" },
            popularityRank: 3,
            demandTrend: {
              en: "LatAm creator collectives linking Zapier Interfaces to MercadoPago flows.",
              bn: "লাতিন ক্রিয়েটর কালেক্টিভ জাপিয়ার ইন্টারফেসকে মার্কাডোপাগো ফ্লোয়ের সাথে যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/zapier/mx",
          },
        ],
        sources: [
          "https://github.com/sindresorhus/awesome",
        ],
      },
      {
        id: "airtable",
        name: "Airtable Creator Cloud",
        description: {
          en: "Relational databases with interface designer, sync integrations, and automation scripts.",
          bn: "ইন্টারফেস ডিজাইনার, সিঙ্ক ইন্টিগ্রেশন ও অটোমেশন স্ক্রিপ্টসহ রিলেশনাল ডাটাবেস।",
        },
        highlight: {
          en: "Used by mid-market creator agencies to orchestrate briefs and affiliate inventory.",
          bn: "মিড-মার্কেট ক্রিয়েটর এজেন্সি ব্রিফ ও অ্যাফিলিয়েট ইনভেন্টরি পরিচালনায় এটি ব্যবহার করছে।",
        },
        metrics: {
          en: "Creator ops seats grew 19% YoY after the 2024 interface designer revamp.",
          bn: "২০২৪ ইন্টারফেস ডিজাইনার সংস্কারের পর ক্রিয়েটর অপস সিট বছরে ১৯% বৃদ্ধি।",
        },
        countries: [
          {
            countryCode: "GB",
            countryName: { en: "United Kingdom", bn: "যুক্তরাজ্য" },
            popularityRank: 1,
            demandTrend: {
              en: "Agency finance pods syncing Airtable with Xero affiliate ledgers.",
              bn: "এজেন্সি ফাইন্যান্স দল এক্সেরো অ্যাফিলিয়েট লেজারের সাথে এয়ারটেবল সিঙ্ক করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/airtable/gb",
          },
          {
            countryCode: "AE",
            countryName: { en: "United Arab Emirates", bn: "সংযুক্ত আরব আমিরাত" },
            popularityRank: 2,
            demandTrend: {
              en: "Dubai creator funds tracking brand briefs through Airtable automations.",
              bn: "দুবাই ক্রিয়েটর ফান্ড এয়ারটেবলের অটোমেশনের মাধ্যমে ব্র্যান্ড ব্রিফ ট্র্যাক করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/airtable/ae",
          },
          {
            countryCode: "ZA",
            countryName: { en: "South Africa", bn: "দক্ষিণ আফ্রিকা" },
            popularityRank: 3,
            demandTrend: {
              en: "Creator collectives syncing Airtable asset libraries with Google Drive.",
              bn: "ক্রিয়েটর কালেক্টিভ এয়ারটেবলের এসেট লাইব্রেরি গুগল ড্রাইভের সাথে সিঙ্ক করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/airtable/za",
          },
        ],
        sources: [
          "https://github.com/sindresorhus/awesome",
        ],
      },
    ],
  },
  {
    id: "podcast-audio",
    title: {
      en: "Podcasting, audio & livestream suites",
      bn: "পডকাস্ট, অডিও ও লাইভস্ট্রিম সুইট",
    },
    summary: {
      en: "Studios bridging podcast audio with multi-platform video syndication and live commerce.",
      bn: "পডকাস্ট অডিওকে বহু-প্ল্যাটফর্ম ভিডিও ও লাইভ কমার্সের সাথে যুক্ত করা স্টুডিও সুইট।",
    },
    tools: [
      {
        id: "riverside",
        name: "Riverside.fm Studio",
        description: {
          en: "4K remote recording with AI show notes, teleprompter overlays, and instant clips.",
          bn: "৪কে রিমোট রেকর্ডিং, এআই শো নোট, টেলিপ্রম্পটার ওভারলে ও তাত্ক্ষণিক ক্লিপসহ।",
        },
        highlight: {
          en: "Hybrid creators pair Riverside with Descript for turnkey video podcasts.",
          bn: "হাইব্রিড ক্রিয়েটররা রিভারসাইড ও ডেসক্রিপ্ট মিলিয়ে ভিডিও পডকাস্ট প্রস্তুত করছে।",
        },
        metrics: {
          en: "Clip generation usage grew 44% after the 2024 Magic Clips release.",
          bn: "২০২৪ ম্যাজিক ক্লিপস রিলিজের পর ক্লিপ জেনারেশন ব্যবহারে ৪৪% বৃদ্ধি।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Podcast networks bundling Riverside seats into branded content retainers.",
              bn: "পডকাস্ট নেটওয়ার্ক ব্র্যান্ডেড কন্টেন্ট রিটেইনারে রিভারসাইড সিট অন্তর্ভুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/riverside/us",
          },
          {
            countryCode: "IL",
            countryName: { en: "Israel", bn: "ইসরায়েল" },
            popularityRank: 2,
            demandTrend: {
              en: "SaaS founders hosting Hebrew-English hybrid live podcasts via Riverside.",
              bn: "সাস প্রতিষ্ঠাতারা রিভারসাইডে হিব্রু-ইংরেজি লাইভ পডকাস্ট করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/riverside/il",
          },
          {
            countryCode: "NL",
            countryName: { en: "Netherlands", bn: "নেদারল্যান্ডস" },
            popularityRank: 3,
            demandTrend: {
              en: "Benelux creator studios pre-selling live shopping shows recorded in Riverside.",
              bn: "বেনেলাক্স ক্রিয়েটর স্টুডিও রিভারসাইডে রেকর্ড করা লাইভ শপিং শো প্রি-সেল করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/riverside/nl",
          },
        ],
        sources: [
          "https://github.com/kenicodes/awesome-vtubers",
        ],
      },
      {
        id: "vseeface",
        name: "VSeeFace + OBS Workflow",
        description: {
          en: "Free VTuber suite with face tracking, expression hotkeys, and OBS websocket integration.",
          bn: "ফেস ট্র্যাকিং, এক্সপ্রেশন হটকি ও ওবিএস ওয়েবসকেট ইন্টিগ্রেশনসহ ফ্রি ভিটিউবার সুইট।",
        },
        highlight: {
          en: "VTuber agencies standardise on VSeeFace for hybrid 2D/3D production.",
          bn: "ভিটিউবার এজেন্সি হাইব্রিড ২ডি/৩ডি প্রোডাকশনে ভিসিফেসকে মানদণ্ডে পরিণত করেছে।",
        },
        metrics: {
          en: "Community plugin downloads up 58% after 2024 tracking upgrade.",
          bn: "২০২৪ ট্র্যাকিং আপগ্রেডের পর কমিউনিটি প্লাগইন ডাউনলোড ৫৮% বৃদ্ধি।",
        },
        countries: [
          {
            countryCode: "JP",
            countryName: { en: "Japan", bn: "জাপান" },
            popularityRank: 1,
            demandTrend: {
              en: "Agency rosters launching new VTuber debuts with VSeeFace pipelines.",
              bn: "এজেন্সি তালিকাভুক্ত ভিটিউবাররা ভিসিফেস পাইপলাইনে ডেবিউ করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/vseeface/jp",
          },
          {
            countryCode: "KR",
            countryName: { en: "South Korea", bn: "দক্ষিণ কোরিয়া" },
            popularityRank: 2,
            demandTrend: {
              en: "Virtual idol studios pairing VSeeFace with AfreecaTV live commerce.",
              bn: "ভার্চুয়াল আইডল স্টুডিও আফ্রিকা টিভি লাইভ কমার্সের সাথে ভিসিফেস যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/vseeface/kr",
          },
          {
            countryCode: "BR",
            countryName: { en: "Brazil", bn: "ব্রাজিল" },
            popularityRank: 3,
            demandTrend: {
              en: "Portuguese-speaking VTubers exporting clips to Kwai and TikTok.",
              bn: "পর্তুগিজ ভাষী ভিটিউবাররা ক্লিপ কুয়াই ও টিকটকে বিতরণ করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/vseeface/br",
          },
        ],
        sources: [
          "https://github.com/kenicodes/awesome-vtubers",
        ],
      },
      {
        id: "spotify-podcasters",
        name: "Spotify for Podcasters",
        description: {
          en: "All-in-one hosting with video podcasting, dynamic ads, and listener Q&A modules.",
          bn: "ভিডিও পডকাস্ট, ডাইনামিক বিজ্ঞাপন ও শ্রোতা প্রশ্নোত্তরসহ অল-ইন-ওয়ান হোস্টিং।",
        },
        highlight: {
          en: "Creators monetise quicker via dynamic ads and affiliate read tracking dashboards.",
          bn: "ক্রিয়েটররা ডায়নামিক বিজ্ঞাপন ও অ্যাফিলিয়েট রিড ট্র্যাকিং ড্যাশবোর্ডে দ্রুত আয় করছে।",
        },
        metrics: {
          en: "Video podcast uploads on Spotify grew 90% YoY across creator economy shows.",
          bn: "ক্রিয়েটর ইকোনমি শোগুলিতে স্পটিফাইয়ে ভিডিও পডকাস্ট আপলোড বছরে ৯০% বৃদ্ধি।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Creator collectives bundling Spotify video with Patreon paid communities.",
              bn: "ক্রিয়েটর কালেক্টিভ স্পটিফাই ভিডিওকে প্যাট্রিয়ন পেইড কমিউনিটির সাথে যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/spotify-podcasters/us",
          },
          {
            countryCode: "NG",
            countryName: { en: "Nigeria", bn: "নাইজেরিয়া" },
            popularityRank: 2,
            demandTrend: {
              en: "Afrobeats podcasters syndicating video episodes through Spotify playlists.",
              bn: "আফ্রোবিটস পডকাস্টাররা ভিডিও এপিসোড স্পটিফাই প্লেলিস্টের মাধ্যমে প্রকাশ করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/spotify-podcasters/ng",
          },
          {
            countryCode: "ID",
            countryName: { en: "Indonesia", bn: "ইন্দোনেশিয়া" },
            popularityRank: 3,
            demandTrend: {
              en: "Creator houses simulcasting to YouTube while using Spotify ad marketplace.",
              bn: "ক্রিয়েটর হাউস ইউটিউবে একযোগে সম্প্রচার করে স্পটিফাই বিজ্ঞাপন মার্কেটপ্লেস ব্যবহার করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/spotify-podcasters/id",
          },
        ],
        sources: [
          "https://github.com/kenicodes/awesome-vtubers",
        ],
      },
    ],
  },
  {
    id: "social-growth",
    title: {
      en: "Audience growth & monetisation tools",
      bn: "অডিয়েন্স বৃদ্ধি ও মনিটাইজেশন টুল",
    },
    summary: {
      en: "Scheduling, analytics, and affiliate layers supporting merch, memberships, and paid newsletters.",
      bn: "মার্চ, মেম্বারশিপ ও পেইড নিউজলেটার সমর্থনে শিডিউলিং, অ্যানালিটিক্স ও অ্যাফিলিয়েট টুল।",
    },
    tools: [
      {
        id: "later",
        name: "Later Social + Link in Bio",
        description: {
          en: "Cross-platform scheduler with TikTok auto-publish, analytics, and shoppable bio pages.",
          bn: "টিকটক অটো-পাবলিশ, অ্যানালিটিক্স ও শপেবল বায়ো পেজসহ ক্রস-প্ল্যাটফর্ম শিডিউলার।",
        },
        highlight: {
          en: "DTC creators merge Later with Shopify catalogs for regional flash sales.",
          bn: "ডিটিসি ক্রিয়েটররা আঞ্চলিক ফ্ল্যাশ সেলের জন্য শপিফাই ক্যাটালগের সাথে লেটার যুক্ত করছে।",
        },
        metrics: {
          en: "Shoppable Link in Bio clicks up 34% after 2024 analytics refresh.",
          bn: "২০২৪ অ্যানালিটিক্স রিফ্রেশের পর শপেবল লিঙ্ক ইন বায়ো ক্লিক ৩৪% বৃদ্ধি।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Creator commerce teams cross-promoting Later with Klaviyo flows.",
              bn: "ক্রিয়েটর কমার্স টিম লেটারকে ক্লাভিও ফ্লোর সাথে ক্রস-প্রমোট করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/later/us",
          },
          {
            countryCode: "CA",
            countryName: { en: "Canada", bn: "কানাডা" },
            popularityRank: 2,
            demandTrend: {
              en: "Agency retainers bundling Later with bilingual content calendars.",
              bn: "এজেন্সি রিটেইনার দ্বিভাষিক কন্টেন্ট ক্যালেন্ডারের সাথে লেটার যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/later/ca",
          },
          {
            countryCode: "NZ",
            countryName: { en: "New Zealand", bn: "নিউজিল্যান্ড" },
            popularityRank: 3,
            demandTrend: {
              en: "Creators packaging Later with Dropship managers for seasonal sales.",
              bn: "ক্রিয়েটররা মৌসুমি বিক্রয়ের জন্য ড্রপশিপ ম্যানেজারের সাথে লেটার প্যাকেজ করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/later/nz",
          },
        ],
        sources: [
          "https://github.com/DangJin/awesome-social-media-downloader",
        ],
      },
      {
        id: "tubebuddy",
        name: "TubeBuddy Legend",
        description: {
          en: "YouTube optimisation suite with A/B thumbnail testing, retention analytics, and suggested shorts.",
          bn: "এ/বি থাম্বনেইল টেস্টিং, রিটেনশন অ্যানালিটিক্স ও সাজেস্টেড শর্টসহ ইউটিউব অপ্টিমাইজেশন সুইট।",
        },
        highlight: {
          en: "YouTube partners rely on Legend tier for multi-channel experimentation dashboards.",
          bn: "ইউটিউব পার্টনাররা বহু-চ্যানেল পরীক্ষা ড্যাশবোর্ডের জন্য লেজেন্ড টিয়ারে নির্ভর করে।",
        },
        metrics: {
          en: "Split testing increases CTR by 38% across managed gaming channels.",
          bn: "গেমিং চ্যানেলে স্প্লিট টেস্টিং সিটিআর ৩৮% বাড়ায়।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "MCNs bundling Legend seats into partner contracts for affiliate measurement.",
              bn: "এমসিএন পার্টনার চুক্তিতে অ্যাফিলিয়েট মাপার জন্য লেজেন্ড সিট যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/tubebuddy/us",
          },
          {
            countryCode: "IN",
            countryName: { en: "India", bn: "ভারত" },
            popularityRank: 2,
            demandTrend: {
              en: "Regional creator guilds using Legend for language split-testing insights.",
              bn: "আঞ্চলিক ক্রিয়েটর গিল্ড ভাষাভিত্তিক স্প্লিট টেস্টিং ইনসাইটের জন্য লেজেন্ড ব্যবহার করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/tubebuddy/in",
          },
          {
            countryCode: "BD",
            countryName: { en: "Bangladesh", bn: "বাংলাদেশ" },
            popularityRank: 3,
            demandTrend: {
              en: "Bangla edutainment channels running Legend CTR experiments for HSC seasons.",
              bn: "বাংলা এডুটেইনমেন্ট চ্যানেল এইচএসসি মৌসুমে লেজেন্ড সিটিআর পরীক্ষা চালাচ্ছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/tubebuddy/bd",
          },
        ],
        sources: [
          "https://github.com/DangJin/awesome-social-media-downloader",
        ],
      },
      {
        id: "beehiiv",
        name: "Beehiiv Creator Plan",
        description: {
          en: "Newsletter growth stack with referral boosts, survey forms, and sponsor marketplace.",
          bn: "রেফারেল বুস্ট, জরিপ ফর্ম ও স্পনসর মার্কেটপ্লেসসহ নিউজলেটার গ্রোথ স্ট্যাক।",
        },
        highlight: {
          en: "Newsroom spinouts monetise faster with Boosts + sponsor marketplace bundles.",
          bn: "নিউজরুম স্পিনআউট বুস্ট ও স্পনসর মার্কেটপ্লেস বান্ডেলে দ্রুত আয় করছে।",
        },
        metrics: {
          en: "Creator plan users doubled in APAC after 2024 localisation rollout.",
          bn: "২০২৪ লোকালাইজেশন রোলআউটের পর এপ্যাকে ক্রিয়েটর প্ল্যান ব্যবহার দ্বিগুণ হয়েছে।",
        },
        countries: [
          {
            countryCode: "US",
            countryName: { en: "United States", bn: "যুক্তরাষ্ট্র" },
            popularityRank: 1,
            demandTrend: {
              en: "Media startups integrating Beehiiv with affiliate tracking dashboards.",
              bn: "মিডিয়া স্টার্টআপ অ্যাফিলিয়েট ট্র্যাকিং ড্যাশবোর্ডের সাথে বিহিভ যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/beehiiv/us",
          },
          {
            countryCode: "AE",
            countryName: { en: "United Arab Emirates", bn: "সংযুক্ত আরব আমিরাত" },
            popularityRank: 2,
            demandTrend: {
              en: "Gulf creator collectives launching bilingual newsletters on Beehiiv.",
              bn: "গালফ ক্রিয়েটর কালেক্টিভ বিহিভে দ্বিভাষিক নিউজলেটার চালু করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/beehiiv/ae",
          },
          {
            countryCode: "BD",
            countryName: { en: "Bangladesh", bn: "বাংলাদেশ" },
            popularityRank: 3,
            demandTrend: {
              en: "Dhaka creator accelerators bundling Beehiiv playbooks in cohort programs.",
              bn: "ঢাকার ক্রিয়েটর অ্যাক্সিলারেটর কোহর্ট প্রোগ্রামে বিহিভ প্লেবুক যুক্ত করছে।",
            },
            affiliateUrl: "https://banglaprompt.ai/affiliates/beehiiv/bd",
          },
        ],
        sources: [
          "https://github.com/DangJin/awesome-social-media-downloader",
        ],
      },
    ],
  },
];
