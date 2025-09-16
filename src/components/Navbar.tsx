
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { name: "হোম", href: "#" },
    { name: "কোর্স", href: "#features" },
    { name: "রিসোর্স", href: "#resources" },
    { name: "কমিউনিটি", href: "/community/prompts" },
    { name: "সম্পর্কে", href: "#about" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
              পি
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">
              প্রম্পট শিক্ষা
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="/community/submit"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
            >
              কমিউনিটিতে যোগ দিন
            </a>
          </div>

          {/* Mobile Navigation */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/community/submit"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium text-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                onClick={() => setMenuOpen(false)}
              >
                কমিউনিটিতে যোগ দিন
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
