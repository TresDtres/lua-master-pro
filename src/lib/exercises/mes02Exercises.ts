import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 2: POO en Lua + Primeros Pasos en UE5
// ============================================
// Basado en el plan de estudio:
// Semana 1: POO en Lua - clases, herencia, polimorfismo
// Semana 2: Setup UnLua - instalación y configuración
// Semana 3: Ciclo de vida - BeginPlay, Tick, EndPlay
// Semana 4: Interacciones básicas - mover actores, cambiar materiales
// ============================================

export const mes02Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: POO en Lua
  // ============================================
  {
    id: "mes-02-leccion-1-ej-1",
    lessonId: "l2-1-poo",
    title: "Crear una Clase Básica",
    instructions: 'Crea una clase llamada "Persona" usando el patrón de POO de Lua.\n\n**Requisitos:**\n- La clase debe tener un constructor `new`\n- Debe tener una propiedad `nombre`\n- Debe tener una propiedad `edad`\n- El constructor debe recibir `nombre` y `edad` como parámetros\n\n**Pista:** Usa `Clase = {}` y `Clase.__index = Clase`',
    starterCode: '-- Crea tu clase Persona aquí\n\n',
    solution: 'local Persona = {}\nPersona.__index = Persona\n\nfunction Persona:new(nombre, edad)\n  local self = setmetatable({}, Persona)\n  self.nombre = nombre\n  self.edad = edad\n  return self\nend\n\nreturn Persona',
    tests: [
      { type: "code_contains", expected: "__index", message: "Debes usar __index para el patrón de clase" },
      { type: "code_contains", expected: "setmetatable", message: "Debes usar setmetatable" },
      { type: "code_contains", expected: "function Persona:new", message: "Debes definir el constructor new" },
    ],
    hints: [
      "El patrón básico es: Clase = {}, luego Clase.__index = Clase",
      "El constructor usa setmetatable({}, Clase)",
      "Retorna self al final del constructor",
    ],
    difficulty: "beginner",
    xpReward: 40,
  },
  {
    id: "mes-02-leccion-1-ej-2",
    lessonId: "l2-1-poo",
    title: "Método de Instancia",
    instructions: 'Añade un método `saludar` a la clase Persona que imprima "Hola, soy [nombre]".\n\n**Requisitos:**\n- El método debe usar `self.nombre`\n- Debe imprimir el mensaje con print()\n\n**Código base:**\n```lua\nlocal Persona = {}\nPersona.__index = Persona\n\nfunction Persona:new(nombre)\n  local self = setmetatable({}, Persona)\n  self.nombre = nombre\n  return self\nend\n\n-- Añade el método saludar aquí\n```',
    starterCode: 'local Persona = {}\nPersona.__index = Persona\n\nfunction Persona:new(nombre)\n  local self = setmetatable({}, Persona)\n  self.nombre = nombre\n  return self\nend\n\n-- Añade el método saludar aquí\n\n',
    solution: 'local Persona = {}\nPersona.__index = Persona\n\nfunction Persona:new(nombre)\n  local self = setmetatable({}, Persona)\n  self.nombre = nombre\n  return self\nend\n\nfunction Persona:saludar()\n  print("Hola, soy " .. self.nombre)\nend\n\nreturn Persona',
    tests: [
      { type: "code_contains", expected: "function Persona:saludar", message: "Debes definir el método saludar" },
      { type: "code_contains", expected: "self.nombre", message: "Debes usar self.nombre" },
      { type: "code_contains", expected: "print", message: "Debes usar print para mostrar el mensaje" },
    ],
    hints: [
      "Los métodos de instancia usan dos puntos: function Clase:metodo()",
      "Accede a las propiedades con self.propiedad",
      "Concatena strings con ..",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-02-leccion-1-ej-3",
    lessonId: "l2-1-poo",
    title: "Herencia con Metatables",
    instructions: 'Crea una clase "Estudiante" que herede de "Persona".\n\n**Requisitos:**\n- Estudiante debe heredar de Persona\n- Debe tener una propiedad adicional `carrera`\n- El constructor debe recibir `nombre`, `edad`, y `carrera`\n\n**Pista:** Usa `setmetatable(Estudiante, Persona)`',
    starterCode: 'local Persona = {}\nPersona.__index = Persona\n\nfunction Persona:new(nombre, edad)\n  local self = setmetatable({}, Persona)\n  self.nombre = nombre\n  self.edad = edad\n  return self\nend\n\n-- Crea la clase Estudiante que hereda de Persona\n\n',
    solution: 'local Persona = {}\nPersona.__index = Persona\n\nfunction Persona:new(nombre, edad)\n  local self = setmetatable({}, Persona)\n  self.nombre = nombre\n  self.edad = edad\n  return self\nend\n\nlocal Estudiante = {}\nEstudiante.__index = Estudiante\nsetmetatable(Estudiante, Persona)\n\nfunction Estudiante:new(nombre, edad, carrera)\n  local self = setmetatable({}, Estudiante)\n  self.nombre = nombre\n  self.edad = edad\n  self.carrera = carrera\n  return self\nend\n\nreturn Estudiante',
    tests: [
      { type: "code_contains", expected: "setmetatable(Estudiante, Persona)", message: "Debes establecer la herencia con setmetatable" },
      { type: "code_contains", expected: "self.carrera", message: "Debes tener la propiedad carrera" },
      { type: "code_contains", expected: "function Estudiante:new", message: "Debes definir el constructor de Estudiante" },
    ],
    hints: [
      "Para heredar: setmetatable(ClaseHija, ClasePadre)",
      "También necesitas Estudiante.__index = Estudiante",
      "El constructor de Estudiante debe llamar al del padre o replicar la lógica",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },

  // ============================================
  // LECCIÓN 2: Setup UnLua en UE5
  // ============================================
  {
    id: "mes-02-leccion-2-ej-1",
    lessonId: "l2-2-unlua",
    title: "Estructura de Script UnLua",
    instructions: 'Crea la estructura básica de un script Lua para UnLua en UE5.\n\n**Requisitos:**\n- Debe tener una tabla `MyActor` que represente la clase\n- Debe implementar la función `ReceiveBeginPlay`\n- Debe implementar la función `ReceiveTick`\n- Debe retornar la tabla al final\n\n**Pista:** En UnLua, las funciones del ciclo de vida comienzan con "Receive"',
    starterCode: '-- Estructura básica de UnLua\n\n',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  print("Actor iniciado!")\nend\n\nfunction MyActor:ReceiveTick(DeltaTime)\n  -- Lógica por frame\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "MyActor = {}", message: "Debes crear una tabla para la clase" },
      { type: "code_contains", expected: "ReceiveBeginPlay", message: "Debes implementar ReceiveBeginPlay" },
      { type: "code_contains", expected: "ReceiveTick", message: "Debes implementar ReceiveTick" },
      { type: "code_contains", expected: "return", message: "Debes retornar la tabla al final" },
    ],
    hints: [
      "La estructura es: local MyActor = {}",
      "Las funciones usan dos puntos: function MyActor:ReceiveBeginPlay()",
      "No olvides retornar la tabla: return MyActor",
    ],
    difficulty: "beginner",
    xpReward: 40,
  },
  {
    id: "mes-02-leccion-2-ej-2",
    lessonId: "l2-2-unlua",
    title: "Logging en UnLua",
    instructions: 'Implementa logging en UnLua usando UE_LOG.\n\n**Requisitos:**\n- En ReceiveBeginPlay, imprime "Actor iniciado: " seguido del nombre\n- Usa `self:GetName()` para obtener el nombre del Actor\n- Usa `print()` que en UnLua se mapea a UE_LOG\n\n**Pista:** `self` en UnLua se refiere al Actor de UE5',
    starterCode: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  -- Imprime el nombre del actor\nend\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  print("Actor iniciado: " .. self:GetName())\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "self:GetName()", message: "Debes usar self:GetName()" },
      { type: "code_contains", expected: "print", message: "Debes usar print para logging" },
      { type: "output_contains", expected: "Actor iniciado", message: "El mensaje debe contener 'Actor iniciado'" },
    ],
    hints: [
      "En UnLua, self se refiere al Actor de UE5",
      "GetNombre() es un método del Actor",
      "print() en UnLua se mapea a UE_LOG",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },

  // ============================================
  // LECCIÓN 3: Ciclo de Vida (BeginPlay/Tick/EndPlay)
  // ============================================
  {
    id: "mes-02-leccion-3-ej-1",
    lessonId: "l2-3-lifecycle",
    title: "Contador de Frames con Tick",
    instructions: 'Crea un script que cuente cuántos frames han pasado desde BeginPlay.\n\n**Requisitos:**\n- En ReceiveBeginPlay, inicializa `self.FrameCount = 0`\n- En ReceiveTick, incrementa `self.FrameCount` en 1\n- Cada 60 frames (aprox 1 segundo), imprime el contador\n\n**Pista:** Usa `math.mod(self.FrameCount, 60) == 0` para verificar cada 60 frames',
    starterCode: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  -- Inicializa el contador\nend\n\nfunction MyActor:ReceiveTick(DeltaTime)\n  -- Incrementa y muestra cada 60 frames\nend\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  self.FrameCount = 0\n  print("Contador iniciado!")\nend\n\nfunction MyActor:ReceiveTick(DeltaTime)\n  self.FrameCount = self.FrameCount + 1\n  \n  if math.mod(self.FrameCount, 60) == 0 then\n    print("Frames: " .. self.FrameCount)\n  end\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "self.FrameCount = 0", message: "Debes inicializar FrameCount en 0" },
      { type: "code_contains", expected: "self.FrameCount = self.FrameCount + 1", message: "Debes incrementar FrameCount" },
      { type: "code_contains", expected: "math.mod", message: "Debes usar math.mod para verificar cada 60 frames" },
    ],
    hints: [
      "Inicializa la variable en ReceiveBeginPlay",
      "Incrementa en ReceiveTick: self.FrameCount = self.FrameCount + 1",
      "Usa math.mod(valor, 60) == 0 para verificar múltiplos de 60",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-02-leccion-3-ej-2",
    lessonId: "l2-3-lifecycle",
    title: "Temporizador con DeltaTime",
    instructions: 'Crea un temporizador que imprima "1 segundo pasó" cada segundo real.\n\n**Requisitos:**\n- Usa `DeltaTime` para acumular tiempo\n- Cuando acumules 1.0 segundos, imprime el mensaje y resetea\n- Inicializa `self.TimeAccumulator = 0` en BeginPlay\n\n**Pista:** DeltaTime es el tiempo en segundos desde el último frame',
    starterCode: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  -- Inicializa el acumulador\nend\n\nfunction MyActor:ReceiveTick(DeltaTime)\n  -- Acumula DeltaTime y verifica si pasó 1 segundo\nend\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  self.TimeAccumulator = 0\nend\n\nfunction MyActor:ReceiveTick(DeltaTime)\n  self.TimeAccumulator = self.TimeAccumulator + DeltaTime\n  \n  if self.TimeAccumulator >= 1.0 then\n    print("1 segundo pasó")\n    self.TimeAccumulator = 0\n  end\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "self.TimeAccumulator = 0", message: "Debes inicializar TimeAccumulator" },
      { type: "code_contains", expected: "DeltaTime", message: "Debes usar DeltaTime para acumular" },
      { type: "code_contains", expected: ">= 1.0", message: "Debes verificar si acumulaste 1 segundo" },
    ],
    hints: [
      "DeltaTime es el tiempo en segundos desde el último frame",
      "Acumula: self.TimeAccumulator = self.TimeAccumulator + DeltaTime",
      "Cuando >= 1.0, imprime y resetea a 0",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },

  // ============================================
  // LECCIÓN 4: Interacciones Básicas
  // ============================================
  {
    id: "mes-02-leccion-4-ej-1",
    lessonId: "l2-4-interactions",
    title: "Mover Actor con SetActorLocation",
    instructions: 'Crea un script que mueva un Actor hacia arriba continuamente.\n\n**Requisitos:**\n- En ReceiveTick, obtén la ubicación actual con `self:GetActorLocation()`\n- Incrementa el valor Z en 10 * DeltaTime\n- Usa `self:SetActorLocation(newLocation)` para mover\n\n**Pista:** FVector tiene propiedades X, Y, Z',
    starterCode: 'local MyActor = {}\n\nfunction MyActor:ReceiveTick(DeltaTime)\n  -- Mueve el actor hacia arriba\nend\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveTick(DeltaTime)\n  local location = self:GetActorLocation()\n  location.Z = location.Z + 10 * DeltaTime\n  self:SetActorLocation(location)\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "self:GetActorLocation()", message: "Debes obtener la ubicación actual" },
      { type: "code_contains", expected: "location.Z", message: "Debes modificar la coordenada Z" },
      { type: "code_contains", expected: "self:SetActorLocation", message: "Debes establecer la nueva ubicación" },
    ],
    hints: [
      "GetActorLocation() retorna un FVector con X, Y, Z",
      "Modifica Z: location.Z = location.Z + velocidad * DeltaTime",
      "SetActorLocation aplica el nuevo movimiento",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-02-leccion-4-ej-2",
    lessonId: "l2-4-interactions",
    title: "Rotar Actor con SetActorRotation",
    instructions: 'Crea un script que rote un Actor 90 grados por segundo alrededor del eje Yaw.\n\n**Requisitos:**\n- Obtén la rotación actual con `self:GetActorRotation()`\n- Incrementa Yaw en 90 * DeltaTime\n- Usa `self:SetActorRotation(newRotation)`\n\n**Pista:** FRotator tiene propiedades Pitch, Yaw, Roll',
    starterCode: 'local MyActor = {}\n\nfunction MyActor:ReceiveTick(DeltaTime)\n  -- Rota el actor 90 grados/segundo\nend\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveTick(DeltaTime)\n  local rotation = self:GetActorRotation()\n  rotation.Yaw = rotation.Yaw + 90 * DeltaTime\n  self:SetActorRotation(rotation)\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "self:GetActorRotation()", message: "Debes obtener la rotación actual" },
      { type: "code_contains", expected: "rotation.Yaw", message: "Debes modificar Yaw" },
      { type: "code_contains", expected: "self:SetActorRotation", message: "Debes establecer la nueva rotación" },
    ],
    hints: [
      "GetActorRotation() retorna un FRotator con Pitch, Yaw, Roll",
      "Modifica Yaw: rotation.Yaw = rotation.Yaw + velocidad * DeltaTime",
      "90 grados por segundo es la velocidad",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-02-leccion-4-ej-3",
    lessonId: "l2-4-interactions",
    title: "Cambiar Material Dinámico",
    instructions: 'Crea un script que cambie el material de un StaticMeshComponent.\n\n**Requisitos:**\n- Obtén el componente con `self.Mesh` o `self:GetComponentByClass()`\n- Crea un material dinámico con `CreateDynamicMaterialInstance`\n- Aplica el material con `SetMaterial(0, material)`\n\n**Pista:** Asume que self.Mesh es tu StaticMeshComponent',
    starterCode: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  -- Cambia el material del mesh\nend\n\nreturn MyActor',
    solution: 'local MyActor = {}\n\nfunction MyActor:ReceiveBeginPlay()\n  if self.Mesh then\n    local material = self.Mesh:CreateDynamicMaterialInstance(0)\n    self.Mesh:SetMaterial(0, material)\n    print("Material cambiado!")\n  end\nend\n\nreturn MyActor',
    tests: [
      { type: "code_contains", expected: "self.Mesh", message: "Debes acceder al Mesh" },
      { type: "code_contains", expected: "CreateDynamicMaterialInstance", message: "Debes crear un material dinámico" },
      { type: "code_contains", expected: "SetMaterial", message: "Debes aplicar el material" },
    ],
    hints: [
      "Verifica que self.Mesh existe con if self.Mesh then",
      "CreateDynamicMaterialInstance(0) crea una instancia dinámica",
      "SetMaterial(0, material) aplica el material en el slot 0",
    ],
    difficulty: "advanced",
    xpReward: 65,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 2
  // ============================================
  {
    id: "mes-02-final-proyecto",
    lessonId: "l2-4-interactions",
    title: "Proyecto: 10 Cubos Controlados por Lua",
    instructions: 'Crea el entregable del Mes 2: "Hello Unreal World" con 10 cubos controlados por Lua.\n\n**Requisitos:**\n1. Crea una clase base "CuboAnimado" con:\n   - Propiedad `VelocidadRotacion` (grados/segundo)\n   - Propiedad `VelocidadMovimiento` (unidades/segundo)\n   - ReceiveBeginPlay que inicialice valores\n   - ReceiveTick que rote y mueva el cubo\n\n2. La clase debe:\n   - Rotar sobre el eje Y (Yaw)\n   - Moverse hacia arriba y abajo (eje Z)\n   - Usar DeltaTime para movimiento suave\n\n**Pista:** Usa seno para movimiento oscilatorio: math.sin(tiempo)',
    starterCode: '-- Clase CuboAnimado\nlocal CuboAnimado = {}\nCuboAnimado.__index = CuboAnimado\n\nfunction CuboAnimado:ReceiveBeginPlay()\n  -- Inicializa propiedades\nend\n\nfunction CuboAnimado:ReceiveTick(DeltaTime)\n  -- Rota y mueve el cubo\nend\n\nreturn CuboAnimado',
    solution: 'local CuboAnimado = {}\nCuboAnimado.__index = CuboAnimado\n\nfunction CuboAnimado:ReceiveBeginPlay()\n  self.VelocidadRotacion = 90\n  self.VelocidadMovimiento = 50\n  self.TiempoAcumulado = 0\n  self.LocationInicial = self:GetActorLocation()\n  print("CuboAnimado iniciado!")\nend\n\nfunction CuboAnimado:ReceiveTick(DeltaTime)\n  self.TiempoAcumulado = self.TiempoAcumulado + DeltaTime\n  \n  -- Rotación\n  local rotation = self:GetActorRotation()\n  rotation.Yaw = rotation.Yaw + self.VelocidadRotacion * DeltaTime\n  self:SetActorRotation(rotation)\n  \n  -- Movimiento oscilatorio (seno)\n  local location = self.LocationInicial\n  location.Z = location.Z + math.sin(self.TiempoAcumulado * 2) * 10\n  self:SetActorLocation(location)\nend\n\nreturn CuboAnimado',
    tests: [
      { type: "code_contains", expected: "CuboAnimado.__index = CuboAnimado", message: "Debes usar el patrón de clase" },
      { type: "code_contains", expected: "self.VelocidadRotacion", message: "Debes tener propiedad de velocidad de rotación" },
      { type: "code_contains", expected: "DeltaTime", message: "Debes usar DeltaTime para movimiento suave" },
      { type: "code_contains", expected: "SetActorRotation", message: "Debes rotar el actor" },
      { type: "code_contains", expected: "SetActorLocation", message: "Debes mover el actor" },
    ],
    hints: [
      "Inicializa las propiedades en ReceiveBeginPlay",
      "Usa DeltaTime para que el movimiento sea independiente del framerate",
      "math.sin(tiempo) crea movimiento oscilatorio",
      "Acumula el tiempo: self.TiempoAcumulado = self.TiempoAcumulado + DeltaTime",
    ],
    difficulty: "advanced",
    xpReward: 150,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes02Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes02Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes02Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
