/**
 * Lección 2.3: POO en Lua
 */

import { Lesson } from "@/types/lesson";

export const lesson03: Lesson = {
  id: "mes-02-l03",
  moduleId: "mes-02",
  lessonNumber: 3,
  title: "POO en Lua",
  description: "Clases, herencia y polimorfismo implementados con tablas y metatables.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "POO en Lua",
    objectives: [
      "Implementar clases usando tablas y metatables",
      "Crear constructores con new()",
      "Aplicar herencia entre clases",
      "Entender polimorfismo en Lua",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Clases en Lua",
        content: `Lua no tiene clases nativas, pero podemos **simularlas perfectamente** con tablas y metatables.

**Estructura básica de una clase:**
\`\`\`lua
local Personaje = {}
Personaje.__index = Personaje  -- Para herencia de métodos

-- Constructor
function Personaje.new(nombre, vida)
    local self = setmetatable({}, Personaje)
    self.nombre = nombre
    self.vida = vida
    return self
end

-- Método de instancia
function Personaje:atacar(objetivo)
    print(self.nombre .. " ataca a " .. objetivo)
end

-- Uso
local hero = Personaje.new("Mario", 100)
hero:atacar("Goomba")
\`\`\`

**Puntos clave:**
1. \`Personaje.__index = Personaje\` - Permite que las instancias accedan a métodos
2. \`setmetatable({}, Personaje)\` - La instancia hereda de la clase
3. \`function Clase:metodo()\` - El \`:\` pasa \`self\` automáticamente
4. \`function Clase.new()\` - Constructor que crea y retorna la instancia`,
        codeExamples: [
          {
            title: "Clase completa",
            code: `local Enemigo = {}
Enemigo.__index = Enemigo

function Enemigo.new(tipo, vida, daño)
    local self = setmetatable({}, Enemigo)
    self.tipo = tipo
    self.vida = vida
    self.daño = daño
    return self
end

function Enemigo:atacar(objetivo)
    print(self.tipo .. " ataca a " .. objetivo .. " con " .. self.daño .. " de daño")
end

function Enemigo:recibirDaño(cantidad)
    self.vida = self.vida - cantidad
    print(self.tipo .. " tiene " .. self.vida .. " HP")
end

-- Crear enemigos
local goblin = Enemigo.new("Goblin", 50, 15)
local ogro = Enemigo.new("Ogro", 100, 30)

goblin:atacar("Jugador")
ogro:recibirDaño(25)`,
            language: "lua",
            description: "Clase Enemigo con constructor y métodos.",
          },
        ],
      },
      {
        heading: "Herencia",
        content: `La **herencia** en Lua se logra anidando metatables.

**Herencia simple:**
\`\`\`lua
-- Clase base
local Personaje = {}
Personaje.__index = Personaje

function Personaje.new(nombre)
    local self = setmetatable({}, Personaje)
    self.nombre = nombre
    self.vida = 100
    return self
end

-- Clase derivada
local Guerrero = setmetatable({}, Personaje)
Guerrero.__index = Guerrero

function Guerrero.new(nombre, arma)
    local self = Personaje.new(nombre)  -- Llama al constructor base
    setmetatable(self, Guerrero)
    self.arma = arma
    self.furia = 0
    return self
end

function Guerrero:atacarFuria()
    self.furia = self.furia + 10
    print(self.nombre .. " ataca con " .. self.arma .. " (Furia: " .. self.furia .. ")")
end

-- Uso
local kratos = Guerrero.new("Kratos", "Hacha Leviatán")
kratos:atacarFuria()  -- Método exclusivo de Guerrero
print(kratos.vida)     -- 100 (heredado de Personaje)
\`\`\`

**Cómo funciona:**
1. \`setmetatable({}, Personaje)\` en la clase derivada
2. Llamar al constructor base desde el constructor derivado
3. Los métodos no encontrados en Guerrero se buscan en Personaje`,
        codeExamples: [
          {
            title: "Jerarquía de clases",
            code: `-- Clase base
local Vehiculo = {}
Vehiculo.__index = Vehiculo

function Vehiculo.new(marca, velocidad)
    local self = setmetatable({}, Vehiculo)
    self.marca = marca
    self.velocidad = velocidad
    return self
end

function Vehiculo:acelerar()
    print(self.marca .. " acelera a " .. self.velocidad .. " km/h")
end

-- Clase derivada
local Coche = setmetatable({}, Vehiculo)
Coche.__index = Coche

function Coche.new(marca, velocidad, puertas)
    local self = Vehiculo.new(marca, velocidad)
    setmetatable(self, Coche)
    self.puertas = puertas
    return self
end

function Coche:abrirPuertas()
    print("Abriendo " .. self.puertas .. " puertas")
end

-- Usar
local miCoche = Coche.new("Toyota", 180, 4)
miCoche:acelerar()       -- Heredado
miCoche:abrirPuertas()   -- Propio`,
            language: "lua",
            description: "Herencia de Vehiculo a Coche con métodos propios y heredados.",
          },
        ],
      },
      {
        heading: "Polimorfismo",
        content: `El **polimorfismo** permite que diferentes clases respondan al mismo método de forma distinta.

**En Lua es natural:**
\`\`\`lua
local Enemigo = {}
Enemigo.__index = Enemigo

function Enemigo:atacar()
    print("Enemigo ataca genéricamente")
end

-- Sobrescribir método
local Jefe = setmetatable({}, Enemigo)
Jefe.__index = Jefe

function Jefe:atacar()
    print("¡JEFE USA ATAQUE ESPECIAL!")
end

-- Ambos responden al mismo método
local enemigo = Enemigo.new()
local jefe = Jefe.new()

enemigo:atacar()  -- "Enemigo ataca genéricamente"
jefe:atacar()     -- "¡JEFE USA ATAQUE ESPECIAL!"
\`\`\`

**Polimorfismo con tabla de objetos:**
\`\`\`lua
local enemigos = {
    Enemigo.new(),
    Jefe.new(),
    Enemigo.new()
}

for _, e in ipairs(enemigos) do
    e:atacar()  -- Cada uno usa su versión
end
\`\`\``,
        codeExamples: [
          {
            title: "Polimorfismo en acción",
            code: `local Personaje = {}
Personaje.__index = Personaje

function Personaje:hablar()
    print("...")
end

local NPC = setmetatable({}, Personaje)
NPC.__index = NPC

function NPC:hablar()
    print("¡Saludos, viajero!")
end

local Mercader = setmetatable({}, NPC)
Mercader.__index = Mercader

function Mercader:hablar()
    print("¡Tengo los mejores objetos!")
end

-- Todos responden a hablar()
local personajes = {
    Personaje.new(),
    NPC.new(),
    Mercader.new()
}

for _, p in ipairs(personajes) do
    p:hablar()
end`,
            language: "lua",
            description: "Diferentes clases, mismo método, comportamiento distinto.",
          },
        ],
      },
      {
        heading: "Métodos Estáticos",
        content: `Los **métodos estáticos** pertenecen a la clase, no a las instancias.

**Implementación:**
\`\`\`lua
local Matematicas = {}

-- Método estático (no usa self)
function Matematicas.sumar(a, b)
    return a + b
end

function Matematicas.pi()
    return 3.1416
end

-- Uso (sin crear instancia)
print(Matematicas.sumar(5, 3))  -- 8
print(Matematicas.pi())          -- 3.1416
\`\`\`

**En clases con instancias:**
\`\`\`lua
local Personaje = {}
Personaje.__index = Personaje
Personaje.contador = 0  -- Variable estática

function Personaje.new(nombre)
    local self = setmetatable({}, Personaje)
    Personaje.contador = Personaje.contador + 1
    self.nombre = nombre
    self.id = Personaje.contador
    return self
end

function Personaje:obtenerContador()
    return Personaje.contador
end

local p1 = Personaje.new("Mario")
local p2 = Personaje.new("Luigi")

print(p1.id)              -- 1
print(p2.id)              -- 2
print(p1:obtenerContador()) -- 2
\`\`\``,
        codeExamples: [
          {
            title: "Factory con método estático",
            code: `local Enemigo = {}
Enemigo.__index = Enemigo
Enemigo.lista = {}  -- Estática

function Enemigo.new(tipo)
    local self = setmetatable({}, Enemigo)
    self.tipo = tipo
    table.insert(Enemigo.lista, self)
    return self
end

-- Método estático para obtener todos
function Enemigo.obtenerTodos()
    return Enemigo.lista
end

-- Crear enemigos
Enemigo.new("Goblin")
Enemigo.new("Ogro")
Enemigo.new("Troll")

-- Usar método estático
local todos = Enemigo.obtenerTodos()
print("Total enemigos: " .. #todos)`,
            language: "lua",
            description: "Método estático para acceder a lista compartida.",
          },
        ],
      },
    ],
    summary: `POO en Lua usa tablas + metatables. Clase con __index = ella misma, constructor new() que crea instancia con setmetatable. Herencia anidando metatables. Polimorfismo natural sobrescribiendo métodos.`,
  },
  examples: [
    {
      title: "Sistema de clases completo",
      code: `local Actor = {}
Actor.__index = Actor

function Actor.new(x, y)
    local self = setmetatable({}, Actor)
    self.x = x or 0
    self.y = y or 0
    self.activo = true
    return self
end

function Actor:mover(dx, dy)
    self.x = self.x + dx
    self.y = self.y + dy
end

function Actor:destruir()
    self.activo = false
    print("Actor destruido en (" .. self.x .. ", " .. self.y .. ")")
end

-- Herencia
local Jugador = setmetatable({}, Actor)
Jugador.__index = Jugador

function Jugador.new(nombre)
    local self = Actor.new(0, 0)
    setmetatable(self, Jugador)
    self.nombre = nombre
    self.vida = 100
    return self
end

function Jugador:curar(cantidad)
    self.vida = math.min(self.vida + cantidad, 100)
    print(self.nombre .. " curado a " .. self.vida .. " HP")
end

-- Usar
local link = Jugador.new("Link")
link:mover(10, 5)
link:curar(25)
link:destruir()`,
      language: "lua",
      description: "Sistema completo con clase base Actor y derivada Jugador.",
    },
    {
      title: "Herencia múltiple con mixins",
      code: `-- Mixin para volar
local Volador = {}
function Volador:volar()
    print(self.nombre .. " está volando")
end

-- Mixin para nadar
local Nadador = {}
function Nadador:nadar()
    print(self.nombre .. " está nadando")
end

-- Clase que usa ambos
local Dragon = {}
Dragon.__index = Dragon

-- Copiar métodos de mixins
for k, v in pairs(Volador) do Dragon[k] = v end
for k, v in pairs(Nadador) do Dragon[k] = v end

function Dragon.new(nombre)
    local self = setmetatable({}, Dragon)
    self.nombre = nombre
    return self
end

local smaug = Dragon.new("Smaug")
smaug:volar()   -- Del mixin Volador
smaug:nadar()   -- Del mixin Nadador`,
      language: "lua",
      description: "Mixins para simular herencia múltiple.",
    },
    {
      title: "Singleton en Lua",
      code: `local Config = {}
Config.__index = Config
local instance = nil

function Config.getInstance()
    if not instance then
        instance = setmetatable({}, Config)
        instance.valores = {}
        print("Config creada")
    end
    return instance
end

function Config:set(key, value)
    self.valores[key] = value
end

function Config:get(key)
    return self.valores[key]
end

-- Solo hay UNA instancia
local c1 = Config.getInstance()
local c2 = Config.getInstance()

c1:set("volumen", 80)
print(c2:get("volumen"))  -- 80 (misma instancia)`,
      language: "lua",
      description: "Patrón Singleton garantiza una sola instancia.",
    },
  ],
  interactive: {
    title: "Crea tu Clase",
    description: "Implementa una clase Personaje con constructor y método",
    starterCode: `-- Crea la clase Personaje
local Personaje = {}
Personaje.__index = Personaje

-- Constructor
function Personaje.new(nombre, nivel)
    local self = setmetatable({}, Personaje)
    self.nombre = nombre
    self.nivel = nivel
    self.vida = 100
    return self
end

-- Método para subir nivel
function Personaje:subirNivel()
    self.nivel = self.nivel + 1
    print(self.nombre .. " subió al nivel " .. self.nivel)
end

-- Crea un personaje y pruébalo
local hero = Personaje.new("Mario", 1)
print(hero.nombre .. " - Nivel " .. hero.nivel)
hero:subirNivel()`,
    environment: "lua",
    expectedOutput: "Mario",
  },
  miniExercise: {
    id: "mes-02-l03-ej1",
    lessonId: "mes-02-l03",
    title: "Sistema de Clases RPG",
    instructions: `Crea un sistema de clases para un RPG:

1. Crea clase base \`Personaje\` con:
   - nombre, vida, nivel en constructor
   - método \`atacar()\` que imprima "\[Nombre] ataca"

2. Crea clase \`Mago\` que herede de Personaje:
   - Agrega propiedad \`mana\` en constructor
   - Sobrescribe \`atacar()\` para usar "lanza hechizo"

3. Crea clase \`Guerrero\` que herede de Personaje:
   - Agrega propiedad \`furia\` en constructor
   - Sobrescribe \`atacar()\` para usar "golpea con espada"

4. Crea un mago y un guerrero, hazlos atacar`,
    starterCode: `-- Clase base
local Personaje = {}
Personaje.__index = Personaje

function Personaje.new(nombre, vida, nivel)
    local self = setmetatable({}, Personaje)
    self.nombre = nombre
    self.vida = vida
    self.nivel = nivel
    return self
end

function Personaje:atacar()
    -- Implementar
end

-- Clase Mago


-- Clase Guerrero


-- Crear y probar
local gandalf = Mago.new("Gandalf", 80, 50, 200)
local aragorn = Guerrero.new("Aragorn", 120, 45, 75)

gandalf:atacar()
aragorn:atacar()`,
    solution: `local Personaje = {}
Personaje.__index = Personaje

function Personaje.new(nombre, vida, nivel)
    local self = setmetatable({}, Personaje)
    self.nombre = nombre
    self.vida = vida
    self.nivel = nivel
    return self
end

function Personaje:atacar()
    print(self.nombre .. " ataca")
end

local Mago = setmetatable({}, Personaje)
Mago.__index = Mago

function Mago.new(nombre, vida, nivel, mana)
    local self = Personaje.new(nombre, vida, nivel)
    setmetatable(self, Mago)
    self.mana = mana
    return self
end

function Mago:atacar()
    print(self.nombre .. " lanza hechizo")
end

local Guerrero = setmetatable({}, Personaje)
Guerrero.__index = Guerrero

function Guerrero.new(nombre, vida, nivel, furia)
    local self = Personaje.new(nombre, vida, nivel)
    setmetatable(self, Guerrero)
    self.furia = furia
    return self
end

function Guerrero:atacar()
    print(self.nombre .. " golpea con espada")
end

local gandalf = Mago.new("Gandalf", 80, 50, 200)
local aragorn = Guerrero.new("Aragorn", 120, 45, 75)

gandalf:atacar()
aragorn:atacar()`,
    tests: [
      {
        type: "output_contains",
        expected: "lanza hechizo",
        message: "El mago debe lanzar hechizo",
      },
      {
        type: "output_contains",
        expected: "golpea con espada",
        message: "El guerrero debe golpear con espada",
      },
      {
        type: "code_contains",
        expected: "setmetatable({}, Mago)",
        message: "Mago debe usar setmetatable",
      },
      {
        type: "code_contains",
        expected: "Personaje.new",
        message: "Debe llamar al constructor base",
      },
    ],
    hints: [
      "Usa setmetatable({}, Clase) para la clase derivada",
      "Llama a Personaje.new() desde el constructor derivado",
      "Sobrescribe atacar() en cada clase",
    ],
    xpReward: 60,
    difficulty: "advanced",
  },
  summary: `POO en Lua: clase con __index = ella misma, constructor new() retorna setmetatable({}, Clase). Herencia: setmetatable(ClaseDerivada, ClaseBase). Polimorfismo: sobrescribir métodos. Métodos estáticos sin self.`,
  resources: [
    {
      title: "Object-Oriented Programming in Lua",
      url: "https://www.lua.org/pil/16.html",
      type: "article",
      description: "Capítulo 16 de Programming in Lua sobre POO",
    },
    {
      title: "Lua Classes Tutorial",
      url: "https://lua-users.org/wiki/ClassesTutorial",
      type: "article",
      description: "Tutorial de clases en Lua",
    },
    {
      title: "UnLua Examples",
      url: "https://github.com/Tencent/UnLua/tree/master/Docs",
      type: "tool",
      description: "Ejemplos de POO en UnLua para UE5",
    },
  ],
  prerequisites: ["mes-02-l02"],
};

export default lesson03;
