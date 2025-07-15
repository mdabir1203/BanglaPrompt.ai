import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsEvent {
  event_type: string;
  event_data?: Record<string, any>;
  session_id: string;
}

class AnalyticsTracker {
  private sessionId: string;
  private queue: AnalyticsEvent[] = [];
  private batchSize = 10;
  private flushInterval = 5000; // 5 seconds

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startBatchProcessor();
  }

  private generateSessionId(): string {
    return crypto.randomUUID();
  }

  track(eventType: string, eventData?: Record<string, any>) {
    const event: AnalyticsEvent = {
      event_type: eventType,
      event_data: eventData,
      session_id: this.sessionId
    };

    this.queue.push(event);

    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }

  private async flush() {
    if (this.queue.length === 0) return;

    const events = this.queue.splice(0, this.batchSize);
    
    try {
      const { error } = await supabase
        .from('user_analytics')
        .insert(events.map(event => ({
          ...event,
          user_agent: navigator.userAgent,
          ip_address: null // Will be populated by server
        })));

      if (error) {
        console.error('Analytics tracking error:', error);
        // Re-queue failed events (up to 3 retries)
        this.queue.unshift(...events);
      }
    } catch (error) {
      console.error('Analytics network error:', error);
    }
  }

  private startBatchProcessor() {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }
}

const analyticsTracker = new AnalyticsTracker();

export const useAnalytics = () => {
  useEffect(() => {
    // Track page view
    analyticsTracker.track('page_view', {
      url: window.location.href,
      referrer: document.referrer,
      timestamp: Date.now()
    });

    // Track user engagement
    const trackScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > 0 && scrollPercent % 25 === 0) {
        analyticsTracker.track('scroll_depth', { percent: scrollPercent });
      }
    };

    const trackTimeOnPage = () => {
      const startTime = Date.now();
      return () => {
        const timeSpent = Date.now() - startTime;
        analyticsTracker.track('time_on_page', { duration: timeSpent });
      };
    };

    const cleanup = trackTimeOnPage();
    window.addEventListener('scroll', trackScroll, { passive: true });
    window.addEventListener('beforeunload', cleanup);

    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    };
  }, []);

  return {
    track: (eventType: string, eventData?: Record<string, any>) => 
      analyticsTracker.track(eventType, eventData)
  };
};