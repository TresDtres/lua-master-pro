// ============================================
// SUPABASE DATABASE TYPES
// ============================================
// Generated types for Lua Master Pro database

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          avatar: string | null
          bio: string | null
          location: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          avatar?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          avatar?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          module_id: string
          exercises_completed: number
          total_exercises: number
          quiz_score: number | null
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          exercises_completed?: number
          total_exercises: number
          quiz_score?: number | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          exercises_completed?: number
          total_exercises?: number
          quiz_score?: number | null
          completed?: boolean
          completed_at?: string | null
          updated_at?: string
        }
      }
      user_exercises: {
        Row: {
          id: string
          user_id: string
          exercise_id: string
          difficulty: string
          attempts: number
          xp_earned: number
          hints_used: number
          completed: boolean
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          exercise_id: string
          difficulty: string
          attempts?: number
          xp_earned?: number
          hints_used?: number
          completed?: boolean
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          exercise_id?: string
          difficulty?: string
          attempts?: number
          xp_earned?: number
          hints_used?: number
          completed?: boolean
          completed_at?: string
          created_at?: string
        }
      }
      user_quizzes: {
        Row: {
          id: string
          user_id: string
          module_id: string
          score: number
          xp_earned: number
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          module_id: string
          score: number
          xp_earned?: number
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          module_id?: string
          score?: number
          xp_earned?: number
          completed_at?: string
          created_at?: string
        }
      }
      user_lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          module_id: string
          completed: boolean
          theory_read: boolean
          examples_viewed: number
          interactive_executed: boolean
          exercise_completed: boolean
          exercise_attempts: number
          xp_earned: number
          started_at: string
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          module_id: string
          completed?: boolean
          theory_read?: boolean
          examples_viewed?: number
          interactive_executed?: boolean
          exercise_completed?: boolean
          exercise_attempts?: number
          xp_earned?: number
          started_at?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          module_id?: string
          completed?: boolean
          theory_read?: boolean
          examples_viewed?: number
          interactive_executed?: boolean
          exercise_completed?: boolean
          exercise_attempts?: number
          xp_earned?: number
          started_at?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_gamification: {
        Row: {
          id: string
          user_id: string
          total_xp: number
          current_level: number
          xp_in_level: number
          xp_needed: number
          badges: string[]
          streaks_current: number
          streaks_longest: number
          last_activity_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_xp?: number
          current_level?: number
          xp_in_level?: number
          xp_needed?: number
          badges?: string[]
          streaks_current?: number
          streaks_longest?: number
          last_activity_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_xp?: number
          current_level?: number
          xp_in_level?: number
          xp_needed?: number
          badges?: string[]
          streaks_current?: number
          streaks_longest?: number
          last_activity_date?: string | null
          updated_at?: string
        }
      }
      user_activity: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          title: string
          description: string
          xp_earned: number
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          title: string
          description: string
          xp_earned?: number
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          title?: string
          description?: string
          xp_earned?: number
          metadata?: Json | null
          created_at?: string
        }
      }
      project_submissions: {
        Row: {
          id: string
          user_id: string
          username: string
          user_avatar: string | null
          module_id: string
          module_name: string
          title: string
          description: string
          github_url: string | null
          demo_url: string | null
          files: Json
          status: string
          feedback: string | null
          rating: number | null
          views: number
          likes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username: string
          user_avatar?: string | null
          module_id: string
          module_name: string
          title: string
          description: string
          github_url?: string | null
          demo_url?: string | null
          files?: Json
          status?: string
          feedback?: string | null
          rating?: number | null
          views?: number
          likes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string
          user_avatar?: string | null
          module_id?: string
          module_name?: string
          title?: string
          description?: string
          github_url?: string | null
          demo_url?: string | null
          files?: Json
          status?: string
          feedback?: string | null
          rating?: number | null
          views?: number
          likes?: number
          created_at?: string
          updated_at?: string
        }
      }
      project_likes: {
        Row: {
          id: string
          project_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          created_at?: string
        }
      }
      project_reviews: {
        Row: {
          id: string
          project_id: string
          reviewer_id: string
          reviewer_name: string
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          reviewer_id: string
          reviewer_name: string
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          reviewer_id?: string
          reviewer_name?: string
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          user_id: string
          username: string
          module_id: string
          module_name: string
          certificate_number: string
          issued_date: string
          grade: number
          instructor: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username: string
          module_id: string
          module_name: string
          certificate_number: string
          issued_date?: string
          grade: number
          instructor?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string
          module_id?: string
          module_name?: string
          certificate_number?: string
          issued_date?: string
          grade?: number
          instructor?: string
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {
      get_user_stats: {
        Args: { user_uuid: string }
        Returns: {
          total_exercises: number
          total_quizzes: number
          total_xp: number
          current_level: number
          badges_count: number
          modules_completed: number
        }[]
      }
      get_leaderboard: {
        Args: { limit_count?: number }
        Returns: {
          user_id: string
          username: string
          avatar: string
          total_xp: number
          current_level: number
          rank: number
        }[]
      }
    }
    Enums: {}
  }
}
