export interface CommunityPrompt {
  id: string;
  title: string;
  prompt: string;
  description: string | null;
  use_case: string | null;
  language: string | null;
  tags: string[];
  submitter_name: string | null;
  created_at: string;
  upvote_count: number;
  comment_count: number;
  user_has_upvoted: boolean;
}

export interface PromptComment {
  id: string;
  prompt_id: string;
  community_identity: string;
  author_name: string | null;
  content: string;
  created_at: string;
}
