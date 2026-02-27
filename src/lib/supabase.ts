// ============================================
// SUPABASE WRAPPER - Manejo seguro de null
// ============================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './supabase.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey !== 'placeholder-key';

// Cliente seguro que nunca es null
let _client: SupabaseClient<Database> | null = null;

if (isConfigured) {
  _client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
}

// Wrapper que maneja automáticamente el caso no configurado
export const supabase = {
  auth: {
    signUp: async (data: any) => {
      if (!_client) return { data: null, error: { message: "Supabase no configurado" } };
      return _client.auth.signUp(data);
    },
    signInWithPassword: async (data: any) => {
      if (!_client) return { data: null, error: { message: "Supabase no configurado" } };
      return _client.auth.signInWithPassword(data);
    },
    signOut: async () => {
      if (!_client) return { error: { message: "Supabase no configurado" } };
      return _client.auth.signOut();
    },
    getUser: async () => {
      if (!_client) return { data: { user: null }, error: null };
      return _client.auth.getUser();
    },
    onAuthStateChange: (callback: any) => {
      if (!_client) return { subscription: { unsubscribe: () => {} } };
      return _client.auth.onAuthStateChange(callback);
    },
    resetPasswordForEmail: async (email: string, options: any) => {
      if (!_client) return { error: { message: "Supabase no configurado" } };
      return _client.auth.resetPasswordForEmail(email, options);
    },
    updateUser: async (data: any) => {
      if (!_client) return { error: { message: "Supabase no configurado" } };
      return _client.auth.updateUser(data);
    }
  },
  from: (table: keyof Database['public']['Tables']) => {
    if (!_client) {
      return {
        select: () => ({ eq: () => ({ single: () => ({ data: null, error: null }) }) }),
        insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }) }),
        upsert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }),
        delete: () => ({ eq: () => ({ data: null, error: null }) })
      };
    }
    return _client.from(table as string);
  }
};

export const isSupabaseConfigured = isConfigured;
export { _client as supabaseClient };
