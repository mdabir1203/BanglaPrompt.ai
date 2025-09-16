import React, { useEffect } from "react";

const PREFETCH_DOMAINS = [
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
  "https://pagead2.googlesyndication.com",
  "https://www.google-analytics.com",
  "https://syndication.realsrv.com",
];

const PRECONNECT_DOMAINS = [
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
];

const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return undefined;
    }

    const appendedHints: HTMLLinkElement[] = [];
    const addedHref = new Set<string>();

    const ensureResourceHint = (
      rel: "dns-prefetch" | "preconnect",
      href: string,
      crossOrigin?: string,
    ) => {
      if (addedHref.has(`${rel}:${href}`)) {
        return;
      }

      const existing = document.head.querySelector<HTMLLinkElement>(
        `link[rel="${rel}"][href="${href}"]`,
      );

      if (existing) {
        addedHref.add(`${rel}:${href}`);
        return;
      }

      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      if (crossOrigin) {
        link.crossOrigin = crossOrigin;
      }
      document.head.appendChild(link);
      appendedHints.push(link);
      addedHref.add(`${rel}:${href}`);
    };

    // Only add aggressive hints on reliable connections to avoid overwhelming slow devices
    const connection =
      "connection" in navigator
        ? (navigator as Navigator & { connection?: { effectiveType?: string } }).connection
        : undefined;
    const isSlowConnection =
      connection?.effectiveType && ["slow-2g", "2g", "3g"].includes(connection.effectiveType);

    if (!isSlowConnection) {
      PREFETCH_DOMAINS.forEach((domain) => ensureResourceHint("dns-prefetch", domain));
    }

    PRECONNECT_DOMAINS.forEach((domain) => ensureResourceHint("preconnect", domain, "anonymous"));

    let swRegistration: ServiceWorkerRegistration | undefined;
    let unregisterLoadListener: (() => void) | undefined;

    const registerServiceWorker = async () => {
      if (!("serviceWorker" in navigator) || !("caches" in window)) {
        return;
      }

      try {
        swRegistration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        const maybeSendSkipWaiting = (worker?: ServiceWorker | null) => {
          worker?.postMessage({ type: "SKIP_WAITING" });
        };

        if (swRegistration.waiting) {
          maybeSendSkipWaiting(swRegistration.waiting);
        }

        swRegistration.addEventListener("updatefound", () => {
          const newWorker = swRegistration?.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              maybeSendSkipWaiting(newWorker);
            }
          });
        });
      } catch (error) {
        console.log("ServiceWorker registration failed:", error);
      }
    };

    if (document.readyState === "complete") {
      registerServiceWorker();
    } else {
      const onLoad = () => {
        registerServiceWorker();
      };
      window.addEventListener("load", onLoad, { once: true });
      unregisterLoadListener = () => window.removeEventListener("load", onLoad);
    }

    const runPerformanceMonitoring = () => {
      import("web-vitals")
        .then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
          const logger = (metric: unknown) => console.debug("web-vitals", metric);
          onLCP(logger);
          onINP(logger);
          onCLS(logger);
          onFCP(logger);
          onTTFB(logger);
        })
        .catch((error) => console.log("Failed to load web-vitals", error));

      if ("memory" in performance) {
        const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn("High memory usage detected");
        }
      }
    };

    if ("requestIdleCallback" in window) {
      (window as typeof window & { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback?.(
        runPerformanceMonitoring,
      );
    } else {
      setTimeout(runPerformanceMonitoring, 2000);
    }

    let imageObserver: IntersectionObserver | undefined;

    const optimizeImages = () => {
      const lazyImages = document.querySelectorAll<HTMLImageElement>("img[data-src]");
      if (!lazyImages.length) return;

      const loadImage = (img: HTMLImageElement) => {
        if (!img.dataset.src) return;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      };

      if ("IntersectionObserver" in window) {
        imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage(entry.target as HTMLImageElement);
              imageObserver?.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: "200px 0px",
          threshold: 0.1,
        });

        lazyImages.forEach((img) => imageObserver?.observe(img));
      } else {
        lazyImages.forEach((img) => loadImage(img));
      }
    };

    optimizeImages();

    return () => {
      unregisterLoadListener?.();
      imageObserver?.disconnect();
      // Resource hints are intentionally kept to avoid layout shifts on remounts.
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;