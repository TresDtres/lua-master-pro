import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 11: Producción del Juego Final
// ============================================
// Basado en el plan de estudio:
// Semana 1: Construcción core loop - mecánica principal jugable
// Semana 2: Contenido - 3 niveles, 3 enemigos, 5 armas/habilidades
// Semana 3: Menus y UX - menú principal, opciones, pausa, game over
// Semana 4: Polish y optimización - particles, audio, profiling, bug fixing
// ============================================
// Entregable del mes: Juego Completo Alpha - vertical slice jugable
// con inicio-medio-fin, publicado en itch.io para feedback
// ============================================

export const mes11Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: Core Loop (Semana 1)
  // ============================================
  {
    id: "mes-11-leccion-1-ej-1",
    lessonId: "l11-1-coreloop",
    title: 'Implementar Core Loop del Juego',
    instructions: 'Implementa el core loop principal del juego.\n\n**Requisitos:**\n- `CoreLoop()` crea sistema de core loop\n- `Start()` inicia el loop\n- `Update(deltaTime)` actualiza el loop cada frame\n- `Stop()` detiene el loop\n- Fases: Input, Update, Render, Feedback\n- Imprime "Core Loop: [fase]" en cada fase\n\n**Pista:** Core loop es el ciclo que se repite cada frame',
    starterCode: 'local CoreLoop = {}\n\nfunction CoreLoop:new()\n  local self = setmetatable({}, CoreLoop)\n  self.isRunning = false\n  self.phase = "Idle"\n  return self\nend\n\nfunction CoreLoop:Start()\n  -- Inicia el core loop\nend\n\nfunction CoreLoop:Update(deltaTime)\n  -- Actualiza cada frame\nend\n\nfunction CoreLoop:Stop()\n  -- Detiene el core loop\nend\n\nreturn CoreLoop',
    solution: 'local CoreLoop = {}\nCoreLoop.__index = CoreLoop\n\nfunction CoreLoop:new()\n  local self = setmetatable({}, CoreLoop)\n  self.isRunning = false\n  self.phase = "Idle"\n  self.frameCount = 0\n  self.totalTime = 0\n  return self\nend\n\nfunction CoreLoop:Start()\n  if self.isRunning then\n    print("Core Loop ya está corriendo")\n    return false\n  end\n  \n  self.isRunning = true\n  self.phase = "Input"\n  self.frameCount = 0\n  self.totalTime = 0\n  \n  print("\\n=== CORE LOOP INICIADO ===")\n  print("Fases: Input → Update → Render → Feedback")\n  print("==========================\\n")\n  \n  return true\nend\n\nfunction CoreLoop:Update(deltaTime)\n  if not self.isRunning then\n    return false\n  end\n  \n  self.frameCount = self.frameCount + 1\n  self.totalTime = self.totalTime + deltaTime\n  \n  -- Fase 1: Input\n  self.phase = "Input"\n  self:ProcessInput()\n  \n  -- Fase 2: Update\n  self.phase = "Update"\n  self:UpdateGameLogic(deltaTime)\n  \n  -- Fase 3: Render\n  self.phase = "Render"\n  self:Render()\n  \n  -- Fase 4: Feedback\n  self.phase = "Feedback"\n  self:ProcessFeedback()\n  \n  return true\nend\n\nfunction CoreLoop:ProcessInput()\n  -- Procesar input del jugador\n  -- En implementación real: leer teclado/mouse/gamepad\n  print("Core Loop: Input")\nend\n\nfunction CoreLoop:UpdateGameLogic(deltaTime)\n  -- Actualizar lógica del juego\n  -- En implementación real: física, IA, etc.\n  print("Core Loop: Update (dt: " .. deltaTime .. "s)")\nend\n\nfunction CoreLoop:Render()\n  -- Renderizar el juego\n  -- En implementación real: dibujar en pantalla\n  print("Core Loop: Render")\nend\n\nfunction CoreLoop:ProcessFeedback()\n  -- Procesar feedback (audio, partículas, etc.)\n  print("Core Loop: Feedback")\nend\n\nfunction CoreLoop:Stop()\n  if not self.isRunning then\n    print("Core Loop ya está detenido")\n    return false\n  end\n  \n  self.isRunning = false\n  self.phase = "Stopped"\n  \n  print("\\n=== CORE LOOP DETENIDO ===")\n  print("Frames totales: " .. self.frameCount)\n  print("Tiempo total: " .. self.totalTime .. "s")\n  print("FPS promedio: " .. (self.frameCount / self.totalTime) .. "\\n")\n  \n  return true\nend\n\nfunction CoreLoop:GetStats()\n  return {\n    frameCount = self.frameCount,\n    totalTime = self.totalTime,\n    avgFPS = self.frameCount / self.totalTime,\n    isRunning = self.isRunning,\n    phase = self.phase\n  }\nend\n\nreturn CoreLoop',
    tests: [
      { type: "code_contains", expected: "Start", message: "Debes implementar Start" },
      { type: "code_contains", expected: "Update", message: "Debes implementar Update" },
      { type: "code_contains", expected: "Stop", message: "Debes implementar Stop" },
      { type: "code_contains", expected: "isRunning", message: "Debes tener isRunning" },
      { type: "code_contains", expected: "phase", message: "Debes tener phase" },
      { type: "code_contains", expected: "Input", message: "Debes tener fase Input" },
      { type: "code_contains", expected: "Update", message: "Debes tener fase Update" },
      { type: "code_contains", expected: "Render", message: "Debes tener fase Render" },
      { type: "code_contains", expected: "Feedback", message: "Debes tener fase Feedback" },
    ],
    hints: [
      "Core loop tiene 4 fases: Input, Update, Render, Feedback",
      "Update se llama cada frame con deltaTime",
      "isRunning trackea estado del loop",
      "GetStats retorna estadísticas del loop",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-11-leccion-1-ej-2",
    lessonId: "l11-1-coreloop",
    title: 'Implementar Gestión de Estados del Juego',
    instructions: 'Crea un sistema para gestionar estados del juego (menú, jugando, pausa, etc.).\n\n**Requisitos:**\n- `GameStateManager()` crea manager de estados\n- `ChangeState(newState)` cambia de estado\n- `GetCurrentState()` retorna estado actual\n- `PushState(state)` apila estado (para pausa)\n- `PopState()` desapila estado\n- Estados: Menu, Playing, Paused, GameOver\n\n**Pista:** Usa una pila para estados anidados',
    starterCode: 'local GameStateManager = {}\n\nfunction GameStateManager:new()\n  local self = setmetatable({}, GameStateManager)\n  self.stateStack = {}\n  self.currentState = nil\n  return self\nend\n\nfunction GameStateManager:ChangeState(newState)\n  -- Cambia de estado\nend\n\nfunction GameStateManager:GetCurrentState()\n  -- Retorna estado actual\nend\n\nfunction GameStateManager:PushState(state)\n  -- Apila estado\nend\n\nfunction GameStateManager:PopState()\n  -- Desapila estado\nend\n\nreturn GameStateManager',
    solution: 'local GameStateManager = {}\nGameStateManager.__index = GameStateManager\n\nfunction GameStateManager:new()\n  local self = setmetatable({}, GameStateManager)\n  self.stateStack = {}\n  self.currentState = nil\n  self.states = {\n    Menu = "Menu",\n    Playing = "Playing",\n    Paused = "Paused",\n    GameOver = "GameOver",\n    Victory = "Victory"\n  }\n  print("GameStateManager inicializado")\n  return self\nend\n\nfunction GameStateManager:ChangeState(newState)\n  if self.currentState == newState then\n    print("Ya está en estado: " .. newState)\n    return false\n  end\n  \n  local oldState = self.currentState\n  self.currentState = newState\n  \n  print("Cambiando estado: " .. tostring(oldState) .. " → " .. newState)\n  \n  -- Notificar cambio de estado\n  self:OnStateChange(oldState, newState)\n  \n  return true\nend\n\nfunction GameStateManager:GetCurrentState()\n  return self.currentState\nend\n\nfunction GameStateManager:PushState(state)\n  -- Guardar estado actual en la pila\n  if self.currentState then\n    table.insert(self.stateStack, self.currentState)\n  end\n  \n  -- Cambiar al nuevo estado\n  self.currentState = state\n  print("Estado apilado: " .. state .. " (pila: " .. #self.stateStack .. ")")\nend\n\nfunction GameStateManager:PopState()\n  if #self.stateStack == 0 then\n    print("Pila de estados vacía")\n    return nil\n  end\n  \n  -- Obtener estado anterior de la pila\n  local previousState = table.remove(self.stateStack)\n  self.currentState = previousState\n  \n  print("Estado desapilado: " .. previousState .. " (pila: " .. #self.stateStack .. ")")\n  \n  return previousState\nend\n\nfunction GameStateManager:OnStateChange(oldState, newState)\n  -- Callback para cambios de estado\n  -- En implementación real: notificar sistemas del juego\n  \n  if newState == self.states.Menu then\n    print("Mostrando menú principal")\n  elseif newState == self.states.Playing then\n    print("Iniciando juego")\n  elseif newState == self.states.Paused then\n    print("Juego en pausa")\n  elseif newState == self.states.GameOver then\n    print("Game Over")\n  elseif newState == self.states.Victory then\n    print("¡Victoria!")\n  end\nend\n\nfunction GameStateManager:IsPlaying()\n  return self.currentState == self.states.Playing\nend\n\nfunction GameStateManager:IsPaused()\n  return self.currentState == self.states.Paused\nend\n\nfunction GameStateManager:Pause()\n  if self:IsPlaying() then\n    self:PushState(self.states.Paused)\n  end\nend\n\nfunction GameStateManager:Resume()\n  if self:IsPaused() then\n    self:PopState()\n  end\nend\n\nfunction GameStateManager:GetStateStack()\n  return self.stateStack\nend\n\nreturn GameStateManager',
    tests: [
      { type: "code_contains", expected: "ChangeState", message: "Debes implementar ChangeState" },
      { type: "code_contains", expected: "GetCurrentState", message: "Debes implementar GetCurrentState" },
      { type: "code_contains", expected: "PushState", message: "Debes implementar PushState" },
      { type: "code_contains", expected: "PopState", message: "Debes implementar PopState" },
      { type: "code_contains", expected: "stateStack", message: "Debes tener stateStack" },
      { type: "code_contains", expected: "currentState", message: "Debes tener currentState" },
      { type: "code_contains", expected: "Menu", message: "Debes tener estado Menu" },
      { type: "code_contains", expected: "Playing", message: "Debes tener estado Playing" },
      { type: "code_contains", expected: "Paused", message: "Debes tener estado Paused" },
      { type: "code_contains", expected: "GameOver", message: "Debes tener estado GameOver" },
    ],
    hints: [
      "stateStack es pila para estados anidados",
      "PushState guarda estado actual y cambia al nuevo",
      "PopState restaura estado anterior",
      "Estados: Menu, Playing, Paused, GameOver, Victory",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-11-leccion-1-ej-3",
    lessonId: "l11-1-coreloop",
    title: 'Implementar Gestión de Escenas/Niveles',
    instructions: 'Crea un sistema para cargar y gestionar escenas/niveles.\n\n**Requisitos:**\n- `SceneManager()` crea manager de escenas\n- `LoadScene(sceneName)` carga una escena\n- `UnloadScene()` descarga escena actual\n- `GetLoadedScenes()` retorna escenas cargadas\n- `TransitionTo(sceneName, effect)` transición con efecto\n- Imprime "Cargando escena: [name]" y "Escena cargada: [name]"\n\n**Pista:** SceneManager mantiene lista de escenas activas',
    starterCode: 'local SceneManager = {}\n\nfunction SceneManager:new()\n  local self = setmetatable({}, SceneManager)\n  self.loadedScenes = {}\n  self.currentScene = nil\n  return self\nend\n\nfunction SceneManager:LoadScene(sceneName)\n  -- Carga una escena\nend\n\nfunction SceneManager:UnloadScene()\n  -- Descarga escena actual\nend\n\nfunction SceneManager:GetLoadedScenes()\n  -- Retorna escenas cargadas\nend\n\nfunction SceneManager:TransitionTo(sceneName, effect)\n  -- Transición con efecto\nend\n\nreturn SceneManager',
    solution: 'local SceneManager = {}\nSceneManager.__index = SceneManager\n\nfunction SceneManager:new()\n  local self = setmetatable({}, SceneManager)\n  self.loadedScenes = {}\n  self.currentScene = nil\n  self.isTransitioning = false\n  print("SceneManager inicializado")\n  return self\nend\n\nfunction SceneManager:LoadScene(sceneName)\n  if self.loadedScenes[sceneName] then\n    print("Escena ya cargada: " .. sceneName)\n    return false\n  end\n  \n  print("\\n=== CARGANDO ESCENA ===")\n  print("Escena: " .. sceneName)\n  \n  -- Simular carga de escena\n  local scene = {\n    name = sceneName,\n    loaded = true,\n    objects = {},\n    lights = {},\n    triggers = {}\n  }\n  \n  -- Cargar objetos de la escena (simulado)\n  if sceneName == "Level1" then\n    scene.objects = { "Player", "Enemy1", "Enemy2", "Chest" }\n    scene.lights = { "Sun", "Torch1", "Torch2" }\n  elseif sceneName == "Level2" then\n    scene.objects = { "Player", "Boss", "Treasure" }\n    scene.lights = { "Moon", "Lava1", "Lava2" }\n  end\n  \n  self.loadedScenes[sceneName] = scene\n  self.currentScene = sceneName\n  \n  print("Objetos: " .. #scene.objects)\n  print("Luces: " .. #scene.lights)\n  print("Escena cargada: " .. sceneName)\n  print("========================\\n")\n  \n  return true\nend\n\nfunction SceneManager:UnloadScene(sceneName)\n  local name = sceneName or self.currentScene\n  \n  if not name or not self.loadedScenes[name] then\n    print("Escena no cargada: " .. tostring(name))\n    return false\n  end\n  \n  print("Descargando escena: " .. name)\n  \n  -- Limpiar escena\n  self.loadedScenes[name] = nil\n  \n  if self.currentScene == name then\n    self.currentScene = nil\n  end\n  \n  print("Escena descargada: " .. name)\n  \n  return true\nend\n\nfunction SceneManager:GetLoadedScenes()\n  local scenes = {}\n  for name in pairs(self.loadedScenes) do\n    table.insert(scenes, name)\n  end\n  return scenes\nend\n\nfunction SceneManager:GetCurrentScene()\n  return self.loadedScenes[self.currentScene]\nend\n\nfunction SceneManager:TransitionTo(sceneName, effect)\n  if self.isTransitioning then\n    print("Transición ya en curso")\n    return false\n  end\n  \n  self.isTransitioning = true\n  local transitionEffect = effect or "Fade"\n  \n  print("\\n=== TRANSICIÓN ===")\n  print("Efecto: " .. transitionEffect)\n  print("De: " .. tostring(self.currentScene))\n  print("A: " .. sceneName)\n  \n  -- Descargar escena actual\n  if self.currentScene then\n    self:UnloadScene()\n  end\n  \n  -- Cargar nueva escena\n  self:LoadScene(sceneName)\n  \n  self.isTransitioning = false\n  print("Transición completada\\n")\n  \n  return true\nend\n\nfunction SceneManager:IsTransitioning()\n  return self.isTransitioning\nend\n\nfunction SceneManager:GetSceneCount()\n  local count = 0\n  for _ in pairs(self.loadedScenes) do count = count + 1 end\n  return count\nend\n\nreturn SceneManager',
    tests: [
      { type: "code_contains", expected: "LoadScene", message: "Debes implementar LoadScene" },
      { type: "code_contains", expected: "UnloadScene", message: "Debes implementar UnloadScene" },
      { type: "code_contains", expected: "GetLoadedScenes", message: "Debes implementar GetLoadedScenes" },
      { type: "code_contains", expected: "TransitionTo", message: "Debes implementar TransitionTo" },
      { type: "code_contains", expected: "loadedScenes", message: "Debes tener loadedScenes" },
      { type: "code_contains", expected: "currentScene", message: "Debes tener currentScene" },
      { type: "code_contains", expected: "isTransitioning", message: "Debes tener isTransitioning" },
    ],
    hints: [
      "loadedScenes almacena escenas cargadas",
      "LoadScene carga y guarda escena",
      "UnloadScene limpia escena",
      "TransitionTo hace fade entre escenas",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },

  // ============================================
  // LECCIÓN 2: Contenido (Semana 2)
  // ============================================
  {
    id: "mes-11-leccion-2-ej-1",
    lessonId: "l11-2-content",
    title: 'Crear Sistema de 3 Niveles',
    instructions: 'Crea un sistema para gestionar 3 niveles con diferente dificultad.\n\n**Requisitos:**\n- `LevelManager()` crea manager de niveles\n- `LoadLevel(levelNumber)` carga nivel por número\n- `GetLevelInfo(levelNumber)` retorna info del nivel\n- `CompleteLevel()` marca nivel como completado\n- `GetProgress()` retorna progreso del jugador\n- Cada nivel tiene: name, difficulty, enemies, objectives\n\n**Pista:** Define configuración de cada nivel en una tabla',
    starterCode: 'local LevelManager = {}\n\nfunction LevelManager:new()\n  local self = setmetatable({}, LevelManager)\n  self.currentLevel = nil\n  self.completedLevels = {}\n  self.levels = {}\n  return self\nend\n\nfunction LevelManager:LoadLevel(levelNumber)\n  -- Carga nivel por número\nend\n\nfunction LevelManager:GetLevelInfo(levelNumber)\n  -- Retorna info del nivel\nend\n\nfunction LevelManager:CompleteLevel()\n  -- Marca nivel como completado\nend\n\nfunction LevelManager:GetProgress()\n  -- Retorna progreso\nend\n\nreturn LevelManager',
    solution: 'local LevelManager = {}\nLevelManager.__index = LevelManager\n\nfunction LevelManager:new()\n  local self = setmetatable({}, LevelManager)\n  self.currentLevel = nil\n  self.completedLevels = {}\n  \n  -- Definir 3 niveles\n  self.levels = {\n    [1] = {\n      number = 1,\n      name = "La Entrada del Dungeon",\n      difficulty = "Easy",\n      enemies = { "Goblin", "Goblin", "Rat" },\n      objectives = { "Derrota a todos los enemigos", "Encuentra la llave" },\n      rewards = { xp = 100, gold = 50 },\n      boss = nil\n    },\n    [2] = {\n      number = 2,\n      name = "Las Profundidades",\n      difficulty = "Medium",\n      enemies = { "Orc", "Skeleton", "DarkMage", "Spider" },\n      objectives = { "Derrota al DarkMage", "Activa las 3 runas" },\n      rewards = { xp = 250, gold = 150 },\n      boss = "DarkMage"\n    },\n    [3] = {\n      number = 3,\n      name = "La Cámara del Boss Final",\n      difficulty = "Hard",\n      enemies = { "Guardian1", "Guardian2" },\n      objectives = { "Derrota al Dragon Lord" },\n      rewards = { xp = 1000, gold = 500 },\n      boss = "DragonLord"\n    }\n  }\n  \n  print("LevelManager inicializado")\n  print("Niveles disponibles: 3")\n  return self\nend\n\nfunction LevelManager:LoadLevel(levelNumber)\n  if not self.levels[levelNumber] then\n    print("Nivel no existe: " .. levelNumber)\n    return false\n  end\n  \n  local level = self.levels[levelNumber]\n  self.currentLevel = level\n  \n  print("\\n=== CARGANDO NIVEL " .. levelNumber .. " ===")\n  print("Nombre: " .. level.name)\n  print("Dificultad: " .. level.difficulty)\n  print("Enemigos: " .. #level.enemies)\n  print("Objetivos: " .. #level.objectives)\n  \n  if level.boss then\n    print("⚠️ BOSS: " .. level.boss)\n  end\n  \n  print("============================\\n")\n  \n  return true\nend\n\nfunction LevelManager:GetLevelInfo(levelNumber)\n  return self.levels[levelNumber]\nend\n\nfunction LevelManager:CompleteLevel()\n  if not self.currentLevel then\n    print("No hay nivel activo")\n    return false\n  end\n  \n  local level = self.currentLevel\n  table.insert(self.completedLevels, level.number)\n  \n  print("\\n=== NIVEL COMPLETADO ===")\n  print(level.name)\n  print("Recompensas:")\n  print("  XP: +" .. level.rewards.xp)\n  print("  Oro: +" .. level.rewards.gold)\n  print("========================\\n")\n  \n  return level.rewards\nend\n\nfunction LevelManager:GetProgress()\n  local total = #self.levels\n  local completed = #self.completedLevels\n  \n  return {\n    totalLevels = total,\n    completedLevels = completed,\n    currentLevel = self.currentLevel and self.currentLevel.number or 0,\n    percent = math.floor((completed / total) * 100),\n    completedLevelNumbers = self.completedLevels\n  }\nend\n\nfunction LevelManager:UnlockNextLevel()\n  if not self.currentLevel then return false end\n  \n  local nextLevelNum = self.currentLevel.number + 1\n  \n  if self.levels[nextLevelNum] then\n    print("Siguiente nivel desbloqueado: " .. nextLevelNum)\n    return true\n  end\n  \n  print("¡Juego completado!")\n  return false\nend\n\nfunction LevelManager:GetTotalEnemies()\n  local total = 0\n  for _, level in pairs(self.levels) do\n    total = total + #level.enemies\n  end\n  return total\nend\n\nreturn LevelManager',
    tests: [
      { type: "code_contains", expected: "LoadLevel", message: "Debes implementar LoadLevel" },
      { type: "code_contains", expected: "GetLevelInfo", message: "Debes implementar GetLevelInfo" },
      { type: "code_contains", expected: "CompleteLevel", message: "Debes implementar CompleteLevel" },
      { type: "code_contains", expected: "GetProgress", message: "Debes implementar GetProgress" },
      { type: "code_contains", expected: "levels", message: "Debes tener tabla levels" },
      { type: "code_contains", expected: "completedLevels", message: "Debes tener completedLevels" },
      { type: "code_contains", expected: "difficulty", message: "Cada nivel debe tener difficulty" },
      { type: "code_contains", expected: "enemies", message: "Cada nivel debe tener enemies" },
      { type: "code_contains", expected: "objectives", message: "Cada nivel debe tener objectives" },
      { type: "code_contains", expected: "boss", message: "Al menos un nivel debe tener boss" },
    ],
    hints: [
      "levels define configuración de cada nivel",
      "Cada nivel tiene name, difficulty, enemies, objectives",
      "CompleteLevel marca nivel como completado",
      "GetProgress retorna porcentaje completado",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-11-leccion-2-ej-2",
    lessonId: "l11-2-content",
    title: 'Crear 3 Tipos de Enemigos',
    instructions: 'Crea un sistema con 3 tipos de enemigos con diferentes stats y comportamientos.\n\n**Requisitos:**\n- `EnemyFactory()` crea fábrica de enemigos\n- `CreateEnemy(type)` crea enemigo por tipo\n- Cada enemigo tiene: name, health, damage, behavior\n- Tipos: Melee (cuerpo a cuerpo), Ranged (distancia), Magic (hechizos)\n- `GetEnemyStats(type)` retorna stats del enemigo\n\n**Pista:** Usa factory pattern para crear enemigos',
    starterCode: 'local EnemyFactory = {}\n\nfunction EnemyFactory:new()\n  local self = setmetatable({}, EnemyFactory)\n  self.enemyTypes = {}\n  return self\nend\n\nfunction EnemyFactory:CreateEnemy(type)\n  -- Crea enemigo por tipo\nend\n\nfunction EnemyFactory:GetEnemyStats(type)\n  -- Retorna stats del enemigo\nend\n\nreturn EnemyFactory',
    solution: 'local EnemyFactory = {}\nEnemyFactory.__index = EnemyFactory\n\nfunction EnemyFactory:new()\n  local self = setmetatable({}, EnemyFactory)\n  \n  -- Definir 3 tipos de enemigos\n  self.enemyTypes = {\n    Melee = {\n      name = "Goblin Warrior",\n      type = "Melee",\n      health = 50,\n      maxHealth = 50,\n      damage = 10,\n      defense = 5,\n      speed = 100,\n      behavior = "Aggressive",\n      attacks = { "Slash", "Bash" },\n      weakness = "Ranged",\n      loot = { gold = 10, xp = 25 }\n    },\n    Ranged = {\n      name = "Skeleton Archer",\n      type = "Ranged",\n      health = 35,\n      maxHealth = 35,\n      damage = 15,\n      defense = 2,\n      speed = 80,\n      behavior = "KeepDistance",\n      attacks = { "Shoot", "PiercingArrow" },\n      weakness = "Melee",\n      loot = { gold = 15, xp = 30 }\n    },\n    Magic = {\n      name = "Dark Mage",\n      type = "Magic",\n      health = 40,\n      maxHealth = 40,\n      damage = 25,\n      defense = 3,\n      speed = 60,\n      behavior = "Caster",\n      attacks = { "Fireball", "DarkBolt", "Curse" },\n      weakness = "Fast",\n      loot = { gold = 30, xp = 50, item = "MagicStaff" }\n    }\n  }\n  \n  print("EnemyFactory inicializada")\n  print("Tipos de enemigos: Melee, Ranged, Magic")\n  return self\nend\n\nfunction EnemyFactory:CreateEnemy(type)\n  local template = self.enemyTypes[type]\n  \n  if not template then\n    print("Tipo de enemigo inválido: " .. type)\n    return nil\n  end\n  \n  -- Crear instancia del enemigo\n  local enemy = {}\n  for k, v in pairs(template) do\n    enemy[k] = v\n  end\n  \n  -- Estado dinámico\n  enemy.isAlive = true\n  enemy.target = nil\n  enemy.position = { x = 0, y = 0, z = 0 }\n  \n  print("Enemigo creado: " .. enemy.name .. " [" .. enemy.type .. "]")\n  print("  Salud: " .. enemy.health)\n  print("  Daño: " .. enemy.damage)\n  print("  Comportamiento: " .. enemy.behavior)\n  \n  return enemy\nend\n\nfunction EnemyFactory:GetEnemyStats(type)\n  return self.enemyTypes[type]\nend\n\nfunction EnemyFactory:GetAllEnemyTypes()\n  local types = {}\n  for type in pairs(self.enemyTypes) do\n    table.insert(types, type)\n  end\n  return types\nend\n\nfunction EnemyFactory:CreateEnemyGroup(composition)\n  -- composition: { Melee = 2, Ranged = 1, Magic = 1 }\n  local group = {}\n  \n  for type, count in pairs(composition) do\n    for i = 1, count do\n      table.insert(group, self:CreateEnemy(type))\n    end\n  end\n  \n  return group\nend\n\nfunction EnemyFactory:GetEnemyWeakness(type)\n  local enemy = self.enemyTypes[type]\n  if enemy then\n    return enemy.weakness\n  end\n  return nil\nend\n\nfunction EnemyFactory:GetEnemyLoot(type)\n  local enemy = self.enemyTypes[type]\n  if enemy then\n    return enemy.loot\n  end\n  return nil\nend\n\nreturn EnemyFactory',
    tests: [
      { type: "code_contains", expected: "CreateEnemy", message: "Debes implementar CreateEnemy" },
      { type: "code_contains", expected: "GetEnemyStats", message: "Debes implementar GetEnemyStats" },
      { type: "code_contains", expected: "enemyTypes", message: "Debes tener enemyTypes" },
      { type: "code_contains", expected: "Melee", message: "Debes tener enemigo Melee" },
      { type: "code_contains", expected: "Ranged", message: "Debes tener enemigo Ranged" },
      { type: "code_contains", expected: "Magic", message: "Debes tener enemigo Magic" },
      { type: "code_contains", expected: "health", message: "Cada enemigo debe tener health" },
      { type: "code_contains", expected: "damage", message: "Cada enemigo debe tener damage" },
      { type: "code_contains", expected: "behavior", message: "Cada enemigo debe tener behavior" },
    ],
    hints: [
      "enemyTypes define plantilla de cada tipo",
      "CreateEnemy crea instancia desde plantilla",
      "3 tipos: Melee, Ranged, Magic",
      "Cada tipo tiene stats y behavior único",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-11-leccion-2-ej-3",
    lessonId: "l11-2-content",
    title: 'Crear 5 Armas/Habilidades',
    instructions: 'Crea un sistema con 5 armas/habilidades diferentes.\n\n**Requisitos:**\n- `WeaponFactory()` crea fábrica de armas\n- `CreateWeapon(name)` crea arma por nombre\n- Cada arma tiene: name, type, damage, speed, special\n- Tipos: Sword, Axe, Bow, Staff, Dagger\n- `UseWeapon(weapon, target)` usa arma contra objetivo\n\n**Pista:** Cada arma tiene habilidad especial única',
    starterCode: 'local WeaponFactory = {}\n\nfunction WeaponFactory:new()\n  local self = setmetatable({}, WeaponFactory)\n  self.weapons = {}\n  return self\nend\n\nfunction WeaponFactory:CreateWeapon(name)\n  -- Crea arma por nombre\nend\n\nfunction WeaponFactory:UseWeapon(weapon, target)\n  -- Usa arma contra objetivo\nend\n\nreturn WeaponFactory',
    solution: 'local WeaponFactory = {}\nWeaponFactory.__index = WeaponFactory\n\nfunction WeaponFactory:new()\n  local self = setmetatable({}, WeaponFactory)\n  \n  -- Definir 5 armas/habilidades\n  self.weapons = {\n    Sword = {\n      name = "Iron Sword",\n      type = "Sword",\n      damage = 25,\n      speed = 1.0,\n      range = 50,\n      special = "PowerStrike",\n      description = "Espada de hierro balanceada",\n      manaCost = 0\n    },\n    Axe = {\n      name = "Battle Axe",\n      type = "Axe",\n      damage = 40,\n      speed = 0.7,\n      range = 45,\n      special = "Cleave",\n      description = "Hacha pesada de dos manos",\n      manaCost = 0\n    },\n    Bow = {\n      name = "Hunter Bow",\n      type = "Bow",\n      damage = 20,\n      speed = 1.2,\n      range = 200,\n      special = "PiercingShot",\n      description = "Arco preciso de largo alcance",\n      manaCost = 0\n    },\n    Staff = {\n      name = "Magic Staff",\n      type = "Staff",\n      damage = 35,\n      speed = 0.8,\n      range = 150,\n      special = "Fireball",\n      description = "Bastón imbuido con magia de fuego",\n      manaCost = 20\n    },\n    Dagger = {\n      name = "Assassin Dagger",\n      type = "Dagger",\n      damage = 15,\n      speed = 1.5,\n      range = 30,\n      special = "Backstab",\n      description = "Daga rápida para ataques furtivos",\n      manaCost = 0\n    }\n  }\n  \n  print("WeaponFactory inicializada")\n  print("Armas disponibles: 5")\n  return self\nend\n\nfunction WeaponFactory:CreateWeapon(name)\n  local template = self.weapons[name]\n  \n  if not template then\n    print("Arma no existe: " .. name)\n    return nil\n  end\n  \n  -- Crear instancia\n  local weapon = {}\n  for k, v in pairs(template) do\n    weapon[k] = v\n  end\n  \n  weapon.durability = 100\n  weapon.isEquipped = false\n  \n  print("Arma creada: " .. weapon.name)\n  print("  Tipo: " .. weapon.type)\n  print("  Daño: " .. weapon.damage)\n  print("  Especial: " .. weapon.special)\n  \n  return weapon\nend\n\nfunction WeaponFactory:UseWeapon(weapon, target)\n  if not weapon or not target then\n    return false\n  end\n  \n  print("\\n=== USANDO ARMA ===")\n  print(weapon.name .. " vs " .. target.name)\n  \n  -- Calcular daño\n  local damage = weapon.damage\n  \n  -- Aplicar habilidad especial\n  if weapon.special then\n    print("¡Habilidad especial: " .. weapon.special .. "!")\n    \n    if weapon.special == "PowerStrike" then\n      damage = damage * 1.5\n      print("PowerStrike: +50% daño")\n    elseif weapon.special == "Cleave" then\n      damage = damage * 1.3\n      print("Cleave: Daño en área")\n    elseif weapon.special == "PiercingShot" then\n      damage = damage * 1.2\n      print("PiercingShot: Ignora defensa")\n    elseif weapon.special == "Fireball" then\n      damage = damage * 2\n      print("Fireball: Daño de fuego masivo")\n    elseif weapon.special == "Backstab" then\n      damage = damage * 3\n      print("Backstab: Daño crítico x3")\n    end\n  end\n  \n  -- Aplicar daño al target\n  if target.health then\n    target.health = math.max(0, target.health - damage)\n    print(target.name .. " recibe " .. damage .. " daño")\n    print(target.name .. " salud restante: " .. target.health)\n  end\n  \n  print("====================\\n")\n  \n  return damage\nend\n\nfunction WeaponFactory:GetAllWeapons()\n  local weapons = {}\n  for name in pairs(self.weapons) do\n    table.insert(weapons, name)\n  end\n  return weapons\nend\n\nfunction WeaponFactory:CompareWeapons(name1, name2)\n  local w1 = self.weapons[name1]\n  local w2 = self.weapons[name2]\n  \n  if not w1 or not w2 then\n    return nil\n  end\n  \n  print("\\n=== COMPARACIÓN ===")\n  print(w1.name .. " vs " .. w2.name)\n  print("Daño: " .. w1.damage .. " vs " .. w2.damage)\n  print("Velocidad: " .. w1.speed .. " vs " .. w2.speed)\n  print("Alcance: " .. w1.range .. " vs " .. w2.range)\n  print("==================\\n")\nend\n\nreturn WeaponFactory',
    tests: [
      { type: "code_contains", expected: "CreateWeapon", message: "Debes implementar CreateWeapon" },
      { type: "code_contains", expected: "UseWeapon", message: "Debes implementar UseWeapon" },
      { type: "code_contains", expected: "weapons", message: "Debes tener tabla weapons" },
      { type: "code_contains", expected: "Sword", message: "Debes tener Sword" },
      { type: "code_contains", expected: "Axe", message: "Debes tener Axe" },
      { type: "code_contains", expected: "Bow", message: "Debes tener Bow" },
      { type: "code_contains", expected: "Staff", message: "Debes tener Staff" },
      { type: "code_contains", expected: "Dagger", message: "Debes tener Dagger" },
      { type: "code_contains", expected: "special", message: "Cada arma debe tener special" },
      { type: "code_contains", expected: "damage", message: "Cada arma debe tener damage" },
    ],
    hints: [
      "weapons define 5 armas diferentes",
      "Cada arma tiene name, type, damage, speed, special",
      "UseWeapon calcula daño y aplica especial",
      "5 tipos: Sword, Axe, Bow, Staff, Dagger",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },

  // ============================================
  // LECCIÓN 3: Menus y UX (Semana 3)
  // ============================================
  {
    id: "mes-11-leccion-3-ej-1",
    lessonId: "l11-3-menus",
    title: 'Crear Menú Principal',
    instructions: 'Crea un menú principal con opciones de juego.\n\n**Requisitos:**\n- `MainMenu()` crea menú principal\n- `Show()` muestra el menú\n- `SelectOption(option)` selecciona opción\n- Opciones: New Game, Continue, Options, Credits, Exit\n- Imprime "Menú Principal" y opciones disponibles\n\n**Pista:** Menú tiene lista de opciones seleccionables',
    starterCode: 'local MainMenu = {}\n\nfunction MainMenu:new()\n  local self = setmetatable({}, MainMenu)\n  self.options = {}\n  self.selectedIndex = 1\n  self.isVisible = false\n  return self\nend\n\nfunction MainMenu:Show()\n  -- Muestra el menú\nend\n\nfunction MainMenu:SelectOption(option)\n  -- Selecciona opción\nend\n\nreturn MainMenu',
    solution: 'local MainMenu = {}\nMainMenu.__index = MainMenu\n\nfunction MainMenu:new(gameManager)\n  local self = setmetatable({}, MainMenu)\n  self.options = {\n    { id = "newgame", label = "Nueva Partida", action = "StartNewGame" },\n    { id = "continue", label = "Continuar", action = "ContinueGame", enabled = false },\n    { id = "options", label = "Opciones", action = "ShowOptions" },\n    { id = "credits", label = "Créditos", action = "ShowCredits" },\n    { id = "exit", label = "Salir", action = "ExitGame" }\n  }\n  self.selectedIndex = 1\n  self.isVisible = false\n  self.gameManager = gameManager\n  print("MainMenu creado")\n  return self\nend\n\nfunction MainMenu:Show()\n  self.isVisible = true\n  \n  print("\\n================================")\n  print("       MENÚ PRINCIPAL")\n  print("================================")\n  \n  for i, option in ipairs(self.options) do\n    local marker = (i == self.selectedIndex) and "> " or "  "\n    local status = option.enabled == false and " [Bloqueado]" or ""\n    print(marker .. option.label .. status)\n  end\n  \n  print("================================")\n  print("Usa ↑↓ para navegar, Enter para seleccionar\\n")\nend\n\nfunction MainMenu:SelectOption(optionIndex)\n  if optionIndex < 1 or optionIndex > #self.options then\n    return false\n  end\n  \n  local option = self.options[optionIndex]\n  \n  if option.enabled == false then\n    print("Opción no disponible: " .. option.label)\n    return false\n  end\n  \n  print("Seleccionando: " .. option.label)\n  \n  -- Ejecutar acción\n  if option.action == "StartNewGame" then\n    self:StartNewGame()\n  elseif option.action == "ContinueGame" then\n    self:ContinueGame()\n  elseif option.action == "ShowOptions" then\n    self:ShowOptions()\n  elseif option.action == "ShowCredits" then\n    self:ShowCredits()\n  elseif option.action == "ExitGame" then\n    self:ExitGame()\n  end\n  \n  return true\nend\n\nfunction MainMenu:NavigateUp()\n  self.selectedIndex = self.selectedIndex - 1\n  if self.selectedIndex < 1 then\n    self.selectedIndex = #self.options\n  end\n  self:Show()\nend\n\nfunction MainMenu:NavigateDown()\n  self.selectedIndex = self.selectedIndex + 1\n  if self.selectedIndex > #self.options then\n    self.selectedIndex = 1\n  end\n  self:Show()\nend\n\nfunction MainMenu:StartNewGame()\n  print("\\n=== INICIANDO NUEVA PARTIDA ===")\n  if self.gameManager then\n    self.gameManager:StartNewGame()\n  end\n  self.isVisible = false\nend\n\nfunction MainMenu:ContinueGame()\n  print("\\n=== CARGANDO PARTIDA ===")\n  if self.gameManager then\n    self.gameManager:LoadGame()\n  end\n  self.isVisible = false\nend\n\nfunction MainMenu:ShowOptions()\n  print("\\n=== OPCIONES ===")\n  print("Volumen: 80%")\n  print("Dificultad: Normal")\n  print("Subtítulos: Activados")\n  print("==================\\n")\nend\n\nfunction MainMenu:ShowCredits()\n  print("\\n=== CRÉDITOS ===")\n  print("Desarrollado por: Tu Estudio")\n  print("Música: Composer Name")\n  print("Arte: Artist Name")\n  print("==============\\n")\nend\n\nfunction MainMenu:ExitGame()\n  print("\\n=== SALIENDO DEL JUEGO ===")\n  print("¡Gracias por jugar!\\n")\nend\n\nfunction MainMenu:EnableContinue(enabled)\n  for _, option in ipairs(self.options) do\n    if option.id == "continue" then\n      option.enabled = enabled\n    end\n  end\nend\n\nreturn MainMenu',
    tests: [
      { type: "code_contains", expected: "Show", message: "Debes implementar Show" },
      { type: "code_contains", expected: "SelectOption", message: "Debes implementar SelectOption" },
      { type: "code_contains", expected: "options", message: "Debes tener tabla options" },
      { type: "code_contains", expected: "selectedIndex", message: "Debes tener selectedIndex" },
      { type: "code_contains", expected: "isVisible", message: "Debes tener isVisible" },
      { type: "code_contains", expected: "New Game", message: "Debes tener opción New Game" },
      { type: "code_contains", expected: "Continue", message: "Debes tener opción Continue" },
      { type: "code_contains", expected: "Options", message: "Debes tener opción Options" },
      { type: "code_contains", expected: "Credits", message: "Debes tener opción Credits" },
      { type: "code_contains", expected: "Exit", message: "Debes tener opción Exit" },
    ],
    hints: [
      "options es lista de opciones del menú",
      "selectedIndex trackea opción seleccionada",
      "Show imprime menú con opciones",
      "SelectOption ejecuta acción de la opción",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-11-leccion-3-ej-2",
    lessonId: "l11-3-menus",
    title: 'Crear Sistema de Pausa',
    instructions: 'Crea un menú de pausa que se superpone al juego.\n\n**Requisitos:**\n- `PauseMenu()` crea menú de pausa\n- `Toggle()` activa/desactiva pausa\n- `Resume()` reanuda el juego\n- `SaveAndQuit()` guarda y sale al menú\n- Opciones: Resume, Save & Quit, Options\n- Imprime "Juego en Pausa" cuando está activo\n\n**Pista:** Pausa usa PushState/PopState del GameStateManager',
    starterCode: 'local PauseMenu = {}\n\nfunction PauseMenu:new(gameStateManager)\n  local self = setmetatable({}, PauseMenu)\n  self.isActive = false\n  self.gameStateManager = gameStateManager\n  return self\nend\n\nfunction PauseMenu:Toggle()\n  -- Activa/desactiva pausa\nend\n\nfunction PauseMenu:Resume()\n  -- Reanuda el juego\nend\n\nfunction PauseMenu:SaveAndQuit()\n  -- Guarda y sale al menú\nend\n\nreturn PauseMenu',
    solution: 'local PauseMenu = {}\nPauseMenu.__index = PauseMenu\n\nfunction PauseMenu:new(gameStateManager)\n  local self = setmetatable({}, PauseMenu)\n  self.isActive = false\n  self.gameStateManager = gameStateManager\n  self.options = {\n    { id = "resume", label = "Reanudar", action = "Resume" },\n    { id = "savequit", label = "Guardar y Salir", action = "SaveAndQuit" },\n    { id = "options", label = "Opciones", action = "ShowOptions" }\n  }\n  self.selectedIndex = 1\n  print("PauseMenu creado")\n  return self\nend\n\nfunction PauseMenu:Toggle()\n  if self.isActive then\n    self:Resume()\n  else\n    self:Pause()\n  end\n  return self.isActive\nend\n\nfunction PauseMenu:Pause()\n  if self.isActive then\n    print("Juego ya está en pausa")\n    return false\n  end\n  \n  self.isActive = true\n  \n  -- Notificar al GameStateManager\n  if self.gameStateManager then\n    self.gameStateManager:PushState("Paused")\n  end\n  \n  print("\\n=== JUEGO EN PAUSA ===")\n  print("Opciones:")\n  \n  for i, option in ipairs(self.options) do\n    local marker = (i == self.selectedIndex) and "> " or "  "\n    print(marker .. option.label)\n  end\n  \n  print("========================\\n")\n  print("Presiona P para reanudar\\n")\n  \n  return true\nend\n\nfunction PauseMenu:Resume()\n  if not self.isActive then\n    print("Juego no está en pausa")\n    return false\n  end\n  \n  self.isActive = false\n  \n  -- Notificar al GameStateManager\n  if self.gameStateManager then\n    self.gameStateManager:PopState()\n  end\n  \n  print("Juego reanudado\\n")\n  return true\nend\n\nfunction PauseMenu:SaveAndQuit()\n  print("\\n=== GUARDANDO PARTIDA ===")\n  \n  -- Simular guardado\n  print("Guardando progreso...")\n  print("Partida guardada exitosamente")\n  \n  -- Salir al menú principal\n  self.isActive = false\n  \n  if self.gameStateManager then\n    self.gameStateManager:ChangeState("Menu")\n  end\n  \n  print("Volviendo al menú principal\\n")\n  return true\nend\n\nfunction PauseMenu:ShowOptions()\n  print("\\n=== OPCIONES DE PAUSA ===")\n  print("Volumen: 80%")\n  print("Dificultad: Normal")\n  print("========================\\n")\nend\n\nfunction PauseMenu:NavigateUp()\n  self.selectedIndex = self.selectedIndex - 1\n  if self.selectedIndex < 1 then\n    self.selectedIndex = #self.options\n  end\n  self:ShowMenu()\nend\n\nfunction PauseMenu:NavigateDown()\n  self.selectedIndex = self.selectedIndex + 1\n  if self.selectedIndex > #self.options then\n    self.selectedIndex = 1\n  end\n  self:ShowMenu()\nend\n\nfunction PauseMenu:ShowMenu()\n  if not self.isActive then return end\n  \n  print("\\n=== JUEGO EN PAUSA ===")\n  for i, option in ipairs(self.options) do\n    local marker = (i == self.selectedIndex) and "> " or "  "\n    print(marker .. option.label)\n  end\n  print("========================\\n")\nend\n\nfunction PauseMenu:SelectOption(index)\n  local option = self.options[index]\n  if not option then return false end\n  \n  if option.action == "Resume" then\n    self:Resume()\n  elseif option.action == "SaveAndQuit" then\n    self:SaveAndQuit()\n  elseif option.action == "ShowOptions" then\n    self:ShowOptions()\n  end\n  \n  return true\nend\n\nfunction PauseMenu:IsActive()\n  return self.isActive\nend\n\nreturn PauseMenu',
    tests: [
      { type: "code_contains", expected: "Toggle", message: "Debes implementar Toggle" },
      { type: "code_contains", expected: "Resume", message: "Debes implementar Resume" },
      { type: "code_contains", expected: "SaveAndQuit", message: "Debes implementar SaveAndQuit" },
      { type: "code_contains", expected: "isActive", message: "Debes tener isActive" },
      { type: "code_contains", expected: "gameStateManager", message: "Debes tener gameStateManager" },
      { type: "code_contains", expected: "Paused", message: "Debes tener estado Paused" },
      { type: "code_contains", expected: "Resume", message: "Debes tener opción Resume" },
      { type: "code_contains", expected: "Save", message: "Debes tener opción Save" },
    ],
    hints: [
      "isActive trackea estado de pausa",
      "Toggle activa/desactiva pausa",
      "Resume reanuda el juego",
      "SaveAndQuit guarda y sale al menú",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-11-leccion-3-ej-3",
    lessonId: "l11-3-menus",
    title: 'Crear Pantallas de Game Over y Victoria',
    instructions: 'Crea pantallas para Game Over y Victoria con estadísticas.\n\n**Requisitos:**\n- `EndScreen()` crea sistema de pantallas finales\n- `ShowGameOver(stats)` muestra pantalla de Game Over\n- `ShowVictory(stats)` muestra pantalla de Victoria\n- Muestra estadísticas: tiempo, enemigos derrotados, oro, XP\n- Opciones: Retry, Main Menu\n- Imprime "GAME OVER" o "¡VICTORIA!"\n\n**Pista:** Ambas pantallas muestran resumen de estadísticas',
    starterCode: 'local EndScreen = {}\n\nfunction EndScreen:new()\n  local self = setmetatable({}, EndScreen)\n  self.isVisible = false\n  self.screenType = nil\n  return self\nend\n\nfunction EndScreen:ShowGameOver(stats)\n  -- Muestra pantalla de Game Over\nend\n\nfunction EndScreen:ShowVictory(stats)\n  -- Muestra pantalla de Victoria\nend\n\nreturn EndScreen',
    solution: 'local EndScreen = {}\nEndScreen.__index = EndScreen\n\nfunction EndScreen:new()\n  local self = setmetatable({}, EndScreen)\n  self.isVisible = false\n  self.screenType = nil\n  self.stats = nil\n  print("EndScreen creado")\n  return self\nend\n\nfunction EndScreen:ShowGameOver(stats)\n  self.isVisible = true\n  self.screenType = "GameOver"\n  self.stats = stats or {}\n  \n  print("\\n")\n  print("██████╗  █████╗ ███╗   ███╗███████╗")\n  print("██╔════╝ ██╔══██╗████╗ ████║██╔════╝")\n  print("██║  ███╗███████║██╔████╔██║█████╗  ")\n  print("██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ")\n  print("╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗")\n  print(" ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝")\n  print("                                    ")\n  print("███╗   ██╗███╗   ██╗██╗████████╗   ")\n  print("████╗  ██║████╗  ██║██║╚══██╔══╝   ")\n  print("██╔██╗ ██║██╔██╗ ██║██║   ██║      ")\n  print("██║╚██╗██║██║╚██╗██║██║   ██║      ")\n  print("██║ ╚████║██║ ╚████║██║   ██║      ")\n  print("╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝   ╚═╝      ")\n  print("\\n")\n  \n  self:ShowStats()\n  \n  print("\\n=== OPCIONES ===")\n  print("1. Reintentar")\n  print("2. Menú Principal")\n  print("================\\n")\nend\n\nfunction EndScreen:ShowVictory(stats)\n  self.isVisible = true\n  self.screenType = "Victory"\n  self.stats = stats or {}\n  \n  print("\\n")\n  print("██╗   ██╗███╗   ██╗██╗   ██╗███╗   ███╗")\n  print("╚██╗ ██╔╝████╗  ██║██║   ██║████╗ ████║")\n  print(" ╚████╔╝ ██╔██╗ ██║██║   ██║██╔████╔██║")\n  print("  ╚██╔╝  ██║╚██╗██║██║   ██║██║╚██╔╝██║")\n  print("   ██║   ██║ ╚████║╚██████╔╝██║ ╚═╝ ██║")\n  print("   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝ ╚═╝     ╚═╝")\n  print("                                        ")\n  print("██╗   ██╗███╗   ██╗███████╗             ")\n  print("██║   ██║████╗  ██║██╔════╝             ")\n  print("██║   ██║██╔██╗ ██║███████╗             ")\n  print("██║   ██║██║╚██╗██║╚════██║             ")\n  print("╚██████╔╝██║ ╚████║███████║             ")\n  print(" ╚═════╝ ╚═╝  ╚═══╝╚══════╝             ")\n  print("\\n")\n  \n  self:ShowStats()\n  \n  print("\\n=== ¡FELICIDADES! ===")\n  print("Has completado el juego")\n  print("======================\\n")\n  \n  print("\\n=== OPCIONES ===")\n  print("1. Jugar de Nuevo")\n  print("2. Menú Principal")\n  print("================\\n")\nend\n\nfunction EndScreen:ShowStats()\n  if not self.stats then return end\n  \n  print("\\n=== ESTADÍSTICAS ===")\n  \n  if self.stats.time then\n    print("Tiempo: " .. self.stats.time .. " segundos")\n  end\n  \n  if self.stats.enemiesDefeated then\n    print("Enemigos derrotados: " .. self.stats.enemiesDefeated)\n  end\n  \n  if self.stats.gold then\n    print("Oro recolectado: " .. self.stats.gold)\n  end\n  \n  if self.stats.xp then\n    print("XP ganada: " .. self.stats.xp)\n  end\n  \n  if self.stats.damageDealt then\n    print("Daño total: " .. self.stats.damageDealt)\n  end\n  \n  if self.stats.healthPotions then\n    print("Pociones usadas: " .. self.stats.healthPotions)\n  end\n  \n  print("====================\\n")\nend\n\nfunction EndScreen:Retry()\n  print("\\n=== REINTENTANDO ===")\n  self.isVisible = false\n  self.screenType = nil\n  -- En implementación real: reiniciar nivel actual\nend\n\nfunction EndScreen:GoToMainMenu()\n  print("\\n=== VOLVIENDO AL MENÚ ===")\n  self.isVisible = false\n  self.screenType = nil\n  -- En implementación real: cambiar a estado Menu\nend\n\nfunction EndScreen:IsVisible()\n  return self.isVisible\nend\n\nfunction EndScreen:GetScreenType()\n  return self.screenType\nend\n\nreturn EndScreen',
    tests: [
      { type: "code_contains", expected: "ShowGameOver", message: "Debes implementar ShowGameOver" },
      { type: "code_contains", expected: "ShowVictory", message: "Debes implementar ShowVictory" },
      { type: "code_contains", expected: "isVisible", message: "Debes tener isVisible" },
      { type: "code_contains", expected: "screenType", message: "Debes tener screenType" },
      { type: "code_contains", expected: "GAME OVER", message: "Debes mostrar GAME OVER" },
      { type: "code_contains", expected: "VICTORIA", message: "Debes mostrar VICTORIA" },
      { type: "code_contains", expected: "stats", message: "Debes mostrar estadísticas" },
      { type: "code_contains", expected: "Retry", message: "Debes tener opción Retry" },
    ],
    hints: [
      "isVisible trackea si la pantalla está visible",
      "ShowGameOver muestra pantalla de Game Over",
      "ShowVictory muestra pantalla de Victoria",
      "Ambas muestran estadísticas del jugador",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },

  // ============================================
  // LECCIÓN 4: Polish y Optimización (Semana 4)
  // ============================================
  {
    id: "mes-11-leccion-4-ej-1",
    lessonId: "l11-4-polish",
    title: 'Implementar Sistema de Partículas',
    instructions: 'Crea un sistema simple de partículas para efectos visuales.\n\n**Requisitos:**\n- `ParticleSystem()` crea sistema de partículas\n- `Emit(count, config)` emite partículas\n- `Update(deltaTime)` actualiza partículas\n- Cada partícula tiene: position, velocity, lifetime, color\n- `SpawnEffect(type, position)` spawn efecto predefinido\n- Efectos: Explosion, Sparkle, Smoke, Blood\n\n**Pista:** Partículas tienen lifetime y se eliminan al expirar',
    starterCode: 'local ParticleSystem = {}\n\nfunction ParticleSystem:new()\n  local self = setmetatable({}, ParticleSystem)\n  self.particles = {}\n  self.maxParticles = 1000\n  return self\nend\n\nfunction ParticleSystem:Emit(count, config)\n  -- Emite partículas\nend\n\nfunction ParticleSystem:Update(deltaTime)\n  -- Actualiza partículas\nend\n\nfunction ParticleSystem:SpawnEffect(type, position)\n  -- Spawn efecto predefinido\nend\n\nreturn ParticleSystem',
    solution: 'local ParticleSystem = {}\nParticleSystem.__index = ParticleSystem\n\nfunction ParticleSystem:new()\n  local self = setmetatable({}, ParticleSystem)\n  self.particles = {}\n  self.maxParticles = 1000\n  print("ParticleSystem inicializado (max: " .. self.maxParticles .. ")")\n  return self\nend\n\nfunction ParticleSystem:Emit(count, config)\n  config = config or {}\n  \n  local emitted = 0\n  \n  for i = 1, count do\n    if #self.particles >= self.maxParticles then\n      print("Límite de partículas alcanzado")\n      break\n    end\n    \n    local particle = {\n      position = config.position or { x = 0, y = 0, z = 0 },\n      velocity = config.velocity or { x = 0, y = 0, z = 0 },\n      lifetime = config.lifetime or 1.0,\n      maxLifetime = config.lifetime or 1.0,\n      color = config.color or { r = 1, g = 1, b = 1, a = 1 },\n      size = config.size or 1.0,\n      gravity = config.gravity or 0\n    }\n    \n    table.insert(self.particles, particle)\n    emitted = emitted + 1\n  end\n  \n  print("Partículas emitidas: " .. emitted)\n  return emitted\nend\n\nfunction ParticleSystem:Update(deltaTime)\n  local aliveCount = 0\n  \n  -- Actualizar partículas vivas\n  for i = #self.particles, 1, -1 do\n    local p = self.particles[i]\n    \n    -- Actualizar lifetime\n    p.lifetime = p.lifetime - deltaTime\n    \n    if p.lifetime <= 0 then\n      -- Partícula expiró, remover\n      table.remove(self.particles, i)\n    else\n      -- Actualizar posición\n      p.position.x = p.position.x + p.velocity.x * deltaTime\n      p.position.y = p.position.y + p.velocity.y * deltaTime\n      p.position.z = p.position.z + p.velocity.z * deltaTime\n      \n      -- Aplicar gravedad\n      if p.gravity ~= 0 then\n        p.velocity.z = p.velocity.z - p.gravity * deltaTime\n      end\n      \n      -- Fade out cerca del final de vida\n      local lifePercent = p.lifetime / p.maxLifetime\n      p.color.a = lifePercent\n      \n      aliveCount = aliveCount + 1\n    end\n  end\n  \n  return aliveCount\nend\n\nfunction ParticleSystem:SpawnEffect(type, position)\n  position = position or { x = 0, y = 0, z = 0 }\n  \n  if type == "Explosion" then\n    self:Emit(50, {\n      position = position,\n      velocity = { x = math.random(-100, 100), y = math.random(-100, 100), z = math.random(50, 150) },\n      lifetime = 0.5,\n      color = { r = 1, g = 0.5, b = 0, a = 1 },\n      size = 2.0,\n      gravity = 50\n    })\n    print("Efecto: Explosion en (" .. position.x .. ", " .. position.y .. ", " .. position.z .. ")")\n    \n  elseif type == "Sparkle" then\n    self:Emit(20, {\n      position = position,\n      velocity = { x = math.random(-50, 50), y = math.random(-50, 50), z = math.random(50, 100) },\n      lifetime = 0.3,\n      color = { r = 1, g = 1, b = 0, a = 1 },\n      size = 0.5,\n      gravity = 0\n    })\n    print("Efecto: Sparkle")\n    \n  elseif type == "Smoke" then\n    self:Emit(30, {\n      position = position,\n      velocity = { x = math.random(-20, 20), y = math.random(-20, 20), z = math.random(20, 50) },\n      lifetime = 1.5,\n      color = { r = 0.5, g = 0.5, b = 0.5, a = 0.5 },\n      size = 3.0,\n      gravity = -10\n    })\n    print("Efecto: Smoke")\n    \n  elseif type == "Blood" then\n    self:Emit(40, {\n      position = position,\n      velocity = { x = math.random(-80, 80), y = math.random(-80, 80), z = math.random(30, 80) },\n      lifetime = 0.8,\n      color = { r = 0.8, g = 0, b = 0, a = 1 },\n      size = 1.0,\n      gravity = 80\n    })\n    print("Efecto: Blood")\n  end\nend\n\nfunction ParticleSystem:GetParticleCount()\n  return #self.particles\nend\n\nfunction ParticleSystem:Clear()\n  self.particles = {}\n  print("Partículas limpiadas")\nend\n\nreturn ParticleSystem',
    tests: [
      { type: "code_contains", expected: "Emit", message: "Debes implementar Emit" },
      { type: "code_contains", expected: "Update", message: "Debes implementar Update" },
      { type: "code_contains", expected: "SpawnEffect", message: "Debes implementar SpawnEffect" },
      { type: "code_contains", expected: "particles", message: "Debes tener tabla particles" },
      { type: "code_contains", expected: "lifetime", message: "Cada partícula debe tener lifetime" },
      { type: "code_contains", expected: "position", message: "Cada partícula debe tener position" },
      { type: "code_contains", expected: "velocity", message: "Cada partícula debe tener velocity" },
      { type: "code_contains", expected: "Explosion", message: "Debes tener efecto Explosion" },
      { type: "code_contains", expected: "Smoke", message: "Debes tener efecto Smoke" },
    ],
    hints: [
      "particles es lista de partículas activas",
      "Emit crea nuevas partículas con config",
      "Update actualiza posición y lifetime",
      "SpawnEffect spawn efectos predefinidos",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },
  {
    id: "mes-11-leccion-4-ej-2",
    lessonId: "l11-4-polish",
    title: 'Implementar Screen Shake',
    instructions: 'Crea un sistema de screen shake para impacto visual.\n\n**Requisitos:**\n- `ScreenShake()` crea sistema de shake\n- `AddShake(intensity, duration)` añade shake\n- `Update(deltaTime)` actualiza shake actual\n- `GetOffset()` retorna offset actual de cámara\n- Soporta múltiples shakes simultáneos\n- Imprime "Screen Shake: [intensity]" cuando se activa\n\n**Pista:** Acumula intensidad de múltiples shakes',
    starterCode: 'local ScreenShake = {}\n\nfunction ScreenShake:new()\n  local self = setmetatable({}, ScreenShake)\n  self.shakes = {}\n  self.currentOffset = { x = 0, y = 0, z = 0 }\n  return self\nend\n\nfunction ScreenShake:AddShake(intensity, duration)\n  -- Añade shake\nend\n\nfunction ScreenShake:Update(deltaTime)\n  -- Actualiza shakes\nend\n\nfunction ScreenShake:GetOffset()\n  -- Retorna offset actual\nend\n\nreturn ScreenShake',
    solution: 'local ScreenShake = {}\nScreenShake.__index = ScreenShake\n\nfunction ScreenShake:new()\n  local self = setmetatable({}, ScreenShake)\n  self.shakes = {}\n  self.currentOffset = { x = 0, y = 0, z = 0 }\n  print("ScreenShake inicializado")\n  return self\nend\n\nfunction ScreenShake:AddShake(intensity, duration)\n  local shake = {\n    intensity = intensity,\n    duration = duration,\n    remaining = duration,\n    id = #self.shakes + 1\n  }\n  \n  table.insert(self.shakes, shake)\n  \n  print("Screen Shake: intensidad " .. intensity .. ", duración " .. duration .. "s")\n  print("Shakes activos: " .. #self.shakes)\n  \n  return shake.id\nend\n\nfunction ScreenShake:Update(deltaTime)\n  local totalIntensity = 0\n  \n  -- Actualizar shakes activos\n  for i = #self.shakes, 1, -1 do\n    local shake = self.shakes[i]\n    \n    shake.remaining = shake.remaining - deltaTime\n    \n    if shake.remaining <= 0 then\n      -- Shake expiró, remover\n      table.remove(self.shakes, i)\n    else\n      -- Acumular intensidad con decay\n      local decay = shake.remaining / shake.duration\n      totalIntensity = totalIntensity + (shake.intensity * decay)\n    end\n  end\n  \n  -- Calcular offset actual\n  if totalIntensity > 0 then\n    self.currentOffset.x = (math.random() - 0.5) * 2 * totalIntensity\n    self.currentOffset.y = (math.random() - 0.5) * 2 * totalIntensity\n    self.currentOffset.z = 0\n  else\n    self.currentOffset = { x = 0, y = 0, z = 0 }\n  end\n  \n  return totalIntensity\nend\n\nfunction ScreenShake:GetOffset()\n  return self.currentOffset\nend\n\nfunction ScreenShake:GetActiveShakeCount()\n  return #self.shakes\nend\n\nfunction ScreenShake:Clear()\n  self.shakes = {}\n  self.currentOffset = { x = 0, y = 0, z = 0 }\n  print("ScreenShake limpiado")\nend\n\n-- Shakes predefinidos\nfunction ScreenShake:LightHit()\n  return self:AddShake(2, 0.2)\nend\n\nfunction ScreenShake:HeavyHit()\n  return self:AddShake(5, 0.4)\nend\n\nfunction ScreenShake:Explosion()\n  return self:AddShake(10, 0.6)\nend\n\nfunction ScreenShake:Earthquake()\n  return self:AddShake(3, 2.0)\nend\n\nreturn ScreenShake',
    tests: [
      { type: "code_contains", expected: "AddShake", message: "Debes implementar AddShake" },
      { type: "code_contains", expected: "Update", message: "Debes implementar Update" },
      { type: "code_contains", expected: "GetOffset", message: "Debes implementar GetOffset" },
      { type: "code_contains", expected: "shakes", message: "Debes tener tabla shakes" },
      { type: "code_contains", expected: "currentOffset", message: "Debes tener currentOffset" },
      { type: "code_contains", expected: "intensity", message: "Cada shake debe tener intensity" },
      { type: "code_contains", expected: "duration", message: "Cada shake debe tener duration" },
      { type: "code_contains", expected: "remaining", message: "Cada shake debe tener remaining" },
    ],
    hints: [
      "shakes es lista de shakes activos",
      "AddShake añade nuevo shake con intensidad y duración",
      "Update calcula offset basado en shakes activos",
      "GetOffset retorna offset actual de cámara",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-11-leccion-4-ej-3",
    lessonId: "l11-4-polish",
    title: 'Profiler de Rendimiento en Tiempo Real',
    instructions: 'Crea un profiler para medir rendimiento del juego.\n\n**Requisitos:**\n- `GameProfiler()` crea profiler\n- `StartFrame()` inicia medición de frame\n- `EndFrame()` finaliza medición\n- `GetFPS()` retorna FPS actual\n- `GetAverageFPS()` retorna FPS promedio\n- `GetFrameTime()` retorna tiempo del frame en ms\n- Imprime alerta si FPS < 30\n\n**Pista:** Usa os.clock() o similar para medir tiempo',
    starterCode: 'local GameProfiler = {}\n\nfunction GameProfiler:new()\n  local self = setmetatable({}, GameProfiler)\n  self.frameTimes = {}\n  self.maxSamples = 60\n  self.currentFrameStart = 0\n  return self\nend\n\nfunction GameProfiler:StartFrame()\n  -- Inicia medición de frame\nend\n\nfunction GameProfiler:EndFrame()\n  -- Finaliza medición\nend\n\nfunction GameProfiler:GetFPS()\n  -- Retorna FPS actual\nend\n\nfunction GameProfiler:GetAverageFPS()\n  -- Retorna FPS promedio\nend\n\nreturn GameProfiler',
    solution: 'local GameProfiler = {}\nGameProfiler.__index = GameProfiler\n\nfunction GameProfiler:new()\n  local self = setmetatable({}, GameProfiler)\n  self.frameTimes = {}\n  self.maxSamples = 60\n  self.currentFrameStart = 0\n  self.totalFrames = 0\n  self.alertThreshold = 30  -- FPS mínimo aceptable\n  print("GameProfiler inicializado")\n  return self\nend\n\nfunction GameProfiler:StartFrame()\n  self.currentFrameStart = os.clock()\nend\n\nfunction GameProfiler:EndFrame()\n  local frameTime = os.clock() - self.currentFrameStart\n  local frameTimeMs = frameTime * 1000\n  \n  -- Guardar tiempo del frame\n  table.insert(self.frameTimes, frameTimeMs)\n  \n  -- Mantener solo últimos N samples\n  if #self.frameTimes > self.maxSamples then\n    table.remove(self.frameTimes, 1)\n  end\n  \n  self.totalFrames = self.totalFrames + 1\n  \n  -- Verificar FPS bajo\n  local fps = self:GetFPS()\n  if fps < self.alertThreshold and self.totalFrames % 30 == 0 then\n    print("⚠️ ALERTA: FPS bajos (" .. fps .. ")")\n  end\n  \n  return frameTimeMs\nend\n\nfunction GameProfiler:GetFPS()\n  if #self.frameTimes == 0 then return 60 end\n  \n  local avgFrameTime = 0\n  for _, time in ipairs(self.frameTimes) do\n    avgFrameTime = avgFrameTime + time\n  end\n  avgFrameTime = avgFrameTime / #self.frameTimes\n  \n  if avgFrameTime <= 0 then return 60 end\n  \n  return math.floor(1000 / avgFrameTime)\nend\n\nfunction GameProfiler:GetAverageFPS()\n  return self:GetFPS()  -- Ya es promedio de últimos frames\nend\n\nfunction GameProfiler:GetFrameTime()\n  if #self.frameTimes == 0 then return 16.67 end\n  return self.frameTimes[#self.frameTimes]\nend\n\nfunction GameProfiler:GetAverageFrameTime()\n  if #self.frameTimes == 0 then return 16.67 end\n  \n  local total = 0\n  for _, time in ipairs(self.frameTimes) do\n    total = total + time\n  end\n  return total / #self.frameTimes\nend\n\nfunction GameProfiler:GetStats()\n  return {\n    currentFPS = self:GetFPS(),\n    averageFPS = self:GetAverageFPS(),\n    currentFrameTime = self:GetFrameTime(),\n    averageFrameTime = self:GetAverageFrameTime(),\n    totalFrames = self.totalFrames,\n    samples = #self.frameTimes\n  }\nend\n\nfunction GameProfiler:PrintStats()\n  local stats = self:GetStats()\n  \n  print("\\n=== PROFILER ===")\n  print("FPS Actual: " .. stats.currentFPS)\n  print("FPS Promedio: " .. stats.averageFPS)\n  print("Frame Time: " .. string.format("%.2f", stats.currentFrameTime) .. "ms")\n  print("Frame Time Prom: " .. string.format("%.2f", stats.averageFrameTime) .. "ms")\n  print("Frames totales: " .. stats.totalFrames)\n  \n  if stats.currentFPS >= 60 then\n    print("Estado: ✓ Excelente")\n  elseif stats.currentFPS >= 30 then\n    print("Estado: ✓ Aceptable")\n  else\n    print("Estado: ✗ Necesita optimización")\n  end\n  \n  print("================\\n")\nend\n\nfunction GameProfiler:Reset()\n  self.frameTimes = {}\n  self.totalFrames = 0\n  print("Profiler reseteado")\nend\n\nreturn GameProfiler',
    tests: [
      { type: "code_contains", expected: "StartFrame", message: "Debes implementar StartFrame" },
      { type: "code_contains", expected: "EndFrame", message: "Debes implementar EndFrame" },
      { type: "code_contains", expected: "GetFPS", message: "Debes implementar GetFPS" },
      { type: "code_contains", expected: "GetAverageFPS", message: "Debes implementar GetAverageFPS" },
      { type: "code_contains", expected: "frameTimes", message: "Debes tener frameTimes" },
      { type: "code_contains", expected: "os.clock", message: "Debes usar os.clock para medir tiempo" },
      { type: "code_contains", expected: "FPS", message: "Debes calcular FPS" },
      { type: "code_contains", expected: "alert", message: "Debes alertar si FPS es bajo" },
    ],
    hints: [
      "frameTimes almacena tiempos de frames recientes",
      "StartFrame marca inicio del frame",
      "EndFrame calcula y guarda tiempo del frame",
      "GetFPS calcula FPS promedio de últimos frames",
    ],
    difficulty: "advanced",
    xpReward: 70,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 11
  // ============================================
  {
    id: "mes-11-final-proyecto",
    lessonId: "l11-4-polish",
    title: 'Proyecto: Juego Completo Alpha',
    instructions: 'Crea el entregable del Mes 11: Juego Completo Alpha vertical slice.\n\n**Requisitos:**\n1. Core Loop Completo:\n   - Input, Update, Render, Feedback\n   - Gestión de estados (Menu, Playing, Paused, GameOver)\n   - Gestión de escenas/niveles\n\n2. Contenido:\n   - 3 niveles con diferente dificultad\n   - 3 tipos de enemigos (Melee, Ranged, Magic)\n   - 5 armas/habilidades\n\n3. Menus y UX:\n   - Menú principal completo\n   - Sistema de pausa\n   - Pantallas Game Over y Victoria\n\n4. Polish:\n   - Sistema de partículas\n   - Screen shake\n   - Profiler de rendimiento\n\n**Pista:** Integra todos los sistemas de las semanas anteriores',
    starterCode: '-- Juego Completo Alpha\nlocal CompleteGame = {}\n\nfunction CompleteGame:new()\n  local self = setmetatable({}, CompleteGame)\n  \n  -- Sistemas core\n  self.coreLoop = nil\n  self.stateManager = nil\n  self.sceneManager = nil\n  \n  -- Contenido\n  self.levelManager = nil\n  self.enemyFactory = nil\n  self.weaponFactory = nil\n  \n  -- Menus\n  self.mainMenu = nil\n  self.pauseMenu = nil\n  self.endScreen = nil\n  \n  -- Polish\n  self.particleSystem = nil\n  self.screenShake = nil\n  self.profiler = nil\n  \n  return self\nend\n\nfunction CompleteGame:Initialize()\n  -- Inicializa todos los sistemas\nend\n\nfunction CompleteGame:StartGame()\n  -- Inicia el juego\nend\n\nfunction CompleteGame:Update(deltaTime)\n  -- Actualiza el juego\nend\n\nreturn CompleteGame',
    solution: '-- Juego Completo Alpha - Vertical Slice\nlocal CompleteGame = {}\nCompleteGame.__index = CompleteGame\n\n-- Importar sistemas (referencias simplificadas de ejercicios anteriores)\nlocal CoreLoop = {}\nCoreLoop.__index = CoreLoop\nfunction CoreLoop:new()\n  local self = setmetatable({}, CoreLoop)\n  self.isRunning = false\n  return self\nend\nfunction CoreLoop:Start() self.isRunning = true; print("Core Loop iniciado") end\nfunction CoreLoop:Update(dt) print("Core Loop: Update") end\nfunction CoreLoop:Stop() self.isRunning = false end\n\nlocal GameStateManager = {}\nGameStateManager.__index = GameStateManager\nfunction GameStateManager:new()\n  local self = setmetatable({}, GameStateManager)\n  self.stateStack = {}\n  self.currentState = nil\n  return self\nend\nfunction GameStateManager:ChangeState(state) self.currentState = state; print("Estado: " .. state) end\nfunction GameStateManager:PushState(state) table.insert(self.stateStack, self.currentState); self.currentState = state end\nfunction GameStateManager:PopState() self.currentState = table.remove(self.stateStack) end\n\nlocal SceneManager = {}\nSceneManager.__index = SceneManager\nfunction SceneManager:new()\n  local self = setmetatable({}, SceneManager)\n  self.loadedScenes = {}\n  self.currentScene = nil\n  return self\nend\nfunction SceneManager:LoadScene(name) self.currentScene = name; print("Escena: " .. name) end\n\nlocal LevelManager = {}\nLevelManager.__index = LevelManager\nfunction LevelManager:new()\n  local self = setmetatable({}, LevelManager)\n  self.levels = {\n    [1] = { name = "Level 1", difficulty = "Easy", enemies = { "Goblin" } },\n    [2] = { name = "Level 2", difficulty = "Medium", enemies = { "Orc", "Mage" } },\n    [3] = { name = "Level 3", difficulty = "Hard", enemies = { "Boss" } }\n  }\n  self.currentLevel = nil\n  return self\nend\nfunction LevelManager:LoadLevel(num) self.currentLevel = self.levels[num]; print("Nivel: " .. self.currentLevel.name) end\n\nlocal EnemyFactory = {}\nEnemyFactory.__index = EnemyFactory\nfunction EnemyFactory:new()\n  local self = setmetatable({}, EnemyFactory)\n  self.types = { "Melee", "Ranged", "Magic" }\n  return self\nend\nfunction EnemyFactory:CreateEnemy(type) return { type = type, health = 50, damage = 10 } end\n\nlocal WeaponFactory = {}\nWeaponFactory.__index = WeaponFactory\nfunction WeaponFactory:new()\n  local self = setmetatable({}, WeaponFactory)\n  self.weapons = { "Sword", "Axe", "Bow", "Staff", "Dagger" }\n  return self\nend\nfunction WeaponFactory:CreateWeapon(name) return { name = name, damage = 25 } end\n\nlocal MainMenu = {}\nMainMenu.__index = MainMenu\nfunction MainMenu:new() return setmetatable({}, MainMenu) end\nfunction MainMenu:Show() print("=== MENÚ PRINCIPAL ===") end\n\nlocal PauseMenu = {}\nPauseMenu.__index = PauseMenu\nfunction PauseMenu:new(gsm) local self = setmetatable({}, PauseMenu); self.gsm = gsm; return self end\nfunction PauseMenu:Toggle() self.isActive = not self.isActive; print("Pausa: " .. tostring(self.isActive)) end\n\nlocal EndScreen = {}\nEndScreen.__index = EndScreen\nfunction EndScreen:new() return setmetatable({}, EndScreen) end\nfunction EndScreen:ShowGameOver(stats) print("=== GAME OVER ===") end\nfunction EndScreen:ShowVictory(stats) print("=== VICTORIA ===") end\n\nlocal ParticleSystem = {}\nParticleSystem.__index = ParticleSystem\nfunction ParticleSystem:new() return setmetatable({}, ParticleSystem) end\nfunction ParticleSystem:SpawnEffect(type, pos) print("Partículas: " .. type) end\n\nlocal ScreenShake = {}\nScreenShake.__index = ScreenShake\nfunction ScreenShake:new() return setmetatable({}, ScreenShake) end\nfunction ScreenShake:AddShake(int, dur) print("Screen Shake: " .. int) end\n\nlocal GameProfiler = {}\nGameProfiler.__index = GameProfiler\nfunction GameProfiler:new() return setmetatable({}, GameProfiler) end\nfunction GameProfiler:StartFrame() end\nfunction GameProfiler:EndFrame() return 16.67 end\nfunction GameProfiler:GetFPS() return 60 end\n\n-- ============================================\n-- JUEGO COMPLETO ALPHA\n-- ============================================\nfunction CompleteGame:new()\n  local self = setmetatable({}, CompleteGame)\n  \n  -- Sistemas core\n  self.coreLoop = CoreLoop:new()\n  self.stateManager = GameStateManager:new()\n  self.sceneManager = SceneManager:new()\n  \n  -- Contenido\n  self.levelManager = LevelManager:new()\n  self.enemyFactory = EnemyFactory:new()\n  self.weaponFactory = WeaponFactory:new()\n  \n  -- Menus\n  self.mainMenu = MainMenu:new()\n  self.pauseMenu = PauseMenu:new(self.stateManager)\n  self.endScreen = EndScreen:new()\n  \n  -- Polish\n  self.particleSystem = ParticleSystem:new()\n  self.screenShake = ScreenShake:new()\n  self.profiler = GameProfiler:new()\n  \n  -- Estado del juego\n  self.player = { health = 100, score = 0, weapon = nil }\n  self.enemies = {}\n  \n  return self\nend\n\nfunction CompleteGame:Initialize()\n  print("\\n========================================")\n  print("INICIALIZANDO JUEGO COMPLETO ALPHA")\n  print("========================================\\n")\n  \n  -- Inicializar sistemas\n  print("1. Sistemas Core...")\n  self.coreLoop:Start()\n  self.stateManager:ChangeState("Menu")\n  \n  print("2. Contenido...")\n  print("   - Niveles: 3")\n  print("   - Enemigos: 3 tipos")\n  print("   - Armas: 5")\n  \n  print("3. Menus...")\n  self.mainMenu:Show()\n  \n  print("4. Polish...")\n  print("   - Partículas: listo")\n  print("   - Screen Shake: listo")\n  print("   - Profiler: listo")\n  \n  print("\\n========================================")\n  print("JUEGO LISTO PARA JUGAR")\n  print("========================================\\n")\n  \n  return true\nend\n\nfunction CompleteGame:StartGame()\n  print("\\n=== INICIANDO PARTIDA ===")\n  \n  -- Cargar nivel 1\n  self.levelManager:LoadLevel(1)\n  self.sceneManager:LoadScene("Level1")\n  \n  -- Crear jugador\n  self.player.health = 100\n  self.player.score = 0\n  self.player.weapon = self.weaponFactory:CreateWeapon("Sword")\n  \n  -- Crear enemigos\n  self.enemies = {\n    self.enemyFactory:CreateEnemy("Melee"),\n    self.enemyFactory:CreateEnemy("Ranged")\n  }\n  \n  -- Cambiar estado\n  self.stateManager:ChangeState("Playing")\n  \n  print("Jugador listo")\n  print("Enemigos: " .. #self.enemies)\n  print("========================\\n")\nend\n\nfunction CompleteGame:Update(deltaTime)\n  -- Profiler\n  self.profiler:StartFrame()\n  \n  -- Core Loop\n  if self.coreLoop.isRunning then\n    self.coreLoop:Update(deltaTime)\n  end\n  \n  -- Actualizar sistemas\n  if self.stateManager.currentState == "Playing" then\n    -- Actualizar jugador\n    -- Actualizar enemigos\n    -- Detectar colisiones\n    \n    -- Efectos\n    self.particleSystem:Update(deltaTime)\n    self.screenShake:Update(deltaTime)\n  end\n  \n  -- Profiler\n  local frameTime = self.profiler:EndFrame()\n  \n  return frameTime\nend\n\nfunction CompleteGame:Pause()\n  self.pauseMenu:Toggle()\nend\n\nfunction CompleteGame:Resume()\n  self.pauseMenu:Toggle()\nend\n\nfunction CompleteGame:GameOver()\n  self.stateManager:ChangeState("GameOver")\n  self.endScreen:ShowGameOver({\n    time = 300,\n    enemiesDefeated = 10,\n    gold = 500,\n    xp = 1000\n  })\nend\n\nfunction CompleteGame:Victory()\n  self.stateManager:ChangeState("Victory")\n  self.endScreen:ShowVictory({\n    time = 600,\n    enemiesDefeated = 50,\n    gold = 2000,\n    xp = 5000\n  })\nend\n\nfunction CompleteGame:GetGameStats()\n  return {\n    state = self.stateManager.currentState,\n    level = self.levelManager.currentLevel and self.levelManager.currentLevel.name or "Ninguno",\n    playerHealth = self.player.health,\n    playerScore = self.player.score,\n    enemyCount = #self.enemies,\n    fps = self.profiler:GetFPS(),\n    particleCount = self.particleSystem:GetParticleCount and self.particleSystem:GetParticleCount() or 0\n  }\nend\n\nfunction CompleteGame:PrintStats()\n  local stats = self:GetGameStats()\n  \n  print("\\n=== ESTADÍSTICAS DEL JUEGO ===")\n  print("Estado: " .. stats.state)\n  print("Nivel: " .. stats.level)\n  print("Salud: " .. stats.playerHealth)\n  print("Score: " .. stats.playerScore)\n  print("Enemigos: " .. stats.enemyCount)\n  print("FPS: " .. stats.fps)\n  print("==============================\\n")\nend\n\nreturn CompleteGame',
    tests: [
      { type: "code_contains", expected: "CompleteGame", message: "Debes tener CompleteGame" },
      { type: "code_contains", expected: "Initialize", message: "Debes implementar Initialize" },
      { type: "code_contains", expected: "StartGame", message: "Debes implementar StartGame" },
      { type: "code_contains", expected: "Update", message: "Debes implementar Update" },
      { type: "code_contains", expected: "coreLoop", message: "Debes tener coreLoop" },
      { type: "code_contains", expected: "stateManager", message: "Debes tener stateManager" },
      { type: "code_contains", expected: "levelManager", message: "Debes tener levelManager" },
      { type: "code_contains", expected: "enemyFactory", message: "Debes tener enemyFactory" },
      { type: "code_contains", expected: "weaponFactory", message: "Debes tener weaponFactory" },
      { type: "code_contains", expected: "mainMenu", message: "Debes tener mainMenu" },
      { type: "code_contains", expected: "pauseMenu", message: "Debes tener pauseMenu" },
      { type: "code_contains", expected: "endScreen", message: "Debes tener endScreen" },
      { type: "code_contains", expected: "particleSystem", message: "Debes tener particleSystem" },
      { type: "code_contains", expected: "screenShake", message: "Debes tener screenShake" },
      { type: "code_contains", expected: "profiler", message: "Debes tener profiler" },
      { type: "code_contains", expected: "3", message: "Debes tener 3 niveles" },
      { type: "code_contains", expected: "5", message: "Debes tener 5 armas" },
    ],
    hints: [
      "CompleteGame integra todos los sistemas",
      "Core Loop, GameState, SceneManager son core",
      "LevelManager con 3 niveles",
      "EnemyFactory con 3 tipos, WeaponFactory con 5 armas",
      "MainMenu, PauseMenu, EndScreen para UX",
      "ParticleSystem, ScreenShake, Profiler para polish",
    ],
    difficulty: "advanced",
    xpReward: 500,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes11Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes11Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes11Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
