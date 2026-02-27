/**
 * Módulo 10: Arquitectura - Lección 10.4 (Parte 2)
 * Modularidad: Interactivo y Ejercicio
 */

import { InteractiveExample, MiniExercise, LessonResource } from "@/types/lesson";

export const interactive = {
  title: "Simulador de Módulos Lua",
  description: "Crea y exporta módulos Lua",
  starterCode: `-- Module Simulator
local ModuleSystem = {}
ModuleSystem.__index = ModuleSystem

function ModuleSystem:New()
    local self = setmetatable({}, ModuleSystem)
    self.loadedModules = {}
    return self
end

function ModuleSystem:require(moduleName)
    if self.loadedModules[moduleName] then
        return self.loadedModules[moduleName]
    end
    
    local module = {}
    self.loadedModules[moduleName] = module
    return module
end

local sys = ModuleSystem:New()
local math = sys:require("math")
print("Module system ready")`,
  environment: "lua" as unknown as "lua" | "roblox" | "unlua" | "minecraft",
  expectedOutput: "Module system ready",
} as unknown as InteractiveExample;

export const miniExercise = {
  id: "mes-10-l04-exercise",
  lessonId: "mes-10-l04",
  title: "Crea Utilidades Modulares",
  instructions: `Implementa un **sistema de utilidades modulares**:

1. **StringUtils** - capitalize, trim, reverse, isEmpty
2. **TableUtils** - isEmpty, find, clone
3. **init.lua** - Barrel export para ambos módulos

**Requisitos:**
- Cada utilidad en su propio archivo
- Funciones públicas y privadas
- Barrel export con init.lua
- Tests para cada función`,
  starterCode: `-- utils/string.lua
local StringUtils = {}

function StringUtils.capitalize(str)
    -- TODO: Poner primera letra en mayúscula
end

function StringUtils.trim(str)
    -- TODO: Remover espacios al inicio/final
end

function StringUtils.reverse(str)
    -- TODO: Invertir string
end

function StringUtils.isEmpty(str)
    -- TODO: Verificar si string está vacío
end

return StringUtils`,
  solution: `-- utils/string.lua
local StringUtils = {}

function StringUtils.capitalize(str)
    return str:sub(1, 1):upper() .. str:sub(2)
end

function StringUtils.trim(str)
    return str:match("^%s*(.-)%s*$")
end

function StringUtils.reverse(str)
    return str:reverse()
end

function StringUtils.isEmpty(str)
    return str == "" or str == nil
end

return StringUtils

-- utils/table.lua
local TableUtils = {}

function TableUtils.isEmpty(t)
    return t == nil or next(t) == nil
end

function TableUtils.find(t, value)
    for k, v in pairs(t) do
        if v == value then
            return k
        end
    end
    return nil
end

function TableUtils.clone(t)
    local copy = {}
    for k, v in pairs(t) do
        if type(v) == "table" then
            copy[k] = TableUtils.clone(v)
        else
            copy[k] = v
        end
    end
    return copy
end

return TableUtils

-- utils/init.lua
return {
    StringUtils = require("utils.string"),
    TableUtils = require("utils.table")
}`,
  tests: [
    {
      type: "output_contains" as const,
      expected: "Hello",
      message: "capitalize debe poner primera letra en mayúscula",
    },
    {
      type: "output_contains" as const,
      expected: "test",
      message: "trim debe remover espacios",
    },
    {
      type: "output_contains" as const,
      expected: "true",
      message: "isEmpty debe retornar true para string vacío",
    },
  ],
  hints: [
    "Usa `str:sub(1, 1):upper()` para capitalizar",
    "El pattern `^%s*(.-)%s*$` matchea sin espacios",
    "`next(t) == nil` verifica si tabla está vacía",
    "Para clone, usa recursión con `pairs(t)`",
  ],
  xpReward: 150,
  difficulty: "intermediate" as unknown as "beginner" | "intermediate" | "advanced" | "expert",
} as unknown as MiniExercise;

export const resources: LessonResource[] = [
  {
    title: "Lua Modules Documentation",
    url: "https://www.lua.org/manual/5.4/manual.html#6.3",
    type: "documentation",
    description: "Documentación oficial de módulos en Lua",
  },
  {
    title: "Lua Style Guide",
    url: "https://github.com/Olivine-Labs/lua-style-guide",
    type: "article",
    description: "Guía de estilo y organización de código Lua",
  },
  {
    title: "LuaRocks - Package Manager",
    url: "https://luarocks.org/",
    type: "tool",
    description: "Gestor de paquetes para Lua",
  },
];

export const summary = `## Resumen: Modularidad

**Módulos Lua:**
- require() carga y cachea
- return exporta interfaz pública
- Locales son privados

**Estructura:**
- Separar por responsabilidad
- Código vs datos separados
- init.lua para exports limpios

**Imports/Exports:**
- Tabla con funciones (común)
- Constructor para clases
- Barrel exports con init.lua

**Dependencias circulares:**
- Lazy loading
- Inyección de dependencias
- Event system`;
