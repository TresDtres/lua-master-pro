/**
 * Módulo 7: Multijugador - Todas las lecciones completas
 * Redes, replicación, RPCs, sincronización y lag compensation
 */

import { Lesson } from "@/types/lesson";

// ============================================
// LECCIÓN 7.1: Redes UE5
// ============================================

export const lesson01: Lesson = {
  id: "mes-07-l01",
  moduleId: "mes-07",
  lessonNumber: 1,
  title: "Redes UE5",
  description: "Arquitectura cliente-servidor, authority, roles y relevancia en Unreal Engine.",
  estimatedTime: 40,
  difficulty: "advanced",
  theory: {
    title: "Redes UE5",
    objectives: [
      "Entender arquitectura cliente-servidor de UE5",
      "Comprender roles (Authority, Autonomous, Simulated)",
      "Manejar relevancia de red",
      "Configurar proyecto para multijugador",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "Arquitectura Cliente-Servidor",
        content: `**UE5 usa modelo Cliente-Servidor:**

\`\`\`
┌─────────────┐
│  SERVIDOR   │  ← Autoridad principal
│  (Host)     │     - Valida acciones
│             │     - Simula física
│             │     - Replica estado
└──────┬──────┘
       │
   ┌───┼───┐
   │   │   │
┌──┴─┐ ┌─┴──┐ ┌─┴──┐
│C1  │ │C2  │ │C3  │  ← Clientes
│    │ │    │ │    │     - Renderizan
│    │ │    │ │    │     - Capturan input
│    │ │    │ │    │     - Predicen movimiento
└────┘ └────┘ └────┘
\`\`\`

**Tipos de sesión:**
- **Listen Server** - Un jugador es host + cliente
- **Dedicated Server** - Servidor dedicado sin jugador
- **Peer-to-Peer** - No recomendado (UE5 no lo soporta nativamente)

**En UnLua:**
\`\`\`lua
function MiActor:BeginPlay()
    -- Verificar rol
    if self:GetLocalRole() == "ROLE_Authority" then
        print("Soy el servidor")
    elseif self:GetLocalRole() == "ROLE_AutonomousProxy" then
        print("Soy cliente con control")
    elseif self:GetLocalRole() == "ROLE_SimulatedProxy" then
        print("Soy cliente simulado")
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Verificar rol",
            code: `local RedUtils = {}

function RedUtils:EsServidor(npc)
    return npc:GetLocalRole() == "ROLE_Authority"
end

function RedUtils:EsClienteAutonomo(npc)
    return npc:GetLocalRole() == "ROLE_AutonomousProxy"
end

function RedUtils:EsSimulado(npc)
    return npc:GetLocalRole() == "ROLE_SimulatedProxy"
end

function RedUtils:TieneAuthority(npc)
    return npc:GetRemoteRole() == "ROLE_Authority"
end

-- Uso en juego
function MiPersonaje:BeginPlay()
    if RedUtils:EsServidor(self) then
        print("Host - puedo spawnear actores")
        self:SpawnEnemigos()
    end
    
    if RedUtils:EsClienteAutonomo(self) then
        print("Cliente - puedo controlar personaje")
        self:ActivarInput()
    end
end

return RedUtils`,
            language: "lua",
            description: "Utilidades para verificar roles de red.",
          },
        ],
      },
      {
        heading: "Roles en UE5",
        content: `**3 roles principales:**

**1. ROLE_Authority (Servidor):**
- Tiene autoridad completa
- Puede ejecutar lógica de juego
- Replica propiedades a clientes
- Spawnea actores

**2. ROLE_AutonomousProxy (Cliente Local):**
- Controla un personaje
- Envía input al servidor
- Predice movimiento local
- Recibe correcciones del servidor

**3. ROLE_SimulatedProxy (Otros Clientes):**
- Simula actores remotos
- Recibe estado del servidor
- Interpola movimiento
- No tiene control directo

**Ejemplo práctico:**
\`\`\`lua
function MiPersonaje:Mover(direccion)
    if self:EsAuthority() then
        -- Servidor: aplica movimiento directamente
        self:AplicarMovimiento(direccion)
    elseif self:EsAutonomo() then
        -- Cliente local: envía input al servidor
        self:ServerMover(direccion)
        -- Predice localmente
        self:AplicarMovimiento(direccion)
    end
    -- Simulado: no hace nada, recibe del servidor
end
\`\`\``,
        codeExamples: [
          {
            title: "Manejo de roles",
            code: `local Personaje = {}

function Personaje:BeginPlay()
    self.rol = self:GetLocalRole()
    print("Mi rol: " .. self.rol)
end

function Personaje:EsAuthority()
    return self.rol == "ROLE_Authority"
end

function Personaje:EsAutonomo()
    return self.rol == "ROLE_AutonomousProxy"
end

function Personaje:EsSimulado()
    return self.rol == "ROLE_SimulatedProxy"
end

function Personaje:RecibirDaño(cantidad)
    if self:EsAuthority() then
        -- Solo el servidor aplica daño
        self.vida = self.vida - cantidad
        
        if self.vida <= 0 then
            self:Morir()
        end
        
        -- Replicar nueva vida
        self:OnVidaCambiada(self.vida)
    end
    -- Clientes solo muestran el daño
end

return Personaje`,
            language: "lua",
            description: "Clase con manejo correcto de roles.",
          },
        ],
      },
      {
        heading: "Relevancia de Red",
        content: `**Relevancia determina qué se replica:**

**Factores:**
- **Distancia** - Más lejos = menos relevancia
- **Visibilidad** - Si no se ve = menos relevancia
- **Importancia** - Jugadores > NPCs > Objetos
- **Tamaño de red** - Límite de actores replicados

**Configurar relevancia:**
\`\`\`lua
function MiActor:BeginPlay()
    -- Distancia de relevancia
    self:SetNetCullDistanceSquared(10000^2)  -- 10000 unidades
    
    -- Frecuencia de replicación
    self:SetNetUpdateFrequency(100)  -- 100 veces/segundo
    
    -- Siempre relevante
    self:SetAlwaysRelevant(true)
end
\`\`\`

**Optimización:**
\`\`\`lua
-- Solo replicar cuando cambia
function MiActor:SetVida(nuevaVida)
    if self.vida ~= nuevaVida then
        self.vida = nuevaVida
        self:OnRep_Vida()  -- Llamar manualmente en clientes
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Optimizar relevancia",
            code: `local OptimizacionRed = {}

function OptimizacionRed:ConfigurarActor(actor, tipo)
    if tipo == "jugador" then
        -- Jugadores: alta prioridad
        actor:SetNetCullDistanceSquared(15000^2)
        actor:SetNetUpdateFrequency(100)
        actor:SetAlwaysRelevant(true)
        
    elseif tipo == "npc" then
        -- NPCs: media prioridad
        actor:SetNetCullDistanceSquared(5000^2)
        actor:SetNetUpdateFrequency(50)
        
    elseif tipo == "objeto" then
        -- Objetos: baja prioridad
        actor:SetNetCullDistanceSquared(2000^2)
        actor:SetNetUpdateFrequency(10)
    end
end

function OptimizacionRed:EsRelevantePara(npc, jugador)
    local distancia = npc:GetDistanceTo(jugador)
    local relevancia = npc:GetNetCullDistanceSquared()
    
    return distancia^2 < relevancia
end

return OptimizacionRed`,
            language: "lua",
            description: "Configuración de relevancia por tipo de actor.",
          },
        ],
      },
      {
        heading: "Configurar Proyecto Multijugador",
        content: `**Pasos en UE5:**

1. **Project Settings → Maps & Modes:**
   - Default GameMode
   - Server Default Map
   - Client Default Map

2. **Project Settings → Network:**
   - Enable network debugging
   - Configurar max players

3. **GameMode:**
\`\`\`lua
local MiGameMode = {}

function MiGameMode:BeginPlay()
    -- Configurar max jugadores
    self:SetMaxPlayers(8)
    
    -- Configurar mapa de viaje
    self:SetDefaultMap("MainMap")
end

return MiGameMode
\`\`\`

**Iniciar sesión:**
- **Listen Server:** \`open MainMap?listen\`
- **Client:** \`open 127.0.0.1\`
- **Dedicated:** \`start MainMap\``,
        codeExamples: [
          {
            title: "GameMode multijugador",
            code: `local MultiplayerGameMode = {}

function MultiplayerGameMode:BeginPlay()
    -- Configurar jugadores
    self:SetMaxPlayers(4)
    
    -- Configurar equipo
    self.bUseTeams = false  -- Todos contra todos
    -- self.bUseTeams = true  -- Por equipos
    
    -- Configurar respawn
    self.tiempoRespawn = 3.0
end

function MultiplayerGameMode:PostLogin(nuevoJugador)
    print("Jugador conectado: " .. nuevoJugador:GetNombre())
    
    -- Asignar equipo aleatorio
    if self.bUseTeams then
        self:AsignarEquipo(nuevoJugador)
    end
    
    -- Dar bienvenida
    self:BroadcastMessage("¡" .. nuevoJugador:GetNombre() .. " se une!")
end

function MultiplayerGameMode:Logout(jugador)
    print("Jugador desconectado: " .. jugador:GetNombre())
    self:BroadcastMessage(jugador:GetNombre() .. " sale.")
end

return MultiplayerGameMode`,
            language: "lua",
            description: "GameMode configurado para multijugador.",
          },
        ],
      },
    ],
    summary: `UE5 usa cliente-servidor. Roles: Authority (servidor), AutonomousProxy (cliente local), SimulatedProxy (otros clientes). Relevancia por distancia/visibilidad. Configurar GameMode con max players.`,
  },
  examples: [],
  interactive: {
    title: "Simula Roles de Red",
    description: "Verifica roles en diferentes contextos",
    starterCode: `local Actor = {
    rol = "ROLE_Authority"
}

function Actor:GetLocalRole()
    return self.rol
end

function Actor:EsServidor()
    return self.rol == "ROLE_Authority"
end

function Actor:EsCliente()
    return self.rol == "ROLE_AutonomousProxy"
end

-- Probar diferentes roles
local roles = {"ROLE_Authority", "ROLE_AutonomousProxy", "ROLE_SimulatedProxy"}

for _, rol in ipairs(roles) do
    Actor.rol = rol
    print("Rol: " .. rol)
    print("  Es servidor: " .. tostring(Actor:EsServidor()))
    print("  Es cliente: " .. tostring(Actor:EsCliente()))
end`,
    environment: "lua",
    expectedOutput: "Rol: ROLE_Authority",
  },
  miniExercise: {
    id: "mes-07-l01-ej1",
    lessonId: "mes-07-l01",
    title: "Sistema de Roles",
    instructions: `Crea un sistema que maneje roles:

1. Actor tiene rol="ROLE_Authority"
2. Función \`RecibirInput(input)\` que:
   - Si es Authority: ejecuta acción inmediatamente
   - Si es Autonomous: llama a ServerAction(input)
   - Si es Simulated: ignora
3. Función \`ServerAction(input)\` que imprime "Server: \[input]"
4. Prueba con los 3 roles

**Salida esperada:**
\`\`\`
=== Authority ===
Ejecutando: Saltar
=== Autonomous ===
Server: Saltar
=== Simulated ===
(Sin output)
\`\`\``,
    starterCode: `local Actor = {
    rol = "ROLE_Authority"
}

function Actor:RecibirInput(input)
    -- Implementar según rol
end

function Actor:ServerAction(input)
    print("Server: " .. input)
end

-- Probar
print("=== Authority ===")
Actor.rol = "ROLE_Authority"
Actor:RecibirInput("Saltar")

print("=== Autonomous ===")
Actor.rol = "ROLE_AutonomousProxy"
Actor:RecibirInput("Saltar")

print("=== Simulated ===")
Actor.rol = "ROLE_SimulatedProxy"
Actor:RecibirInput("Saltar")`,
    solution: `local Actor = {
    rol = "ROLE_Authority"
}

function Actor:RecibirInput(input)
    if self.rol == "ROLE_Authority" then
        print("Ejecutando: " .. input)
    elseif self.rol == "ROLE_AutonomousProxy" then
        self:ServerAction(input)
    end
    -- Simulated no hace nada
end

function Actor:ServerAction(input)
    print("Server: " .. input)
end

print("=== Authority ===")
Actor.rol = "ROLE_Authority"
Actor:RecibirInput("Saltar")

print("=== Autonomous ===")
Actor.rol = "ROLE_AutonomousProxy"
Actor:RecibirInput("Saltar")

print("=== Simulated ===")
Actor.rol = "ROLE_SimulatedProxy"
Actor:RecibirInput("Saltar")`,
    tests: [
      { type: "output_contains", expected: "Ejecutando: Saltar", message: "Authority ejecuta" },
      { type: "output_contains", expected: "Server: Saltar", message: "Autonomous llama server" },
    ],
    hints: ["Authority ejecuta directamente", "Autonomous llama ServerAction", "Simulated no hace nada"],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: "Cliente-servidor con 3 roles: Authority, AutonomousProxy, SimulatedProxy. Relevancia por distancia. Configurar GameMode con max players.",
  resources: [
    { title: "UE5 Networking Documentation", url: "https://docs.unrealengine.com/5.0/en-US/networking-and-multiplayer-in-unreal-engine/", type: "documentation" },
  ],
  prerequisites: ["mes-06-l06"],
};

