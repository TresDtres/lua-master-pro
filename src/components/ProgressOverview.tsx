"use client";

interface ProgressOverviewProps {
  completedModules: number;
  totalModules: number;
  totalHours: number;
  currentStreak: number;
  accuracy: number;
  averageScore: number;
}

export default function ProgressOverview({
  completedModules,
  totalModules,
  totalHours,
  currentStreak,
  accuracy,
  averageScore,
}: ProgressOverviewProps) {
  const percentageComplete = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-white mb-4">Progreso General</h3>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-slate-300">Modules completados</span>
            <span className="text-blue-400 font-bold">
              {completedModules}/{totalModules}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-1000"
              style={{ width: `${percentageComplete}%` }}
            ></div>
          </div>
          <div className="text-sm text-slate-400 mt-2">{percentageComplete}% completado</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-slate-700 rounded p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{totalHours}</div>
            <div className="text-xs text-slate-400 mt-1">Horas</div>
          </div>

          <div className="bg-slate-700 rounded p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{currentStreak}🔥</div>
            <div className="text-xs text-slate-400 mt-1">Racha</div>
          </div>

          <div className="bg-slate-700 rounded p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{accuracy}%</div>
            <div className="text-xs text-slate-400 mt-1">Precisión</div>
          </div>

          <div className="bg-slate-700 rounded p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{averageScore}</div>
            <div className="text-xs text-slate-400 mt-1">Promedio</div>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Tu Ruta de Aprendizaje</h3>

        <div className="space-y-3">
          {[1, 2, 3, 4].map((phase) => (
            <div
              key={phase}
              className={`p-4 rounded-lg border-l-4 ${
                phase <= Math.ceil(completedModules / 3)
                  ? "bg-green-900 border-green-600"
                  : phase === Math.ceil(completedModules / 3) + 1
                  ? "bg-blue-900 border-blue-600"
                  : "bg-slate-700 border-slate-600"
              }`}
            >
              <div className="font-semibold text-white">
                Fase {phase}:{" "}
                {phase === 1
                  ? "Fundamentos"
                  : phase === 2
                  ? "Integración"
                  : phase === 3
                  ? "Avanzado"
                  : "Maestría"}
              </div>
              <div className="text-sm text-slate-300 mt-1">
                {phase <= Math.ceil(completedModules / 3)
                  ? "✓ Completada"
                  : phase === Math.ceil(completedModules / 3) + 1
                  ? "En progreso..."
                  : "Por comenzar"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Milestones */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">Próximos Hitos</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
            <span className="text-slate-300">Primera Certificación</span>
            <span className="text-blue-400 font-semibold">
              {3 - completedModules} módulos
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
            <span className="text-slate-300">Nivel 2</span>
            <span className="text-blue-400 font-semibold">
              {Math.max(0, 6 - completedModules)} módulos
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-900 rounded">
            <span className="text-slate-300">Proyecto Final</span>
            <span className="text-blue-400 font-semibold">
              {Math.max(0, 12 - completedModules)} módulos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
