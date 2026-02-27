/**
 * Módulo 10: Arquitectura - Lección 10.6
 * Proyecto: Framework Completo
 * 
 * Split into parts for better TypeScript performance
 */

import { Lesson, LessonTheory } from "@/types/lesson";
import { theory, examples } from "./06-framework-project.part1";
import { interactive, miniExercise, resources, summary } from "./06-framework-project.part2";

export const lesson06: Lesson = {
  id: "mes-10-l06",
  moduleId: "mes-10",
  lessonNumber: 6,
  title: "Proyecto: Framework Completo",
  description: "Integración de todos los conceptos: Game Framework, Data-Driven, Testing, Modularidad y Patrones de Diseño.",
  estimatedTime: 60,
  difficulty: "expert",
  theory: { ...theory, summary } as unknown as LessonTheory,
  examples,
  interactive,
  miniExercise,
  summary,
  resources,
  prerequisites: ["mes-10-l01", "mes-10-l02", "mes-10-l03", "mes-10-l04", "mes-10-l05"],
};
