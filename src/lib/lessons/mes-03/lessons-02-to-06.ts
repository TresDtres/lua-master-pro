/**
 * Módulo 3: Blueprints ↔ Lua - Lecciones 2-6
 * Este archivo contiene los esqueletos completos de las lecciones restantes
 */

import { Lesson } from "@/types/lesson";

// ============================================
// LECCIÓN 3.2: Input System
// ============================================

export const lesson02: Lesson = {
  id: "mes-03-l02",
  moduleId: "mes-03",
  lessonNumber: 2,
  title: "Input System",
  description: "Enhanced Input, bindings y mapeo de controles en UnLua.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Input System",
    objectives: [
      "Configurar Enhanced Input en UnLua",
      "Crear bindings de teclado/ratón/mando",
      "Manejar eventos de input en Lua",
      "Implementar input contextual",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Enhanced Input en UE5",
        content: `El **Enhanced Input System** de UE5 permite mapeo flexible de controles.

**Componentes:**
- **Input Actions** - Acciones abstractas (Jump, Attack, Move)
- **Input Mapping Context** - Mapeo tecla → acción
- **Input Component** - Recibe los inputs

**En UnLua:**
\`\`\`lua
function MiPersonaje:BeginPlay()
    -- Obtener input component
    self.inputComponent = self:GetInputComponent()
    
    -- Bind actions
    self.inputComponent:BindAction("Jump", IE_Pressed, self, self.OnJump)
    self.inputComponent:BindAction("Attack", IE_Pressed, self, self.OnAttack)
    
    -- Bind axes
    self.inputComponent:BindAxis("MoveForward", self, self.MoveForward)
end

function MiPersonaje:OnJump()
    print("Saltando!")
    self:LaunchCharacter(FVector(0, 0, 500))
end

function MiPersonaje:OnAttack()
    print("Atacando!")
end

function MiPersonaje:MoveForward(value)
    print("Moviendo: " .. value)
end
\`\`\``,
      },
    ],
    summary: `Enhanced Input usa Actions y Mapping Contexts. BindAction para eventos discretos, BindAxis para valores continuos. IE_Pressed/IE_Released para estado de botones.`,
  },
  examples: [],
  interactive: {
    title: "Simula Input Binding",
    description: "Crea un sistema simple de bindings",
    starterCode: `local InputSystem = {}

function InputSystem:BindAction(name, callback)
    self[name] = callback
end

function InputSystem:TriggerAction(name)
    if self[name] then
        self[name]()
    end
end

local player = {}
player.input = InputSystem

player.input:BindAction("Jump", function()
    print("¡Saltando!")
end)

player.input:BindAction("Attack", function()
    print("¡Atacando!")
end)

-- Simular input
player.input:TriggerAction("Jump")
player.input:TriggerAction("Attack")`,
    environment: "lua",
    expectedOutput: "¡Saltando!",
  },
  miniExercise: {
    id: "mes-03-l02-ej1",
    lessonId: "mes-03-l02",
    title: "Sistema de Movement Input",
    instructions: `Crea un sistema de input para movimiento:

1. Crea tabla \`InputComponent\` con funciones bind
2. Bind "MoveForward" y "MoveRight" como ejes
3. Implementa funciones que impriman la dirección
4. Simula input con valores entre -1 y 1

**Salida esperada:**
\`\`\`
Moviendo adelante: 1.0
Moviendo derecha: 0.5
\`\`\``,
    starterCode: `local InputComponent = {}

function InputComponent:BindAxis(name, callback)
    -- Implementar
end

function InputComponent:TriggerAxis(name, value)
    -- Implementar
end

-- Bindings
InputComponent:BindAxis("MoveForward", function(value)
    print("Moviendo adelante: " .. value)
end)

-- Trigger
InputComponent:TriggerAxis("MoveForward", 1.0)`,
    solution: `local InputComponent = {}

function InputComponent:BindAxis(name, callback)
    self[name] = callback
end

function InputComponent:TriggerAxis(name, value)
    if self[name] then
        self[name](value)
    end
end

InputComponent:BindAxis("MoveForward", function(value)
    print("Moviendo adelante: " .. value)
end)

InputComponent:BindAxis("MoveRight", function(value)
    print("Moviendo derecha: " .. value)
end)

InputComponent:TriggerAxis("MoveForward", 1.0)
InputComponent:TriggerAxis("MoveRight", 0.5)`,
    tests: [
      { type: "output_contains", expected: "Moviendo adelante: 1.0", message: "Debe mover adelante" },
      { type: "output_contains", expected: "Moviendo derecha: 0.5", message: "Debe mover derecha" },
    ],
    hints: ["Guarda el callback en self[name]", "Llama al callback con el value"],
    xpReward: 40,
    difficulty: "intermediate",
  },
  summary: "Enhanced Input: Actions para eventos, Axis para movimiento continuo. BindAction/BindAxis en BeginPlay. IE_Pressed/IE_Released para estado.",
  resources: [
    { title: "Enhanced Input Documentation", url: "https://docs.unrealengine.com/5.0/en-US/enhanced-input-in-unreal-engine/", type: "documentation" },
  ],
  prerequisites: ["mes-03-l01"],
};

