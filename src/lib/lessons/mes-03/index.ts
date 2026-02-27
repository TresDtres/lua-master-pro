/**
 * Módulo 3: Blueprints ↔ Lua
 * Comunicación bidireccional entre Blueprints y Lua en Unreal Engine 5
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01 } from "./lesson-01";
import { lesson02, lesson03, lesson04, lesson05, lesson06 } from "./lessons-02-to-06";

export const module03Metadata = {
  moduleId: "mes-03",
  moduleTitle: "Blueprints ↔ Lua",
  moduleDescription: "Aprende a comunicar Blueprints y Lua, el sistema de input, delegates y eventos en Unreal Engine 5.",
  totalLessons: 6,
  estimatedTotalTime: 195, // minutos
};

export const module03Lessons: LessonSummary[] = [
  {
    id: "mes-03-l01",
    lessonNumber: 1,
    title: "Binding BP-Lua",
    description: "UFUNCTION, exportar funciones de Blueprint a Lua y viceversa.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-03-l02",
    lessonNumber: 2,
    title: "Input System",
    description: "Enhanced Input, bindings y mapeo de controles en UnLua.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
  {
    id: "mes-03-l03",
    lessonNumber: 3,
    title: "Delegates",
    description: "Events, dispatchers y comunicación asíncrona.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-03-l04",
    lessonNumber: 4,
    title: "Comunicación Bidireccional",
    description: "Llamar funciones de BP desde Lua y de Lua desde BP.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-03-l05",
    lessonNumber: 5,
    title: "Componentes UE5",
    description: "Acceder y manipular componentes desde scripts Lua.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
  {
    id: "mes-03-l06",
    lessonNumber: 6,
    title: "Proyecto: Personaje Controlado por Lua",
    description: "Integra todo lo aprendido creando un personaje jugable.",
    estimatedTime: 30,
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
