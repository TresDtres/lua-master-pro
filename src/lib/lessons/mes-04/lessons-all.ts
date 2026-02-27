/**
 * Módulo 4: Inventario y Stats - Todas las lecciones
 */

import { Lesson } from "@/types/lesson";

// ============================================
// LECCIÓN 4.1: DataTables
// ============================================

export const lesson01: Lesson = {
  id: "mes-04-l01",
  moduleId: "mes-04",
  lessonNumber: 1,
  title: "DataTables",
  description: "Estructura, carga desde Lua y uso para datos de juego.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "DataTables",
    objectives: [
      "Entender qué son los DataTables en UE5",
      "Crear y configurar DataTables",
      "Cargar datos desde scripts Lua",
      "Usar DataTables para items, enemigos y más",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "¿Qué son los DataTables?",
        content: `Los **DataTables** son tablas de datos que se pueden cargar en runtime.

**Usos comunes:**
- Base de datos de items
- Stats de enemigos
- Configuración de niveles
- Diálogos y quests

**Estructura en UE5:**
1. Crear Struct (ej: FItemData)
2. Crear DataTable con ese Struct
3. Llenar filas con datos
4. Cargar desde Lua

**En UnLua:**
\`\`\`lua
function MiActor:BeginPlay()
    -- Cargar DataTable
    self.itemTable = self:LoadDataTable("/Game/Data/Items")
    
    -- Obtener item por ID
    local espada = self.itemTable["Sword001"]
    print("Nombre: " .. espada.Name)
    print("Daño: " .. espada.Damage)
end
\`\`\``,
        codeExamples: [
          {
            title: "Cargar y usar DataTable",
            code: `local ItemDatabase = {}

function ItemDatabase:BeginPlay()
    -- Cargar tabla de items
    self.items = self:LoadDataTable("/Game/Data/Items")
    
    -- Obtener datos de item
    local item = self.items["Potion001"]
    if item then
        print("Item: " .. item.Name)
        print("Precio: " .. item.Price)
    end
end

function ItemDatabase:GetItem(itemId)
    return self.items[itemId]
end

return ItemDatabase`,
            language: "lua",
            description: "Cargar DataTable y obtener items por ID.",
          },
        ],
      },
      {
        heading: "Estructura de DataTable",
        content: `**Crear Struct en UE5:**
1. Right-click → Blueprint → Structure
2. Agregar variables:
   - Name (String)
   - Damage (Float)
   - Price (Int)
   - Icon (Texture2D)

**Crear DataTable:**
1. Right-click → Miscellaneous → Data Table
2. Seleccionar el Struct
3. Llenar filas:
   - Row Name: "Sword001"
   - Name: "Espada de Hierro"
   - Damage: 25.0
   - Price: 100

**Exportar desde CSV:**
\`\`\`csv
Row Name,Name,Damage,Price,Icon
Sword001,Espada de Hierro,25.0,100,/Game/Textures/Sword
Sword002,Espada de Acero,40.0,250,/Game/Textures/Sword2
Potion001,Poción de Vida,0,50,/Game/Textures/Potion
\`\`\``,
        codeExamples: [
          {
            title: "DataTable de enemigos",
            code: `-- EnemyTable.csv
-- Row Name,Name,Health,Damage,Exp
-- Goblin,50,10,25
-- Orc,100,20,50
-- Dragon,500,50,500

local EnemySystem = {}

function EnemySystem:BeginPlay()
    self.enemies = self:LoadDataTable("/Game/Data/Enemies")
end

function EnemySystem:SpawnEnemy(enemyId, location)
    local data = self.enemies[enemyId]
    if not data then return end
    
    -- Spawn con stats del DataTable
    local enemy = self:SpawnActor(data.Class, location)
    enemy.Health = data.Health
    enemy.Damage = data.Damage
    enemy.ExpReward = data.Exp
    
    return enemy
end

return EnemySystem`,
            language: "lua",
            description: "DataTable de enemigos con spawn dinámico.",
          },
        ],
      },
    ],
    summary: `DataTables son tablas de datos cargables en runtime. Crear Struct, llenar DataTable, cargar con LoadDataTable. Usar para items, enemigos, configuración. Exportable desde CSV.`,
  },
  examples: [],
  interactive: {
    title: "Simula DataTable",
    description: "Crea una tabla de datos simple",
    starterCode: `-- Simula DataTable de items
local ItemTable = {
    ["Sword001"] = {
        Name = "Espada de Hierro",
        Damage = 25,
        Price = 100
    },
    ["Potion001"] = {
        Name = "Poción de Vida",
        Heal = 50,
        Price = 50
    }
}

-- Función para obtener item
function GetItem(itemId)
    return ItemTable[itemId]
end

-- Probar
local espada = GetItem("Sword001")
print("Item: " .. espada.Name)
print("Daño: " .. espada.Damage)
print("Precio: " .. espada.Price)`,
    environment: "lua",
    expectedOutput: "Espada de Hierro",
  },
  miniExercise: {
    id: "mes-04-l01-ej1",
    lessonId: "mes-04-l01",
    title: "DataTable de Items RPG",
    instructions: `Crea un DataTable simple para items:

1. Crea tabla \`ItemsDB\` con 3 items:
   - "Sword": Nombre="Espada", Daño=30, Precio=150
   - "Shield": Nombre="Escudo", Defensa=20, Precio=100
   - "Potion": Nombre="Poción", Cura=50, Precio=50
2. Crea función \`GetItem(id)\` que retorne el item
3. Imprime los datos de cada item

**Salida esperada:**
\`\`\`
Espada - Daño: 30, Precio: 150
Escudo - Defensa: 20, Precio: 100
Poción - Cura: 50, Precio: 50
\`\`\``,
    starterCode: `local ItemsDB = {
    -- Agregar items aquí
}

function GetItem(id)
    return ItemsDB[id]
end

-- Probar
for id, item in pairs(ItemsDB) do
    -- Imprimir datos
end`,
    solution: `local ItemsDB = {
    ["Sword"] = {Nombre = "Espada", Daño = 30, Precio = 150},
    ["Shield"] = {Nombre = "Escudo", Defensa = 20, Precio = 100},
    ["Potion"] = {Nombre = "Poción", Cura = 50, Precio = 50}
}

function GetItem(id)
    return ItemsDB[id]
end

for id, item in pairs(ItemsDB) do
    if item.Daño then
        print(item.Nombre .. " - Daño: " .. item.Daño .. ", Precio: " .. item.Precio)
    elseif item.Defensa then
        print(item.Nombre .. " - Defensa: " .. item.Defensa .. ", Precio: " .. item.Precio)
    else
        print(item.Nombre .. " - Cura: " .. item.Cura .. ", Precio: " .. item.Precio)
    end
end`,
    tests: [
      { type: "output_contains", expected: "Espada", message: "Debe mostrar Espada" },
      { type: "output_contains", expected: "Escudo", message: "Debe mostrar Escudo" },
      { type: "output_contains", expected: "Poción", message: "Debe mostrar Poción" },
    ],
    hints: ["Usa corchetes para las keys", "Cada item es una tabla con sus stats"],
    xpReward: 40,
    difficulty: "intermediate",
  },
  summary: "DataTables para datos estructurados. Struct define columnas, DataTable tiene filas. Cargar con LoadDataTable. Exportar/importar desde CSV.",
  resources: [
    { title: "DataTables in UE5", url: "https://docs.unrealengine.com/5.0/en-US/data-tables-in-unreal-engine/", type: "documentation" },
  ],
  prerequisites: ["mes-03-l06"],
};

