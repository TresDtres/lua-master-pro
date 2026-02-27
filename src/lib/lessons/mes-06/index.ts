/**
 * Módulo 6: IA de NPCs
 * Inteligencia Artificial para NPCs en Unreal Engine 5 con UnLua
 * FSM, percepción, Behavior Trees, pathfinding y combate
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01, lesson02, lesson03, lesson04, lesson05, lesson06 } from "./lessons-all";

export const module06Metadata = {
  moduleId: "mes-06",
  moduleTitle: "IA de NPCs",
  moduleDescription: "Aprende a crear Inteligencia Artificial para NPCs usando Máquinas de Estado Finito (FSM), sistemas de percepción, Behavior Trees, pathfinding con NavMesh y sistemas de combate en Unreal Engine 5.",
  totalLessons: 6,
  estimatedTotalTime: 220, // minutos
};

export const module06Lessons: LessonSummary[] = [
  {
    id: "mes-06-l01",
    lessonNumber: 1,
    title: "FSM (Máquinas de Estado Finito)",
    description: "Estados, transiciones, guards y implementación de FSM para NPCs.",
    estimatedTime: 40,
    difficulty: "intermediate",
  },
  {
    id: "mes-06-l02",
    lessonNumber: 2,
    title: "Percepción",
    description: "Raycast, campo de visión (FOV), audición y detección de jugador.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-06-l03",
    lessonNumber: 3,
    title: "Behavior Trees",
    description: "Tasks, Decorators, Services y árboles de comportamiento complejos.",
    estimatedTime: 40,
    difficulty: "advanced",
  },
  {
    id: "mes-06-l04",
    lessonNumber: 4,
    title: "Pathfinding",
    description: "NavMesh, MoveTo, navegación y evitación de obstáculos.",
    estimatedTime: 35,
    difficulty: "intermediate",
  },
  {
    id: "mes-06-l05",
    lessonNumber: 5,
    title: "Combate",
    description: "Sistemas de ataque, defensa, huida y toma de decisiones en combate.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-06-l06",
    lessonNumber: 6,
    title: "Proyecto: Guards con IA Completa",
    description: "Integra FSM, percepción, pathfinding y combate en guards de una mazmorra.",
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
