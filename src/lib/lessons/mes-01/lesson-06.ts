/**
 * Lección 1.6: Bucles (Loops)
 */

import { Lesson } from "@/types/lesson";

export const lesson06: Lesson = {
  id: "mes-01-l06",
  moduleId: "mes-01",
  lessonNumber: 6,
  title: "Bucles (Loops)",
  description: "Repetición de código con for, while y repeat-until.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Bucles (Loops)",
    objectives: [
      "Usar for para iteraciones con contador",
      "Aplicar while para condiciones variables",
      "Diferenciar while de repeat-until",
      "Controlar bucles con break",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Bucle for",
        content: `El bucle **for** repite código un número determinado de veces:

**Sintaxis básica:**
\`\`\`lua
for variable = inicio, fin, paso do
    -- Código a repetir
end
\`\`\`

**Ejemplo simple:**
\`\`\`lua
for i = 1, 5 do
    print("Iteración " .. i)
end
-- Imprime: 1, 2, 3, 4, 5
\`\`\`

**Con paso personalizado:**
\`\`\`lua
for i = 1, 10, 2 do
    print(i)  -- 1, 3, 5, 7, 9
end
\`\`\`

**En reversa:**
\`\`\`lua
for i = 10, 1, -1 do
    print(i)  -- 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
end
\`\`\``,
        codeExamples: [
          {
            title: "Bucle for básico",
            code: `-- Contar de 1 a 5
for i = 1, 5 do
    print("Número: " .. i)
end

-- Contar de 2 en 2
for i = 0, 10, 2 do
    print("Par: " .. i)
end

-- Cuenta regresiva
for i = 5, 1, -1 do
    print("Despegue en: " .. i)
end
print("¡Despegue!")`,
            language: "lua",
            description: "El bucle for con diferentes configuraciones.",
          },
        ],
      },
      {
        heading: "Bucle while",
        content: `El bucle **while** repite mientras una condición sea verdadera:

\`\`\`lua
while condicion do
    -- Código a repetir
end
\`\`\`

**Ejemplo:**
\`\`\`lua
local vida = 100
local dano = 20

while vida > 0 do
    print("Vida restante: " .. vida)
    vida = vida - dano
end
print("¡Game Over!")
\`\`\`

**⚠️ Cuidado con los bucles infinitos:**
\`\`\`lua
-- ¡Esto nunca termina!
while true do
    print("Ayuda!")
end
\`\`\`

**Usos en videojuegos:**
- Esperar hasta que el jugador haga algo
- Procesar hasta que se cumpla una condición
- Polling de input`,
        codeExamples: [
          {
            title: "Bucle while",
            code: `local contador = 5

while contador > 0 do
    print("Contando: " .. contador)
    contador = contador - 1
end
print("¡Fin!")

-- Sumar hasta llegar a un límite
local suma = 0
local numero = 1

while suma < 20 do
    suma = suma + numero
    numero = numero + 1
end
print("Suma total: " .. suma)`,
            language: "lua",
            description: "while repite mientras la condición sea true.",
          },
        ],
      },
      {
        heading: "Bucle repeat-until",
        content: `**repeat-until** es como while, pero verifica la condición **al final**:

\`\`\`lua
repeat
    -- Código a repetir
until condicion
\`\`\`

**Diferencia clave con while:**
- **while**: verifica ANTES (puede no ejecutarse nunca)
- **repeat-until**: verifica DESPUÉS (se ejecuta al menos una vez)

**Ejemplo:**
\`\`\`lua
local opcion = 0

repeat
    print("1. Jugar")
    print("2. Opciones")
    print("3. Salir")
    -- opcion = leerInput()
until opcion == 3
\`\`\`

**La condición es de SALIDA** (se repite HASTA que sea true):
\`\`\`lua
local vida = 100

repeat
    vida = vida - 10
    print("Vida: " .. vida)
until vida <= 0
\`\`\``,
        codeExamples: [
          {
            title: "repeat-until vs while",
            code: `-- while puede no ejecutarse
local vida = 0

while vida > 0 do
    print("Esto NO se imprime")
end

-- repeat-until se ejecuta al menos una vez
repeat
    print("Esto SÍ se imprime una vez")
until vida <= 0

-- Ejemplo práctico: pedir input válido
local nivel = 0

repeat
    print("Nivel actual: " .. nivel)
    nivel = nivel + 1
until nivel >= 5
print("Nivel máximo alcanzado")`,
            language: "lua",
            description: "repeat-until garantiza al menos una ejecución.",
          },
        ],
      },
      {
        heading: "Controlar Bucles con break",
        content: `Usa **break** para salir de un bucle antes de que termine:

\`\`\`lua
for i = 1, 10 do
    if i == 5 then
        break  -- Sale del bucle cuando i es 5
    end
    print(i)  -- Imprime: 1, 2, 3, 4
end
\`\`\`

**En videojuegos - Buscar hasta encontrar:**
\`\`\`lua
local enemigos = {...}

for i, enemigo in ipairs(enemigos) do
    if enemigo.vida <= 0 then
        break  -- Ya encontramos uno muerto
    end
end
\`\`\`

**También funciona en while y repeat-until:**
\`\`\`lua
while true do
    local input = leerInput()
    if input == "salir" then
        break  -- Sale del bucle infinito
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Usar break en bucles",
            code: `-- Salir temprano de un for
for i = 1, 10 do
    if i == 7 then
        print("¡Encontrado en " .. i .. "!")
        break
    end
    print("Buscando... " .. i)
end

-- Salir de while con condición
local intentos = 0
local maxIntentos = 5

while true do
    intentos = intentos + 1
    print("Intento: " .. intentos)
    
    if intentos >= maxIntentos then
        print("Máximo de intentos")
        break
    end
end`,
            language: "lua",
            description: "break permite salir de cualquier bucle prematuramente.",
          },
        ],
      },
    ],
    summary: `for repite un número fijo de veces. while repite mientras la condición sea true. repeat-until ejecuta al menos una vez y verifica al final. Usa break para salir temprano.`,
  },
  examples: [
    {
      title: "Tabla de multiplicar",
      code: `local numero = 7

print("Tabla del " .. numero .. ":")
for i = 1, 10 do
    local resultado = numero * i
    print(numero .. " x " .. i .. " = " .. resultado)
end`,
      language: "lua",
      description: "Genera la tabla de multiplicar de un número.",
    },
    {
      title: "Sistema de regeneración",
      code: `local vida = 30
local vidaMaxima = 100
local regeneracion = 10

print("Vida inicial: " .. vida)

while vida < vidaMaxima do
    vida = vida + regeneracion
    if vida > vidaMaxima then
        vida = vidaMaxima
    end
    print("Regenerando... Vida: " .. vida)
end

print("Vida completa: " .. vida)`,
      language: "lua",
      description: "Regenera vida hasta llegar al máximo.",
    },
    {
      title: "Buscar enemigo más débil",
      code: `local enemigos = {
    {nombre = "Orco", vida = 80},
    {nombre = "Goblin", vida = 30},
    {nombre = "Troll", vida = 150}
}

local objetivo = nil

for i, enemigo in ipairs(enemigos) do
    if enemigo.vida <= 50 then
        objetivo = enemigo
        break
    end
end

if objetivo then
    print("Objetivo: " .. objetivo.nombre)
else
    print("No hay enemigos débiles")
end`,
      language: "lua",
      description: "Busca en la lista hasta encontrar un enemigo débil.",
    },
  ],
  interactive: {
    title: "Contador Regresivo",
    description: "Crea una cuenta regresiva para despegue",
    starterCode: `local cuenta = 10

-- Usa un bucle para contar desde 10 hasta 1
-- Después del bucle, imprime "¡Despegue!"



`,
    environment: "lua",
    expectedOutput: "¡Despegue!",
  },
  miniExercise: {
    id: "mes-01-l06-ej1",
    lessonId: "mes-01-l06",
    title: "Sistema de Experiencia",
    instructions: `Simula un sistema de ganancia de experiencia:

1. Declara \`experiencia = 0\`
2. Declara \`experienciaNecesaria = 100\`
3. Declara \`nivel = 1\`
4. Usa un bucle **while** que se repita mientras \`experiencia < experienciaNecesaria\`
5. Dentro del bucle:
   - Suma 15 a experiencia (ganancia por monstruo derrotado)
   - Imprime "Derrotaste un monstruo. EXP: \[experiencia]"
6. Después del bucle, imprime "¡Subiste al nivel \[nivel + 1]!"

**Salida esperada (parcial):**
\`\`\`
Derrotaste un monstruo. EXP: 15
Derrotaste un monstruo. EXP: 30
...
Derrotaste un monstruo. EXP: 105
¡Subiste al nivel 2!
\`\`\``,
    starterCode: `-- Declara las variables


-- Bucle while para ganar experiencia


-- Imprime el mensaje de subir de nivel
`,
    solution: `local experiencia = 0
local experienciaNecesaria = 100
local nivel = 1

while experiencia < experienciaNecesaria do
    experiencia = experiencia + 15
    print("Derrotaste un monstruo. EXP: " .. experiencia)
end

print("¡Subiste al nivel " .. (nivel + 1) .. "!")`,
    tests: [
      {
        type: "code_contains",
        expected: "experiencia = 0",
        message: "La experiencia inicial debe ser 0",
      },
      {
        type: "code_contains",
        expected: "while experiencia < experienciaNecesaria do",
        message: "El while debe verificar experiencia < experienciaNecesaria",
      },
      {
        type: "code_contains",
        expected: "experiencia = experiencia + 15",
        message: "Debe sumar 15 de experiencia por iteración",
      },
      {
        type: "output_contains",
        expected: "¡Subiste al nivel 2!",
        message: "Debe imprimir el mensaje de subir de nivel",
      },
    ],
    hints: [
      "El while debe continuar mientras experiencia sea menor a experienciaNecesaria",
      "Suma 15 a experiencia en cada iteración",
      "Imprime el mensaje dentro del bucle después de sumar",
    ],
    xpReward: 40,
    difficulty: "intermediate",
  },
  summary: `for para iteraciones con contador conocido. while para condiciones variables. repeat-until ejecuta al menos una vez. break sale prematuramente de cualquier bucle.`,
  resources: [
    {
      title: "Lua Loops Documentation",
      url: "https://www.lua.org/manual/5.4/manual.html#3.3.5",
      type: "documentation",
      description: "Documentación oficial de bucles en Lua",
    },
    {
      title: "Lua Loop Patterns",
      url: "https://lua-users.org/wiki/LoopPatterns",
      type: "article",
      description: "Patrones comunes de bucles en Lua",
    },
  ],
  prerequisites: ["mes-01-l05"],
};
