/**
 * Módulo 10: Arquitectura - Lección 10.5 (Parte 1)
 * Patrones de Diseño: Teoría y Ejemplos
 */

import { LessonTheory, CodeSnippet } from "@/types/lesson";

export const theory: Omit<LessonTheory, 'summary'> = {
  title: "Patrones de Diseño en Lua",
  objectives: [
    "Implementar patrón Singleton para sistemas únicos",
    "Usar Observer para comunicación entre sistemas",
    "Aplicar Command para input y undo/redo",
    "Utilizar State para máquinas de estado",
  ],
  estimatedTime: 55,
  sections: [
    {
      heading: "¿Qué son Patrones de Diseño?",
      content: `**Patrones de Diseño** son soluciones probadas y reutilizables a problemas comunes.

**Beneficios:**
- **Lenguaje común** - Todos entienden "Singleton" o "Observer"
- **Soluciones probadas** - Funcionan en múltiples proyectos
- **Mantenibilidad** - Código más organizado y predecible
- **Flexibilidad** - Fácil de extender y modificar

**Patrones que veremos:**

| Patrón | Propósito | Ejemplo en Juegos |
|--------|-----------|-------------------|
| **Singleton** | Una sola instancia | GameManager, AudioManager |
| **Observer** | Notificar cambios | Logros, UI updates |
| **Command** | Encapsular acciones | Input, undo/redo |
| **State** | Cambiar comportamiento | IA, estados del juego |`,
      codeExamples: [
        {
          title: "Vista rápida de patrones",
          code: `-- SINGLETON
local GameManager = {}
local _instance = nil
function GameManager:getInstance()
    if not _instance then _instance = {score = 0} end
    return _instance
end

-- OBSERVER
local Event = {listeners = {}}
function Event:on(cb) table.insert(self.listeners, cb) end
function Event:emit(...) for _, cb in ipairs(self.listeners) do cb(...) end end

-- COMMAND
local MoveCommand = {}
function MoveCommand:execute() player:move(1, 0) end
function MoveCommand:undo() player:move(-1, 0) end

-- STATE
local StateMachine = {}
function StateMachine:change(s) self.current = s end`,
          language: "lua",
          description: "Vista rápida de los cuatro patrones.",
        },
      ],
    },
    {
      heading: "Singleton: Una Sola Instancia",
      content: `**Singleton** garantiza que una clase tenga **una sola instancia**.

**Cuándo usar:**
- ✅ GameManager - Un solo coordinador
- ✅ AudioManager - Un solo manejador de audio
- ✅ Logger - Un solo sistema de logging

**Implementación en Lua:**
Usamos una variable local privada y un método estático para obtener la instancia.`,
      codeExamples: [
        {
          title: "Singleton GameManager",
          code: `-- GameManager.lua
local GameManager = {}
local _instance = nil

function GameManager.getInstance()
    if not _instance then
        _instance = {
            score = 0,
            level = 1,
            playerName = ""
        }
    end
    return _instance
end

-- Uso:
local gm1 = GameManager.getInstance()
local gm2 = GameManager.getInstance()
print(gm1 == gm2)  -- true (misma instancia)`,
          language: "lua",
          description: "Singleton para GameManager.",
        },
      ],
    },
    {
      heading: "Observer: Notificar Cambios",
      content: `**Observer** permite que objetos se suscriban a eventos y sean notificados.

**Cuándo usar:**
- ✅ Sistema de logros
- ✅ Actualización de UI
- ✅ Eventos del juego

**Implementación:**
Tabla con lista de callbacks que se ejecutan al emitir.`,
      codeExamples: [
        {
          title: "Observer para Logros",
          code: `-- AchievementSystem.lua
local AchievementSystem = {}
AchievementSystem.listeners = {}

function AchievementSystem:onAchievement(callback)
    table.insert(self.listeners, callback)
end

function AchievementSystem:notify(player, achievement)
    for _, callback in ipairs(self.listeners) do
        callback(player, achievement)
    end
end

-- Uso:
AchievementSystem:onAchievement(function(p, a)
    print(p.name .. " unlocked: " .. a.name)
end)`,
          language: "lua",
          description: "Observer para sistema de logros.",
        },
      ],
    },
  ],
};

export const examples: CodeSnippet[] = [
  {
    title: "Command Pattern Completo",
    code: `-- Command.lua
local Command = {}
Command.__index = Command

function Command:New(action)
    local self = setmetatable({}, Command)
    self.action = action
    return self
end

function Command:execute()
    self.action()
end

function Command:undo()
    -- Implementar undo si es necesario
end

-- InputHandler con Command Queue
local InputHandler = {}
InputHandler.__index = InputHandler

function InputHandler:New()
    local self = setmetatable({}, InputHandler)
    self.commandHistory = {}
    return self
end

function InputHandler:executeCommand(command)
    command:execute()
    table.insert(self.commandHistory, command)
end

function InputHandler:undoLast()
    local last = table.remove(self.commandHistory)
    if last then last:undo() end
end

return InputHandler`,
    language: "lua",
    description: "Command pattern con input handler y undo.",
  },
  {
    title: "State Machine para IA",
    code: `-- StateMachine.lua
local StateMachine = {}
StateMachine.__index = StateMachine

function StateMachine:New(initialState)
    local self = setmetatable({}, StateMachine)
    self.currentState = initialState
    self.states = {}
    return self
end

function StateMachine:addState(name, state)
    self.states[name] = state
end

function StateMachine:setState(name)
    if self.currentState and self.currentState.exit then
        self.currentState:exit()
    end
    self.currentState = self.states[name]
    if self.currentState and self.currentState.enter then
        self.currentState:enter()
    end
end

function StateMachine:update(dt)
    if self.currentState and self.currentState.update then
        self.currentState:update(dt)
    end
end

return StateMachine`,
    language: "lua" as unknown as "lua" | "cpp" | "typescript",
    description: "State machine para IA de NPCs.",
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