// ============================================
// LECCIÓN 7.2: Replicación
// ============================================

export const lesson02: Lesson = {
  id: "mes-07-l02",
  moduleId: "mes-07",
  lessonNumber: 2,
  title: "Replicación",
  description: "Propiedades replicadas, condiciones de replicación y optimización de ancho de banda.",
  estimatedTime: 40,
  difficulty: "advanced",
  theory: {
    title: "Replicación",
    objectives: [
      "Replicar propiedades entre servidor y clientes",
      "Usar condiciones de replicación",
      "Optimizar ancho de banda",
      "Implementar OnRep functions",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "Propiedades Replicadas",
        content: `**Replicar variables:**
\`\`\`lua
function MiActor:BeginPlay()
    -- Registrar propiedades a replicar
    self:Replicar("vida")
    self:Replicar("mana")
    self:Replicar("nombre")
    self:Replicar("equipo")
end

-- En el servidor, cambiar valor
function MiActor:RecibirDaño(cantidad)
    if self:EsAuthority() then
        self.vida = self.vida - cantidad
        -- Automáticamente se replica a clientes
    end
end

-- En clientes, la variable se actualiza sola
\`\`\`

**Tipos replicables:**
- Números (int, float)
- Strings
- Booleans
- Vectores (FVector, FRotator)
- Referencias a actores
- Arrays (con limitaciones)`,
        codeExamples: [
          {
            title: "Replicar stats",
            code: `local Personaje = {}

function Personaje:BeginPlay()
    -- Stats base
    self.vida = 100
    self.vidaMax = 100
    self.mana = 50
    self.manaMax = 50
    self.nivel = 1
    self.experiencia = 0
    
    -- Registrar replicación
    if self:EsAuthority() then
        self:Replicar("vida")
        self:Replicar("mana")
        self:Replicar("nivel")
    end
end

function Personaje:Curar(cantidad)
    if self:EsAuthority() then
        local vidaAnterior = self.vida
        self.vida = math.min(self.vida + cantidad, self.vidaMax)
        
        -- Solo notificar si cambió
        if self.vida ~= vidaAnterior then
            self:OnRep_Vida()
        end
    end
end

return Personaje`,
            language: "lua",
            description: "Replicación de stats de personaje.",
          },
        ],
      },
      {
        heading: "Condiciones de Replicación",
        content: `**Replicar solo cuando cambia:**
\`\`\`lua
function MiActor:SetVida(nuevaVida)
    if self.vida ~= nuevaVida then
        self.vida = nuevaVida
        self:MarcarParaReplicacion("vida")
    end
end
\`\`\`

**Replicar solo a ciertos clientes:**
\`\`\`lua
function MiActor:ReplicarSoloEquipo()
    self:ReplicarCondicional("equipo", function(cliente)
        return cliente.equipo == self.equipo
    end)
end
\`\`\`

**Replicar solo si relevante:**
\`\`\`lua
function MiActor:ShouldReplicate()
    -- Solo replicar si hay jugadores cerca
    return self:HayJugadoresCercanos()
end
\`\`\``,
        codeExamples: [
          {
            title: "Replicación condicional",
            code: `local SistemaReplicacion = {}

function SistemaReplicacion:ReplicarSiCambia(actor, propiedad, nuevoValor)
    local valorAnterior = actor[propiedad]
    
    if valorAnterior ~= nuevoValor then
        actor[propiedad] = nuevoValor
        actor:MarcarParaReplicacion(propiedad)
        return true
    end
    
    return false
end

function SistemaReplicacion:ReplicarConDistanciaMaxima(actor, propiedad, distanciaMax)
    actor:ReplicarCondicional(propiedad, function(cliente)
        local distancia = actor:GetDistanceTo(cliente)
        return distancia < distanciaMax
    end)
end

function SistemaReplicacion:ReplicarSoloDuenio(actor, propiedad, duenio)
    actor:ReplicarCondicional(propiedad, function(cliente)
        return cliente == duenio
    end)
end

return SistemaReplicacion`,
            language: "lua",
            description: "Funciones para replicación condicional.",
          },
        ],
      },
      {
        heading: "OnRep Functions",
        content: `**Notificar cambios en clientes:**
\`\`\`lua
function MiActor:BeginPlay()
    self:Replicar("vida", self.OnRep_Vida)
end

function MiActor:OnRep_Vida(vidaAnterior)
    -- Se llama en clientes cuando vida cambia
    local vidaActual = self.vida
    
    -- Actualizar UI
    self:ActualizarUIVida(vidaActual)
    
    -- Reproducir efectos
    if vidaActual < vidaAnterior then
        self:PlayEffect("Damage")
    else
        self:PlayEffect("Heal")
    end
    
    -- Verificar muerte
    if vidaActual <= 0 then
        self:Morir()
    end
end
\`\`\`

**OnRep con parámetros:**
\`\`\`lua
function MiActor:OnRep_Vida(vidaAnterior)
    local cambio = self.vida - vidaAnterior
    print("Vida cambió en: " .. cambio)
end
\`\`\``,
        codeExamples: [
          {
            title: "OnRep completo",
            code: `local Personaje = {}

function Personaje:BeginPlay()
    self.vida = 100
    self.vidaAnterior = 100
    
    self:Replicar("vida", function()
        self:OnRep_Vida(self.vidaAnterior)
    end)
end

function Personaje:OnRep_Vida(vidaAnterior)
    local vidaActual = self.vida
    self.vidaAnterior = vidaActual
    
    -- Actualizar UI
    if self.UIVida then
        self.UIVida:SetText(vidaActual .. " / 100")
    end
    
    -- Efectos visuales
    if vidaActual < vidaAnterior then
        local daño = vidaAnterior - vidaActual
        self:MostrarFlotante("-" .. daño)
        self:PlaySonido("Hit")
    else
        local cura = vidaActual - vidaAnterior
        self:MostrarFlotante("+" .. cura)
        self:PlaySonido("Heal")
    end
    
    -- Verificar muerte
    if vidaActual <= 0 and vidaAnterior > 0 then
        self:Morir()
    end
end

return Personaje`,
            language: "lua",
            description: "OnRep para actualizar UI y efectos.",
          },
        ],
      },
      {
        heading: "Optimización de Ancho de Banda",
        content: `**Técnicas de optimización:**

**1. Reducir frecuencia:**
\`\`\`lua
-- Variables que cambian poco
self:SetNetUpdateFrequency(10)  -- 10 veces/segundo

-- Variables críticas
self:SetNetUpdateFrequency(100)  -- 100 veces/segundo
\`\`\`

**2. Comprimir datos:**
\`\`\`lua
-- En vez de float (32 bits), usar uint16 (16 bits)
self.vidaComprimida = math.floor(self.vida * 100)

-- En vez de vector completo, enviar solo yaw
self.rotacionYaw = self:GetActorRotation().Yaw
\`\`\`

**3. No replicar innecesariamente:**
\`\`\`lua
-- Solo en servidor
if self:EsAuthority() then
    self.datosInternos = valor  -- No replicar
end

-- Solo para dueño
self:ReplicarSoloDuenio("inputBuffer")
\`\`\``,
        codeExamples: [
          {
            title: "Optimizar replicación",
            code: `local Optimizacion = {}

function Optimizacion:ConfigurarReplicacion(actor)
    -- Alta prioridad (jugador)
    actor:SetNetUpdateFrequency(100)
    actor:SetNetCullDistanceSquared(15000^2)
    
    -- Media prioridad (NPCs importantes)
    -- actor:SetNetUpdateFrequency(50)
    
    -- Baja prioridad (objetos decorativos)
    -- actor:SetNetUpdateFrequency(10)
end

function Optimizacion:ComprimirVector(vector)
    -- Enviar solo X e Y si Z no es importante
    return {x = vector.X, y = vector.Y}
end

function Optimizacion:ComprimirRotacion(rotacion)
    -- Enviar solo yaw (0-360) en 16 bits
    return math.floor(rotacion.Yaw * 100)
end

function Optimizacion:DescomprimirRotacion(valor)
    return valor / 100
end

return Optimizacion`,
            language: "lua",
            description: "Técnicas para optimizar ancho de banda.",
          },
        ],
      },
    ],
    summary: `Replicar propiedades con Replicar(). OnRep notifica cambios en clientes. Replicar solo si cambia. Optimizar con frecuencia reducida y compresión de datos.`,
  },
  examples: [],
  interactive: {
    title: "Simula Replicación",
    description: "Variable se replica cuando cambia",
    starterCode: `local Servidor = {
    vida = 100
}

local Cliente = {
    vida = 100
}

function Servidor:RecibirDaño(cantidad)
    local vidaAnterior = self.vida
    self.vida = self.vida - cantidad
    
    -- Replicar si cambió
    if self.vida ~= vidaAnterior then
        self:Replicar(Cliente)
    end
end

function Servidor:Replicar(cliente)
    cliente.vida = self.vida
    print("Cliente: Vida actualizada a " .. cliente.vida)
end

-- Probar
print("Servidor: Vida = " .. Servidor.vida)
Servidor:RecibirDaño(20)
Servidor:RecibirDaño(30)
Servidor:RecibirDaño(0)  -- No debería replicar`,
    environment: "lua",
    expectedOutput: "Servidor: Vida = 100",
  },
  miniExercise: {
    id: "mes-07-l02-ej1",
    lessonId: "mes-07-l02",
    title: "Sistema de Replicación con OnRep",
    instructions: `Crea replicación con notificación:

1. Servidor tiene vida=100, Cliente tiene vida=100
2. Función \`RecibirDaño(cantidad)\` en servidor
3. Cuando vida cambia, replica al cliente
4. Cliente tiene OnRep_Vida que imprime el cambio
5. Aplica 3 daños: 20, 30, 10

**Salida esperada:**
\`\`\`
Servidor: Vida 100 → 80
Cliente: OnRep_Vida(100) → 80
Servidor: Vida 80 → 50
Cliente: OnRep_Vida(80) → 50
Servidor: Vida 50 → 40
Cliente: OnRep_Vida(50) → 40
\`\`\``,
    starterCode: `local Servidor = {vida = 100}
local Cliente = {vida = 100}

function Servidor:RecibirDaño(cantidad)
    -- Implementar
end

function Cliente:OnRep_Vida(vidaAnterior)
    -- Implementar
end

-- Probar
Servidor:RecibirDaño(20)
Servidor:RecibirDaño(30)
Servidor:RecibirDaño(10)`,
    solution: `local Servidor = {vida = 100}
local Cliente = {vida = 100}

function Servidor:RecibirDaño(cantidad)
    local vidaAnterior = self.vida
    self.vida = self.vida - cantidad
    
    print("Servidor: Vida " .. vidaAnterior .. " → " .. self.vida)
    
    -- Replicar al cliente
    Cliente.vida = self.vida
    Cliente:OnRep_Vida(vidaAnterior)
end

function Cliente:OnRep_Vida(vidaAnterior)
    print("Cliente: OnRep_Vida(" .. vidaAnterior .. ") → " .. self.vida)
end

Servidor:RecibirDaño(20)
Servidor:RecibirDaño(30)
Servidor:RecibirDaño(10)`,
    tests: [
      { type: "output_contains", expected: "Servidor: Vida 100 → 80", message: "Primer daño" },
      { type: "output_contains", expected: "Cliente: OnRep_Vida(100) → 80", message: "Cliente recibe cambio" },
      { type: "output_contains", expected: "Vida 50 → 40", message: "Último daño" },
    ],
    hints: ["Guarda vidaAnterior antes de cambiar", "Replica asignando Cliente.vida = Servidor.vida", "Llama Cliente:OnRep_Vida(vidaAnterior)"],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: "Replicar con Replicar(). OnRep notifica cambios. Solo replicar si cambia. Optimizar frecuencia y comprimir datos.",
  resources: [],
  prerequisites: ["mes-07-l01"],
};

