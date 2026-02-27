/**
 * Lección 2.5: Ciclo de Vida
 */

import { Lesson } from "@/types/lesson";

export const lesson05: Lesson = {
  id: "mes-02-l05",
  moduleId: "mes-02",
  lessonNumber: 5,
  title: "Ciclo de Vida",
  description: "BeginPlay, Tick, EndPlay y eventos en UnLua.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Ciclo de Vida",
    objectives: [
      "Entender el ciclo de vida de un Actor en UE5",
      "Usar BeginPlay para inicialización",
      "Implementar Tick para actualizaciones por frame",
      "Manejar EndPlay para limpieza",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Eventos del Ciclo de Vida",
        content: `Todo Actor en UE5 pasa por **tres fases principales**:

**1. BeginPlay** - Al iniciar
\`\`\`lua
function MyActor:BeginPlay()
    -- Inicialización
    self.vida = 100
    self.activo = true
end
\`\`\`

**2. Tick** - Cada frame
\`\`\`lua
function MyActor:Tick(deltaTime)
    -- Actualización continua
    self:Rotar()
    self:VerificarColisiones()
end
\`\`\`

**3. EndPlay** - Al destruir
\`\`\`lua
function MyActor:EndPlay()
    -- Limpieza
    self:GuardarProgreso()
    self:LiberarRecursos()
end
\`\`\`

**Orden de ejecución:**
1. Constructor (si hay)
2. BeginPlay (cuando el juego inicia)
3. Tick (cada frame, ~60 veces/segundo)
4. EndPlay (cuando el Actor se destruye)`,
        codeExamples: [
          {
            title: "Ciclo completo",
            code: `local MyActor = {}

function MyActor:BeginPlay()
    print("BeginPlay - Actor creado")
    self.tiempoVida = 0
    self.activo = true
end

function MyActor:Tick(deltaTime)
    if not self.activo then return end
    
    self.tiempoVida = self.tiempoVida + deltaTime
    
    -- Destruir después de 10 segundos
    if self.tiempoVida >= 10 then
        self:EndPlay()
    end
end

function MyActor:EndPlay()
    print("EndPlay - Actor destruido")
    print("Tiempo de vida: " .. self.tiempoVida .. "s")
    self.activo = false
end

return MyActor`,
            language: "lua",
            description: "Actor con ciclo de vida completo de 10 segundos.",
          },
        ],
      },
      {
        heading: "BeginPlay - Inicialización",
        content: `**BeginPlay** se llama **una vez** cuando el Actor entra al mundo.

**Usos comunes:**
- Inicializar variables
- Obtener referencias a componentes
- Configurar estado inicial
- Suscribirse a eventos

**Ejemplo:**
\`\`\`lua
function MyActor:BeginPlay()
    -- Variables
    self.vidaMaxima = 100
    self.vidaActual = 100
    self.muerto = false
    
    -- Componentes
    self.Mesh = self:GetStaticMeshComponent()
    self.Audio = self:GetAudioComponent()
    
    -- Configurar
    self:SetActorTickEnabled(true)
    self.Mesh:SetCollisionEnabled(true)
    
    -- Events
    self:OnComponentHit:Add(self:OnHit())
end
\`\`\``,
        codeExamples: [
          {
            title: "Inicialización completa",
            code: `local Player = {}

function Player:BeginPlay()
    -- Stats
    self.level = 1
    self.experience = 0
    self.gold = 100
    
    -- Componentes
    self.camera = self:GetCamera()
    self.mesh = self:GetMesh()
    
    -- UI
    self:UpdateHUD()
    
    -- Input
    self:EnableInput(true)
    
    print("Player listo en " .. tostring(self:GetActorLocation()))
end

return Player`,
            language: "lua",
            description: "Inicialización completa de jugador con componentes y UI.",
          },
        ],
      },
      {
        heading: "Tick - Actualización Continua",
        content: `**Tick** se llama **cada frame** (usualmente 60 veces/segundo).

**Parámetro deltaTime:**
- Tiempo en segundos desde el último frame
- Usar para movimiento frame-independent

**Ejemplo de movimiento:**
\`\`\`lua
function MyActor:Tick(deltaTime)
    -- MAL: Depende del framerate
    self.x = self.x + 10
    
    -- BIEN: Independiente del framerate
    self.x = self.x + 100 * deltaTime
end
\`\`\`

**Optimización:**
\`\`\`lua
-- Desactivar Tick si no se necesita
function MyActor:BeginPlay()
    self:SetActorTickEnabled(false)
end

-- Activar solo cuando necesite
function MyActor:Activar()
    self:SetActorTickEnabled(true)
end
\`\`\``,
        codeExamples: [
          {
            title: "Movimiento con deltaTime",
            code: `local MovingPlatform = {}

function MovingPlatform:BeginPlay()
    self.velocidad = 50  -- unidades/segundo
    self.direccion = 1
    self.limite = 500
end

function MovingPlatform:Tick(deltaTime)
    local delta = self.velocidad * self.direccion * deltaTime
    
    local loc = self:GetActorLocation()
    loc.X = loc.X + delta
    
    -- Revertir en límites
    if math.abs(loc.X) >= self.limite then
        self.direccion = -self.direccion
    end
    
    self:SetActorLocation(loc)
end

return MovingPlatform`,
            language: "lua",
            description: "Plataforma móvil con movimiento frame-independent.",
          },
        ],
      },
      {
        heading: "EndPlay - Limpieza",
        content: `**EndPlay** se llama cuando el Actor se destruye.

**Causas de EndPlay:**
- \`Destroy()\` llamado
- Level unload
- Game end
- Actor fuera del mundo

**Usos comunes:**
- Guardar progreso
- Liberar recursos
- Notificar eventos
- Cleanup de memoria

**Ejemplo:**
\`\`\`lua
function MyActor:EndPlay()
    -- Guardar
    self:GuardarDatos()
    
    -- Notificar
    Events.OnActorDestroyed(self)
    
    -- Cleanup
    self.particleSystem:Destroy()
    self.audioSource:Stop()
    
    print("Cleanup completado")
end
\`\`\``,
        codeExamples: [
          {
            title: "EndPlay con guardado",
            code: `local Player = {}

function Player:EndPlay()
    -- Guardar stats
    local datos = {
        level = self.level,
        experience = self.experience,
        gold = self.gold,
        location = self:GetActorLocation()
    }
    
    SaveGame.Save(datos)
    
    -- Notificar UI
    self:ShowDeathScreen()
    
    -- Cleanup
    self:DisableInput()
    self.camera:Destroy()
    
    print("Player datos guardados")
end

return Player`,
            language: "lua",
            description: "EndPlay guarda datos del jugador antes de destruir.",
          },
        ],
      },
    ],
    summary: `BeginPlay inicializa (una vez), Tick actualiza (cada frame con deltaTime), EndPlay limpia (al destruir). Usar deltaTime para movimiento frame-independent. Desactivar Tick cuando no se necesite.`,
  },
  examples: [
    {
      title: "Timer con Tick",
      code: `local Timer = {}

function Timer:BeginPlay()
    self.tiempoRestante = 10  -- segundos
    self.activo = true
end

function Timer:Tick(deltaTime)
    if not self.activo then return end
    
    self.tiempoRestante = self.tiempoRestante - deltaTime
    
    if self.tiempoRestante <= 0 then
        self:OnTimerComplete()
    else
        print("Tiempo: " .. math.ceil(self.tiempoRestante))
    end
end

function Timer:OnTimerComplete()
    print("¡Tiempo completado!")
    self.activo = false
    self:SetActorTickEnabled(false)
end

return Timer`,
      language: "lua",
      description: "Timer que cuenta atrás y se desactiva al completar.",
    },
    {
      title: "Health Regeneration",
      code: `local Character = {}

function Character:BeginPlay()
    self.vida = 100
    self.vidaMax = 100
    self.regenRate = 5  -- por segundo
    self.regenTimer = 0
end

function Character:Tick(deltaTime)
    self.regenTimer = self.regenTimer + deltaTime
    
    -- Regenerar cada segundo si está herido
    if self.regenTimer >= 1 and self.vida < self.vidaMax then
        self.vida = math.min(self.vida + self.regenRate, self.vidaMax)
        self.regenTimer = 0
        print("Vida: " .. self.vida)
    end
end

return Character`,
      language: "lua",
      description: "Regeneración de vida periódica con Tick.",
    },
    {
      title: "State Machine con eventos",
      code: `local Enemy = {}

function Enemy:BeginPlay()
    self.estado = "PATROL"
    self.target = nil
end

function Enemy:Tick(deltaTime)
    if self.estado == "PATROL" then
        self:Patrol(deltaTime)
    elseif self.estado == "CHASE" then
        self:Chase(deltaTime)
    elseif self.estado == "ATTACK" then
        self:Attack(deltaTime)
    end
end

function Enemy:OnSeePlayer(player)
    self.target = player
    self.estado = "CHASE"
end

function Enemy:OnLosePlayer()
    self.target = nil
    self.estado = "PATROL"
end

return Enemy`,
      language: "lua",
      description: "Máquina de estados con transiciones por eventos.",
    },
  ],
  interactive: {
    title: "Simula Ciclo de Vida",
    description: "Implementa BeginPlay y Tick para un contador",
    starterCode: `local Contador = {}

function Contador:BeginPlay()
    self.valor = 0
    print("Contador iniciado")
end

function Contador:Tick(deltaTime)
    self.valor = self.valor + 1
    
    if self.valor >= 5 then
        print("¡Contador completado!")
        return
    end
    
    print("Contador: " .. self.valor)
end

-- Simular
Contador:BeginPlay()
Contador:Tick(1)
Contador:Tick(1)
Contador:Tick(1)
Contador:Tick(1)
Contador:Tick(1)`,
    environment: "lua",
    expectedOutput: "Contador iniciado",
  },
  miniExercise: {
    id: "mes-02-l05-ej1",
    lessonId: "mes-02-l05",
    title: "Sistema de Día/Noche",
    instructions: `Crea un ciclo día/noche:

1. En BeginPlay, inicia \`tiempo = 0\` y \`cicloDuracion = 20\`
2. En Tick, acumula deltaTime a \`tiempo\`
3. Calcula \`progreso = tiempo / cicloDuracion\`
4. Si progreso >= 1, resetea a 0
5. Imprime "Día" si progreso < 0.5, "Noche" si no

**Salida esperada (después de 20s):**
\`\`\`
Día
Día
...
Noche
Noche
...
Día (repetir)
\`\`\``,
    starterCode: `local CicloDiaNoche = {}

function CicloDiaNoche:BeginPlay()
    self.tiempo = 0
    self.cicloDuracion = 20
end

function CicloDiaNoche:Tick(deltaTime)
    -- Acumular tiempo
    -- Calcular progreso
    -- Determinar si es día o noche
end

return CicloDiaNoche`,
    solution: `local CicloDiaNoche = {}

function CicloDiaNoche:BeginPlay()
    self.tiempo = 0
    self.cicloDuracion = 20
end

function CicloDiaNoche:Tick(deltaTime)
    self.tiempo = self.tiempo + deltaTime
    local progreso = self.tiempo / self.cicloDuracion
    
    if progreso >= 1 then
        self.tiempo = 0
        progreso = 0
    end
    
    if progreso < 0.5 then
        print("Día (" .. math.floor(progreso * 100) .. "%)")
    else
        print("Noche (" .. math.floor(progreso * 100) .. "%)")
    end
end

return CicloDiaNoche`,
    tests: [
      {
        type: "code_contains",
        expected: "self.tiempo = 0",
        message: "Debe inicializar tiempo en 0",
      },
      {
        type: "code_contains",
        expected: "deltaTime",
        message: "Debe usar deltaTime en Tick",
      },
      {
        type: "code_contains",
        expected: "progreso",
        message: "Debe calcular progreso",
      },
      {
        type: "output_contains",
        expected: "Día",
        message: "Debe imprimir Día",
      },
    ],
    hints: [
      "Acumula deltaTime a self.tiempo",
      "progreso = self.tiempo / self.cicloDuracion",
      "Si progreso >= 1, resetea self.tiempo = 0",
    ],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: `BeginPlay (init una vez), Tick (update cada frame con deltaTime), EndPlay (cleanup al destruir). Usar deltaTime para frame-independence. Desactivar Tick cuando no se necesite para optimizar.`,
  resources: [
    {
      title: "UnLua Lifecycle Docs",
      url: "https://github.com/Tencent/UnLua/blob/master/Docs/README.md",
      type: "documentation",
      description: "Documentación del ciclo de vida en UnLua",
    },
    {
      title: "UE5 Actor Lifecycle",
      url: "https://docs.unrealengine.com/5.0/en-US/actors-in-unreal-engine/",
      type: "article",
      description: "Ciclo de vida de Actores en UE5",
    },
  ],
  prerequisites: ["mes-02-l04"],
};

export default lesson05;