// ============================================
// LECCIÓN 3.3: Delegates
// ============================================

export const lesson03: Lesson = {
  id: "mes-03-l03",
  moduleId: "mes-03",
  lessonNumber: 3,
  title: "Delegates",
  description: "Events, dispatchers y comunicación asíncrona.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Delegates",
    objectives: [
      "Entender el sistema de delegates de UE5",
      "Suscribirse a eventos en Lua",
      "Crear y broadcastear delegates personalizados",
      "Manejar eventos dinámicos",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Delegates en UE5",
        content: `Los **delegates** son sistemas de eventos para comunicación asíncrona.

**Tipos de delegates:**
- **Singlecast** - Un solo listener
- **Multicast** - Múltiples listeners
- **Dynamic** - Se pueden modificar en runtime

**En UnLua:**
\`\`\`lua
function MiActor:BeginPlay()
    -- Suscribirse a evento de BP
    self.OnDamageReceived:Add(self, self.OnTakeDamage)
    
    -- Suscribirse a evento de game mode
    GameMode.OnGameStarted:Add(self, self.OnGameStart)
end

function MiActor:OnTakeDamage(damage)
    print("Daño recibido: " .. damage)
    self.vida = self.vida - damage
    
    if self.vida <= 0 then
        self:Die()
    end
end

function MiActor:OnGameStart()
    print("¡Juego iniciado!")
end

-- Crear delegate personalizado
self.MyEvent = UE.MulticastDelegate()
self.MyEvent:Add(self, self.OnMyEvent)

-- Broadcast
self.MyEvent:Broadcast()
\`\`\``,
      },
    ],
    summary: `Delegates permiten comunicación asíncrona. Add/Remove para suscribirse. Broadcast para notificar a todos. Singlecast un listener, Multicast múltiples.`,
  },
  examples: [],
  interactive: {
    title: "Simula Delegate System",
    description: "Crea un sistema simple de eventos",
    starterCode: `local Delegate = {}
Delegate.__index = Delegate

function Delegate.new()
    local self = setmetatable({}, Delegate)
    self.listeners = {}
    return self
end

function Delegate:Add(listener)
    table.insert(self.listeners, listener)
end

function Delegate:Broadcast(...)
    for _, listener in ipairs(self.listeners) do
        listener(...)
    end
end

-- Crear evento
local OnPlayerJump = Delegate.new()

-- Suscribirse
OnPlayerJump:Add(function()
    print("¡Jugador saltó!")
end)

OnPlayerJump:Add(function()
    print("Reproducir sonido de salto")
end)

-- Broadcast
OnPlayerJump:Broadcast()`,
    environment: "lua",
    expectedOutput: "¡Jugador saltó!",
  },
  miniExercise: {
    id: "mes-03-l03-ej1",
    lessonId: "mes-03-l03",
    title: "Sistema de Logros con Delegates",
    instructions: `Crea un sistema de logros que notifique eventos:

1. Crea delegate \`OnAchievementUnlocked\`
2. Suscríbete con 2 funciones:
   - Una que imprima "Logro desbloqueado: \[nombre]"
   - Otra que imprima "Guardando progreso..."
3. Broadcast cuando se desbloquee un logro

**Salida esperada:**
\`\`\`
Logro desbloqueado: Primeros Pasos
Guardando progreso...
\`\`\``,
    starterCode: `local Delegate = {}
Delegate.__index = Delegate

function Delegate.new()
    local self = setmetatable({}, Delegate)
    self.listeners = {}
    return self
end

-- Crear evento


-- Suscribirse


-- Trigger
OnAchievementUnlocked:Broadcast("Primeros Pasos")`,
    solution: `local Delegate = {}
Delegate.__index = Delegate

function Delegate.new()
    local self = setmetatable({}, Delegate)
    self.listeners = {}
    return self
end

function Delegate:Add(listener)
    table.insert(self.listeners, listener)
end

function Delegate:Broadcast(...)
    for _, listener in ipairs(self.listeners) do
        listener(...)
    end
end

local OnAchievementUnlocked = Delegate.new()

OnAchievementUnlocked:Add(function(name)
    print("Logro desbloqueado: " .. name)
end)

OnAchievementUnlocked:Add(function(name)
    print("Guardando progreso...")
end)

OnAchievementUnlocked:Broadcast("Primeros Pasos")`,
    tests: [
      { type: "output_contains", expected: "Logro desbloqueado: Primeros Pasos", message: "Debe mostrar logro" },
      { type: "output_contains", expected: "Guardando progreso...", message: "Debe guardar" },
    ],
    hints: ["Crea el delegate con Delegate.new()", "Suscríbete con Add()", "Broadcast pasa el nombre"],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: "Delegates para eventos asíncronos. Add/Remove para suscribirse, Broadcast para notificar. Multicast para múltiples listeners.",
  resources: [],
  prerequisites: ["mes-03-l02"],
};

