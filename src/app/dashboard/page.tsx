"use client";

import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import PremiumReminder from "@/components/PremiumReminder";
import EnhancedModuleCard from "@/components/EnhancedModuleCard";
import { COURSE_DATA } from "@/lib/constants";
import Link from "next/link";
import { useState, useEffect } from "react";

interface UserProgress {
  completedModules: string[];
  currentModule?: string;
  isPremium: boolean;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<UserProgress>({
    completedModules: [],
    isPremium: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos del usuario (en producción vendría de la API/DB)
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setProgress({
            completedModules: userData.completedModules || [],
            currentModule: userData.currentModule,
            isPremium: userData.isPremium || false,
          });
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    );
  }

  const allModules = COURSE_DATA.phases.flatMap((phase) => phase.modules);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />
      <ScrollToTop />
      {!progress.isPremium && <PremiumReminder />}

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bienvenido, {user?.name || "Estudiante"}
          </h1>
          <p className="text-slate-400">
            Plan: <span className="font-semibold text-blue-400">
              {progress.isPremium ? "Premium" : "Gratuito"}
            </span>
          </p>

          {!progress.isPremium && (
            <div className="mt-4 p-4 bg-blue-900 border border-blue-700 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-blue-100 font-semibold">
                  Acceso limitado al plan gratuito
                </p>
                <p className="text-blue-200 text-sm">
                  Desbloquea todos los módulos con Premium
                </p>
              </div>
              <Link
                href="/pricing"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition whitespace-nowrap"
              >
                Actualizar
              </Link>
            </div>
          )}
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm font-semibold mb-2">
              Módulos Completados
            </div>
            <div className="text-3xl font-bold text-blue-400">
              {progress.completedModules.length}/{allModules.length}
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm font-semibold mb-2">
              Progreso Total
            </div>
            <div className="text-3xl font-bold text-green-400">
              {Math.round(
                (progress.completedModules.length / allModules.length) * 100
              )}
              %
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm font-semibold mb-2">
              Horas Invertidas
            </div>
            <div className="text-3xl font-bold text-purple-400">
              {progress.completedModules.length * 60}h
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm font-semibold mb-2">
              Proyectos
            </div>
            <div className="text-3xl font-bold text-cyan-400">
              {Math.floor(progress.completedModules.length / 3)}
            </div>
          </div>
        </div>

        {/* Current Module */}
        {progress.currentModule && (
          <div className="mb-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-8 border border-blue-400">
            <h2 className="text-2xl font-bold text-white mb-2">
              Continúa donde lo dejaste
            </h2>
            <p className="text-blue-100 mb-4">
              Módulo actual: {progress.currentModule}
            </p>
            <Link
              href={`/course/${progress.currentModule}`}
              className="inline-block px-6 py-3 bg-white hover:bg-blue-50 text-blue-600 rounded-lg font-semibold transition"
            >
              Continuar estudiando
            </Link>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-12">
          <Link
            href="/editor"
            className="group bg-gradient-to-br from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 border border-blue-700 hover:border-blue-600 rounded-lg p-4 transition transform hover:scale-105"
          >
            <div className="text-2xl mb-2">💻</div>
            <h3 className="text-sm font-bold text-white">Editor</h3>
            <p className="text-blue-200 text-xs">Códigoal</p>
          </Link>

          <Link
            href="/quiz"
            className="group bg-gradient-to-br from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 border border-purple-700 hover:border-purple-600 rounded-lg p-4 transition transform hover:scale-105"
          >
            <div className="text-2xl mb-2">📝</div>
            <h3 className="text-sm font-bold text-white">Quiz</h3>
            <p className="text-purple-200 text-xs">Practica</p>
          </Link>

          <Link
            href="/exams"
            className="group bg-gradient-to-br from-orange-900 to-orange-800 hover:from-orange-800 hover:to-orange-700 border border-orange-700 hover:border-orange-600 rounded-lg p-4 transition transform hover:scale-105"
          >
            <div className="text-2xl mb-2">🎓</div>
            <h3 className="text-sm font-bold text-white">Exámenes</h3>
            <p className="text-orange-200 text-xs">Evaluación</p>
          </Link>

          <Link
            href="/analytics"
            className="group bg-gradient-to-br from-cyan-900 to-cyan-800 hover:from-cyan-800 hover:to-cyan-700 border border-cyan-700 hover:border-cyan-600 rounded-lg p-4 transition transform hover:scale-105"
          >
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-sm font-bold text-white">Analytics</h3>
            <p className="text-cyan-200 text-xs">Progreso</p>
          </Link>

          <Link
            href="/chat"
            className="group bg-gradient-to-br from-green-900 to-green-800 hover:from-green-800 hover:to-green-700 border border-green-700 hover:border-green-600 rounded-lg p-4 transition transform hover:scale-105"
          >
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="text-sm font-bold text-white">Chat IA</h3>
            <p className="text-green-200 text-xs">Dudas</p>
          </Link>

          <Link
            href="/profile"
            className="group bg-gradient-to-br from-pink-900 to-pink-800 hover:from-pink-800 hover:to-pink-700 border border-pink-700 hover:border-pink-600 rounded-lg p-4 transition transform hover:scale-105"
          >
            <div className="text-2xl mb-2">👤</div>
            <h3 className="text-sm font-bold text-white">Perfil</h3>
            <p className="text-pink-200 text-xs">Mi cuenta</p>
          </Link>
        </div>

        {/* Modules Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Contenido del Curso
          </h2>

          {COURSE_DATA.phases.map((phase) => (
            <div key={phase.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {phase.phaseNumber}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {phase.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{phase.duration}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phase.modules.map((module) => {
                  const isCompleted = progress.completedModules.includes(
                    module.id
                  );
                  const isAccessible =
                    progress.isPremium ||
                    phase.phaseNumber === 1;

                  return (
                    <div
                      key={module.id}
                      className={
                        isAccessible ? "" : "opacity-50 pointer-events-none"
                      }
                    >
                      <EnhancedModuleCard
                        module={module}
                        completed={isCompleted}
                        phase={phase.phaseNumber}
                        progress={isCompleted ? 100 : Math.random() * 60}
                      />
                      {!isAccessible && (
                        <div className="mt-2 p-2 bg-yellow-900 border border-yellow-700 rounded text-yellow-200 text-xs text-center">
                          Solo para Premium
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
