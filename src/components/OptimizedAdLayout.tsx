import React from "react";
import MonetizationAds from "./MonetizationAds";

interface OptimizedAdLayoutProps {
  children: React.ReactNode;
}

const OptimizedAdLayout: React.FC<OptimizedAdLayoutProps> = ({ children }) => {
  const childArray = React.Children.toArray(children);

  const contentWithInlineAd = childArray.flatMap((child, index) => {
    const segments = [child];

    if (index === 2) {
      segments.push(
        <div
          key={`inline-ad-${index}`}
          className="flex w-full justify-center px-4"
          aria-label="sponsored highlight"
        >
          <div className="inline-flex w-full max-w-xs flex-col items-center gap-2 rounded-2xl border border-border/40 bg-white/80 p-4 text-center shadow-[var(--shadow-soft)] backdrop-blur">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground/70">
              Sponsored
            </span>
            <MonetizationAds placement="inline" className="mt-0 w-full" />
          </div>
        </div>
      );
    }

    return segments;
  });

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-white via-white to-muted/20">
      <div className="flex-1 space-y-0">{contentWithInlineAd}</div>

      <div className="border-t border-border/30 bg-white/90 py-10 backdrop-blur">
        <div className="mx-auto flex max-w-sm flex-col items-center gap-3 px-4 text-center">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground/70">
            Partner Message
          </span>
          <MonetizationAds placement="footer" className="mt-0 w-full max-w-[220px]" />
        </div>
      </div>
    </div>
  );
};

export default OptimizedAdLayout;
