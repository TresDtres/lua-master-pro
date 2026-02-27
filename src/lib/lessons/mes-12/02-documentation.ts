/**
 * Módulo 12: Portfolio - Lección 12.2
 * Documentación: EmmyLua, README, comentarios
 */

import { Lesson } from "@/types/lesson";

export const lesson02: Lesson = {
  id: "mes-12-l02",
  moduleId: "mes-12",
  lessonNumber: 2,
  title: "Documentación",
  description: "Documentación profesional de código: EmmyLua annotations, README completos y comentarios efectivos.",
  estimatedTime: 45,
  difficulty: "intermediate",
  theory: {
    title: "Documentación Profesional",
    objectives: ["Usar EmmyLua annotations", "Escribir README claros", "Comentar efectivamente"],
    estimatedTime: 45,
    sections: [{ heading: "EmmyLua", content: "EmmyLua provee type hints y autocompletado.", codeExamples: [] }],
    summary: "La documentación incluye: EmmyLua, README, y comentarios claros.",
  },
  examples: [],
  interactive: {
    title: "EmmyLua Annotations",
    description: "Agrega type annotations a tu código",
    starterCode: `--- @class Player\n--- @field x number\n--- @field y number\n--- @field health number\nlocal Player = {}\nPlayer.__index = Player\n\n--- @return Player\nfunction Player:New()\n    local self = setmetatable({}, Player)\n    self.x, self.y, self.health = 0, 0, 100\n    return self\nend\n\nlocal p = Player:New()\nprint("Player created at (" .. p.x .. ", " .. p.y .. ")")`,
    environment: "lua",
    expectedOutput: "Player created at (0, 0)",
  },
  miniExercise: {
    id: "mes-12-l02-exercise",
    lessonId: "mes-12-l02",
    title: "Documenta Clase",
    instructions: "Agrega EmmyLua annotations a una clase.",
    starterCode: `--- @class MyClass\nlocal MyClass = {}\nfunction MyClass:New() return setmetatable({}, {__index = MyClass}) end\nlocal obj = MyClass:New()\nprint("Object created")`,
    solution: `--- @class MyClass\nlocal MyClass = {}\n--- @return MyClass\nfunction MyClass:New() return setmetatable({}, {__index = MyClass}) end\nlocal obj = MyClass:New()\nprint("Object created")`,
    tests: [{ type: "output_contains", expected: "Object created", message: "Debe crear objeto" }],
    hints: ["Agrega @class y @return"],
    xpReward: 100,
    difficulty: "beginner",
  },
  summary: "EmmyLua annotations mejoran el autocompletado y type checking.",
  resources: [{ title: "EmmyLua Docs", url: "https://github.com/EmmyLua", type: "documentation" }],
  prerequisites: ["mes-12-l01"],
};
