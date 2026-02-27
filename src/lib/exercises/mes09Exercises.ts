import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 9: Sistemas Avanzados - Procedural, Shaders y Audio
// ============================================
// Basado en el plan de estudio:
// Semana 1: Generación procedural - dungeon, WFC, terreno
// Semana 2: Materiales dinámicos - MPC, dynamic material instances
// Semana 3: Audio con Metasounds - música adaptativa, audio reactivo
// Semana 4: Quest system - objetivos, tracking, rewards, event bus
// ============================================
// Entregable del mes: Dungeon Crawler procedural con generación dinámica,
// enemigos, audio adaptativo al peligro y sistema de 5 misiones encadenadas
// ============================================

export const mes09Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: Generación Procedural (Semana 1)
  // ============================================
  {
    id: "mes-09-leccion-1-ej-1",
    lessonId: "l9-1-procedural",
    title: 'Generador de Números Aleatorios con Seed',
    instructions: 'Implementa un generador de números aleatorios con seed reproducible.\n\n**Requisitos:**\n- `RandomGenerator(seed)` inicializa con seed\n- `Next()` retorna siguiente número aleatorio (0-1)\n- `NextInt(min, max)` retorna entero aleatorio en rango\n- `Reset(newSeed)` reinicia con nueva seed\n- Misma seed debe producir misma secuencia\n\n**Pista:** Usa algoritmo LCG (Linear Congruential Generator)',
    starterCode: 'local RandomGenerator = {}\n\nfunction RandomGenerator:new(seed)\n  local self = setmetatable({}, RandomGenerator)\n  self.seed = seed or 12345\n  return self\nend\n\nfunction RandomGenerator:Next()\n  -- Retorna número aleatorio 0-1\nend\n\nfunction RandomGenerator:NextInt(min, max)\n  -- Retorna entero aleatorio en rango\nend\n\nfunction RandomGenerator:Reset(newSeed)\n  -- Reinicia con nueva seed\nend\n\nreturn RandomGenerator',
    solution: 'local RandomGenerator = {}\nRandomGenerator.__index = RandomGenerator\n\nfunction RandomGenerator:new(seed)\n  local self = setmetatable({}, RandomGenerator)\n  self.seed = seed or 12345\n  return self\nend\n\nfunction RandomGenerator:Next()\n  -- LCG: Linear Congruential Generator\n  -- a = 1103515245, c = 12345, m = 2^31\n  self.seed = (1103515245 * self.seed + 12345) % 2147483648\n  return self.seed / 2147483648\nend\n\nfunction RandomGenerator:NextInt(min, max)\n  local value = self:Next()\n  return math.floor(value * (max - min + 1)) + min\nend\n\nfunction RandomGenerator:Reset(newSeed)\n  self.seed = newSeed\n  print("Seed reiniciada a: " .. newSeed)\nend\n\nfunction RandomGenerator:GetSeed()\n  return self.seed\nend\n\nreturn RandomGenerator',
    tests: [
      { type: "code_contains", expected: "Next", message: "Debes implementar Next" },
      { type: "code_contains", expected: "NextInt", message: "Debes implementar NextInt" },
      { type: "code_contains", expected: "Reset", message: "Debes implementar Reset" },
      { type: "code_contains", expected: "seed", message: "Debes tener propiedad seed" },
      { type: "code_contains", expected: "2147483648", message: "Debes usar módulo 2^31" },
    ],
    hints: [
      "LCG usa fórmula: seed = (a * seed + c) % m",
      "a = 1103515245, c = 12345, m = 2^31",
      "NextInt usa Next y escala al rango",
      "Misna seed produce misma secuencia",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-09-leccion-1-ej-2",
    lessonId: "l9-1-procedural",
    title: 'Generación de Dungeon con Rooms y Corridores',
    instructions: 'Crea un generador procedural de dungeon básico.\n\n**Requisitos:**\n- `DungeonGenerator(width, height)` crea generador\n- `Generate(roomCount)` genera dungeon con rooms\n- Cada room tiene: x, y, width, height, type (start, normal, boss, treasure)\n- Genera corridors entre rooms consecutivas\n- Retorna tabla con rooms y corridors\n\n**Pista:** Coloca rooms aleatoriamente sin overlap',
    starterCode: 'local DungeonGenerator = {}\n\nfunction DungeonGenerator:new(width, height)\n  local self = setmetatable({}, DungeonGenerator)\n  self.width = width\n  self.height = height\n  self.rooms = {}\n  self.corridors = {}\n  return self\nend\n\nfunction DungeonGenerator:Generate(roomCount)\n  -- Genera dungeon con roomCount rooms\nend\n\nfunction DungeonGenerator:GetRooms()\n  -- Retorna lista de rooms\nend\n\nfunction DungeonGenerator:GetCorridors()\n  -- Retorna lista de corridors\nend\n\nreturn DungeonGenerator',
    solution: 'local DungeonGenerator = {}\nDungeonGenerator.__index = DungeonGenerator\n\nfunction DungeonGenerator:new(width, height)\n  local self = setmetatable({}, DungeonGenerator)\n  self.width = width\n  self.height = height\n  self.rooms = {}\n  self.corridors = {}\n  return self\nend\n\nfunction DungeonGenerator:Generate(roomCount)\n  print("\\n=== GENERANDO DUNGEON ===")\n  print("Tamaño: " .. self.width .. "x" .. self.height)\n  print("Rooms: " .. roomCount)\n  \n  self.rooms = {}\n  self.corridors = {}\n  \n  local rng = RandomGenerator:new(os.time())\n  \n  for i = 1, roomCount do\n    local room = {\n      id = i,\n      x = rng:NextInt(1, self.width - 10),\n      y = rng:NextInt(1, self.height - 10),\n      width = rng:NextInt(5, 10),\n      height = rng:NextInt(5, 10),\n      type = self:GetRoomType(i, roomCount)\n    }\n    \n    -- Verificar overlap (simplificado)\n    table.insert(self.rooms, room)\n    print("Room " .. i .. " (" .. room.type .. "): (" .. room.x .. ", " .. room.y .. ")")\n  end\n  \n  -- Generar corridors entre rooms consecutivas\n  for i = 1, roomCount - 1 do\n    table.insert(self.corridors, {\n      from = i,\n      to = i + 1,\n      length = rng:NextInt(5, 15)\n    })\n  end\n  \n  print("Corridors: " .. #self.corridors)\n  print("========================\\n")\n  \n  return { rooms = self.rooms, corridors = self.corridors }\nend\n\nfunction DungeonGenerator:GetRoomType(index, total)\n  if index == 1 then return "start"\n  elseif index == total then return "boss"\n  elseif index == math.floor(total / 2) then return "treasure"\n  else return "normal"\n  end\nend\n\nfunction DungeonGenerator:GetRooms()\n  return self.rooms\nend\n\nfunction DungeonGenerator:GetCorridors()\n  return self.corridors\nend\n\n-- RandomGenerator necesario (del ejercicio anterior)\nlocal RandomGenerator = {}\nRandomGenerator.__index = RandomGenerator\nfunction RandomGenerator:new(seed)\n  local self = setmetatable({}, RandomGenerator)\n  self.seed = seed or 12345\n  return self\nend\nfunction RandomGenerator:Next()\n  self.seed = (1103515245 * self.seed + 12345) % 2147483648\n  return self.seed / 2147483648\nend\nfunction RandomGenerator:NextInt(min, max)\n  return math.floor(self:Next() * (max - min + 1)) + min\nend\n\nreturn DungeonGenerator',
    tests: [
      { type: "code_contains", expected: "Generate", message: "Debes implementar Generate" },
      { type: "code_contains", expected: "rooms", message: "Debes tener tabla rooms" },
      { type: "code_contains", expected: "corridors", message: "Debes tener tabla corridors" },
      { type: "code_contains", expected: "type", message: "Cada room debe tener tipo" },
      { type: "code_contains", expected: "start", message: "Debe tener room start" },
      { type: "code_contains", expected: "boss", message: "Debe tener room boss" },
    ],
    hints: [
      "Cada room tiene x, y, width, height, type",
      "Tipos: start (primera), boss (última), treasure, normal",
      "Corridors conectan rooms consecutivas",
      "Usa RandomGenerator para posiciones",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-09-leccion-1-ej-3",
    lessonId: "l9-1-procedural",
    title: 'Wave Function Collapse (WFC) Simplificado',
    instructions: 'Implementa una versión simplificada de WFC para generar patrones.\n\n**Requisitos:**\n- `WFCGenerator(tileSize)` crea generador\n- `AddRule(tileType, allowedNeighbors)` añade regla de adyacencia\n- `Generate(width, height)` genera grid usando WFC\n- Cada celda debe respetar reglas de adyacencia\n- Imprime "Generando grid [width]x[height]" y "Celdas válidas: [count]"\n\n**Pista:** WFC colapsa celdas con menos opciones primero',
    starterCode: 'local WFCGenerator = {}\n\nfunction WFCGenerator:new(tileSize)\n  local self = setmetatable({}, WFCGenerator)\n  self.tileSize = tileSize\n  self.rules = {}  -- tileType -> {allowedNeighbors}\n  return self\nend\n\nfunction WFCGenerator:AddRule(tileType, allowedNeighbors)\n  -- Añade regla de adyacencia\nend\n\nfunction WFCGenerator:Generate(width, height)\n  -- Genera grid usando WFC simplificado\nend\n\nreturn WFCGenerator',
    solution: 'local WFCGenerator = {}\nWFCGenerator.__index = WFCGenerator\n\nfunction WFCGenerator:new(tileSize)\n  local self = setmetatable({}, WFCGenerator)\n  self.tileSize = tileSize\n  self.rules = {}  -- tileType -> {allowedNeighbors}\n  return self\nend\n\nfunction WFCGenerator:AddRule(tileType, allowedNeighbors)\n  self.rules[tileType] = allowedNeighbors or {}\n  print("Regla añadida: " .. tileType .. " -> " .. #self.rules[tileType] .. " vecinos permitidos")\nend\n\nfunction WFCGenerator:Generate(width, height)\n  print("\\n=== GENERANDO CON WFC ===")\n  print("Grid: " .. width .. "x" .. height)\n  print("Tile size: " .. self.tileSize)\n  \n  local grid = {}\n  local validCells = 0\n  \n  -- Inicializar grid con todas las opciones posibles\n  for y = 1, height do\n    grid[y] = {}\n    for x = 1, width do\n      -- Cada celda empieza con todos los tile types posibles\n      grid[y][x] = {\n        options = self:GetAllTileTypes(),\n        collapsed = false,\n        value = nil\n      }\n    end\n  end\n  \n  -- Colapsar celdas (WFC simplificado)\n  local collapsed = false\n  while not collapsed do\n    -- Encontrar celda con menos opciones (simplificado: primera no colapsada)\n    local found = false\n    for y = 1, height do\n      for x = 1, width do\n        if not grid[y][x].collapsed and #grid[y][x].options > 0 then\n          -- Colapsar a primera opción\n          grid[y][x].value = grid[y][x].options[1]\n          grid[y][x].collapsed = true\n          validCells = validCells + 1\n          found = true\n          \n          -- Propagar restricciones a vecinos (simplificado)\n          self:PropagateConstraints(grid, x, y, width, height)\n        end\n      end\n    end\n    \n    if not found then\n      collapsed = true\n    end\n  end\n  \n  print("Celdas válidas: " .. validCells .. "/" .. (width * height))\n  print("========================\\n")\n  \n  return { grid = grid, width = width, height = height, validCells = validCells }\nend\n\nfunction WFCGenerator:GetAllTileTypes()\n  local types = {}\n  for tileType in pairs(self.rules) do\n    table.insert(types, tileType)\n  end\n  if #types == 0 then\n    return {"floor", "wall", "door"}\n  end\n  return types\nend\n\nfunction WFCGenerator:PropagateConstraints(grid, x, y, width, height)\n  -- Propagar restricciones a vecinos (simplificado)\n  local cell = grid[y][x]\n  if not cell.value then return end\n  \n  local allowed = self.rules[cell.value] or {}\n  \n  -- Vecino derecho\n  if x < width then\n    self:UpdateNeighbor(grid, x + 1, y, allowed)\n  end\n  -- Vecino izquierdo\n  if x > 1 then\n    self:UpdateNeighbor(grid, x - 1, y, allowed)\n  end\n  -- Vecino abajo\n  if y < height then\n    self:UpdateNeighbor(grid, x, y + 1, allowed)\n  end\n  -- Vecino arriba\n  if y > 1 then\n    self:UpdateNeighbor(grid, x, y - 1, allowed)\n  end\nend\n\nfunction WFCGenerator:UpdateNeighbor(grid, x, y, allowed)\n  local neighbor = grid[y][x]\n  if neighbor.collapsed then return end\n  \n  -- Filtrar opciones del neighbor\n  local newOptions = {}\n  for _, opt in ipairs(neighbor.options) do\n    if #allowed == 0 or self:IsAllowed(opt, allowed) then\n      table.insert(newOptions, opt)\n    end\n  end\n  neighbor.options = newOptions\nend\n\nfunction WFCGenerator:IsAllowed(tileType, allowedList)\n  for _, allowed in ipairs(allowedList) do\n    if allowed == tileType then return true end\n  end\n  return false\nend\n\nreturn WFCGenerator',
    tests: [
      { type: "code_contains", expected: "AddRule", message: "Debes implementar AddRule" },
      { type: "code_contains", expected: "Generate", message: "Debes implementar Generate" },
      { type: "code_contains", expected: "rules", message: "Debes tener tabla rules" },
      { type: "code_contains", expected: "collapsed", message: "Debes trackear celdas colapsadas" },
      { type: "code_contains", expected: "PropagateConstraints", message: "Debes propagar restricciones" },
      { type: "code_contains", expected: "validCells", message: "Debes contar celdas válidas" },
    ],
    hints: [
      "Cada celda tiene options, collapsed, value",
      "Colapsa celdas con menos opciones primero",
      "Propaga restricciones a vecinos",
      "WFC garantiza patrones coherentes",
    ],
    difficulty: "advanced",
    xpReward: 85,
  },

  // ============================================
  // LECCIÓN 2: Materiales Dinámicos (Semana 2)
  // ============================================
  {
    id: "mes-09-leccion-2-ej-1",
    lessonId: "l9-2-materials",
    title: 'Crear Material Instance Dinámico',
    instructions: 'Crea un material instance dinámico desde Lua.\n\n**Requisitos:**\n- `CreateDynamicMaterial(baseMaterial)` crea instancia dinámica\n- `SetScalarParameter(name, value)` setea parámetro escalar\n- `SetVectorParameter(name, r, g, b, a)` setea parámetro vector\n- Imprime "Material dinámico creado" y "Parámetro [name] = [value]"\n\n**Pista:** Los materiales dinámicos heredan del base material',
    starterCode: 'local DynamicMaterial = {}\n\nfunction DynamicMaterial:new(baseMaterial)\n  local self = setmetatable({}, DynamicMaterial)\n  self.baseMaterial = baseMaterial\n  self.parameters = {}\n  return self\nend\n\nfunction DynamicMaterial:SetScalarParameter(name, value)\n  -- Setea parámetro escalar\nend\n\nfunction DynamicMaterial:SetVectorParameter(name, r, g, b, a)\n  -- Setea parámetro vector\nend\n\nreturn DynamicMaterial',
    solution: 'local DynamicMaterial = {}\nDynamicMaterial.__index = DynamicMaterial\n\nfunction DynamicMaterial:new(baseMaterial)\n  local self = setmetatable({}, DynamicMaterial)\n  self.baseMaterial = baseMaterial\n  self.parameters = {}\n  print("Material dinámico creado desde: " .. tostring(baseMaterial))\n  return self\nend\n\nfunction DynamicMaterial:SetScalarParameter(name, value)\n  self.parameters[name] = { type = "scalar", value = value }\n  print("Parámetro escalar: " .. name .. " = " .. value)\n  \n  -- En UE5 real: self.MaterialInstance:SetScalarParameterValue(name, value)\nend\n\nfunction DynamicMaterial:SetVectorParameter(name, r, g, b, a)\n  self.parameters[name] = { \n    type = "vector", \n    value = {r = r, g = g, b = b, a = a or 1} \n  }\n  print(string.format("Parámetro vector: %s = (%.2f, %.2f, %.2f, %.2f)", \n    name, r, g, b, a or 1))\n  \n  -- En UE5 real: self.MaterialInstance:SetVectorParameterValue(name, FLinearColor(r,g,b,a))\nend\n\nfunction DynamicMaterial:GetParameter(name)\n  return self.parameters[name]\nend\n\nfunction DynamicMaterial:GetAllParameters()\n  return self.parameters\nend\n\nreturn DynamicMaterial',
    tests: [
      { type: "code_contains", expected: "SetScalarParameter", message: "Debes implementar SetScalarParameter" },
      { type: "code_contains", expected: "SetVectorParameter", message: "Debes implementar SetVectorParameter" },
      { type: "code_contains", expected: "parameters", message: "Debes tener tabla parameters" },
      { type: "code_contains", expected: "baseMaterial", message: "Debes tener baseMaterial" },
      { type: "code_contains", expected: "Material dinámico", message: "Debes imprimir mensaje de creación" },
    ],
    hints: [
      "parameters almacena todos los parámetros",
      "SetScalarParameter para valores numéricos simples",
      "SetVectorParameter para colores (r, g, b, a)",
      "Imprime cada parámetro seteado",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-09-leccion-2-ej-2",
    lessonId: "l9-2-materials",
    title: 'Material Parameter Collection (MPC) Global',
    instructions: 'Implementa un sistema para parámetros de material globales.\n\n**Requisitos:**\n- `MPCGlobal()` crea colección global\n- `SetGlobalScalar(name, value)` setea parámetro global escalar\n- `SetGlobalVector(name, r, g, b, a)` setea parámetro global vector\n- `GetGlobalScalar(name)` y `GetGlobalVector(name)` obtienen valores\n- Todos los materiales pueden acceder a estos parámetros\n\n**Pista:** MPC es compartido por todos los materiales',
    starterCode: 'local MPCGlobal = {}\n\nfunction MPCGlobal:new()\n  local self = setmetatable({}, MPCGlobal)\n  self.scalarParams = {}\n  self.vectorParams = {}\n  return self\nend\n\nfunction MPCGlobal:SetGlobalScalar(name, value)\n  -- Setea parámetro escalar global\nend\n\nfunction MPCGlobal:SetGlobalVector(name, r, g, b, a)\n  -- Setea parámetro vector global\nend\n\nfunction MPCGlobal:GetGlobalScalar(name)\n  -- Obtiene parámetro escalar\nend\n\nfunction MPCGlobal:GetGlobalVector(name)\n  -- Obtiene parámetro vector\nend\n\nreturn MPCGlobal',
    solution: 'local MPCGlobal = {}\nMPCGlobal.__index = MPCGlobal\n\nfunction MPCGlobal:new()\n  local self = setmetatable({}, MPCGlobal)\n  self.scalarParams = {}\n  self.vectorParams = {}\n  print("MPC Global inicializado")\n  return self\nend\n\nfunction MPCGlobal:SetGlobalScalar(name, value)\n  self.scalarParams[name] = value\n  print("MPC Scalar: " .. name .. " = " .. value)\n  \n  -- En UE5 real: MPC:SetScalarParameterValue(name, value)\n  -- Esto afecta TODOS los materiales que usan este parámetro\nend\n\nfunction MPCGlobal:SetGlobalVector(name, r, g, b, a)\n  self.vectorParams[name] = {r = r, g = g, b = b, a = a or 1}\n  print(string.format("MPC Vector: %s = (%.2f, %.2f, %.2f, %.2f)", name, r, g, b, a or 1))\n  \n  -- En UE5 real: MPC:SetVectorParameterValue(name, FLinearColor(r,g,b,a))\nend\n\nfunction MPCGlobal:GetGlobalScalar(name)\n  return self.scalarParams[name]\nend\n\nfunction MPCGlobal:GetGlobalVector(name)\n  return self.vectorParams[name]\nend\n\n-- Ejemplos de uso común\nfunction MPCGlobal:SetTimeOfDay(hour)\n  -- Cambia iluminación global según hora\n  self:SetGlobalScalar("TimeOfDay", hour)\nend\n\nfunction MPCGlobal:SetWeatherIntensity(intensity)\n  -- Cambia intensidad de lluvia/nieve\n  self:SetGlobalScalar("RainIntensity", intensity)\nend\n\nfunction MPCGlobal:SetAmbientColor(r, g, b)\n  -- Cambia color ambiente global\n  self:SetGlobalVector("AmbientColor", r, g, b, 1)\nend\n\nreturn MPCGlobal',
    tests: [
      { type: "code_contains", expected: "SetGlobalScalar", message: "Debes implementar SetGlobalScalar" },
      { type: "code_contains", expected: "SetGlobalVector", message: "Debes implementar SetGlobalVector" },
      { type: "code_contains", expected: "GetGlobalScalar", message: "Debes implementar GetGlobalScalar" },
      { type: "code_contains", expected: "GetGlobalVector", message: "Debes implementar GetGlobalVector" },
      { type: "code_contains", expected: "scalarParams", message: "Debes tener scalarParams" },
      { type: "code_contains", expected: "vectorParams", message: "Debes tener vectorParams" },
    ],
    hints: [
      "MPC es global, compartido por todos los materiales",
      "scalarParams para valores numéricos",
      "vectorParams para colores (r, g, b, a)",
      "Útil para tiempo, clima, efectos globales",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-09-leccion-2-ej-3",
    lessonId: "l9-2-materials",
    title: 'Efecto de Día/Noche con MPC',
    instructions: 'Implementa un sistema de día/noche que afecta materiales globalmente.\n\n**Requisitos:**\n- `DayNightCycle()` crea sistema de ciclo día/noche\n- `Update(deltaTime)` actualiza el ciclo\n- `GetHour()` retorna hora actual (0-23)\n- `GetDayFactor()` retorna 1 de día, 0 de noche\n- Actualiza MPC con: TimeOfDay, SunIntensity, AmbientColor\n\n**Pista:** Usa sin/cos para transición suave día/noche',
    starterCode: 'local DayNightCycle = {}\n\nfunction DayNightCycle:new()\n  local self = setmetatable({}, DayNightCycle)\n  self.currentHour = 12  -- Mediodía\n  self.dayDuration = 120  -- 120 segundos = 1 día completo\n  self.mpc = MPCGlobal:new()\n  return self\nend\n\nfunction DayNightCycle:Update(deltaTime)\n  -- Actualiza ciclo día/noche\nend\n\nfunction DayNightCycle:GetHour()\n  -- Retorna hora actual (0-23)\nend\n\nfunction DayNightCycle:GetDayFactor()\n  -- Retorna 1 de día, 0 de noche\nend\n\nreturn DayNightCycle',
    solution: 'local DayNightCycle = {}\nDayNightCycle.__index = DayNightCycle\n\n-- MPCGlobal necesario (del ejercicio anterior)\nlocal MPCGlobal = {}\nMPCGlobal.__index = MPCGlobal\nfunction MPCGlobal:new()\n  local self = setmetatable({}, MPCGlobal)\n  self.scalarParams = {}\n  self.vectorParams = {}\n  return self\nend\nfunction MPCGlobal:SetGlobalScalar(name, value)\n  self.scalarParams[name] = value\nend\nfunction MPCGlobal:SetGlobalVector(name, r, g, b, a)\n  self.vectorParams[name] = {r = r, g = g, b = b, a = a or 1}\nend\n\nfunction DayNightCycle:new()\n  local self = setmetatable({}, DayNightCycle)\n  self.currentHour = 12  -- Mediodía\n  self.dayDuration = 120  -- 120 segundos = 1 día completo\n  self.mpc = MPCGlobal:new()\n  return self\nend\n\nfunction DayNightCycle:Update(deltaTime)\n  -- Avanzar hora\n  local hoursPerSecond = 24 / self.dayDuration\n  self.currentHour = self.currentHour + (hoursPerSecond * deltaTime)\n  \n  -- Loop 0-24\n  if self.currentHour >= 24 then\n    self.currentHour = self.currentHour - 24\n  end\n  \n  -- Calcular factores\n  local dayFactor = self:GetDayFactor()\n  local sunIntensity = dayFactor\n  local moonIntensity = 1 - dayFactor\n  \n  -- Actualizar MPC\n  self.mpc:SetGlobalScalar("TimeOfDay", self.currentHour)\n  self.mpc:SetGlobalScalar("SunIntensity", sunIntensity)\n  self.mpc:SetGlobalScalar("MoonIntensity", moonIntensity)\n  \n  -- Color ambiente según hora\n  if dayFactor > 0.5 then\n    -- Día: azul claro\n    self.mpc:SetGlobalVector("AmbientColor", 0.8, 0.9, 1.0, 1)\n  else\n    -- Noche: azul oscuro\n    self.mpc:SetGlobalVector("AmbientColor", 0.1, 0.1, 0.3, 1)\n  end\n  \n  print(string.format("Hora: %.1f | Día: %.2f", self.currentHour, dayFactor))\nend\n\nfunction DayNightCycle:GetHour()\n  return self.currentHour\nend\n\nfunction DayNightCycle:GetDayFactor()\n  -- Usar sin para transición suave\n  -- 6:00 = amanecer, 18:00 = atardecer\n  local angle = (self.currentHour - 6) / 24 * math.pi * 2\n  local factor = (math.sin(angle) + 1) / 2\n  return math.max(0, math.min(1, factor))\nend\n\nfunction DayNightCycle:SetHour(hour)\n  self.currentHour = hour\nend\n\nfunction DayNightCycle:SkipToDawn()\n  self:SetHour(6)\n  print("Saltando al amanecer")\nend\n\nfunction DayNightCycle:SkipToDusk()\n  self:SetHour(18)\n  print("Saltando al atardecer")\nend\n\nreturn DayNightCycle',
    tests: [
      { type: "code_contains", expected: "Update", message: "Debes implementar Update" },
      { type: "code_contains", expected: "GetHour", message: "Debes implementar GetHour" },
      { type: "code_contains", expected: "GetDayFactor", message: "Debes implementar GetDayFactor" },
      { type: "code_contains", expected: "currentHour", message: "Debes tener currentHour" },
      { type: "code_contains", expected: "dayDuration", message: "Debes tener dayDuration" },
      { type: "code_contains", expected: "math.sin", message: "Debes usar sin para transición" },
      { type: "code_contains", expected: "TimeOfDay", message: "Debes setear TimeOfDay" },
      { type: "code_contains", expected: "AmbientColor", message: "Debes setear AmbientColor" },
    ],
    hints: [
      "currentHour avanza con deltaTime",
      "GetDayFactor usa sin para transición suave",
      "Actualiza MPC con TimeOfDay, SunIntensity",
      "Cambia AmbientColor según día/noche",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },

  // ============================================
  // LECCIÓN 3: Audio con Metasounds (Semana 3)
  // ============================================
  {
    id: "mes-09-leccion-3-ej-1",
    lessonId: "l9-3-audio",
    title: 'Controlar Metasound desde Lua',
    instructions: 'Implementa control básico de Metasounds.\n\n**Requisitos:**\n- `MetasoundController()` crea controlador\n- `PlaySound(soundName)` reproduce sonido\n- `StopSound(soundName)` detiene sonido\n- `SetParameter(soundName, paramName, value)` setea parámetro\n- Imprime "Reproduciendo: [soundName]" y "Deteniendo: [soundName]"\n\n**Pista:** Metasounds son componentes de audio procedural',
    starterCode: 'local MetasoundController = {}\n\nfunction MetasoundController:new()\n  local self = setmetatable({}, MetasoundController)\n  self.activeSounds = {}\n  return self\nend\n\nfunction MetasoundController:PlaySound(soundName)\n  -- Reproduce sonido\nend\n\nfunction MetasoundController:StopSound(soundName)\n  -- Detiene sonido\nend\n\nfunction MetasoundController:SetParameter(soundName, paramName, value)\n  -- Setea parámetro del metasound\nend\n\nreturn MetasoundController',
    solution: 'local MetasoundController = {}\nMetasoundController.__index = MetasoundController\n\nfunction MetasoundController:new()\n  local self = setmetatable({}, MetasoundController)\n  self.activeSounds = {}\n  print("MetasoundController inicializado")\n  return self\nend\n\nfunction MetasoundController:PlaySound(soundName)\n  if not self.activeSounds[soundName] then\n    self.activeSounds[soundName] = { playing = true, parameters = {} }\n    print("Reproduciendo: " .. soundName)\n  else\n    print("Sonido ya está reproduciendo: " .. soundName)\n  end\n  \n  -- En UE5 real: MetasoundComponent:Play()\nend\n\nfunction MetasoundController:StopSound(soundName)\n  if self.activeSounds[soundName] then\n    self.activeSounds[soundName].playing = false\n    print("Deteniendo: " .. soundName)\n  else\n    print("Sonido no está reproduciendo: " .. soundName)\n  end\n  \n  -- En UE5 real: MetasoundComponent:Stop()\nend\n\nfunction MetasoundController:SetParameter(soundName, paramName, value)\n  if not self.activeSounds[soundName] then\n    print("Sonido no encontrado: " .. soundName)\n    return false\n  end\n  \n  self.activeSounds[soundName].parameters[paramName] = value\n  print(string.format("Parámetro: %s.%s = %s", soundName, paramName, tostring(value)))\n  \n  -- En UE5 real: MetasoundComponent:SetScalarParameter(paramName, value)\n  return true\nend\n\nfunction MetasoundController:IsPlaying(soundName)\n  return self.activeSounds[soundName] and self.activeSounds[soundName].playing\nend\n\nfunction MetasoundController:GetActiveSounds()\n  local count = 0\n  for name, data in pairs(self.activeSounds) do\n    if data.playing then count = count + 1 end\n  end\n  return count\nend\n\nreturn MetasoundController',
    tests: [
      { type: "code_contains", expected: "PlaySound", message: "Debes implementar PlaySound" },
      { type: "code_contains", expected: "StopSound", message: "Debes implementar StopSound" },
      { type: "code_contains", expected: "SetParameter", message: "Debes implementar SetParameter" },
      { type: "code_contains", expected: "activeSounds", message: "Debes tener activeSounds" },
      { type: "code_contains", expected: "playing", message: "Debes trackear estado playing" },
    ],
    hints: [
      "activeSounds almacena sonidos activos",
      "PlaySound marca sonido como playing",
      "StopSound marca sonido como no playing",
      "SetParameter actualiza parámetros del sonido",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-09-leccion-3-ej-2",
    lessonId: "l9-3-audio",
    title: 'Música Adaptativa según Estado del Juego',
    instructions: 'Implementa música que cambia según el estado (exploración, combate, peligro).\n\n**Requisitos:**\n- `AdaptiveMusic()` crea sistema de música adaptativa\n- `SetGameState(state)` cambia estado (exploration, danger, combat)\n- `Update(deltaTime)` hace crossfade entre tracks\n- Cada estado tiene su propio track con BPM diferente\n- Imprime "Música: [estado] BPM: [bpm]"\n\n**Pista:** Usa crossfade para transición suave entre tracks',
    starterCode: 'local AdaptiveMusic = {}\n\nfunction AdaptiveMusic:new()\n  local self = setmetatable({}, AdaptiveMusic)\n  self.currentState = "exploration"\n  self.targetState = "exploration"\n  self.crossfadeTime = 0\n  self.crossfadeDuration = 2  -- 2 segundos\n  \n  -- Definir tracks por estado\n  self.tracks = {\n    exploration = { bpm = 90, intensity = 0.3 },\n    danger = { bpm = 120, intensity = 0.6 },\n    combat = { bpm = 150, intensity = 1.0 }\n  }\n  \n  return self\nend\n\nfunction AdaptiveMusic:SetGameState(state)\n  -- Cambia estado de música\nend\n\nfunction AdaptiveMusic:Update(deltaTime)\n  -- Actualiza crossfade\nend\n\nreturn AdaptiveMusic',
    solution: 'local AdaptiveMusic = {}\nAdaptiveMusic.__index = AdaptiveMusic\n\nfunction AdaptiveMusic:new()\n  local self = setmetatable({}, AdaptiveMusic)\n  self.currentState = "exploration"\n  self.targetState = "exploration"\n  self.crossfadeTime = 0\n  self.crossfadeDuration = 2  -- 2 segundos\n  \n  -- Definir tracks por estado\n  self.tracks = {\n    exploration = { bpm = 90, intensity = 0.3, name = "Exploration Theme" },\n    danger = { bpm = 120, intensity = 0.6, name = "Danger Theme" },\n    combat = { bpm = 150, intensity = 1.0, name = "Combat Theme" }\n  }\n  \n  print("AdaptiveMusic inicializado")\n  print("Estados: exploration, danger, combat")\n  return self\nend\n\nfunction AdaptiveMusic:SetGameState(state)\n  if not self.tracks[state] then\n    print("Estado inválido: " .. state)\n    return false\n  end\n  \n  if self.targetState ~= state then\n    print("Transición de música: " .. self.targetState .. " -> " .. state)\n    self.targetState = state\n    self.crossfadeTime = 0\n  end\n  \n  return true\nend\n\nfunction AdaptiveMusic:Update(deltaTime)\n  -- Crossfade entre estados\n  if self.currentState ~= self.targetState then\n    self.crossfadeTime = self.crossfadeTime + deltaTime\n    \n    local t = math.min(1, self.crossfadeTime / self.crossfadeDuration)\n    \n    if t >= 1 then\n      self.currentState = self.targetState\n      self.crossfadeTime = 0\n      print("Música: " .. self.tracks[self.currentState].name .. \n            " | BPM: " .. self.tracks[self.currentState].bpm)\n    end\n    \n    -- Interpolar intensidad\n    local currentIntensity = self:GetCurrentIntensity()\n    print(string.format("Intensidad: %.2f", currentIntensity))\n  end\nend\n\nfunction AdaptiveMusic:GetCurrentIntensity()\n  local current = self.tracks[self.currentState].intensity\n  local target = self.tracks[self.targetState].intensity\n  \n  if self.currentState == self.targetState then\n    return current\n  end\n  \n  local t = math.min(1, self.crossfadeTime / self.crossfadeDuration)\n  return current + (target - current) * t\nend\n\nfunction AdaptiveMusic:GetCurrentBPM()\n  return self.tracks[self.currentState].bpm\nend\n\nfunction AdaptiveMusic:TriggerCombat()\n  self:SetGameState("combat")\nend\n\nfunction AdaptiveMusic:TriggerDanger()\n  self:SetGameState("danger")\nend\n\nfunction AdaptiveMusic:ReturnToExploration()\n  self:SetGameState("exploration")\nend\n\nreturn AdaptiveMusic',
    tests: [
      { type: "code_contains", expected: "SetGameState", message: "Debes implementar SetGameState" },
      { type: "code_contains", expected: "Update", message: "Debes implementar Update" },
      { type: "code_contains", expected: "currentState", message: "Debes tener currentState" },
      { type: "code_contains", expected: "targetState", message: "Debes tener targetState" },
      { type: "code_contains", expected: "crossfade", message: "Debes implementar crossfade" },
      { type: "code_contains", expected: "exploration", message: "Debes tener estado exploration" },
      { type: "code_contains", expected: "combat", message: "Debes tener estado combat" },
      { type: "code_contains", expected: "danger", message: "Debes tener estado danger" },
    ],
    hints: [
      "currentState es el estado actual, targetState es el destino",
      "crossfadeTime avanza con deltaTime",
      "Cuando t >= 1, completa la transición",
      "Cada estado tiene bpm e intensity diferentes",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-09-leccion-3-ej-3",
    lessonId: "l9-3-audio",
    title: 'Audio Reactivo a Eventos del Juego',
    instructions: 'Implementa audio que responde a eventos (disparos, pasos, impactos).\n\n**Requisitos:**\n- `ReactiveAudio()` crea sistema de audio reactivo\n- `TriggerEvent(eventType, data)` dispara evento de audio\n- Eventos: "gunshot", "footstep", "impact", "explosion"\n- Cada evento reproduce sonido y ajusta parámetros\n- Imprime "Evento: [type]" con detalles\n\n**Pista:** Usa tabla de eventos con configuraciones predefinidas',
    starterCode: 'local ReactiveAudio = {}\n\nfunction ReactiveAudio:new()\n  local self = setmetatable({}, ReactiveAudio)\n  self.eventConfigs = {}\n  self.activeEvents = {}\n  \n  -- Configurar eventos por defecto\n  self:SetupDefaultEvents()\n  \n  return self\nend\n\nfunction ReactiveAudio:SetupDefaultEvents()\n  -- Configura eventos por defecto\nend\n\nfunction ReactiveAudio:TriggerEvent(eventType, data)\n  -- Dispara evento de audio\nend\n\nreturn ReactiveAudio',
    solution: 'local ReactiveAudio = {}\nReactiveAudio.__index = ReactiveAudio\n\nfunction ReactiveAudio:new()\n  local self = setmetatable({}, ReactiveAudio)\n  self.eventConfigs = {}\n  self.activeEvents = {}\n  \n  self:SetupDefaultEvents()\n  \n  print("ReactiveAudio inicializado")\n  return self\nend\n\nfunction ReactiveAudio:SetupDefaultEvents()\n  -- Configurar eventos por defecto\n  self.eventConfigs.gunshot = {\n    sound = "GunshotSound",\n    volume = 1.0,\n    pitch = 1.0,\n    priority = 10\n  }\n  \n  self.eventConfigs.footstep = {\n    sound = "FootstepSound",\n    volume = 0.5,\n    pitch = 0.9,\n    priority = 5\n  }\n  \n  self.eventConfigs.impact = {\n    sound = "ImpactSound",\n    volume = 0.7,\n    pitch = 1.0,\n    priority = 7\n  }\n  \n  self.eventConfigs.explosion = {\n    sound = "ExplosionSound",\n    volume = 1.0,\n    pitch = 0.8,\n    priority = 100  -- Máxima prioridad\n  }\n  \n  print("Eventos configurados: gunshot, footstep, impact, explosion")\nend\n\nfunction ReactiveAudio:TriggerEvent(eventType, data)\n  local config = self.eventConfigs[eventType]\n  \n  if not config then\n    print("Evento no configurado: " .. eventType)\n    return false\n  end\n  \n  -- Aplicar datos adicionales\n  local volume = (data and data.volume) or config.volume\n  local pitch = (data and data.pitch) or config.pitch\n  local position = (data and data.position) or nil\n  \n  print("\\n=== EVENTO DE AUDIO ===")\n  print("Tipo: " .. eventType)\n  print("Sonido: " .. config.sound)\n  print("Volumen: " .. volume)\n  print("Pitch: " .. pitch)\n  if position then\n    print("Posición: (" .. position.x .. ", " .. position.y .. ", " .. position.z .. ")")\n  end\n  print("======================\\n")\n  \n  -- Registrar evento activo\n  table.insert(self.activeEvents, {\n    type = eventType,\n    config = config,\n    volume = volume,\n    pitch = pitch,\n    time = os.time()\n  })\n  \n  -- En UE5 real: PlaySoundAtLocation(config.sound, position, volume, pitch)\n  \n  return true\nend\n\nfunction ReactiveAudio:TriggerGunshot(position)\n  return self:TriggerEvent("gunshot", { position = position })\nend\n\nfunction ReactiveAudio:TriggerFootstep(surfaceType)\n  local pitch = 1.0\n  if surfaceType == "metal" then pitch = 1.2\n  elseif surfaceType == "wood" then pitch = 0.9\n  elseif surfaceType == "grass" then pitch = 0.8\n  end\n  \n  return self:TriggerEvent("footstep", { pitch = pitch })\nend\n\nfunction ReactiveAudio:TriggerExplosion(position, magnitude)\n  local volume = math.min(1.0, (magnitude or 100) / 100)\n  return self:TriggerEvent("explosion", { position = position, volume = volume })\nend\n\nfunction ReactiveAudio:GetActiveEvents()\n  return #self.activeEvents\nend\n\nfunction ReactiveAudio:ClearActiveEvents()\n  self.activeEvents = {}\nend\n\nreturn ReactiveAudio',
    tests: [
      { type: "code_contains", expected: "TriggerEvent", message: "Debes implementar TriggerEvent" },
      { type: "code_contains", expected: "SetupDefaultEvents", message: "Debes implementar SetupDefaultEvents" },
      { type: "code_contains", expected: "eventConfigs", message: "Debes tener eventConfigs" },
      { type: "code_contains", expected: "gunshot", message: "Debes tener evento gunshot" },
      { type: "code_contains", expected: "footstep", message: "Debes tener evento footstep" },
      { type: "code_contains", expected: "explosion", message: "Debes tener evento explosion" },
      { type: "code_contains", expected: "volume", message: "Debes tener control de volumen" },
      { type: "code_contains", expected: "pitch", message: "Debes tener control de pitch" },
    ],
    hints: [
      "eventConfigs define configuración por evento",
      "TriggerEvent reproduce sonido con parámetros",
      "Cada evento tiene volume, pitch, priority",
      "Eventos especiales: gunshot, footstep, explosion",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },

  // ============================================
  // LECCIÓN 4: Quest System (Semana 4)
  // ============================================
  {
    id: "mes-09-leccion-4-ej-1",
    lessonId: "l9-4-quest",
    title: 'Crear Quest con Objetivos Múltiples',
    instructions: 'Crea un sistema de quests con objetivos múltiples.\n\n**Requisitos:**\n- `Quest(id, title, description)` crea quest\n- `AddObjective(objective)` añade objetivo a quest\n- Cada objetivo tiene: id, description, current, target, completed\n- `UpdateObjective(objectiveId, value)` actualiza progreso\n- `IsComplete()` retorna true si todos los objetivos completados\n\n**Pista:** Quest tiene lista de objetivos',
    starterCode: 'local Quest = {}\n\nfunction Quest:new(id, title, description)\n  local self = setmetatable({}, Quest)\n  self.id = id\n  self.title = title\n  self.description = description\n  self.objectives = {}\n  self.isComplete = false\n  return self\nend\n\nfunction Quest:AddObjective(objective)\n  -- Añade objetivo a quest\nend\n\nfunction Quest:UpdateObjective(objectiveId, value)\n  -- Actualiza progreso de objetivo\nend\n\nfunction Quest:IsComplete()\n  -- Verifica si quest completa\nend\n\nreturn Quest',
    solution: 'local Quest = {}\nQuest.__index = Quest\n\nfunction Quest:new(id, title, description)\n  local self = setmetatable({}, Quest)\n  self.id = id\n  self.title = title\n  self.description = description\n  self.objectives = {}\n  self.isComplete = false\n  self.rewards = {}\n  return self\nend\n\nfunction Quest:AddObjective(objective)\n  -- objective: {id, description, current, target, completed}\n  local obj = {\n    id = objective.id,\n    description = objective.description,\n    current = objective.current or 0,\n    target = objective.target,\n    completed = false\n  }\n  \n  table.insert(self.objectives, obj)\n  print("Quest [" .. self.title .. "] - Objetivo añadido: " .. obj.description)\n  return obj\nend\n\nfunction Quest:UpdateObjective(objectiveId, value)\n  for _, obj in ipairs(self.objectives) do\n    if obj.id == objectiveId then\n      obj.current = math.min(obj.target, value)\n      obj.completed = obj.current >= obj.target\n      \n      print("Quest [" .. self.title .. "] - Objetivo " .. objectiveId .. \n            ": " .. obj.current .. "/" .. obj.target)\n      \n      if obj.completed then\n        print("  ✓ Objetivo completado: " .. obj.description)\n      end\n      \n      return obj.completed\n    end\n  end\n  \n  print("Objetivo no encontrado: " .. objectiveId)\n  return false\nend\n\nfunction Quest:IsComplete()\n  for _, obj in ipairs(self.objectives) do\n    if not obj.completed then\n      return false\n    end\n  end\n  self.isComplete = true\n  return true\nend\n\nfunction Quest:GetProgress()\n  local total = #self.objectives\n  local completed = 0\n  \n  for _, obj in ipairs(self.objectives) do\n    if obj.completed then completed = completed + 1 end\n  end\n  \n  return { total = total, completed = completed, percent = completed / total }\nend\n\nfunction Quest:SetRewards(rewards)\n  self.rewards = rewards\n  print("Quest [" .. self.title .. "] - Recompensas: " .. (rewards.xp or 0) .. " XP, " .. (rewards.gold or 0) .. " oro")\nend\n\nreturn Quest',
    tests: [
      { type: "code_contains", expected: "AddObjective", message: "Debes implementar AddObjective" },
      { type: "code_contains", expected: "UpdateObjective", message: "Debes implementar UpdateObjective" },
      { type: "code_contains", expected: "IsComplete", message: "Debes implementar IsComplete" },
      { type: "code_contains", expected: "objectives", message: "Debes tener tabla objectives" },
      { type: "code_contains", expected: "completed", message: "Debes trackear completed" },
      { type: "code_contains", expected: "current", message: "Debes tener current" },
      { type: "code_contains", expected: "target", message: "Debes tener target" },
    ],
    hints: [
      "objectives es lista de objetivos",
      "Cada objetivo tiene current, target, completed",
      "UpdateObjective actualiza current y verifica completado",
      "IsComplete verifica todos los objetivos",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-09-leccion-4-ej-2",
    lessonId: "l9-4-quest",
    title: 'Quest Manager con Múltiples Quests',
    instructions: 'Crea un manager para gestionar múltiples quests activas.\n\n**Requisitos:**\n- `QuestManager()` crea manager\n- `AddQuest(quest)` añade quest activa\n- `GetQuest(questId)` obtiene quest por ID\n- `GetActiveQuests()` retorna lista de quests activas\n- `GetCompletedQuests()` retorna lista de quests completadas\n- Imprime "Quest aceptada: [title]" y "Quest completada: [title]"\n\n**Pista:** Manager tiene tablas separadas para activas y completadas',
    starterCode: 'local QuestManager = {}\n\nfunction QuestManager:new()\n  local self = setmetatable({}, QuestManager)\n  self.activeQuests = {}\n  self.completedQuests = {}\n  return self\nend\n\nfunction QuestManager:AddQuest(quest)\n  -- Añade quest activa\nend\n\nfunction QuestManager:GetQuest(questId)\n  -- Obtiene quest por ID\nend\n\nfunction QuestManager:GetActiveQuests()\n  -- Retorna quests activas\nend\n\nfunction QuestManager:GetCompletedQuests()\n  -- Retorna quests completadas\nend\n\nreturn QuestManager',
    solution: 'local QuestManager = {}\nQuestManager.__index = QuestManager\n\nfunction QuestManager:new()\n  local self = setmetatable({}, QuestManager)\n  self.activeQuests = {}\n  self.completedQuests = {}\n  print("QuestManager inicializado")\n  return self\nend\n\nfunction QuestManager:AddQuest(quest)\n  self.activeQuests[quest.id] = quest\n  print("Quest aceptada: " .. quest.title)\n  print("  Descripción: " .. quest.description)\n  print("  Objetivos: " .. #quest.objectives)\nend\n\nfunction QuestManager:GetQuest(questId)\n  -- Buscar en activas\n  if self.activeQuests[questId] then\n    return self.activeQuests[questId]\n  end\n  \n  -- Buscar en completadas\n  for _, quest in ipairs(self.completedQuests) do\n    if quest.id == questId then\n      return quest\n    end\n  end\n  \n  print("Quest no encontrada: " .. questId)\n  return nil\nend\n\nfunction QuestManager:GetActiveQuests()\n  local quests = {}\n  for _, quest in pairs(self.activeQuests) do\n    table.insert(quests, quest)\n  end\n  return quests\nend\n\nfunction QuestManager:GetCompletedQuests()\n  return self.completedQuests\nend\n\nfunction QuestManager:UpdateObjective(questId, objectiveId, value)\n  local quest = self:GetQuest(questId)\n  \n  if not quest then\n    return false\n  end\n  \n  quest:UpdateObjective(objectiveId, value)\n  \n  -- Verificar si quest completa\n  if quest:IsComplete() then\n    self:CompleteQuest(questId)\n  end\n  \n  return true\nend\n\nfunction QuestManager:CompleteQuest(questId)\n  local quest = self.activeQuests[questId]\n  \n  if not quest then\n    return false\n  end\n  \n  -- Mover a completadas\n  self.activeQuests[questId] = nil\n  table.insert(self.completedQuests, quest)\n  \n  print("\\n=== QUEST COMPLETADA ===")\n  print(quest.title)\n  print("Recompensas: " .. (quest.rewards.xp or 0) .. " XP, " .. (quest.rewards.gold or 0) .. " oro")\n  print("========================\\n")\n  \n  return true\nend\n\nfunction QuestManager:GetQuestCount()\n  local active = 0\n  for _ in pairs(self.activeQuests) do active = active + 1 end\n  return { active = active, completed = #self.completedQuests }\nend\n\nreturn QuestManager',
    tests: [
      { type: "code_contains", expected: "AddQuest", message: "Debes implementar AddQuest" },
      { type: "code_contains", expected: "GetQuest", message: "Debes implementar GetQuest" },
      { type: "code_contains", expected: "GetActiveQuests", message: "Debes implementar GetActiveQuests" },
      { type: "code_contains", expected: "GetCompletedQuests", message: "Debes implementar GetCompletedQuests" },
      { type: "code_contains", expected: "activeQuests", message: "Debes tener activeQuests" },
      { type: "code_contains", expected: "completedQuests", message: "Debes tener completedQuests" },
      { type: "code_contains", expected: "CompleteQuest", message: "Debes implementar CompleteQuest" },
    ],
    hints: [
      "activeQuests es diccionario id -> quest",
      "completedQuests es lista de quests completadas",
      "UpdateObjective verifica si quest completa",
      "CompleteQuest mueve quest a completadas",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-09-leccion-4-ej-3",
    lessonId: "l9-4-quest",
    title: 'Event Bus para Quests (Publisher/Subscriber)',
    instructions: 'Implementa un Event Bus para notificar eventos de quests.\n\n**Requisitos:**\n- `QuestEventBus()` crea bus de eventos\n- `Subscribe(eventType, callback)` suscribe a evento\n- `Unsubscribe(eventType, callback)` cancela suscripción\n- `Publish(eventType, data)` publica evento a todos los suscriptores\n- Eventos: "QuestAccepted", "QuestCompleted", "ObjectiveUpdated"\n\n**Pista:** Event Bus usa tabla de suscriptores por tipo de evento',
    starterCode: 'local QuestEventBus = {}\n\nfunction QuestEventBus:new()\n  local self = setmetatable({}, QuestEventBus)\n  self.subscribers = {}  -- eventType -> {callbacks}\n  return self\nend\n\nfunction QuestEventBus:Subscribe(eventType, callback)\n  -- Suscribe a evento\nend\n\nfunction QuestEventBus:Unsubscribe(eventType, callback)\n  -- Cancela suscripción\nend\n\nfunction QuestEventBus:Publish(eventType, data)\n  -- Publica evento a suscriptores\nend\n\nreturn QuestEventBus',
    solution: 'local QuestEventBus = {}\nQuestEventBus.__index = QuestEventBus\n\nfunction QuestEventBus:new()\n  local self = setmetatable({}, QuestEventBus)\n  self.subscribers = {}  -- eventType -> {callbacks}\n  print("QuestEventBus inicializado")\n  return self\nend\n\nfunction QuestEventBus:Subscribe(eventType, callback)\n  if not self.subscribers[eventType] then\n    self.subscribers[eventType] = {}\n  end\n  \n  table.insert(self.subscribers[eventType], callback)\n  print("Suscripto a evento: " .. eventType)\nend\n\nfunction QuestEventBus:Unsubscribe(eventType, callback)\n  if not self.subscribers[eventType] then\n    return false\n  end\n  \n  for i, cb in ipairs(self.subscribers[eventType]) do\n    if cb == callback then\n      table.remove(self.subscribers[eventType], i)\n      print("Desuscripto de evento: " .. eventType)\n      return true\n    end\n  end\n  \n  return false\nend\n\nfunction QuestEventBus:Publish(eventType, data)\n  print("\\n=== PUBLICANDO EVENTO ===")\n  print("Tipo: " .. eventType)\n  \n  if not self.subscribers[eventType] then\n    print("No hay suscriptores para: " .. eventType)\n    return 0\n  end\n  \n  local notifiedCount = 0\n  \n  for _, callback in ipairs(self.subscribers[eventType]) do\n    local success, err = pcall(callback, data)\n    \n    if success then\n      notifiedCount = notifiedCount + 1\n    else\n      print("Error en callback: " .. tostring(err))\n    end\n  end\n  \n  print("Suscriptores notificados: " .. notifiedCount)\n  print("========================\\n")\n  \n  return notifiedCount\nend\n\n-- Eventos predefinidos\nfunction QuestEventBus:PublishQuestAccepted(quest)\n  self:Publish("QuestAccepted", { quest = quest })\nend\n\nfunction QuestEventBus:PublishQuestCompleted(quest)\n  self:Publish("QuestCompleted", { quest = quest })\nend\n\nfunction QuestEventBus:PublishObjectiveUpdated(quest, objective)\n  self:Publish("ObjectiveUpdated", { quest = quest, objective = objective })\nend\n\nfunction QuestEventBus:GetSubscriberCount(eventType)\n  if not self.subscribers[eventType] then\n    return 0\n  end\n  return #self.subscribers[eventType]\nend\n\nreturn QuestEventBus',
    tests: [
      { type: "code_contains", expected: "Subscribe", message: "Debes implementar Subscribe" },
      { type: "code_contains", expected: "Unsubscribe", message: "Debes implementar Unsubscribe" },
      { type: "code_contains", expected: "Publish", message: "Debes implementar Publish" },
      { type: "code_contains", expected: "subscribers", message: "Debes tener tabla subscribers" },
      { type: "code_contains", expected: "eventType", message: "Debes usar eventType" },
      { type: "code_contains", expected: "pcall", message: "Debes usar pcall para callbacks" },
      { type: "code_contains", expected: "QuestAccepted", message: "Debes tener evento QuestAccepted" },
      { type: "code_contains", expected: "QuestCompleted", message: "Debes tener evento QuestCompleted" },
    ],
    hints: [
      "subscribers es diccionario eventType -> {callbacks}",
      "Subscribe añade callback a la lista",
      "Publish itera sobre callbacks y ejecuta",
      "Usa pcall para capturar errores en callbacks",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 9
  // ============================================
  {
    id: "mes-09-final-proyecto",
    lessonId: "l9-4-quest",
    title: 'Proyecto: Dungeon Crawler Procedural Completo',
    instructions: 'Crea el entregable del Mes 9: Dungeon Crawler con todos los sistemas integrados.\n\n**Requisitos:**\n1. Generación Procedural:\n   - Dungeon con 5+ rooms (start, normal, treasure, boss)\n   - Corridors conectando rooms\n   - Seed reproducible\n\n2. Materiales Dinámicos:\n   - MPC Global para iluminación\n   - Ciclo día/noche que afecta dungeon\n   - Materiales dinámicos en puertas/trampas\n\n3. Audio Adaptativo:\n   - Música según estado (exploration, danger, combat)\n   - Audio reactivo a eventos (disparos, impactos)\n   - Crossfade entre tracks\n\n4. Sistema de Quests:\n   - 5 quests encadenadas\n   - Múltiples objetivos por quest\n   - Event Bus para notificaciones\n   - Recompensas por completar\n\n**Pista:** Integra todos los sistemas de las semanas anteriores',
    starterCode: '-- Dungeon Crawler Procedural Completo\nlocal DungeonCrawler = {}\n\nfunction DungeonCrawler:new()\n  local self = setmetatable({}, DungeonCrawler)\n  \n  -- Inicializar sistemas\n  self.dungeonGenerator = nil\n  self.dayNightCycle = nil\n  self.adaptiveMusic = nil\n  self.reactiveAudio = nil\n  self.questManager = nil\n  self.eventBus = nil\n  \n  return self\nend\n\nfunction DungeonCrawler:Initialize()\n  -- Inicializa todos los sistemas\nend\n\nfunction DungeonCrawler:GenerateDungeon()\n  -- Genera dungeon procedural\nend\n\nfunction DungeonCrawler:StartGame()\n  -- Inicia juego\nend\n\nreturn DungeonCrawler',
    solution: '-- Dungeon Crawler Procedural Completo\nlocal DungeonCrawler = {}\nDungeonCrawler.__index = DungeonCrawler\n\n-- Importar sistemas (referencias a ejercicios anteriores)\nlocal RandomGenerator = {}\nRandomGenerator.__index = RandomGenerator\nfunction RandomGenerator:new(seed)\n  local self = setmetatable({}, RandomGenerator)\n  self.seed = seed or 12345\n  return self\nend\nfunction RandomGenerator:Next()\n  self.seed = (1103515245 * self.seed + 12345) % 2147483648\n  return self.seed / 2147483648\nend\nfunction RandomGenerator:NextInt(min, max)\n  return math.floor(self:Next() * (max - min + 1)) + min\nend\n\nfunction DungeonCrawler:new()\n  local self = setmetatable({}, DungeonCrawler)\n  \n  -- Inicializar sistemas\n  self.dungeonGenerator = nil\n  self.dayNightCycle = nil\n  self.adaptiveMusic = nil\n  self.reactiveAudio = nil\n  self.questManager = nil\n  self.eventBus = nil\n  self.player = { health = 100, gold = 0, xp = 0 }\n  \n  return self\nend\n\nfunction DungeonCrawler:Initialize()\n  print("\\n========================================")\n  print("INICIALIZANDO DUNGEON CRAWLER")\n  print("========================================\\n")\n  \n  -- 1. Event Bus primero (para notificaciones)\n  self.eventBus = QuestEventBus:new()\n  \n  -- Configurar suscriptores\n  self.eventBus:Subscribe("QuestAccepted", function(data)\n    print("📜 Notificación: Nueva quest aceptada - " .. data.quest.title)\n  end)\n  \n  self.eventBus:Subscribe("QuestCompleted", function(data)\n    print("✅ Notificación: Quest completada - " .. data.quest.title)\n    print("   Recompensa: " .. (data.quest.rewards.xp or 0) .. " XP")\n    self.player.xp = self.player.xp + (data.quest.rewards.xp or 0)\n  end)\n  \n  self.eventBus:Subscribe("ObjectiveUpdated", function(data)\n    print("📌 Notificación: Objetivo actualizado en " .. data.quest.title)\n  end)\n  \n  -- 2. Quest Manager\n  self.questManager = QuestManager:new()\n  \n  -- 3. Audio\n  self.adaptiveMusic = AdaptiveMusic:new()\n  self.reactiveAudio = ReactiveAudio:new()\n  \n  -- 4. Ciclo día/noche\n  self.dayNightCycle = DayNightCycle:new()\n  \n  print("\\nSistemas inicializados:")\n  print("- Event Bus ✓")\n  print("- Quest Manager ✓")\n  print("- Adaptive Music ✓")\n  print("- Reactive Audio ✓")\n  print("- Day/Night Cycle ✓")\nend\n\nfunction DungeonCrawler:GenerateDungeon(seed)\n  print("\\n========================================")\n  print("GENERANDO DUNGEON")\n  print("========================================")\n  \n  -- Usar seed para generación reproducible\n  local rng = RandomGenerator:new(seed or os.time())\n  \n  -- Generar dungeon\n  self.dungeon = {\n    seed = seed,\n    rooms = {},\n    corridors = {},\n    width = 100,\n    height = 100\n  }\n  \n  -- Generar rooms\n  local roomCount = 5\n  for i = 1, roomCount do\n    local room = {\n      id = i,\n      x = rng:NextInt(5, 80),\n      y = rng:NextInt(5, 80),\n      width = rng:NextInt(8, 15),\n      height = rng:NextInt(8, 15),\n      type = self:GetRoomType(i, roomCount),\n      cleared = false,\n      enemies = {}\n    }\n    \n    table.insert(self.dungeon.rooms, room)\n    print("Room " .. i .. " (" .. room.type .. "): (" .. room.x .. ", " .. room.y .. ")")\n  end\n  \n  -- Generar corridors\n  for i = 1, roomCount - 1 do\n    table.insert(self.dungeon.corridors, {\n      from = i,\n      to = i + 1,\n      length = rng:NextInt(10, 30)\n    })\n  end\n  \n  print("\\nDungeon generado:")\n  print("- Rooms: " .. #self.dungeon.rooms)\n  print("- Corridors: " .. #self.dungeon.corridors)\n  print("- Seed: " .. seed)\n  print("========================================\\n")\n  \n  return self.dungeon\nend\n\nfunction DungeonCrawler:GetRoomType(index, total)\n  if index == 1 then return "start"\n  elseif index == total then return "boss"\n  elseif index == math.floor(total / 2) then return "treasure"\n  else return "normal"\n  end\nend\n\nfunction DungeonCrawler:SetupQuests()\n  print("\\n========================================")\n  print("CONFIGURANDO QUESTS")\n  print("========================================\\n")\n  \n  -- Quest 1: Explorar entrada\n  local quest1 = Quest:new("q1", "Explorar la Entrada", "Explora las primeras rooms del dungeon")\n  quest1:AddObjective({ id = "explore_1", description = "Explora room de inicio", current = 0, target = 1 })\n  quest1:AddObjective({ id = "explore_2", description = "Explora primer corridor", current = 0, target = 1 })\n  quest1:SetRewards({ xp = 100, gold = 50 })\n  self.questManager:AddQuest(quest1)\n  self.eventBus:PublishQuestAccepted(quest1)\n  \n  -- Quest 2: Derrotar enemigos\n  local quest2 = Quest:new("q2", "Cazador de Monstruos", "Derrota 5 enemigos en el dungeon")\n  quest2:AddObjective({ id = "kill_enemies", description = "Derrota enemigos", current = 0, target = 5 })\n  quest2:SetRewards({ xp = 200, gold = 100 })\n  self.questManager:AddQuest(quest2)\n  self.eventBus:PublishQuestAccepted(quest2)\n  \n  -- Quest 3: Encontrar tesoro\n  local quest3 = Quest:new("q3", "El Tesoro Perdido", "Encuentra el tesoro en la room central")\n  quest3:AddObjective({ id = "find_treasure", description = "Encuentra room del tesoro", current = 0, target = 1 })\n  quest3:AddObjective({ id = "collect_gold", description = "Colecciona 100 de oro", current = 0, target = 100 })\n  quest3:SetRewards({ xp = 300, gold = 200 })\n  self.questManager:AddQuest(quest3)\n  self.eventBus:PublishQuestAccepted(quest3)\n  \n  -- Quest 4: Sobrevivir hasta la noche\n  local quest4 = Quest:new("q4", "Sobrevivir la Noche", "Sobrevive en el dungeon hasta la noche")\n  quest4:AddObjective({ id = "survive_night", description = "Espera hasta hora 20", current = 0, target = 20 })\n  quest4:SetRewards({ xp = 250, gold = 150 })\n  self.questManager:AddQuest(quest4)\n  self.eventBus:PublishQuestAccepted(quest4)\n  \n  -- Quest 5: Derrotar al boss\n  local quest5 = Quest:new("q5", "El Señor del Dungeon", "Derrota al boss final")\n  quest5:AddObjective({ id = "reach_boss", description = "Llega a room del boss", current = 0, target = 1 })\n  quest5:AddObjective({ id = "defeat_boss", description = "Derrota al boss", current = 0, target = 1 })\n  quest5:SetRewards({ xp = 500, gold = 500 })\n  self.questManager:AddQuest(quest5)\n  self.eventBus:PublishQuestAccepted(quest5)\n  \n  print("\\nTotal quests: " .. #self.questManager:GetActiveQuests())\n  print("========================================\\n")\nend\n\nfunction DungeonCrawler:StartGame()\n  print("\\n========================================")\n  print("INICIANDO JUEGO")\n  print("========================================\\n")\n  \n  -- Generar dungeon\n  self:GenerateDungeon(12345)\n  \n  -- Configurar quests\n  self:SetupQuests()\n  \n  -- Iniciar ciclo día/noche\n  self.dayNightCycle:SetHour(8)  -- Amanecer\n  \n  -- Música de exploración\n  self.adaptiveMusic:SetGameState("exploration")\n  \n  print("\\n=== ESTADO DEL JUGADOR ===")\n  print("Salud: " .. self.player.health)\n  print("Oro: " .. self.player.gold)\n  print("XP: " .. self.player.xp)\n  print("==========================\\n")\n  \n  print("¡Dungeon Crawler listo para jugar!")\n  print("========================================\\n")\nend\n\nfunction DungeonCrawler:Update(deltaTime)\n  -- Actualizar ciclo día/noche\n  self.dayNightCycle:Update(deltaTime)\n  \n  -- Actualizar música según hora\n  local hour = self.dayNightCycle:GetHour()\n  if hour >= 20 or hour <= 6 then\n    self.adaptiveMusic:SetGameState("danger")\n  else\n    self.adaptiveMusic:SetGameState("exploration")\n  end\n  \n  self.adaptiveMusic:Update(deltaTime)\nend\n\nfunction DungeonCrawler:OnEnemyKilled()\n  -- Audio reactivo\n  self.reactiveAudio:TriggerEvent("impact", { volume = 0.8 })\n  \n  -- Actualizar quest\n  self.questManager:UpdateObjective("q2", "kill_enemies", \n    self.questManager:GetQuest("q2").objectives[1].current + 1)\nend\n\nfunction DungeonCrawler:OnGoldCollected(amount)\n  self.player.gold = self.player.gold + amount\n  self.questManager:UpdateObjective("q3", "collect_gold", self.player.gold)\nend\n\n-- Clases necesarias (referencias)\nlocal Quest = {}\nQuest.__index = Quest\nfunction Quest:new(id, title, description)\n  local self = setmetatable({}, Quest)\n  self.id = id\n  self.title = title\n  self.description = description\n  self.objectives = {}\n  self.isComplete = false\n  self.rewards = {}\n  return self\nend\nfunction Quest:AddObjective(obj)\n  table.insert(self.objectives, obj)\nend\nfunction Quest:UpdateObjective(id, value)\n  for _, obj in ipairs(self.objectives) do\n    if obj.id == id then\n      obj.current = math.min(obj.target, value)\n      obj.completed = obj.current >= obj.target\n      return obj.completed\n    end\n  end\nend\nfunction Quest:IsComplete()\n  for _, obj in ipairs(self.objectives) do\n    if not obj.completed then return false end\n  end\n  return true\nend\nfunction Quest:SetRewards(rewards)\n  self.rewards = rewards\nend\n\nlocal QuestManager = {}\nQuestManager.__index = QuestManager\nfunction QuestManager:new()\n  local self = setmetatable({}, QuestManager)\n  self.activeQuests = {}\n  self.completedQuests = {}\n  return self\nend\nfunction QuestManager:AddQuest(quest)\n  self.activeQuests[quest.id] = quest\nend\nfunction QuestManager:GetQuest(id)\n  return self.activeQuests[id]\nend\nfunction QuestManager:GetActiveQuests()\n  local quests = {}\n  for _, q in pairs(self.activeQuests) do table.insert(quests, q) end\n  return quests\nend\nfunction QuestManager:UpdateObjective(qid, oid, val)\n  local quest = self.activeQuests[qid]\n  if quest then quest:UpdateObjective(oid, val) end\nend\n\nlocal QuestEventBus = {}\nQuestEventBus.__index = QuestEventBus\nfunction QuestEventBus:new()\n  local self = setmetatable({}, QuestEventBus)\n  self.subscribers = {}\n  return self\nend\nfunction QuestEventBus:Subscribe(eventType, cb)\n  if not self.subscribers[eventType] then self.subscribers[eventType] = {} end\n  table.insert(self.subscribers[eventType], cb)\nend\nfunction QuestEventBus:Publish(eventType, data)\n  if self.subscribers[eventType] then\n    for _, cb in ipairs(self.subscribers[eventType]) do pcall(cb, data) end\n  end\nend\nfunction QuestEventBus:PublishQuestAccepted(q) self:Publish("QuestAccepted", {quest=q}) end\nfunction QuestEventBus:PublishQuestCompleted(q) self:Publish("QuestCompleted", {quest=q}) end\nfunction QuestEventBus:PublishObjectiveUpdated(q, o) self:Publish("ObjectiveUpdated", {quest=q, objective=o}) end\n\nlocal AdaptiveMusic = {}\nAdaptiveMusic.__index = AdaptiveMusic\nfunction AdaptiveMusic:new()\n  local self = setmetatable({}, AdaptiveMusic)\n  self.currentState = "exploration"\n  self.targetState = "exploration"\n  self.tracks = {\n    exploration = {bpm=90, intensity=0.3},\n    danger = {bpm=120, intensity=0.6},\n    combat = {bpm=150, intensity=1.0}\n  }\n  return self\nend\nfunction AdaptiveMusic:SetGameState(state) self.targetState = state end\nfunction AdaptiveMusic:Update(dt) end\n\nlocal ReactiveAudio = {}\nReactiveAudio.__index = ReactiveAudio\nfunction ReactiveAudio:new()\n  local self = setmetatable({}, ReactiveAudio)\n  self.eventConfigs = {}\n  return self\nend\nfunction ReactiveAudio:TriggerEvent(type, data)\n  print("Audio evento: " .. type)\nend\n\nlocal DayNightCycle = {}\nDayNightCycle.__index = DayNightCycle\nfunction DayNightCycle:new()\n  local self = setmetatable({}, DayNightCycle)\n  self.currentHour = 12\n  return self\nend\nfunction DayNightCycle:Update(dt)\n  self.currentHour = (self.currentHour + dt * 0.1) % 24\nend\nfunction DayNightCycle:GetHour() return self.currentHour end\nfunction DayNightCycle:SetHour(h) self.currentHour = h end\n\nreturn DungeonCrawler',
    tests: [
      { type: "code_contains", expected: "DungeonCrawler", message: "Debes tener DungeonCrawler" },
      { type: "code_contains", expected: "GenerateDungeon", message: "Debes implementar GenerateDungeon" },
      { type: "code_contains", expected: "SetupQuests", message: "Debes implementar SetupQuests" },
      { type: "code_contains", expected: "StartGame", message: "Debes implementar StartGame" },
      { type: "code_contains", expected: "rooms", message: "Debes tener rooms" },
      { type: "code_contains", expected: "corridors", message: "Debes tener corridors" },
      { type: "code_contains", expected: "questManager", message: "Debes tener questManager" },
      { type: "code_contains", expected: "eventBus", message: "Debes tener eventBus" },
      { type: "code_contains", expected: "adaptiveMusic", message: "Debes tener adaptiveMusic" },
      { type: "code_contains", expected: "reactiveAudio", message: "Debes tener reactiveAudio" },
      { type: "code_contains", expected: "dayNightCycle", message: "Debes tener dayNightCycle" },
      { type: "code_contains", expected: "5", message: "Debes tener 5 quests" },
    ],
    hints: [
      "DungeonCrawler integra todos los sistemas",
      "GenerateDungeon crea rooms y corridors",
      "SetupQuests crea 5 quests encadenadas",
      "Event Bus notifica eventos de quests",
      "Audio adaptativo cambia según estado",
      "DayNightCycle afecta iluminación y música",
    ],
    difficulty: "advanced",
    xpReward: 450,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes09Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes09Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes09Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