// ============================================
// LECCIÓN 3.4: Comunicación Bidireccional
// ============================================

export const lesson04: Lesson = {
  id: "mes-03-l04",
  moduleId: "mes-03",
  lessonNumber: 4,
  title: "Comunicación Bidireccional",
  description: "Llamar funciones de BP desde Lua y de Lua desde BP.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Comunicación Bidireccional",
    objectives: [
      "Dominar el flujo BP → Lua → BP",
      "Pasar datos complejos entre sistemas",
      "Implementar callbacks asíncronos",
      "Manejar errores en la comunicación",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Flujo Bidireccional",
        content: `La **comunicación bidireccional** permite que BP y Lua se llamen mutuamente.

**Ejemplo completo:**
\`\`\`lua
-- Script Lua
local CombatSystem = {}

-- BP llama esta función
function CombatSystem:ReceiveDamage(amount)
    self.vida = self.vida - amount
    
    -- Llamar función de BP para efectos
    self:PlayHitEffect()
    self:PlayHitSound()
    
    -- Retornar valor a BP
    return self.vida > 0
end

-- Función que llama a BP
function CombatSystem:PlayHitEffect()
    -- BP debe tener esta función exportada
    self:SpawnParticleAtLocation(self.hitEffect, self:GetActorLocation())
end

return CombatSystem
\`\`\`

**En Blueprint:**
1. Event Hit → Call Lua Function: ReceiveDamage
2. Si retorna false → Event Death
3. Lua automáticamente llama SpawnParticleAtLocation`,
      },
    ],
    summary: `BP llama funciones Lua, Lua llama funciones BP. Pasar datos complejos por parámetros/retorno. Callbacks para operaciones asíncronas.`,
  },
  examples: [],
  interactive: {
    title: "Simula Comunicación Bidireccional",
    description: "BP y Lua se llaman mutuamente",
    starterCode: `-- Simula BP
local Blueprint = {
    vida = 100
}

function Blueprint:PlayHitEffect()
    print("Reproduciendo efecto de hit")
end

-- Script Lua
local LuaScript = {}

function LuaScript:ReceiveDamage(amount)
    Blueprint.vida = Blueprint.vida - amount
    print("Vida: " .. Blueprint.vida)
    
    -- Llamar función de BP
    Blueprint:PlayHitEffect()
    
    return Blueprint.vida > 0
end

-- BP llama a Lua
local vivo = LuaScript:ReceiveDamage(25)
print("¿Vivo? " .. tostring(vivo))`,
    environment: "lua",
    expectedOutput: "Vida: 75",
  },
  miniExercise: {
    id: "mes-03-l04-ej1",
    lessonId: "mes-03-l04",
    title: "Sistema de Diálogo Bidireccional",
    instructions: `Crea un diálogo donde BP y Lua se comuniquen:

1. BP tiene función \`ShowDialog(text)\` que imprime el texto
2. Lua tiene función \`StartDialog()\` que:
   - Itera sobre líneas de diálogo
   - Llama BP ShowDialog para cada una
   - BP responde con "Player respondió"
3. Imprime todo el diálogo

**Salida esperada:**
\`\`\`
NPC: ¡Saludos, viajero!
Player respondió
NPC: ¿Necesitas ayuda?
Player respondió
\`\`\``,
    starterCode: `local BP = {}

function BP:ShowDialog(text)
    print(text)
    -- Player responde
    print("Player respondió")
end

local LuaDialog = {
    lines = {
        "NPC: ¡Saludos, viajero!",
        "NPC: ¿Necesitas ayuda?"
    }
}

function LuaDialog:StartDialog()
    -- Iterar y llamar BP
end

LuaDialog:StartDialog()`,
    solution: `local BP = {}

function BP:ShowDialog(text)
    print(text)
    print("Player respondió")
end

local LuaDialog = {
    lines = {
        "NPC: ¡Saludos, viajero!",
        "NPC: ¿Necesitas ayuda?"
    }
}

function LuaDialog:StartDialog()
    for _, line in ipairs(self.lines) do
        BP:ShowDialog(line)
    end
end

LuaDialog:StartDialog()`,
    tests: [
      { type: "output_contains", expected: "¡Saludos, viajero!", message: "Debe mostrar saludo" },
      { type: "output_contains", expected: "Player respondió", message: "Debe responder" },
    ],
    hints: ["Usa ipairs para iterar", "Llama BP:ShowDialog(line)"],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: "BP → Lua: Call Lua Function. Lua → BP: funciones exportadas con UFUNCTION. Pasar datos por parámetros/retorno.",
  resources: [],
  prerequisites: ["mes-03-l03"],
};

