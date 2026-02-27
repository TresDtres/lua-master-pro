/**
 * Lección 1.7: Funciones
 */

import { Lesson } from "@/types/lesson";

export const lesson07: Lesson = {
  id: "mes-01-l07",
  moduleId: "mes-01",
  lessonNumber: 7,
  title: "Funciones",
  description: "Crea funciones reutilizables con parámetros y retorno de valores.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Funciones",
    objectives: [
      "Definir y llamar funciones",
      "Usar parámetros y argumentos",
      "Retornar valores desde funciones",
      "Comprender el scope de variables",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Definir Funciones",
        content: `Una **función** es un bloque de código que realiza una tarea específica y puede reutilizarse:

**Sintaxis básica:**
\`\`\`lua
function nombreFuncion()
    -- Código de la función
end
\`\`\`

**Llamar a la función:**
\`\`\`lua
nombreFuncion()  -- Ejecuta el código
\`\`\`

**Ejemplo:**
\`\`\`lua
function saludar()
    print("¡Hola, viajero!")
    print("Bienvenido a Lua Master")
end

saludar()  -- Llama a la función
saludar()  -- Puedes llamarla múltiples veces
\`\`\`

**Ventajas de usar funciones:**
- **Reutilización** - Escribes el código una vez, lo usas muchas
- **Organización** - Divide problemas grandes en partes pequeñas
- **Mantenimiento** - Cambias en un lugar, afecta a todos los usos`,
        codeExamples: [
          {
            title: "Función simple",
            code: `function mostrarSaludo()
    print("¡Hola!")
    print("Bienvenido al curso de Lua")
    print("¡Vamos a aprender!")
end

-- Llamar a la función
mostrarSaludo()

-- Puedes llamarla múltiples veces
mostrarSaludo()`,
            language: "lua",
            description: "Una función que muestra un saludo se puede llamar múltiples veces.",
          },
        ],
      },
      {
        heading: "Parámetros y Argumentos",
        content: `Las funciones pueden recibir **datos** para trabajar con ellos:

\`\`\`lua
function saludar(nombre)
    print("Hola, " .. nombre .. "!")
end

saludar("Mario")  -- "Hola, Mario!"
saludar("Link")   -- "Hola, Link!"
\`\`\`

**Múltiples parámetros:**
\`\`\`lua
function mostrarStats(nombre, vida, nivel)
    print(nombre .. " - Vida: " .. vida .. " - Nivel: " .. nivel)
end

mostrarStats("Mario", 100, 50)
mostrarStats("Link", 80, 25)
\`\`\`

**⚠️ Importante:**
- Los parámetros son variables locales de la función
- Si no pasas un argumento, el parámetro vale \`nil\``,
        codeExamples: [
          {
            title: "Función con parámetros",
            code: `function calcularDano(ataque, defensa)
    local dano = ataque - defensa
    print("Ataque: " .. ataque)
    print("Defensa: " .. defensa)
    print("Daño: " .. dano)
end

calcularDano(50, 20)  -- Daño: 30
calcularDano(100, 30) -- Daño: 70`,
            language: "lua",
            description: "Los parámetros permiten pasar datos a la función.",
          },
        ],
      },
      {
        heading: "Retornar Valores",
        content: `Las funciones pueden **devolver valores** con \`return\`:

\`\`\`lua
function sumar(a, b)
    return a + b
end

local resultado = sumar(5, 3)
print(resultado)  -- 8
\`\`\`

**Múltiples retornos** (¡Lua lo permite!):
\`\`\`lua
function dividir(numero, divisor)
    local cociente = numero // divisor
    local residuo = numero % divisor
    return cociente, residuo
end

local c, r = dividir(10, 3)
print(c)  -- 3 (cociente)
print(r)  -- 1 (residuo)
\`\`\`

**Retorno temprano:**
\`\`\`lua
function esPositivo(numero)
    if numero > 0 then
        return true
    end
    return false
end
\`\`\``,
        codeExamples: [
          {
            title: "Función con retorno",
            code: `function calcularArea(base, altura)
    return base * altura
end

local area = calcularArea(5, 10)
print("Área: " .. area)  -- 50

-- Múltiples retornos
function obtenerDimensiones()
    return 1920, 1080
end

local ancho, alto = obtenerDimensiones()
print(ancho .. "x" .. alto)  -- 1920x1080`,
            language: "lua",
            description: "return devuelve valores desde la función.",
          },
        ],
      },
      {
        heading: "Scope de Variables",
        content: `El **scope** determina dónde existe una variable:

**Variables locales en funciones:**
\`\`\`lua
function miFuncion()
    local localFuncion = "Solo existe aquí"
    print(localFuncion)  -- ✓ Funciona
end

print(localFuncion)  -- ✗ ERROR: no existe fuera
\`\`\`

**Variables globales:**
\`\`\`lua
global = "Existe en todas partes"

function miFuncion()
    print(global)  -- ✓ Funciona
end
\`\`\`

**Parámetros son locales:**
\`\`\`lua
function saludar(nombre)
    -- 'nombre' solo existe dentro de esta función
    print(nombre)
end

print(nombre)  -- ✗ ERROR: no existe
\`\`\`

**Mejor práctica:** Usa siempre \`local\` dentro de funciones.`,
        codeExamples: [
          {
            title: "Scope de variables",
            code: `local global = "Soy global"

function prueba()
    local localFuncion = "Soy local de la función"
    print(global)        -- ✓ "Soy global"
    print(localFuncion)  -- ✓ "Soy local de la función"
end

prueba()
print(global)        -- ✓ "Soy global"
print(localFuncion)  -- ✗ ERROR: nil`,
            language: "lua",
            description: "Las variables locales solo existen en su scope.",
          },
        ],
      },
      {
        heading: "Funciones como Valores",
        content: `En Lua, las funciones son **valores de primera clase**:

**Asignar función a variable:**
\`\`\`lua
local saludar = function(nombre)
    print("Hola, " .. nombre)
end

saludar("Mario")
\`\`\`

**Pasar función como parámetro:**
\`\`\`lua
function ejecutar(func)
    func()
end

ejecutar(function()
    print("¡Ejecutado!")
end)
\`\`\`

**Esto es la base de:**
- Callbacks
- Funciones de orden superior
- Closures (lo veremos en módulos avanzados)`,
        codeExamples: [
          {
            title: "Funciones como valores",
            code: `-- Función anónima en variable
local despedir = function(nombre)
    print("Adiós, " .. nombre)
end

despedir("Mario")

-- Función que recibe otra función
function repetir(func, veces)
    for i = 1, veces do
        func(i)
    end
end

repetir(function(n)
    print("Iteración " .. n)
end, 3)`,
            language: "lua",
            description: "Las funciones pueden guardarse en variables y pasarse como argumentos.",
          },
        ],
      },
    ],
    summary: `Las funciones son bloques de código reutilizables. Usa parámetros para pasar datos y return para devolver valores. Las variables locales solo existen dentro de su scope.`,
  },
  examples: [
    {
      title: "Calculadora de daño",
      code: `function calcularDano(ataque, defensa, esCritico)
    local danoBase = ataque - defensa
    
    if esCritico then
        return danoBase * 2, true
    end
    
    return danoBase, false
end

local dano1, crit1 = calcularDano(50, 20, true)
print("Daño: " .. dano1 .. " (Crítico: " .. tostring(crit1) .. ")")

local dano2, crit2 = calcularDano(50, 20, false)
print("Daño: " .. dano2 .. " (Crítico: " .. tostring(crit2) .. ")")`,
      language: "lua",
      description: "Función que calcula daño con posibilidad de crítico.",
    },
    {
      title: "Sistema de curación",
      code: `function curar(vidaActual, cantidad, vidaMaxima)
    local nuevaVida = vidaActual + cantidad
    
    if nuevaVida > vidaMaxima then
        nuevaVida = vidaMaxima
    end
    
    local curacionReal = nuevaVida - vidaActual
    
    return nuevaVida, curacionReal
end

local vida, curado = curar(50, 30, 100)
print("Vida: " .. vida .. " (Curado: " .. curado .. ")")

local vida2, curado2 = curar(90, 30, 100)
print("Vida: " .. vida2 .. " (Curado: " .. curado2 .. ")")`,
      language: "lua",
      description: "Función que cura sin pasar del máximo de vida.",
    },
    {
      title: "Verificar nivel requerido",
      code: `function puedeUsarItem(nivelJugador, nivelRequerido)
    if nivelJugador >= nivelRequerido then
        return true, "Puedes usar este item"
    else
        local faltante = nivelRequerido - nivelJugador
        return false, "Necesitas nivel " .. nivelRequerido .. " (te faltan " .. faltante .. ")"
    end
end

local puede1, msg1 = puedeUsarItem(25, 20)
print(msg1)

local puede2, msg2 = puedeUsarItem(15, 20)
print(msg2)`,
      language: "lua",
      description: "Función que verifica si se cumple el nivel requerido.",
    },
  ],
  interactive: {
    title: "Crea tu Función",
    description: "Define una función que calcule el precio con descuento",
    starterCode: `-- Define una función 'calcularDescuento' que:
-- Reciba: precio y porcentajeDescuento
-- Retorne: el precio final con el descuento aplicado
-- Fórmula: precioFinal = precio - (precio * porcentajeDescuento / 100)



-- Prueba tu función
local precioFinal = calcularDescuento(100, 20)
print("Precio con descuento: " .. precioFinal)
-- Debe imprimir: 80`,
    environment: "lua",
    expectedOutput: "80",
  },
  miniExercise: {
    id: "mes-01-l07-ej1",
    lessonId: "mes-01-l07",
    title: "Calculadora de Stats",
    instructions: `Crea una función que calcule las stats finales de un personaje:

1. Define una función \`calcularStats\` que reciba:
   - \`fuerzaBase\` (number)
   - \`bonusPorcentaje\` (number, ej: 20 para 20%)
   - \`nivel\` (number)

2. La función debe:
   - Calcular \`fuerzaTotal = fuerzaBase + (fuerzaBase * bonusPorcentaje / 100) + (nivel * 2)\`
   - Calcular \`vidaTotal = 100 + (nivel * 10)\`
   - Retornar \`fuerzaTotal\` y \`vidaTotal\`

3. Llama a la función con:
   - fuerzaBase = 50
   - bonusPorcentaje = 20
   - nivel = 10

4. Imprime: "Fuerza: \[fuerzaTotal], Vida: \[vidaTotal]"

**Resultado esperado:**
- fuerzaTotal = 50 + (50 * 20/100) + (10 * 2) = 50 + 10 + 20 = 80
- vidaTotal = 100 + (10 * 10) = 200
- Salida: "Fuerza: 80, Vida: 200"`,
    starterCode: `-- Define la función calcularStats


-- Llama a la función y guarda los resultados


-- Imprime el resultado
`,
    solution: `function calcularStats(fuerzaBase, bonusPorcentaje, nivel)
    local fuerzaTotal = fuerzaBase + (fuerzaBase * bonusPorcentaje / 100) + (nivel * 2)
    local vidaTotal = 100 + (nivel * 10)
    return fuerzaTotal, vidaTotal
end

local fuerza, vida = calcularStats(50, 20, 10)
print("Fuerza: " .. fuerza .. ", Vida: " .. vida)`,
    tests: [
      {
        type: "code_contains",
        expected: "function calcularStats",
        message: "Debes definir la función calcularStats",
      },
      {
        type: "code_contains",
        expected: "return",
        message: "La función debe retornar valores",
      },
      {
        type: "output_contains",
        expected: "Fuerza: 80",
        message: "La fuerza total debe ser 80",
      },
      {
        type: "output_contains",
        expected: "Vida: 200",
        message: "La vida total debe ser 200",
      },
    ],
    hints: [
      "La fórmula es: fuerzaTotal = fuerzaBase + (fuerzaBase * bonusPorcentaje / 100) + (nivel * 2)",
      "vidaTotal = 100 + (nivel * 10)",
      "Usa 'return fuerzaTotal, vidaTotal' para devolver ambos valores",
    ],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: `Las funciones son bloques de código reutilizables con parámetros y retorno. Usa return para devolver valores. Las variables locales solo existen dentro de su scope.`,
  resources: [
    {
      title: "Lua Functions Documentation",
      url: "https://www.lua.org/manual/5.4/manual.html#3.4.10",
      type: "documentation",
      description: "Documentación oficial de funciones en Lua",
    },
    {
      title: "Lua Functions Tutorial",
      url: "https://www.tutorialspoint.com/lua/lua_functions.htm",
      type: "article",
      description: "Tutorial completo de funciones en Lua",
    },
  ],
  prerequisites: ["mes-01-l06"],
};
