/**
 * Módulo 10: Arquitectura - Lección 10.1
 * Game Framework: GameMode, GameState, PlayerState
 * 
 * Split into parts for better TypeScript performance
 */

import { Lesson } from "@/types/lesson";
import { theory, examples } from "./01-game-framework.part1";
import { interactive, miniExercise, resources } from "./01-game-framework.part2";

export const lesson01: Lesson = {
  id: "mes-10-l01",
  moduleId: "mes-10",
  lessonNumber: 1,
  title: "Game Framework",
  description: "Arquitectura de frameworks de juego: GameMode, GameState, PlayerState y su implementación en Lua.",
  estimatedTime: 50,
  difficulty: "advanced",
  theory,
  examples,
  interactive,
  miniExercise,
  summary: theory.summary,
  resources,
  prerequisites: ["mes-08-l04", "mes-09-l05"],
};
