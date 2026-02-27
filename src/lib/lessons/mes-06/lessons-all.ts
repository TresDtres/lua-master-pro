/**
 * Módulo 6: IA de NPCs - Todas las lecciones completas
 * Desmitificando la "IA" - son solo sistemas lógicos
 */

import { Lesson } from "@/types/lesson";

// ============================================
// LECCIÓN 6.1: FSM (Máquinas de Estado Finito)
// ============================================

export const lesson01: Lesson = {
  id: "mes-06-l01",
  moduleId: "mes-06",
  lessonNumber: 1,
  title: "FSM (Máquinas de Estado Finito)",
  description: "Estados, transiciones, guards y implementación de FSM para NPCs.",
  estimatedTime: 40,
  difficulty: "intermediate",
  theory: {
    title: "FSM (Máquinas de Estado Finito)",
    objectives: [
      "Entender qué es una FSM y por qué se usa en IA",
      "Implementar estados básicos (Idle, Patrol, Chase, Attack)",
      "Crear transiciones entre estados",
      "Usar guards para condiciones de transición",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "¿Qué es una FSM?",
        content: `**FSM (Finite State Machine)** es un modelo de comportamiento con:
- **Estados finitos** - Situaciones discretas (Idle, Patrol, Chase, Attack)
- **Transiciones** - Cambios entre estados
- **Guards** - Condiciones para permitir transiciones

**Diagrama típico de NPC:**
\`\`\`
     ┌─────────┐
     │  IDLE   │◄────────────────┐
     └────┬────┘                 │
          │ ve jugador           │ pierde jugador
          ▼                      │
     ┌─────────┐     ataca       │
     │  CHASE  │─────────────┐   │
     └────┬────┘             │   │
          │ cerca            │   │ pierde visión
          ▼                  ▼   │
     ┌─────────┐         ┌─────────┐
     │  ATTACK │         │  PATROL │
     └─────────┘         └─────────┘
\`\`\`

**No es IA "real"** - es lógica condicional estructurada:
\`\`\`lua
if veJugador and distancia < 100 then
    estado = "CHASE"
elseif estado == "CHASE" and distancia > 500 then
    estado = "PATROL"
end
\`\`\``,
        codeExamples: [
          {
            title: "FSM básica",
            code: `local FSM = {}
FSM.__index = FSM

function FSM.new()
    local self = setmetatable({}, FSM)
    self.estado = "IDLE"
    return self
end

function FSM:Actualizar(dt, contexto)
    if self.estado == "IDLE" then
        self:EstadoIdle(contexto)
    elseif self.estado == "PATROL" then
        self:EstadoPatrol(contexto)
    elseif self.estado == "CHASE" then
        self:EstadoChase(contexto)
    elseif self.estado == "ATTACK" then
        self:EstadoAttack(contexto)
    end
end

function FSM:EstadoIdle(ctx)
    -- Transición a patrol después de 5 segundos
    if self.tiempoIdle > 5 then
        self.estado = "PATROL"
    end
end

function FSM:EstadoChase(ctx)
    if ctx.veJugador then
        self:Perseguir(ctx.jugador)
    else
        self.estado = "IDLE"
    end
end

return FSM`,
            language: "lua",
            description: "Estructura básica de FSM con 4 estados.",
          },
        ],
      },
      {
        heading: "Implementación de Estados",
        content: `**Cada estado tiene 3 funciones:**
\`\`\`lua
function FSM:EntrarEstado(estado)
    self.estadoAnterior = self.estado
    self.estado = estado
    self.tiempoEnEstado = 0
    
    -- Setup específico del estado
    if estado == "CHASE" then
        self.velocidad = self.velocidadMax
    end
end

function FSM:ActualizarEstado(dt, contexto)
    -- Lógica del estado actual
    if self.estado == "PATROL" then
        self:PatrolUpdate(dt)
    end
    
    -- Verificar transiciones
    self:VerificarTransiciones(contexto)
end

function FSM:SalirEstado(estado)
    -- Cleanup al salir
    if estado == "ATTACK" then
        self:StopAttack()
    end
end
\`\`\`

**Estados comunes:**
- **Idle** - Espera, animación idle
- **Patrol** - Ruta predefinida
- **Chase** - Perseguir jugador
- **Attack** - Animación de ataque
- **Flee** - Huir si vida baja
- **Alert** - Sospecha, busca`,
        codeExamples: [
          {
            title: "Estados completos",
            code: `local NPC_FSM = {}

function NPC_FSM:EntrarEstado(nuevoEstado)
    print("Cambiando a: " .. nuevoEstado)
    
    if nuevoEstado == "IDLE" then
        self:StopMovement()
        self:PlayAnimation("Idle")
    elseif nuevoEstado == "PATROL" then
        self.siguientePunto = 1
        self:IrAPunto(self.puntosPatrol[1])
    elseif nuevoEstado == "CHASE" then
        self.velocidad = 300
        self:PlayAnimation("Run")
    elseif nuevoEstado == "ATTACK" then
        self.velocidad = 0
        self:PlayAnimation("Attack")
    end
    
    self.estado = nuevoEstado
end

function NPC_FSM:ActualizarEstado(dt, ctx)
    if self.estado == "PATROL" then
        self:ActualizarPatrol(dt)
    elseif self.estado == "CHASE" then
        self:ActualizarChase(dt, ctx)
    elseif self.estado == "ATTACK" then
        self:ActualizarAttack(dt, ctx)
    end
    
    self:VerificarTransiciones(ctx)
end

return NPC_FSM`,
            language: "lua",
            description: "Implementación completa de entrada/salida de estados.",
          },
        ],
      },
      {
        heading: "Transiciones y Guards",
        content: `**Guards son condiciones booleanas:**
\`\`\`lua
function FSM:VerificarTransiciones(ctx)
    -- Guards para cada transición
    if self.estado == "IDLE" then
        if self:Guard_VeJugador(ctx) then
            self:EntrarEstado("CHASE")
        elseif self:Guard_TiempoIdle() then
            self:EntrarEstado("PATROL")
        end
    end
    
    if self.estado == "CHASE" then
        if self:Guard_JugadorCerca(ctx) then
            self:EntrarEstado("ATTACK")
        elseif self:Guard_PierdeJugador(ctx) then
            self:EntrarEstado("IDLE")
        end
    end
    
    if self.estado == "ATTACK" then
        if self:Guard_JugadorLejos(ctx) then
            self:EntrarEstado("CHASE")
        elseif self:Guard_VidaBaja() then
            self:EntrarEstado("FLEE")
        end
    end
end

-- Guards individuales
function FSM:Guard_VeJugador(ctx)
    return ctx.veJugador and ctx.distancia < 500
end

function FSM:Guard_JugadorCerca(ctx)
    return ctx.distancia < 100
end

function FSM:Guard_VidaBaja()
    return self.vida < self.vidaMax * 0.3
end
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de guards",
            code: `local Guards = {}

function Guards:VeJugador(npc, jugador)
    -- Raycast para línea de visión
    local hit = npc:LineTrace(npc:GetLocation(), jugador:GetLocation())
    return hit and hit.actor == jugador
end

function Guards:Escucha(npc, sonido)
    local distancia = npc:GetDistanceTo(sonido)
    return distancia < npc.rangoAudicion
end

function Guards:VidaBaja(npc, porcentaje)
    return npc.vida < npc.vidaMax * porcentaje
end

function Guards:JugadorEnRango(npc, jugador, rango)
    return npc:GetDistanceTo(jugador) < rango
end

-- Uso en FSM
function FSM:VerificarTransiciones(ctx)
    if self.estado == "PATROL" then
        if Guards:VeJugador(self, ctx.jugador) then
            self:EntrarEstado("ALERT")
        end
    end
    
    if self.estado == "ALERT" then
        if Guards:JugadorEnRango(self, ctx.jugador, 500) then
            self:EntrarEstado("CHASE")
        else
            self:EntrarEstado("PATROL")
        end
    end
end

return Guards`,
            language: "lua",
            description: "Sistema de guards reutilizables para transiciones.",
          },
        ],
      },
    ],
    summary: `FSM son estados finitos con transiciones. Estados comunes: Idle, Patrol, Chase, Attack, Flee. Guards son condiciones booleanas para transiciones. No es IA real, es lógica condicional estructurada.`,
  },
  examples: [],
  interactive: {
    title: "Simula FSM Simple",
    description: "Crea FSM con 3 estados",
    starterCode: `local FSM = {
    estado = "IDLE",
    tiempo = 0
}

function FSM:Actualizar(dt)
    self.tiempo = self.tiempo + dt
    
    if self.estado == "IDLE" then
        print("Estado: IDLE")
        if self.tiempo > 3 then
            self.estado = "PATROL"
            self.tiempo = 0
        end
    elseif self.estado == "PATROL" then
        print("Estado: PATROL (moviendo)")
        if self.tiempo > 5 then
            self.estado = "IDLE"
            self.tiempo = 0
        end
    end
end

-- Simular 10 segundos
for i = 1, 10 do
    FSM:Actualizar(1)
end`,
    environment: "lua",
    expectedOutput: "Estado: IDLE",
  },
  miniExercise: {
    id: "mes-06-l01-ej1",
    lessonId: "mes-06-l01",
    title: "FSM de Guardia",
    instructions: `Crea una FSM para un guardia:

1. Estados: IDLE, ALERT, CHASE
2. Inicia en IDLE
3. Después de 5 segundos en IDLE → ALERT
4. Si ve jugador en ALERT → CHASE
5. Si no ve jugador en CHASE por 3 segundos → ALERT
6. Imprime cada cambio de estado

**Salida esperada:**
\`\`\`
[0s] Estado: IDLE
[5s] → ALERT
[6s] Ve jugador → CHASE
[9s] Pierde jugador → ALERT
\`\`\``,
    starterCode: `local Guardia = {
    estado = "IDLE",
    tiempo = 0,
    veJugador = false
}

function Guardia:Actualizar(dt)
    self.tiempo = self.tiempo + dt
    
    if self.estado == "IDLE" then
        -- Implementar
    elseif self.estado == "ALERT" then
        -- Implementar
    elseif self.estado == "CHASE" then
        -- Implementar
    end
    
    print("[" .. math.floor(self.tiempo) .. "s] Estado: " .. self.estado)
end

-- Simular
Guardia:Actualizar(5)  -- IDLE por 5s
Guardia.veJugador = true
Guardia:Actualizar(1)  -- Debería cambiar a CHASE
Guardia.veJugador = false
Guardia:Actualizar(3)  -- Debería volver a ALERT`,
    solution: `local Guardia = {
    estado = "IDLE",
    tiempo = 0,
    tiempoEnEstado = 0
}

function Guardia:Actualizar(dt)
    self.tiempo = self.tiempo + dt
    self.tiempoEnEstado = self.tiempoEnEstado + dt
    
    if self.estado == "IDLE" then
        if self.tiempoEnEstado >= 5 then
            self.estado = "ALERT"
            self.tiempoEnEstado = 0
            print("[" .. math.floor(self.tiempo) .. "s] → ALERT")
        end
    elseif self.estado == "ALERT" then
        if self.veJugador then
            self.estado = "CHASE"
            self.tiempoEnEstado = 0
            print("[" .. math.floor(self.tiempo) .. "s] Ve jugador → CHASE")
        end
    elseif self.estado == "CHASE" then
        if not self.veJugador and self.tiempoEnEstado >= 3 then
            self.estado = "ALERT"
            self.tiempoEnEstado = 0
            print("[" .. math.floor(self.tiempo) .. "s] Pierde jugador → ALERT")
        end
    end
    
    print("[" .. math.floor(self.tiempo) .. "s] Estado: " .. self.estado)
end

Guardia:Actualizar(5)
Guardia.veJugador = true
Guardia:Actualizar(1)
Guardia.veJugador = false
Guardia:Actualizar(3)`,
    tests: [
      { type: "output_contains", expected: "→ ALERT", message: "Debe cambiar a ALERT" },
      { type: "output_contains", expected: "→ CHASE", message: "Debe cambiar a CHASE" },
      { type: "output_contains", expected: "Pierde jugador", message: "Debe detectar pérdida" },
    ],
    hints: ["Usa tiempoEnEstado para contar en cada estado", "Verifica veJugador para transiciones", "Reset tiempoEnEstado al cambiar estado"],
    xpReward: 50,
    difficulty: "intermediate",
  },
  summary: "FSM: estados finitos + transiciones + guards. Idle→Patrol→Chase→Attack. Guards son condiciones booleanas. Lógica condicional estructurada, no IA mágica.",
  resources: [
    { title: "Finite State Machines in Games", url: "https://gamedevelopment.tutsplus.com/series/finite-state-machines-for-game-development--gamedev-11866", type: "article" },
  ],
  prerequisites: ["mes-05-l06"],
};

// ============================================
// LECCIÓN 6.2: Percepción
// ============================================

export const lesson02: Lesson = {
  id: "mes-06-l02",
  moduleId: "mes-06",
  lessonNumber: 2,
  title: "Percepción",
  description: "Raycast, campo de visión (FOV), audición y detección de jugador.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Percepción",
    objectives: [
      "Implementar línea de visión con Raycast",
      "Crear campo de visión (FOV) limitado",
      "Sistema de audición para sonidos",
      "Combinar visión y audición para detección",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Línea de Visión (Raycast)",
        content: `**Raycast detecta si hay línea directa:**
\`\`\`lua
function NPC:VeObjetivo(objetivo)
    local origen = self:GetEyeLocation()
    local destino = objetivo:GetLocation()
    
    -- Trazar rayo
    local hit = self:LineTrace(origen, destino)
    
    -- Verificar si hit es el objetivo
    if hit and hit.actor == objetivo then
        return true
    end
    
    return false  -- Obstáculo en el camino
end
\`\`\`

**Consideraciones:**
- **Origen**: Ojos del NPC, no pies
- **Destino**: Centro del jugador
- **Ignorar**: El propio NPC, aliados
- **Debug**: Dibujar línea para verificación`,
        codeExamples: [
          {
            title: "Raycast de visión",
            code: `local Vision = {}

function Vision:VerificarLineaVision(npc, objetivo)
    local origen = npc:GetEyeLocation()
    local destino = objetivo:GetLocation()
    
    -- Configurar filtro
    local filtro = {
        Ignorar = {npc},
        Canales = {"Visibility"}
    }
    
    -- Trazar rayo
    local hit = npc:LineTraceSingle(origen, destino, filtro)
    
    if hit then
        -- Dibujar para debug
        npc:DrawDebugLine(origen, destino, hit.bHit and "Red" or "Green")
        
        -- Verificar si es el objetivo
        if hit.actor == objetivo then
            return true, hit
        end
    end
    
    return false
end

function Vision:TieneLineaVision(npc, objetivo)
    local ve, hit = self:VerificarLineaVision(npc, objetivo)
    
    if ve then
        -- Verificar distancia máxima
        local distancia = npc:GetDistanceTo(objetivo)
        return distancia < npc.rangoVision
    end
    
    return false
end

return Vision`,
            language: "lua",
            description: "Sistema de línea de visión con raycast.",
          },
        ],
      },
      {
        heading: "Campo de Visión (FOV)",
        content: `**FOV limita el ángulo visible:**
\`\`\`lua
function NPC:EstaEnFOV(objetivo, anguloFOV)
    -- Vector adelante del NPC
    local adelante = self:GetActorForwardVector()
    
    -- Dirección al objetivo
    local direccion = (objetivo:GetLocation() - self:GetLocation()):GetSafeNormal()
    
    -- Producto punto = cos(ángulo)
    local productoPunto = adelante:Dot(direccion)
    
    -- Ángulo en radianes
    local angulo = math.acos(productoPunto)
    
    -- Verificar si está dentro del FOV
    return angulo < (anguloFOV / 2)
end
\`\`\`

**FOV típicos:**
- **Humano**: 90-120 grados
- **Guardia alerta**: 120 grados
- **Monstruo**: 180 grados
- **Torreta**: 360 grados`,
        codeExamples: [
          {
            title: "Sistema de FOV",
            code: `local FOV = {}

function FOV:EstaEnCampoVision(npc, objetivo, anguloMax)
    -- Vector adelante del NPC
    local adelante = npc:GetActorForwardVector()
    
    -- Dirección hacia el objetivo
    local ubicacionObjetivo = objetivo:GetActorLocation()
    local ubicacionNPC = npc:GetActorLocation()
    local direccion = (ubicacionObjetivo - ubicacionNPC):GetSafeNormal()
    
    -- Producto punto
    local productoPunto = adelante:Dot(direccion)
    
    -- Convertir a ángulo (grados)
    local angulo = math.deg(math.acos(productoPunto))
    
    -- Verificar si está dentro del FOV
    return angulo < (anguloMax / 2), angulo
end

function FOV:ObtenerAnguloHacia(npc, objetivo)
    local adelante = npc:GetActorForwardVector()
    local direccion = (objetivo:GetLocation() - npc:GetLocation()):GetSafeNormal()
    
    local productoPunto = adelante:Dot(direccion)
    return math.deg(math.acos(productoPunto))
end

-- Uso
function NPC:PuedeVer(jugador)
    -- Primero verificar línea directa
    if not self:LineaVision(jugador) then
        return false
    end
    
    -- Luego verificar FOV
    local enFOV, angulo = FOV:EstaEnCampoVision(self, jugador, 90)
    
    if enFOV then
        print("Jugador en FOV con ángulo: " .. angulo)
        return true
    end
    
    return false
end

return FOV`,
            language: "lua",
            description: "Campo de visión con verificación de ángulo.",
          },
        ],
      },
      {
        heading: "Sistema de Audición",
        content: `**Audición detecta sonidos por distancia:**
\`\`\`lua
function NPC:Escuchar(sonido)
    local distancia = self:GetDistanceTo(sonido.origen)
    
    -- Sonidos más fuertes se escuchan más lejos
    local puedeEscuchar = distancia < (sonido.volumen * self.multiplicadorAudicion)
    
    if puedeEscuchar then
        self:Investigar(sonido.origen)
    end
end
\`\`\`

**Tipos de sonidos:**
- **Pasos**: volumen 10-20, corto alcance
- **Disparos**: volumen 100, largo alcance
- **Puertas**: volumen 30, medio alcance
- **Voz**: volumen 50, medio alcance

**Modificadores:**
- **NPC sordo**: multiplicador 0
- **NPC normal**: multiplicador 1
- **NPC alerta**: multiplicador 1.5
- **NPC con buff**: multiplicador 2`,
        codeExamples: [
          {
            title: "Sistema de audición",
            code: `local Audicion = {}

function Audicion:CrearSonido(origen, volumen, tipo)
    return {
        origen = origen,
        volumen = volumen,
        tipo = tipo or "generico",
        tiempo = 0
    }
end

function Audicion:PuedeEscuchar(npc, sonido)
    local distancia = npc:GetDistanceTo(sonido.origen)
    
    -- Modificadores por tipo
    local modificadores = {
        pasos = 1.0,
        disparo = 2.0,
        puerta = 1.5,
        voz = 1.2
    }
    
    local mod = modificadores[sonido.tipo] or 1.0
    
    -- NPC alerta escucha mejor
    if npc.estado == "ALERT" then
        mod = mod * 1.5
    end
    
    -- Verificar si puede escuchar
    local rango = sonido.volumen * npc.multiplicadorAudicion * mod
    
    return distancia <= rango, distancia / rango
end

function Audicion:InvestigarSonido(npc, sonido)
    if self:PuedeEscuchar(npc, sonido) then
        print("NPC escucha " .. sonido.tipo .. " a " .. 
              math.floor(npc:GetDistanceTo(sonido.origen)) .. " unidades")
        
        -- Cambiar a estado de investigación
        npc:Investigar(sonido.origen)
        return true
    end
    
    return false
end

return Audicion`,
            language: "lua",
            description: "Sistema de audición con tipos de sonidos y modificadores.",
          },
        ],
      },
      {
        heading: "Combinar Visión y Audición",
        content: `**Sistema de percepción completo:**
\`\`\`lua
function NPC:ActualizarPercepcion(dt)
    -- Resetear
    self.veJugador = false
    self.escuchaJugador = false
    
    -- Verificar visión
    if self:TieneLineaVision(self.jugador) and
       self:EstaEnFOV(self.jugador, 90) then
        self.veJugador = true
        self.ultimaPosicionConocida = self.jugador:GetLocation()
        self.tiempoSinVer = 0
    end
    
    -- Verificar audición
    for _, sonido in ipairs(self.sonidosRecientes) do
        if sonido.actor == self.jugador then
            if self:PuedeEscuchar(sonido) then
                self.escuchaJugador = true
                self.ultimaPosicionConocida = sonido.origen
            end
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Percepción combinada",
            code: `local Percepcion = {}

function Percepcion:Actualizar(npc, dt)
    npc.veJugador = false
    npc.escuchaJugador = false
    
    -- Verificar visión
    if npc.jugador then
        local ve = npc:LineaVision(npc.jugador)
        local enFOV = npc:EnFOV(npc.jugador, 90)
        
        if ve and enFOV then
            npc.veJugador = true
            npc.ultimaPosicionConocida = npc.jugador:GetLocation()
            npc.tiempoSinVer = 0
        end
    end
    
    -- Incrementar tiempo sin ver
    if not npc.veJugador then
        npc.tiempoSinVer = npc.tiempoSinVer + dt
    end
    
    -- Verificar sonidos
    for i = #npc.sonidos, 1, -1 do
        local sonido = npc.sonidos[i]
        sonido.tiempo = sonido.tiempo + dt
        
        if npc:Escuchar(sonido) then
            npc.escuchaJugador = true
            npc.ultimaPosicionConocida = sonido.origen
        end
        
        -- Eliminar sonidos viejos
        if sonido.tiempo > 2 then
            table.remove(npc.sonidos, i)
        end
    end
end

return Percepcion`,
            language: "lua",
            description: "Sistema completo combinando visión y audición.",
          },
        ],
      },
    ],
    summary: `Raycast para línea de visión. FOV con producto punto para ángulo. Audición por distancia y volumen. Combinar visión+audición para percepción completa.`,
  },
  examples: [],
  interactive: {
    title: "Simula Percepción",
    description: "Verifica si NPC ve jugador",
    starterCode: `local NPC = {
    posicion = {x = 0, y = 0},
    adelante = {x = 1, y = 0},
    rangoVision = 100,
    fov = 90
}

local Jugador = {
    posicion = {x = 50, y = 10}
}

function NPC:EnFOV(objetivo, anguloMax)
    -- Calcular dirección al objetivo
    local dx = objetivo.posicion.x - self.posicion.x
    local dy = objetivo.posicion.y - self.posicion.y
    
    -- Producto punto simple
    local productoPunto = self.adelante.x * dx + self.adelante.y * dy
    
    -- Verificar si está adelante
    return productoPunto > 0
end

function NPC:VeJugador(jugador)
    local distancia = math.sqrt(
        (jugador.posicion.x - self.posicion.x)^2 +
        (jugador.posicion.y - self.posicion.y)^2
    )
    
    return distancia < self.rangoVision and self:EnFOV(jugador, self.fov)
end

-- Probar
print("¿Ve jugador? " .. tostring(NPC:VeJugador(Jugador)))`,
    environment: "lua",
    expectedOutput: "¿Ve jugador? true",
  },
  miniExercise: {
    id: "mes-06-l02-ej1",
    lessonId: "mes-06-l02",
    title: "Sistema de Visión y Audición",
    instructions: `Crea sistema de percepción:

1. NPC tiene rangoVision=100, fov=90, multiplicadorAudicion=1
2. Jugador está a 50 unidades, hace sonido volumen=30
3. Función \`VerificarVision()\` retorna true si distancia < rangoVision
4. Función \`VerificarAudicion(sonido)\` retorna true si distancia < volumen*multiplicador
5. Imprime resultados de visión y audición

**Salida esperada:**
\`\`\`
=== Percepción ===
Distancia: 50
Visión: true (50 < 100)
Audición: true (50 < 30)
`,
    starterCode: `local NPC = {
    rangoVision = 100,
    fov = 90,
    multiplicadorAudicion = 1
}

local Jugador = {
    distancia = 50
}

local Sonido = {
    volumen = 30
}

function NPC:VerificarVision(distancia)
    -- Implementar
end

function NPC:VerificarAudicion(sonido, distancia)
    -- Implementar
end

print("=== Percepción ===")
print("Distancia: " .. Jugador.distancia)
print("Visión: " .. tostring(NPC:VerificarVision(Jugador.distancia)))
print("Audición: " .. tostring(NPC:VerificarAudicion(Sonido, Jugador.distancia)))`,
    solution: `local NPC = {
    rangoVision = 100,
    fov = 90,
    multiplicadorAudicion = 1
}

local Jugador = {
    distancia = 50
}

local Sonido = {
    volumen = 30
}

function NPC:VerificarVision(distancia)
    return distancia < self.rangoVision
end

function NPC:VerificarAudicion(sonido, distancia)
    local rango = sonido.volumen * self.multiplicadorAudicion
    return distancia < rango
end

print("=== Percepción ===")
print("Distancia: " .. Jugador.distancia)
print("Visión: " .. tostring(NPC:VerificarVision(Jugador.distancia)) .. 
      " (" .. Jugador.distancia .. " < " .. NPC.rangoVision .. ")")
print("Audición: " .. tostring(NPC:VerificarAudicion(Sonido, Jugador.distancia)) .. 
      " (" .. Jugador.distancia .. " < " .. Sonido.volumen .. ")")`,
    tests: [
      { type: "output_contains", expected: "Visión: true", message: "Visión correcta" },
      { type: "output_contains", expected: "Audición: true", message: "Audición correcta" },
      { type: "output_contains", expected: "50 < 100", message: "Muestra comparación visión" },
    ],
    hints: ["Visión: distancia < rangoVision", "Audición: distancia < volumen * multiplicador"],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: "Raycast para línea de visión. FOV con producto punto. Audición por distancia/volumen. Combinar ambas para percepción completa.",
  resources: [],
  prerequisites: ["mes-06-l01"],
};

// ============================================
// LECCIÓN 6.3: Behavior Trees
// ============================================

export const lesson03: Lesson = {
  id: "mes-06-l03",
  moduleId: "mes-06",
  lessonNumber: 3,
  title: "Behavior Trees",
  description: "Tasks, Decorators, Services y árboles de comportamiento complejos.",
  estimatedTime: 40,
  difficulty: "advanced",
  theory: {
    title: "Behavior Trees",
    objectives: [
      "Entender estructura de Behavior Trees",
      "Implementar Tasks (acciones)",
      "Usar Decorators (condiciones)",
      "Crear Services (actualizaciones)",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "¿Qué es un Behavior Tree?",
        content: `**Behavior Tree (BT)** es un árbol de decisiones:

**Estructura:**
\`\`\`
         Selector
        /    |    \\
    Secuencia  Decorator  Task
     /    \\      |         |
  Task   Task  Condición  Acción
\`\`\`

**Nodos principales:**
- **Selector (OR)** - Ejecuta hijos hasta que uno tenga éxito
- **Secuencia (AND)** - Ejecuta todos los hijos en orden
- **Task** - Acción concreta (mover, atacar, etc.)
- **Decorator** - Condición que modifica el comportamiento
- **Service** - Actualiza datos periódicamente

**Ventajas vs FSM:**
- Más modular y reutilizable
- Fácil de extender
- Mejor para comportamientos complejos`,
        codeExamples: [
          {
            title: "Árbol básico",
            code: `local BehaviorTree = {}

-- Nodo base
local Node = {}
Node.__index = Node

function Node:Execute(context)
    return "SUCCESS"
end

-- Selector: ejecuta hasta que uno tenga éxito
local Selector = setmetatable({}, {__index = Node})
Selector.__index = Selector

function Selector:Execute(context)
    for _, child in ipairs(self.children) do
        local result = child:Execute(context)
        if result == "SUCCESS" then
            return "SUCCESS"
        end
    end
    return "FAILURE"
end

-- Secuencia: ejecuta todos en orden
local Sequence = setmetatable({}, {__index = Node})
Sequence.__index = Sequence

function Sequence:Execute(context)
    for _, child in ipairs(self.children) do
        local result = child:Execute(context)
        if result == "FAILURE" then
            return "FAILURE"
        end
    end
    return "SUCCESS"
end

return BehaviorTree`,
            language: "lua",
            description: "Estructura básica de Behavior Tree con Selector y Secuencia.",
          },
        ],
      },
      {
        heading: "Tasks - Acciones",
        content: `**Tasks son las acciones concretas:**
\`\`\`lua
-- Task: Mover a ubicación
local MoveToTask = {}

function MoveToTask:Execute(context)
    local npc = context.npc
    local destino = context.destino
    
    npc:MoverHacia(destino)
    
    if npc:LlegoaDestino() then
        return "SUCCESS"
    end
    
    return "RUNNING"  -- Aún en progreso
end

-- Task: Atacar
local AttackTask = {}

function AttackTask:Execute(context)
    local npc = context.npc
    local target = context.target
    
    if npc:EnRangoAtaque(target) then
        npc:Atacar(target)
        return "SUCCESS"
    else
        return "FAILURE"
    end
end
\`\`\`

**Retornos posibles:**
- **SUCCESS** - Tarea completada
- **FAILURE** - Tarea falló
- **RUNNING** - Tarea en progreso`,
        codeExamples: [
          {
            title: "Tasks de combate",
            code: `local CombatTasks = {}

-- Task: Buscar cobertura
CombatTasks.BuscarCobertura = {
    Execute = function(self, context)
        local npc = context.npc
        local cobertura = npc:BuscarCoberturaMasCercana()
        
        if cobertura then
            npc:MoverHacia(cobertura)
            return "RUNNING"
        end
        
        return "FAILURE"
    end
}

-- Task: Recargar
CombatTasks.Recargar = {
    Execute = function(self, context)
        local npc = context.npc
        
        if npc.municion < npc.municionMax then
            npc:Recargar()
            return "RUNNING"
        end
        
        return "SUCCESS"
    end
}

-- Task: Perseguir
CombatTasks.Perseguir = {
    Execute = function(self, context)
        local npc = context.npc
        local target = context.target
        
        npc:MoverHacia(target)
        
        if npc:EnRangoAtaque(target) then
            return "SUCCESS"
        end
        
        return "RUNNING"
    end
}

return CombatTasks`,
            language: "lua",
            description: "Tasks de combate: buscar cobertura, recargar, perseguir.",
          },
        ],
      },
      {
        heading: "Decorators - Condiciones",
        content: `**Decorators modifican el comportamiento:**
\`\`\`lua
-- Decorator: Solo si vida > 50%
local VidaAltaDecorator = {}

function VidaAltaDecorator:Execute(context)
    if context.npc.vida > context.npc.vidaMax * 0.5 then
        return self.child:Execute(context)
    end
    return "FAILURE"
end

-- Decorator: Invertir resultado
local InverterDecorator = {}

function InverterDecorator:Execute(context)
    local result = self.child:Execute(context)
    
    if result == "SUCCESS" then
        return "FAILURE"
    elseif result == "FAILURE" then
        return "SUCCESS"
    end
    
    return result
end

-- Decorator: Repetir N veces
local RepeatDecorator = {}

function RepeatDecorator:Execute(context)
    for i = 1, self.veces do
        local result = self.child:Execute(context)
        if result == "FAILURE" then
            return "FAILURE"
        end
    end
    return "SUCCESS"
end
\`\`\``,
        codeExamples: [
          {
            title: "Decorators comunes",
            code: `local Decorators = {}

-- Solo ejecutar si condición es verdadera
Decorators.Condicion = function(condicion, child)
    return {
        child = child,
        condicion = condicion,
        Execute = function(self, context)
            if self.condicion(context) then
                return self.child:Execute(context)
            end
            return "FAILURE"
        end
    }
end

-- Ejecutar solo N veces
Decorators.LimiteVeces = function(veces, child)
    return {
        child = child,
        veces = veces,
        ejecuciones = 0,
        Execute = function(self, context)
            if self.ejecuciones >= self.veces then
                return "FAILURE"
            end
            
            self.ejecuciones = self.ejecuciones + 1
            return self.child:Execute(context)
        end
    }
end

-- Timeout: fallar después de X segundos
Decorators.Timeout = function(tiempo, child)
    return {
        child = child,
        tiempo = tiempo,
        tiempoInicio = 0,
        Execute = function(self, context)
            if self.tiempoInicio == 0 then
                self.tiempoInicio = context.tiempo
            end
            
            if context.tiempo - self.tiempoInicio > self.tiempo then
                return "FAILURE"
            end
            
            return self.child:Execute(context)
        end
    }
end

return Decorators`,
            language: "lua",
            description: "Decorators: condición, límite de veces, timeout.",
          },
        ],
      },
      {
        heading: "Services - Actualizaciones",
        content: `**Services actualizan datos periódicamente:**
\`\`\`lua
-- Service: Actualizar enemigo más cercano
local ActualizarEnemigoService = {}

function ActualizarEnemigoService:Execute(context, deltaTime)
    local npc = context.npc
    context.enemigoMasCercano = npc:BuscarEnemigoMasCercano()
end

-- Service: Verificar munición
local VerificarMunicionService = {}

function VerificarMunicionService:Execute(context, deltaTime)
    local npc = context.npc
    context.necesitaRecargar = npc.municion < npc.municionMax * 0.3
end

-- Service: Actualizar posición del jugador
local ActualizarJugadorService = {}

function ActualizarJugadorService:Execute(context, deltaTime)
    context.jugadorPos = context.jugador:GetLocation()
    context.jugadorVivo = context.jugador.vida > 0
end
\`\`\``,
        codeExamples: [
          {
            title: "Services de IA",
            code: `local Services = {}

-- Actualizar percepción
Services.ActualizarPercepcion = {
    intervalo = 0.1,
    tiempo = 0,
    Execute = function(self, context, dt)
        self.tiempo = self.tiempo + dt
        
        if self.tiempo >= self.intervalo then
            context.veJugador = context.npc:VeJugador(context.jugador)
            context.distancia = context.npc:GetDistanceTo(context.jugador)
            self.tiempo = 0
        end
    end
}

-- Actualizar estado de combate
Services.ActualizarCombate = {
    intervalo = 0.5,
    Execute = function(self, context, dt)
        local npc = context.npc
        
        context.enCombate = npc.vida < npc.vidaMax * 0.8
        context.vidaBaja = npc.vida < npc.vidaMax * 0.3
        context.sinMunicion = npc.municion <= 0
    end
}

-- Actualizar cobertura disponible
Services.ActualizarCobertura = {
    intervalo = 1.0,
    Execute = function(self, context, dt)
        context.coberturas = context.npc:BuscarCoberturasCercanas()
        context.coberturaMasCercana = context.npc:ObtenerCoberturaMasCercana()
    end
}

return Services`,
            language: "lua",
            description: "Services para actualizar percepción, combate y cobertura.",
          },
        ],
      },
    ],
    summary: `Behavior Trees: Selector (OR), Secuencia (AND), Tasks (acciones), Decorators (condiciones), Services (actualizaciones). Más modular que FSM para comportamientos complejos.`,
  },
  examples: [],
  interactive: {
    title: "Simula Behavior Tree",
    description: "Árbol simple de decisión",
    starterCode: `local BT = {}

-- Selector: OR
function BT.Selector(children)
    return {
        tipo = "Selector",
        children = children,
        Execute = function(self, ctx)
            for _, child in ipairs(self.children) do
                if child:Execute(ctx) == "SUCCESS" then
                    return "SUCCESS"
                end
            end
            return "FAILURE"
        end
    }
end

-- Task simple
function BT.Task(accion)
    return {
        Execute = function(self, ctx)
            print("Ejecutando: " .. accion)
            return "SUCCESS"
        end
    }
end

-- Crear árbol
local arbol = BT.Selector({
    BT.Task("Atacar"),
    BT.Task("Perseguir"),
    BT.Task("Patrullar")
})

-- Ejecutar
arbol:Execute({})`,
    environment: "lua",
    expectedOutput: "Ejecutando: Atacar",
  },
  miniExercise: {
    id: "mes-06-l03-ej1",
    lessonId: "mes-06-l03",
    title: "Behavior Tree de Combate",
    instructions: `Crea un BT simple para combate:

1. Selector principal con 2 opciones
2. Primera opción: Secuencia (Atacar si en rango)
3. Segunda opción: Task (Perseguir)
4. Si enRango=true, debe atacar
5. Si enRango=false, debe perseguir

**Salida esperada:**
\`\`\`
=== Behavior Tree ===
En rango: true
→ Atacando
SUCCESS
`,
    starterCode: `local BT = {
    enRango = true
}

-- Implementar Selector, Secuencia y Tasks

-- Árbol: Selector(Secuencia(Atacar), Perseguir)

print("=== Behavior Tree ===")
print("En rango: " .. tostring(BT.enRango))
local resultado = BT.arbol:Execute(BT)
print(resultado)`,
    solution: `local BT = {
    enRango = true
}

-- Task: Atacar
local AtacarTask = {
    Execute = function(self, ctx)
        if ctx.enRango then
            print("→ Atacando")
            return "SUCCESS"
        end
        return "FAILURE"
    end
}

-- Task: Perseguir
local PerseguirTask = {
    Execute = function(self, ctx)
        print("→ Persiguiendo")
        return "SUCCESS"
    end
}

-- Secuencia
local Secuencia = {
    children = {AtacarTask},
    Execute = function(self, ctx)
        for _, child in ipairs(self.children) do
            local result = child:Execute(ctx)
            if result == "FAILURE" then
                return "FAILURE"
            end
        end
        return "SUCCESS"
    end
}

-- Selector
local Selector = {
    children = {Secuencia, PerseguirTask},
    Execute = function(self, ctx)
        for _, child in ipairs(self.children) do
            local result = child:Execute(ctx)
            if result == "SUCCESS" then
                return "SUCCESS"
            end
        end
        return "FAILURE"
    end
}

BT.arbol = Selector

print("=== Behavior Tree ===")
print("En rango: " .. tostring(BT.enRango))
local resultado = BT.arbol:Execute(BT)
print(resultado)`,
    tests: [
      { type: "output_contains", expected: "Atacando", message: "Debe atacar cuando en rango" },
      { type: "output_contains", expected: "SUCCESS", message: "Debe retornar éxito" },
    ],
    hints: ["Selector prueba hijos hasta SUCCESS", "Secuencia falla si un hijo falla", "Atacar solo SUCCESS si enRango=true"],
    xpReward: 55,
    difficulty: "advanced",
  },
  summary: "BT: Selector (OR), Secuencia (AND), Tasks, Decorators, Services. Más modular que FSM. Tasks retornan SUCCESS/FAILURE/RUNNING.",
  resources: [],
  prerequisites: ["mes-06-l02"],
};

// ============================================
// LECCIÓN 6.4: Pathfinding
// ============================================

export const lesson04: Lesson = {
  id: "mes-06-l04",
  moduleId: "mes-06",
  lessonNumber: 4,
  title: "Pathfinding",
  description: "NavMesh, MoveTo, navegación y evitación de obstáculos.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Pathfinding",
    objectives: [
      "Entender NavMesh y navegación",
      "Implementar MoveTo con pathfinding",
      "Evitar obstáculos dinámicamente",
      "Optimizar cálculos de ruta",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "NavMesh - Malla de Navegación",
        content: `**NavMesh** define áreas caminables:

**En UE5:**
1. Colocar NavMeshBoundsVolume
2. Build → Run Navigation System
3. NavMesh genera automáticamente

**En Lua:**
\`\`\`lua
function NPC:MoverA(destino)
    -- Solicitar ruta al NavMesh
    local ruta = self:FindPath(self:GetLocation(), destino)
    
    if ruta and #ruta.puntos > 0 then
        self.rutaActual = ruta
        self.siguientePunto = 1
        return true
    end
    
    return false  -- No hay ruta
end

function NPC:SeguirRuta(dt)
    if not self.rutaActual then return end
    
    local punto = self.rutaActual.puntos[self.siguientePunto]
    self:MoverHacia(punto)
    
    if self:LlegoaPunto(punto) then
        self.siguientePunto = self.siguientePunto + 1
        
        if self.siguientePunto > #self.rutaActual.puntos then
            self.rutaActual = nil
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de rutas",
            code: `local Pathfinding = {}

function Pathfinding:FindPath(inicio, destino, npc)
    -- En UE5 real, usar UNavigationSystemV1
    -- Aquí simulamos una ruta
    local ruta = {
        puntos = {
            inicio,
            {(inicio.X + destino.X) / 2, (inicio.Y + destino.Y) / 2},
            destino
        },
        longitud = 2
    }
    
    return ruta
end

function NPC:SeguirRuta(dt)
    if not self.ruta then return end
    
    local puntoActual = self.ruta.puntos[self.siguientePunto]
    
    -- Mover hacia el punto
    local direccion = (puntoActual - self:GetLocation()):GetSafeNormal()
    self:AddMovementInput(direccion, self.velocidad * dt)
    
    -- Verificar si llegó
    local distancia = self:GetDistanceTo(puntoActual)
    if distancia < 10 then
        self.siguientePunto = self.siguientePunto + 1
        
        if self.siguientePunto > #self.ruta.puntos then
            self.ruta = nil
            print("Ruta completada")
        end
    end
end

return Pathfinding`,
            language: "lua",
            description: "Sistema básico de pathfinding con rutas.",
          },
        ],
      },
      {
        heading: "MoveTo - Mover a Destino",
        content: `**MoveTo con pathfinding automático:**
\`\`\`lua
function NPC:MoveTo(destino)
    -- UE5 hace pathfinding automáticamente
    local exito = self:AIMoveTo(destino)
    
    if exito then
        print("Moviendo a: " .. tostring(destino))
    else
        print("No hay ruta disponible")
    end
    
    return exito
end

-- Con callback
function NPC:MoveToConCallback(destino, callback)
    self:AIMoveTo(destino, function(resultado)
        if resultado == "Success" then
            print("Llegué al destino")
        else
            print("Falló la ruta")
        end
        
        if callback then
            callback(resultado)
        end
    end)
end
\`\`\``,
        codeExamples: [
          {
            title: "MoveTo avanzado",
            code: `local MoveSystem = {}

function MoveSystem:MoverA(npc, destino, opciones)
    opciones = opciones or {}
    
    -- Configurar movimiento
    local config = {
        destino = destino,
        aceptarLlegadaParcial = opciones.aceptarParcial or false,
        radioLlegada = opciones.radio or 50,
        proyectarDestinoAlNavMesh = true
    }
    
    -- Ejecutar movimiento
    local resultado = npc:AIMoveTo(config.destino, {
        radioLlegada = config.radioLlegada,
        aceptarLlegadaParcial = config.aceptarLlegadaParcial
    })
    
    return resultado
end

function MoveSystem:Perseguir(npc, target, distanciaObjetivo)
    local destino = target:GetLocation()
    
    -- Detenerse a cierta distancia
    local direccion = (destino - npc:GetLocation()):GetSafeNormal()
    destino = destino - (direccion * distanciaObjetivo)
    
    return self:MoverA(npc, destino)
end

return MoveSystem`,
            language: "lua",
            description: "Sistema MoveTo con opciones avanzadas.",
          },
        ],
      },
      {
        heading: "Evitación de Obstáculos",
        content: `**Evitar obstáculos dinámicos:**
\`\`\`lua
function NPC:EvitarObstaculo()
    local hit = self:SphereTrace(self:GetLocation(), 
                                  self:GetLocation() + self:GetActorForwardVector() * 100,
                                  50)
    
    if hit and hit.actor ~= self.jugador then
        -- Obstáculo detectado, buscar ruta alternativa
        local izquierda = self:GetActorRightVector() * 100
        local derecha = -self:GetActorRightVector() * 100
        
        -- Probar izquierda
        if not self:ObstaculoEnDireccion(izquierda) then
            self:MoverHacia(self:GetLocation() + izquierda)
        -- Probar derecha
        elseif not self:ObstaculoEnDireccion(derecha) then
            self:MoverHacia(self:GetLocation() + derecha)
        else
            -- Recalcular ruta completa
            self:RecalcularRuta()
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Evitación reactiva",
            code: `local Avoidance = {}

function Avoidance:DetectarObstaculo(npc, distancia)
    local adelante = npc:GetActorForwardVector()
    local origen = npc:GetLocation()
    local destino = origen + adelante * distancia
    
    local hit = npc:LineTrace(origen, destino)
    
    return hit and hit.actor ~= npc.jugador, hit
end

function Avoidance:Evitar(npc, obstaculo)
    local derecha = npc:GetActorRightVector()
    
    -- Intentar esquivar por la derecha
    local destinoDerecha = npc:GetLocation() + derecha * 150
    
    if not npc:ObstaculoEnDireccion(destinoDerecha) then
        npc:MoverHacia(destinoDerecha)
        return true
    end
    
    -- Intentar por la izquierda
    local destinoIzquierda = npc:GetLocation() - derecha * 150
    
    if not npc:ObstaculoEnDireccion(destinoIzquierda) then
        npc:MoverHacia(destinoIzquierda)
        return true
    end
    
    -- No hay salida, recalcular ruta
    return false
end

function Avoidance:Actualizar(npc, dt)
    local detecto, hit = self:DetectarObstaculo(npc, 200)
    
    if detecto then
        print("Obstáculo detectado")
        if not self:Evitar(npc, hit.actor) then
            print("Recalculando ruta...")
            npc:RecalcularRuta()
        end
    end
end

return Avoidance`,
            language: "lua",
            description: "Evitación reactiva de obstáculos con detección frontal.",
          },
        ],
      },
    ],
    summary: `NavMesh define áreas caminables. MoveTo con pathfinding automático. Evitar obstáculos con traces laterales. Recalcular ruta si bloqueado.`,
  },
  examples: [],
  interactive: {
    title: "Simula Pathfinding",
    description: "Mover por puntos",
    starterCode: `local NPC = {
    posicion = {x = 0, y = 0},
    ruta = {
        {x = 10, y = 0},
        {x = 10, y = 10},
        {x = 0, y = 10}
    },
    puntoActual = 1
}

function NPC:MoverHacia(punto)
    print("Moviendo de (" .. self.posicion.x .. "," .. self.posicion.y .. 
          ") a (" .. punto.x .. "," .. punto.y .. ")")
    self.posicion = punto
end

function NPC:SeguirRuta()
    if self.puntoActual <= #self.ruta then
        local punto = self.ruta[self.puntoActual]
        self:MoverHacia(punto)
        self.puntoActual = self.puntoActual + 1
    else
        print("Ruta completada")
    end
end

-- Seguir ruta
while self.puntoActual <= #self.ruta do
    NPC:SeguirRuta()
end`,
    environment: "lua",
    expectedOutput: "Moviendo de",
  },
  miniExercise: {
    id: "mes-06-l04-ej1",
    lessonId: "mes-06-l04",
    title: "Sistema de Patrulla con Rutas",
    instructions: `Crea un sistema de patrulla:

1. NPC tiene 3 puntos de patrulla
2. Función \`IrAPunto(index)\` mueve al punto
3. Función \`Actualizar()\` verifica si llegó al punto
4. Si llegó, avanza al siguiente punto (circular)
5. Imprime movimiento entre puntos

**Salida esperada:**
\`\`\`
Patrulla: Punto 1 → Punto 2
Patrulla: Punto 2 → Punto 3
Patrulla: Punto 3 → Punto 1
\`\`\``,
    starterCode: `local NPC = {
    puntos = {
        {x = 0, y = 0},
        {x = 100, y = 0},
        {x = 100, y = 100}
    },
    puntoActual = 1,
    posicion = {x = 0, y = 0}
}

function NPC:IrAPunto(index)
    -- Implementar
end

function NPC:Actualizar()
    -- Verificar si llegó y avanzar
end

-- Iniciar patrulla
NPC:IrAPunto(1)
NPC:Actualizar()
NPC:Actualizar()
NPC:Actualizar()`,
    solution: `local NPC = {
    puntos = {
        {x = 0, y = 0},
        {x = 100, y = 0},
        {x = 100, y = 100}
    },
    puntoActual = 1,
    posicion = {x = 0, y = 0},
    llego = false
}

function NPC:IrAPunto(index)
    local destino = self.puntos[index]
    print("Patrulla: Punto " .. self.puntoActual .. " → Punto " .. index)
    self.posicion = destino
    self.llego = true
end

function NPC:Actualizar()
    if self.llego then
        self.llego = false
        self.puntoActual = self.puntoActual + 1
        
        if self.puntoActual > #self.puntos then
            self.puntoActual = 1
        end
        
        self:IrAPunto(self.puntoActual)
    end
end

NPC:IrAPunto(1)
NPC:Actualizar()
NPC:Actualizar()
NPC:Actualizar()`,
    tests: [
      { type: "output_contains", expected: "Punto 1 → Punto 2", message: "Primera transición" },
      { type: "output_contains", expected: "Punto 3 → Punto 1", message: "Vuelta circular" },
    ],
    hints: ["Usa índice circular con módulo", "Marca llego=true cuando llega", "Incrementa puntoActual en Actualizar()"],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: "NavMesh para áreas caminables. MoveTo con pathfinding auto. Evitar obstáculos con traces. Patrulla circular por puntos.",
  resources: [],
  prerequisites: ["mes-06-l03"],
};

// ============================================
// LECCIÓN 6.5: Combate
// ============================================

export const lesson05: Lesson = {
  id: "mes-06-l05",
  moduleId: "mes-06",
  lessonNumber: 5,
  title: "Combate",
  description: "Sistemas de ataque, defensa, huida y toma de decisiones en combate.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Combate",
    objectives: [
      "Implementar sistema de ataque con cooldown",
      "Crear comportamientos defensivos",
      "Decidir cuándo huir",
      "Tomar decisiones tácticas en combate",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Sistema de Ataque",
        content: `**Ataque con cooldown y rango:**
\`\`\`lua
function NPC:Atacar(target)
    -- Verificar cooldown
    if self.tiempoUltimoAtaque < self.cooldownAtaque then
        return
    end
    
    -- Verificar rango
    local distancia = self:GetDistanceTo(target)
    if distancia > self.rangoAtaque then
        return
    end
    
    -- Verificar línea de visión
    if not self:LineaVision(target) then
        return
    end
    
    -- Ejecutar ataque
    self:PlayAnimation("Attack")
    target:RecibirDaño(self.daño)
    
    self.tiempoUltimoAtaque = 0
    print("NPC ataca por " .. self.daño .. " de daño")
end

function NPC:ActualizarCombate(dt, target)
    self.tiempoUltimoAtaque = self.tiempoUltimoAtaque + dt
    
    local distancia = self:GetDistanceTo(target)
    
    if distancia <= self.rangoAtaque then
        -- En rango, atacar
        self:Atacar(target)
    else
        -- Fuera de rango, perseguir
        self:MoverHacia(target)
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Combate completo",
            code: `local CombatSystem = {}

function CombatSystem:Actualizar(npc, dt, target)
    npc.tiempoAtaque = npc.tiempoAtaque + dt
    npc.distancia = npc:GetDistanceTo(target)
    
    -- Máquina de estados de combate
    if npc.vida < npc.vidaMax * 0.3 then
        -- Vida baja, posiblemente huir
        if npc:DeberiaHuir() then
            npc:HuirDe(target)
            return
        end
    end
    
    if npc.distancia <= npc.rangoAtaque then
        -- En rango de ataque
        if npc.tiempoAtaque >= npc.cooldownAtaque then
            npc:Atacar(target)
            npc.tiempoAtaque = 0
        end
    else
        -- Fuera de rango, acercarse
        npc:MoverHacia(target, npc.rangoAtaque)
    end
end

function NPC:Atacar(target)
    -- Animación
    self:PlayAnimation("Attack")
    
    -- Aplicar daño
    target:RecibirDaño(self.daño)
    
    -- Feedback
    print(self.nombre .. " ataca a " .. target.nombre .. " por " .. self.daño .. " HP")
end

return CombatSystem`,
            language: "lua",
            description: "Sistema de combate con estados y decisiones.",
          },
        ],
      },
      {
        heading: "Comportamientos Defensivos",
        content: `**Buscar cobertura:**
\`\`\`lua
function NPC:BuscarCobertura()
    local coberturas = self:EncontrarCoberturas()
    
    -- Ordenar por distancia al jugador
    table.sort(coberturas, function(a, b)
        local distA = self:GetDistanceTo(a)
        local distB = self:GetDistanceTo(b)
        return distA < distB
    end)
    
    -- Ir a la mejor cobertura
    if #coberturas > 0 then
        self:MoverHacia(coberturas[1])
        return coberturas[1]
    end
    
    return nil
end

function NPC:EnContracoberturas()
    local coberturas = {}
    
    -- Buscar objetos que proporcionen cobertura
    for _, obj in ipairs(self:GetActoresCercanos("Cobertura", 500)) do
        -- Verificar que esté entre NPC y jugador
        if self:EntreYoYJugador(obj) then
            table.insert(coberturas, obj:GetLocation())
        end
    end
    
    return coberturas
end
\`\`\``,
        codeExamples: [
          {
            title: "Defensa táctica",
            code: `local DefenseSystem = {}

function DefenseSystem:BuscarCobertura(npc, jugador)
    local coberturas = npc:EncontrarCoberturasCercanas(500)
    
    -- Filtrar coberturas válidas (entre NPC y jugador)
    local validas = {}
    for _, cobertura in ipairs(coberturas) do
        if npc:EntrePosiciones(jugador, cobertura, npc:GetLocation()) then
            table.insert(validas, cobertura)
        end
    end
    
    -- Ordenar por distancia al jugador (más lejos = mejor)
    table.sort(validas, function(a, b)
        local distA = jugador:GetDistanceTo(a)
        local distB = jugador:GetDistanceTo(b)
        return distA > distB
    end)
    
    return validas[1]
end

function NPC:UsarCobertura(cobertura)
    self:MoverHacia(cobertura)
    self.enCobertura = true
    
    -- Salir de cobertura para atacar
    if self:PuedeAtacar() then
        self:SalirDeCobertura()
        self:Atacar(self.jugador)
        self:RegresarACobertura()
    end
end

return DefenseSystem`,
            language: "lua",
            description: "Sistema defensivo con búsqueda de cobertura.",
          },
        ],
      },
      {
        heading: "Decidir Cuándo Huir",
        content: `**Condiciones para huir:**
\`\`\`lua
function NPC:DeberiaHuir()
    -- Vida muy baja
    if self.vida < self.vidaMax * 0.2 then
        return true
    end
    
    -- Jugador mucho más fuerte
    if self.jugador.nivel > self.nivel + 5 then
        return true
    end
    
    -- Múltiples enemigos
    if self:ContarEnemigosCercanos() > 3 then
        return true
    end
    
    -- Sin munición y enemigo cuerpo a cuerpo
    if self.municion <= 0 and self:EsCuerpoACuerpo() then
        return true
    end
    
    return false
end

function NPC:HuirDe(target)
    -- Dirección opuesta al target
    local direccion = (self:GetLocation() - target:GetLocation()):GetSafeNormal()
    
    -- Punto de huida
    local puntoHuida = self:GetLocation() + (direccion * 500)
    
    self:MoverHacia(puntoHuida)
    self:PlayAnimation("Run")
    
    print(self.nombre .. " está huyendo!")
end
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de huida",
            code: `local FleeSystem = {}

function FleeSystem:DeberiaHuir(npc, target)
    local razones = {}
    
    -- Vida baja
    if npc.vida < npc.vidaMax * 0.3 then
        table.insert(razones, "vida_baja")
    end
    
    -- Sin munición
    if npc.municion <= 0 and npc.tipo == "ranged" then
        table.insert(razones, "sin_municion")
    end
    
    -- Múltiples enemigos
    local enemigos = npc:ContarEnemigosCercanos(300)
    if enemigos >= 2 then
        table.insert(razones, "superado")
    end
    
    -- Target mucho más fuerte
    if target.nivel and target.nivel > npc.nivel + 5 then
        table.insert(razones, "muy_fuerte")
    end
    
    return #razones > 0, razones
end

function FleeSystem:Huir(npc, target)
    local direccion = (npc:GetLocation() - target:GetLocation()):GetSafeNormal()
    local puntoHuida = npc:GetLocation() + (direccion * 1000)
    
    npc:MoverHacia(puntoHuida)
    npc.enHuida = true
    
    print(npc.nombre .. " huye por: " .. table.concat(razones, ", "))
end

return FleeSystem`,
            language: "lua",
            description: "Sistema de huida con múltiples condiciones.",
          },
        ],
      },
    ],
    summary: `Ataque con cooldown y rango. Buscar cobertura defensiva. Huir si vida baja, sin munición, o superado. Decisiones tácticas basadas en estado.`,
  },
  examples: [],
  interactive: {
    title: "Simula Combate",
    description: "NPC decide atacar o huir",
    starterCode: `local NPC = {
    vida = 30,
    vidaMax = 100,
    daño = 15,
    cooldown = 2,
    tiempoAtaque = 2
}

local Jugador = {
    vida = 50,
    nivel = 3
}

function NPC:DeberiaHuir()
    return self.vida < self.vidaMax * 0.3
end

function NPC:Atacar(target)
    if self.tiempoAtaque >= self.cooldown then
        target.vida = target.vida - self.daño
        print("NPC ataca: Jugador tiene " .. target.vida .. " HP")
        self.tiempoAtaque = 0
    end
end

function NPC:Actualizar(dt)
    self.tiempoAtaque = self.tiempoAtaque + dt
    
    if self:DeberiaHuir() then
        print("NPC huye (vida: " .. self.vida .. ")")
    else
        self:Atacar(Jugador)
    end
end

-- Simular combate
NPC:Actualizar(1)
NPC.vida = 25  -- Recibe daño
NPC:Actualizar(1)`,
    environment: "lua",
    expectedOutput: "NPC ataca",
  },
  miniExercise: {
    id: "mes-06-l05-ej1",
    lessonId: "mes-06-l05",
    title: "IA de Combate con Decisiones",
    instructions: `Crea IA que decide en combate:

1. NPC con vida=40, vidaMax=100, rangoAtaque=50
2. Jugador a distancia=30
3. Si distancia <= rangoAtaque y vida > 30% → Atacar
4. Si distancia > rangoAtaque → Acercarse
5. Si vida <= 30% → Huir
6. Imprime decisión cada turno

**Salida esperada:**
\`\`\`
Turno 1: Distancia=30, Vida=40%
→ Atacando
Turno 2: Distancia=30, Vida=25%
→ Huyendo
\`\`\``,
    starterCode: `local NPC = {
    vida = 40,
    vidaMax = 100,
    rangoAtaque = 50
}

local Jugador = {
    distancia = 30
}

function NPC:DecidirAccion()
    -- Implementar lógica
end

-- Simular 2 turnos
print("Turno 1: Distancia=" .. Jugador.distancia .. ", Vida=" .. NPC.vida .. "%")
NPC:DecidirAccion()

NPC.vida = 25  -- Recibe daño
print("Turno 2: Distancia=" .. Jugador.distancia .. ", Vida=" .. NPC.vida .. "%")
NPC:DecidirAccion()`,
    solution: `local NPC = {
    vida = 40,
    vidaMax = 100,
    rangoAtaque = 50
}

local Jugador = {
    distancia = 30
}

function NPC:DecidirAccion()
    local vidaPercent = self.vida / self.vidaMax * 100
    
    if vidaPercent <= 30 then
        print("→ Huyendo")
    elseif Jugador.distancia <= self.rangoAtaque then
        print("→ Atacando")
    else
        print("→ Acercándose")
    end
end

print("Turno 1: Distancia=" .. Jugador.distancia .. ", Vida=" .. NPC.vida .. "%")
NPC:DecidirAccion()

NPC.vida = 25
print("Turno 2: Distancia=" .. Jugador.distancia .. ", Vida=" .. NPC.vida .. "%")
NPC:DecidirAccion()`,
    tests: [
      { type: "output_contains", expected: "Atacando", message: "Debe atacar con vida alta" },
      { type: "output_contains", expected: "Huyendo", message: "Debe huir con vida baja" },
    ],
    hints: ["Calcula vidaPercent = vida / vidaMax * 100", "Verifica vidaPercent <= 30 primero", "Luego verifica distancia <= rangoAtaque"],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: "Ataque con cooldown/rango. Buscar cobertura. Huir si vida < 30%, sin munición, o superado. Decisiones tácticas por estado.",
  resources: [],
  prerequisites: ["mes-06-l04"],
};

// ============================================
// LECCIÓN 6.6: Proyecto Guards
// ============================================

export const lesson06: Lesson = {
  id: "mes-06-l06",
  moduleId: "mes-06",
  lessonNumber: 6,
  title: "Proyecto: Guards con IA Completa",
  description: "Integra FSM, percepción, pathfinding y combate en guards de una mazmorra.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Proyecto: Guards con IA Completa",
    objectives: [
      "Integrar FSM con percepción",
      "Implementar patrulla con pathfinding",
      "Crear combate con ataque/huida",
      "Coordinar múltiples guards",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Guard IA - Visión General",
        content: `**Estados del Guard:**
\`\`\`
IDLE → PATROL → ALERT → CHASE → ATTACK
  ↑         ↓          ↓         ↓
  └─────────┴──────────┴─────────┘
\`\`\`

**Comportamientos:**
- **Idle**: Espera 3-5 segundos
- **Patrol**: Sigue ruta predefinida
- **Alert**: Investiga último sonido/posición
- **Chase**: Persigue jugador
- **Attack**: Ataca si en rango
- **Flee**: Huye si vida < 30%

**Percepción:**
- Visión: 500 unidades, 90° FOV
- Audición: pasos (50), disparos (200)
- Memoria: recuerda última posición 10s`,
        codeExamples: [
          {
            title: "Guard completo",
            code: `local Guard = {}
Guard.__index = Guard

function Guard.new(ruta)
    local self = setmetatable({}, Guard)
    
    self.estado = "PATROL"
    self.ruta = ruta
    self.puntoActual = 1
    
    -- Percepción
    self.rangoVision = 500
    self.fov = 90
    self.rangoAudicion = 100
    
    -- Combate
    self.vida = 100
    self.vidaMax = 100
    self.daño = 20
    self.rangoAtaque = 100
    self.cooldownAtaque = 2
    
    return self
end

function Guard:Actualizar(dt, jugador)
    self.tiempoAtaque = (self.tiempoAtaque or 0) + dt
    
    -- Percepción
    self:ActualizarPercepcion(dt, jugador)
    
    -- FSM
    if self.estado == "PATROL" then
        self:EstadoPatrol(dt)
    elseif self.estado == "ALERT" then
        self:EstadoAlert(dt)
    elseif self.estado == "CHASE" then
        self:EstadoChase(dt, jugador)
    elseif self.estado == "ATTACK" then
        self:EstadoAttack(dt, jugador)
    end
end

return Guard`,
            language: "lua",
            description: "Estructura completa de Guard con FSM.",
          },
        ],
      },
      {
        heading: "Implementación Completa",
        content: `**Código final integrado:**
\`\`\`lua
function Guard:ActualizarPercepcion(dt, jugador)
    self.veJugador = false
    
    -- Verificar visión
    if self:LineaVision(jugador) and self:EnFOV(jugador, self.fov) then
        self.veJugador = true
        self.ultimaPosicionConocida = jugador:GetLocation()
        self.tiempoSinVer = 0
    else
        self.tiempoSinVer = (self.tiempoSinVer or 0) + dt
    end
end

function Guard:EstadoPatrol(dt)
    -- Seguir ruta
    local punto = self.ruta[self.puntoActual]
    self:MoverHacia(punto)
    
    if self:LlegoaPunto(punto) then
        self.puntoActual = (self.puntoActual % #self.ruta) + 1
    end
    
    -- Transiciones
    if self.veJugador then
        self:EntrarEstado("CHASE")
    end
end

function Guard:EstadoChase(dt, jugador)
    if self.veJugador then
        local distancia = self:GetDistanceTo(jugador)
        
        if distancia <= self.rangoAtaque then
            self:EntrarEstado("ATTACK")
        else
            self:MoverHacia(jugador)
        end
    elseif self.tiempoSinVer > 5 then
        self:EntrarEstado("ALERT")
    end
end

function Guard:EstadoAttack(dt, jugador)
    if not self.veJugador then
        self:EntrarEstado("CHASE")
        return
    end
    
    local distancia = self:GetDistanceTo(jugador)
    
    if distancia > self.rangoAtaque then
        self:EntrarEstado("CHASE")
    elseif self.tiempoAtaque >= self.cooldownAtaque then
        self:Atacar(jugador)
        self.tiempoAtaque = 0
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Guard funcional",
            code: `local GuardIA = {}

function GuardIA:Crear(ruta)
    return {
        estado = "PATROL",
        ruta = ruta,
        puntoActual = 1,
        vida = 100,
        vidaMax = 100,
        daño = 20,
        rangoAtaque = 100,
        rangoVision = 500,
        cooldownAtaque = 2,
        tiempoAtaque = 2,
        veJugador = false
    }
end

function GuardIA:Actualizar(guard, dt, jugador)
    guard.tiempoAtaque = guard.tiempoAtaque + dt
    
    -- Percepción simple
    local distancia = guard:GetDistanceTo(jugador)
    guard.veJugador = distancia < guard.rangoVision
    
    -- FSM
    if guard.estado == "PATROL" then
        if guard.veJugador then
            guard.estado = "CHASE"
            print("Guard ve jugador - CHASE")
        end
    elseif guard.estado == "CHASE" then
        if distancia <= guard.rangoAtaque then
            guard.estado = "ATTACK"
            print("Guard en rango - ATTACK")
        end
    elseif guard.estado == "ATTACK" then
        if guard.tiempoAtaque >= guard.cooldownAtaque then
            print("Guard ataca por " .. guard.daño .. " daño")
            guard.tiempoAtaque = 0
        end
    end
end

return GuardIA`,
            language: "lua",
            description: "Guard IA funcional con FSM y percepción.",
          },
        ],
      },
    ],
    summary: `Guard con FSM: Patrol→Alert→Chase→Attack. Percepción con visión/audición. Pathfinding para patrol y chase. Combate con cooldown y rango. Huida si vida baja.`,
  },
  examples: [],
  interactive: {
    title: "Simula Guard IA",
    description: "Guard patrulla y detecta jugador",
    starterCode: `local Guard = {
    estado = "PATROL",
    ruta = {1, 2, 3},
    puntoActual = 1,
    veJugador = false
}

function Guard:Actualizar()
    if self.estado == "PATROL" then
        print("Patrullando punto " .. self.puntoActual)
        
        if self.veJugador then
            self.estado = "CHASE"
            print("→ ¡Jugador detectado!")
        end
    elseif self.estado == "CHASE" then
        print("Persiguiendo jugador...")
        
        if self.veJugador then
            self.estado = "ATTACK"
            print("→ ¡Atacando!")
        end
    elseif self.estado == "ATTACK" then
        print("Atacando jugador")
    end
end

-- Simular
Guard:Actualizar()  -- Patrol
Guard.veJugador = true
Guard:Actualizar()  -- Chase
Guard:Actualizar()  -- Attack`,
    environment: "lua",
    expectedOutput: "Patrullando",
  },
  miniExercise: {
    id: "mes-06-l06-ej1",
    lessonId: "mes-06-l06",
    title: "Guard con FSM Completa",
    instructions: `Implementa un guard con 3 estados:

1. PATROL: Imprime "Patrullando..."
2. Si veJugador=true → CHASE: Imprime "Persiguiendo..."
3. Si distancia <= 100 → ATTACK: Imprime "Atacando..."
4. Simula 4 turnos cambiando estados

**Salida esperada:**
\`\`\`
Turno 1: PATROL
Turno 2: CHASE (ve jugador)
Turno 3: ATTACK (en rango)
Turno 4: ATTACK
\`\`\``,
    starterCode: `local Guard = {
    estado = "PATROL",
    veJugador = false,
    distancia = 200
}

function Guard:Actualizar()
    -- Implementar FSM
    print("Turno: " .. self.estado)
end

-- Simular
Guard:Actualizar()  -- PATROL
Guard.veJugador = true
Guard:Actualizar()  -- CHASE
Guard.distancia = 50
Guard:Actualizar()  -- ATTACK
Guard:Actualizar()  -- ATTACK`,
    solution: `local Guard = {
    estado = "PATROL",
    veJugador = false,
    distancia = 200
}

function Guard:Actualizar()
    if self.estado == "PATROL" then
        print("Patrullando...")
        if self.veJugador then
            self.estado = "CHASE"
        end
    elseif self.estado == "CHASE" then
        print("Persiguiendo...")
        if self.distancia <= 100 then
            self.estado = "ATTACK"
        end
    elseif self.estado == "ATTACK" then
        print("Atacando...")
    end
    
    print("Turno: " .. self.estado)
end

Guard:Actualizar()
Guard.veJugador = true
Guard:Actualizar()
Guard.distancia = 50
Guard:Actualizar()
Guard:Actualizar()`,
    tests: [
      { type: "output_contains", expected: "Patrullando", message: "Estado PATROL" },
      { type: "output_contains", expected: "Persiguiendo", message: "Estado CHASE" },
      { type: "output_contains", expected: "Atacando", message: "Estado ATTACK" },
    ],
    hints: ["FSM con if/elseif", "PATROL → CHASE si veJugador", "CHASE → ATTACK si distancia <= 100"],
    xpReward: 55,
    difficulty: "intermediate",
  },
  summary: "Guard: FSM Patrol→Chase→Attack. Percepción visión/audición. Pathfinding patrol. Combate cooldown/rango. Huida vida baja.",
  resources: [],
  prerequisites: ["mes-06-l05"],
};

// Exportar todas las lecciones del módulo 6
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
];
