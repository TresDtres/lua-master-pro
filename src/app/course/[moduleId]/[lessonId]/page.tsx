"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import LessonViewer from "@/components/LessonViewer";
import InteractiveCode from "@/components/InteractiveCode";
import LessonNavigation from "@/components/LessonNavigation";
import ExerciseRunner from "@/components/ExerciseRunner";
import { lessons, module01Lessons } from "@/lib/lessons/mes-01";
import { Lesson, LessonSummary } from "@/types/lesson";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

/**
 * Página dinámica de lección
 * Ruta: /course/[moduleId]/[lessonId]
 * 
 * Mejoras implementadas:
 * - Tema claro/oscuro persistente
 * - Scroll al top al cambiar de lección
 * - Editor con altura fija y scroll
 * - Navegación sin scroll automático
 */
export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const contentRef = useRef<HTMLDivElement>(null);
  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  // Estado
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"theory" | "interactive" | "exercise">("theory");
  const [lessonProgress, setLessonProgress] = useState<LessonSummary[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [xpEarned, setXpEarned] = useState(0);

  // Cargar lección actual
  useEffect(() => {
    const loadLesson = () => {
      const lesson = lessons.find((l) => l.id === lessonId);
      
      if (lesson) {
        setCurrentLesson(lesson);
      } else {
        router.push(`/course/${moduleId}`);
      }
      
      setIsLoading(false);
    };

    loadLesson();
  }, [lessonId, moduleId, router]);

  // Cargar progreso del usuario
  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        setLessonProgress(module01Lessons);
        return;
      }

      try {
        const { data: progressData, error } = await supabase
          .from("user_lesson_progress")
          .select("*")
          .eq("user_id", user.id) as any;

        if (error) {
          console.error("Error loading progress:", error);
          setLessonProgress(module01Lessons);
          return;
        }

        const completed = progressData?.filter((p: any) => p.completed).map((p: any) => p.lesson_id) || [];
        setCompletedLessons(completed);

        const lessonsWithProgress = module01Lessons.map((lesson) => ({
          ...lesson,
          isCompleted: completed.includes(lesson.id),
        }));
        setLessonProgress(lessonsWithProgress);
      } catch (error) {
        console.error("Error loading progress:", error);
        setLessonProgress(module01Lessons);
      }
    };

    loadProgress();
  }, [user, moduleId]);

  // Marcar lección como completada
  const markLessonComplete = useCallback(async (lessonIdToComplete: string, xp: number = 0) => {
    if (!user) return;

    try {
      if (completedLessons.includes(lessonIdToComplete)) return;

      const result: any = await (supabase as any)
        .from("user_lesson_progress")
        .insert({
          user_id: user.id,
          lesson_id: lessonIdToComplete,
          module_id: moduleId,
          completed: true,
          theory_read: true,
          interactive_executed: true,
          xp_earned: xp,
          completed_at: new Date().toISOString(),
        });

      const error = result.error;

      if (!error) {
        setCompletedLessons((prev) => [...prev, lessonIdToComplete]);
        setXpEarned((prev) => prev + xp);

        setLessonProgress((prev) =>
          prev.map((l) =>
            l.id === lessonIdToComplete ? { ...l, isCompleted: true } : l
          )
        );
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  }, [user, moduleId, completedLessons]);

  // Navegar a otra lección - SCROLL AL TOP
  const handleLessonChange = useCallback((newLessonId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      router.push(`/course/${moduleId}/${newLessonId}`);
    }, 150);
    
    setActiveTab("theory");
  }, [moduleId, router]);

  // Lección anterior / siguiente
  const handlePreviousLesson = useCallback(() => {
    const currentIndex = module01Lessons.findIndex((l) => l.id === lessonId);
    if (currentIndex > 0) {
      handleLessonChange(module01Lessons[currentIndex - 1].id);
    }
  }, [lessonId, handleLessonChange]);

  const handleNextLesson = useCallback(() => {
    const currentIndex = module01Lessons.findIndex((l) => l.id === lessonId);
    if (currentIndex < module01Lessons.length - 1) {
      handleLessonChange(module01Lessons[currentIndex + 1].id);
    }
  }, [lessonId, handleLessonChange]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Cargando lección...</p>
        </div>
      </div>
    );
  }

  // Lección no encontrada
  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Lección no encontrada
          </h1>
          <Link
            href={`/course/${moduleId}`}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            ← Volver al módulo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header fijo */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/course/${moduleId}`}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                ← Módulo
              </Link>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate max-w-md">
                {currentLesson.title}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {xpEarned > 0 && (
                <div className="px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-medium">
                  ⭐ +{xpEarned} XP
                </div>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                ⏱️ {currentLesson.estimatedTime} min
              </div>
            </div>
          </div>

          {/* Pestañas de navegación */}
          <div className="flex gap-1 mt-3 overflow-x-auto">
            <button
              onClick={() => {
                setActiveTab("theory");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "theory"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              📖 Teoría
            </button>
            <button
              onClick={() => {
                setActiveTab("interactive");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "interactive"
                  ? "border-purple-500 text-purple-600 dark:text-purple-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              🎮 Interactivo
            </button>
            <button
              onClick={() => {
                setActiveTab("exercise");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === "exercise"
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              ✍️ Ejercicio
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main ref={contentRef} className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Columna izquierda - Contenido */}
          <div className="lg:col-span-3">
            {activeTab === "theory" && (
              <LessonViewer
                theory={currentLesson.theory}
                examples={currentLesson.examples}
                onRunExample={() => {
                  setActiveTab("interactive");
                }}
              />
            )}

            {activeTab === "interactive" && (
              <InteractiveCode
                example={currentLesson.interactive}
                onExecute={() => markLessonComplete(lessonId, 10)}
                onComplete={() => markLessonComplete(lessonId, 20)}
              />
            )}

            {activeTab === "exercise" && (
              <ExerciseRunner
                exercise={currentLesson.miniExercise}
                environment={currentLesson.interactive.environment}
                onComplete={(exerciseId, passed, xp) => {
                  if (passed) {
                    markLessonComplete(lessonId, xp);
                  }
                }}
                userId={user?.id}
              />
            )}
          </div>

          {/* Columna derecha - Navegación */}
          <div className="lg:col-span-1">
            <div className="sticky top-40 space-y-4">
              <LessonNavigation
                moduleId={moduleId}
                currentLessonId={lessonId}
                lessons={lessonProgress}
                onNextLesson={handleNextLesson}
                onPreviousLesson={handlePreviousLesson}
                onLessonChange={handleLessonChange}
              />

              {/* Resumen de la lección */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm">
                    📝 En esta lección
                  </h3>
                  <ul className="space-y-2 text-xs text-blue-800 dark:text-blue-200">
                    <li className="flex items-center gap-2">
                      <span>{completedLessons.includes(lessonId) ? "✅" : "⬜"}</span>
                      <span>Teoría</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>🎮</span>
                      <span>Interactivo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✍️</span>
                      <span>Ejercicio</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>⭐</span>
                      <span>{currentLesson.miniExercise.xpReward} XP</span>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
