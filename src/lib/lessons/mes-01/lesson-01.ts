/**
 * Lección 1.1: Introducción a Lua
 */

import { Lesson } from "@/types/lesson";

export const lesson01: Lesson = {
  id: "mes-01-l01",
  moduleId: "mes-01",
  lessonNumber: 1,
  title: "Introducción a Lua",
  description: "¿Qué es Lua? Historia, características y casos de uso en videojuegos.",
  estimatedTime: 20,
  difficulty: "beginner",
  theory: {
    title: "Introducción a Lua",
    objectives: [
      "Entender qué es Lua y por qué es popular en videojuegos",
      "Conocer la historia y evolución de Lua",
      "Identificar casos de uso reales en la industria",
      "Configurar el entorno de desarrollo",
    ],
    estimatedTime: 20,
    sections: [
      {
        heading: "¿Qué es Lua?",
        content: `Lua es un lenguaje de programación **ligero, rápido y embeddable** (incrustable) diseñado específicamente para ser integrado en otras aplicaciones.

Fue creado en **1993** por un equipo de la Pontificia Universidad Católica de Río de Janeiro, Brasil, liderado por **Roberto Ierusalimschy**.

A diferencia de lenguajes como C++ o Java que son "pesados" y complejos, Lua fue diseñado desde cero para ser:
- **Pequeño**: El intérprete completo mide menos de 1MB
- **Rápido**: Uno de los lenguajes scripting más rápidos
- **Simple**: Sintaxis limpia y fácil de aprender
- **Flexible**: Se integra fácilmente con otros lenguajes`,
        codeExamples: [
          {
            title: "Tu primer programa en Lua",
            code: `-- Este es un comentario en Lua
print("¡Hola, Mundo!")

-- Las variables son fáciles de declarar
local nombre = "Estudiante"
local salud = 100
local velocidad = 5.5

print("Jugador: " .. nombre)
print("Salud: " .. salud)
print("Velocidad: " .. velocidad)`,
            language: "lua",
            description: "Este código muestra lo simple que es Lua: declara variables e imprime valores.",
          },
        ],
      },
      {
        heading: "Historia de Lua",
        content: `Lua nació de la necesidad de tener un lenguaje scripting para aplicaciones de ingeniería.

**Línea de tiempo:**
- **1993**: Lua 1.0 - Primer lanzamiento
- **1997**: Lua 3.0 - Se vuelve más popular
- **2003**: Lua 5.0 - Introduce las metatables
- **2011**: Lua 5.2 - Mejoras en rendimiento
- **2019**: Lua 5.4 - Versión actual estable

El nombre "Lua" significa **"Luna"** en portugués, manteniendo la temática celestial de su país de origen.`,
      },
      {
        heading: "Lua en Videojuegos",
        content: `Lua es **extremadamente popular** en la industria de los videojuegos. Algunos títulos famosos que usan Lua:

**Juegos AAA:**
- World of Warcraft (addons y UI)
- Angry Birds (lógica del juego)
- Civilization V (scripts de IA)
- Dota 2 (sistema de mods)
- Roblox (Luau, derivado de Lua)

**Motores de juego:**
- **Unreal Engine** (con UnLua)
- **Unity** (con MoonSharp o NLua)
- **Love2D** (motor 2D basado en Lua)
- **Corona SDK** (desarrollo móvil)
- **Defold** (motor multiplataforma)

**¿Por qué los juegos usan Lua?**
1. **Rápido de ejecutar** - Casi tan rápido como C para scripting
2. **Fácil de aprender** - Los diseñadores no-programadores pueden usarlo
3. **Seguro** - No puede romper el motor principal
4. **Ligero** - No añade mucho peso al juego final`,
      },
      {
        heading: "Lua vs Luau",
        content: `**Lua** es el lenguaje original. **Luau** es una versión modificada creada por Roblox.

**Diferencias principales:**

| Característica | Lua | Luau |
|---------------|-----|------|
| Tipado | Dinámico | Opcionalmente tipado |
| Sintaxis | Clásica | Mejoras modernas |
| Performance | Rápido | Más rápido (JIT) |
| Uso principal | General | Roblox |

En este curso aprenderás **Lua estándar**, que es compatible con la mayoría de motores incluyendo Unreal Engine con UnLua.`,
      },
    ],
    summary: `Lua es un lenguaje scripting ligero creado en Brasil en 1993. Es popular en videojuegos por ser rápido, simple y fácil de integrar. Empresas como Blizzard, Riot Games y Roblox lo usan en sus títulos más exitosos.`,
  },
  examples: [
    {
      title: "Imprimir en consola",
      code: `print("¡Hola desde Lua!")
print("Lua es increíble para videojuegos")`,
      language: "lua",
      description: "La función print() muestra texto en la consola.",
    },
    {
      title: "Variables básicas",
      code: `local jugador = "Mario"
local vidas = 3
local poder = 1.5

print(jugador .. " tiene " .. vidas .. " vidas")
print("Multiplicador de poder: " .. poder)`,
      language: "lua",
      description: "Declara variables locales de diferentes tipos y las concatena.",
    },
    {
      title: "Comentarios",
      code: `-- Comentario de una línea

--[[
  Comentario
  de múltiples
  líneas
]]

print("Solo esto se ejecuta")`,
      language: "lua",
      description: "Lua soporta comentarios de una y múltiples líneas.",
    },
  ],
  interactive: {
    title: "Experimenta con Print",
    description: "Modifica este código para mostrar tu nombre y tu juego favorito",
    starterCode: `-- Modifica este código
local nombre = "TuNombre"
local juego = "TuJuegoFavorito"

print("¡Hola! Me llamo " .. nombre)
print("Mi juego favorito es " .. juego)
print("¡Estoy aprendiendo Lua para crear juegos!")`,
    environment: "lua",
    expectedOutput: "¡Hola! Me llamo",
  },
  miniExercise: {
    id: "mes-01-l01-ej1",
    lessonId: "mes-01-l01",
    title: "Tu Primer Programa",
    instructions: `Crea un programa que:
1. Declare una variable local llamada \`personaje\` con tu personaje favorito
2. Declare una variable local llamada \`nivel\` con un número del 1 al 100
3. Imprima un mensaje que diga: "[Personaje] está en nivel [Nivel]"

**Ejemplo de salida esperada:**
\`\`\`
Link está en nivel 50
\`\`\``,
    starterCode: `-- Escribe tu código aquí
-- Declara tus variables y usa print()

`,
    solution: `local personaje = "Link"
local nivel = 50

print(personaje .. " está en nivel " .. nivel)`,
    tests: [
      {
        type: "output_contains",
        expected: "está en nivel",
        message: "El mensaje debe contener 'está en nivel'",
      },
      {
        type: "code_contains",
        expected: "local personaje",
        message: "Debes declarar una variable local 'personaje'",
      },
      {
        type: "code_contains",
        expected: "local nivel",
        message: "Debes declarar una variable local 'nivel'",
      },
    ],
    hints: [
      "Usa la palabra clave 'local' para declarar variables",
      "Usa .. para concatenar strings",
      "print() muestra el resultado en consola",
    ],
    xpReward: 25,
    difficulty: "beginner",
  },
  summary: `Lua es un lenguaje scripting ligero y rápido, creado en 1993 en Brasil. Es ampliamente usado en videojuegos como World of Warcraft, Angry Birds y Roblox. Su simplicidad y rendimiento lo hacen ideal para scripting en motores como Unreal Engine.`,
  resources: [
    {
      title: "Sitio Oficial de Lua",
      url: "https://www.lua.org/",
      type: "documentation",
      description: "Documentación oficial y descargas",
    },
    {
      title: "Programming in Lua (libro gratis online)",
      url: "https://www.lua.org/pil/",
      type: "article",
      description: "Libro oficial de los creadores de Lua",
    },
    {
      title: "UnLua en GitHub",
      url: "https://github.com/Tencent/UnLua",
      type: "tool",
      description: "Binding de Lua para Unreal Engine",
    },
  ],
  prerequisites: [],
};
