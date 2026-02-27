/**
 * Módulo 11: Producción - Lección 11.6
 * Proyecto: Alpha Jugable
 * 
 * NOTE: Placeholder lesson - full content needs to be restored from backup
 */

import { Lesson } from "@/types/lesson";

export const lesson06: Lesson = {
  id: "mes-11-l06",
  moduleId: "mes-11",
  lessonNumber: 6,
  title: "Alpha Jugable",
  description: "Proyecto final: crear un alpha jugable completo con todos los sistemas integrados.",
  estimatedTime: 60,
  difficulty: "expert",
  theory: {
    title: "Alpha Jugable",
    objectives: ["Integrar todos los sistemas", "Crear demo jugable", "Preparar para testing"],
    estimatedTime: 60,
    sections: [{ heading: "Alpha vs Beta", content: "El alpha es la primera versión jugable completa.", codeExamples: [] }],
    summary: "El alpha jugable demuestra que el core del juego funciona.",
  },
  examples: [],
  interactive: {
    title: "Game Integration",
    description: "Integra todos los sistemas del juego",
    starterCode: `local Game = {}\nGame.__index = Game\n\nfunction Game:New()\n    local self = setmetatable({}, Game)\n    self.systems = {}\n    return self\nend\n\nfunction Game:AddSystem(name, system)\n    self.systems[name] = system\n    print("Added system: " .. name)\nend\n\nlocal game = Game:New()\ngame:AddSystem("Input", {})\ngame:AddSystem("Update", {})\ngame:AddSystem("Render", {})`,
    environment: "lua",
    expectedOutput: "Added system: Input\nAdded system: Update\nAdded system: Render",
  },
  miniExercise: {
    id: "mes-11-l06-exercise",
    lessonId: "mes-11-l06",
    title: "Integra Sistemas",
    instructions: "Crea un juego con 3 sistemas básicos.",
    starterCode: `local game = {systems = {}}\ngame.systems.input = {}\ngame.systems.update = {}\ngame.systems.render = {}\nprint("Game has " .. #game.systems .. " systems")`,
    solution: `local game = {systems = {input = {}, update = {}, render = {}}}\nprint("Game has 3 systems")`,
    tests: [{ type: "output_contains", expected: "systems", message: "Debe mencionar sistemas" }],
    hints: ["Crea 3 sistemas: input, update, render"],
    xpReward: 150,
    difficulty: "advanced",
  },
  summary: "El alpha jugable integra: Core Loop, Contenido, Menús, Polish y Debug.",
  resources: [{ title: "Alpha Testing", url: "https://example.com", type: "article" }],
  prerequisites: ["mes-11-l05"],
};
