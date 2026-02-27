// src/lib/moduleContentRoblox.ts
// Módulos 3-5: Roblox Development

export const ROBLOX_MODULES = {
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
        content: `Roblox es una plataforma de creación de juegos basada en la nube que permite a los usuarios crear, compartir y monetizar juegos. Roblox Studio es el entorno de desarrollo incluido.

## ¿Por qué Roblox?
- Audiencia global de más de 200 millones de usuarios
- Monetización de juegos
- Herramientas de diseño integradas
- Fácil de aprender, poderoso de usar

## Estructura de un Juego en Roblox

Un juego en Roblox consta de:
1. **Workspace**: Contenedor principal donde se construye el mapa
2. **Lighting**: Configuración de iluminación
3. **Players**: Gestión de jugadores
4. **ServerStorage**: Almacenamiento de objetos en el servidor
5. **ServerScriptService**: Contenedor para scripts del servidor

## Tipos de Scripts

**Server Scripts**: Se ejecutan en los servidores de Roblox
- Comienzan con "local script = script"
- Acceso a todos los objetos del juego
- Controlan la lógica principal

**Local Scripts**: Se ejecutan en el cliente del jugador
- Manejan entrada del usuario
- Actualizan la GUI
- Envían solicitudes al servidor

**Module Scripts**: Reutilizable código compartido
- Contienen funciones comunes
- Se requieren desde otros scripts`,
        keyPoints: [
          "Roblox Studio es una herramienta de desarrollo gratuita",
          "Los juegos están compuestos por Parts que se organizan en el Workspace",
          "Hay tres tipos de scripts: Server, Local, y Module",
          "La comunicación cliente-servidor se realiza a través de RemoteEvents",
          "Lua es el único lenguaje de scripting en Roblox",
        ],
        codeExample: {
          title: "Primer Script en Roblox",
          code: `-- Script simple que imprime en la salida
local part = script.Parent
print("Objeto:", part.Name)

-- Detectar cuando el juego inicia
game:GetService("RunService").Heartbeat:Connect(function()
    -- Código que se ejecuta cada frame
end)

-- Agregar función al hacer clic
script.Parent.ClickDetector.MouseClick:Connect(function(player)
    print(player.Name .. " hizo clic!")
end)`,
          language: "lua",
        },
        imageUrl: "/images/modules/mes-03-roblox-studio.png",
        videoUrl: "https://www.youtube.com/embed/SqIhVjPPYuY",
      },
      {
        id: "l3-workspace",
        title: "Creando Objetos en el Workspace",
        description: "Cómo crear y manipular objetos 3D en Roblox",
        content: `Los objetos en Roblox se llaman "Parts". Estos son bloques que forman el mundo del juego.

## Tipos de Parts
- **Block**: Cubo genérico
- **Ball**: Esfera
- **Wedge**: Cuña triangular
- **Cylinder**: Cilindro

## Propiedades Importantes

Cada Part tiene propiedades que controlan su comportamiento:
- **Position**: Coordenadas X, Y, Z
- **Size**: Dimensiones (ancho, alto, profundidad)
- **Color**: RGB (0-1)
- **Material**: Plástico, Metal, Vidrio, etc.
- **CanCollide**: Si puede colisionar
- **Anchored**: Si se puede mover o está fijo

## Creando Objetos con Código

En lugar de crear Parts manualmente, puedes crearlos dinámicamente con código Lua.`,
        keyPoints: [
          "Las Parts son los bloques de construcción de los juegos en Roblox",
          "Cada Part tiene propiedades que afectan su apariencia y comportamiento",
          "Puedes crear Parts programáticamente en Lua",
          "El sistema de coordenadas es 3D (X, Y, Z)",
          "Las colisiones y la física se pueden configurar",
        ],
        codeExample: {
          title: "Crear un Part Programáticamente",
          code: `local part = Instance.new("Part")
part.Shape = Enum.PartType.Block
part.Size = Vector3.new(2, 2, 2)
part.BrickColor = BrickColor.new("Bright blue")
part.Position = Vector3.new(0, 5, 0)
part.Parent = game.Workspace

-- Hacer que caiga por gravedad
part.Anchored = false

-- Detectar colisión
part.Touched:Connect(function(hit)
    print("Parte tocada por:", hit.Name)
    part.BrickColor = BrickColor.new("Bright red")
end)`,
          language: "lua",
        },
      },
      {
        id: "l3-player-interaction",
        title: "Interacción con Jugadores",
        description: "Detectar y responder a acciones de jugadores",
        content: `Los jugadores son el centro de cualquier juego en Roblox. Necesitas detectar sus acciones y responder a ellas.

## Eventos de Jugadores

**PlayerAdded**: Se activa cuando un jugador entra
**PlayerRemoving**: Se activa cuando un jugador sale
**CharacterAdded**: Se activa cuando el carácter del jugador aparece
**CharacterRemoving**: Se activa cuando el carácter desaparece

## Entrada de Usuario

Puedes detectar:
- Clics del mouse
- Teclas presionadas
- Movimientos
- Saltos`,
        keyPoints: [
          "Accede a jugadores a través de game:GetService('Players')",
          "Cada jugador tiene un carácter con humanoid",
          "Puedes detectar eventos del jugador (entrar, salir, muerte)",
          "La entrada del usuario se maneja en LocalScripts",
          "RemoteEvents comunican el cliente con el servidor",
        ],
        codeExample: {
          title: "Detectar Entrada de Jugador",
          code: `local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")

Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " se unió!")
    
    player.CharacterAdded:Connect(function(character)
        print(player.Name .. " ha aparecido")
        
        -- Solo funciona en LocalScript
        UserInputService.InputBegan:Connect(function(input, gameProcessed)
            if input.KeyCode == Enum.KeyCode.Space then
                print(player.Name .. " saltó!")
                character:FindFirstChild("Humanoid"):TakeDamage(5)
            end
        end)
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
        content: `Roblox incluye un motor de física que hace que los objetos se comporten de manera realista.

## Propiedades de Física

- **Velocity**: Velocidad del objeto
- **RotVelocity**: Velocidad de rotación
- **CustomPhysicalProperties**: Propiedades personalizadas
- **TopSurface/BottomSurface**: Tipos de superficie

## Fuerzas

Puedes aplicar fuerzas a los objetos:
- **Gravedad**: Hacia abajo (por defecto)
- **Impulsos**: Cambios instantáneos de velocidad
- **Fuerzas continuas**: Aceleración persistente`,
        keyPoints: [
          "La física está habilitada por defecto en Roblox",
          "Puedes controlar velocidad con propiedades Velocity",
          "AssemblyLinearVelocity para cambios más eficientes",
          "BodyVelocity y BodyPosition son deprecated, usa AssemblyVelocity",
          "La gravedad es 196.2 m/s² por defecto",
        ],
        codeExample: {
          title: "Aplicar Física a un Objeto",
          code: `local part = Instance.new("Part")
part.Shape = Enum.PartType.Ball
part.Size = Vector3.new(1, 1, 1)
part.Position = Vector3.new(0, 10, 0)
part.Parent = game.Workspace
part.Anchored = false
part.CanCollide = true

-- Dar velocidad inicial
part.AssemblyLinearVelocity = Vector3.new(10, 0, 0)

-- Rotar el objeto
part.AssemblyAngularVelocity = Vector3.new(0, 5, 0)

-- Detectar cuando toca el suelo
local debounce = false
part.Touched:Connect(function(hit)
    if not debounce then
        debounce = true
        print("¡Impacto!")
        wait(1)
        debounce = false
    end
end)`,
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
        title: "Roblox Studio Tour",
        url: "https://www.youtube.com/watch?v=SqIhVjPPYuY",
        type: "video",
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
      "Aprende a usar las APIs principales de Roblox para crear experiencias complejas y atractivas. Incluye gestión de datos, economía de juego, y más.",
    learningObjectives: [
      "Usar DataStoreService para persistencia",
      "Implementar sistemas de moneda",
      "Usar Humanoid para control de personajes",
      "Trabajar con RemoteEvents para comunicación",
      "Implementar sistemas de inventario",
    ],
    lessons: [
      {
        id: "l4-datastores",
        title: "DataStore: Guardar Datos de Jugadores",
        description: "Cómo guardar y cargar datos persistentes",
        content:
          "DataStore es el sistema de Roblox para guardar datos de jugadores. Permite persistencia entre sesiones.",
        keyPoints: [
          "DataStore guarda datos en servidores de Roblox",
          "Usa UpdateAsync para cambios seguros",
          "Implementa reintentos para manejo de errores",
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
          "Implementa una economía funcional en tu juego con moneda, tienda, y compras.",
        keyPoints: [
          "Mantén la moneda en DataStore",
          "Valida transacciones en el servidor",
          "Usa RemoteEvents para solicitudes de compra",
          "Implementa protecciones contra fraude",
        ],
        codeExample: {
          title: "Sistema de tienda",
          code: `local items = {
    sword = {price = 100, damage = 25},
    shield = {price = 150, defense = 10}
}

local function buyItem(player, itemName)
    if not items[itemName] then
        return false, "Item no existe"
    end
    
    local cost = items[itemName].price
    -- Validar que el jugador tiene suficiente moneda
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
          "RemoteEvents permite que LocalScripts se comuniquen con ServerScripts de manera segura.",
        keyPoints: [
          "FireServer() envía datos del cliente al servidor",
          "OnServerEvent escucha en el servidor",
          "Nunca confíes en datos del cliente",
          "Valida siempre en el servidor",
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
          "Humanoid es el componente que controla la vida, salud, y movimiento de un personaje.",
        keyPoints: [
          "Humanoid.Health controla la vida del personaje",
          "Humanoid:TakeDamage() causa daño",
          "Humanoid.Died se activa cuando muere",
          "RootPart es el centro del personaje",
        ],
        codeExample: {
          title: "Controlar salud del personaje",
          code: `local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")
        
        humanoid.Died:Connect(function()
            print(player.Name .. " murió!")
            wait(5)
            player:LoadCharacter()
        end)
        
        -- Daño cada 5 segundos
        while humanoid.Health > 0 do
            wait(5)
            humanoid:TakeDamage(10)
        end
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
};

export default ROBLOX_MODULES;
