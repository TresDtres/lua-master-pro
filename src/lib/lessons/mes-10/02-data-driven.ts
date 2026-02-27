/**
 * Módulo 10: Arquitectura - Lección 10.2
 * Data-Driven Design: JSON, hot-reload, configuración
 * 
 * Split into parts for better TypeScript performance
 */

import { Lesson } from "@/types/lesson";
import { theory, examples } from "./02-data-driven.part1";
import { interactive, miniExercise, resources } from "./02-data-driven.part2";

export const lesson02: Lesson = {
  id: "mes-10-l02",
  moduleId: "mes-10",
  lessonNumber: 2,
  title: "Data-Driven Design",
  description: "Arquitectura data-driven: JSON, hot-reload de configuración y sistemas basados en datos.",
  estimatedTime: 45,
  difficulty: "advanced",
  theory,
  examples,
  interactive,
  miniExercise,
  summary: theory.summary,
  resources,
  prerequisites: ["mes-10-l01"],
};
