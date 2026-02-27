/**
 * Lección 1.2: Variables y Tipos de Datos
 */

import { Lesson } from "@/types/lesson";

export const lesson02: Lesson = {
  id: "mes-01-l02",
  moduleId: "mes-01",
  lessonNumber: 2,
  title: "Variables y Tipos de Datos",
  description: "Aprende a declarar variables y conoce los 8 tipos de datos de Lua.",
  estimatedTime: 25,
  difficulty: "beginner",
  theory: {
    title: "Variables y Tipos de Datos",
    objectives: [
      "Comprender qué es una variable y cómo declararla",
      "Diferenciar entre variables locales y globales",
      "Conocer los 8 tipos de datos de Lua",
      "Aplicar buenas prácticas de nombrado",
    ],
    estimatedTime: 25,
    sections: [
      {
        heading: "¿Qué es una Variable?",
        content: `Una variable es como una **caja etiquetada** donde guardas información para usarla después.

Imagina que tienes cajas en tu habitación:
- Una caja etiquetada "juguetes" guarda tus juguetes
- Una caja etiquetada "libros" guarda tus libros
- Una caja etiquetada "ropa" guarda tu ropa

En programación es igual:
- Una variable \`nombre\` guarda un nombre
- Una variable \`edad\` guarda un número
- Una variable \`vida\` guarda la salud de un personaje

**En Lua, declarar una variable es muy fácil:**
\`\`\`lua
local nombre = "Juan"
local edad = 25
local vida = 100.5
\`\`\``,
        codeExamples: [
          {
            title: "Declaración de variables",
            code: `-- Variables locales (RECOMENDADO)
local nombre = "Mario"
local vidas = 3
local altura = 1.5
local esInvencible = false

print(nombre)
print(vidas)`,
            language: "lua",
            description: "Las variables locales solo existen dentro del bloque donde se crean.",
          },
        ],
      },
      {
        heading: "Local vs Global",
        content: `En Lua puedes crear variables de dos tipos:

### Variables Locales ⭐ (RECOMENDADO)

\`\`\`lua
local nombre = "Juan"
-- Solo visible dentro de este bloque
\`\`\`

**Ventajas:**
- **Más rápido** - Lua busca primero en variables locales
- **Evita conflictos** - No choca con otras variables del mismo nombre
- **Mejor para memoria** - Se libera al salir del bloque
- **Más seguro** - Otras partes del código no pueden modificarla accidentalmente

### Variables Globales 🌍

\`\`\`lua
nombre = "Juan"  -- Sin 'local'
-- Visible en TODO el programa
\`\`\`

**Desventajas:**
- **Más lento** - Lua busca en todo el programa
- **Puede causar conflictos** - Otra variable puede tener el mismo nombre
- **Ocupa memoria** - Existe hasta que el programa termina
- **Peligroso** - Cualquier parte del código puede modificarla

**Regla de oro:** Usa \`local\` **SIEMPRE**, a menos que necesites que sea global.`,
        codeExamples: [
          {
            title: "Local vs Global",
            code: `local localVar = "Soy local"  -- Solo aquí
globalVar = "Soy global"     -- En todas partes

function miFuncion()
    local dentro = "Dentro de la función"
    print(localVar)    -- ✓ Funciona
    print(dentro)      -- ✓ Funciona
end

print(localVar)   -- ✓ Funciona
print(dentro)     -- ✗ ERROR: 'dentro' no existe aquí`,
            language: "lua",
            description: "Las variables locales solo existen en su bloque.",
          },
        ],
      },
      {
        heading: "Los 8 Tipos de Datos de Lua",
        content: `Lua tiene **8 tipos de datos** básicos:

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **nil** | Sin valor | \`nil\` |
| **boolean** | Verdadero/Falso | \`true\`, \`false\` |
| **number** | Números | \`42\`, \`3.14\` |
| **string** | Texto | \`"Hola"\` |
| **function** | Función | \`print\` |
| **userdata** | Datos de C | \`Actor\` en UE5 |
| **thread** | Coroutine | \`coroutine.create()\` |
| **table** | Estructura de datos | \`{1, 2, 3}\` |

**Los más importantes que usarás:**

1. **nil** - Representa "sin valor" o "inexistente"
2. **boolean** - Para condiciones (true/false)
3. **number** - Todos los números (enteros y decimales)
4. **string** - Cadenas de texto
5. **table** - Arrays, diccionarios, objetos (lo veremos después)`,
        codeExamples: [
          {
            title: "Ejemplos de cada tipo",
            code: `-- nil (sin valor)
local nada = nil

-- boolean (verdadero/falso)
local vivo = true
local muerto = false

-- number (números)
local edad = 25
local precio = 19.99
local negativo = -10

-- string (texto)
local nombre = "Lua"
local mensaje = 'Hola Mundo'
local multilinea = [[
  Texto en
  múltiples líneas
]]

-- table (estructura)
local numeros = {1, 2, 3}
local jugador = {nombre = "Mario", vida = 100}

-- function (función)
local miFuncion = print

-- Verificar tipo
print(type(nada))    -- nil
print(type(vivo))    -- boolean
print(type(edad))    -- number
print(type(nombre))  -- string
print(type(numeros)) -- table`,
            language: "lua",
            description: "Ejemplos de todos los tipos de datos en Lua.",
          },
        ],
      },
      {
        heading: "Buenas Prácticas de Nombrado",
        content: `Nombra tus variables de forma **clara y descriptiva**:

**✅ BUENO:**
\`\`\`lua
local vidaJugador = 100
local velocidadMaxima = 10.5
local estaVivo = true
local nombreEnemigo = "Goomba"
\`\`\`

**❌ MALO:**
\`\`\`lua
local v = 100
local x = 10.5
local b = true
local n = "Goomba"
\`\`\`

**Convenciones en Lua:**
- Usa **camelCase** para variables: \`vidaJugador\`, \`nivelActual\`
- Usa **descriptivos**: \`contadorVidas\` en vez de \`c\`
- Usa **prefijos booleanos**: \`estaVivo\`, \`tienePoder\`, \`puedeSaltar\`

**Nombres reservados (NO usar):**
\`\`\`lua
-- Palabras clave de Lua
local, function, if, then, else, elseif
end, for, while, do, repeat, until
return, break, true, false, nil
\`\`\``,
      },
    ],
    summary: `Las variables son cajas donde guardas información. Usa siempre 'local' para declararlas. Lua tiene 8 tipos de datos: nil, boolean, number, string, function, userdata, thread y table. Nombra tus variables de forma clara usando camelCase.`,
  },
  examples: [
    {
      title: "Declarar variables locales",
      code: `local nombre = "Link"
local salud = 100
local mana = 50.5
local estaVivo = true

print(nombre .. " tiene " .. salud .. " de salud")`,
      language: "lua",
      description: "Declara variables locales de diferentes tipos.",
    },
    {
      title: "Verificar tipo de dato",
      code: `local valor1 = 42
local valor2 = "Hola"
local valor3 = true
local valor4 = nil

print(type(valor1))  -- number
print(type(valor2))  -- string
print(type(valor3))  -- boolean
print(type(valor4))  -- nil`,
      language: "lua",
      description: "La función type() te dice qué tipo de dato es una variable.",
    },
    {
      title: "Variables globales vs locales",
      code: `local localVar = "Local"  -- Recomendado
globalVar = "Global"       -- Evitar

function prueba()
    local dentro = "Dentro"
    print(localVar)   -- Funciona
    print(globalVar)  -- Funciona
    print(dentro)     -- Funciona
end

prueba()
print(dentro)  -- ERROR: dentro no existe aquí`,
      language: "lua",
      description: "Las variables locales solo existen en su bloque.",
    },
  ],
  interactive: {
    title: "Crea tus Variables",
    description: "Declara variables para un personaje de videojuego",
    starterCode: `-- Crea las siguientes variables locales:
-- 1. nombreJugador (string) con tu nombre
-- 2. nivel (number) con un número del 1 al 100
-- 3. tieneArma (boolean) en true o false
-- 4. oro (number) con la cantidad de oro

-- Luego imprime cada una con print()

`,
    environment: "lua",
    expectedOutput: "number",
  },
  miniExercise: {
    id: "mes-01-l02-ej1",
    lessonId: "mes-01-l02",
    title: "Sistema de Stats",
    instructions: `Crea un sistema de estadísticas para un personaje:

1. Declara una variable local \`nombrePersonaje\` con un string
2. Declara una variable local \`vida\` con el número 100
3. Declara una variable local \`mana\` con el número 50
4. Declara una variable local \`nivel\` con el número 1
5. Declara una variable local \`estaVivo\` con true
6. Imprime: "\[Nombre] - Vida: \[Vida], Mana: \[Mana]"
7. Imprime: "Nivel: \[Nivel] - Vivo: \[EstaVivo]"

**Ejemplo de salida:**
\`\`\`
Mario - Vida: 100, Mana: 50
Nivel: 1 - Vivo: true
\`\`\``,
    starterCode: `-- Declara tus variables aquí


-- Imprime los resultados


`,
    solution: `local nombrePersonaje = "Mario"
local vida = 100
local mana = 50
local nivel = 1
local estaVivo = true

print(nombrePersonaje .. " - Vida: " .. vida .. ", Mana: " .. mana)
print("Nivel: " .. nivel .. " - Vivo: " .. tostring(estaVivo))`,
    tests: [
      {
        type: "code_contains",
        expected: "local nombrePersonaje",
        message: "Debes declarar 'nombrePersonaje' como local",
      },
      {
        type: "code_contains",
        expected: "local vida = 100",
        message: "La vida debe ser 100",
      },
      {
        type: "code_contains",
        expected: "local mana = 50",
        message: "El mana debe ser 50",
      },
      {
        type: "output_contains",
        expected: "Vida: 100",
        message: "Debe imprimir la vida correctamente",
      },
      {
        type: "output_contains",
        expected: "Mana: 50",
        message: "Debe imprimir el mana correctamente",
      },
    ],
    hints: [
      "Usa 'local' para declarar cada variable",
      "Usa .. para concatenar strings en el print",
      "Los números no necesitan comillas",
      "true/false son booleanos, no llevan comillas",
    ],
    xpReward: 30,
    difficulty: "beginner",
  },
  summary: `Las variables guardan información. Usa siempre 'local' para declararlas. Los tipos más usados son: nil, boolean, number, string y table. Nombra las variables claramente usando camelCase.`,
  resources: [
    {
      title: "Lua Types Documentation",
      url: "https://www.lua.org/manual/5.4/manual.html#3.2",
      type: "documentation",
      description: "Documentación oficial sobre tipos en Lua",
    },
    {
      title: "Lua Variables Best Practices",
      url: "https://lua-users.org/wiki/LocalVariables",
      type: "article",
      description: "Mejores prácticas con variables locales",
    },
  ],
  prerequisites: ["mes-01-l01"],
};
