/**
 * Módulo 10: Arquitectura - Lección 10.1 (Parte 2)
 * Game Framework: Interactivo y Ejercicio
 */

import { InteractiveExample, MiniExercise, LessonResource } from "@/types/lesson";

export const interactive: InteractiveExample = {
  title: "Simulador de Game Framework",
  description: "Implementa un Game Framework básico con GameMode y GameState",
  starterCode: `-- Framework Simulator
local Framework = {}
Framework.__index = Framework

function Framework:New()
    local self = setmetatable({}, Framework)
    self.gameMode = nil
    self.gameState = nil
    self.isRunning = false
    return self
end

function Framework:Initialize()
    -- TODO: Crear GameMode y GameState
    -- self.gameMode = require("GameMode"):New()
    -- self.gameState = require("GameState"):New()
    print("Framework initialized")
end

function Framework:Update(dt)
    if not self.isRunning then return end
    -- TODO: Actualizar gameMode y gameState
    -- self.gameMode:OnUpdate(dt)
    -- self.gameState:OnUpdate(dt)
end

-- Test
local fw = Framework:New()
fw:Initialize()
print("Framework test complete")`,
  environment: "lua",
  expectedOutput: "Framework initialized\nFramework test complete",
};

export const miniExercise: MiniExercise = {
  id: "mes-10-l01-exercise",
  lessonId: "mes-10-l01",
  title: "Crea un GameMode de Supervivencia",
  instructions: `Implementa un **GameMode de Supervivencia** con:

1. **Oleadas de enemigos** - Cada 60 segundos aumenta dificultad
2. **Contador de supervivencia** - Tiempo total sobrevivido
3. **Sistema de puntuación** - Puntos por enemigo eliminado
4. **Condición de derrota** - Game over cuando todos mueren

**Requisitos:**
- Método \`StartWave()\` que incremente dificultad
- Método \`OnPlayerDown()\` que verifique game over
- Método \`OnEnemyKilled()\` que sume puntos
- Propiedad \`survivalTime\` que trackee tiempo`,
  starterCode: `-- SurvivalGameMode.lua
local SurvivalGameMode = {}
SurvivalGameMode.__index = SurvivalGameMode

function SurvivalGameMode:New()
    local self = setmetatable({}, SurvivalGameMode)
    -- TODO: Inicializa propiedades
    return self
end

function SurvivalGameMode:OnInit()
    -- TODO: Imprime mensaje inicial
end

function SurvivalGameMode:OnUpdate(dt)
    -- TODO: Incrementa survivalTime y waveTimer
end

function SurvivalGameMode:StartWave()
    -- TODO: Incrementa wave e imprime mensaje
end

function SurvivalGameMode:OnPlayerDown(player)
    -- TODO: Reduce playersAlive y verifica game over
end

function SurvivalGameMode:OnEnemyKilled(player, enemy)
    -- TODO: Suma puntos al jugador
end

return SurvivalGameMode`,
  solution: `-- SurvivalGameMode.lua
local SurvivalGameMode = {}
SurvivalGameMode.__index = SurvivalGameMode

function SurvivalGameMode:New()
    local self = setmetatable({}, SurvivalGameMode)
    self.wave = 0
    self.survivalTime = 0
    self.scores = {}
    self.playersAlive = 0
    self.waveTimer = 0
    self.waveInterval = 60
    self.isGameOver = false
    return self
end

function SurvivalGameMode:OnInit()
    print("Survival GameMode initialized!")
end

function SurvivalGameMode:OnUpdate(dt)
    if self.isGameOver then return end
    self.survivalTime = self.survivalTime + dt
    self.waveTimer = self.waveTimer + dt
    if self.waveTimer >= self.waveInterval then
        self.waveTimer = 0
        self:StartWave()
    end
end

function SurvivalGameMode:StartWave()
    self.wave = self.wave + 1
    print("Wave " .. self.wave .. " started!")
end

function SurvivalGameMode:OnPlayerDown(player)
    self.playersAlive = self.playersAlive - 1
    if self.playersAlive <= 0 then
        print("GAME OVER!")
        self.isGameOver = true
    end
end

function SurvivalGameMode:OnEnemyKilled(player, enemy)
    self.scores[player.id] = (self.scores[player.id] or 0) + 100
    print(player.name .. " scored 100 points!")
end

return SurvivalGameMode`,
  tests: [
    {
      type: "output_equals",
      expected: "Survival GameMode initialized!",
      message: "Debe imprimir mensaje de inicialización",
    },
    {
      type: "code_contains",
      expected: "self.wave = self.wave + 1",
      message: "Debe incrementar wave en StartWave",
    },
    {
      type: "code_contains",
      expected: "GAME OVER",
      message: "Debe imprimir GAME OVER cuando no queden jugadores",
    },
  ],
  hints: [
    "Inicializa \`wave = 0\` y \`survivalTime = 0\` en el constructor",
    "En \`OnUpdate\`, incrementa ambos timers con \`dt\`",
    "Usa \`math.floor(self.survivalTime)\` para mostrar segundos enteros",
    "Verifica \`playersAlive <= 0\` para game over",
  ],
  xpReward: 150,
  difficulty: "advanced",
};

export const resources: LessonResource[] = [
  {
    title: "Unreal Engine GameMode Documentation",
    url: "https://docs.unrealengine.com/5.0/en-US/API/Runtime/Engine/GameFramework/AGameModeBase/",
    type: "documentation",
    description: "Documentación oficial de GameMode en UE5",
  },
  {
    title: "Game Architecture Patterns",
    url: "https://gameprogrammingpatterns.com/game-loop.html",
    type: "article",
    description: "Patrones de arquitectura de juegos",
  },
  {
    title: "Lua Game Framework Tutorial",
    url: "https://www.lua.org/gamedev",
    type: "article",
    description: "Tutorial de frameworks en Lua",
  },
];
