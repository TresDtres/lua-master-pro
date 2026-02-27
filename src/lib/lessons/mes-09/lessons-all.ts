/**
 * Módulo 9: Sistemas Avanzados - Todas las lecciones completas
 * Generación procedural, materiales, audio, quests y event bus
 */

import { Lesson } from "@/types/lesson";

// ============================================
// LECCIÓN 9.1: Generación Procedural
// ============================================

export const lesson01: Lesson = {
  id: "mes-09-l01",
  moduleId: "mes-09",
  lessonNumber: 1,
  title: "Generación Procedural",
  description: "Dungeon generation, Wave Function Collapse y algoritmos de creación de niveles.",
  estimatedTime: 45,
  difficulty: "expert",
  theory: {
    title: "Generación Procedural",
    objectives: [
      "Entender algoritmos de generación procedural",
      "Implementar Wave Function Collapse para dungeons",
      "Crear reglas de conectividad entre rooms",
      "Generar niveles infinitos con coherencia",
    ],
    estimatedTime: 45,
    sections: [
      {
        heading: "¿Qué es Generación Procedural?",
        content: `**Generación Procedural** crea contenido algorítmicamente en lugar de manualmente.

**Ventajas:**
- **Rejugabilidad** - Cada partida es única
- **Contenido infinito** - Niveles ilimitados
- **Eficiencia** - Menos trabajo manual
- **Sorpresa** - Hasta los devs se sorprenden

**Algoritmos comunes:**
1. **Random Walk** - Caminata aleatoria simple
2. **Cellular Automata** - Autómatas celulares para cuevas
3. **BSP Trees** - Binary Space Partitioning para rooms
4. **Wave Function Collapse** - Conectividad coherente

**En este módulo:**
Nos enfocaremos en **Wave Function Collapse** para dungeons coherentes.`,
        codeExamples: [
          {
            title: "Ejemplo simple: Random Walk",
            code: `local GeneradorSimple = {}

function GeneradorSimple:CrearDungeon(ancho, alto)
    -- Iniciar grid vacío
    local grid = {}
    for x = 1, ancho do
        grid[x] = {}
        for y = 1, alto do
            grid[x][y] = 0  -- 0 = vacío, 1 = room
        end
    end
    
    -- Random walk desde el centro
    local x, y = math.floor(ancho/2), math.floor(alto/2)
    grid[x][y] = 1
    
    local pasos = 100
    for i = 1, pasos do
        -- Dirección aleatoria
        local dir = math.random(4)
        if dir == 1 then y = y + 1
        elseif dir == 2 then y = y - 1
        elseif dir == 3 then x = x + 1
        else x = x - 1
        end
        
        -- Marcar room
        if x >= 1 and x <= ancho and y >= 1 and y <= alto then
            grid[x][y] = 1
        end
    end
    
    return grid
end

return GeneradorSimple`,
            language: "lua",
            description: "Generación simple con random walk.",
          },
        ],
      },
      {
        heading: "Wave Function Collapse (WFC)",
        content: `**WFC** genera patrones coherentes basados en reglas de conectividad.

**Concepto básico:**
1. **Grid de celdas** - Cada celda puede ser un tipo de room
2. **Superposición** - Cada celda colapsa a un tipo específico
3. **Propagación** - Las celdas vecinas se ven afectadas
4. **Colapso** - Seleccionar tipo basado en pesos

**Reglas de conectividad:**
\`\`\`
Room Norte → Solo conecta con Room Sur
Room Este → Solo conecta con Room Oeste
Room Cruce → Conecta con 4 direcciones
\`\`\`

**Algoritmo:**
1. Iniciar todas las celdas con todos los tipos posibles
2. Colapsar una celda (elegir tipo basado en pesos)
3. Propagar restricciones a vecinos
4. Repetir hasta que todo esté colapsado`,
        codeExamples: [
          {
            title: "WFC básico",
            code: `local WFC = {}

-- Tipos de tiles con sus conexiones
WFC.TILES = {
    {nombre = "Vacio", conexiones = {N=false, S=false, E=false, O=false}, peso = 1},
    {nombre = "RectoNS", conexiones = {N=true, S=true, E=false, O=false}, peso = 2},
    {nombre = "RectoEO", conexiones = {N=false, S=false, E=true, O=true}, peso = 2},
    {nombre = "EsquinaNE", conexiones = {N=true, S=false, E=true, O=false}, peso = 1},
    {nombre = "EsquinaNO", conexiones = {N=true, S=false, E=false, O=true}, peso = 1},
    {nombre = "EsquinaSE", conexiones = {N=false, S=true, E=true, O=false}, peso = 1},
    {nombre = "EsquinaSO", conexiones = {N=false, S=true, E=false, O=true}, peso = 1},
    {nombre = "Cruce", conexiones = {N=true, S=true, E=true, O=true}, peso = 1},
}

function WFC:CrearGrid(ancho, alto)
    local grid = {}
    for x = 1, ancho do
        grid[x] = {}
        for y = 1, alto do
            -- Cada celda tiene todos los tipos posibles inicialmente
            grid[x][y] = {
                posibles = {1, 2, 3, 4, 5, 6, 7, 8},  -- Índices de TILES
                colapsado = false,
                tipo = nil
            }
        end
    end
    return grid
end

return WFC`,
            language: "lua",
            description: "Estructura básica de WFC.",
          },
        ],
      },
      {
        heading: "Implementación Completa de WFC",
        content: `**Pasos del algoritmo:**

**1. Encontrar celda con menos posibilidades:**
\`\`\`lua
function WFC:EncontrarCelda(grid)
    local minPosibilidades = 999
    local celdaElegida = nil
    
    for x, fila in ipairs(grid) do
        for y, celda in ipairs(fila) do
            if not celda.colapsado and #celda.posibles < minPosibilidades then
                minPosibilidades = #celda.posibles
                celdaElegida = {x = x, y = y, celda = celda}
            end
        end
    end
    
    return celdaElegida
end
\`\`\`

**2. Colapsar celda (elegir tipo):**
\`\`\`lua
function WFC:ColapsarCelda(celda)
    -- Elegir basado en pesos
    local tipos = {}
    for _, idx in ipairs(celda.posibles) do
        for i = 1, WFC.TILES[idx].peso do
            table.insert(tipos, idx)
        end
    end
    
    local elegido = tipos[math.random(#tipos)]
    celda.tipo = elegido
    celda.colapsado = true
    celda.posibles = {elegido}
end
\`\`\`

**3. Propagar restricciones:**
\`\`\`lua
function WFC:Propagar(grid, x, y)
    -- Verificar vecinos y eliminar tipos incompatibles
    local celda = grid[x][y]
    
    -- Norte
    if y > 1 then
        local vecino = grid[x][y-1]
        if not vecino.colapsado then
            -- Eliminar tipos que no conectan con el sur
            vecino.posibles = self:FiltrarTipos(vecino.posibles, "S", celda.tipo)
        end
    end
    -- Repetir para S, E, O
end
\`\`\``,
        codeExamples: [
          {
            title: "WFC completo",
            code: `local WaveFunctionCollapse = {}

-- Tiles y conexiones (ver arriba)

function WaveFunctionCollapse:Generar(ancho, alto)
    local grid = self:CrearGrid(ancho, alto)
    local intentos = 0
    local maxIntentos = ancho * alto * 10
    
    while intentos < maxIntentos do
        -- 1. Encontrar celda con menos posibilidades
        local celdaInfo = self:EncontrarCelda(grid)
        
        if not celdaInfo then
            break  -- Todo colapsado
        end
        
        -- 2. Colapsar
        self:ColapsarCelda(celdaInfo.celda)
        
        -- 3. Propagar
        self:Propagar(grid, celdaInfo.x, celdaInfo.y)
        
        intentos = intentos + 1
    end
    
    return grid
end

function WaveFunctionCollapse:FiltrarTipos(posibles, direccion, tipoVecino)
    local filtrados = {}
    local tileVecino = self.TILES[tipoVecino]
    
    for _, idx in ipairs(posibles) do
        local tile = self.TILES[idx]
        -- Verificar si conecta en la dirección opuesta
        local opuesto = self:DireccionOpuesta(direccion)
        if tile.conexiones[opuesto] == tileVecino.conexiones[direccion] then
            table.insert(filtrados, idx)
        end
    end
    
    return filtrados
end

function WaveFunctionCollapse:DireccionOpuesta(dir)
    local opuestos = {N = "S", S = "N", E = "O", O = "E"}
    return opuestos[dir]
end

return WaveFunctionCollapse`,
            language: "lua",
            description: "Implementación completa de WFC.",
          },
        ],
      },
    ],
    summary: `Generación procedural crea contenido algorítmicamente. WFC usa reglas de conectividad para dungeons coherentes. Pasos: encontrar celda, colapsar, propagar. Grid con tipos de rooms y conexiones.`,
  },
  examples: [],
  interactive: {
    title: "Simula Generación Simple",
    description: "Random walk básico",
    starterCode: `local grid = {}
local ancho, alto = 10, 10

-- Iniciar grid
for x = 1, ancho do
    grid[x] = {}
    for y = 1, alto do
        grid[x][y] = "."
    end
end

-- Random walk
local x, y = 5, 5
grid[x][y] = "S"  -- Start

for i = 1, 20 do
    local dir = math.random(4)
    if dir == 1 then y = math.min(y+1, alto)
    elseif dir == 2 then y = math.max(y-1, 1)
    elseif dir == 3 then x = math.min(x+1, ancho)
    else x = math.max(x-1, 1)
    end
    grid[x][y] = "#"
end

grid[x][y] = "E"  -- End

-- Imprimir
for y = alto, 1, -1 do
    local linea = ""
    for x = 1, ancho do
        linea = linea .. grid[x][y]
    end
    print(linea)
end`,
    environment: "lua",
    expectedOutput: "S",
  },
  miniExercise: {
    id: "mes-09-l01-ej1",
    lessonId: "mes-09-l01",
    title: "Generador de Dungeon Simple",
    instructions: `Crea un generador de dungeon 5x5:

1. Grid 5x5 inicializado con "." (vacío)
2. Empezar en centro (3,3) con "S" (start)
3. Random walk de 10 pasos marcando "#"
4. Marcar posición final con "E" (end)
5. Imprimir grid

**Salida esperada (ejemplo):**
\`\`\`
.....
..#..
..#S.
..##E
.....
\`\`\``,
    starterCode: `local grid = {}
local tamano = 5

-- Inicializar grid


-- Empezar en centro


-- Random walk de 10 pasos


-- Imprimir grid
for y = tamano, 1, -1 do
    local linea = ""
    for x = 1, tamano do
        linea = linea .. (grid[x][y] or ".")
    end
    print(linea)
end`,
    solution: `local grid = {}
local tamano = 5

-- Inicializar grid
for x = 1, tamano do
    grid[x] = {}
    for y = 1, tamano do
        grid[x][y] = "."
    end
end

-- Empezar en centro
local x, y = 3, 3
grid[x][y] = "S"

-- Random walk de 10 pasos
for i = 1, 10 do
    local dir = math.random(4)
    if dir == 1 then y = math.min(y+1, tamano)
    elseif dir == 2 then y = math.max(y-1, 1)
    elseif dir == 3 then x = math.min(x+1, tamano)
    else x = math.max(x-1, 1)
    end
    grid[x][y] = "#"
end

-- Marcar final
grid[x][y] = "E"

-- Imprimir grid
for y = tamano, 1, -1 do
    local linea = ""
    for x = 1, tamano do
        linea = linea .. grid[x][y]
    end
    print(linea)
end`,
    tests: [
      { type: "output_contains", expected: "S", message: "Tiene start" },
      { type: "output_contains", expected: "E", message: "Tiene end" },
      { type: "output_contains", expected: "#", message: "Tiene camino" },
    ],
    hints: ["Inicializar con '.' en doble loop", "Centro es (3,3) para 5x5", "math.random(4) para dirección"],
    xpReward: 60,
    difficulty: "expert",
  },
  summary: "Generación procedural: random walk, cellular automata, BSP, WFC. WFC usa conectividad coherente. Pasos: encontrar, colapsar, propagar.",
  resources: [
    { title: "Wave Function Collapse Algorithm", url: "https://github.com/mxgmn/WaveFunctionCollapse", type: "tool" },
  ],
  prerequisites: ["mes-08-l06"],
};

