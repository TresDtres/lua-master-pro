import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 8: Optimización y Herramientas de Editor
// ============================================
// Basado en el plan de estudio:
// Semana 1: Profiling - Unreal Insights, bottlenecks, métricas de frame
// Semana 2: Optimización - object pooling, coroutines, memory management
// Semana 3: Editor Tools - ventanas custom, property editors, batch operations
// Semana 4: Pipeline automation - importar assets, generar DataTables, batch testing
// ============================================
// Entregable del mes: Toolkit de editor con 3 herramientas custom
// (generador de niveles procedural, validador de assets, batch renamer)
// ============================================

export const mes08Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: Profiling (Semana 1)
  // ============================================
  {
    id: "mes-08-leccion-1-ej-1",
    lessonId: "l8-1-profiling",
    title: 'Medir Tiempo de Ejecución de Función',
    instructions: 'Implementa un sistema para medir el tiempo de ejecución de funciones.\n\n**Requisitos:**\n- `StartTimer(timerName)` inicia un timer con nombre\n- `EndTimer(timerName)` finaliza el timer e imprime el tiempo\n- Usa `os.clock()` para medir tiempo en segundos\n- Imprime "[timerName]: [time]ms"\n- Soporta múltiples timers simultáneos\n\n**Pista:** os.clock() retorna tiempo en segundos, multiplica por 1000 para ms',
    starterCode: 'local Profiler = {}\n\nfunction Profiler:new()\n  local self = setmetatable({}, Profiler)\n  self.timers = {}\n  return self\nend\n\nfunction Profiler:StartTimer(timerName)\n  -- Inicia timer con nombre\nend\n\nfunction Profiler:EndTimer(timerName)\n  -- Finaliza timer e imprime tiempo\nend\n\nreturn Profiler',
    solution: 'local Profiler = {}\nProfiler.__index = Profiler\n\nfunction Profiler:new()\n  local self = setmetatable({}, Profiler)\n  self.timers = {}\n  return self\nend\n\nfunction Profiler:StartTimer(timerName)\n  self.timers[timerName] = os.clock()\n  print("Timer iniciado: " .. timerName)\nend\n\nfunction Profiler:EndTimer(timerName)\n  if not self.timers[timerName] then\n    print("Timer no encontrado: " .. timerName)\n    return\n  end\n  \n  local startTime = self.timers[timerName]\n  local endTime = os.clock()\n  local deltaTime = (endTime - startTime) * 1000  -- Convertir a ms\n  \n  print(string.format("%s: %.2fms", timerName, deltaTime))\n  \n  -- Limpiar timer\n  self.timers[timerName] = nil\n  \n  return deltaTime\nend\n\nfunction Profiler:GetTimerValue(timerName)\n  if self.timers[timerName] then\n    return (os.clock() - self.timers[timerName]) * 1000\n  end\n  return 0\nend\n\nreturn Profiler',
    tests: [
      { type: "code_contains", expected: "StartTimer", message: "Debes implementar StartTimer" },
      { type: "code_contains", expected: "EndTimer", message: "Debes implementar EndTimer" },
      { type: "code_contains", expected: "os.clock", message: "Debes usar os.clock" },
      { type: "code_contains", expected: "timers", message: "Debes tener tabla timers" },
      { type: "code_contains", expected: "* 1000", message: "Debes convertir a milisegundos" },
    ],
    hints: [
      "os.clock() retorna tiempo en segundos",
      "Guarda startTime en self.timers[timerName]",
      "Calcula deltaTime = (endTime - startTime) * 1000",
      "Imprime con string.format para formato preciso",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-08-leccion-1-ej-2",
    lessonId: "l8-1-profiling",
    title: 'Detectar Bottlenecks con Múltiples Timers',
    instructions: 'Implementa profiling de múltiples secciones de código.\n\n**Requisitos:**\n- `BeginSection(sectionName)` inicia sección de profiling\n- `EndSection(sectionName)` finaliza y registra tiempo\n- `PrintReport()` imprime reporte de todas las secciones\n- Ordena secciones por tiempo (mayor a menor)\n- Identifica el bottleneck (sección más lenta)\n\n**Pista:** Acumula tiempos en una tabla de reportes',
    starterCode: 'local SectionProfiler = {}\n\nfunction SectionProfiler:new()\n  local self = setmetatable({}, SectionProfiler)\n  self.sections = {}\n  self.reports = {}\n  return self\nend\n\nfunction SectionProfiler:BeginSection(sectionName)\n  -- Inicia sección de profiling\nend\n\nfunction SectionProfiler:EndSection(sectionName)\n  -- Finaliza sección y acumula tiempo\nend\n\nfunction SectionProfiler:PrintReport()\n  -- Imprime reporte ordenado\nend\n\nreturn SectionProfiler',
    solution: 'local SectionProfiler = {}\nSectionProfiler.__index = SectionProfiler\n\nfunction SectionProfiler:new()\n  local self = setmetatable({}, SectionProfiler)\n  self.sections = {}\n  self.reports = {}\n  return self\nend\n\nfunction SectionProfiler:BeginSection(sectionName)\n  self.sections[sectionName] = os.clock()\nend\n\nfunction SectionProfiler:EndSection(sectionName)\n  if not self.sections[sectionName] then\n    return\n  end\n  \n  local startTime = self.sections[sectionName]\n  local deltaTime = (os.clock() - startTime) * 1000\n  \n  -- Acumula en reporte\n  if not self.reports[sectionName] then\n    self.reports[sectionName] = { total = 0, count = 0, max = 0 }\n  end\n  \n  local report = self.reports[sectionName]\n  report.total = report.total + deltaTime\n  report.count = report.count + 1\n  report.max = math.max(report.max, deltaTime)\n  \n  self.sections[sectionName] = nil\n  \n  return deltaTime\nend\n\nfunction SectionProfiler:PrintReport()\n  print("\\n=== PROFILING REPORT ===")\n  \n  -- Crear lista ordenada\n  local sorted = {}\n  for name, data in pairs(self.reports) do\n    local avg = data.total / data.count\n    table.insert(sorted, {\n      name = name,\n      avg = avg,\n      total = data.total,\n      count = data.count,\n      max = data.max\n    })\n  end\n  \n  -- Ordenar por promedio (mayor a menor)\n  table.sort(sorted, function(a, b) return a.avg > b.avg end)\n  \n  -- Imprimir reporte\n  for i, section in ipairs(sorted) do\n    local marker = (i == 1) and "🐌 BOTTLENECK: " or ""\n    print(string.format("%s%d. %s", marker, i, section.name))\n    print(string.format("   Avg: %.2fms | Total: %.2fms | Count: %d | Max: %.2fms",\n      section.avg, section.total, section.count, section.max))\n  end\n  \n  print("========================\\n")\nend\n\nreturn SectionProfiler',
    tests: [
      { type: "code_contains", expected: "BeginSection", message: "Debes implementar BeginSection" },
      { type: "code_contains", expected: "EndSection", message: "Debes implementar EndSection" },
      { type: "code_contains", expected: "PrintReport", message: "Debes implementar PrintReport" },
      { type: "code_contains", expected: "table.sort", message: "Debes ordenar secciones" },
      { type: "code_contains", expected: "BOTTLENECK", message: "Debes identificar bottleneck" },
    ],
    hints: [
      "Acumula tiempos en self.reports[sectionName]",
      "Calcula promedio: total / count",
      "Ordena con table.sort por promedio",
      "La primera sección es el bottleneck",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-08-leccion-1-ej-3",
    lessonId: "l8-1-profiling",
    title: 'Monitor de FPS y Frame Time',
    instructions: 'Implementa un monitor de FPS y frame time.\n\n**Requisitos:**\n- `UpdateFrame()` se llama cada frame\n- Calcula FPS (frames por segundo)\n- Calcula frame time en ms\n- Detecta frame drops (frame time > 33ms = < 30 FPS)\n- Imprime alerta "⚠️ Frame drop: [fps] FPS" si FPS < 30\n\n**Pista:** Acumula deltaTimes y calcula promedio cada segundo',
    starterCode: 'local FPSMonitor = {}\n\nfunction FPSMonitor:new()\n  local self = setmetatable({}, FPSMonitor)\n  self.frameCount = 0\n  self.accumulator = 0\n  self.currentFPS = 60\n  self.currentFrameTime = 16.67\n  return self\nend\n\nfunction FPSMonitor:UpdateFrame(deltaTime)\n  -- Actualiza contador de FPS\n  -- deltaTime está en segundos\nend\n\nfunction FPSMonitor:GetFPS()\n  -- Retorna FPS actual\nend\n\nfunction FPSMonitor:GetFrameTime()\n  -- Retorna frame time en ms\nend\n\nreturn FPSMonitor',
    solution: 'local FPSMonitor = {}\nFPSMonitor.__index = FPSMonitor\n\nfunction FPSMonitor:new()\n  local self = setmetatable({}, FPSMonitor)\n  self.frameCount = 0\n  self.accumulator = 0\n  self.currentFPS = 60\n  self.currentFrameTime = 16.67\n  self.lastAlertTime = 0\n  return self\nend\n\nfunction FPSMonitor:UpdateFrame(deltaTime)\n  self.frameCount = self.frameCount + 1\n  self.accumulator = self.accumulator + deltaTime\n  \n  -- Cada segundo, actualiza FPS\n  if self.accumulator >= 1.0 then\n    self.currentFPS = self.frameCount / self.accumulator\n    self.currentFrameTime = (self.accumulator / self.frameCount) * 1000\n    \n    -- Detectar frame drops\n    if self.currentFPS < 30 then\n      local currentTime = os.time()\n      if currentTime - self.lastAlertTime >= 5 then\n        print(string.format("⚠️ Frame drop: %.1f FPS (%.2fms)", self.currentFPS, self.currentFrameTime))\n        self.lastAlertTime = currentTime\n      end\n    end\n    \n    -- Resetear contadores\n    self.frameCount = 0\n    self.accumulator = 0\n  end\nend\n\nfunction FPSMonitor:GetFPS()\n  return self.currentFPS\nend\n\nfunction FPSMonitor:GetFrameTime()\n  return self.currentFrameTime\nend\n\nfunction FPSMonitor:PrintStats()\n  print(string.format("FPS: %.1f | Frame Time: %.2fms", self.currentFPS, self.currentFrameTime))\nend\n\nreturn FPSMonitor',
    tests: [
      { type: "code_contains", expected: "UpdateFrame", message: "Debes implementar UpdateFrame" },
      { type: "code_contains", expected: "GetFPS", message: "Debes implementar GetFPS" },
      { type: "code_contains", expected: "GetFrameTime", message: "Debes implementar GetFrameTime" },
      { type: "code_contains", expected: "frameCount", message: "Debes tener contador de frames" },
      { type: "code_contains", expected: "accumulator", message: "Debes tener acumulador" },
      { type: "code_contains", expected: "Frame drop", message: "Debes detectar frame drops" },
    ],
    hints: [
      "Acumula deltaTime en self.accumulator",
      "Cada 1 segundo, calcula FPS = frameCount / accumulator",
      "Frame time = (accumulator / frameCount) * 1000",
      "Si FPS < 30, imprime alerta",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },

  // ============================================
  // LECCIÓN 2: Optimización (Semana 2)
  // ============================================
  {
    id: "mes-08-leccion-2-ej-1",
    lessonId: "l8-2-optimization",
    title: 'Implementar Object Pool',
    instructions: 'Implementa un object pool para reutilizar objetos.\n\n**Requisitos:**\n- `ObjectPool(className, initialSize)` crea pool con tamaño inicial\n- `GetFromPool()` retorna objeto del pool o crea uno nuevo\n- `ReturnToPool(obj)` devuelve objeto al pool para reutilizar\n- Imprime "Creando nuevo objeto" cuando crea uno nuevo\n- Imprime "Reutilizando objeto del pool" cuando reutiliza\n\n**Pista:** Mantén una lista de objetos disponibles',
    starterCode: 'local ObjectPool = {}\n\nfunction ObjectPool:new(className, initialSize)\n  local self = setmetatable({}, ObjectPool)\n  self.className = className\n  self.available = {}  -- Objetos disponibles\n  -- Crea initialSize objetos\n  return self\nend\n\nfunction ObjectPool:GetFromPool()\n  -- Retorna objeto del pool o crea nuevo\nend\n\nfunction ObjectPool:ReturnToPool(obj)\n  -- Devuelve objeto al pool\nend\n\nreturn ObjectPool',
    solution: 'local ObjectPool = {}\nObjectPool.__index = ObjectPool\n\nfunction ObjectPool:new(className, initialSize)\n  local self = setmetatable({}, ObjectPool)\n  self.className = className\n  self.available = {}\n  \n  -- Crear objetos iniciales\n  for i = 1, initialSize do\n    local obj = { id = i, active = false }\n    table.insert(self.available, obj)\n  end\n  \n  print("ObjectPool creado: " .. className .. " con " .. initialSize .. " objetos")\n  return self\nend\n\nfunction ObjectPool:GetFromPool()\n  local obj\n  \n  if #self.available > 0 then\n    -- Reutilizar objeto existente\n    obj = table.remove(self.available)\n    print("Reutilizando objeto del pool: " .. obj.id)\n  else\n    -- Crear nuevo objeto\n    obj = { id = #self.available + 1, active = false }\n    print("Creando nuevo objeto (pool vacío)")\n  end\n  \n  obj.active = true\n  return obj\nend\n\nfunction ObjectPool:ReturnToPool(obj)\n  obj.active = false\n  table.insert(self.available, obj)\n  print("Objeto " .. obj.id .. " devuelto al pool")\nend\n\nfunction ObjectPool:GetPoolStats()\n  local total = #self.available\n  local inUse = 0\n  -- Contar objetos en uso (implementación dependiente del contexto)\n  return { available = total, inUse = inUse }\nend\n\nreturn ObjectPool',
    tests: [
      { type: "code_contains", expected: "GetFromPool", message: "Debes implementar GetFromPool" },
      { type: "code_contains", expected: "ReturnToPool", message: "Debes implementar ReturnToPool" },
      { type: "code_contains", expected: "available", message: "Debes tener tabla available" },
      { type: "code_contains", expected: "table.remove", message: "Debes remover del pool" },
      { type: "code_contains", expected: "table.insert", message: "Debes insertar al pool" },
    ],
    hints: [
      "available es la lista de objetos disponibles",
      "GetFromPool usa table.remove para obtener objeto",
      "ReturnToPool usa table.insert para devolver objeto",
      "Si pool vacío, crea objeto nuevo",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-08-leccion-2-ej-2",
    lessonId: "l8-2-optimization",
    title: 'Pool de Balas para Shooter',
    instructions: 'Implementa un pool específico para balas de un shooter.\n\n**Requisitos:**\n- `BulletPool(initialSize)` crea pool de 50 balas inicial\n- `Fire(position, direction)` dispara bala desde posición\n- `UpdateBullets(deltaTime)` actualiza todas las balas activas\n- `ReturnBullet(bullet)` devuelve bala al pool cuando impacta\n- Imprime "Disparando bala [id]" y "Bala [id] impactó"\n\n**Pista:** Cada bala tiene posición, dirección y estado activo',
    starterCode: 'local BulletPool = {}\n\nfunction BulletPool:new(initialSize)\n  local self = setmetatable({}, BulletPool)\n  self.bullets = {}\n  self.available = {}\n  self.bulletSpeed = 1000\n  \n  -- Inicializa pool\n  return self\nend\n\nfunction BulletPool:Fire(position, direction)\n  -- Dispara bala\nend\n\nfunction BulletPool:UpdateBullets(deltaTime)\n  -- Actualiza todas las balas activas\nend\n\nfunction BulletPool:ReturnBullet(bullet)\n  -- Devuelve bala al pool\nend\n\nreturn BulletPool',
    solution: 'local BulletPool = {}\nBulletPool.__index = BulletPool\n\nfunction BulletPool:new(initialSize)\n  local self = setmetatable({}, BulletPool)\n  self.bullets = {}\n  self.available = {}\n  self.bulletSpeed = 1000\n  \n  -- Crear balas iniciales\n  for i = 1, initialSize do\n    local bullet = {\n      id = i,\n      position = {x = 0, y = 0, z = 0},\n      direction = {x = 0, y = 0, z = 0},\n      active = false\n    }\n    table.insert(self.available, bullet)\n  end\n  \n  print("BulletPool creado con " .. initialSize .. " balas")\n  return self\nend\n\nfunction BulletPool:Fire(position, direction)\n  local bullet\n  \n  if #self.available > 0 then\n    bullet = table.remove(self.available)\n    print("Reutilizando bala " .. bullet.id)\n  else\n    bullet = {\n      id = #self.bullets + 1,\n      position = {x = 0, y = 0, z = 0},\n      direction = {x = 0, y = 0, z = 0},\n      active = false\n    }\n    print("Creando nueva bala (pool vacío)")\n  end\n  \n  bullet.position = position\n  bullet.direction = direction\n  bullet.active = true\n  table.insert(self.bullets, bullet)\n  \n  print("Disparando bala " .. bullet.id)\n  return bullet\nend\n\nfunction BulletPool:UpdateBullets(deltaTime)\n  for i = #self.bullets, 1, -1 do\n    local bullet = self.bullets[i]\n    \n    if bullet.active then\n      -- Mover bala\n      bullet.position.x = bullet.position.x + bullet.direction.x * self.bulletSpeed * deltaTime\n      bullet.position.y = bullet.position.y + bullet.direction.y * self.bulletSpeed * deltaTime\n      bullet.position.z = bullet.position.z + bullet.direction.z * self.bulletSpeed * deltaTime\n      \n      -- Simular impacto después de 2 segundos (para demo)\n      bullet.lifetime = (bullet.lifetime or 0) + deltaTime\n      if bullet.lifetime > 2 then\n        self:ReturnBullet(bullet, i)\n      end\n    end\n  end\nend\n\nfunction BulletPool:ReturnBullet(bullet, index)\n  bullet.active = false\n  bullet.lifetime = nil\n  \n  -- Remover de lista de activas\n  if index then\n    table.remove(self.bullets, index)\n  end\n  \n  -- Devolver al pool\n  table.insert(self.available, bullet)\n  print("Bala " .. bullet.id .. " impactó, devuelta al pool")\nend\n\nreturn BulletPool',
    tests: [
      { type: "code_contains", expected: "Fire", message: "Debes implementar Fire" },
      { type: "code_contains", expected: "UpdateBullets", message: "Debes implementar UpdateBullets" },
      { type: "code_contains", expected: "ReturnBullet", message: "Debes implementar ReturnBullet" },
      { type: "code_contains", expected: "bulletSpeed", message: "Debes tener bulletSpeed" },
      { type: "code_contains", expected: "active", message: "Debes tener estado active" },
      { type: "code_contains", expected: "lifetime", message: "Debes trackear lifetime" },
    ],
    hints: [
      "Fire obtiene bala del pool y la configura",
      "UpdateBullets mueve cada bala activa",
      "ReturnBullet devuelve bala al pool disponible",
      "Usa lifetime para simular impacto",
    ],
    difficulty: "advanced",
    xpReward: 80,
  },
  {
    id: "mes-08-leccion-2-ej-3",
    lessonId: "l8-2-optimization",
    title: 'Lazy Loading de Assets',
    instructions: 'Implementa lazy loading para cargar assets solo cuando se necesitan.\n\n**Requisitos:**\n- `AssetLoader()` crea cargador con caché vacío\n- `LoadAsset(assetPath)` carga asset solo si no está en caché\n- `GetAsset(assetPath)` retorna asset desde caché\n- `UnloadUnusedAssets()` descarga assets no usados recientemente\n- Imprime "Cargando asset: [path]" y "Usando caché: [path]"\n\n**Pista:** Usa una tabla como caché con timestamp de último uso',
    starterCode: 'local AssetLoader = {}\n\nfunction AssetLoader:new()\n  local self = setmetatable({}, AssetLoader)\n  self.cache = {}  -- assetPath -> {asset, lastUsed}\n  return self\nend\n\nfunction AssetLoader:LoadAsset(assetPath)\n  -- Carga asset si no está en caché\nend\n\nfunction AssetLoader:GetAsset(assetPath)\n  -- Retorna asset desde caché\nend\n\nfunction AssetLoader:UnloadUnusedAssets(maxAge)\n  -- Descarga assets no usados en maxAge segundos\nend\n\nreturn AssetLoader',
    solution: 'local AssetLoader = {}\nAssetLoader.__index = AssetLoader\n\nfunction AssetLoader:new()\n  local self = setmetatable({}, AssetLoader)\n  self.cache = {}  -- assetPath -> {asset, lastUsed}\n  return self\nend\n\nfunction AssetLoader:LoadAsset(assetPath)\n  -- Verificar si está en caché\n  if self.cache[assetPath] then\n    print("Usando caché: " .. assetPath)\n    self.cache[assetPath].lastUsed = os.time()\n    return self.cache[assetPath].asset\n  end\n  \n  -- Cargar asset (simulado)\n  print("Cargando asset: " .. assetPath)\n  \n  -- Simular carga de asset\n  local asset = {\n    path = assetPath,\n    data = "Asset data for " .. assetPath,\n    loaded = true\n  }\n  \n  -- Guardar en caché\n  self.cache[assetPath] = {\n    asset = asset,\n    lastUsed = os.time()\n  }\n  \n  return asset\nend\n\nfunction AssetLoader:GetAsset(assetPath)\n  return self:LoadAsset(assetPath)\nend\n\nfunction AssetLoader:UnloadUnusedAssets(maxAge)\n  local currentTime = os.time()\n  local unloaded = 0\n  \n  for path, data in pairs(self.cache) do\n    local age = currentTime - data.lastUsed\n    \n    if age > maxAge then\n      print("Descargando asset no usado: " .. path .. " (edad: " .. age .. "s)")\n      self.cache[path] = nil\n      unloaded = unloaded + 1\n    end\n  end\n  \n  print("Assets descargados: " .. unloaded)\n  return unloaded\nend\n\nfunction AssetLoader:GetCacheStats()\n  local count = 0\n  for _ in pairs(self.cache) do\n    count = count + 1\n  end\n  return { cachedAssets = count }\nend\n\nreturn AssetLoader',
    tests: [
      { type: "code_contains", expected: "LoadAsset", message: "Debes implementar LoadAsset" },
      { type: "code_contains", expected: "GetAsset", message: "Debes implementar GetAsset" },
      { type: "code_contains", expected: "UnloadUnusedAssets", message: "Debes implementar UnloadUnusedAssets" },
      { type: "code_contains", expected: "cache", message: "Debes tener tabla cache" },
      { type: "code_contains", expected: "lastUsed", message: "Debes trackear lastUsed" },
      { type: "code_contains", expected: "os.time", message: "Debes usar os.time" },
    ],
    hints: [
      "cache almacena asset y lastUsed timestamp",
      "LoadAsset verifica caché antes de cargar",
      "UnloadUnusedAssets compara edad con maxAge",
      "os.time() da timestamp actual",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },

  // ============================================
  // LECCIÓN 3: Herramientas de Editor (Semana 3)
  // ============================================
  {
    id: "mes-08-leccion-3-ej-1",
    lessonId: "l8-3-editor-tools",
    title: 'Crear Ventana de Editor Simple',
    instructions: 'Crea una ventana simple de editor con UnLua.\n\n**Requisitos:**\n- `EditorWindow:title("Mi Ventana")` crea ventana con título\n- `EditorWindow:Show()` muestra la ventana\n- `EditorWindow:Close()` cierra la ventana\n- Imprime "Ventana [title] abierta" y "Ventana cerrada"\n- La ventana debe tener estado visible/oculta\n\n**Pista:** Usa una tabla para estado de la ventana',
    starterCode: 'local EditorWindow = {}\nEditorWindow.__index = EditorWindow\n\nfunction EditorWindow:new(title)\n  local self = setmetatable({}, EditorWindow)\n  self.title = title\n  self.isVisible = false\n  return self\nend\n\nfunction EditorWindow:Show()\n  -- Muestra la ventana\nend\n\nfunction EditorWindow:Close()\n  -- Cierra la ventana\nend\n\nreturn EditorWindow',
    solution: 'local EditorWindow = {}\nEditorWindow.__index = EditorWindow\n\nfunction EditorWindow:new(title)\n  local self = setmetatable({}, EditorWindow)\n  self.title = title or "Editor Window"\n  self.isVisible = false\n  self.position = {x = 100, y = 100, width = 400, height = 300}\n  return self\nend\n\nfunction EditorWindow:Show()\n  if not self.isVisible then\n    self.isVisible = true\n    print("Ventana \"" .. self.title .. "\" abierta")\n    print("Posición: (" .. self.position.x .. ", " .. self.position.y .. ")")\n    print("Tamaño: " .. self.position.width .. "x" .. self.position.height)\n  else\n    print("Ventana ya está visible")\n  end\nend\n\nfunction EditorWindow:Close()\n  if self.isVisible then\n    self.isVisible = false\n    print("Ventana \"" .. self.title .. "\" cerrada")\n  else\n    print("Ventana ya está cerrada")\n  end\nend\n\nfunction EditorWindow:SetPosition(x, y)\n  self.position.x = x\n  self.position.y = y\n  print("Ventana movida a (" .. x .. ", " .. y .. ")")\nend\n\nfunction EditorWindow:SetSize(width, height)\n  self.position.width = width\n  self.position.height = height\n  print("Ventana redimensionada a " .. width .. "x" .. height)\nend\n\nfunction EditorWindow:IsVisible()\n  return self.isVisible\nend\n\nreturn EditorWindow',
    tests: [
      { type: "code_contains", expected: "Show", message: "Debes implementar Show" },
      { type: "code_contains", expected: "Close", message: "Debes implementar Close" },
      { type: "code_contains", expected: "isVisible", message: "Debes tener estado isVisible" },
      { type: "code_contains", expected: "title", message: "Debes tener título" },
      { type: "code_contains", expected: "position", message: "Debes tener posición" },
    ],
    hints: [
      "isVisible trackea estado de la ventana",
      "Show cambia isVisible a true",
      "Close cambia isVisible a false",
      "Imprime mensajes de estado",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-08-leccion-3-ej-2",
    lessonId: "l8-3-editor-tools",
    title: 'Batch Renamer de Assets',
    instructions: 'Crea una herramienta para renombrar múltiples assets en lote.\n\n**Requisitos:**\n- `BatchRenamer()` crea herramienta de renombrado\n- `AddAsset(oldName, newName)` añade asset a la lista\n- `Preview()` muestra vista previa de cambios\n- `Execute()` ejecuta todos los renombrados\n- Imprime "Renombrando: [old] -> [new]" para cada asset\n\n**Pista:** Almacena pares de nombres en una tabla',
    starterCode: 'local BatchRenamer = {}\n\nfunction BatchRenamer:new()\n  local self = setmetatable({}, BatchRenamer)\n  self.assets = {}  -- {oldName, newName}\n  return self\nend\n\nfunction BatchRenamer:AddAsset(oldName, newName)\n  -- Añade asset a renombrar\nend\n\nfunction BatchRenamer:Preview()\n  -- Muestra vista previa\nend\n\nfunction BatchRenamer:Execute()\n  -- Ejecuta todos los renombrados\nend\n\nreturn BatchRenamer',
    solution: 'local BatchRenamer = {}\nBatchRenamer.__index = BatchRenamer\n\nfunction BatchRenamer:new()\n  local self = setmetatable({}, BatchRenamer)\n  self.assets = {}  -- {oldName, newName}\n  return self\nend\n\nfunction BatchRenamer:AddAsset(oldName, newName)\n  table.insert(self.assets, {oldName = oldName, newName = newName})\n  print("Añadido: " .. oldName .. " -> " .. newName)\nend\n\nfunction BatchRenamer:Preview()\n  print("\\n=== VISTA PREVIA ===")\n  print("Assets a renombrar: " .. #self.assets)\n  \n  for i, asset in ipairs(self.assets) do\n    print(i .. ". " .. asset.oldName .. " -> " .. asset.newName)\n  end\n  \n  print("==================\\n")\nend\n\nfunction BatchRenamer:Execute()\n  if #self.assets == 0 then\n    print("No hay assets para renombrar")\n    return 0\n  end\n  \n  print("\\n=== EJECUTANDO RENOMBRADO ===")\n  local successCount = 0\n  \n  for i, asset in ipairs(self.assets) do\n    -- Simular renombrado\n    print("Renombrando: " .. asset.oldName .. " -> " .. asset.newName)\n    successCount = successCount + 1\n  end\n  \n  print("============================")\n  print("Assets renombrados: " .. successCount .. "/" .. #self.assets)\n  \n  -- Limpiar lista\n  self.assets = {}\n  \n  return successCount\nend\n\nfunction BatchRenamer:Clear()\n  self.assets = {}\n  print("Lista de renombrado limpiada")\nend\n\nfunction BatchRenamer:GetCount()\n  return #self.assets\nend\n\nreturn BatchRenamer',
    tests: [
      { type: "code_contains", expected: "AddAsset", message: "Debes implementar AddAsset" },
      { type: "code_contains", expected: "Preview", message: "Debes implementar Preview" },
      { type: "code_contains", expected: "Execute", message: "Debes implementar Execute" },
      { type: "code_contains", expected: "assets", message: "Debes tener tabla assets" },
      { type: "code_contains", expected: "oldName", message: "Debes tener oldName" },
      { type: "code_contains", expected: "newName", message: "Debes tener newName" },
    ],
    hints: [
      "assets es lista de pares {oldName, newName}",
      "Preview muestra todos los cambios sin ejecutar",
      "Execute realiza los renombrados",
      "Imprime mensaje por cada asset",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-08-leccion-3-ej-3",
    lessonId: "l8-3-editor-tools",
    title: 'Validador de Assets',
    instructions: 'Crea una herramienta para validar assets según reglas.\n\n**Requisitos:**\n- `AssetValidator()` crea validador\n- `AddRule(ruleName, ruleFunction)` añade regla de validación\n- `ValidateAsset(asset)` valida asset contra todas las reglas\n- `ValidateAllAssets(assets)` valida múltiples assets\n- Imprime reporte de errores encontrados\n\n**Pista:** Cada regla es una función que retorna true/false y mensaje',
    starterCode: 'local AssetValidator = {}\n\nfunction AssetValidator:new()\n  local self = setmetatable({}, AssetValidator)\n  self.rules = {}  -- {name, func}\n  return self\nend\n\nfunction AssetValidator:AddRule(ruleName, ruleFunction)\n  -- Añade regla de validación\nend\n\nfunction AssetValidator:ValidateAsset(asset)\n  -- Valida asset contra todas las reglas\nend\n\nfunction AssetValidator:ValidateAllAssets(assets)\n  -- Valida múltiples assets\nend\n\nreturn AssetValidator',
    solution: 'local AssetValidator = {}\nAssetValidator.__index = AssetValidator\n\nfunction AssetValidator:new()\n  local self = setmetatable({}, AssetValidator)\n  self.rules = {}  -- {name, func}\n  return self\nend\n\nfunction AssetValidator:AddRule(ruleName, ruleFunction)\n  table.insert(self.rules, {name = ruleName, func = ruleFunction})\n  print("Regla añadida: " .. ruleName)\nend\n\nfunction AssetValidator:ValidateAsset(asset)\n  local errors = {}\n  \n  for _, rule in ipairs(self.rules) do\n    local passed, message = rule.func(asset)\n    \n    if not passed then\n      table.insert(errors, {\n        rule = rule.name,\n        message = message or "Regla fallida: " .. rule.name\n      })\n    end\n  end\n  \n  return { asset = asset, errors = errors, isValid = #errors == 0 }\nend\n\nfunction AssetValidator:ValidateAllAssets(assets)\n  print("\\n=== VALIDANDO ASSETS ===")\n  print("Total assets: " .. #assets)\n  print("Reglas activas: " .. #self.rules)\n  print("")\n  \n  local results = {}\n  local errorCount = 0\n  \n  for _, asset in ipairs(assets) do\n    local result = self:ValidateAsset(asset)\n    table.insert(results, result)\n    \n    if not result.isValid then\n      print("❌ Asset: " .. asset.name)\n      for _, err in ipairs(result.errors) do\n        print("   - " .. err.rule .. ": " .. err.message)\n        errorCount = errorCount + 1\n      end\n    else\n      print("✓ Asset: " .. asset.name .. " (válido)")\n    end\n  end\n  \n  print("")\n  print("=== RESUMEN ===")\n  print("Assets válidos: " .. (#assets - errorCount))\n  print("Assets inválidos: " .. errorCount)\n  print("================\\n")\n  \n  return results\nend\n\n-- Reglas predefinidas\nfunction AssetValidator.Rules.FileNameNotEmpty(asset)\n  return asset.name and #asset.name > 0, "Nombre vacío"\nend\n\nfunction AssetValidator.Rules.FileSize(asset)\n  local maxSize = asset.maxSize or 100000000  -- 100MB default\n  return asset.size <= maxSize, "Tamaño excede límite (" .. asset.size .. " > " .. maxSize .. ")"\nend\n\nfunction AssetValidator.Rules.ValidPath(asset)\n  return asset.path and asset.path:match("^/"), "Path inválido (debe empezar con /)"\nend\n\nreturn AssetValidator',
    tests: [
      { type: "code_contains", expected: "AddRule", message: "Debes implementar AddRule" },
      { type: "code_contains", expected: "ValidateAsset", message: "Debes implementar ValidateAsset" },
      { type: "code_contains", expected: "ValidateAllAssets", message: "Debes implementar ValidateAllAssets" },
      { type: "code_contains", expected: "rules", message: "Debes tener tabla rules" },
      { type: "code_contains", expected: "errors", message: "Debes trackear errores" },
      { type: "code_contains", expected: "isValid", message: "Debes tener campo isValid" },
    ],
    hints: [
      "rules es lista de {name, func}",
      "Cada regla retorna passed, message",
      "ValidateAsset prueba todas las reglas",
      "ValidateAllAssets imprime reporte completo",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },

  // ============================================
  // LECCIÓN 4: Pipeline Automation (Semana 4)
  // ============================================
  {
    id: "mes-08-leccion-4-ej-1",
    lessonId: "l8-4-pipeline",
    title: 'Importador Automático de Assets',
    instructions: 'Crea un script para importar assets automáticamente.\n\n**Requisitos:**\n- `AssetImporter()` crea importador\n- `ImportFromFolder(folderPath)` importa todos los assets de una carpeta\n- `SetImportSettings(settings)` configura opciones de importación\n- `GetImportReport()` retorna reporte de importación\n- Imprime "Importando: [filename]" y "Importado: [success]/[total]"\n\n**Pista:** Itera sobre archivos de la carpeta',
    starterCode: 'local AssetImporter = {}\n\nfunction AssetImporter:new()\n  local self = setmetatable({}, AssetImporter)\n  self.settings = {}\n  self.report = { imported = 0, failed = 0, skipped = 0 }\n  return self\nend\n\nfunction AssetImporter:ImportFromFolder(folderPath)\n  -- Importa todos los assets de la carpeta\nend\n\nfunction AssetImporter:SetImportSettings(settings)\n  -- Configura opciones de importación\nend\n\nfunction AssetImporter:GetImportReport()\n  -- Retorna reporte de importación\nend\n\nreturn AssetImporter',
    solution: 'local AssetImporter = {}\nAssetImporter.__index = AssetImporter\n\nfunction AssetImporter:new()\n  local self = setmetatable({}, AssetImporter)\n  self.settings = {\n    overwrite = false,\n    createGroups = true,\n    importTextures = true,\n    importModels = true\n  }\n  self.report = { imported = 0, failed = 0, skipped = 0, files = {} }\n  return self\nend\n\nfunction AssetImporter:ImportFromFolder(folderPath)\n  print("\\n=== IMPORTANDO ASSETS ===")\n  print("Carpeta: " .. folderPath)\n  print("")\n  \n  -- Simular lista de archivos (en implementación real, usaría FS)\n  local files = {\n    {name = "texture1.png", type = "texture"},\n    {name = "model1.fbx", type = "model"},\n    {name = "sound1.wav", type = "audio"},\n    {name = "texture2.png", type = "texture"}\n  }\n  \n  for _, file in ipairs(files) do\n    print("Importando: " .. file.name)\n    \n    -- Simular importación\n    local success = true  -- En real, llamaría a función de import\n    \n    if success then\n      self.report.imported = self.report.imported + 1\n      table.insert(self.report.files, {name = file.name, status = "imported"})\n      print("  ✓ Importado exitosamente")\n    else\n      self.report.failed = self.report.failed + 1\n      table.insert(self.report.files, {name = file.name, status = "failed"})\n      print("  ✗ Falló importación")\n    end\n  end\n  \n  print("")\n  print("=== RESUMEN ===")\n  print("Importados: " .. self.report.imported)\n  print("Fallidos: " .. self.report.failed)\n  print("Saltados: " .. self.report.skipped)\n  print("================\\n")\n  \n  return self.report\nend\n\nfunction AssetImporter:SetImportSettings(settings)\n  for k, v in pairs(settings) do\n    self.settings[k] = v\n  end\n  print("Configuración de importación actualizada")\nend\n\nfunction AssetImporter:GetImportReport()\n  return self.report\nend\n\nfunction AssetImporter:ResetReport()\n  self.report = { imported = 0, failed = 0, skipped = 0, files = {} }\nend\n\nreturn AssetImporter',
    tests: [
      { type: "code_contains", expected: "ImportFromFolder", message: "Debes implementar ImportFromFolder" },
      { type: "code_contains", expected: "SetImportSettings", message: "Debes implementar SetImportSettings" },
      { type: "code_contains", expected: "GetImportReport", message: "Debes implementar GetImportReport" },
      { type: "code_contains", expected: "report", message: "Debes tener tabla report" },
      { type: "code_contains", expected: "imported", message: "Debes trackear importados" },
      { type: "code_contains", expected: "failed", message: "Debes trackear fallidos" },
    ],
    hints: [
      "report almacena estadísticas de importación",
      "ImportFromFolder itera sobre archivos",
      "SetImportSettings actualiza configuración",
      "Imprime resumen al final",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-08-leccion-4-ej-2",
    lessonId: "l8-4-pipeline",
    title: 'Generador Automático de DataTables',
    instructions: 'Crea un script para generar DataTables desde CSV/JSON.\n\n**Requisitos:**\n- `DataTableGenerator()` crea generador\n- `LoadFromCSV(csvPath)` carga datos desde CSV\n- `LoadFromJSON(jsonPath)` carga datos desde JSON\n- `GenerateDataTable(tableName)` genera la DataTable\n- Imprime "Generando DataTable: [name]" y "Filas: [count]"\n\n**Pista:** CSV tiene headers en primera fila, JSON tiene estructura directa',
    starterCode: 'local DataTableGenerator = {}\n\nfunction DataTableGenerator:new()\n  local self = setmetatable({}, DataTableGenerator)\n  self.data = {}\n  self.headers = {}\n  return self\nend\n\nfunction DataTableGenerator:LoadFromCSV(csvPath)\n  -- Carga datos desde CSV\nend\n\nfunction DataTableGenerator:LoadFromJSON(jsonPath)\n  -- Carga datos desde JSON\nend\n\nfunction DataTableGenerator:GenerateDataTable(tableName)\n  -- Genera la DataTable\nend\n\nreturn DataTableGenerator',
    solution: 'local DataTableGenerator = {}\nDataTableGenerator.__index = DataTableGenerator\n\nfunction DataTableGenerator:new()\n  local self = setmetatable({}, DataTableGenerator)\n  self.data = {}\n  self.headers = {}\n  return self\nend\n\nfunction DataTableGenerator:LoadFromCSV(csvPath)\n  print("Cargando CSV: " .. csvPath)\n  \n  -- Simular carga de CSV (en real, leería archivo)\n  local csvContent = "ID,Name,Value,Type\\n1,Sword,100,Weapon\\n2,Shield,80,Armor\\n3,Potion,10,Consumable"\n  \n  local lines = {}\n  for line in csvContent:gmatch("[^\\n]+") do\n    table.insert(lines, line)\n  end\n  \n  -- Primera línea son headers\n  local headerLine = lines[1]\n  for header in headerLine:gmatch("[^,]+") do\n    table.insert(self.headers, header)\n  end\n  \n  -- Resto son datos\n  for i = 2, #lines do\n    local row = {}\n    local values = {}\n    for value in lines[i]:gmatch("[^,]+") do\n      table.insert(values, value)\n    end\n    \n    for j, header in ipairs(self.headers) do\n      row[header] = values[j]\n    end\n    \n    table.insert(self.data, row)\n  end\n  \n  print("Headers: " .. #self.headers)\n  print("Filas: " .. #self.data)\n  \n  return #self.data\nend\n\nfunction DataTableGenerator:LoadFromJSON(jsonPath)\n  print("Cargando JSON: " .. jsonPath)\n  \n  -- Simular carga de JSON\n  local jsonData = {\n    {ID = "1", Name = "Sword", Value = "100", Type = "Weapon"},\n    {ID = "2", Name = "Shield", Value = "80", Type = "Armor"},\n    {ID = "3", Name = "Potion", Value = "10", Type = "Consumable"}\n  }\n  \n  self.data = jsonData\n  \n  -- Extraer headers del primer elemento\n  if #jsonData > 0 then\n    for key in pairs(jsonData[1]) do\n      table.insert(self.headers, key)\n    end\n  end\n  \n  print("Headers: " .. #self.headers)\n  print("Filas: " .. #self.data)\n  \n  return #self.data\nend\n\nfunction DataTableGenerator:GenerateDataTable(tableName)\n  print("\\n=== GENERANDO DATATABLE ===")\n  print("Nombre: " .. tableName)\n  print("Columnas: " .. #self.headers)\n  print("Filas: " .. #self.data)\n  print("")\n  \n  -- Imprimir preview\n  print("=== PREVIEW ===")\n  for i, row in ipairs(self.data) do\n    local rowStr = ""\n    for _, header in ipairs(self.headers) do\n      rowStr = rowStr .. header .. "=" .. tostring(row[header]) .. " "\n    end\n    print(rowStr)\n  end\n  print("================\\n")\n  \n  return {\n    name = tableName,\n    columns = #self.headers,\n    rows = #self.data,\n    data = self.data\n  }\nend\n\nfunction DataTableGenerator:Clear()\n  self.data = {}\n  self.headers = {}\nend\n\nreturn DataTableGenerator',
    tests: [
      { type: "code_contains", expected: "LoadFromCSV", message: "Debes implementar LoadFromCSV" },
      { type: "code_contains", expected: "LoadFromJSON", message: "Debes implementar LoadFromJSON" },
      { type: "code_contains", expected: "GenerateDataTable", message: "Debes implementar GenerateDataTable" },
      { type: "code_contains", expected: "headers", message: "Debes tener tabla headers" },
      { type: "code_contains", expected: "data", message: "Debes tener tabla data" },
    ],
    hints: [
      "CSV parsea headers y filas separadas por comas",
      "JSON usa datos directamente",
      "GenerateDataTable crea la tabla final",
      "Imprime preview de datos",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },
  {
    id: "mes-08-leccion-4-ej-3",
    lessonId: "l8-4-pipeline",
    title: 'Sistema de Batch Testing',
    instructions: 'Crea un sistema para ejecutar tests en lote.\n\n**Requisitos:**\n- `BatchTester()` crea sistema de testing\n- `AddTest(testName, testFunction)` añade test\n- `RunAllTests()` ejecuta todos los tests\n- `GetTestReport()` retorna reporte con passed/failed\n- Imprime "✓ [testName] passed" o "✗ [testName] failed: [error]"\n\n**Pista:** Cada test es una función que puede lanzar error',
    starterCode: 'local BatchTester = {}\n\nfunction BatchTester:new()\n  local self = setmetatable({}, BatchTester)\n  self.tests = {}  -- {name, func}\n  self.results = { passed = 0, failed = 0, tests = {} }\n  return self\nend\n\nfunction BatchTester:AddTest(testName, testFunction)\n  -- Añade test\nend\n\nfunction BatchTester:RunAllTests()\n  -- Ejecuta todos los tests\nend\n\nfunction BatchTester:GetTestReport()\n  -- Retorna reporte\nend\n\nreturn BatchTester',
    solution: 'local BatchTester = {}\nBatchTester.__index = BatchTester\n\nfunction BatchTester:new()\n  local self = setmetatable({}, BatchTester)\n  self.tests = {}  -- {name, func}\n  self.results = { passed = 0, failed = 0, tests = {} }\n  return self\nend\n\nfunction BatchTester:AddTest(testName, testFunction)\n  table.insert(self.tests, {name = testName, func = testFunction})\n  print("Test añadido: " .. testName)\nend\n\nfunction BatchTester:RunAllTests()\n  print("\\n=== EJECUTANDO TESTS ===")\n  print("Total tests: " .. #self.tests)\n  print("")\n  \n  self.results = { passed = 0, failed = 0, tests = {} }\n  \n  for _, test in ipairs(self.tests) do\n    local success, errorMsg = pcall(test.func)\n    \n    local result = {\n      name = test.name,\n      passed = success,\n      error = errorMsg\n    }\n    \n    if success then\n      print("✓ " .. test.name .. " passed")\n      self.results.passed = self.results.passed + 1\n    else\n      print("✗ " .. test.name .. " failed: " .. errorMsg)\n      self.results.failed = self.results.failed + 1\n    end\n    \n    table.insert(self.results.tests, result)\n  end\n  \n  print("")\n  print("=== RESUMEN ===")\n  print("Passed: " .. self.results.passed)\n  print("Failed: " .. self.results.failed)\n  print("Total: " .. #self.tests)\n  print("================\\n")\n  \n  return self.results\nend\n\nfunction BatchTester:GetTestReport()\n  return self.results\nend\n\nfunction BatchTester:Clear()\n  self.tests = {}\n  self.results = { passed = 0, failed = 0, tests = {} }\nend\n\n-- Funciones helper para tests\nfunction BatchTester.AssertEqual(actual, expected)\n  if actual ~= expected then\n    error("Expected " .. tostring(expected) .. " but got " .. tostring(actual))\n  end\nend\n\nfunction BatchTester.AssertTrue(condition)\n  if not condition then\n    error("Expected true but got false")\n  end\nend\n\nfunction BatchTester.AssertFalse(condition)\n  if condition then\n    error("Expected false but got true")\n  end\nend\n\nreturn BatchTester',
    tests: [
      { type: "code_contains", expected: "AddTest", message: "Debes implementar AddTest" },
      { type: "code_contains", expected: "RunAllTests", message: "Debes implementar RunAllTests" },
      { type: "code_contains", expected: "GetTestReport", message: "Debes implementar GetTestReport" },
      { type: "code_contains", expected: "tests", message: "Debes tener tabla tests" },
      { type: "code_contains", expected: "pcall", message: "Debes usar pcall para capturar errores" },
      { type: "code_contains", expected: "passed", message: "Debes trackear passed" },
      { type: "code_contains", expected: "failed", message: "Debes trackear failed" },
    ],
    hints: [
      "tests es lista de {name, func}",
      "pcall ejecuta test y captura errores",
      "RunAllTests itera sobre todos los tests",
      "Imprime resumen con passed/failed",
    ],
    difficulty: "advanced",
    xpReward: 80,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 8
  // ============================================
  {
    id: "mes-08-final-proyecto",
    lessonId: "l8-4-pipeline",
    title: 'Proyecto: Toolkit de Editor con 3 Herramientas',
    instructions: 'Crea el entregable del Mes 8: Toolkit de editor con 3 herramientas custom.\n\n**Requisitos:**\n1. Generador de Niveles Procedural:\n   - Genera layout de dungeon con rooms y corridors\n   - Configura tamaño, número de rooms\n   - Exporta datos del nivel generado\n\n2. Validador de Assets:\n   - Valida assets contra reglas personalizables\n   - Reporta errores y advertencias\n   - Batch validation de múltiples assets\n\n3. Batch Renamer:\n   - Renombra múltiples assets en lote\n   - Vista previa antes de ejecutar\n   - Soporta patrones de nombre\n\n**Pista:** Integra herramientas de las lecciones anteriores',
    starterCode: '-- Editor Toolkit - 3 Herramientas Custom\nlocal EditorToolkit = {}\n\n-- 1. Generador de Niveles\nlocal DungeonGenerator = {}\n\nfunction DungeonGenerator:Generate(size, roomCount)\n  -- Genera dungeon procedural\nend\n\n-- 2. Validador de Assets\nlocal AssetValidator = {}\n\nfunction AssetValidator:ValidateAll(assets)\n  -- Valida múltiples assets\nend\n\n-- 3. Batch Renamer\nlocal BatchRenamer = {}\n\nfunction BatchRenamer:RenameAll(assets, pattern)\n  -- Renombra assets con patrón\nend\n\n-- Sistema Principal\nfunction EditorToolkit:new()\n  local self = setmetatable({}, EditorToolkit)\n  self.dungeonGenerator = DungeonGenerator\n  self.assetValidator = AssetValidator\n  self.batchRenamer = BatchRenamer\n  return self\nend\n\nreturn EditorToolkit',
    solution: '-- Editor Toolkit - 3 Herramientas Custom\nlocal EditorToolkit = {}\nEditorToolkit.__index = EditorToolkit\n\n-- ============================================\n-- 1. GENERADOR DE NIVELES PROCEDURAL\n-- ============================================\nlocal DungeonGenerator = {}\nDungeonGenerator.__index = DungeonGenerator\n\nfunction DungeonGenerator:new()\n  local self = setmetatable({}, DungeonGenerator)\n  self.rooms = {}\n  self.corridors = {}\n  return self\nend\n\nfunction DungeonGenerator:Generate(size, roomCount)\n  print("\\n=== GENERANDO DUNGEON ===")\n  print("Tamaño: " .. size .. "x" .. size)\n  print("Rooms: " .. roomCount)\n  print("")\n  \n  self.rooms = {}\n  self.corridors = {}\n  \n  -- Generar rooms\n  for i = 1, roomCount do\n    local room = {\n      id = i,\n      x = math.random(0, size - 10),\n      y = math.random(0, size - 10),\n      width = math.random(5, 10),\n      height = math.random(5, 10),\n      type = (i == 1) and "start" or ((i == roomCount) and "boss" or "normal")\n    }\n    table.insert(self.rooms, room)\n    print("Room " .. i .. ": (" .. room.x .. ", " .. room.y .. ") [" .. room.width .. "x" .. room.height .. "] - " .. room.type)\n  end\n  \n  -- Generar corridors entre rooms\n  for i = 1, roomCount - 1 do\n    local corridor = {\n      from = i,\n      to = i + 1,\n      length = math.random(5, 15)\n    }\n    table.insert(self.corridors, corridor)\n  end\n  \n  print("\\nCorridors: " .. #self.corridors)\n  print("========================\\n")\n  \n  return {\n    size = size,\n    rooms = self.rooms,\n    corridors = self.corridors,\n    roomCount = #self.rooms\n  }\nend\n\nfunction DungeonGenerator:ExportData()\n  return {\n    rooms = self.rooms,\n    corridors = self.corridors\n  }\nend\n\n-- ============================================\n-- 2. VALIDADOR DE ASSETS\n-- ============================================\nlocal AssetValidator = {}\nAssetValidator.__index = AssetValidator\n\nfunction AssetValidator:new()\n  local self = setmetatable({}, AssetValidator)\n  self.rules = {}\n  return self\nend\n\nfunction AssetValidator:AddRule(name, func)\n  table.insert(self.rules, {name = name, func = func})\nend\n\nfunction AssetValidator:ValidateAsset(asset)\n  local errors = {}\n  \n  for _, rule in ipairs(self.rules) do\n    local passed, msg = rule.func(asset)\n    if not passed then\n      table.insert(errors, {rule = rule.name, message = msg})\n    end\n  end\n  \n  return {valid = #errors == 0, errors = errors}\nend\n\nfunction AssetValidator:ValidateAll(assets)\n  print("\\n=== VALIDANDO ASSETS ===")\n  local results = {valid = 0, invalid = 0}\n  \n  for _, asset in ipairs(assets) do\n    local result = self:ValidateAsset(asset)\n    \n    if result.valid then\n      print("✓ " .. asset.name)\n      results.valid = results.valid + 1\n    else\n      print("✗ " .. asset.name)\n      for _, err in ipairs(result.errors) do\n        print("  - " .. err.rule .. ": " .. err.message)\n      end\n      results.invalid = results.invalid + 1\n    end\n  end\n  \n  print("\\nVálidos: " .. results.valid)\n  print("Inválidos: " .. results.invalid)\n  print("========================\\n")\n  \n  return results\nend\n\n-- Reglas predefinidas\nfunction AssetValidator.Rules.HasName(asset)\n  return asset.name and #asset.name > 0, "Nombre vacío"\nend\n\nfunction AssetValidator.Rules.ValidSize(asset)\n  return asset.size < 100000000, "Tamaño > 100MB"\nend\n\n-- ============================================\n-- 3. BATCH RENAMER\n-- ============================================\nlocal BatchRenamer = {}\nBatchRenamer.__index = BatchRenamer\n\nfunction BatchRenamer:new()\n  local self = setmetatable({}, BatchRenamer)\n  self.assets = {}\n  return self\nend\n\nfunction BatchRenamer:AddAsset(oldName, newName)\n  table.insert(self.assets, {old = oldName, new = newName})\nend\n\nfunction BatchRenamer:Preview()\n  print("\\n=== VISTA PREVIA ===")\n  for i, asset in ipairs(self.assets) do\n    print(i .. ". " .. asset.old .. " -> " .. asset.new)\n  end\n  print("==================\\n")\nend\n\nfunction BatchRenamer:RenameAll(pattern)\n  print("\\n=== RENOMBRANDO ASSETS ===")\n  \n  for i, asset in ipairs(self.assets) do\n    local newName = asset.old:gsub(pattern, asset.new)\n    print("Renombrando: " .. asset.old .. " -> " .. newName)\n  end\n  \n  print("============================\\n")\n  self.assets = {}\nend\n\nfunction BatchRenamer:Clear()\n  self.assets = {}\nend\n\n-- ============================================\n-- SISTEMA PRINCIPAL\n-- ============================================\nfunction EditorToolkit:new()\n  local self = setmetatable({}, EditorToolkit)\n  self.dungeonGenerator = DungeonGenerator:new()\n  self.assetValidator = AssetValidator:new()\n  self.batchRenamer = BatchRenamer:new()\n  \n  -- Añadir reglas por defecto\n  self.assetValidator:AddRule("HasName", AssetValidator.Rules.HasName)\n  self.assetValidator:AddRule("ValidSize", AssetValidator.Rules.ValidSize)\n  \n  print("Editor Toolkit inicializado")\n  print("- Dungeon Generator")\n  print("- Asset Validator (2 reglas)")\n  print("- Batch Renamer")\n  \n  return self\nend\n\nfunction EditorToolkit:RunAllTools()\n  print("\\n========================================")\n  print("EJECUTANDO EDITOR TOOLKIT COMPLETO")\n  print("========================================\\n")\n  \n  -- 1. Generar dungeon\n  local dungeon = self.dungeonGenerator:Generate(100, 5)\n  \n  -- 2. Validar assets de ejemplo\n  local testAssets = {\n    {name = "texture1.png", size = 1000000},\n    {name = "", size = 500000},  -- Inválido (sin nombre)\n    {name = "model.fbx", size = 200000000}  -- Inválido (muy grande)\n  }\n  self.assetValidator:ValidateAll(testAssets)\n  \n  -- 3. Batch rename de ejemplo\n  self.batchRenamer:AddAsset("texture_old_01.png", "texture_new_01.png")\n  self.batchRenamer:AddAsset("texture_old_02.png", "texture_new_02.png")\n  self.batchRenamer:Preview()\n  \n  print("\\n========================================")\n  print("TOOLKIT EJECUCIÓN COMPLETADA")\n  print("========================================\\n")\nend\n\nreturn EditorToolkit',
    tests: [
      { type: "code_contains", expected: "DungeonGenerator", message: "Debes tener DungeonGenerator" },
      { type: "code_contains", expected: "AssetValidator", message: "Debes tener AssetValidator" },
      { type: "code_contains", expected: "BatchRenamer", message: "Debes tener BatchRenamer" },
      { type: "code_contains", expected: "Generate", message: "Debes implementar Generate" },
      { type: "code_contains", expected: "ValidateAll", message: "Debes implementar ValidateAll" },
      { type: "code_contains", expected: "RenameAll", message: "Debes implementar RenameAll" },
      { type: "code_contains", expected: "rooms", message: "Debes tener rooms" },
      { type: "code_contains", expected: "corridors", message: "Debes tener corridors" },
      { type: "code_contains", expected: "rules", message: "Debes tener rules" },
      { type: "code_contains", expected: "assets", message: "Debes tener assets" },
    ],
    hints: [
      "DungeonGenerator genera rooms y corridors",
      "AssetValidator valida assets contra reglas",
      "BatchRenamer renombra assets en lote",
      "EditorToolkit integra las 3 herramientas",
      "RunAllTools ejecuta todas las herramientas",
    ],
    difficulty: "advanced",
    xpReward: 400,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes08Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes08Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes08Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
