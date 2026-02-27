"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Leaderboard from "@/components/Leaderboard";
import Link from "next/link";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'global' | 'friends' | 'modules'>('global');
  const [selectedModule, setSelectedModule] = useState<string>('');

  const modules = [
    { id: 'mes-01', name: 'Lua desde Cero' },
    { id: 'mes-02', name: 'POO + UE5' },
    { id: 'mes-03', name: 'Blueprints ↔ Lua' },
    { id: 'mes-04', name: 'Inventario y Stats' },
    { id: 'mes-05', name: 'Diálogos e UI' },
    { id: 'mes-06', name: 'IA de NPCs' },
    { id: 'mes-07', name: 'Multijugador' },
    { id: 'mes-08', name: 'Optimización' },
    { id: 'mes-09', name: 'Sistemas Avanzados' },
    { id: 'mes-10', name: 'Arquitectura' },
    { id: 'mes-11', name: 'Producción' },
    { id: 'mes-12', name: 'Portfolio' }
  ];

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
          <h1 className="text-4xl font-bold text-white mb-2">
            🏆 Tablas de Clasificación
          </h1>
          <p className="text-slate-400">
            Compite con otros estudiantes y sube en el ranking
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'global'
                ? "bg-slate-700 text-white border-b-2 border-blue-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🌍 Global
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'friends'
                ? "bg-slate-700 text-white border-b-2 border-blue-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            👥 Amigos
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'modules'
                ? "bg-slate-700 text-white border-b-2 border-blue-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📚 Por Módulo
          </button>
        </div>

        {/* Contenido */}
        {activeTab === 'global' && (
          <div className="max-w-4xl mx-auto">
            <Leaderboard userId="student-123" />
            
            {/* Info Box */}
            <div className="mt-6 bg-blue-900/20 border border-blue-600/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-200 mb-2">
                💡 ¿Cómo subir en el ranking?
              </h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Completa ejercicios para ganar XP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Obtén buenas calificaciones en quizzes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Mantén tu racha diaria</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Desbloquea insignias para XP extra</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="max-w-4xl mx-auto">
            <Leaderboard userId="student-123" compact />
            
            <div className="mt-6 text-center">
              <p className="text-slate-400 mb-4">
                👥 Invita amigos para competir con ellos
              </p>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                Invitar Amigos
              </button>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="max-w-4xl mx-auto">
            {/* Selector de Módulo */}
            <div className="mb-6">
              <label className="block text-sm text-slate-400 mb-2">
                Selecciona un módulo:
              </label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">-- Seleccionar módulo --</option>
                {modules.map(module => (
                  <option key={module.id} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Leaderboard del Módulo */}
            {selectedModule ? (
              <Leaderboard userId="student-123" moduleId={selectedModule} />
            ) : (
              <div className="text-center py-12 bg-slate-800 border border-slate-700 rounded-lg">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-slate-400">
                  Selecciona un módulo para ver el ranking
                </p>
              </div>
            )}
          </div>
        )}

        {/* Stats Globales */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border border-yellow-600/30 rounded-lg p-6">
            <div className="text-3xl mb-2">🥇</div>
            <div className="text-2xl font-bold text-yellow-400">1,234</div>
            <div className="text-sm text-slate-400">Estudiantes Activos</div>
          </div>
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-600/30 rounded-lg p-6">
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-2xl font-bold text-purple-400">5,678</div>
            <div className="text-sm text-slate-400">Certificados Emitidos</div>
          </div>
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-600/30 rounded-lg p-6">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-green-400">10,234</div>
            <div className="text-sm text-slate-400">Ejercicios Completados</div>
          </div>
        </div>
      </div>
    </div>
  );
}
