/**
 * Módulo 10: Arquitectura
 * Arquitectura profesional de juegos: frameworks, data-driven design, testing, modularidad y patrones de diseño
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01 } from "./01-game-framework";
import { lesson02 } from "./02-data-driven";
import { lesson03 } from "./03-testing-luaunit";
import { lesson04 } from "./04-modularity";
import { lesson05 } from "./05-design-patterns";
import { lesson06 } from "./06-framework-project";

export const module10Metadata = {
  moduleId: "mes-10",
  moduleTitle: "Arquitectura",
  moduleDescription: "Aprende arquitectura profesional de juegos: Game Framework con GameMode/GameState/PlayerState, Data-Driven Design con JSON y hot-reload, Testing con luaunit (TDD, unit tests, integration tests), Modularidad y organización de proyectos, y Patrones de Diseño (Singleton, Observer, Command, State).",
  totalLessons: 6,
  estimatedTotalTime: 305, // minutos
};

export const module10Lessons: LessonSummary[] = [
  {
    id: "mes-10-l01",
    lessonNumber: 1,
    title: "Game Framework",
    description: "Arquitectura de frameworks de juego: GameMode, GameState, PlayerState y su implementación en Lua.",
    estimatedTime: 50,
    difficulty: "advanced",
  },
  {
    id: "mes-10-l02",
    lessonNumber: 2,
    title: "Data-Driven Design",
    description: "Arquitectura data-driven: JSON, hot-reload de configuración y sistemas basados en datos.",
    estimatedTime: 45,
    difficulty: "advanced",
  },
  {
    id: "mes-10-l03",
    lessonNumber: 3,
    title: "Testing con luaunit",
    description: "Testing en Lua: TDD, unit tests, integration tests y mejores prácticas con luaunit.",
    estimatedTime: 50,
    difficulty: "advanced",
  },
  {
    id: "mes-10-l04",
    lessonNumber: 4,
    title: "Modularidad",
    description: "Organización modular de proyectos Lua: imports, exports, estructura de directorios y mejores prácticas.",
    estimatedTime: 45,
    difficulty: "intermediate",
  },
  {
    id: "mes-10-l05",
    lessonNumber: 5,
    title: "Patrones de Diseño",
    description: "Patrones de diseño esenciales en Lua: Singleton, Observer, Command y State aplicados a juegos.",
    estimatedTime: 55,
    difficulty: "advanced",
  },
  {
    id: "mes-10-l06",
    lessonNumber: 6,
    title: "Proyecto: Framework Completo",
    description: "Integración de todos los conceptos: Game Framework, Data-Driven, Testing, Modularidad y Patrones de Diseño.",
    estimatedTime: 60,
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
