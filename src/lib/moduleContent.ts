// src/lib/moduleContent.ts

export interface ModuleLesson {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  keyPoints: string[];
  codeExample?: {
    title: string;
    code: string;
    language: "lua" | "cpp";
  };
}

export interface ModuleContentDetail {
  id: string;
  title: string;
  description: string;
  overview: string;
  learningObjectives: string[];
  lessons: ModuleLesson[];
  resources: Array<{
    title: string;
    url: string;
    type: "video" | "article" | "documentation";
  }>;
}

import UE5_MODULES from "./moduleContentUE5";

// Module Content Library
export const MODULE_CONTENT: Record<string, ModuleContentDetail> = {
  "mes-01": {
    id: "mes-01",
    title: "Mes 01 - Fundamentos de Lua",
    description: "Aprende los conceptos básicos de Lua",
    overview:
      "Este módulo te introduce a los fundamentos de Lua, el lenguaje de programación dinámico y léxico que potencia muchas aplicaciones de juegos y sistemas.",
    learningObjectives: [
      "Comprender la historia y filosofía de Lua",
      "Configurar el entorno de desarrollo",
      "Entender tipos de datos primitivos",
      "Trabajar con variables y alcances",
      "Dominar operadores fundamentales",
    ],
    lessons: [
      {
        id: "l1-intro",
        title: "Introducción a Lua",
        description: "Qué es Lua y por qué es importante",
        content: `Lua es un lenguaje de programación interpretado, dinámico y de tipado débil, 
diseñado principalmente para extensibilidad y embebido. Fue creado en 1993 por Roberto Ierusalimschy, 
Waldemar Celes y Luiz Henrique de Figueiredo en Brasil.

## Características principales:
- **Ligero y rápido**: Ideal para embeber en otras aplicaciones
- **Dinámico**: Tipado débil, muy flexible
- **Léxico**: Soporta closures y funciones de primera clase
- **Portable**: Funciona en cualquier plataforma con C

## ¿Por qué Lua?
- Roblox: Principal lenguaje de la plataforma
- Unreal Engine 5: Soporte integrado para scripting
- World of Warcraft: Utilizado para add-ons
- LÖVE 2D: Motor de juegos indie`,
        imageUrl: "/images/lua-logo.png",
        videoUrl: "https://www.youtube.com/embed/iMacxZQMPXs",
        keyPoints: [
          "Lua fue creado en 1993",
          "Es el lenguaje base de Roblox",
          "UE5 integra Lua para scripting dinámico",
          "Lenguaje interpretado y de tipado débil",
        ],
        codeExample: {
          title: "Primer programa en Lua",
          code: `-- Tu primer programa en Lua
print("¡Hola, Mundo!")

-- Variables
local nombre = "Juan"
local edad = 25
print("Me llamo " .. nombre .. " y tengo " .. edad .. " años")`,
          language: "lua",
        },
      },
      {
        id: "l1-setup",
        title: "Configuración del Entorno",
        description: "Instala y configura Lua en tu computadora",
        content: `## Instalación de Lua

### Windows
1. Descarga Lua desde lua.org
2. Descomprime en C:\\Lua
3. Agrega C:\\Lua\\bin a las variables de entorno
4. Verifica: \`lua -v\`

### macOS
\`\`\`bash
brew install lua
lua -v
\`\`\`

### Linux
\`\`\`bash
sudo apt-get install lua5.1
lua -v
\`\`\`

## Editor Recomendado
- VS Code con extensión "Lua"
- ZeroBrane Studio
- LuaEdit

## Verificar instalación
\`\`\`lua
print(_VERSION)  -- Muestra la versión de Lua
\`\`\``,
        keyPoints: [
          "Instala Lua 5.1 o superior",
          "Usa un editor con soporte para Lua",
          "Verifica la instalación con 'lua -v'",
        ],
      },
      {
        id: "l1-tipos",
        title: "Tipos de Datos Primitivos",
        description: "Entender los tipos principales en Lua",
        content: `## Tipos de Datos en Lua

Lua tiene 8 tipos de datos principales:

### 1. Nil (Nulo)
Representa la ausencia de valor.

### 2. Boolean (Booleano)
Verdadero o falso.

### 3. Number (Número)
Enteros y decimales (todo es número de punto flotante).

### 4. String (Cadena)
Texto entre comillas.

### 5. Table (Tabla)
Estructura que contiene datos - MUY IMPORTANTE.

### 6. Function (Función)
Bloque de código reutilizable.

### 7. Userdata
Datos desde C/C++.

### 8. Thread
Para corrutinas.`,
        keyPoints: [
          "Nil representa ausencia de valor",
          "Booleanos: true y false",
          "Numbers incluyen enteros y decimales",
          "Strings se crean con comillas",
          "Tables son la estructura fundamental",
        ],
        codeExample: {
          title: "Ejemplos de tipos de datos",
          code: `-- nil (nada)
local x = nil

-- boolean
local esTrue = true
local esFalse = false

-- number
local entero = 42
local decimal = 3.14

-- string
local nombre = "Lua"
local saludo = 'Hola, mundo!'

-- table (veremos más adelante)
local persona = {nombre = "Juan", edad = 25}

-- function
local funcion = function() print("Hola") end

-- type() nos dice el tipo
print(type(x))        -- nil
print(type(esTrue))   -- boolean
print(type(42))       -- number`,
          language: "lua",
        },
      },
      {
        id: "l1-variables",
        title: "Variables y Alcance",
        description: "Declara variables y entiende el alcance",
        content: `## Variables en Lua

### Declación: local vs global

En Lua, las variables pueden ser LOCALES o GLOBALES.

\`\`\`lua
-- LOCAL (recomendado)
local edad = 25

-- GLOBAL (evitar)
nombre = "Juan"
\`\`\`

## Alcance (Scope)

- **Local**: Solo accesible dentro del bloque donde se define
- **Global**: Accesible desde cualquier parte del código

## Best Practices
- Usa \`local\` SIEMPRE
- Las variables globales causan bugs difíciles de encontrar
- El alcance es limitado por bloques: función, if, while, etc.`,
        keyPoints: [
          "Usa 'local' para variables locales",
          "Las globales contaminan el namespace",
          "Alcance está limitado a bloques",
          "Prioridad: local > global",
        ],
      },
    ],
    resources: [
      {
        title: "Lua Official Documentation",
        url: "https://www.lua.org/manual/5.1/",
        type: "documentation",
      },
      {
        title: "Learn Lua Tutorial",
        url: "https://www.youtube.com/watch?v=iMacxZQMPXs",
        type: "video",
      },
    ],
  },
  "mes-02": {
    id: "mes-02",
    title: "Mes 02 - Tablas y Estructuras de Datos",
    description: "Domina las tablas, la estructura más importante de Lua",
    overview:
      "Las tablas son el corazón de Lua. Aprenderás a crear, manipular y usar tablas de todas las maneras posibles.",
    learningObjectives: [
      "Crear y acceder a tablas",
      "Entender tablas como arrays y diccionarios",
      "Trabajar con métodos de tabla",
      "Implementar estructuras complejas",
    ],
    lessons: [
      {
        id: "l2-tables-intro",
        title: "Introducción a Tablas",
        description: "Qué son y por qué son importantes",
        content: `## Tablas: La Estructura Fundamental

Las tablas son la ÚNICA estructura de datos en Lua (aparte de números, strings, etc).
Son mapas dinámicos que pueden contener cualquier tipo de valor.

## Características:
- Flexibles y dinámicas
- Pueden actuar como arrays, diccionarios u objetos
- Se pueden anidar
- Se pasan por referencia

## Creación básica:
\`\`\`lua
-- Tabla vacía
local tabla = {}

-- Con índices numéricos (array)
local numeros = {1, 2, 3, 4, 5}

-- Con claves (diccionario)
local persona = {nombre = "Juan", edad = 25, ciudad = "Madrid"}

-- Mixto
local datos = {10, 20, nombre = "Test", 30}
\`\`\``,
        keyPoints: [
          "Las tablas son la estructura principal",
          "Pueden ser arrays o diccionarios",
          "Se crean con {}",
          "Se accede con [] o punto",
        ],
      },
      {
        id: "l2-tables-access",
        title: "Acceso a Tablas",
        description: "Cómo acceder, modificar y iterar",
        content: `## Acceso a Tablas

### Acceso con índice numérico
\`\`\`lua
local frutas = {"manzana", "banana", "naranja"}
print(frutas[1])  -- "manzana" (índice 1, no 0!)
\`\`\`

### Acceso con clave
\`\`\`lua
local persona = {nombre = "Juan", edad = 25}
print(persona.nombre)      -- "Juan"
print(persona["nombre"])   -- "Juan"
\`\`\`

### Modificación
\`\`\`lua
local tabla = {}
tabla.new_key = "valor"
tabla[1] = 100
tabla["custom"] = true
\`\`\`

### Iteración
\`\`\`lua
local datos = {10, 20, 30}
for i = 1, #datos do
  print(datos[i])
end

local persona = {nombre = "Juan", edad = 25}
for clave, valor in pairs(persona) do
  print(clave .. ": " .. tostring(valor))
end
\`\`\``,
        keyPoints: [
          "Lua usa índices de 1, no 0",
          "Acceso con [índice] o .clave",
          "Modificación directa es posible",
          "Itera con pares y #",
        ],
      },
    ],
    resources: [
      {
        title: "Lua Tables Guide",
        url: "https://www.lua.org/pil/2.5.html",
        type: "documentation",
      },
    ],
  },
  "mes-03": {
    id: "mes-03",
    title: "Mes 03 - Juegos en Roblox: Introducción",
    description: "Aprende a crear juegos interactivos en Roblox con Lua",
    overview:
      "Roblox es una plataforma de creación de juegos donde los usuarios pueden construir y jugar. Este módulo te enseña cómo crear juegos en Roblox usando Lua, herramientas de Roblox Studio, y las APIs de Roblox.",
    learningObjectives: [
      "Configurar Roblox Studio y crear un nuevo proyecto",
      "Entender la arquitectura cliente-servidor de Roblox",
      "Crear scripts en Roblox (scripts locales y normales)",
      "Entender objetos del juego (Parts, Models, Workspaces)",
      "Crear mecánicas básicas de juego",
    ],
    lessons: [
      {
        id: "l3-intro-roblox",
        title: "Introducción a Roblox Studio",
        description: "Primeros pasos en Roblox Studio y estructura del proyecto",
        content:
          "Roblox es una plataforma de creación de juegos basada en la nube con más de 200 millones de usuarios. Roblox Studio es el entorno de desarrollo integrado que permite crear juegos sin costo.\n\nUn juego en Roblox consta de: Workspace (contenedor principal), Lighting (iluminación), Players (gestión de jugadores), ServerStorage (almacenamiento servidor), y ServerScriptService (contenedor de scripts).\n\nExisten tres tipos de scripts: Server Scripts (se ejecutan en servidores de Roblox), Local Scripts (se ejecutan en el cliente), y Module Scripts (código reutilizable).",
        keyPoints: [
          "Roblox Studio es gratuito y está disponible para Windows y Mac",
          "Los juegos están compuestos por Parts organizados en el Workspace",
          "Server Scripts controlan la lógica principal del juego",
          "Local Scripts manejan entrada y actualizaciones de GUI",
          "La comunicación cliente-servidor se realiza vía RemoteEvents",
        ],
        codeExample: {
          title: "Primer Script en Roblox",
          code: `-- Script que imprime en la salida
local part = script.Parent
print("Objeto:", part.Name)

-- Detectar cuando el juego inicia
game:GetService("RunService").Heartbeat:Connect(function()
    -- Código que se ejecuta cada frame
end)`,
          language: "lua",
        },
      },
      {
        id: "l3-workspace",
        title: "Creando Objetos en el Workspace",
        description: "Cómo crear y manipular objetos 3D en Roblox",
        content:
          "Los objetos en Roblox se llaman Parts. Existen varios tipos: Block (cubo), Ball (esfera), Wedge (cuña), Cylinder (cilindro). Cada Part tiene propiedades como Position (coordenadas), Size (dimensiones), Color, Material, CanCollide, y Anchored.\n\nPuedes crear Parts manualmente o programáticamente con código Lua.",
        keyPoints: [
          "Las Parts son los bloques de construcción de juegos",
          "Position controla la ubicación (X, Y, Z)",
          "Size controla las dimensiones",
          "Anchored = false permite que el objeto caiga por gravedad",
          "CanCollide controla si el objeto puede colisionar",
        ],
        codeExample: {
          title: "Crear un Part Programáticamente",
          code: `local part = Instance.new("Part")
part.Shape = Enum.PartType.Block
part.Size = Vector3.new(2, 2, 2)
part.BrickColor = BrickColor.new("Bright blue")
part.Position = Vector3.new(0, 5, 0)
part.Parent = game.Workspace
part.Anchored = false`,
          language: "lua",
        },
      },
      {
        id: "l3-player-interaction",
        title: "Interacción con Jugadores",
        description: "Detectar y responder a acciones de jugadores",
        content:
          "Los jugadores son el centro de cualquier juego. Puedes detectar eventos como: PlayerAdded (entra), PlayerRemoving (sale), CharacterAdded (aparece), CharacterRemoving (desaparece). También puedes detectar entrada de usuario como clics, teclas, movimientos y saltos.",
        keyPoints: [
          "Accede a jugadores con game:GetService('Players')",
          "PlayerAdded y PlayerRemoving son eventos principales",
          "Cada jugador tiene un carácter con Humanoid",
          "Entrada de usuario solo funciona en LocalScripts",
          "RemoteEvents comunican cliente con servidor",
        ],
        codeExample: {
          title: "Detectar cuando un jugador entra",
          code: `local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " se unió!")
    
    player.CharacterAdded:Connect(function(character)
        print(player.Name .. " ha aparecido")
    end)
end)

Players.PlayerRemoving:Connect(function(player)
    print(player.Name .. " se fue!")
end)`,
          language: "lua",
        },
      },
      {
        id: "l3-physics",
        title: "Física y Movimiento",
        description: "Implementar física realista en tus juegos",
        content:
          "Roblox incluye un motor de física que hace que los objetos se comporten de manera realista. Puedes controlar: Velocity (velocidad), RotVelocity (rotación), superficie, y material del objeto.",
        keyPoints: [
          "La física está habilitada automáticamente",
          "AssemblyLinearVelocity controla la velocidad",
          "AssemblyAngularVelocity controla la rotación",
          "La gravedad es 196.2 m/s² por defecto",
          "Debounce previene múltiples activaciones",
        ],
        codeExample: {
          title: "Aplicar Física a un Objeto",
          code: `local part = Instance.new("Part")
part.Shape = Enum.PartType.Ball
part.Size = Vector3.new(1, 1, 1)
part.Position = Vector3.new(0, 10, 0)
part.Parent = game.Workspace
part.Anchored = false

-- Dar velocidad inicial
part.AssemblyLinearVelocity = Vector3.new(10, 0, 0)`,
          language: "lua",
        },
      },
    ],
    resources: [
      {
        title: "Roblox Developer Documentation",
        url: "https://developer.roblox.com/",
        type: "documentation",
      },
      {
        title: "Lua Scripting Guide",
        url: "https://developer.roblox.com/en-us/articles/Lua-Learning-Guide",
        type: "article",
      },
    ],
  },
  "mes-04": {
    id: "mes-04",
    title: "Mes 04 - APIs de Roblox",
    description: "Explora las APIs principales de Roblox para desarrollo avanzado",
    overview:
      "Aprende a usar las APIs principales de Roblox para crear experiencias complejas. Incluye DataStore, economía de juego, RemoteEvents, y control de personajes.",
    learningObjectives: [
      "Usar DataStoreService para persistencia de datos",
      "Implementar sistemas de moneda",
      "Usar Humanoid para control de personajes",
      "Trabajar con RemoteEvents para comunicación segura",
      "Implementar sistemas de inventario básicos",
    ],
    lessons: [
      {
        id: "l4-datastores",
        title: "DataStore: Guardar Datos de Jugadores",
        description: "Cómo guardar y cargar datos persistentes",
        content:
          "DataStore es el sistema de Roblox para guardar datos entre sesiones. Permite persistencia de información de jugadores en servidores de Roblox. Usa UpdateAsync para cambios seguros y siempre implementa manejo de errores.",
        keyPoints: [
          "DataStore guarda datos en servidores de Roblox",
          "SetAsync sobrescribe, UpdateAsync es más seguro",
          "Implementa reintentos para errores",
          "HasData() verifica si existen datos previos",
        ],
        codeExample: {
          title: "Guardar datos de jugador",
          code: `local DataStoreService = game:GetService("DataStoreService")
local playerData = DataStoreService:GetDataStore("PlayerData")

local function savePlayerData(player)
    local key = "player_" .. player.UserId
    local data = {
        level = 5,
        coins = 1000,
        experience = 500
    }
    
    playerData:SetAsync(key, data)
    print("Datos guardados para", player.Name)
end`,
          language: "lua",
        },
      },
      {
        id: "l4-economy",
        title: "Economía de Juego",
        description: "Crear sistemas de moneda y compras",
        content:
          "Implementa una economía funcional en tu juego con moneda, tienda, y compras. Mantén la moneda en DataStore, valida transacciones en el servidor, y usa RemoteEvents para solicitudes de compra.",
        keyPoints: [
          "Mantén moneda sincronizada en DataStore",
          "Valida todas las transacciones en servidor",
          "Usa RemoteEvents para solicitudes de compra",
          "Implementa protecciones contra fraude",
          "Registra todas las transacciones",
        ],
        codeExample: {
          title: "Sistema de tienda simple",
          code: `local items = {
    sword = {price = 100, damage = 25},
    shield = {price = 150, defense = 10}
}

local function buyItem(player, itemName)
    if not items[itemName] then
        return false, "Item no existe"
    end
    
    local cost = items[itemName].price
    -- Validar que jugador tiene moneda suficiente
    -- Restar moneda y dar item
    return true, "Compra exitosa"
end`,
          language: "lua",
        },
      },
      {
        id: "l4-remoteevents",
        title: "RemoteEvents: Comunicación Cliente-Servidor",
        description: "Comunicación segura entre cliente y servidor",
        content:
          "RemoteEvents permite que LocalScripts se comuniquen con ServerScripts de manera segura. FireServer() envía datos del cliente al servidor, y OnServerEvent escucha en el servidor. NUNCA confíes en datos del cliente.",
        keyPoints: [
          "FireServer() envía datos del cliente al servidor",
          "OnServerEvent recibe en el servidor",
          "Nunca confíes en datos del cliente",
          "Valida siempre en el servidor",
          "Usa debounce para evitar spam",
        ],
        codeExample: {
          title: "Usar RemoteEvent",
          code: `-- En el servidor
local remote = Instance.new("RemoteEvent")
remote.Name = "PlayerAction"
remote.Parent = game.ReplicatedStorage

remote.OnServerEvent:Connect(function(player, action)
    print(player.Name .. " realizó:", action)
end)

-- En el cliente (LocalScript)
local remote = game.ReplicatedStorage:WaitForChild("PlayerAction")
remote:FireServer("jump")`,
          language: "lua",
        },
      },
      {
        id: "l4-humanoid",
        title: "Sistema Humanoid",
        description: "Controlar y gestionar personajes",
        content:
          "Humanoid es el componente que controla vida, salud, y movimiento de un personaje. Humanoid.Health controla la vida, :TakeDamage() causa daño, Died se activa al morir, y RootPart es el centro del personaje.",
        keyPoints: [
          "Humanoid.Health controla la vida del personaje",
          "Humanoid:TakeDamage() causa daño",
          "Humanoid.Died se activa cuando muere",
          "RootPart es el centro del personaje",
          "MaxHealth controla la salud máxima",
        ],
        codeExample: {
          title: "Control de salud del personaje",
          code: `local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")
        
        humanoid.Died:Connect(function()
            print(player.Name .. " murió!")
        end)
        
        -- Detectar daño
        humanoid.HealthChanged:Connect(function()
            print("Salud actual:", humanoid.Health)
        end)
    end)
end)`,
          language: "lua",
        },
      },
    ],
    resources: [
      {
        title: "DataStore Tutorial",
        url: "https://developer.roblox.com/en-us/articles/Data-Stores",
        type: "documentation",
      },
      {
        title: "RemoteEvent Guide",
        url: "https://developer.roblox.com/en-us/api-reference/event/RemoteEvent/OnServerEvent",
        type: "documentation",
      },
    ],
  },
  "mes-05": {
    id: "mes-05",
    title: "Mes 05 - Proyectos Finales en Roblox",
    description: "Crea tu primer juego completo en Roblox",
    overview:
      "En este módulo final de Roblox, combinarás todo lo aprendido para crear un juego completo. Trabajarás en un proyecto de defensa de torre o similar que integre física, jugadores, IA básica, y economía.",
    learningObjectives: [
      "Integrar todos los conceptos aprendidos",
      "Crear un juego funcional y jugable",
      "Implementar IA enemigos básica",
      "Crear interfaz de usuario para el juego",
      "Publicar y monetizar tu juego",
    ],
    lessons: [
      {
        id: "l5-game-design",
        title: "Diseño del Juego",
        description: "Planificar tu juego antes de programar",
        content:
          "Antes de empezar a programar, planifica tu juego. Define mecánicas, objetivos, reglas, y flujo de juego. Esto hace que el desarrollo sea más eficiente.",
        keyPoints: [
          "Define el género y objetivo del juego",
          "Planifica las mecánicas principales",
          "Esboza la progresión del jugador",
          "Documenta reglas y condiciones de victoria",
          "Crea prototipos antes de implementar",
        ],
        codeExample: {
          title: "Estructura básica de juego",
          code: `-- Ejemplo: Juego de Defensa de Torre
local GameState = {
    isRunning = false,
    waveNumber = 1,
    playerHealth = 100,
    playerMoney = 500
}

local function startGame()
    GameState.isRunning = true
    print("¡Juego iniciado!")
end

local function spawnEnemy()
    -- Crear enemigo
end

local function update()
    if not GameState.isRunning then return end
    -- Actualizar lógica del juego
end`,
          language: "lua",
        },
      },
      {
        id: "l5-ai-enemies",
        title: "IA Básica para Enemigos",
        description: "Crear enemigos simples con comportamiento",
        content:
          "Los enemigos necesitan moverse, atacar, y responder a jugadores. Implementa comportamiento básico con movimiento hacia el objetivo y detección de rango.",
        keyPoints: [
          "Usa PathfindingService para navegación",
          "Implementa distancia para detección",
          "Crea máquinas de estado para comportamiento",
          "Usa raycasting para visibilidad",
          "Optimiza con pooling de objetos",
        ],
        codeExample: {
          title: "Enemigo simple",
          code: `local enemy = script.Parent
local humanoid = enemy:WaitForChild("Humanoid")
local rootPart = enemy:WaitForChild("HumanoidRootPart")

local targetPlayer
local detectionRange = 50

game:GetService("Players"):GetPlayers()[1]

while true do
    wait(0.1)
    if targetPlayer and targetPlayer.Character then
        local distance = (rootPart.Position - 
            targetPlayer.Character.HumanoidRootPart.Position).Magnitude
        
        if distance < detectionRange then
            humanoid:MoveTo(targetPlayer.Character.HumanoidRootPart.Position)
        end
    end
end`,
          language: "lua",
        },
      },
      {
        id: "l5-ui-systems",
        title: "Sistemas de Interfaz de Usuario",
        description: "Crear menús, barras de vida, y HUD",
        content:
          "La interfaz de usuario es crucial para la experiencia del jugador. Crea menús, barras de vida, indicadores de recursos, y más.",
        keyPoints: [
          "Roblox GUI usa ScreenGui y Frame",
          "TextLabel para texto",
          "ImageLabel para imágenes",
          "Actualiza propiedades desde scripts",
          "Usa LocalScript para entrada del usuario",
        ],
        codeExample: {
          title: "Barra de vida simple",
          code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local screenGui = Instance.new("ScreenGui")
screenGui.Parent = player:WaitForChild("PlayerGui")

local healthBar = Instance.new("Frame")
healthBar.Name = "HealthBar"
healthBar.Position = UDim2.new(0, 10, 0, 10)
healthBar.Size = UDim2.new(0, 200, 0, 20)
healthBar.BackgroundColor3 = Color3.fromRGB(255, 0, 0)
healthBar.Parent = screenGui`,
          language: "lua",
        },
      },
      {
        id: "l5-polish",
        title: "Polish y Publicación",
        description: "Pulir tu juego y publicarlo",
        content:
          "Antes de publicar, testing es crucial. Verifica mecánicas, equilibra dificultad, corrige bugs, y optimiza rendimiento. Luego publica en Roblox.",
        keyPoints: [
          "Prueba en diferentes dispositivos",
          "Solicita feedback de otros",
          "Equilibra dificultad",
          "Optimiza rendimiento",
          "Documenta controles",
        ],
        codeExample: {
          title: "Checklist de publicación",
          code: `-- Verificar lo siguiente:
-- ✓ El juego es jugable de inicio a fin
-- ✓ No hay errores en la consola
-- ✓ Los controles son responsivos
-- ✓ La dificultad es equilibrada
-- ✓ Las UI están alineadas correctamente
-- ✓ Los efectos de sonido funcionan
-- ✓ Los gráficos se ven bien`,
          language: "lua",
        },
      },
    ],
    resources: [
      {
        title: "Publishing Games on Roblox",
        url: "https://developer.roblox.com/en-us/articles/Publishing",
        type: "documentation",
      },
      {
        title: "Game Design Patterns",
        url: "https://developer.roblox.com/en-us/articles/Introduction",
        type: "article",
      },
    ],
  },
};

export function getModuleContent(moduleId: string): ModuleContentDetail | null {
  return MODULE_CONTENT[moduleId] || null;
}

export function getAllModuleIds(): string[] {
  return Object.keys(MODULE_CONTENT);
}

// Merge UE5 modules (mes-06..mes-12) into the main MODULE_CONTENT map
Object.assign(MODULE_CONTENT, UE5_MODULES as Record<string, ModuleContentDetail>);
