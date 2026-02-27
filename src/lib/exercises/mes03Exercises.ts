import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 3: Comunicación entre Blueprints y Lua
// ============================================
// Basado en el plan de estudio:
// Semana 1: Binding BP-Lua - UFUNCTION export, UFUNCTIONs override en Lua
// Semana 2: Input en Lua - Enhanced Input System, bindings de acciones y ejes
// Semana 3: Delegates y eventos - crear, bind y dispatch desde Lua
// Semana 4: Mini-proyecto integrador - control completo de personaje en Lua
// ============================================
// Entregable del mes: Mini-juego 'Lua Controller' - personaje navegable en tercera persona
// ============================================

export const mes03Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: Binding BP-Lua (Semana 1)
  // ============================================
  {
    id: "mes-03-leccion-1-ej-1",
    lessonId: "l3-1-binding",
    title: "Exportar Función de Lua a Blueprint",
    instructions: 'Crea una función en Lua que pueda ser llamada desde Blueprint.\n\n**Requisitos:**\n- La función debe llamarse `MyFunction`\n- Debe recibir un parámetro `value` de tipo number\n- Debe retornar el valor multiplicado por 2\n- Usa la sintaxis correcta de UnLua para funciones exportadas\n\n**Pista:** En UnLua, las funciones se exportan automáticamente si están en la tabla de la clase',
    starterCode: 'local MyActor = {}\n\n-- Crea la función MyFunction aquí\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:MyFunction(value)\n  return value * 2\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "function MyActor:MyFunction", message: "Debes definir la función MyFunction" },
      { type: "code_contains", expected: "value", message: "La función debe recibir un parámetro value" },
      { type: "code_contains", expected: "return", message: "Debes retornar un valor" },
    ],
    hints: [
      "Las funciones en UnLua usan dos puntos: function Clase:Funcion()",
      "El primer parámetro es self (implícito con dos puntos)",
      "Retorna el valor con: return value * 2",
    ],
    difficulty: "beginner",
    xpReward: 40,
  },
  {
    id: "mes-03-leccion-1-ej-2",
    lessonId: "l3-1-binding",
    title: "Override de Función de Blueprint en Lua",
    instructions: 'Implementa una función que override una función de Blueprint desde Lua.\n\n**Requisitos:**\n- Override la función `ReceiveBeginPlay`\n- Dentro, llama a una función personalizada `InitializeActor`\n- `InitializeActor` debe imprimir "Actor inicializado"\n\n**Pista:** Las funciones de UE5 como ReceiveBeginPlay se override escribiéndolas en Lua',
    starterCode: 'local MyActor = {}\n\n-- Override ReceiveBeginPlay aquí\n\n-- Crea InitializeActor aquí\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  self:InitializeActor()\nend\n\nfunction MyActor:InitializeActor()\n  print("Actor inicializado")\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "ReceiveBeginPlay", message: "Debes override ReceiveBeginPlay" },
      { type: "code_contains", expected: "InitializeActor", message: "Debes crear la función InitializeActor" },
      { type: "code_contains", expected: "print", message: "Debes imprimir el mensaje" },
    ],
    hints: [
      "ReceiveBeginPlay se llama automáticamente cuando el Actor comienza",
      "Puedes llamar otras funciones con self:NombreFuncion()",
      "print() en UnLua se mapea a UE_LOG",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-03-leccion-1-ej-3",
    lessonId: "l3-1-binding",
    title: "Función con Múltiples Parámetros y Retorno",
    instructions: 'Crea una función que reciba múltiples parámetros y retorne múltiples valores.\n\n**Requisitos:**\n- La función `Calcular` debe recibir `a` y `b` (dos números)\n- Debe retornar 3 valores: suma, resta, y multiplicación\n- Imprime los resultados antes de retornar\n\n**Pista:** Lua soporta retornos múltiples nativamente',
    starterCode: 'local MyActor = {}\n\nfunction MyActor:Calcular(a, b)\n  -- Calcula y retorna los 3 valores\nend\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:Calcular(a, b)\n  local suma = a + b\n  local resta = a - b\n  local multiplicacion = a * b\n  \n  print("Suma: " .. suma)\n  print("Resta: " .. resta)\n  print("Multiplicación: " .. multiplicacion)\n  \n  return suma, resta, multiplicacion\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "function MyActor:Calcular", message: "Debes definir Calcular" },
      { type: "code_contains", expected: "a, b", message: "Debe recibir dos parámetros" },
      { type: "code_contains", expected: "return suma, resta, multiplicacion", message: "Debe retornar 3 valores" },
    ],
    hints: [
      "Lua permite retornar múltiples valores separados por comas",
      "Puedes imprimir con print() antes de retornar",
      "Concatena strings con ..",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },

  // ============================================
  // LECCIÓN 2: Input en Lua (Semana 2)
  // ============================================
  {
    id: "mes-03-leccion-2-ej-1",
    lessonId: "l3-2-input",
    title: "Binding de Acción de Input",
    instructions: 'Crea un binding para una acción de input en Lua.\n\n**Requisitos:**\n- En ReceiveBeginPlay, haz bind de la acción "Jump"\n- Usa `self:BindAction` con el estado `IE_Pressed`\n- La función callback debe imprimir "Saltando!"\n\n**Pista:** BindAction requiere: nombre de acción, evento, y función callback',
    starterCode: 'local MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  -- Bind de la acción Jump aquí\nend\n\nfunction MyCharacter:OnJump()\n  print("Saltando!")\nend\n\nreturn MyCharacter',
    solution: 'local MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  self:BindAction("Jump", "IE_Pressed", self, self.OnJump)\nend\n\nfunction MyCharacter:OnJump()\n  print("Saltando!")\nend\n\nreturn MyCharacter',
    tests: [
      { type: "code_contains", expected: "BindAction", message: "Debes usar BindAction" },
      { type: "code_contains", expected: '"Jump"', message: "Debes bind la acción Jump" },
      { type: "code_contains", expected: "IE_Pressed", message: "Debes usar IE_Pressed para el evento" },
    ],
    hints: [
      "BindAction sintaxis: self:BindAction(nombre, evento, target, funcion)",
      "IE_Pressed significa cuando se presiona la tecla",
      "El callback es self.OnJump (con punto, no dos puntos)",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-03-leccion-2-ej-2",
    lessonId: "l3-2-input",
    title: "Binding de Eje de Movimiento",
    instructions: 'Crea bindings para los ejes de movimiento Forward y Right.\n\n**Requisitos:**\n- Bind del eje "MoveForward" que llame a `OnMoveForward`\n- Bind del eje "MoveRight" que llame a `OnMoveRight`\n- Las funciones deben recibir el valor del eje (number)\n- Imprime el valor recibido en cada función\n\n**Pista:** Los ejes retornan un valor continuo entre -1 y 1',
    starterCode: 'local MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  -- Bind de MoveForward aquí\n  -- Bind de MoveRight aquí\nend\n\nfunction MyCharacter:OnMoveForward(value)\n  print("Forward: " .. value)\nend\n\nfunction MyCharacter:OnMoveRight(value)\n  print("Right: " .. value)\nend\n\nreturn MyCharacter',
    solution: 'local MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  self:BindAxis("MoveForward", self, self.OnMoveForward)\n  self:BindAxis("MoveRight", self, self.OnMoveRight)\nend\n\nfunction MyCharacter:OnMoveForward(value)\n  print("Forward: " .. value)\nend\n\nfunction MyCharacter:OnMoveRight(value)\n  print("Right: " .. value)\nend\n\nreturn MyCharacter',
    tests: [
      { type: "code_contains", expected: "BindAxis", message: "Debes usar BindAxis para ejes" },
      { type: "code_contains", expected: '"MoveForward"', message: "Debes bind MoveForward" },
      { type: "code_contains", expected: '"MoveRight"', message: "Debes bind MoveRight" },
    ],
    hints: [
      "BindAxis es para ejes continuos (a diferencia de BindAction para acciones)",
      "Los ejes reciben un valor: function OnMove(value)",
      "El valor va de -1 a 1",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-03-leccion-2-ej-3",
    lessonId: "l3-2-input",
    title: "Movimiento de Personaje con Input",
    instructions: 'Implementa movimiento completo de un personaje usando input.\n\n**Requisitos:**\n- En OnMoveForward, mueve el personaje hacia adelante usando `self:AddMovementInput`\n- En OnMoveRight, mueve el personaje hacia los lados\n- Usa `self:GetControlRotation()` para obtener la dirección correcta\n- Usa `FRotationMatrix` para obtener los vectores forward y right\n\n**Pista:** AddMovementInput(direccion, valor) mueve el personaje',
    starterCode: 'local MyCharacter = {}\n\nfunction MyCharacter:OnMoveForward(value)\n  -- Mueve hacia adelante\nend\n\nfunction MyCharacter:OnMoveRight(value)\n  -- Mueve hacia los lados\nend\n\nreturn MyCharacter',
    solution: 'local MyCharacter = {}\n\nfunction MyCharacter:OnMoveForward(value)\n  if value ~= 0 then\n    local rotation = self:GetControlRotation()\n    rotation.Pitch = 0\n    rotation.Roll = 0\n    local forward = FRotationMatrix(rotation):GetUnitAxis(1)\n    self:AddMovementInput(forward, value)\n  end\nend\n\nfunction MyCharacter:OnMoveRight(value)\n  if value ~= 0 then\n    local rotation = self:GetControlRotation()\n    rotation.Pitch = 0\n    rotation.Roll = 0\n    local right = FRotationMatrix(rotation):GetUnitAxis(0)\n    self:AddMovementInput(right, value)\n  end\nend\n\nreturn MyCharacter',
    tests: [
      { type: "code_contains", expected: "GetControlRotation", message: "Debes obtener la rotación del controlador" },
      { type: "code_contains", expected: "FRotationMatrix", message: "Debes usar FRotationMatrix" },
      { type: "code_contains", expected: "AddMovementInput", message: "Debes añadir input de movimiento" },
    ],
    hints: [
      "GetControlRotation() retorna la rotación de la cámara",
      "FRotationMatrix(rotacion):GetUnitAxis(1) da el vector forward",
      "AddMovementInput(direccion, valor) aplica el movimiento",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },

  // ============================================
  // LECCIÓN 3: Delegates y Eventos (Semana 3)
  // ============================================
  {
    id: "mes-03-leccion-3-ej-1",
    lessonId: "l3-3-delegates",
    title: "Crear y Dispatch un Delegate",
    instructions: 'Crea un delegate personalizado y hazle dispatch.\n\n**Requisitos:**\n- Crea un delegate `OnHealthChanged` en la tabla del Actor\n- En ReceiveBeginPlay, inicializa el delegate\n- Crea una función `ChangeHealth` que haga dispatch del delegate\n- El dispatch debe pasar el nuevo valor de salud\n\n**Pista:** Los delegates en UE5 se pueden crear y dispatch desde Lua',
    starterCode: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  -- Inicializa el delegate aquí\nend\n\nfunction MyActor:ChangeHealth(newHealth)\n  -- Dispatch del delegate\nend\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  self.OnHealthChanged = self:CreateDelegate()\nend\n\nfunction MyActor:ChangeHealth(newHealth)\n  self.Health = newHealth\n  if self.OnHealthChanged then\n    self:DispatchDelegate(self.OnHealthChanged, newHealth)\n  end\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "OnHealthChanged", message: "Debes crear el delegate OnHealthChanged" },
      { type: "code_contains", expected: "CreateDelegate", message: "Debes crear el delegate" },
      { type: "code_contains", expected: "DispatchDelegate", message: "Debes hacer dispatch del delegate" },
    ],
    hints: [
      "CreateDelegate() crea un nuevo delegate",
      "DispatchDelegate(delegate, parametros) envía el evento",
      "Guarda el delegate en self.OnHealthChanged",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-03-leccion-3-ej-2",
    lessonId: "l3-3-delegates",
    title: "Bind a Delegate Existente",
    instructions: 'Haz bind a un delegate existente de un componente.\n\n**Requisitos:**\n- Asume que self.Button es un UButton de UMG\n- En ReceiveBeginPlay, haz bind al evento `OnClicked` del botón\n- El callback debe imprimir "Botón clickeado!"\n- Usa `self.Button.OnClicked:AddDynamic`\n\n**Pista:** AddDynamic requiere el target y la función callback',
    starterCode: 'local MyWidget = {}\n\nfunction MyWidget:ReceiveBeginPlay()\n  -- Bind del OnClicked aquí\nend\n\nfunction MyWidget:OnButtonClicked()\n  print("Botón clickeado!")\nend\n\nreturn MyWidget',
    solution: 'local MyWidget = {}\n\nfunction MyWidget:ReceiveBeginPlay()\n  if self.Button then\n    self.Button.OnClicked:AddDynamic(self, self.OnButtonClicked)\n  end\nend\n\nfunction MyWidget:OnButtonClicked()\n  print("Botón clickeado!")\nend\n\nreturn MyWidget',
    tests: [
      { type: "code_contains", expected: "OnClicked", message: "Debes usar el evento OnClicked" },
      { type: "code_contains", expected: "AddDynamic", message: "Debes usar AddDynamic para bind" },
      { type: "code_contains", expected: "self.Button", message: "Debes acceder al Button" },
    ],
    hints: [
      "OnClicked es un delegate del UButton",
      "AddDynamic(self, callback) bind el evento",
      "Verifica que self.Button existe con if",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-03-leccion-3-ej-3",
    lessonId: "l3-3-delegates",
    title: "Event Dispatcher Personalizado",
    instructions: 'Crea un Event Dispatcher completo con bind y dispatch.\n\n**Requisitos:**\n- Crea un dispatcher `OnMissionComplete` en ReceiveBeginPlay\n- Implementa una función `CompleteMission` que haga dispatch\n- El dispatcher debe pasar el nombre de la misión completada\n- Imprime "Misión completada: [nombre]" en el dispatch\n\n**Pista:** Los Event Dispatchers son como delegates pero más potentes',
    starterCode: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  -- Crea el dispatcher aquí\nend\n\nfunction MyActor:CompleteMission(missionName)\n  -- Dispatch con el nombre de la misión\nend\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  self.OnMissionComplete = self:CreateDelegate()\nend\n\nfunction MyActor:CompleteMission(missionName)\n  print("Misión completada: " .. missionName)\n  if self.OnMissionComplete then\n    self:DispatchDelegate(self.OnMissionComplete, missionName)\n  end\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "OnMissionComplete", message: "Debes crear OnMissionComplete" },
      { type: "code_contains", expected: "CompleteMission", message: "Debes definir CompleteMission" },
      { type: "code_contains", expected: "missionName", message: "Debe recibir el nombre de la misión" },
    ],
    hints: [
      "CreateDelegate() crea el dispatcher",
      "DispatchDelegate envía el evento con parámetros",
      "Imprime antes de hacer dispatch",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },

  // ============================================
  // LECCIÓN 4: Proyecto Integrador (Semana 4)
  // ============================================
  {
    id: "mes-03-leccion-4-ej-1",
    lessonId: "l3-4-proyecto",
    title: "Personaje con Input y Movimiento",
    instructions: 'Crea un personaje controlable completo con input.\n\n**Requisitos:**\n- Bind de acciones: Jump (espacio), Sprint (shift)\n- Bind de ejes: MoveForward, MoveRight\n- Implementa movimiento con AddMovementInput\n- Implementa salto con LaunchCharacter\n- Sprint aumenta la velocidad al 150%\n\n**Pista:** Combina todo lo aprendido en las semanas anteriores',
    starterCode: 'local MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  -- Bind de acciones y ejes aquí\n  self.IsSprinting = false\nend\n\nfunction MyCharacter:OnJump()\n  -- Implementa el salto\nend\n\nfunction MyCharacter:OnSprint(pressed)\n  -- Implementa sprint\nend\n\nfunction MyCharacter:OnMoveForward(value)\n  -- Implementa movimiento forward\nend\n\nfunction MyCharacter:OnMoveRight(value)\n  -- Implementa movimiento right\nend\n\nreturn MyCharacter',
    solution: 'local MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  self:BindAction("Jump", "IE_Pressed", self, self.OnJump)\n  self:BindAction("Sprint", "IE_Pressed", self, self.OnSprint)\n  self:BindAction("Sprint", "IE_Released", self, self.OnSprint)\n  self:BindAxis("MoveForward", self, self.OnMoveForward)\n  self:BindAxis("MoveRight", self, self.OnMoveRight)\n  self.IsSprinting = false\n  self.BaseSpeed = 600\nend\n\nfunction MyCharacter:OnJump()\n  self:LaunchCharacter(FVector(0, 0, self.CharacterMovement.JumpZVelocity))\nend\n\nfunction MyCharacter:OnSprint(pressed)\n  self.IsSprinting = pressed\n  if self.CharacterMovement then\n    if self.IsSprinting then\n      self.CharacterMovement.MaxWalkSpeed = self.BaseSpeed * 1.5\n    else\n      self.CharacterMovement.MaxWalkSpeed = self.BaseSpeed\n    end\n  end\nend\n\nfunction MyCharacter:OnMoveForward(value)\n  if value ~= 0 then\n    local rotation = self:GetControlRotation()\n    rotation.Pitch = 0\n    rotation.Roll = 0\n    local forward = FRotationMatrix(rotation):GetUnitAxis(1)\n    self:AddMovementInput(forward, value)\n  end\nend\n\nfunction MyCharacter:OnMoveRight(value)\n  if value ~= 0 then\n    local rotation = self:GetControlRotation()\n    rotation.Pitch = 0\n    rotation.Roll = 0\n    local right = FRotationMatrix(rotation):GetUnitAxis(0)\n    self:AddMovementInput(right, value)\n  end\nend\n\nreturn MyCharacter',
    tests: [
      { type: "code_contains", expected: 'BindAction("Jump"', message: "Debes bind la acción Jump" },
      { type: "code_contains", expected: 'BindAction("Sprint"', message: "Debes bind la acción Sprint" },
      { type: "code_contains", expected: "BindAxis", message: "Debes bind los ejes" },
      { type: "code_contains", expected: "LaunchCharacter", message: "Debes implementar el salto" },
      { type: "code_contains", expected: "AddMovementInput", message: "Debes implementar movimiento" },
    ],
    hints: [
      "BindAction para acciones (Jump, Sprint)",
      "BindAxis para ejes continuos (MoveForward, MoveRight)",
      "LaunchCharacter(vector) hace saltar al personaje",
      "Sprint modifica MaxWalkSpeed al 150%",
    ],
    difficulty: "advanced",
    xpReward: 100,
  },
  {
    id: "mes-03-leccion-4-ej-2",
    lessonId: "l3-4-proyecto",
    title: "Interacción con Objetos",
    instructions: 'Añade sistema de interacción al personaje.\n\n**Requisitos:**\n- Bind de acción "Interact" (tecla E)\n- En OnInteract, haz un line trace hacia adelante\n- Si detectas un objeto interactuable, llama a su función Interact()\n- Imprime "Interactuando con: [nombre del objeto]"\n\n**Pista:** Usa K2_SetActorLocation o LineTraceByChannel',
    starterCode: 'local MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  self:BindAction("Interact", "IE_Pressed", self, self.OnInteract)\n  self.InteractDistance = 200\nend\n\nfunction MyCharacter:OnInteract()\n  -- Implementa la interacción con line trace\nend\n\nreturn MyCharacter',
    solution: 'local MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  self:BindAction("Interact", "IE_Pressed", self, self.OnInteract)\n  self.InteractDistance = 200\nend\n\nfunction MyCharacter:OnInteract()\n  local start = self:GetActorLocation()\n  local rotation = self:GetControlRotation()\n  local forward = FRotationMatrix(rotation):GetUnitAxis(1)\n  local endPos = start + forward * self.InteractDistance\n  \n  local hitResult = self:LineTraceByChannel(start, endPos)\n  \n  if hitResult and hitResult.Actor then\n    print("Interactuando con: " .. hitResult.Actor:GetName())\n    if hitResult.Actor.Interact then\n      hitResult.Actor:Interact()\n    end\n  end\nend\n\nreturn MyCharacter',
    tests: [
      { type: "code_contains", expected: 'BindAction("Interact"', message: "Debes bind la acción Interact" },
      { type: "code_contains", expected: "LineTraceByChannel", message: "Debes hacer line trace" },
      { type: "code_contains", expected: "GetActorLocation", message: "Debes obtener la posición" },
      { type: "code_contains", expected: "hitResult.Actor", message: "Debes verificar el actor golpeado" },
    ],
    hints: [
      "LineTraceByChannel(start, end) detecta objetos",
      "GetControlRotation() da la dirección de la cámara",
      "forward * distancia da el punto final del trace",
      "Verifica hitResult.Actor antes de interactuar",
    ],
    difficulty: "advanced",
    xpReward: 100,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 3
  // ============================================
  {
    id: "mes-03-final-proyecto",
    lessonId: "l3-4-proyecto",
    title: "Proyecto: Lua Controller - Personaje Completo",
    instructions: 'Crea el entregable del Mes 3: "Lua Controller" - un personaje completamente controlado por Lua.\n\n**Requisitos:**\n1. Movimiento completo:\n   - MoveForward y MoveRight con GetControlRotation\n   - Sprint (150% velocidad)\n   - Jump con LaunchCharacter\n\n2. Interacción:\n   - Line trace para detectar objetos\n   - Llamar función Interact() en objetos\n   - Distancia de interacción: 200 unidades\n\n3. Sistema de Salud:\n   - Variable Health (100 base)\n   - Delegate OnHealthChanged\n   - Función TakeHealth(damage)\n   - Función Heal(amount)\n\n4. UI Feedback:\n   - Imprimir salud actual cuando cambia\n   - Imprimir mensajes de interacción\n\n**Pista:** Integra todo lo aprendido en las 4 semanas',
    starterCode: '-- Lua Controller - Personaje Completo\nlocal MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  -- Inicializa variables\n  self.Health = 100\n  self.IsSprinting = false\n  self.BaseSpeed = 600\n  self.InteractDistance = 200\n  \n  -- Bind de acciones y ejes\n  \n  -- Crea delegate de salud\nend\n\nfunction MyCharacter:OnJump()\n  -- Salto\nend\n\nfunction MyCharacter:OnSprint(pressed)\n  -- Sprint\nend\n\nfunction MyCharacter:OnMoveForward(value)\n  -- Movimiento forward\nend\n\nfunction MyCharacter:OnMoveRight(value)\n  -- Movimiento right\nend\n\nfunction MyCharacter:OnInteract()\n  -- Interacción\nend\n\nfunction MyCharacter:TakeHealth(damage)\n  -- Recibir daño\nend\n\nfunction MyCharacter:Heal(amount)\n  -- Curar\nend\n\nreturn MyCharacter',
    solution: '-- Lua Controller - Personaje Completo\nlocal MyCharacter = {}\n\nfunction MyCharacter:ReceiveBeginPlay()\n  self.Health = 100\n  self.IsSprinting = false\n  self.BaseSpeed = 600\n  self.InteractDistance = 200\n  \n  -- Bind de acciones\n  self:BindAction("Jump", "IE_Pressed", self, self.OnJump)\n  self:BindAction("Sprint", "IE_Pressed", self, self.OnSprint)\n  self:BindAction("Sprint", "IE_Released", self, self.OnSprint)\n  self:BindAction("Interact", "IE_Pressed", self, self.OnInteract)\n  \n  -- Bind de ejes\n  self:BindAxis("MoveForward", self, self.OnMoveForward)\n  self:BindAxis("MoveRight", self, self.OnMoveRight)\n  \n  -- Delegate de salud\n  self.OnHealthChanged = self:CreateDelegate()\n  \n  print("Lua Controller inicializado!")\nend\n\nfunction MyCharacter:OnJump()\n  self:LaunchCharacter(FVector(0, 0, self.CharacterMovement.JumpZVelocity))\nend\n\nfunction MyCharacter:OnSprint(pressed)\n  self.IsSprinting = pressed\n  if self.CharacterMovement then\n    if self.IsSprinting then\n      self.CharacterMovement.MaxWalkSpeed = self.BaseSpeed * 1.5\n    else\n      self.CharacterMovement.MaxWalkSpeed = self.BaseSpeed\n    end\n  end\nend\n\nfunction MyCharacter:OnMoveForward(value)\n  if value ~= 0 then\n    local rotation = self:GetControlRotation()\n    rotation.Pitch = 0\n    rotation.Roll = 0\n    local forward = FRotationMatrix(rotation):GetUnitAxis(1)\n    self:AddMovementInput(forward, value)\n  end\nend\n\nfunction MyCharacter:OnMoveRight(value)\n  if value ~= 0 then\n    local rotation = self:GetControlRotation()\n    rotation.Pitch = 0\n    rotation.Roll = 0\n    local right = FRotationMatrix(rotation):GetUnitAxis(0)\n    self:AddMovementInput(right, value)\n  end\nend\n\nfunction MyCharacter:OnInteract()\n  local start = self:GetActorLocation()\n  local rotation = self:GetControlRotation()\n  local forward = FRotationMatrix(rotation):GetUnitAxis(1)\n  local endPos = start + forward * self.InteractDistance\n  \n  local hitResult = self:LineTraceByChannel(start, endPos)\n  \n  if hitResult and hitResult.Actor then\n    print("Interactuando con: " .. hitResult.Actor:GetName())\n    if hitResult.Actor.Interact then\n      hitResult.Actor:Interact()\n    end\n  end\nend\n\nfunction MyCharacter:TakeHealth(damage)\n  self.Health = math.max(0, self.Health - damage)\n  print("Salud actual: " .. self.Health)\n  if self.OnHealthChanged then\n    self:DispatchDelegate(self.OnHealthChanged, self.Health)\n  end\n  if self.Health <= 0 then\n    print("¡Has muerto!")\n  end\nend\n\nfunction MyCharacter:Heal(amount)\n  self.Health = math.min(100, self.Health + amount)\n  print("Salud actual: " .. self.Health)\n  if self.OnHealthChanged then\n    self:DispatchDelegate(self.OnHealthChanged, self.Health)\n  end\nend\n\nreturn MyCharacter',
    tests: [
      { type: "code_contains", expected: 'BindAction("Jump"', message: "Debes bind Jump" },
      { type: "code_contains", expected: 'BindAction("Sprint"', message: "Debes bind Sprint" },
      { type: "code_contains", expected: 'BindAction("Interact"', message: "Debes bind Interact" },
      { type: "code_contains", expected: "BindAxis", message: "Debes bind los ejes de movimiento" },
      { type: "code_contains", expected: "LaunchCharacter", message: "Debes implementar salto" },
      { type: "code_contains", expected: "AddMovementInput", message: "Debes implementar movimiento" },
      { type: "code_contains", expected: "LineTraceByChannel", message: "Debes implementar interacción" },
      { type: "code_contains", expected: "CreateDelegate", message: "Debes crear delegate de salud" },
      { type: "code_contains", expected: "TakeHealth", message: "Debes implementar TakeHealth" },
      { type: "code_contains", expected: "Heal", message: "Debes implementar Heal" },
    ],
    hints: [
      "Bind todas las acciones en ReceiveBeginPlay",
      "Usa GetControlRotation y FRotationMatrix para dirección",
      "LineTraceByChannel detecta objetos para interacción",
      "CreateDelegate y DispatchDelegate para el sistema de salud",
      "math.max(0, ...) y math.min(100, ...) para límites",
    ],
    difficulty: "advanced",
    xpReward: 200,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes03Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes03Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes03Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
