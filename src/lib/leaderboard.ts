// ============================================
// SISTEMA DE TABLAS DE CLASIFICACIÓN (LEADERBOARDS)
// ============================================

import { supabase, isSupabaseConfigured } from './supabase';

// ============================================
// TIPOS DE DATOS
// ============================================

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  avatar?: string;
  total_xp: number;
  current_level: number;
  badges_count: number;
  modules_completed: number;
  exercises_completed: number;
  country?: string;
  is_current_user?: boolean;
}

export interface LeaderboardFilters {
  timeRange: 'weekly' | 'monthly' | 'alltime';
  moduleId?: string;
  country?: string;
  limit?: number;
}

// ============================================
// SERVICIO DE LEADERBOARDS
// ============================================

export const LeaderboardService = {
  /**
   * Obtener leaderboard global
   */
  async getGlobalLeaderboard(filters: LeaderboardFilters = { timeRange: 'alltime', limit: 100 }) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // Usar función SQL get_leaderboard si existe
      const { data, error } = await (supabase as any)
        .rpc('get_leaderboard', { limit_count: filters.limit || 100 });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      // Fallback: obtener datos manualmente
      return this.getLeaderboardFallback(filters);
    }
  },

  /**
   * Fallback cuando no existe la función SQL
   */
  async getLeaderboardFallback(filters: LeaderboardFilters) {
    try {
      // Obtener gamificación de todos los usuarios
      const { data: gamification, error: gamError } = await (supabase as any)
        .from('user_gamification')
        .select('user_id, total_xp, current_level, badges, streaks_current')
        .order('total_xp', { ascending: false })
        .limit(filters.limit || 100);

      if (gamError) throw gamError;

      // Obtener información de usuarios
      const userIds = gamification.map((g: any) => g.user_id);
      
      const { data: users } = await (supabase as any)
        .from('users')
        .select('id, username, avatar, location')
        .in('id', userIds);

      // Obtener progreso de módulos
      const { data: progress } = await (supabase as any)
        .from('user_progress')
        .select('user_id, completed')
        .in('user_id', userIds);

      // Combinar datos
      const leaderboard = gamification.map((g: any, index: number) => {
        const user = users?.find((u: any) => u.id === g.user_id);
        const userProgress = progress?.filter((p: any) => p.user_id === g.user_id);
        const modulesCompleted = userProgress?.filter((p: any) => p.completed).length || 0;

        return {
          rank: index + 1,
          user_id: g.user_id,
          username: user?.username || 'Unknown',
          avatar: user?.avatar,
          total_xp: g.total_xp,
          current_level: g.current_level,
          badges_count: g.badges?.length || 0,
          modules_completed: modulesCompleted,
          exercises_completed: 0, // Se puede calcular si hay tabla
          country: user?.location?.split(',').pop()?.trim(),
          streak: g.streaks_current
        };
      });

      return { success: true, data: leaderboard };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener posición de un usuario en el leaderboard
   */
  async getUserRank(userId: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // Obtener XP del usuario
      const { data: userGamification } = await (supabase as any)
        .from('user_gamification')
        .select('total_xp')
        .eq('user_id', userId)
        .single();

      if (!userGamification) {
        return { success: false, error: "Usuario no encontrado" };
      }

      // Contar cuántos usuarios tienen más XP
      const { data: usersAbove } = await (supabase as any)
        .from('user_gamification')
        .select('user_id', { count: 'exact' })
        .gt('total_xp', userGamification.total_xp);

      const rank = (usersAbove?.length || 0) + 1;

      return {
        success: true,
        data: {
          rank,
          total_xp: userGamification.total_xp,
          total_users: (usersAbove?.length || 0) + 1
        }
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener leaderboard de amigos
   */
  async getFriendsLeaderboard(userId: string, limit: number = 20) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // En una implementación real, obtener amigos de una tabla friends
      // Por ahora, leaderboard global limitado
      return await this.getGlobalLeaderboard({ timeRange: 'alltime', limit });
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener leaderboard por módulo
   */
  async getModuleLeaderboard(moduleId: string, limit: number = 50) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // Obtener usuarios que completaron este módulo
      const { data: progress } = await (supabase as any)
        .from('user_progress')
        .select('user_id, quiz_score, completed_at')
        .eq('module_id', moduleId)
        .eq('completed', true)
        .order('quiz_score', { ascending: false })
        .limit(limit);

      if (!progress || progress.length === 0) {
        return { success: true, data: [] };
      }

      // Obtener información de usuarios
      const userIds = progress.map((p: any) => p.user_id);
      
      const { data: users } = await (supabase as any)
        .from('users')
        .select('id, username, avatar')
        .in('id', userIds);

      // Obtener XP de usuarios
      const { data: gamification } = await (supabase as any)
        .from('user_gamification')
        .select('user_id, total_xp, current_level')
        .in('user_id', userIds);

      // Combinar datos
      const leaderboard = progress.map((p: any, index: number) => {
        const user = users?.find((u: any) => u.id === p.user_id);
        const userGamification = gamification?.find((g: any) => g.user_id === p.user_id);

        return {
          rank: index + 1,
          user_id: p.user_id,
          username: user?.username || 'Unknown',
          avatar: user?.avatar,
          module_score: p.quiz_score,
          completed_at: p.completed_at,
          total_xp: userGamification?.total_xp || 0,
          current_level: userGamification?.current_level || 1
        };
      });

      return { success: true, data: leaderboard };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener tendencias (usuarios que más XP ganaron recientemente)
   */
  async getTrendingUsers(limit: number = 10) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // Obtener actividad reciente
      const { data: activity } = await (supabase as any)
        .from('user_activity')
        .select('user_id, xp_earned, created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Última semana
        .order('created_at', { ascending: false });

      if (!activity || activity.length === 0) {
        return { success: true, data: [] };
      }

      // Agrupar por usuario y sumar XP
      const userXP: Record<string, number> = {};
      activity.forEach((a: any) => {
        userXP[a.user_id] = (userXP[a.user_id] || 0) + a.xp_earned;
      });

      // Ordenar por XP ganada
      const sorted = Object.entries(userXP)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit);

      // Obtener información de usuarios
      const userIds = sorted.map(([id]) => id);
      
      const { data: users } = await (supabase as any)
        .from('users')
        .select('id, username, avatar')
        .in('id', userIds);

      const leaderboard = sorted.map(([userId, xp], index) => {
        const user = users?.find((u: any) => u.id === userId);
        
        return {
          rank: index + 1,
          user_id: userId,
          username: user?.username || 'Unknown',
          avatar: user?.avatar,
          weekly_xp: xp,
          trend: 'up' // Se puede calcular comparando con la semana anterior
        };
      });

      return { success: true, data: leaderboard };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Registrar actividad para leaderboard
   */
  async logActivity(userId: string, activityType: string, xpEarned: number, metadata?: any) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('user_activity')
        .insert({
          user_id: userId,
          activity_type: activityType,
          title: `Actividad de ${activityType}`,
          description: `Ganaste ${xpEarned} XP`,
          xp_earned: xpEarned,
          metadata: metadata || {},
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};

// ============================================
// UTILIDADES
// ============================================

/**
 * Obtener medalla por rank
 */
export function getRankMedal(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  if (rank <= 10) return '🏆';
  if (rank <= 50) return '⭐';
  return '🎖️';
}

/**
 * Obtener color por rank
 */
export function getRankColor(rank: number): string {
  if (rank === 1) return 'text-yellow-400';
  if (rank === 2) return 'text-gray-300';
  if (rank === 3) return 'text-amber-600';
  if (rank <= 10) return 'text-purple-400';
  if (rank <= 50) return 'text-blue-400';
  return 'text-slate-400';
}

/**
 * Formatear número con separadores
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export default {
  LeaderboardService,
  getRankMedal,
  getRankColor,
  formatNumber
};