// ============================================
// LECCIÓN 3.5: Componentes UE5
// ============================================

export const lesson05: Lesson = {
  id: "mes-03-l05",
  moduleId: "mes-03",
  lessonNumber: 5,
  title: "Componentes UE5",
  description: "Acceder y manipular componentes desde scripts Lua.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Componentes UE5",
    objectives: [
      "Obtener referencias a componentes",
      "Manipular propiedades de componentes",
      "Crear componentes dinámicamente",
      "Usar componentes comunes (Audio, Particle, Mesh)",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Trabajar con Componentes",
        content: `Los **componentes** son partes modulares de un Actor.

**Obtener componentes:**
\`\`\`lua
function MiActor:BeginPlay()
    -- Por tipo
    self.mesh = self:GetStaticMeshComponent()
    self.audio = self:GetAudioComponent()
    
    -- Por nombre
    self.light = self:GetComponentByName("LightComponent")
    
    -- Todos los componentes
    local components = self:GetComponents()
end
\`\`\`

**Manipular:**
\`\`\`lua
-- Mesh
self.mesh:SetVisibility(true)
self.mesh:SetCollisionEnabled(true)

-- Audio
self.audio:Play()
self.audio:Stop()
self.audio:SetVolume(0.5)

-- Particle
self.particle:Activate(true)
self.particle:Deactivate()

-- Transform
self.mesh:SetWorldLocation(FVector(0, 0, 100))
self.mesh:SetWorldRotation(FRotator(0, 90, 0))
\`\`\``,
      },
    ],
    summary: `GetStaticMeshComponent, GetAudioComponent, GetComponentByName. SetVisibility, SetCollisionEnabled, Play, Stop. SetWorldLocation/Rotation.`,
  },
  examples: [],
  interactive: {
    title: "Simula Componentes",
    description: "Crea y manipula componentes",
    starterCode: `local Actor = {}

function Actor:GetComponentByName(name)
    return self[name]
end

-- Crear componentes
Actor.audio = {
    volume = 1.0,
    Play = function(self) print("Audio playing") end,
    Stop = function(self) print("Audio stopped") end,
    SetVolume = function(self, v) self.volume = v end
}

-- Usar
local audio = Actor:GetComponentByName("audio")
audio:Play()
audio:SetVolume(0.5)
print("Volume: " .. audio.volume)`,
    environment: "lua",
    expectedOutput: "Audio playing",
  },
  miniExercise: {
    id: "mes-03-l05-ej1",
    lessonId: "mes-03-l05",
    title: "Sistema de Audio con Componentes",
    instructions: `Crea un sistema de audio que controle componentes:

1. Crea componente \`AudioComponent\` con methods: Play, Stop, SetVolume
2. Crea componente \`ParticleComponent\` con methods: Activate, Deactivate
3. Implementa función \`PlayEffect()\` que:
   - Activa partículas
   - Reproduce audio
4. Implementa \`StopEffect()\` que para todo

**Salida esperada:**
\`\`\`
Partículas activadas
Audio playing
Audio stopped
Partículas desactivadas
\`\`\``,
    starterCode: `local Efecto = {}

-- Crear componentes
Efecto.audio = {
    Play = function(self) print("Audio playing") end,
    Stop = function(self) print("Audio stopped") end
}

Efecto.particulas = {
    Activate = function(self) print("Partículas activadas") end,
    Deactivate = function(self) print("Partículas desactivadas") end
}

function Efecto:PlayEffect()
    -- Activar efectos
end

function Efecto:StopEffect()
    -- Parar efectos
end

Efecto:PlayEffect()
Efecto:StopEffect()`,
    solution: `local Efecto = {}

Efecto.audio = {
    Play = function(self) print("Audio playing") end,
    Stop = function(self) print("Audio stopped") end
}

Efecto.particulas = {
    Activate = function(self) print("Partículas activadas") end,
    Deactivate = function(self) print("Partículas desactivadas") end
}

function Efecto:PlayEffect()
    self.particulas:Activate()
    self.audio:Play()
end

function Efecto:StopEffect()
    self.audio:Stop()
    self.particulas:Deactivate()
end

Efecto:PlayEffect()
Efecto:StopEffect()`,
    tests: [
      { type: "output_contains", expected: "Partículas activadas", message: "Debe activar partículas" },
      { type: "output_contains", expected: "Audio playing", message: "Debe reproducir audio" },
    ],
    hints: ["Llama Activate antes que Play", "Orden inverso en StopEffect"],
    xpReward: 40,
    difficulty: "intermediate",
  },
  summary: "Get*Component para obtener referencias. Play/Stop para audio, Activate/Deactivate para partículas. SetVisibility, SetCollisionEnabled.",
  resources: [],
  prerequisites: ["mes-03-l04"],
};

