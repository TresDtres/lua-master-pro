/**
 * Módulo 10: Arquitectura - Lección 10.5
 * Patrones de Diseño: Singleton, Observer, Command, State
 * 
 * Split into parts for better TypeScript performance
 */

import { Lesson, LessonTheory } from "@/types/lesson";
import { theory, examples } from "./05-design-patterns.part1";
import { interactive, miniExercise, resources, summary } from "./05-design-patterns.part2";

export const lesson05: Lesson = {
  id: "mes-10-l05",
  moduleId: "mes-10",
  lessonNumber: 5,
  title: "Patrones de Diseño",
  description: "Patrones de diseño esenciales en Lua: Singleton, Observer, Command y State aplicados a juegos.",
  estimatedTime: 55,
  difficulty: "advanced",
  theory: { ...theory, summary } as unknown as LessonTheory,
  examples,
  interactive,
  miniExercise,
  summary,
  resources,
  prerequisites: ["mes-10-l01", "mes-10-l04"],
};
