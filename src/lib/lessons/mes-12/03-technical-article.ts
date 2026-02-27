/**
 * Módulo 12: Portfolio - Lección 12.3
 * Artículo Técnico: estructura, publicar en blog
 */

import { Lesson } from "@/types/lesson";

export const lesson03: Lesson = {
  id: "mes-12-l03",
  moduleId: "mes-12",
  lessonNumber: 3,
  title: "Artículo Técnico",
  description: "Escribir y publicar artículos técnicos sobre desarrollo de juegos.",
  estimatedTime: 40,
  difficulty: "intermediate",
  theory: {
    title: "Artículos Técnicos",
    objectives: ["Estructurar artículo", "Escribir claramente", "Publicar en blog"],
    estimatedTime: 40,
    sections: [{ heading: "Estructura", content: "Un buen artículo tiene: introducción, cuerpo, conclusión.", codeExamples: [] }],
    summary: "Los artículos técnicos comparten conocimiento con la comunidad.",
  },
  examples: [],
  interactive: {
    title: "Blog Post Outline",
    description: "Crea un outline para artículo técnico",
    starterCode: `local article = {\n    title = "Mi Artículo Técnico",\n    sections = {"Introducción", "Desarrollo", "Conclusión"},\n    wordCount = 0\n}\nprint("Article: " .. article.title)\nprint("Sections: " .. #article.sections)`,
    environment: "lua",
    expectedOutput: "Article: Mi Artículo Técnico\nSections: 3",
  },
  miniExercise: {
    id: "mes-12-l03-exercise",
    lessonId: "mes-12-l03",
    title: "Escribe Outline",
    instructions: "Crea un outline de artículo con 3 secciones.",
    starterCode: `local outline = {title = "", sections = {}}\noutline.title = "Cómo hacer X"\noutline.sections = {"Intro", "Steps", "Conclusion"}\nprint(outline.title)`,
    solution: `local outline = {title = "Cómo hacer X", sections = {"Intro", "Steps", "Conclusion"}}\nprint(outline.title)`,
    tests: [{ type: "output_contains", expected: "Cómo", message: "Debe tener título" }],
    hints: ["Define título y secciones"],
    xpReward: 100,
    difficulty: "beginner",
  },
  summary: "Un artículo técnico requiere: título claro, estructura lógica, ejemplos.",
  resources: [{ title: "Technical Writing", url: "https://example.com", type: "article" }],
  prerequisites: ["mes-12-l02"],
};
