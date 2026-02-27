/**
 * Módulo 11: Producción - Lección 11.1
 * Core Loop: input, update, render, optimización
 * 
 * NOTE: This is a placeholder lesson. The full lesson content needs to be restored.
 */

import { Lesson } from "@/types/lesson";

export const lesson01: Lesson = {
  id: "mes-11-l01",
  moduleId: "mes-11",
  lessonNumber: 1,
  title: "Core Loop",
  description: "El bucle principal del juego: gestión de input, update, render y técnicas de optimización.",
  estimatedTime: 50,
  difficulty: "advanced",
  theory: {
    title: "Core Loop: El Corazón del Juego",
    objectives: [
      "Entender el game loop y sus fases",
      "Implementar gestión de input eficiente",
      "Separar update lógico de renderizado",
      "Aplicar técnicas de optimización",
    ],
    estimatedTime: 50,
    sections: [
      {
        heading: "¿Qué es el Core Loop?",
        content: "El Core Loop (bucle principal) es el corazón de cualquier juego. Se ejecuta 60 veces por segundo (60 FPS) y coordina todo.\n\n**Fases del Core Loop:**\n1. INPUT - Leer teclado/mouse/gamepad\n2. UPDATE - Lógica del juego, IA, física\n3. RENDER - Dibujar en pantalla\n4. VSYNC - Esperar siguiente frame\n\n**Timing crítico:**\n- 16.67ms por frame a 60 FPS\n- 33.33ms por frame a 30 FPS\n- Si excedes el tiempo → frame drop → lag",
        codeExamples: [
          {
            title: "Game Loop básico",
            code: `-- GameLoop.lua\nlocal GameLoop = {}\nGameLoop.__index = GameLoop\n\nfunction GameLoop:New()\n    local self = setmetatable({}, GameLoop)\n    self.isRunning = false\n    self.deltaTime = 0\n    return self\nend\n\nfunction GameLoop:Start()\n    self.isRunning = true\n    while self.isRunning do\n        self.deltaTime = love.timer.getDelta()\n        self:Update(self.deltaTime)\n        self:Render()\n    end\nend\n\nfunction GameLoop:Update(dt)\n    -- Lógica del juego\nend\n\nfunction GameLoop:Render()\n    -- Dibujar en pantalla\nend\n\nreturn GameLoop`,
            language: "lua",
            description: "Game Loop básico con delta time",
          },
        ],
      },
    ],
    summary: "El Core Loop tiene 4 fases: INPUT, UPDATE, RENDER, VSYNC. Debe ejecutarse en 16.67ms para 60 FPS.",
  },
  examples: [
    {
      title: "Input System",
      code: `-- InputSystem.lua\nlocal InputSystem = {}\n\nfunction InputSystem:new()\n    local self = setmetatable({}, {__index = InputSystem})\n    self.keyStates = {}\n    return self\nend\n\nfunction InputSystem:update()\n    for key, state in pairs(self.keyStates) do\n        if state == "PRESSED" then\n            self.keyStates[key] = "HELD"\n        end\n    end\nend\n\nreturn InputSystem`,
      language: "lua",
      description: "Sistema de input con estados",
    },
  ],
  interactive: {
    title: "Game Loop Simulator",
    description: "Simula un game loop básico con delta time",
    starterCode: `-- Game Loop Simulator\nlocal Game = {}\nGame.__index = Game\n\nfunction Game:New()\n    local self = setmetatable({}, Game)\n    self.frameCount = 0\n    self.fps = 0\n    return self\nend\n\nfunction Game:Update(dt)\n    -- TODO: Implementar update\n    print("Update called with dt: " .. dt)\nend\n\nfunction Game:Render()\n    -- TODO: Implementar render\n    print("Render called")\nend\n\n-- Test\nlocal game = Game:New()\ngame:Update(0.016)\ngame:Render()`,
    environment: "lua",
    expectedOutput: "Update called with dt: 0.016\nRender called",
  },
  miniExercise: {
    id: "mes-11-l01-exercise",
    lessonId: "mes-11-l01",
    title: "Implementa Delta Time",
    instructions: "Implementa un game loop que use delta time correctamente para movimiento consistente.",
    starterCode: `-- Fix the game loop\nlocal Game = {}\nGame.__index = Game\n\nfunction Game:New()\n    local self = setmetatable({}, Game)\n    self.player = { x = 0, speed = 100 }\n    return self\nend\n\nfunction Game:update(dt)\n    -- TODO: Use dt for consistent movement\n    self.player.x = self.player.x + self.player.speed * dt\n    print("Player X: " .. self.player.x)\nend\n\n-- Test\nlocal game = Game:New()\nfor i = 1, 10 do\n    game:update(0.016)\nend`,
    solution: `local Game = {}\nGame.__index = Game\n\nfunction Game:New()\n    local self = setmetatable({}, Game)\n    self.player = { x = 0, speed = 100 }\n    return self\nend\n\nfunction Game:update(dt)\n    self.player.x = self.player.x + self.player.speed * dt\n    print("Player X: " .. self.player.x)\nend\n\nlocal game = Game:New()\nfor i = 1, 10 do\n    game:update(0.016)\nend`,
    tests: [
      {
        type: "output_contains",
        expected: "Player X:",
        message: "Debe imprimir la posición del jugador",
      },
      {
        type: "output_contains",
        expected: "* dt",
        message: "Debe usar delta time en el cálculo",
      },
    ],
    hints: [
      "Multiplica la velocidad por dt",
      "Velocidad * dt = distancia por frame",
    ],
    xpReward: 100,
    difficulty: "intermediate",
  },
  summary: "El Core Loop tiene 4 fases: INPUT, UPDATE, RENDER, VSYNC. Usa delta time para consistencia.",
  resources: [
    {
      title: "Game Loop Pattern",
      url: "https://gameprogrammingpatterns.com/game-loop.html",
      type: "article",
      description: "Patrón Game Loop explicado",
    },
    {
      title: "Delta Time Explained",
      url: "https://gamedev.stackexchange.com/questions/91232/",
      type: "article",
      description: "Por qué usar delta time",
    },
  ],
  prerequisites: ["mes-10-l01", "mes-10-l06"],
};
