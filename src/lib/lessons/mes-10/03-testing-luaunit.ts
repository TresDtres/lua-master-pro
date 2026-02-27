/**
 * Módulo 10: Arquitectura - Lección 10.3
 * Testing con luaunit: TDD, unit tests, integration tests
 * 
 * Split into parts for better TypeScript performance
 */

import { Lesson } from "@/types/lesson";
import { theory, examples, summary } from "./03-testing-luaunit.part1";
import { interactive, miniExercise, resources } from "./03-testing-luaunit.part2";

export const lesson03: Lesson = {
  id: "mes-10-l03",
  moduleId: "mes-10",
  lessonNumber: 3,
  title: "Testing con luaunit",
  description: "Testing en Lua: TDD, unit tests, integration tests y mejores prácticas con luaunit.",
  estimatedTime: 50,
  difficulty: "advanced",
  theory,
  examples,
  interactive,
  miniExercise,
  summary,
  resources,
  prerequisites: ["mes-10-l02"],
};