// ============================================
// LECCIÓN 7.3: RPCs
// ============================================

export const lesson03: Lesson = {
  id: "mes-07-l03",
  moduleId: "mes-07",
  lessonNumber: 3,
  title: "RPCs",
  description: "Server, Client, Multicast RPCs y cuándo usar cada tipo.",
  estimatedTime: 40,
  difficulty: "advanced",
  theory: {
    title: "RPCs",
    objectives: [
      "Entender tipos de RPCs",
      "Implementar Server RPCs para input",
      "Usar Client RPCs para feedback",
      "Aplicar Multicast para efectos",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "Tipos de RPCs",
        content: `**3 tipos principales:**

**1. Server RPC (Cliente → Servidor):**
\`\`\`lua
-- Cliente llama
function MiPersonaje:ServerSaltar()
    -- Servidor ejecuta
    self:AplicarSalto()
end
\`\`\`
**Uso:** Input del jugador, acciones validadas

**2. Client RPC (Servidor → Cliente específico):**
\`\`\`lua
-- Servidor llama
function MiPersonaje:ClientMostrarDaño(cantidad)
    -- Cliente muestra UI
    self:ActualizarUI(cantidad)
end
\`\`\`
**Uso:** Feedback individual, UI

**3. Multicast RPC (Servidor → Todos los clientes):**
\`\`\`lua
-- Servidor llama
function MiActor:MulticastExplotar()
    -- Todos reproducen efecto
    self:PlayEffect("Explosion")
end
\`\`\`
**Uso:** Efectos visuales, sonidos`,
        codeExamples: [
          {
            title: "Tipos de RPCs",
            code: `local RPCs = {}

-- Server RPC: Cliente pide acción
function RPCs:ServerAtacar(jugador, target)
    -- Validar en servidor
    if jugador:EnRango(target) then
        local daño = jugador:CalcularDaño()
        target:RecibirDaño(daño)
        
        -- Notificar a todos
        jugador:MulticastEfectoAtaque()
        
        -- Notificar solo al atacante
        jugador:ClientConfirmarAtaque(daño)
    end
end

-- Client RPC: Feedback individual
function RPCs:ClientMostrarMensaje(jugador, mensaje)
    -- Solo este cliente ve el mensaje
    jugador:MostrarEnPantalla(mensaje)
end

-- Multicast RPC: Todos ven
function RPCs:MulticastExplotar(actor, ubicacion)
    -- Todos los clientes reproducen efecto
    actor:SpawnEffecto("Explosion", ubicacion)
    actor:PlaySonido("Boom")
end

return RPCs`,
            language: "lua",
            description: "Ejemplos de los 3 tipos de RPCs.",
          },
        ],
      },
      {
        heading: "Server RPC - Input del Jugador",
        content: `**Flujo típico:**
\`\`\`lua
-- Cliente
function MiPersonaje:PresionarTeclaSalto()
    -- Predicción local (opcional)
    self:AplicarSalto()
    
    -- Enviar al servidor
    self:ServerSaltar()
end

-- Servidor
function MiPersonaje:ServerSaltar()
    -- Validar
    if self:PuedeSaltar() then
        -- Ejecutar
        self:AplicarSalto()
        
        -- Replicar a otros clientes
        self:MulticastSalto()
    else
        -- Corregir predicción
        self:CorregirPosicion()
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Server RPC para input",
            code: `local InputRPC = {}

function InputRPC:ServerMover(jugador, direccion)
    -- Validar movimiento
    if jugador:EsValido(direccion) then
        jugador:AplicarMovimiento(direccion)
    else
        -- Cliente tramposo, corregir
        jugador:CorregirPosicion()
    end
end

function InputRPC:ServerAtacar(jugador)
    -- Validar cooldown
    if jugador.tiempoUltimoAtaque >= jugador.cooldown then
        jugador:Atacar()
        jugador.tiempoUltimoAtaque = 0
    end
end

function InputRPC:ServerUsarItem(jugador, itemId)
    -- Validar item en inventario
    if jugador:TieneItem(itemId) then
        jugador:UsarItem(itemId)
    end
end

return InputRPC`,
            language: "lua",
            description: "Server RPCs para validar input.",
          },
        ],
      },
      {
        heading: "Client RPC - Feedback",
        content: `**Feedback individual:**
\`\`\`lua
-- Servidor llama después de validar
function MiPersonaje:ClientConfirmarAcccion(accion)
    -- Solo este cliente ve el feedback
    self:MostrarMensaje(accion .. " exitosa")
    self:PlaySonido("Confirm")
end

function MiPersonaje:ClientRecibirDaño(cantidad)
    -- Mostrar daño en UI
    self:ActualizarVida(self.vida - cantidad)
    self:MostrarFlotante("-" .. cantidad)
    self:PlaySonido("Hit")
    self:ShakeCamera()
end
\`\`\``,
        codeExamples: [
          {
            title: "Client RPCs",
            code: `local ClientRPCs = {}

function ClientRPCs:ClientMostrarNotificacion(jugador, titulo, mensaje)
    -- Solo este jugador ve la notificación
    jugador:MostrarUI("Notificacion", {
        titulo = titulo,
        mensaje = mensaje
    })
end

function ClientRPCs:ClientActualizarMision(jugador, misionId, progreso)
    -- Actualizar UI de misión
    jugador:ActualizarMisionUI(misionId, progreso)
end

function ClientRPCs:ClientReproducirSonido(jugador, sonido, volumen)
    -- Solo este jugador escucha
    jugador:PlaySonidoLocal(sonido, volumen)
end

function ClientRPCs:ClientVibrar(jugador, duracion, intensidad)
    -- Feedback háptico
    jugador:VibrarControl(duracion, intensidad)
end

return ClientRPCs`,
            language: "lua",
            description: "Client RPCs para feedback individual.",
          },
        ],
      },
      {
        heading: "Multicast RPC - Efectos",
        content: `**Todos los clientes ven:**
\`\`\`lua
-- Servidor llama
function MiActor:MulticastExplotar()
    -- Todos reproducen
    self:SpawnParticulas("Explosion")
    self:PlaySonido("Boom")
    self:ShakePantalla()
end

function MiActor:MulticastMorir()
    -- Todos ven la muerte
    self:PlayAnimacion("Death")
    self:SpawnParticulas("Sangre")
end
\`\`\`

**Importante:**
- No usar para lógica de juego
- Solo efectos visuales/sonoros
- Todos deben ver lo mismo`,
        codeExamples: [
          {
            title: "Multicast RPCs",
            code: `local MulticastRPCs = {}

function MulticastRPCs:MulticastEfectoAtaque(actor, tipo)
    -- Todos ven el ataque
    actor:PlayAnimacion("Attack_" .. tipo)
    actor:SpawnParticulas("Attack_" .. tipo)
end

function MulticastRPCs:MulticastImpacto(ubicacion, normal)
    -- Todos ven el impacto
    local efecto = Spawn("FX_Impact", ubicacion)
    efecto:SetRotation(normal:ToRotator())
end

function MulticastRPCs:MulticastGanador(jugador)
    -- Todos ven al ganador
    jugador:PlayAnimacion("Victory")
    jugador:SpawnParticulas("Confetti")
    
    -- Sonido global
    PlaySonidoGlobal("VictoryFanfare")
end

return MulticastRPCs`,
            language: "lua",
            description: "Multicast para efectos visibles por todos.",
          },
        ],
      },
    ],
    summary: `Server RPC: cliente→servidor para input validado. Client RPC: servidor→cliente para feedback individual. Multicast RPC: servidor→todos para efectos visuales/sonoros.`,
  },
  examples: [],
  interactive: {
    title: "Simula RPCs",
    description: "Diferencia entre tipos de RPC",
    starterCode: `local Servidor = {}
local Cliente1 = {nombre = "C1"}
local Cliente2 = {nombre = "C2"}

function Servidor:ServerRPC(accion)
    print("Servidor: Ejecutando " .. accion)
end

function Servidor:ClientRPC(cliente, mensaje)
    print(cliente.nombre .. " recibe: " .. mensaje)
end

function Servidor:MulticastRPC(mensaje)
    print("Todos reciben: " .. mensaje)
end

-- Probar
print("=== Server RPC ===")
Servidor:ServerRPC("Saltar")

print("\\n=== Client RPC ===")
Servidor:ClientRPC(Cliente1, "Daño recibido")

print("\\n=== Multicast RPC ===")
Servidor:MulticastRPC("¡Inicio del juego!")`,
    environment: "lua",
    expectedOutput: "Servidor: Ejecutando",
  },
  miniExercise: {
    id: "mes-07-l03-ej1",
    lessonId: "mes-07-l03",
    title: "Sistema de RPCs para Combate",
    instructions: `Crea un sistema de combate con RPCs:

1. Cliente llama ServerAtacar()
2. Servidor valida y aplica daño
3. Servidor llama MulticastEfecto() para todos
4. Servidor llama ClientConfirmar() solo al atacante
5. Imprime cada paso

**Salida esperada:**
\`\`\`
Cliente: ServerAtacar()
Servidor: Validando ataque...
Servidor: Ataque válido, aplicando 25 de daño
Todos: MulticastEfecto(Ataque)
Cliente: ClientConfirmar(25 daño)
\`\`\``,
    starterCode: `local Servidor = {}
local Cliente = {}

function Cliente:Atacar()
    print("Cliente: ServerAtacar()")
    Servidor:ServerAtacar(self)
end

function Servidor:ServerAtacar(cliente)
    -- Implementar validación y RPCs
end

function Servidor:MulticastEfecto(tipo)
    print("Todos: MulticastEfecto(" .. tipo .. ")")
end

function Servidor:ClientConfirmar(cliente, daño)
    print(cliente .. ": ClientConfirmar(" .. daño .. " daño)")
end

-- Probar
Cliente:Atacar()`,
    solution: `local Servidor = {}
local Cliente = {nombre = "Jugador1"}

function Cliente:Atacar()
    print("Cliente: ServerAtacar()")
    Servidor:ServerAtacar(self)
end

function Servidor:ServerAtacar(cliente)
    print("Servidor: Validando ataque...")
    
    -- Validar (siempre válido para este ejemplo)
    local daño = 25
    print("Servidor: Ataque válido, aplicando " .. daño .. " de daño")
    
    -- Multicast a todos
    self:MulticastEfecto("Ataque")
    
    -- Client al atacante
    self:ClientConfirmar(cliente.nombre, daño)
end

function Servidor:MulticastEfecto(tipo)
    print("Todos: MulticastEfecto(" .. tipo .. ")")
end

function Servidor:ClientConfirmar(cliente, daño)
    print(cliente .. ": ClientConfirmar(" .. daño .. " daño)")
end

Cliente:Atacar()`,
    tests: [
      { type: "output_contains", expected: "ServerAtacar()", message: "Cliente llama server" },
      { type: "output_contains", expected: "Validando ataque", message: "Servidor valida" },
      { type: "output_contains", expected: "MulticastEfecto", message: "Todos ven efecto" },
      { type: "output_contains", expected: "ClientConfirmar", message: "Atacante recibe confirmación" },
    ],
    hints: ["ServerAtacar recibe el cliente", "Valida y calcula daño", "Llama MulticastEfecto y ClientConfirmar"],
    xpReward: 55,
    difficulty: "advanced",
  },
  summary: "Server RPC para input validado. Client RPC para feedback individual. Multicast RPC para efectos de todos.",
  resources: [],
  prerequisites: ["mes-07-l02"],
};

