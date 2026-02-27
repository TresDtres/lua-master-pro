/**
 * Módulo 12: Portfolio - Lección 12.5
 * Portfolio: 5 proyectos, web personal, GitHub
 */

import { Lesson } from "@/types/lesson";

export const lesson05: Lesson = {
  id: "mes-12-l05",
  moduleId: "mes-12",
  lessonNumber: 5,
  title: "Portfolio",
  description: "Crear portfolio profesional: 5 proyectos, web personal, GitHub optimizado.",
  estimatedTime: 50,
  difficulty: "advanced",
  theory: {
    title: "Portfolio Profesional",
    objectives: ["Seleccionar 5 proyectos", "Crear web personal", "Optimizar GitHub"],
    estimatedTime: 50,
    sections: [{ heading: "Proyectos Destacados", content: "Un buen portfolio muestra 5 proyectos de calidad.", codeExamples: [] }],
    summary: "El portfolio demuestra tus habilidades a empleadores.",
  },
  examples: [],
  interactive: {
    title: "Portfolio Builder",
    description: "Organiza tus proyectos",
    starterCode: `local portfolio = {\n    name = "Mi Portfolio",\n    projects = {}\n}\n\nfunction portfolio:AddProject(name, tech)\n    table.insert(self.projects, {name = name, tech = tech})\n    print("Added: " .. name)\nend\n\nportfolio:AddProject("Game 1", "Lua + UE5")\nportfolio:AddProject("Game 2", "Lua + Love2D")`,
    environment: "lua",
    expectedOutput: "Added: Game 1\nAdded: Game 2",
  },
  miniExercise: {
    id: "mes-12-l05-exercise",
    lessonId: "mes-12-l05",
    title: "Crea Portfolio",
    instructions: "Lista 3 proyectos para tu portfolio.",
    starterCode: `local projects = {"Proyecto 1", "Proyecto 2", "Proyecto 3"}\nfor i, p in ipairs(projects) do\n    print(i .. ". " .. p)\nend`,
    solution: `local projects = {"Proyecto 1", "Proyecto 2", "Proyecto 3"}\nfor i, p in ipairs(projects) do\n    print(i .. ". " .. p)\nend`,
    tests: [{ type: "output_contains", expected: "Proyecto", message: "Debe mostrar proyectos" }],
    hints: ["Crea una tabla con 3 proyectos"],
    xpReward: 100,
    difficulty: "beginner",
  },
  summary: "El portfolio incluye: 5 proyectos, web personal, GitHub, LinkedIn.",
  resources: [{ title: "Portfolio Tips", url: "https://example.com", type: "article" }],
  prerequisites: ["mes-12-l04"],
};
