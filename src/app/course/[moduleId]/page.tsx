"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import MiniChat from "@/components/MiniChat";
import CodeEditor from "@/components/CodeEditor";
import ExerciseRunner, { Exercise } from "@/components/ExerciseRunner";
import Link from "next/link";
import { useState, useMemo } from "react";
import { getModuleContent } from "@/lib/moduleContent";
import { getExercisesByModuleAndLesson, mes01Exercises, mes02Exercises } from "@/lib/exercises";
import { module01Lessons } from "@/lib/lessons/mes-01";

export default function ModulePage() {
  const params = useParams();
  const moduleId = params?.moduleId as string;
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"content" | "editor" | "exercises">("content");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [totalXP, setTotalXP] = useState(0);

  const moduleContent = getModuleContent(moduleId);
  const currentLesson = moduleContent ? moduleContent.lessons[currentLessonIndex] : null;

  // Obtener ejercicios para la lección actual
  const currentLessonExercises = useMemo(() => {
    if (!currentLesson) return [];
    return getExercisesByModuleAndLesson(moduleId, currentLesson.id);
  }, [moduleId, currentLesson]);

  // Determinar el entorno basado en el módulo
  const getEnvironmentForModule = (): "lua" | "roblox" | "unlua" | "minecraft" => {
    if (!moduleId) return "lua";
    if (moduleId === "mes-01") return "lua";
    if (moduleId === "mes-02") return "unlua";
    if (moduleId === "mes-03") return "unlua";
    if (moduleId === "mes-04") return "unlua";
    if (moduleId === "mes-05") return "unlua";
    if (moduleId === "mes-06") return "unlua";
    return "lua";
  };

  const environment = getEnvironmentForModule();

  const handleExerciseComplete = (exerciseId: string, passed: boolean, xpEarned: number) => {
    if (passed && !completedExercises.has(exerciseId)) {
      setCompletedExercises(prev => new Set(prev).add(exerciseId));
      setTotalXP(prev => prev + xpEarned);
    }
  };

  if (!moduleContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
        <Navbar />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Módulo no encontrado</h1>
            <p className="text-slate-300 mb-8">El módulo que buscas no existe.</p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />
      <ScrollToTop />
      <MiniChat moduleId={moduleId} topic={currentLesson?.title} />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center mb-4"
          >
            ← Volver al Dashboard
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{moduleContent.title}</h1>
              <p className="text-slate-300">{moduleContent.description}</p>
            </div>
            
            {/* Environment Badge */}
            <div className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
              environment === "lua" ? "bg-blue-600 text-white" :
              environment === "roblox" ? "bg-red-600 text-white" :
              environment === "unlua" ? "bg-white text-black" :
              "bg-green-600 text-white"
            }`}>
              {environment === "lua" && "📜 Lua"}
              {environment === "roblox" && "🎮 Roblox"}
              {environment === "unlua" && "🎯 Unreal Engine"}
              {environment === "minecraft" && "⛏️ Minecraft"}
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">📚 Descripción General</h2>
          <p className="text-slate-300 mb-4">{moduleContent.overview}</p>

          <h3 className="text-lg font-bold text-white mb-3">🎯 Objetivos de Aprendizaje</h3>
          <ul className="space-y-2">
            {moduleContent.learningObjectives.map((obj, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-slate-300"
              >
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar: Lessons Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 sticky top-24">
              <h3 className="font-bold text-white mb-4">📖 Lecciones</h3>
              <div className="space-y-2">
                {moduleContent.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentLessonIndex(idx);
                      setActiveTab("content");
                      setSelectedExercise(null);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${
                      currentLessonIndex === idx
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    }`}
                  >
                    <div className="font-semibold text-sm">{lesson.title}</div>
                    <div className="text-xs opacity-75 mt-1">{lesson.description}</div>
                  </button>
                ))}
              </div>

              {/* Quick Access Buttons */}
              <div className="mt-6 pt-6 border-t border-slate-700 space-y-2">
                <button
                  onClick={() => {
                    setActiveTab("editor");
                    setSelectedExercise(null);
                  }}
                  className={`w-full px-4 py-3 rounded-lg transition flex items-center justify-center gap-2 font-semibold ${
                    activeTab === "editor"
                      ? "bg-green-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                  }`}
                >
                  <span>💻</span> Abrir Editor
                </button>
                {currentLessonExercises.length > 0 && (
                  <button
                    onClick={() => {
                      setActiveTab("exercises");
                      setSelectedExercise(null);
                    }}
                    className={`w-full px-4 py-3 rounded-lg transition flex items-center justify-center gap-2 font-semibold ${
                      activeTab === "exercises"
                        ? "bg-purple-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    }`}
                  >
                    <span>🎯</span> Ejercicios ({currentLessonExercises.length})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === "content" && currentLesson ? (
              /* Contenido de la Lección */
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-white mb-2">{currentLesson.title}</h2>
                <p className="text-slate-400 mb-6">{currentLesson.description}</p>

                {currentLesson.imageUrl && (
                  <div className="mb-6 bg-slate-700 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-2">🖼️</div>
                      <p className="text-slate-400">Imagen: {currentLesson.imageUrl}</p>
                    </div>
                  </div>
                )}

                <div className="prose prose-invert max-w-none mb-8">
                  <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {currentLesson.content}
                  </div>
                </div>

                {currentLesson.keyPoints.length > 0 && (
                  <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-bold text-blue-200 mb-3">💡 Puntos Clave</h3>
                    <ul className="space-y-2">
                      {currentLesson.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-blue-100">
                          <span className="text-blue-400 font-bold mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentLesson.codeExample && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-white">💻 {currentLesson.codeExample.title}</h3>
                      <button
                        onClick={() => setActiveTab("editor")}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition text-sm flex items-center gap-2"
                      >
                        <span>▶</span> Ejecutar en Editor
                      </button>
                    </div>
                    
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto mb-4">
                      <pre className="text-slate-300 text-sm font-mono">
                        <code>{currentLesson.codeExample.code}</code>
                      </pre>
                    </div>
                    
                    <p className="text-sm text-slate-400">
                      💡 Haz clic en "Ejecutar en Editor" para probar y modificar este código
                    </p>
                  </div>
                )}

                {currentLesson.videoUrl && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-white mb-3">🎥 Video Tutorial</h3>
                    <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center border border-slate-700">
                      <div className="text-center">
                        <div className="text-6xl mb-2">📹</div>
                        <p className="text-slate-400">Video: {currentLesson.videoUrl}</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentLesson.codeExample && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-white mb-4">🚀 Prueba el Código</h3>
                    <CodeEditor
                      environment={environment}
                      initialCode={currentLesson.codeExample.code}
                      height="500px"
                      showOutput={true}
                    />
                  </div>
                )}
              </div>
            ) : activeTab === "editor" ? (
              /* Pestaña del Editor */
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Editor de Código</h2>
                    <p className="text-slate-400">{currentLesson?.title} - Practica lo aprendido</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("content")}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
                  >
                    ← Volver al Contenido
                  </button>
                </div>

                <CodeEditor
                  environment={environment}
                  initialCode={currentLesson?.codeExample?.code || `-- Escribe tu código aquí\nprint("Hello, ${moduleContent.title}!")`}
                  height="600px"
                  showOutput={true}
                />
              </div>
            ) : activeTab === "exercises" ? (
              /* Pestaña de Ejercicios */
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
                {selectedExercise ? (
                  /* Ejercicio Individual */
                  <div>
                    <div className="mb-6">
                      <button
                        onClick={() => setSelectedExercise(null)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition flex items-center gap-2"
                      >
                        ← Volver a la Lista de Ejercicios
                      </button>
                    </div>
                    <ExerciseRunner
                      exercise={selectedExercise}
                      environment={environment}
                      onComplete={handleExerciseComplete}
                    />
                  </div>
                ) : (
                  /* Lista de Ejercicios */
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white">🎯 Ejercicios de la Lección</h2>
                        <p className="text-slate-400">{currentLesson?.title}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Completados</div>
                        <div className="text-2xl font-bold text-purple-400">
                          {completedExercises.size} / {currentLessonExercises.length}
                        </div>
                      </div>
                    </div>

                    {currentLessonExercises.length > 0 ? (
                      <div className="grid gap-4">
                        {currentLessonExercises.map((exercise) => {
                          const isCompleted = completedExercises.has(exercise.id);
                          return (
                            <button
                              key={exercise.id}
                              onClick={() => setSelectedExercise(exercise)}
                              className={`p-6 rounded-lg border-2 transition text-left ${
                                isCompleted
                                  ? "bg-green-900/20 border-green-600 hover:border-green-500"
                                  : "bg-slate-700/50 border-slate-600 hover:border-purple-500"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">{isCompleted ? "✅" : "🎯"}</span>
                                    <h3 className="text-lg font-bold text-white">{exercise.title}</h3>
                                  </div>
                                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                                    {exercise.instructions.substring(0, 150)}...
                                  </p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className={`px-2 py-1 rounded ${
                                      exercise.difficulty === "beginner" ? "bg-green-900/50 text-green-400" :
                                      exercise.difficulty === "intermediate" ? "bg-yellow-900/50 text-yellow-400" :
                                      "bg-red-900/50 text-red-400"
                                    }`}>
                                      {exercise.difficulty === "beginner" ? "🟢 Principiante" :
                                       exercise.difficulty === "intermediate" ? "🟡 Intermedio" :
                                       "🔴 Avanzado"}
                                    </span>
                                    <span className="text-purple-400 font-semibold">
                                      🏆 {exercise.xpReward} XP
                                    </span>
                                    <span className="text-slate-400">
                                      📝 {exercise.tests.length} tests
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <span className="text-2xl">→</span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🚧</div>
                        <h3 className="text-xl font-bold text-white mb-2">Ejercicios en Desarrollo</h3>
                        <p className="text-slate-400">Los ejercicios para esta lección estarán disponibles pronto.</p>
                      </div>
                    )}

                    {totalXP > 0 && (
                      <div className="mt-6 p-4 bg-purple-900/30 border border-purple-600 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-purple-200 font-semibold">XP Ganados en esta lección:</span>
                          <span className="text-purple-400 font-bold text-2xl">+{totalXP} XP</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1));
                  setActiveTab("content");
                  setSelectedExercise(null);
                }}
                disabled={currentLessonIndex === 0}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition"
              >
                ← Lección Anterior
              </button>

              <button
                onClick={() => {
                  setCurrentLessonIndex(Math.min(moduleContent.lessons.length - 1, currentLessonIndex + 1));
                  setActiveTab("content");
                  setSelectedExercise(null);
                }}
                disabled={currentLessonIndex === moduleContent.lessons.length - 1}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition ml-auto"
              >
                Siguiente Lección →
              </button>
            </div>

            {/* Resources */}
            {moduleContent.resources.length > 0 && (
              <div className="mt-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">📚 Recursos</h3>
                <div className="space-y-2">
                  {moduleContent.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
                    >
                      <span className="text-white font-semibold">
                        {resource.type === "video" && "🎥"}
                        {resource.type === "article" && "📄"}
                        {resource.type === "documentation" && "📖"} {resource.title}
                      </span>
                      <span className="text-blue-400">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">📊 Tu Progreso</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Lección {currentLessonIndex + 1} de {moduleContent.lessons.length}</p>
            </div>
            <div className="w-96 bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all"
                style={{ width: `${((currentLessonIndex + 1) / moduleContent.lessons.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-blue-400 font-bold">
              {Math.round(((currentLessonIndex + 1) / moduleContent.lessons.length) * 100)}%
            </span>
          </div>
          
          {/* Nuevas Lecciones Teóricas - FASE 2 */}
          {moduleId === "mes-01" && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-600 rounded-lg">
              <h4 className="text-white font-bold mb-2">🎉 ¡NUEVO! Lecciones Teóricas Completas</h4>
              <p className="text-slate-300 text-sm mb-3">
                Accede a las 7 lecciones teóricas del Módulo 1 con teoría completa, ejemplos interactivos y ejercicios prácticos.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/course/mes-01/mes-01-l01"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
                >
                  📖 Comenzar Lección 1
                </Link>
                <Link
                  href="/course/mes-01"
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition flex items-center gap-2"
                >
                  📚 Ver Todas las Lecciones
                </Link>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                <span>✓ 7 lecciones completas</span>
                <span>✓ Ejemplos interactivos</span>
                <span>✓ Ejercicios validados</span>
                <span>✓ ~185 min de contenido</span>
              </div>
            </div>
          )}
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button
              onClick={() => alert("Progreso guardado en tu cuenta")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              💾 Guardar Progreso
            </button>
            <Link
              href={`/quiz/${moduleId}`}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition text-center"
            >
              📝 Ir al Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
