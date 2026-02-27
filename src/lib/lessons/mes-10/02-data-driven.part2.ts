/**
 * Módulo 10: Arquitectura - Lección 10.2 (Parte 2)
 * Data-Driven Design: Interactivo y Ejercicio
 */

import { InteractiveExample, MiniExercise, LessonResource } from "@/types/lesson";

export const interactive: InteractiveExample = {
  title: "Simulador Data-Driven",
  description: "Implementa un sistema de configuración data-driven",
  starterCode: `-- Config System Simulator
local ConfigSystem = {}
ConfigSystem.__index = ConfigSystem

function ConfigSystem:New()
    local self = setmetatable({}, ConfigSystem)
    self.configs = {}
    self.watchers = {}
    return self
end

function ConfigSystem:Load(path)
    -- TODO: Cargar configuración
    -- self.configs[path] = data
    print("Config loaded: " .. path)
end

function ConfigSystem:Get(key)
    -- TODO: Retornar configuración
    return self.configs[key]
end

function ConfigSystem:Watch(key, callback)
    -- TODO: Registrar callback para cambios
    self.watchers[key] = callback
end

-- Test
local config = ConfigSystem:New()
config:Load("enemies.json")
print("Config system test complete")`,
  environment: "lua",
  expectedOutput: "Config loaded: enemies.json\nConfig system test complete",
};

export const miniExercise: MiniExercise = {
  id: "mes-10-l02-exercise",
  lessonId: "mes-10-l02",
  title: "Balance System Data-Driven",
  instructions: `Implementa un **Sistema de Balance** para un RPG:

1. **Cargar stats** desde configuración JSON
2. **Validar stats** dentro de rangos aceptables
3. **Aplicar multiplicadores** por dificultad
4. **Get stat** con fallback a valor por defecto

**Requisitos:**
- Método \`ValidateStats(stats)\` que verifique rangos
- Método \`ApplyModifiers(stats, difficulty)\` que escale
- Método \`GetStat(entityId, statName, default)\` que obtenga
- Tabla de rangos válidos por stat`,
  starterCode: `-- BalanceSystem.lua
local BalanceSystem = {}
BalanceSystem.__index = BalanceSystem

function BalanceSystem:New(config)
    local self = setmetatable({}, BalanceSystem)
    self.config = config
    self.ranges = {
        health = {min = 10, max = 1000},
        damage = {min = 1, max = 200},
        armor = {min = 0, max = 100}
    }
    self.difficultyMultipliers = {
        easy = 0.8,
        normal = 1.0,
        hard = 1.5
    }
    return self
end

function BalanceSystem:ValidateStats(stats)
    -- TODO: Validar cada stat contra ranges
end

function BalanceSystem:ApplyModifiers(stats, difficulty)
    -- TODO: Aplicar multiplicadores
end

function BalanceSystem:GetStat(entityId, statName, defaultValue)
    -- TODO: Obtener stat con fallback
end

return BalanceSystem`,
  solution: `-- BalanceSystem.lua
local BalanceSystem = {}
BalanceSystem.__index = BalanceSystem

function BalanceSystem:New(config)
    local self = setmetatable({}, BalanceSystem)
    self.config = config
    self.ranges = {
        health = {min = 10, max = 1000},
        damage = {min = 1, max = 200},
        armor = {min = 0, max = 100}
    }
    self.difficultyMultipliers = {
        easy = 0.8,
        normal = 1.0,
        hard = 1.5
    }
    return self
end

function BalanceSystem:ValidateStats(stats)
    for statName, value in pairs(stats) do
        local range = self.ranges[statName]
        if range and type(value) == "number" then
            if value < range.min or value > range.max then
                return false, "Invalid " .. statName
            end
        end
    end
    return true, "All stats valid"
end

function BalanceSystem:ApplyModifiers(stats, difficulty)
    local mult = self.difficultyMultipliers[difficulty] or 1.0
    local modified = {}
    for k, v in pairs(stats) do
        if type(v) == "number" and k ~= "armor" then
            modified[k] = math.floor(v * mult)
        else
            modified[k] = v
        end
    end
    return modified
end

function BalanceSystem:GetStat(entityId, statName, defaultValue)
    local entity = self.config[entityId]
    if entity and entity[statName] ~= nil then
        return entity[statName]
    end
    return defaultValue
end

return BalanceSystem`,
  tests: [
    {
      type: "output_contains",
      expected: "Config loaded",
      message: "Debes imprimir mensaje de configuración cargada",
    },
    {
      type: "output_contains",
      expected: "All stats valid",
      message: "Validación debe retornar mensaje de éxito",
    },
    {
      type: "output_contains",
      expected: "Invalid",
      message: "Debe detectar stats fuera de rango",
    },
  ],
  hints: [
    "Usa `pairs(self.ranges)` para iterar sobre los rangos",
    "El multiplicador por defecto es 1.0 si la dificultad no existe",
    "Para GetStat, usa `or defaultValue` como fallback",
    "Valida solo stats numéricos con `type(value) == 'number'`",
  ],
  xpReward: 150,
  difficulty: "advanced",
};

export const resources: LessonResource[] = [
  {
    title: "dkjson - JSON library for Lua",
    url: "http://dkolf.de/src/dkjson-lua.fsl",
    type: "documentation",
    description: "Librería JSON popular para Lua",
  },
  {
    title: "Data-Driven Game Design",
    url: "https://gameprogrammingpatterns.com/data-locality.html",
    type: "article",
    description: "Patrones para diseño data-driven",
  },
  {
    title: "Hot-Reloading in Games",
    url: "https://www.gamedeveloper.com/programming/hot-reloading",
    type: "article",
    description: "Técnicas de hot-reloading",
  },
];
