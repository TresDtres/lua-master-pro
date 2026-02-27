"use client";

import { useState, useEffect } from "react";
import { LeaderboardService, LeaderboardEntry, LeaderboardFilters, getRankMedal, getRankColor, formatNumber } from "@/lib/leaderboard";

interface LeaderboardProps {
  userId?: string;
  moduleId?: string;
  compact?: boolean;
}

export default function Leaderboard({ userId, moduleId, compact = false }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'weekly' | 'monthly' | 'alltime'>('alltime');
  const [userRank, setUserRank] = useState<any>(null);

  useEffect(() => {
    loadLeaderboard();
    if (userId) {
      loadUserRank();
    }
  }, [filter, moduleId]);

  const loadLeaderboard = async () => {
    setLoading(true);
    
    let result;
    if (moduleId) {
      result = await LeaderboardService.getModuleLeaderboard(moduleId);
    } else {
      result = await LeaderboardService.getGlobalLeaderboard({ 
        timeRange: filter, 
        limit: compact ? 10 : 50 
      });
    }

    if (result.success && result.data) {
      setLeaderboard(result.data);
    }
    setLoading(false);
  };

  const loadUserRank = async () => {
    if (!userId) return;
    
    const result = await LeaderboardService.getUserRank(userId);
    if (result.success && result.data) {
      setUserRank(result.data);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-2">⏳</div>
        <p className="text-slate-400">Cargando leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            🏆 {moduleId ? 'Ranking del Módulo' : 'Leaderboard Global'}
          </h3>
          
          {!moduleId && (
            <div className="flex gap-2">
              {(['weekly', 'monthly', 'alltime'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setFilter(range)}
                  className={`px-3 py-1 text-xs font-semibold rounded transition ${
                    filter === range
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:text-white"
                  }`}
                >
                  {range === 'weekly' ? '📅 Semana' : range === 'monthly' ? '📅 Mes' : '∞ Global'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Rank</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Estudiante</th>
              {!moduleId && (
                <>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Nivel</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">XP</th>
                </>
              )}
              {moduleId && (
                <>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Fecha</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan={moduleId ? 4 : 5} className="px-4 py-8 text-center text-slate-400">
                  📭 No hay datos aún
                </td>
              </tr>
            ) : (
              leaderboard.map((entry, index) => (
                <tr
                  key={entry.user_id}
                  className={`border-t border-slate-700 hover:bg-slate-700/30 transition ${
                    entry.user_id === userId ? 'bg-blue-900/20' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className={`text-lg font-bold ${getRankColor(entry.rank)}`}>
                      {getRankMedal(entry.rank)}
                    </span>
                    <span className="ml-2 text-slate-400">#{entry.rank}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm">
                        {entry.avatar || entry.username.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{entry.username}</div>
                        {entry.country && (
                          <div className="text-xs text-slate-400">🌍 {entry.country}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  {!moduleId ? (
                    <>
                      <td className="px-4 py-3">
                        <span className="text-blue-400 font-semibold">Nivel {entry.current_level}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-yellow-400 font-bold">{formatNumber(entry.total_xp)} XP</span>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${
                          (entry as any).module_score >= 90 ? 'text-green-400' :
                          (entry as any).module_score >= 70 ? 'text-blue-400' :
                          'text-slate-400'
                        }`}>
                          {(entry as any).module_score}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">
                        {new Date((entry as any).completed_at).toLocaleDateString('es-ES')}
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* User Rank Footer */}
      {userRank && (
        <div className="bg-slate-900/50 border-t border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Tu posición: <span className="text-blue-400 font-bold">#{userRank.rank}</span> de {userRank.total_users}
            </div>
            <div className="text-sm">
              <span className="text-yellow-400 font-bold">{formatNumber(userRank.total_xp)} XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Trending Section */}
      {!moduleId && filter === 'weekly' && leaderboard.length > 0 && (
        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-t border-green-600/30 p-4">
          <div className="flex items-center gap-2 text-green-400 text-sm font-semibold mb-2">
            <span>📈</span> Tendencia de la Semana
          </div>
          <div className="text-xs text-slate-400">
            {leaderboard[0]?.username} lidera con {formatNumber((leaderboard[0] as any).weekly_xp || 0)} XP esta semana
          </div>
        </div>
      )}
    </div>
  );
}
