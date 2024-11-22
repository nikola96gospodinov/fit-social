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
      exercise_sets: {
        Row: {
          id: string
          is_done: boolean | null
          reps: number | null
          weight: number | null
          workout_exercise_id: string | null
        }
        Insert: {
          id?: string
          is_done?: boolean | null
          reps?: number | null
          weight?: number | null
          workout_exercise_id?: string | null
        }
        Update: {
          id?: string
          is_done?: boolean | null
          reps?: number | null
          weight?: number | null
          workout_exercise_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_sets_workout_exercise_id_fkey"
            columns: ["workout_exercise_id"]
            isOneToOne: false
            referencedRelation: "workout_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      follows: {
        Row: {
          accepted_at: string | null
          created_at: string
          follower_handle: string
          follower_id: string
          following_handle: string
          following_id: string
          id: string
          status: Database["public"]["Enums"]["follow_status"] | null
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          follower_handle: string
          follower_id: string
          following_handle: string
          following_id: string
          id?: string
          status?: Database["public"]["Enums"]["follow_status"] | null
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          follower_handle?: string
          follower_id?: string
          following_handle?: string
          following_id?: string
          id?: string
          status?: Database["public"]["Enums"]["follow_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_handle_fkey"
            columns: ["follower_handle"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["handle"]
          },
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follows_following_handle_fkey"
            columns: ["following_handle"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["handle"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
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
          avatar_url?: string | null
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
          avatar_url?: string | null
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
          name: string
          workout_id: string
        }
        Insert: {
          exercise_id: string
          id?: string
          name: string
          workout_id: string
        }
        Update: {
          exercise_id?: string
          id?: string
          name?: string
          workout_id?: string
        }
        Relationships: [
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
          user_handle: string
        }
        Insert: {
          ended?: string
          id?: string
          started: string
          title?: string | null
          user_handle: string
        }
        Update: {
          ended?: string
          id?: string
          started?: string
          title?: string | null
          user_handle?: string
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_handle_fkey"
            columns: ["user_handle"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["handle"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_workout_with_exercises_and_sets: {
        Args: {
          p_started: string
          p_user_handle: string
          p_exercises: Json[]
          p_sets: Json[]
          p_title?: string
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
          handle: string
          current_workout_ended: string
        }
        Returns: {
          set_id: string
        }[]
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
      follow_status: "pending" | "accepted"
      measurement_system: "metric" | "imperial"
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