// ============================================
// LECCIÓN 9.2: Materiales Dinámicos
// ============================================

export const lesson02: Lesson = {
  id: "mes-09-l02",
  moduleId: "mes-09",
  lessonNumber: 2,
  title: "Materiales Dinámicos",
  description: "Material Parameter Collections, instancias y manipulación en runtime.",
  estimatedTime: 40,
  difficulty: "advanced",
  theory: {
    title: "Materiales Dinámicos",
    objectives: [
      "Crear Material Parameter Collections",
      "Usar material instances en runtime",
      "Manipular parámetros desde Lua",
      "Optimizar cambios de materiales",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "Material Parameter Collections",
        content: `**MPCs** permiten cambiar parámetros de materiales globalmente.

**Crear MPC en UE5:**
1. Right-click → Material → Material Parameter Collection
2. Agregar parámetros:
   - **Scalar** (float): Opacidad, brillo, etc.
   - **Vector** (FLinearColor): Colores
   - **Texture**: Texturas dinámicas

**En Lua:**
\`\`\`lua
function CambiarColorGlobal()
    local collection = GetMaterialCollection("MPC_Global")
    collection:SetVectorParameterValue("ColorAmbiente", FLinearColor(1, 0, 0, 1))
end

function CambiarOpacidad()
    local collection = GetMaterialCollection("MPC_Global")
    collection:SetScalarParameterValue("Opacidad", 0.5)
end
\`\`\`

**Ventajas:**
- Un cambio afecta a TODOS los materiales que usan la MPC
- Muy eficiente (un solo set)
- Ideal para día/noche, clima, power-ups`,
        codeExamples: [
          {
            title: "MPC para día/noche",
            code: `local CicloDiaNoche = {}

function CicloDiaNoche:BeginPlay()
    self.mpc = self:GetMaterialCollection("MPC_Ambient")
    self.tiempo = 0
end

function CicloDiaNoche:Actualizar(dt)
    self.tiempo = self.tiempo + dt
    
    -- Calcular colores según hora
    local hora = (self.tiempo % 60) / 60  -- 0-1
    
    local colorCielo = self:CalcularColorCielo(hora)
    local intensidadLuz = self:CalcularIntensidad(hora)
    
    -- Aplicar globalmente
    self.mpc:SetVectorParameterValue("ColorCielo", colorCielo)
    self.mpc:SetScalarParameterValue("IntensidadLuz", intensidadLuz)
end

function CicloDiaNoche:CalcularColorCielo(hora)
    if hora < 0.25 then  -- Noche
        return FLinearColor(0.1, 0.1, 0.2, 1)
    elseif hora < 0.5 then  -- Amanecer
        return FLinearColor(1, 0.5, 0.2, 1)
    elseif hora < 0.75 then  -- Día
        return FLinearColor(0.5, 0.7, 1, 1)
    else  -- Atardecer
        return FLinearColor(1, 0.3, 0.1, 1)
    end
end

return CicloDiaNoche`,
            language: "lua",
            description: "Ciclo día/noche con MPC.",
          },
        ],
      },
      {
        heading: "Material Instances",
        content: `**Material Instances** son copias de un material base con parámetros modificables.

**Crear en runtime:**
\`\`\`lua
function CrearInstancia(materialBase)
    local instancia = materialBase:CreateMaterialInstance()
    return instancia
end

-- Modificar parámetros
instancia:SetScalarParameterValue("Brillo", 2.0)
instancia:SetVectorParameterValue("Color", FLinearColor(1, 0, 0, 1))
instancia:SetTextureParameterValue("Texture", nuevaTextura)
\`\`\`

**Casos de uso:**
- **Items con stats variables** - Color según rareza
- **Daño visual** - Flash rojo al recibir daño
- **Stealth** - Opacidad al hacerse invisible
- **Elementos** - Fuego, hielo, eléctrico`,
        codeExamples: [
          {
            title: "Instancias para items",
            code: `local SistemaItems = {}

function SistemaItems:CrearItem(tipo, rareza)
    -- Material base
    local materialBase = self:CargarMaterial("M_Item_Base")
    
    -- Crear instancia
    local instancia = materialBase:CreateMaterialInstance()
    
    -- Configurar según rareza
    local colores = {
        comun = FLinearColor(1, 1, 1, 1),
        raro = FLinearColor(0, 0.5, 1, 1),
        epico = FLinearColor(0.8, 0.2, 1, 1),
        legendario = FLinearColor(1, 0.8, 0, 1)
    }
    
    instancia:SetVectorParameterValue("ColorTinte", colores[rareza])
    
    -- Brillo según rareza
    local brillos = {comun = 1, raro = 2, epico = 3, legendario = 5}
    instancia:SetScalarParameterValue("Brillo", brillos[rareza])
    
    return instancia
end

return SistemaItems`,
            language: "lua",
            description: "Items con colores por rareza.",
          },
        ],
      },
      {
        heading: "Manipulación en Runtime",
        content: `**Técnicas avanzadas:**

**1. Lerp de parámetros:**
\`\`\`lua
function TransicionColor(instancia, colorInicio, colorFin, duracion)
    local tiempo = 0
    
    coroutine.create(function()
        while tiempo < duracion do
            coroutine.yield()
            local t = tiempo / duracion
            local color = LerpColor(colorInicio, colorFin, t)
            instancia:SetVectorParameterValue("Color", color)
            tiempo = tiempo + 0.016
        end
    end)
end
\`\`\`

**2. Randomizar parámetros:**
\`\`\`lua
function RandomizarMaterial(instancia)
    instancia:SetScalarParameterValue("Random1", math.random())
    instancia:SetScalarParameterValue("Random2", math.random())
end
\`\`\`

**3. Animar parámetros:**
\`\`\`lua
function AnimarParametro(instancia, parametro, valorInicio, valorFin, duracion)
    -- Usar coroutine o timeline
end
\`\`\``,
        codeExamples: [
          {
            title: "Animación de materiales",
            code: `local AnimacionMaterial = {}

function AnimacionMaterial:Pulsar(instancia, parametro, minVal, maxVal, velocidad)
    local tiempo = 0
    
    coroutine.create(function()
        while true do
            coroutine.yield()
            
            -- Seno para efecto de pulso
            local valor = minVal + (maxVal - minVal) * (math.sin(tiempo * velocidad) + 1) / 2
            
            instancia:SetScalarParameterValue(parametro, valor)
            tiempo = tiempo + 0.016
        end
    end)
end

function AnimacionMaterial:Parpadear(instancia, veces)
    coroutine.create(function()
        for i = 1, veces * 2 do
            local visible = (i % 2 == 1)
            instancia:SetScalarParameterValue("Opacidad", visible and 1 or 0.3)
            coroutine.yield()
            Timer(0.1)  -- Esperar 100ms
        end
        instancia:SetScalarParameterValue("Opacidad", 1)
    end)
end

return AnimacionMaterial`,
            language: "lua",
            description: "Animaciones de parámetros de material.",
          },
        ],
      },
    ],
    summary: `MPCs para cambios globales eficientes. Material instances para variaciones en runtime. SetScalarParameterValue, SetVectorParameterValue, SetTextureParameterValue. Animar con lerp y coroutines.`,
  },
  examples: [],
  interactive: {
    title: "Simula MPC",
    description: "Cambiar parámetros globales",
    starterCode: `local MPC = {
    parametros = {}
}

function MPC:SetScalar(nombre, valor)
    self.parametros[nombre] = valor
    print("MPC: " .. nombre .. " = " .. valor)
end

function MPC:SetVector(nombre, r, g, b, a)
    self.parametros[nombre] = {r, g, b, a}
    print("MPC: " .. nombre .. " = (" .. r .. ", " .. g .. ", " .. b .. ", " .. a .. ")")
end

-- Simular ciclo día/noche
print("=== Amanecer ===")
MPC:SetVector("ColorCielo", 1, 0.5, 0.2, 1)
MPC:SetScalar("IntensidadLuz", 0.5)

print("\\n=== Mediodía ===")
MPC:SetVector("ColorCielo", 0.5, 0.7, 1, 1)
MPC:SetScalar("IntensidadLuz", 1.0)

print("\\n=== Noche ===")
MPC:SetVector("ColorCielo", 0.1, 0.1, 0.2, 1)
MPC:SetScalar("IntensidadLuz", 0.2)`,
    environment: "lua",
    expectedOutput: "MPC:",
  },
  miniExercise: {
    id: "mes-09-l02-ej1",
    lessonId: "mes-09-l02",
    title: "Sistema de Rareza con Materiales",
    instructions: `Crea un sistema de items con colores por rareza:

1. Tabla \`colores\` con 4 rarezas: comun, raro, epico, legendario
2. Cada rareza tiene color (r, g, b) y brillo
3. Función \`CrearItem(rareza)\` que imprime configuración
4. Crear un item de cada rareza

**Salida esperada:**
\`\`\`
Item Común: Color(1, 1, 1) Brillo 1
Item Raro: Color(0, 0.5, 1) Brillo 2
Item Épico: Color(0.8, 0.2, 1) Brillo 3
Item Legendario: Color(1, 0.8, 0) Brillo 5
\`\`\``,
    starterCode: `local colores = {
    -- Definir colores y brillos
}

function CrearItem(rareza)
    local color = colores[rareza]
    print("Item " .. rareza:gsub("^%l", string.upper) .. 
          ": Color(" .. color.r .. ", " .. color.g .. ", " .. color.b .. 
          ") Brillo " .. color.brillo)
end

-- Crear items de cada rareza
CrearItem("comun")
CrearItem("raro")
CrearItem("epico")
CrearItem("legendario")`,
    solution: `local colores = {
    comun = {r = 1, g = 1, b = 1, brillo = 1},
    raro = {r = 0, g = 0.5, b = 1, brillo = 2},
    epico = {r = 0.8, g = 0.2, b = 1, brillo = 3},
    legendario = {r = 1, g = 0.8, b = 0, brillo = 5}
}

function CrearItem(rareza)
    local color = colores[rareza]
    print("Item " .. rareza:gsub("^%l", string.upper) .. 
          ": Color(" .. color.r .. ", " .. color.g .. ", " .. color.b .. 
          ") Brillo " .. color.brillo)
end

CrearItem("comun")
CrearItem("raro")
CrearItem("epico")
CrearItem("legendario")`,
    tests: [
      { type: "output_contains", expected: "Item Común: Color(1, 1, 1)", message: "Común correcto" },
      { type: "output_contains", expected: "Item Legendario: Color(1, 0.8, 0)", message: "Legendario correcto" },
      { type: "output_contains", expected: "Brillo 5", message: "Brillo legendario" },
    ],
    hints: ["Tabla con 4 rarezas", "Cada una tiene r, g, b, brillo", "gsub para capitalizar primera letra"],
    xpReward: 55,
    difficulty: "advanced",
  },
  summary: "MPCs para cambios globales. Material instances para variaciones. SetScalar/SetVector/SetTexture. Animar con lerp y coroutines.",
  resources: [],
  prerequisites: ["mes-09-l01"],
};