// ============================================
// LECCIÓN 7.4: Sincronización
// ============================================

export const lesson04: Lesson = {
  id: "mes-07-l04",
  moduleId: "mes-07",
  lessonNumber: 4,
  title: "Sincronización",
  description: "Sincronizar posición, rotación, estado de animación y variables entre clientes.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Sincronización",
    objectives: [
      "Sincronizar posición y rotación",
      "Replicar estado de animación",
      "Sincronizar variables de juego",
      "Interpolar movimiento suave",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Sincronizar Posición",
        content: `**Servidor replica posición:**
\`\`\`lua
function MiPersonaje:BeginPlay()
    self:Replicar("ubicacion")
    self:Replicar("rotacion")
end

function MiPersonaje:Mover(direccion)
    if self:EsAuthority() then
        -- Servidor aplica movimiento
        local nuevaLoc = self:GetActorLocation() + direccion * self.velocidad
        self:SetActorLocation(nuevaLoc)
        -- Se replica automáticamente
    end
end
\`\`\`

**Cliente interpola:**
\`\`\`lua
function MiPersonaje:Tick(dt)
    if self:EsSimulado() then
        -- Interpolar hacia ubicación replicada
        local actual = self:GetActorLocation()
        local objetivo = self.ubicacionReplicada
        
        local interpolada = actual + (objetivo - actual) * 10 * dt
        self:SetActorLocation(interpolada)
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Sincronizar posición",
            code: `local Sincronizacion = {}

function Sincronizacion:PersonajeSimulado(personaje, dt)
    -- Interpolar posición
    local actual = personaje:GetActorLocation()
    local replicada = personaje.ubicacionReplicada
    
    if actual ~= replicada then
        local suavizado = 10  -- Mayor = más rápido
        local nueva = actual + (replicada - actual) * suavizado * dt
        personaje:SetActorLocation(nueva)
    end
    
    -- Interpolar rotación
    local rotActual = personaje:GetActorRotation()
    local rotReplicada = personaje.rotacionReplicada
    
    if rotActual ~= rotReplicada then
        local nuevaRot = personaje:LerpRotator(rotActual, rotReplicada, 5 * dt)
        personaje:SetActorRotation(nuevaRot)
    end
end

return Sincronizacion`,
            language: "lua",
            description: "Interpolación suave de posición y rotación.",
          },
        ],
      },
      {
        heading: "Estado de Animación",
        content: `**Replicar estado:**
\`\`\`lua
function MiPersonaje:BeginPlay()
    self:Replicar("estadoAnimacion")
    self:Replicar("velocidad")
    self:Replicar("enAire")
end

function MiPersonaje:ActualizarAnimacion()
    if self:EsAuthority() then
        -- Determinar estado
        if self.velocidad > 0 then
            self.estadoAnimacion = "Run"
        else
            self.estadoAnimacion = "Idle"
        end
        
        if self.enAire then
            self.estadoAnimacion = "Jump"
        end
    end
    -- Se replica a clientes
end
\`\`\`

**Clientes reproducen:**
\`\`\`lua
function MiPersonaje:OnRep_EstadoAnimacion()
    self:PlayAnimacion(self.estadoAnimacion)
end
\`\`\``,
        codeExamples: [
          {
            title: "Sincronizar animación",
            code: `local AnimacionRed = {}

function AnimacionRed:ReplicarEstado(personaje)
    if personaje:EsAuthority() then
        -- Calcular estado
        local velocidad = personaje:GetVelocity():Size2D()
        local enAire = not personaje:IsWalking()
        
        -- Determinar animación
        if enAire then
            personaje.estadoAnimacion = "Jump"
        elseif velocidad > 100 then
            personaje.estadoAnimacion = "Run"
        elseif velocidad > 0 then
            personaje.estadoAnimacion = "Walk"
        else
            personaje.estadoAnimacion = "Idle"
        end
        
        -- Replicar
        personaje:MarcarParaReplicacion("estadoAnimacion")
    end
end

function AnimacionRed:OnRep_EstadoAnimacion(personaje)
    -- Clientes reproducen animación
    personaje:PlayAnimacion(personaje.estadoAnimacion)
end

return AnimacionRed`,
            language: "lua",
            description: "Replicar y sincronizar estado de animación.",
          },
        ],
      },
      {
        heading: "Sincronizar Variables",
        content: `**Variables de juego:**
\`\`\`lua
function MiActor:BeginPlay()
    self:Replicar("puntuacion")
    self:Replicar("tiempoRestante")
    self:Replicar("rondaActual")
end

function MiActor:SumarPuntos(jugador, puntos)
    if self:EsAuthority() then
        jugador.puntuacion = jugador.puntuacion + puntos
        -- Se replica automáticamente
    end
end
\`\`\`

**Con notificación:**
\`\`\`lua
function MiActor:OnRep_Puntuacion(anterior)
    -- Actualizar UI
    self:ActualizarUIPuntuacion(self.puntuacion)
    
    -- Efectos si cambió
    if self.puntuacion > anterior then
        self:MostrarFlotante("+" .. (self.puntuacion - anterior))
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Sincronizar variables",
            code: `local VariablesRed = {}

function VariablesRed:ReplicarStats(jugador)
    jugador:Replicar("vida")
    jugador:Replicar("mana")
    jugador:Replicar("puntuacion")
    jugador:Replicar("nivel")
end

function VariablesRed:OnRep_Vida(jugador, anterior)
    -- Actualizar UI
    jugador:ActualizarUIVida(jugador.vida)
    
    -- Efectos
    if jugador.vida < anterior then
        jugador:MostrarDañoUI(anterior - jugador.vida)
    end
end

function VariablesRed:OnRep_Puntuacion(jugador, anterior)
    jugador:ActualizarUIPuntuacion(jugador.puntuacion)
    
    if jugador.puntuacion > anterior then
        jugador:MostrarFlotante("+" .. (jugador.puntuacion - anterior))
    end
end

return VariablesRed`,
            language: "lua",
            description: "Replicar stats con notificación UI.",
          },
        ],
      },
      {
        heading: "Interpolación Suave",
        content: `**Lerp para suavizar:**
\`\`\`lua
function MiActor:Tick(dt)
    if self:EsSimulado() then
        -- Posición
        local actual = self:GetActorLocation()
        local objetivo = self.ubicacionObjetivo
        
        -- Lerp: linear interpolation
        local t = dt * self.suavizado  -- 10 = rápido, 1 = lento
        local interpolada = actual + (objetivo - actual) * t
        
        self:SetActorLocation(interpolada)
        
        -- Rotación
        local rotActual = self:GetActorRotation()
        local rotObjetivo = self.rotacionObjetivo
        
        local nuevaRot = self:LerpRotator(rotActual, rotObjetivo, t)
        self:SetActorRotation(nuevaRot)
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Interpolación",
            code: `local Interpolacion = {}

function Interpolacion:LerpVector(a, b, t)
    return a + (b - a) * t
end

function Interpolacion:LerpRotator(a, b, t)
    local yaw = a.Yaw + (b.Yaw - a.Yaw) * t
    local pitch = a.Pitch + (b.Pitch - a.Pitch) * t
    local roll = a.Roll + (b.Roll - a.Roll) * t
    return {Yaw = yaw, Pitch = pitch, Roll = roll}
end

function Interpolacion:SuavizarMovimiento(actor, dt)
    local t = dt * 10  -- Suavizado
    
    -- Posición
    if actor.ubicacionActual and actor.ubicacionObjetivo then
        local nueva = self:LerpVector(
            actor.ubicacionActual,
            actor.ubicacionObjetivo,
            t
        )
        actor:SetActorLocation(nueva)
    end
    
    -- Rotación
    if actor.rotacionActual and actor.rotacionObjetivo then
        local nuevaRot = self:LerpRotator(
            actor.rotacionActual,
            actor.rotacionObjetivo,
            t
        )
        actor:SetActorRotation(nuevaRot)
    end
end

return Interpolacion`,
            language: "lua",
            description: "Funciones de interpolación para suavizar.",
          },
        ],
      },
    ],
    summary: `Replicar posición/rotación. Clientes interpolan con lerp. Sincronizar estado de animación. OnRep para actualizar UI.`,
  },
  examples: [],
  interactive: {
    title: "Simula Interpolación",
    description: "Suavizar movimiento entre puntos",
    starterCode: `local Actor = {
    actual = 0,
    objetivo = 100,
    suavizado = 0.1
}

function Actor:Lerp(a, b, t)
    return a + (b - a) * t
end

function Actor:Actualizar()
    self.actual = self:Lerp(self.actual, self.objetivo, self.suavizado)
    print("Posición: " .. math.floor(self.actual))
end

-- Simular 10 frames
for i = 1, 10 do
    Actor:Actualizar()
end`,
    environment: "lua",
    expectedOutput: "Posición:",
  },
  miniExercise: {
    id: "mes-07-l04-ej1",
    lessonId: "mes-07-l04",
    title: "Sincronizar Posición con Interpolación",
    instructions: `Crea sincronización suave:

1. Servidor tiene posicion=100
2. Cliente tiene posicion=0 (desincronizado)
3. Cliente interpola hacia posición del servidor
4. Usa lerp con t=0.1 por frame
5. Imprime posición cada frame por 5 frames

**Salida esperada:**
\`\`\`
Frame 1: Cliente en 10
Frame 2: Cliente en 19
Frame 3: Cliente en 26
Frame 4: Cliente en 33
Frame 5: Cliente en 40
\`\`\``,
    starterCode: `local Servidor = {posicion = 100}
local Cliente = {posicion = 0}

function Cliente:Interpolar(objetivo, t)
    -- Implementar lerp
end

function Cliente:Actualizar()
    -- Interpolar hacia posición del servidor
end

-- Simular 5 frames
for i = 1, 5 do
    Cliente:Actualizar()
    print("Frame " .. i .. ": Cliente en " .. math.floor(Cliente.posicion))
end`,
    solution: `local Servidor = {posicion = 100}
local Cliente = {posicion = 0}

function Cliente:Interpolar(objetivo, t)
    return self.posicion + (objetivo - self.posicion) * t
end

function Cliente:Actualizar()
    self.posicion = self:Interpolar(Servidor.posicion, 0.1)
end

for i = 1, 5 do
    Cliente:Actualizar()
    print("Frame " .. i .. ": Cliente en " .. math.floor(Cliente.posicion))
end`,
    tests: [
      { type: "output_contains", expected: "Frame 1: Cliente en 10", message: "Primer frame correcto" },
      { type: "output_contains", expected: "Frame 5: Cliente en 40", message: "Quinto frame correcto" },
    ],
    hints: ["Lerp: actual + (objetivo - actual) * t", "t = 0.1 para 10% por frame", "Objetivo es Servidor.posicion"],
    xpReward: 50,
    difficulty: "intermediate",
  },
  summary: "Replicar posición/rotación. Clientes interpolan con lerp. Sincronizar animación. OnRep para UI.",
  resources: [],
  prerequisites: ["mes-07-l03"],
};

