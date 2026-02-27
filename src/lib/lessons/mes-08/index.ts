/**
 * Módulo 8: Optimización
 * Técnicas de optimización para juegos en Unreal Engine 5 con UnLua
 * Profiling, object pooling, memory management, coroutines y más
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01, lesson02, lesson03, lesson04, lesson05, lesson06 } from "./lessons-all";

export const module08Metadata = {
  moduleId: "mes-08",
  moduleTitle: "Optimización",
  moduleDescription: "Aprende técnicas de optimización profesional: profiling con Unreal Insights, object pooling para reducir allocs, gestión de memoria, coroutines para operaciones asíncronas, y optimización de código Lua.",
  totalLessons: 6,
  estimatedTotalTime: 210, // minutos
};

export const module08Lessons: LessonSummary[] = [
  {
    id: "mes-08-l01",
    lessonNumber: 1,
    title: "Profiling",
    description: "Unreal Insights, stat commands, análisis de FPS y identificación de bottlenecks.",
    estimatedTime: 35,
    difficulty: "intermediate",
  },
  {
    id: "mes-08-l02",
    lessonNumber: 2,
    title: "Object Pooling",
    description: "Reutilizar objetos en lugar de spawnear/destruir para reducir garbage collection.",
    estimatedTime: 40,
    difficulty: "advanced",
  },
  {
    id: "mes-08-l03",
    lessonNumber: 3,
    title: "Memory Management",
    description: "Gestión de memoria, garbage collection, evitar allocs innecesarias en Lua.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-08-l04",
    lessonNumber: 4,
    title: "Coroutines",
    description: "Tasks asíncronos, operaciones no bloqueantes, yield y resume.",
    estimatedTime: 35,
    difficulty: "intermediate",
  },
  {
    id: "mes-08-l05",
    lessonNumber: 5,
    title: "Optimización de Código Lua",
    description: "Patrones de código eficiente, evitar operaciones costosas, tablas vs arrays.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
  {
    id: "mes-08-l06",
    lessonNumber: 6,
    title: "Proyecto: Sistema de Balas Optimizado",
    description: "Implementa object pooling para balas con coroutines y profiling integrado.",
    estimatedTime: 35,
    difficulty: "intermediate",
  },
];

// Exportar todas las lecciones del módulo
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
];

// Exportar individualmente para uso directo
export {
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
};
