/**
 * Módulo 10: Arquitectura - Lección 10.1 (Parte 1)
 * Game Framework: Teoría y Ejemplos
 */

import { LessonTheory, CodeSnippet } from "@/types/lesson";

export const theory: LessonTheory = {
  title: "Game Framework: Arquitectura Central",
  objectives: [
    "Comprender la arquitectura de un Game Framework",
    "Implementar GameMode, GameState y PlayerState en Lua",
    "Entender el ciclo de vida del juego",
    "Gestionar estados y transiciones entre sistemas",
  ],
  estimatedTime: 50,
  sections: [
    {
      heading: "¿Qué es un Game Framework?",
      content: `Un **Game Framework** es la arquitectura fundamental que organiza todos los sistemas de tu juego.

**Propósito:**
- **Estructura** - Organiza código de manera consistente
- **Reutilización** - Componentes modulares para múltiples juegos
- **Mantenibilidad** - Fácil de extender y debuggear
- **Separación de responsabilidades** - Cada sistema hace una cosa

**Componentes principales:**
1. **GameMode** - Reglas del juego, lógica central
2. **GameState** - Estado actual (pausa, jugando, game over)
3. **PlayerState** - Información del jugador (stats, inventario)
4. **GameManager** - Coordinador principal (singleton)

**En Unreal Engine:**
- **AGameModeBase** - Define reglas del juego
- **AGameStateBase** - Replica estado a todos los clientes
- **APlayerState** - Información individual por jugador

**En Lua:**
Implementamos patrones similares usando **tablas y módulos**.`,
      codeExamples: [
        {
          title: "Estructura básica de Framework",
          code: `-- Framework.lua
local Framework = {}

function Framework:New()
    local self = setmetatable({}, { __index = Framework })
    self.gameMode = nil
    self.gameState = nil
    self.players = {}
    self.isRunning = false
    self.deltaTime = 0
    return self
end

function Framework:Initialize()
    self.gameMode = require("GameMode"):New()
    self.gameState = require("GameState"):New()
    self.gameMode:OnInit()
    self.gameState:SetState("MENU")
    self.isRunning = true
end

function Framework:Update(dt)
    if not self.isRunning then return end
    self.deltaTime = dt
    self.gameMode:OnUpdate(dt)
    self.gameState:OnUpdate(dt)
    for _, player in ipairs(self.players) do
        player:Update(dt)
    end
end

return Framework`,
          language: "lua",
          description: "Framework principal que coordina todos los sistemas.",
        },
      ],
    },
    {
      heading: "GameMode: Las Reglas del Juego",
      content: `El **GameMode** define **cómo se juega** tu juego.

**Responsabilidades:**
- **Reglas** - Cómo ganar/perder, puntuación
- **Spawning** - Dónde y cuándo aparecen jugadores/enemigos
- **Configuración** - Número de jugadores, tiempo límite
- **Lógica central** - Condiciones de victoria/derrota

**Características:**
- **Solo en servidor** (en juegos multijugador)
- **No se replica** a clientes (solo el resultado)
- **Persiste** entre rondas/partidas`,
      codeExamples: [
        {
          title: "GameMode para FPS",
          code: `-- GameMode.lua
local GameMode = {}
GameMode.__index = GameMode

function GameMode:New()
    local self = setmetatable({}, GameMode)
    self.maxPlayers = 8
    self.scoreLimit = 100
    self.timeLimit = 600
    self.teams = {[1] = {score = 0}, [2] = {score = 0}}
    self.isRoundActive = false
    return self
end

function GameMode:PlayerScore(player, points)
    local team = self.teams[player.teamId]
    team.score = team.score + points
    if team.score >= self.scoreLimit then
        self:EndRound(player.teamId)
    end
end

return GameMode`,
          language: "lua",
          description: "GameMode simple para FPS team-based.",
        },
      ],
    },
  ],
  summary: `## Resumen: Game Framework

**Componentes principales:**

| Componente | Responsabilidad | Ejemplo |
|------------|----------------|---------|
| **GameMode** | Reglas, spawning, victoria | FPS, RPG, Survival |
| **GameState** | Estado, leaderboard, tiempo | MENU → PLAYING → GAME_OVER |
| **PlayerState** | Stats, inventario, progreso | Health, XP, items |

**Mejores prácticas:**
- GameMode solo en servidor
- GameState es la fuente de verdad
- PlayerState notifica cambios via eventos
- Mantener componentes desacoplados`,
};

export const examples: CodeSnippet[] = [
  {
    title: "GameState Implementation",
    code: `-- GameState.lua
local GameState = {}
GameState.__index = GameState

function GameState:New()
    local self = setmetatable({}, GameState)
    self.state = "MENU"
    self.startTime = 0
    self.elapsedTime = 0
    self.leaderboard = {}
    return self
end

function GameState:SetState(newState)
    self.state = newState
    if newState == "PLAYING" then
        self.startTime = os.time()
    end
end

function GameState:OnUpdate(dt)
    if self.state == "PLAYING" then
        self.elapsedTime = os.time() - self.startTime
    end
end

return GameState`,
    language: "lua",
    description: "GameState que trackea el estado del juego y tiempo.",
  },
];
