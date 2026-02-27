/**
 * Módulo 12: Portfolio - Lección 12.1
 * Lua Toolkit: utils, helpers, funciones reutilizables
 */

import { Lesson } from "@/types/lesson";

export const lesson01: Lesson = {
  id: "mes-12-l01",
  moduleId: "mes-12",
  lessonNumber: 1,
  title: "Lua Toolkit",
  description: "Creación de una librería personal de módulos Lua reutilizables para UE5.",
  estimatedTime: 60,
  difficulty: "advanced",
  theory: {
    title: "Lua Toolkit",
    objectives: ["Crear utils reutilizables", "Implementar helpers comunes", "Organizar librería personal"],
    estimatedTime: 60,
    sections: [{ heading: "Toolkit Esencial", content: "Un buen toolkit ahorra tiempo en cada proyecto.", codeExamples: [] }],
    summary: "Un toolkit Lua incluye: utils, helpers, y funciones comunes.",
  },
  examples: [],
  interactive: {
    title: "Utils Library",
    description: "Crea una librería de utilidades",
    starterCode: `local Utils = {}\n\nfunction Utils.Clamp(value, min, max)\n    return math.max(min, math.min(max, value))\nend\n\nfunction Utils.Lerp(a, b, t)\n    return a + (b - a) * t\nend\n\nprint("Utils loaded: Clamp, Lerp")`,
    environment: "lua",
    expectedOutput: "Utils loaded: Clamp, Lerp",
  },
  miniExercise: {
    id: "mes-12-l01-exercise",
    lessonId: "mes-12-l01",
    title: "Crea Utils",
    instructions: "Implementa Clamp y Lerp functions.",
    starterCode: `local Utils = {}\nfunction Utils.Clamp(v, min, max) return math.max(min, math.min(max, v)) end\nprint(Utils.Clamp(5, 0, 10))`,
    solution: `local Utils = {}\nfunction Utils.Clamp(v, min, max) return math.max(min, math.min(max, v)) end\nprint(Utils.Clamp(5, 0, 10))`,
    tests: [{ type: "output_contains", expected: "5", message: "Debe retornar 5" }],
    hints: ["Usa math.max y math.min"],
    xpReward: 100,
    difficulty: "intermediate",
  },
  summary: "El toolkit incluye: Clamp, Lerp, Approach, y funciones de utilidad.",
  resources: [{ title: "Lua Utils", url: "https://example.com", type: "documentation" }],
  prerequisites: ["mes-11-l06"],
};
