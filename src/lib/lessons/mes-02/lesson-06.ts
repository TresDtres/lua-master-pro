/**
 * Lección 2.6: Interacción UE5
 */

import { Lesson } from "@/types/lesson";

export const lesson06: Lesson = {
  id: "mes-02-l06",
  moduleId: "mes-02",
  lessonNumber: 6,
  title: "Interacción UE5",
  description: "Mover actores, cambiar materiales y manipular componentes en Unreal Engine 5.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Interacción UE5",
    objectives: [
      "Mover actores con SetActorLocation y AddActorWorldOffset",
      "Cambiar materiales con SetMaterial",
      "Acceder y manipular componentes",
      "Usar funciones comunes de Actor en UnLua",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Mover Actores",
        content: `Hay **varias formas** de mover un Actor en UE5:

**SetActorLocation - Teletransportar:**
\`\`\`lua
function MyActor:MoverANuevaPosicion()
    local nuevaLoc = FVector(100, 200, 50)
    self:SetActorLocation(nuevaLoc)
end
\`\`\`

**AddActorWorldOffset - Mover relativo:**
\`\`\`lua
function MyActor:MoverAdelante(distancia)
    local offset = FVector(distancia, 0, 0)
    self:AddActorWorldOffset(offset)
end
\`\`\`

**AddActorLocalOffset - Mover en espacio local:**
\`\`\`lua
function MyActor:MoverAdelanteLocal(distancia)
    -- Se mueve hacia donde mira el actor
    local offset = FVector(distancia, 0, 0)
    self:AddActorLocalOffset(offset)
end
\`\`\`

**Rotar:**
\`\`\`lua
function MyActor:Rotar(grados)
    local rot = self:GetActorRotation()
    rot.Yaw = rot.Yaw + grados
    self:SetActorRotation(rot)
end
\`\`\``,
        codeExamples: [
          {
            title: "Movimiento completo",
            code: `local MovingActor = {}

function MovingActor:BeginPlay()
    self.velocidad = 100  -- unidades/segundo
end

function MovingActor:Tick(deltaTime)
    -- Mover adelante
    local forward = self:GetActorForwardVector()
    local movement = forward * self.velocidad * deltaTime
    self:AddActorWorldOffset(movement)
    
    -- Obtener posición actual
    local loc = self:GetActorLocation()
    print("Posición: " .. tostring(loc))
end

function MovingActor:TeleportTo(x, y, z)
    self:SetActorLocation(FVector(x, y, z))
    print("Teletransportado a (" .. x .. ", " .. y .. ", " .. z .. ")")
end

return MovingActor`,
            language: "lua",
            description: "Actor que se mueve continuamente y puede teletransportarse.",
          },
        ],
      },
      {
        heading: "Cambiar Materiales",
        content: `**SetMaterial** cambia la apariencia de un mesh:

**Sintaxis:**
\`\`\`lua
function MyActor:CambiarMaterial(nuevoMaterial)
    -- Índice 0 = primer slot de material
    self:SetMaterial(0, nuevoMaterial)
end
\`\`\`

**Obtener material existente:**
\`\`\`lua
local mat = self:GetMaterial(0)
print("Material actual: " .. tostring(mat))
\`\`\`

**Crear material dinámico:**
\`\`\`lua
function MyActor:CrearMaterialDinamico()
    local baseMat = self:GetMaterial(0)
    local dynMat = self:CreateDynamicMaterialInstance(0, baseMat)
    
    -- Modificar parámetros
    dynMat:SetScalarParameterValue("Roughness", 0.5)
    dynMat:SetVectorParameterValue("Color", FLinearColor(1, 0, 0, 1))
    
    return dynMat
end
\`\`\``,
        codeExamples: [
          {
            title: "Cambiar color con material",
            code: `local ColorChanger = {}

function ColorChanger:BeginPlay()
    self.tiempoColor = 0
end

function ColorChanger:Tick(deltaTime)
    self.tiempoColor = self.tiempoColor + deltaTime
    
    -- Cambiar color cada 2 segundos
    if math.floor(self.tiempoColor) % 2 == 0 then
        self:SetColor(FLinearColor(1, 0, 0, 1))  -- Rojo
    else
        self:SetColor(FLinearColor(0, 0, 1, 1))  -- Azul
    end
end

function ColorChanger:SetColor(color)
    local mat = self:GetMaterial(0)
    if mat then
        mat:SetVectorParameterValue("Color", color)
    end
end

return ColorChanger`,
            language: "lua",
            description: "Actor que cambia de color periódicamente.",
          },
        ],
      },
      {
        heading: "Manipular Componentes",
        content: `Los **componentes** son partes de un Actor:

**Obtener componentes:**
\`\`\`lua
function MyActor:BeginPlay()
    -- Mesh
    self.mesh = self:GetStaticMeshComponent()
    
    -- Audio
    self.audio = self:GetAudioComponent()
    
    -- Collision
    self.collision = self:GetBoxCollision()
    
    -- Camera
    self.camera = self:GetCameraComponent()
end
\`\`\`

**Manipular:**
\`\`\`lua
-- Visibilidad
self.mesh:SetVisibility(false)

-- Collision
self.collision:SetCollisionEnabled(false)

-- Audio
self.audio:Play()
self.audio:SetVolume(0.5)

-- Scale
self.mesh:SetWorldScale3D(FVector(2, 2, 2))
\`\`\``,
        codeExamples: [
          {
            title: "Gestión de componentes",
            code: `local InteractiveObject = {}

function InteractiveObject:BeginPlay()
    self.mesh = self:GetStaticMeshComponent()
    self.audio = self:GetAudioComponent()
    self.interactable = true
end

function InteractiveObject:Interact()
    if not self.interactable then return end
    
    -- Feedback visual
    self.mesh:SetRenderCustomDepth(true)
    
    -- Feedback de audio
    self.audio:Play()
    
    -- Temporalmente no interactuable
    self.interactable = false
    self:SetActorTickEnabled(false)
    
    -- Reactivar después de 2 segundos
    self.tiempoEspera = 2
end

function InteractiveObject:Tick(deltaTime)
    if self.tiempoEspera then
        self.tiempoEspera = self.tiempoEspera - deltaTime
        if self.tiempoEspera <= 0 then
            self.interactable = true
            self.mesh:SetRenderCustomDepth(false)
            self:SetActorTickEnabled(true)
        end
    end
end

return InteractiveObject`,
            language: "lua",
            description: "Objeto interactuable con feedback visual y de audio.",
          },
        ],
      },
      {
        heading: "Funciones Comunes de Actor",
        content: `**Funciones útiles en UnLua:**

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| **GetActorLocation()** | Obtener posición | \`loc = self:GetActorLocation()\` |
| **GetActorRotation()** | Obtener rotación | \`rot = self:GetActorRotation()\` |
| **GetActorForwardVector()** | Vector adelante | \`fwd = self:GetActorForwardVector()\` |
| **SetActorLocation()** | Teletransportar | \`self:SetActorLocation(loc)\` |
| **SetActorRotation()** | Rotar | \`self:SetActorRotation(rot)\` |
| **AddActorWorldOffset()** | Mover relativo | \`self:AddActorWorldOffset(offset)\` |
| **GetDistanceTo()** | Distancia a otro | \`dist = self:GetDistanceTo(other)\` |
| **Destroy()** | Destruir actor | \`self:Destroy()\` |
| **Spawn()** | Crear actor | \`actor = Spawn(class, loc, rot)\` |

**Ejemplo completo:**
\`\`\`lua
function MyActor:Perseguir(target)
    local myLoc = self:GetActorLocation()
    local targetLoc = target:GetActorLocation()
    
    local distancia = self:GetDistanceTo(target)
    
    if distancia < 100 then
        -- Atacar
        self:Atacar(target)
    else
        -- Mover hacia el target
        local direccion = (targetLoc - myLoc):GetSafeNormal()
        local movimiento = direccion * self.velocidad * deltaTime
        self:AddActorWorldOffset(movimiento)
        
        -- Rotar hacia el target
        local rot = FRotator(0, direccion:ToOrientationRotator().Yaw, 0)
        self:SetActorRotation(rot)
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Persecución de target",
            code: `local ChaseAI = {}

function ChaseAI:BeginPlay()
    self.velocidad = 200
    self.rangoDeteccion = 500
    self.rangoAtaque = 100
    self.target = nil
end

function ChaseAI:Tick(deltaTime)
    if not self.target then
        self:BuscarTarget()
        return
    end
    
    local distancia = self:GetDistanceTo(self.target)
    
    if distancia <= self.rangoAtaque then
        self:Atacar()
    elseif distancia <= self.rangoDeteccion then
        self:MoverHacia(deltaTime)
    else
        self.target = nil
    end
end

function ChaseAI:BuscarTarget()
    -- Lógica de búsqueda
end

function ChaseAI:MoverHacia(deltaTime)
    local direccion = (self.target:GetActorLocation() - self:GetActorLocation()):GetSafeNormal()
    self:AddActorWorldOffset(direccion * self.velocidad * deltaTime)
    
    local rot = direccion:ToOrientationRotator()
    self:SetActorRotation(FRotator(0, rot.Yaw, 0))
end

function ChaseAI:Atacar()
    print("¡Atacando!")
end

return ChaseAI`,
            language: "lua",
            description: "IA que persigue y ataca al jugador.",
          },
        ],
      },
    ],
    summary: `Mover con SetActorLocation (teleport) o AddActorWorldOffset (relativo). Cambiar materiales con SetMaterial. Obtener componentes con Get*Component(). Funciones clave: GetActorLocation, GetActorRotation, GetDistanceTo, Destroy.`,
  },
  examples: [
    {
      title: "Puerta automática",
      code: `local AutomaticDoor = {}

function AutomaticDoor:BeginPlay()
    self.posicionCerrada = self:GetActorLocation()
    self.posicionAbierta = self.posicionCerrada + FVector(0, 0, 300)
    self.abierta = false
    self.velocidad = 100
end

function AutomaticDoor:Tick(deltaTime)
    local actual = self:GetActorLocation()
    local objetivo = self.abierta and self.posicionAbierta or self.posicionCerrada
    
    local delta = objetivo - actual
    local distancia = delta:Size()
    
    if distancia > 1 then
        local movimiento = delta:GetSafeNormal() * self.velocidad * deltaTime
        self:SetActorLocation(actual + movimiento)
    end
end

function AutomaticDoor:Abrir()
    self.abierta = true
end

function AutomaticDoor:Cerrar()
    self.abierta = false
end

return AutomaticDoor`,
      language: "lua",
      description: "Puerta que se abre y cierra automáticamente.",
    },
    {
      title: "Recolectable con rotación",
      code: `local Collectible = {}

function Collectible:BeginPlay()
    self.rotacionVelocidad = 90  -- grados/segundo
    self.audio = self:GetAudioComponent()
end

function Collectible:Tick(deltaTime)
    -- Rotar continuamente
    local rot = self:GetActorRotation()
    rot.Yaw = rot.Yaw + self.rotacionVelocidad * deltaTime
    self:SetActorRotation(rot)
end

function Collectible:OnPickup()
    -- Efectos
    self.audio:Play()
    
    -- Notificar juego
    Events.OnItemCollected(self)
    
    -- Destruir
    self:Destroy()
end

return Collectible`,
      language: "lua",
      description: "Item coleccionable que rota y se destruye al recoger.",
    },
    {
      title: "Plataforma móvil entre puntos",
      code: `local MovingPlatform = {}

function MovingPlatform:BeginPlay()
    self.puntos = {
        FVector(0, 0, 0),
        FVector(500, 0, 0),
        FVector(500, 0, 200),
        FVector(0, 0, 200)
    }
    self.indiceActual = 1
    self.velocidad = 100
end

function MovingPlatform:Tick(deltaTime)
    local inicio = self.puntos[self.indiceActual]
    local siguienteIndice = (self.indiceActual % #self.puntos) + 1
    local fin = self.puntos[siguienteIndice]
    
    local actual = self:GetActorLocation()
    local direccion = (fin - inicio):GetSafeNormal()
    local movimiento = direccion * self.velocidad * deltaTime
    
    self:SetActorLocation(actual + movimiento)
    
    -- Verificar si llegó al punto
    if (actual - fin):Size() < 5 then
        self.indiceActual = siguienteIndice
        self:SetActorLocation(fin)
    end
end

return MovingPlatform`,
      language: "lua",
      description: "Plataforma que se mueve entre múltiples puntos.",
    },
  ],
  interactive: {
    title: "Simula Movimiento de Actor",
    description: "Mueve un actor con AddActorWorldOffset",
    starterCode: `local Actor = {
    location = {X = 0, Y = 0, Z = 0}
}

function Actor:GetActorLocation()
    return self.location
end

function Actor:AddActorWorldOffset(offset)
    self.location.X = self.location.X + offset.X
    self.location.Y = self.location.Y + offset.Y
    self.location.Z = self.location.Z + offset.Z
    print("Nueva posición: (" .. self.location.X .. ", " .. self.location.Y .. ", " .. self.location.Z .. ")")
end

-- Mover el actor
Actor:AddActorWorldOffset({X = 10, Y = 0, Z = 0})
Actor:AddActorWorldOffset({X = 0, Y = 20, Z = 0})
Actor:AddActorWorldOffset({X = 0, Y = 0, Z = 5})`,
    environment: "lua",
    expectedOutput: "posición",
  },
  miniExercise: {
    id: "mes-02-l06-ej1",
    lessonId: "mes-02-l06",
    title: "Sistema de Teletransportación",
    instructions: `Crea un sistema de teletransportación:

1. En BeginPlay, guarda la \`posicionInicial\`
2. Crea función \`TeleportTo(x, y, z)\` que mueva el actor
3. Crea función \`ReturnToStart()\` que regrese a la posición inicial
4. Teletransporta a (100, 50, 10)
5. Espera 2 segundos (simulado)
6. Regresa al inicio

**Salida esperada:**
\`\`\`
Posición inicial: (0, 0, 0)
Teletransportado a: (100, 50, 10)
Regresando al inicio...
Posición actual: (0, 0, 0)
\`\`\``,
    starterCode: `local Teleporter = {}

function Teleporter:BeginPlay()
    -- Guardar posición inicial
end

function Teleporter:TeleportTo(x, y, z)
    -- Implementar teletransportación
end

function Teleporter:ReturnToStart()
    -- Regresar al inicio
end

-- Probar
print("Posición inicial: (0, 0, 0)")
Teleporter:TeleportTo(100, 50, 10)
print("Regresando al inicio...")
Teleporter:ReturnToStart()

return Teleporter`,
    solution: `local Teleporter = {}

function Teleporter:BeginPlay()
    self.posicionInicial = {X = 0, Y = 0, Z = 0}
    self.location = {X = 0, Y = 0, Z = 0}
end

function Teleporter:TeleportTo(x, y, z)
    self.location = {X = x, Y = y, Z = z}
    print("Teletransportado a: (" .. x .. ", " .. y .. ", " .. z .. ")")
end

function Teleporter:ReturnToStart()
    self.location = self.posicionInicial
    print("Posición actual: (" .. self.location.X .. ", " .. self.location.Y .. ", " .. self.location.Z .. ")")
end

Teleporter:BeginPlay()
print("Posición inicial: (0, 0, 0)")
Teleporter:TeleportTo(100, 50, 10)
print("Regresando al inicio...")
Teleporter:ReturnToStart()

return Teleporter`,
    tests: [
      {
        type: "output_contains",
        expected: "Teletransportado a: (100, 50, 10)",
        message: "Debe teletransportar a las coordenadas correctas",
      },
      {
        type: "output_contains",
        expected: "Posición actual: (0, 0, 0)",
        message: "Debe regresar al origen",
      },
      {
        type: "code_contains",
        expected: "posicionInicial",
        message: "Debe guardar la posición inicial",
      },
    ],
    hints: [
      "Guarda {X = 0, Y = 0, Z = 0} como posición inicial",
      "TeleportTo actualiza self.location",
      "ReturnToStart copia self.posicionInicial a self.location",
    ],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: `SetActorLocation para teleport, AddActorWorldOffset para movimiento relativo. SetMaterial cambia apariencia. Get*Component() obtiene componentes. Funciones clave: GetActorLocation/Rotation/ForwardVector, GetDistanceTo, Destroy.`,
  resources: [
    {
      title: "UnLua API Reference",
      url: "https://github.com/Tencent/UnLua/blob/master/Docs/ApiReference.md",
      type: "documentation",
      description: "Referencia completa de APIs de UnLua",
    },
    {
      title: "UE5 Actor API",
      url: "https://docs.unrealengine.com/5.0/en-US/API/Runtime/Engine/GameFramework/AActor/",
      type: "documentation",
      description: "Documentación de AActor en UE5",
    },
    {
      title: "UnLua Examples",
      url: "https://github.com/Tencent/UnLua/tree/master/Content/Scripts",
      type: "tool",
      description: "Ejemplos de scripts UnLua",
    },
  ],
  prerequisites: ["mes-02-l05"],
};

export default lesson06;
