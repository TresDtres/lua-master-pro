"use client";

import Navbar from "@/components/Navbar";
import UserProfilePanel from "@/components/UserProfilePanel";
import GamificationPanel from "@/components/GamificationPanel";
import Link from "next/link";

export default function ProfilePage() {
  const userId = "student-123"; // En producción, venir de la autenticación

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center mb-4"
          >
            ← Volver al Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Mi Perfil</h1>
          <p className="text-slate-400">
            Visualiza tu progreso, estadísticas y logros
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Columna Principal - Perfil */}
          <div className="lg:col-span-2">
            <UserProfilePanel userId={userId} />
          </div>

          {/* Columna Lateral - Gamificación */}
          <div className="space-y-6">
            <GamificationPanel userId={userId} />

            {/* Acciones Rápidas */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-4">🚀 Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition text-center"
                >
                  📚 Continuar Curso
                </Link>
                <Link
                  href="/quiz"
                  className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition text-center"
                >
                  📝 Hacer Quiz
                </Link>
                <Link
                  href="/editor"
                  className="block w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition text-center"
                >
                  💻 Practicar Código
                </Link>
              </div>
            </div>

            {/* Próximos Objetivos */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-4">🎯 Próximos Objetivos</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📚</div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Completar Mes 03</div>
                    <div className="text-xs text-slate-400">4 ejercicios restantes</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🔥</div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Mantener racha</div>
                    <div className="text-xs text-slate-400">2 días más para insignia</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏆</div>
                  <div className="flex-1">
                    <div className="text-sm text-white">Siguiente insignia</div>
                    <div className="text-xs text-slate-400">Empezando (2/10)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
