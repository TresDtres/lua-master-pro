"use client";

import Link from "next/link";
import { Module } from "@/types";

interface EnhancedModuleCardProps {
  module: Module;
  completed: boolean;
  phase: number;
  progress?: number;
}

export default function EnhancedModuleCard({
  module,
  completed,
  phase,
  progress = 0,
}: EnhancedModuleCardProps) {
  const difficultyColors: Record<string, string> = {
    beginner: "from-green-500 to-green-600",
    intermediate: "from-blue-500 to-blue-600",
    advanced: "from-purple-500 to-purple-600",
    expert: "from-red-500 to-red-600",
  };

  return (
    <div className="group relative">
      <Link href={`/course/${module.id}`}>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-slate-600 rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl h-full">
          {/* Header with difficulty badge */}
          <div className={`h-2 bg-gradient-to-r ${difficultyColors[module.difficulty]}`}></div>

          {/* Content */}
          <div className="p-5">
            {/* Module Title */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-400 transition">
                  {module.title}
                </h3>
                <p className="text-slate-400 text-xs">
                  Mes {module.monthNumber} • Fase {phase}
                </p>
              </div>
              {completed && (
                <div className="text-xl">✓</div>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm mb-4 line-clamp-2 h-10">
              {module.description}
            </p>

            {/* Learning Objectives Preview */}
            <div className="mb-4">
              <div className="text-xs text-slate-400 font-semibold mb-2">Objetivos:</div>
              {module.objectives && module.objectives.slice(0, 2).map((obj: string, idx: number) => (
                <div key={idx} className="text-xs text-slate-300 mb-1">
                  • {obj.substring(0, 40)}...
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-xs text-slate-400">Progreso</span>
                <span className="text-xs text-blue-400 font-semibold">{progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Difficulty badge */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${
                  difficultyColors[module.difficulty]
                } text-white`}
              >
                {module.difficulty === "beginner"
                  ? "🟢 Principiante"
                  : module.difficulty === "intermediate"
                  ? "🟡 Intermedio"
                  : module.difficulty === "advanced"
                  ? "🟣 Avanzado"
                  : "🔴 Experto"}
              </span>

              <span className="text-xs text-slate-400">
                {module.duration || "Flexible"}
              </span>
            </div>
          </div>

          {/* Hover Overlay Button */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
              Abrir módulo
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
