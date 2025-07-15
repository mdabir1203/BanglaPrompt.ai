-- Performance optimization for 1000+ users
-- Add indexes for better query performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_newsletter_subscriptions_email 
ON public.newsletter_subscriptions(email);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_newsletter_subscriptions_active 
ON public.newsletter_subscriptions(is_active) 
WHERE is_active = true;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_newsletter_subscriptions_source 
ON public.newsletter_subscriptions(source);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_newsletter_subscriptions_subscribed_at 
ON public.newsletter_subscriptions(subscribed_at DESC);

-- Add composite index for common queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_newsletter_subscriptions_active_date 
ON public.newsletter_subscriptions(is_active, subscribed_at DESC) 
WHERE is_active = true;

-- Create analytics table for tracking user interactions
CREATE TABLE IF NOT EXISTS public.user_analytics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID NOT NULL,
    event_type TEXT NOT NULL,
    event_data JSONB,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on analytics table
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy for analytics (allow inserts from anyone, admin read only)
CREATE POLICY "Anyone can track analytics" 
ON public.user_analytics 
FOR INSERT 
WITH CHECK (true);

-- Add indexes for analytics queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_analytics_session 
ON public.user_analytics(session_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_analytics_event_type 
ON public.user_analytics(event_type);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_analytics_created_at 
ON public.user_analytics(created_at DESC);

-- Performance monitoring function
CREATE OR REPLACE FUNCTION public.get_newsletter_stats()
RETURNS JSON AS $$
DECLARE
    stats JSON;
BEGIN
    SELECT json_build_object(
        'total_subscriptions', COUNT(*),
        'active_subscriptions', COUNT(*) FILTER (WHERE is_active = true),
        'today_subscriptions', COUNT(*) FILTER (WHERE subscribed_at >= CURRENT_DATE),
        'week_subscriptions', COUNT(*) FILTER (WHERE subscribed_at >= CURRENT_DATE - INTERVAL '7 days'),
        'sources', json_object_agg(source, cnt)
    )
    INTO stats
    FROM (
        SELECT 
            source, 
            COUNT(*) as cnt
        FROM public.newsletter_subscriptions 
        WHERE is_active = true 
        GROUP BY source
    ) source_stats,
    public.newsletter_subscriptions;
    
    RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Connection pooling optimization (configure in Supabase dashboard)
-- This is a comment for configuration reminder:
-- Set max_connections = 100 (for 1000+ concurrent users)
-- Set shared_preload_libraries = 'pg_stat_statements'