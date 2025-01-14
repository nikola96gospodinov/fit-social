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
      comment_likes: {
        Row: {
          comment_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          user_id: string
          workout_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          user_id: string
          workout_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          user_id?: string
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      exercise_sets: {
        Row: {
          distance: number | null
          id: string
          is_done: boolean
          reps: number | null
          time: number | null
          weight: number | null
          workout_exercise_id: string
        }
        Insert: {
          distance?: number | null
          id?: string
          is_done?: boolean
          reps?: number | null
          time?: number | null
          weight?: number | null
          workout_exercise_id: string
        }
        Update: {
          distance?: number | null
          id?: string
          is_done?: boolean
          reps?: number | null
          time?: number | null
          weight?: number | null
          workout_exercise_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_sets_workout_exercise_id_fkey"
            columns: ["workout_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_sets_workout_exercise_id_fkey1"
            columns: ["workout_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          equipment_id: string
          id: string
          image_url: string | null
          instructions: string[]
          measurement_type: Database["public"]["Enums"]["exercise_measurement_type"]
          muscle_group_id: string
          name: string
        }
        Insert: {
          equipment_id: string
          id?: string
          image_url?: string | null
          instructions: string[]
          measurement_type: Database["public"]["Enums"]["exercise_measurement_type"]
          muscle_group_id: string
          name: string
        }
        Update: {
          equipment_id?: string
          id?: string
          image_url?: string | null
          instructions?: string[]
          measurement_type?: Database["public"]["Enums"]["exercise_measurement_type"]
          muscle_group_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercises_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_muscle_group_id_fkey"
            columns: ["muscle_group_id"]
            isOneToOne: false
            referencedRelation: "muscle_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          accepted_at: string | null
          created_at: string
          followed_id: string
          follower_id: string
          id: string
          status: Database["public"]["Enums"]["follow_status"]
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          followed_id: string
          follower_id: string
          id?: string
          status: Database["public"]["Enums"]["follow_status"]
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          followed_id?: string
          follower_id?: string
          id?: string
          status?: Database["public"]["Enums"]["follow_status"]
        }
        Relationships: [
          {
            foreignKeyName: "follows_followed_id_fkey"
            columns: ["followed_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          id: string
          user_id: string
          workout_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
          workout_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      muscle_groups: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          notification_type: Database["public"]["Enums"]["notification_type"]
          receiver_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          notification_type: Database["public"]["Enums"]["notification_type"]
          receiver_id: string
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          notification_type?: Database["public"]["Enums"]["notification_type"]
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          full_name: string | null
          handle: string | null
          home_gym_id: string | null
          home_gym_name: string | null
          id: string
          is_public: boolean | null
          measurement_system:
            | Database["public"]["Enums"]["measurement_system"]
            | null
        }
        Insert: {
          bio?: string | null
          full_name?: string | null
          handle?: string | null
          home_gym_id?: string | null
          home_gym_name?: string | null
          id: string
          is_public?: boolean | null
          measurement_system?:
            | Database["public"]["Enums"]["measurement_system"]
            | null
        }
        Update: {
          bio?: string | null
          full_name?: string | null
          handle?: string | null
          home_gym_id?: string | null
          home_gym_name?: string | null
          id?: string
          is_public?: boolean | null
          measurement_system?:
            | Database["public"]["Enums"]["measurement_system"]
            | null
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          exercise_id: string
          id: string
          workout_id: string
        }
        Insert: {
          exercise_id?: string
          id?: string
          workout_id: string
        }
        Update: {
          exercise_id?: string
          id?: string
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          ended: string
          id: string
          started: string
          title: string | null
          user_id: string
        }
        Insert: {
          ended?: string
          id?: string
          started: string
          title?: string | null
          user_id: string
        }
        Update: {
          ended?: string
          id?: string
          started?: string
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_follow_request:
        | {
            Args: {
              p_follower_id: string
            }
            Returns: undefined
          }
        | {
            Args: {
              p_follower_id: string
              p_followed_id: string
            }
            Returns: undefined
          }
      add_comment: {
        Args: {
          p_workout_id: string
          p_content: string
        }
        Returns: undefined
      }
      add_workout_with_exercises_and_sets: {
        Args: {
          p_started: string
          p_user_id: string
          p_exercises: Json[]
          p_sets: Json[]
          p_title?: string
        }
        Returns: undefined
      }
      follow_account: {
        Args: {
          p_follower_id: string
          p_followed_id: string
        }
        Returns: undefined
      }
      get_previous_sets_for_exercise: {
        Args: {
          current_exercise_id: string
        }
        Returns: {
          weight: number
          reps: number
        }[]
      }
      get_workout_prs: {
        Args: {
          current_workout_id: string
          p_user_id: string
          current_workout_ended: string
        }
        Returns: {
          set_id: string
        }[]
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      like_comment: {
        Args: {
          p_comment_id: string
        }
        Returns: undefined
      }
      like_workout: {
        Args: {
          p_workout_id: string
        }
        Returns: undefined
      }
      remove_comment: {
        Args: {
          p_comment_id: string
        }
        Returns: undefined
      }
      search_exercises: {
        Args: {
          search_query?: string
          p_equipment?: string[]
          p_muscle_groups?: string[]
          p_limit?: number
          p_offset?: number
        }
        Returns: {
          id: string
          name: string
          equipment_id: string
          equipment_name: string
          muscle_group_id: string
          muscle_group_name: string
          image_url: string
          instructions: string[]
          measurement_type: Database["public"]["Enums"]["exercise_measurement_type"]
          total_count: number
        }[]
      }
      search_profiles: {
        Args: {
          search_query: string
        }
        Returns: {
          id: string
          handle: string
          full_name: string
          bio: string
          is_public: boolean
          home_gym_id: string
          home_gym_name: string
          measurement_system: Database["public"]["Enums"]["measurement_system"]
          search_rank: number
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      unfollow_account: {
        Args: {
          p_follower_id: string
          p_followed_id: string
        }
        Returns: undefined
      }
      unlike_comment:
        | {
            Args: {
              p_comment_id: string
            }
            Returns: undefined
          }
        | {
            Args: {
              p_comment_id: string
              p_comment_like_id: string
            }
            Returns: undefined
          }
      unlike_workout: {
        Args: {
          p_workout_id: string
        }
        Returns: undefined
      }
      update_workout: {
        Args: {
          p_workout_id: string
          p_workout_title: string
          p_workout_started: string
          p_workout_ended: string
          p_exercises_data: Json
          p_sets_data: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      exercise_measurement_type:
        | "reps_only"
        | "reps_and_added_weight"
        | "reps_and_subtracted_weight"
        | "time_only"
        | "time_and_distance"
        | "time_and_added_weight"
      follow_status: "pending" | "accepted"
      measurement_system: "metric" | "imperial"
      notification_type:
        | "started_following"
        | "follow_request"
        | "follow_request_accepted"
        | "workout_like"
        | "workout_comment"
        | "comment_like"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
