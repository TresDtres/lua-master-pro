/**
 * Generador de Lecciones - Módulos 2-12
 * Este archivo genera el esqueleto de lecciones para cada módulo
 * 
 * USO: Ejecutar este script genera los archivos base
 */

import { Lesson, LessonSummary } from "@/types/lesson";

// ============================================
// MÓDULO 2: POO + UE5 (6 lecciones)
// ============================================

const module02Lessons: Lesson[] = [
  // Lección 2.1 - Ya creada
  // Lección 2.2: Metatables
  {
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
        "Comprender qué son las metatables",
        "Usar __index para acceso personalizado",
        "Implementar __newindex para validación",
        "Aplicar metamétodos en sistemas UE5",
      ],
      estimatedTime: 35,
      sections: [
        {
          heading: "¿Qué son Metatables?",
          content: `Las **metatable** son tablas que definen comportamiento especial para otras tablas.

**Configurar metatable:**
\`\`\`lua
local mt = {}
local tabla = {}
setmetatable(tabla, mt)
\`\`\`

**Usos en UE5:**
- Acceder a propiedades de actores
- Validar datos antes de asignar
- Implementar sistemas de eventos`,
        },
      ],
      summary: `Metatables permiten comportamiento personalizado en tablas. __index para lectura, __newindex para escritura. Esencial para sistemas avanzados en UE5.`,
    },
    examples: [],
    interactive: {
      title: "Metatable Básica",
      description: "Implementa __index",
      starterCode: `local mt = {
    __index = function(tabla, key)
        return "Propiedad " .. key .. " no existe"
    end
}

local jugador = {nombre = "Mario"}
setmetatable(jugador, mt)

print(jugador.nombre)
print(jugador.vida)`,
      environment: "lua",
      expectedOutput: "Mario",
    },
    miniExercise: {
      id: "mes-02-l02-ej1",
      lessonId: "mes-02-l02",
      title: "Validador con Metatable",
      instructions: "Crea una metatable que valide vida > 0",
      starterCode: `local mt = {
    __newindex = function(tabla, key, value)
        -- Validar aquí
    end
}

local jugador = {}
setmetatable(jugador, mt)

jugador.vida = 100
print("Vida: " .. jugador.vida)`,
      solution: `local mt = {
    __newindex = function(tabla, key, value)
        if key == "vida" and value > 0 then
            rawset(tabla, key, value)
        end
    end
}
local jugador = {}
setmetatable(jugador, mt)
jugador.vida = 100
print("Vida: " .. jugador.vida)`,
      tests: [{ type: "output_contains", expected: "Vida: 100", message: "Debe mostrar vida 100" }],
      hints: ["Usa rawset para asignar"],
      xpReward: 50,
      difficulty: "advanced",
    },
    summary: "Metatables con __newindex para validación",
    resources: [],
    prerequisites: ["mes-02-l01"],
  },
  // Lección 2.3: POO en Lua
  {
    id: "mes-02-l03",
    moduleId: "mes-02",
    lessonNumber: 3,
    title: "POO en Lua",
    description: "Clases, herencia y polimorfismo implementados con tablas.",
    estimatedTime: 35,
    difficulty: "advanced",
    theory: {
      title: "POO en Lua",
      objectives: ["Implementar clases con tablas", "Usar herencia", "Aplicar polimorfismo"],
      estimatedTime: 35,
      sections: [{ heading: "Clases en Lua", content: `Lua no tiene clases nativas, pero podemos simularlas con tablas y metatables.` }],
      summary: `POO en Lua usa tablas como clases, metatables para herencia.`,
    },
    examples: [],
    interactive: {
      title: "Clase Básica",
      description: "Crea una clase Personaje",
      starterCode: `local Personaje = {}
Personaje.__index = Personaje

function Personaje.new(nombre, vida)
    local self = setmetatable({}, Personaje)
    self.nombre = nombre
    self.vida = vida
    return self
end

local hero = Personaje.new("Link", 100)
print(hero.nombre)`,
      environment: "lua",
      expectedOutput: "Link",
    },
    miniExercise: {
      id: "mes-02-l03-ej1",
      lessonId: "mes-02-l03",
      title: "Clase con Método",
      instructions: "Agrega método atacar() a la clase",
      starterCode: `local Personaje = {}
Personaje.__index = Personaje

function Personaje.new(nombre, daño)
    local self = setmetatable({}, Personaje)
    self.nombre = nombre
    self.daño = daño
    return self
end

function Personaje:atacar(objetivo)
    -- Implementar aquí
end

local guerrero = Personaje.new("Mario", 25)
guerrero:atacar("Goomba")`,
      solution: `function Personaje:atacar(objetivo)
    print(self.nombre .. " ataca a " .. objetivo .. " con " .. self.daño .. " de daño")
end`,
      tests: [{ type: "output_contains", expected: "ataca", message: "Debe mostrar ataque" }],
      hints: ["Usa self.nombre y self.daño"],
      xpReward: 50,
      difficulty: "advanced",
    },
    summary: "Clases con metatables y métodos usando : para self implícito",
    resources: [],
    prerequisites: ["mes-02-l02"],
  },
  // Lección 2.4: UnLua Setup
  {
    id: "mes-02-l04",
    moduleId: "mes-02",
    lessonNumber: 4,
    title: "UnLua Setup",
    description: "Instalación, configuración y tu primer script en UE5.",
    estimatedTime: 25,
    difficulty: "beginner",
    theory: {
      title: "UnLua Setup",
      objectives: ["Instalar UnLua", "Configurar proyecto", "Crear primer script"],
      estimatedTime: 25,
      sections: [{ heading: "Instalación de UnLua", content: `UnLua es el binding de Lua para Unreal Engine 5.` }],
      summary: `UnLua permite scripting en Lua para UE5.`,
    },
    examples: [],
    interactive: {
      title: "Hello UE5",
      description: "Primer script UnLua",
      starterCode: `-- Simulación de script UnLua
local UE = UE or {}

function UE.BeginPlay()
    print("¡Script UnLua iniciado!")
end

UE.BeginPlay()`,
      environment: "lua",
      expectedOutput: "iniciado",
    },
    miniExercise: {
      id: "mes-02-l04-ej1",
      lessonId: "mes-02-l04",
      title: "Configurar UnLua",
      instructions: "Escribe los pasos de instalación",
      starterCode: `-- Pasos:
-- 1. Clonar repositorio de UnLua
-- 2. Copiar a Plugins/
-- 3. Habilitar en .uproject
-- 4. Reiniciar editor

print("UnLua instalado correctamente")`,
      solution: `print("UnLua instalado correctamente")`,
      tests: [{ type: "output_contains", expected: "instalado", message: "Debe confirmar instalación" }],
      hints: ["Solo imprime el mensaje"],
      xpReward: 30,
      difficulty: "beginner",
    },
    summary: "Instalar UnLua: clonar, copiar a Plugins/, habilitar, reiniciar",
    resources: [],
    prerequisites: ["mes-02-l03"],
  },
  // Lección 2.5: Ciclo de Vida
  {
    id: "mes-02-l05",
    moduleId: "mes-02",
    lessonNumber: 5,
    title: "Ciclo de Vida",
    description: "BeginPlay, Tick, EndPlay y eventos en UnLua.",
    estimatedTime: 30,
    difficulty: "intermediate",
    theory: {
      title: "Ciclo de Vida",
      objectives: ["Entender BeginPlay", "Usar Tick", "Manejar EndPlay"],
      estimatedTime: 30,
      sections: [{ heading: "Eventos del Ciclo", content: `BeginPlay: al iniciar, Tick: cada frame, EndPlay: al destruir.` }],
      summary: `BeginPlay inicia, Tick actualiza, EndPlay limpia.`,
    },
    examples: [],
    interactive: {
      title: "Ciclo Básico",
      description: "Simula ciclo de vida",
      starterCode: `local Actor = {}

function Actor:BeginPlay()
    print("Actor creado")
end

function Actor:Tick(deltaTime)
    -- Se llama cada frame
end

function Actor:EndPlay()
    print("Actor destruido")
end

Actor:BeginPlay()`,
      environment: "lua",
      expectedOutput: "creado",
    },
    miniExercise: {
      id: "mes-02-l05-ej1",
      lessonId: "mes-02-l05",
      title: "Tick con Timer",
      instructions: "Imprime cada segundo simulado",
      starterCode: `local tiempo = 0

function Tick(deltaTime)
    tiempo = tiempo + deltaTime
    if tiempo >= 1 then
        print("1 segundo transcurrido")
        tiempo = 0
    end
end

Tick(0.5)
Tick(0.6)`,
      solution: `local tiempo = 0
function Tick(deltaTime)
    tiempo = tiempo + deltaTime
    if tiempo >= 1 then
        print("1 segundo transcurrido")
        tiempo = 0
    end
end
Tick(0.5)
Tick(0.6)`,
      tests: [{ type: "output_contains", expected: "segundo", message: "Debe imprimir mensaje" }],
      hints: ["Acumula deltaTime"],
      xpReward: 40,
      difficulty: "intermediate",
    },
    summary: "BeginPlay al crear, Tick cada frame con deltaTime, EndPlay al destruir",
    resources: [],
    prerequisites: ["mes-02-l04"],
  },
  // Lección 2.6: Interacción UE5
  {
    id: "mes-02-l06",
    moduleId: "mes-02",
    lessonNumber: 6,
    title: "Interacción UE5",
    description: "Mover actores, cambiar materiales y manipular componentes.",
    estimatedTime: 35,
    difficulty: "intermediate",
    theory: {
      title: "Interacción UE5",
      objectives: ["Mover actores", "Cambiar materiales", "Acceder componentes"],
      estimatedTime: 35,
      sections: [{ heading: "Manipular Actores", content: `Usa SetActorLocation, AddActorWorldOffset, etc.` }],
      summary: `Mueve actores con SetActorLocation, cambia materiales con SetMaterial.`,
    },
    examples: [],
    interactive: {
      title: "Mover Actor",
      description: "Simula movimiento",
      starterCode: `local Actor = {
    location = {X=0, Y=0, Z=0}
}

function Actor:SetLocation(loc)
    self.location = loc
    print("Nueva posición: " .. loc.X .. ", " .. loc.Y .. ", " .. loc.Z)
end

Actor:SetLocation({X=100, Y=50, Z=0})`,
      environment: "lua",
      expectedOutput: "posición",
    },
    miniExercise: {
      id: "mes-02-l06-ej1",
      lessonId: "mes-02-l06",
      title: "Cambiar Material",
      instructions: "Crea función para cambiar material",
      starterCode: `local Mesh = {}

function Mesh:SetMaterial(index, material)
    print("Material " .. index .. " cambiado a " .. material)
end

Mesh:SetMaterial(0, "M_Brick")`,
      solution: `local Mesh = {}
function Mesh:SetMaterial(index, material)
    print("Material " .. index .. " cambiado a " .. material)
end
Mesh:SetMaterial(0, "M_Brick")`,
      tests: [{ type: "output_contains", expected: "Material", message: "Debe mostrar cambio" }],
      hints: ["Imprime el mensaje"],
      xpReward: 40,
      difficulty: "intermediate",
    },
    summary: "SetActorLocation para mover, SetMaterial para cambiar apariencia",
    resources: [],
    prerequisites: ["mes-02-l05"],
  },
];

export default module02Lessons;
