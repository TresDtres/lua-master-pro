/**
 * Módulo 8: Optimización - Todas las lecciones completas
 * Profiling, object pooling, memory management, coroutines y optimización Lua
 */

import { Lesson } from "@/types/lesson";

// ============================================
// LECCIÓN 8.1: Profiling
// ============================================

export const lesson01: Lesson = {
  id: "mes-08-l01",
  moduleId: "mes-08",
  lessonNumber: 1,
  title: "Profiling",
  description: "Unreal Insights, stat commands, análisis de FPS y identificación de bottlenecks.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Profiling",
    objectives: [
      "Usar Unreal Insights para profiling",
      "Interpretar stat commands",
      "Identificar bottlenecks de CPU/GPU",
      "Analizar frame times y FPS",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Unreal Insights",
        content: `**Unreal Insights** es la herramienta de profiling de UE5.

**Abrir Insights:**
\`\`\`
Window → Developer Tools → Insights
\`\`\`

**Sesiones principales:**
- **Frame Analysis** - Análisis por frame
- **Session Browser** - Conexión a sesión en vivo
- **Trace Analysis** - Trazas detalladas

**Capturar sesión:**
\`\`\`bash
# En consola de UE5
TraceSession start
# Jugar por 30 segundos
TraceSession stop
\`\`\`

**Métricas clave:**
- **Frame Time** - Tiempo por frame (16.67ms = 60 FPS)
- **Game Thread** - Lógica del juego
- **Render Thread** - Renderizado
- **GPU Time** - Tiempo de GPU`,
        codeExamples: [
          {
            title: "Profiling básico",
            code: `local Profiling = {}

function Profiling:IniciarCaptura()
    print("=== Iniciando captura de profiling ===")
    print("Frame Time objetivo: 16.67ms (60 FPS)")
    print("Abre Unreal Insights para ver detalles")
end

function Profiling:AnalizarFrame(frameTime)
    if frameTime > 33.33 then
        print("⚠️ CRÍTICO: " .. frameTime .. "ms (< 30 FPS)")
    elseif frameTime > 16.67 then
        print("⚡ ADVERTENCIA: " .. frameTime .. "ms (< 60 FPS)")
    else
        print("✓ ÓPTIMO: " .. frameTime .. "ms (60+ FPS)")
    end
end

function Profiling:IdentificarBottleneck(gameTime, renderTime, gpuTime)
    local maxTime = math.max(gameTime, renderTime, gpuTime)
    
    if maxTime == gameTime then
        print("Bottleneck: GAME THREAD (" .. gameTime .. "ms)")
        print("  - Revisar lógica de Lua")
        print("  - Reducir actores actualizados")
    elseif maxTime == renderTime then
        print("Bottleneck: RENDER THREAD (" .. renderTime .. "ms)")
        print("  - Reducir draw calls")
        print("  - Optimizar materiales")
    else
        print("Bottleneck: GPU (" .. gpuTime .. "ms)")
        print("  - Reducir resolución")
        print("  - Optimizar shaders")
    end
end

return Profiling`,
            language: "lua",
            description: "Herramientas básicas de profiling.",
          },
        ],
      },
      {
        heading: "Stat Commands",
        content: `**Comandos de consola:**

**FPS y Frame Time:**
\`\`\`
stat fps          -- Muestra FPS
stat unit         -- Muestra tiempos (Game, Draw, GPU)
stat unitgraph    -- Gráfico de tiempos
\`\`\`

**Memoria:**
\`\`\`
stat memory       -- Uso de memoria
stat gc           -- Garbage collection
stat lua          -- Memoria de Lua
\`\`\`

**Actores:**
\`\`\`
stat unit         -- Actores activos
stat collisions   -- Colisiones
stat particles    -- Sistema de partículas
\`\`\`

**Red:**
\`\`\`
stat net          -- Tráfico de red
stat rpc          -- Llamadas RPC
\`\`\``,
        codeExamples: [
          {
            title: "Stat commands en Lua",
            code: `local StatCommands = {}

function StatCommands:MostrarFPS()
    -- Simular stat fps
    local frameTime = self:ObtenerFrameTime()
    local fps = 1000 / frameTime
    print("FPS: " .. math.floor(fps))
end

function StatCommands:MostrarTiempos()
    local game = self:ObtenerGameTime()
    local render = self:ObtenerRenderTime()
    local gpu = self:ObtenerGPUTime()
    
    print("=== Frame Times ===")
    print("Game:   " .. game .. "ms")
    print("Draw:   " .. render .. "ms")
    print("GPU:    " .. gpu .. "ms")
    print("Total:  " .. (game + render) .. "ms")
end

function StatCommands:AnalizarMemoria()
    local memoriaLua = collectgarbage("count")
    print("=== Memoria ===")
    print("Lua: " .. math.floor(memoriaLua) .. " KB")
    print("Objetos: " .. self:ContarObjetos())
end

return StatCommands`,
            language: "lua",
            description: "Comandos de profiling simulados.",
          },
        ],
      },
      {
        heading: "Identificar Bottlenecks",
        content: `**Proceso de diagnóstico:**

1. **Medir FPS** - ¿Bajo de 60?
2. **Stat unit** - ¿Qué thread es más lento?
3. **Profiling específico** - Profundizar en el problema
4. **Optimizar** - Aplicar solución
5. **Verificar** - Medir mejora

**Bottlenecks comunes:**

**CPU (Game Thread):**
- Demasiados actores actualizando
- Lógica compleja en Tick
- Garbage collection frecuente

**GPU:**
- Muchos draw calls
- Materiales complejos
- Sombras de alta calidad

**Memoria:**
- Allocs frecuentes
- No usar object pooling
- Fugas de memoria`,
        codeExamples: [
          {
            title: "Diagnóstico completo",
            code: `local Diagnostico = {}

function Diagnostico:AnalizarRendimiento()
    print("=== DIAGNÓSTICO DE RENDIMIENTO ===")
    
    -- 1. FPS
    local fps = self:ObtenerFPS()
    print("FPS: " .. fps)
    
    if fps < 30 then
        print("  ⚠️ CRÍTICO: Necesita optimización urgente")
    elseif fps < 60 then
        print("  ⚡ ADVERTENCIA: Puede mejorar")
    else
        print("  ✓ Bien")
    end
    
    -- 2. Actores
    local actores = self:ContarActores()
    print("\\nActores activos: " .. actores)
    if actores > 1000 then
        print("  ⚠️ Demasiados actores")
    end
    
    -- 3. Memoria
    local memoria = collectgarbage("count")
    print("\\nMemoria Lua: " .. math.floor(memoria) .. " KB")
    
    -- 4. GC
    local gcTime = self:ObtenerTiempoGC()
    print("Tiempo GC: " .. gcTime .. "ms")
    if gcTime > 5 then
        print("  ⚠️ GC muy frecuente")
    end
end

return Diagnostico`,
            language: "lua",
            description: "Diagnóstico completo de rendimiento.",
          },
        ],
      },
    ],
    summary: `Unreal Insights para profiling detallado. Stat commands: fps, unit, memory, gc. Identificar bottlenecks (CPU/GPU/Memoria). Proceso: medir, diagnosticar, optimizar, verificar.`,
  },
  examples: [],
  interactive: {
    title: "Simula Profiling",
    description: "Analiza frame times",
    starterCode: `local function AnalizarFrame(frameTime)
    local fps = 1000 / frameTime
    
    if frameTime > 33.33 then
        print("Frame: " .. frameTime .. "ms - CRÍTICO (" .. math.floor(fps) .. " FPS)")
    elseif frameTime > 16.67 then
        print("Frame: " .. frameTime .. "ms - ADVERTENCIA (" .. math.floor(fps) .. " FPS)")
    else
        print("Frame: " .. frameTime .. "ms - ÓPTIMO (" .. math.floor(fps) .. " FPS)")
    end
end

-- Probar diferentes frame times
AnalizarFrame(10)   -- 100 FPS
AnalizarFrame(16)   -- 60 FPS
AnalizarFrame(25)   -- 40 FPS
AnalizarFrame(50)   -- 20 FPS`,
    environment: "lua",
    expectedOutput: "Frame: 10ms - ÓPTIMO",
  },
  miniExercise: {
    id: "mes-08-l01-ej1",
    lessonId: "mes-08-l01",
    title: "Analizador de FPS",
    instructions: `Crea un analizador de rendimiento:

1. Función \`Analizar(fps)\` que:
   - Si fps >= 60: imprimir "✓ ÓPTIMO: \[fps] FPS"
   - Si fps >= 30: imprimir "⚡ ADVERTENCIA: \[fps] FPS"
   - Si fps < 30: imprimir "⚠️ CRÍTICO: \[fps] FPS"
2. Prueba con fps: 75, 45, 25

**Salida esperada:**
\`\`\`
✓ ÓPTIMO: 75 FPS
⚡ ADVERTENCIA: 45 FPS
⚠️ CRÍTICO: 25 FPS
\`\`\``,
    starterCode: `function Analizar(fps)
    -- Implementar
end

-- Probar
Analizar(75)
Analizar(45)
Analizar(25)`,
    solution: `function Analizar(fps)
    if fps >= 60 then
        print("✓ ÓPTIMO: " .. fps .. " FPS")
    elseif fps >= 30 then
        print("⚡ ADVERTENCIA: " .. fps .. " FPS")
    else
        print("⚠️ CRÍTICO: " .. fps .. " FPS")
    end
end

Analizar(75)
Analizar(45)
Analizar(25)`,
    tests: [
      { type: "output_contains", expected: "✓ ÓPTIMO: 75 FPS", message: "75 FPS es óptimo" },
      { type: "output_contains", expected: "⚡ ADVERTENCIA: 45 FPS", message: "45 FPS es advertencia" },
      { type: "output_contains", expected: "⚠️ CRÍTICO: 25 FPS", message: "25 FPS es crítico" },
    ],
    hints: ["Usa if/elseif/else", "fps >= 60 para óptimo", "fps >= 30 para advertencia"],
    xpReward: 40,
    difficulty: "intermediate",
  },
  summary: "Unreal Insights para profiling. Stat commands: fps, unit, memory. Identificar bottlenecks. Medir, diagnosticar, optimizar.",
  resources: [
    { title: "Unreal Insights Documentation", url: "https://docs.unrealengine.com/5.0/en-US/unreal-insights-in-unreal-engine/", type: "documentation" },
  ],
  prerequisites: ["mes-07-l06"],
};

