"use client";

import React from "react";
import { LessonSummary } from "@/types/lesson";

interface LessonNavigationProps {
  moduleId: string;
  currentLessonId: string;
  lessons: LessonSummary[];
  onNextLesson?: () => void;
  onPreviousLesson?: () => void;
  onLessonChange?: (lessonId: string) => void;
}

/**
 * Componente de navegación entre lecciones
 * 
 * Mejoras:
 * - No hace scroll automático al seleccionar lección
 * - Scroll suave solo cuando se usa navegación anterior/siguiente
 * - Tema claro/oscuro consistente
 */
export default function LessonNavigation({
  moduleId,
  currentLessonId,
  lessons,
  onNextLesson,
  onPreviousLesson,
  onLessonChange,
}: LessonNavigationProps) {
  const currentIndex = lessons.findIndex((l) => l.id === currentLessonId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < lessons.length - 1;

  const handlePrevious = () => {
    if (hasPrevious && onPreviousLesson) {
      onPreviousLesson();
    }
  };

  const handleNext = () => {
    if (hasNext && onNextLesson) {
      onNextLesson();
    }
  };

  return (
    <div className="space-y-4">
      {/* Lista de lecciones */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-colors">
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
            📚 Contenido del Módulo
          </h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-auto">
          {lessons.map((lesson, index) => {
            const isCurrent = lesson.id === currentLessonId;
            const isCompleted = lesson.isCompleted;

            return (
              <button
                key={lesson.id}
                onClick={() => onLessonChange?.(lesson.id)}
                className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 text-sm ${
                  isCurrent
                    ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                {/* Estado */}
                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isCurrent 
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {isCompleted ? "✓" : isCurrent ? "▶" : index + 1}
                </span>

                {/* Información */}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${
                    isCurrent 
                      ? "text-blue-700 dark:text-blue-300" 
                      : "text-gray-800 dark:text-gray-200"
                  }`}>
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <span>⏱️ {lesson.estimatedTime} min</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs ${
                      lesson.difficulty === "beginner"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : lesson.difficulty === "intermediate"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    }`}>
                      {lesson.difficulty === "beginner" ? "Principiante" : lesson.difficulty === "intermediate" ? "Intermedio" : "Avanzado"}
                    </span>
                  </div>
                </div>

                {/* Icono de completado */}
                {isCompleted && (
                  <span className="text-green-500 text-lg flex-shrink-0">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className="flex-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 text-sm"
        >
          <span>←</span>
          <span>Anterior</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!hasNext}
          className="flex-1 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1 text-sm"
        >
          <span>Siguiente</span>
          <span>→</span>
        </button>
      </div>

      {/* Barra de progreso */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            Progreso
          </span>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
            {currentIndex + 1} / {lessons.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / lessons.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
