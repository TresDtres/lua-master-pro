/**
 * Lección 1.3: Operadores
 */

import { Lesson } from "@/types/lesson";

export const lesson03: Lesson = {
  id: "mes-01-l03",
  moduleId: "mes-01",
  lessonNumber: 3,
  title: "Operadores",
  description: "Operadores aritméticos, relacionales y lógicos para realizar cálculos.",
  estimatedTime: 25,
  difficulty: "beginner",
  theory: {
    title: "Operadores",
    objectives: [
      "Usar operadores aritméticos para cálculos matemáticos",
      "Aplicar operadores relacionales para comparaciones",
      "Combinar condiciones con operadores lógicos",
      "Entender la precedencia de operadores",
    ],
    estimatedTime: 25,
    sections: [
      {
        heading: "Operadores Aritméticos",
        content: `Los operadores aritméticos te permiten hacer **cálculos matemáticos**:

| Operador | Descripción | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| **+** | Suma | \`5 + 3\` | \`8\` |
| **-** | Resta | \`5 - 3\` | \`2\` |
| **\*** | Multiplicación | \`5 * 3\` | \`15\` |
| **/** | División | \`6 / 3\` | \`2\` |
| **%** | Módulo (residuo) | \`7 % 3\` | \`1\` |
| **\^** | Potencia | \`2 ^ 3\` | \`8\` |
| **-** | Negación | \`-5\` | \`-5\` |
| **//** | División entera | \`7 // 2\` | \`3\` |

**El módulo (%) es muy útil para:**
- Saber si un número es par: \`numero % 2 == 0\`
- Ciclos que se repiten: \`dia % 7\` para días de la semana
- Limitar valores dentro de un rango`,
        codeExamples: [
          {
            title: "Cálculos básicos",
            code: `local a = 10
local b = 3

print(a + b)   -- 13 (suma)
print(a - b)   -- 7 (resta)
print(a * b)   -- 30 (multiplicación)
print(a / b)   -- 3.333... (división)
print(a % b)   -- 1 (módulo/residuo)
print(a ^ b)   -- 1000 (potencia)
print(a // b)  -- 3 (división entera)

-- ¿Es par o impar?
local numero = 10
print(numero % 2)  -- 0 (es par)`,
            language: "lua",
            description: "Todos los operadores aritméticos en acción.",
          },
        ],
      },
      {
        heading: "Operadores Relacionales",
        content: `Los operadores relacionales **comparan valores** y devuelven \`true\` o \`false\`:

| Operador | Descripción | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| **==** | Igual a | \`5 == 5\` | \`true\` |
| **~=** | Diferente de | \`5 ~= 3\` | \`true\` |
| **>** | Mayor que | \`5 > 3\` | \`true\` |
| **<** | Menor que | \`3 < 5\` | \`true\` |
| **>=** | Mayor o igual | \`5 >= 5\` | \`true\` |
| **<=** | Menor o igual | \`3 <= 5\` | \`true\` |

**⚠️ Importante:**
- Usa \`==\` para comparar, NO \`=\` (que es para asignar)
- En Lua, \`~= \` es "diferente" (no uses \`!=\` como en otros lenguajes)

**Usos comunes en videojuegos:**
- Verificar si el jugador tiene suficiente vida: \`vida >= 50\`
- Checar si llegó al nivel máximo: \`nivel == 100\`
- Detectar si está muerto: \`vida <= 0\``,
        codeExamples: [
          {
            title: "Comparaciones",
            code: `local vida = 75
local vidaMaxima = 100
local nivel = 50

print(vida > 50)        -- true
print(vida == vidaMaxima) -- false
print(vida ~= vidaMaxima) -- true
print(nivel >= 50)      -- true
print(nivel <= 1)       -- false

-- ¿Puede usar este item?
local nivelRequerido = 30
print(nivel >= nivelRequerido)  -- true (puede usarlo)`,
            language: "lua",
            description: "Comparaciones comunes en videojuegos.",
          },
        ],
      },
      {
        heading: "Operadores Lógicos",
        content: `Los operadores lógicos **combinan condiciones**:

| Operador | Descripción | Ejemplo | Resultado |
|----------|-------------|---------|-----------|
| **and** | Y (ambas deben ser true) | \`true and false\` | \`false\` |
| **or** | O (al menos una true) | \`true or false\` | \`true\` |
| **not** | NO (invierte el valor) | \`not true\` | \`false\` |

**Tablas de verdad:**

**AND (y):**
\`\`\`
true and true   = true
true and false  = false
false and true  = false
false and false = false
\`\`\`

**OR (o):**
\`\`\`
true or true   = true
true or false  = true
false or true  = true
false or false = false
\`\`\`

**NOT (no):**
\`\`\`
not true  = false
not false = true
\`\`\``,
        codeExamples: [
          {
            title: "Combinar condiciones",
            code: `local tieneLlave = true
local puertaAbierta = false
local vida = 80
local nivel = 50

-- AND: ambas deben ser true
print(tieneLlave and puertaAbierta)  -- false
print(vida > 50 and nivel >= 30)     -- true

-- OR: al menos una debe ser true
print(tieneLlave or puertaAbierta)   -- true
print(vida < 50 or nivel > 100)      -- false

-- NOT: invierte el valor
print(not puertaAbierta)             -- true
print(not (vida < 50))               -- true

-- Condición compleja para entrar a zona
local puedeEntrar = vida > 50 and nivel >= 30
print(puedeEntrar)  -- true`,
            language: "lua",
            description: "Combinar múltiples condiciones con operadores lógicos.",
          },
        ],
      },
      {
        heading: "Precedencia de Operadores",
        content: `Cuando hay múltiples operadores en una expresión, Lua sigue un **orden de prioridad**:

**Orden (de mayor a menor precedencia):**
1. \`not\`, \`-\` (negación)
2. \`^\` (potencia)
3. \`*\`, \`/\`, \`//\`, \`%\`
4. \`+\`, \`-\` (suma/resta)
5. \`..\` (concatenación)
6. \`<\`, \`>\`, \`<=\`, \`>=\`, \`~=\`, \`==\`
7. \`and\`
8. \`or\`

**Usa paréntesis para cambiar el orden:**
\`\`\`lua
local resultado1 = 5 + 3 * 2    -- 11 (primero 3*2)
local resultado2 = (5 + 3) * 2  -- 16 (primero 5+3)
\`\`\`

**Consejo:** Cuando tengas duda, **usa paréntesis** para hacer el código más claro.`,
        codeExamples: [
          {
            title: "Precedencia y paréntesis",
            code: `-- Sin paréntesis (sigue precedencia)
local a = 5 + 3 * 2      -- 11 (primero multiplicación)
local b = 10 - 4 / 2     -- 8 (primero división)

-- Con paréntesis (cambia el orden)
local c = (5 + 3) * 2    -- 16 (primero suma)
local d = (10 - 4) / 2   -- 3 (primero resta)

-- Combinando operadores lógicos
local vida = 80
local escudo = 50
local nivel = 30

local puedePelear = (vida > 50 or escudo > 30) and nivel >= 20
print(puedePelear)  -- true

-- Los paréntesis hacen el código más claro
local esPoderoso = (vida > 70) and (nivel > 25)
print(esPoderoso)   -- true`,
            language: "lua",
            description: "La precedencia determina el orden de evaluación.",
          },
        ],
      },
    ],
    summary: `Los operadores aritméticos (+, -, *, /, %, ^) hacen cálculos. Los relacionales (==, ~=, >, <, >=, <=) comparan valores. Los lógicos (and, or, not) combinan condiciones. Usa paréntesis para claridad.`,
  },
  examples: [
    {
      title: "Calculadora de daño",
      code: `local ataque = 50
local defensa = 20
local multiplicador = 1.5

-- Daño base
local danoBase = ataque - defensa

-- Daño crítico (x1.5)
local danoCritico = danoBase * multiplicador

print("Daño base: " .. danoBase)
print("Daño crítico: " .. danoCritico)`,
      language: "lua",
      description: "Calcula el daño de un ataque con multiplicador crítico.",
    },
    {
      title: "Verificar si puede comprar",
      code: `local oroJugador = 150
local precioEspada = 100
local precioEscudo = 80

-- ¿Puede comprar la espada?
print(oroJugador >= precioEspada)  -- true

-- ¿Puede comprar ambos?
local puedeComprarAmbos = oroJugador >= (precioEspada + precioEscudo)
print(puedeComprarAmbos)  -- false (necesita 180)`,
      language: "lua",
      description: "Usa operadores relacionales para verificar compras.",
    },
    {
      title: "Condición de victoria",
      code: `local enemigosVivos = 0
local tiempoRestante = 120
local vidaJugador = 50

-- Gana si no hay enemigos y tiene vida
local gano = enemigosVivos == 0 and vidaJugador > 0
print(gano)  -- true

-- Pierde si se acaba el tiempo o muere
local perdio = tiempoRestante <= 0 or vidaJugador <= 0
print(perdio)  -- false`,
      language: "lua",
      description: "Combina condiciones para determinar victoria/derrota.",
    },
  ],
  interactive: {
    title: "Calculadora de Stats",
    description: "Calcula el daño, defensa y velocidad de un personaje",
    starterCode: `-- Stats base
local fuerza = 25
local agilidad = 30
local inteligencia = 20

-- Calcula:
-- 1. daño = fuerza * 2
-- 2. defensa = inteligencia * 1.5
-- 3. velocidad = agilidad / 5
-- 4. poderTotal = daño + defensa + velocidad

-- Imprime cada resultado

`,
    environment: "lua",
    expectedOutput: "50",
  },
  miniExercise: {
    id: "mes-01-l03-ej1",
    lessonId: "mes-01-l03",
    title: "Sistema de Combate",
    instructions: `Crea un sistema de combate simple:

1. Declara \`ataqueJugador = 45\`
2. Declara \`defensaEnemigo = 20\`
3. Calcula \`dano = ataqueJugador - defensaEnemigo\`
4. Calcula \`danoCritico = dano * 2\`
5. Declara \`esCritico = true\`
6. Calcula \`danoFinal\`: si esCritico es true, usa danoCritico, si no, usa dano
7. Imprime: "Daño final: \[danoFinal]"

**Pista:** Usa operador lógico o condicional para el daño final.

**Salida esperada:**
\`\`\`
Daño final: 50
\`\`\``,
    starterCode: `-- Declara las variables


-- Calcula el daño


-- Calcula daño crítico


-- Determina daño final (usa operador lógico)


-- Imprime el resultado
`,
    solution: `local ataqueJugador = 45
local defensaEnemigo = 20
local dano = ataqueJugador - defensaEnemigo
local danoCritico = dano * 2
local esCritico = true

-- Si esCritico es true, usa danoCritico, si no usa dano
local danoFinal = esCritico and danoCritico or dano

print("Daño final: " .. danoFinal)`,
    tests: [
      {
        type: "code_contains",
        expected: "ataqueJugador = 45",
        message: "El ataque debe ser 45",
      },
      {
        type: "code_contains",
        expected: "defensaEnemigo = 20",
        message: "La defensa debe ser 20",
      },
      {
        type: "code_contains",
        expected: "danoCritico = dano * 2",
        message: "El daño crítico debe ser dano * 2",
      },
      {
        type: "output_contains",
        expected: "Daño final: 50",
        message: "El daño final debe ser 50",
      },
    ],
    hints: [
      "Calcula primero el daño base restando defensa de ataque",
      "El daño crítico es el doble del daño base",
      "Usa 'and...or' como operador ternario: condicion and valor1 or valor2",
    ],
    xpReward: 35,
    difficulty: "beginner",
  },
  summary: `Operadores aritméticos para cálculos, relacionales para comparar, y lógicos para combinar condiciones. La precedencia determina el orden de evaluación. Usa paréntesis para claridad.`,
  resources: [
    {
      title: "Lua Operators Documentation",
      url: "https://www.lua.org/manual/5.4/manual.html#3.4",
      type: "documentation",
      description: "Documentación oficial de operadores en Lua",
    },
    {
      title: "Lua Operators Tutorial",
      url: "https://www.tutorialspoint.com/lua/lua_operators.htm",
      type: "article",
      description: "Tutorial completo de operadores",
    },
  ],
  prerequisites: ["mes-01-l02"],
};
