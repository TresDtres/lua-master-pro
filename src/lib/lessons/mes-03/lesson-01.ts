/**
 * Lección 3.1: Binding BP-Lua
 */

import { Lesson } from "@/types/lesson";

export const lesson01: Lesson = {
  id: "mes-03-l01",
  moduleId: "mes-03",
  lessonNumber: 1,
  title: "Binding BP-Lua",
  description: "UFUNCTION, exportar funciones de Blueprint a Lua y viceversa.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Binding BP-Lua",
    objectives: [
      "Entender cómo funciona el binding entre BP y Lua",
      "Exportar funciones de Blueprint usando UFUNCTION",
      "Llamar funciones de Blueprint desde scripts Lua",
      "Exportar funciones Lua para usar en Blueprint",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "¿Qué es el Binding?",
        content: `El **binding** es el puente que permite la comunicación entre Blueprint y Lua.

**Flujo de comunicación:**
\`\`\`
┌─────────────┐         ┌─────────────┐
│  Blueprint  │ ←────→  │    Lua      │
│   (C++)     │  Binding│  (Script)   │
└─────────────┘         └─────────────┘
\`\`\`

**UnLua provee:**
- Acceso a funciones de Blueprint desde Lua
- Exposición de funciones Lua a Blueprint
- Binding automático de propiedades
- Sistema de eventos compartido

**Ventajas:**
- **Iteración rápida** - Cambia lógica en Lua sin recompilar
- **Mantenimiento** - Lógica compleja en Lua, estructura en BP
- **Debugging** - Hot reload para pruebas rápidas`,
        codeExamples: [
          {
            title: "Ejemplo de binding",
            code: `-- En Lua, puedes acceder a funciones de BP directamente
local miActor = self

-- Llamar función de Blueprint
miActor:MiFuncionBP(100)

-- Acceder a variables de BP
local vida = miActor.Vida
print("Vida: " .. vida)`,
            language: "lua",
            description: "Lua puede llamar funciones y acceder a variables de Blueprint.",
          },
        ],
      },
      {
        heading: "UFUNCTION - Exportar a Lua",
        content: `**UFUNCTION** hace que una función de C++/BP sea visible en Lua.

**En C++:**
\`\`\`cpp
UFUNCTION(BlueprintCallable, LuaCall)
void MiFuncion(int Valor);

UFUNCTION(BlueprintPure, LuaCall)
int ObtenerVida() const;
\`\`\`

**En Blueprint:**
1. Crea una función en el Blueprint
2. Marca la casilla "Call in Editor"
3. UnLua la expone automáticamente

**En Lua:**
\`\`\`lua
-- Llamar función exportada
self:MiFuncion(100)

-- Función que retorna valor
local vida = self:ObtenerVida()
\`\`\`

**Parámetros soportados:**
- Tipos primitivos (int, float, bool, string)
- FVector, FRotator, FTransform
- UObject references
- Arrays y Maps`,
        codeExamples: [
          {
            title: "Función BP desde Lua",
            code: `local MiPersonaje = {}

function MiPersonaje:BeginPlay()
    -- Llamar función de BP que hace daño
    self:ApplyDamage(25)
    
    -- Obtener valor de BP
    local vidaActual = self:GetHealth()
    print("Vida: " .. vidaActual)
    
    -- Llamar función con múltiples parámetros
    self:SpawnProjectile(FVector(0, 0, 100), FRotator(0, 0, 0))
end

return MiPersonaje`,
            language: "lua",
            description: "Llamando funciones de Blueprint desde script Lua.",
          },
        ],
      },
      {
        heading: "Exportar Funciones Lua a BP",
        content: `Puedes **exponer funciones Lua** para que Blueprint las llame.

**En el script Lua:**
\`\`\`lua
local MiActor = {}

-- Función que BP puede llamar
function MiActor:FuncionParaBP(valor)
    print("Valor desde BP: " .. valor)
    return valor * 2
end

-- Función con múltiples retornos
function MiActor:ObtenerCoords()
    return self:GetActorLocation()
end

return MiActor
\`\`\`

**En Blueprint:**
1. Añade el componente UnLua al Actor
2. Asigna el script Lua
3. Usa el nodo "Call Lua Function"
4. Escribe el nombre de la función

**Ejemplo de uso en BP:**
\`\`\`
[Event BeginPlay] → [Call Lua Function: FuncionParaBP] → [Print String]
\`\`\``,
        codeExamples: [
          {
            title: "Funciones exportadas a BP",
            code: `local SistemaDialogos = {}

-- BP llama esta función para iniciar diálogo
function SistemaDialogos:IniciarDialogo(npcId, dialogoId)
    print("Iniciando diálogo " .. dialogoId .. " con NPC " .. npcId)
    self.npcActual = npcId
    self.dialogoActual = dialogoId
    return true
end

-- BP llama para obtener opciones
function SistemaDialogos:ObtenerOpciones()
    return {
        "¿Qué hay de nuevo?",
        "Necesito ayuda",
        "Adiós"
    }
end

-- BP llama para seleccionar opción
function SistemaDialogos:SeleccionarOpcion(index)
    print("Opción seleccionada: " .. index)
end

return SistemaDialogos`,
            language: "lua",
            description: "Sistema de diálogos accesible desde Blueprint.",
          },
        ],
      },
      {
        heading: "Propiedades y Variables",
        content: `Las **variables** también se comparten entre BP y Lua.

**Acceder a variables de BP:**
\`\`\`lua
function MiActor:BeginPlay()
    -- Leer variable
    local vida = self.Vida
    
    -- Escribir variable
    self.Vida = 100
    
    -- Variable de array
    local primerItem = self.Inventario[1]
end
\`\`\`

**Variables complejas:**
\`\`\`lua
-- FVector
local location = self:GetActorLocation()
print("X: " .. location.X .. ", Y: " .. location.Y)

-- Modificar
location.Z = location.Z + 100
self:SetActorLocation(location)

-- FTransform
local transform = self:GetActorTransform()
\`\`\`

**Precauciones:**
- No modifiques variables privadas de BP directamente
- Usa getters/setters cuando existan
- Verifica tipos antes de asignar`,
        codeExamples: [
          {
            title: "Manipular variables BP",
            code: `local PlayerStats = {}

function PlayerStats:BeginPlay()
    -- Leer stats de BP
    self.nivel = self.Nivel
    self.experiencia = self.Experiencia
    self.oro = self.Gold
    
    -- Calcular stats derivadas
    self.vidaMaxima = 100 + (self.nivel * 10)
    self.daño = 10 + (self.nivel * 2)
    
    -- Escribir de vuelta
    self.MaxHealth = self.vidaMaxima
    self.Damage = self.daño
    
    print("Stats calculadas: Vida=" .. self.vidaMaxima .. ", Daño=" .. self.daño)
end

return PlayerStats`,
            language: "lua",
            description: "Leer y escribir variables entre Lua y Blueprint.",
          },
        ],
      },
    ],
    summary: `Binding permite comunicación BP ↔ Lua. UFUNCTION exporta funciones de BP a Lua. Funciones Lua pueden ser llamadas desde BP con "Call Lua Function". Variables se comparten automáticamente. Tipos soportados: primitivos, FVector, FRotator, arrays.`,
  },
  examples: [
    {
      title: "Sistema de combate integrado",
      code: `-- CombatSystem.lua
local CombatSystem = {}

function CombatSystem:BeginPlay()
    self.dañoBase = 10
    self.critChance = 0.2
end

-- BP llama esta función para atacar
function CombatSystem:Atacar(objetivo)
    local daño = self:CalcularDaño()
    local esCrit = math.random() < self.critChance
    
    if esCrit then
        daño = daño * 2
        print("¡Golpe crítico!")
    end
    
    -- Llamar función de BP para aplicar daño
    self:ApplyDamageToTarget(objetivo, daño)
    
    return daño
end

function CombatSystem:CalcularDaño()
    -- Usar variables de BP
    local fuerza = self.Strength
    local bonus = self.DamageBonus
    
    return self.dañoBase + fuerza + bonus
end

return CombatSystem`,
      language: "lua",
      description: "Sistema de combate que integra lógica Lua con funciones BP.",
    },
    {
      title: "Inventario compartido",
      code: `-- InventorySystem.lua
local Inventory = {}

function Inventory:BeginPlay()
    self.capacidadMaxima = 20
end

-- BP llama para agregar item
function Inventory:AgregarItem(itemId, cantidad)
    local slot = self:BuscarSlot(itemId)
    
    if slot then
        slot.Cantidad = slot.Cantidad + cantidad
    else
        -- Llamar BP para crear nuevo slot
        self:CreateInventorySlot(itemId, cantidad)
    end
    
    -- Actualizar UI desde BP
    self:RefreshInventoryUI()
end

-- BP llama para obtener items
function Inventory:ObtenerItems()
    return self.Items or {}
end

function Inventory:BuscarSlot(itemId)
    local items = self:ObtenerItems()
    for _, slot in ipairs(items) do
        if slot.ItemId == itemId then
            return slot
        end
    end
    return nil
end

return Inventory`,
      language: "lua",
      description: "Sistema de inventario con integración BP-Lua.",
    },
    {
      title: "Quest system con eventos",
      code: `-- QuestSystem.lua
local QuestSystem = {}

function QuestSystem:BeginPlay()
    self.questsActivas = {}
end

-- BP llama para aceptar quest
function QuestSystem:AceptarQuest(questId)
    local quest = self:LoadQuest(questId)
    table.insert(self.questsActivas, quest)
    
    -- Notificar BP para actualizar UI
    self:OnQuestAccepted(questId)
    
    return quest
end

-- BP llama para completar objetivo
function QuestSystem:CompletarObjetivo(questId, objetivoId)
    local quest = self:BuscarQuest(questId)
    if quest then
        quest.objetivos[objetivoId].completado = true
        
        if self:VerificarCompletada(quest) then
            self:CompletarQuest(questId)
        end
    end
end

function QuestSystem:BuscarQuest(questId)
    for _, quest in ipairs(self.questsActivas) do
        if quest.id == questId then
            return quest
        end
    end
    return nil
end

return QuestSystem`,
      language: "lua",
      description: "Sistema de quests con notificaciones a Blueprint.",
    },
  ],
  interactive: {
    title: "Simula Binding BP-Lua",
    description: "Crea funciones que se comunican entre BP y Lua",
    starterCode: `-- Simula funciones de Blueprint
local BlueprintFunctions = {
    Vida = 100,
    Daño = 10
}

function BlueprintFunctions:AplicarDaño(cantidad)
    self.Vida = self.Vida - cantidad
    print("Vida: " .. self.Vida)
end

function BlueprintFunctions:ObtenerVida()
    return self.Vida
end

-- Script Lua que usa funciones de BP
local LuaScript = {}

function LuaScript:AtacarEnemigo()
    -- Llamar función de BP
    BlueprintFunctions:AplicarDaño(self.daño)
    
    local vidaRestante = BlueprintFunctions:ObtenerVida()
    print("Vida del enemigo: " .. vidaRestante)
end

LuaScript.daño = 25
LuaScript:AtacarEnemigo()`,
    environment: "lua",
    expectedOutput: "Vida:",
  },
  miniExercise: {
    id: "mes-03-l01-ej1",
    lessonId: "mes-03-l01",
    title: "Sistema de Stats Compartidas",
    instructions: `Crea un sistema que comparta stats entre BP y Lua:

1. Crea tabla \`PlayerBP\` con variables: Vida=100, Fuerza=20, Nivel=1
2. Crea script \`PlayerLua\` que:
   - Lea las variables de PlayerBP
   - Calcule \`vidaMaxima = 100 + (Nivel * 10) + (Fuerza * 5)\`
   - Calcule \`daño = Fuerza * 2\`
   - Escriba los resultados en PlayerBP.VidaMaxima y PlayerBP.Daño
3. Imprime todas las stats finales

**Salida esperada:**
\`\`\`
Stats originales: Vida=100, Fuerza=20, Nivel=1
Stats calculadas:
- Vida Máxima: 210
- Daño: 40
\`\`\``,
    starterCode: `-- Variables de Blueprint
local PlayerBP = {
    Vida = 100,
    Fuerza = 20,
    Nivel = 1
}

-- Script Lua
local PlayerLua = {}

function PlayerLua:CalcularStats()
    -- Leer variables de BP
    -- Calcular nuevas stats
    -- Escribir en BP
end

-- Ejecutar
print("Stats originales: Vida=" .. PlayerBP.Vida .. ", Fuerza=" .. PlayerBP.Fuerza .. ", Nivel=" .. PlayerBP.Nivel)
PlayerLua:CalcularStats()
print("Stats calculadas:")
print("- Vida Máxima: " .. PlayerBP.VidaMaxima)
print("- Daño: " .. PlayerBP.Daño)`,
    solution: `local PlayerBP = {
    Vida = 100,
    Fuerza = 20,
    Nivel = 1
}

local PlayerLua = {}

function PlayerLua:CalcularStats()
    local nivel = PlayerBP.Nivel
    local fuerza = PlayerBP.Fuerza
    
    PlayerBP.VidaMaxima = 100 + (nivel * 10) + (fuerza * 5)
    PlayerBP.Daño = fuerza * 2
end

print("Stats originales: Vida=" .. PlayerBP.Vida .. ", Fuerza=" .. PlayerBP.Fuerza .. ", Nivel=" .. PlayerBP.Nivel)
PlayerLua:CalcularStats()
print("Stats calculadas:")
print("- Vida Máxima: " .. PlayerBP.VidaMaxima)
print("- Daño: " .. PlayerBP.Daño)`,
    tests: [
      {
        type: "output_contains",
        expected: "Stats originales: Vida=100",
        message: "Debe mostrar stats originales",
      },
      {
        type: "output_contains",
        expected: "Vida Máxima: 210",
        message: "Vida máxima debe ser 210",
      },
      {
        type: "output_contains",
        expected: "Daño: 40",
        message: "Daño debe ser 40",
      },
      {
        type: "code_contains",
        expected: "PlayerBP.",
        message: "Debe acceder a variables de PlayerBP",
      },
    ],
    hints: [
      "Accede a PlayerBP.Nivel y PlayerBP.Fuerza",
      "Fórmula vida: 100 + (nivel * 10) + (fuerza * 5)",
      "Fórmula daño: fuerza * 2",
    ],
    xpReward: 45,
    difficulty: "advanced",
  },
  summary: `Binding conecta BP y Lua. UFUNCTION exporta funciones BP a Lua. Funciones Lua se llaman desde BP con "Call Lua Function". Variables se comparten automáticamente. Tipos: int, float, bool, string, FVector, FRotator, arrays.`,
  resources: [
    {
      title: "UnLua Binding Documentation",
      url: "https://github.com/Tencent/UnLua/blob/master/Docs/Binding.md",
      type: "documentation",
      description: "Documentación oficial de binding en UnLua",
    },
    {
      title: "UFUNCTION Reference",
      url: "https://docs.unrealengine.com/5.0/en-US/API/Runtime/CoreUObject/UObject/UFUNCTION/",
      type: "documentation",
      description: "Referencia de UFUNCTION en UE5",
    },
    {
      title: "UnLua Examples - Binding",
      url: "https://github.com/Tencent/UnLua/tree/master/Content/Scripts",
      type: "tool",
      description: "Ejemplos de binding en UnLua",
    },
  ],
  prerequisites: ["mes-02-l06"],
};

export default lesson01;
