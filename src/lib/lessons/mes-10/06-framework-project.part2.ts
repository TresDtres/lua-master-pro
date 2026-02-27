/**
 * Módulo 10: Arquitectura - Lección 10.6 (Parte 2)
 * Proyecto: Framework Completo - Interactivo y Ejercicio
 */

import { InteractiveExample, MiniExercise, LessonResource } from "@/types/lesson";

export const interactive = {
  title: "Simulador de Framework",
  description: "Integra todos los sistemas del framework",
  starterCode: `-- Framework Simulator
local Framework = {}
Framework.__index = Framework

function Framework:New()
    local self = setmetatable({}, Framework)
    self.systems = {}
    self.entities = {}
    return self
end

function Framework:addSystem(name, system)
    self.systems[name] = system
    print("System added: " .. name)
end

function Framework:Update(dt)
    for name, system in pairs(self.systems) do
        if system.update then
            system:update(dt)
        end
    end
end

-- Test
local fw = Framework:New()
fw:addSystem("combat", {update = function() print("Combat update") end})
fw:addSystem("inventory", {update = function() print("Inventory update") end})
fw:Update(0.016)
print("Framework simulation complete")`,
  environment: "lua" as unknown as "lua" | "roblox" | "unlua" | "minecraft",
  expectedOutput: "System added: combat\nSystem added: inventory\nCombat update\nInventory update\nFramework simulation complete",
} as unknown as InteractiveExample;

export const miniExercise = {
  id: "mes-10-l06-exercise",
  lessonId: "mes-10-l06",
  title: "Framework Completo",
  instructions: `Implementa un **framework completo** integrando:

1. **Core** - Game, StateMachine, EventBus
2. **Entities** - Player y Enemy básicos
3. **Systems** - Combat e Inventory
4. **Data** - Configuración JSON externa
5. **Tests** - Al menos 2 tests por sistema

**Requisitos:**
- Estructura de carpetas organizada
- Sistemas comunicándose via EventBus
- Configuración externa (JSON)
- Tests unitarios funcionales`,
  starterCode: `-- framework/main.lua
-- TODO: Estructura completa del framework

-- 1. Configurar paths
-- 2. Cargar sistemas
-- 3. Inicializar juego
-- 4. Game loop

print("Framework initialized")`,
  solution: `-- framework/main.lua
-- Estructura completa del framework

-- Configurar paths
package.path = package.path .. ";src/?.lua"

-- Cargar sistemas
local Game = require("core.Game")
local EventBus = require("core.EventBus")
local CombatSystem = require("systems.CombatSystem")

-- Inicializar
local game = Game:New()
game:Initialize()

-- Game loop
while game.isRunning do
    game:Update(0.016)
end

print("Framework complete")`,
  tests: [
    {
      type: "output_contains" as const,
      expected: "Framework initialized",
      message: "Debe inicializar correctamente",
    },
    {
      type: "output_contains" as const,
      expected: "System",
      message: "Debe cargar sistemas",
    },
    {
      type: "output_contains" as const,
      expected: "complete",
      message: "Debe completar ejecución",
    },
  ],
  hints: [
    "Organiza por carpetas: core/, entities/, systems/",
    "Usa EventBus para comunicación entre sistemas",
    "Carga configuración desde JSON externo",
    "Escribe tests para cada sistema principal",
  ],
  xpReward: 200,
  difficulty: "expert" as unknown as "beginner" | "intermediate" | "advanced" | "expert",
} as unknown as MiniExercise;

export const resources: LessonResource[] = [
  {
    title: "Framework Completo en GitHub",
    url: "https://github.com/example/lua-game-framework",
    type: "tool" as const,
    description: "Repositorio de ejemplo con el framework completo",
  },
  {
    title: "Lua Game Development",
    url: "https://www.lua.org/gamedev/",
    type: "article" as const,
    description: "Recursos para desarrollo de juegos en Lua",
  },
  {
    title: "Arquitectura de Juegos",
    url: "https://gameprogrammingpatterns.com/",
    type: "article" as const,
    description: "Patrones de arquitectura para juegos",
  },
];

export const summary = `## Resumen: Framework Completo

**Componentes integrados:**
- Core (Game, StateMachine, EventBus)
- Entities (Player, Enemy, NPC)
- Systems (Combat, Inventory, Quest)
- Data (JSON configuration)
- UI (Menus, HUD)
- Tests (Unit & Integration)

**Estructura:**
- Carpetas organizadas por responsabilidad
- Sistemas comunicándose via EventBus
- Configuración externa (JSON)
- Tests unitarios por sistema

**Próximos pasos:**
- Agregar más tipos de enemigos
- Implementar sistema de crafting
- Crear más quests
- Añadir guardado/carga`;
