import { ExampleCode } from "@/components/CodeEditor";

export const robloxExamples: ExampleCode[] = [
  {
    name: "🎮 Leaderstats System",
    description: "Sistema de monedas y gemas para tu juego",
    difficulty: "beginner",
    code: `-- ============================================
-- LEADERSTATS SYSTEM
-- Sistema de monedas y gemas para jugadores
-- ============================================

local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")

-- Configurar DataStore
local PlayerData = DataStoreService:GetDataStore("PlayerData_v1")

-- Valores por defecto
local defaultData = {
  Coins = 0,
  Gems = 0,
  Wins = 0
}

-- ============================================
-- CREAR LEADERSTATS
-- ============================================

local function createLeaderstats(player)
  -- Crear carpeta leaderstats
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  leaderstats.Parent = player
  
  -- Crear estadísticas
  local coins = Instance.new("IntValue")
  coins.Name = "💰 Coins"
  coins.Value = 0
  coins.Parent = leaderstats
  
  local gems = Instance.new("IntValue")
  gems.Name = "💎 Gems"
  gems.Value = 0
  gems.Parent = leaderstats
  
  local wins = Instance.new("IntValue")
  wins.Name = "🏆 Wins"
  wins.Value = 0
  wins.Parent = leaderstats
  
  return leaderstats
end

-- ============================================
-- CARGAR DATOS
-- ============================================

local function loadData(player)
  local key = "player_" .. player.UserId
  
  local success, data = pcall(function()
    return PlayerData:GetAsync(key)
  end)
  
  if success and data then
    -- Datos existentes
    local leaderstats = createLeaderstats(player)
    leaderstats["💰 Coins"].Value = data.Coins or 0
    leaderstats["💎 Gems"].Value = data.Gems or 0
    leaderstats["🏆 Wins"].Value = data.Wins or 0
    
    print("✅ Datos cargados para " .. player.Name)
    return true
  else
    -- Nuevos datos
    createLeaderstats(player)
    print("🆕 Nuevos datos para " .. player.Name)
    return false
  end
end

-- ============================================
-- GUARDAR DATOS
-- ============================================

local function saveData(player)
  local key = "player_" .. player.UserId
  local leaderstats = player:FindFirstChild("leaderstats")
  
  if not leaderstats then return false end
  
  local data = {
    Coins = leaderstats["💰 Coins"].Value,
    Gems = leaderstats["💎 Gems"].Value,
    Wins = leaderstats["🏆 Wins"].Value
  }
  
  local success, err = pcall(function()
    PlayerData:SetAsync(key, data)
  end)
  
  if success then
    print("💾 Datos guardados para " .. player.Name)
    return true
  else
    warn("❌ Error al guardar: " .. tostring(err))
    return false
  end
end

-- ============================================
-- EVENTOS
-- ============================================

Players.PlayerAdded:Connect(function(player)
  loadData(player)
end)

Players.PlayerRemoving:Connect(function(player)
  saveData(player)
end)

game:BindToClose(function()
  for _, player in ipairs(Players:GetPlayers()) do
    saveData(player)
  end
end)

-- ============================================
-- FUNCIONES DE UTILIDAD
-- ============================================

function addCoins(player, amount)
  local leaderstats = player:FindFirstChild("leaderstats")
  if leaderstats then
    leaderstats["💰 Coins"].Value = leaderstats["💰 Coins"].Value + amount
  end
end

function addGems(player, amount)
  local leaderstats = player:FindFirstChild("leaderstats")
  if leaderstats then
    leaderstats["💎 Gems"].Value = leaderstats["💎 Gems"].Value + amount
  end
end

function addWin(player)
  local leaderstats = player:FindFirstChild("leaderstats")
  if leaderstats then
    leaderstats["🏆 Wins"].Value = leaderstats["🏆 Wins"].Value + 1
  end
end

-- ============================================
-- PRUEBAS (Server Script)
-- ============================================

print("🚀 Leaderstats System inicializado")

-- Ejemplo: Dar monedas diarias
-- addCoins(player, 100)`,
  },
  {
    name: "🚪 Puerta Automática",
    description: "Puerta que se abre con ProximityPrompt",
    difficulty: "beginner",
    code: `-- ============================================
-- PUERTA AUTOMÁTICA
-- Sistema de puerta con ProximityPrompt
-- ============================================

-- Referencias
local door = script.Parent
local prompt = door:FindFirstChildOfClass("ProximityPrompt")
local openSound = door:FindFirstChildOfClass("Sound")
local closeSound = door:FindFirstChildOfClass("Sound")

-- Configuración
local openAngle = 90 -- Grados de apertura
local openSpeed = 2 -- Segundos para abrir/cerrar
local stayOpenTime = 3 -- Segundos abierta
local isOpen = false
local isMoving = false

-- ============================================
-- ABRIR PUERTA
-- ============================================

local function openDoor()
  if isMoving or isOpen then return end
  isMoving = true
  
  -- Reproducir sonido
  if openSound then
    openSound:Play()
  end
  
  -- Animación de apertura
  local hinge = door:FindFirstChildOfClass("HingeConstraint")
  
  if hinge then
    local originalAngle = hinge.CurrentAngle
    local targetAngle = originalAngle + openAngle
    
    -- Tween de apertura
    local tweenInfo = TweenInfo.new(openSpeed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    local tween = game:GetService("TweenService"):Create(
      hinge,
      tweenInfo,
      {CurrentAngle = targetAngle}
    )
    
    tween:Play()
    tween.Completed:Wait()
  end
  
  isOpen = true
  isMoving = false
  print("🚪 Puerta abierta")
end

-- ============================================
-- CERRAR PUERTA
-- ============================================

local function closeDoor()
  if isMoving or not isOpen then return end
  isMoving = true
  
  -- Reproducir sonido
  if closeSound then
    closeSound:Play()
  end
  
  -- Animación de cierre
  local hinge = door:FindFirstChildOfClass("HingeConstraint")
  
  if hinge then
    local tweenInfo = TweenInfo.new(openSpeed, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    local tween = game:GetService("TweenService"):Create(
      hinge,
      tweenInfo,
      {CurrentAngle = 0}
    )
    
    tween:Play()
    tween.Completed:Wait()
  end
  
  isOpen = false
  isMoving = false
  print("🚪 Puerta cerrada")
end

-- ============================================
-- CONEXIÓN DEL PROMPT
-- ============================================

if prompt then
  prompt.Triggered:Connect(function(player)
    if isOpen then
      closeDoor()
    else
      openDoor()
      
      -- Cerrar automáticamente después de un tiempo
      task.wait(stayOpenTime)
      if isOpen then
        closeDoor()
      end
    end
  end)
  
  print("✅ Puerta automática lista")
else
  warn("❌ No se encontró ProximityPrompt")
end`,
  },
  {
    name: "⚔️ Sistema de Combate",
    description: "Sistema de daño y salud para jugadores",
    difficulty: "intermediate",
    code: `-- ============================================
-- SISTEMA DE COMBATE
-- Gestión de salud y daño entre jugadores
-- ============================================

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

-- ============================================
-- CONFIGURACIÓN
-- ============================================

local DAMAGE_ENABLED = true
local FRIENDLY_FIRE = false
local MAX_HEALTH = 100
local REGEN_RATE = 1 -- Salud por segundo
local REGEN_DELAY = 5 -- Segundos sin daño para regenerar

-- ============================================
-- TABLA DE JUGADORES
-- ============================================

local playerData = {}

local function getPlayerData(player)
  if not playerData[player] then
    playerData[player] = {
      health = MAX_HEALTH,
      lastDamageTime = 0,
      kills = 0,
      deaths = 0
    }
  end
  return playerData[player]
end

-- ============================================
-- FUNCIONES DE COMBATE
-- ============================================

function damagePlayer(target, amount, attacker)
  if not DAMAGE_ENABLED then return end
  if not Players:GetPlayerFromCharacter(target) then return end
  
  local targetPlayer = Players:GetPlayerFromCharacter(target)
  local data = getPlayerData(targetPlayer)
  
  -- Verificar friendly fire
  if attacker and not FRIENDLY_FIRE then
    local attackerPlayer = Players:GetPlayerFromCharacter(attacker)
    if attackerPlayer == targetPlayer then return end
  end
  
  -- Aplicar daño
  data.health = math.max(0, data.health - amount)
  data.lastDamageTime = tick()
  
  -- Actualizar UI de salud (si existe)
  updateHealthUI(targetPlayer, data.health)
  
  -- Registrar kill
  if data.health == 0 and attacker then
    local attackerData = getPlayerData(
      Players:GetPlayerFromCharacter(attacker)
    )
    if attackerData then
      attackerData.kills = attackerData.kills + 1
    end
    targetPlayer.deaths = (targetPlayer.deaths or 0) + 1
  end
  
  print("💥 " .. targetPlayer.Name .. " recibió " .. amount .. " de daño")
  print("❤️  Salud restante: " .. data.health)
  
  return data.health
end

function healPlayer(player, amount)
  local data = getPlayerData(player)
  local oldHealth = data.health
  
  data.health = math.min(MAX_HEALTH, data.health + amount)
  updateHealthUI(player, data.health)
  
  local healed = data.health - oldHealth
  print("💚 " .. player.Name .. " fue curado " .. healed .. " puntos")
  
  return data.health
end

function killPlayer(player)
  local data = getPlayerData(player)
  data.health = 0
  updateHealthUI(player, 0)
  
  -- Eliminar personaje
  local character = player.Character
  if character then
    character:BreakJoints()
  end
  
  print("💀 " .. player.Name .. " ha muerto")
end

function respawnPlayer(player)
  -- Esperar a que el personaje exista
  local character = player.Character or player.CharacterAdded:Wait()
  
  -- Resetear datos
  local data = getPlayerData(player)
  data.health = MAX_HEALTH
  data.lastDamageTime = tick()
  
  -- Actualizar UI
  updateHealthUI(player, MAX_HEALTH)
  
  print("✨ " .. player.Name .. " ha respawning")
end

-- ============================================
-- UI DE SALUD (Placeholder)
-- ============================================

function updateHealthUI(player, health)
  -- Aquí iría la actualización de la UI del jugador
  -- Por ahora, solo imprimimos en consola
  
  local percentage = (health / MAX_HEALTH) * 100
  local bar = string.rep("█", math.floor(percentage / 5)) .. 
              string.rep("░", 20 - math.floor(percentage / 5))
  
  print("[" .. bar .. "] " .. health .. "/" .. MAX_HEALTH)
end

-- ============================================
-- REGENERACIÓN
-- ============================================

RunService.Heartbeat:Connect(function()
  for _, player in ipairs(Players:GetPlayers()) do
    local data = getPlayerData(player)
    
    -- Regenerar si no ha recibido daño recientemente
    if data.health < MAX_HEALTH and 
       tick() - data.lastDamageTime > REGEN_DELAY then
      data.health = math.min(MAX_HEALTH, data.health + REGEN_RATE * 0.1)
      updateHealthUI(player, data.health)
    end
  end
end)

-- ============================================
-- EVENTOS
-- ============================================

Players.PlayerAdded:Connect(function(player)
  getPlayerData(player) -- Inicializar datos
  
  player.CharacterAdded:Connect(function()
    respawnPlayer(player)
  end)
end)

Players.PlayerRemoving:Connect(function(player)
  playerData[player] = nil
end)

-- ============================================
-- EJEMPLOS DE USO
-- ============================================

-- Dañar jugador: damagePlayer(character, 25, attackerCharacter)
-- Curar jugador: healPlayer(player, 50)
-- Kill instantáneo: killPlayer(player)

print("⚔️ Sistema de combate inicializado")`,
  },
  {
    name: "🎯 Sistema de Misiones",
    description: "Sistema de quests con recompensas",
    difficulty: "advanced",
    code: `-- ============================================
-- SISTEMA DE MISIONES
-- Quests con objetivos y recompensas
-- ============================================

local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")

-- ============================================
-- DEFINICIÓN DE MISIONES
-- ============================================

local QuestDefinitions = {
  ["FirstSteps"] = {
    id = "FirstSteps",
    title = "Primeros Pasos",
    description = "Recoge 5 manzanas del árbol",
    objective = {
      type = "collect",
      target = "Apple",
      amount = 5
    },
    rewards = {
      coins = 50,
      experience = 100
    },
    repeatable = false
  },
  
  ["MonsterHunter"] = {
    id = "MonsterHunter",
    title = "Cazador de Monstruos",
    description = "Derrota 10 enemigos",
    objective = {
      type = "kill",
      target = "Enemy",
      amount = 10
    },
    rewards = {
      coins = 200,
      experience = 250,
      item = {name = "Espada de Hierro", amount = 1}
    },
    repeatable = true
  },
  
  ["Explorer"] = {
    id = "Explorer",
    title = "Explorador",
    description = "Visita 5 ubicaciones diferentes",
    objective = {
      type = "visit",
      locations = {"Forest", "Cave", "Mountain", "River", "Village"},
      amount = 5
    },
    rewards = {
      coins = 150,
      experience = 200,
      item = {name = "Mapa del Tesoro", amount = 1}
    },
    repeatable = false
  }
}

-- ============================================
-- DATOS DEL JUGADOR
-- ============================================

local PlayerQuestData = {}

local function getPlayerQuestData(player)
  if not PlayerQuestData[player] then
    PlayerQuestData[player] = {
      activeQuests = {},
      completedQuests = {},
      progress = {}
    }
  end
  return PlayerQuestData[player]
end

-- ============================================
-- FUNCIONES DE MISIONES
-- ============================================

function acceptQuest(player, questId)
  local questData = getPlayerQuestData(player)
  local questDef = QuestDefinitions[questId]
  
  if not questDef then
    warn("❌ Misión no existe: " .. questId)
    return false
  end
  
  -- Verificar si ya está completa
  if questData.completedQuests[questId] and not questDef.repeatable then
    warn("❌ Misión ya completada: " .. questId)
    return false
  end
  
  -- Verificar si ya está activa
  if questData.activeQuests[questId] then
    warn("⚠️ Misión ya activa: " .. questId)
    return false
  end
  
  -- Activar misión
  questData.activeQuests[questId] = true
  questData.progress[questId] = 0
  
  print("✅ " .. player.Name .. " aceptó la misión: " .. questDef.title)
  print("📜 " .. questDef.description)
  
  return true
end

function updateQuestProgress(player, questType, target)
  local questData = getPlayerQuestData(player)
  
  for questId, isActive in pairs(questData.activeQuests) do
    if isActive then
      local questDef = QuestDefinitions[questId]
      local objective = questDef.objective
      
      -- Verificar si el progreso coincide
      if objective.type == questType then
        local shouldUpdate = false
        
        if questType == "collect" or questType == "kill" then
          shouldUpdate = objective.target == target
        elseif questType == "visit" then
          shouldUpdate = table.find(objective.locations, target) ~= nil
        end
        
        if shouldUpdate then
          questData.progress[questId] = (questData.progress[questId] or 0) + 1
          print("📊 Progreso: " .. questId .. " = " .. questData.progress[questId] .. "/" .. objective.amount)
          
          -- Verificar completado
          if questData.progress[questId] >= objective.amount then
            completeQuest(player, questId)
          end
        end
      end
    end
  end
end

function completeQuest(player, questId)
  local questData = getPlayerQuestData(player)
  local questDef = QuestDefinitions[questId]
  
  if not questData.activeQuests[questId] then return false end
  
  -- Marcar como completada
  questData.activeQuests[questId] = nil
  questData.completedQuests[questId] = true
  questData.progress[questId] = nil
  
  -- Dar recompensas
  local rewards = questDef.rewards
  
  print("🎉 ¡Misión completada: " .. questDef.title .. "!")
  print("🏆 Recompensas:")
  
  if rewards.coins then
    print("  💰 " .. rewards.coins .. " monedas")
    -- addCoins(player, rewards.coins)
  end
  
  if rewards.experience then
    print("  ⭐ " .. rewards.experience .. " experiencia")
    -- addExperience(player, rewards.experience)
  end
  
  if rewards.item then
    print("  📦 " .. rewards.item.name .. " x" .. rewards.item.amount)
    -- addItem(player, rewards.item.name, rewards.item.amount)
  end
  
  return true
end

function getQuestStatus(player, questId)
  local questData = getPlayerQuestData(player)
  local questDef = QuestDefinitions[questId]
  
  local status = {
    id = questId,
    title = questDef.title,
    active = questData.activeQuests[questId] or false,
    completed = questData.completedQuests[questId] or false,
    progress = questData.progress[questId] or 0,
    total = questDef.objective.amount
  }
  
  return status
end

function listAvailableQuests(player)
  local questData = getPlayerQuestData(player)
  
  print("=== MISIONES DISPONIBLES ===")
  
  for questId, questDef in pairs(QuestDefinitions) do
    local status = getQuestStatus(player, questId)
    local icon = "⚪"
    
    if status.completed then
      icon = "✅"
    elseif status.active then
      icon = "🟡"
    end
    
    print(string.format("%s %s - %s", icon, questDef.title, questDef.description))
    print(string.format("   Recompensa: %d monedas, %d XP", 
      questDef.rewards.coins, questDef.rewards.experience))
  end
end

-- ============================================
-- EJEMPLOS DE USO
-- ============================================

-- En un Script local dentro de una herramienta:
-- updateQuestProgress(player, "collect", "Apple")

-- En un Script al tocar un enemigo:
-- updateQuestProgress(player, "kill", "Enemy")

-- En un Script al entrar a una zona:
-- updateQuestProgress(player, "visit", "Forest")

print("📜 Sistema de misiones inicializado")`,
  },
  {
    name: "🌟 Sistema de Partículas",
    description: "Efectos visuales con ParticleEmitter",
    difficulty: "intermediate",
    code: `-- ============================================
-- SISTEMA DE PARTÍCULAS
-- Efectos visuales personalizados
-- ============================================

-- ============================================
-- CREAR EMISOR DE PARTÍCULAS
-- ============================================

local function createParticleEmitter(parent, properties)
  local emitter = Instance.new("ParticleEmitter")
  emitter.Name = properties.name or "ParticleEmitter"
  emitter.Parent = parent
  
  -- Propiedades básicas
  emitter.Texture = properties.texture or "rbxassetid://0"
  emitter.Color = properties.color or ColorSequence.new(Color3.white)
  emitter.Size = properties.size or NumberSequence.new(1)
  emitter.Transparency = properties.transparency or NumberSequence.new(0)
  
  -- Configuración de emisión
  emitter.Rate = properties.rate or 10
  emitter.Lifetime = properties.lifetime or NumberRange.new(1, 2)
  emitter.Speed = properties.speed or NumberRange.new(5, 10)
  emitter.SpreadAngle = properties.spreadAngle or Vector2.new(0, 360)
  
  -- Física
  emitter.Gravity = properties.gravity or 0
  emitter.Drag = properties.drag or 0
  emitter.VelocityInheritance = properties.velocityInheritance or 0
  
  -- Apariencia
  emitter.Rotation = properties.rotation or NumberRange.new(0, 360)
  emitter.RotSpeed = properties.rotSpeed or NumberRange.new(0, 0)
  emitter.Square = properties.square or false
  emitter.LightEmission = properties.lightEmission or 0
  emitter.ZOffset = properties.zOffset or 0
  
  return emitter
end

-- ============================================
-- EFECTOS PREDEFINIDOS
-- ============================================

-- Fuego
local function createFireEffect(parent)
  local fire = createParticleEmitter(parent, {
    name = "Fire",
    texture = "rbxassetid://24187642",
    color = ColorSequence.new(
      Color3.fromRGB(255, 100, 0),
      Color3.fromRGB(255, 50, 0)
    ),
    size = NumberSequence.new({
      {Time = 0, Value = 0.5},
      {Time = 1, Value = 1},
      {Time = 1, Value = 0}
    }),
    transparency = NumberSequence.new({
      {Time = 0, Value = 0},
      {Time = 0.8, Value = 0.5},
      {Time = 1, Value = 1}
    }),
    rate = 50,
    lifetime = NumberRange.new(0.5, 1),
    speed = NumberRange.new(3, 5),
    spreadAngle = Vector2.new(30, 30),
    gravity = -5,
    rotation = NumberRange.new(0, 360),
    rotSpeed = NumberRange.new(-100, 100)
  })
  
  return fire
end

-- Humo
local function createSmokeEffect(parent)
  local smoke = createParticleEmitter(parent, {
    name = "Smoke",
    texture = "rbxassetid://24187642",
    color = ColorSequence.new(
      Color3.fromRGB(100, 100, 100),
      Color3.fromRGB(50, 50, 50)
    ),
    size = NumberSequence.new({
      {Time = 0, Value = 0.2},
      {Time = 1, Value = 2}
    }),
    transparency = NumberSequence.new({
      {Time = 0, Value = 0.5},
      {Time = 1, Value = 1}
    }),
    rate = 20,
    lifetime = NumberRange.new(2, 3),
    speed = NumberRange.new(1, 2),
    spreadAngle = Vector2.new(10, 10),
    gravity = -2
  })
  
  return smoke
end

-- Magia
local function createMagicEffect(parent, color)
  local magic = createParticleEmitter(parent, {
    name = "Magic",
    texture = "rbxassetid://24187642",
    color = ColorSequence.new(color or Color3.fromRGB(0, 255, 255)),
    size = NumberSequence.new({
      {Time = 0, Value = 0},
      {Time = 0.5, Value = 1},
      {Time = 1, Value = 0}
    }),
    transparency = NumberSequence.new({
      {Time = 0, Value = 1},
      {Time = 0.2, Value = 0},
      {Time = 0.8, Value = 0},
      {Time = 1, Value = 1}
    }),
    rate = 100,
    lifetime = NumberRange.new(0.5, 1),
    speed = NumberRange.new(2, 4),
    spreadAngle = Vector2.new(360, 360),
    rotation = NumberRange.new(0, 360),
    rotSpeed = NumberRange.new(-180, 180),
    lightEmission = 1
  })
  
  return magic
end

-- Explosión
local function createExplosionEffect(parent, position)
  local explosion = Instance.new("Part")
  explosion.Position = position
  explosion.Anchored = true
  explosion.CanCollide = false
  explosion.Transparency = 1
  explosion.Parent = workspace
  
  local emitter = createParticleEmitter(explosion, {
    name = "Explosion",
    texture = "rbxassetid://24187642",
    color = ColorSequence.new(
      Color3.fromRGB(255, 200, 0),
      Color3.fromRGB(255, 100, 0),
      Color3.fromRGB(50, 50, 50)
    ),
    size = NumberSequence.new({
      {Time = 0, Value = 0.5},
      {Time = 1, Value = 3}
    }),
    transparency = NumberSequence.new({
      {Time = 0, Value = 0},
      {Time = 1, Value = 1}
    }),
    rate = 500,
    lifetime = NumberRange.new(1, 1.5),
    speed = NumberRange.new(10, 20),
    spreadAngle = Vector2.new(360, 360)
  })
  
  -- Detener después de 1 segundo
  task.delay(1, function()
    emitter.Enabled = false
    task.wait(2)
    explosion:Destroy()
  end)
  
  return explosion
end

-- Lluvia
local function createRainEffect(parent)
  local rain = createParticleEmitter(parent, {
    name = "Rain",
    texture = "rbxassetid://24187642",
    color = ColorSequence.new(Color3.fromRGB(100, 150, 255)),
    size = NumberSequence.new(0.1),
    transparency = NumberSequence.new(0.5),
    rate = 200,
    lifetime = NumberRange.new(1, 1.5),
    speed = NumberRange.new(20, 30),
    spreadAngle = Vector2.new(10, 10),
    gravity = 100,
    Drag = 0
  })
  
  return rain
end

-- ============================================
-- EJEMPLOS DE USO
-- ============================================

-- Crear una antorcha
local function createTorch(position)
  local part = Instance.new("Part")
  part.Position = position
  part.Size = Vector3.new(1, 4, 1)
  part.Color = Color3.fromRGB(100, 50, 0)
  part.Material = Enum.Material.Wood
  part.Parent = workspace
  
  -- Luz
  local light = Instance.new("PointLight")
  light.Color = Color3.fromRGB(255, 150, 50)
  light.Brightness = 2
  light.Range = 20
  light.Parent = part
  
  -- Fuego
  createFireEffect(part)
  
  -- Humo
  createSmokeEffect(part)
  
  return part
end

-- Crear varita mágica
local function createMagicWand(player)
  local character = player.Character or player.CharacterAdded:Wait()
  local hand = character:FindFirstChild("Right Hand") or character:FindFirstChild("RightGrip")
  
  if not hand then return end
  
  local wand = Instance.new("Part")
  wand.Name = "MagicWand"
  wand.Size = Vector3.new(0.2, 0.2, 1)
  wand.Color = Color3.fromRGB(100, 50, 150)
  wand.Material = Enum.Material.Neon
  wand.Parent = hand
  
  -- Efecto mágico
  createMagicEffect(wand, Color3.fromRGB(0, 255, 255))
  
  return wand
end

print("✨ Sistema de partículas inicializado")`,
  },
  {
    name: "📦 Sistema de Tienda",
    description: "Tienda con compras y inventario",
    difficulty: "advanced",
    code: `-- ============================================
-- SISTEMA DE TIENDA
-- Compras, inventario y transacciones
-- ============================================

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- ============================================
-- CONFIGURACIÓN DE LA TIENDA
-- ============================================

local ShopConfig = {
  Items = {
    -- Consumibles
    ["HealthPotion"] = {
      id = "HealthPotion",
      name = "Poción de Salud",
      description = "Recupera 50 de salud",
      price = 25,
      category = "consumable",
      effect = {type = "heal", value = 50},
      icon = "rbxassetid://0"
    },
    
    ["ManaPotion"] = {
      id = "ManaPotion",
      name = "Poción de Maná",
      description = "Recupera 50 de maná",
      price = 30,
      category = "consumable",
      effect = {type = "mana", value = 50},
      icon = "rbxassetid://0"
    },
    
    -- Armas
    ["SwordIron"] = {
      id = "SwordIron",
      name = "Espada de Hierro",
      description = "Daño: 25",
      price = 500,
      category = "weapon",
      stats = {damage = 25},
      icon = "rbxassetid://0"
    },
    
    ["SwordSteel"] = {
      id = "SwordSteel",
      name = "Espada de Acero",
      description = "Daño: 50",
      price = 1000,
      category = "weapon",
      stats = {damage = 50},
      icon = "rbxassetid://0"
    },
    
    -- Armaduras
    ["ArmorLeather"] = {
      id = "ArmorLeather",
      name = "Armadura de Cuero",
      description = "Defensa: 10",
      price = 300,
      category = "armor",
      stats = {defense = 10},
      icon = "rbxassetid://0"
    },
    
    ["ArmorSteel"] = {
      id = "ArmorSteel",
      name = "Armadura de Acero",
      description = "Defensa: 25",
      price = 750,
      category = "armor",
      stats = {defense = 25},
      icon = "rbxassetid://0"
    },
    
    -- Especiales
    ["SpeedBoost"] = {
      id = "SpeedBoost",
      name = "Botas de Velocidad",
      description = "+20% velocidad por 60s",
      price = 200,
      category = "special",
      effect = {type = "speed", value = 1.2, duration = 60},
      icon = "rbxassetid://0"
    }
  },
  
  Categories = {"all", "consumable", "weapon", "armor", "special"}
}

-- ============================================
-- DATOS DEL JUGADOR
-- ============================================

local PlayerShopData = {}

local function getPlayerShopData(player)
  if not PlayerShopData[player] then
    PlayerShopData[player] = {
      coins = 1000, -- Monedas iniciales
      inventory = {},
      equipped = {}
    }
  end
  return PlayerShopData[player]
end

-- ============================================
-- FUNCIONES DE TIENDA
-- ============================================

function buyItem(player, itemId)
  local shopData = getPlayerShopData(player)
  local item = ShopConfig.Items[itemId]
  
  if not item then
    return false, "Item no existe"
  end
  
  -- Verificar monedas
  if shopData.coins < item.price then
    return false, "Monedas insuficientes"
  end
  
  -- Verificar stack (si es consumible)
  if item.category == "consumable" then
    if not shopData.inventory[itemId] then
      shopData.inventory[itemId] = 0
    end
    shopData.inventory[itemId] = shopData.inventory[itemId] + 1
  else
    -- Items únicos
    if shopData.inventory[itemId] then
      return false, "Ya tienes este item"
    end
    shopData.inventory[itemId] = 1
  end
  
  -- Cobrar
  shopData.coins = shopData.coins - item.price
  
  print("✅ " .. player.Name .. " compró " .. item.name)
  print("💰 Saldo restante: " .. shopData.coins)
  
  return true, "Compra exitosa"
end

function sellItem(player, itemId)
  local shopData = getPlayerShopData(player)
  local item = ShopConfig.Items[itemId]
  
  if not item then
    return false, "Item no existe"
  end
  
  -- Verificar si tiene el item
  if not shopData.inventory[itemId] or shopData.inventory[itemId] <= 0 then
    return false, "No tienes este item"
  end
  
  -- Calcular precio de venta (50% del valor original)
  local sellPrice = math.floor(item.price * 0.5)
  
  -- Remover item y dar monedas
  shopData.inventory[itemId] = shopData.inventory[itemId] - 1
  shopData.coins = shopData.coins + sellPrice
  
  print("💰 " .. player.Name .. " vendió " .. item.name .. " por " .. sellPrice .. " monedas")
  
  return true, "Venta exitosa"
end

function useItem(player, itemId)
  local shopData = getPlayerShopData(player)
  local item = ShopConfig.Items[itemId]
  
  if not item or not shopData.inventory[itemId] or shopData.inventory[itemId] <= 0 then
    return false, "No tienes este item"
  end
  
  if item.category ~= "consumable" and item.category ~= "special" then
    return false, "Este item no se puede usar"
  end
  
  -- Aplicar efecto
  if item.effect then
    if item.effect.type == "heal" then
      -- healPlayer(player, item.effect.value)
      print("💚 Salud recuperada: +" .. item.effect.value)
    elseif item.effect.type == "mana" then
      -- addMana(player, item.effect.value)
      print("💙 Maná recuperado: +" .. item.effect.value)
    elseif item.effect.type == "speed" then
      -- applySpeedBoost(player, item.effect.value, item.effect.duration)
      print("⚡ Velocidad aumentada por " .. item.effect.duration .. "s")
    end
  end
  
  -- Consumir item
  if item.category == "consumable" then
    shopData.inventory[itemId] = shopData.inventory[itemId] - 1
  end
  
  return true, "Item usado"
end

function equipItem(player, itemId)
  local shopData = getPlayerShopData(player)
  local item = ShopConfig.Items[itemId]
  
  if not item or not shopData.inventory[itemId] then
    return false, "No tienes este item"
  end
  
  if item.category == "weapon" or item.category == "armor" then
    -- Desequipar item anterior del mismo tipo
    local oldItem = shopData.equipped[item.category]
    if oldItem then
      shopData.equipped[oldItem] = nil
    end
    
    -- Equipar nuevo item
    shopData.equipped[itemId] = true
    
    print("⚔️ " .. player.Name .. " equipó " .. item.name)
    return true, "Item equipado"
  end
  
  return false, "Este item no se puede equipar"
end

function getInventory(player)
  local shopData = getPlayerShopData(player)
  local inventory = {}
  
  for itemId, amount in pairs(shopData.inventory) do
    if amount > 0 then
      local item = ShopConfig.Items[itemId]
      table.insert(inventory, {
        id = itemId,
        name = item.name,
        amount = amount,
        category = item.category,
        icon = item.icon
      })
    end
  end
  
  return inventory
end

function getShopData(player)
  local shopData = getPlayerShopData(player)
  
  return {
    coins = shopData.coins,
    inventory = getInventory(player),
    equipped = shopData.equipped
  }
end

-- ============================================
-- LISTAR TIENDA
-- ============================================

function listShop(category)
  print("=== TIENDA ===")
  print("")
  
  for _, item in pairs(ShopConfig.Items) do
    if category == nil or category == "all" or item.category == category then
      local icon = "📦"
      if item.category == "weapon" then icon = "⚔️"
      elseif item.category == "armor" then icon = "🛡️"
      elseif item.category == "consumable" then icon = "🧪"
      elseif item.category == "special" then icon = "⭐"
      end
      
      print(string.format("%s %s - %s", icon, item.name, item.description))
      print(string.format("   Precio: %d monedas", item.price))
      print("")
    end
  end
end

-- ============================================
-- EJEMPLOS DE USO
-- ============================================

-- listShop()
-- listShop("weapon")
-- buyItem(player, "HealthPotion")
-- useItem(player, "HealthPotion")
-- equipItem(player, "SwordIron")

print("🏪 Sistema de tienda inicializado")`,
  },
];
