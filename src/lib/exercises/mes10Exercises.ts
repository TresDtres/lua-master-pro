import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 10: Arquitectura de Proyecto Real y Diseño de Sistemas
// ============================================
// Basado en el plan de estudio:
// Semana 1: Diseño del juego final - GDD, scope, sistemas necesarios
// Semana 2: Game Framework - GameMode, GameState, PlayerState en Lua
// Semana 3: Data-driven design - JSON/CSV, hot-reload de datos
// Semana 4: Testing - TDD, luaunit, tests unitarios automatizados
// ============================================
// Entregable del mes: Documento de Arquitectura + Game Framework funcional
// con 3 sistemas core integrados y tests automatizados
// ============================================

export const mes10Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: Diseño del Juego (Semana 1)
  // ============================================
  {
    id: "mes-10-leccion-1-ej-1",
    lessonId: "l10-1-design",
    title: 'Crear Game Design Document (GDD) Estructurado',
    instructions: 'Crea una estructura de GDD para documentar tu juego.\n\n**Requisitos:**\n- `GameDesignDocument(title)` crea GDD con título\n- `AddSection(name, content)` añade sección al GDD\n- `GetSection(name)` obtiene contenido de sección\n- `ExportToJSON()` exporta GDD completo a JSON\n- Secciones básicas: Overview, Gameplay, Story, Characters, Levels\n\n**Pista:** Usa tabla para almacenar secciones del GDD',
    starterCode: 'local GameDesignDocument = {}\n\nfunction GameDesignDocument:new(title)\n  local self = setmetatable({}, GameDesignDocument)\n  self.title = title\n  self.sections = {}\n  self.version = "1.0"\n  return self\nend\n\nfunction GameDesignDocument:AddSection(name, content)\n  -- Añade sección al GDD\nend\n\nfunction GameDesignDocument:GetSection(name)\n  -- Obtiene sección del GDD\nend\n\nfunction GameDesignDocument:ExportToJSON()\n  -- Exporta GDD a JSON\nend\n\nreturn GameDesignDocument',
    solution: 'local GameDesignDocument = {}\nGameDesignDocument.__index = GameDesignDocument\n\nfunction GameDesignDocument:new(title)\n  local self = setmetatable({}, GameDesignDocument)\n  self.title = title\n  self.sections = {}\n  self.version = "1.0"\n  self.lastUpdated = os.date("%Y-%m-%d")\n  print("GDD creado: " .. title)\n  return self\nend\n\nfunction GameDesignDocument:AddSection(name, content)\n  self.sections[name] = {\n    title = name,\n    content = content,\n    lastUpdated = os.date("%Y-%m-%d")\n  }\n  print("Sección añadida: " .. name)\n  return self.sections[name]\nend\n\nfunction GameDesignDocument:GetSection(name)\n  return self.sections[name]\nend\n\nfunction GameDesignDocument:ExportToJSON()\n  local exportData = {\n    title = self.title,\n    version = self.version,\n    lastUpdated = self.lastUpdated,\n    sections = self.sections\n  }\n  \n  -- En Lua real, usarías json.encode(exportData)\n  print("\\n=== EXPORTANDO GDD ===")\n  print("Título: " .. self.title)\n  print("Versión: " .. self.version)\n  print("Secciones: " .. #self.sections)\n  \n  for name, section in pairs(self.sections) do\n    print("  - " .. name)\n  end\n  print("========================\\n")\n  \n  return exportData\nend\n\nfunction GameDesignDocument:AddDefaultSections()\n  -- Añadir secciones estándar de GDD\n  self:AddSection("Overview", "Descripción general del juego")\n  self:AddSection("Gameplay", "Mecánicas principales y sistema de juego")\n  self:AddSection("Story", "Historia, personajes y mundo")\n  self:AddSection("Characters", "Personajes jugables y NPCs")\n  self:AddSection("Levels", "Diseño de niveles y progresión")\n  self:AddSection("Art", "Estilo artístico y referencias")\n  self:AddSection("Audio", "Música y efectos de sonido")\n  self:AddSection("Technical", "Requisitos técnicos y plataforma")\n  \n  print("Secciones estándar añadidas: 8")\nend\n\nfunction GameDesignDocument:GetSectionCount()\n  local count = 0\n  for _ in pairs(self.sections) do count = count + 1 end\n  return count\nend\n\nreturn GameDesignDocument',
    tests: [
      { type: "code_contains", expected: "AddSection", message: "Debes implementar AddSection" },
      { type: "code_contains", expected: "GetSection", message: "Debes implementar GetSection" },
      { type: "code_contains", expected: "ExportToJSON", message: "Debes implementar ExportToJSON" },
      { type: "code_contains", expected: "sections", message: "Debes tener tabla sections" },
      { type: "code_contains", expected: "version", message: "Debes tener version" },
      { type: "code_contains", expected: "title", message: "Debes tener title" },
    ],
    hints: [
      "sections almacena todas las secciones del GDD",
      "AddSection guarda contenido con metadata",
      "ExportToJSON prepara datos para exportar",
      "Secciones estándar: Overview, Gameplay, Story, etc.",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-10-leccion-1-ej-2",
    lessonId: "l10-1-design",
    title: 'Definir Scope del Proyecto',
    instructions: 'Crea un sistema para definir y trackear el scope del proyecto.\n\n**Requisitos:**\n- `ProjectScope()` crea definición de scope\n- `AddFeature(name, priority, estimatedHours)` añade feature\n- `GetTotalEstimatedHours()` retorna horas totales estimadas\n- `GetFeaturesByPriority(priority)` filtra features por prioridad\n- `CheckScopeCreep()` detecta si el scope está creciendo sin control\n\n**Pista:** Prioridades: Critical, High, Medium, Low',
    starterCode: 'local ProjectScope = {}\n\nfunction ProjectScope:new()\n  local self = setmetatable({}, ProjectScope)\n  self.features = {}\n  self.maxHours = 1000  -- Scope máximo recomendado\n  return self\nend\n\nfunction ProjectScope:AddFeature(name, priority, estimatedHours)\n  -- Añade feature al scope\nend\n\nfunction ProjectScope:GetTotalEstimatedHours()\n  -- Retorna horas totales\nend\n\nfunction ProjectScope:GetFeaturesByPriority(priority)\n  -- Filtra features por prioridad\nend\n\nfunction ProjectScope:CheckScopeCreep()\n  -- Detecta scope creep\nend\n\nreturn ProjectScope',
    solution: 'local ProjectScope = {}\nProjectScope.__index = ProjectScope\n\nfunction ProjectScope:new()\n  local self = setmetatable({}, ProjectScope)\n  self.features = {}\n  self.maxHours = 1000  -- Scope máximo recomendado\n  self.status = "Planning"\n  print("ProjectScope inicializado")\n  print("Horas máximas recomendadas: " .. self.maxHours)\n  return self\nend\n\nfunction ProjectScope:AddFeature(name, priority, estimatedHours)\n  -- Validar prioridad\n  local validPriorities = { "Critical", "High", "Medium", "Low" }\n  local isValid = false\n  for _, p in ipairs(validPriorities) do\n    if p == priority then isValid = true break end\n  end\n  \n  if not isValid then\n    print("Prioridad inválida: " .. priority .. ". Usando Medium")\n    priority = "Medium"\n  end\n  \n  local feature = {\n    id = #self.features + 1,\n    name = name,\n    priority = priority,\n    estimatedHours = estimatedHours,\n    status = "Planned",\n    actualHours = 0\n  }\n  \n  table.insert(self.features, feature)\n  print("Feature añadida: " .. name .. " [" .. priority .. "] - " .. estimatedHours .. "h")\n  \n  return feature\nend\n\nfunction ProjectScope:GetTotalEstimatedHours()\n  local total = 0\n  for _, feature in ipairs(self.features) do\n    total = total + feature.estimatedHours\n  end\n  return total\nend\n\nfunction ProjectScope:GetFeaturesByPriority(priority)\n  local filtered = {}\n  for _, feature in ipairs(self.features) do\n    if feature.priority == priority then\n      table.insert(filtered, feature)\n    end\n  end\n  return filtered\nend\n\nfunction ProjectScope:CheckScopeCreep()\n  local totalHours = self:GetTotalEstimatedHours()\n  local status = "OK"\n  \n  if totalHours > self.maxHours * 1.5 then\n    status = "CRITICAL - Scope demasiado grande"\n  elseif totalHours > self.maxHours then\n    status = "WARNING - Scope excede recomendación"\n  elseif totalHours > self.maxHours * 0.8 then\n    status = "CAUTION - Acercándose al límite"\n  end\n  \n  print("\\n=== SCOPE ANALYSIS ===")\n  print("Total horas estimadas: " .. totalHours)\n  print("Horas máximas: " .. self.maxHours)\n  print("Features: " .. #self.features)\n  print("Estado: " .. status)\n  print("======================\\n")\n  \n  return {\n    totalHours = totalHours,\n    maxHours = self.maxHours,\n    featureCount = #self.features,\n    status = status,\n    isManageable = totalHours <= self.maxHours\n  }\nend\n\nfunction ProjectScope:GetCriticalFeatures()\n  return self:GetFeaturesByPriority("Critical")\nend\n\nfunction ProjectScope:RemoveFeature(featureId)\n  for i, feature in ipairs(self.features) do\n    if feature.id == featureId then\n      table.remove(self.features, i)\n      print("Feature removida: " .. feature.name)\n      return true\n    end\n  end\n  return false\nend\n\nreturn ProjectScope',
    tests: [
      { type: "code_contains", expected: "AddFeature", message: "Debes implementar AddFeature" },
      { type: "code_contains", expected: "GetTotalEstimatedHours", message: "Debes implementar GetTotalEstimatedHours" },
      { type: "code_contains", expected: "GetFeaturesByPriority", message: "Debes implementar GetFeaturesByPriority" },
      { type: "code_contains", expected: "CheckScopeCreep", message: "Debes implementar CheckScopeCreep" },
      { type: "code_contains", expected: "features", message: "Debes tener tabla features" },
      { type: "code_contains", expected: "maxHours", message: "Debes tener maxHours" },
      { type: "code_contains", expected: "priority", message: "Debes tener priority" },
      { type: "code_contains", expected: "Critical", message: "Debes tener prioridad Critical" },
    ],
    hints: [
      "features es lista de features del proyecto",
      "Cada feature tiene name, priority, estimatedHours",
      "CheckScopeCreep compara total con maxHours",
      "Prioridades: Critical, High, Medium, Low",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-10-leccion-1-ej-3",
    lessonId: "l10-1-design",
    title: 'Definir Vertical Slice del Juego',
    instructions: 'Crea un plan para el Vertical Slice (demo jugable pulida).\n\n**Requisitos:**\n- `VerticalSlice(gameName)` crea plan del vertical slice\n- `AddCoreMechanic(name, description)` añade mecánica core\n- `AddContent(type, name, description)` añade contenido (nivel, personaje, etc.)\n- `IsReady()` verifica si el vertical slice está completo\n- `GetPolishLevel()` retorna nivel de polish (0-100%)\n\n**Pista:** Vertical slice debe ser pequeño pero pulido',
    starterCode: 'local VerticalSlice = {}\n\nfunction VerticalSlice:new(gameName)\n  local self = setmetatable({}, VerticalSlice)\n  self.gameName = gameName\n  self.coreMechanics = {}\n  self.content = {}\n  self.polishTargets = {}\n  return self\nend\n\nfunction VerticalSlice:AddCoreMechanic(name, description)\n  -- Añade mecánica core\nend\n\nfunction VerticalSlice:AddContent(type, name, description)\n  -- Añade contenido al slice\nend\n\nfunction VerticalSlice:IsReady()\n  -- Verifica si está listo\nend\n\nfunction VerticalSlice:GetPolishLevel()\n  -- Retorna nivel de polish\nend\n\nreturn VerticalSlice',
    solution: 'local VerticalSlice = {}\nVerticalSlice.__index = VerticalSlice\n\nfunction VerticalSlice:new(gameName)\n  local self = setmetatable({}, VerticalSlice)\n  self.gameName = gameName\n  self.coreMechanics = {}\n  self.content = {}\n  self.polishTargets = {}\n  self.isComplete = false\n  print("Vertical Slice creado: " .. gameName)\n  return self\nend\n\nfunction VerticalSlice:AddCoreMechanic(name, description)\n  local mechanic = {\n    id = #self.coreMechanics + 1,\n    name = name,\n    description = description,\n    implemented = false,\n    polished = false\n  }\n  \n  table.insert(self.coreMechanics, mechanic)\n  print("Mecánica core añadida: " .. name)\n  return mechanic\nend\n\nfunction VerticalSlice:AddContent(type, name, description)\n  -- type: "level", "character", "enemy", "item", "ui"\n  local item = {\n    id = #self.content + 1,\n    type = type,\n    name = name,\n    description = description,\n    implemented = false,\n    polished = false\n  }\n  \n  table.insert(self.content, item)\n  print("Contenido añadido: " .. type .. " - " .. name)\n  return item\nend\n\nfunction VerticalSlice:MarkImplemented(id, type)\n  if type == "mechanic" then\n    self.coreMechanics[id].implemented = true\n  elseif type == "content" then\n    self.content[id].implemented = true\n  end\nend\n\nfunction VerticalSlice:MarkPolished(id, type)\n  if type == "mechanic" then\n    self.coreMechanics[id].polished = true\n  elseif type == "content" then\n    self.content[id].polished = true\n  end\nend\n\nfunction VerticalSlice:IsReady()\n  -- Verificar todas las mecánicas implementadas y pulidas\n  local allMechanicsReady = true\n  for _, m in ipairs(self.coreMechanics) do\n    if not m.implemented or not m.polished then\n      allMechanicsReady = false\n      break\n    end\n  end\n  \n  -- Verificar contenido implementado\n  local allContentReady = true\n  for _, c in ipairs(self.content) do\n    if not c.implemented then\n      allContentReady = false\n      break\n    end\n  end\n  \n  self.isComplete = allMechanicsReady and allContentReady\n  \n  print("\\n=== VERTICAL SLICE STATUS ===")\n  print("Mecánicas core: " .. self.coreMechanics[#self.coreMechanics].id .. "/" .. #self.coreMechanics)\n  print("Contenido: " .. self.content[#self.content].id .. "/" .. #self.content)\n  print("¿Listo?: " .. tostring(self.isComplete))\n  print("==============================\\n")\n  \n  return self.isComplete\nend\n\nfunction VerticalSlice:GetPolishLevel()\n  local totalItems = #self.coreMechanics + #self.content\n  local polishedItems = 0\n  \n  for _, m in ipairs(self.coreMechanics) do\n    if m.polished then polishedItems = polishedItems + 1 end\n  end\n  \n  for _, c in ipairs(self.content) do\n    if c.polished then polishedItems = polishedItems + 1 end\n  end\n  \n  if totalItems == 0 then return 0 end\n  \n  local level = math.floor((polishedItems / totalItems) * 100)\n  print("Nivel de polish: " .. level .. "% (" .. polishedItems .. "/" .. totalItems .. " items)")\n  return level\nend\n\nfunction VerticalSlice:GetSummary()\n  return {\n    gameName = self.gameName,\n    coreMechanicsCount = #self.coreMechanics,\n    contentCount = #self.content,\n    polishLevel = self:GetPolishLevel(),\n    isReady = self.isComplete\n  }\nend\n\nreturn VerticalSlice',
    tests: [
      { type: "code_contains", expected: "AddCoreMechanic", message: "Debes implementar AddCoreMechanic" },
      { type: "code_contains", expected: "AddContent", message: "Debes implementar AddContent" },
      { type: "code_contains", expected: "IsReady", message: "Debes implementar IsReady" },
      { type: "code_contains", expected: "GetPolishLevel", message: "Debes implementar GetPolishLevel" },
      { type: "code_contains", expected: "coreMechanics", message: "Debes tener coreMechanics" },
      { type: "code_contains", expected: "content", message: "Debes tener content" },
      { type: "code_contains", expected: "implemented", message: "Debes trackear implemented" },
      { type: "code_contains", expected: "polished", message: "Debes trackear polished" },
    ],
    hints: [
      "coreMechanics es lista de mecánicas core",
      "content es lista de contenido (levels, characters, etc.)",
      "IsReady verifica implementado y pulido",
      "GetPolishLevel calcula porcentaje de items pulidos",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },

  // ============================================
  // LECCIÓN 2: Game Framework (Semana 2)
  // ============================================
  {
    id: "mes-10-leccion-2-ej-1",
    lessonId: "l10-2-framework",
    title: 'Implementar GameMode en Lua',
    instructions: 'Crea un GameMode que defina las reglas del juego.\n\n**Requisitos:**\n- `GameMode(gameType)` crea game mode\n- `SetWinCondition(condition)` define condición de victoria\n- `CheckWinCondition(player)` verifica si jugador ganó\n- `StartGame()` inicia el juego\n- `EndGame(winner)` termina el juego\n- Imprime "Juego iniciado" y "Jugador [id] gana"\n\n**Pista:** GameMode define reglas, no estado',
    starterCode: 'local GameMode = {}\n\nfunction GameMode:new(gameType)\n  local self = setmetatable({}, GameMode)\n  self.gameType = gameType\n  self.isRunning = false\n  self.winCondition = nil\n  return self\nend\n\nfunction GameMode:SetWinCondition(condition)\n  -- Define condición de victoria\nend\n\nfunction GameMode:CheckWinCondition(player)\n  -- Verifica si jugador ganó\nend\n\nfunction GameMode:StartGame()\n  -- Inicia el juego\nend\n\nfunction GameMode:EndGame(winner)\n  -- Termina el juego\nend\n\nreturn GameMode',
    solution: 'local GameMode = {}\nGameMode.__index = GameMode\n\nfunction GameMode:new(gameType)\n  local self = setmetatable({}, GameMode)\n  self.gameType = gameType\n  self.isRunning = false\n  self.winCondition = nil\n  self.players = {}\n  self.startTime = nil\n  print("GameMode creado: " .. gameType)\n  return self\nend\n\nfunction GameMode:SetWinCondition(condition)\n  -- condition: function que recibe player y retorna boolean\n  self.winCondition = condition\n  print("Condición de victoria definida")\nend\n\nfunction GameMode:CheckWinCondition(player)\n  if not self.winCondition then\n    return false\n  end\n  \n  local hasWon = self.winCondition(player)\n  \n  if hasWon then\n    print("Condición de victoria cumplida para jugador " .. player.id)\n    self:EndGame(player)\n  end\n  \n  return hasWon\nend\n\nfunction GameMode:StartGame()\n  if self.isRunning then\n    print("El juego ya está en curso")\n    return false\n  end\n  \n  self.isRunning = true\n  self.startTime = os.time()\n  print("\\n=== JUEGO INICIADO ===")\n  print("Tipo: " .. self.gameType)\n  print("Jugadores: " .. #self.players)\n  print("======================\\n")\n  \n  return true\nend\n\nfunction GameMode:EndGame(winner)\n  if not self.isRunning then\n    print("El juego no está en curso")\n    return false\n  end\n  \n  self.isRunning = false\n  local duration = os.time() - self.startTime\n  \n  print("\\n=== JUEGO TERMINADO ===")\n  if winner then\n    print("¡Ganador: Jugador " .. winner.id .. "!")\n  else\n    print("Juego terminado sin ganador")\n  end\n  print("Duración: " .. duration .. " segundos")\n  print("========================\\n")\n  \n  return true\nend\n\nfunction GameMode:AddPlayer(player)\n  table.insert(self.players, player)\n  print("Jugador " .. player.id .. " añadido al juego")\nend\n\nfunction GameMode:RemovePlayer(playerId)\n  for i, player in ipairs(self.players) do\n    if player.id == playerId then\n      table.remove(self.players, i)\n      print("Jugador " .. playerId .. " eliminado del juego")\n      return true\n    end\n  end\n  return false\nend\n\nfunction GameMode:GetPlayerCount()\n  return #self.players\nend\n\n-- Condiciones de victoria predefinidas\nGameMode.Conditions = {\n  FirstToScore = function(targetScore)\n    return function(player)\n      return player.score >= targetScore\n    end\n  end,\n  \n  LastPlayerStanding = function()\n    return function(player)\n      return player.health > 0 and #player.opponents == 0\n    end\n  end,\n  \n  TimeLimit = function(timeLimit, compareFunc)\n    return function(gameMode)\n      local elapsed = os.time() - gameMode.startTime\n      return compareFunc(elapsed, timeLimit)\n    end\n  end\n}\n\nreturn GameMode',
    tests: [
      { type: "code_contains", expected: "SetWinCondition", message: "Debes implementar SetWinCondition" },
      { type: "code_contains", expected: "CheckWinCondition", message: "Debes implementar CheckWinCondition" },
      { type: "code_contains", expected: "StartGame", message: "Debes implementar StartGame" },
      { type: "code_contains", expected: "EndGame", message: "Debes implementar EndGame" },
      { type: "code_contains", expected: "isRunning", message: "Debes tener isRunning" },
      { type: "code_contains", expected: "winCondition", message: "Debes tener winCondition" },
      { type: "code_contains", expected: "players", message: "Debes tener players" },
    ],
    hints: [
      "isRunning trackea estado del juego",
      "winCondition es función que verifica victoria",
      "StartGame inicia el juego y setea startTime",
      "EndGame termina y calcula duración",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-10-leccion-2-ej-2",
    lessonId: "l10-2-framework",
    title: 'Implementar GameState Replicado',
    instructions: 'Crea un GameState que almacene el estado del juego replicado.\n\n**Requisitos:**\n- `GameState()` crea estado del juego\n- `Set(key, value)` setea valor en el estado\n- `Get(key)` obtiene valor del estado\n- `Serialize()` serializa estado para replicación\n- `Deserialize(data)` deserializa estado\n- Imprime "Estado actualizado: [key] = [value]"\n\n**Pista:** GameState se replica a todos los clientes',
    starterCode: 'local GameState = {}\n\nfunction GameState:new()\n  local self = setmetatable({}, GameState)\n  self.data = {}\n  self.version = 0\n  return self\nend\n\nfunction GameState:Set(key, value)\n  -- Setea valor en el estado\nend\n\nfunction GameState:Get(key)\n  -- Obtiene valor del estado\nend\n\nfunction GameState:Serialize()\n  -- Serializa estado\nend\n\nfunction GameState:Deserialize(data)\n  -- Deserializa estado\nend\n\nreturn GameState',
    solution: 'local GameState = {}\nGameState.__index = GameState\n\nfunction GameState:new()\n  local self = setmetatable({}, GameState)\n  self.data = {}\n  self.version = 0\n  self.isDirty = false  -- Para replicación\n  print("GameState inicializado")\n  return self\nend\n\nfunction GameState:Set(key, value)\n  local oldValue = self.data[key]\n  self.data[key] = value\n  self.version = self.version + 1\n  self.isDirty = true\n  \n  print("Estado actualizado: " .. tostring(key) .. " = " .. tostring(value))\n  \n  -- En UE5 real, esto dispararía replicación\n  -- OnRep_Data() se llamaría en clientes\n  \n  return true\nend\n\nfunction GameState:Get(key)\n  return self.data[key]\nend\n\nfunction GameState:Serialize()\n  self.isDirty = false\n  \n  return {\n    version = self.version,\n    timestamp = os.time(),\n    data = self.data\n  }\nend\n\nfunction GameState:Deserialize(serializedData)\n  if not serializedData then\n    print("Datos inválidos para deserializar")\n    return false\n  end\n  \n  self.version = serializedData.version\n  self.data = serializedData.data or {}\n  \n  print("Estado deserializado (versión " .. self.version .. ")")\n  print("Keys: " .. #self:GetKeys())\n  \n  return true\nend\n\nfunction GameState:GetKeys()\n  local keys = {}\n  for key in pairs(self.data) do\n    table.insert(keys, key)\n  end\n  return keys\nend\n\nfunction GameState:Clear()\n  self.data = {}\n  self.version = self.version + 1\n  self.isDirty = true\n  print("Estado limpiado")\nend\n\nfunction GameState:GetAll()\n  return self.data\nend\n\n-- Estados predefinidos comunes\nfunction GameState:SetPlayerCount(count)\n  self:Set("playerCount", count)\nend\n\nfunction GameState:SetScore(playerId, score)\n  local scores = self:Get("scores") or {}\n  scores[playerId] = score\n  self:Set("scores", scores)\nend\n\nfunction GameState:SetGamePhase(phase)\n  -- phase: "lobby", "playing", "paused", "ended"\n  self:Set("gamePhase", phase)\nend\n\nfunction GameState:IsGameActive()\n  return self:Get("gamePhase") == "playing"\nend\n\nreturn GameState',
    tests: [
      { type: "code_contains", expected: "Set", message: "Debes implementar Set" },
      { type: "code_contains", expected: "Get", message: "Debes implementar Get" },
      { type: "code_contains", expected: "Serialize", message: "Debes implementar Serialize" },
      { type: "code_contains", expected: "Deserialize", message: "Debes implementar Deserialize" },
      { type: "code_contains", expected: "data", message: "Debes tener tabla data" },
      { type: "code_contains", expected: "version", message: "Debes tener version" },
      { type: "code_contains", expected: "isDirty", message: "Debes tener isDirty" },
    ],
    hints: [
      "data almacena todo el estado del juego",
      "version incrementa con cada cambio",
      "isDirty indica si hay cambios para replicar",
      "Serialize prepara datos para red",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-10-leccion-2-ej-3",
    lessonId: "l10-2-framework",
    title: 'Implementar PlayerState con Stats',
    instructions: 'Crea un PlayerState que almacene información del jugador.\n\n**Requisitos:**\n- `PlayerState(playerId)` crea estado del jugador\n- `SetStat(name, value)` setea stat (health, score, etc.)\n- `GetStat(name)` obtiene stat\n- `AddToStat(name, amount)` modifica stat (para scores)\n- `Reset()` resetea todos los stats\n- Imprime "Player [id]: [stat] = [value]"\n\n**Pista:** PlayerState se replica a todos',
    starterCode: 'local PlayerState = {}\n\nfunction PlayerState:new(playerId)\n  local self = setmetatable({}, PlayerState)\n  self.playerId = playerId\n  self.stats = {}\n  self.isBot = false\n  return self\nend\n\nfunction PlayerState:SetStat(name, value)\n  -- Setea stat del jugador\nend\n\nfunction PlayerState:GetStat(name)\n  -- Obtiene stat del jugador\nend\n\nfunction PlayerState:AddToStat(name, amount)\n  -- Modifica stat (para scores)\nend\n\nfunction PlayerState:Reset()\n  -- Resetea todos los stats\nend\n\nreturn PlayerState',
    solution: 'local PlayerState = {}\nPlayerState.__index = PlayerState\n\nfunction PlayerState:new(playerId)\n  local self = setmetatable({}, PlayerState)\n  self.playerId = playerId\n  self.stats = {\n    health = 100,\n    maxHealth = 100,\n    score = 0,\n    kills = 0,\n    deaths = 0,\n    level = 1,\n    xp = 0\n  }\n  self.isBot = false\n  self.isConnected = true\n  print("PlayerState creado: Jugador " .. playerId)\n  return self\nend\n\nfunction PlayerState:SetStat(name, value)\n  if not self.stats[name] then\n    print("Stat no existe: " .. name .. ". Creando...")\n  end\n  \n  local oldValue = self.stats[name]\n  self.stats[name] = value\n  \n  print("Player " .. self.playerId .. ": " .. name .. " = " .. value .. " (antes: " .. tostring(oldValue) .. ")")\n  \n  -- En UE5 real, esto dispararía replicación\n  return true\nend\n\nfunction PlayerState:GetStat(name)\n  return self.stats[name]\nend\n\nfunction PlayerState:AddToStat(name, amount)\n  if not self.stats[name] then\n    self.stats[name] = 0\n  end\n  \n  self.stats[name] = self.stats[name] + amount\n  \n  print("Player " .. self.playerId .. ": " .. name .. " += " .. amount .. " (total: " .. self.stats[name] .. ")")\n  \n  return self.stats[name]\nend\n\nfunction PlayerState:Reset()\n  print("Player " .. self.playerId .. ": Reset stats")\n  \n  self.stats = {\n    health = 100,\n    maxHealth = 100,\n    score = 0,\n    kills = 0,\n    deaths = 0,\n    level = 1,\n    xp = 0\n  }\nend\n\nfunction PlayerState:GetAllStats()\n  return self.stats\nend\n\nfunction PlayerState:TakeDamage(amount)\n  self.stats.health = math.max(0, self.stats.health - amount)\n  print("Player " .. self.playerId .. " recibió " .. amount .. " daño (salud: " .. self.stats.health .. ")")\n  \n  if self.stats.health <= 0 then\n    self:Die()\n  end\n  \n  return self.stats.health\nend\n\nfunction PlayerState:Heal(amount)\n  self.stats.health = math.min(self.stats.maxHealth, self.stats.health + amount)\n  print("Player " .. self.playerId .. " curado " .. amount .. " (salud: " .. self.stats.health .. ")")\n  return self.stats.health\nend\n\nfunction PlayerState:Die()\n  self.stats.deaths = self.stats.deaths + 1\n  print("Player " .. self.playerId .. " ha muerto (muertes: " .. self.stats.deaths .. ")")\nend\n\nfunction PlayerState:AddScore(points)\n  return self:AddToStat("score", points)\nend\n\nfunction PlayerState:AddKill()\n  return self:AddToStat("kills", 1)\nend\n\nfunction PlayerState:AddXP(amount)\n  self:AddToStat("xp", amount)\n  \n  -- Verificar level up\n  local xpNeeded = self.stats.level * 100\n  if self.stats.xp >= xpNeeded then\n    self:LevelUp()\n  end\nend\n\nfunction PlayerState:LevelUp()\n  self.stats.level = self.stats.level + 1\n  self.stats.xp = 0\n  self.stats.maxHealth = self.stats.maxHealth + 10\n  self.stats.health = self.stats.maxHealth\n  print("¡Player " .. self.playerId .. " subió al nivel " .. self.stats.level .. "!")\nend\n\nreturn PlayerState',
    tests: [
      { type: "code_contains", expected: "SetStat", message: "Debes implementar SetStat" },
      { type: "code_contains", expected: "GetStat", message: "Debes implementar GetStat" },
      { type: "code_contains", expected: "AddToStat", message: "Debes implementar AddToStat" },
      { type: "code_contains", expected: "Reset", message: "Debes implementar Reset" },
      { type: "code_contains", expected: "stats", message: "Debes tener tabla stats" },
      { type: "code_contains", expected: "playerId", message: "Debes tener playerId" },
      { type: "code_contains", expected: "health", message: "Debes tener stat health" },
      { type: "code_contains", expected: "score", message: "Debes tener stat score" },
    ],
    hints: [
      "stats almacena todas las stats del jugador",
      "SetStat setea valor absoluto",
      "AddToStat suma/resta valor (para scores)",
      "Incluye health, score, kills, deaths, level, xp",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },

  // ============================================
  // LECCIÓN 3: Data-Driven Design (Semana 3)
  // ============================================
  {
    id: "mes-10-leccion-3-ej-1",
    lessonId: "l10-3-datadriven",
    title: 'Cargar Datos desde JSON',
    instructions: 'Implementa carga de datos desde archivos JSON.\n\n**Requisitos:**\n- `DataLoader()` crea cargador de datos\n- `LoadJSON(path)` carga archivo JSON\n- `GetData(key)` obtiene dato cargado\n- `HasData(key)` verifica si dato existe\n- Imprime "Cargando JSON: [path]" y "Datos cargados: [count] keys"\n\n**Pista:** Usa json.decode para parsear JSON',
    starterCode: 'local DataLoader = {}\n\nfunction DataLoader:new()\n  local self = setmetatable({}, DataLoader)\n  self.data = {}\n  return self\nend\n\nfunction DataLoader:LoadJSON(path)\n  -- Carga archivo JSON\nend\n\nfunction DataLoader:GetData(key)\n  -- Obtiene dato cargado\nend\n\nfunction DataLoader:HasData(key)\n  -- Verifica si dato existe\nend\n\nreturn DataLoader',
    solution: 'local DataLoader = {}\nDataLoader.__index = DataLoader\n\nfunction DataLoader:new()\n  local self = setmetatable({}, DataLoader)\n  self.data = {}\n  self.loadedFiles = {}\n  print("DataLoader inicializado")\n  return self\nend\n\nfunction DataLoader:LoadJSON(path)\n  print("Cargando JSON: " .. path)\n  \n  -- Simular carga de archivo JSON\n  -- En implementación real: local file = io.open(path, "r")\n  -- local content = file:read("*all")\n  -- local data = json.decode(content)\n  \n  -- Simular datos cargados\n  local mockData = {\n    items = {\n      { id = "sword", name = "Sword", damage = 25, value = 100 },\n      { id = "shield", name = "Shield", defense = 15, value = 80 },\n      { id = "potion", name = "Health Potion", heal = 50, value = 25 }\n    },\n    enemies = {\n      { id = "goblin", name = "Goblin", health = 50, damage = 10 },\n      { id = "orc", name = "Orc", health = 100, damage = 20 }\n    }\n  }\n  \n  self.data[path] = mockData\n  table.insert(self.loadedFiles, path)\n  \n  -- Contar keys\n  local keyCount = 0\n  for _ in pairs(mockData) do keyCount = keyCount + 1 end\n  \n  print("Datos cargados: " .. keyCount .. " keys")\n  print("Items: " .. #mockData.items)\n  print("Enemies: " .. #mockData.enemies)\n  \n  return mockData\nend\n\nfunction DataLoader:GetData(key)\n  -- Buscar en todos los archivos cargados\n  for path, data in pairs(self.data) do\n    if data[key] then\n      return data[key]\n    end\n  end\n  \n  print("Dato no encontrado: " .. key)\n  return nil\nend\n\nfunction DataLoader:HasData(key)\n  for path, data in pairs(self.data) do\n    if data[key] then\n      return true\n    end\n  end\n  return false\nend\n\nfunction DataLoader:GetAllData()\n  return self.data\nend\n\nfunction DataLoader:GetLoadedFiles()\n  return self.loadedFiles\nend\n\nfunction DataLoader:ReloadAll()\n  print("\\nRecargando todos los archivos...")\n  for _, path in ipairs(self.loadedFiles) do\n    self:LoadJSON(path)\n  end\n  print("Recarga completada\\n")\nend\n\nfunction DataLoader:Clear()\n  self.data = {}\n  self.loadedFiles = {}\n  print("DataLoader limpiado")\nend\n\nreturn DataLoader',
    tests: [
      { type: "code_contains", expected: "LoadJSON", message: "Debes implementar LoadJSON" },
      { type: "code_contains", expected: "GetData", message: "Debes implementar GetData" },
      { type: "code_contains", expected: "HasData", message: "Debes implementar HasData" },
      { type: "code_contains", expected: "data", message: "Debes tener tabla data" },
      { type: "code_contains", expected: "loadedFiles", message: "Debes tener loadedFiles" },
      { type: "code_contains", expected: "path", message: "Debes usar path" },
    ],
    hints: [
      "data almacena datos cargados por path",
      "LoadJSON simula carga de archivo JSON",
      "GetData busca en todos los archivos cargados",
      "HasData verifica existencia de key",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-10-leccion-3-ej-2",
    lessonId: "l10-3-datadriven",
    title: 'Cargar Datos desde CSV',
    instructions: 'Implementa carga de datos desde archivos CSV.\n\n**Requisitos:**\n- `LoadCSV(path)` carga archivo CSV\n- Primera fila son headers\n- Retorna array de objetos con keys de headers\n- Imprime "Cargando CSV: [path]" y "Filas cargadas: [count]"\n- Soporta números y strings\n\n**Pista:** CSV usa comas para separar valores',
    starterCode: 'local CSVLoader = {}\n\nfunction CSVLoader:new()\n  local self = setmetatable({}, CSVLoader)\n  self.data = {}\n  return self\nend\n\nfunction CSVLoader:LoadCSV(path)\n  -- Carga archivo CSV\n  -- Primera fila = headers\n  -- Resto = datos\nend\n\nfunction CSVLoader:GetData()\n  -- Retorna datos cargados\nend\n\nfunction CSVLoader:GetRowCount()\n  -- Retorna número de filas\nend\n\nreturn CSVLoader',
    solution: 'local CSVLoader = {}\nCSVLoader.__index = CSVLoader\n\nfunction CSVLoader:new()\n  local self = setmetatable({}, CSVLoader)\n  self.data = {}\n  self.headers = {}\n  self.path = nil\n  return self\nend\n\nfunction CSVLoader:LoadCSV(path)\n  print("Cargando CSV: " .. path)\n  self.path = path\n  \n  -- Simular contenido CSV\n  -- En implementación real: leer archivo\n  local csvContent = [[\nid,name,type,damage,value\nsword_iron,Iron Sword,weapon,25,100\nsword_steel,Steel Sword,weapon,40,200\nsword_magic,Magic Sword,weapon,60,500\nshield_wood,Wooden Shield,armor,10,50\nshield_iron,Iron Shield,armor,20,150\npotion_health,Health Potion,consumable,0,25\npotion_mana,Mana Potion,consumable,0,30\n]]\n  \n  self.data = {}\n  self.headers = {}\n  \n  -- Parsear CSV\n  local lines = {}\n  for line in csvContent:gmatch("[^\\n]+") do\n    table.insert(lines, line)\n  end\n  \n  -- Primera línea = headers\n  if #lines > 0 then\n    for header in lines[1]:gmatch("[^,]+") do\n      table.insert(self.headers, header)\n    end\n    print("Headers: " .. #self.headers)\n  end\n  \n  -- Resto = datos\n  for i = 2, #lines do\n    local row = {}\n    local values = {}\n    \n    for value in lines[i]:gmatch("[^,]+") do\n      table.insert(values, value)\n    end\n    \n    -- Crear objeto con headers como keys\n    for j, header in ipairs(self.headers) do\n      local val = values[j] or ""\n      \n      -- Intentar convertir a número\n      local numVal = tonumber(val)\n      row[header] = numVal or val\n    end\n    \n    table.insert(self.data, row)\n  end\n  \n  print("Filas cargadas: " .. #self.data)\n  print("Columnas: " .. #self.headers)\n  \n  return self.data\nend\n\nfunction CSVLoader:GetData()\n  return self.data\nend\n\nfunction CSVLoader:GetRowCount()\n  return #self.data\nend\n\nfunction CSVLoader:GetHeaders()\n  return self.headers\nend\n\nfunction CSVLoader:GetColumn(columnName)\n  local values = {}\n  for _, row in ipairs(self.data) do\n    if row[columnName] then\n      table.insert(values, row[columnName])\n    end\n  end\n  return values\nend\n\nfunction CSVLoader:FilterBy(columnName, value)\n  local filtered = {}\n  for _, row in ipairs(self.data) do\n    if row[columnName] == value then\n      table.insert(filtered, row)\n    end\n  end\n  return filtered\nend\n\nfunction CSVLoader:FindById(id)\n  for _, row in ipairs(self.data) do\n    if row.id == id then\n      return row\n    end\n  end\n  return nil\nend\n\nreturn CSVLoader',
    tests: [
      { type: "code_contains", expected: "LoadCSV", message: "Debes implementar LoadCSV" },
      { type: "code_contains", expected: "GetData", message: "Debes implementar GetData" },
      { type: "code_contains", expected: "GetRowCount", message: "Debes implementar GetRowCount" },
      { type: "code_contains", expected: "headers", message: "Debes tener headers" },
      { type: "code_contains", expected: "data", message: "Debes tener data" },
      { type: "code_contains", expected: "gmatch", message: "Debes usar gmatch para parsear" },
    ],
    hints: [
      "Primera fila son headers",
      "Resto de filas son datos",
      "gmatch('[^,]+') separa por comas",
      "tonumber() intenta convertir a número",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-10-leccion-3-ej-3",
    lessonId: "l10-3-datadriven",
    title: 'Hot-Reload de Datos en Tiempo Real',
    instructions: 'Implementa hot-reload para recargar datos sin reiniciar.\n\n**Requisitos:**\n- `HotReloadManager()` crea manager\n- `WatchFile(path)` añade archivo a vigilar\n- `CheckForChanges()` verifica cambios en archivos\n- `ReloadChanged()` recarga archivos modificados\n- Imprime "Cambio detectado: [path]" y "Recargando: [path]"\n\n**Pista:** Compara timestamps de última modificación',
    starterCode: 'local HotReloadManager = {}\n\nfunction HotReloadManager:new()\n  local self = setmetatable({}, HotReloadManager)\n  self.watchedFiles = {}  -- path -> lastModified\n  self.dataLoader = nil\n  return self\nend\n\nfunction HotReloadManager:WatchFile(path)\n  -- Añade archivo a vigilar\nend\n\nfunction HotReloadManager:CheckForChanges()\n  -- Verifica cambios en archivos\nend\n\nfunction HotReloadManager:ReloadChanged()\n  -- Recarga archivos modificados\nend\n\nreturn HotReloadManager',
    solution: 'local HotReloadManager = {}\nHotReloadManager.__index = HotReloadManager\n\nfunction HotReloadManager:new()\n  local self = setmetatable({}, HotReloadManager)\n  self.watchedFiles = {}  -- path -> lastModified\n  self.dataLoader = nil\n  self.reloadCallbacks = {}\n  print("HotReloadManager inicializado")\n  return self\nend\n\nfunction HotReloadManager:WatchFile(path)\n  -- En implementación real, obtendrías el timestamp real\n  -- local attr = lfs.attributes(path)\n  -- self.watchedFiles[path] = attr.modification\n  \n  -- Simular timestamp\n  self.watchedFiles[path] = {\n    lastModified = os.time(),\n    needsReload = false\n  }\n  \n  print("Archivo vigilado: " .. path)\n  return true\nend\n\nfunction HotReloadManager:SetDataLoader(loader)\n  self.dataLoader = loader\nend\n\nfunction HotReloadManager:OnReload(callback)\n  table.insert(self.reloadCallbacks, callback)\nend\n\nfunction HotReloadManager:CheckForChanges()\n  local changesDetected = false\n  \n  for path, info in pairs(self.watchedFiles) do\n    -- Simular verificación de cambios\n    -- En implementación real: comparar con lfs.attributes(path).modification\n    \n    -- Simular cambio aleatorio para demo\n    local shouldChange = math.random() < 0.1  -- 10% chance\n    \n    if shouldChange and not info.needsReload then\n      info.needsReload = true\n      info.lastModified = os.time()\n      changesDetected = true\n      print("\\n⚠️ Cambio detectado: " .. path)\n    end\n  end\n  \n  if not changesDetected then\n    print("No hay cambios en archivos vigilados")\n  end\n  \n  return changesDetected\nend\n\nfunction HotReloadManager:ReloadChanged()\n  local reloadedCount = 0\n  \n  for path, info in pairs(self.watchedFiles) do\n    if info.needsReload then\n      print("\\n=== RECARGANDO ===")\n      print("Archivo: " .. path)\n      \n      -- Recargar datos\n      if self.dataLoader then\n        self.dataLoader:LoadJSON(path)\n      end\n      \n      info.needsReload = false\n      reloadedCount = reloadedCount + 1\n      \n      print("Recarga completada\\n")\n    end\n  end\n  \n  -- Notificar callbacks\n  if reloadedCount > 0 then\n    for _, callback in ipairs(self.reloadCallbacks) do\n      pcall(callback, reloadedCount)\n    end\n  end\n  \n  return reloadedCount\nend\n\nfunction HotReloadManager:GetWatchedFiles()\n  local files = {}\n  for path in pairs(self.watchedFiles) do\n    table.insert(files, path)\n  end\n  return files\nend\n\nfunction HotReloadManager:StopWatching(path)\n  self.watchedFiles[path] = nil\n  print("Archivo dejado de vigilar: " .. path)\nend\n\nfunction HotReloadManager:AutoReload(interval)\n  -- Iniciar auto-reload (simulado)\n  print("Auto-reload iniciado (intervalo: " .. interval .. "s)")\n  \n  -- En implementación real, usarías un timer\n  -- task.spawn(function()\n  --   while true do\n  --     task.wait(interval)\n  --     self:CheckForChanges()\n  --     self:ReloadChanged()\n  --   end\n  -- end)\nend\n\nreturn HotReloadManager',
    tests: [
      { type: "code_contains", expected: "WatchFile", message: "Debes implementar WatchFile" },
      { type: "code_contains", expected: "CheckForChanges", message: "Debes implementar CheckForChanges" },
      { type: "code_contains", expected: "ReloadChanged", message: "Debes implementar ReloadChanged" },
      { type: "code_contains", expected: "watchedFiles", message: "Debes tener watchedFiles" },
      { type: "code_contains", expected: "lastModified", message: "Debes trackear lastModified" },
      { type: "code_contains", expected: "needsReload", message: "Debes tener needsReload" },
    ],
    hints: [
      "watchedFiles almacena path -> info",
      "CheckForChanges compara timestamps",
      "ReloadChanged recarga archivos modificados",
      "Callbacks notifican cuando hay reload",
    ],
    difficulty: "advanced",
    xpReward: 70,
  },

  // ============================================
  // LECCIÓN 4: Testing (Semana 4)
  // ============================================
  {
    id: "mes-10-leccion-4-ej-1",
    lessonId: "l10-4-testing",
    title: 'Crear Test Unitario Simple',
    instructions: 'Crea tests unitarios básicos para una función.\n\n**Requisitos:**\n- `TestSuite(name)` crea suite de tests\n- `AddTest(testName, testFunction)` añade test\n- `RunTest(testName)` ejecuta test específico\n- `RunAll()` ejecuta todos los tests\n- Imprime "✓ [testName] passed" o "✗ [testName] failed: [error]"\n\n**Pista:** Usa pcall para capturar errores',
    starterCode: 'local TestSuite = {}\n\nfunction TestSuite:new(name)\n  local self = setmetatable({}, TestSuite)\n  self.name = name\n  self.tests = {}\n  self.results = { passed = 0, failed = 0 }\n  return self\nend\n\nfunction TestSuite:AddTest(testName, testFunction)\n  -- Añade test al suite\nend\n\nfunction TestSuite:RunTest(testName)\n  -- Ejecuta test específico\nend\n\nfunction TestSuite:RunAll()\n  -- Ejecuta todos los tests\nend\n\nreturn TestSuite',
    solution: 'local TestSuite = {}\nTestSuite.__index = TestSuite\n\nfunction TestSuite:new(name)\n  local self = setmetatable({}, TestSuite)\n  self.name = name\n  self.tests = {}  -- {name, func}\n  self.results = { passed = 0, failed = 0, details = {} }\n  print("TestSuite creado: " .. name)\n  return self\nend\n\nfunction TestSuite:AddTest(testName, testFunction)\n  table.insert(self.tests, { name = testName, func = testFunction })\n  print("Test añadido: " .. testName)\n  return self\nend\n\nfunction TestSuite:RunTest(testName)\n  for _, test in ipairs(self.tests) do\n    if test.name == testName then\n      return self:ExecuteTest(test)\n    end\n  end\n  \n  print("Test no encontrado: " .. testName)\n  return false\nend\n\nfunction TestSuite:ExecuteTest(test)\n  local success, errorMsg = pcall(test.func)\n  \n  if success then\n    print("✓ " .. test.name .. " passed")\n    self.results.passed = self.results.passed + 1\n    table.insert(self.results.details, { name = test.name, passed = true })\n    return true\n  else\n    print("✗ " .. test.name .. " failed: " .. errorMsg)\n    self.results.failed = self.results.failed + 1\n    table.insert(self.results.details, { name = test.name, passed = false, error = errorMsg })\n    return false\n  end\nend\n\nfunction TestSuite:RunAll()\n  print("\\n=== EJECUTANDO TESTS ===")\n  print("Suite: " .. self.name)\n  print("Total tests: " .. #self.tests)\n  print("")\n  \n  self.results = { passed = 0, failed = 0, details = {} }\n  \n  for _, test in ipairs(self.tests) do\n    self:ExecuteTest(test)\n  end\n  \n  print("")\n  print("=== RESULTADOS ===")\n  print("Passed: " .. self.results.passed)\n  print("Failed: " .. self.results.failed)\n  print("Total: " .. #self.tests)\\n  \n  if self.results.failed == 0 then\n    print("✓ Todos los tests pasaron")\n  else\n    print("✗ Algunos tests fallaron")\n  end\n  print("==================\\n")\n  \n  return self.results.failed == 0\nend\n\nfunction TestSuite:GetResults()\n  return self.results\nend\n\nfunction TestSuite:Clear()\n  self.tests = {}\n  self.results = { passed = 0, failed = 0 }\nend\n\n-- Funciones de assert helper\nlocal Assert = {}\n\nfunction Assert.AreEqual(expected, actual, message)\n  if expected ~= actual then\n    error(message or ("Expected " .. tostring(expected) .. " but got " .. tostring(actual)))\n  end\nend\n\nfunction Assert.IsTrue(condition, message)\n  if not condition then\n    error(message or "Expected true but got false")\n  end\nend\n\nfunction Assert.IsFalse(condition, message)\n  if condition then\n    error(message or "Expected false but got true")\n  end\nend\n\nfunction Assert.IsNil(value, message)\n  if value ~= nil then\n    error(message or "Expected nil but got " .. tostring(value))\n  end\nend\n\nfunction Assert.NotNil(value, message)\n  if value == nil then\n    error(message or "Expected non-nil value")\n  end\nend\n\nreturn { TestSuite = TestSuite, Assert = Assert }',
    tests: [
      { type: "code_contains", expected: "AddTest", message: "Debes implementar AddTest" },
      { type: "code_contains", expected: "RunTest", message: "Debes implementar RunTest" },
      { type: "code_contains", expected: "RunAll", message: "Debes implementar RunAll" },
      { type: "code_contains", expected: "tests", message: "Debes tener tabla tests" },
      { type: "code_contains", expected: "pcall", message: "Debes usar pcall para capturar errores" },
      { type: "code_contains", expected: "passed", message: "Debes trackear passed" },
      { type: "code_contains", expected: "failed", message: "Debes trackear failed" },
    ],
    hints: [
      "tests es lista de {name, func}",
      "RunAll itera sobre todos los tests",
      "pcall ejecuta test y captura errores",
      "Imprime ✓ para passed, ✗ para failed",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-10-leccion-4-ej-2",
    lessonId: "l10-4-testing",
    title: 'Tests para Sistema de Inventario',
    instructions: 'Crea tests unitarios para un sistema de inventario.\n\n**Requisitos:**\n- `CreateInventoryTests()` crea suite de tests para inventario\n- Tests para: AddItem, RemoveItem, HasItem, GetItemCount\n- Cada test verifica comportamiento esperado\n- Ejecuta todos los tests y reporta resultados\n- Imprime resumen de tests pasados/fallidos\n\n**Pista:** Prueba casos edge (inventario vacío, lleno, etc.)',
    starterCode: 'local function CreateInventoryTests()\n  -- Crea suite de tests para inventario\n  \n  -- Test: AddItem añade item correctamente\n  -- Test: RemoveItem remueve item correctamente\n  -- Test: HasItem verifica existencia\n  -- Test: GetItemCount retorna cantidad correcta\n  -- Test: Casos edge (vacío, lleno)\nend\n\nreturn CreateInventoryTests',
    solution: 'local function CreateInventoryTests()\n  local TestSuite = require("TestSuite").TestSuite\n  local Assert = require("TestSuite").Assert\n  \n  local suite = TestSuite:new("InventoryTests")\n  \n  -- Helper para crear inventario de prueba\n  local function CreateTestInventory()\n    return {\n      items = {},\n      AddItem = function(self, item, count)\n        if not self.items[item.id] then\n          self.items[item.id] = { item = item, count = 0 }\n        end\n        self.items[item.id].count = self.items[id].count + (count or 1)\n      end,\n      RemoveItem = function(self, itemId, count)\n        if self.items[itemId] then\n          self.items[itemId].count = self.items[itemId].count - (count or 1)\n          if self.items[itemId].count <= 0 then\n            self.items[itemId] = nil\n          end\n        end\n      end,\n      HasItem = function(self, itemId)\n        return self.items[itemId] ~= nil\n      end,\n      GetItemCount = function(self, itemId)\n        if self.items[itemId] then\n          return self.items[itemId].count\n        end\n        return 0\n      end\n    }\n  end\n  \n  -- Test 1: AddItem añade item correctamente\n  suite:AddTest("AddItem adds item", function()\n    local inv = CreateTestInventory()\n    inv:AddItem({ id = "sword", name = "Sword" }, 1)\n    Assert.IsTrue(inv:HasItem("sword"), "Item debería existir")\n    Assert.AreEqual(1, inv:GetItemCount("sword"), "Cantidad debería ser 1")\n  end)\n  \n  -- Test 2: AddItem stackea items\n  suite:AddTest("AddItem stacks items", function()\n    local inv = CreateTestInventory()\n    inv:AddItem({ id = "potion", name = "Potion" }, 1)\n    inv:AddItem({ id = "potion", name = "Potion" }, 2)\n    Assert.AreEqual(3, inv:GetItemCount("potion"), "Cantidad debería ser 3")\n  end)\n  \n  -- Test 3: RemoveItem remueve item\n  suite:AddTest("RemoveItem removes item", function()\n    local inv = CreateTestInventory()\n    inv:AddItem({ id = "shield", name = "Shield" }, 1)\n    inv:RemoveItem("shield", 1)\n    Assert.IsFalse(inv:HasItem("shield"), "Item no debería existir")\n  end)\n  \n  -- Test 4: RemoveItem parcialmente\n  suite:AddTest("RemoveItem partial stack", function()\n    local inv = CreateTestInventory()\n    inv:AddItem({ id = "gold", name = "Gold" }, 10)\n    inv:RemoveItem("gold", 3)\n    Assert.AreEqual(7, inv:GetItemCount("gold"), "Cantidad debería ser 7")\n  end)\n  \n  -- Test 5: HasItem con item inexistente\n  suite:AddTest("HasItem with non-existent item", function()\n    local inv = CreateTestInventory()\n    Assert.IsFalse(inv:HasItem("nonexistent"), "Item no debería existir")\n  end)\n  \n  -- Test 6: GetItemCount con item inexistente\n  suite:AddTest("GetItemCount with non-existent item", function()\n    local inv = CreateTestInventory()\n    Assert.AreEqual(0, inv:GetItemCount("nonexistent"), "Cantidad debería ser 0")\n  end)\n  \n  -- Test 7: Inventario vacío\n  suite:AddTest("Empty inventory", function()\n    local inv = CreateTestInventory()\n    Assert.AreEqual(0, #inv.items, "Inventario debería estar vacío")\n  end)\n  \n  return suite\nend\n\nreturn CreateInventoryTests',
    tests: [
      { type: "code_contains", expected: "CreateInventoryTests", message: "Debes implementar CreateInventoryTests" },
      { type: "code_contains", expected: "AddTest", message: "Debes añadir tests" },
      { type: "code_contains", expected: "AddItem", message: "Debes testear AddItem" },
      { type: "code_contains", expected: "RemoveItem", message: "Debes testear RemoveItem" },
      { type: "code_contains", expected: "HasItem", message: "Debes testear HasItem" },
      { type: "code_contains", expected: "GetItemCount", message: "Debes testear GetItemCount" },
      { type: "code_contains", expected: "Assert", message: "Debes usar Assert" },
    ],
    hints: [
      "Crea inventario de prueba con funciones mock",
      "Testea AddItem, RemoveItem, HasItem, GetItemCount",
      "Incluye casos edge (vacío, inexistente)",
      "Usa Assert.AreEqual, Assert.IsTrue, etc.",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },
  {
    id: "mes-10-leccion-4-ej-3",
    lessonId: "l10-4-testing",
    title: 'Tests Automatizados con CI Básico',
    instructions: 'Crea un sistema para ejecutar tests automatizados.\n\n**Requisitos:**\n- `TestRunner()` crea runner de tests\n- `AddSuite(suite)` añade suite de tests\n- `RunAllSuites()` ejecuta todos los tests\n- `GenerateReport()` genera reporte de resultados\n- `HasFailed()` retorna true si algún test falló\n- Imprime reporte final con resumen\n\n**Pista:** Agrega múltiples suites y ejecuta en secuencia',
    starterCode: 'local TestRunner = {}\n\nfunction TestRunner:new()\n  local self = setmetatable({}, TestRunner)\n  self.suites = {}\n  self.totalResults = { passed = 0, failed = 0 }\n  return self\nend\n\nfunction TestRunner:AddSuite(suite)\n  -- Añade suite de tests\nend\n\nfunction TestRunner:RunAllSuites()\n  -- Ejecuta todos los tests\nend\n\nfunction TestRunner:GenerateReport()\n  -- Genera reporte de resultados\nend\n\nfunction TestRunner:HasFailed()\n  -- Verifica si hay fallos\nend\n\nreturn TestRunner',
    solution: 'local TestRunner = {}\nTestRunner.__index = TestRunner\n\nfunction TestRunner:new()\n  local self = setmetatable({}, TestRunner)\n  self.suites = {}\n  self.totalResults = { passed = 0, failed = 0, details = {} }\n  self.startTime = nil\n  self.endTime = nil\n  print("TestRunner inicializado")\n  return self\nend\n\nfunction TestRunner:AddSuite(suite)\n  table.insert(self.suites, suite)\n  print("Suite añadida: " .. suite.name)\nend\n\nfunction TestRunner:RunAllSuites()\n  print("\\n========================================")\n  print("EJECUTANDO TODOS LOS TESTS")\n  print("========================================\\n")\n  \n  self.startTime = os.time()\n  self.totalResults = { passed = 0, failed = 0, details = {} }\n  \n  local suiteCount = #self.suites\n  local passedSuites = 0\n  \n  for i, suite in ipairs(self.suites) do\n    print("\\n--- Suite " .. i .. "/" .. suiteCount .. ": " .. suite.name .. " ---")\n    \n    local suitePassed = suite:RunAll()\n    \n    if suitePassed then\n      passedSuites = passedSuites + 1\n    end\n    \n    -- Acumular resultados\n    local results = suite:GetResults()\n    self.totalResults.passed = self.totalResults.passed + results.passed\n    self.totalResults.failed = self.totalResults.failed + results.failed\n    \n    for _, detail in ipairs(results.details) do\n      table.insert(self.totalResults.details, {\n        suite = suite.name,\n        name = detail.name,\n        passed = detail.passed,\n        error = detail.error\n      })\n    end\n  end\n  \n  self.endTime = os.time()\n  local duration = self.endTime - self.startTime\n  \n  self:GenerateReport(duration)\n  \n  return self.totalResults.failed == 0\nend\n\nfunction TestRunner:GenerateReport(duration)\n  print("\\n========================================")\n  print("REPORTE DE TESTS")\n  print("========================================")\n  print("Suites ejecutadas: " .. #self.suites)\n  print("Tests pasados: " .. self.totalResults.passed)\n  print("Tests fallidos: " .. self.totalResults.failed)\n  print("Total tests: " .. (self.totalResults.passed + self.totalResults.failed))\n  print("Duración: " .. (duration or 0) .. " segundos")\n  \n  local passRate = 0\n  local total = self.totalResults.passed + self.totalResults.failed\n  if total > 0 then\n    passRate = math.floor((self.totalResults.passed / total) * 100)\n  end\n  print("Tasa de éxito: " .. passRate .. "%")\n  \n  -- Mostrar fallos\n  if self.totalResults.failed > 0 then\n    print("\\n--- FALLOS ---")\n    for _, detail in ipairs(self.totalResults.details) do\n      if not detail.passed then\n        print("✗ " .. detail.suite .. "." .. detail.name .. ": " .. tostring(detail.error))\n      end\n    end\n  end\n  \n  print("\\n========================================")\n  \n  if self.totalResults.failed == 0 then\n    print("✓ TODOS LOS TESTS PASARON")\n  else\n    print("✗ ALGUNOS TESTS FALLARON")\n  end\n  print("========================================\\n")\nend\n\nfunction TestRunner:HasFailed()\n  return self.totalResults.failed > 0\nend\n\nfunction TestRunner:GetResults()\n  return self.totalResults\nend\n\nfunction TestRunner:RunSuiteByName(suiteName)\n  for _, suite in ipairs(self.suites) do\n    if suite.name == suiteName then\n      return suite:RunAll()\n    end\n  end\n  print("Suite no encontrada: " .. suiteName)\n  return false\nend\n\nfunction TestRunner:Clear()\n  self.suites = {}\n  self.totalResults = { passed = 0, failed = 0 }\nend\n\n-- Función helper para CI\nfunction TestRunner:RunCI()\n  print("\\n=== MODO CI/CD ===")\n  local allPassed = self:RunAllSuites()\n  \n  if allPassed then\n    print("\\n✓ CI PASSED")\n    os.exit(0)\n  else\n    print("\\n✗ CI FAILED")\n    os.exit(1)\n  end\nend\n\nreturn TestRunner',
    tests: [
      { type: "code_contains", expected: "AddSuite", message: "Debes implementar AddSuite" },
      { type: "code_contains", expected: "RunAllSuites", message: "Debes implementar RunAllSuites" },
      { type: "code_contains", expected: "GenerateReport", message: "Debes implementar GenerateReport" },
      { type: "code_contains", expected: "HasFailed", message: "Debes implementar HasFailed" },
      { type: "code_contains", expected: "suites", message: "Debes tener tabla suites" },
      { type: "code_contains", expected: "totalResults", message: "Debes tener totalResults" },
      { type: "code_contains", expected: "passed", message: "Debes trackear passed" },
      { type: "code_contains", expected: "failed", message: "Debes trackear failed" },
    ],
    hints: [
      "suites es lista de suites de tests",
      "RunAllSuites ejecuta cada suite en secuencia",
      "GenerateReport imprime resumen final",
      "HasFailed verifica si hay fallos",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 10
  // ============================================
  {
    id: "mes-10-final-proyecto",
    lessonId: "l10-4-testing",
    title: 'Proyecto: Game Framework Completo con Tests',
    instructions: 'Crea el entregable del Mes 10: Game Framework con arquitectura profesional.\n\n**Requisitos:**\n1. Game Framework:\n   - GameMode con condiciones de victoria\n   - GameState replicado\n   - PlayerState con stats\n   - Gestión de jugadores\n\n2. Data-Driven Design:\n   - Carga de datos desde JSON\n   - Carga de datos desde CSV\n   - Hot-reload de datos\n\n3. Testing:\n   - Tests unitarios para GameMode\n   - Tests unitarios para GameState\n   - Tests unitarios para PlayerState\n   - TestRunner con reporte\n\n4. Documentación:\n   - GDD estructurado\n   - Scope del proyecto definido\n   - Vertical slice planificado\n\n**Pista:** Integra todos los sistemas de las semanas anteriores',
    starterCode: '-- Game Framework Completo\nlocal GameFramework = {}\n\nfunction GameFramework:new()\n  local self = setmetatable({}, GameFramework)\n  \n  -- Sistemas core\n  self.gameMode = nil\n  self.gameState = nil\n  self.players = {}\n  \n  -- Data\n  self.dataLoader = nil\n  self.hotReload = nil\n  \n  -- Testing\n  self.testRunner = nil\n  \n  return self\nend\n\nfunction GameFramework:Initialize()\n  -- Inicializa todos los sistemas\nend\n\nfunction GameFramework:StartGame()\n  -- Inicia el juego\nend\n\nfunction GameFramework:RunTests()\n  -- Ejecuta tests\nend\n\nreturn GameFramework',
    solution: '-- Game Framework Completo con Arquitectura Profesional\nlocal GameFramework = {}\nGameFramework.__index = GameFramework\n\n-- ============================================\n-- IMPORTAR SISTEMAS (referencias simplificadas)\n-- ============================================\nlocal GameMode = {}\nGameMode.__index = GameMode\nfunction GameMode:new(gameType)\n  local self = setmetatable({}, GameMode)\n  self.gameType = gameType\n  self.isRunning = false\n  self.players = {}\n  self.winCondition = nil\n  return self\nend\nfunction GameMode:StartGame()\n  self.isRunning = true\n  print("Juego iniciado")\nend\nfunction GameMode:EndGame(winner)\n  self.isRunning = false\n  print("Jugador " .. winner.id .. " gana")\nend\nfunction GameMode:AddPlayer(player)\n  table.insert(self.players, player)\nend\nfunction GameMode:SetWinCondition(condition)\n  self.winCondition = condition\nend\nfunction GameMode:CheckWinCondition(player)\n  if self.winCondition and self.winCondition(player) then\n    self:EndGame(player)\n    return true\n  end\n  return false\nend\n\nlocal GameState = {}\nGameState.__index = GameState\nfunction GameState:new()\n  local self = setmetatable({}, GameState)\n  self.data = {}\n  self.version = 0\n  return self\nend\nfunction GameState:Set(key, value)\n  self.data[key] = value\n  self.version = self.version + 1\nend\nfunction GameState:Get(key)\n  return self.data[key]\nend\nfunction GameState:Serialize()\n  return { version = self.version, data = self.data }\nend\n\nlocal PlayerState = {}\nPlayerState.__index = PlayerState\nfunction PlayerState:new(playerId)\n  local self = setmetatable({}, PlayerState)\n  self.playerId = playerId\n  self.stats = { health = 100, score = 0, level = 1 }\n  return self\nend\nfunction PlayerState:SetStat(name, value)\n  self.stats[name] = value\nend\nfunction PlayerState:GetStat(name)\n  return self.stats[name]\nend\nfunction PlayerState:AddScore(points)\n  self.stats.score = self.stats.score + points\nend\n\nlocal DataLoader = {}\nDataLoader.__index = DataLoader\nfunction DataLoader:new()\n  local self = setmetatable({}, DataLoader)\n  self.data = {}\n  return self\nend\nfunction DataLoader:LoadJSON(path)\n  self.data[path] = { items = {}, enemies = {} }\n  print("JSON cargado: " .. path)\nend\nfunction DataLoader:GetData(key)\n  return self.data[key]\nend\n\nlocal HotReloadManager = {}\nHotReloadManager.__index = HotReloadManager\nfunction HotReloadManager:new()\n  local self = setmetatable({}, HotReloadManager)\n  self.watchedFiles = {}\n  return self\nend\nfunction HotReloadManager:WatchFile(path)\n  self.watchedFiles[path] = os.time()\nend\nfunction HotReloadManager:CheckForChanges()\n  return false\nend\n\nlocal TestSuite = {}\nTestSuite.__index = TestSuite\nfunction TestSuite:new(name)\n  local self = setmetatable({}, TestSuite)\n  self.name = name\n  self.tests = {}\n  self.results = { passed = 0, failed = 0 }\n  return self\nend\nfunction TestSuite:AddTest(name, func)\n  table.insert(self.tests, { name = name, func = func })\nend\nfunction TestSuite:RunAll()\n  for _, test in ipairs(self.tests) do\n    local success, err = pcall(test.func)\n    if success then\n      self.results.passed = self.results.passed + 1\n      print("✓ " .. test.name)\n    else\n      self.results.failed = self.results.failed + 1\n      print("✗ " .. test.name .. ": " .. tostring(err))\n    end\n  end\n  return self.results.failed == 0\nend\nfunction TestSuite:GetResults()\n  return self.results\nend\n\nlocal TestRunner = {}\nTestRunner.__index = TestRunner\nfunction TestRunner:new()\n  local self = setmetatable({}, TestRunner)\n  self.suites = {}\n  self.totalResults = { passed = 0, failed = 0 }\n  return self\nend\nfunction TestRunner:AddSuite(suite)\n  table.insert(self.suites, suite)\nend\nfunction TestRunner:RunAllSuites()\n  for _, suite in ipairs(self.suites) do\n    suite:RunAll()\n    local r = suite:GetResults()\n    self.totalResults.passed = self.totalResults.passed + r.passed\n    self.totalResults.failed = self.totalResults.failed + r.failed\n  end\n  print("\\nTests: " .. self.totalResults.passed .. " passed, " .. self.totalResults.failed .. " failed")\n  return self.totalResults.failed == 0\nend\nfunction TestRunner:HasFailed()\n  return self.totalResults.failed > 0\nend\n\nlocal GameDesignDocument = {}\nGameDesignDocument.__index = GameDesignDocument\nfunction GameDesignDocument:new(title)\n  local self = setmetatable({}, GameDesignDocument)\n  self.title = title\n  self.sections = {}\n  return self\nend\nfunction GameDesignDocument:AddSection(name, content)\n  self.sections[name] = content\nend\nfunction GameDesignDocument:GetSectionCount()\n  local count = 0\n  for _ in pairs(self.sections) do count = count + 1 end\n  return count\nend\n\nlocal ProjectScope = {}\nProjectScope.__index = ProjectScope\nfunction ProjectScope:new()\n  local self = setmetatable({}, ProjectScope)\n  self.features = {}\n  self.maxHours = 1000\n  return self\nend\nfunction ProjectScope:AddFeature(name, priority, hours)\n  table.insert(self.features, { name = name, priority = priority, hours = hours })\nend\nfunction ProjectScope:GetTotalEstimatedHours()\n  local total = 0\n  for _, f in ipairs(self.features) do\n    total = total + f.hours\n  end\n  return total\nend\nfunction ProjectScope:CheckScopeCreep()\n  local total = self:GetTotalEstimatedHours()\n  return total <= self.maxHours\nend\n\nlocal VerticalSlice = {}\nVerticalSlice.__index = VerticalSlice\nfunction VerticalSlice:new(gameName)\n  local self = setmetatable({}, VerticalSlice)\n  self.gameName = gameName\n  self.coreMechanics = {}\n  self.content = {}\n  return self\nend\nfunction VerticalSlice:AddCoreMechanic(name, desc)\n  table.insert(self.coreMechanics, { name = name, description = desc })\nend\nfunction VerticalSlice:AddContent(type, name, desc)\n  table.insert(self.content, { type = type, name = name })\nend\nfunction VerticalSlice:GetPolishLevel()\n  return 100\nend\n\n-- ============================================\n-- GAME FRAMEWORK PRINCIPAL\n-- ============================================\nfunction GameFramework:new()\n  local self = setmetatable({}, GameFramework)\n  \n  -- Sistemas core\n  self.gameMode = nil\n  self.gameState = nil\n  self.players = {}\n  \n  -- Data\n  self.dataLoader = nil\n  self.hotReload = nil\n  \n  -- Testing\n  self.testRunner = nil\n  \n  -- Documentación\n  self.gdd = nil\n  self.scope = nil\n  self.verticalSlice = nil\n  \n  return self\nend\n\nfunction GameFramework:Initialize()\n  print("\\n========================================")\n  print("INICIALIZANDO GAME FRAMEWORK")\n  print("========================================\\n")\n  \n  -- 1. Game Mode\n  self.gameMode = GameMode:new("ActionRPG")\n  self.gameMode:SetWinCondition(function(player)\n    return player:GetStat("score") >= 1000\n  end)\n  print("✓ GameMode inicializado")\n  \n  -- 2. Game State\n  self.gameState = GameState:new()\n  self.gameState:Set("gamePhase", "lobby")\n  self.gameState:Set("playerCount", 0)\n  print("✓ GameState inicializado")\n  \n  -- 3. Data Loader\n  self.dataLoader = DataLoader:new()\n  self.dataLoader:LoadJSON("items.json")\n  self.dataLoader:LoadJSON("enemies.json")\n  print("✓ DataLoader inicializado")\n  \n  -- 4. Hot Reload\n  self.hotReload = HotReloadManager:new()\n  self.hotReload:WatchFile("items.json")\n  self.hotReload:WatchFile("enemies.json")\n  print("✓ HotReloadManager inicializado")\n  \n  -- 5. Test Runner\n  self.testRunner = TestRunner:new()\n  self:SetupTests()\n  print("✓ TestRunner inicializado")\n  \n  -- 6. Documentación\n  self.gdd = GameDesignDocument:new("Lua Action RPG")\n  self.gdd:AddSection("Overview", "Action RPG con Lua")\n  self.gdd:AddSection("Gameplay", "Combate y exploración")\n  self.gdd:AddSection("Story", "Mundo de fantasía")\n  print("✓ GDD creado (" .. self.gdd:GetSectionCount() .. " secciones)")\n  \n  self.scope = ProjectScope:new()\n  self.scope:AddFeature("Combat System", "Critical", 200)\n  self.scope:AddFeature("Inventory", "High", 100)\n  self.scope:AddFeature("Quests", "Medium", 150)\n  print("✓ ProjectScope definido (" .. self.scope:GetTotalEstimatedHours() .. "h)")\n  \n  self.verticalSlice = VerticalSlice:new("Lua Action RPG")\n  self.verticalSlice:AddCoreMechanic("Combat", "Sistema de combate")\n  self.verticalSlice:AddCoreMechanic("Exploration", "Exploración de dungeon")\n  self.verticalSlice:AddContent("level", "Dungeon Level 1", "Primer nivel")\n  self.verticalSlice:AddContent("enemy", "Goblin", "Enemigo básico")\n  print("✓ Vertical Slice planificado (Polish: " .. self.verticalSlice:GetPolishLevel() .. "%)")\n  \n  print("\\n========================================")\n  print("GAME FRAMEWORK LISTO")\n  print("========================================\\n")\nend\n\nfunction GameFramework:SetupTests()\n  -- Tests para GameMode\n  local gameModeTests = TestSuite:new("GameModeTests")\n  gameModeTests:AddTest("GameMode creates successfully", function()\n    local gm = GameMode:new("Test")\n    assert(gm ~= nil, "GameMode debería crearse")\n  end)\n  gameModeTests:AddTest("GameMode starts game", function()\n    local gm = GameMode:new("Test")\n    gm:StartGame()\n    assert(gm.isRunning == true, "Juego debería estar corriendo")\n  end)\n  self.testRunner:AddSuite(gameModeTests)\n  \n  -- Tests para GameState\n  local gameStateTests = TestSuite:new("GameStateTests")\n  gameStateTests:AddTest("GameState sets value", function()\n    local gs = GameState:new()\n    gs:Set("test", 123)\n    assert(gs:Get("test") == 123, "Valor debería ser 123")\n  end)\n  gameStateTests:AddTest("GameState increments version", function()\n    local gs = GameState:new()\n    local v1 = gs.version\n    gs:Set("test", 1)\n    assert(gs.version > v1, "Versión debería incrementar")\n  end)\n  self.testRunner:AddSuite(gameStateTests)\n  \n  -- Tests para PlayerState\n  local playerStateTests = TestSuite:new("PlayerStateTests")\n  playerStateTests:AddTest("PlayerState creates with default stats", function()\n    local ps = PlayerState:new(1)\n    assert(ps.stats.health == 100, "Salud debería ser 100")\n  end)\n  playerStateTests:AddTest("PlayerState adds score", function()\n    local ps = PlayerState:new(1)\n    ps:AddScore(50)\n    assert(ps.stats.score == 50, "Score debería ser 50")\n  end)\n  self.testRunner:AddSuite(playerStateTests)\nend\n\nfunction GameFramework:StartGame()\n  print("\\n=== INICIANDO JUEGO ===")\n  \n  -- Añadir jugadores de prueba\n  local player1 = PlayerState:new(1)\n  local player2 = PlayerState:new(2)\n  \n  self.gameMode:AddPlayer(player1)\n  self.gameMode:AddPlayer(player2)\n  self.gameState:Set("playerCount", 2)\n  \n  -- Iniciar juego\n  self.gameMode:StartGame()\n  self.gameState:Set("gamePhase", "playing")\n  \n  print("Jugadores: " .. #self.gameMode.players)\n  print("Fase: " .. self.gameState:Get("gamePhase"))\n  print("========================\\n")\nend\n\nfunction GameFramework:RunTests()\n  print("\\n=== EJECUTANDO TESTS ===")\n  local allPassed = self.testRunner:RunAllSuites()\n  \n  if allPassed then\n    print("✓ Todos los tests pasaron")\n  else\n    print("✗ Algunos tests fallaron")\n  end\n  print("========================\\n")\n  \n  return allPassed\nend\n\nfunction GameFramework:GetFrameworkStatus()\n  return {\n    gameMode = self.gameMode ~= nil,\n    gameState = self.gameState ~= nil,\n    dataLoader = self.dataLoader ~= nil,\n    hotReload = self.hotReload ~= nil,\n    testRunner = self.testRunner ~= nil,\n    gdd = self.gdd ~= nil,\n    scope = self.scope ~= nil,\n    verticalSlice = self.verticalSlice ~= nil,\n    playerCount = #self.players,\n    testsPassed = self.testRunner and self.testRunner.totalResults.passed or 0,\n    testsFailed = self.testRunner and self.testRunner.totalResults.failed or 0\n  }\nend\n\nreturn GameFramework',
    tests: [
      { type: "code_contains", expected: "GameFramework", message: "Debes tener GameFramework" },
      { type: "code_contains", expected: "Initialize", message: "Debes implementar Initialize" },
      { type: "code_contains", expected: "StartGame", message: "Debes implementar StartGame" },
      { type: "code_contains", expected: "RunTests", message: "Debes implementar RunTests" },
      { type: "code_contains", expected: "gameMode", message: "Debes tener gameMode" },
      { type: "code_contains", expected: "gameState", message: "Debes tener gameState" },
      { type: "code_contains", expected: "PlayerState", message: "Debes tener PlayerState" },
      { type: "code_contains", expected: "dataLoader", message: "Debes tener dataLoader" },
      { type: "code_contains", expected: "hotReload", message: "Debes tener hotReload" },
      { type: "code_contains", expected: "testRunner", message: "Debes tener testRunner" },
      { type: "code_contains", expected: "gdd", message: "Debes tener gdd" },
      { type: "code_contains", expected: "scope", message: "Debes tener scope" },
      { type: "code_contains", expected: "verticalSlice", message: "Debes tener verticalSlice" },
      { type: "code_contains", expected: "TestSuite", message: "Debes crear tests" },
      { type: "code_contains", expected: "AddTest", message: "Debes añadir tests" },
    ],
    hints: [
      "GameFramework integra todos los sistemas",
      "GameMode, GameState, PlayerState son core",
      "DataLoader y HotReload para data-driven",
      "TestRunner ejecuta tests automatizados",
      "GDD, Scope, VerticalSlice para documentación",
      "Tests unitarios para cada sistema core",
    ],
    difficulty: "advanced",
    xpReward: 500,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes10Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes10Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes10Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
