/**
 * Módulo 10: Arquitectura - Lección 10.5 (Parte 2)
 * Patrones de Diseño: Interactivo y Ejercicio
 */

import { InteractiveExample, MiniExercise, LessonResource } from "@/types/lesson";

export const interactive = {
  title: "Simulador de Patrones",
  description: "Implementa y prueba patrones de diseño",
  starterCode: `-- Pattern Simulator
local Patterns = {}

-- Singleton
Patterns.Singleton = {}
function Patterns.Singleton:getInstance()
    if not self._instance then
        self._instance = {data = "unique"}
    end
    return self._instance
end

-- Observer
Patterns.Observer = {listeners = {}}
function Patterns.Observer:on(cb) table.insert(self.listeners, cb) end
function Patterns.Observer:emit(...) for _, cb in ipairs(self.listeners) do cb(...) end end

-- Test
local s1 = Patterns.Singleton:getInstance()
local s2 = Patterns.Singleton:getInstance()
print("Same instance:", s1 == s2)

Patterns.Observer:on(function(msg) print("Received:", msg) end)
Patterns.Observer:emit("Hello!")

print("Patterns ready")`,
  environment: "lua" as unknown as "lua" | "roblox" | "unlua" | "minecraft",
  expectedOutput: "Same instance: true\nReceived: Hello!\nPatterns ready",
} as unknown as InteractiveExample;

export const miniExercise = {
  id: "mes-10-l05-exercise",
  lessonId: "mes-10-l05",
  title: "Puerta con State Pattern",
  instructions: `Implementa una **puerta con máquina de estados**:

1. **Estados:** Closed, Open, Locked, Broken
2. **Transiciones válidas:**
   - Closed ↔ Open
   - Closed → Locked → Closed
   - Any → Broken (terminal)
3. **Mensajes** para cada acción
4. **Validar** transiciones inválidas

**Requisitos:**
- StateMachine con enter(), update(), exit()
- 4 estados implementados
- Transiciones validadas
- Mensajes descriptivos`,
  starterCode: `-- Door.lua with State Pattern
local StateMachine = require("StateMachine")

local Door = {}
Door.__index = Door

function Door:New()
    local self = setmetatable({}, Door)
    self.stateMachine = StateMachine:New("closed")
    return self
end

function Door:open()
    -- TODO: Implementar apertura
end

function Door:close()
    -- TODO: Implementar cierre
end

function Door:lock()
    -- TODO: Implementar bloqueo
end

function Door:unlock()
    -- TODO: Implementar desbloqueo
end

function Door:breakDoor()
    -- TODO: Implementar ruptura
end

return Door`,
  solution: `-- Door.lua
local StateMachine = require("StateMachine")

local Door = {}
Door.__index = Door

function Door:New()
    local self = setmetatable({}, Door)
    self.stateMachine = StateMachine:New("closed")
    return self
end

function Door:open()
    local current = self.stateMachine:getCurrentState()
    if current == "closed" then
        self.stateMachine:setState("open")
        print("Door is OPEN")
    elseif current == "locked" then
        print("Can't open, door is locked!")
    end
end

function Door:close()
    if self.stateMachine:getCurrentState() == "open" then
        self.stateMachine:setState("closed")
        print("Door is CLOSED")
    end
end

function Door:lock()
    if self.stateMachine:getCurrentState() == "closed" then
        self.stateMachine:setState("locked")
        print("Door is LOCKED")
    end
end

function Door:unlock()
    if self.stateMachine:getCurrentState() == "locked" then
        self.stateMachine:setState("closed")
        print("Door unlocked")
    end
end

function Door:breakDoor()
    self.stateMachine:setState("broken")
    print("Door is BROKEN!")
end

return Door`,
  tests: [
    {
      type: "output_contains" as const,
      expected: "Door is CLOSED",
      message: "Estado inicial debe ser Closed",
    },
    {
      type: "output_contains" as const,
      expected: "Door is OPEN",
      message: "Debe poder abrir la puerta",
    },
    {
      type: "output_contains" as const,
      expected: "locked",
      message: "Debe poder bloquear la puerta",
    },
    {
      type: "output_contains" as const,
      expected: "BROKEN",
      message: "Debe poder romper la puerta",
    },
  ],
  hints: [
    "Cada estado necesita enter(), update(), exit()",
    "Usa stateMachine:setState() para transiciones",
    "Verifica el estado actual antes de transicionar",
    "Broken es un estado terminal (no sale de él)",
  ],
  xpReward: 150,
  difficulty: "advanced" as unknown as "beginner" | "intermediate" | "advanced" | "expert",
} as unknown as MiniExercise;

export const resources: LessonResource[] = [
  {
    title: "Game Programming Patterns",
    url: "https://gameprogrammingpatterns.com/",
    type: "article",
    description: "Libro gratuito sobre patrones en juegos",
  },
  {
    title: "Lua Design Patterns",
    url: "https://github.com/kamranahmedse/design-patterns-lua",
    type: "documentation",
    description: "Implementaciones de patrones en Lua",
  },
  {
    title: "State Machines in Games",
    url: "https://gamedevelopment.tutsplus.com/series/state-machine-in-game-development--gamedev-11030",
    type: "article",
    description: "Tutorial sobre state machines",
  },
];

export const summary = `## Resumen: Patrones de Diseño

**Singleton:**
- getInstance() para acceso global
- Una sola instancia compartida
- Ideal para managers

**Observer:**
- attach() y notify()
- Comunicación desacoplada
- Event systems

**Command:**
- execute() y undo()
- Input, macros, undo/redo
- Historial de acciones

**State:**
- enter(), update(), exit()
- Máquinas de estado
- IA y game flow`;
