/**
 * Módulo 10: Arquitectura - Lección 10.4
 * Modularidad: imports, exports, estructura de proyecto
 * 
 * Split into parts for better TypeScript performance
 */

import { Lesson } from "@/types/lesson";
import { theory, examples } from "./04-modularity.part1";
import { interactive, miniExercise, resources, summary } from "./04-modularity.part2";

export const lesson04: Lesson = {
  id: "mes-10-l04",
  moduleId: "mes-10",
  lessonNumber: 4,
  title: "Modularidad",
  description: "Organización modular de proyectos Lua: imports, exports, estructura de directorios y mejores prácticas.",
  estimatedTime: 45,
  difficulty: "intermediate",
  theory: { ...theory, summary },
  examples,
  interactive,
  miniExercise,
  summary,
  resources,
  prerequisites: ["mes-10-l01", "mes-10-l03"],
};