// ============================================
// LECCIÓN 9.3: Audio Adaptativo
// ============================================

export const lesson03: Lesson = {
  id: "mes-09-l03",
  moduleId: "mes-09",
  lessonNumber: 3,
  title: "Audio Adaptativo",
  description: "Metasounds, audio reactivo al gameplay y sistema de música dinámica.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Audio Adaptativo",
    objectives: [
      "Entender Metasounds de UE5",
      "Crear audio reactivo al gameplay",
      "Implementar música dinámica por capas",
      "Gestionar mezcla de audio",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Metasounds",
        content: `**Metasounds** son materiales para audio - generan sonido proceduralmente.

**Componentes de Metasound:**
- **Osciladores** - Generan ondas (sine, square, saw)
- **Envelopes** - Controlan volumen en el tiempo
- **Filtros** - Modifican frecuencias
- **Efectos** - Reverb, delay, distortion

**Controlar desde Lua:**
\`\`\`lua
function ControlarMetasound(metasound)
    -- Parámetros
    metasound:SetParameter("Frecuencia", 440)
    metasound:SetParameter("Ganancia", 0.5)
    metasound:SetParameter("Attack", 0.01)
    metasound:SetParameter("Release", 0.3)
    
    -- Reproducir
    metasound:Play()
    
    -- Detener con fade
    metasound:Stop(0.5)  -- 0.5 segundos de fade
end
\`\`\``,
        codeExamples: [
          {
            title: "Metasound para SFX",
            code: `local SistemaSFX = {}

function SistemaSFX:ReproducirSonido(tipo, parametros)
    local metasound = self:CargarMetasound("MS_" .. tipo)
    
    -- Aplicar parámetros
    for nombre, valor in pairs(parametros) do
        metasound:SetParameter(nombre, valor)
    end
    
    -- Reproducir
    metasound:Play()
    
    return metasound
end

-- Ejemplos de uso
function SistemaSFX:ReproducirSalto()
    return self:ReproducirSonido("Jump", {
        Frecuencia = 600,
        Attack = 0.01,
        Decay = 0.2,
        Sustain = 0.3,
        Release = 0.1
    })
end

function SistemaSFX:ReproducirExplosion()
    return self:ReproducirSonido("Explosion", {
        Frecuencia = 100,
        Attack = 0.01,
        Decay = 0.5,
        Sustain = 0.2,
        Release = 1.0,
        Distortion = 0.5
    })
end

return SistemaSFX`,
            language: "lua",
            description: "Sistema de SFX con Metasounds.",
          },
        ],
      },
      {
        heading: "Música Dinámica por Capas",
        content: `**Sistema de capas:**
\`\`\`
Capa 1: Base (siempre sonando)
Capa 2: Percusión (se activa en combate)
Capa 3: Melodía (se activa con boss)
Capa 4: Coros (se activa en climax)
\`\`\`

**Transiciones suaves:**
\`\`\`lua
function ActivarCapa(capa, activar)
    if activar then
        capa:FadeIn(2.0)  -- 2 segundos
    else
        capa:FadeOut(2.0)
    end
end

-- En gameplay
function EnCombate()
    ActivarCapa(capas.percusion, true)
end

function FueraDeCombate()
    ActivarCapa(capas.percusion, false)
end
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de música dinámica",
            code: `local MusicaDinamica = {}

function MusicaDinamica:Inicializar()
    self.capas = {
        base = self:CargarMetasound("MS_Music_Base"),
        percusion = self:CargarMetasound("MS_Music_Percussion"),
        melodía = self:CargarMetasound("MS_Music_Melody"),
        coros = self:CargarMetasound("MS_Music_Choir")
    }
    
    -- Iniciar con base
    self.capas.base:Play()
    self.capas.base:SetParameter("Ganancia", 0.7)
    
    self.estado = "exploracion"
end

function MusicaDinamica:ActualizarEstado(nuevoEstado)
    if nuevoEstado == self.estado then return end
    
    if nuevoEstado == "exploracion" then
        self.capas.percusion:FadeOut(2)
        self.capas.melodía:FadeOut(2)
        self.capas.coros:FadeOut(2)
        
    elseif nuevoEstado == "combate" then
        self.capas.percusion:FadeIn(2)
        
    elseif nuevoEstado == "boss" then
        self.capas.percusion:FadeIn(2)
        self.capas.melodía:FadeIn(2)
        
    elseif nuevoEstado == "climax" then
        self.capas.percusion:FadeIn(2)
        self.capas.melodía:FadeIn(2)
        self.capas.coros:FadeIn(2)
    end
    
    self.estado = nuevoEstado
end

return MusicaDinamica`,
            language: "lua",
            description: "Música dinámica con capas y transiciones.",
          },
        ],
      },
      {
        heading: "Audio Reactivo al Gameplay",
        content: `**Reactividad:**
- **Salud baja** → Música más tensa
- **Enemigos cerca** → Añadir percusión
- **Jugador corriendo** → Tempo más rápido
- **Zona peligrosa** → Drones de fondo

**Implementación:**
\`\`\`lua
function ActualizarAudioReactividad()
    -- Salud
    local saludPercent = jugador.vida / jugador.vidaMax
    musica:SetParameter("Tension", 1 - saludPercent)
    
    -- Enemigos cercanos
    local enemigos = ContarEnemigosCercanos(500)
    musica:SetParameter("Intensidad", enemigos / 5)
    
    -- Velocidad del jugador
    local velocidad = jugador:GetVelocity():Size()
    musica:SetParameter("Tempo", 1 + velocidad / 1000)
end
\`\`\``,
        codeExamples: [
          {
            title: "Audio reactivo",
            code: `local AudioReactivo = {}

function AudioReactivo:Actualizar(jugador)
    -- Salud → Tensión
    local saludPercent = jugador.vida / jugador.vidaMax
    self.musica:SetParameter("Tension", (1 - saludPercent) * 0.5)
    
    -- Enemigos → Intensidad
    local enemigos = self:ContarEnemigosCercanos(jugador, 500)
    self.musica:SetParameter("Intensidad", math.min(enemigos / 5, 1))
    
    -- Velocidad → Tempo
    local velocidad = jugador:GetVelocity():Size()
    self.musica:SetParameter("Tempo", 1 + math.min(velocidad / 1000, 0.5))
    
    -- Zona → Reverb
    local zona = self:ObtenerZona(jugador:GetLocation())
    if zona == "cueva" then
        self.musica:SetParameter("Reverb", 0.8)
    elseif zona == "exterior" then
        self.musica:SetParameter("Reverb", 0.2)
    end
end

function AudioReactivo:ContarEnemigosCercanos(jugador, radio)
    local count = 0
    for _, enemigo in ipairs(self.enemigos) do
        if enemigo:GetDistanceTo(jugador) < radio and enemigo.vida > 0 then
            count = count + 1
        end
    end
    return count
end

return AudioReactivo`,
            language: "lua",
            description: "Audio que reacciona al estado del juego.",
          },
        ],
      },
    ],
    summary: `Metasounds generan audio procedural. Música por capas con fade in/out. Audio reactivo a salud, enemigos, velocidad. Parámetros: Tension, Intensidad, Tempo.`,
  },
  examples: [],
  interactive: {
    title: "Simula Música por Capas",
    description: "Activar/desactivar capas",
    starterCode: `local Musica = {
    capas = {
        base = {volumen = 0.7, activa = true},
        percusion = {volumen = 0, activa = false},
        melodia = {volumen = 0, activa = false}
    }
}

function Musica:ActivarCapa(nombre, activar)
    local capa = self.capas[nombre]
    if activar then
        print("Activando " .. nombre .. " (fade in)")
        capa.activa = true
    else
        print("Desactivando " .. nombre .. " (fade out)")
        capa.activa = false
    end
end

function Musica:ActualizarEstado(estado)
    print("\\n=== Estado: " .. estado .. " ===")
    
    if estado == "combate" then
        self:ActivarCapa("percusion", true)
    else
        self:ActivarCapa("percusion", false)
    end
    
    if estado == "boss" then
        self:ActivarCapa("melodia", true)
    else
        self:ActivarCapa("melodia", false)
    end
end

-- Probar
Musica:ActualizarEstado("exploracion")
Musica:ActualizarEstado("combate")
Musica:ActualizarEstado("boss")`,
    environment: "lua",
    expectedOutput: "=== Estado:",
  },
  miniExercise: {
    id: "mes-09-l03-ej1",
    lessonId: "mes-09-l03",
    title: "Sistema de Audio Reactivo",
    instructions: `Crea audio que reacciona a la salud:

1. Jugador con vida=100, vidaMax=100
2. Función \`ActualizarAudio()\` que calcula:
   - tension = (1 - vida/vidaMax) * 0.5
   - Si tensión > 0.3: imprimir "⚠️ Música tensa"
   - Si tensión > 0.4: imprimir "🔥 Música muy tensa"
3. Probar con vida=100, 50, 25

**Salida esperada:**
\`\`\`
Vida 100: Tensión 0.00
Vida 50: Tensión 0.25
Vida 25: Tensión 0.38
⚠️ Música tensa
\`\`\``,
    starterCode: `local Jugador = {vida = 100, vidaMax = 100}

function ActualizarAudio()
    local tension = (1 - Jugador.vida / Jugador.vidaMax) * 0.5
    print("Vida " .. Jugador.vida .. ": Tensión " .. string.format("%.2f", tension))
    
    -- Implementar alertas
end

-- Probar
ActualizarAudio()
Jugador.vida = 50
ActualizarAudio()
Jugador.vida = 25
ActualizarAudio()`,
    solution: `local Jugador = {vida = 100, vidaMax = 100}

function ActualizarAudio()
    local tension = (1 - Jugador.vida / Jugador.vidaMax) * 0.5
    print("Vida " .. Jugador.vida .. ": Tensión " .. string.format("%.2f", tension))
    
    if tension > 0.4 then
        print("🔥 Música muy tensa")
    elseif tension > 0.3 then
        print("⚠️ Música tensa")
    end
end

-- Probar
ActualizarAudio()
Jugador.vida = 50
ActualizarAudio()
Jugador.vida = 25
ActualizarAudio()`,
    tests: [
      { type: "output_contains", expected: "Vida 100: Tensión 0.00", message: "Vida llena" },
      { type: "output_contains", expected: "Vida 25: Tensión 0.38", message: "Vida baja" },
      { type: "output_contains", expected: "Música tensa", message: "Alerta de tensión" },
    ],
    hints: ["tension = (1 - vida/vidaMax) * 0.5", "if tension > 0.3 para alerta", "string.format para 2 decimales"],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: "Metasounds para audio procedural. Música por capas con fade. Audio reactivo a salud, enemigos, velocidad. Parámetros dinámicos.",
  resources: [],
  prerequisites: ["mes-09-l02"],
};

