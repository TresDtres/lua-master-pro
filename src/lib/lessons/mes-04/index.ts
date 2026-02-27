/**
 * Módulo 4: Inventario y Stats
 * Sistemas de gestión de inventario, items, stats de personaje y guardado en Unreal Engine 5
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01, lesson02, lesson03, lesson04, lesson05, lesson06 } from "./lessons-all";

export const module04Metadata = {
  moduleId: "mes-04",
  moduleTitle: "Inventario y Stats",
  moduleDescription: "Aprende a crear sistemas de inventario, bases de datos de items, stats de personaje, buffs/debuffs y SaveGame en Unreal Engine 5.",
  totalLessons: 6,
  estimatedTotalTime: 200, // minutos
};

export const module04Lessons: LessonSummary[] = [
  {
    id: "mes-04-l01",
    lessonNumber: 1,
    title: "DataTables",
    description: "Estructura, carga desde Lua y uso para datos de juego.",
    estimatedTime: 35,
    difficulty: "intermediate",
  },
  {
    id: "mes-04-l02",
    lessonNumber: 2,
    title: "Sistema de Inventario",
    description: "Slots, items, stack y gestión de inventario.",
    estimatedTime: 35,
    difficulty: "intermediate",
  },
  {
    id: "mes-04-l03",
    lessonNumber: 3,
    title: "Item Database",
    description: "JSON, CSV y sistemas data-driven para items.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-04-l04",
    lessonNumber: 4,
    title: "Stats de Personaje",
    description: "HP, Mana, atributos y fórmulas de progresión.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
  {
    id: "mes-04-l05",
    lessonNumber: 5,
    title: "Buffs/Debuffs",
    description: "Modificadores temporales, duración y efectos.",
    estimatedTime: 30,
    difficulty: "advanced",
  },
  {
    id: "mes-04-l06",
    lessonNumber: 6,
    title: "SaveGame",
    description: "Serializar, guardar y cargar progreso del jugador.",
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
