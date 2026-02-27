"use client";

import { useState, useEffect } from "react";
import { LevelSystem, BadgeSystem, GamificationTracker, Badge } from "@/lib/gamification";

interface GamificationPanelProps {
  userId: string;
  onXpEarned?: (xp: number) => void;
}

export default function GamificationPanel({ userId, onXpEarned }: GamificationPanelProps) {
  const [tracker, setTracker] = useState<GamificationTracker | null>(null);
  const [progress, setProgress] = useState<any>(null);
  const [showBadges, setShowBadges] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [levelUpAnimation, setLevelUpAnimation] = useState(false);

  useEffect(() => {
    // Inicializar tracker
    const newTracker = new GamificationTracker(userId);
    setTracker(newTracker);
    setProgress(newTracker.getProgress());
  }, [userId]);

  const addXp = (amount: number, source: string) => {
    if (!tracker) return;

    const result = tracker.addXp(amount, source);
    const newProgress = tracker.getProgress();
    setProgress(newProgress);
    onXpEarned?.(amount);

    if (result.leveledUp) {
      setLevelUpAnimation(true);
      setTimeout(() => setLevelUpAnimation(false), 3000);
    }
  };

  const completeExercise = (exerciseId: string, difficulty: string, attempts: number) => {
    if (!tracker) return 0;

    const xp = tracker.completeExercise(exerciseId, difficulty, attempts);
    const newProgress = tracker.getProgress();
    setProgress(newProgress);

    // Verificar nuevas insignias
    const badges = BadgeSystem.checkNewBadges(newProgress);
    if (badges.length > 0) {
      setNewBadges(badges);
    }

    return xp;
  };

  const completeQuiz = (moduleId: string, score: number) => {
    if (!tracker) return 0;

    const xp = tracker.completeQuiz(moduleId, score);
    const newProgress = tracker.getProgress();
    setProgress(newProgress);

    // Verificar nuevas insignias
    const badges = BadgeSystem.checkNewBadges(newProgress);
    if (badges.length > 0) {
      setNewBadges(badges);
    }

    return xp;
  };

  if (!progress) {
    return <div>Cargando progreso...</div>;
  }

  const levelProgress = LevelSystem.getLevelProgress(
    progress.xpInCurrentLevel,
    progress.xpNeededForNextLevel
  );

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      {/* Header con Nivel y XP */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 border-b border-slate-700">
        {levelUpAnimation && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 flex items-center justify-center z-50 animate-pulse">
            <div className="text-center">
              <div className="text-6xl mb-4">⬆️</div>
              <h2 className="text-3xl font-bold text-yellow-400">¡NIVEL {progress.currentLevel}!</h2>
              <p className="text-purple-300 mt-2">{LevelSystem.getLevelTitle(progress.currentLevel)}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Badge de Nivel */}
            <div className={`text-5xl ${LevelSystem.getLevelColor(progress.currentLevel)}`}>
              {LevelSystem.getLevelBadge(progress.currentLevel)}
            </div>

            {/* Info de Nivel */}
            <div>
              <h3 className={`text-2xl font-bold ${LevelSystem.getLevelColor(progress.currentLevel)}`}>
                Nivel {progress.currentLevel}
              </h3>
              <p className="text-slate-400 text-sm">
                {LevelSystem.getLevelTitle(progress.currentLevel)}
              </p>
            </div>
          </div>

          {/* XP Total */}
          <div className="text-right">
            <div className="text-3xl font-bold text-yellow-400">
              {progress.totalXP.toLocaleString()} XP
            </div>
            <div className="text-slate-400 text-sm">
              XP para siguiente nivel: {progress.xpNeededForNextLevel}
            </div>
          </div>
        </div>

        {/* Barra de Progreso de Nivel */}
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300">Progreso de Nivel</span>
            <span className="text-blue-400 font-semibold">{levelProgress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden border border-slate-600">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {progress.xpInCurrentLevel} / {progress.xpNeededForNextLevel} XP
          </div>
        </div>
      </div>

      {/* Stats Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-900/50">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{progress.completedExercises.length}</div>
          <div className="text-xs text-slate-400">Ejercicios</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{progress.completedQuizzes.length}</div>
          <div className="text-xs text-slate-400">Quizzes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{progress.badges.length}</div>
          <div className="text-xs text-slate-400">Insignias</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">{progress.streaks.currentDayStreak}🔥</div>
          <div className="text-xs text-slate-400">Racha Actual</div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex gap-2 p-4 border-t border-slate-700">
        <button
          onClick={() => setShowBadges(!showBadges)}
          className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition text-sm"
        >
          🏅 Insignias ({progress.badges.length})
        </button>
        <button
          onClick={() => setShowStats(!showStats)}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-sm"
        >
          📊 Estadísticas
        </button>
      </div>

      {/* Panel de Insignias */}
      {showBadges && (
        <div className="p-4 border-t border-slate-700 bg-slate-900/30">
          <h4 className="font-bold text-white mb-3">Tus Insignias</h4>
          
          {progress.badges.length === 0 ? (
            <p className="text-slate-400 text-sm">Aún no tienes insignias. ¡Completa ejercicios y quizzes para desbloquear!</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {progress.badges.map((badge: Badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-lg border-2 ${BadgeSystem.getRarityColor(badge.rarity)} text-center`}
                  title={badge.description}
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-semibold">{badge.name}</div>
                </div>
              ))}
            </div>
          )}

          {/* Insignias Bloqueadas */}
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-slate-400 mb-2">Próximas Insignias</h5>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {BadgeSystem.getAllBadges()
                .filter((b: Badge) => !progress.badges.some((pb: Badge) => pb.id === b.id))
                .slice(0, 4)
                .map((badge: Badge) => (
                  <div
                    key={badge.id}
                    className="p-2 rounded-lg border border-slate-600 bg-slate-800 text-center opacity-50"
                    title={badge.requirements.description}
                  >
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-xs text-slate-400">{badge.name}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Panel de Estadísticas */}
      {showStats && (
        <div className="p-4 border-t border-slate-700 bg-slate-900/30">
          <h4 className="font-bold text-white mb-3">Estadísticas Detalladas</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-400">Total Ejercicios</div>
              <div className="text-2xl font-bold text-green-400">{progress.stats.totalExercisesCompleted}</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-400">Total Quizzes</div>
              <div className="text-2xl font-bold text-blue-400">{progress.stats.totalQuizzesCompleted}</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-400">Promedio Quizzes</div>
              <div className="text-2xl font-bold text-purple-400">{progress.stats.averageQuizScore}%</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-400">Quizzes Perfectos</div>
              <div className="text-2xl font-bold text-yellow-400">{progress.stats.perfectQuizzes}</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-400">Racha Más Larga</div>
              <div className="text-2xl font-bold text-orange-400">{progress.streaks.longestDayStreak} días</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg">
              <div className="text-sm text-slate-400">Módulos Completados</div>
              <div className="text-2xl font-bold text-pink-400">{progress.stats.modulesCompleted}</div>
            </div>
          </div>

          {/* Ejercicios por Dificultad */}
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-slate-400 mb-2">Ejercicios por Dificultad</h5>
            <div className="flex gap-4">
              <div className="flex-1 bg-green-900/30 border border-green-600 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">{progress.stats.exercisesByDifficulty.beginner}</div>
                <div className="text-xs text-green-300">Principiante</div>
              </div>
              <div className="flex-1 bg-yellow-900/30 border border-yellow-600 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-400">{progress.stats.exercisesByDifficulty.intermediate}</div>
                <div className="text-xs text-yellow-300">Intermedio</div>
              </div>
              <div className="flex-1 bg-red-900/30 border border-red-600 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-red-400">{progress.stats.exercisesByDifficulty.advanced}</div>
                <div className="text-xs text-red-300">Avanzado</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notificación de Nueva Insignia */}
      {newBadges.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-600 to-purple-600 rounded-lg p-4 shadow-lg border-2 border-yellow-400">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{newBadges[0].icon}</div>
              <div>
                <div className="font-bold text-white">¡Nueva Insignia!</div>
                <div className="text-sm text-yellow-200">{newBadges[0].name}</div>
              </div>
            </div>
            <button
              onClick={() => setNewBadges([])}
              className="mt-2 text-xs text-white hover:text-yellow-200"
            >
              Click para cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
