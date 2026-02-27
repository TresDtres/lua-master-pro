"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import ProgressOverview from "@/components/ProgressOverview";
import Link from "next/link";

interface ErrorLog {
  id: string;
  date: string;
  module: string;
  errorType: string;
  description: string;
  severity: "low" | "medium" | "high";
  solved: boolean;
}

const MOCK_ERRORS: ErrorLog[] = [
  {
    id: "err1",
    date: "2026-02-20",
    module: "Mes 02 - API Roblox",
    errorType: "RuntimeError",
    description: "Error de tipo nil: entidad no existe",
    severity: "high",
    solved: false,
  },
  {
    id: "err2",
    date: "2026-02-19",
    module: "Mes 01 - Fundamentos Lua",
    errorType: "SyntaxError",
    description: "Esperado 'end' para cerrar tabla",
    severity: "medium",
    solved: true,
  },
  {
    id: "err3",
    date: "2026-02-18",
    module: "Mes 02 - API Roblox",
    errorType: "LogicError",
    description: "Bucle infinito detectado en función de renderizado",
    severity: "high",
    solved: true,
  },
];

export default function AnalyticsPage() {
  const [errors, setErrors] = useState<ErrorLog[]>(MOCK_ERRORS);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  const filteredErrors = selectedSeverity
    ? errors.filter((e) => e.severity === selectedSeverity)
    : errors;

  const solvedCount = errors.filter((e) => e.solved).length;
  const unsolvedCount = errors.filter((e) => !e.solved).length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-900 text-red-200 border-red-700";
      case "medium":
        return "bg-yellow-900 text-yellow-200 border-yellow-700";
      case "low":
        return "bg-green-900 text-green-200 border-green-700";
      default:
        return "bg-slate-700 text-slate-200 border-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />
      <ScrollToTop />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Análisis y Progreso</h1>
          <p className="text-slate-300">Monitorea tu desempeño, errores y analítica detallada</p>
        </div>

        {/* Progress Overview */}
        <div className="mb-12">
          <ProgressOverview
            completedModules={4}
            totalModules={12}
            totalHours={120}
            currentStreak={7}
            accuracy={82}
            averageScore={87}
          />
        </div>

        {/* Error Analysis Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{unsolvedCount}</div>
            <div className="text-slate-300">Errores Activos</div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{solvedCount}</div>
            <div className="text-slate-300">Errores Resueltos</div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {Math.round((solvedCount / (solvedCount + unsolvedCount)) * 100)}%
            </div>
            <div className="text-slate-300">Tasa de Resolución</div>
          </div>
        </div>

        {/* Error Logs */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Registro de Errores</h3>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSeverity(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedSeverity === null
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedSeverity("high")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedSeverity === "high"
                  ? "bg-red-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              🔴 Crítico
            </button>
            <button
              onClick={() => setSelectedSeverity("medium")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedSeverity === "medium"
                  ? "bg-yellow-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              🟡 Medio
            </button>
            <button
              onClick={() => setSelectedSeverity("low")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedSeverity === "low"
                  ? "bg-green-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              🟢 Bajo
            </button>
          </div>

          {/* Error List */}
          <div className="space-y-3">
            {filteredErrors.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                No hay errores con esta categoría
              </div>
            ) : (
              filteredErrors.map((error) => (
                <div
                  key={error.id}
                  className={`p-4 rounded-lg border-l-4 ${getSeverityColor(
                    error.severity
                  )} flex items-start justify-between hover:shadow-lg transition`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-sm">{error.errorType}</span>
                      <span className="text-xs">•</span>
                      <span className="text-xs">{error.date}</span>
                      {error.solved && <span className="text-xs bg-green-600 px-2 py-1 rounded">✓ Resuelto</span>}
                    </div>
                    <div className="text-xs opacity-75 mb-1">{error.module}</div>
                    <p className="text-sm">{error.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Desempeño por Módulo</h3>

          <div className="space-y-4">
            {[
              { name: "Mes 01 - Fundamentos Lua", score: 95, color: "from-green-500 to-green-600" },
              { name: "Mes 02 - Operadores", score: 88, color: "from-blue-500 to-blue-600" },
              { name: "Mes 03 - Tablas", score: 82, color: "from-purple-500 to-purple-600" },
              { name: "Mes 04 - Integración UE5", score: 75, color: "from-yellow-500 to-yellow-600" },
            ].map((module) => (
              <div key={module.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-semibold text-sm">{module.name}</span>
                  <span className="text-blue-400 font-bold">{module.score}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${module.color} h-full transition-all`}
                    style={{ width: `${module.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/quiz"
            className="bg-gradient-to-br from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg p-6 text-white transition transform hover:scale-105"
          >
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-bold mb-1">Hacer Quiz</h4>
            <p className="text-sm text-blue-100">Evalúa lo que has aprendido</p>
          </Link>

          <Link
            href="/exams"
            className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg p-6 text-white transition transform hover:scale-105"
          >
            <div className="text-2xl mb-2">🎓</div>
            <h4 className="font-bold mb-1">Exámenes</h4>
            <p className="text-sm text-purple-100">Prepárate con exámenes completos</p>
          </Link>

          <Link
            href="/dashboard"
            className="bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg p-6 text-white transition transform hover:scale-105"
          >
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-bold mb-1">Dashboard</h4>
            <p className="text-sm text-green-100">Continúa aprendiendo</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