// ============================================
// LECCIÓN 4.2: Sistema de Inventario
// ============================================

export const lesson02: Lesson = {
  id: "mes-04-l02",
  moduleId: "mes-04",
  lessonNumber: 2,
  title: "Sistema de Inventario",
  description: "Slots, items, stack y gestión de inventario.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Sistema de Inventario",
    objectives: [
      "Crear estructura de inventario con slots",
      "Implementar sistema de stack",
      "Agregar y remover items",
      "Verificar requisitos de espacio",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Estructura de Inventario",
        content: `Un inventario típico tiene **slots** que contienen **items**.

**Estructura básica:**
\`\`\`lua
local Inventario = {
    slots = {},  -- Array de slots
    capacidadMaxima = 20
}

-- Cada slot:
{
    itemId = "Sword001",
    cantidad = 1,
    maxStack = 99
}
\`\`\`

**Funciones principales:**
- \`AgregarItem(itemId, cantidad)\`
- \`RemoverItem(itemId, cantidad)\`
- \`TieneItem(itemId, cantidad)\`
- \`ObtenerSlots()\``,
        codeExamples: [
          {
            title: "Clase Inventario",
            code: `local Inventario = {}
Inventario.__index = Inventario

function Inventario.new(capacidad)
    local self = setmetatable({}, Inventario)
    self.capacidad = capacidad or 20
    self.slots = {}
    return self
end

function Inventario:AgregarItem(itemId, cantidad)
    -- Buscar slot existente
    for _, slot in ipairs(self.slots) do
        if slot.itemId == itemId then
            local espacioLibre = slot.maxStack - slot.cantidad
            local agregar = math.min(cantidad, espacioLibre)
            slot.cantidad = slot.cantidad + agregar
            cantidad = cantidad - agregar
            if cantidad <= 0 then return true end
        end
    end
    
    -- Crear nuevo slot
    if #self.slots < self.capacidad then
        table.insert(self.slots, {
            itemId = itemId,
            cantidad = cantidad,
            maxStack = 99
        })
        return true
    end
    
    return false  -- Inventario lleno
end

return Inventario`,
            language: "lua",
            description: "Clase Inventario con agregar y stack.",
          },
        ],
      },
      {
        heading: "Gestión de Slots",
        content: `**Operaciones comunes:**

**Verificar espacio:**
\`\`\`lua
function Inventario:TieneEspacio()
    return #self.slots < self.capacidad
end
\`\`\`

**Contar item:**
\`\`\`lua
function Inventario:ContarItem(itemId)
    local total = 0
    for _, slot in ipairs(self.slots) do
        if slot.itemId == itemId then
            total = total + slot.cantidad
        end
    end
    return total
end
\`\`\`

**Remover cantidad:**
\`\`\`lua
function Inventario:RemoverItem(itemId, cantidad)
    for i = #self.slots, 1, -1 do
        local slot = self.slots[i]
        if slot.itemId == itemId then
            local remover = math.min(cantidad, slot.cantidad)
            slot.cantidad = slot.cantidad - remover
            cantidad = cantidad - remover
            
            if slot.cantidad <= 0 then
                table.remove(self.slots, i)
            end
            
            if cantidad <= 0 then return true end
        end
    end
    return false
end
\`\`\``,
        codeExamples: [
          {
            title: "Gestión completa",
            code: `local Inv = Inventario.new(10)

-- Agregar items
Inv:AgregarItem("Potion", 5)
Inv:AgregarItem("Potion", 10)  -- Stack
Inv:AgregarItem("Sword", 1)

-- Contar
print("Pociones: " .. Inv:ContarItem("Potion"))  -- 15

-- Remover
Inv:RemoverItem("Potion", 3)
print("Pociones restantes: " .. Inv:ContarItem("Potion"))  -- 12

-- Verificar
print("Tiene espada: " .. tostring(Inv:TieneItem("Sword")))`,
            language: "lua",
            description: "Uso completo del sistema de inventario.",
          },
        ],
      },
    ],
    summary: `Inventario con slots y stack. AgregarItem busca slot existente o crea nuevo. RemoverItem decrementa y elimina slots vacíos. ContarItem suma todas las cantidades.`,
  },
  examples: [],
  interactive: {
    title: "Simula Inventario",
    description: "Crea y gestiona un inventario simple",
    starterCode: `local Inventario = {
    slots = {},
    capacidad = 5
}

function Inventario:AgregarItem(nombre, cantidad)
    table.insert(self.slots, {
        nombre = nombre,
        cantidad = cantidad
    })
    print("Agregado: " .. nombre .. " x" .. cantidad)
end

function Inventario:Mostrar()
    print("=== Inventario ===")
    for i, slot in ipairs(self.slots) do
        print(i .. ". " .. slot.nombre .. " x" .. slot.cantidad)
    end
end

-- Probar
Inventario:AgregarItem("Espada", 1)
Inventario:AgregarItem("Poción", 5)
Inventario:AgregarItem("Escudo", 1)
Inventario:Mostrar()`,
    environment: "lua",
    expectedOutput: "Agregado: Espada",
  },
  miniExercise: {
    id: "mes-04-l02-ej1",
    lessonId: "mes-04-l02",
    title: "Inventario con Stack",
    instructions: `Crea un inventario que maneje stack:

1. Crea inventario con capacidad 10
2. Agrega 3 Pociones (cantidad 3)
3. Agrega 5 Pociones más (debe hacer stack, no nuevo slot)
4. Agrega 1 Espada
5. Muestra el inventario

**Salida esperada:**
\`\`\`
Slot 1: Poción x8
Slot 2: Espada x1
\`\`\``,
    starterCode: `local Inventario = {
    slots = {},
    capacidad = 10
}

function Inventario:AgregarItem(itemId, cantidad)
    -- Buscar slot existente para stack
    -- Si no existe, crear nuevo
end

function Inventario:Mostrar()
    for i, slot in ipairs(self.slots) do
        print("Slot " .. i .. ": " .. slot.itemId .. " x" .. slot.cantidad)
    end
end

-- Probar
Inventario:AgregarItem("Poción", 3)
Inventario:AgregarItem("Poción", 5)
Inventario:AgregarItem("Espada", 1)
Inventario:Mostrar()`,
    solution: `local Inventario = {
    slots = {},
    capacidad = 10
}

function Inventario:AgregarItem(itemId, cantidad)
    for _, slot in ipairs(self.slots) do
        if slot.itemId == itemId then
            slot.cantidad = slot.cantidad + cantidad
            return
        end
    end
    table.insert(self.slots, {itemId = itemId, cantidad = cantidad})
end

function Inventario:Mostrar()
    for i, slot in ipairs(self.slots) do
        print("Slot " .. i .. ": " .. slot.itemId .. " x" .. slot.cantidad)
    end
end

Inventario:AgregarItem("Poción", 3)
Inventario:AgregarItem("Poción", 5)
Inventario:AgregarItem("Espada", 1)
Inventario:Mostrar()`,
    tests: [
      { type: "output_contains", expected: "Slot 1: Poción x8", message: "Pociones deben hacer stack" },
      { type: "output_contains", expected: "Slot 2: Espada x1", message: "Espada en slot separado" },
    ],
    hints: ["Busca slot con mismo itemId antes de crear nuevo", "Suma la cantidad si el slot existe"],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: "Inventario con slots. AgregarItem hace stack si el item ya existe. Capacidad máxima limita slots. ContarItem suma cantidades.",
  resources: [],
  prerequisites: ["mes-04-l01"],
};

