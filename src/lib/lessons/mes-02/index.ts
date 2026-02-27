/**
 * Módulo 2: POO + UE5
 * Programación Orientada a Objetos en Lua aplicado a Unreal Engine 5
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01 } from "./lesson-01";
import { lesson02 } from "./lesson-02";
import { lesson03 } from "./lesson-03";
import { lesson04 } from "./lesson-04";
import { lesson05 } from "./lesson-05";
import { lesson06 } from "./lesson-06";

export const module02Metadata = {
  moduleId: "mes-02",
  moduleTitle: "POO + UE5",
  moduleDescription: "Aprende Programación Orientada a Objetos en Lua y aplícalo en Unreal Engine 5 con UnLua.",
  totalLessons: 6,
  estimatedTotalTime: 195, // minutos
};

export const module02Lessons: LessonSummary[] = [
  {
    id: "mes-02-l01",
    lessonNumber: 1,
    title: "Tablas Avanzadas",
    description: "Arrays, diccionarios e iteración de tablas en Lua.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
  {
    id: "mes-02-l02",
    lessonNumber: 2,
    title: "Metatables",
    description: "__index, __newindex y metamétodos para comportamiento personalizado.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-02-l03",
    lessonNumber: 3,
    title: "POO en Lua",
    description: "Clases, herencia y polimorfismo implementados con tablas.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-02-l04",
    lessonNumber: 4,
    title: "UnLua Setup",
    description: "Instalación, configuración y tu primer script en UE5.",
    estimatedTime: 25,
    difficulty: "beginner",
  },
  {
    id: "mes-02-l05",
    lessonNumber: 5,
    title: "Ciclo de Vida",
    description: "BeginPlay, Tick, EndPlay y eventos en UnLua.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
  {
    id: "mes-02-l06",
    lessonNumber: 6,
    title: "Interacción UE5",
    description: "Mover actores, cambiar materiales y manipular componentes.",
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
