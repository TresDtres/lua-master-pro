/**
 * Módulo 11: Producción
 * Creación de contenido, menús, polish, debugging y alpha jugable
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01 } from "./01-core-loop";
import { lesson02 } from "./02-content";
import { lesson03 } from "./03-menus";
import { lesson04 } from "./04-polish";
import { lesson05 } from "./05-bug-fixing";
import { lesson06 } from "./06-alpha-project";

export const module11Metadata = {
  moduleId: "mes-11",
  moduleTitle: "Producción",
  moduleDescription: "Producción de juegos: creación de contenido, diseño de niveles, sistemas de menús, game polish, debugging profesional y alpha jugable.",
  totalLessons: 6,
  estimatedTotalTime: 280, // minutos
};

export const module11Lessons: LessonSummary[] = [
  {
    id: "mes-11-l01",
    lessonNumber: 1,
    title: "Core Loop",
    description: "El bucle principal del juego: gestión de input, update, render y técnicas de optimización.",
    estimatedTime: 50,
    difficulty: "advanced",
  },
  {
    id: "mes-11-l02",
    lessonNumber: 2,
    title: "Contenido",
    description: "Creación de contenido: diseño de 3 niveles, 3 tipos de enemigos, variedad de items y balance.",
    estimatedTime: 45,
    difficulty: "intermediate",
  },
  {
    id: "mes-11-l03",
    lessonNumber: 3,
    title: "Menús",
    description: "Implementación de menús: principal, opciones, pausa y HUD.",
    estimatedTime: 40,
    difficulty: "intermediate",
  },
  {
    id: "mes-11-l04",
    lessonNumber: 4,
    title: "Polish",
    description: "Polish: partículas, efectos de audio, feedback visual y game juice.",
    estimatedTime: 45,
    difficulty: "advanced",
  },
  {
    id: "mes-11-l05",
    lessonNumber: 5,
    title: "Bug Fixing",
    description: "Debugging: logs, crash reports, y técnicas de debugging profesional.",
    estimatedTime: 40,
    difficulty: "intermediate",
  },
  {
    id: "mes-11-l06",
    lessonNumber: 6,
    title: "Alpha Jugable",
    description: "Proyecto final: crear un alpha jugable completo con todos los sistemas integrados.",
    estimatedTime: 60,
    difficulty: "expert",
  },
];

// Export all lessons for dynamic loading
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
];
