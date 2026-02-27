/**
 * Lección 1.4: Strings (Cadenas de Texto)
 */

import { Lesson } from "@/types/lesson";

export const lesson04: Lesson = {
  id: "mes-01-l04",
  moduleId: "mes-01",
  lessonNumber: 4,
  title: "Strings (Cadenas de Texto)",
  description: "Manipulación de texto, concatenación y métodos de strings.",
  estimatedTime: 25,
  difficulty: "beginner",
  theory: {
    title: "Strings (Cadenas de Texto)",
    objectives: [
      "Crear y manipular cadenas de texto",
      "Usar concatenación para unir strings",
      "Aplicar métodos básicos de string",
      "Formato de strings con variables",
    ],
    estimatedTime: 25,
    sections: [
      {
        heading: "Creación de Strings",
        content: `En Lua, los strings se pueden crear de **tres formas**:

**1. Comillas dobles:**
\`\`\`lua
local nombre = "Mario"
\`\`\`

**2. Comillas simples:**
\`\`\`lua
local nombre = 'Mario'
\`\`\`

**3. Corchetes dobles (multi-línea):**
\`\`\`lua
local dialogo = [[
  Hola, viajero.
  ¿Buscas aventuras?
  Tengo una misión para ti.
]]
\`\`\`

**Caracteres de escape:**
- \`\\n\` - Nueva línea
- \`\\t\` - Tabulación
- \`\\\\\` - Backslash
- \`"\` - Comilla doble dentro de comillas dobles`,
        codeExamples: [
          {
            title: "Diferentes formas de crear strings",
            code: `local comillasDobles = "Hola Mundo"
local comillasSimples = 'Hola Mundo'
local conComillas = "Dice: \"Hola\""
local multilinea = [[
  Línea 1
  Línea 2
  Línea 3
]]

print(comillasDobles)
print(comillasSimples)
print(conComillas)
print(multilinea)`,
            language: "lua",
            description: "Diferentes formas de declarar strings en Lua.",
          },
        ],
      },
      {
        heading: "Concatenación",
        content: `Para **unir strings** en Lua, usa el operador \`..\`:

\`\`\`lua
local nombre = "Juan"
local saludo = "Hola, " .. nombre .. "!"
print(saludo)  -- "Hola, Juan!"
\`\`\`

**También funciona con números** (los convierte automáticamente):
\`\`\`lua
local nivel = 50
local mensaje = "Nivel " .. nivel
print(mensaje)  -- "Nivel 50"
\`\`\`

**Concatenar múltiples partes:**
\`\`\`lua
local nombre = "Link"
local vida = 100
local nivel = 50

local info = nombre .. " - Vida: " .. vida .. " - Nivel: " .. nivel
print(info)  -- "Link - Vida: 100 - Nivel: 50"
\`\`\``,
        codeExamples: [
          {
            title: "Concatenación de strings",
            code: `local nombre = "Mario"
local apellido = "Bros"
local nombreCompleto = nombre .. " " .. apellido

local nivel = 50
local mensaje = nombreCompleto .. " está en nivel " .. nivel

print(nombreCompleto)  -- "Mario Bros"
print(mensaje)         -- "Mario Bros está en nivel 50"`,
            language: "lua",
            description: "Une múltiples strings con el operador ..",
          },
        ],
      },
      {
        heading: "Métodos de Strings",
        content: `Lua tiene varias **funciones para manipular strings**:

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| **\`#string\`** | Longitud | \`#"Hola"\` → \`4\` |
| **string.upper()** | Mayúsculas | \`string.upper("hola")\` → \`"HOLA"\` |
| **string.lower()** | Minúsculas | \`string.lower("HOLA")\` → \`"hola"\` |
| **string.sub()** | Substring | \`string.sub("Hola", 1, 2)\` → \`"Ho"\` |
| **string.rep()** | Repetir | \`string.rep("A", 3)\` → \`"AAA"\` |
| **string.gsub()** | Reemplazar | \`string.gsub("Hola", "l", "r")\` → \`"Hora"\` |
| **string.find()** | Buscar | \`string.find("Hola", "ol")\` → \`2, 3\` |
| **string.format()** | Formatear | \`string.format("%d años", 25)\` |

**También puedes usar sintaxis de objeto:**
\`\`\`lua
local texto = "hola"
print(texto:upper())  -- "HOLA"
\`\`\``,
        codeExamples: [
          {
            title: "Métodos comunes de strings",
            code: `local texto = "Lua es increíble"

print(#texto)                    -- 17 (longitud)
print(texto:upper())             -- "LUA ES INCREÍBLE"
print(texto:lower())             -- "lua es increíble"
print(texto:sub(1, 3))           -- "Lua"
print(texto:gsub("increíble", "genial"))  -- "Lua es genial"
print(string.rep("!", 5))        -- "!!!!!"`,
            language: "lua",
            description: "Los métodos más útiles para manipular strings.",
          },
        ],
      },
      {
        heading: "Formato de Strings",
        content: `**string.format()** te permite crear strings con formato:

**Placeholders comunes:**
- \`%s\` - String
- \`%d\` - Número entero
- \`%f\` - Número decimal (float)
- \`%.2f\` - Decimal con 2 dígitos después del punto

**Ejemplos:**
\`\`\`lua
local nombre = "Mario"
local edad = 25
local oro = 150.5

print(string.format("Nombre: %s", nombre))
print(string.format("Edad: %d años", edad))
print(string.format("Oro: %.2f", oro))

-- Múltiples valores
print(string.format("%s tiene %d años y %.2f de oro", nombre, edad, oro))
\`\`\`

**Muy útil para UI en videojuegos:**
\`\`\`lua
local vida = 85.5
local vidaMax = 100

local barraVida = string.format("HP: %.1f / %d", vida, vidaMax)
print(barraVida)  -- "HP: 85.5 / 100"
\`\`\``,
        codeExamples: [
          {
            title: "Formato de strings",
            code: `local jugador = "Link"
local nivel = 50
local experiencia = 1250.75
local oro = 999

-- Formato básico
print(string.format("Jugador: %s", jugador))
print(string.format("Nivel: %d", nivel))

-- Decimal con precisión
print(string.format("EXP: %.2f", experiencia))

-- Múltiples valores
print(string.format("%s (Nvl %d) - EXP: %.1f - Oro: %d", 
                    jugador, nivel, experiencia, oro))`,
            language: "lua",
            description: "Crea strings formateados con placeholders.",
          },
        ],
      },
    ],
    summary: `Los strings se crean con comillas dobles, simples o corchetes dobles. Usa .. para concatenar. Los métodos como upper(), lower(), sub() y format() te permiten manipular texto fácilmente.`,
  },
  examples: [
    {
      title: "Nombre de personaje",
      code: `local nombre = "marío"
local nombreCapitalizado = nombre:sub(1, 1):upper() .. nombre:sub(2):lower()

print(nombreCapitalizado)  -- "Marío"`,
      language: "lua",
      description: "Capitaliza la primera letra de un nombre.",
    },
    {
      title: "Mensaje de diálogo",
      code: `local npc = "Sabio Merlín"
local jugador = "Arthur"
local mision = "derrotar al dragón"

local dialogo = string.format([[
%s: ¡Saludos, %s!
Necesito tu ayuda para %s.
¿Aceptas la misión?
]], npc, jugador, mision)

print(dialogo)`,
      language: "lua",
      description: "Crea un diálogo multi-línea formateado.",
    },
    {
      title: "Barra de vida UI",
      code: `local vidaActual = 75
local vidaMaxima = 100

local porcentaje = (vidaActual / vidaMaxima) * 100
local barra = string.format("HP: [%d/%d] %.1f%%", vidaActual, vidaMaxima, porcentaje)

print(barra)  -- "HP: [75/100] 75.0%"`,
      language: "lua",
      description: "Muestra una barra de vida estilo UI de juego.",
    },
  ],
  interactive: {
    title: "Crea tu Diálogo",
    description: "Formatea un diálogo de NPC con el nombre del jugador",
    starterCode: `local npc = "Rey de Hyrule"
local jugador = "Link"
local objeto = "Trifuerza"

-- Crea un diálogo formateado que diga:
-- "Link, debes encontrar la Trifuerza para salvar el reino"

local dialogo = 

print(dialogo)`,
    environment: "lua",
    expectedOutput: "Link",
  },
  miniExercise: {
    id: "mes-01-l04-ej1",
    lessonId: "mes-01-l04",
    title: "Sistema de Diálogos",
    instructions: `Crea un sistema de diálogo para un NPC:

1. Declara \`npc = "Mercader"\`
2. Declara \`jugador = "TuNombre"\` (tu nombre)
3. Declara \`item = "Espada de Hierro"\`
4. Declara \`precio = 150\`
5. Usa string.format() para crear este mensaje exacto:
   \`\`\`
   Mercader dice: ¡Hola, TuNombre! ¿Quieres comprar una Espada de Hierro por 150 de oro?
   \`\`\`
6. Imprime el mensaje

**Requisitos:**
- El mensaje debe empezar con "\[NPC] dice:"
- Debe incluir el nombre del jugador
- Debe incluir el item y el precio`,
    starterCode: `-- Declara las variables


-- Crea el mensaje formateado


-- Imprime el resultado
`,
    solution: `local npc = "Mercader"
local jugador = "Link"
local item = "Espada de Hierro"
local precio = 150

local mensaje = string.format('%s dice: ¡Hola, %s! ¿Quieres comprar una %s por %d de oro?', 
                               npc, jugador, item, precio)

print(mensaje)`,
    tests: [
      {
        type: "code_contains",
        expected: 'npc = "Mercader"',
        message: "El NPC debe ser 'Mercader'",
      },
      {
        type: "code_contains",
        expected: "string.format",
        message: "Debes usar string.format()",
      },
      {
        type: "output_contains",
        expected: "dice: ¡Hola,",
        message: "El mensaje debe contener el saludo",
      },
      {
        type: "output_contains",
        expected: "150 de oro",
        message: "Debe incluir el precio correctamente",
      },
    ],
    hints: [
      "Usa string.format() con placeholders %s para strings y %d para números",
      "Concatena el nombre del NPC con 'dice:'",
      "El formato es: NPC dice: ¡Hola, jugador! ¿Quieres comprar un item por precio de oro?",
    ],
    xpReward: 35,
    difficulty: "beginner",
  },
  summary: `Los strings se crean con comillas o corchetes dobles. Usa .. para concatenar y string.format() para formato avanzado. Los métodos upper(), lower(), sub() y gsub() manipulan texto.`,
  resources: [
    {
      title: "Lua String Library",
      url: "https://www.lua.org/manual/5.4/manual.html#6.4",
      type: "documentation",
      description: "Documentación oficial de string library",
    },
    {
      title: "Lua Strings Tutorial",
      url: "https://www.tutorialspoint.com/lua/lua_strings.htm",
      type: "article",
      description: "Tutorial completo de strings en Lua",
    },
  ],
  prerequisites: ["mes-01-l03"],
};
