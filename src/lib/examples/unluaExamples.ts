import { ExampleCode } from "@/components/CodeEditor";

export const unluaExamples: ExampleCode[] = [
  {
    name: "🎯 Actor Básico UE5",
    description: "Actor rotatorio con colisión",
    difficulty: "beginner",
    code: `-- ============================================
-- ACTOR ROTATORIO
-- Actor básico en Unreal Engine 5 con UnLua
-- ============================================

local MyRotatingActor = {}

-- Propiedades del actor
MyRotatingActor.RotationSpeed = 45.0
MyRotatingActor.bIsRotating = true

-- ============================================
-- EVENTOS
-- ============================================

function MyRotatingActor:ReceiveBeginPlay()
  -- Se llama cuando el actor comienza
  print("🚀 Actor iniciado: " .. self:GetName())
  
  -- Obtener ubicación inicial
  local location = self:GetActorLocation()
  print("📍 Posición inicial: " .. 
    string.format("(%.2f, %.2f, %.2f)", 
      location.X, location.Y, location.Z))
  
  -- Obtener rotación inicial
  local rotation = self:GetActorRotation()
  print("🔄 Rotación inicial: " .. 
    string.format("(P:%.2f, Y:%.2f, R:%.2f)", 
      rotation.Pitch, rotation.Yaw, rotation.Roll))
end

function MyRotatingActor:ReceiveTick(DeltaTime)
  -- Se llama cada frame
  if not self.bIsRotating then return end
  
  -- Rotar el actor
  local rotation = self:GetActorRotation()
  rotation.Yaw = rotation.Yaw + self.RotationSpeed * DeltaTime
  self:SetActorRotation(rotation)
end

function MyRotatingActor:ReceiveHit(Other, SelfMove, OtherMove, Location, Normal, Impulse)
  -- Se llama cuando hay colisión
  print("💥 ¡Colisión detectada!")
  
  -- Obtener información del otro actor
  if Other and Other:IsValid() then
    print("   Chocó con: " .. Other:GetName())
    print("   Clase: " .. Other:GetClass():GetName())
    
    -- Obtener ubicación del impacto
    print("   Impacto en: " .. 
      string.format("(%.2f, %.2f, %.2f)", 
        Location.X, Location.Y, Location.Z))
  end
end

function MyRotatingActor:ReceiveActorBeginOverlap(Other)
  -- Se llama cuando otro actor comienza a superponerse
  print("📦 Overlap开始: " .. Other:GetName())
end

function MyRotatingActor:ReceiveActorEndOverlap(Other)
  -- Se llama cuando termina la superposición
  print("📦 Overlap结束: " .. Other:GetName())
end

-- ============================================
-- MÉTODOS PÚBLICOS
-- ============================================

function MyRotatingActor:SetRotationSpeed(speed)
  self.RotationSpeed = speed
  print("⚙️ Velocidad de rotación: " .. speed .. " grados/seg")
end

function MyRotatingActor:ToggleRotation()
  self.bIsRotating = not self.bIsRotating
  print("🔄 Rotación: " .. (self.bIsRotating and "ON" or "OFF"))
end

function MyRotatingActor:StopRotation()
  self.bIsRotating = false
end

function MyRotatingActor:StartRotation()
  self.bIsRotating = true
end

return MyRotatingActor`,
  },
  {
    name: "🏃 Character Movement",
    description: "Control de personaje con salto doble",
    difficulty: "intermediate",
    code: `-- ============================================
-- CHARACTER MOVEMENT
-- Control de personaje con salto doble
-- ============================================

local MyCharacter = {}

-- Propiedades
MyCharacter.JumpCount = 0
MyCharacter.MaxJumps = 2
MyCharacter.IsGrounded = false
MyCharacter.MoveSpeed = 600.0
MyCharacter.AirControl = 0.5

-- ============================================
-- INICIALIZACIÓN
-- ============================================

function MyCharacter:ReceiveBeginPlay()
  print("🎮 Character creado: " .. self:GetName())
  
  -- Configurar movimiento
  local movement = self.CharacterMovement
  if movement then
    movement.MaxWalkSpeed = self.MoveSpeed
    movement.JumpZVelocity = 700
    movement.AirControl = self.AirControl
    movement.GroundFriction = 4.0
    movement.BrakingDecelerationWalking = 2048.0
  end
  
  -- Inicializar contador de saltos
  self.JumpCount = 0
end

-- ============================================
-- TICK
-- ============================================

function MyCharacter:ReceiveTick(DeltaTime)
  -- Verificar si está en el suelo
  local movement = self.CharacterMovement
  if movement then
    self.IsGrounded = movement:IsMovingOnGround()
    
    -- Resetear contador de saltos si está en el suelo
    if self.IsGrounded then
      self.JumpCount = 0
    end
  end
end

-- ============================================
-- INPUT
-- ============================================

function MyCharacter:MoveForward(Value)
  if Value == 0 then return end
  
  local controller = self:GetController()
  if not controller then return end
  
  -- Obtener dirección del controlador
  local rotation = controller:GetControlRotation()
  rotation.Pitch = 0
  rotation.Roll = 0
  
  -- Calcular vector forward
  local forward = FRotationMatrix(rotation):GetUnitAxis(1)
  self:AddMovementInput(forward, Value)
end

function MyCharacter:MoveRight(Value)
  if Value == 0 then return end
  
  local controller = self:GetController()
  if not controller then return end
  
  -- Obtener dirección del controlador
  local rotation = controller:GetControlRotation()
  rotation.Pitch = 0
  rotation.Roll = 0
  
  -- Calcular vector right
  local right = FRotationMatrix(rotation):GetUnitAxis(0)
  self:AddMovementInput(right, Value)
end

function MyCharacter:Jump()
  -- Salto múltiple
  if self.JumpCount < self.MaxJumps then
    self:LaunchCharacter(FVector(0, 0, self.CharacterMovement.JumpZVelocity))
    self.JumpCount = self.JumpCount + 1
    
    print("🦘 Salto #" .. self.JumpCount)
    
    -- Efecto de partículas para salto doble
    if self.JumpCount == 2 then
      print("✨ ¡Salto doble activado!")
      -- SpawnParticleEffect(self, "DoubleJumpParticles")
    end
  else
    print("❌ No puedes saltar más")
  end
end

function MyCharacter:Sprint(bWantSprint)
  local movement = self.CharacterMovement
  if not movement then return end
  
  if bWantSprint then
    movement.MaxWalkSpeed = self.MoveSpeed * 1.5
    print("⚡ Sprint: ON")
  else
    movement.MaxWalkSpeed = self.MoveSpeed
    print("🚶 Sprint: OFF")
  end
end

function MyCharacter:Crouch()
  local movement = self.CharacterMovement
  if not movement then return end
  
  if not movement:IsCrouching() then
    movement:StartCrouch(0, 0)
    print("🙇 Crouch: ON")
  else
    movement:EndCrouch(0, 0)
    print("🧍 Crouch: OFF")
  end
end

-- ============================================
-- UTILIDADES
-- ============================================

function MyCharacter:GetVelocity()
  return self:GetVelocity()
end

function MyCharacter:GetSpeed()
  local velocity = self:GetVelocity()
  return math.sqrt(velocity.X^2 + velocity.Y^2)
end

function MyCharacter:IsFalling()
  return self.CharacterMovement:IsFalling()
end

function MyCharacter:IsSwimming()
  return self.CharacterMovement:IsSwimming()
end

return MyCharacter`,
  },
  {
    name: "💀 Enemy AI Básico",
    description: "IA de enemigo con patrulla y persecución",
    difficulty: "advanced",
    code: `-- ============================================
-- ENEMY AI
-- IA con estados: Patrulla, Persecución, Ataque
-- ============================================

local EnemyAI = {}

-- Estados de la IA
EnemyAI.AIState = "Patrol" -- Patrol, Chase, Attack, Idle
EnemyAI.CurrentPatrolIndex = 1
EnemyAI.DetectionRange = 1000.0
EnemyAI.AttackRange = 200.0
EnemyAI.AttackDamage = 25.0
EnemyAI.AttackCooldown = 2.0
EnemyAI.LastAttackTime = 0

-- Puntos de patrulla
EnemyAI.PatrolPoints = {}

-- ============================================
-- INICIALIZACIÓN
-- ============================================

function EnemyAI:ReceiveBeginPlay()
  print("👿 Enemy AI iniciado: " .. self:GetName())
  
  -- Inicializar puntos de patrulla
  self.PatrolPoints = {
    FVector(-500, 0, 0),
    FVector(0, 500, 0),
    FVector(500, 0, 0),
    FVector(0, -500, 0)
  }
  
  self.CurrentPatrolIndex = 1
  self.AIState = "Patrol"
  
  -- Mover al primer punto
  self:MoveToPatrolPoint(1)
end

-- ============================================
-- TICK
-- ============================================

function EnemyAI:ReceiveTick(DeltaTime)
  -- Actualizar IA
  self:UpdateAI(DeltaTime)
  
  -- Debug
  -- UKismetSystemLibrary:PrintString(self, "State: " .. self.AIState)
end

-- ============================================
-- MÁQUINA DE ESTADOS
-- ============================================

function EnemyAI:UpdateAI(DeltaTime)
  local player = self:GetNearestPlayer()
  
  if player then
    local distanceToPlayer = self:GetDistanceTo(player)
    
    if distanceToPlayer <= self.AttackRange then
      -- Cambiar a estado de ataque
      if self.AIState ~= "Attack" then
        self.AIState = "Attack"
        print("⚔️ Estado: ATTACK")
      end
      self:AttackPlayer(player)
      
    elseif distanceToPlayer <= self.DetectionRange then
      -- Cambiar a estado de persecución
      if self.AIState ~= "Chase" then
        self.AIState = "Chase"
        print("🏃 Estado: CHASE")
      end
      self:ChasePlayer(player, DeltaTime)
      
    else
      -- Volver a patrulla si está lejos
      if self.AIState == "Chase" or self.AIState == "Attack" then
        self.AIState = "Patrol"
        print("🔍 Estado: PATROL")
      end
    end
  else
    -- Sin jugador visible, patrullar
    if self.AIState ~= "Patrol" then
      self.AIState = "Patrol"
      print("🔍 Estado: PATROL")
    end
  end
  
  -- Actualizar estado actual
  if self.AIState == "Patrol" then
    self:UpdatePatrol(DeltaTime)
  end
end

-- ============================================
-- ESTADOS
-- ============================================

function EnemyAI:UpdatePatrol(DeltaTime)
  -- Moverse entre puntos de patrulla
  local currentPoint = self.PatrolPoints[self.CurrentPatrolIndex]
  
  if not currentPoint then return end
  
  local currentLocation = self:GetActorLocation()
  local distanceToPoint = currentPoint:Distance(currentLocation)
  
  if distanceToPoint < 100.0 then
    -- Llegó al punto, ir al siguiente
    self.CurrentPatrolIndex = self.CurrentPatrolIndex + 1
    if self.CurrentPatrolIndex > #self.PatrolPoints then
      self.CurrentPatrolIndex = 1
    end
    self:MoveToPatrolPoint(self.CurrentPatrolIndex)
  end
end

function EnemyAI:ChasePlayer(player, DeltaTime)
  if not player then return end
  
  -- Moverse hacia el jugador
  local playerLocation = player:GetActorLocation()
  self:MoveTowards(playerLocation, DeltaTime)
end

function EnemyAI:AttackPlayer(player)
  local currentTime = os.time()
  
  -- Verificar cooldown de ataque
  if currentTime - self.LastAttackTime < self.AttackCooldown then
    return
  end
  
  -- Verificar rango
  local distance = self:GetDistanceTo(player)
  if distance > self.AttackRange then
    return
  end
  
  -- Realizar ataque
  self:PerformAttack(player)
  self.LastAttackTime = currentTime
end

-- ============================================
-- MOVIMIENTO
-- ============================================

function EnemyAI:MoveToPatrolPoint(index)
  local point = self.PatrolPoints[index]
  if not point then return end
  
  print("📍 Moviendo a punto de patrulla " .. index)
  
  -- Usar AI Controller para mover
  local controller = self:GetController()
  if controller then
    controller:MoveToLocation(point, 100.0)
  end
end

function EnemyAI:MoveTowards(targetLocation, DeltaTime)
  local currentLocation = self:GetActorLocation()
  local direction = targetLocation - currentLocation
  direction = direction:GetSafeNormal()
  
  local moveSpeed = 300.0 -- Velocidad de persecución
  local newLocation = currentLocation + direction * moveSpeed * DeltaTime
  
  self:SetActorLocation(newLocation)
end

-- ============================================
-- UTILIDADES
-- ============================================

function EnemyAI:GetNearestPlayer()
  local players = UGameplayStatics:GetAllPlayersOfClass(self, APawn)
  
  local nearestPlayer = nil
  local nearestDistance = self.DetectionRange
  
  for _, player in ipairs(players) do
    local distance = self:GetDistanceTo(player)
    if distance < nearestDistance then
      nearestPlayer = player
      nearestDistance = distance
    end
  end
  
  return nearestPlayer
end

function EnemyAI:GetDistanceTo(other)
  if not other then return math.huge end
  
  local myLocation = self:GetActorLocation()
  local otherLocation = other:GetActorLocation()
  
  return (myLocation - otherLocation):Size()
end

function EnemyAI:PerformAttack(player)
  print("⚔️ ¡ATACANDO a " .. player:GetName() .. "!")
  
  -- Aplicar daño
  if player and player.ReceiveDamage then
    player:ReceiveDamage(self.AttackDamage)
  end
  
  -- Animación de ataque
  -- self:PlayAnimation("Attack")
  
  -- Sonido de ataque
  -- UGameplayStatics:PlaySoundAtLocation(self, AttackSound, self:GetActorLocation())
end

function EnemyAI:ReceiveDamage(Damage)
  print("💥 " .. self:GetName() .. " recibió " .. Damage .. " de daño")
  
  -- TODO: Implementar sistema de salud
  -- self.Health = self.Health - Damage
  
  -- if self.Health <= 0 then
  --   self:Die()
  -- end
end

function EnemyAI:Die()
  print("💀 " .. self:GetName() .. " ha muerto")
  
  -- Spawn loot
  -- self:SpawnLoot()
  
  -- Destroy actor
  -- self:Destroy()
end

return EnemyAI`,
  },
  {
    name: "📦 Sistema de Inventario UE5",
    description: "Inventario con slots y items",
    difficulty: "advanced",
    code: `-- ============================================
-- SISTEMA DE INVENTARIO
-- Gestión de items con slots
-- ============================================

local InventorySystem = {}

-- Configuración
InventorySystem.MaxSlots = 20
InventorySystem.Slots = {}
InventorySystem.Gold = 0

-- ============================================
-- DEFINICIÓN DE ITEMS
-- ============================================

InventorySystem.ItemDefinitions = {
  -- Consumibles
  ["HealthPotion"] = {
    Id = "HealthPotion",
    Name = "Poción de Salud",
    Type = "Consumable",
    Rarity = "Common",
    MaxStack = 99,
    Description = "Recupera 50 de salud",
    Icon = "/Game/Icons/HealthPotion",
    Effect = {Type = "Heal", Value = 50}
  },
  
  ["ManaPotion"] = {
    Id = "ManaPotion",
    Name = "Poción de Maná",
    Type = "Consumable",
    Rarity = "Common",
    MaxStack = 99,
    Description = "Recupera 50 de maná",
    Icon = "/Game/Icons/ManaPotion"
  },
  
  -- Armas
  ["SwordIron"] = {
    Id = "SwordIron",
    Name = "Espada de Hierro",
    Type = "Weapon",
    SubType = "Sword",
    Rarity = "Common",
    MaxStack = 1,
    Damage = 25,
    AttackSpeed = 1.2,
    Description = "Una espada básica de hierro",
    Icon = "/Game/Icons/SwordIron"
  },
  
  ["SwordSteel"] = {
    Id = "SwordSteel",
    Name = "Espada de Acero",
    Type = "Weapon",
    SubType = "Sword",
    Rarity = "Uncommon",
    MaxStack = 1,
    Damage = 50,
    AttackSpeed = 1.3,
    Description = "Una espada afilada de acero",
    Icon = "/Game/Icons/SwordSteel"
  },
  
  ["AxeBattle"] = {
    Id = "AxeBattle",
    Name = "Hacha de Batalla",
    Type = "Weapon",
    SubType = "Axe",
    Rarity = "Rare",
    MaxStack = 1,
    Damage = 75,
    AttackSpeed = 0.8,
    Description = "Un hacha poderosa de dos manos",
    Icon = "/Game/Icons/AxeBattle"
  },
  
  -- Armaduras
  ["HelmetIron"] = {
    Id = "HelmetIron",
    Name = "Yelmo de Hierro",
    Type = "Armor",
    SubType = "Head",
    Rarity = "Common",
    MaxStack = 1,
    Defense = 10,
    Description = "Protección básica para la cabeza",
    Icon = "/Game/Icons/HelmetIron"
  },
  
  ["ChestplateSteel"] = {
    Id = "ChestplateSteel",
    Name = "Coraza de Acero",
    Type = "Armor",
    SubType = "Chest",
    Rarity = "Uncommon",
    MaxStack = 1,
    Defense = 35,
    Description = "Armadura robusta para el torso",
    Icon = "/Game/Icons/ChestplateSteel"
  },
  
  -- Materiales
  ["IronOre"] = {
    Id = "IronOre",
    Name = "Mineral de Hierro",
    Type = "Material",
    Rarity = "Common",
    MaxStack = 999,
    Description = "Mineral bruto de hierro",
    Icon = "/Game/Icons/IronOre"
  },
  
  ["GoldIngot"] = {
    Id = "GoldIngot",
    Name = "Lingote de Oro",
    Type = "Material",
    Rarity = "Uncommon",
    MaxStack = 999,
    Description = "Lingote refinado de oro",
    Icon = "/Game/Icons/GoldIngot"
  }
}

-- ============================================
-- INICIALIZACIÓN
-- ============================================

function InventorySystem:Initialize()
  -- Crear slots vacíos
  for i = 1, self.MaxSlots do
    self.Slots[i] = {
      ItemId = nil,
      Quantity = 0,
      bSelected = false
    }
  end
  
  self.Gold = 100 -- Oro inicial
  
  print("🎒 Sistema de inventario inicializado (" .. self.MaxSlots .. " slots)")
end

-- ============================================
-- GESTIÓN DE ITEMS
-- ============================================

function InventorySystem:AddItem(itemId, quantity)
  local itemDef = self.ItemDefinitions[itemId]
  
  if not itemDef then
    print("❌ Item no existe: " .. tostring(itemId))
    return false
  end
  
  quantity = quantity or 1
  
  -- Si es único (MaxStack = 1), verificar si ya lo tiene
  if itemDef.MaxStack == 1 then
    for i, slot in ipairs(self.Slots) do
      if slot.ItemId == itemId then
        print("⚠️ Ya tienes este item: " .. itemDef.Name)
        return false
      end
    end
  end
  
  -- Intentar stackear con items existentes
  if itemDef.MaxStack > 1 then
    for i, slot in ipairs(self.Slots) do
      if slot.ItemId == itemId and slot.Quantity < itemDef.MaxStack then
        local spaceLeft = itemDef.MaxStack - slot.Quantity
        local amountToAdd = math.min(quantity, spaceLeft)
        
        slot.Quantity = slot.Quantity + amountToAdd
        quantity = quantity - amountToAdd
        
        print("✅ Stackeado " .. amountToAdd .. "x " .. itemDef.Name)
        
        if quantity <= 0 then
          return true
        end
      end
    end
  end
  
  -- Buscar slot vacío
  for i, slot in ipairs(self.Slots) do
    if not slot.ItemId then
      slot.ItemId = itemId
      slot.Quantity = quantity
      print("✅ Item agregado: " .. itemDef.Name .. " x" .. quantity)
      return true
    end
  end
  
  print("❌ Inventario lleno")
  return false
end

function InventorySystem:RemoveItem(itemId, quantity)
  quantity = quantity or 1
  
  for i, slot in ipairs(self.Slots) do
    if slot.ItemId == itemId then
      if slot.Quantity >= quantity then
        slot.Quantity = slot.Quantity - quantity
        
        if slot.Quantity <= 0 then
          slot.ItemId = nil
          slot.Quantity = 0
        end
        
        print("✅ Item removido: " .. itemId .. " x" .. quantity)
        return true
      end
    end
  end
  
  print("❌ No tienes suficiente: " .. itemId)
  return false
end

function InventorySystem:HasItem(itemId, quantity)
  quantity = quantity or 1
  
  for i, slot in ipairs(self.Slots) do
    if slot.ItemId == itemId and slot.Quantity >= quantity then
      return true
    end
  end
  
  return false
end

function InventorySystem:GetItemCount(itemId)
  local count = 0
  
  for i, slot in ipairs(self.Slots) do
    if slot.ItemId == itemId then
      count = count + slot.Quantity
    end
  end
  
  return count
end

-- ============================================
-- EQUIPAMIENTO
-- ============================================

InventorySystem.Equipment = {
  Head = nil,
  Chest = nil,
  MainHand = nil,
  OffHand = nil
}

function InventorySystem:EquipItem(slotIndex)
  local slot = self.Slots[slotIndex]
  
  if not slot or not slot.ItemId then
    print("❌ Slot vacío")
    return false
  end
  
  local itemDef = self.ItemDefinitions[slot.ItemId]
  
  if itemDef.Type == "Weapon" then
    self.Equipment.MainHand = slot.ItemId
    print("⚔️ Equipado: " .. itemDef.Name)
    
  elseif itemDef.Type == "Armor" then
    if itemDef.SubType == "Head" then
      self.Equipment.Head = slot.ItemId
    elseif itemDef.SubType == "Chest" then
      self.Equipment.Chest = slot.ItemId
    end
    print("🛡️ Equipado: " .. itemDef.Name)
    
  else
    print("⚠️ Este item no se puede equipar")
    return false
  end
  
  return true
end

function InventorySystem:UnequipItem(equipmentSlot)
  if self.Equipment[equipmentSlot] then
    local itemId = self.Equipment[equipmentSlot]
    self.Equipment[equipmentSlot] = nil
    print("📤 Desequipado: " .. itemId)
    return true
  end
  
  return false
end

-- ============================================
-- UTILIDADES
-- ============================================

function InventorySystem:GetInventoryList()
  local items = {}
  
  for i, slot in ipairs(self.Slots) do
    if slot.ItemId then
      local itemDef = self.ItemDefinitions[slot.ItemId]
      table.insert(items, {
        Slot = i,
        Id = slot.ItemId,
        Name = itemDef.Name,
        Quantity = slot.Quantity,
        Type = itemDef.Type,
        Rarity = itemDef.Rarity
      })
    end
  end
  
  return items
end

function InventorySystem:PrintInventory()
  print("=== INVENTARIO ===")
  print("💰 Oro: " .. self.Gold)
  print("")
  
  local hasItems = false
  
  for i, slot in ipairs(self.Slots) do
    if slot.ItemId then
      hasItems = true
      local itemDef = self.ItemDefinitions[slot.ItemId]
      local rarityIcon = "⚪"
      
      if itemDef.Rarity == "Common" then rarityIcon = "⚪"
      elseif itemDef.Rarity == "Uncommon" then rarityIcon = "🟢"
      elseif itemDef.Rarity == "Rare" then rarityIcon = "🔵"
      elseif itemDef.Rarity == "Epic" then rarityIcon = "🟣"
      elseif itemDef.Rarity == "Legendary" then rarityIcon = "🟠"
      end
      
      print(string.format("[%2d] %s %s x%d", 
        i, rarityIcon, itemDef.Name, slot.Quantity))
    end
  end
  
  if not hasItems then
    print("(vacío)")
  end
  
  print("")
  print("=== EQUIPAMIENTO ===")
  
  for slot, itemId in pairs(self.Equipment) do
    if itemId then
      local itemDef = self.ItemDefinitions[itemId]
      print("  " .. slot .. ": " .. itemDef.Name)
    end
  end
end

-- ============================================
-- EJEMPLO DE USO
-- ============================================

-- InventorySystem:Initialize()
-- InventorySystem:AddItem("HealthPotion", 5)
-- InventorySystem:AddItem("SwordIron", 1)
-- InventorySystem:AddItem("IronOre", 50)
-- InventorySystem:PrintInventory()

return InventorySystem`,
  },
  {
    name: "🎮 Widget UI Básico",
    description: "Interfaz de usuario con UMG",
    difficulty: "intermediate",
    code: `-- ============================================
-- WIDGET UI BÁSICO
-- Interfaz de usuario con UMG
-- ============================================

local MyHUDWidget = {}

-- Propiedades del widget
MyHUDWidget.CurrentHealth = 100
MyHUDWidget.MaxHealth = 100
MyHUDWidget.CurrentMana = 50
MyHUDWidget.MaxMana = 100
MyHUDWidget.Gold = 0
MyHUDWidget.Experience = 0
MyHUDWidget.Level = 1

-- ============================================
-- CONSTRUCCIÓN
-- ============================================

function MyHUDWidget:Construct()
  print("🎨 Construyendo HUD...")
  
  -- Obtener referencias a widgets (asumiendo que existen en el blueprint)
  self.HealthBar = self:GetWidgetFromName("HealthBar")
  self.ManaBar = self:GetWidgetFromName("ManaBar")
  self.ExpBar = self:GetWidgetFromName("ExpBar")
  
  self.HealthText = self:GetWidgetFromName("HealthText")
  self.ManaText = self:GetWidgetFromName("ManaText")
  self.GoldText = self:GetWidgetFromName("GoldText")
  self.LevelText = self:GetWidgetFromName("LevelText")
  
  -- Inicializar UI
  self:UpdateAll()
  
  print("✅ HUD listo")
end

-- ============================================
-- ACTUALIZACIÓN
-- ============================================

function MyHUDWidget:UpdateAll()
  self:UpdateHealth()
  self:UpdateMana()
  self:UpdateGold()
  self:UpdateExperience()
  self:UpdateLevel()
end

function MyHUDWidget:UpdateHealth()
  local percent = self.CurrentHealth / self.MaxHealth
  
  -- Actualizar barra
  if self.HealthBar then
    self.HealthBar:SetPercent(percent)
  end
  
  -- Actualizar texto
  if self.HealthText then
    self.HealthText:SetText(
      string.format("%d / %d", self.CurrentHealth, self.MaxHealth)
    )
  end
  
  -- Cambiar color según salud
  if self.HealthBar then
    local color = self:GetHealthColor(percent)
    self.HealthBar:SetFillColorAndOpacity(color)
  end
end

function MyHUDWidget:UpdateMana()
  local percent = self.CurrentMana / self.MaxMana
  
  if self.ManaBar then
    self.ManaBar:SetPercent(percent)
  end
  
  if self.ManaText then
    self.ManaText:SetText(
      string.format("%d / %d", self.CurrentMana, self.MaxMana)
    )
  end
end

function MyHUDWidget:UpdateGold()
  if self.GoldText then
    self.GoldText:SetText("💰 " .. self.Gold)
  end
end

function MyHUDWidget:UpdateExperience()
  local expNeeded = self:GetExpNeededForLevel()
  local percent = self.Experience / expNeeded
  
  if self.ExpBar then
    self.ExpBar:SetPercent(percent)
  end
end

function MyHUDWidget:UpdateLevel()
  if self.LevelText then
    self.LevelText:SetText("Nivel " .. self.Level)
  end
end

-- ============================================
-- MÉTODOS DE UTILIDAD
-- ============================================

function MyHUDWidget:GetHealthColor(percent)
  if percent < 0.25 then
    return FLinearColor(1, 0, 0, 1) -- Rojo
  elseif percent < 0.5 then
    return FLinearColor(1, 1, 0, 1) -- Amarillo
  else
    return FLinearColor(0, 1, 0, 1) -- Verde
  end
end

function MyHUDWidget:GetExpNeededForLevel()
  return self.Level * 100
end

-- ============================================
-- CAMBIOS DE ESTADO
-- ============================================

function MyHUDWidget:TakeDamage(amount)
  self.CurrentHealth = math.max(0, self.CurrentHealth - amount)
  self:UpdateHealth()
  
  -- Efecto de daño (flash rojo)
  self:PlayDamageEffect()
  
  if self.CurrentHealth <= 0 then
    self:OnDeath()
  end
end

function MyHUDWidget:Heal(amount)
  local oldHealth = self.CurrentHealth
  self.CurrentHealth = math.min(self.MaxHealth, self.CurrentHealth + amount)
  self:UpdateHealth()
  
  local healed = self.CurrentHealth - oldHealth
  print("💚 Curado: +" .. healed .. " HP")
end

function MyHUDWidget:UseMana(amount)
  if self.CurrentMana >= amount then
    self.CurrentMana = self.CurrentMana - amount
    self:UpdateMana()
    return true
  end
  
  print("❌ Maná insuficiente")
  return false
end

function MyHUDWidget:GainExperience(amount)
  self.Experience = self.Experience + amount
  
  local expNeeded = self:GetExpNeededForLevel()
  
  if self.Experience >= expNeeded then
    self:LevelUp()
  end
  
  self:UpdateExperience()
end

function MyHUDWidget:LevelUp()
  self.Level = self.Level + 1
  self.Experience = 0
  self.MaxHealth = self.MaxHealth + 20
  self.CurrentHealth = self.MaxHealth
  self.MaxMana = self.MaxMana + 10
  self.CurrentMana = self.MaxMana
  
  self:UpdateAll()
  
  print("🎉 ¡SUBIDA DE NIVEL! Ahora eres nivel " .. self.Level)
  
  -- Mostrar notificación
  self:ShowLevelUpNotification()
end

function MyHUDWidget:AddGold(amount)
  self.Gold = self.Gold + amount
  self:UpdateGold()
  
  print("💰 +" .. amount .. " oro (Total: " .. self.Gold .. ")")
end

function MyHUDWidget:SpendGold(amount)
  if self.Gold >= amount then
    self.Gold = self.Gold - amount
    self:UpdateGold()
    return true
  end
  
  print("❌ Oro insuficiente")
  return false
end

-- ============================================
-- EFECTOS
-- ============================================

function MyHUDWidget:PlayDamageEffect()
  -- Animación de flash rojo
  print("💥 ¡Daño recibido!")
  
  -- TODO: Implementar animación
  -- self.HealthBar:PlayAnimation("DamageFlash")
end

function MyHUDWidget:ShowLevelUpNotification()
  print("✨ Notificación de nivel")
  
  -- TODO: Mostrar widget de notificación
  -- self.LevelUpNotification:SetVisibility(ESlateVisibility.Visible)
end

-- ============================================
-- EVENTOS
-- ============================================

function MyHUDWidget:OnDeath()
  print("💀 HAS MUERTO")
  
  -- Mostrar pantalla de muerte
  -- self.DeathScreen:SetVisibility(ESlateVisibility.Visible)
end

return MyHUDWidget`,
  },
];
