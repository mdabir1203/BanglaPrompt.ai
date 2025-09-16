export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      creator_tools: {
        Row: {
          category: string
          created_at: string
          creator_id: string
          currency: string
          description: string | null
          id: string
          is_active: boolean
          metadata: Json | null
          name: string
          price_cents: number
          pricing_type: string
          slug: string
          subscription_interval: string | null
          tags: string[]
          thumbnail_url: string | null
          trial_period_days: number | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          creator_id: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name: string
          price_cents: number
          pricing_type: string
          slug: string
          subscription_interval?: string | null
          tags?: string[]
          thumbnail_url?: string | null
          trial_period_days?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          creator_id?: string
          currency?: string
          description?: string | null
          id?: string
          is_active?: boolean
          metadata?: Json | null
          name?: string
          price_cents?: number
          pricing_type?: string
          slug?: string
          subscription_interval?: string | null
          tags?: string[]
          thumbnail_url?: string | null
          trial_period_days?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_tools_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
            referencedSchema: "auth"
          },
        ]
      }
      prompt_comments: {
        Row: {
          author_name: string | null
          community_identity: string
          content: string
          created_at: string
          id: string
          prompt_id: string
        }
        Insert: {
          author_name?: string | null
          community_identity: string
          content: string
          created_at?: string
          id?: string
          prompt_id: string
        }
        Update: {
          author_name?: string | null
          community_identity?: string
          content?: string
          created_at?: string
          id?: string
          prompt_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_comments_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          }
        ]
      }
      tool_subscriptions: {
        Row: {
          buyer_id: string
          cancel_at: string | null
          created_at: string
          currency: string
          current_period_end: string | null
          id: string
          metadata: Json | null
          payment_reference: string | null
          price_cents: number
          purchase_type: string
          purchased_at: string
          status: string
          tool_id: string
          updated_at: string
        }
        Insert: {
          buyer_id: string
          cancel_at?: string | null
          created_at?: string
          currency?: string
          current_period_end?: string | null
          id?: string
          metadata?: Json | null
          payment_reference?: string | null
          price_cents: number
          purchase_type: string
          purchased_at?: string
          status?: string
          tool_id: string
          updated_at?: string
        }
        Update: {
          buyer_id?: string
          cancel_at?: string | null
          created_at?: string
          currency?: string
          current_period_end?: string | null
          id?: string
          metadata?: Json | null
          payment_reference?: string | null
          price_cents?: number
          purchase_type?: string
          purchased_at?: string
          status?: string
          tool_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_subscriptions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
            referencedSchema: "auth"
          },
          {
            foreignKeyName: "tool_subscriptions_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "creator_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      prompt_upvotes: {
        Row: {
          community_identity: string
          created_at: string
          id: string
          prompt_id: string
        }
        Insert: {
          community_identity: string
          created_at?: string
          id?: string
          prompt_id: string
        }
        Update: {
          community_identity?: string
          created_at?: string
          id?: string
          prompt_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_upvotes_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "prompts"
            referencedColumns: ["id"]
          }
        ]
      }
      prompts: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          language: string | null
          prompt: string
          submitter_email: string | null
          submitter_name: string | null
          tags: string[]
          title: string
          updated_at: string
          use_case: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          language?: string | null
          prompt: string
          submitter_email?: string | null
          submitter_name?: string | null
          tags?: string[]
          title: string
          updated_at?: string
          use_case?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          language?: string | null
          prompt?: string
          submitter_email?: string | null
          submitter_name?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
          use_case?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
            referencedSchema: "auth"
          }
        ]
      }
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean
          name: string | null
          source: string | null
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          name?: string | null
          source?: string | null
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          name?: string | null
          source?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_newsletter_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