// ============================================
// LECCIÓN 4.3: Item Database
// ============================================

export const lesson03: Lesson = {
  id: "mes-04-l03",
  moduleId: "mes-04",
  lessonNumber: 3,
  title: "Item Database",
  description: "JSON, CSV y sistemas data-driven para items.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Item Database",
    objectives: [
      "Cargar datos desde JSON",
      "Importar/exportar CSV",
      "Crear sistema data-driven",
      "Modificar items sin recompilar",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Base de Datos JSON",
        content: `JSON es ideal para **datos complejos** de items.

**Estructura JSON:**
\`\`\`json
{
    "items": [
        {
            "id": "sword_001",
            "name": "Espada de Hierro",
            "type": "weapon",
            "rarity": "common",
            "stats": {
                "damage": 25,
                "durability": 100
            },
            "requirements": {
                "level": 5,
                "strength": 10
            }
        }
    ]
}
\`\`\`

**Cargar en Lua:**
\`\`\`lua
local dkjson = require("dkjson")

function ItemDatabase:Load()
    local json = self:LoadFile("/Game/Data/items.json")
    local data = dkjson.decode(json)
    
    -- Indexar por ID
    self.items = {}
    for _, item in ipairs(data.items) do
        self.items[item.id] = item
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Cargar JSON en UE5",
            code: `local ItemDB = {}

function ItemDB:BeginPlay()
    self.items = {}
    self:LoadFromJSON()
end

function ItemDB:LoadFromJSON()
    -- En UE5 real, usar LoadFile
    local json = [[
    {
        "items": [
            {"id": "potion", "name": "Poción", "heal": 50},
            {"id": "sword", "name": "Espada", "damage": 25}
        ]
    }
    ]]
    
    -- Parsear (simulado)
    self.items["potion"] = {name = "Poción", heal = 50}
    self.items["sword"] = {name = "Espada", damage = 25}
    
    print("Items cargados: " .. #self.items)
end

function ItemDB:GetItem(id)
    return self.items[id]
end

return ItemDB`,
            language: "lua",
            description: "Cargar items desde JSON.",
          },
        ],
      },
      {
        heading: "Sistema Data-Driven",
        content: `**Ventajas de data-driven:**
- Cambiar balance sin recompilar
- Agregar items nuevos fácilmente
- Modificar en producción
- Separar diseño de código

**Ejemplo completo:**
\`\`\`lua
-- Items definidos 100% por datos
local ItemDefs = {
    ["fire_sword"] = {
        name = "Espada de Fuego",
        type = "weapon",
        damage = 50,
        effects = {
            {type = "burn", damage = 5, duration = 3}
        }
    },
    ["ice_shield"] = {
        name = "Escudo de Hielo",
        type = "armor",
        defense = 30,
        effects = {
            {type = "chill", slow = 0.3, duration = 2}
        }
    }
}

-- Código genérico que usa los datos
function ApplyItemEffect(item, target)
    for _, effect in ipairs(item.effects) do
        if effect.type == "burn" then
            target:ApplyDot(effect.damage, effect.duration)
        elseif effect.type == "chill" then
            target:ApplySlow(effect.slow, effect.duration)
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Database completa",
            code: `local ItemDatabase = {}

function ItemDatabase:Load()
    self.items = {
        -- Weapons
        ["sword_iron"] = {
            name = "Espada de Hierro",
            type = "weapon",
            damage = 25,
            price = 100,
            rarity = "common"
        },
        ["sword_steel"] = {
            name = "Espada de Acero",
            type = "weapon",
            damage = 40,
            price = 250,
            rarity = "uncommon"
        },
        -- Armor
        ["shield_wood"] = {
            name = "Escudo de Madera",
            type = "armor",
            defense = 15,
            price = 75,
            rarity = "common"
        }
    }
end

function ItemDatabase:Get(id)
    return self.items[id]
end

function ItemDatabase:GetByType(itemType)
    local results = {}
    for id, item in pairs(self.items) do
        if item.type == itemType then
            table.insert(results, item)
        end
    end
    return results
end

return ItemDatabase`,
            language: "lua",
            description: "Database completa con búsqueda por tipo.",
          },
        ],
      },
    ],
    summary: `JSON para datos complejos de items. Data-driven permite cambiar balance sin recompilar. Estructura jerárquica con stats, efectos, requisitos.`,
  },
  examples: [],
  interactive: {
    title: "Crea Item Database",
    description: "Define items con JSON",
    starterCode: `-- Simula carga de JSON
local json = [[
{
    "items": [
        {"id": "1", "name": "Espada", "damage": 25, "price": 100},
        {"id": "2", "name": "Escudo", "defense": 15, "price": 75},
        {"id": "3", "name": "Poción", "heal": 50, "price": 50}
    ]
}
]]

-- Parsear (simulado)
local ItemDB = {
    ["1"] = {name = "Espada", damage = 25, price = 100},
    ["2"] = {name = "Escudo", defense = 15, price = 75},
    ["3"] = {name = "Poción", heal = 50, price = 50}
}

-- Función de búsqueda
function GetItem(id)
    return ItemDB[id]
end

-- Probar
local item = GetItem("1")
print("Item: " .. item.name)
print("Daño: " .. item.damage)
print("Precio: " .. item.price)`,
    environment: "lua",
    expectedOutput: "Espada",
  },
  miniExercise: {
    id: "mes-04-l03-ej1",
    lessonId: "mes-04-l03",
    title: "Base de Datos de Items RPG",
    instructions: `Crea una database de items para RPG:

1. Crea tabla \`ItemsDB\` con 6 items:
   - 2 armas (con damage)
   - 2 armaduras (con defense)
   - 2 pociones (con heal)
2. Cada item debe tener: id, name, type, price
3. Crea función \`GetItemsByType(type)\` que retorne items del tipo
4. Imprime todas las armas

**Salida esperada:**
\`\`\`
=== Armas ===
- Espada de Hierro (Daño: 25)
- Hacha de Batalla (Daño: 40)
\`\`\``,
    starterCode: `local ItemsDB = {
    -- Agregar 6 items
}

function GetItemsByType(itemType)
    local results = {}
    for _, item in pairs(ItemsDB) do
        if item.type == itemType then
            table.insert(results, item)
        end
    end
    return results
end

-- Probar
print("=== Armas ===")
local armas = GetItemsByType("weapon")
for _, arma in ipairs(armas) do
    print("- " .. arma.name .. " (Daño: " .. arma.damage .. ")")
end`,
    solution: `local ItemsDB = {
    ["sword"] = {id = "sword", name = "Espada de Hierro", type = "weapon", damage = 25, price = 100},
    ["axe"] = {id = "axe", name = "Hacha de Batalla", type = "weapon", damage = 40, price = 200},
    ["shield"] = {id = "shield", name = "Escudo", type = "armor", defense = 15, price = 75},
    ["helm"] = {id = "helm", name = "Yelmo", type = "armor", defense = 10, price = 50},
    ["potion"] = {id = "potion", name = "Poción", type = "consumable", heal = 50, price = 50},
    ["elixir"] = {id = "elixir", name = "Elixir", type = "consumable", heal = 100, price = 100}
}

function GetItemsByType(itemType)
    local results = {}
    for _, item in pairs(ItemsDB) do
        if item.type == itemType then
            table.insert(results, item)
        end
    end
    return results
end

print("=== Armas ===")
local armas = GetItemsByType("weapon")
for _, arma in ipairs(armas) do
    print("- " .. arma.name .. " (Daño: " .. arma.damage .. ")")
end`,
    tests: [
      { type: "output_contains", expected: "Espada de Hierro", message: "Debe mostrar espada" },
      { type: "output_contains", expected: "Hacha de Batalla", message: "Debe mostrar hacha" },
    ],
    hints: ["Cada item es una tabla con type", "GetItemsByType filtra por item.type"],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: "JSON para items complejos. Data-driven permite cambios sin recompilar. Estructura con stats, efectos, requisitos. Búsqueda por tipo/rareza.",
  resources: [],
  prerequisites: ["mes-04-l02"],
};

// ============================================
// LECCIÓN 4.4: Stats de Personaje
// ============================================

export const lesson04: Lesson = {
  id: "mes-04-l04",
  moduleId: "mes-04",
  lessonNumber: 4,
  title: "Stats de Personaje",
  description: "HP, Mana, atributos y fórmulas de progresión.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Stats de Personaje",
    objectives: [
      "Implementar sistema de stats básico",
      "Crear fórmulas de progresión por nivel",
      "Calcular stats derivados",
      "Manejar HP y Mana con regeneración",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Stats Básicos",
        content: `Los **stats fundamentales** de un personaje:

**Atributos primarios:**
- **Fuerza** - Aumenta daño físico
- **Agilidad** - Aumenta crítico, esquive
- **Inteligencia** - Aumenta mana, daño mágico
- **Vitalidad** - Aumenta HP

**Stats derivados:**
\`\`\`lua
HP = 100 + (Vitalidad * 10) + (Nivel * 5)
Mana = 50 + (Inteligencia * 8) + (Nivel * 3)
Daño = 10 + (Fuerza * 2)
Crítico = Agilidad * 0.5  -- %
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de Stats",
            code: `local Character = {}
Character.__index = Character

function Character.new()
    local self = setmetatable({}, Character)
    
    -- Atributos base
    self.fuerza = 10
    self.agilidad = 10
    self.inteligencia = 10
    self.vitalidad = 10
    self.nivel = 1
    
    -- Calcular stats derivados
    self:RecalcularStats()
    
    return self
end

function Character:RecalcularStats()
    self.hpMax = 100 + (self.vitalidad * 10) + (self.nivel * 5)
    self.manaMax = 50 + (self.inteligencia * 8) + (self.nivel * 3)
    self.daño = 10 + (self.fuerza * 2)
    self.critico = self.agilidad * 0.5
    
    self.hp = self.hpMax
    self.mana = self.manaMax
end

return Character`,
            language: "lua",
            description: "Sistema de stats con atributos y derivados.",
          },
        ],
      },
      {
        heading: "Progresión por Nivel",
        content: `**Fórmulas de progresión:**

**Lineal:**
\`\`\`lua
stat = base + (nivel * incremento)
\`\`\`

**Exponencial:**
\`\`\`lua
stat = base * (1.1 ^ nivel)  -- 10% por nivel
\`\`\`

**Con puntos:**
\`\`\`lua
function Character:SubirNivel()
    self.nivel = self.nivel + 1
    self.puntosDisponibles = self.puntosDisponibles + 5
    self:RecalcularStats()
end

function Character:AsignarPunto(atributo)
    if self.puntosDisponibles > 0 then
        self[atributo] = self[atributo] + 1
        self.puntosDisponibles = self.puntosDisponibles - 1
        self:RecalcularStats()
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Subir de nivel",
            code: `local Player = Character.new()

print("Nivel 1:")
print("HP: " .. Player.hpMax)
print("Daño: " .. Player.daño)

-- Subir 5 niveles
for i = 1, 5 do
    Player:SubirNivel()
end

print("\\nNivel 6:")
print("HP: " .. Player.hpMax)
print("Daño: " .. Player.daño)

-- Asignar puntos
Player:AsignarPunto("fuerza")
Player:AsignarPunto("fuerza")
Player:RecalcularStats()

print("\\nDespués de asignar fuerza:")
print("Daño: " .. Player.daño)`,
            language: "lua",
            description: "Progresión de stats por nivel.",
          },
        ],
      },
      {
        heading: "HP y Mana con Regeneración",
        content: `**Regeneración por segundo:**
\`\`\`lua
function Character:Tick(deltaTime)
    -- Regenerar HP
    if self.hp < self.hpMax then
        self.hp = math.min(self.hpMax, self.hp + self.regenHP * deltaTime)
    end
    
    -- Regenerar Mana
    if self.mana < self.manaMax then
        self.mana = math.min(self.manaMax, self.mana + self.regenMana * deltaTime)
    end
end
\`\`\`

**Fórmulas de regeneración:**
\`\`\`lua
regenHP = vitalidad * 0.5  -- HP por segundo
regenMana = inteligencia * 0.8  -- Mana por segundo
\`\`\``,
        codeExamples: [
          {
            title: "Regeneración",
            code: `local Character = {}

function Character:BeginPlay()
    self.hp = 50
    self.hpMax = 100
    self.regenHP = 5  -- por segundo
end

function Character:Tick(deltaTime)
    if self.hp < self.hpMax then
        self.hp = math.min(self.hpMax, self.hp + self.regenHP * deltaTime)
        print("HP: " .. math.floor(self.hp))
    end
end

function Character:RecibirDaño(cantidad)
    self.hp = self.hp - cantidad
    print("¡Daño! HP: " .. self.hp)
end

-- Simular
Character:BeginPlay()
Character:RecibirDaño(30)  -- HP: 20

-- Regenerar por 5 segundos
for i = 1, 5 do
    Character:Tick(1)
end`,
            language: "lua",
            description: "Regeneración de HP con Tick.",
          },
        ],
      },
    ],
    summary: `Stats base: Fuerza, Agilidad, Int, Vitalidad. Derivados: HP, Mana, Daño, Crítico. Fórmulas lineales o exponenciales. Regeneración por segundo con Tick.`,
  },
  examples: [],
  interactive: {
    title: "Calcula Stats",
    description: "Implementa fórmulas de stats",
    starterCode: `local Personaje = {
    nivel = 1,
    vitalidad = 10,
    inteligencia = 10,
    fuerza = 10
}

function Personaje:CalcularHP()
    return 100 + (self.vitalidad * 10) + (self.nivel * 5)
end

function Personaje:CalcularMana()
    return 50 + (self.inteligencia * 8) + (self.nivel * 3)
end

function Personaje:CalcularDaño()
    return 10 + (self.fuerza * 2)
end

-- Probar
print("HP: " .. Personaje:CalcularHP())
print("Mana: " .. Personaje:CalcularMana())
print("Daño: " .. Personaje:CalcularDaño())

-- Subir stats
Personaje.nivel = 5
Personaje.vitalidad = 20
Personaje.fuerza = 15

print("\\nDespués de subir:")
print("HP: " .. Personaje:CalcularHP())
print("Daño: " .. Personaje:CalcularDaño())`,
    environment: "lua",
    expectedOutput: "HP: 155",
  },
  miniExercise: {
    id: "mes-04-l04-ej1",
    lessonId: "mes-04-l04",
    title: "Sistema de Progresión",
    instructions: `Crea un sistema de progresión de personaje:

1. Personaje inicia en nivel 1 con: fuerza=10, vitalidad=10
2. Fórmula HP: \`100 + (vitalidad * 10) + (nivel * 5)\`
3. Fórmula daño: \`10 + (fuerza * 2)\`
4. Función \`SubirNivel()\` que:
   - Incrementa nivel
   - Aumenta fuerza y vitalidad en 2
   - Recalcula stats
5. Sube 3 niveles e imprime stats

**Salida esperada:**
\`\`\`
Nivel 1 - HP: 155, Daño: 30
Nivel 2 - HP: 180, Daño: 34
Nivel 3 - HP: 205, Daño: 38
Nivel 4 - HP: 230, Daño: 42
\`\`\``,
    starterCode: `local Personaje = {
    nivel = 1,
    fuerza = 10,
    vitalidad = 10
}

function Personaje:CalcularHP()
    -- Implementar
end

function Personaje:CalcularDaño()
    -- Implementar
end

function Personaje:SubirNivel()
    -- Implementar
end

-- Probar
Personaje:MostrarStats()
for i = 1, 3 do
    Personaje:SubirNivel()
    Personaje:MostrarStats()
end`,
    solution: `local Personaje = {
    nivel = 1,
    fuerza = 10,
    vitalidad = 10
}

function Personaje:CalcularHP()
    return 100 + (self.vitalidad * 10) + (self.nivel * 5)
end

function Personaje:CalcularDaño()
    return 10 + (self.fuerza * 2)
end

function Personaje:SubirNivel()
    self.nivel = self.nivel + 1
    self.fuerza = self.fuerza + 2
    self.vitalidad = self.vitalidad + 2
end

function Personaje:MostrarStats()
    print("Nivel " .. self.nivel .. " - HP: " .. self:CalcularHP() .. ", Daño: " .. self:CalcularDaño())
end

Personaje:MostrarStats()
for i = 1, 3 do
    Personaje:SubirNivel()
    Personaje:MostrarStats()
end`,
    tests: [
      { type: "output_contains", expected: "Nivel 1 - HP: 155", message: "Nivel 1 correcto" },
      { type: "output_contains", expected: "Nivel 4 - HP: 230", message: "Nivel 4 correcto" },
    ],
    hints: ["HP = 100 + vitalidad*10 + nivel*5", "SubirNivel incrementa nivel, fuerza y vitalidad"],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: "Stats: Fuerza, Agilidad, Int, Vitalidad. HP = 100 + Vit*10 + Nivel*5. Daño = 10 + Fuer*2. Regeneración con Tick.",
  resources: [],
  prerequisites: ["mes-04-l03"],
};

// ============================================
// LECCIÓN 4.5: Buffs/Debuffs
// ============================================

export const lesson05: Lesson = {
  id: "mes-04-l05",
  moduleId: "mes-04",
  lessonNumber: 5,
  title: "Buffs/Debuffs",
  description: "Modificadores temporales, duración y efectos.",
  estimatedTime: 30,
  difficulty: "advanced",
  theory: {
    title: "Buffs/Debuffs",
    objectives: [
      "Implementar sistema de buffs y debuffs",
      "Manejar duración y expiración",
      "Aplicar modificadores a stats",
      "Stackear efectos múltiples",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Sistema de Buffs",
        content: `Los **buffs** son efectos temporales que modifican stats.

**Estructura:**
\`\`\`lua
local Buff = {
    id = "strength_boost",
    nombre = "Fortalecimiento",
    tipo = "buff",  -- o "debuff"
    duracion = 10,  -- segundos
    tiempoRestante = 10,
    modificadores = {
        fuerza = 20  -- +20 fuerza
    }
}
\`\`\`

**Aplicar buff:**
\`\`\`lua
function Character:AplicarBuff(buff)
    -- Verificar si ya existe
    for _, b in ipairs(self.buffs) do
        if b.id == buff.id then
            b.tiempoRestante = buff.duracion  -- Refresh
            return
        end
    end
    
    -- Agregar nuevo
    table.insert(self.buffs, buff)
end
\`\`\``,
        codeExamples: [
          {
            title: "Clase BuffManager",
            code: `local BuffManager = {}
BuffManager.__index = BuffManager

function BuffManager.new(character)
    local self = setmetatable({}, BuffManager)
    self.character = character
    self.buffs = {}
    return self
end

function BuffManager:AplicarBuff(id, nombre, duracion, modificadores)
    -- Refresh si existe
    for _, buff in ipairs(self.buffs) do
        if buff.id == id then
            buff.tiempoRestante = duracion
            return
        end
    end
    
    -- Nuevo buff
    table.insert(self.buffs, {
        id = id,
        nombre = nombre,
        duracion = duracion,
        tiempoRestante = duracion,
        modificadores = modificadores
    })
    
    self.character:RecalcularStats()
end

function BuffManager:Tick(deltaTime)
    for i = #self.buffs, 1, -1 do
        local buff = self.buffs[i]
        buff.tiempoRestante = buff.tiempoRestante - deltaTime
        
        if buff.tiempoRestante <= 0 then
            table.remove(self.buffs, i)
            print("Buff expirado: " .. buff.nombre)
        end
    end
    
    self.character:RecalcularStats()
end

return BuffManager`,
            language: "lua",
            description: "Gestor de buffs con duración y expiración.",
          },
        ],
      },
      {
        heading: "Modificadores de Stats",
        content: `**Tipos de modificadores:**

**Flat (suma directa):**
\`\`\`lua
modificadores = {
    fuerza = 20,  -- +20 fuerza
    daño = 15     -- +15 daño
}
\`\`\`

**Percentual (multiplica):**
\`\`\`lua
modificadores = {
    dañoPorcentual = 0.3,  -- +30% daño
    velocidad = -0.2       -- -20% velocidad (slow)
}
\`\`\`

**Aplicar modificadores:**
\`\`\`lua
function Character:RecalcularStats()
    -- Stats base
    local fuerzaBase = self.fuerza
    
    -- Sumar buffs flat
    for _, buff in ipairs(self.buffs) do
        if buff.modificadores.fuerza then
            fuerzaBase = fuerzaBase + buff.modificadores.fuerza
        end
    end
    
    -- Aplicar percentuales
    for _, buff in ipairs(self.buffs) do
        if buff.modificadores.dañoPorcentual then
            self.daño = self.daño * (1 + buff.modificadores.dañoPorcentual)
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Calcular con buffs",
            code: `local Character = {}

function Character:RecalcularStats()
    -- Base
    self.fuerzaTotal = self.fuerzaBase
    self.dañoTotal = self.dañoBase
    
    -- Aplicar buffs
    for _, buff in ipairs(self.buffs) do
        if buff.modificadores.fuerza then
            self.fuerzaTotal = self.fuerzaTotal + buff.modificadores.fuerza
        end
        if buff.modificadores.dañoPorcentual then
            self.dañoTotal = self.dañoTotal * (1 + buff.modificadores.dañoPorcentual)
        end
    end
    
    print("Fuerza: " .. self.fuerzaTotal .. ", Daño: " .. self.dañoTotal)
end

-- Probar
Character.fuerzaBase = 50
Character.dañoBase = 100
Character.buffs = {
    {modificadores = {fuerza = 20}},
    {modificadores = {dañoPorcentual = 0.3}}
}

Character:RecalcularStats()
-- Fuerza: 70, Daño: 130`,
            language: "lua",
            description: "Calcular stats con modificadores de buffs.",
          },
        ],
      },
      {
        heading: "Debuffs y Efectos Negativos",
        content: `**Debuffs comunes:**
- **Slow** - Reduce velocidad
- **Weakness** - Reduce daño
- **Poison** - Daño por tiempo
- **Stun** - Incapacita

**Implementar Poison:**
\`\`\`lua
local PoisonDebuff = {
    id = "poison",
    nombre = "Veneno",
    tipo = "debuff",
    duracion = 5,
    dañoPorTick = 10,
    tickRate = 1  -- cada 1 segundo
}

function Character:AplicarVeneno()
    self.venenoAcumulado = (self.venenoAcumulado or 0) + 10
end

function Character:Tick(deltaTime)
    if self.venenoAcumulado and self.venenoAcumulado > 0 then
        self.tickVeneno = (self.tickVeneno or 0) + deltaTime
        
        if self.tickVeneno >= 1 then
            self.hp = self.hp - self.venenoAcumulado
            self.tickVeneno = 0
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de veneno",
            code: `local Character = {
    hp = 100,
    hpMax = 100
}

function Character:AplicarVeneno(damage, duracion)
    self.veneno = {
        damage = damage,
        tiempoRestante = duracion
    }
    print("Veneno aplicado: " .. damage .. " daño/seg")
end

function Character:Tick(deltaTime)
    if self.veneno then
        self.veneno.tiempoRestante = self.veneno.tiempoRestante - deltaTime
        self.hp = self.hp - (self.veneno.damage * deltaTime)
        
        print("HP: " .. math.floor(self.hp) .. " (Veneno)")
        
        if self.veneno.tiempoRestante <= 0 then
            self.veneno = nil
            print("Veneno expirado")
        end
    end
end

-- Probar
Character:AplicarVeneno(5, 10)
for i = 1, 10 do
    Character:Tick(1)
end`,
            language: "lua",
            description: "Debuff de veneno con daño por tiempo.",
          },
        ],
      },
    ],
    summary: `Buffs/debuffs con duración y expiración. Modificadores flat (+20 fuerza) o percentuales (+30% daño). Tick para expiración y DoT. Refresh al reaplicar.`,
  },
  examples: [],
  interactive: {
    title: "Simula Buff System",
    description: "Aplica y maneja buffs",
    starterCode: `local Character = {
    fuerza = 50,
    buffs = {}
}

function Character:AplicarBuff(nombre, bonus, duracion)
    table.insert(self.buffs, {
        nombre = nombre,
        bonus = bonus,
        tiempo = duracion
    })
    print("Buff aplicado: " .. nombre .. " (+" .. bonus .. " fuerza)")
end

function Character:CalcularFuerza()
    local total = self.fuerza
    for _, buff in ipairs(self.buffs) do
        total = total + buff.bonus
    end
    return total
end

-- Probar
Character:AplicarBuff("Fortalecimiento", 20, 10)
Character:AplicarBuff("Berserker", 30, 5)

print("Fuerza total: " .. Character:CalcularFuerza())
-- 50 + 20 + 30 = 100`,
    environment: "lua",
    expectedOutput: "Fuerza total: 100",
  },
  miniExercise: {
    id: "mes-04-l05-ej1",
    lessonId: "mes-04-l05",
    title: "Buff con Expiración",
    instructions: `Implementa un buff que expira:

1. Personaje tiene \`daño = 50\` y \`buffs = {}\`
2. Función \`AplicarBuff(nombre, bonus, duracion)\`
3. Función \`Tick(deltaTime)\` que:
   - Reduce tiempo de cada buff
   - Elimina buffs expirados
   - Imprime cuando expira
4. Función \`CalcularDaño()\` que suma buffs
5. Aplica buff de +25 daño por 5 segundos
6. Simula 6 ticks de 1 segundo

**Salida esperada:**
\`\`\`
Buff aplicado: Poder (+25 daño, 5s)
Daño: 75
Daño: 75
...
Buff expirado: Poder
Daño: 50
\`\`\``,
    starterCode: `local Character = {
    daño = 50,
    buffs = {}
}

function Character:AplicarBuff(nombre, bonus, duracion)
    -- Implementar
end

function Character:Tick(deltaTime)
    -- Reducir tiempo, eliminar expirados
end

function Character:CalcularDaño()
    -- Sumar buffs
end

-- Probar
Character:AplicarBuff("Poder", 25, 5)
for i = 1, 6 do
    print("Daño: " .. Character:CalcularDaño())
    Character:Tick(1)
end`,
    solution: `local Character = {
    daño = 50,
    buffs = {}
}

function Character:AplicarBuff(nombre, bonus, duracion)
    table.insert(self.buffs, {
        nombre = nombre,
        bonus = bonus,
        tiempo = duracion
    })
    print("Buff aplicado: " .. nombre .. " (+" .. bonus .. " daño, " .. duracion .. "s)")
end

function Character:Tick(deltaTime)
    for i = #self.buffs, 1, -1 do
        local buff = self.buffs[i]
        buff.tiempo = buff.tiempo - deltaTime
        
        if buff.tiempo <= 0 then
            print("Buff expirado: " .. buff.nombre)
            table.remove(self.buffs, i)
        end
    end
end

function Character:CalcularDaño()
    local total = self.daño
    for _, buff in ipairs(self.buffs) do
        total = total + buff.bonus
    end
    return total
end

Character:AplicarBuff("Poder", 25, 5)
for i = 1, 6 do
    print("Daño: " .. Character:CalcularDaño())
    Character:Tick(1)
end`,
    tests: [
      { type: "output_contains", expected: "Buff aplicado: Poder", message: "Debe aplicar buff" },
      { type: "output_contains", expected: "Buff expirado: Poder", message: "Debe expirar buff" },
      { type: "output_contains", expected: "Daño: 75", message: "Daño con buff correcto" },
      { type: "output_contains", expected: "Daño: 50", message: "Daño sin buff correcto" },
    ],
    hints: ["Guarda buff con tiempo restante", "Decrementa tiempo en Tick", "Remueve cuando tiempo <= 0"],
    xpReward: 55,
    difficulty: "advanced",
  },
  summary: "Buffs con duración, expiran con Tick. Modificadores flat o percentuales. Refresh al reaplicar. Debuffs como poison con DoT.",
  resources: [],
  prerequisites: ["mes-04-l04"],
};

// ============================================
// LECCIÓN 4.6: SaveGame
// ============================================

export const lesson06: Lesson = {
  id: "mes-04-l06",
  moduleId: "mes-04",
  lessonNumber: 6,
  title: "SaveGame",
  description: "Serializar, guardar y cargar progreso del jugador.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "SaveGame",
    objectives: [
      "Serializar datos a JSON",
      "Guardar en archivo",
      "Cargar datos guardados",
      "Manejar múltiples slots de guardado",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Serializar Datos",
        content: `**Serializar** es convertir datos a formato guardable.

**JSON es ideal:**
\`\`\`lua
local dkjson = require("dkjson")

local datos = {
    nivel = 25,
    oro = 1500,
    inventario = {
        {id = "sword", cantidad = 1},
        {id = "potion", cantidad = 5}
    }
}

-- Serializar
local json = dkjson.encode(datos)
print(json)
-- {"nivel":25,"oro":1500,"inventario":[...]}

-- Deserializar
local datosCargados = dkjson.decode(json)
\`\`\``,
        codeExamples: [
          {
            title: "Serializar en UE5",
            code: `local SaveSystem = {}

function SaveSystem:Serializar(datos)
    -- En UE5 real, usar FJsonSerializer
    -- Aquí simulamos con string
    local json = string.format(
        '{"nivel":%d,"oro":%d,"inventario":[]}',
        datos.nivel,
        datos.oro
    )
    return json
end

function SaveSystem:Deserializar(json)
    -- Parsear JSON
    local nivel = json:match('"nivel":(%d+)')
    local oro = json:match('"oro":(%d+)')
    
    return {
        nivel = tonumber(nivel),
        oro = tonumber(oro)
    }
end

-- Probar
local datos = {nivel = 25, oro = 1500}
local json = SaveSystem:Serializar(datos)
print("JSON: " .. json)

local cargados = SaveSystem:Deserializar(json)
print("Nivel: " .. cargados.nivel)`,
            language: "lua",
            description: "Serializar y deserializar datos.",
          },
        ],
      },
      {
        heading: "Guardar y Cargar",
        content: `**En UE5 con UnLua:**
\`\`\`lua
function SaveGame:Guardar(slotName, datos)
    -- Serializar
    local json = dkjson.encode(datos)
    
    -- Guardar en archivo
    local path = "/Game/Saves/" .. slotName .. ".json"
    self:WriteFile(path, json)
    
    print("Juego guardado en " .. slotName)
end

function SaveGame:Cargar(slotName)
    -- Leer archivo
    local path = "/Game/Saves/" .. slotName .. ".json"
    local json = self:ReadFile(path)
    
    if not json then
        print("No hay guardado en " .. slotName)
        return nil
    end
    
    -- Deserializar
    return dkjson.decode(json)
end
\`\`\`

**SaveGame Object en UE5:**
\`\`\`lua
function SaveGame:CrearSaveGame()
    local save = self:CreateSaveGameObject()
    
    -- Guardar datos del jugador
    save.PlayerLocation = self.player:GetActorLocation()
    save.PlayerLevel = self.player.nivel
    save.PlayerGold = self.player.oro
    save.Inventory = self.player.inventario
    
    return save
end
\`\`\``,
        codeExamples: [
          {
            title: "Sistema completo",
            code: `local SaveSystem = {}

function SaveSystem:Guardar(slot, datos)
    print("=== Guardando ===")
    print("Slot: " .. slot)
    print("Nivel: " .. datos.nivel)
    print("Oro: " .. datos.oro)
    print("Items: " .. #datos.inventario)
    
    -- Simular guardado
    self.ultimoGuardado = {
        slot = slot,
        datos = datos
    }
    
    return true
end

function SaveSystem:Cargar(slot)
    print("=== Cargando ===")
    print("Slot: " .. slot)
    
    if self.ultimoGuardado and self.ultimoGuardado.slot == slot then
        return self.ultimoGuardado.datos
    end
    
    return nil
end

-- Probar
local jugador = {
    nivel = 25,
    oro = 1500,
    inventario = {"Espada", "Poción", "Escudo"}
}

SaveSystem:Guardar("save1", jugador)
local cargado = SaveSystem:Cargar("save1")
print("Cargado: Nivel " .. cargado.nivel)`,
            language: "lua",
            description: "Sistema completo de guardado y carga.",
          },
        ],
      },
      {
        heading: "Múltiples Slots",
        content: `**Soportar múltiples saves:**
\`\`\`lua
local SaveManager = {
    slots = {"save1", "save2", "save3"}
}

function SaveManager:ListarSlots()
    local disponibles = {}
    
    for _, slot in ipairs(self.slots) do
        if self:ExisteSlot(slot) then
            local datos = self:Cargar(slot)
            table.insert(disponibles, {
                slot = slot,
                nivel = datos.nivel,
                tiempo = datos.tiempoJugado
            })
        end
    end
    
    return disponibles
end

function SaveManager:Borrar(slot)
    local path = "/Game/Saves/" .. slot .. ".json"
    self:DeleteFile(path)
    print("Guardado borrado: " .. slot)
end
\`\`\``,
        codeExamples: [
          {
            title: "Gestor de slots",
            code: `local SaveManager = {
    slots = {"Slot1", "Slot2", "Slot3"}
}

function SaveManager:Guardar(slotIndex, datos)
    local slot = self.slots[slotIndex]
    datos.tiempoGuardado = os.time()
    
    print("Guardado en " .. slot)
    print("Nivel: " .. datos.nivel .. ", Tiempo: " .. datos.tiempoJugado .. "min")
    
    return true
end

function SaveManager:Cargar(slotIndex)
    local slot = self.slots[slotIndex]
    print("Cargando desde " .. slot)
    
    -- Simular carga
    return {
        nivel = 25,
        oro = 1500,
        tiempoJugado = 120
    }
end

function SaveManager:TieneGuardado(slotIndex)
    -- Verificar si existe archivo
    return math.random() > 0.5  -- Simulado
end

-- Probar
SaveManager:Guardar(1, {nivel = 25, tiempoJugado = 120})
SaveManager:Guardar(2, {nivel = 15, tiempoJugado = 60})

for i = 1, 3 do
    if SaveManager:TieneGuardado(i) then
        print("Slot " .. i .. " tiene guardado")
    end
end`,
            language: "lua",
            description: "Múltiples slots de guardado.",
          },
        ],
      },
    ],
    summary: `Serializar con JSON encode/decode. Guardar en archivo con WriteFile. Cargar con ReadFile. Múltiples slots para diferentes partidas.`,
  },
  examples: [],
  interactive: {
    title: "Simula Save System",
    description: "Guarda y carga datos",
    starterCode: `local SaveSystem = {}

function SaveSystem:Guardar(datos)
    -- Serializar a string
    local json = string.format(
        'nivel=%d,oro=%d',
        datos.nivel,
        datos.oro
    )
    print("Guardado: " .. json)
    return json
end

function SaveSystem:Cargar(json)
    -- Deserializar
    local nivel = json:match("nivel=(%d+)")
    local oro = json:match("oro=(%d+)")
    
    return {
        nivel = tonumber(nivel),
        oro = tonumber(oro)
    }
end

-- Probar
local jugador = {nivel = 25, oro = 1500}
local guardado = SaveSystem:Guardar(jugador)
local cargado = SaveSystem:Cargar(guardado)

print("Cargado:")
print("Nivel: " .. cargado.nivel)
print("Oro: " .. cargado.oro)`,
    environment: "lua",
    expectedOutput: "Nivel: 25",
  },
  miniExercise: {
    id: "mes-04-l06-ej1",
    lessonId: "mes-04-l06",
    title: "Sistema de Guardado Completo",
    instructions: `Crea un sistema de guardado:

1. Función \`Guardar(slot, nivel, oro, inventario)\`
2. Función \`Cargar(slot)\` que retorne los datos
3. Función \`ListarSlots()\` que muestre saves disponibles
4. Guarda 2 partidas diferentes
5. Lista los slots
6. Carga el slot 1

**Salida esperada:**
\`\`\`
=== Guardando Partida 1 ===
Nivel: 25, Oro: 1500
=== Guardando Partida 2 ===
Nivel: 15, Oro: 800
=== Slots Disponibles ===
Slot 1: Nivel 25
Slot 2: Nivel 15
=== Cargando Slot 1 ===
Nivel: 25, Oro: 1500
\`\`\``,
    starterCode: `local SaveSystem = {
    saves = {}
}

function SaveSystem:Guardar(slot, nivel, oro, inventario)
    -- Implementar
end

function SaveSystem:Cargar(slot)
    -- Implementar
end

function SaveSystem:ListarSlots()
    -- Implementar
end

-- Probar
SaveSystem:Guardar(1, 25, 1500, {"Espada", "Poción"})
SaveSystem:Guardar(2, 15, 800, {"Daga"})
SaveSystem:ListarSlots()
local datos = SaveSystem:Cargar(1)
print("Cargado: Nivel " .. datos.nivel .. ", Oro " .. datos.oro)`,
    solution: `local SaveSystem = {
    saves = {}
}

function SaveSystem:Guardar(slot, nivel, oro, inventario)
    print("=== Guardando Partida " .. slot .. " ===")
    print("Nivel: " .. nivel .. ", Oro: " .. oro)
    
    self.saves[slot] = {
        nivel = nivel,
        oro = oro,
        inventario = inventario
    }
end

function SaveSystem:Cargar(slot)
    print("=== Cargando Slot " .. slot .. " ===")
    return self.saves[slot]
end

function SaveSystem:ListarSlots()
    print("=== Slots Disponibles ===")
    for slot, datos in pairs(self.saves) do
        print("Slot " .. slot .. ": Nivel " .. datos.nivel)
    end
end

SaveSystem:Guardar(1, 25, 1500, {"Espada", "Poción"})
SaveSystem:Guardar(2, 15, 800, {"Daga"})
SaveSystem:ListarSlots()
local datos = SaveSystem:Cargar(1)
print("Cargado: Nivel " .. datos.nivel .. ", Oro " .. datos.oro)`,
    tests: [
      { type: "output_contains", expected: "Guardando Partida 1", message: "Debe guardar partida 1" },
      { type: "output_contains", expected: "Slots Disponibles", message: "Debe listar slots" },
      { type: "output_contains", expected: "Cargado: Nivel 25", message: "Debe cargar correctamente" },
    ],
    hints: ["Guarda en tabla self.saves[slot]", "Retorna self.saves[slot] en Cargar", "Itera pairs(self.saves) en ListarSlots"],
    xpReward: 50,
    difficulty: "intermediate",
  },
  summary: "Serializar con JSON. Guardar/Cargar archivos. Múltiples slots. SaveGame Object en UE5 para ubicación, stats, inventario.",
  resources: [],
  prerequisites: ["mes-04-l05"],
};

// Exportar todas las lecciones del módulo 4
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
];
