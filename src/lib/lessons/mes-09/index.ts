/**
 * Módulo 9: Sistemas Avanzados
 * Sistemas profesionales para juegos en Unreal Engine 5 con UnLua
 * Procedural generation, materiales, audio, quest system y event bus
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01, lesson02, lesson03, lesson04, lesson05, lesson06 } from "./lessons-all";

export const module09Metadata = {
  moduleId: "mes-09",
  moduleTitle: "Sistemas Avanzados",
  moduleDescription: "Aprende sistemas profesionales avanzados: generación procedural con Wave Function Collapse, materiales dinámicos, audio adaptativo, sistema de quests complejo y arquitectura Event Bus para sistemas desacoplados.",
  totalLessons: 6,
  estimatedTotalTime: 240, // minutos
};

export const module09Lessons: LessonSummary[] = [
  {
    id: "mes-09-l01",
    lessonNumber: 1,
    title: "Generación Procedural",
    description: "Dungeon generation, Wave Function Collapse y algoritmos de creación de niveles.",
    estimatedTime: 45,
    difficulty: "expert",
  },
  {
    id: "mes-09-l02",
    lessonNumber: 2,
    title: "Materiales Dinámicos",
    description: "Material Parameter Collections, instancias y manipulación en runtime.",
    estimatedTime: 40,
    difficulty: "advanced",
  },
  {
    id: "mes-09-l03",
    lessonNumber: 3,
    title: "Audio Adaptativo",
    description: "Metasounds, audio reactivo al gameplay y sistema de música dinámica.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-09-l04",
    lessonNumber: 4,
    title: "Quest System",
    description: "Sistema de quests complejo con objetivos, recompensas y dependencias.",
    estimatedTime: 45,
    difficulty: "expert",
  },
  {
    id: "mes-09-l05",
    lessonNumber: 5,
    title: "Event Bus",
    description: "Arquitectura Publisher/Subscriber para sistemas desacoplados.",
    estimatedTime: 40,
    difficulty: "advanced",
  },
  {
    id: "mes-09-l06",
    lessonNumber: 6,
    title: "Proyecto: Dungeon Crawler",
    description: "Integra generación procedural, quests y sistemas en un dungeon crawler.",
    estimatedTime: 35,
    difficulty: "expert",
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
