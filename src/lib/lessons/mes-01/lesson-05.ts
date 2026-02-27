/**
 * Lección 1.5: Condicionales
 */

import { Lesson } from "@/types/lesson";

export const lesson05: Lesson = {
  id: "mes-01-l05",
  moduleId: "mes-01",
  lessonNumber: 5,
  title: "Condicionales",
  description: "Toma de decisiones con if, elseif, else y operador ternario.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Condicionales",
    objectives: [
      "Usar if/else para tomar decisiones",
      "Crear condiciones múltiples con elseif",
      "Anidar condicionales correctamente",
      "Aplicar el operador ternario en Lua",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Sentencia if",
        content: `La sentencia **if** te permite ejecutar código solo si una condición es verdadera:

\`\`\`lua
if condicion then
    -- Este código se ejecuta si la condición es true
end
\`\`\`

**Ejemplo simple:**
\`\`\`lua
local vida = 50

if vida < 30 then
    print("¡Necesitas curarte!")
end
\`\`\`

**En Lua, solo \`false\` y \`nil\` son falsos:**
- \`false\` → falso
- \`nil\` → falso
- \`0\` → **verdadero** (¡ojo con esto!)
- \`""\` (string vacío) → **verdadero**
- Cualquier otro valor → verdadero`,
        codeExamples: [
          {
            title: "Condicional if simple",
            code: `local vida = 25
local nivel = 10

if vida < 30 then
    print("¡Peligro! Vida baja")
end

if nivel >= 10 then
    print("Has desbloqueado la zona 2")
end

-- 0 es true en Lua
local oro = 0
if oro then
    print("Esto se imprime porque 0 es true en Lua")
end`,
            language: "lua",
            description: "El if ejecuta código solo si la condición es true.",
          },
        ],
      },
      {
        heading: "if...else",
        content: `Usa **else** para ejecutar código cuando la condición es falsa:

\`\`\`lua
if condicion then
    -- Se ejecuta si la condición es true
else
    -- Se ejecuta si la condición es false
end
\`\`\`

**Ejemplo:**
\`\`\`lua
local vida = 75

if vida > 50 then
    print("Estás saludable")
else
    print("Necesitas una poción")
end
\`\`\`

**Usos en videojuegos:**
- Verificar si ganó/perdió
- Checar si puede comprar un item
- Determinar si un ataque fue crítico`,
        codeExamples: [
          {
            title: "if...else para decisiones",
            code: `local vida = 30
local oro = 150
local precioPocion = 100

if vida > 50 then
    print("Tu salud está bien")
else
    print("Deberías curarte")
end

if oro >= precioPocion then
    print("Puedes comprar la poción")
else
    print("No tienes suficiente oro")
end`,
            language: "lua",
            description: "if...else permite tomar decisiones binarias.",
          },
        ],
      },
      {
        heading: "if...elseif...else",
        content: `Para **múltiples condiciones**, usa \`elseif\`:

\`\`\`lua
if condicion1 then
    -- Se ejecuta si condicion1 es true
elseif condicion2 then
    -- Se ejecuta si condicion1 es false y condicion2 es true
elseif condicion3 then
    -- Se ejecuta si las anteriores son false y condicion3 es true
else
    -- Se ejecuta si todas las anteriores son false
end
\`\`\`

**Ejemplo - Sistema de ranks:**
\`\`\`lua
local puntaje = 1500

if puntaje >= 2000 then
    print("Rango: Legendario")
elseif puntaje >= 1500 then
    print("Rango: Diamante")
elseif puntaje >= 1000 then
    print("Rango: Oro")
elseif puntaje >= 500 then
    print("Rango: Plata")
else
    print("Rango: Bronce")
end
\`\`\``,
        codeExamples: [
          {
            title: "Múltiples condiciones con elseif",
            code: `local nivel = 25
local rango

if nivel >= 50 then
    rango = "Maestro"
elseif nivel >= 30 then
    rango = "Experto"
elseif nivel >= 15 then
    rango = "Intermedio"
elseif nivel >= 5 then
    rango = "Principiante"
else
    rango = "Novato"
end

print("Tu rango es: " .. rango)`,
            language: "lua",
            description: "elseif permite verificar múltiples condiciones en orden.",
          },
        ],
      },
      {
        heading: "Condicionales Anidados",
        content: `Puedes poner un **if dentro de otro if**:

\`\`\`lua
if tieneLlave then
    if puertaAbierta then
        print("Puedes pasar")
    else
        print("La puerta está cerrada")
    end
else
    print("Necesitas una llave")
end
\`\`\`

**⚠️ Consejo:** No anides demasiado profundo (máximo 2-3 niveles).
Si necesitas más, considera reestructurar tu código.

**Alternativa con operadores lógicos:**
\`\`\`lua
-- En vez de:
if tieneLlave then
    if puertaAbierta then
        print("Pasa")
    end
end

-- Usa:
if tieneLlave and puertaAbierta then
    print("Pasa")
end
\`\`\``,
        codeExamples: [
          {
            title: "Condicionales anidados",
            code: `local tieneArma = true
local tieneEscudo = false
local nivel = 15

if tieneArma then
    if tieneEscudo then
        print("Estás bien equipado")
    else
        print("Tienes arma pero sin escudo")
    end
else
    if nivel >= 10 then
        print("Al menos tienes nivel para comprar arma")
    else
        print("Necesitas arma y más nivel")
    end
end`,
            language: "lua",
            description: "Los ifs anidados permiten verificar condiciones complejas.",
          },
        ],
      },
      {
        heading: "Operador Ternario en Lua",
        content: `Lua **no tiene un operador ternario** como otros lenguajes (\`condicion ? true : false\`),
pero puedes simularlo con \`and...or\`:

\`\`\`lua
-- Sintaxis:
local resultado = condicion and valorSiTrue or valorSiFalse

-- Ejemplo:
local vida = 75
local estado = vida > 50 and "Saludable" or "Herido"
print(estado)  -- "Saludable"
\`\`\`

**⚠️ Cuidado:** Esto falla si \`valorSiTrue\` es \`false\` o \`nil\`:
\`\`\`lua
local tieneItem = false
local mensaje = tieneItem and "Tienes el item" or "No tienes el item"
-- Funciona porque "Tienes el item" es truthy
\`\`\`

**Para casos complejos, usa if...else normal.**`,
        codeExamples: [
          {
            title: "Operador ternario con and...or",
            code: `local vida = 80
local nivel = 25
local oro = 0

-- Ternario simple
local estado = vida > 50 and "Vivo" or "Muerto"
print(estado)  -- "Vivo"

-- Con valores numéricos
local bonus = nivel >= 20 and 100 or 50
print(bonus)  -- 100

-- Para string vacío (cuidado!)
local mensaje = oro > 0 and "Tienes " .. oro .. " de oro" or "Sin oro"
print(mensaje)  -- "Sin oro"`,
            language: "lua",
            description: "Simula el operador ternario usando and...or.",
          },
        ],
      },
    ],
    summary: `Usa if/elseif/else para tomar decisiones. Solo false y nil son falsos en Lua. Puedes anidar condicionales pero no demasiado profundo. Simula el ternario con and...or.`,
  },
  examples: [
    {
      title: "Verificar game over",
      code: `local vida = 0
local vidasExtra = 3

if vida <= 0 then
    if vidasExtra > 0 then
        print("Te queda 1 vida extra")
        vidasExtra = vidasExtra - 1
        vida = 100
    else
        print("GAME OVER")
    end
end`,
      language: "lua",
      description: "Verifica game over y usa vidas extra si hay disponibles.",
    },
    {
      title: "Sistema de ranks",
      code: `local puntaje = 1750
local rango, color

if puntaje >= 2000 then
    rango, color = "Legendario", "rojo"
elseif puntaje >= 1500 then
    rango, color = "Diamante", "azul"
elseif puntaje >= 1000 then
    rango, color = "Oro", "amarillo"
else
    rango, color = "Plata", "gris"
end

print(string.format("Rango: %s (%s)", rango, color))`,
      language: "lua",
      description: "Asigna rango y color basado en el puntaje.",
    },
    {
      title: "Descuento por nivel",
      code: `local nivel = 35
local precioBase = 100
local descuento

if nivel >= 50 then
    descuento = 0.3  -- 30%
elseif nivel >= 30 then
    descuento = 0.2  -- 20%
elseif nivel >= 10 then
    descuento = 0.1  -- 10%
else
    descuento = 0    -- 0%
end

local precioFinal = precioBase * (1 - descuento)
print(string.format("Precio: %.2f (%.0f%% descuento)", precioFinal, descuento * 100))`,
      language: "lua",
      description: "Calcula descuento basado en el nivel del jugador.",
    },
  ],
  interactive: {
    title: "Clasificador de Ranks",
    description: "Determina el rank basado en el puntaje",
    starterCode: `local puntaje = 1200
local rango

-- Usa if/elseif/else para asignar el rango:
-- >= 2000: "Legendario"
-- >= 1500: "Diamante"  
-- >= 1000: "Oro"
-- >= 500: "Plata"
-- < 500: "Bronce"



print("Tu rango es: " .. rango)`,
    environment: "lua",
    expectedOutput: "Oro",
  },
  miniExercise: {
    id: "mes-01-l05-ej1",
    lessonId: "mes-01-l05",
    title: "Sistema de Inventario",
    instructions: `Crea un sistema que verifique si el jugador puede equipar un item:

1. Declara \`nivelJugador = 25\`
2. Declara \`nivelRequerido = 20\`
3. Declara \`tieneOro = true\`
4. Declara \`oroRequerido = 100\`
5. Declara \`oroActual = 150\`
6. Verifica si puede equipar el item (debe cumplir TODAS las condiciones):
   - nivelJugador >= nivelRequerido
   - tieneOro debe ser true
   - oroActual >= oroRequerido
7. Si puede equipar, imprime: "Puedes equipar este item"
8. Si no, imprime: "No cumples los requisitos"

**Requisito:** Usa operadores lógicos (and) para combinar las condiciones.`,
    starterCode: `-- Declara las variables


-- Verifica las condiciones


-- Imprime el resultado
`,
    solution: `local nivelJugador = 25
local nivelRequerido = 20
local tieneOro = true
local oroRequerido = 100
local oroActual = 150

if nivelJugador >= nivelRequerido and tieneOro and oroActual >= oroRequerido then
    print("Puedes equipar este item")
else
    print("No cumples los requisitos")
end`,
    tests: [
      {
        type: "code_contains",
        expected: "nivelJugador = 25",
        message: "El nivel del jugador debe ser 25",
      },
      {
        type: "code_contains",
        expected: "tieneOro = true",
        message: "tieneOro debe ser true",
      },
      {
        type: "code_contains",
        expected: "and",
        message: "Debes usar 'and' para combinar condiciones",
      },
      {
        type: "output_contains",
        expected: "Puedes equipar",
        message: "Debe imprimir que puede equipar",
      },
    ],
    hints: [
      "Usa 'and' para combinar todas las condiciones en un solo if",
      "Las tres condiciones deben ser verdaderas para equipar",
      "La estructura es: if condicion1 and condicion2 and condicion3 then",
    ],
    xpReward: 40,
    difficulty: "intermediate",
  },
  summary: `if/elseif/else permiten tomar decisiones. Solo false y nil son falsos. Usa operadores lógicos para combinar condiciones. Simula ternario con and...or.`,
  resources: [
    {
      title: "Lua Control Structures",
      url: "https://www.lua.org/manual/5.4/manual.html#3.3",
      type: "documentation",
      description: "Documentación oficial de estructuras de control",
    },
    {
      title: "Lua If Statements",
      url: "https://lua-users.org/wiki/ConditionalStatements",
      type: "article",
      description: "Guía completa de condicionales en Lua",
    },
  ],
  prerequisites: ["mes-01-l04"],
};
