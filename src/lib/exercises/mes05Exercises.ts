import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 5: Sistema de Diálogos e Interfaz de Usuario
// ============================================
// Basado en el plan de estudio:
// Semana 1: UMG desde Lua - crear widgets, bindear datos, mostrar/ocultar
// Semana 2: Sistema de diálogos - estructura JSON/tabla de conversación, parser
// Semana 3: HUD completo - barras de vida/mana, minimapa, notificaciones
// Semana 4: Polish de UI - transiciones, animaciones, accesibilidad
// ============================================
// Entregable del mes: Demo 'Story Engine' - NPC con 15+ líneas de diálogo ramificado,
// HUD funcional conectado a stats del jugador, sistema de notificaciones
// ============================================

export const mes05Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: UMG desde Lua (Semana 1)
  // ============================================
  {
    id: "mes-05-leccion-1-ej-1",
    lessonId: "l5-1-umg",
    title: "Crear Widget Básico desde Lua",
    instructions: 'Crea un widget UMG básico desde Lua.\n\n**Requisitos:**\n- En ReceiveBeginPlay, crea un widget con `self:CreateWidget(WidgetClass)`\n- Añade el widget al viewport con `widget:AddToViewport()`\n- Imprime "Widget creado" después de añadirlo\n\n**Pista:** CreateWidget requiere la clase del widget como parámetro',
    starterCode: 'local MyPlayerController = {}\n\nfunction MyPlayerController:ReceiveBeginPlay()\n  -- Crea y muestra el widget aquí\nend\n\nreturn MyPlayerController',
    solution: 'local MyPlayerController = {}\n\nfunction MyPlayerController:ReceiveBeginPlay()\n  local widget = self:CreateWidget(UMyWidgetClass)\n  widget:AddToViewport()\n  print("Widget creado")\nend\n\nreturn MyPlayerController',
    tests: [
      { type: "code_contains", expected: "CreateWidget", message: "Debes usar CreateWidget" },
      { type: "code_contains", expected: "AddToViewport", message: "Debes añadir el widget al viewport" },
      { type: "code_contains", expected: "print", message: "Debes imprimir confirmación" },
    ],
    hints: [
      "CreateWidget(WidgetClass) crea la instancia del widget",
      "AddToViewport() hace visible el widget en pantalla",
      "El widget debe guardarse en una variable",
    ],
    difficulty: "beginner",
    xpReward: 40,
  },
  {
    id: "mes-05-leccion-1-ej-2",
    lessonId: "l5-1-umg",
    title: "Actualizar Texto de Widget",
    instructions: 'Actualiza el texto de un TextBlock en un widget.\n\n**Requisitos:**\n- Obtén referencia al TextBlock con `self.Widget.TextBlock`\n- Usa `SetText("nuevo texto")` para cambiar el texto\n- Crea una función `UpdateScore(score)` que actualice la puntuación\n- El texto debe mostrar "Score: [score]"\n\n**Pista:** Los widgets de UMG tienen sus propiedades accesibles desde Lua',
    starterCode: 'local MyWidget = {}\n\nfunction MyWidget:UpdateScore(score)\n  -- Actualiza el TextBlock con la puntuación\nend\n\nreturn MyWidget',
    solution: 'local MyWidget = {}\n\nfunction MyWidget:UpdateScore(score)\n  if self.TextBlock then\n    self.TextBlock:SetText("Score: " .. tostring(score))\n    print("Puntuación actualizada: " .. score)\n  end\nend\n\nreturn MyWidget',
    tests: [
      { type: "code_contains", expected: "SetText", message: "Debes usar SetText" },
      { type: "code_contains", expected: "self.TextBlock", message: "Debes acceder al TextBlock" },
      { type: "code_contains", expected: "Score:", message: "El texto debe contener 'Score:'" },
      { type: "code_contains", expected: "tostring(score)", message: "Debes convertir score a string" },
    ],
    hints: [
      "Accede al TextBlock con self.TextBlock o self:GetWidgetFromName()",
      "SetText(string) cambia el texto mostrado",
      "Usa tostring() para convertir números a string",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-05-leccion-1-ej-3",
    lessonId: "l5-1-umg",
    title: "Mostrar/Ocultar Widget con Animación",
    instructions: 'Implementa funciones para mostrar y ocultar un widget con fade.\n\n**Requisitos:**\n- `ShowWidget()` debe hacer fade in de transparencia 0 a 1\n- `HideWidget()` debe hacer fade out de transparencia 1 a 0\n- Usa `SetRenderOpacity(opacity)` para cambiar transparencia\n- Imprime el estado del widget\n\n**Pista:** La opacidad va de 0 (invisible) a 1 (visible)',
    starterCode: 'local MyWidget = {}\n\nfunction MyWidget:ShowWidget()\n  -- Fade in: opacidad 0 a 1\nend\n\nfunction MyWidget:HideWidget()\n  -- Fade out: opacidad 1 a 0\nend\n\nreturn MyWidget',
    solution: 'local MyWidget = {}\n\nfunction MyWidget:ShowWidget()\n  self:SetRenderOpacity(1.0)\n  self:SetVisibility("Visible")\n  print("Widget mostrado")\nend\n\nfunction MyWidget:HideWidget()\n  self:SetRenderOpacity(0.0)\n  self:SetVisibility("Hidden")\n  print("Widget oculto")\nend\n\nreturn MyWidget',
    tests: [
      { type: "code_contains", expected: "SetRenderOpacity", message: "Debes usar SetRenderOpacity" },
      { type: "code_contains", expected: "SetVisibility", message: "Debes usar SetVisibility" },
      { type: "code_contains", expected: "ShowWidget", message: "Debes implementar ShowWidget" },
      { type: "code_contains", expected: "HideWidget", message: "Debes implementar HideWidget" },
    ],
    hints: [
      "SetRenderOpacity(1.0) hace el widget completamente visible",
      "SetRenderOpacity(0.0) hace el widget completamente transparente",
      "SetVisibility('Visible') o ('Hidden') controla visibilidad",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },

  // ============================================
  // LECCIÓN 2: Sistema de Diálogos (Semana 2)
  // ============================================
  {
    id: "mes-05-leccion-2-ej-1",
    lessonId: "l5-2-dialogue",
    title: "Crear Estructura de Diálogo Ramificado",
    instructions: 'Crea una estructura de datos para diálogos ramificados.\n\n**Requisitos:**\n- Crea una tabla `DialogueTree` con al menos 3 nodos de conversación\n- Cada nodo debe tener: id, text (texto del NPC), responses (tabla de respuestas)\n- Cada respuesta debe tener: text, nextNodeId\n- El nodo inicial debe tener id "start"\n\n**Pista:** Los diálogos ramificados son como un árbol de decisiones',
    starterCode: '-- Crea el árbol de diálogo aquí\nlocal DialogueTree = {\n  \n}\n\nreturn DialogueTree',
    solution: 'local DialogueTree = {\n  start = {\n    id = "start",\n    text = "¡Hola, viajero! ¿En qué puedo ayudarte?",\n    responses = {\n      { text = "¿Quién eres?", nextNodeId = "who_are_you" },\n      { text = "Necesito suministros", nextNodeId = "supplies" },\n      { text = "Adiós", nextNodeId = "end" }\n    }\n  },\n  who_are_you = {\n    id = "who_are_you",\n    text = "Soy el mercader de este pueblo. Vendo los mejores objetos de la región.",\n    responses = {\n      { text = "Muéstrame tus productos", nextNodeId = "supplies" },\n      { text = "Gracias por la información", nextNodeId = "start" }\n    }\n  },\n  supplies = {\n    id = "supplies",\n    text = "Tengo pociones, armas y armaduras. ¿Qué te interesa?",\n    responses = {\n      { text = "Volver al inicio", nextNodeId = "start" },\n      { text = "Adiós", nextNodeId = "end" }\n    }\n  },\n  ["end"] = {\n    id = "end",\n    text = "¡Que tengas buen viaje!",\n    responses = {}\n  }\n}\n\nreturn DialogueTree',
    tests: [
      { type: "code_contains", expected: "DialogueTree", message: "Debes crear DialogueTree" },
      { type: "code_contains", expected: "start", message: "Debes tener nodo start" },
      { type: "code_contains", expected: "text", message: "Cada nodo debe tener text" },
      { type: "code_contains", expected: "responses", message: "Cada nodo debe tener responses" },
      { type: "code_contains", expected: "nextNodeId", message: "Cada respuesta debe tener nextNodeId" },
    ],
    hints: [
      "Cada nodo es una tabla con id, text, y responses",
      "responses es una tabla de tablas con text y nextNodeId",
      "El nodo final debe tener responses vacío",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-05-leccion-2-ej-2",
    lessonId: "l5-2-dialogue",
    title: "Parser de Diálogos",
    instructions: 'Crea una función que parsee y muestre el diálogo actual.\n\n**Requisitos:**\n- `ShowDialogueNode(nodeId)` debe obtener el nodo de DialogueTree\n- Debe imprimir el texto del NPC: "NPC: [text]"\n- Debe imprimir las opciones numeradas: "1. [response.text]"\n- Debe retornar el nodo actual para procesamiento posterior\n\n**Pista:** Itera sobre responses con ipairs',
    starterCode: 'local DialogueTree = {\n  start = {\n    text = "¡Hola!",\n    responses = {\n      { text = "Hola", nextNodeId = "end" }\n    }\n  }\n}\n\nfunction ShowDialogueNode(nodeId)\n  -- Obtiene y muestra el nodo de diálogo\nend\n\nreturn ShowDialogueNode',
    solution: 'local DialogueTree = {\n  start = {\n    text = "¡Hola!",\n    responses = {\n      { text = "Hola", nextNodeId = "end" }\n    }\n  }\n}\n\nfunction ShowDialogueNode(nodeId)\n  local node = DialogueTree[nodeId]\n  \n  if not node then\n    print("Nodo no encontrado: " .. nodeId)\n    return nil\n  end\n  \n  print("NPC: " .. node.text)\n  print("")\n  \n  if #node.responses > 0 then\n    print("Opciones:")\n    for i, response in ipairs(node.responses) do\n      print(i .. ". " .. response.text)\n    end\n  end\n  \n  return node\nend\n\nreturn ShowDialogueNode',
    tests: [
      { type: "code_contains", expected: "function ShowDialogueNode", message: "Debes definir ShowDialogueNode" },
      { type: "code_contains", expected: "DialogueTree[nodeId]", message: "Debes acceder al nodo" },
      { type: "code_contains", expected: "NPC:", message: "Debes imprimir con prefijo 'NPC:'" },
      { type: "code_contains", expected: "ipairs", message: "Debes iterar con ipairs" },
    ],
    hints: [
      "Accede al nodo con DialogueTree[nodeId]",
      "Imprime node.text con prefijo 'NPC:'",
      "Itera sobre node.responses con ipairs",
      "Imprime cada opción numerada: i .. '. ' .. response.text",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-05-leccion-2-ej-3",
    lessonId: "l5-2-dialogue",
    title: "Sistema de Selección de Respuestas",
    instructions: 'Implementa un sistema para seleccionar respuestas y avanzar en el diálogo.\n\n**Requisitos:**\n- `SelectResponse(nodeId, responseIndex)` debe seleccionar una respuesta\n- Debe validar que el índice sea válido\n- Debe retornar el nextNodeId de la respuesta seleccionada\n- Si el nextNodeId es "end", debe imprimir "Diálogo finalizado"\n- Debe manejar índices inválidos con mensaje de error\n\n**Pista:** Valida responseIndex >= 1 y <= #node.responses',
    starterCode: 'local DialogueTree = {\n  start = {\n    text = "¡Hola!",\n    responses = {\n      { text = "Hola", nextNodeId = "end" }\n    }\n  }\n}\n\nfunction SelectResponse(nodeId, responseIndex)\n  -- Selecciona respuesta y avanza el diálogo\nend\n\nreturn SelectResponse',
    solution: 'local DialogueTree = {\n  start = {\n    text = "¡Hola!",\n    responses = {\n      { text = "Hola", nextNodeId = "end" }\n    }\n  }\n}\n\nfunction SelectResponse(nodeId, responseIndex)\n  local node = DialogueTree[nodeId]\n  \n  if not node then\n    print("Nodo no encontrado: " .. nodeId)\n    return nil\n  end\n  \n  if responseIndex < 1 or responseIndex > #node.responses then\n    print("Índice inválido: " .. responseIndex)\n    return nil\n  end\n  \n  local selectedResponse = node.responses[responseIndex]\n  print("Jugador: " .. selectedResponse.text)\n  \n  if selectedResponse.nextNodeId == "end" then\n    print("Diálogo finalizado")\n    return nil\n  end\n  \n  return selectedResponse.nextNodeId\nend\n\nreturn SelectResponse',
    tests: [
      { type: "code_contains", expected: "function SelectResponse", message: "Debes definir SelectResponse" },
      { type: "code_contains", expected: "responseIndex", message: "Debes validar responseIndex" },
      { type: "code_contains", expected: "nextNodeId", message: "Debes retornar nextNodeId" },
      { type: "code_contains", expected: "Diálogo finalizado", message: "Debes detectar final del diálogo" },
    ],
    hints: [
      "Valida que responseIndex esté entre 1 y #node.responses",
      "Accede a la respuesta con node.responses[responseIndex]",
      "Si nextNodeId es 'end', el diálogo termina",
      "Retorna nextNodeId para continuar el diálogo",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },

  // ============================================
  // LECCIÓN 3: HUD Completo (Semana 3)
  // ============================================
  {
    id: "mes-05-leccion-3-ej-1",
    lessonId: "l5-3-hud",
    title: "Crear Barra de Vida Dinámica",
    instructions: 'Crea una barra de vida que se actualice dinámicamente.\n\n**Requisitos:**\n- `UpdateHealthBar(currentHealth, maxHealth)` debe actualizar la barra\n- Calcula el porcentaje: currentHealth / maxHealth\n- Usa `ProgressBar:SetPercent(percent)` para actualizar\n- Actualiza el texto con "currentHealth / maxHealth"\n- Si la vida es < 25%, imprime "¡Salud crítica!"\n\n**Pista:** El percent va de 0.0 a 1.0',
    starterCode: 'local MyHUD = {}\n\nfunction MyHUD:UpdateHealthBar(currentHealth, maxHealth)\n  -- Actualiza la barra de vida\nend\n\nreturn MyHUD',
    solution: 'local MyHUD = {}\n\nfunction MyHUD:UpdateHealthBar(currentHealth, maxHealth)\n  local percent = currentHealth / maxHealth\n  \n  if self.ProgressBar then\n    self.ProgressBar:SetPercent(percent)\n  end\n  \n  if self.HealthText then\n    self.HealthText:SetText(currentHealth .. " / " .. maxHealth)\n  end\n  \n  if percent < 0.25 then\n    print("¡Salud crítica!")\n  end\n  \n  return percent\nend\n\nreturn MyHUD',
    tests: [
      { type: "code_contains", expected: "SetPercent", message: "Debes usar SetPercent" },
      { type: "code_contains", expected: "currentHealth / maxHealth", message: "Debes calcular el porcentaje" },
      { type: "code_contains", expected: "SetText", message: "Debes actualizar el texto" },
      { type: "code_contains", expected: "0.25", message: "Debes verificar salud crítica (< 25%)" },
    ],
    hints: [
      "Calcula percent = currentHealth / maxHealth",
      "SetPercent(percent) actualiza la barra (0.0 a 1.0)",
      "SetText muestra el valor numérico",
      "Si percent < 0.25, la salud es crítica",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-05-leccion-3-ej-2",
    lessonId: "l5-3-hud",
    title: "Sistema de Notificaciones",
    instructions: 'Crea un sistema de notificaciones que muestre mensajes temporales.\n\n**Requisitos:**\n- `ShowNotification(message, duration)` debe mostrar un mensaje\n- Debe actualizar el texto del notification widget\n- Debe hacer fade in (opacidad 1)\n- Debe programar fade out después de `duration` segundos\n- Imprime la notificación en consola\n\n**Pista:** Usa task.wait(duration) para el delay',
    starterCode: 'local MyHUD = {}\n\nfunction MyHUD:ShowNotification(message, duration)\n  -- Muestra notificación temporal\nend\n\nreturn MyHUD',
    solution: 'local MyHUD = {}\n\nfunction MyHUD:ShowNotification(message, duration)\n  if not self.NotificationWidget then\n    print("NotificationWidget no encontrado")\n    return\n  end\n  \n  -- Actualizar texto\n  self.NotificationWidget.Text:SetText(message)\n  \n  -- Fade in\n  self.NotificationWidget:SetRenderOpacity(1.0)\n  self.NotificationWidget:SetVisibility("Visible")\n  \n  print("Notificación: " .. message)\n  \n  -- Programar fade out\n  task.spawn(function()\n    task.wait(duration)\n    self.NotificationWidget:SetRenderOpacity(0.0)\n    self.NotificationWidget:SetVisibility("Hidden")\n  end)\nend\n\nreturn MyHUD',
    tests: [
      { type: "code_contains", expected: "SetText", message: "Debes actualizar el texto" },
      { type: "code_contains", expected: "SetRenderOpacity", message: "Debes controlar opacidad" },
      { type: "code_contains", expected: "task.wait", message: "Debes usar task.wait para el delay" },
      { type: "code_contains", expected: "task.spawn", message: "Debes usar task.spawn para async" },
    ],
    hints: [
      "Actualiza el texto con SetText(message)",
      "Fade in con SetRenderOpacity(1.0)",
      "Usa task.spawn para no bloquear el hilo principal",
      "task.wait(duration) espera la duración especificada",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-05-leccion-3-ej-3",
    lessonId: "l5-3-hud",
    title: "HUD Conectado a Stats del Jugador",
    instructions: 'Conecta el HUD a las estadísticas del personaje.\n\n**Requisitos:**\n- `InitializeHUD(playerStats)` debe recibir las stats del jugador\n- Debe actualizar HealthBar con la vida actual/máxima\n- Debe actualizar ManaBar con el maná actual/máximo\n- Debe actualizar LevelText con el nivel\n- Debe imprimir "HUD inicializado"\n\n**Pista:** playerStats tiene: health, maxHealth, mana, maxMana, level',
    starterCode: 'local MyHUD = {}\n\nfunction MyHUD:InitializeHUD(playerStats)\n  -- playerStats: { health, maxHealth, mana, maxMana, level }\n  -- Inicializa todos los elementos del HUD\nend\n\nreturn MyHUD',
    solution: 'local MyHUD = {}\n\nfunction MyHUD:InitializeHUD(playerStats)\n  -- Actualizar barra de vida\n  if self.HealthBar and playerStats.health and playerStats.maxHealth then\n    local healthPercent = playerStats.health / playerStats.maxHealth\n    self.HealthBar:SetPercent(healthPercent)\n    self.HealthText:SetText(playerStats.health .. " / " .. playerStats.maxHealth)\n  end\n  \n  -- Actualizar barra de maná\n  if self.ManaBar and playerStats.mana and playerStats.maxMana then\n    local manaPercent = playerStats.mana / playerStats.maxMana\n    self.ManaBar:SetPercent(manaPercent)\n    self.ManaText:SetText(playerStats.mana .. " / " .. playerStats.maxMana)\n  end\n  \n  -- Actualizar nivel\n  if self.LevelText and playerStats.level then\n    self.LevelText:SetText("Nivel " .. playerStats.level)\n  end\n  \n  print("HUD inicializado")\nend\n\nreturn MyHUD',
    tests: [
      { type: "code_contains", expected: "InitializeHUD", message: "Debes definir InitializeHUD" },
      { type: "code_contains", expected: "playerStats", message: "Debes recibir playerStats" },
      { type: "code_contains", expected: "SetPercent", message: "Debes actualizar barras" },
      { type: "code_contains", expected: "SetText", message: "Debes actualizar textos" },
      { type: "code_contains", expected: "HUD inicializado", message: "Debes imprimir confirmación" },
    ],
    hints: [
      "playerStats contiene health, maxHealth, mana, maxMana, level",
      "Calcula porcentajes: health / maxHealth",
      "Actualiza HealthBar y ManaBar con SetPercent",
      "Actualiza LevelText con 'Nivel ' .. level",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },

  // ============================================
  // LECCIÓN 4: Polish de UI (Semana 4)
  // ============================================
  {
    id: "mes-05-leccion-4-ej-1",
    lessonId: "l5-4-polish",
    title: "Animación de Transición de Panel",
    instructions: 'Crea una animación de slide para un panel.\n\n**Requisitos:**\n- `SlideIn(panel, duration)` debe animar el panel de fuera a dentro\n- Usa interpolación lineal: from 0 to 1\n- Actualiza la posición X del panel en cada frame\n- Usa DeltaTime para animación suave\n- Imprime "Slide in completado" al finalizar\n\n**Pista:** position = startPos + (endPos - startPos) * t',
    starterCode: 'local MyHUD = {}\n\nfunction MyHUD:SlideIn(panel, duration)\n  -- Anima el panel de fuera a dentro\nend\n\nreturn MyHUD',
    solution: 'local MyHUD = {}\n\nfunction MyHUD:SlideIn(panel, duration)\n  local startPos = -500  -- Fuera de pantalla\n  local endPos = 0       -- Posición final\n  local elapsedTime = 0\n  \n  task.spawn(function()\n    while elapsedTime < duration do\n      local t = elapsedTime / duration\n      local currentPos = startPos + (endPos - startPos) * t\n      \n      panel:SetPosition(currentPos, 0)\n      elapsedTime = elapsedTime + 0.016  -- ~60 FPS\n      task.wait(0.016)\n    end\n    \n    panel:SetPosition(endPos, 0)\n    print("Slide in completado")\n  end)\nend\n\nreturn MyHUD',
    tests: [
      { type: "code_contains", expected: "SlideIn", message: "Debes definir SlideIn" },
      { type: "code_contains", expected: "elapsedTime", message: "Debes trackear tiempo transcurrido" },
      { type: "code_contains", expected: "SetPosition", message: "Debes actualizar posición" },
      { type: "code_contains", expected: "task.wait", message: "Debes usar task.wait" },
      { type: "code_contains", expected: "Slide in completado", message: "Debes imprimir al finalizar" },
    ],
    hints: [
      "Calcula t = elapsedTime / duration (0 a 1)",
      "Interpola: currentPos = startPos + (endPos - startPos) * t",
      "Actualiza posición con SetPosition(currentPos, 0)",
      "Usa task.wait(0.016) para ~60 FPS",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },
  {
    id: "mes-05-leccion-4-ej-2",
    lessonId: "l5-4-polish",
    title: "Sistema de Color por Estado de Salud",
    instructions: 'Implementa cambio de color de la barra de vida según el estado.\n\n**Requisitos:**\n- `UpdateHealthColor(percent)` debe cambiar el color de la barra\n- Si percent >= 0.6: verde (0, 1, 0)\n- Si percent >= 0.3: amarillo (1, 1, 0)\n- Si percent < 0.3: rojo (1, 0, 0)\n- Usa `SetColor(FLinearColor(r, g, b, a))`\n\n**Pista:** FLinearColor usa valores de 0 a 1 para R, G, B, A',
    starterCode: 'local MyHUD = {}\n\nfunction MyHUD:UpdateHealthColor(percent)\n  -- Cambia color según porcentaje de salud\nend\n\nreturn MyHUD',
    solution: 'local MyHUD = {}\n\nfunction MyHUD:UpdateHealthColor(percent)\n  local r, g, b = 1, 0, 0  -- Default rojo\n  \n  if percent >= 0.6 then\n    r, g, b = 0, 1, 0  -- Verde\n  elseif percent >= 0.3 then\n    r, g, b = 1, 1, 0  -- Amarillo\n  else\n    r, g, b = 1, 0, 0  -- Rojo\n  end\n  \n  if self.HealthBar then\n    self.HealthBar:SetFillColorAndOpacity(FLinearColor(r, g, b, 1))\n  end\n  \n  return {r = r, g = g, b = b}\nend\n\nreturn MyHUD',
    tests: [
      { type: "code_contains", expected: "UpdateHealthColor", message: "Debes definir UpdateHealthColor" },
      { type: "code_contains", expected: "SetFillColorAndOpacity", message: "Debes usar SetFillColorAndOpacity" },
      { type: "code_contains", expected: "FLinearColor", message: "Debes usar FLinearColor" },
      { type: "code_contains", expected: "0.6", message: "Debes verificar 60% para verde" },
      { type: "code_contains", expected: "0.3", message: "Debes verificar 30% para amarillo" },
    ],
    hints: [
      "Si percent >= 0.6: verde (0, 1, 0)",
      "Si percent >= 0.3: amarillo (1, 1, 0)",
      "Si percent < 0.3: rojo (1, 0, 0)",
      "FLinearColor(r, g, b, a) con valores 0-1",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-05-leccion-4-ej-3",
    lessonId: "l5-4-polish",
    title: "Accesibilidad: Opciones de Tamaño de Texto",
    instructions: 'Implementa opciones de accesibilidad para tamaño de texto.\n\n**Requisitos:**\n- `SetTextSize(sizePreset)` debe cambiar el tamaño de todos los textos\n- sizePreset puede ser: "small" (12), "medium" (16), "large" (24)\n- Debe actualizar HealthText, ManaText, LevelText, NotificationText\n- Debe guardar la preferencia en self.textSizePreference\n- Imprime "Tamaño de texto: [preset]"\n\n**Pista:** Usa SetFontSize(size) en cada TextBlock',
    starterCode: 'local MyHUD = {}\n\nfunction MyHUD:SetTextSize(sizePreset)\n  -- Cambia tamaño de texto según preset\nend\n\nreturn MyHUD',
    solution: 'local MyHUD = {}\n\nfunction MyHUD:SetTextSize(sizePreset)\n  local sizeMap = {\n    small = 12,\n    medium = 16,\n    large = 24\n  }\n  \n  local size = sizeMap[sizePreset]\n  \n  if not size then\n    print("Preset inválido: " .. sizePreset)\n    return\n  end\n  \n  -- Actualizar todos los textos\n  if self.HealthText then\n    self.HealthText:SetFontSize(size)\n  end\n  if self.ManaText then\n    self.ManaText:SetFontSize(size)\n  end\n  if self.LevelText then\n    self.LevelText:SetFontSize(size)\n  end\n  if self.NotificationText then\n    self.NotificationText:SetFontSize(size)\n  end\n  \n  self.textSizePreference = sizePreset\n  print("Tamaño de texto: " .. sizePreset)\nend\n\nreturn MyHUD',
    tests: [
      { type: "code_contains", expected: "SetTextSize", message: "Debes definir SetTextSize" },
      { type: "code_contains", expected: "sizeMap", message: "Debes tener mapa de tamaños" },
      { type: "code_contains", expected: "SetFontSize", message: "Debes usar SetFontSize" },
      { type: "code_contains", expected: "textSizePreference", message: "Debes guardar la preferencia" },
      { type: "code_contains", expected: "small", message: "Debes tener preset 'small'" },
      { type: "code_contains", expected: "medium", message: "Debes tener preset 'medium'" },
      { type: "code_contains", expected: "large", message: "Debes tener preset 'large'" },
    ],
    hints: [
      "Crea sizeMap con small=12, medium=16, large=24",
      "Obtén size = sizeMap[sizePreset]",
      "Aplica SetFontSize(size) a todos los TextBlocks",
      "Guarda la preferencia en self.textSizePreference",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 5
  // ============================================
  {
    id: "mes-05-final-proyecto",
    lessonId: "l5-4-polish",
    title: "Proyecto: Story Engine - Sistema de Diálogos Completo con HUD",
    instructions: 'Crea el entregable del Mes 5: Demo "Story Engine" completa.\n\n**Requisitos:**\n1. Sistema de Diálogos (15+ líneas):\n   - DialogueTree con al menos 5 nodos\n   - ShowDialogueNode(nodeId) para mostrar\n   - SelectResponse(nodeId, index) para seleccionar\n   - Ramificación real con múltiples finales\n\n2. HUD Funcional:\n   - HealthBar con porcentaje y texto\n   - ManaBar con porcentaje y texto\n   - LevelText con nivel\n   - Conexión a stats del jugador\n\n3. Sistema de Notificaciones:\n   - ShowNotification(message, duration)\n   - Fade in/out automático\n   - Mensajes de eventos de diálogo\n\n4. Polish:\n   - Colores por estado de salud\n   - Animación de slide para paneles\n   - Opciones de tamaño de texto\n\n**Pista:** Integra todos los ejercicios anteriores',
    starterCode: '-- Story Engine - Sistema Completo\nlocal StoryEngine = {}\n\n-- 1. Sistema de Diálogos\nlocal DialogueTree = {\n  start = {\n    id = "start",\n    text = "¡Hola, aventurero!",\n    responses = {}\n  }\n}\n\nfunction StoryEngine:ShowDialogueNode(nodeId)\n  -- Muestra nodo de diálogo\nend\n\nfunction StoryEngine:SelectResponse(nodeId, index)\n  -- Selecciona respuesta\nend\n\n-- 2. HUD\nfunction StoryEngine:InitializeHUD(playerStats)\n  -- Inicializa HUD con stats\nend\n\nfunction StoryEngine:UpdateHealthBar(current, max)\n  -- Actualiza barra de vida\nend\n\n-- 3. Notificaciones\nfunction StoryEngine:ShowNotification(message, duration)\n  -- Muestra notificación\nend\n\n-- 4. Polish\nfunction StoryEngine:UpdateHealthColor(percent)\n  -- Cambia color por estado\nend\n\nreturn StoryEngine',
    solution: '-- Story Engine - Sistema Completo\nlocal StoryEngine = {}\n\n-- ============================================\n-- 1. SISTEMA DE DIÁLOGOS\n-- ============================================\nlocal DialogueTree = {\n  start = {\n    id = "start",\n    text = "¡Hola, aventurero! Busco ayuda con un problema.",\n    responses = {\n      { text = "¿Qué problema tienes?", nextNodeId = "problem" },\n      { text = "No tengo tiempo", nextNodeId = "no_time" },\n      { text = "Adiós", nextNodeId = "end" }\n    }\n  },\n  problem = {\n    id = "problem",\n    text = "Un dragón está atacando nuestro pueblo. ¿Podrías ayudarnos?",\n    responses = {\n      { text = "¡Sí, lo derrotaré!", nextNodeId = "accept" },\n      { text = "Es muy peligroso", nextNodeId = "refuse" }\n    }\n  },\n  accept = {\n    id = "accept",\n    text = "¡Gracias! Toma esta espada como regalo.",\n    responses = {\n      { text = "Gracias, adiós", nextNodeId = "end" }\n    }\n  },\n  refuse = {\n    id = "refuse",\n    text = "Entiendo. Buena suerte en tu camino.",\n    responses = {\n      { text = "Adiós", nextNodeId = "end" }\n    }\n  },\n  no_time = {\n    id = "no_time",\n    text = "Comprendo. Quizás otra vez.",\n    responses = {\n      { text = "Adiós", nextNodeId = "end" }\n    }\n  },\n  ["end"] = {\n    id = "end",\n    text = "¡Que los dioses te acompañen!",\n    responses = {}\n  }\n}\n\nfunction StoryEngine:ShowDialogueNode(nodeId)\n  local node = DialogueTree[nodeId]\n  \n  if not node then\n    print("Nodo no encontrado: " .. nodeId)\n    return nil\n  end\n  \n  print("NPC: " .. node.text)\n  \n  if #node.responses > 0 then\n    print("\\nOpciones:")\n    for i, response in ipairs(node.responses) do\n      print(i .. ". " .. response.text)\n    end\n    \n    -- Mostrar notificación\n    self:ShowNotification("Nuevo diálogo", 2)\n  end\n  \n  return node\nend\n\nfunction StoryEngine:SelectResponse(nodeId, index)\n  local node = DialogueTree[nodeId]\n  \n  if not node or index < 1 or index > #node.responses then\n    return nil\n  end\n  \n  local response = node.responses[index]\n  print("Jugador: " .. response.text)\n  \n  if response.nextNodeId == "end" then\n    print("Diálogo finalizado")\n    self:ShowNotification("Diálogo terminado", 2)\n    return nil\n  end\n  \n  return response.nextNodeId\nend\n\n-- ============================================\n-- 2. HUD\n-- ============================================\nfunction StoryEngine:InitializeHUD(playerStats)\n  self.playerStats = playerStats or { health = 100, maxHealth = 100, mana = 50, maxMana = 50, level = 1 }\n  \n  self:UpdateHealthBar(self.playerStats.health, self.playerStats.maxHealth)\n  self:UpdateManaBar(self.playerStats.mana, self.playerStats.maxMana)\n  self:UpdateLevelText(self.playerStats.level)\n  \n  print("HUD inicializado")\nend\n\nfunction StoryEngine:UpdateHealthBar(current, max)\n  local percent = current / max\n  \n  if self.HealthBar then\n    self.HealthBar:SetPercent(percent)\n  end\n  if self.HealthText then\n    self.HealthText:SetText(current .. " / " .. max)\n  end\n  \n  self:UpdateHealthColor(percent)\n  return percent\nend\n\nfunction StoryEngine:UpdateManaBar(current, max)\n  local percent = current / max\n  \n  if self.ManaBar then\n    self.ManaBar:SetPercent(percent)\n  end\n  if self.ManaText then\n    self.ManaText:SetText(current .. " / " .. max)\n  end\n  \n  return percent\nend\n\nfunction StoryEngine:UpdateLevelText(level)\n  if self.LevelText then\n    self.LevelText:SetText("Nivel " .. level)\n  end\nend\n\n-- ============================================\n-- 3. NOTIFICACIONES\n-- ============================================\nfunction StoryEngine:ShowNotification(message, duration)\n  if not self.NotificationWidget then\n    print("Notificación: " .. message)\n    return\n  end\n  \n  self.NotificationWidget.Text:SetText(message)\n  self.NotificationWidget:SetRenderOpacity(1.0)\n  self.NotificationWidget:SetVisibility("Visible")\n  \n  task.spawn(function()\n    task.wait(duration)\n    self.NotificationWidget:SetRenderOpacity(0.0)\n    self.NotificationWidget:SetVisibility("Hidden")\n  end)\nend\n\n-- ============================================\n-- 4. POLISH\n-- ============================================\nfunction StoryEngine:UpdateHealthColor(percent)\n  local r, g, b = 1, 0, 0\n  \n  if percent >= 0.6 then\n    r, g, b = 0, 1, 0\n  elseif percent >= 0.3 then\n    r, g, b = 1, 1, 0\n  end\n  \n  if self.HealthBar then\n    self.HealthBar:SetFillColorAndOpacity(FLinearColor(r, g, b, 1))\n  end\nend\n\nfunction StoryEngine:SlideIn(panel, duration)\n  local startPos = -500\n  local endPos = 0\n  local elapsedTime = 0\n  \n  task.spawn(function()\n    while elapsedTime < duration do\n      local t = elapsedTime / duration\n      local currentPos = startPos + (endPos - startPos) * t\n      panel:SetPosition(currentPos, 0)\n      elapsedTime = elapsedTime + 0.016\n      task.wait(0.016)\n    end\n    print("Animación completada")\n  end)\nend\n\nfunction StoryEngine:SetTextSize(sizePreset)\n  local sizeMap = { small = 12, medium = 16, large = 24 }\n  local size = sizeMap[sizePreset]\n  \n  if not size then\n    return\n  end\n  \n  for _, text in ipairs({self.HealthText, self.ManaText, self.LevelText}) do\n    if text then\n      text:SetFontSize(size)\n    end\n  end\n  \n  self.textSizePreference = sizePreset\nend\n\nreturn StoryEngine',
    tests: [
      { type: "code_contains", expected: "DialogueTree", message: "Debes tener DialogueTree" },
      { type: "code_contains", expected: "start", message: "Debes tener nodo start" },
      { type: "code_contains", expected: "ShowDialogueNode", message: "Debes implementar ShowDialogueNode" },
      { type: "code_contains", expected: "SelectResponse", message: "Debes implementar SelectResponse" },
      { type: "code_contains", expected: "InitializeHUD", message: "Debes implementar InitializeHUD" },
      { type: "code_contains", expected: "UpdateHealthBar", message: "Debes implementar UpdateHealthBar" },
      { type: "code_contains", expected: "ShowNotification", message: "Debes implementar ShowNotification" },
      { type: "code_contains", expected: "UpdateHealthColor", message: "Debes implementar UpdateHealthColor" },
      { type: "code_contains", expected: "SetPercent", message: "Debes usar SetPercent para barras" },
      { type: "code_contains", expected: "task.spawn", message: "Debes usar task.spawn para async" },
      { type: "code_contains", expected: "FLinearColor", message: "Debes usar FLinearColor para colores" },
    ],
    hints: [
      "Crea DialogueTree con al menos 5 nodos",
      "Implementa ShowDialogueNode y SelectResponse",
      "HUD debe tener HealthBar, ManaBar, LevelText",
      "Notificaciones con fade in/out automático",
      "Colores por estado: verde (>60%), amarillo (>30%), rojo (<30%)",
    ],
    difficulty: "advanced",
    xpReward: 300,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes05Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes05Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes05Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
