/**
 * Módulo 10: Arquitectura - Lección 10.6 (Parte 1)
 * Proyecto: Framework Completo - Teoría
 */

import { LessonTheory, CodeSnippet } from "@/types/lesson";

export const theory: Omit<LessonTheory, 'summary'> = {
  title: "Framework Completo: Integrando Todo",
  objectives: [
    "Integrar GameMode, GameState y PlayerState",
    "Aplicar configuración data-driven con hot-reload",
    "Implementar patrones de diseño (Singleton, Observer, Command, State)",
    "Escribir tests para el framework completo",
    "Organizar el código modularmente",
  ],
  estimatedTime: 60,
  sections: [
    {
      heading: "Arquitectura del Framework",
      content: `En esta lección final, **integramos todos los conceptos** del módulo en un framework completo y funcional.

**Componentes que integraremos:**

1. **Core** - Game, State Machine, Event Bus
2. **Entities** - Player, Enemy, NPC con sus estados
3. **Systems** - Combat, Inventory, Quest, Dialogue
4. **Data** - Configuración JSON externa
5. **UI** - Menús, HUD, notificaciones
6. **Tests** - Unit tests para cada sistema`,
      codeExamples: [
        {
          title: "Estructura del Framework",
          code: `-- framework/
├── main.lua
├── config/
│   ├── game.json
│   ├── enemies.json
│   └── items.json
├── src/
│   ├── core/
│   │   ├── Game.lua
│   │   ├── StateMachine.lua
│   │   └── EventBus.lua
│   ├── entities/
│   │   ├── Player.lua
│   │   └── Enemy.lua
│   ├── systems/
│   │   ├── CombatSystem.lua
│   │   └── InventorySystem.lua
│   └── utils/
│       ├── Logger.lua
│       └── JSON.lua
└── tests/
    ├── test_player.lua
    └── test_combat.lua`,
          language: "text" as unknown as "lua" | "cpp" | "typescript",
          description: "Estructura completa del framework.",
        },
      ] as unknown as CodeSnippet[],
    },
    {
      heading: "Integración de Sistemas",
      content: `**Flujo del framework:**

1. main.lua inicializa configuración
2. Game crea sistemas (Combat, Inventory, Quest)
3. Game crea entidades (Player, Enemies)
4. Game loop: Update → Render → Events
5. Sistemas se comunican via EventBus
6. Estado persiste en GameState`,
      codeExamples: [
        {
          title: "Game Loop Principal",
          code: `-- Game.lua
local Game = {}
Game.__index = Game

function Game:New()
    local self = setmetatable({}, Game)
    self.eventBus = EventBus:New()
    self.stateMachine = StateMachine:New()
    self.combatSystem = CombatSystem:New()
    self.inventorySystem = InventorySystem:New()
    return self
end

function Game:Update(dt)
    self.stateMachine:update(dt)
    self.combatSystem:update(dt)
    self.inventorySystem:update(dt)
end

return Game`,
          language: "lua" as unknown as "lua" | "cpp" | "typescript",
          description: "Game loop integrando todos los sistemas.",
        },
      ] as unknown as CodeSnippet[],
    },
  ],
};

export const examples: CodeSnippet[] = [
  {
    title: "Configuración Data-Driven",
    code: `-- config/enemies.json
{
  "goblin": {
    "health": 50,
    "damage": 10,
    "expReward": 25
  },
  "orc": {
    "health": 100,
    "damage": 20,
    "expReward": 50
  }
}

-- En código Lua
local enemies = JSON.parseFile("config/enemies.json")
local goblin = Enemy:New("goblin`,
    language: "lua" as unknown as "lua" | "cpp" | "typescript",
    description: "Configuración externa de enemigos.",
  },
] as unknown as CodeSnippet[];
