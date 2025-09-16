import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, unknown>;
  session_id: string;
}

interface QueuedAnalyticsEvent extends AnalyticsEvent {
  timestamp: number;
  retries: number;
}

const STORAGE_KEY = "banglaprompt.analytics.queue";
const SESSION_STORAGE_KEY = "banglaprompt.analytics.session";

class AnalyticsTracker {
  private sessionId: string;
  private queue: QueuedAnalyticsEvent[] = [];
  private batchSize = 10;
  private flushInterval = 5000; // 5 seconds
  private flushTimer: number | null = null;
  private maxQueueSize = 100;
  private maxRetries = 3;
  private maxEventAge = 1000 * 60 * 60 * 24; // 24 hours
  private isFlushing = false;

  constructor() {
    this.sessionId = this.restoreSessionId();
    this.queue = this.loadQueueFromStorage();
    this.startBatchProcessor();
    this.bindLifecycleEvents();
  }

  private bindLifecycleEvents() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    window.addEventListener("online", this.handleOnline);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  private handleOnline = () => {
    void this.flush({ force: true });
  };

  private handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      void this.flush({ force: true });
    }
  };

  private handleBeforeUnload = () => {
    this.persistQueue();
  };

  private restoreSessionId(): string {
    if (typeof window === "undefined") {
      return this.generateSessionId();
    }

    try {
      const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (existing) {
        return existing;
      }

      const newId = this.generateSessionId();
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, newId);
      return newId;
    } catch (error) {
      console.warn("Unable to access sessionStorage for analytics:", error);
      return this.generateSessionId();
    }
  }

  private generateSessionId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  private loadQueueFromStorage(): QueuedAnalyticsEvent[] {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        return [];
      }

      const now = Date.now();
      return parsed
        .filter(
          (event): event is QueuedAnalyticsEvent =>
            Boolean(event) &&
            typeof event === "object" &&
            "event_type" in event &&
            typeof (event as QueuedAnalyticsEvent).event_type === "string" &&
            typeof (event as QueuedAnalyticsEvent).timestamp === "number",
        )
        .map((event) => ({
          ...event,
          retries: event.retries ?? 0,
        }))
        .filter((event) => now - event.timestamp <= this.maxEventAge);
    } catch (error) {
      console.warn("Failed to load analytics queue from storage:", error);
      return [];
    }
  }

  private persistQueue() {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const serialized = JSON.stringify(this.queue);
      window.localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.warn("Failed to persist analytics queue:", error);
    }
  }

  private trimQueue() {
    if (this.queue.length > this.maxQueueSize) {
      this.queue.splice(0, this.queue.length - this.maxQueueSize);
    }
  }

  track(eventType: string, eventData?: Record<string, unknown>) {
    const event: QueuedAnalyticsEvent = {
      event_type: eventType,
      event_data: eventData,
      session_id: this.sessionId,
      timestamp: Date.now(),
      retries: 0,
    };

    this.queue.push(event);
    this.trimQueue();
    this.persistQueue();

    if (this.queue.length >= this.batchSize) {
      void this.flush();
    }
  }

  private async flush(options: { force?: boolean } = {}) {
    if (this.isFlushing || this.queue.length === 0) {
      return;
    }

    if (!options.force && typeof navigator !== "undefined" && !navigator.onLine) {
      return;
    }

    const events = this.queue.slice(0, this.batchSize);
    this.isFlushing = true;

    try {
      const payload = events.map((event) => ({
        ...event,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        ip_address: null,
      }));

      const { error } = await supabase.from("user_analytics").insert(payload);

      if (error) {
        throw error;
      }

      this.queue.splice(0, events.length);
      this.persistQueue();
    } catch (error) {
      const indexesToRemove: number[] = [];

      events.forEach((_, index) => {
        const event = this.queue[index];
        if (!event) return;

        const retries = event.retries + 1;
        if (retries > this.maxRetries) {
          indexesToRemove.push(index);
        } else {
          this.queue[index] = { ...event, retries };
        }
      });

      for (let i = indexesToRemove.length - 1; i >= 0; i -= 1) {
        this.queue.splice(indexesToRemove[i], 1);
      }

      this.persistQueue();
      console.error("Analytics tracking error:", error);
    } finally {
      this.isFlushing = false;
    }
  }

  private startBatchProcessor() {
    if (typeof window === "undefined") {
      return;
    }

    if (this.flushTimer) {
      window.clearInterval(this.flushTimer);
    }

    this.flushTimer = window.setInterval(() => {
      void this.flush();
    }, this.flushInterval);
  }

  flushImmediately() {
    return this.flush({ force: true });
  }
}

const analyticsTracker = new AnalyticsTracker();

export const useAnalytics = () => {
  useEffect(() => {
    const trackInitialPageView = () => {
      analyticsTracker.track("page_view", {
        url: window.location.href,
        referrer: document.referrer,
      });
    };

    trackInitialPageView();

    const reportedScrollPercents = new Set<number>();

    const trackScroll = () => {
      const scrollRange = document.body.scrollHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollRange) * 100);
      const threshold = Math.min(100, Math.max(0, Math.floor(scrollPercent / 25) * 25));
      if (threshold > 0 && threshold <= 100 && !reportedScrollPercents.has(threshold)) {
        reportedScrollPercents.add(threshold);
        analyticsTracker.track("scroll_depth", { percent: threshold });
      }
    };

    const startTime = Date.now();
    let timeTracked = false;
    const cleanupTimeOnPage = () => {
      if (timeTracked) return;
      timeTracked = true;
      const timeSpent = Date.now() - startTime;
      analyticsTracker.track("time_on_page", { duration: timeSpent });
      void analyticsTracker.flushImmediately();
    };

    window.addEventListener("scroll", trackScroll, { passive: true });
    window.addEventListener("pagehide", cleanupTimeOnPage);

    return () => {
      window.removeEventListener("scroll", trackScroll);
      window.removeEventListener("pagehide", cleanupTimeOnPage);
      cleanupTimeOnPage();
    };
  }, []);

  return {
    track: (eventType: string, eventData?: Record<string, unknown>) => {
      analyticsTracker.track(eventType, eventData);
    },
    flush: () => analyticsTracker.flushImmediately(),
  };
};
