"use client";

import { useEffect, useState, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

/**
 * Hook personalizado para manejar autenticación
 * Proporciona estado del usuario y métodos de auth
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al montar
  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (mounted) {
          setUser(data?.user ?? null);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadUser();

    // Escuchar cambios de auth
    const authSubscription = supabase.auth.onAuthStateChange((_: any, session: any) => {
      if (mounted && session) {
        setUser(session.user);
      }
    });

    return () => {
      mounted = false;
      const sub: any = authSubscription;
      if (sub.subscription) {
        sub.subscription.unsubscribe();
      } else if (sub.data?.subscription) {
        sub.data.subscription.unsubscribe();
      }
    };
  }, []);

  // Iniciar sesión
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error instanceof Error ? error : null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error("Error al iniciar sesión") };
    }
  }, []);

  // Registrarse
  const signUp = useCallback(async (email: string, password: string, username: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      return { error: error instanceof Error ? error : null };
    } catch (error) {
      return { error: error instanceof Error ? error : new Error("Error al registrar") };
    }
  }, []);

  // Cerrar sesión
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  // Actualizar usuario
  const refreshUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data?.user ?? null);
  }, []);

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    refreshUser,
  };
}

export default useAuth;
