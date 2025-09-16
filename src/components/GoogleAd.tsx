import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createScopedLogger } from "@/lib/logger";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical";
  responsive?: boolean;
  className?: string;
}

const AD_CLIENT = "ca-pub-6185927994614530";
const AD_HOST = "ca-host-pub-6185927994614530";
const ADSENSE_SCRIPT_ID = "google-adsense-script";
const ADSENSE_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

const googleAdLogger = createScopedLogger("google-ad");

const GoogleAd: React.FC<GoogleAdProps> = ({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const adSlotRef = useRef<HTMLModElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasRenderedRef = useRef(false);
  const [hasError, setHasError] = useState(false);

  const ensureAdsenseScript = useCallback(async () => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (document.getElementById(ADSENSE_SCRIPT_ID)) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.id = ADSENSE_SCRIPT_ID;
      script.async = true;
      script.src = ADSENSE_SRC;
      script.crossOrigin = "anonymous";
      script.onload = () => resolve();
      script.onerror = (event) => reject(event);
      document.head.appendChild(script);
    });
  }, []);

  const resetAdElement = useCallback(() => {
    const adElement = adSlotRef.current;
    if (!adElement) return;

    adElement.setAttribute("data-ad-slot", slot);
    adElement.setAttribute("data-ad-format", format);
    adElement.setAttribute("data-full-width-responsive", responsive ? "true" : "false");
    adElement.removeAttribute("data-adsbygoogle-status");

    while (adElement.firstChild) {
      adElement.removeChild(adElement.firstChild);
    }
  }, [slot, format, responsive]);

  const renderAd = useCallback(async () => {
    if (hasRenderedRef.current || !adSlotRef.current) {
      return;
    }

    try {
      setHasError(false);
      await ensureAdsenseScript();
      resetAdElement();
      hasRenderedRef.current = true;
      // @ts-expect-error - Google AdSense global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      hasRenderedRef.current = false;
      setHasError(true);
      googleAdLogger.error("Error rendering Google Ad", { error });
    }
  }, [ensureAdsenseScript, resetAdElement]);

  const observeAd = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    observerRef.current?.disconnect();

    const startRendering = () => {
      void renderAd();
    };

    if ("IntersectionObserver" in window && containerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startRendering();
            observerRef.current?.disconnect();
          }
        });
      }, {
        rootMargin: "200px 0px",
        threshold: 0,
      });

      observerRef.current.observe(containerRef.current);
    } else {
      startRendering();
    }
  }, [renderAd]);

  useEffect(() => {
    hasRenderedRef.current = false;
    resetAdElement();
    observeAd();

    return () => {
      observerRef.current?.disconnect();
    };
  }, [resetAdElement, observeAd]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const adClassName = useMemo(
    () => `google-ad ${className}`.trim(),
    [className],
  );

  return (
    <div className={adClassName} ref={containerRef}>
      <ins
        ref={adSlotRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-host={AD_HOST}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
      {hasError && (
        <div className="text-xs text-muted-foreground mt-2" role="status">
          বিজ্ঞাপন লোড করতে সমস্যা হয়েছে।
        </div>
      )}
    </div>
  );
};

export default GoogleAd;
