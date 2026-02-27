"use client";

import { useState, useEffect } from "react";
import { LevelSystem, BadgeSystem, GamificationTracker, Badge } from "@/lib/gamification";

interface UserProfile {
  userId: string;
  username: string;
  email: string;
  joinDate: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
}

interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  completed: boolean;
  exercisesCompleted: number;
  totalExercises: number;
  quizScore?: number;
  completedAt?: string;
}

interface ActivityItem {
  id: string;
  type: "exercise" | "quiz" | "badge" | "level";
  title: string;
  description: string;
  xpEarned: number;
  timestamp: string;
}

interface UserProfileProps {
  userId: string;
}

export default function UserProfilePanel({ userId }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "modules" | "activity" | "settings">("overview");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [gamification, setGamification] = useState<any>(null);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // Cargar datos del perfil
  useEffect(() => {
    // Datos mock - en producción vendrían del backend
    setProfile({
      userId,
      username: "Estudiante Lua",
      email: "student@example.com",
      joinDate: "2026-02-01",
      bio: "Aprendiendo Lua para desarrollo de juegos",
      location: "España",
      website: ""
    });

    // Cargar gamificación
    const tracker = new GamificationTracker(userId);
    setGamification(tracker.getProgress());

    // Cargar progreso de módulos
    const modules: ModuleProgress[] = [
      { moduleId: "mes-01", moduleName: "Lua desde Cero", completed: true, exercisesCompleted: 16, totalExercises: 16, quizScore: 93, completedAt: "2026-02-05" },
      { moduleId: "mes-02", moduleName: "POO + UE5", completed: true, exercisesCompleted: 9, totalExercises: 9, quizScore: 87, completedAt: "2026-02-10" },
      { moduleId: "mes-03", moduleName: "Blueprints ↔ Lua", completed: false, exercisesCompleted: 5, totalExercises: 9, quizScore: undefined },
      { moduleId: "mes-04", moduleName: "Inventario y Stats", completed: false, exercisesCompleted: 0, totalExercises: 12 },
      { moduleId: "mes-05", moduleName: "Diálogos e UI", completed: false, exercisesCompleted: 0, totalExercises: 12 },
      { moduleId: "mes-06", moduleName: "IA de NPCs", completed: false, exercisesCompleted: 0, totalExercises: 12 },
      { moduleId: "mes-07", moduleName: "Multijugador", completed: false, exercisesCompleted: 0, totalExercises: 12 },
      { moduleId: "mes-08", moduleName: "Optimización", completed: false, exercisesCompleted: 0, totalExercises: 12 },
      { moduleId: "mes-09", moduleName: "Sistemas Avanzados", completed: false, exercisesCompleted: 0, totalExercises: 12 },
      { moduleId: "mes-10", moduleName: "Arquitectura", completed: false, exercisesCompleted: 0, totalExercises: 12 },
      { moduleId: "mes-11", moduleName: "Producción", completed: false, exercisesCompleted: 0, totalExercises: 12 },
      { moduleId: "mes-12", moduleName: "Portfolio", completed: false, exercisesCompleted: 0, totalExercises: 12 },
    ];
    setModuleProgress(modules);

    // Actividad reciente
    const recentActivity: ActivityItem[] = [
      { id: "1", type: "exercise", title: "Ejercicio completado", description: "Crear Función Simple (Mes 01)", xpEarned: 45, timestamp: "2026-02-15T10:30:00" },
      { id: "2", type: "quiz", title: "Quiz completado", description: "Mes 01 - Lua desde Cero", xpEarned: 93, timestamp: "2026-02-15T11:00:00" },
      { id: "3", type: "badge", title: "Insignia desbloqueada", description: "Primeros Pasos", xpEarned: 50, timestamp: "2026-02-15T11:05:00" },
      { id: "4", type: "level", title: "¡Nivel 2!", description: "Ahora eres Aprendiz", xpEarned: 0, timestamp: "2026-02-15T11:05:00" },
      { id: "5", type: "exercise", title: "Ejercicio completado", description: "Concatenar Strings (Mes 01)", xpEarned: 35, timestamp: "2026-02-15T12:00:00" },
    ];
    setActivity(recentActivity);
  }, [userId]);

  if (!profile || !gamification) {
    return <div>Cargando perfil...</div>;
  }

  const totalModulesCompleted = moduleProgress.filter(m => m.completed).length;
  const totalExercisesCompleted = moduleProgress.reduce((sum, m) => sum + m.exercisesCompleted, 0);
  const totalExercises = moduleProgress.reduce((sum, m) => sum + m.totalExercises, 0);
  const overallProgress = Math.floor((totalExercisesCompleted / totalExercises) * 100);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      {/* Header del Perfil */}
      <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-8 border-b border-slate-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl border-4 border-white/20">
                {profile.avatar || "👤"}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-slate-800 rounded-full w-6 h-6"></div>
            </div>

            {/* Info Básica */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{profile.username}</h2>
              <p className="text-slate-400 mb-2">{profile.bio}</p>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>📍 {profile.location}</span>
                <span>📅 Miembro desde {new Date(profile.joinDate).toLocaleDateString('es-ES')}</span>
              </div>
            </div>
          </div>

          {/* Nivel y XP */}
          <div className="text-right">
            <div className={`text-5xl mb-2 ${LevelSystem.getLevelColor(gamification.currentLevel)}`}>
              {LevelSystem.getLevelBadge(gamification.currentLevel)}
            </div>
            <div className={`text-xl font-bold ${LevelSystem.getLevelColor(gamification.currentLevel)}`}>
              {LevelSystem.getLevelTitle(gamification.currentLevel)}
            </div>
            <div className="text-slate-400 text-sm">Nivel {gamification.currentLevel}</div>
            <div className="text-yellow-400 font-bold mt-1">
              {gamification.totalXP.toLocaleString()} XP
            </div>
          </div>
        </div>

        {/* Barra de Progreso General */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-300">Progreso del Curso</span>
            <span className="text-blue-400 font-semibold">{overallProgress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden border border-slate-600">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-blue-600 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {totalExercisesCompleted} / {totalExercises} ejercicios completados
          </div>
        </div>
      </div>

      {/* Tabs de Navegación */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 px-6 py-3 font-semibold transition ${
            activeTab === "overview"
              ? "bg-slate-700 text-white border-b-2 border-blue-500"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          📊 Resumen
        </button>
        <button
          onClick={() => setActiveTab("modules")}
          className={`flex-1 px-6 py-3 font-semibold transition ${
            activeTab === "modules"
              ? "bg-slate-700 text-white border-b-2 border-blue-500"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          📚 Módulos
        </button>
        <button
          onClick={() => setActiveTab("activity")}
          className={`flex-1 px-6 py-3 font-semibold transition ${
            activeTab === "activity"
              ? "bg-slate-700 text-white border-b-2 border-blue-500"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          📜 Actividad
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex-1 px-6 py-3 font-semibold transition ${
            activeTab === "settings"
              ? "bg-slate-700 text-white border-b-2 border-blue-500"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          ⚙️ Configuración
        </button>
      </div>

      {/* Contenido de las Tabs */}
      <div className="p-6">
        {/* Tab: Resumen */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-green-400">{totalExercisesCompleted}</div>
                <div className="text-sm text-slate-400">Ejercicios</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-blue-400">{gamification.completedQuizzes.length}</div>
                <div className="text-sm text-slate-400">Quizzes</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-purple-400">{gamification.badges.length}</div>
                <div className="text-sm text-slate-400">Insignias</div>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-orange-400">{totalModulesCompleted}</div>
                <div className="text-sm text-slate-400">Módulos</div>
              </div>
            </div>

            {/* Insignias Recientes */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">🏅 Insignias Recientes</h3>
              {gamification.badges.length === 0 ? (
                <p className="text-slate-400 text-sm">Aún no tienes insignias. ¡Completa ejercicios para desbloquear!</p>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {gamification.badges.slice(0, 5).map((badge: Badge) => (
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
            </div>

            {/* Módulos Completados */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">📚 Módulos Completados</h3>
              <div className="space-y-2">
                {moduleProgress.filter(m => m.completed).map(module => (
                  <div key={module.moduleId} className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{module.moduleName}</div>
                      <div className="text-xs text-slate-400">Completado el {new Date(module.completedAt!).toLocaleDateString('es-ES')}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">✓ Completado</div>
                      <div className="text-xs text-slate-400">Quiz: {module.quizScore}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Módulos */}
        {activeTab === "modules" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">📚 Progreso por Módulo</h3>
            {moduleProgress.map(module => (
              <div key={module.moduleId} className={`p-4 rounded-lg border ${module.completed ? 'bg-green-900/20 border-green-600' : 'bg-slate-900 border-slate-700'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-white">{module.moduleName}</div>
                  {module.completed ? (
                    <span className="text-green-400 font-bold">✓ Completado</span>
                  ) : (
                    <span className="text-blue-400">{Math.floor((module.exercisesCompleted / module.totalExercises) * 100)}%</span>
                  )}
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden mb-2">
                  <div
                    className={`h-full transition-all ${module.completed ? 'bg-green-600' : 'bg-blue-600'}`}
                    style={{ width: `${(module.exercisesCompleted / module.totalExercises) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-400">
                  {module.exercisesCompleted} / {module.totalExercises} ejercicios
                  {module.quizScore !== undefined && ` | Quiz: ${module.quizScore}%`}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Actividad */}
        {activeTab === "activity" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">📜 Actividad Reciente</h3>
            {activity.map(item => (
              <div key={item.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                  item.type === "exercise" ? "bg-green-900/50" :
                  item.type === "quiz" ? "bg-blue-900/50" :
                  item.type === "badge" ? "bg-purple-900/50" :
                  "bg-yellow-900/50"
                }`}>
                  {item.type === "exercise" ? "💪" :
                   item.type === "quiz" ? "📝" :
                   item.type === "badge" ? "🏅" :
                   "⬆️"}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{item.title}</div>
                  <div className="text-sm text-slate-400">{item.description}</div>
                </div>
                <div className="text-right">
                  {item.xpEarned > 0 && (
                    <div className="text-yellow-400 font-bold">+{item.xpEarned} XP</div>
                  )}
                  <div className="text-xs text-slate-500">
                    {new Date(item.timestamp).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Configuración */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-4">⚙️ Configuración del Perfil</h3>
            
            {/* Información Personal */}
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-white mb-4">Información Personal</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Username</label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({...profile, username: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Ubicación</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Website</label>
                    <input
                      type="text"
                      value={profile.website}
                      onChange={(e) => setProfile({...profile, website: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preferencias */}
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
              <h4 className="font-semibold text-white mb-4">Preferencias</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Notificaciones por Email</div>
                    <div className="text-sm text-slate-400">Recibir emails sobre tu progreso</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Modo Oscuro</div>
                    <div className="text-sm text-slate-400">Tema oscuro por defecto</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                {isEditing ? "Cancelar" : "Guardar Cambios"}
              </button>
              <button
                onClick={() => {}}
                className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
              >
                Exportar Datos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
