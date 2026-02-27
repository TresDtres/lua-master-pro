/**
 * Módulo 11: Producción - Lección 11.3
 * Menús: principal, opciones, pausa, HUD
 * 
 * NOTE: Placeholder lesson - full content needs to be restored from backup
 */

import { Lesson } from "@/types/lesson";

export const lesson03: Lesson = {
  id: "mes-11-l03",
  moduleId: "mes-11",
  lessonNumber: 3,
  title: "Menús",
  description: "Implementación de menús: principal, opciones, pausa y HUD.",
  estimatedTime: 40,
  difficulty: "intermediate",
  theory: {
    title: "Sistema de Menús",
    objectives: [
      "Crear menú principal atractivo",
      "Implementar menú de opciones",
      "Sistema de pausa funcional",
    ],
    estimatedTime: 40,
    sections: [{ heading: "Tipos de Menús", content: "Los menús son esenciales para la UX del juego.", codeExamples: [] }],
    summary: "Los menús proporcionan la interfaz entre el jugador y el juego.",
  },
  examples: [],
  interactive: {
    title: "Menu System",
    description: "Crea un sistema de menús básico",
    starterCode: `local Menu = {}\nMenu.__index = Menu\n\nfunction Menu:New(title)\n    local self = setmetatable({}, Menu)\n    self.title = title\n    self.options = {}\n    return self\nend\n\nfunction Menu:AddOption(text, callback)\n    table.insert(self.options, {text = text, callback = callback})\nend\n\nlocal mainMenu = Menu:New("Main Menu")\nmainMenu:AddOption("Start", function() print("Starting...") end)\nmainMenu:AddOption("Quit", function() print("Quitting...") end)`,
    environment: "lua",
    expectedOutput: "",
  },
  miniExercise: {
    id: "mes-11-l03-exercise",
    lessonId: "mes-11-l03",
    title: "Crea Menú Principal",
    instructions: "Implementa un menú principal con 3 opciones.",
    starterCode: `local options = {"Start", "Options", "Quit"}\nfor i, opt in ipairs(options) do\n    print(i .. ". " .. opt)\nend`,
    solution: `local options = {"Start", "Options", "Quit"}\nfor i, opt in ipairs(options) do\n    print(i .. ". " .. opt)\nend`,
    tests: [{ type: "output_contains", expected: "Start", message: "Debe mostrar Start" }],
    hints: ["Imprime las 3 opciones"],
    xpReward: 100,
    difficulty: "beginner",
  },
  summary: "Los menús incluyen: Principal, Opciones, Pausa y HUD.",
  resources: [{ title: "UI Design", url: "https://example.com", type: "article" }],
  prerequisites: ["mes-11-l02"],
};
