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
      profiles: {
        Row: {
          id: string
          username: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          created_at?: string
          updated_at?: string
        }
      }
      boards: {
        Row: {
          id: string
          name: string
          description: string | null
          type: 'saved' | 'instant'
          user_id: string
          created_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type: 'saved' | 'instant'
          user_id: string
          created_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: 'saved' | 'instant'
          user_id?: string
          created_at?: string
          expires_at?: string | null
        }
      }
      links: {
        Row: {
          id: string
          board_id: string
          url: string
          description: string | null
          visited: boolean
          deadline: string | null
          created_at: string
        }
        Insert: {
          id?: string
          board_id: string
          url: string
          description?: string | null
          visited?: boolean
          deadline?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          board_id?: string
          url?: string
          description?: string | null
          visited?: boolean
          deadline?: string | null
          created_at?: string
        }
      }
    }
  }
}