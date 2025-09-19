const footerLinks = [
  {
    headingEn: "Product",
    headingBn: "প্রোডাক্ট",
    links: [
      { labelEn: "Marketplace", labelBn: "মার্কেটপ্লেস", href: "#marketplace" },
      { labelEn: "Creator Hub", labelBn: "ক্রিয়েটর হাব", href: "#creators" },
      { labelEn: "Pricing", labelBn: "প্রাইসিং", href: "#pricing" },
    ],
  },
  {
    headingEn: "Solutions",
    headingBn: "সমাধান",
    links: [
      { labelEn: "Enterprise", labelBn: "এন্টারপ্রাইজ", href: "#enterprise" },
      { labelEn: "Compliance", labelBn: "কমপ্লায়েন্স", href: "#enterprise" },
      { labelEn: "Insights", labelBn: "ইনসাইটস", href: "#insights" },
    ],
  },
  {
    headingEn: "Company",
    headingBn: "কোম্পানি",
    links: [
      { labelEn: "Support", labelBn: "সাপোর্ট", href: "#support" },
      { labelEn: "Community", labelBn: "কমিউনিটি", href: "/community/prompts" },
      { labelEn: "Security", labelBn: "সিকিউরিটি", href: "#enterprise" },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0C1115] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gradient-aurora)] text-white">
                <span className="text-lg font-semibold">BP</span>
              </div>
              <div>
                <p className="text-base font-semibold">BanglaPrompt.ai</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  Bangladesh-born • World-ready
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70 md:text-base">
              A global AI prompt marketplace inspired by Walt Disney’s storytelling magic and Steve Jobs’ relentless clarity. Built in Bangladesh for the world, with Fortune 500-grade trust.
            </p>
            <p className="text-sm leading-relaxed text-white/70 md:text-base">
              ওয়াল্ট ডিজনির গল্পের জাদু ও স্টিভ জবসের নিখুঁততা নিয়ে তৈরি এই গ্লোবাল এআই প্রম্পট মার্কেটপ্লেস—বাংলাদেশে নির্মিত, বিশ্বব্যাপী আস্থার সাথে।
            </p>
          </div>

          <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80 backdrop-blur">
            <p className="font-semibold uppercase tracking-[0.3em] text-white/60">Stay ahead</p>
            <p className="text-sm text-white/80">
              Subscribe for bilingual insights on the 2025 creator economy, localisation strategy, and responsible AI practices.
            </p>
            <p className="text-sm text-white/70">
              দ্বিভাষিক ইনসাইট পেতে সাবস্ক্রাইব করুন—২০২৫ ক্রিয়েটর ইকোনমি, লোকালাইজেশন কৌশল ও রেসপনসিবল এআই সম্পর্কে।
            </p>
            <form className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Work email / কর্মস্থলের ইমেইল"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/60 focus:border-white focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-[var(--gradient-aurora)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
              >
                Subscribe • সাবস্ক্রাইব
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {footerLinks.map((group) => (
            <div key={group.headingEn}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                {group.headingEn}
              </p>
              <p className="text-xs text-white/60">{group.headingBn}</p>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {group.links.map((link) => (
                  <li key={link.labelEn}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.labelEn}
                      <span className="block text-xs text-white/60">{link.labelBn}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Compliance</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>GDPR • GDPR প্রস্তুত</li>
              <li>ISO 27001 • ISO 27001</li>
              <li>SOC 2 • SOC 2</li>
              <li>Bangladesh Data Protection • বাংলাদেশ ডেটা প্রোটেকশন</li>
            </ul>
            <p className="text-xs text-white/60">
              Data residency: Singapore • Frankfurt • Mumbai • Dhaka
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} BanglaPrompt.ai. All rights reserved.</p>
          <p>বাংলা এবং ইংরেজি—দুই ভাষাতেই স্বচ্ছতা ও আস্থা।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
