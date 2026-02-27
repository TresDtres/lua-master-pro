/**
 * Lección 2.1: Tablas Avanzadas
 */

import { Lesson } from "@/types/lesson";

export const lesson01: Lesson = {
  id: "mes-02-l01",
  moduleId: "mes-02",
  lessonNumber: 1,
  title: "Tablas Avanzadas",
  description: "Arrays, diccionarios e iteración de tablas en Lua.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Tablas Avanzadas",
    objectives: [
      "Comprender tablas como arrays y diccionarios",
      "Iterar sobre tablas con pairs e ipairs",
      "Usar funciones de tabla avanzadas",
      "Aplicar tablas en contextos de UE5",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Tablas como Arrays",
        content: `Las tablas en Lua son **estructuras versátiles** que pueden funcionar como arrays:

**Crear y acceder:**
\`\`\`lua
local numeros = {10, 20, 30, 40, 50}
print(numeros[1])  -- 10 (índices inician en 1)
print(numeros[3])  -- 30
\`\`\`

**Modificar:**
\`\`\`lua
numeros[2] = 25
numeros[6] = 60  -- Agrega nuevo elemento
\`\`\`

**Importante:** En Lua, los índices de arrays **inician en 1**, no en 0 como en otros lenguajes.

**Arrays de actores en UE5:**
\`\`\`lua
local enemigos = {
    SpawnActor("Enemy1"),
    SpawnActor("Enemy2"),
    SpawnActor("Enemy3")
}

for i, enemigo in ipairs(enemigos) do
    enemigo:TakeDamage(10)
end
\`\`\``,
        codeExamples: [
          {
            title: "Array de jugadores",
            code: `local jugadores = {
    {nombre = "Mario", vida = 100},
    {nombre = "Luigi", vida = 85},
    {nombre = "Peach", vida = 90}
}

-- Acceder a datos
print(jugadores[1].nombre)  -- "Mario"
print(jugadores[2].vida)    -- 85

-- Modificar
jugadores[1].vida = 120
print(jugadores[1].vida)    -- 120`,
            language: "lua",
            description: "Arrays pueden contener tablas anidadas con datos complejos.",
          },
        ],
      },
      {
        heading: "Tablas como Diccionarios",
        content: `Las tablas también funcionan como **diccionarios o hash maps**:

**Crear diccionario:**
\`\`\`lua
local jugador = {
    nombre = "Link",
    nivel = 50,
    oro = 1500,
    clase = "Guerrero"
}
\`\`\`

**Acceso con strings:**
\`\`\`lua
print(jugador.nombre)  -- "Link"
print(jugador["nivel"]) -- 50
\`\`\`

**Ambas formas son equivalentes**, pero:
- \`tabla.clave\` - Solo para claves válidas como identificadores
- \`tabla["clave"]\` - Funciona con cualquier string, incluyendo espacios

**Diccionarios de configuración en UE5:**
\`\`\`lua
local configArma = {
    ["daño"] = 25,
    ["cadencia"] = 0.1,
    ["magnitud"] = 5000,
    ["tipoDaño"] = "Físico"
}
\`\`\``,
        codeExamples: [
          {
            title: "Diccionario de stats",
            code: `local statsPersonaje = {
    fuerza = 25,
    agilidad = 30,
    inteligencia = 15,
    ["puntos vida"] = 100  -- Solo accesible con ["key"]
}

print(statsPersonaje.fuerza)        -- 25
print(statsPersonaje["agilidad"])   -- 30
print(statsPersonaje["puntos vida"]) -- 100`,
            language: "lua",
            description: "Diccionarios permiten claves descriptivas para datos.",
          },
        ],
      },
      {
        heading: "Iteración de Tablas",
        content: `Lua tiene **dos funciones** principales para iterar tablas:

**ipairs() - Para arrays (índices numéricos):**
\`\`\`lua
local colores = {"rojo", "verde", "azul"}

for i, color in ipairs(colores) do
    print(i, color)
end
-- 1, "rojo"
-- 2, "verde"
-- 3, "azul"
\`\`\`

**pairs() - Para diccionarios (cualquier clave):**
\`\`\`lua
local jugador = {nombre = "Mario", nivel = 50}

for clave, valor in pairs(jugador) do
    print(clave, valor)
end
-- nombre, "Mario"
-- nivel, 50
\`\`\`

**Diferencia clave:**
- \`ipairs\` - Ordenado, solo índices numéricos consecutivos
- \`pairs\` - Sin orden garantizado, todas las claves`,
        codeExamples: [
          {
            title: "ipairs vs pairs",
            code: `local混合 = {10, 20, nombre = "Test", 30}

-- ipairs solo ve índices numéricos consecutivos
print("Con ipairs:")
for i, v in ipairs(混合) do
    print(i, v)  -- 1, 10 | 2, 20 | 3, 30
end

-- pairs ve TODO
print("Con pairs:")
for k, v in pairs(混合) do
    print(k, v)  -- 1, 10 | 2, 20 | 3, 30 | nombre, "Test"
end`,
            language: "lua",
            description: "ipairs para arrays, pairs para diccionarios completos.",
          },
        ],
      },
      {
        heading: "Funciones de Tabla Avanzadas",
        content: `Lua provee **funciones útiles** en la librería \`table\`:

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| **table.insert** | Insertar elemento | \`table.insert(t, valor)\` |
| **table.remove** | Remover elemento | \`table.remove(t, índice)\` |
| **table.concat** | Unir en string | \`table.concat(t, ", ")\` |
| **table.sort** | Ordenar | \`table.sort(t)\` |
| **table.pack** | Empaquetar valores | \`table.pack(1,2,3)\` |
| **table.unpack** | Desempaquetar | \`table.unpack(t)\` |

**Ejemplos prácticos:**
\`\`\`lua
local lista = {1, 2, 3}

-- Insertar al final
table.insert(lista, 4)  -- {1, 2, 3, 4}

-- Insertar en posición
table.insert(lista, 2, 99)  -- {1, 99, 2, 3, 4}

-- Remover
table.remove(lista, 2)  -- {1, 2, 3, 4}

-- Unir
local texto = table.concat(lista, ", ")  -- "1, 2, 3, 4"

-- Ordenar
table.sort(lista, function(a, b) return a > b end)
\`\`\``,
        codeExamples: [
          {
            title: "Gestión de inventario",
            code: `local inventario = {"Espada", "Escudo", "Poción"}

-- Agregar item
table.insert(inventario, "Arco")

-- Insertar en slot específico
table.insert(inventario, 2, "Armadura")

-- Usar item y remover
table.remove(inventario, 3)  -- Usa Poción

-- Listar items
print("Inventario: " .. table.concat(inventario, ", "))`,
            language: "lua",
            description: "Funciones de tabla para gestión dinámica de inventario.",
          },
        ],
      },
    ],
    summary: `Las tablas en Lua son arrays (índices numéricos) y diccionarios (claves string). Usa ipairs para arrays, pairs para diccionarios. Las funciones table.insert, table.remove, table.concat y table.sort son esenciales para manipulación dinámica.`,
  },
  examples: [
    {
      title: "Array de enemigos",
      code: `local enemigos = {
    {tipo = "Orco", vida = 100, daño = 25},
    {tipo = "Goblin", vida = 50, daño = 15},
    {tipo = "Troll", vida = 200, daño = 40}
}

-- Atacar al primero
local objetivo = enemigos[1]
print("Atacando " .. objetivo.tipo .. " con " .. objetivo.vida .. " HP")

-- Iterar y mostrar débiles
for i, enemigo in ipairs(enemigos) do
    if enemigo.vida < 60 then
        print(enemigo.tipo .. " está débil")
    end
end`,
      language: "lua",
      description: "Array de tablas para gestionar múltiples enemigos.",
    },
    {
      title: "Diccionario de configuración",
      code: `local configJuego = {
    dificultad = "Normal",
    volumenMusica = 0.7,
    volumenSFX = 0.9,
    graficos = {
        calidad = "Alto",
        sombras = true,
        antiAliasing = 4
    }
}

-- Acceder a nested table
print(configJuego.graficos.calidad)  -- "Alto"

-- Modificar
configJuego.graficos.sombras = false`,
      language: "lua",
      description: "Tablas anidadas para configuración compleja.",
    },
    {
      title: "Sistema de loot",
      code: `local lootTable = {
    comun = {"Poción", "Antídoto", "Cuerda"},
    raro = {"Espada Mágica", "Anillo de Poder"},
    legendario = {"Excalibur", "Corona del Rey"}
}

local function obtenerLoot(rareza)
    local items = lootTable[rareza]
    local indice = math.random(1, #items)
    return items[indice]
end

print("Obtuviste: " .. obtenerLoot("raro"))`,
      language: "lua",
      description: "Tablas como diccionarios de loot por rareza.",
    },
  ],
  interactive: {
    title: "Gestor de Inventario",
    description: "Crea y manipula un inventario de jugador",
    starterCode: `-- Crea un inventario con 3 items
local inventario = {
    
}

-- Agrega un item nuevo con table.insert
table.insert(inventario, "NuevoItem")

-- Imprime el inventario completo
print("Inventario: " .. table.concat(inventario, ", "))

-- Muestra cuántos items hay
print("Total items: " .. #inventario)`,
    environment: "lua",
    expectedOutput: "Inventario:",
  },
  miniExercise: {
    id: "mes-02-l01-ej1",
    lessonId: "mes-02-l01",
    title: "Sistema de Party",
    instructions: `Crea un sistema de party de RPG:

1. Declara una tabla \`party\` con 3 miembros
2. Cada miembro debe tener: \`nombre\`, \`clase\`, \`nivel\`
3. Agrega un cuarto miembro usando \`table.insert\`
4. Itera con \`ipairs\` e imprime: "\[Nombre] - \[Clase] (Nivel \[Nivel])"

**Ejemplo de salida:**
\`\`\`
Mario - Guerrero (Nivel 50)
Luigi - Mago (Nivel 45)
Peach - Clérigo (Nivel 48)
Toad - Ladrón (Nivel 30)
\`\`\``,
    starterCode: `-- Crea la party con 3 miembros
local party = {
    
}

-- Agrega un cuarto miembro


-- Imprime cada miembro con su info


`,
    solution: `local party = {
    {nombre = "Mario", clase = "Guerrero", nivel = 50},
    {nombre = "Luigi", clase = "Mago", nivel = 45},
    {nombre = "Peach", clase = "Clérigo", nivel = 48}
}

table.insert(party, {nombre = "Toad", clase = "Ladrón", nivel = 30})

for i, miembro in ipairs(party) do
    print(miembro.nombre .. " - " .. miembro.clase .. " (Nivel " .. miembro.nivel .. ")")
end`,
    tests: [
      {
        type: "code_contains",
        expected: "local party",
        message: "Debes declarar la tabla party",
      },
      {
        type: "code_contains",
        expected: "table.insert",
        message: "Debes usar table.insert para agregar el cuarto miembro",
      },
      {
        type: "code_contains",
        expected: "ipairs",
        message: "Debes iterar con ipairs",
      },
      {
        type: "output_contains",
        expected: "Nivel 50",
        message: "Debe mostrar al menos un miembro nivel 50",
      },
    ],
    hints: [
      "Cada miembro es una tabla con nombre, clase y nivel",
      "Usa table.insert(party, {nombre = '...', clase = '...', nivel = ...})",
      "Itera con: for i, miembro in ipairs(party) do",
    ],
    xpReward: 40,
    difficulty: "intermediate",
  },
  summary: `Tablas son arrays (índices 1-based) y diccionarios. ipairs para arrays secuenciales, pairs para todos los elementos. Funciones table.* permiten manipulación dinámica esencial para inventarios, parties y configuración en juegos.`,
  resources: [
    {
      title: "Lua Tables Documentation",
      url: "https://www.lua.org/manual/5.4/manual.html#3.4.9",
      type: "documentation",
      description: "Documentación oficial de tablas en Lua",
    },
    {
      title: "Table Library Reference",
      url: "https://www.lua.org/manual/5.4/manual.html#6.6",
      type: "documentation",
      description: "Funciones de la librería table",
    },
    {
      title: "UnLua Tables in UE5",
      url: "https://github.com/Tencent/UnLua/blob/master/Docs/zh_CN/README.md",
      type: "article",
      description: "Uso de tablas en UnLua para UE5",
    },
  ],
  prerequisites: ["mes-01-l07"],
};

export default lesson01;
