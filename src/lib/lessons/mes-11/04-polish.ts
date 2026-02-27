/**
 * Módulo 11: Producción - Lección 11.4
 * Polish: partículas, audio, juice
 * 
 * NOTE: Placeholder lesson - full content needs to be restored from backup
 */

import { Lesson } from "@/types/lesson";

export const lesson04: Lesson = {
  id: "mes-11-l04",
  moduleId: "mes-11",
  lessonNumber: 4,
  title: "Polish",
  description: "Polish: partículas, efectos de audio, feedback visual y game juice.",
  estimatedTime: 45,
  difficulty: "advanced",
  theory: {
    title: "Game Polish",
    objectives: ["Agregar partículas", "Implementar audio", "Crear feedback visual"],
    estimatedTime: 45,
    sections: [{ heading: "Game Juice", content: "El polish hace que el juego se sienta vivo.", codeExamples: [] }],
    summary: "El polish transforma un juego bueno en excelente.",
  },
  examples: [],
  interactive: {
    title: "Particle System",
    description: "Sistema de partículas básico",
    starterCode: `local Particle = {}\nfunction Particle:new(x, y)\n    return {x = x, y = y, life = 1.0}\nend\n\nlocal particles = {}\nfor i = 1, 10 do\n    table.insert(particles, Particle:new(100, 100))\nend\nprint("Created " .. #particles .. " particles")`,
    environment: "lua",
    expectedOutput: "Created 10 particles",
  },
  miniExercise: {
    id: "mes-11-l04-exercise",
    lessonId: "mes-11-l04",
    title: "Sistema de Partículas",
    instructions: "Crea 10 partículas con vida decreciente.",
    starterCode: `local particles = {}\nfor i = 1, 10 do\n    table.insert(particles, {life = 1.0})\nend\nprint(#particles .. " particles created")`,
    solution: `local particles = {}\nfor i = 1, 10 do\n    table.insert(particles, {life = 1.0})\nend\nprint(#particles .. " particles created")`,
    tests: [{ type: "output_contains", expected: "10", message: "Debe crear 10 partículas" }],
    hints: ["Usa un loop for"],
    xpReward: 100,
    difficulty: "intermediate",
  },
  summary: "El polish incluye: partículas, audio, screen shake, y feedback visual.",
  resources: [{ title: "Game Juice", url: "https://gamejuicebook.com", type: "article" }],
  prerequisites: ["mes-11-l03"],
};
