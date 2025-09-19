import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Globe2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const NAV_LINKS = [
  { to: "/marketplace", labelEn: "Marketplace", labelBn: "মার্কেটপ্লেস" },
  { to: "/exchange", labelEn: "Live Bids", labelBn: "লাইভ বিড" },
  { to: "/creators", labelEn: "For Creators", labelBn: "ক্রিয়েটরদের জন্য" },
  { to: "/enterprise", labelEn: "Enterprise", labelBn: "এন্টারপ্রাইজ" },
  { to: "/pricing", labelEn: "Pricing", labelBn: "প্রাইসিং" },
  { to: "/insights", labelEn: "Insights", labelBn: "ইনসাইটস" },
  { to: "/support", labelEn: "Support", labelBn: "সাপোর্ট" },
];

type LanguageCode = "en" | "bn";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavLinks = (className?: string) =>
    NAV_LINKS.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center text-xs font-medium transition-colors md:text-[0.85rem]",
            isActive ? "text-foreground" : "text-muted-foreground/80 hover:text-foreground",
            className,
          )
        }
        onClick={() => setMenuOpen(false)}
      >
        <span>{isEnglish ? link.labelEn : link.labelBn}</span>
      </NavLink>
    ));

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-24px_rgba(12,17,21,0.45)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            src="/promptbazar-logo.svg"
            alt="PromptBazar.AI logo"
            className="h-11 w-11 rounded-xl border border-emerald-100 bg-white p-1.5 shadow-[var(--shadow-soft)]"
          />
          <div className="hidden text-left md:block">
            <span className="text-sm font-semibold text-foreground md:text-base">PromptBazar.AI</span>
            <span className="block text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground/80">
              Bengali Prompt Marketplace
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">{renderNavLinks()}</nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-1 rounded-full border border-white/70 bg-white/40 px-3 py-1.5 text-xs shadow-sm backdrop-blur">
            <Globe2 className="h-4 w-4 text-primary" />
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={cn(
                "rounded-full px-2 py-1 font-medium transition-colors",
                isEnglish ? "bg-primary text-white" : "text-muted-foreground",
              )}
            >
              EN
            </button>
            <span className="text-muted-foreground/60">|</span>
            <button
              type="button"
              onClick={() => setLanguage("bn")}
              className={cn(
                "rounded-full px-2 py-1 font-medium transition-colors",
                !isEnglish ? "bg-primary text-white" : "text-muted-foreground",
              )}
            >
              বাংলা
            </button>
          </div>

          <a
            href="/community/prompts"
            className="text-right text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>{isEnglish ? "Sign In" : "সাইন ইন"}</span>
          </a>

          <Link
            to="/pricing"
            className="rounded-full bg-[var(--gradient-aurora)] px-5 py-2 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
            onClick={() => setMenuOpen(false)}
          >
            <span>{isEnglish ? "Get Started" : "আজই শুরু করুন"}</span>
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/80 bg-white/60 text-foreground shadow-sm backdrop-blur lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden">
          <div className="mx-4 mb-4 space-y-6 rounded-2xl border border-white/80 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-lg">
            <div className="flex items-center justify-between rounded-2xl bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Globe2 className="h-4 w-4 text-primary" />
                <span>Language</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    isEnglish
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("bn")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    !isEnglish
                      ? "bg-primary text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  বাংলা
                </button>
              </div>
            </div>

            <nav className="grid gap-4 text-center">{renderNavLinks("py-1")}</nav>

            <div className="grid gap-3">
              <a
                href="/community/prompts"
                className="rounded-xl border border-muted-foreground/20 px-4 py-3 text-sm font-semibold text-foreground shadow-sm"
              >
                <span className="block">{isEnglish ? "Sign In" : "সাইন ইন"}</span>
              </a>
              <Link
                to="/pricing"
                className="rounded-xl bg-[var(--gradient-aurora)] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
                onClick={() => setMenuOpen(false)}
              >
                <span className="block">{isEnglish ? "Get Started" : "আজই শুরু করুন"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
