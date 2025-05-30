export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      emoji_challenges: {
        Row: {
          artist: string | null
          correct_answer: string
          created_at: string
          emojis: string
          explanation: string
          id: string
        }
        Insert: {
          artist?: string | null
          correct_answer: string
          created_at?: string
          emojis: string
          explanation: string
          id?: string
        }
        Update: {
          artist?: string | null
          correct_answer?: string
          created_at?: string
          emojis?: string
          explanation?: string
          id?: string
        }
        Relationships: []
      }
      historia_content: {
        Row: {
          artists: string[] | null
          content: string
          created_at: string
          description: string
          era_key: string
          id: string
          landmarks: string[] | null
          period: string
          title: string
          updated_at: string
        }
        Insert: {
          artists?: string[] | null
          content: string
          created_at?: string
          description: string
          era_key: string
          id?: string
          landmarks?: string[] | null
          period: string
          title: string
          updated_at?: string
        }
        Update: {
          artists?: string[] | null
          content?: string
          created_at?: string
          description?: string
          era_key?: string
          id?: string
          landmarks?: string[] | null
          period?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lyrics_complete: {
        Row: {
          artist: string
          correct_answer: string
          created_at: string
          hint: string | null
          id: string
          lyric_with_blank: string
          song_title: string
        }
        Insert: {
          artist: string
          correct_answer: string
          created_at?: string
          hint?: string | null
          id?: string
          lyric_with_blank: string
          song_title: string
        }
        Update: {
          artist?: string
          correct_answer?: string
          created_at?: string
          hint?: string | null
          id?: string
          lyric_with_blank?: string
          song_title?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_answer: number
          created_at: string
          explanation: string
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question: string
        }
        Insert: {
          correct_answer: number
          created_at?: string
          explanation: string
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question: string
        }
        Update: {
          correct_answer?: number
          created_at?: string
          explanation?: string
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question?: string
        }
        Relationships: []
      }
      quiz_scores: {
        Row: {
          completion_time: number
          created_at: string
          id: string
          player_name: string
          quiz_type: string
          score: number
          total_questions: number
        }
        Insert: {
          completion_time: number
          created_at?: string
          id?: string
          player_name: string
          quiz_type: string
          score: number
          total_questions: number
        }
        Update: {
          completion_time?: number
          created_at?: string
          id?: string
          player_name?: string
          quiz_type?: string
          score?: number
          total_questions?: number
        }
        Relationships: []
      }
      timeline_events: {
        Row: {
          created_at: string
          description: string
          event_title: string
          id: string
          order_position: number
          year: number
        }
        Insert: {
          created_at?: string
          description: string
          event_title: string
          id?: string
          order_position: number
          year: number
        }
        Update: {
          created_at?: string
          description?: string
          event_title?: string
          id?: string
          order_position?: number
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
