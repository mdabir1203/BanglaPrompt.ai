-- Create prompts table for community submissions
CREATE TABLE public.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  description TEXT,
  use_case TEXT,
  language TEXT DEFAULT 'Bangla',
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  submitter_name TEXT,
  submitter_email TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Track metadata for community upvotes
CREATE TABLE public.prompt_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  community_identity UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX prompt_upvotes_unique_identity
  ON public.prompt_upvotes (prompt_id, community_identity);

-- Store user generated comments for prompts
CREATE TABLE public.prompt_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  community_identity UUID NOT NULL,
  author_name TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_prompt_comments_prompt_id_created_at
  ON public.prompt_comments (prompt_id, created_at DESC);

-- Helper function to maintain updated_at timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prompts_set_updated_at
BEFORE UPDATE ON public.prompts
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Enable RLS and define policies for prompts table
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Prompts are viewable by everyone"
  ON public.prompts
  FOR SELECT
  USING (true);

CREATE POLICY "Community members can submit prompts"
  ON public.prompts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can manage prompts"
  ON public.prompts
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Enable RLS for prompt upvotes
ALTER TABLE public.prompt_upvotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Upvotes are visible to everyone"
  ON public.prompt_upvotes
  FOR SELECT
  USING (true);

CREATE POLICY "Community members can upvote prompts"
  ON public.prompt_upvotes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can retract their upvotes"
  ON public.prompt_upvotes
  FOR DELETE
  TO anon, authenticated
  USING (community_identity::text = current_setting('request.headers.x-community-identity', true));

CREATE POLICY "Service role can manage upvotes"
  ON public.prompt_upvotes
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Enable RLS for prompt comments
ALTER TABLE public.prompt_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are visible to everyone"
  ON public.prompt_comments
  FOR SELECT
  USING (true);

CREATE POLICY "Community members can comment"
  ON public.prompt_comments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (char_length(trim(content)) > 0);

CREATE POLICY "Service role can manage comments"
  ON public.prompt_comments
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