// ============================================
// LECCIÓN 7.5: Lag Compensation
// ============================================

export const lesson05: Lesson = {
  id: "mes-07-l05",
  moduleId: "mes-07",
  lessonNumber: 5,
  title: "Lag Compensation",
  description: "Predicción de movimiento, reconciliación y compensación de latencia.",
  estimatedTime: 40,
  difficulty: "advanced",
  theory: {
    title: "Lag Compensation",
    objectives: [
      "Entender problemas de latencia",
      "Implementar predicción de movimiento",
      "Reconciliar predicciones incorrectas",
      "Compensar lag en disparos",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "Problemas de Latencia",
        content: `**Timeline con lag:**
\`\`\`
Cliente (t=0)    ──100ms──> Servidor
                    │
                    │ Procesa
                    │
Cliente (t=200) <──100ms──┘
\`\`\`

**Problemas comunes:**
- **Rubberbanding** - Cliente predice, servidor corrige
- **Hit registration** - Disparo parece acertar pero no
- **Teleporting** - Corrección brusca de posición

**Soluciones:**
1. Predicción de movimiento
2. Reconciliación de estado
3. Rewind para hitscan`,
        codeExamples: [
          {
            title: "Medir latencia",
            code: `local LatenciaUtils = {}

function LatenciaUtils:CalcularPing(cliente)
    local tiempoEnvio = cliente.ultimoTiempoEnvio
    local tiempoRespuesta = os.time()
    
    return (tiempoRespuesta - tiempoEnvio) * 1000  -- ms
end

function LatenciaUtils:EsLagAlto(ping)
    return ping > 150  -- ms
end

function LatenciaUtils:AjustarPorLag(accion, ping)
    -- Compensar según latencia
    if ping > 200 then
        return accion * 0.8  -- Reducir precisión
    elseif ping > 100 then
        return accion * 0.9
    end
    return accion
end

return LatenciaUtils`,
            language: "lua",
            description: "Utilidades para medir y compensar lag.",
          },
        ],
      },
      {
        heading: "Predicción de Movimiento",
        content: `**Cliente predice localmente:**
\`\`\`lua
function MiPersonaje:Mover(direccion)
    -- Predicción inmediata (sin esperar servidor)
    self:AplicarMovimiento(direccion)
    
    -- Guardar para reconciliación
    self:GuardarEstadoMovimiento(direccion)
    
    -- Enviar al servidor
    self:ServerMover(direccion)
end
\`\`\`

**Guardar estado:**
\`\`\`lua
function MiPersonaje:GuardarEstadoMovimiento(input)
    table.insert(self.bufferMovimientos, {
        tiempo = os.time(),
        input = input,
        ubicacion = self:GetActorLocation()
    })
    
    -- Mantener solo últimos 10
    if #self.bufferMovimientos > 10 then
        table.remove(self.bufferMovimientos, 1)
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Predicción de movimiento",
            code: `local Prediccion = {}

function Prediccion:GuardarInput(jugador, input)
    local estado = {
        tiempo = os.clock(),
        input = input,
        ubicacion = {jugador:GetActorLocation()},
        velocidad = jugador:GetVelocity()
    }
    
    table.insert(jugador.bufferInputs, estado)
    
    -- Limitar buffer
    if #jugador.bufferInputs > 20 then
        table.remove(jugador.bufferInputs, 1)
    end
end

function Prediccion:AplicarInput(jugador, input)
    -- Aplicar inmediatamente (predicción)
    jugador:AplicarMovimiento(input.direccion)
    
    -- Guardar para reconciliación
    self:GuardarInput(jugador, input)
end

return Prediccion`,
            language: "lua",
            description: "Guardar inputs para reconciliación.",
          },
        ],
      },
      {
        heading: "Reconciliación",
        content: `**Servidor corrige predicciones:**
\`\`\`lua
function MiPersonaje:ServerMover(input, tiempoCliente)
    -- Procesar input
    self:AplicarMovimiento(input)
    
    -- Enviar estado confirmado
    self:ClientConfirmarMovimiento({
        ubicacion = self:GetActorLocation(),
        tiempo = tiempoCliente
    })
end

function MiPersonaje:ClientConfirmarMovimiento(estadoConfirmado)
    -- Eliminar inputs antiguos del buffer
    self:EliminarInputsAnteriores(estadoConfirmado.tiempo)
    
    -- Verificar si predicción fue correcta
    local diferencia = self:GetActorLocation() - estadoConfirmado.ubicacion
    
    if diferencia:Size() > 5 then
        -- Corrección necesaria (rubberband)
        self:SetActorLocation(estadoConfirmado.ubicacion)
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Reconciliación",
            code: `local Reconciliacion = {}

function Reconciliacion:ClientConfirmar(jugador, estadoServidor)
    -- Eliminar inputs procesados
    jugador:EliminarInputsHasta(estadoServidor.tiempo)
    
    -- Comparar predicción con realidad
    local prediccion = jugador:GetActorLocation()
    local realidad = estadoServidor.ubicacion
    
    local diferencia = (realidad - prediccion):Size()
    
    if diferencia > 10 then
        -- Corrección brusca (lag alto)
        jugador:SetActorLocation(realidad)
        print("Corrección: " .. math.floor(diferencia) .. " unidades")
    elseif diferencia > 1 then
        -- Corrección suave
        jugador:SuavizarHacia(realidad, diferencia)
    end
    -- Si diferencia < 1, ignorar (dentro de tolerancia)
end

return Reconciliacion`,
            language: "lua",
            description: "Reconciliar predicción con estado del servidor.",
          },
        ],
      },
      {
        heading: "Rewind para Hit Registration",
        content: `**Compensar lag en disparos:**
\`\`\`lua
function Servidor:RecibirDisparo(jugador, direccion, tiempoCliente)
    -- Calcular lag
    local lag = (os.time() - tiempoCliente) * 1000  -- ms
    
    -- Rewind: mover jugadores atrás en el tiempo
    local estadosOriginales = {}
    for _, otro in ipairs(self.jugadores) do
        estadosOriginales[otro] = otro:GetActorLocation()
        otro:RewindTo(tiempoCliente)
    end
    
    -- Verificar hit con posiciones del pasado
    local hit = self:LineTrace(jugador, direccion)
    
    -- Restaurar posiciones
    for otro, ubicacion in pairs(estadosOriginales) do
        otro:SetActorLocation(ubicacion)
    end
    
    -- Aplicar daño si hit
    if hit then
        hit.actor:RecibirDaño(jugador.daño)
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Rewind system",
            code: `local RewindSystem = {}

function RewindSystem:GuardarEstados(jugadores)
    local estados = {}
    for _, j in ipairs(jugadores) do
        estados[j] = {
            ubicacion = {j:GetActorLocation()},
            tiempo = os.clock()
        }
    end
    return estados
end

function RewindSystem:RewindTo(jugador, tiempoObjetivo)
    -- Buscar estado más cercano al tiempo
    for _, estado in ipairs(jugador.historial) do
        if estado.tiempo <= tiempoObjetivo then
            jugador:SetActorLocation(estado.ubicacion)
            return
        end
    end
end

function RewindSystem:VerificarDisparo(servidor, jugador, direccion, tiempoCliente)
    -- Guardar estados actuales
    local estados = self:GuardarEstados(servidor.jugadores)
    
    -- Rewind todos al tiempo del disparo
    for _, j in ipairs(servidor.jugadores) do
        self:RewindTo(j, tiempoCliente)
    end
    
    -- Verificar hit
    local hit = servidor:LineTrace(jugador, direccion)
    
    -- Restaurar estados
    for j, estado in pairs(estados) do
        j:SetActorLocation(estado.ubicacion)
    end
    
    return hit
end

return RewindSystem`,
            language: "lua",
            description: "Sistema de rewind para hit registration.",
          },
        ],
      },
    ],
    summary: `Predicción: cliente aplica input localmente. Reconciliación: servidor corrige si diferencia grande. Rewind: compensar lag en disparos moviendo atrás en el tiempo.`,
  },
  examples: [],
  interactive: {
    title: "Simula Predicción",
    description: "Cliente predice, servidor corrige",
    starterCode: `local Cliente = {
    posicion = 0,
    buffer = {}
}

local Servidor = {
    posicion = 0
}

function Cliente:PredecirMovimiento(input)
    -- Predicción local inmediata
    self.posicion = self.posicion + input
    table.insert(self.buffer, self.posicion)
    print("Cliente predice: " .. self.posicion)
end

function Servidor:ConfirmarMovimiento(cliente, input)
    -- Servidor aplica
    self.posicion = self.posicion + input
    
    -- Enviar confirmación
    cliente.posicionServidor = self.posicion
    print("Servidor confirma: " .. self.posicion)
end

-- Probar
Cliente:PredecirMovimiento(10)
Servidor:ConfirmarMovimiento(Cliente, 10)

print("Diferencia: " .. math.abs(Cliente.posicion - Cliente.posicionServidor))`,
    environment: "lua",
    expectedOutput: "Cliente predice",
  },
  miniExercise: {
    id: "mes-07-l05-ej1",
    lessonId: "mes-07-l05",
    title: "Sistema de Reconciliación",
    instructions: `Crea reconciliación con corrección:

1. Cliente tiene posicion=0, predice moviéndose +10 cada frame
2. Servidor confirma con 1 frame de delay
3. Si diferencia > 5, corregir posición del cliente
4. Imprime predicción, confirmación y corrección

**Salida esperada:**
\`\`\`
Frame 1: Predice 10, Servidor confirma 0
Frame 2: Predice 20, Servidor confirma 10
Frame 3: Predice 30, Servidor confirma 20
Diferencia: 10 → Corrigiendo a 20
\`\`\``,
    starterCode: `local Cliente = {posicion = 0}
local Servidor = {posicion = 0, delay = 0}

function Cliente:Predecir()
    -- Implementar
end

function Servidor:Confirmar()
    -- Implementar con delay
end

function Reconciliar()
    -- Verificar diferencia y corregir
end

-- Simular 3 frames
for i = 1, 3 do
    Cliente:Predecir()
    Servidor:Confirmar()
end

Reconciliar()`,
    solution: `local Cliente = {posicion = 0}
local Servidor = {posicion = 0, delay = 0, buffer = {}}

function Cliente:Predecir()
    self.posicion = self.posicion + 10
    print("Frame " .. (self.delay or 0) .. ": Predice " .. self.posicion .. ", Servidor confirma " .. Servidor.posicion)
end

function Servidor:Confirmar()
    table.insert(self.buffer, self.posicion)
    self.posicion = self.posicion + 10
end

function Reconciliar()
    local diferencia = Cliente.posicion - Servidor.posicion
    print("Diferencia: " .. diferencia)
    
    if math.abs(diferencia) > 5 then
        print("→ Corrigiendo a " .. Servidor.posicion)
        Cliente.posicion = Servidor.posicion
    end
end

-- Simular
for i = 1, 3 do
    Cliente.delay = i
    Cliente:Predecir()
    Servidor:Confirmar()
end

Reconciliar()`,
    tests: [
      { type: "output_contains", expected: "Predice 30", message: "Tercera predicción" },
      { type: "output_contains", expected: "Diferencia: 10", message: "Diferencia calculada" },
      { type: "output_contains", expected: "Corrigiendo", message: "Corrección aplicada" },
    ],
    hints: ["Cliente suma 10 cada frame", "Servidor confirma con delay", "Si diferencia > 5, corregir"],
    xpReward: 60,
    difficulty: "advanced",
  },
  summary: "Predicción local inmediata. Reconciliación con corrección si diferencia grande. Rewind para hitscan compensando lag.",
  resources: [],
  prerequisites: ["mes-07-l04"],
};

// ============================================
// LECCIÓN 7.6: Proyecto Mini-juego
// ============================================

export const lesson06: Lesson = {
  id: "mes-07-l06",
  moduleId: "mes-07",
  lessonNumber: 6,
  title: "Proyecto: Mini-juego 2 Jugadores",
  description: "Implementa un juego completo con movimiento, acciones y sincronización entre 2 jugadores.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Proyecto: Mini-juego 2 Jugadores",
    objectives: [
      "Integrar todos los conceptos de red",
      "Implementar juego 1v1 funcional",
      "Sincronizar movimiento y acciones",
      "Manejar win condition",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Arquitectura del Juego",
        content: `**Componentes:**
\`\`\`
┌─────────────────┐
│    SERVIDOR     │
│  - GameMode     │
│  - Validación   │
│  - Win Check    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───┴───┐ ┌───┴───┐
│J1     │ │J2     │
│- Move │ │- Move │
│- Jump │ │- Jump │
│- Atk  │ │- Atk  │
└───────┘ └───────┘
\`\`\`

**Flujo:**
1. Clientes envían input (Server RPC)
2. Servidor valida y aplica
3. Servidor replica estado
4. Clientes interpolan
5. Servidor verifica win condition
6. Multicast resultado`,
        codeExamples: [
          {
            title: "GameMode 1v1",
            code: `local GameMode1v1 = {}

function GameMode1v1:BeginPlay()
    self.jugadores = {}
    self.juegoActivo = false
    self.maxJugadores = 2
end

function GameMode1v1:PostLogin(jugador)
    table.insert(self.jugadores, jugador)
    
    if #self.jugadores >= 2 then
        self:IniciarJuego()
    end
end

function GameMode1v1:IniciarJuego()
    self.juegoActivo = true
    self:MulticastInicioJuego()
end

function GameMode1v1:VerificarVictoria()
    for _, j in ipairs(self.jugadores) do
        if j.vida <= 0 then
            self:FinalizarJuego(j.oponente)
        end
    end
end

function GameMode1v1:FinalizarJuego(ganador)
    self.juegoActivo = false
    self:MulticastFinJuego(ganador)
end

return GameMode1v1`,
            language: "lua",
            description: "GameMode para juego 1v1.",
          },
        ],
      },
      {
        heading: "Implementación Completa",
        content: `**Código final integrado:**
\`\`\`lua
local Jugador = {}

function Jugador:BeginPlay()
    -- Stats
    self.vida = 100
    self.vidaMax = 100
    self.daño = 25
    
    -- Movimiento
    self.velocidad = 300
    self.fuerzaSalto = 500
    
    -- Replicación
    self:Replicar("vida", self.OnRep_Vida)
    self:Replicar("ubicacion")
end

function Jugador:ServerMover(direccion)
    if self:EsAuthority() then
        self:Mover(direccion)
    end
end

function Jugador:ServerSaltar()
    if self:EsAuthority() and self:PuedeSaltar() then
        self:Saltar()
        self:MulticastSalto()
    end
end

function Jugador:ServerAtacar()
    if self:EsAuthority() then
        local objetivo = self:ObtenerObjetivo()
        if objetivo and self:EnRango(objetivo) then
            objetivo:RecibirDaño(self.daño)
            self:MulticastAtaque()
        end
    end
end

function Jugador:RecibirDaño(cantidad)
    if self:EsAuthority() then
        self.vida = self.vida - cantidad
        self:ClientRecibirDaño(cantidad)
        
        if self.vida <= 0 then
            self:Morir()
        end
    end
end

return Jugador
\`\`\``,
        codeExamples: [
          {
            title: "Jugador completo",
            code: `local JugadorMultijugador = {}

function JugadorMultijugador:BeginPlay()
    self.vida = 100
    self.vidaMax = 100
    self.puntuacion = 0
    
    self:Replicar("vida")
    self:Replicar("ubicacion")
end

function JugadorMultijugador:ServerMover(direccion)
    if self:EsAuthority() then
        local nuevaLoc = self:GetActorLocation() + direccion * self.velocidad
        self:SetActorLocation(nuevaLoc)
    end
end

function JugadorMultijugador:ServerAtacar()
    if self:EsAuthority() then
        -- Buscar enemigo cercano
        local enemigo = self:BuscarEnemigoCercano(300)
        
        if enemigo then
            enemigo:RecibirDaño(25)
            self.puntuacion = self.puntuacion + 10
            self:MulticastEfectoAtaque()
        end
    end
end

function JugadorMultijugador:RecibirDaño(cantidad)
    if self:EsAuthority() then
        self.vida = math.max(0, self.vida - cantidad)
        self:ClientMostrarDaño(cantidad)
        
        if self.vida == 0 then
            self:Morir()
        end
    end
end

function JugadorMultijugador:ClientMostrarDaño(cantidad)
    self:ActualizarUIVida(self.vida)
    self:MostrarFlotante("-" .. cantidad)
    self:PlaySonido("Hit")
end

return JugadorMultijugador`,
            language: "lua",
            description: "Clase Jugador completa para multijugador.",
          },
        ],
      },
    ],
    summary: `GameMode 1v1 con validación server. Jugador con Server RPCs para input. Replicar vida/posición. Client RPCs para feedback. Multicast para efectos.`,
  },
  examples: [],
  interactive: {
    title: "Simula Juego 1v1",
    description: "Dos jugadores combaten",
    starterCode: `local Jugador1 = {vida = 100, daño = 25, nombre = "J1"}
local Jugador2 = {vida = 100, daño = 25, nombre = "J2"}

function Jugador1:Atacar(objetivo)
    print(self.nombre .. " ataca a " .. objetivo.nombre)
    objetivo:RecibirDaño(self.daño)
end

function Jugador2:RecibirDaño(cantidad)
    self.vida = self.vida - cantidad
    print(self.nombre .. " recibe " .. cantidad .. " daño, vida: " .. self.vida)
    
    if self.vida <= 0 then
        print("¡" .. self.nombre .. " ha sido derrotado!")
    end
end

-- Simular combate
Jugador1:Atacar(Jugador2)
Jugador1:Atacar(Jugador2)
Jugador1:Atacar(Jugador2)
Jugador1:Atacar(Jugador2)`,
    environment: "lua",
    expectedOutput: "J1 ataca",
  },
  miniExercise: {
    id: "mes-07-l06-ej1",
    lessonId: "mes-07-l06",
    title: "Combate 1v1 Multijugador",
    instructions: `Crea un mini-juego 1v1:

1. J1 y J2 con vida=100, daño=25
2. Turnos alternados: J1 ataca, J2 ataca
3. Cada ataque reduce vida
4. Cuando vida <= 0, imprimir ganador
5. Simular hasta que alguien gane

**Salida esperada:**
\`\`\`
J1 ataca a J2 → J2 tiene 75 HP
J2 ataca a J1 → J1 tiene 75 HP
J1 ataca a J2 → J2 tiene 50 HP
J2 ataca a J1 → J1 tiene 50 HP
J1 ataca a J2 → J2 tiene 25 HP
J2 ataca a J1 → J1 tiene 25 HP
J1 ataca a J2 → J2 tiene 0 HP
¡J1 gana!
\`\`\``,
    starterCode: `local J1 = {vida = 100, daño = 25, nombre = "J1"}
local J2 = {vida = 100, daño = 25, nombre = "J2"}

function Atacar(atacante, defensor)
    -- Implementar
end

-- Simular combate por turnos
while J1.vida > 0 and J2.vida > 0 do
    Atacar(J1, J2)
    if J2.vida > 0 then
        Atacar(J2, J1)
    end
end`,
    solution: `local J1 = {vida = 100, daño = 25, nombre = "J1"}
local J2 = {vida = 100, daño = 25, nombre = "J2"}

function Atacar(atacante, defensor)
    defensor.vida = defensor.vida - atacante.daño
    print(atacante.nombre .. " ataca a " .. defensor.nombre .. " → " .. 
          defensor.nombre .. " tiene " .. defensor.vida .. " HP")
    
    if defensor.vida <= 0 then
        print("¡" .. atacante.nombre .. " gana!")
    end
end

while J1.vida > 0 and J2.vida > 0 do
    Atacar(J1, J2)
    if J2.vida > 0 then
        Atacar(J2, J1)
    end
end`,
    tests: [
      { type: "output_contains", expected: "J1 ataca a J2", message: "J1 ataca" },
      { type: "output_contains", expected: "tiene 0 HP", message: "Vida llega a 0" },
      { type: "output_contains", expected: "gana!", message: "Hay ganador" },
    ],
    hints: ["defensor.vida -= atacante.daño", "Verificar vida <= 0 después de cada ataque", "Alternar turnos"],
    xpReward: 55,
    difficulty: "intermediate",
  },
  summary: "GameMode 1v1. Server RPCs para input. Replicar vida/posición. Client/Multicast para feedback. Verificar win condition.",
  resources: [],
  prerequisites: ["mes-07-l05"],
};

// Exportar todas las lecciones del módulo 7
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
];
