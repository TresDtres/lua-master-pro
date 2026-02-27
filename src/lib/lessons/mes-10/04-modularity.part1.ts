/**
 * Módulo 10: Arquitectura - Lección 10.4 (Parte 1)
 * Modularidad: Teoría y Ejemplos
 */

import { LessonTheory, CodeSnippet } from "@/types/lesson";

export const theory: Omit<LessonTheory, 'summary'> = {
  title: "Modularidad en Proyectos Lua",
  objectives: [
    "Entender el sistema de módulos de Lua",
    "Organizar proyectos grandes en módulos",
    "Implementar imports y exports correctamente",
    "Evitar dependencias circulares",
  ],
  estimatedTime: 45,
  sections: [
    {
      heading: "Sistema de Módulos de Lua",
      content: `Lua tiene un sistema de módulos **simple pero poderoso** basado en tablas y funciones.

**Conceptos clave:**

1. **Módulo** - Archivo que retorna una tabla con funciones/variables
2. **require()** - Carga y cachea un módulo
3. **return** - Exporta la interfaz pública del módulo

**Cómo funciona require():**
1. Busca el archivo en package.path
2. Lo ejecuta (corre el código una vez)
3. Guarda el resultado en package.loaded
4. Retorna el valor guardado (en cache)

**Ventajas:**
- **Cache** - Se carga una sola vez
- **Encapsulamiento** - Solo lo que retornas es público
- **Reutilización** - Mismo módulo en múltiples lugares`,
      codeExamples: [
        {
          title: "Módulo básico en Lua",
          code: `-- MathUtils.lua
local MathUtils = {}

MathUtils.PI = 3.14159

function MathUtils.add(a, b)
    return a + b
end

function MathUtils.multiply(a, b)
    return a * b
end

local function internalCalculation(x)
    return x * 2
end

return MathUtils`,
          language: "lua",
          description: "Módulo con funciones públicas y privadas.",
        },
      ],
    },
    {
      heading: "Organización de Proyectos",
      content: `**Estructura recomendada para proyectos grandes:**

\`\`\`
project/
├── src/
│   ├── modules/
│   │   ├── combat/
│   │   │   ├── init.lua
│   │   │   ├── damage.lua
│   │   │   └── abilities.lua
│   │   ├── inventory/
│   │   │   ├── init.lua
│   │   │   ├── items.lua
│   │   │   └── equipment.lua
│   │   └── utils/
│   │       ├── string.lua
│   │       └── table.lua
│   ├── main.lua
│   └── config.lua
\`\`\`

**Mejores prácticas:**
- Separar por responsabilidad
- Código vs datos separados
- init.lua para exports limpios`,
      codeExamples: [
        {
          title: "Estructura de directorios",
          code: `-- Estructura recomendada
project/
├── src/
│   ├── modules/
│   │   ├── combat/
│   │   ├── inventory/
│   │   └── utils/
│   ├── main.lua
│   └── config.lua`,
          language: "lua" as unknown as "lua" | "cpp" | "typescript",
          description: "Organización modular de proyecto.",
        },
      ],
    },
  ],
};

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

export const examples: CodeSnippet[] = [
  {
    title: "Módulo con Constructor",
    code: `-- Player.lua
local Player = {}
Player.__index = Player

function Player:New(name, health)
    local self = setmetatable({}, Player)
    self.name = name
    self.health = health or 100
    return self
end

function Player:TakeDamage(amount)
    self.health = math.max(0, self.health - amount)
end

function Player:IsAlive()
    return self.health > 0
end

return Player`,
    language: "lua",
    description: "Módulo con patrón de clase y constructor.",
  },
  {
    title: "Barrel Exports (init.lua)",
    code: `-- utils/init.lua
return {
    StringUtils = require("utils.string"),
    TableUtils = require("utils.table"),
    MathUtils = require("utils.math"),
}

-- Uso:
local Utils = require("utils")
Utils.StringUtils.capitalize("hello")
Utils.TableUtils.isEmpty({})`,
    language: "lua",
    description: "init.lua para exports limpios.",
  },
];