// ============================================
// LECCIÓN 8.2: Object Pooling
// ============================================

export const lesson02: Lesson = {
  id: "mes-08-l02",
  moduleId: "mes-08",
  lessonNumber: 2,
  title: "Object Pooling",
  description: "Reutilizar objetos en lugar de spawnear/destruir para reducir garbage collection.",
  estimatedTime: 40,
  difficulty: "advanced",
  theory: {
    title: "Object Pooling",
    objectives: [
      "Entender problemas de spawn/destroy",
      "Implementar pool de objetos",
      "Gestionar activación/desactivación",
      "Optimizar balas, partículas y enemigos",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "Problema: Spawn/Destroy",
        content: `**Spawnear y destruir es COSTOSO:**

\`\`\`lua
-- MAL: Spawn y destroy constante
function Disparar()
    local bala = Spawn("Bala")  -- Alloc memoria
    bala:Mover()
    
    -- 1 segundo después
    bala:Destroy()  -- GC tiene que limpiar
end

-- Problemas:
-- 1. Alloc memoria constante
-- 2. Garbage collection frecuente
-- 3. Frame drops cuando GC corre
-- 4. Fragmentación de memoria
\`\`\`

**Solución: Object Pool**
\`\`\`lua
-- BIEN: Reutilizar objetos
local pool = ObjectPool.new("Bala", 50)  -- 50 balas pre-creadas

function Disparar()
    local bala = pool:Obtener()  -- Reutiliza existente
    bala:Activar()
    bala:Mover()
    
    -- Cuando termina
    bala:Desactivar()
    pool:Devolver(bala)  -- Vuelve al pool
end

-- Ventajas:
-- 1. Cero allocs en runtime
-- 2. GC no trabaja
-- 3. Frames estables
-- 4. Memoria contigua
\`\`\``,
        codeExamples: [
          {
            title: "Problema vs solución",
            code: `-- MAL: Sin pooling
local function DispararSinPool()
    local bala = Spawn("Bala")  -- Alloc
    bala:SetLocation(inicio)
    bala:Mover(direccion)
    
    -- Destruir después
    Timer(1, function()
        bala:Destroy()  -- GC trabaja
    end)
end

-- BIEN: Con pooling
local PoolBalas = {}

function PoolBalas:Inicializar(cantidad)
    self.objetos = {}
    for i = 1, cantidad do
        local bala = Spawn("Bala")
        bala:Desactivar()
        table.insert(self.objetos, bala)
    end
end

function PoolBalas:Obtener()
    for _, bala in ipairs(self.objetos) do
        if not bala:EstaActiva() then
            bala:Activar()
            return bala
        end
    end
    return nil  -- Pool vacío
end

function PoolBalas:Devolver(bala)
    bala:Desactivar()
end

return PoolBalas`,
            language: "lua",
            description: "Comparación: sin pool vs con pool.",
          },
        ],
      },
      {
        heading: "Implementar Object Pool",
        content: `**Pool genérico:**
\`\`\`lua
local ObjectPool = {}
ObjectPool.__index = ObjectPool

function ObjectPool.new(clase, cantidad)
    local self = setmetatable({}, ObjectPool)
    self.clase = clase
    self.pool = {}
    self.activos = {}
    
    -- Pre-crear objetos
    for i = 1, cantidad do
        local obj = Spawn(clase)
        obj:Desactivar()
        table.insert(self.pool, obj)
    end
    
    return self
end

function ObjectPool:Obtener()
    if #self.pool == 0 then
        -- Pool vacío, expandir o retornar nil
        return nil
    end
    
    local obj = table.remove(self.pool)
    obj:Activar()
    table.insert(self.activos, obj)
    return obj
end

function ObjectPool:Devolver(obj)
    obj:Desactivar()
    
    -- Mover de activos a pool
    for i, activo in ipairs(self.activos) do
        if activo == obj then
            table.remove(self.activos, i)
            table.insert(self.pool, obj)
            break
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Pool genérico",
            code: `local ObjectPool = {}
ObjectPool.__index = ObjectPool

function ObjectPool.new(clase, cantidad)
    local self = setmetatable({}, ObjectPool)
    self.clase = clase
    self.pool = {}
    self.activos = {}
    self.creados = 0
    
    -- Pre-crear
    for i = 1, cantidad do
        self:CrearObjeto()
    end
    
    return self
end

function ObjectPool:CrearObjeto()
    local obj = Spawn(self.clase)
    obj:Desactivar()
    table.insert(self.pool, obj)
    self.creados = self.creados + 1
end

function ObjectPool:Obtener()
    if #self.pool == 0 then
        -- Expandir pool dinámicamente
        self:CrearObjeto()
        print("Pool expandido: " .. self.creados .. " objetos")
    end
    
    local obj = table.remove(self.pool)
    obj:Activar()
    table.insert(self.activos, obj)
    return obj
end

function ObjectPool:Devolver(obj)
    obj:Desactivar()
    
    for i, activo in ipairs(self.activos) do
        if activo == obj then
            table.remove(self.activos, i)
            table.insert(self.pool, obj)
            return
        end
    end
end

function ObjectPool:Estadisticas()
    print("Pool: " .. #self.pool .. " disponibles")
    print("Activos: " .. #self.activos)
    print("Total creados: " .. self.creados)
end

return ObjectPool`,
            language: "lua",
            description: "Implementación completa de Object Pool.",
          },
        ],
      },
      {
        heading: "Casos de Uso",
        content: `**Balas/Proyectiles:**
\`\`\`lua
local PoolBalas = ObjectPool.new("Bala", 100)

function Jugador:Disparar()
    local bala = PoolBalas:Obtener()
    if bala then
        bala:SetLocation(self:GetMuzzleLocation())
        bala:SetRotation(self:GetAimRotation())
        bala:Impulsar()
    end
end
\`\`\`

**Partículas:**
\`\`\`lua
local PoolParticulas = ObjectPool.new("FX_Impact", 50)

function MostrarImpacto(ubicacion)
    local fx = PoolParticulas:Obtener()
    if fx then
        fx:SetLocation(ubicacion)
        fx:Activar()
        fx:DesactivarDespues(2)
    end
end
\`\`\`

**Enemigos:**
\`\`\`lua
local PoolEnemigos = ObjectPool.new("Enemy", 20)

function SpawnEnemigo(ubicacion)
    local enemigo = PoolEnemigos:Obtener()
    if enemigo then
        enemigo:SetLocation(ubicacion)
        enemigo:ActivarIA()
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Pool de balas",
            code: `local SistemaBalas = {}

function SistemaBalas:Inicializar()
    self.pool = ObjectPool.new("Bala", 100)
end

function SistemaBalas:Disparar(origen, direccion)
    local bala = self.pool:Obtener()
    
    if bala then
        bala:SetActorLocation(origen)
        bala:SetActorRotation(direccion:ToRotator())
        bala:Impulsar(direccion * 5000)
        
        -- Devolver al pool después de 3 segundos
        Timer(3, function()
            self.pool:Devolver(bala)
        end)
    else
        print("¡Pool de balas vacío!")
    end
end

function SistemaBalas:Estadisticas()
    self.pool:Estadisticas()
end

return SistemaBalas`,
            language: "lua",
            description: "Sistema de balas con pooling.",
          },
        ],
      },
    ],
    summary: `Object Pool reutiliza objetos en lugar de spawn/destroy. Pre-crear cantidad inicial. Obttener activa, Devolver desactiva. Cero allocs en runtime, GC estable.`,
  },
  examples: [],
  interactive: {
    title: "Simula Object Pool",
    description: "Pool simple de objetos",
    starterCode: `local Pool = {
    objetos = {},
    activos = {}
}

-- Pre-crear 5 objetos
for i = 1, 5 do
    table.insert(Pool.objetos, {id = i, activo = false})
end

function Pool:Obtener()
    for _, obj in ipairs(self.objetos) do
        if not obj.activo then
            obj.activo = true
            table.insert(self.activos, obj)
            print("Obtenido objeto " .. obj.id)
            return obj
        end
    end
    print("Pool vacío")
    return nil
end

function Pool:Devolver(obj)
    obj.activo = false
    print("Devuelto objeto " .. obj.id)
end

-- Probar
Pool:Obtener()
Pool:Obtener()
Pool:Devolver(Pool.activos[1])
Pool:Obtener()  -- Reutiliza el devuelto`,
    environment: "lua",
    expectedOutput: "Obtenido objeto 1",
  },
  miniExercise: {
    id: "mes-08-l02-ej1",
    lessonId: "mes-08-l02",
    title: "Pool de Balas",
    instructions: `Crea un pool de 10 balas:

1. Pre-crear 10 balas con id del 1 al 10
2. Función \`Obtener()\` que retorna bala inactiva
3. Función \`Devolver(bala)\` que desactiva
4. Obtén 3 balas, devuelve 1, obtén otra
5. Imprime estado después de cada operación

**Salida esperada:**
\`\`\`
Obtenida bala 1 (disponibles: 9)
Obtenida bala 2 (disponibles: 8)
Obtenida bala 3 (disponibles: 7)
Devuelta bala 1 (disponibles: 8)
Obtenida bala 1 (disponibles: 7)
\`\`\``,
    starterCode: `local PoolBalas = {
    balas = {},
    activas = {}
}

-- Pre-crear 10 balas


function PoolBalas:Obtener()
    -- Implementar
end

function PoolBalas:Devolver(bala)
    -- Implementar
end

-- Probar
PoolBalas:Obtener()
PoolBalas:Obtener()
PoolBalas:Obtener()
PoolBalas:Devolver(PoolBalas.activas[1])
PoolBalas:Obtener()`,
    solution: `local PoolBalas = {
    balas = {},
    activas = {}
}

-- Pre-crear 10 balas
for i = 1, 10 do
    table.insert(PoolBalas.balas, {id = i, activa = false})
end

function PoolBalas:Obtener()
    for _, bala in ipairs(self.balas) do
        if not bala.activa then
            bala.activa = true
            table.insert(self.activas, bala)
            print("Obtenida bala " .. bala.id .. " (disponibles: " .. #self.balas - #self.activas .. ")")
            return bala
        end
    end
    print("Pool vacío")
    return nil
end

function PoolBalas:Devolver(bala)
    bala.activa = false
    for i, activa in ipairs(self.activas) do
        if activa == bala then
            table.remove(self.activas, i)
            break
        end
    end
    print("Devuelta bala " .. bala.id .. " (disponibles: " .. #self.balas - #self.activas .. ")")
end

PoolBalas:Obtener()
PoolBalas:Obtener()
PoolBalas:Obtener()
PoolBalas:Devolver(PoolBalas.activas[1])
PoolBalas:Obtener()`,
    tests: [
      { type: "output_contains", expected: "Obtenida bala 1", message: "Primera bala obtenida" },
      { type: "output_contains", expected: "Devuelta bala 1", message: "Bala devuelta" },
      { type: "output_contains", expected: "disponibles: 7", message: "Conteo correcto" },
    ],
    hints: ["Pre-crear 10 balas con tabla", "Buscar primera inactiva en Obtener", "Marcar activa=true/false"],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: "Object Pool reutiliza objetos. Pre-crear cantidad. Obtener activa, Devolver desactiva. Cero allocs, GC estable.",
  resources: [],
  prerequisites: ["mes-08-l01"],
};

// ============================================
// LECCIÓN 8.3: Memory Management
// ============================================

export const lesson03: Lesson = {
  id: "mes-08-l03",
  moduleId: "mes-08",
  lessonNumber: 3,
  title: "Memory Management",
  description: "Gestión de memoria, garbage collection, evitar allocs innecesarias en Lua.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Memory Management",
    objectives: [
      "Entender garbage collection en Lua",
      "Evitar allocs innecesarias",
      "Gestionar memoria de tablas",
      "Prevenir memory leaks",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Garbage Collection en Lua",
        content: `**Cómo funciona GC:**
\`\`\`
1. Lua asigna memoria para objetos
2. Cuando no hay referencias, objeto es "basura"
3. GC corre periódicamente y libera memoria
4. Durante GC, el juego se pausa (stutter)
\`\`\`

**Problemas comunes:**
\`\`\`lua
-- MAL: Crear tablas en Tick
function Tick()
    local datos = {x = 1, y = 2}  -- Alloc cada frame
end

-- MAL: Concatenar strings en loop
function BuildString()
    local s = ""
    for i = 1, 100 do
        s = s .. i  -- Crea 100 strings temporales
    end
end

-- MAL: Closures que capturan variables
function CrearFuncion()
    local grande = {}  -- Nunca se libera
    return function()
        print(#grande)
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "GC-friendly code",
            code: `local MemoryManager = {}

-- MAL: Allocs en Tick
function MalTick()
    local temp = {x = 1, y = 2}  -- Alloc cada frame
    self.posicion = temp
end

-- BIEN: Reutilizar tabla
function BuenTick()
    self.temp.x = 1
    self.temp.y = 2
    self.posicion = self.temp
end

-- MAL: String concatenation
function MalString()
    local s = ""
    for i = 1, 100 do
        s = s .. i  -- 100 allocs
    end
end

-- BIEN: Table concat
function BuenString()
    local t = {}
    for i = 1, 100 do
        table.insert(t, tostring(i))
    end
    local s = table.concat(t)  -- 1 alloc
end

return MemoryManager`,
            language: "lua",
            description: "Código GC-friendly vs problemático.",
          },
        ],
      },
      {
        heading: "Evitar Allocs Innecesarias",
        content: `**Técnicas:**

**1. Reutilizar tablas:**
\`\`\`lua
-- En BeginPlay
self.tempVector = {}

-- En Tick (no crear nueva)
self.tempVector.x = newX
self.tempVector.y = newY
\`\`\`

**2. Usar table.concat para strings:**
\`\`\`lua
-- MAL
local s = ""
for i = 1, n do
    s = s .. "texto"
end

-- BIEN
local t = {}
for i = 1, n do
    table.insert(t, "texto")
end
local s = table.concat(t)
\`\`\`

**3. Evitar closures que capturan:**
\`\`\`lua
-- MAL
function CrearCallback()
    local datos = {}  -- No se libera
    return function()
        return #datos
    end
end

-- BIEN
function CrearCallback()
    return function()
        return 0
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Optimizar allocs",
            code: `local OptimizacionMemoria = {}

-- Reutilizar vectores
function OptimizacionMemoria:CrearVectorPool(cantidad)
    self.vectorPool = {}
    for i = 1, cantidad do
        table.insert(self.vectorPool, {x = 0, y = 0, z = 0})
    end
    self.vectorIndex = 1
end

function OptimizacionMemoria:ObtenerVector()
    local vector = self.vectorPool[self.vectorIndex]
    self.vectorIndex = (self.vectorIndex % #self.vectorPool) + 1
    return vector
end

-- String builder
function OptimizacionMemoria:StringBuilder()
    local t = {}
    return {
        append = function(self, s)
            table.insert(t, s)
        end,
        build = function(self)
            return table.concat(t)
        end
    }
end

-- Evitar closure leak
function OptimizacionMemoria:CrearCallbackSeguro(valor)
    -- Pasar valor como parámetro, no capturar
    return function(v)
        return v or valor
    end
end

return OptimizacionMemoria`,
            language: "lua",
            description: "Técnicas para evitar allocs.",
          },
        ],
      },
      {
        heading: "Prevenir Memory Leaks",
        content: `**Causas comunes:**

**1. Referencias circulares:**
\`\`\`lua
local a = {}
local b = {}
a.b = b  -- a referencia b
b.a = a  -- b referencia a
-- GC no puede liberar
\`\`\`

**2. Event listeners no removidos:**
\`\`\`lua
function Suscribirse()
    Evento.OnUpdate:Add(function()
        -- Closure captura 'self'
        self:Actualizar()
    end)
    -- Nunca se remueve
end
\`\`\`

**3. Tablas globales que crecen:**
\`\`\`lua
Historial = {}
function Agregar(dato)
    table.insert(Historial, dato)  -- Crece infinitamente
end
\`\`\``,
        codeExamples: [
          {
            title: "Prevenir leaks",
            code: `local PrevencionLeaks = {}

-- 1. Evitar referencias circulares
function PrevencionLeaks:CrearObjetos()
    local a = {}
    local b = setmetatable({}, {__mode = "k"})  -- Weak table
    a.b = b
    b.a = a  -- GC puede liberar
end

-- 2. Remover event listeners
function PrevencionLeaks:Suscribirse(evento)
    self.listenerId = evento:Add(self.Callback)
    
    -- Remover cuando no se necesite
    function self:Limpieza()
        evento:Remove(self.listenerId)
    end
end

-- 3. Limitar tamaño de tablas
function PrevencionLeaks:AgregarAlHistorial(dato)
    table.insert(self.historial, dato)
    
    -- Mantener solo últimos 100
    while #self.historial > 100 do
        table.remove(self.historial, 1)
    end
end

-- 4. Usar weak tables para caches
function PrevencionLeaks:CrearCache()
    return setmetatable({}, {__mode = "v"})  -- Weak values
end

return PrevencionLeaks`,
            language: "lua",
            description: "Prevención de memory leaks.",
          },
        ],
      },
    ],
    summary: `GC libera memoria no usada. Evitar allocs en Tick: reutilizar tablas, table.concat para strings. Prevenir leaks: weak tables, remover listeners, limitar tamaño.`,
  },
  examples: [],
  interactive: {
    title: "Simula GC",
    description: "Ver memoria antes/después de GC",
    starterCode: `print("Memoria inicial: " .. collectgarbage("count") .. " KB")

-- Crear basura
local basura = {}
for i = 1, 1000 do
    basura[i] = {}
    for j = 1, 100 do
        basura[i][j] = "texto"
    end
end

print("Después de crear: " .. collectgarbage("count") .. " KB")

-- Liberar referencia
basura = nil

print("Después de liberar: " .. collectgarbage("count") .. " KB")

-- Forzar GC
collectgarbage("collect")

print("Después de GC: " .. collectgarbage("count") .. " KB")`,
    environment: "lua",
    expectedOutput: "Memoria inicial",
  },
  miniExercise: {
    id: "mes-08-l03-ej1",
    lessonId: "mes-08-l03",
    title: "Optimizar String Concatenation",
    instructions: `Compara dos métodos de concatenar:

1. Método MALO: s = s .. i en loop de 1 a 10
2. Método BUENO: table.insert + table.concat
3. Imprime resultado de ambos
4. Deben ser iguales

**Salida esperada:**
\`\`\`
Malo: 12345678910
Bueno: 12345678910
Ambos iguales: true
\`\`\``,
    starterCode: `-- Método MALO
local function Malo()
    local s = ""
    for i = 1, 10 do
        s = s .. i
    end
    return s
end

-- Método BUENO
local function Bueno()
    local t = {}
    for i = 1, 10 do
        -- Implementar
    end
    return table.concat(t)
end

local m = Malo()
local b = Bueno()
print("Malo: " .. m)
print("Bueno: " .. b)
print("Ambos iguales: " .. tostring(m == b))`,
    solution: `local function Malo()
    local s = ""
    for i = 1, 10 do
        s = s .. i
    end
    return s
end

local function Bueno()
    local t = {}
    for i = 1, 10 do
        table.insert(t, tostring(i))
    end
    return table.concat(t)
end

local m = Malo()
local b = Bueno()
print("Malo: " .. m)
print("Bueno: " .. b)
print("Ambos iguales: " .. tostring(m == b))`,
    tests: [
      { type: "output_contains", expected: "Malo: 12345678910", message: "Malo funciona" },
      { type: "output_contains", expected: "Bueno: 12345678910", message: "Bueno funciona" },
      { type: "output_contains", expected: "Ambos iguales: true", message: "Resultados iguales" },
    ],
    hints: ["Usar table.insert(t, tostring(i))", "Retornar table.concat(t)", "tostring(i) para convertir número"],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: "GC libera memoria. Reutilizar tablas, table.concat para strings. Weak tables, remover listeners, limitar tamaño.",
  resources: [],
  prerequisites: ["mes-08-l02"],
};

// ============================================
// LECCIÓN 8.4: Coroutines
// ============================================

export const lesson04: Lesson = {
  id: "mes-08-l04",
  moduleId: "mes-08",
  lessonNumber: 4,
  title: "Coroutines",
  description: "Tasks asíncronos, operaciones no bloqueantes, yield y resume.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Coroutines",
    objectives: [
      "Entender coroutines y threads",
      "Usar yield para pausar",
      "Resume para continuar",
      "Implementar operaciones asíncronas",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "¿Qué son Coroutines?",
        content: `**Coroutines son threads cooperativos:**

\`\`\`lua
-- Función normal (bloqueante)
function TareaLarga()
    for i = 1, 1000000 do
        -- Bloquea el juego
    end
end

-- Coroutine (no bloqueante)
function TareaLarga()
    for i = 1, 1000000 do
        if i % 1000 == 0 then
            coroutine.yield()  -- Pausa, devuelve control
        end
    end
end

-- Uso
local thread = coroutine.create(TareaLarga)
coroutine.resume(thread)  -- Ejecuta hasta yield
coroutine.resume(thread)  -- Continúa desde yield
\`\`\`

**Ventajas:**
- No bloquea el game thread
- Permite tareas largas en varios frames
- Mejor que timers para estado complejo`,
        codeExamples: [
          {
            title: "Coroutines básicas",
            code: `local Coroutines = {}

-- Coroutine simple
function Coroutines:EjemploBasico()
    local thread = coroutine.create(function()
        print("Inicio")
        coroutine.yield()  -- Pausa
        print("Continuación")
        coroutine.yield()  -- Pausa
        print("Fin")
    end)
    
    -- Ejecutar por partes
    coroutine.resume(thread)  -- "Inicio"
    coroutine.resume(thread)  -- "Continuación"
    coroutine.resume(thread)  -- "Fin"
end

-- Coroutine con valores
function Coroutines:ConValores()
    local thread = coroutine.create(function()
        for i = 1, 5 do
            coroutine.yield(i)  -- Retorna valor
        end
    end)
    
    while coroutine.status(thread) ~= "dead" do
        local _, valor = coroutine.resume(thread)
        print("Valor: " .. valor)
    end
end

return Coroutines`,
            language: "lua",
            description: "Ejemplos básicos de coroutines.",
          },
        ],
      },
      {
        heading: "Yield y Resume",
        content: `**Yield pausa la coroutine:**
\`\`\`lua
function MiCoroutine()
    print("Paso 1")
    coroutine.yield()  -- Pausa
    
    print("Paso 2")
    coroutine.yield()  -- Pausa
    
    print("Paso 3")
    -- Termina
end
\`\`\`

**Resume continúa:**
\`\`\`lua
local thread = coroutine.create(MiCoroutine)

-- Estado: "suspended"
coroutine.resume(thread)  -- Ejecuta hasta primer yield
-- Estado: "suspended"
coroutine.resume(thread)  -- Continúa desde yield
-- Estado: "suspended"
coroutine.resume(thread)  -- Continúa
-- Estado: "dead"
\`\`\`

**Yield con valores:**
\`\`\`lua
function Contador()
    for i = 1, 10 do
        coroutine.yield(i)  -- Retorna i
    end
end

local thread = coroutine.create(Contador)
_, valor = coroutine.resume(thread)  -- valor = 1
_, valor = coroutine.resume(thread)  -- valor = 2
\`\`\``,
        codeExamples: [
          {
            title: "Yield/Resume avanzado",
            code: `local CoroutineAvanzada = {}

-- Coroutine con estado
function CoroutineAvanzada:Secuencial()
    local thread = coroutine.create(function()
        for i = 1, 10 do
            coroutine.yield("Paso " .. i)
        end
        return "Completado"
    end)
    
    return {
        thread = thread,
        update = function(self)
            if coroutine.status(self.thread) ~= "dead" then
                local _, resultado = coroutine.resume(self.thread)
                print(resultado)
            end
        end
    }
end

-- Coroutine que recibe valores
function CoroutineAvanzada:ConInput()
    local thread = coroutine.create(function()
        while true do
            local input = coroutine.yield()
            print("Recibido: " .. input)
        end
    end)
    
    coroutine.resume(thread)  -- Iniciar
    coroutine.resume(thread, "Hola")  -- Enviar valor
    coroutine.resume(thread, "Mundo")  -- Enviar valor
end

return CoroutineAvanzada`,
            language: "lua",
            description: "Yield/Resume con estado y valores.",
          },
        ],
      },
      {
        heading: "Operaciones Asíncronas",
        content: `**Tareas en background:**
\`\`\`lua
function CargarDatosAsync()
    coroutine.create(function()
        -- Frame 1: Iniciar carga
        local datos = nil
        coroutine.yield()
        
        -- Frame 2-10: Cargar (simulado)
        for i = 1, 10 do
            -- Cargar parte
            coroutine.yield(i / 10)  -- Progreso
        end
        
        -- Frame 11: Completar
        print("Carga completada")
    end)
end
\`\`\`

**Múltiples coroutines:**
\`\`\`lua
local threads = {}

function ActualizarCoroutines(dt)
    for i = #threads, 1, -1 do
        local thread = threads[i]
        
        if coroutine.status(thread) ~= "dead" then
            coroutine.resume(thread, dt)
        else
            table.remove(threads, i)
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de coroutines",
            code: `local CoroutineSystem = {}

function CoroutineSystem:Inicializar()
    self.threads = {}
end

function CoroutineSystem:Crear(func)
    local thread = coroutine.create(func)
    table.insert(self.threads, thread)
    return thread
end

function CoroutineSystem:Actualizar(dt)
    for i = #self.threads, 1, -1 do
        local thread = self.threads[i]
        
        if coroutine.status(thread) ~= "dead" then
            local success, err = coroutine.resume(thread, dt)
            
            if not success then
                print("Error en coroutine: " .. err)
                table.remove(self.threads, i)
            end
        else
            table.remove(self.threads, i)
        end
    end
end

-- Ejemplo: Carga asíncrona
function CoroutineSystem:CargarNivelAsync(nivel)
    self:Crear(function(dt)
        print("Iniciando carga de " .. nivel)
        
        -- Simular carga en varios frames
        for i = 1, 10 do
            coroutine.yield()  -- Pausa hasta próximo frame
            print("Cargando: " .. (i * 10) .. "%")
        end
        
        print("Nivel cargado")
    end)
end

return CoroutineSystem`,
            language: "lua",
            description: "Sistema de gestión de coroutines.",
          },
        ],
      },
    ],
    summary: `Coroutines son threads cooperativos. Yield pausa, resume continúa. Útil para tareas largas no bloqueantes. Múltiples coroutines se actualizan cada frame.`,
  },
  examples: [],
  interactive: {
    title: "Simula Coroutines",
    description: "Coroutine con yield/resume",
    starterCode: `local function Contador()
    for i = 1, 5 do
        print("Yield " .. i)
        coroutine.yield(i)
    end
    return "Fin"
end

local thread = coroutine.create(Contador)

print("Estado: " .. coroutine.status(thread))

while coroutine.status(thread) ~= "dead" do
    local ok, valor = coroutine.resume(thread)
    print("Resume: " .. tostring(valor))
    print("Estado: " .. coroutine.status(thread))
end`,
    environment: "lua",
    expectedOutput: "Yield 1",
  },
  miniExercise: {
    id: "mes-08-l04-ej1",
    lessonId: "mes-08-l04",
    title: "Coroutine de Carga",
    instructions: `Crea una coroutine que simule carga:

1. Coroutine con loop del 1 al 5
2. Cada iteración hace yield con el progreso
3. Resume hasta que termine
4. Imprime progreso y estado final

**Salida esperada:**
\`\`\`
Cargando: 20%
Cargando: 40%
Cargando: 60%
Cargando: 80%
Cargando: 100%
Estado final: dead
Resultado: Completado
\`\`\``,
    starterCode: `local function Cargar()
    -- Implementar coroutine con yield
end

local thread = coroutine.create(Cargar)

while coroutine.status(thread) ~= "dead" do
    local ok, resultado = coroutine.resume(thread)
    if resultado then
        print("Cargando: " .. resultado .. "%")
    end
end

print("Estado final: " .. coroutine.status(thread))`,
    solution: `local function Cargar()
    for i = 1, 5 do
        coroutine.yield(i * 20)
    end
    return "Completado"
end

local thread = coroutine.create(Cargar)

while coroutine.status(thread) ~= "dead" do
    local ok, resultado = coroutine.resume(thread)
    if resultado and type(resultado) == "number" then
        print("Cargando: " .. resultado .. "%")
    elseif resultado then
        print("Resultado: " .. resultado)
    end
end

print("Estado final: " .. coroutine.status(thread))`,
    tests: [
      { type: "output_contains", expected: "Cargando: 20%", message: "Primer progreso" },
      { type: "output_contains", expected: "Cargando: 100%", message: "Último progreso" },
      { type: "output_contains", expected: "Estado final: dead", message: "Terminó correctamente" },
    ],
    hints: ["Loop del 1 al 5 con yield(i * 20)", "Retornar string al final", "While status ~= dead"],
    xpReward: 50,
    difficulty: "intermediate",
  },
  summary: "Coroutines: threads cooperativos. Yield pausa, resume continúa. Para tareas largas no bloqueantes. Actualizar múltiples cada frame.",
  resources: [],
  prerequisites: ["mes-08-l03"],
};

// ============================================
// LECCIÓN 8.5: Optimización de Código Lua
// ============================================

export const lesson05: Lesson = {
  id: "mes-08-l05",
  moduleId: "mes-08",
  lessonNumber: 5,
  title: "Optimización de Código Lua",
  description: "Patrones de código eficiente, evitar operaciones costosas, tablas vs arrays.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Optimización de Código Lua",
    objectives: [
      "Escribir código Lua eficiente",
      "Evitar patrones costosos",
      "Usar estructuras de datos apropiadas",
      "Optimizar loops y búsquedas",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Patrones Eficientes",
        content: `**1. Local vs Global:**
\`\`\`lua
-- MALO: Global (búsqueda en _G)
function Calcular()
    return math.sqrt(2)
end

-- BUENO: Local (búsqueda directa)
local sqrt = math.sqrt
function Calcular()
    return sqrt(2)
end
\`\`\`

**2. Pre-calcular longitudes:**
\`\`\`lua
-- MALO: #tabla cada iteración
for i = 1, #tabla do
    -- ...
end

-- BUENO: Guardar longitud
local n = #tabla
for i = 1, n do
    -- ...
end
\`\`\`

**3. Evitar crear funciones en loops:**
\`\`\`lua
-- MALO
for i = 1, 100 do
    local f = function() return i end
end

-- BUENO
local function f(i) return i end
for i = 1, 100 do
    f(i)
end
\`\`\``,
        codeExamples: [
          {
            title: "Código optimizado",
            code: `local Optimizacion = {}

-- 1. Locales para funciones frecuentes
local insert = table.insert
local concat = table.concat
local sqrt = math.sqrt

-- 2. Pre-calcular en loops
function Optimizacion:ProcesarTabla(tabla)
    local resultado = {}
    local n = #tabla  -- Pre-calcar
    
    for i = 1, n do
        insert(resultado, tabla[i] * 2)
    end
    
    return resultado
end

-- 3. Evitar crear funciones
function Optimizacion:CrearMultiplicadores(n)
    local resultados = {}
    
    local function multiplicar(x)
        return x * n
    end
    
    for i = 1, 100 do
        insert(resultados, multiplicar(i))
    end
    
    return resultados
end

-- 4. Usar table.concat para strings
function Optimizacion:BuildString(tabla)
    return concat(tabla)  -- Mejor que ..
end

return Optimizacion`,
            language: "lua",
            description: "Patrones de código optimizado.",
          },
        ],
      },
      {
        heading: "Estructuras de Datos",
        content: `**Tablas como arrays:**
\`\`\`lua
-- BUENO: Array numérico
local array = {1, 2, 3, 4, 5}
for i = 1, #array do
    print(array[i])
end
\`\`\`

**Tablas como hash:**
\`\`\`lua
-- BUENO: Hash para búsqueda rápida
local lookup = {
    ["jugador1"] = true,
    ["jugador2"] = true
}

if lookup[nombre] then
    -- Búsqueda O(1)
end
\`\`\`

**Evitar:**
\`\`\`lua
-- MALO: Búsqueda lineal O(n)
function TieneElemento(tabla, elemento)
    for _, v in ipairs(tabla) do
        if v == elemento then
            return true
        end
    end
    return false
end

-- BUENO: Hash lookup O(1)
local set = {elemento1 = true, elemento2 = true}
if set[elemento] then
    -- Búsqueda instantánea
end
\`\`\``,
        codeExamples: [
          {
            title: "Estructuras eficientes",
            code: `local Estructuras = {}

-- Array: iteración rápida
function Estructuras:CrearArray(n)
    local t = {}
    for i = 1, n do
        t[i] = i * 2
    end
    return t
end

-- Hash: búsqueda rápida
function Estructuras:CrearSet(tabla)
    local set = {}
    for _, v in ipairs(tabla) do
        set[v] = true
    end
    return set
end

-- Búsqueda O(1) vs O(n)
function Estructuras:BuscarEnSet(set, elemento)
    return set[elemento] ~= nil  -- O(1)
end

function Estructuras:BuscarEnArray(array, elemento)
    for _, v in ipairs(array) do  -- O(n)
        if v == elemento then
            return true
        end
    end
    return false
end

return Estructuras`,
            language: "lua",
            description: "Arrays vs hash para diferentes casos.",
          },
        ],
      },
      {
        heading: "Optimizar Loops",
        content: `**Iteración eficiente:**
\`\`\`lua
-- MALO: pairs cuando sabes que es array
for k, v in pairs(array) do
    -- k es 1, 2, 3... desperdicio
end

-- BUENO: ipairs para arrays
for i, v in ipairs(array) do
    -- Más rápido
end
\`\`\`

**Evitar iteraciones innecesarias:**
\`\`\`lua
-- MALO: Iterar para encontrar uno
for _, enemigo in ipairs(enemigos) do
    if enemigo:EstaVivo() then
        enemigo:Atacar()
        break  -- Solo necesitamos uno
    end
end

-- MEJOR: Función que retorna primero
local function EncontrarPrimero(tabla, condicion)
    for _, v in ipairs(tabla) do
        if condicion(v) then
            return v
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Loops optimizados",
            code: `local Loops = {}

-- ipairs vs pairs
function Loops:IterarArray(array)
    -- BUENO: ipairs es más rápido para arrays
    for i, v in ipairs(array) do
        -- ...
    end
    
    -- MALO: pairs crea pares k,v innecesarios
    for k, v in pairs(array) do
        -- ...
    end
end

-- Break temprano
function Loops:EncontrarPrimero(tabla, predicado)
    for _, v in ipairs(tabla) do
        if predicado(v) then
            return v  -- Salir temprano
        end
    end
    return nil
end

-- Evitar iteraciones anidadas
function Loops:Interseccion(a, b)
    -- MALO: O(n*m)
    -- for _, va in ipairs(a) do
    --     for _, vb in ipairs(b) do
    --         ...
    --     end
    -- end
    
    -- BUENO: O(n+m) con hash
    local setB = {}
    for _, v in ipairs(b) do
        setB[v] = true
    end
    
    local resultado = {}
    for _, v in ipairs(a) do
        if setB[v] then
            table.insert(resultado, v)
        end
    end
    
    return resultado
end

return Loops`,
            language: "lua",
            description: "Optimización de loops.",
          },
        ],
      },
    ],
    summary: `Usar locals para funciones frecuentes. Pre-calcular longitudes. ipairs para arrays, pairs para hash. Hash para búsqueda O(1). Break temprano en loops.`,
  },
  examples: [],
  interactive: {
    title: "Compara Iteración",
    description: "ipairs vs pairs",
    starterCode: `local array = {10, 20, 30, 40, 50}

print("=== ipairs ===")
for i, v in ipairs(array) do
    print(i .. ": " .. v)
end

print("\\n=== pairs ===")
for k, v in pairs(array) do
    print(k .. ": " .. v)
end

print("\\nAmbos producen lo mismo, pero ipairs es más rápido para arrays")`,
    environment: "lua",
    expectedOutput: "=== ipairs ===",
  },
  miniExercise: {
    id: "mes-08-l05-ej1",
    lessonId: "mes-08-l05",
    title: "Optimizar Búsqueda",
    instructions: `Convierte búsqueda lineal O(n) a hash O(1):

1. Crea array con 5 nombres
2. Función \`TieneLineal(nombre)\` que busca en array
3. Crea hash set del array
4. Función \`TieneHash(nombre)\` que busca en hash
5. Ambas deben retornar true/false

**Salida esperada:**
\`\`\`
Búsqueda lineal: true
Búsqueda hash: true
Ambos iguales: true
\`\`\``,
    starterCode: `local nombres = {"Ana", "Beto", "Carlos", "Diana", "Eva"}

function TieneLineal(nombre)
    -- Búsqueda O(n) en array
end

local set = {}
-- Crear hash set

function TieneHash(nombre)
    -- Búsqueda O(1) en hash
end

print("Búsqueda lineal: " .. tostring(TieneLineal("Carlos")))
print("Búsqueda hash: " .. tostring(TieneHash("Carlos")))
print("Ambos iguales: " .. tostring(TieneLineal("Carlos") == TieneHash("Carlos")))`,
    solution: `local nombres = {"Ana", "Beto", "Carlos", "Diana", "Eva"}

function TieneLineal(nombre)
    for _, n in ipairs(nombres) do
        if n == nombre then
            return true
        end
    end
    return false
end

local set = {}
for _, n in ipairs(nombres) do
    set[n] = true
end

function TieneHash(nombre)
    return set[nombre] ~= nil
end

print("Búsqueda lineal: " .. tostring(TieneLineal("Carlos")))
print("Búsqueda hash: " .. tostring(TieneHash("Carlos")))
print("Ambos iguales: " .. tostring(TieneLineal("Carlos") == TieneHash("Carlos")))`,
    tests: [
      { type: "output_contains", expected: "Búsqueda lineal: true", message: "Lineal funciona" },
      { type: "output_contains", expected: "Búsqueda hash: true", message: "Hash funciona" },
      { type: "output_contains", expected: "Ambos iguales: true", message: "Ambos iguales" },
    ],
    hints: ["Loop ipairs para búsqueda lineal", "set[n] = true para crear hash", "return set[nombre] ~= nil para buscar"],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: "Locals para funciones. Pre-calcular longitudes. ipairs arrays, pairs hash. Hash O(1) vs array O(n). Break temprano.",
  resources: [],
  prerequisites: ["mes-08-l04"],
};

// ============================================
// LECCIÓN 8.6: Proyecto Sistema de Balas
// ============================================

export const lesson06: Lesson = {
  id: "mes-08-l06",
  moduleId: "mes-08",
  lessonNumber: 6,
  title: "Proyecto: Sistema de Balas Optimizado",
  description: "Implementa object pooling para balas con coroutines y profiling integrado.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Proyecto: Sistema de Balas Optimizado",
    objectives: [
      "Integrar object pooling",
      "Usar coroutines para movimiento",
      "Implementar profiling de rendimiento",
      "Optimizar gestión de memoria",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Arquitectura del Sistema",
        content: `**Componentes:**
\`\`\`
┌─────────────────┐
│  SistemaBalas   │
├─────────────────┤
│ - ObjectPool    │  ← Reutiliza balas
│ - CoroutineMgr  │  ← Movimiento asíncrono
│ - Profiler      │  ← Mide rendimiento
└─────────────────┘
\`\`\`

**Flujo:**
1. Jugador dispara → SistemaBalas:Disparar()
2. Obtener bala del pool (cero allocs)
3. Coroutine mueve bala (no bloquea)
4. Impacto → Devolver bala al pool
5. Profiler mide FPS y frame time`,
        codeExamples: [
          {
            title: "Sistema completo",
            code: `local SistemaBalas = {}

function SistemaBalas:Inicializar()
    -- Object pool para 100 balas
    self.pool = ObjectPool.new("Bala", 100)
    
    -- Gestor de coroutines
    self.coroutines = {}
    
    -- Profiler
    self.fps = 60
    self.frameTime = 0
end

function SistemaBalas:Disparar(origen, direccion)
    -- Obtener del pool (cero allocs)
    local bala = self.pool:Obtener()
    
    if bala then
        bala:SetLocation(origen)
        bala:SetRotation(direccion:ToRotator())
        
        -- Coroutine para movimiento (no bloquea)
        local thread = coroutine.create(function()
            self:MoverBala(bala, direccion)
        end)
        
        table.insert(self.coroutines, thread)
    end
    
    -- Profiler
    self:RegistrarDisparo()
end

function SistemaBalas:MoverBala(bala, direccion, velocidad)
    local tiempo = 0
    local duracion = 3  -- segundos
    
    while tiempo < duracion do
        coroutine.yield()  -- Pausa hasta próximo frame
        
        local delta = 0.016  -- 60 FPS
        bala:AddLocation(direccion * velocidad * delta)
        tiempo = tiempo + delta
    end
    
    -- Devolver al pool
    self.pool:Devolver(bala)
end

return SistemaBalas`,
            language: "lua",
            description: "Arquitectura del sistema de balas.",
          },
        ],
      },
      {
        heading: "Implementación Completa",
        content: `**Código final integrado:**
\`\`\`lua
-- Sistema optimizado que combina:
-- 1. Object pooling (cero allocs)
-- 2. Coroutines (no bloquea)
-- 3. Profiling (mide rendimiento)
-- 4. Memory management (sin leaks)
\`\`\``,
        codeExamples: [
          {
            title: "Implementación final",
            code: `local SistemaBalasOptimizado = {}

function SistemaBalasOptimizado:Inicializar()
    self.pool = {}
    self.activas = {}
    self.coroutines = {}
    
    -- Pre-crear 100 balas
    for i = 1, 100 do
        local bala = {
            id = i,
            activa = false,
            ubicacion = {x = 0, y = 0, z = 0}
        }
        table.insert(self.pool, bala)
    end
    
    -- Stats
    self.disparos = 0
    self.impactos = 0
end

function SistemaBalasOptimizado:Disparar(origen, direccion)
    -- Obtener del pool
    local bala = self:ObtenerBala()
    
    if bala then
        bala.ubicacion = origen
        bala.direccion = direccion
        bala.activa = true
        
        -- Coroutine para movimiento
        local thread = coroutine.create(function()
            self:MoverBala(bala)
        end)
        
        table.insert(self.coroutines, thread)
        self.disparos = self.disparos + 1
    end
end

function SistemaBalasOptimizado:ObtenerBala()
    for _, bala in ipairs(self.pool) do
        if not bala.activa then
            bala.activa = true
            table.insert(self.activas, bala)
            return bala
        end
    end
    return nil
end

function SistemaBalasOptimizado:MoverBala(bala)
    local tiempo = 0
    local velocidad = 5000
    
    while tiempo < 3 and bala.activa do
        coroutine.yield()
        
        local delta = 0.016
        bala.ubicacion.x = bala.ubicacion.x + bala.direccion.x * velocidad * delta
        bala.ubicacion.y = bala.ubicacion.y + bala.direccion.y * velocidad * delta
        
        tiempo = tiempo + delta
        
        -- Verificar impacto
        if self:VerificarImpacto(bala) then
            break
        end
    end
    
    -- Devolver al pool
    self:DevolverBala(bala)
end

function SistemaBalasOptimizado:VerificarImpacto(bala)
    -- Simular impacto aleatorio
    if math.random() < 0.01 then
        self.impactos = self.impactos + 1
        return true
    end
    return false
end

function SistemaBalasOptimizado:DevolverBala(bala)
    bala.activa = false
    
    for i, activa in ipairs(self.activas) do
        if activa == bala then
            table.remove(self.activas, i)
            return
        end
    end
end

function SistemaBalasOptimizado:Estadisticas()
    print("=== Sistema de Balas ===")
    print("Disparos: " .. self.disparos)
    print("Impactos: " .. self.impactos)
    print("Balas activas: " .. #self.activas)
    print("Balas en pool: " .. #self.pool)
    print("Precisión: " .. math.floor(self.impactos / self.disparos * 100) .. "%")
end

return SistemaBalasOptimizado`,
            language: "lua",
            description: "Sistema completo optimizado.",
          },
        ],
      },
    ],
    summary: `Sistema de balas con object pooling (cero allocs), coroutines (no bloquea), profiling (mide FPS). Pre-crear pool, obtener/Devolver, coroutine mueve, devolver al impacto.`,
  },
  examples: [],
  interactive: {
    title: "Simula Sistema de Balas",
    description: "Pool + coroutines",
    starterCode: `local Sistema = {
    pool = {},
    activas = {},
    disparos = 0
}

-- Pre-crear 10 balas
for i = 1, 10 do
    table.insert(Sistema.pool, {id = i, activa = false})
end

function Sistema:Disparar()
    local bala = self:ObtenerBala()
    if bala then
        self.disparos = self.disparos + 1
        print("Disparo bala " .. bala.id)
        
        -- Simular coroutine
        bala.activa = false
        table.insert(self.activas, bala)
    end
end

function Sistema:ObtenerBala()
    for _, bala in ipairs(self.pool) do
        if not bala.activa then
            bala.activa = true
            return bala
        end
    end
    return nil
end

-- Probar
for i = 1, 5 do
    Sistema:Disparar()
end

print("\\nTotal disparos: " .. Sistema.disparos)
print("Balas activas: " .. #Sistema.activas)`,
    environment: "lua",
    expectedOutput: "Disparo bala",
  },
  miniExercise: {
    id: "mes-08-l06-ej1",
    lessonId: "mes-08-l06",
    title: "Sistema de Balas con Pool",
    instructions: `Crea sistema optimizado:

1. Pool de 5 balas pre-creadas
2. Función \`Disparar()\` que obtiene bala del pool
3. Función \`MoverBala(bala)\` que simula movimiento
4. Después de 3 frames, devolver bala al pool
5. Imprime disparos y balas activas

**Salida esperada:**
\`\`\`
Disparando...
Bala 1 disparada
Bala 2 disparada
Bala 3 disparada
Balas activas: 3
Disparos totales: 3
\`\`\``,
    starterCode: `local Sistema = {
    pool = {},
    activas = {},
    disparos = 0
}

-- Pre-crear balas


function Sistema:Disparar()
    -- Implementar
end

-- Probar
print("Disparando...")
Sistema:Disparar()
Sistema:Disparar()
Sistema:Disparar()

print("Balas activas: " .. #Sistema.activas)
print("Disparos totales: " .. Sistema.disparos)`,
    solution: `local Sistema = {
    pool = {},
    activas = {},
    disparos = 0
}

-- Pre-crear 5 balas
for i = 1, 5 do
    table.insert(Sistema.pool, {id = i, activa = false})
end

function Sistema:Disparar()
    for _, bala in ipairs(self.pool) do
        if not bala.activa then
            bala.activa = true
            table.insert(self.activas, bala)
            self.disparos = self.disparos + 1
            print("Bala " .. bala.id .. " disparada")
            return
        end
    end
    print("Pool vacío")
end

print("Disparando...")
Sistema:Disparar()
Sistema:Disparar()
Sistema:Disparar()

print("Balas activas: " .. #Sistema.activas)
print("Disparos totales: " .. Sistema.disparos)`,
    tests: [
      { type: "output_contains", expected: "Bala 1 disparada", message: "Primera bala" },
      { type: "output_contains", expected: "Balas activas: 3", message: "Conteo correcto" },
      { type: "output_contains", expected: "Disparos totales: 3", message: "Total correcto" },
    ],
    hints: ["Pre-crear 5 balas con activa=false", "Buscar primera inactiva en Disparar", "Marcar activa=true y agregar a activas"],
    xpReward: 55,
    difficulty: "intermediate",
  },
  summary: "Sistema de balas: object pool + coroutines + profiling. Pre-crear pool, obtener/disparar, coroutine mueve, devolver al impacto.",
  resources: [],
  prerequisites: ["mes-08-l05"],
};

// Exportar todas las lecciones del módulo 8
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
];
