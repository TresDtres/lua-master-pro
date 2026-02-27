/**
 * Módulo 11: Producción - Lección 11.2
 * Contenido: 3 niveles, 3 enemigos, variedad
 * 
 * NOTE: Placeholder lesson - full content needs to be restored from backup
 */

import { Lesson } from "@/types/lesson";

export const lesson02: Lesson = {
  id: "mes-11-l02",
  moduleId: "mes-11",
  lessonNumber: 2,
  title: "Contenido",
  description: "Creación de contenido: diseño de 3 niveles, 3 tipos de enemigos, variedad de items y balance.",
  estimatedTime: 45,
  difficulty: "intermediate",
  theory: {
    title: "Creación de Contenido",
    objectives: [
      "Diseñar niveles con progresión de dificultad",
      "Crear enemigos con comportamientos únicos",
      "Implementar variedad de items y recompensas",
    ],
    estimatedTime: 45,
    sections: [
      {
        heading: "Diseño de Niveles",
        content: "Un buen diseño de niveles guía al jugador mediante progresión y variedad.\n\n**Principios:**\n1. Curva de dificultad - Fácil → Medio → Difícil\n2. Enseñanza progresiva - Introducir, practicar, dominar\n3. Variedad - No repetir el mismo diseño\n4. Recompensas - Satisfacción por progreso",
        codeExamples: [],
      },
    ],
    summary: "El diseño de niveles requiere progresión, variedad y recompensas balanceadas.",
  },
  examples: [],
  interactive: {
    title: "Level Designer",
    description: "Diseña un nivel básico",
    starterCode: `-- Level Designer\nlocal Level = {\n    name = "Bosque Inicial",\n    difficulty = 1,\n    enemies = {},\n    checkpoints = {}\n}\n\nfunction Level:SpawnEnemy(type, x, y)\n    table.insert(self.enemies, {type = type, x = x, y = y})\n    print("Spawned " .. type .. " at (" .. x .. ", " .. y .. ")")\nend\n\n-- Test\nLevel:SpawnEnemy("Goblin", 100, 50)\nLevel:SpawnEnemy("Slime", 200, 75)`,
    environment: "lua",
    expectedOutput: "Spawned Goblin at (100, 50)\nSpawned Slime at (200, 75)",
  },
  miniExercise: {
    id: "mes-11-l02-exercise",
    lessonId: "mes-11-l02",
    title: "Diseña 3 Niveles",
    instructions: "Crea 3 niveles con dificultad progresiva.",
    starterCode: `-- Crea 3 niveles\nlocal levels = {\n    { name = "Nivel 1", difficulty = 1 },\n    -- TODO: Agregar nivel 2 y 3\n}\n\nfor _, level in ipairs(levels) do\n    print(level.name .. " - Dificultad: " .. level.difficulty)\nend`,
    solution: `local levels = {\n    { name = "Bosque", difficulty = 1 },\n    { name = "Cueva", difficulty = 2 },\n    { name = "Castillo", difficulty = 3 }\n}\n\nfor _, level in ipairs(levels) do\n    print(level.name .. " - Dificultad: " .. level.difficulty)\nend`,
    tests: [
      { type: "output_contains", expected: "Dificultad:", message: "Debe mostrar dificultad" },
    ],
    hints: ["Agrega 3 niveles con dificultad 1, 2, 3"],
    xpReward: 100,
    difficulty: "intermediate",
  },
  summary: "Diseña 3 niveles con progresión: Bosque (fácil), Cueva (medio), Castillo (difícil).",
  resources: [
    { title: "Level Design Basics", url: "https://levelup.gituts.com/", type: "article" },
  ],
  prerequisites: ["mes-11-l01"],
};
