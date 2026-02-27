/**
 * Módulo 12: Portfolio
 * Portfolio profesional, documentación, devlogs y networking
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01 } from "./01-toolkit";
import { lesson02 } from "./02-documentation";
import { lesson03 } from "./03-technical-article";
import { lesson04 } from "./04-devlog";
import { lesson05 } from "./05-portfolio";
import { lesson06 } from "./06-networking";

export const module12Metadata = {
  moduleId: "mes-12",
  moduleTitle: "Portfolio",
  moduleDescription: "Portfolio profesional: Lua toolkit, documentación con EmmyLua, artículos técnicos, devlogs, portfolio personal y networking en la industria.",
  totalLessons: 6,
  estimatedTotalTime: 280, // minutos
};

export const module12Lessons: LessonSummary[] = [
  {
    id: "mes-12-l01",
    lessonNumber: 1,
    title: "Lua Toolkit",
    description: "Creación de una librería personal de módulos Lua reutilizables para UE5.",
    estimatedTime: 60,
    difficulty: "advanced",
  },
  {
    id: "mes-12-l02",
    lessonNumber: 2,
    title: "Documentación",
    description: "Documentación profesional de código: EmmyLua annotations, README completos y comentarios efectivos.",
    estimatedTime: 45,
    difficulty: "intermediate",
  },
  {
    id: "mes-12-l03",
    lessonNumber: 3,
    title: "Artículo Técnico",
    description: "Escribir y publicar artículos técnicos sobre desarrollo de juegos.",
    estimatedTime: 40,
    difficulty: "intermediate",
  },
  {
    id: "mes-12-l04",
    lessonNumber: 4,
    title: "Devlog",
    description: "Crear devlogs: grabación, edición y publicación de videos de desarrollo.",
    estimatedTime: 45,
    difficulty: "intermediate",
  },
  {
    id: "mes-12-l05",
    lessonNumber: 5,
    title: "Portfolio",
    description: "Crear portfolio profesional: 5 proyectos, web personal, GitHub optimizado.",
    estimatedTime: 50,
    difficulty: "advanced",
  },
  {
    id: "mes-12-l06",
    lessonNumber: 6,
    title: "Networking",
    description: "Networking profesional: GitHub, LinkedIn, y participación en la comunidad.",
    estimatedTime: 40,
    difficulty: "intermediate",
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
