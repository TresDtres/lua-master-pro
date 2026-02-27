import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 6: Inteligencia Artificial de NPCs
// ============================================
// Basado en el plan de estudio:
// Semana 1: FSM en Lua - states, transitions, guards
// Semana 2: Percepción - raycasts, cono de visión, rango de escucha
// Semana 3: Behavior Trees - BTTasks en Lua via UnLua
// Semana 4: Combate básico - ataque, defensa, coordinación
// ============================================
// Entregable del mes: Demo 'Smart Guards' - escenario de sigilo con 5 guardias
// con IA completa (patrulla, persecución, alerta, búsqueda) implementada en Lua
// ============================================

export const mes06Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: FSM en Lua (Semana 1)
  // ============================================
  {
    id: "mes-06-leccion-1-ej-1",
    lessonId: "l6-1-fsm",
    title: "Crear Máquina de Estados Finitos (FSM)",
    instructions: 'Crea una FSM básica con 4 estados para un guardia.\n\n**Requisitos:**\n- Crea una clase `GuardFSM` con estados: "Idle", "Patrol", "Alert", "Chase"\n- Implementa `ChangeState(newState)` para cambiar de estado\n- Implementa `Update(deltaTime)` que ejecuta lógica del estado actual\n- Cada estado debe imprimir "[Estado] state executing" al actualizarse\n- El estado inicial debe ser "Idle"\n\n**Pista:** Usa una tabla para mapear estados a funciones',
    starterCode: 'local GuardFSM = {}\nGuardFSM.__index = GuardFSM\n\nfunction GuardFSM:new()\n  local self = setmetatable({}, GuardFSM)\n  self.currentState = "Idle"\n  return self\nend\n\nfunction GuardFSM:ChangeState(newState)\n  -- Cambia al nuevo estado\nend\n\nfunction GuardFSM:Update(deltaTime)\n  -- Ejecuta lógica del estado actual\nend\n\nreturn GuardFSM',
    solution: 'local GuardFSM = {}\nGuardFSM.__index = GuardFSM\n\nfunction GuardFSM:new()\n  local self = setmetatable({}, GuardFSM)\n  self.currentState = "Idle"\n  self.states = {\n    Idle = function(dt) print("Idle state executing") end,\n    Patrol = function(dt) print("Patrol state executing") end,\n    Alert = function(dt) print("Alert state executing") end,\n    Chase = function(dt) print("Chase state executing") end\n  }\n  return self\nend\n\nfunction GuardFSM:ChangeState(newState)\n  if self.states[newState] then\n    print("Changing state: " .. self.currentState .. " -> " .. newState)\n    self.currentState = newState\n  end\nend\n\nfunction GuardFSM:Update(deltaTime)\n  if self.states[self.currentState] then\n    self.states[self.currentState](deltaTime)\n  end\nend\n\nreturn GuardFSM',
    tests: [
      { type: "code_contains", expected: "GuardFSM", message: "Debes crear GuardFSM" },
      { type: "code_contains", expected: "Idle", message: "Debes tener estado Idle" },
      { type: "code_contains", expected: "Patrol", message: "Debes tener estado Patrol" },
      { type: "code_contains", expected: "Alert", message: "Debes tener estado Alert" },
      { type: "code_contains", expected: "Chase", message: "Debes tener estado Chase" },
      { type: "code_contains", expected: "ChangeState", message: "Debes implementar ChangeState" },
      { type: "code_contains", expected: "Update", message: "Debes implementar Update" },
    ],
    hints: [
      "Los 4 estados son: Idle, Patrol, Alert, Chase",
      "Usa una tabla self.states con funciones para cada estado",
      "ChangeState actualiza self.currentState",
      "Update ejecuta la función del estado actual",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-06-leccion-1-ej-2",
    lessonId: "l6-1-fsm",
    title: "Implementar Guards (Condiciones de Transición)",
    instructions: 'Añade condiciones (guards) para las transiciones de estado.\n\n**Requisitos:**\n- `CheckConditions()` debe verificar condiciones para cambiar de estado\n- Si `playerDetected` es true y estado es Idle/Patrol → cambiar a Alert\n- Si `playerDetected` es true y estado es Alert → cambiar a Chase\n- Si `playerDetected` es false y estado es Alert/Chase → cambiar a Patrol\n- Imprime las transiciones\n\n**Pista:** Los guards son funciones booleanas que determinan si una transición es válida',
    starterCode: 'local GuardFSM = {}\nGuardFSM.__index = GuardFSM\n\nfunction GuardFSM:new()\n  local self = setmetatable({}, GuardFSM)\n  self.currentState = "Idle"\n  self.playerDetected = false\n  return self\nend\n\nfunction GuardFSM:CheckConditions()\n  -- Verifica condiciones y cambia de estado si es necesario\nend\n\nreturn GuardFSM',
    solution: 'local GuardFSM = {}\nGuardFSM.__index = GuardFSM\n\nfunction GuardFSM:new()\n  local self = setmetatable({}, GuardFSM)\n  self.currentState = "Idle"\n  self.playerDetected = false\n  return self\nend\n\nfunction GuardFSM:ChangeState(newState)\n  print("Changing state: " .. self.currentState .. " -> " .. newState)\n  self.currentState = newState\nend\n\nfunction GuardFSM:CheckConditions()\n  if self.playerDetected then\n    if self.currentState == "Idle" or self.currentState == "Patrol" then\n      self:ChangeState("Alert")\n    elseif self.currentState == "Alert" then\n      self:ChangeState("Chase")\n    end\n  else\n    if self.currentState == "Alert" or self.currentState == "Chase" then\n      self:ChangeState("Patrol")\n    end\n  end\nend\n\nreturn GuardFSM',
    tests: [
      { type: "code_contains", expected: "playerDetected", message: "Debes tener variable playerDetected" },
      { type: "code_contains", expected: "CheckConditions", message: "Debes implementar CheckConditions" },
      { type: "code_contains", expected: "ChangeState", message: "Debes llamar a ChangeState" },
      { type: "code_contains", expected: "Alert", message: "Debes transicionar a Alert" },
      { type: "code_contains", expected: "Chase", message: "Debes transicionar a Chase" },
    ],
    hints: [
      "Si playerDetected y estado es Idle/Patrol → Alert",
      "Si playerDetected y estado es Alert → Chase",
      "Si NO playerDetected y estado es Alert/Chase → Patrol",
      "Usa if/elseif para las condiciones",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-06-leccion-1-ej-3",
    lessonId: "l6-1-fsm",
    title: "FSM Completa con Lógica por Estado",
    instructions: 'Implementa lógica específica para cada estado de la FSM.\n\n**Requisitos:**\n- Idle: Imprime "Patrullando área..." cada 2 segundos\n- Patrol: Imprime "Moviendo a punto de patrulla [x, y, z]"\n- Alert: Imprime "¡Alerta! Investigando..." y busca al jugador\n- Chase: Imprime "¡Persiguiendo jugador!" y mueve hacia el jugador\n- Cada estado debe tener un timer para acciones periódicas\n\n**Pista:** Usa self.timer acumulado con deltaTime',
    starterCode: 'local GuardFSM = {}\nGuardFSM.__index = GuardFSM\n\nfunction GuardFSM:new()\n  local self = setmetatable({}, GuardFSM)\n  self.currentState = "Idle"\n  self.timer = 0\n  self.patrolPoints = {}\n  self.currentPatrolIndex = 1\n  return self\nend\n\nfunction GuardFSM:UpdateState(deltaTime)\n  -- Lógica específica para cada estado\n  if self.currentState == "Idle" then\n    -- Imprime cada 2 segundos\n  elseif self.currentState == "Patrol" then\n    -- Mueve a punto de patrulla\n  elseif self.currentState == "Alert" then\n    -- Investiga\n  elseif self.currentState == "Chase" then\n    -- Persigue jugador\n  end\nend\n\nreturn GuardFSM',
    solution: 'local GuardFSM = {}\nGuardFSM.__index = GuardFSM\n\nfunction GuardFSM:new()\n  local self = setmetatable({}, GuardFSM)\n  self.currentState = "Idle"\n  self.timer = 0\n  self.patrolPoints = {\n    {x = 0, y = 0, z = 0},\n    {x = 100, y = 0, z = 0},\n    {x = 100, y = 0, z = 100}\n  }\n  self.currentPatrolIndex = 1\n  return self\nend\n\nfunction GuardFSM:UpdateState(deltaTime)\n  self.timer = self.timer + deltaTime\n  \n  if self.currentState == "Idle" then\n    if self.timer >= 2 then\n      print("Patrullando área...")\n      self.timer = 0\n    end\n    \n  elseif self.currentState == "Patrol" then\n    local point = self.patrolPoints[self.currentPatrolIndex]\n    print("Moviendo a punto de patrulla [" .. point.x .. ", " .. point.y .. ", " .. point.z .. "]")\n    \n  elseif self.currentState == "Alert" then\n    print("¡Alerta! Investigando...")\n    \n  elseif self.currentState == "Chase" then\n    print("¡Persiguiendo jugador!")\n  end\nend\n\nreturn GuardFSM',
    tests: [
      { type: "code_contains", expected: "timer", message: "Debes tener timer acumulado" },
      { type: "code_contains", expected: "deltaTime", message: "Debes usar deltaTime" },
      { type: "code_contains", expected: "Idle", message: "Debes tener lógica para Idle" },
      { type: "code_contains", expected: "Patrol", message: "Debes tener lógica para Patrol" },
      { type: "code_contains", expected: "Alert", message: "Debes tener lógica para Alert" },
      { type: "code_contains", expected: "Chase", message: "Debes tener lógica para Chase" },
    ],
    hints: [
      "Acumula deltaTime en self.timer",
      "Idle: imprime cada 2 segundos (if timer >= 2)",
      "Patrol: imprime coordenadas del punto actual",
      "Alert: imprime mensaje de alerta",
      "Chase: imprime mensaje de persecución",
    ],
    difficulty: "advanced",
    xpReward: 70,
  },

  // ============================================
  // LECCIÓN 2: Percepción (Semana 2)
  // ============================================
  {
    id: "mes-06-leccion-2-ej-1",
    lessonId: "l6-2-perception",
    title: "Raycast para Detección de Visión",
    instructions: 'Implementa detección de visión usando raycast.\n\n**Requisitos:**\n- `CanSeeTarget(targetLocation)` debe hacer un line trace\n- Usa `self:LineTraceByChannel(start, end)` para el raycast\n- Si hay hit, retorna true e imprime "Objeto detectado en [distancia]"\n- Si no hay hit, retorna false\n- La distancia máxima de detección es 1000 unidades\n\n**Pista:** LineTraceByChannel retorna hitResult con Actor y Location',
    starterCode: 'local GuardAI = {}\n\nfunction GuardAI:CanSeeTarget(targetLocation)\n  -- Hace raycast para detectar si ve al objetivo\n  local start = self:GetActorLocation()\n  local endPos = targetLocation\n  \n  -- Implementa el raycast aquí\nend\n\nreturn GuardAI',
    solution: 'local GuardAI = {}\n\nfunction GuardAI:CanSeeTarget(targetLocation)\n  local start = self:GetActorLocation()\n  local endPos = targetLocation\n  \n  local hitResult = self:LineTraceByChannel(start, endPos)\n  \n  if hitResult and hitResult.Actor then\n    local distance = start:Distance(endPos)\n    print("Objeto detectado en " .. math.floor(distance) .. " unidades")\n    return true\n  end\n  \n  return false\nend\n\nreturn GuardAI',
    tests: [
      { type: "code_contains", expected: "LineTraceByChannel", message: "Debes usar LineTraceByChannel" },
      { type: "code_contains", expected: "hitResult", message: "Debes verificar hitResult" },
      { type: "code_contains", expected: "hitResult.Actor", message: "Debes verificar si hay Actor" },
      { type: "code_contains", expected: "Distance", message: "Debes calcular distancia" },
    ],
    hints: [
      "LineTraceByChannel(start, endPos) hace el raycast",
      "Verifica hitResult y hitResult.Actor",
      "Calcula distancia con start:Distance(endPos)",
      "Retorna true si hay hit, false si no",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-06-leccion-2-ej-2",
    lessonId: "l6-2-perception",
    title: "Cono de Visión (Field of View)",
    instructions: 'Implementa un cono de visión para el guardia.\n\n**Requisitos:**\n- `IsInFieldOfView(targetLocation)` debe verificar si el objetivo está en el cono\n- Calcula el ángulo entre forward vector y dirección al objetivo\n- Si el ángulo es < 60 grados (FOV de 120°), el objetivo está en visión\n- También verifica que no haya obstáculos con CanSeeTarget\n- Imprime "En campo de visión" o "Fuera de campo de visión"\n\n**Pista:** Usa producto punto para calcular ángulo entre vectores',
    starterCode: 'local GuardAI = {}\n\nfunction GuardAI:IsInFieldOfView(targetLocation)\n  -- Verifica si el objetivo está en el cono de visión\n  local guardLocation = self:GetActorLocation()\n  local forwardVector = self:GetActorForwardVector()\n  \n  -- Calcula dirección al objetivo\n  local toTarget = targetLocation - guardLocation\n  toTarget = toTarget:GetSafeNormal()\n  \n  -- Calcula ángulo con producto punto\n  local dotProduct = forwardVector:Dot(toTarget)\n  \n  -- Verifica si está en el cono (60 grados = 0.5 en dot product)\nend\n\nreturn GuardAI',
    solution: 'local GuardAI = {}\n\nfunction GuardAI:IsInFieldOfView(targetLocation)\n  local guardLocation = self:GetActorLocation()\n  local forwardVector = self:GetActorForwardVector()\n  \n  -- Calcula dirección al objetivo\n  local toTarget = targetLocation - guardLocation\n  toTarget = toTarget:GetSafeNormal()\n  \n  -- Calcula ángulo con producto punto\n  local dotProduct = forwardVector:Dot(toTarget)\n  \n  -- 60 grados = cos(60°) ≈ 0.5\n  local fovThreshold = 0.5\n  \n  if dotProduct >= fovThreshold then\n    -- También verifica línea de visión\n    if self:CanSeeTarget(targetLocation) then\n      print("En campo de visión")\n      return true\n    else\n      print("Obstáculo en el camino")\n      return false\n    end\n  else\n    print("Fuera de campo de visión")\n    return false\n  end\nend\n\nfunction GuardAI:CanSeeTarget(targetLocation)\n  return self:LineTraceByChannel(guardLocation, targetLocation) ~= nil\nend\n\nreturn GuardAI',
    tests: [
      { type: "code_contains", expected: "GetActorForwardVector", message: "Debes obtener forward vector" },
      { type: "code_contains", expected: "Dot", message: "Debes usar producto punto" },
      { type: "code_contains", expected: "GetSafeNormal", message: "Debes normalizar el vector" },
      { type: "code_contains", expected: "fovThreshold", message: "Debes tener umbral de FOV" },
      { type: "code_contains", expected: "CanSeeTarget", message: "Debes verificar línea de visión" },
    ],
    hints: [
      "GetActorForwardVector() da la dirección del guardia",
      "Producto punto (Dot) da el coseno del ángulo",
      "cos(60°) ≈ 0.5 es el threshold para FOV de 120°",
      "Si dot >= 0.5, el objetivo está en el cono",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },
  {
    id: "mes-06-leccion-2-ej-3",
    lessonId: "l6-2-perception",
    title: "Sistema de Percepción Completo",
    instructions: 'Combina visión y audición en un sistema de percepción completo.\n\n**Requisitos:**\n- `Perceive()` debe verificar visión y audición\n- Visión: usa IsInFieldOfView con distancia máxima 1000\n- Audición: verifica si hay sonido dentro de radio de 500 unidades\n- Retorna tabla con: {seen = bool, heard = bool, target = location}\n- Imprime estado de percepción: "Veo al jugador", "Escucho algo", etc.\n\n**Pista:** La percepción combina múltiples sentidos',
    starterCode: 'local GuardAI = {}\n\nfunction GuardAI:Perceive(playerLocation)\n  -- Sistema de percepción completo\n  local perception = {\n    seen = false,\n    heard = false,\n    target = nil\n  }\n  \n  -- Verifica visión (distancia máxima 1000)\n  -- Verifica audición (radio 500)\n  \n  return perception\nend\n\nreturn GuardAI',
    solution: 'local GuardAI = {}\n\nfunction GuardAI:Perceive(playerLocation)\n  local perception = {\n    seen = false,\n    heard = false,\n    target = nil\n  }\n  \n  local guardLocation = self:GetActorLocation()\n  local distanceToPlayer = guardLocation:Distance(playerLocation)\n  \n  -- Verifica visión (distancia máxima 1000)\n  if distanceToPlayer <= 1000 then\n    if self:IsInFieldOfView(playerLocation) then\n      perception.seen = true\n      perception.target = playerLocation\n      print("Veo al jugador a " .. math.floor(distanceToPlayer) .. " unidades")\n    end\n  end\n  \n  -- Verifica audición (radio 500)\n  if distanceToPlayer <= 500 then\n    -- Simula que el jugador hace ruido\n    perception.heard = true\n    if not perception.seen then\n      print("Escucho algo a " .. math.floor(distanceToPlayer) .. " unidades")\n    end\n  end\n  \n  return perception\nend\n\nfunction GuardAI:IsInFieldOfView(targetLocation)\n  local guardLocation = self:GetActorLocation()\n  local forwardVector = self:GetActorForwardVector()\n  local toTarget = targetLocation - guardLocation\n  toTarget = toTarget:GetSafeNormal()\n  \n  local dotProduct = forwardVector:Dot(toTarget)\n  return dotProduct >= 0.5 and self:CanSeeTarget(targetLocation)\nend\n\nfunction GuardAI:CanSeeTarget(targetLocation)\n  return self:LineTraceByChannel(self:GetActorLocation(), targetLocation) ~= nil\nend\n\nreturn GuardAI',
    tests: [
      { type: "code_contains", expected: "perception", message: "Debes crear tabla perception" },
      { type: "code_contains", expected: "seen", message: "Debes tener campo seen" },
      { type: "code_contains", expected: "heard", message: "Debes tener campo heard" },
      { type: "code_contains", expected: "target", message: "Debes tener campo target" },
      { type: "code_contains", expected: "1000", message: "Debes usar distancia 1000 para visión" },
      { type: "code_contains", expected: "500", message: "Debes usar radio 500 para audición" },
    ],
    hints: [
      "Crea tabla perception con seen, heard, target",
      "Calcula distancia con :Distance()",
      "Visión: distancia <= 1000 y en campo de visión",
      "Audición: distancia <= 500",
    ],
    difficulty: "advanced",
    xpReward: 80,
  },

  // ============================================
  // LECCIÓN 3: Behavior Trees (Semana 3)
  // ============================================
  {
    id: "mes-06-leccion-3-ej-1",
    lessonId: "l6-3-bt",
    title: "Crear BTTask en Lua para UnLua",
    instructions: 'Crea una BTTask que se pueda usar en Behavior Trees de UE5.\n\n**Requisitos:**\n- Crea una clase `BTTask_MoveToLocation` que herede de UBTTask_BlueprintBase\n- Implementa `ReceiveExecuteAI(Controller, LastTickSeconds)`\n- La task debe mover el AI a una ubicación objetivo\n- Retorna true si la task se completó con éxito\n- Imprime "BTTask: Moviendo a objetivo"\n\n**Pista:** En UnLua, las BTTasks se implementan como clases Lua',
    starterCode: 'local BTTask_MoveToLocation = {}\n\nfunction BTTask_MoveToLocation:ReceiveExecuteAI(Controller, LastTickSeconds)\n  -- Ejecuta la task de movimiento\n  -- Controller es el AIController\n  \n  -- Retorna true si éxito, false si fallo\nend\n\nreturn BTTask_MoveToLocation',
    solution: 'local BTTask_MoveToLocation = {}\n\nfunction BTTask_MoveToLocation:ReceiveExecuteAI(Controller, LastTickSeconds)\n  print("BTTask: Moviendo a objetivo")\n  \n  -- Obtener el Pawn controlado\n  local pawn = Controller:GetPawn()\n  \n  if pawn then\n    -- Obtener ubicación objetivo del Blackboard\n    local targetLocation = self:GetBlackboardComponent():GetValueAsObject("TargetLocation")\n    \n    if targetLocation then\n      -- Mover el AI hacia el objetivo\n      Controller:MoveToLocation(targetLocation, 100)\n      print("Moviendo a: " .. tostring(targetLocation))\n      return true\n    end\n  end\n  \n  print("Fallo en BTTask")\n  return false\nend\n\nreturn BTTask_MoveToLocation',
    tests: [
      { type: "code_contains", expected: "ReceiveExecuteAI", message: "Debes implementar ReceiveExecuteAI" },
      { type: "code_contains", expected: "Controller", message: "Debes recibir Controller" },
      { type: "code_contains", expected: "GetPawn", message: "Debes obtener el Pawn" },
      { type: "code_contains", expected: "Blackboard", message: "Debes acceder al Blackboard" },
      { type: "code_contains", expected: "MoveToLocation", message: "Debes mover el AI" },
    ],
    hints: [
      "ReceiveExecuteAI es la función principal de la BTTask",
      "Controller:GetPawn() obtiene el Pawn controlado",
      "GetBlackboardComponent():GetValueAsObject() obtiene valores del Blackboard",
      "Controller:MoveToLocation() mueve el AI",
    ],
    difficulty: "advanced",
    xpReward: 80,
  },
  {
    id: "mes-06-leccion-3-ej-2",
    lessonId: "l6-3-bt",
    title: "BTDecorator para Condicionar Comportamiento",
    instructions: 'Crea un BTDecorator que condicione la ejecución de nodos hijos.\n\n**Requisitos:**\n- Crea una clase `BTDecorator_CanSeePlayer`\n- Implementa `CalculateRawConditionValue(OwnerComp, OwnerActor)`\n- Retorna true si el AI puede ver al jugador\n- Usa LineTrace para verificar línea de visión\n- Imprime "Decorator: Jugador visible" o "Decorator: Jugador no visible"\n\n**Pista:** Los Decorators condicionan la ejecución de nodos hijos',
    starterCode: 'local BTDecorator_CanSeePlayer = {}\n\nfunction BTDecorator_CanSeePlayer:CalculateRawConditionValue(OwnerComp, OwnerActor)\n  -- Verifica si el AI puede ver al jugador\n  -- OwnerComp es el AIController\n  \n  -- Retorna true si visible, false si no\nend\n\nreturn BTDecorator_CanSeePlayer',
    solution: 'local BTDecorator_CanSeePlayer = {}\n\nfunction BTDecorator_CanSeePlayer:CalculateRawConditionValue(OwnerComp, OwnerActor)\n  local aiPawn = OwnerComp:GetPawn()\n  \n  if not aiPawn then\n    return false\n  end\n  \n  -- Obtener ubicación del jugador del Blackboard\n  local playerLocation = OwnerComp:GetBlackboardComponent():GetValueAsObject("PlayerLocation")\n  \n  if not playerLocation then\n    print("Decorator: Jugador no localizado")\n    return false\n  end\n  \n  -- Hacer line trace para verificar visión\n  local aiLocation = aiPawn:GetActorLocation()\n  local hitResult = aiPawn:LineTraceByChannel(aiLocation, playerLocation)\n  \n  if hitResult and hitResult.Actor then\n    print("Decorator: Jugador visible")\n    return true\n  else\n    print("Decorator: Jugador no visible")\n    return false\n  end\nend\n\nreturn BTDecorator_CanSeePlayer',
    tests: [
      { type: "code_contains", expected: "CalculateRawConditionValue", message: "Debes implementar CalculateRawConditionValue" },
      { type: "code_contains", expected: "OwnerComp", message: "Debes recibir OwnerComp" },
      { type: "code_contains", expected: "GetPawn", message: "Debes obtener el Pawn" },
      { type: "code_contains", expected: "Blackboard", message: "Debes acceder al Blackboard" },
      { type: "code_contains", expected: "LineTraceByChannel", message: "Debes hacer line trace" },
    ],
    hints: [
      "CalculateRawConditionValue retorna true/false para habilitar el nodo",
      "OwnerComp:GetPawn() obtiene el Pawn del AI",
      "Blackboard tiene la ubicación del jugador",
      "LineTrace verifica si hay línea de visión",
    ],
    difficulty: "advanced",
    xpReward: 80,
  },
  {
    id: "mes-06-leccion-3-ej-3",
    lessonId: "l6-3-bt",
    title: "Behavior Tree Completo con Múltiples Tasks",
    instructions: 'Crea un Behavior Tree completo con Selector, Sequence y Tasks.\n\n**Requisitos:**\n- Crea una tabla `BehaviorTree` que defina el árbol\n- Debe tener un Selector raíz con 2 hijos:\n  1. Sequence "AttackPlayer" (CanSeePlayer → MoveToPlayer → Attack)\n  2. Sequence "Patrol" (GetPatrolPoint → MoveToPatrol)\n- Cada task debe tener función Execute que retorne éxito/fracaso\n- Imprime el flujo del árbol: "Ejecutando [task]"\n\n**Pista:** Los Selectors ejecutan hijos hasta que uno tiene éxito, Sequences hasta que uno falla',
    starterCode: 'local BehaviorTree = {\n  root = {\n    type = "Selector",\n    children = {\n      {\n        type = "Sequence",\n        name = "AttackPlayer",\n        children = {\n          -- CanSeePlayer, MoveToPlayer, Attack\n        }\n      },\n      {\n        type = "Sequence",\n        name = "Patrol",\n        children = {\n          -- GetPatrolPoint, MoveToPatrol\n        }\n      }\n    }\n  }\n}\n\n-- Implementa funciones Execute para cada task\n\nreturn BehaviorTree',
    solution: 'local BehaviorTree = {\n  root = {\n    type = "Selector",\n    children = {\n      {\n        type = "Sequence",\n        name = "AttackPlayer",\n        children = {\n          { type = "Task", name = "CanSeePlayer" },\n          { type = "Task", name = "MoveToPlayer" },\n          { type = "Task", name = "Attack" }\n        }\n      },\n      {\n        type = "Sequence",\n        name = "Patrol",\n        children = {\n          { type = "Task", name = "GetPatrolPoint" },\n          { type = "Task", name = "MoveToPatrol" }\n        }\n      }\n    }\n  }\n}\n\n-- Funciones Execute para cada task\nlocal Tasks = {\n  CanSeePlayer = function(ai) \n    print("Ejecutando CanSeePlayer")\n    return ai.playerDetected \n  end,\n  MoveToPlayer = function(ai)\n    print("Ejecutando MoveToPlayer")\n    return true\n  end,\n  Attack = function(ai)\n    print("Ejecutando Attack")\n    return true\n  end,\n  GetPatrolPoint = function(ai)\n    print("Ejecutando GetPatrolPoint")\n    return true\n  end,\n  MoveToPatrol = function(ai)\n    print("Ejecutando MoveToPatrol")\n    return true\n  end\n}\n\nfunction BehaviorTree:ExecuteTask(taskName, ai)\n  if Tasks[taskName] then\n    return Tasks[taskName](ai)\n  end\n  return false\nend\n\nreturn BehaviorTree',
    tests: [
      { type: "code_contains", expected: "Selector", message: "Debes tener Selector raíz" },
      { type: "code_contains", expected: "Sequence", message: "Debes tener Sequence" },
      { type: "code_contains", expected: "AttackPlayer", message: "Debes tener secuencia AttackPlayer" },
      { type: "code_contains", expected: "Patrol", message: "Debes tener secuencia Patrol" },
      { type: "code_contains", expected: "Task", message: "Debes tener Tasks" },
      { type: "code_contains", expected: "ExecuteTask", message: "Debes implementar ExecuteTask" },
    ],
    hints: [
      "Selector ejecuta hijos hasta que uno tiene éxito",
      "Sequence ejecuta hijos hasta que uno falla",
      "Cada Task tiene función Execute que retorna true/false",
      "AttackPlayer: CanSeePlayer → MoveToPlayer → Attack",
      "Patrol: GetPatrolPoint → MoveToPatrol",
    ],
    difficulty: "advanced",
    xpReward: 90,
  },

  // ============================================
  // LECCIÓN 4: Combate Básico (Semana 4)
  // ============================================
  {
    id: "mes-06-leccion-4-ej-1",
    lessonId: "l6-4-combat",
    title: "Sistema de Ataque Básico",
    instructions: 'Implementa un sistema de ataque básico para el NPC.\n\n**Requisitos:**\n- `Attack(target)` debe verificar si el objetivo está en rango\n- Rango de ataque es 150 unidades\n- Si está en rango, aplica daño: target.health -= self.damage\n- Imprime "Atacando a [target] por [damage] daño"\n- Retorna true si el ataque fue exitoso\n\n**Pista:** Verifica distancia antes de atacar',
    starterCode: 'local CombatAI = {}\n\nfunction CombatAI:new()\n  local self = setmetatable({}, CombatAI)\n  self.damage = 25\n  self.attackRange = 150\n  self.attackCooldown = 1.5\n  self.lastAttackTime = 0\n  return self\nend\n\nfunction CombatAI:Attack(target)\n  -- Verifica rango y aplica daño\nend\n\nreturn CombatAI',
    solution: 'local CombatAI = {}\nCombatAI.__index = CombatAI\n\nfunction CombatAI:new()\n  local self = setmetatable({}, CombatAI)\n  self.damage = 25\n  self.attackRange = 150\n  self.attackCooldown = 1.5\n  self.lastAttackTime = 0\n  return self\nend\n\nfunction CombatAI:Attack(target, currentTime)\n  -- Verifica cooldown\n  if currentTime - self.lastAttackTime < self.attackCooldown then\n    print("Ataque en cooldown")\n    return false\n  end\n  \n  -- Verifica distancia\n  local distance = self:GetActorLocation():Distance(target:GetActorLocation())\n  \n  if distance <= self.attackRange then\n    -- Aplica daño\n    target.health = target.health - self.damage\n    print("Atacando a " .. target.name .. " por " .. self.damage .. " daño")\n    print(target.name .. " salud restante: " .. target.health)\n    \n    self.lastAttackTime = currentTime\n    return true\n  else\n    print("Objetivo fuera de rango (" .. math.floor(distance) .. " unidades)")\n    return false\n  end\nend\n\nreturn CombatAI',
    tests: [
      { type: "code_contains", expected: "attackRange", message: "Debes tener attackRange" },
      { type: "code_contains", expected: "damage", message: "Debes tener damage" },
      { type: "code_contains", expected: "attackCooldown", message: "Debes tener cooldown" },
      { type: "code_contains", expected: "Distance", message: "Debes verificar distancia" },
      { type: "code_contains", expected: "target.health", message: "Debes aplicar daño" },
    ],
    hints: [
      "Verifica cooldown antes de atacar",
      "Calcula distancia entre self y target",
      "Si distancia <= attackRange, aplica daño",
      "Actualiza lastAttackTime después del ataque",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-06-leccion-4-ej-2",
    lessonId: "l6-4-combat",
    title: "Sistema de Defensa y Flee Behavior",
    instructions: 'Implementa comportamiento de huida cuando la salud es baja.\n\n**Requisitos:**\n- `ShouldFlee()` retorna true si health < 30% del maxHealth\n- `FleeFrom(target)` calcula dirección opuesta al objetivo\n- Mueve el NPC en dirección contraria al jugador\n- Imprime "¡Salud baja! Huyendo" cuando active flee\n- Incluye sistema de defensa: reduce daño recibido si está en modo defensa\n\n**Pista:** Para huir, usa -forwardVector (dirección opuesta)',
    starterCode: 'local CombatAI = {}\n\nfunction CombatAI:new()\n  local self = setmetatable({}, CombatAI)\n  self.health = 100\n  self.maxHealth = 100\n  self.isDefending = false\n  return self\nend\n\nfunction CombatAI:ShouldFlee()\n  -- Retorna true si salud < 30%\nend\n\nfunction CombatAI:FleeFrom(target)\n  -- Calcula dirección opuesta y mueve\nend\n\nreturn CombatAI',
    solution: 'local CombatAI = {}\nCombatAI.__index = CombatAI\n\nfunction CombatAI:new()\n  local self = setmetatable({}, CombatAI)\n  self.health = 100\n  self.maxHealth = 100\n  self.isDefending = false\n  return self\nend\n\nfunction CombatAI:ShouldFlee()\n  local healthPercent = self.health / self.maxHealth\n  \n  if healthPercent < 0.3 then\n    print("¡Salud baja! Huyendo (" .. math.floor(healthPercent * 100) .. "%)")\n    return true\n  end\n  \n  return false\nend\n\nfunction CombatAI:FleeFrom(target)\n  local myLocation = self:GetActorLocation()\n  local targetLocation = target:GetActorLocation()\n  \n  -- Calcula dirección opuesta al objetivo\n  local fleeDirection = myLocation - targetLocation\n  fleeDirection = fleeDirection:GetSafeNormal()\n  \n  -- Mueve en dirección de huida\n  local moveSpeed = 400\n  local newLocation = myLocation + fleeDirection * moveSpeed * 0.016\n  \n  print("Huyendo en dirección: " .. tostring(fleeDirection))\n  self:SetActorLocation(newLocation)\nend\n\nfunction CombatAI:TakeDamage(amount)\n  if self.isDefending then\n    amount = amount * 0.5  -- 50% reducción en defensa\n    print("Bloqueando daño (reducido a " .. amount .. ")")\n  end\n  \n  self.health = math.max(0, self.health - amount)\n  print("Recibido " .. amount .. " daño, salud: " .. self.health)\n  \n  if self:ShouldFlee() then\n    print("Activando comportamiento de huida")\n  end\nend\n\nreturn CombatAI',
    tests: [
      { type: "code_contains", expected: "ShouldFlee", message: "Debes implementar ShouldFlee" },
      { type: "code_contains", expected: "FleeFrom", message: "Debes implementar FleeFrom" },
      { type: "code_contains", expected: "0.3", message: "Debes verificar 30% de salud" },
      { type: "code_contains", expected: "GetSafeNormal", message: "Debes normalizar dirección" },
      { type: "code_contains", expected: "TakeDamage", message: "Debes implementar TakeDamage" },
      { type: "code_contains", expected: "isDefending", message: "Debes tener modo defensa" },
    ],
    hints: [
      "ShouldFlee verifica health/maxHealth < 0.3",
      "FleeFrom calcula dirección opuesta: myLocation - targetLocation",
      "Normaliza la dirección con GetSafeNormal()",
      "TakeDamage reduce daño si isDefending es true",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },
  {
    id: "mes-06-leccion-4-ej-3",
    lessonId: "l6-4-combat",
    title: "Coordinación de Grupo de NPCs",
    instructions: 'Implementa coordinación entre múltiples NPCs guardias.\n\n**Requisitos:**\n- `AlertAllies()` debe notificar a todos los guardias cercanos\n- Radio de alerta es 1000 unidades\n- Cada guardia aliado debe cambiar a estado "Alert"\n- `RequestHelp(attackerLocation)` pide ayuda a aliados\n- Imprime "Guardia [id] pidiendo ayuda en [location]"\n\n**Pista:** Mantén una lista de todos los guardias activos',
    starterCode: 'local GuardSquad = {}\n\nfunction GuardSquad:new()\n  local self = setmetatable({}, GuardSquad)\n  self.guards = {}  -- Lista de todos los guardias\n  return self\nend\n\nfunction GuardSquad:AlertAllies(alertingGuard, attackerLocation)\n  -- Notifica a guardias cercanos (radio 1000)\nend\n\nfunction GuardSquad:RequestHelp(requester, attackerLocation)\n  -- Pide ayuda a todos los guardias\nend\n\nreturn GuardSquad',
    solution: 'local GuardSquad = {}\nGuardSquad.__index = GuardSquad\n\nfunction GuardSquad:new()\n  local self = setmetatable({}, GuardSquad)\n  self.guards = {}\n  return self\nend\n\nfunction GuardSquad:AddGuard(guard)\n  table.insert(self.guards, guard)\nend\n\nfunction GuardSquad:AlertAllies(alertingGuard, attackerLocation)\n  local alertRadius = 1000\n  local alertedCount = 0\n  \n  for _, guard in ipairs(self.guards) do\n    if guard ~= alertingGuard and guard.isActive then\n      local distance = alertingGuard:GetActorLocation():Distance(guard:GetActorLocation())\n      \n      if distance <= alertRadius then\n        guard:ChangeState("Alert")\n        guard.targetLocation = attackerLocation\n        alertedCount = alertedCount + 1\n      end\n    end\n  end\n  \n  print("Guardia " .. alertingGuard.id .. " alertó a " .. alertedCount .. " aliados")\nend\n\nfunction GuardSquad:RequestHelp(requester, attackerLocation)\n  print("Guardia " .. requester.id .. " pidiendo ayuda en " .. tostring(attackerLocation))\n  \n  -- Alertar a todos los aliados\n  self:AlertAllies(requester, attackerLocation)\n  \n  -- Cambiar todos a estado Chase\n  for _, guard in ipairs(self.guards) do\n    if guard ~= requester and guard.isActive then\n      local distance = requester:GetActorLocation():Distance(guard:GetActorLocation())\n      if distance <= 1000 then\n        guard:ChangeState("Chase")\n        guard.target = requester.target\n      end\n    end\n  end\nend\n\nreturn GuardSquad',
    tests: [
      { type: "code_contains", expected: "AlertAllies", message: "Debes implementar AlertAllies" },
      { type: "code_contains", expected: "RequestHelp", message: "Debes implementar RequestHelp" },
      { type: "code_contains", expected: "guards", message: "Debes tener lista de guardias" },
      { type: "code_contains", expected: "alertRadius", message: "Debes tener radio de alerta" },
      { type: "code_contains", expected: "1000", message: "Radio debe ser 1000 unidades" },
      { type: "code_contains", expected: "ChangeState", message: "Debes cambiar estado de aliados" },
    ],
    hints: [
      "Mantén lista self.guards con todos los guardias",
      "AlertAllies itera sobre guardias y verifica distancia",
      "Si distancia <= 1000, cambia a estado Alert",
      "RequestHelp llama a AlertAllies y cambia a Chase",
    ],
    difficulty: "advanced",
    xpReward: 85,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 6
  // ============================================
  {
    id: "mes-06-final-proyecto",
    lessonId: "l6-4-combat",
    title: "Proyecto: Smart Guards - Sistema de IA Completo",
    instructions: 'Crea el entregable del Mes 6: Demo "Smart Guards" con 5 guardias con IA completa.\n\n**Requisitos:**\n1. FSM con 4 estados:\n   - Idle: Patrulla área esperando\n   - Patrol: Mueve entre puntos de patrulla\n   - Alert: Investiga último sonido/visión\n   - Chase: Persigue activamente al jugador\n\n2. Sistema de Percepción:\n   - Visión con raycast y FOV de 120°\n   - Audición con radio de 500 unidades\n   - Última posición conocida del jugador\n\n3. Behavior Tree:\n   - Selector: AttackPlayer o Patrol\n   - Sequence Attack: CanSeePlayer → MoveToPlayer → Attack\n   - Sequence Patrol: GetPatrolPoint → MoveToPatrol\n\n4. Combate y Coordinación:\n   - Ataque con cooldown y daño\n   - Flee cuando salud < 30%\n   - AlertAllies cuando detecta jugador\n   - 5 guardias coordinados\n\n**Pista:** Integra todos los ejercicios anteriores',
    starterCode: '-- Smart Guards - Sistema de IA Completo\nlocal SmartGuards = {}\n\n-- 1. FSM\nlocal GuardFSM = {}\nGuardFSM.__index = GuardFSM\n\nfunction GuardFSM:new()\n  local self = setmetatable({}, GuardFSM)\n  self.currentState = "Idle"\n  self.states = { "Idle", "Patrol", "Alert", "Chase" }\n  return self\nend\n\n-- 2. Percepción\nlocal GuardPerception = {}\n\nfunction GuardPerception:Perceive(playerLocation)\n  -- Verifica visión y audición\nend\n\n-- 3. Behavior Tree\nlocal BehaviorTree = {\n  root = {\n    type = "Selector",\n    children = {}\n  }\n}\n\n-- 4. Combate\nlocal GuardCombat = {}\n\nfunction GuardCombat:Attack(target)\n  -- Ataca si está en rango\nend\n\n-- Sistema Principal\nfunction SmartGuards:Initialize()\n  -- Crea 5 guardias\nend\n\nreturn SmartGuards',
    solution: '-- Smart Guards - Sistema de IA Completo\nlocal SmartGuards = {}\n\n-- ============================================\n-- 1. FSM (Máquina de Estados Finitos)\n-- ============================================\nlocal GuardFSM = {}\nGuardFSM.__index = GuardFSM\n\nfunction GuardFSM:new()\n  local self = setmetatable({}, GuardFSM)\n  self.currentState = "Idle"\n  self.states = {\n    Idle = function(dt) print("Idle: Patrullando área...") end,\n    Patrol = function(dt) print("Patrol: Moviendo a punto") end,\n    Alert = function(dt) print("Alert: Investigando...") end,\n    Chase = function(dt) print("Chase: ¡Persiguiendo!") end\n  }\n  return self\nend\n\nfunction GuardFSM:ChangeState(newState)\n  print("Cambiando estado: " .. self.currentState .. " -> " .. newState)\n  self.currentState = newState\nend\n\nfunction GuardFSM:Update(deltaTime)\n  if self.states[self.currentState] then\n    self.states[self.currentState](deltaTime)\n  end\nend\n\n-- ============================================\n-- 2. PERCEPCIÓN\n-- ============================================\nlocal GuardPerception = {}\n\nfunction GuardPerception:Perceive(playerLocation)\n  local perception = { seen = false, heard = false, target = nil }\n  local guardLocation = self:GetActorLocation()\n  local distance = guardLocation:Distance(playerLocation)\n  \n  -- Visión (1000 unidades, FOV 120°)\n  if distance <= 1000 and self:IsInFieldOfView(playerLocation) then\n    perception.seen = true\n    perception.target = playerLocation\n    print("Veo al jugador")\n  end\n  \n  -- Audición (500 unidades)\n  if distance <= 500 then\n    perception.heard = true\n    if not perception.seen then\n      print("Escucho algo")\n    end\n  end\n  \n  return perception\nend\n\nfunction GuardPerception:IsInFieldOfView(targetLocation)\n  local forward = self:GetActorForwardVector()\n  local toTarget = (targetLocation - self:GetActorLocation()):GetSafeNormal()\n  return forward:Dot(toTarget) >= 0.5\nend\n\n-- ============================================\n-- 3. BEHAVIOR TREE\n-- ============================================\nlocal BehaviorTree = {\n  root = {\n    type = "Selector",\n    children = {\n      {\n        type = "Sequence",\n        name = "AttackPlayer",\n        children = {\n          { type = "Task", name = "CanSeePlayer" },\n          { type = "Task", name = "MoveToPlayer" },\n          { type = "Task", name = "Attack" }\n        }\n      },\n      {\n        type = "Sequence",\n        name = "Patrol",\n        children = {\n          { type = "Task", name = "GetPatrolPoint" },\n          { type = "Task", name = "MoveToPatrol" }\n        }\n      }\n    }\n  }\n}\n\n-- ============================================\n-- 4. COMBATE\n-- ============================================\nlocal GuardCombat = {}\nGuardCombat.__index = GuardCombat\n\nfunction GuardCombat:new()\n  local self = setmetatable({}, GuardCombat)\n  self.damage = 25\n  self.attackRange = 150\n  self.attackCooldown = 1.5\n  self.lastAttackTime = 0\n  self.health = 100\n  self.maxHealth = 100\n  return self\nend\n\nfunction GuardCombat:Attack(target, currentTime)\n  if currentTime - self.lastAttackTime >= self.attackCooldown then\n    local distance = self:GetActorLocation():Distance(target:GetActorLocation())\n    if distance <= self.attackRange then\n      target.health = target.health - self.damage\n      print("Atacando por " .. self.damage .. " daño")\n      self.lastAttackTime = currentTime\n      return true\n    end\n  end\n  return false\nend\n\nfunction GuardCombat:ShouldFlee()\n  return self.health / self.maxHealth < 0.3\nend\n\nfunction GuardCombat:FleeFrom(target)\n  local fleeDir = (self:GetActorLocation() - target:GetActorLocation()):GetSafeNormal()\n  self:SetActorLocation(self:GetActorLocation() + fleeDir * 400 * 0.016)\nend\n\n-- ============================================\n-- 5. SISTEMA PRINCIPAL\n-- ============================================\nfunction SmartGuards:Initialize()\n  self.guards = {}\n  \n  -- Crear 5 guardias\n  for i = 1, 5 do\n    local guard = {\n      id = i,\n      fsm = setmetatable({}, GuardFSM),\n      health = 100,\n      maxHealth = 100,\n      isActive = true,\n      patrolPoints = {\n        {x = 0, y = 0, z = 0},\n        {x = 100, y = 0, z = 0},\n        {x = 100, y = 0, z = 100}\n      },\n      currentPatrolIndex = 1\n    }\n    \n    -- Mixin de métodos\n    setmetatable(guard, { __index = function(t, k)\n      return GuardFSM[k] or GuardPerception[k] or GuardCombat[k]\n    end })\n    \n    table.insert(self.guards, guard)\n  end\n  \n  print("5 guardias inicializados")\nend\n\nfunction SmartGuards:AlertAllies(alertingGuard, attackerLocation)\n  for _, guard in ipairs(self.guards) do\n    if guard ~= alertingGuard and guard.isActive then\n      local distance = alertingGuard:GetActorLocation():Distance(guard:GetActorLocation())\n      if distance <= 1000 then\n        guard.fsm:ChangeState("Alert")\n        guard.targetLocation = attackerLocation\n      end\n    end\n  end\nend\n\nfunction SmartGuards:UpdateAll(deltaTime, currentTime)\n  for _, guard in ipairs(self.guards) do\n    -- Actualizar FSM\n    guard.fsm:Update(deltaTime)\n    \n    -- Verificar huida\n    if guard:ShouldFlee() then\n      guard.fsm:ChangeState("Flee")\n    end\n  end\nend\n\nreturn SmartGuards',
    tests: [
      { type: "code_contains", expected: "GuardFSM", message: "Debes tener GuardFSM" },
      { type: "code_contains", expected: "Idle", message: "Debes tener estado Idle" },
      { type: "code_contains", expected: "Patrol", message: "Debes tener estado Patrol" },
      { type: "code_contains", expected: "Alert", message: "Debes tener estado Alert" },
      { type: "code_contains", expected: "Chase", message: "Debes tener estado Chase" },
      { type: "code_contains", expected: "GuardPerception", message: "Debes tener sistema de percepción" },
      { type: "code_contains", expected: "BehaviorTree", message: "Debes tener BehaviorTree" },
      { type: "code_contains", expected: "GuardCombat", message: "Debes tener sistema de combate" },
      { type: "code_contains", expected: "Attack", message: "Debes implementar Attack" },
      { type: "code_contains", expected: "ShouldFlee", message: "Debes implementar ShouldFlee" },
      { type: "code_contains", expected: "AlertAllies", message: "Debes implementar AlertAllies" },
      { type: "code_contains", expected: "5 guardias", message: "Debes crear 5 guardias" },
    ],
    hints: [
      "FSM con 4 estados: Idle, Patrol, Alert, Chase",
      "Percepción con visión (raycast + FOV) y audición",
      "Behavior Tree con Selector y Sequences",
      "Combate con Attack, ShouldFlee, FleeFrom",
      "Coordinación con AlertAllies (radio 1000)",
      "5 guardias trabajando juntos",
    ],
    difficulty: "advanced",
    xpReward: 350,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes06Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes06Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes06Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
