/**
 * Módulo 12: Portfolio - Lección 12.4
 * Devlog: grabar, editar, publicar
 */

import { Lesson } from "@/types/lesson";

export const lesson04: Lesson = {
  id: "mes-12-l04",
  moduleId: "mes-12",
  lessonNumber: 4,
  title: "Devlog",
  description: "Crear devlogs: grabación, edición y publicación de videos de desarrollo.",
  estimatedTime: 45,
  difficulty: "intermediate",
  theory: {
    title: "Devlogs",
    objectives: ["Grabar gameplay", "Editar video", "Publicar en YouTube"],
    estimatedTime: 45,
    sections: [{ heading: "Devlog Basics", content: "Los devlogs documentan el proceso de desarrollo.", codeExamples: [] }],
    summary: "Los devlogs construyen audiencia y documentan progreso.",
  },
  examples: [],
  interactive: {
    title: "Devlog Planner",
    description: "Planifica tu devlog",
    starterCode: `local devlog = {\n    episode = 1,\n    title = "Episode 1: Getting Started",\n    topics = {"Setup", "First Steps", "Challenges"},\n    duration = 10\n}\nprint("Devlog #" .. devlog.episode .. ": " .. devlog.title)`,
    environment: "lua",
    expectedOutput: "Devlog #1: Episode 1: Getting Started",
  },
  miniExercise: {
    id: "mes-12-l04-exercise",
    lessonId: "mes-12-l04",
    title: "Plan Devlog",
    instructions: "Crea un plan para tu primer devlog.",
    starterCode: `local plan = {title = "Devlog #1", topics = {}}\ntable.insert(plan.topics, "Intro")\ntable.insert(plan.topics, "Main Content")\nprint(#plan.topics .. " topics planned")`,
    solution: `local plan = {title = "Devlog #1", topics = {"Intro", "Main Content"}}\nprint(#plan.topics .. " topics planned")`,
    tests: [{ type: "output_contains", expected: "topics", message: "Debe mostrar topics" }],
    hints: ["Agrega al menos 2 topics"],
    xpReward: 100,
    difficulty: "beginner",
  },
  summary: "Devlogs requieren: planificación, grabación, edición y publicación.",
  resources: [{ title: "Devlog Tips", url: "https://example.com", type: "video" }],
  prerequisites: ["mes-12-l03"],
};