// ============================================
// LECCIÓN 9.4: Quest System
// ============================================

export const lesson04: Lesson = {
  id: "mes-09-l04",
  moduleId: "mes-09",
  lessonNumber: 4,
  title: "Quest System",
  description: "Sistema de quests complejo con objetivos, recompensas y dependencias.",
  estimatedTime: 45,
  difficulty: "expert",
  theory: {
    title: "Quest System",
    objectives: [
      "Diseñar estructura de quests",
      "Implementar objetivos múltiples",
      "Gestionar dependencias entre quests",
      "Sistema de recompensas escalables",
    ],
    estimatedTime: 45,
    sections: [
      {
        heading: "Estructura de Quest",
        content: `**Quest data structure:**
\`\`\`lua
local Quest = {
    id = "quest_001",
    nombre = "Primeros Pasos",
    descripcion = "Habla con el guardia",
    
    -- Objetivos
    objetivos = {
        {
            tipo = "hablar",
            objetivo = "guardia_001",
            cantidad = 1,
            completado = false
        }
    },
    
    -- Recompensas
    recompensas = {
        oro = 100,
        experiencia = 50,
        items = {
            {id = "pocion", cantidad = 5}
        }
    },
    
    -- Dependencias
    prerequisites = {},  -- Quests que deben completarse primero
    desbloquea = {"quest_002"}  -- Quests que desbloquea
}
\`\`\``,
        codeExamples: [
          {
            title: "Quest completa",
            code: `local QuestSystem = {}

function QuestSystem:CrearQuest(id, data)
    return {
        id = id,
        nombre = data.nombre,
        descripcion = data.descripcion,
        objetivos = data.objetivos or {},
        recompensas = data.recompensas or {},
        prerequisites = data.prerequisites or {},
        desbloquea = data.desbloquea or {},
        completada = false,
        progreso = {}
    }
end

-- Ejemplo de quest
local questEjemplo = QuestSystem:CrearQuest("quest_001", {
    nombre = "Eliminar Ratas",
    descripcion = "El granero está lleno de ratas",
    objetivos = {
        {tipo = "matar", objetivo = "rata", cantidad = 10, completado = false},
        {tipo = "hablar", objetivo = "granjero", cantidad = 1, completado = false}
    },
    recompensas = {
        oro = 50,
        experiencia = 100,
        items = {{id = "queso", cantidad = 3}}
    },
    prerequisites = {},
    desbloquea = {"quest_002"}
})

return QuestSystem`,
            language: "lua",
            description: "Estructura completa de quest.",
          },
        ],
      },
      {
        heading: "Gestión de Objetivos",
        content: `**Tipos de objetivos:**
- **Matar** - Eliminar X enemigos
- **Recoger** - Recoger X items
- **Hablar** - Hablar con NPC
- **Explorar** - Visitar ubicación
- **Entregar** - Dar item a NPC

**Tracking en tiempo real:**
\`\`\`lua
function QuestSystem:ActualizarProgreso(tipo, objetivo, cantidad)
    for _, quest in ipairs(self.questsActivas) do
        for _, obj in ipairs(quest.objetivos) do
            if obj.tipo == tipo and obj.objetivo == objetivo then
                obj.progreso = (obj.progreso or 0) + cantidad
                
                if obj.progreso >= obj.cantidad then
                    obj.completado = true
                    self:VerificarQuestCompletada(quest)
                end
                
                self:ActualizarUI(quest)
            end
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Tracking de objetivos",
            code: `local TrackingQuests = {}

function TrackingQuests:EnMatarEnemigo(enemigo)
    self:ActualizarProgreso("matar", enemigo.tipo, 1)
end

function TrackingQuests:EnRecogerItem(item, cantidad)
    self:ActualizarProgreso("recoger", item.id, cantidad)
end

function TrackingQuests:EnHablarConNPC(npc)
    self:ActualizarProgreso("hablar", npc.id, 1)
end

function TrackingQuests:ActualizarProgreso(tipo, objetivo, cantidad)
    for _, quest in ipairs(self.questsActivas) do
        if not quest.completada then
            for _, obj in ipairs(quest.objetivos) do
                if obj.tipo == tipo and obj.objetivo == objetivo and not obj.completado then
                    obj.progreso = (obj.progreso or 0) + cantidad
                    
                    if obj.progreso >= obj.cantidad then
                        obj.completado = true
                        print("✓ Objetivo completado: " .. obj.tipo .. " " .. obj.objetivo)
                    end
                    
                    self:VerificarQuestCompletada(quest)
                end
            end
        end
    end
end

return TrackingQuests`,
            language: "lua",
            description: "Sistema de tracking de objetivos.",
          },
        ],
      },
      {
        heading: "Dependencias y Quest Chain",
        content: `**Quest chains:**
\`\`\`
Quest 1 → Quest 2 → Quest 3
   ↓
Quest 4 → Quest 5
\`\`\`

**Verificar prerequisites:**
\`\`\`lua
function QuestSystem:PuedeAceptar(questId)
    local quest = self:GetQuest(questId)
    
    for _, prereqId in ipairs(quest.prerequisites) do
        if not self:EstaCompletada(prereqId) then
            return false  -- No cumple prerequisitos
        end
    end
    
    return true  -- Puede aceptar
end

function QuestSystem:CompletarQuest(questId)
    local quest = self:GetQuest(questId)
    quest.completada = true
    
    -- Dar recompensas
    self:DarRecompensas(quest)
    
    -- Desbloquear nuevas quests
    for _, nuevaQuestId in ipairs(quest.desbloquea) do
        self:DesbloquearQuest(nuevaQuestId)
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Quest chain",
            code: `local QuestChain = {}

function QuestChain:Inicializar()
    self.quests = {}
    self.questsActivas = {}
    self.questsCompletadas = {}
end

function QuestChain:PuedeAceptar(questId)
    local quest = self.quests[questId]
    
    for _, prereqId in ipairs(quest.prerequisites) do
        if not self.questsCompletadas[prereqId] then
            return false, "Necesitas completar: " .. prereqId
        end
    end
    
    return true
end

function QuestChain:CompletarQuest(questId)
    local quest = self.quests[questId]
    quest.completada = true
    self.questsCompletadas[questId] = true
    
    -- Remover de activas
    for i, q in ipairs(self.questsActivas) do
        if q.id == questId then
            table.remove(self.questsActivas, i)
            break
        end
    end
    
    -- Dar recompensas
    self:DarRecompensas(quest)
    
    -- Desbloquear
    for _, nuevaId in ipairs(quest.desbloquea) do
        print("Quest desbloqueada: " .. nuevaId)
    end
    
    print("✓ Quest completada: " .. quest.nombre)
end

return QuestChain`,
            language: "lua",
            description: "Sistema de quest chain con dependencias.",
          },
        ],
      },
      {
        heading: "Sistema de Recompensas",
        content: `**Tipos de recompensas:**
- **Oro** - Moneda del juego
- **Experiencia** - Para subir nivel
- **Items** - Equipamiento, consumibles
- **Reputación** - Con facciones
- **Desbloqueables** - Habilidades, áreas

**Distribución:**
\`\`\`lua
function QuestSystem:DarRecompensas(quest)
    local jugador = self.jugador
    
    -- Oro
    jugador.oro = jugador.oro + quest.recompensas.oro
    
    -- Experiencia
    self:AñadirExperiencia(quest.recompensas.experiencia)
    
    -- Items
    for _, itemData in ipairs(quest.recompensas.items) do
        jugador.inventario:AñadirItem(itemData.id, itemData.cantidad)
    end
    
    -- Reputación
    if quest.recompensas.reputacion then
        for faccion, cantidad in pairs(quest.recompensas.reputacion) do
            self:ModificarReputacion(faccion, cantidad)
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Recompensas completas",
            code: `local SistemaRecompensas = {}

function SistemaRecompensas:DarRecompensas(jugador, quest)
    print("=== Recompensas de " .. quest.nombre .. " ===")
    
    -- Oro
    if quest.recompensas.oro then
        jugador.oro = jugador.oro + quest.recompensas.oro
        print("+ " .. quest.recompensas.oro .. " oro")
    end
    
    -- Experiencia
    if quest.recompensas.experiencia then
        self:AñadirExperiencia(jugador, quest.recompensas.experiencia)
        print("+ " .. quest.recompensas.experiencia .. " XP")
    end
    
    -- Items
    if quest.recompensas.items then
        for _, item in ipairs(quest.recompensas.items) do
            jugador.inventario:Añadir(item.id, item.cantidad)
            print("+ " .. item.cantidad .. "x " .. item.id)
        end
    end
    
    -- Reputación
    if quest.recompensas.reputacion then
        for faccion, cantidad in pairs(quest.recompensas.reputacion) do
            self:ModificarReputacion(jugador, faccion, cantidad)
            print("+ " .. cantidad .. " reputación con " .. faccion)
        end
    end
end

function SistemaRecompensas:AñadirExperiencia(jugador, xp)
    jugador.experiencia = jugador.experiencia + xp
    print("Experiencia total: " .. jugador.experiencia)
    
    -- Verificar subida de nivel
    local nivelNecesario = jugador.nivel * 100
    if jugador.experiencia >= nivelNecesario then
        jugador.nivel = jugador.nivel + 1
        print("¡Nivel " .. jugador.nivel .. "!")
    end
end

return SistemaRecompensas`,
            language: "lua",
            description: "Sistema completo de recompensas.",
          },
        ],
      },
    ],
    summary: `Quests con id, nombre, objetivos, recompensas, dependencias. Tracking en tiempo real de progreso. Quest chains con prerequisites. Recompensas: oro, XP, items, reputación.`,
  },
  examples: [],
  interactive: {
    title: "Simula Quest System",
    description: "Aceptar y completar quest",
    starterCode: `local Quest = {
    id = "quest_001",
    nombre = "Eliminar Ratas",
    objetivos = {
        {tipo = "matar", objetivo = "rata", cantidad = 10, progreso = 0, completado = false}
    },
    recompensas = {oro = 50, xp = 100},
    completada = false
}

function CompletarObjetivo(quest, tipo, objetivo)
    for _, obj in ipairs(quest.objetivos) do
        if obj.tipo == tipo and obj.objetivo == objetivo then
            obj.progreso = obj.progreso + 1
            print("Progreso: " .. obj.progreso .. "/" .. obj.cantidad)
            
            if obj.progreso >= obj.cantidad then
                obj.completado = true
                print("¡Objetivo completado!")
                print("Recompensa: " .. quest.recompensas.oro .. " oro, " .. quest.recompensas.xp .. " XP")
            end
        end
    end
end

-- Simular matar 10 ratas
for i = 1, 10 do
    CompletarObjetivo(Quest, "matar", "rata")
end`,
    environment: "lua",
    expectedOutput: "Progreso:",
  },
  miniExercise: {
    id: "mes-09-l04-ej1",
    lessonId: "mes-09-l04",
    title: "Quest con Múltiples Objetivos",
    instructions: `Crea una quest con 2 objetivos:

1. Quest "Defensa del Pueblo":
   - Objetivo 1: Matar 5 goblins
   - Objetivo 2: Hablar con alcalde
2. Función \`Completar(tipo, objetivo)\` que actualiza progreso
3. Cuando ambos objetivos completados, imprimir recompensa
4. Simular: matar 5 goblins, luego hablar con alcalde

**Salida esperada:**
\`\`\`
Goblin eliminado: 1/5
Goblin eliminado: 2/5
...
Goblin eliminado: 5/5
✓ Objetivo: Matar goblins completado
Hablando con alcalde...
✓ Objetivo: Hablar con alcalde completado
¡Quest completada!
Recompensa: 200 oro, 300 XP
\`\`\``,
    starterCode: `local Quest = {
    nombre = "Defensa del Pueblo",
    objetivos = {
        {tipo = "matar", objetivo = "goblin", cantidad = 5, progreso = 0, completado = false},
        {tipo = "hablar", objetivo = "alcalde", cantidad = 1, progreso = 0, completado = false}
    },
    recompensas = {oro = 200, xp = 300},
    completada = false
}

function Completar(tipo, objetivo)
    -- Implementar
end

-- Simular
for i = 1, 5 do
    Completar("matar", "goblin")
end
Completar("hablar", "alcalde")`,
    solution: `local Quest = {
    nombre = "Defensa del Pueblo",
    objetivos = {
        {tipo = "matar", objetivo = "goblin", cantidad = 5, progreso = 0, completado = false},
        {tipo = "hablar", objetivo = "alcalde", cantidad = 1, progreso = 0, completado = false}
    },
    recompensas = {oro = 200, xp = 300},
    completada = false
}

function Completar(tipo, objetivo)
    for _, obj in ipairs(Quest.objetivos) do
        if obj.tipo == tipo and obj.objetivo == objetivo and not obj.completado then
            obj.progreso = obj.progreso + 1
            
            if tipo == "matar" then
                print(objetivo:gsub("^%l", string.upper) .. " eliminado: " .. obj.progreso .. "/" .. obj.cantidad)
            else
                print(objetivo:gsub("^%l", string.upper) .. "...")
            end
            
            if obj.progreso >= obj.cantidad then
                obj.completado = true
                print("✓ Objetivo: " .. tipo .. " " .. objetivo .. " completado")
            end
        end
    end
    
    -- Verificar quest completada
    local todosCompletados = true
    for _, obj in ipairs(Quest.objetivos) do
        if not obj.completado then
            todosCompletados = false
            break
        end
    end
    
    if todosCompletados and not Quest.completada then
        Quest.completada = true
        print("\\n¡Quest completada!")
        print("Recompensa: " .. Quest.recompensas.oro .. " oro, " .. Quest.recompensas.xp .. " XP")
    end
end

for i = 1, 5 do
    Completar("matar", "goblin")
end
Completar("hablar", "alcalde")`,
    tests: [
      { type: "output_contains", expected: "Goblin eliminado: 5/5", message: "Goblins completados" },
      { type: "output_contains", expected: "✓ Objetivo: matar goblin completado", message: "Objetivo 1 completado" },
      { type: "output_contains", expected: "¡Quest completada!", message: "Quest completada" },
      { type: "output_contains", expected: "200 oro, 300 XP", message: "Recompensa correcta" },
    ],
    hints: ["Loop sobre objetivos para encontrar el correcto", "Incrementar progreso y verificar >= cantidad", "Verificar todos los objetivos completados al final"],
    xpReward: 70,
    difficulty: "expert",
  },
  summary: "Quests con objetivos múltiples. Tracking en tiempo real. Dependencias con prerequisites. Recompensas: oro, XP, items, reputación.",
  resources: [],
  prerequisites: ["mes-09-l03"],
};

// ============================================
// LECCIÓN 9.5: Event Bus
// ============================================

export const lesson05: Lesson = {
  id: "mes-09-l05",
  moduleId: "mes-09",
  lessonNumber: 5,
  title: "Event Bus",
  description: "Arquitectura Publisher/Subscriber para sistemas desacoplados.",
  estimatedTime: 40,
  difficulty: "advanced",
  theory: {
    title: "Event Bus",
    objectives: [
      "Entender patrón Publisher/Subscriber",
      "Implementar Event Bus centralizado",
      "Desacoplar sistemas del juego",
      "Gestionar eventos globales",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "Patrón Publisher/Subscriber",
        content: `**Pub/Sub** desacopla emisores y receptores de eventos.

**Sin Event Bus (acoplado):**
\`\`\`lua
-- UI necesita referencia directa al jugador
function UI:ActualizarVida()
    self.barraVida:SetPercent(jugador.vida / jugador.vidaMax)
end

-- Jugador llama directamente a UI
function Jugador:RecibirDaño(cantidad)
    self.vida = self.vida - cantidad
    UI:ActualizarVida()  -- ¡Acoplamiento!
end
\`\`\`

**Con Event Bus (desacoplado):**
\`\`\`lua
-- Jugador solo emite evento
function Jugador:RecibirDaño(cantidad)
    self.vida = self.vida - cantidad
    EventBus:Emitir("JugadorDaño", {vida = self.vida})
end

-- UI se suscribe al evento
EventBus:Suscribir("JugadorDaño", function(datos)
    UI.barraVida:SetPercent(datos.vida / 100)
end)
\`\`\``,
        codeExamples: [
          {
            title: "Event Bus básico",
            code: `local EventBus = {}
EventBus.__index = EventBus

function EventBus.new()
    local self = setmetatable({}, EventBus)
    self.suscriptores = {}
    return self
end

function EventBus:Suscribir(evento, callback)
    if not self.suscriptores[evento] then
        self.suscriptores[evento] = {}
    end
    table.insert(self.suscriptores[evento], callback)
end

function EventBus:Desuscribir(evento, callback)
    if self.suscriptores[evento] then
        for i, cb in ipairs(self.suscriptores[evento]) do
            if cb == callback then
                table.remove(self.suscriptores[evento], i)
                break
            end
        end
    end
end

function EventBus:Emitir(evento, datos)
    if self.suscriptores[evento] then
        for _, callback in ipairs(self.suscriptores[evento]) do
            callback(datos)
        end
    end
end

return EventBus`,
            language: "lua",
            description: "Implementación básica de Event Bus.",
          },
        ],
      },
      {
        heading: "Implementación Completa",
        content: `**Event Bus con prioridades:**
\`\`\`lua
function EventBus:Suscribir(evento, callback, prioridad)
    prioridad = prioridad or 0
    
    if not self.suscriptores[evento] then
        self.suscriptores[evento] = {}
    end
    
    table.insert(self.suscriptores[evento], {
        callback = callback,
        prioridad = prioridad
    })
    
    -- Ordenar por prioridad
    table.sort(self.suscriptores[evento], function(a, b)
        return a.prioridad > b.prioridad
    end)
end
\`\`\`

**Event Bus con una sola vez:**
\`\`\`lua
function EventBus:SuscribirUnaVez(evento, callback)
    local function wrapper(datos)
        callback(datos)
        self:Desuscribir(evento, wrapper)
    end
    self:Suscribir(evento, wrapper)
end
\`\`\``,
        codeExamples: [
          {
            title: "Event Bus avanzado",
            code: `local EventBusAvanzado = {}

function EventBusAvanzado:Inicializar()
    self.suscriptores = {}
    self.historial = {}  -- Para debug
end

function EventBusAvanzado:Suscribir(evento, callback, prioridad)
    prioridad = prioridad or 0
    
    if not self.suscriptores[evento] then
        self.suscriptores[evento] = {}
    end
    
    table.insert(self.suscriptores[evento], {
        callback = callback,
        prioridad = prioridad,
        id = #self.suscriptores[evento]
    })
    
    -- Ordenar por prioridad (mayor primero)
    table.sort(self.suscriptores[evento], function(a, b)
        return a.prioridad > b.prioridad
    end)
end

function EventBusAvanzado:SuscribirUnaVez(evento, callback)
    local function wrapper(datos)
        callback(datos)
        self:Desuscribir(evento, wrapper)
    end
    self:Suscribir(evento, wrapper)
end

function EventBusAvanzado:Desuscribir(evento, callback)
    if self.suscriptores[evento] then
        for i, suscriptor in ipairs(self.suscriptores[evento]) do
            if suscriptor.callback == callback then
                table.remove(self.suscriptores[evento], i)
                break
            end
        end
    end
end

function EventBusAvanzado:Emitir(evento, datos)
    -- Guardar en historial
    table.insert(self.historial, {
        evento = evento,
        datos = datos,
        tiempo = os.time()
    })
    
    -- Notificar suscriptores
    if self.suscriptores[evento] then
        for _, suscriptor in ipairs(self.suscriptores[evento]) do
            local success, err = pcall(suscriptor.callback, datos)
            if not success then
                print("Error en evento " .. evento .. ": " .. err)
            end
        end
    end
end

return EventBusAvanzado`,
            language: "lua",
            description: "Event Bus con prioridades y una sola vez.",
          },
        ],
      },
      {
        heading: "Casos de Uso",
        content: `**Eventos comunes en juegos:**

**Gameplay:**
- \`JugadorMuerte\` - Jugador murió
- \`JugadorSubioNivel\` - Jugador subió de nivel
- \`QuestCompletada\` - Quest completada
- \`ItemRecogido\` - Item recogido

**UI:**
- \`MostrarNotificacion\` - Mostrar notificación
- \`ActualizarUI\` - Actualizar elementos de UI
- \`AbrirMenu\` - Abrir menú específico

**Audio:**
- \`ReproducirMusica\` - Cambiar música
- \`ReproducirSFX\` - Reproducir efecto de sonido

**Sistema:**
- \`GuardarJuego\` - Trigger de guardado
- \`CargarJuego\` - Trigger de carga`,
        codeExamples: [
          {
            title: "Eventos en juego",
            code: `local EventosJuego = {}

function EventosJuego:Inicializar(eventBus)
    self.eventBus = eventBus
    
    -- Suscribirse a eventos de jugador
    self.eventBus:Suscribir("JugadorMuerte", function(datos)
        self:EnJugadorMuerte(datos)
    end)
    
    self.eventBus:Suscribir("JugadorDaño", function(datos)
        self:EnJugadorDaño(datos)
    end)
    
    self.eventBus:Suscribir("QuestCompletada", function(datos)
        self:EnQuestCompletada(datos)
    end)
end

function EventosJuego:EnJugadorMuerte(datos)
    print("Jugador murió")
    self.eventBus:Emitir("MostrarPantallaMuerte", {})
    self.eventBus:Emitir("ReproducirMusica", {musica = "muerte"})
end

function EventosJuego:EnJugadorDaño(datos)
    -- Actualizar UI
    self.eventBus:Emitir("ActualizarUIVida", {vida = datos.vida})
    
    -- Efectos visuales
    self.eventBus:Emitir("MostrarFlotante", {texto = "-" .. datos.cantidad})
    
    -- Audio
    self.eventBus:Emitir("ReproducirSFX", {sfx = "hit"})
end

function EventosJuego:EnQuestCompletada(datos)
    print("Quest completada: " .. datos.questId)
    self.eventBus:Emitir("MostrarNotificacion", {
        titulo = "Quest Completada",
        mensaje = datos.questNombre
    })
end

return EventosJuego`,
            language: "lua",
            description: "Eventos comunes en un juego.",
          },
        ],
      },
    ],
    summary: `Event Bus usa patrón Publisher/Subscriber. Suscribir para escuchar eventos, Emitir para notificar. Desacopla sistemas. Prioridades para orden de ejecución. SuscribirseUnaVez para eventos únicos.`,
  },
  examples: [],
  interactive: {
    title: "Simula Event Bus",
    description: "Emitir y suscribir eventos",
    starterCode: `local EventBus = {
    suscriptores = {}
}

function EventBus:Suscribir(evento, callback)
    if not self.suscriptores[evento] then
        self.suscriptores[evento] = {}
    end
    table.insert(self.suscriptores[evento], callback)
end

function EventBus:Emitir(evento, datos)
    if self.suscriptores[evento] then
        for _, callback in ipairs(self.suscriptores[evento]) do
            callback(datos)
        end
    end
end

-- Suscriptores
EventBus:Suscribir("Saludo", function(datos)
    print("Hola " .. datos.nombre)
end)

EventBus:Suscribir("Saludo", function(datos)
    print("¿Cómo estás, " .. datos.nombre .. "?")
end)

-- Emitir evento
EventBus:Emitir("Saludo", {nombre = "Juan"})`,
    environment: "lua",
    expectedOutput: "Hola Juan",
  },
  miniExercise: {
    id: "mes-09-l05-ej1",
    lessonId: "mes-09-l05",
    title: "Sistema de Logros con Event Bus",
    instructions: `Crea un sistema de logros usando Event Bus:

1. Event Bus con Suscribir y Emitir
2. Sistema de logros que se suscribe a eventos
3. Logro "Primeros Pasos": Se completa al emitir "JugadorMovio" 5 veces
4. Logro "Guerrero": Se completa al emitir "EnemigoDerrotado" 3 veces
5. Emitir eventos y verificar logros

**Salida esperada:**
\`\`\`
Evento: JugadorMovio (1/5)
Evento: JugadorMovio (2/5)
...
Evento: JugadorMovio (5/5)
🏆 Logro desbloqueado: Primeros Pasos
Evento: EnemigoDerrotado (1/3)
...
🏆 Logro desbloqueado: Guerrero
\`\`\``,
    starterCode: `local EventBus = {suscriptores = {}}

function EventBus:Suscribir(evento, callback)
    -- Implementar
end

function EventBus:Emitir(evento, datos)
    -- Implementar
end

local Logros = {
    contadorMovimientos = 0,
    contadorDerrotas = 0
}

-- Suscribirse a eventos


-- Emitir eventos
for i = 1, 5 do
    EventBus:Emitir("JugadorMovio", {})
end

for i = 1, 3 do
    EventBus:Emitir("EnemigoDerrotado", {})
end`,
    solution: `local EventBus = {suscriptores = {}}

function EventBus:Suscribir(evento, callback)
    if not self.suscriptores[evento] then
        self.suscriptores[evento] = {}
    end
    table.insert(self.suscriptores[evento], callback)
end

function EventBus:Emitir(evento, datos)
    if self.suscriptores[evento] then
        for _, callback in ipairs(self.suscriptores[evento]) do
            callback(datos)
        end
    end
end

local Logros = {
    contadorMovimientos = 0,
    contadorDerrotas = 0
}

-- Suscribirse a eventos
EventBus:Suscribir("JugadorMovio", function()
    Logros.contadorMovimientos = Logros.contadorMovimientos + 1
    print("Evento: JugadorMovio (" .. Logros.contadorMovimientos .. "/5)")
    
    if Logros.contadorMovimientos >= 5 then
        print("🏆 Logro desbloqueado: Primeros Pasos")
    end
end)

EventBus:Suscribir("EnemigoDerrotado", function()
    Logros.contadorDerrotas = Logros.contadorDerrotas + 1
    print("Evento: EnemigoDerrotado (" .. Logros.contadorDerrotas .. "/3)")
    
    if Logros.contadorDerrotas >= 3 then
        print("🏆 Logro desbloqueado: Guerrero")
    end
end)

-- Emitir eventos
for i = 1, 5 do
    EventBus:Emitir("JugadorMovio", {})
end

for i = 1, 3 do
    EventBus:Emitir("EnemigoDerrotado", {})
end`,
    tests: [
      { type: "output_contains", expected: "JugadorMovio (5/5)", message: "5 movimientos" },
      { type: "output_contains", expected: "🏆 Logro desbloqueado: Primeros Pasos", message: "Primer logro" },
      { type: "output_contains", expected: "🏆 Logro desbloqueado: Guerrero", message: "Segundo logro" },
    ],
    hints: ["Contador incrementa en cada evento", "Verificar >= 5 para Primeros Pasos", "Verificar >= 3 para Guerrero"],
    xpReward: 60,
    difficulty: "advanced",
  },
  summary: "Event Bus: Publisher/Subscriber. Suscribir para escuchar, Emitir para notificar. Desacopla sistemas. Prioridades y SuscribirseUnaVez.",
  resources: [],
  prerequisites: ["mes-09-l04"],
};

// ============================================
// LECCIÓN 9.6: Proyecto Dungeon Crawler
// ============================================

export const lesson06: Lesson = {
  id: "mes-09-l06",
  moduleId: "mes-09",
  lessonNumber: 6,
  title: "Proyecto: Dungeon Crawler",
  description: "Integra generación procedural, quests y sistemas en un dungeon crawler.",
  estimatedTime: 35,
  difficulty: "expert",
  theory: {
    title: "Proyecto: Dungeon Crawler",
    objectives: [
      "Integrar todos los sistemas avanzados",
      "Crear dungeon crawler funcional",
      "Gestionar complejidad de sistemas",
      "Optimizar rendimiento",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Arquitectura del Juego",
        content: `**Sistemas integrados:**
\`\`\`
┌─────────────────────────────────────┐
│         Dungeon Crawler             │
├─────────────────────────────────────┤
│  Generación Procedural (WFC)        │
│  ↓                                   │
│  Quest System                       │
│  ↓                                   │
│  Event Bus                          │
│  ↓                                   │
│  Audio Adaptativo                   │
│  ↓                                   │
│  Materiales Dinámicos               │
└─────────────────────────────────────┘
\`\`\`

**Flujo del juego:**
1. Generar dungeon con WFC
2. Player entra al dungeon
3. Quest se activa automáticamente
4. Event Bus notifica eventos
5. Audio reacciona al progreso
6. Materiales cambian con el ambiente`,
        codeExamples: [
          {
            title: "Game Manager",
            code: `local DungeonCrawler = {}

function DungeonCrawler:Inicializar()
    -- Sistemas
    self.generador = WaveFunctionCollapse
    self.questSystem = QuestSystem
    self.eventBus = EventBus
    self.audio = AudioDinamico
    self.materiales = MaterialesDinamicos
    
    -- Estado
    self.dungeon = nil
    self.jugador = nil
    self.questActual = nil
end

function DungeonCrawler:IniciarJuego()
    -- 1. Generar dungeon
    self.dungeon = self.generador:Generar(20, 20)
    
    -- 2. Crear quest
    self.questActual = self.questSystem:CrearQuest("dungeon_001", {
        nombre = "Explorar el Dungeon",
        objetivos = {
            {tipo = "explorar", objetivo = "todas_las_rooms", cantidad = 1}
        },
        recompensas = {oro = 500, xp = 1000}
    })
    
    -- 3. Suscribirse a eventos
    self.eventBus:Suscribir("JugadorEntraRoom", function(datos)
        self:EnJugadorEntraRoom(datos)
    end)
    
    -- 4. Configurar audio
    self.audio:Inicializar()
    self.audio:ActivarCapa("dungeon", true)
end

function DungeonCrawler:EnJugadorEntraRoom(datos)
    -- Actualizar quest
    self.questSystem:ActualizarProgreso("explorar", "room", 1)
    
    -- Audio reactivo
    self.audio:SetParameter("Reverb", 0.8)
    
    -- Material de paredes
    self.materiales:SetParameter("Ambiente", "dungeon")
end

return DungeonCrawler`,
            language: "lua",
            description: "Game Manager integrando todos los sistemas.",
          },
        ],
      },
      {
        heading: "Implementación Completa",
        content: `**Código final integrado:**
\`\`\`lua
-- Combina:
-- 1. WFC para generación de dungeon
-- 2. Quest system para objetivos
-- 3. Event Bus para comunicación
-- 4. Audio adaptativo para atmósfera
-- 5. Materiales dinámicos para visuales
\`\`\``,
        codeExamples: [
          {
            title: "Implementación final",
            code: `local DungeonCrawlerCompleto = {}

function DungeonCrawlerCompleto:Inicializar()
    print("=== Dungeon Crawler ===")
    
    -- Generar dungeon
    print("Generando dungeon...")
    self.dungeon = self:GenerarDungeon(10, 10)
    print("Dungeon generado: " .. self.dungeon.rooms .. " rooms")
    
    -- Crear quest
    self.quest = {
        id = "explorar_dungeon",
        nombre = "Explorar el Dungeon",
        roomsExploradas = 0,
        roomsTotales = self.dungeon.rooms,
        completada = false
    }
    
    print("Quest: " .. self.quest.nombre)
    print("Objetivo: Explorar " .. self.quest.roomsTotales .. " rooms")
end

function DungeonCrawlerCompleto:GenerarDungeon(ancho, alto)
    -- Simular WFC
    local rooms = math.random(ancho * alto / 2, ancho * alto)
    return {
        ancho = ancho,
        alto = alto,
        rooms = rooms,
        grid = {}
    }
end

function DungeonCrawlerCompleto:EnJugadorEntraRoom(roomId)
    self.quest.roomsExploradas = self.quest.roomsExploradas + 1
    print("Room " .. roomId .. ": " .. self.quest.roomsExploradas .. "/" .. self.quest.roomsTotales)
    
    -- Verificar quest completada
    if self.quest.roomsExploradas >= self.quest.roomsTotales then
        self.quest.completada = true
        print("\\n✓ Quest completada!")
        print("Recompensa: 500 oro, 1000 XP")
    end
end

return DungeonCrawlerCompleto`,
            language: "lua",
            description: "Implementación completa del dungeon crawler.",
          },
        ],
      },
    ],
    summary: `Dungeon crawler integra WFC, quests, event bus, audio y materiales. Game Manager coordina sistemas. Generar dungeon, crear quest, eventos notifican progreso, audio/materiales reaccionan.`,
  },
  examples: [],
  interactive: {
    title: "Simula Dungeon Crawler",
    description: "Explorar dungeon y completar quest",
    starterCode: `local Dungeon = {
    rooms = 5,
    exploradas = 0
}

local Quest = {
    nombre = "Explorar Dungeon",
    completada = false
}

function ExplorarRoom(id)
    Dungeon.exploradas = Dungeon.exploradas + 1
    print("Explorando room " .. id .. ": " .. Dungeon.exploradas .. "/" .. Dungeon.rooms)
    
    if Dungeon.exploradas >= Dungeon.rooms then
        Quest.completada = true
        print("\\n✓ Quest completada: " .. Quest.nombre)
        print("Recompensa: 500 oro, 1000 XP")
    end
end

-- Explorar todas las rooms
for i = 1, Dungeon.rooms do
    ExplorarRoom(i)
end`,
    environment: "lua",
    expectedOutput: "Explorando room",
  },
  miniExercise: {
    id: "mes-09-l06-ej1",
    lessonId: "mes-09-l06",
    title: "Dungeon Crawler con Quests",
    instructions: `Crea un dungeon crawler simple:

1. Dungeon con 5 rooms
2. Quest "Explorar Dungeon" con objetivo de 5 rooms
3. Función \`Explorar(id)\` que:
   - Incrementa rooms exploradas
   - Imprime progreso
   - Verifica quest completada
4. Si quest completada, imprime recompensa
5. Explorar las 5 rooms

**Salida esperada:**
\`\`\`
=== Dungeon Crawler ===
Quest: Explorar el Dungeon
Objetivo: 5 rooms

Explorando room 1: 1/5
Explorando room 2: 2/5
...
Explorando room 5: 5/5

✓ Quest completada: Explorar el Dungeon
Recompensa: 500 oro, 1000 XP
\`\`\``,
    starterCode: `local Dungeon = {
    rooms = 5,
    exploradas = 0
}

local Quest = {
    nombre = "Explorar el Dungeon",
    objetivo = 5,
    completada = false
}

function Explorar(id)
    -- Implementar
end

print("=== Dungeon Crawler ===")
print("Quest: " .. Quest.nombre)
print("Objetivo: " .. Quest.objetivo .. " rooms\\n")

-- Explorar todas las rooms
for i = 1, Dungeon.rooms do
    Explorar(i)
end`,
    solution: `local Dungeon = {
    rooms = 5,
    exploradas = 0
}

local Quest = {
    nombre = "Explorar el Dungeon",
    objetivo = 5,
    completada = false
}

function Explorar(id)
    Dungeon.exploradas = Dungeon.exploradas + 1
    print("Explorando room " .. id .. ": " .. Dungeon.exploradas .. "/" .. Quest.objetivo)
    
    if Dungeon.exploradas >= Quest.objetivo then
        Quest.completada = true
        print("\\n✓ Quest completada: " .. Quest.nombre)
        print("Recompensa: 500 oro, 1000 XP")
    end
end

print("=== Dungeon Crawler ===")
print("Quest: " .. Quest.nombre)
print("Objetivo: " .. Quest.objetivo .. " rooms\\n")

for i = 1, Dungeon.rooms do
    Explorar(i)
end`,
    tests: [
      { type: "output_contains", expected: "=== Dungeon Crawler ===", message: "Header" },
      { type: "output_contains", expected: "Explorando room 5: 5/5", message: "Última room" },
      { type: "output_contains", expected: "✓ Quest completada", message: "Quest completada" },
      { type: "output_contains", expected: "500 oro, 1000 XP", message: "Recompensa" },
    ],
    hints: ["Incrementar exploradas en Explorar", "Verificar >= objetivo para completar", "Imprimir mensaje de completado y recompensa"],
    xpReward: 75,
    difficulty: "expert",
  },
  summary: "Dungeon crawler integra WFC, quests, event bus, audio, materiales. Game Manager coordina. Generar, quest, eventos, audio/materiales reaccionan.",
  resources: [],
  prerequisites: ["mes-09-l05"],
};

// Exportar todas las lecciones del módulo 9
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
];
