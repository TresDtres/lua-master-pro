import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 4: Sistemas de Juego - Inventario y Stats
// ============================================
// Basado en el plan de estudio:
// Semana 1: Arquitectura de datos - DataAssets, DataTables de UE5
// Semana 2: Sistema de inventario - Item class, contenedores, reglas de negocio
// Semana 3: Sistema de stats - cálculos, modificadores, buffs/debuffs
// Semana 4: SaveGame - serializar/deserializar estado de juego
// ============================================
// Entregable del mes: Sistema RPG Base con inventario (20 slots), 
// 6 estadísticas de personaje, y guardado/cargado de partida
// ============================================

export const mes04Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: Arquitectura de Datos (Semana 1)
  // ============================================
  {
    id: "mes-04-leccion-1-ej-1",
    lessonId: "l4-1-data",
    title: "Crear Tabla de Datos de Items",
    instructions: 'Crea una tabla Lua que represente una base de datos de items.\n\n**Requisitos:**\n- Crea una tabla `ItemDatabase` con al menos 3 items\n- Cada item debe tener: id, name, type, value, weight\n- Los tipos pueden ser: "weapon", "armor", "consumable"\n- Usa IDs únicos como "sword_iron", "potion_health"\n\n**Pista:** Las tablas Lua son perfectas para almacenar datos estructurados',
    starterCode: '-- Crea la base de datos de items aquí\nlocal ItemDatabase = {\n  \n}\n\nreturn ItemDatabase',
    solution: 'local ItemDatabase = {\n  sword_iron = {\n    id = "sword_iron",\n    name = "Espada de Hierro",\n    type = "weapon",\n    value = 50,\n    weight = 3.5\n  },\n  potion_health = {\n    id = "potion_health",\n    name = "Poción de Salud",\n    type = "consumable",\n    value = 10,\n    weight = 0.5\n  },\n  armor_leather = {\n    id = "armor_leather",\n    name = "Armadura de Cuero",\n    type = "armor",\n    value = 30,\n    weight = 2.0\n  }\n}\n\nreturn ItemDatabase',
    tests: [
      { type: "code_contains", expected: "ItemDatabase", message: "Debes crear la tabla ItemDatabase" },
      { type: "code_contains", expected: "id", message: "Cada item debe tener un id" },
      { type: "code_contains", expected: "name", message: "Cada item debe tener un name" },
      { type: "code_contains", expected: "type", message: "Cada item debe tener un type" },
      { type: "code_contains", expected: "value", message: "Cada item debe tener un value" },
      { type: "code_contains", expected: "weight", message: "Cada item debe tener un weight" },
    ],
    hints: [
      "Cada item es una tabla anidada dentro de ItemDatabase",
      "Usa IDs descriptivos como sword_iron, potion_health",
      "Los tipos válidos son: weapon, armor, consumable",
    ],
    difficulty: "beginner",
    xpReward: 40,
  },
  {
    id: "mes-04-leccion-1-ej-2",
    lessonId: "l4-1-data",
    title: "Función para Buscar Item por ID",
    instructions: 'Crea una función que busque un item en la base de datos por su ID.\n\n**Requisitos:**\n- La función `GetItem` debe recibir `itemId` (string)\n- Debe retornar el item si existe, o nil si no existe\n- Si no existe, debe imprimir "Item no encontrado: [id]"\n- Si existe, debe imprimir "Item encontrado: [name]"\n\n**Pista:** Usa ItemDatabase[itemId] para acceder',
    starterCode: 'local ItemDatabase = {\n  sword_iron = {\n    id = "sword_iron",\n    name = "Espada de Hierro",\n    type = "weapon"\n  }\n}\n\nfunction GetItem(itemId)\n  -- Busca y retorna el item\nend\n\nreturn GetItem',
    solution: 'local ItemDatabase = {\n  sword_iron = {\n    id = "sword_iron",\n    name = "Espada de Hierro",\n    type = "weapon"\n  }\n}\n\nfunction GetItem(itemId)\n  local item = ItemDatabase[itemId]\n  \n  if item then\n    print("Item encontrado: " .. item.name)\n    return item\n  else\n    print("Item no encontrado: " .. itemId)\n    return nil\n  end\nend\n\nreturn GetItem',
    tests: [
      { type: "code_contains", expected: "function GetItem", message: "Debes definir GetItem" },
      { type: "code_contains", expected: "ItemDatabase[itemId]", message: "Debes acceder a la base de datos" },
      { type: "code_contains", expected: "if item then", message: "Debes verificar si el item existe" },
      { type: "code_contains", expected: "return", message: "Debes retornar el item" },
    ],
    hints: [
      "Accede con ItemDatabase[itemId] como una tabla normal",
      "Verifica si el item existe con if item then",
      "Retorna nil si no existe",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-04-leccion-1-ej-3",
    lessonId: "l4-1-data",
    title: "Filtrar Items por Tipo",
    instructions: 'Crea una función que filtre todos los items de un tipo específico.\n\n**Requisitos:**\n- La función `GetItemsByType` debe recibir `itemType` (string)\n- Debe iterar sobre todos los items de ItemDatabase\n- Debe retornar una tabla con todos los items del tipo especificado\n- Imprime cuántos items encontró del tipo\n\n**Pista:** Usa pairs() para iterar sobre la tabla',
    starterCode: 'local ItemDatabase = {\n  sword_iron = { type = "weapon", name = "Espada" },\n  potion_health = { type = "consumable", name = "Poción" },\n  armor_leather = { type = "armor", name = "Cuero" }\n}\n\nfunction GetItemsByType(itemType)\n  -- Filtra items por tipo\nend\n\nreturn GetItemsByType',
    solution: 'local ItemDatabase = {\n  sword_iron = { type = "weapon", name = "Espada" },\n  potion_health = { type = "consumable", name = "Poción" },\n  armor_leather = { type = "armor", name = "Cuero" }\n}\n\nfunction GetItemsByType(itemType)\n  local results = {}\n  \n  for id, item in pairs(ItemDatabase) do\n    if item.type == itemType then\n      table.insert(results, item)\n    end\n  end\n  \n  print("Encontrados " .. #results .. " items de tipo: " .. itemType)\n  return results\nend\n\nreturn GetItemsByType',
    tests: [
      { type: "code_contains", expected: "function GetItemsByType", message: "Debes definir GetItemsByType" },
      { type: "code_contains", expected: "pairs(ItemDatabase)", message: "Debes iterar con pairs" },
      { type: "code_contains", expected: "table.insert", message: "Debes insertar en la tabla results" },
      { type: "code_contains", expected: "item.type == itemType", message: "Debes filtrar por tipo" },
    ],
    hints: [
      "Crea una tabla vacía results = {}",
      "Itera con for id, item in pairs(ItemDatabase)",
      "Verifica item.type == itemType",
      "Usa table.insert(results, item) para agregar",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },

  // ============================================
  // LECCIÓN 2: Sistema de Inventario (Semana 2)
  // ============================================
  {
    id: "mes-04-leccion-2-ej-1",
    lessonId: "l4-2-inventory",
    title: "Crear Sistema de Inventario Básico",
    instructions: 'Crea un sistema de inventario con 20 slots.\n\n**Requisitos:**\n- Crea una clase `Inventory` con una tabla `slots` de 20 slots\n- Cada slot debe ser nil (vacío) inicialmente\n- Implementa `Inventory:AddItem(item, slotIndex)`\n- Implementa `Inventory:RemoveItem(slotIndex)`\n- Implementa `Inventory:GetItem(slotIndex)`\n\n**Pista:** Los slots vacíos son nil, los ocupados tienen el item',
    starterCode: 'local Inventory = {}\nInventory.__index = Inventory\n\nfunction Inventory:new()\n  local self = setmetatable({}, Inventory)\n  -- Inicializa 20 slots vacíos\n  return self\nend\n\nfunction Inventory:AddItem(item, slotIndex)\n  -- Añade item al slot\nend\n\nfunction Inventory:RemoveItem(slotIndex)\n  -- Remueve item del slot\nend\n\nfunction Inventory:GetItem(slotIndex)\n  -- Retorna item del slot\nend\n\nreturn Inventory',
    solution: 'local Inventory = {}\nInventory.__index = Inventory\n\nfunction Inventory:new()\n  local self = setmetatable({}, Inventory)\n  self.slots = {}\n  for i = 1, 20 do\n    self.slots[i] = nil\n  end\n  return self\nend\n\nfunction Inventory:AddItem(item, slotIndex)\n  if slotIndex >= 1 and slotIndex <= 20 then\n    self.slots[slotIndex] = item\n    print("Item añadido en slot " .. slotIndex)\n  end\nend\n\nfunction Inventory:RemoveItem(slotIndex)\n  if slotIndex >= 1 and slotIndex <= 20 then\n    local item = self.slots[slotIndex]\n    self.slots[slotIndex] = nil\n    print("Item removido del slot " .. slotIndex)\n    return item\n  end\nend\n\nfunction Inventory:GetItem(slotIndex)\n  if slotIndex >= 1 and slotIndex <= 20 then\n    return self.slots[slotIndex]\n  end\n  return nil\nend\n\nreturn Inventory',
    tests: [
      { type: "code_contains", expected: "self.slots", message: "Debes crear la tabla slots" },
      { type: "code_contains", expected: "for i = 1, 20", message: "Debes inicializar 20 slots" },
      { type: "code_contains", expected: "AddItem", message: "Debes implementar AddItem" },
      { type: "code_contains", expected: "RemoveItem", message: "Debes implementar RemoveItem" },
      { type: "code_contains", expected: "GetItem", message: "Debes implementar GetItem" },
    ],
    hints: [
      "Inicializa self.slots como tabla vacía",
      "Usa un for loop para crear 20 slots nil",
      "Verifica que slotIndex esté entre 1 y 20",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-04-leccion-2-ej-2",
    lessonId: "l4-2-inventory",
    title: "Sistema de Stack de Items",
    instructions: 'Mejora el inventario para soportar stack de items (múltiples cantidades).\n\n**Requisitos:**\n- AddItem debe recibir `item` y `quantity` (cantidad)\n- Si el item ya existe en un slot, suma la cantidad\n- Si no existe, crea un nuevo slot con {item = item, quantity = quantity}\n- Implementa `Inventory:HasItem(itemId, quantity)` para verificar si tienes suficientes\n\n**Pista:** Cada slot ahora tiene {item, quantity}',
    starterCode: 'local Inventory = {}\nInventory.__index = Inventory\n\nfunction Inventory:new()\n  local self = setmetatable({}, Inventory)\n  self.slots = {}\n  return self\nend\n\nfunction Inventory:AddItem(item, quantity)\n  -- Añade item con cantidad, hace stack si existe\nend\n\nfunction Inventory:HasItem(itemId, quantity)\n  -- Verifica si tienes suficiente cantidad del item\nend\n\nreturn Inventory',
    solution: 'local Inventory = {}\nInventory.__index = Inventory\n\nfunction Inventory:new()\n  local self = setmetatable({}, Inventory)\n  self.slots = {}\n  return self\nend\n\nfunction Inventory:AddItem(item, quantity)\n  -- Busca si ya existe el item\n  for _, slot in ipairs(self.slots) do\n    if slot and slot.item.id == item.id then\n      slot.quantity = slot.quantity + quantity\n      print("Stackeado " .. quantity .. "x " .. item.name)\n      return\n    end\n  end\n  \n  -- Si no existe, crea nuevo slot\n  table.insert(self.slots, {item = item, quantity = quantity})\n  print("Añadido " .. quantity .. "x " .. item.name)\nend\n\nfunction Inventory:HasItem(itemId, quantity)\n  local total = 0\n  for _, slot in ipairs(self.slots) do\n    if slot and slot.item.id == itemId then\n      total = total + slot.quantity\n    end\n  end\n  return total >= quantity\nend\n\nreturn Inventory',
    tests: [
      { type: "code_contains", expected: "quantity", message: "Debes manejar cantidad" },
      { type: "code_contains", expected: "slot.quantity", message: "Debes acumular cantidad en slots" },
      { type: "code_contains", expected: "HasItem", message: "Debes implementar HasItem" },
      { type: "code_contains", expected: "item.id", message: "Debes verificar por ID de item" },
    ],
    hints: [
      "Itera sobre self.slots para buscar el item",
      "Si existe, suma quantity: slot.quantity = slot.quantity + quantity",
      "Si no existe, inserta nuevo slot: {item = item, quantity = quantity}",
      "HasItem suma todas las cantidades del item",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-04-leccion-2-ej-3",
    lessonId: "l4-2-inventory",
    title: "Calcular Peso Total del Inventario",
    instructions: 'Implementa una función que calcule el peso total del inventario.\n\n**Requisitos:**\n- `Inventory:GetTotalWeight()` debe iterar sobre todos los slots\n- Debe multiplicar item.weight * quantity para cada slot\n- Debe retornar el peso total acumulado\n- Imprime el peso total al final\n\n**Pista:** weight * quantity da el peso total de ese stack',
    starterCode: 'local Inventory = {}\nInventory.__index = Inventory\n\nfunction Inventory:new()\n  local self = setmetatable({}, Inventory)\n  self.slots = {}\n  return self\nend\n\nfunction Inventory:GetTotalWeight()\n  -- Calcula y retorna el peso total\nend\n\nreturn Inventory',
    solution: 'local Inventory = {}\nInventory.__index = Inventory\n\nfunction Inventory:new()\n  local self = setmetatable({}, Inventory)\n  self.slots = {}\n  return self\nend\n\nfunction Inventory:GetTotalWeight()\n  local totalWeight = 0\n  \n  for _, slot in ipairs(self.slots) do\n    if slot and slot.item then\n      local slotWeight = slot.item.weight * slot.quantity\n      totalWeight = totalWeight + slotWeight\n    end\n  end\n  \n  print("Peso total: " .. totalWeight)\n  return totalWeight\nend\n\nreturn Inventory',
    tests: [
      { type: "code_contains", expected: "GetTotalWeight", message: "Debes definir GetTotalWeight" },
      { type: "code_contains", expected: "totalWeight", message: "Debes acumular el peso" },
      { type: "code_contains", expected: "slot.item.weight", message: "Debes acceder al peso del item" },
      { type: "code_contains", expected: "slot.quantity", message: "Debes multiplicar por la cantidad" },
    ],
    hints: [
      "Inicializa totalWeight = 0",
      "Itera sobre self.slots con ipairs",
      "Multiplica: slot.item.weight * slot.quantity",
      "Suma al total: totalWeight = totalWeight + slotWeight",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },

  // ============================================
  // LECCIÓN 3: Sistema de Stats (Semana 3)
  // ============================================
  {
    id: "mes-04-leccion-3-ej-1",
    lessonId: "l4-3-stats",
    title: "Crear Sistema de Estadísticas de Personaje",
    instructions: 'Crea un sistema de 6 estadísticas básicas de personaje RPG.\n\n**Requisitos:**\n- Crea una clase `CharacterStats` con 6 stats: Strength, Dexterity, Intelligence, Vitality, Agility, Luck\n- Cada stat debe tener un valor base (inicia en 10)\n- Implementa `SetStat(statName, value)` para establecer un valor\n- Implementa `GetStat(statName)` para obtener un valor\n- Implementa `GetAllStats()` que retorne todas las stats\n\n**Pista:** Usa una tabla para almacenar las stats',
    starterCode: 'local CharacterStats = {}\nCharacterStats.__index = CharacterStats\n\nfunction CharacterStats:new()\n  local self = setmetatable({}, CharacterStats)\n  -- Inicializa las 6 stats con valor base 10\n  return self\nend\n\nfunction CharacterStats:SetStat(statName, value)\n  -- Establece el valor de una stat\nend\n\nfunction CharacterStats:GetStat(statName)\n  -- Retorna el valor de una stat\nend\n\nfunction CharacterStats:GetAllStats()\n  -- Retorna todas las stats\nend\n\nreturn CharacterStats',
    solution: 'local CharacterStats = {}\nCharacterStats.__index = CharacterStats\n\nfunction CharacterStats:new()\n  local self = setmetatable({}, CharacterStats)\n  self.stats = {\n    Strength = 10,\n    Dexterity = 10,\n    Intelligence = 10,\n    Vitality = 10,\n    Agility = 10,\n    Luck = 10\n  }\n  return self\nend\n\nfunction CharacterStats:SetStat(statName, value)\n  if self.stats[statName] then\n    self.stats[statName] = value\n    print(statName .. " establecido a " .. value)\n  else\n    print("Stat inválida: " .. statName)\n  end\nend\n\nfunction CharacterStats:GetStat(statName)\n  return self.stats[statName]\nend\n\nfunction CharacterStats:GetAllStats()\n  return self.stats\nend\n\nreturn CharacterStats',
    tests: [
      { type: "code_contains", expected: "Strength", message: "Debes tener stat Strength" },
      { type: "code_contains", expected: "Dexterity", message: "Debes tener stat Dexterity" },
      { type: "code_contains", expected: "Intelligence", message: "Debes tener stat Intelligence" },
      { type: "code_contains", expected: "Vitality", message: "Debes tener stat Vitality" },
      { type: "code_contains", expected: "Agility", message: "Debes tener stat Agility" },
      { type: "code_contains", expected: "Luck", message: "Debes tener stat Luck" },
      { type: "code_contains", expected: "SetStat", message: "Debes implementar SetStat" },
      { type: "code_contains", expected: "GetStat", message: "Debes implementar GetStat" },
    ],
    hints: [
      "Las 6 stats son: Strength, Dexterity, Intelligence, Vitality, Agility, Luck",
      "Almacénalas en una tabla self.stats",
      "Verifica que statName existe antes de establecer",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-04-leccion-3-ej-2",
    lessonId: "l4-3-stats",
    title: "Sistema de Modificadores y Buffs",
    instructions: 'Añade sistema de modificadores temporales (buffs/debuffs) a las stats.\n\n**Requisitos:**\n- `AddModifier(statName, modifierName, value, duration)` añade un modificador temporal\n- `RemoveModifier(statName, modifierName)` remueve un modificador\n- `GetModifiedStat(statName)` retorna el valor base + todos los modificadores\n- Los modificadores se almacenan en una tabla separada\n\n**Pista:** Usa una tabla de tablas para los modificadores',
    starterCode: 'local CharacterStats = {}\nCharacterStats.__index = CharacterStats\n\nfunction CharacterStats:new()\n  local self = setmetatable({}, CharacterStats)\n  self.stats = { Strength = 10 }\n  self.modifiers = {} -- Tabla para modificadores\n  return self\nend\n\nfunction CharacterStats:AddModifier(statName, modifierName, value, duration)\n  -- Añade un modificador temporal\nend\n\nfunction CharacterStats:GetModifiedStat(statName)\n  -- Retorna stat base + modificadores\nend\n\nreturn CharacterStats',
    solution: 'local CharacterStats = {}\nCharacterStats.__index = CharacterStats\n\nfunction CharacterStats:new()\n  local self = setmetatable({}, CharacterStats)\n  self.stats = { Strength = 10 }\n  self.modifiers = {}\n  return self\nend\n\nfunction CharacterStats:AddModifier(statName, modifierName, value, duration)\n  if not self.modifiers[statName] then\n    self.modifiers[statName] = {}\n  end\n  \n  self.modifiers[statName][modifierName] = {\n    value = value,\n    duration = duration or 0\n  }\n  \n  print("Modificador " .. modifierName .. " añadido a " .. statName .. ": " .. value)\nend\n\nfunction CharacterStats:RemoveModifier(statName, modifierName)\n  if self.modifiers[statName] then\n    self.modifiers[statName][modifierName] = nil\n    print("Modificador " .. modifierName .. " removido")\n  end\nend\n\nfunction CharacterStats:GetModifiedStat(statName)\n  local baseValue = self.stats[statName] or 0\n  local totalBonus = 0\n  \n  if self.modifiers[statName] then\n    for name, mod in pairs(self.modifiers[statName]) do\n      totalBonus = totalBonus + mod.value\n    end\n  end\n  \n  return baseValue + totalBonus\nend\n\nreturn CharacterStats',
    tests: [
      { type: "code_contains", expected: "self.modifiers", message: "Debes tener tabla modifiers" },
      { type: "code_contains", expected: "AddModifier", message: "Debes implementar AddModifier" },
      { type: "code_contains", expected: "RemoveModifier", message: "Debes implementar RemoveModifier" },
      { type: "code_contains", expected: "GetModifiedStat", message: "Debes implementar GetModifiedStat" },
      { type: "code_contains", expected: "baseValue + totalBonus", message: "Debes sumar base + modificadores" },
    ],
    hints: [
      "Crea self.modifiers como tabla vacía",
      "AddModifier crea entrada: self.modifiers[statName][modifierName] = {value, duration}",
      "GetModifiedStat suma todos los valores de modificadores",
    ],
    difficulty: "advanced",
    xpReward: 70,
  },
  {
    id: "mes-04-leccion-3-ej-3",
    lessonId: "l4-3-stats",
    title: "Calcular Stats Derivadas (HP, Mana)",
    instructions: 'Implementa stats derivadas que se calculan de las stats base.\n\n**Requisitos:**\n- `GetMaxHealth()` retorna: Vitality * 10\n- `GetMaxMana()` retorna: Intelligence * 8\n- `GetHealthRegen()` retorna: Vitality * 0.5\n- `GetManaRegen()` retorna: Intelligence * 0.3\n- `GetCriticalChance()` retorna: Agility * 0.5 (en porcentaje)\n- `GetDamage()` retorna: Strength * 2\n\n**Pista:** Las stats derivadas se calculan de las stats base',
    starterCode: 'local CharacterStats = {}\nCharacterStats.__index = CharacterStats\n\nfunction CharacterStats:new()\n  local self = setmetatable({}, CharacterStats)\n  self.stats = {\n    Strength = 10,\n    Vitality = 10,\n    Intelligence = 10,\n    Agility = 10\n  }\n  return self\nend\n\nfunction CharacterStats:GetMaxHealth()\n  -- Calcula HP máximo: Vitality * 10\nend\n\nfunction CharacterStats:GetMaxMana()\n  -- Calcula Mana máximo: Intelligence * 8\nend\n\nfunction CharacterStats:GetDamage()\n  -- Calcula daño: Strength * 2\nend\n\nreturn CharacterStats',
    solution: 'local CharacterStats = {}\nCharacterStats.__index = CharacterStats\n\nfunction CharacterStats:new()\n  local self = setmetatable({}, CharacterStats)\n  self.stats = {\n    Strength = 10,\n    Vitality = 10,\n    Intelligence = 10,\n    Agility = 10\n  }\n  return self\nend\n\nfunction CharacterStats:GetMaxHealth()\n  return self:GetModifiedStat("Vitality") * 10\nend\n\nfunction CharacterStats:GetMaxMana()\n  return self:GetModifiedStat("Intelligence") * 8\nend\n\nfunction CharacterStats:GetHealthRegen()\n  return self:GetModifiedStat("Vitality") * 0.5\nend\n\nfunction CharacterStats:GetManaRegen()\n  return self:GetModifiedStat("Intelligence") * 0.3\nend\n\nfunction CharacterStats:GetCriticalChance()\n  return self:GetModifiedStat("Agility") * 0.5\nend\n\nfunction CharacterStats:GetDamage()\n  return self:GetModifiedStat("Strength") * 2\nend\n\nreturn CharacterStats',
    tests: [
      { type: "code_contains", expected: "GetMaxHealth", message: "Debes implementar GetMaxHealth" },
      { type: "code_contains", expected: "GetMaxMana", message: "Debes implementar GetMaxMana" },
      { type: "code_contains", expected: "GetDamage", message: "Debes implementar GetDamage" },
      { type: "code_contains", expected: "Vitality", message: "HP debe usar Vitality" },
      { type: "code_contains", expected: "Intelligence", message: "Mana debe usar Intelligence" },
      { type: "code_contains", expected: "Strength", message: "Daño debe usar Strength" },
    ],
    hints: [
      "GetMaxHealth = Vitality * 10",
      "GetMaxMana = Intelligence * 8",
      "GetDamage = Strength * 2",
      "Usa GetModifiedStat para incluir buffs",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },

  // ============================================
  // LECCIÓN 4: SaveGame (Semana 4)
  // ============================================
  {
    id: "mes-04-leccion-4-ej-1",
    lessonId: "l4-4-savegame",
    title: "Serializar Datos a JSON",
    instructions: 'Crea una función que serialice datos de juego a formato JSON.\n\n**Requisitos:**\n- `SerializeToJSON(data)` debe convertir una tabla Lua a string JSON\n- Debe manejar strings, numbers, booleans, y tablas anidadas\n- Usa json.encode() si está disponible, o implementa una versión simple\n- Imprime el JSON resultante\n\n**Pista:** UE5 tiene funciones JSON integradas, o puedes usar una implementación simple',
    starterCode: 'function SerializeToJSON(data)\n  -- Convierte tabla Lua a JSON\nend\n\n-- Prueba\nlocal testData = {\n  name = "Player1",\n  level = 25,\n  health = 100,\n  isAlive = true\n}\n\nprint(SerializeToJSON(testData))',
    solution: '-- Usando la biblioteca json de UE5/Lua\nlocal json = require("json")\n\nfunction SerializeToJSON(data)\n  local jsonString = json.encode(data)\n  print("JSON: " .. jsonString)\n  return jsonString\nend\n\nreturn SerializeToJSON',
    tests: [
      { type: "code_contains", expected: "json.encode", message: "Debes usar json.encode" },
      { type: "code_contains", expected: "SerializeToJSON", message: "Debes definir la función" },
      { type: "output_contains", expected: "name", message: "El JSON debe contener 'name'" },
      { type: "output_contains", expected: "level", message: "El JSON debe contener 'level'" },
    ],
    hints: [
      "UE5/Lua puede tener json.encode disponible",
      "Si no, necesitas una implementación custom",
      "json.encode(tabla) convierte a string JSON",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-04-leccion-4-ej-2",
    lessonId: "l4-4-savegame",
    title: "Guardar Estado del Jugador",
    instructions: 'Crea un sistema completo para guardar el estado del jugador.\n\n**Requisitos:**\n- `SavePlayerData(player)` debe guardar: nombre, nivel, stats, inventario\n- Los datos deben serializarse a JSON\n- Debe incluir timestamp de cuando se guardó\n- Imprime confirmación de guardado\n\n**Pista:** Combina todas las funciones anteriores',
    starterCode: 'local function SavePlayerData(player)\n  -- player tiene: name, level, stats (tabla), inventory (tabla)\n  -- Debes crear una estructura con todos los datos + timestamp\nend\n\n-- Datos de prueba\nlocal testPlayer = {\n  name = "Hero",\n  level = 10,\n  stats = { Strength = 15, Vitality = 12 },\n  inventory = {\n    { item = { id = "sword", name = "Espada" }, quantity = 1 }\n  }\n}\n\nSavePlayerData(testPlayer)',
    solution: 'local json = require("json")\n\nlocal function SavePlayerData(player)\n  -- Crear estructura de guardado\n  local saveData = {\n    name = player.name,\n    level = player.level,\n    stats = player.stats,\n    inventory = player.inventory,\n    timestamp = os.time(),\n    version = "1.0"\n  }\n  \n  -- Serializar a JSON\n  local jsonString = json.encode(saveData)\n  \n  -- En UE5 real, aquí llamarías a SaveGame\n  print("=== GUARDANDO PARTIDA ===")\n  print("Jugador: " .. player.name)\n  print("Nivel: " .. player.level)\n  print("Timestamp: " .. os.time())\n  print("Datos serializados: " .. #jsonString .. " bytes")\n  print("=== GUARDADO COMPLETADO ===")\n  \n  return jsonString\nend\n\nreturn SavePlayerData',
    tests: [
      { type: "code_contains", expected: "saveData", message: "Debes crear estructura de datos" },
      { type: "code_contains", expected: "timestamp", message: "Debes incluir timestamp" },
      { type: "code_contains", expected: "json.encode", message: "Debes serializar a JSON" },
      { type: "code_contains", expected: "os.time()", message: "Debes obtener el tiempo actual" },
      { type: "output_contains", expected: "GUARDANDO", message: "Debes imprimir confirmación" },
    ],
    hints: [
      "Crea una tabla saveData con todos los datos",
      "Añade timestamp con os.time()",
      "Serializa con json.encode(saveData)",
      "Imprime confirmación del guardado",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-04-leccion-4-ej-3",
    lessonId: "l4-4-savegame",
    title: "Cargar Estado del Jugador",
    instructions: 'Crea un sistema para cargar datos guardados.\n\n**Requisitos:**\n- `LoadPlayerData(jsonString)` debe deserializar JSON a tabla Lua\n- Debe validar que los datos sean correctos\n- Debe retornar la tabla con los datos del jugador\n- Imprime confirmación de carga con los datos principales\n\n**Pista:** Usa json.decode() para deserializar',
    starterCode: 'local json = require("json")\n\nlocal function LoadPlayerData(jsonString)\n  -- Deserializa JSON a tabla Lua\n  -- Valida los datos\n  -- Retorna la tabla del jugador\nend\n\n-- Prueba\nlocal jsonData = \'{"name":"Hero","level":10,"stats":{"Strength":15}}\'\nlocal player = LoadPlayerData(jsonData)\nprint("Cargado: " .. player.name .. " nivel " .. player.level)',
    solution: 'local json = require("json")\n\nlocal function LoadPlayerData(jsonString)\n  -- Deserializar JSON\n  local data = json.decode(jsonString)\n  \n  -- Validar datos\n  if not data then\n    print("ERROR: Datos inválidos")\n    return nil\n  end\n  \n  if not data.name then\n    print("ERROR: Nombre de jugador no encontrado")\n    return nil\n  end\n  \n  -- Imprimir confirmación\n  print("=== CARGANDO PARTIDA ===")\n  print("Jugador: " .. data.name)\n  print("Nivel: " .. tostring(data.level))\n  if data.stats then\n    print("Stats encontradas: " .. tostring(#data.stats))\n  end\n  if data.inventory then\n    print("Items en inventario: " .. tostring(#data.inventory))\n  end\n  print("=== CARGA COMPLETADA ===")\n  \n  return data\nend\n\nreturn LoadPlayerData',
    tests: [
      { type: "code_contains", expected: "json.decode", message: "Debes usar json.decode" },
      { type: "code_contains", expected: "LoadPlayerData", message: "Debes definir la función" },
      { type: "code_contains", expected: "if not data", message: "Debes validar los datos" },
      { type: "output_contains", expected: "CARGANDO", message: "Debes imprimir confirmación" },
    ],
    hints: [
      "json.decode(jsonString) convierte JSON a tabla",
      "Valida que data no sea nil",
      "Valida que data.name exista",
      "Imprime los datos cargados",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 4
  // ============================================
  {
    id: "mes-04-final-proyecto",
    lessonId: "l4-4-savegame",
    title: "Proyecto: Sistema RPG Completo con Guardado",
    instructions: 'Crea el entregable del Mes 4: Sistema RPG Base completo.\n\n**Requisitos:**\n1. Inventario de 20 slots con:\n   - AddItem(item, quantity)\n   - RemoveItem(slotIndex)\n   - GetTotalWeight()\n   - HasItem(itemId, quantity)\n\n2. 6 Estadísticas de personaje:\n   - Strength, Dexterity, Intelligence, Vitality, Agility, Luck\n   - Sistema de modificadores (buffs/debuffs)\n   - Stats derivadas (HP, Mana, Regen, Damage)\n\n3. Sistema de Guardado/Cargado:\n   - SavePlayerData(player)\n   - LoadPlayerData(jsonString)\n   - Serialización JSON completa\n\n**Pista:** Integra todos los ejercicios anteriores en un sistema cohesivo',
    starterCode: '-- Sistema RPG Completo\nlocal RPGSystem = {}\n\n-- 1. Sistema de Inventario\nlocal Inventory = {}\nInventory.__index = Inventory\n\nfunction Inventory:new()\n  local self = setmetatable({}, Inventory)\n  self.slots = {}\n  return self\nend\n\n-- Añade métodos de inventario aquí\n\n-- 2. Sistema de Stats\nlocal CharacterStats = {}\nCharacterStats.__index = CharacterStats\n\nfunction CharacterStats:new()\n  local self = setmetatable({}, CharacterStats)\n  self.stats = {\n    Strength = 10,\n    Dexterity = 10,\n    Intelligence = 10,\n    Vitality = 10,\n    Agility = 10,\n    Luck = 10\n  }\n  return self\nend\n\n-- Añade métodos de stats aquí\n\n-- 3. Sistema de Guardado\nlocal function SavePlayerData(player)\n  -- Implementa guardado\nend\n\nlocal function LoadPlayerData(jsonString)\n  -- Implementa carga\nend\n\nreturn RPGSystem',
    solution: '-- Sistema RPG Completo\nlocal json = require("json")\n\n-- ============================================\n-- 1. SISTEMA DE INVENTARIO\n-- ============================================\nlocal Inventory = {}\nInventory.__index = Inventory\n\nfunction Inventory:new()\n  local self = setmetatable({}, Inventory)\n  self.slots = {}\n  return self\nend\n\nfunction Inventory:AddItem(item, quantity)\n  for _, slot in ipairs(self.slots) do\n    if slot and slot.item.id == item.id then\n      slot.quantity = slot.quantity + quantity\n      return\n    end\n  end\n  table.insert(self.slots, {item = item, quantity = quantity})\nend\n\nfunction Inventory:RemoveItem(slotIndex)\n  if slotIndex >= 1 and slotIndex <= #self.slots then\n    local item = self.slots[slotIndex]\n    self.slots[slotIndex] = nil\n    return item\n  end\nend\n\nfunction Inventory:GetTotalWeight()\n  local total = 0\n  for _, slot in ipairs(self.slots) do\n    if slot then\n      total = total + (slot.item.weight * slot.quantity)\n    end\n  end\n  return total\nend\n\nfunction Inventory:HasItem(itemId, quantity)\n  local total = 0\n  for _, slot in ipairs(self.slots) do\n    if slot and slot.item.id == itemId then\n      total = total + slot.quantity\n    end\n  end\n  return total >= quantity\nend\n\n-- ============================================\n-- 2. SISTEMA DE STATS\n-- ============================================\nlocal CharacterStats = {}\nCharacterStats.__index = CharacterStats\n\nfunction CharacterStats:new()\n  local self = setmetatable({}, CharacterStats)\n  self.stats = {\n    Strength = 10,\n    Dexterity = 10,\n    Intelligence = 10,\n    Vitality = 10,\n    Agility = 10,\n    Luck = 10\n  }\n  self.modifiers = {}\n  return self\nend\n\nfunction CharacterStats:SetStat(statName, value)\n  if self.stats[statName] then\n    self.stats[statName] = value\n  end\nend\n\nfunction CharacterStats:GetStat(statName)\n  return self.stats[statName]\nend\n\nfunction CharacterStats:AddModifier(statName, modifierName, value)\n  if not self.modifiers[statName] then\n    self.modifiers[statName] = {}\n  end\n  self.modifiers[statName][modifierName] = value\nend\n\nfunction CharacterStats:GetModifiedStat(statName)\n  local base = self.stats[statName] or 0\n  local bonus = 0\n  if self.modifiers[statName] then\n    for _, v in pairs(self.modifiers[statName]) do\n      bonus = bonus + v\n    end\n  end\n  return base + bonus\nend\n\nfunction CharacterStats:GetMaxHealth()\n  return self:GetModifiedStat("Vitality") * 10\nend\n\nfunction CharacterStats:GetMaxMana()\n  return self:GetModifiedStat("Intelligence") * 8\nend\n\nfunction CharacterStats:GetDamage()\n  return self:GetModifiedStat("Strength") * 2\nend\n\n-- ============================================\n-- 3. SISTEMA DE GUARDADO\n-- ============================================\nlocal function SavePlayerData(player)\n  local saveData = {\n    name = player.name,\n    level = player.level,\n    stats = player.stats.stats,\n    modifiers = player.stats.modifiers,\n    inventory = player.inventory.slots,\n    timestamp = os.time(),\n    version = "1.0"\n  }\n  \n  local jsonString = json.encode(saveData)\n  print("=== PARTIDA GUARDADA ===")\n  print("Jugador: " .. player.name)\n  print("Nivel: " .. player.level)\n  print("Timestamp: " .. os.time())\n  return jsonString\nend\n\nlocal function LoadPlayerData(jsonString)\n  local data = json.decode(jsonString)\n  \n  if not data or not data.name then\n    print("ERROR: Datos inválidos")\n    return nil\n  end\n  \n  print("=== PARTIDA CARGADA ===")\n  print("Jugador: " .. data.name)\n  print("Nivel: " .. data.level)\n  return data\nend\n\n-- ============================================\n-- SISTEMA PRINCIPAL\n-- ============================================\nlocal RPGSystem = {\n  Inventory = Inventory,\n  CharacterStats = CharacterStats,\n  SavePlayerData = SavePlayerData,\n  LoadPlayerData = LoadPlayerData\n}\n\nreturn RPGSystem',
    tests: [
      { type: "code_contains", expected: "Inventory", message: "Debes tener sistema de Inventario" },
      { type: "code_contains", expected: "CharacterStats", message: "Debes tener sistema de Stats" },
      { type: "code_contains", expected: "SavePlayerData", message: "Debes tener guardado" },
      { type: "code_contains", expected: "LoadPlayerData", message: "Debes tener carga" },
      { type: "code_contains", expected: "AddItem", message: "Inventario debe tener AddItem" },
      { type: "code_contains", expected: "GetTotalWeight", message: "Inventario debe tener GetTotalWeight" },
      { type: "code_contains", expected: "GetModifiedStat", message: "Stats debe tener modificadores" },
      { type: "code_contains", expected: "GetMaxHealth", message: "Stats debe tener stats derivadas" },
      { type: "code_contains", expected: "json.encode", message: "Debe serializar a JSON" },
      { type: "code_contains", expected: "json.decode", message: "Debe deserializar JSON" },
    ],
    hints: [
      "Combina los 3 sistemas: Inventario, Stats, Guardado",
      "Inventario: 20 slots, AddItem, RemoveItem, GetTotalWeight",
      "Stats: 6 stats base, modificadores, stats derivadas (HP, Mana, Damage)",
      "Guardado: json.encode para guardar, json.decode para cargar",
      "Incluye timestamp en el guardado",
    ],
    difficulty: "advanced",
    xpReward: 250,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes04Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes04Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes04Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