// ============================================
// LECCIÓN 3.6: Proyecto Personaje
// ============================================

export const lesson06: Lesson = {
  id: "mes-03-l06",
  moduleId: "mes-03",
  lessonNumber: 6,
  title: "Proyecto: Personaje Controlado por Lua",
  description: "Integra todo lo aprendido creando un personaje jugable.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Proyecto: Personaje Controlado por Lua",
    objectives: [
      "Integrar input, movimiento y combate",
      "Comunicar BP y Lua efectivamente",
      "Implementar sistema de stats",
      "Crear personaje jugable completo",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Personaje Completo",
        content: `**Integrando todos los sistemas:**

\`\`\`lua
local PlayerCharacter = {}

function PlayerCharacter:BeginPlay()
    -- Stats
    self.vida = 100
    self.vidaMaxima = 100
    self.daño = 25
    
    -- Input
    self.inputComponent = self:GetInputComponent()
    self.inputComponent:BindAction("Jump", IE_Pressed, self, self.Jump)
    self.inputComponent:BindAction("Attack", IE_Pressed, self, self.Attack)
    self.inputComponent:BindAxis("MoveForward", self, self.MoveForward)
    self.inputComponent:BindAxis("MoveRight", self, self.MoveRight)
    
    -- Componentes
    self.mesh = self:GetStaticMeshComponent()
    self.audio = self:GetAudioComponent()
    
    -- Events
    self.OnDamageReceived:Add(self, self.OnTakeDamage)
end

function PlayerCharacter:Jump()
    self:LaunchCharacter(FVector(0, 0, 500))
end

function PlayerCharacter:Attack()
    -- Animación desde BP
    self:PlayAttackAnimation()
    
    -- Detectar hit
    local hit = self:LineTraceForward()
    if hit then
        hit:TakeDamage(self.daño)
    end
end

function PlayerCharacter:MoveForward(value)
    local forward = self:GetActorForwardVector()
    self:AddMovementInput(forward, value)
end

function PlayerCharacter:MoveRight(value)
    local right = self:GetActorRightVector()
    self:AddMovementInput(right, value)
end

function PlayerCharacter:OnTakeDamage(damage)
    self.vida = self.vida - damage
    self.audio:Play()  -- Sonido de hit
    
    if self.vida <= 0 then
        self:Die()
    end
end

return PlayerCharacter
\`\`\``,
      },
    ],
    summary: `Personaje completo: Input (Jump, Attack, Move), Stats (vida, daño), Componentes (mesh, audio), Events (OnDamageReceived). Integra BP y Lua.`,
  },
  examples: [],
  interactive: {
    title: "Simula Personaje Completo",
    description: "Prueba el personaje en consola",
    starterCode: `local Player = {
    vida = 100,
    daño = 25
}

function Player:Jump()
    print("¡Saltando!")
end

function Player:Attack()
    print("Atacando con " .. self.daño .. " de daño")
end

function Player:MoveForward(value)
    print("Moviendo adelante: " .. value)
end

function Player:OnTakeDamage(damage)
    self.vida = self.vida - damage
    print("Daño recibido: " .. damage .. ", Vida: " .. self.vida)
end

-- Pruebas
Player:Jump()
Player:Attack()
Player:MoveForward(1.0)
Player:OnTakeDamage(30)`,
    environment: "lua",
    expectedOutput: "¡Saltando!",
  },
  miniExercise: {
    id: "mes-03-l06-ej1",
    lessonId: "mes-03-l06",
    title: "Combate de Personaje",
    instructions: `Implementa sistema de combate:

1. Personaje tiene \`vida = 100\` y \`daño = 25\`
2. Función \`Attack(enemy)\` que:
   - Imprime "Atacando enemigo"
   - Reduce vida del enemigo
3. Función \`TakeDamage(amount)\` que:
   - Reduce tu vida
   - Imprime vida restante
   - Si vida <= 0, imprime "Has muerto"
4. Simula combate contra enemigo con 60 de vida

**Salida esperada:**
\`\`\`
Atacando enemigo
Enemigo tiene 35 HP
Recibes 30 de daño
Tu vida: 70
\`\`\``,
    starterCode: `local Player = {
    vida = 100,
    daño = 25
}

function Player:Attack(enemy)
    -- Atacar
end

function Player:TakeDamage(amount)
    -- Recibir daño
end

-- Enemigo
local enemy = { vida = 60 }

-- Combate
Player:Attack(enemy)
Player:TakeDamage(30)`,
    solution: `local Player = {
    vida = 100,
    daño = 25
}

function Player:Attack(enemy)
    print("Atacando enemigo")
    enemy.vida = enemy.vida - self.daño
    print("Enemigo tiene " .. enemy.vida .. " HP")
end

function Player:TakeDamage(amount)
    self.vida = self.vida - amount
    print("Recibes " .. amount .. " de daño")
    print("Tu vida: " .. self.vida)
    
    if self.vida <= 0 then
        print("Has muerto")
    end
end

local enemy = { vida = 60 }
Player:Attack(enemy)
Player:TakeDamage(30)`,
    tests: [
      { type: "output_contains", expected: "Atacando enemigo", message: "Debe atacar" },
      { type: "output_contains", expected: "Enemigo tiene 35 HP", message: "Daño correcto" },
      { type: "output_contains", expected: "Tu vida: 70", message: "Vida restante correcta" },
    ],
    hints: ["enemy.vida -= self.daño", "self.vida -= amount", "Verifica si vida <= 0"],
    xpReward: 50,
    difficulty: "intermediate",
  },
  summary: "Personaje completo: Input, Stats, Componentes, Events. Attack, Jump, Move, TakeDamage. Integra BP y Lua.",
  resources: [],
  prerequisites: ["mes-03-l05"],
};

// Exportar todas las lecciones del módulo 3
export const lessons: Lesson[] = [
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
];
