/**
 * Lección 2.2: Metatables
 */

import { Lesson } from "@/types/lesson";

export const lesson02: Lesson = {
  id: "mes-02-l02",
  moduleId: "mes-02",
  lessonNumber: 2,
  title: "Metatables",
  description: "__index, __newindex y metamétodos para comportamiento personalizado.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Metatables",
    objectives: [
      "Comprender qué son las metatables y por qué son importantes",
      "Usar __index para acceso personalizado a propiedades",
      "Implementar __newindex para validación de datos",
      "Aplicar metamétodos en sistemas de UE5",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "¿Qué son las Metatables?",
        content: `Las **metatable** son tablas que definen comportamiento especial para otras tablas. Son el corazón del sistema de objetos en Lua.

**Concepto básico:**
\`\`\`lua
local tabla = {nombre = "Mario"}
local mt = {}  -- Esta es la metatable

setmetatable(tabla, mt)  -- Asociar metatable a la tabla
\`\`\`

**¿Para qué sirven?**
- Definir qué pasa cuando accedes a una propiedad que no existe
- Validar datos antes de asignarlos
- Crear sistemas de eventos automáticos
- Implementar herencia y POO

**En UE5 con UnLua:**
Las metatables permiten acceder a propiedades de actores como si fueran tablas normales.`,
        codeExamples: [
          {
            title: "Metatable básica",
            code: `local jugador = {
    nombre = "Link",
    vida = 100
}

local mt = {}
setmetatable(jugador, mt)

-- Ahora 'jugador' usa 'mt' para comportamiento especial
print(jugador.nombre)  -- "Link"`,
            language: "lua",
            description: "Una metatable vacía no cambia el comportamiento, pero prepara la tabla para comportamiento personalizado.",
          },
        ],
      },
      {
        heading: "__index - Acceso a Propiedades",
        content: `**__index** es el metamétodo más usado. Se ejecuta cuando intentas leer una propiedad que no existe.

**Puede ser una función o una tabla:**

**Como función:**
\`\`\`lua
local mt = {
    __index = function(tabla, key)
        return "Propiedad " .. key .. " no existe"
    end
}

local jugador = {nombre = "Mario"}
setmetatable(jugador, mt)

print(jugador.nombre)  -- "Mario" (existe)
print(jugador.vida)    -- "Propiedad vida no existe"
\`\`\`

**Como tabla (herencia):**
\`\`\`lua
local personajeBase = {
    vidaMaxima = 100,
    velocidad = 5
}

local mt = {__index = personajeBase}
local guerrero = setmetatable({nombre = "Kratos"}, mt)

print(guerrero.vidaMaxima)  -- 100 (heredado)
print(guerrero.nombre)      -- "Kratos" (propio)
\`\`\`

**En UE5:**
\`\`\`lua
local Actor = {}
Actor.__index = Actor

function Actor:GetHealth()
    return self._health or 100
end

local myActor = setmetatable({}, Actor)
print(myActor:GetHealth())  -- 100
\`\`\``,
        codeExamples: [
          {
            title: "__index como función",
            code: `local stats = {
    fuerza = 25,
    agilidad = 30
}

local mt = {
    __index = function(tabla, key)
        if key == "vida" then
            return 100  -- Valor por defecto
        end
        return nil
    end
}

setmetatable(stats, mt)

print(stats.fuerza)  -- 25 (existe)
print(stats.vida)    -- 100 (por defecto)
print(stats.mana)    -- nil`,
            language: "lua",
            description: "__index como función permite valores dinámicos por defecto.",
          },
          {
            title: "__index como tabla base",
            code: `local PersonajeBase = {
    vidaMaxima = 100,
    manaMaximo = 50,
    
    function(self, cantidad)
        self.vida = math.min(self.vida or 0, self.vidaMaxima)
        print("Curado: " .. cantidad)
    end
}

local guerrero = setmetatable({
    nombre = "Aragorn",
    vida = 80
}, {__index = PersonajeBase})

print(guerrero.vidaMaxima)  -- 100 (heredado)
print(guerrero.nombre)      -- "Aragorn" (propio)`,
            language: "lua",
            description: "Herencia simple usando __index como tabla base.",
          },
        ],
      },
      {
        heading: "__newindex - Validación de Datos",
        content: `**__newindex** se ejecuta cuando intentas asignar un valor a una propiedad que no existe.

**Perfecto para validación:**
\`\`\`lua
local mt = {
    __newindex = function(tabla, key, value)
        -- Validar antes de asignar
        if key == "vida" and value >= 0 then
            rawset(tabla, key, value)
        elseif key == "nombre" and type(value) == "string" then
            rawset(tabla, key, value)
        else
            print("Valor inválido para " .. key)
        end
    end
}

local jugador = setmetatable({}, mt)
jugador.vida = 100     -- ✓ Asigna
jugador.vida = -50     -- ✗ Imprime "Valor inválido"
jugador.nombre = "Link" -- ✓ Asigna
\`\`\`

**⚠️ Importante:** Usa \`rawset\` para asignar el valor real. Si usas \`tabla[key] = value\`, causarás recursión infinita.

**En UE5 - Validar propiedades de actor:**
\`\`\`lua
local Actor = {}
Actor.__index = Actor

Actor.__newindex = function(self, key, value)
    if key == "Health" and value < 0 then
        value = 0  -- Clamp a 0
    end
    rawset(self, key, value)
end
\`\`\``,
        codeExamples: [
          {
            title: "Validador de stats",
            code: `local mt = {
    __newindex = function(tabla, key, value)
        -- Validar rango de stats
        if key == "nivel" then
            if value >= 1 and value <= 100 then
                rawset(tabla, key, value)
            else
                print("Nivel debe estar entre 1 y 100")
            end
        elseif key == "oro" then
            if value >= 0 then
                rawset(tabla, key, value)
            else
                print("El oro no puede ser negativo")
            end
        else
            rawset(tabla, key, value)
        end
    end
}

local jugador = setmetatable({}, mt)
jugador.nivel = 50    -- ✓
jugador.nivel = 150   -- ✗ "Nivel debe estar entre 1 y 100"
jugador.oro = 1000    -- ✓`,
            language: "lua",
            description: "Validación de rango para stats de personaje.",
          },
        ],
      },
      {
        heading: "Otros Metamétodos Útiles",
        content: `Lua tiene **varios metamétodos** para diferentes operaciones:

| Metamétodo | Se ejecuta cuando... | Uso común |
|------------|---------------------|-----------|
| **__index** | Lees propiedad inexistente | Herencia, defaults |
| **__newindex** | Escribes propiedad inexistente | Validación |
| **__call** | Llamas la tabla como función | Funciones factory |
| **__add** | Usas \`+\` con la tabla | Operadores personalizados |
| **__concat** | Usas \`..\` con la tabla | Concatenación |
| **__tostring** | Conviertes a string | Debug, logs |
| **__len** | Usas \`#\` en la tabla | Longitud personalizada |

**Ejemplo __call (tabla como función):**
\`\`\`lua
local Clase = {}

Clase.__call = function(self, nombre)
    return setmetatable({nombre = nombre}, {__index = self})
end

local Personaje = setmetatable(Clase, Clase)
local hero = Personaje("Mario")
\`\`\`

**Ejemplo __tostring:**
\`\`\`lua
local mt = {
    __tostring = function(tabla)
        return tabla.nombre .. " (Nivel " .. tabla.nivel .. ")"
    end
}

local jugador = setmetatable({
    nombre = "Link",
    nivel = 50
}, mt)

print(tostring(jugador))  -- "Link (Nivel 50)"
\`\`\``,
        codeExamples: [
          {
            title: "Clase con __call",
            code: `-- Factory de enemigos
local Enemigo = {}
Enemigo.__index = Enemigo

Enemigo.__call = function(self, tipo, vida)
    local instance = setmetatable({}, Enemigo)
    instance.tipo = tipo
    instance.vida = vida
    return instance
end

function Enemigo:Atacar(objetivo)
    print(self.tipo .. " ataca a " .. objetivo)
end

-- Crear con sintaxis de función
local goblin = Enemigo("Goblin", 50)
goblin:Atacar("Jugador")`,
            language: "lua",
            description: "__call permite crear instancias con sintaxis de función.",
          },
        ],
      },
    ],
    summary: `Metatables definen comportamiento especial para tablas. __index para lectura (herencia/defaults), __newindex para escritura (validación). Usa rawset/rawget para evitar recursión. Esencial para POO y sistemas avanzados en UE5.`,
  },
  examples: [
    {
      title: "Sistema de propiedades observables",
      code: `-- Notifica cuando una propiedad cambia
local Observable = {}

function Observable.new()
    local self = setmetatable({}, {
        __newindex = function(tabla, key, value)
            local old = rawget(tabla, key)
            rawset(tabla, key, value)
            print(key .. " cambió de " .. tostring(old) .. " a " .. tostring(value))
        end
    })
    return self
end

local stats = Observable.new()
stats.vida = 100      -- "vida cambió de nil a 100"
stats.vida = 80       -- "vida cambió de 100 a 80"`,
      language: "lua",
      description: "Metatable para observar cambios en propiedades.",
    },
    {
      title: "Herencia múltiple simulada",
      code: `-- Heredar de múltiples tablas
local function heredarMultiple(...)
    local padres = {...}
    local hijo = {}
    
    setmetatable(hijo, {
        __index = function(self, key)
            for _, padre in ipairs(padres) do
                if padre[key] then
                    return padre[key]
                end
            end
            return nil
        end
    })
    
    return hijo
end

local Guerrero = {atacar = function() print("Ataca") end}
local Mago = {lanzarHechizo = function() print("Lanza hechizo") end}

local Paladín = heredarMultiple(Guerrero, Mago)
Paladín.atacar()         -- "Ataca"
Paladín.lanzarHechizo()  -- "Lanza hechizo"`,
      language: "lua",
      description: "Herencia múltiple buscando en múltiples padres.",
    },
    {
      title: "Vector con operadores personalizados",
      code: `local Vector = {}
Vector.__index = Vector

function Vector.new(x, y)
    return setmetatable({x = x or 0, y = y or 0}, Vector)
end

function Vector.__add(a, b)
    return Vector.new(a.x + b.x, a.y + b.y)
end

function Vector.__tostring(v)
    return "(" .. v.x .. ", " .. v.y .. ")"
end

local v1 = Vector.new(1, 2)
local v2 = Vector.new(3, 4)
local v3 = v1 + v2  -- Usa __add

print(v3)  -- "(4, 6)"`,
      language: "lua",
      description: "Operadores matemáticos personalizados para vectores.",
    },
  ],
  interactive: {
    title: "Crea tu Metatable",
    description: "Implementa __index con valores por defecto",
    starterCode: `-- Crea una metatable que devuelva valores por defecto
local mt = {
    __index = function(tabla, key)
        if key == "vida" then
            return 100
        elseif key == "mana" then
            return 50
        else
            return nil
        end
    end
}

-- Crea un jugador sin definir vida ni mana
local jugador = setmetatable({
    nombre = "TuNombre"
}, mt)

-- Prueba acceder a las propiedades
print("Nombre: " .. jugador.nombre)
print("Vida: " .. jugador.vida)
print("Mana: " .. jugador.mana)`,
    environment: "lua",
    expectedOutput: "Vida: 100",
  },
  miniExercise: {
    id: "mes-02-l02-ej1",
    lessonId: "mes-02-l02",
    title: "Validador de Inventario",
    instructions: `Crea un sistema de inventario que valide items:

1. Crea una metatable con __newindex
2. Solo permite agregar items si son strings no vacíos
3. Si el item es inválido, imprime "Item inválido: \[valor]"
4. Agrega 3 items válidos al inventario
5. Intenta agregar un item inválido (número o string vacío)
6. Imprime el inventario final con table.concat

**Ejemplo de salida:**
\`\`\`
Item agregado: Espada
Item agregado: Escudo
Item agregado: Poción
Item inválido: 123
Inventario: Espada, Escudo, Poción
\`\`\``,
    starterCode: `-- Crea la metatable con validación
local mt = {
    __newindex = function(tabla, key, value)
        -- Validar aquí
    end
}

-- Crea el inventario
local inventario = setmetatable({}, mt)

-- Agrega items


-- Imprime el inventario
print("Inventario: " .. table.concat(inventario, ", "))`,
    solution: `local mt = {
    __newindex = function(tabla, key, value)
        if type(value) == "string" and value ~= "" then
            rawset(tabla, key, value)
            print("Item agregado: " .. value)
        else
            print("Item inválido: " .. tostring(value))
        end
    end
}

local inventario = setmetatable({}, mt)

inventario[1] = "Espada"
inventario[2] = "Escudo"
inventario[3] = "Poción"
inventario[4] = 123  -- Inválido

print("Inventario: " .. table.concat(inventario, ", "))`,
    tests: [
      {
        type: "output_contains",
        expected: "Item agregado: Espada",
        message: "Debe agregar la Espada",
      },
      {
        type: "output_contains",
        expected: "Item inválido",
        message: "Debe rechazar el item inválido",
      },
      {
        type: "output_contains",
        expected: "Inventario:",
        message: "Debe imprimir el inventario final",
      },
      {
        type: "code_contains",
        expected: "rawset",
        message: "Debe usar rawset para asignar valores",
      },
    ],
    hints: [
      "Usa type(value) == 'string' and value ~= '' para validar",
      "rawset(tabla, key, value) asigna el valor real",
      "Imprime mensajes dentro de __newindex",
    ],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: `Metatables permiten comportamiento personalizado: __index para lectura (herencia, defaults), __newindex para validación. Usa rawset/rawget para evitar recursión. Otros metamétodos: __call, __add, __tostring, __len.`,
  resources: [
    {
      title: "Lua Metatables Documentation",
      url: "https://www.lua.org/manual/5.4/manual.html/2.4",
      type: "documentation",
      description: "Documentación oficial de metatables",
    },
    {
      title: "Metatables and Metamethods",
      url: "https://www.lua.org/manual/5.4/manual.html/2.8",
      type: "documentation",
      description: "Guía completa de metamétodos",
    },
    {
      title: "UnLua Metatables in UE5",
      url: "https://github.com/Tencent/UnLua",
      type: "tool",
      description: "Ejemplos de metatables en UnLua",
    },
  ],
  prerequisites: ["mes-02-l01"],
};

export default lesson02;
