"use client";

import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { COURSE_DATA } from "@/lib/constants";

export default function QuizSelectionPage() {
  // Get all modules
  const allModules = COURSE_DATA.phases.flatMap((phase) => 
    phase.modules.map((module) => ({
      ...module,
      phaseNumber: phase.phaseNumber,
    }))
  );

  const completedQuizzes = ["mes-01"]; // Mock data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />
      <ScrollToTop />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">📝 Quiz del Curso</h1>
          <p className="text-slate-300">
            Selecciona el módulo para resolver el quiz y evaluar tu conocimiento
          </p>
        </div>

        {/* Quizzes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allModules.map((module) => {
            const isCompleted = completedQuizzes.includes(module.id);
            const quizLink = `/quiz/${module.id}`;

            return (
              <Link
                key={module.id}
                href={quizLink}
                className="group"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-600 rounded-lg p-6 transition transform hover:scale-105 hover:shadow-xl h-full">
                  {/* Header Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition mb-1">
                        {module.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        Fase {module.phaseNumber} • Mes {module.monthNumber}
                      </p>
                    </div>
                    {isCompleted && (
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ✓ Hecho
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2 h-10">
                    {module.description}
                  </p>

                  {/* Quiz Info */}
                  <div className="space-y-2 mb-4 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Preguntas:</span>
                      <span className="text-blue-400 font-semibold">10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiempo estimado:</span>
                      <span className="text-blue-400 font-semibold">15 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dificultad:</span>
                      <span className={`font-semibold ${
                        module.difficulty === "beginner"
                          ? "text-green-400"
                          : module.difficulty === "intermediate"
                          ? "text-yellow-400"
                          : module.difficulty === "advanced"
                          ? "text-orange-400"
                          : "text-red-400"
                      }`}>
                        {module.difficulty === "beginner"
                          ? "🟢 Fácil"
                          : module.difficulty === "intermediate"
                          ? "🟡 Medio"
                          : module.difficulty === "advanced"
                          ? "🟠 Avanzado"
                          : "🔴 Experto"}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition mt-4">
                    {isCompleted ? "Reintentar Quiz" : "Iniciar Quiz"} →
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-900/30 border border-blue-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-200 mb-3">💡 Información sobre Quiz</h3>
          <ul className="space-y-2 text-blue-100 text-sm">
            <li>• Cada quiz tiene 10 preguntas sobre el contenido del módulo</li>
            <li>• Tiempo estimado: 15-20 minutos por módulo</li>
            <li>• Puedes reintentar los quizzes tantas veces como quieras</li>
            <li>• Tu mejor puntuación será registrada</li>
            <li>• Necesitas 70% para pasar y obtener crédito del módulo</li>
          </ul>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
          >
            ← Volver al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
