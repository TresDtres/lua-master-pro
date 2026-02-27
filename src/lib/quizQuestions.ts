import { QuizQuestion } from "@/components/Quiz";

// Banco de preguntas organizadas por módulo del curso
// Cada módulo tiene 15 preguntas (10 básicas + 5 de código)

export const quizQuestionsByModule: Record<string, QuizQuestion[]> = {
  // ============================================
  // MÓDULO 1: Lua desde Cero
  // ============================================
  "mes-01": [
    // Sintaxis Básica
    {
      id: "m1-q1",
      question: "¿Cuál es el tipo de dato fundamental en Lua que puede almacenar cualquier cosa?",
      options: ["string", "number", "table", "boolean"],
      correctAnswer: 2,
      explanation: "Las tablas en Lua son estructuras versátiles que pueden actuar como arrays, diccionarios, objetos y más. Son el tipo de dato más importante en Lua.",
    },
    {
      id: "m1-q2",
      question: "¿Qué función se usa para imprimir valores en la consola en Lua?",
      options: ["console.log()", "print()", "echo()", "printf()"],
      correctAnswer: 1,
      explanation: "print() es la función estándar de Lua para imprimir en la consola. Es equivalente a console.log en JavaScript.",
    },
    {
      id: "m1-q3",
      question: "¿Cómo declaras una variable con alcance local en Lua?",
      options: ["var x = 10", "local x = 10", "let x = 10", "x = 10"],
      correctAnswer: 1,
      explanation: "En Lua, 'local' define el alcance de una variable. Sin 'local', la variable es global. Es buena práctica usar 'local' casi siempre.",
    },
    {
      id: "m1-q4",
      question: "¿Cuál es el operador correcto para concatenar strings en Lua?",
      options: ["+", ".", "..", "&"],
      correctAnswer: 2,
      explanation: "El operador .. (dos puntos) en Lua se usa para concatenar strings. Ejemplo: 'Hola' .. ' ' .. 'Mundo' = 'Hola Mundo'",
    },
    {
      id: "m1-q5",
      question: "¿Qué valor representa 'nil' en Lua?",
      options: ["Cero", "Vacío o nulo", "Falso", "Undefined"],
      correctAnswer: 1,
      explanation: "nil representa la ausencia de valor o un valor nulo en Lua. Es diferente de false y 0.",
    },
    // Control de Flujo
    {
      id: "m1-q6",
      question: "¿Cuál es la sintaxis correcta para un condicional if en Lua?",
      options: [
        "if (x > 5) { }",
        "if x > 5 then end",
        "if x > 5: pass",
        "if x > 5 then ... end"
      ],
      correctAnswer: 3,
      explanation: "En Lua, la sintaxis es 'if condición then ... end'. Las palabras clave 'then' y 'end' son obligatorias.",
    },
    {
      id: "m1-q7",
      question: "¿Qué bucle se usa para iterar un número conocido de veces en Lua?",
      options: ["while", "repeat-until", "for numérico", "foreach"],
      correctAnswer: 2,
      explanation: "El for numérico (for i = 1, 10 do) se usa cuando conoces el número de iteraciones. Ej: for i = 1, 10 do print(i) end",
    },
    {
      id: "m1-q8",
      question: "¿Cuál es la diferencia entre 'while' y 'repeat-until' en Lua?",
      options: [
        "while verifica al inicio, repeat-until al final",
        "while es más rápido",
        "repeat-until no existe en Lua",
        "No hay diferencia"
      ],
      correctAnswer: 0,
      explanation: "while verifica la condición antes de ejecutar el bloque. repeat-until ejecuta al menos una vez y verifica al final.",
    },
    // Funciones
    {
      id: "m1-q9",
      question: "¿Cuál es la sintaxis correcta para crear una función en Lua?",
      options: [
        "function nombre() end",
        "function = nombre() end",
        "def nombre(): pass",
        "function nombre name() return end"
      ],
      correctAnswer: 0,
      explanation: "La sintaxis en Lua es 'function nombre() ... end'. Dentro colocas el código y retornas con 'return'.",
    },
    {
      id: "m1-q10",
      question: "¿Pueden las funciones en Lua retornar múltiples valores?",
      options: ["Sí, siempre", "No, nunca", "Solo con tablas", "Solo 2 valores"],
      correctAnswer: 0,
      explanation: "Lua soporta retornos múltiples nativamente. Ej: function coords() return x, y, z end",
    },
    // Tablas
    {
      id: "m1-q11",
      question: "¿Cómo se accede a un elemento de una tabla (array) en Lua?",
      options: ["tabla[0]", "tabla[1]", "tabla.get(1)", "tabla->1"],
      correctAnswer: 1,
      explanation: "Lua usa indexado de 1 (no 0 como muchos lenguajes). Se accede con tabla[1], tabla[2], etc.",
    },
    {
      id: "m1-q12",
      question: "¿Qué función se usa para obtener el tamaño de una tabla en Lua?",
      options: ["size(tabla)", "count(tabla)", "length(tabla)", "#tabla"],
      correctAnswer: 3,
      explanation: "El operador # se usa para obtener la longitud de una tabla. Ej: #miTabla devuelve el número de elementos.",
    },
    {
      id: "m1-q13",
      question: "¿Qué es una metatable en Lua?",
      options: [
        "Una tabla que almacena datos",
        "Una tabla especial que modifica el comportamiento de otra tabla",
        "Una tabla del sistema",
        "Una tabla con protección"
      ],
      correctAnswer: 1,
      explanation: "Una metatable es una tabla que asocia operaciones y comportamientos customizados a otra tabla. Permite sobrecarga de operadores.",
    },
    // Código Práctico
    {
      id: "m1-q14",
      question: "¿Qué imprime este código? print(5 .. 10)",
      options: ["15", "510", "Error", "5.10"],
      correctAnswer: 1,
      explanation: "El operador .. concatena strings. 5 y 10 se convierten a strings y se concatenan: '510'",
    },
    {
      id: "m1-q15",
      question: "¿Qué imprime este código? for i = 1, 3 do print(i) end",
      options: ["1 2 3", "0 1 2", "1 2", "2 3 4"],
      correctAnswer: 0,
      explanation: "El for numérico itera desde 1 hasta 3 (inclusive). Imprime: 1, 2, 3",
    },
  ],

  // ============================================
  // MÓDULO 2: POO en Lua + Primeros Pasos en UE5
  // ============================================
  "mes-02": [
    // POO en Lua
    {
      id: "m2-q1",
      question: "¿Cómo se implementa la herencia en Lua?",
      options: [
        "Con la palabra clave 'extends'",
        "Con metatables y __index",
        "Con clases abstractas",
        "Lua no soporta herencia"
      ],
      correctAnswer: 1,
      explanation: "La herencia en Lua se implementa usando metatables. La metatable de la clase hija apunta a la clase padre mediante __index.",
    },
    {
      id: "m2-q2",
      question: "¿Qué metamétodo se usa comúnmente para implementar herencia?",
      options: ["__newindex", "__index", "__call", "__tostring"],
      correctAnswer: 1,
      explanation: "__index se usa para buscar propiedades/métodos en la clase padre cuando no existen en la clase hija.",
    },
    {
      id: "m2-q3",
      question: "¿Cuál es el patrón común para crear una clase en Lua?",
      options: [
        "Clase = {} function Clase:new() ... end Clase.__index = Clase",
        "class Clase { ... }",
        "Clase = class()",
        "function Clase() return self end"
      ],
      correctAnswer: 0,
      explanation: "El patrón estándar es: Clase = {}, luego Clase.__index = Clase, y function Clase:new() para el constructor.",
    },
    {
      id: "m2-q4",
      question: "¿Qué significa la palabra clave 'self' en Lua?",
      options: [
        "Referencia al objeto actual",
        "Una función del sistema",
        "Una variable global",
        "Un tipo de dato"
      ],
      correctAnswer: 0,
      explanation: "'self' es una convención en Lua que se refiere a la instancia actual del objeto. Es similar a 'this' en otros lenguajes.",
    },
    // UnLua en UE5
    {
      id: "m2-q5",
      question: "¿Qué plugin se usa comúnmente para integrar Lua en Unreal Engine 5?",
      options: ["LuaScript", "UnLua", "LuaBridge", "LuaIntegration"],
      correctAnswer: 1,
      explanation: "UnLua es el plugin más completo y usado para integrar Lua en Unreal Engine 5. Desarrollado por Tencent.",
    },
    {
      id: "m2-q6",
      question: "¿Cuál es el ciclo de vida básico de un Actor en UE5 desde Lua?",
      options: [
        "Start(), Update(), End()",
        "BeginPlay, Tick, EndPlay",
        "Init(), Run(), Destroy()",
        "Create(), Execute(), Cleanup()"
      ],
      correctAnswer: 1,
      explanation: "El ciclo de vida en UE5 es: BeginPlay (inicio), Tick (cada frame), EndPlay (destrucción).",
    },
    {
      id: "m2-q7",
      question: "¿Cómo se registra un script Lua con un Blueprint en UnLua?",
      options: [
        "Con el atributo bOverrideLua",
        "Añadiendo el componente UnLuaInterface",
        "Implementando el interface IUnLuaInterface",
        "Todas las anteriores"
      ],
      correctAnswer: 3,
      explanation: "Se necesita: habilitar bOverrideLua, añadir el componente UnLuaInterface, e implementar la interface en el BP.",
    },
    {
      id: "m2-q8",
      question: "¿Qué función de UnLua se llama cuando un Actor comienza a jugar?",
      options: ["Start()", "OnInit()", "ReceiveBeginPlay()", "OnBeginPlay()"],
      correctAnswer: 2,
      explanation: "ReceiveBeginPlay() es la función que se llama cuando el Actor comienza. Es equivalente al Event BeginPlay en Blueprints.",
    },
    // Interacciones Básicas
    {
      id: "m2-q9",
      question: "¿Cómo mueves un Actor desde Lua en UE5?",
      options: [
        "self:SetActorLocation(FVector(x, y, z))",
        "self:Move(x, y, z)",
        "self:Translate(x, y, z)",
        "self:Position = FVector(x, y, z)"
      ],
      correctAnswer: 0,
      explanation: "SetActorLocation() es el método nativo de UE5 para mover un Actor a una posición específica.",
    },
    {
      id: "m2-q10",
      question: "¿Cómo cambias el material de un componente desde Lua?",
      options: [
        "self.Mesh:SetMaterial(0, material)",
        "self.Mesh.Material = material",
        "self:SetMaterial(material)",
        "self.Mesh:ChangeMaterial(material)"
      ],
      correctAnswer: 0,
      explanation: "SetMaterial(index, material) se usa para cambiar el material de un componente mesh en UE5.",
    },
    // Código Práctico
    {
      id: "m2-q11",
      question: "¿Qué hace este código? local t = {}; t.__index = t",
      options: [
        "Crea una tabla vacía",
        "Configura la tabla para herencia (patrón de clase)",
        "Elimina la tabla",
        "Copia la tabla"
      ],
      correctAnswer: 1,
      explanation: "Este es el patrón estándar para crear una clase en Lua. t.__index = t permite que las instancias hereden métodos de la clase.",
    },
    {
      id: "m2-q12",
      question: "¿Qué imprime este código en UE5? print(self:GetActorLocation())",
      options: [
        "La rotación del Actor",
        "La ubicación (posición) del Actor",
        "El nombre del Actor",
        "La escala del Actor"
      ],
      correctAnswer: 1,
      explanation: "GetActorLocation() retorna un FVector con la posición X, Y, Z del Actor en el mundo.",
    },
    {
      id: "m2-q13",
      question: "¿Cómo se crea una instancia de una clase en Lua?",
      options: [
        "Clase.new()",
        "Clase()",
        "Clase:create()",
        "Todas las anteriores (depende de la implementación)"
      ],
      correctAnswer: 3,
      explanation: "Depende de cómo implementes el constructor. new(), (), y create() son patrones comunes.",
    },
    // UnLua Avanzado
    {
      id: "m2-q14",
      question: "¿Qué es el 'hot-reload' en UnLua?",
      options: [
        "Recargar scripts Lua sin reiniciar el juego",
        "Calentar el servidor",
        "Compilar Lua a bytecode",
        "Exportar funciones a C++"
      ],
      correctAnswer: 0,
      explanation: "Hot-reload permite modificar scripts Lua y ver los cambios inmediatamente sin reiniciar el juego o el editor.",
    },
    {
      id: "m2-q15",
      question: "¿Dónde se guardan los scripts Lua en un proyecto UE5 con UnLua?",
      options: [
        "Content/Scripts/",
        "Source/Scripts/",
        "Lua/Scripts/",
        "Content/Lua/"
      ],
      correctAnswer: 0,
      explanation: "Por convención, los scripts Lua se guardan en Content/Scripts/ dentro del proyecto de UE5.",
    },
  ],

  // ============================================
  // MÓDULO 3: Comunicación entre Blueprints y Lua
  // ============================================
  "mes-03": [
    {
      id: "m3-q1",
      question: "¿Qué macro se usa en C++ para exponer una función a Blueprints y Lua?",
      options: ["UFUNCTION()", "UPROPERTY()", "UCLASS()", "UBLUPRINT()"],
      correctAnswer: 0,
      explanation: "UFUNCTION() con los especificadores correctos (BlueprintCallable, BlueprintNativeEvent) expone funciones a BP y Lua.",
    },
    {
      id: "m3-q2",
      question: "¿Cómo se llama a una función de Blueprint desde Lua?",
      options: [
        "self:NombreFuncionBP()",
        "Blueprint.Call('NombreFuncionBP')",
        "self.BP.NombreFuncionBP()",
        "CallBP('NombreFuncionBP')"
      ],
      correctAnswer: 0,
      explanation: "Las funciones de Blueprint se llaman directamente desde Lua usando self:NombreFuncion() si están correctamente expuestas.",
    },
    {
      id: "m3-q3",
      question: "¿Qué es el Enhanced Input System en UE5?",
      options: [
        "Un sistema de input mejorado con acciones y ejes",
        "Un teclado virtual",
        "Un plugin de terceros",
        "Un sistema deprecated"
      ],
      correctAnswer: 0,
      explanation: "Enhanced Input es el nuevo sistema de input de UE5 que usa Input Actions y Input Mapping Contexts para mejor flexibilidad.",
    },
    {
      id: "m3-q4",
      question: "¿Cómo se bind una acción de input desde Lua?",
      options: [
        "self:BindAction('Jump', IE_Pressed, self, self.Jump)",
        "self.Input.Jump = function() end",
        "self:OnJump(function() end)",
        "Input.Bind('Jump')"
      ],
      correctAnswer: 0,
      explanation: "BindAction se usa para vincular una acción de input a una función. La sintaxis exacta puede variar según la implementación.",
    },
    {
      id: "m3-q5",
      question: "¿Qué es un Delegate en UE5?",
      options: [
        "Un tipo de evento o callback",
        "Una función de Lua",
        "Una variable de Blueprint",
        "Un componente de Actor"
      ],
      correctAnswer: 0,
      explanation: "Un Delegate es un sistema de eventos/callbacks en UE5 que permite notificar cuando ocurre algo. Se puede bind desde Lua.",
    },
    {
      id: "m3-q6",
      question: "¿Cómo se conecta un delegate desde Lua?",
      options: [
        "self.OnDelegate:Connect(function() end)",
        "self:BindDelegate('OnDelegate', function() end)",
        "Delegate.Connect(self.OnDelegate)",
        "self.OnDelegate = function() end"
      ],
      correctAnswer: 0,
      explanation: "Los delegates en UE5 se pueden conectar desde Lua usando :Connect() o :AddDynamic() dependiendo de la implementación.",
    },
    {
      id: "m3-q7",
      question: "¿Qué es un Event Dispatcher en UE5?",
      options: [
        "Un delegate personalizado que puede ser llamado desde Blueprints",
        "Un sistema de logging",
        "Una función de timer",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Event Dispatcher es un tipo especial de delegate que puede definirse en Blueprints y llamarse desde Lua.",
    },
    {
      id: "m3-q8",
      question: "¿Cómo se gestiona el ciclo de un nivel desde Lua?",
      options: [
        "Con OpenLevel, LoadStreamLevel, etc.",
        "Con Level.Start() y Level.End()",
        "Con GameManager:ChangeLevel()",
        "Lua no puede gestionar niveles"
      ],
      correctAnswer: 0,
      explanation: "UE5 provee funciones como OpenLevel, LoadStreamLevel, ExecuteConsoleCommand que pueden llamarse desde Lua.",
    },
    {
      id: "m3-q9",
      question: "¿Qué es el 'Input Mapping Context' en Enhanced Input?",
      options: [
        "Un asset que mapea teclas a acciones",
        "Una función de Lua",
        "Un componente de Actor",
        "Una variable de Blueprint"
      ],
      correctAnswer: 0,
      explanation: "Input Mapping Context es un asset que define qué teclas/gamepad buttons activan qué Input Actions.",
    },
    {
      id: "m3-q10",
      question: "¿Cómo se obtiene el Input Axis desde Lua en UE5?",
      options: [
        "self:GetInputAxis('MoveForward')",
        "Input.GetAxis('MoveForward')",
        "self.Axis.MoveForward",
        "GetAxisValue('MoveForward')"
      ],
      correctAnswer: 0,
      explanation: "GetInputAxis() retorna el valor de un eje de input (como MoveForward o Turn) que puede usarse para movimiento.",
    },
    {
      id: "m3-q11",
      question: "¿Qué significa 'IE_Pressed' en el sistema de input?",
      options: [
        "Input Event: cuando se presiona una tecla",
        "Input Enable: activar input",
        "Input Error: error de input",
        "Input Exit: salir del input"
      ],
      correctAnswer: 0,
      explanation: "IE_Pressed es un enum que indica que la tecla/button fue presionado. También existe IE_Released, IE_Repeat.",
    },
    {
      id: "m3-q12",
      question: "¿Puede Lua escuchar eventos de colisión en UE5?",
      options: ["Sí, con OnComponentBeginOverlap", "No, solo C++", "Solo en servidores", "Solo con plugins"],
      correctAnswer: 0,
      explanation: "Lua puede escuchar eventos de colisión implementando funciones como ReceiveActorBeginOverlap o bind a delegates de colisión.",
    },
    {
      id: "m3-q13",
      question: "¿Qué es un 'Lua-BP Interface'?",
      options: [
        "Una interface que define funciones que Lua puede implementar",
        "Un plugin de comunicación",
        "Un tipo de variable",
        "Una función deprecated"
      ],
      correctAnswer: 0,
      explanation: "Una Interface de Blueprint puede ser implementada en Lua, permitiendo que Lua provea la lógica de funciones definidas en BP.",
    },
    {
      id: "m3-q14",
      question: "¿Cómo se pasa un array desde Blueprint a Lua?",
      options: [
        "Como TArray en UFUNCTION",
        "No se puede pasar",
        "Como string JSON",
        "Como tabla serializada"
      ],
      correctAnswer: 0,
      explanation: "Los TArrays en UFUNCTIONs se convierten automáticamente a tablas Lua cuando se pasan como parámetros.",
    },
    {
      id: "m3-q15",
      question: "¿Qué ventaja tiene usar Lua sobre Blueprints para lógica compleja?",
      options: [
        "Código más limpio, versionable, y fácil de testear",
        "Es más rápido",
        "Es más bonito visualmente",
        "No tiene ventajas"
      ],
      correctAnswer: 0,
      explanation: "Lua permite código más limpio para lógica compleja, mejor versionado con Git, testing unitario, y reutilización de código.",
    },
  ],

  // ============================================
  // MÓDULO 4: Sistemas de Juego - Inventario y Stats
  // ============================================
  "mes-04": [
    {
      id: "m4-q1",
      question: "¿Qué es una DataTable en UE5?",
      options: [
        "Un asset que almacena datos estructurados en filas",
        "Una tabla de Lua",
        "Una hoja de cálculo",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "DataTable es un asset de UE5 que almacena datos estructurados (como stats de items) que puede leerse desde Lua.",
    },
    {
      id: "m4-q2",
      question: "¿Cómo se accede a una DataTable desde Lua?",
      options: [
        "self:GetDataTable('/Path/To/Table')",
        "DataTable.Get('/Path/To/Table')",
        "self.DataTable:Find('RowName')",
        "GetDataTableRow('RowName')"
      ],
      correctAnswer: 0,
      explanation: "GetDataTable() o FindDataTableRow() son funciones comunes para acceder a datos desde Lua.",
    },
    {
      id: "m4-q3",
      question: "¿Qué patrón de diseño es útil para un sistema de inventario?",
      options: ["Command, Observer, State", "Singleton únicamente", "Factory únicamente", "Ninguno"],
      correctAnswer: 0,
      explanation: "Command (para acciones de items), Observer (para notificaciones de cambios), y State (para estados del inventario) son útiles.",
    },
    {
      id: "m4-q4",
      question: "¿Cómo se implementa un sistema de stack de items?",
      options: [
        "Con una tabla que tiene campo 'Quantity'",
        "Con múltiples slots",
        "Con arrays separados",
        "Lua no soporta stacks"
      ],
      correctAnswer: 0,
      explanation: "Cada slot del inventario tiene un ItemId y una Quantity. Cuando Quantity > 1, los items están stackeados.",
    },
    {
      id: "m4-q5",
      question: "¿Qué es un 'modifier' en un sistema de stats?",
      options: [
        "Un valor que modifica un stat base",
        "Una función de Lua",
        "Un tipo de item",
        "Una clase de enemigo"
      ],
      correctAnswer: 0,
      explanation: "Un modifier es un valor (positivo o negativo) que se aplica a un stat base. Ej: buff de +10 fuerza.",
    },
    {
      id: "m4-q6",
      question: "¿Cómo se serializa el estado del juego para guardado?",
      options: [
        "Con json.encode() de la tabla de estado",
        "Con print()",
        "Con SaveGame:ToString()",
        "Lua no puede serializar"
      ],
      correctAnswer: 0,
      explanation: "json.encode() convierte una tabla Lua a string JSON que puede guardarse. json.decode() la restaura.",
    },
    {
      id: "m4-q7",
      question: "¿Qué es un 'SaveGame Object' en UE5?",
      options: [
        "Un objeto que contiene datos serializables para guardado",
        "Un item guardable",
        "Una función de Lua",
        "Un componente de Actor"
      ],
      correctAnswer: 0,
      explanation: "SaveGame Object es una clase de UE5 diseñada para contener datos que serán guardados en disco.",
    },
    {
      id: "m4-q8",
      question: "¿Cómo se implementa un buff temporal en Lua?",
      options: [
        "Con una tabla que tiene duración y timer",
        "Con una variable global",
        "Con un loop infinito",
        "No se puede implementar"
      ],
      correctAnswer: 0,
      explanation: "Un buff tiene: stat a modificar, valor, duración, y un timer que lo remueve después del tiempo.",
    },
    {
      id: "m4-q9",
      question: "¿Qué es el 'peso' en un sistema de inventario?",
      options: [
        "Un límite de cuántos items puede cargar el jugador",
        "El tamaño del array",
        "El número de slots",
        "Una propiedad visual"
      ],
      correctAnswer: 0,
      explanation: "El peso (weight) limita cuántos items puede cargar el jugador. Cada item tiene un peso y el jugador tiene un máximo.",
    },
    {
      id: "m4-q10",
      question: "¿Cómo se notifica a la UI cuando cambia el inventario?",
      options: [
        "Con un delegate o event dispatcher",
        "Con print()",
        "Con un timer",
        "Manualmente cada frame"
      ],
      correctAnswer: 0,
      explanation: "Se usa un delegate/evento que la UI escucha. Cuando el inventario cambia, se dispara el evento y la UI se actualiza.",
    },
    {
      id: "m4-q11",
      question: "¿Qué es un 'Item Class' en un sistema de inventario?",
      options: [
        "Una clase/struct que define propiedades de un item",
        "Un tipo de enemigo",
        "Una función de Lua",
        "Una categoría de items"
      ],
      correctAnswer: 0,
      explanation: "Item Class define: nombre, descripción, icono, peso, valor, y otras propiedades de un tipo de item.",
    },
    {
      id: "m4-q12",
      question: "¿Cómo se implementa el drag-and-drop conceptual en Lua?",
      options: [
        "Con estado de 'dragging' y eventos de UI",
        "Con física de objetos",
        "Con partículas",
        "Lua no soporta drag-and-drop"
      ],
      correctAnswer: 0,
      explanation: "Se trackea el estado de 'arrastrando' con eventos de mouse/touch. La UI muestra el item siendo arrastrado.",
    },
    {
      id: "m4-q13",
      question: "¿Qué es un 'cooldown' en un sistema de items?",
      options: [
        "Un tiempo de espera antes de poder usar un item nuevamente",
        "Una propiedad de items fríos",
        "Una función de enfriamiento",
        "Un tipo de item"
      ],
      correctAnswer: 0,
      explanation: "Cooldown es el tiempo que debe pasar antes de poder usar un item o habilidad nuevamente.",
    },
    {
      id: "m4-q14",
      question: "¿Cómo se valida un item antes de equiparlo?",
      options: [
        "Verificando tipo, requisitos de stats, y slot disponible",
        "Con un if simple",
        "Con un loop",
        "No se valida"
      ],
      correctAnswer: 0,
      explanation: "Se verifica: el item es equipable, el jugador cumple requisitos (nivel, stats), y el slot está disponible.",
    },
    {
      id: "m4-q15",
      question: "¿Qué es un 'slot' en un inventario?",
      options: [
        "Una posición específica donde puede ir un item",
        "Un tipo de item",
        "Una función de Lua",
        "Una categoría"
      ],
      correctAnswer: 0,
      explanation: "Un slot es una posición en el array/tabla del inventario. Puede estar vacío o contener un item con cantidad.",
    },
  ],

  // ============================================
  // MÓDULO 5: Sistema de Diálogos e Interfaz de Usuario
  // ============================================
  "mes-05": [
    {
      id: "m5-q1",
      question: "¿Qué es UMG en UE5?",
      options: [
        "Unreal Motion Graphics - sistema de UI",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de sonido"
      ],
      correctAnswer: 0,
      explanation: "UMG (Unreal Motion Graphics) es el sistema de UI de UE5 para crear widgets, menús, HUDs, etc.",
    },
    {
      id: "m5-q2",
      question: "¿Cómo se crea un widget desde Lua?",
      options: [
        "self:CreateWidget(WidgetClass)",
        "Widget.Create(WidgetClass)",
        "self.NewWidget(WidgetClass)",
        "CreateWidget(self, WidgetClass)"
      ],
      correctAnswer: 0,
      explanation: "CreateWidget() se usa para instanciar un widget UMG desde Lua. Luego se llama a AddToViewport().",
    },
    {
      id: "m5-q3",
      question: "¿Qué es un 'Widget Blueprint'?",
      options: [
        "Un asset de UMG que define una UI",
        "Una función de Lua",
        "Un tipo de variable",
        "Un componente de Actor"
      ],
      correctAnswer: 0,
      explanation: "Widget Blueprint es un asset que contiene el diseño de una UI (botones, textos, imágenes) que puede controlarse desde Lua.",
    },
    {
      id: "m5-q4",
      question: "¿Cómo se actualiza un Text Block desde Lua?",
      options: [
        "self.TextBlock:SetText('Nuevo Texto')",
        "self.TextBlock.Text = 'Nuevo Texto'",
        "TextBlock.Update('Nuevo Texto')",
        "SetText(self.TextBlock, 'Nuevo Texto')"
      ],
      correctAnswer: 0,
      explanation: "SetText() es el método para actualizar el texto de un widget TextBlock en UMG.",
    },
    {
      id: "m5-q5",
      question: "¿Qué estructura de datos es buena para diálogos ramificados?",
      options: [
        "Una tabla con nodos y conexiones",
        "Un array simple",
        "Un string largo",
        "Una variable booleana"
      ],
      correctAnswer: 0,
      explanation: "Un sistema de diálogos ramificados usa nodos (cada conversación) con conexiones a otros nodos basados en elecciones.",
    },
    {
      id: "m5-q6",
      question: "¿Qué es la 'localización' en juegos?",
      options: [
        "Traducir textos a múltiples idiomas",
        "Encontrar la posición del jugador",
        "Un tipo de widget",
        "Una función de sonido"
      ],
      correctAnswer: 0,
      explanation: "Localización es el proceso de traducir y adaptar textos a diferentes idiomas y regiones.",
    },
    {
      id: "m5-q7",
      question: "¿Cómo se implementa un sistema de localización en Lua?",
      options: [
        "Con una tabla de strings por idioma",
        "Con múltiples archivos de texto",
        "Con una base de datos",
        "Lua no soporta localización"
      ],
      correctAnswer: 0,
      explanation: "Se usa una tabla con keys y strings por idioma: Loc['es']['hola'] = 'Hola', Loc['en']['hola'] = 'Hello'.",
    },
    {
      id: "m5-q8",
      question: "¿Qué es una 'Progress Bar' en UMG?",
      options: [
        "Un widget que muestra progreso visualmente",
        "Una barra de menú",
        "Una función de Lua",
        "Un tipo de botón"
      ],
      correctAnswer: 0,
      explanation: "Progress Bar es un widget que muestra progreso (como vida, experiencia) como una barra que se llena/vacía.",
    },
    {
      id: "m5-q9",
      question: "¿Cómo se anima un widget desde Lua?",
      options: [
        "Con Timeline o interpolación manual de valores",
        "Con partículas",
        "Con física",
        "Los widgets no se pueden animar"
      ],
      correctAnswer: 0,
      explanation: "Se puede usar un Timeline en BP controlado desde Lua, o interpolar valores manualmente en el Tick.",
    },
    {
      id: "m5-q10",
      question: "¿Qué es un 'HUD' en juegos?",
      options: [
        "Heads-Up Display - interfaz durante el gameplay",
        "Un tipo de enemigo",
        "Una función de Lua",
        "Un componente de sonido"
      ],
      correctAnswer: 0,
      explanation: "HUD es la interfaz que muestra información durante el juego (vida, munición, mapa, objetivos).",
    },
    {
      id: "m5-q11",
      question: "¿Cómo se muestra/oculta un widget desde Lua?",
      options: [
        "Widget:SetVisibility(ESlateVisibility.Visible/Hidden)",
        "Widget.Show()/Hide()",
        "Widget.Visible = true/false",
        "Widget:Display(true/false)"
      ],
      correctAnswer: 0,
      explanation: "SetVisibility() con ESlateVisibility.Visible o Hidden controla si un widget se muestra o no.",
    },
    {
      id: "m5-q12",
      question: "¿Qué es un 'Dialogue Tree'?",
      options: [
        "Una estructura de árbol que representa conversaciones ramificadas",
        "Un tipo de árbol en el nivel",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Dialogue Tree es una estructura de datos en árbol donde cada nodo es una línea de diálogo con ramas a otras opciones.",
    },
    {
      id: "m5-q13",
      question: "¿Cómo se bindea un dato de jugador a un widget?",
      options: [
        "Con un binding function que retorna el valor actual",
        "Con una variable global",
        "Con un timer",
        "Manualmente cada frame"
      ],
      correctAnswer: 0,
      explanation: "Se crea una binding function en el widget que retorna el valor actual (ej: salud del jugador) y se actualiza automáticamente.",
    },
    {
      id: "m5-q14",
      question: "¿Qué es un 'Notification System' en UI?",
      options: [
        "Un sistema que muestra mensajes temporales al jugador",
        "Un tipo de sonido",
        "Una función de Lua",
        "Un componente de red"
      ],
      correctAnswer: 0,
      explanation: "Notification System muestra mensajes temporales (logros, mensajes, alertas) que desaparecen después de un tiempo.",
    },
    {
      id: "m5-q15",
      question: "¿Qué ventaja tiene controlar UI desde Lua?",
      options: [
        "Lógica de UI más fácil de testear y mantener",
        "Es más rápido que C++",
        "Es más bonito",
        "No tiene ventajas"
      ],
      correctAnswer: 0,
      explanation: "Lua permite separar la lógica de UI del diseño, haciendo el código más fácil de testear, mantener y modificar.",
    },
  ],

  // ============================================
  // MÓDULO 6: Inteligencia Artificial de NPCs
  // ============================================
  "mes-06": [
    {
      id: "m6-q1",
      question: "¿Qué es una FSM (Finite State Machine)?",
      options: [
        "Una máquina de estados finitos para comportamiento de IA",
        "Un tipo de sonido",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "FSM es un modelo de comportamiento con estados discretos (Idle, Patrol, Chase) y transiciones entre ellos.",
    },
    {
      id: "m6-q2",
      question: "¿Cuáles son los 4 estados típicos de un guardia en sigilo?",
      options: [
        "Idle, Patrol, Alert, Chase",
        "Sleep, Eat, Work, Rest",
        "Walk, Run, Jump, Crouch",
        "Attack, Defend, Hide, Flee"
      ],
      correctAnswer: 0,
      explanation: "Los estados clásicos son: Idle (quieto), Patrol (ronda), Alert (sospecha), Chase (persigue al jugador).",
    },
    {
      id: "m6-q3",
      question: "¿Qué es un 'Guard' en una FSM?",
      options: [
        "Una condición que debe cumplirse para una transición",
        "Un tipo de enemigo",
        "Una función de Lua",
        "Un componente de Actor"
      ],
      correctAnswer: 0,
      explanation: "Un Guard es una condición booleana que determina si una transición entre estados puede ocurrir.",
    },
    {
      id: "m6-q4",
      question: "¿Cómo se implementa la percepción en IA desde Lua?",
      options: [
        "Con LineTrace (raycast) y detección de ángulo/distancia",
        "Con sonido",
        "Con colisiones",
        "Lua no puede hacer percepción"
      ],
      correctAnswer: 0,
      explanation: "Se usa LineTrace para visión, distancia para alcance, y ángulo para cono de visión.",
    },
    {
      id: "m6-q5",
      question: "¿Qué es un 'Behavior Tree' en UE5?",
      options: [
        "Un sistema de IA basado en árboles de comportamiento",
        "Un tipo de árbol en el nivel",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Behavior Tree es un sistema de IA que usa nodos (Selector, Sequence, Task) para definir comportamiento complejo.",
    },
    {
      id: "m6-q6",
      question: "¿Qué es una 'Blackboard' en Behavior Trees?",
      options: [
        "Una memoria compartida que almacena datos de IA",
        "Una pizarra negra",
        "Una función de Lua",
        "Un tipo de variable"
      ],
      correctAnswer: 0,
      explanation: "Blackboard es un sistema de key-value que almacena datos que los nodos del Behavior Tree pueden leer/escribir.",
    },
    {
      id: "m6-q7",
      question: "¿Cómo se implementa un BTTask desde Lua con UnLua?",
      options: [
        "Creando una clase que herede de UBTTask_BlueprintBase",
        "Con una función simple",
        "Con un componente",
        "Lua no puede crear BTTasks"
      ],
      correctAnswer: 0,
      explanation: "Se crea una clase Lua que herede de UBTTask_BlueprintBase y se implementa ReceiveExecuteAIController.",
    },
    {
      id: "m6-q8",
      question: "¿Qué es un 'BTDecorator'?",
      options: [
        "Un nodo que condiciona la ejecución de nodos hijos",
        "Una función de decoración",
        "Una variable de Lua",
        "Un tipo de enemigo"
      ],
      correctAnswer: 0,
      explanation: "BTDecorator es un nodo que puede abortar o permitir la ejecución de nodos hijos basado en condiciones.",
    },
    {
      id: "m6-q9",
      question: "¿Cómo se coordina un grupo de NPCs en Lua?",
      options: [
        "Con un 'leader' que comparte información con el grupo",
        "Cada NPC actúa independiente",
        "Con un array de NPCs",
        "No se puede coordinar"
      ],
      correctAnswer: 0,
      explanation: "Se puede tener un NPC líder que comparte su estado con el grupo, o un 'manager' que coordina a todos.",
    },
    {
      id: "m6-q10",
      question: "¿Qué es un 'Cone of Vision' en IA?",
      options: [
        "El área que un NPC puede ver (como un cono)",
        "Un tipo de visión nocturna",
        "Una función de Lua",
        "Un componente de cámara"
      ],
      correctAnswer: 0,
      explanation: "Cone of Vision es el área en forma de cono frente al NPC donde puede detectar al jugador.",
    },
    {
      id: "m6-q11",
      question: "¿Qué es el 'pathfinding' en IA?",
      options: [
        "El proceso de encontrar un camino de A a B",
        "Un tipo de camino en el nivel",
        "Una función de Lua",
        "Un componente de movimiento"
      ],
      correctAnswer: 0,
      explanation: "Pathfinding es el algoritmo que encuentra el camino óptimo entre dos puntos, evitando obstáculos.",
    },
    {
      id: "m6-q12",
      question: "¿Qué sistema de pathfinding usa UE5?",
      options: [
        "Recast Navigation con NavMesh",
        "A* únicamente",
        "Dijkstra únicamente",
        "Pathfinding manual"
      ],
      correctAnswer: 0,
      explanation: "UE5 usa Recast Navigation con NavMesh (Navigation Mesh) para pathfinding automático de NPCs.",
    },
    {
      id: "m6-q13",
      question: "¿Cómo se optimiza IA para múltiples NPCs?",
      options: [
        "Con LOD de IA, update escalonado, y caching",
        "Con menos NPCs",
        "Con threads",
        "No se puede optimizar"
      ],
      correctAnswer: 0,
      explanation: "Se usa: LOD (menos detalle lejos), update escalonado (no todos los frames), y caching de cálculos.",
    },
    {
      id: "m6-q14",
      question: "¿Qué es un 'Flee Behavior'?",
      options: [
        "Comportamiento de huir cuando la salud es baja",
        "Un tipo de movimiento",
        "Una función de Lua",
        "Un estado de patrulla"
      ],
      correctAnswer: 0,
      explanation: "Flee Behavior hace que el NPC huya cuando su salud está baja o está en desventaja.",
    },
    {
      id: "m6-q15",
      question: "¿Qué es un 'AIController' en UE5?",
      options: [
        "Un controller que posee un Pawn para controlarlo con IA",
        "Un tipo de jugador",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "AIController es como un PlayerController pero para IA. Posee un Pawn y lo controla usando Behavior Trees u otra lógica.",
    },
  ],

  // ============================================
  // MÓDULO 7: Multijugador y Replicación
  // ============================================
  "mes-07": [
    // Fundamentos de Red
    {
      id: "m7-q1",
      question: "¿Qué modelo de red usa Unreal Engine 5?",
      options: ["Peer-to-peer", "Cliente-servidor", "Solo servidor", "Solo cliente"],
      correctAnswer: 1,
      explanation: "UE5 usa el modelo cliente-servidor donde el servidor tiene autoridad y los clientes se conectan remotamente.",
    },
    {
      id: "m7-q2",
      question: "¿Qué es un 'servidor dedicado' en UE5?",
      options: [
        "Un servidor que también es un cliente",
        "Un servidor que solo ejecuta lógica de juego, sin renderizar",
        "Un cliente sin conexión",
        "Un tipo de Actor"
      ],
      correctAnswer: 1,
      explanation: "Un servidor dedicado ejecuta solo la lógica del juego sin renderizar gráficos, optimizando recursos para multijugador.",
    },
    {
      id: "m7-q3",
      question: "¿Qué es la 'autoridad' en el contexto de red de UE5?",
      options: [
        "El cliente que ve mejor gráficos",
        "El que tiene control sobre un Actor o variable",
        "El servidor de audio",
        "Un tipo de permiso"
      ],
      correctAnswer: 1,
      explanation: "La autoridad determina quién tiene control sobre un Actor o variable. Generalmente el servidor tiene autoridad.",
    },
    {
      id: "m7-q4",
      question: "¿Qué es NetMode en UE5?",
      options: [
        "Un tipo de red",
        "Una propiedad que indica si es servidor, cliente o standalone",
        "Un modo de juego",
        "Una función de Lua"
      ],
      correctAnswer: 1,
      explanation: "NetMode indica el modo de red actual: NM_Standalone, NM_DedicatedServer, NM_ListenServer, NM_Client.",
    },
    // Replicación de Propiedades
    {
      id: "m7-q5",
      question: "¿Qué macro se usa para replicar una propiedad en C++/UnLua?",
      options: ["UPROPERTY()", "REPLICATED()", "NETWORKED()", "SYNCED()"],
      correctAnswer: 0,
      explanation: "UPROPERTY() con el especificador Replicated indica que la propiedad se replica en red.",
    },
    {
      id: "m7-q6",
      question: "¿Qué es DOREPLIFETIME en UE5?",
      options: [
        "Una función de tiempo",
        "Una macro para registrar propiedades replicadas",
        "Un tipo de variable",
        "Una clase de Actor"
      ],
      correctAnswer: 1,
      explanation: "DOREPLIFETIME registra una propiedad para replicación en el constructor de la clase.",
    },
    {
      id: "m7-q7",
      question: "¿Cuándo se replica una propiedad en UE5?",
      options: [
        "Siempre",
        "Solo cuando cambia su valor",
        "Nunca",
        "Solo en el servidor"
      ],
      correctAnswer: 1,
      explanation: "UE5 solo replica propiedades cuando su valor cambia, optimizando el ancho de banda.",
    },
    // RPCs
    {
      id: "m7-q8",
      question: "¿Qué significa RPC?",
      options: [
        "Remote Procedure Call",
        "Real Player Control",
        "Rapid Player Connection",
        "Replicated Player Command"
      ],
      correctAnswer: 0,
      explanation: "RPC significa Remote Procedure Call, permite llamar funciones remotamente en red.",
    },
    {
      id: "m7-q9",
      question: "¿Qué tipo de RPC se ejecuta solo en el servidor?",
      options: ["Client RPC", "Server RPC", "NetMulticast RPC", "Local RPC"],
      correctAnswer: 1,
      explanation: "Server RPC se llama desde un cliente pero se ejecuta solo en el servidor.",
    },
    {
      id: "m7-q10",
      question: "¿Qué hace un NetMulticast RPC?",
      options: [
        "Se ejecuta solo en el servidor",
        "Se ejecuta en todos los clientes y servidor",
        "Se ejecuta en un cliente específico",
        "No se ejecuta en red"
      ],
      correctAnswer: 1,
      explanation: "NetMulticast RPC se ejecuta en todos los clientes conectados y en el servidor.",
    },
    {
      id: "m7-q11",
      question: "¿Desde dónde se puede llamar un Server RPC?",
      options: [
        "Solo desde el servidor",
        "Desde cualquier cliente con autoridad",
        "Solo desde el cliente 1",
        "Desde cualquier lugar"
      ],
      correctAnswer: 1,
      explanation: "Un Server RPC se llama desde un cliente (generalmente con autoridad sobre el Actor) y se ejecuta en el servidor.",
    },
    // Sincronización
    {
      id: "m7-q12",
      question: "¿Qué es la 'predicción del lado del cliente'?",
      options: [
        "Predecir el futuro del juego",
        "Ejecutar acciones localmente antes de confirmación del servidor",
        "Un tipo de lag",
        "Una técnica de renderizado"
      ],
      correctAnswer: 1,
      explanation: "La predicción del cliente ejecuta acciones inmediatamente en el cliente para mejor respuesta, luego se reconcilia con el servidor.",
    },
    {
      id: "m7-q13",
      question: "¿Qué es la 'reconciliación' en multijugador?",
      options: [
        "Arreglar diferencias entre cliente y servidor",
        "Un tipo de conexión",
        "Una función de Lua",
        "Un tipo de Actor"
      ],
      correctAnswer: 0,
      explanation: "La reconciliación corrige diferencias entre el estado predicho del cliente y la autoridad del servidor.",
    },
    // Práctica
    {
      id: "m7-q14",
      question: "¿Cómo se sincroniza la posición de un jugador en UE5?",
      options: [
        "Manualmente con RPCs",
        "Automáticamente con replicación de posición del Character",
        "No se puede sincronizar",
        "Con variables globales"
      ],
      correctAnswer: 1,
      explanation: "La posición del Character se replica automáticamente en UE5, no requiere código adicional.",
    },
    {
      id: "m7-q15",
      question: "¿Qué es el 'lag compensation' en UE5?",
      options: [
        "Compensar el lag de red para hitscan preciso",
        "Reducir el lag",
        "Un tipo de conexión",
        "Una función de optimización"
      ],
      correctAnswer: 0,
      explanation: "Lag compensation compensa el delay de red al calcular hits, usando rewind del tiempo para precisión.",
    },
  ],

  // ============================================
  // MÓDULO 8: Optimización y Herramientas de Editor
  // ============================================
  "mes-08": [
    // Profiling
    {
      id: "m8-q1",
      question: "¿Qué es Unreal Insights?",
      options: [
        "Una herramienta de profiling y análisis de rendimiento",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Unreal Insights es una herramienta de profiling que permite analizar el rendimiento del juego en tiempo real.",
    },
    {
      id: "m8-q2",
      question: "¿Qué métrica es crucial para el rendimiento en tiempo real?",
      options: ["Tamaño del archivo", "Frame time / FPS", "Número de actores", "Cantidad de código"],
      correctAnswer: 1,
      explanation: "Frame time (tiempo por frame) y FPS son críticos para mantener 60fps estables.",
    },
    {
      id: "m8-q3",
      question: "¿Qué es un 'bottleneck' en profiling?",
      options: [
        "Una botella de agua",
        "El punto más lento que limita el rendimiento general",
        "Un tipo de error",
        "Una función optimizada"
      ],
      correctAnswer: 1,
      explanation: "Un bottleneck es el cuello de botella, el proceso más lento que limita todo el sistema.",
    },
    // Optimización de Lua
    {
      id: "m8-q4",
      question: "¿Qué es 'object pooling' en optimización?",
      options: [
        "Una piscina de objetos",
        "Reutilizar objetos en lugar de crear/destruir constantemente",
        "Un tipo de variable",
        "Una función de Lua"
      ],
      correctAnswer: 1,
      explanation: "Object pooling reutiliza objetos de una pool en lugar de crear/destruir, reduciendo garbage collection.",
    },
    {
      id: "m8-q5",
      question: "¿Por qué evitar crear tablas en bucles en Lua?",
      options: [
        "Porque es feo",
        "Genera garbage collection frecuente que afecta rendimiento",
        "No se puede hacer",
        "Es más lento"
      ],
      correctAnswer: 1,
      explanation: "Crear tablas en bucles genera basura que el GC debe limpiar, causando stuttering.",
    },
    {
      id: "m8-q6",
      question: "¿Qué es 'lazy evaluation'?",
      options: [
        "Evaluación perezosa, calcular solo cuando se necesita",
        "No hacer nada",
        "Un tipo de error",
        "Una función de Lua"
      ],
      correctAnswer: 0,
      explanation: "Lazy evaluation retrasa cálculos hasta que el resultado es realmente necesario, ahorrando recursos.",
    },
    {
      id: "m8-q7",
      question: "¿Qué es el 'caching' en optimización?",
      options: [
        "Guardar resultados de cálculos para reutilizar",
        "Borrar datos",
        "Un tipo de variable",
        "Una función de red"
      ],
      correctAnswer: 0,
      explanation: "Caching guarda resultados de operaciones costosas para evitar recalcularlos.",
    },
    // Herramientas de Editor
    {
      id: "m8-q8",
      question: "¿Qué es Slate en UE5?",
      options: [
        "Un tipo de material",
        "El framework de UI nativo de UE5 para editor tools",
        "Una función de Lua",
        "Un componente de Actor"
      ],
      correctAnswer: 1,
      explanation: "Slate es el framework de UI declarativo de UE5 usado para crear herramientas de editor.",
    },
    {
      id: "m8-q9",
      question: "¿Qué es un 'Custom Editor Tool'?",
      options: [
        "Una herramienta personalizada para el editor de UE5",
        "Un tipo de Actor",
        "Una función de Lua",
        "Un material personalizado"
      ],
      correctAnswer: 0,
      explanation: "Custom Editor Tools son ventanas y funcionalidades personalizadas que extienden el editor de UE5.",
    },
    {
      id: "m8-q10",
      question: "¿Qué es un 'Property Customization' en UE5?",
      options: [
        "Personalizar cómo se muestran propiedades en el Details Panel",
        "Cambiar propiedades de un Actor",
        "Un tipo de material",
        "Una función de Lua"
      ],
      correctAnswer: 0,
      explanation: "Property Customization permite personalizar cómo se editan y muestran propiedades en el panel Details.",
    },
    // Pipeline Automation
    {
      id: "m8-q11",
      question: "¿Qué es 'batch processing' en pipeline de arte?",
      options: [
        "Procesar múltiples assets automáticamente en lote",
        "Un tipo de error",
        "Una función de Lua",
        "Un componente de Actor"
      ],
      correctAnswer: 0,
      explanation: "Batch processing procesa automáticamente múltiples assets en lote, ahorrando tiempo manual.",
    },
    {
      id: "m8-q12",
      question: "¿Qué es un 'Asset Validator'?",
      options: [
        "Una herramienta que verifica que los assets cumplen estándares",
        "Un tipo de Actor",
        "Una función de Lua",
        "Un material"
      ],
      correctAnswer: 0,
      explanation: "Asset Validator verifica automáticamente que los assets cumplen con estándares de calidad y convenciones.",
    },
    // Hot-Reload
    {
           id: "m8-q13",
      question: "¿Qué es 'hot-reload' de scripts Lua?",
      options: [
        "Recargar scripts en tiempo real sin reiniciar el juego",
        "Calentar el servidor",
        "Un tipo de error",
        "Una función de red"
      ],
      correctAnswer: 0,
      explanation: "Hot-reload permite modificar y recargar scripts Lua sin reiniciar el juego o editor.",
    },
    {
      id: "m8-q14",
      question: "¿Qué ventaja tiene hot-reload en desarrollo?",
      options: [
        "Iteración más rápida sin tiempos de carga",
        "Mejores gráficos",
        "Más FPS",
        "Menos código"
      ],
      correctAnswer: 0,
      explanation: "Hot-reload permite iterar rápidamente probando cambios inmediatamente sin reiniciar.",
    },
    {
      id: "m8-q15",
      question: "¿Qué es un 'Live Coding' en contexto de desarrollo?",
      options: [
        "Programar en vivo con streaming",
        "Modificar código mientras el programa se ejecuta",
        "Un tipo de error",
        "Una función de Lua"
      ],
      correctAnswer: 1,
      explanation: "Live Coding permite modificar código en tiempo de ejecución, viendo cambios inmediatamente.",
    },
  ],

  // ============================================
  // MÓDULO 9: Sistemas Avanzados
  // ============================================
  "mes-09": [
    // Generación Procedural
    {
      id: "m9-q1",
      question: "¿Qué es generación procedural de contenido?",
      options: [
        "Generar contenido automáticamente con algoritmos",
        "Crear contenido manualmente",
        "Un tipo de material",
        "Una función de Lua"
      ],
      correctAnswer: 0,
      explanation: "Generación procedural usa algoritmos para crear contenido automáticamente, como dungeons o terreno.",
    },
    {
      id: "m9-q2",
      question: "¿Qué es 'Wave Function Collapse' (WFC)?",
      options: [
        "Un algoritmo de generación procedural basado en reglas",
        "Un tipo de onda",
        "Una función de Lua",
        "Un componente de Actor"
      ],
      correctAnswer: 0,
      explanation: "WFC es un algoritmo que genera contenido procedural basado en reglas de adyacencia de tiles.",
    },
    {
      id: "m9-q3",
      question: "¿Qué es un 'seed' en generación procedural?",
      options: [
        "Una semilla aleatoria que determina la generación",
        "Un tipo de planta",
        "Una función de Lua",
        "Un componente de Actor"
      ],
      correctAnswer: 0,
      explanation: "El seed es un valor inicial que determina la generación procedural, permitiendo reproducir el mismo resultado.",
    },
    // Materiales Dinámicos
    {
      id: "m9-q4",
      question: "¿Qué es un Material Instance en UE5?",
      options: [
        "Una instancia de material que hereda de un material padre",
        "Un tipo de Actor",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Material Instance es una versión ligera de un material que puede modificar parámetros sin recompilar.",
    },
    {
      id: "m9-q5",
      question: "¿Qué es un Material Parameter Collection (MPC)?",
      options: [
        "Una colección de parámetros de material accesibles globalmente",
        "Un tipo de Actor",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "MPC permite almacenar parámetros de material accesibles globalmente, útiles para efectos globales.",
    },
    {
      id: "m9-q6",
      question: "¿Cómo se cambia un parámetro de material desde Lua?",
      options: [
        "Con SetScalarParameterValue o SetVectorParameterValue",
        "No se puede cambiar",
        "Con una variable global",
        "Con una función de red"
      ],
      correctAnswer: 0,
      explanation: "SetScalarParameterValue y SetVectorParameterValue permiten cambiar parámetros de material dinámicamente.",
    },
    // Audio con Metasounds
    {
      id: "m9-q7",
      question: "¿Qué es Metasound en UE5?",
      options: [
        "El sistema de audio procedural de UE5",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Metasound es el sistema de audio procedural de UE5 que permite crear sonidos dinámicos.",
    },
    {
      id: "m9-q8",
      question: "¿Qué es 'música adaptativa'?",
      options: [
        "Música que cambia según el estado del juego",
        "Música que se adapta al volumen",
        "Un tipo de material",
        "Una función de Lua"
      ],
      correctAnswer: 0,
      explanation: "Música adaptativa cambia dinámicamente según el estado del juego (combate, exploración, etc.).",
    },
    {
      id: "m9-q9",
      question: "¿Cómo se controla Metasound desde Lua?",
      options: [
        "Con SetParameter en el componente de audio",
        "No se puede controlar",
        "Con una variable global",
        "Con una función de red"
      ],
      correctAnswer: 0,
      explanation: "SetParameter permite cambiar parámetros de Metasound dinámicamente desde Lua.",
    },
    // Quest System
    {
      id: "m9-q10",
      question: "¿Qué componentes tiene un sistema de quests típico?",
      options: [
        "Objetivos, tracking, rewards, estados",
        "Solo objetivos",
        "Solo rewards",
        "Ninguno"
      ],
      correctAnswer: 0,
      explanation: "Un sistema de quests completo tiene objetivos, tracking visual, rewards y gestión de estados.",
    },
    {
      id: "m9-q11",
      question: "¿Qué es un 'Quest Graph'?",
      options: [
        "Una representación visual de quests y sus dependencias",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Quest Graph muestra visualmente las quests y cómo se conectan/dependen entre sí.",
    },
    // Event Bus
    {
      id: "m9-q12",
      question: "¿Qué es un 'Event Bus' o sistema Publisher/Subscriber?",
      options: [
        "Un sistema donde componentes se suscriben a eventos",
        "Un tipo de autobús",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Event Bus permite que componentes se suscriban a eventos sin acoplamiento directo.",
    },
    {
      id: "m9-q13",
      question: "¿Qué ventaja tiene un Event Bus?",
      options: [
        "Desacoplar sistemas y facilitar comunicación",
        "Más FPS",
        "Mejores gráficos",
        "Menos código"
      ],
      correctAnswer: 0,
      explanation: "Event Bus desacopla sistemas, permitiendo comunicación sin dependencias directas.",
    },
    // Práctica
    {
      id: "m9-q14",
      question: "¿Qué es un 'dungeon crawler procedural'?",
      options: [
        "Un juego con dungeons generadas proceduralmente",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Dungeon crawler procedural genera dungeons únicas en cada partida usando algoritmos.",
    },
    {
      id: "m9-q15",
      question: "¿Qué es 'audio reactivo'?",
      options: [
        "Audio que responde a eventos del juego",
        "Audio que no cambia",
        "Un tipo de material",
        "Una función de Lua"
      ],
      correctAnswer: 0,
      explanation: "Audio reactivo cambia y responde dinámicamente a eventos del juego (disparos, pasos, etc.).",
    },
  ],

  // ============================================
  // MÓDULO 10: Arquitectura de Proyecto Real
  // ============================================
  "mes-10": [
    // Game Framework
    {
      id: "m10-q1",
      question: "¿Qué es un GameMode en UE5?",
      options: [
        "Una clase que define las reglas del juego",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "GameMode define las reglas del juego: puntuación, condiciones de victoria, etc.",
    },
    {
      id: "m10-q2",
      question: "¿Qué es un GameState?",
      options: [
        "Una clase que almacena el estado del juego replicado",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "GameState almacena el estado del juego que se replica a todos los clientes.",
    },
    {
      id: "m10-q3",
      question: "¿Qué es un PlayerState?",
      options: [
        "Una clase que almacena información de un jugador específico",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "PlayerState almacena información de un jugador (nombre, puntuación, etc.) replicada a todos.",
    },
    // Data-Driven Design
    {
      id: "m10-q4",
      question: "¿Qué es 'data-driven design'?",
      options: [
        "Diseñar el juego usando datos externos (JSON, CSV) en lugar de código duro",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Data-driven design usa archivos de datos externos para definir comportamiento, facilitando balance y cambios.",
    },
    {
      id: "m10-q5",
      question: "¿Qué ventaja tiene data-driven design?",
      options: [
        "Cambiar balance sin recompilar código",
        "Más FPS",
        "Mejores gráficos",
        "Menos código"
      ],
      correctAnswer: 0,
      explanation: "Data-driven permite cambiar balance y configuración sin tocar código ni recompilar.",
    },
    {
      id: "m10-q6",
      question: "¿Qué es 'hot-reload' de datos?",
      options: [
        "Recargar datos en tiempo real sin reiniciar",
        "Calentar datos",
        "Un tipo de error",
        "Una función de Lua"
      ],
      correctAnswer: 0,
      explanation: "Hot-reload de datos permite recargar archivos JSON/CSV sin reiniciar el juego.",
    },
    // Testing
    {
      id: "m10-q7",
      question: "¿Qué es TDD (Test Driven Development)?",
      options: [
        "Desarrollo guiado por tests: escribir tests antes del código",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "TDD es escribir tests primero, luego código que pase los tests, asegurando calidad.",
    },
    {
      id: "m10-q8",
      question: "¿Qué es un 'unit test'?",
      options: [
        "Un test que verifica una unidad pequeña de código",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Unit test verifica que una función o método pequeño funciona correctamente.",
    },
    {
      id: "m10-q9",
      question: "¿Qué framework de testing se usa para Lua?",
      options: ["luaunit", "pytest", "JUnit", "NUnit"],
      correctAnswer: 0,
      explanation: "luaunit es un framework popular de testing unitario para Lua.",
    },
    // Arquitectura
    {
      id: "m10-q10",
      question: "¿Qué es un 'sistema core' en arquitectura de juego?",
      options: [
        "Un sistema fundamental como input, audio, o render",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Sistemas core son fundamentales: input, audio, render, física, etc.",
    },
    {
      id: "m10-q11",
      question: "¿Qué es 'acoplamiento' en arquitectura de software?",
      options: [
        "Cuán dependientes son los módulos entre sí",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Acoplamiento mide cuán dependientes son los módulos; bajo acoplamiento es mejor.",
    },
    {
      id: "m10-q12",
      question: "¿Qué es 'cohesión' en arquitectura de software?",
      options: [
        "Cuán relacionadas están las responsabilidades de un módulo",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Cohesión mide cuán relacionadas están las responsabilidades de un módulo; alta cohesión es mejor.",
    },
    // Práctica
    {
      id: "m10-q13",
      question: "¿Qué es un 'GDD' (Game Design Document)?",
      options: [
        "Un documento que describe el diseño completo del juego",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "GDD describe todos los aspectos del diseño del juego: mecánicas, arte, audio, etc.",
    },
    {
      id: "m10-q14",
      question: "¿Qué es 'scope' en desarrollo de juegos?",
      options: [
        "El alcance y tamaño del proyecto",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Scope define el alcance del proyecto; scope creep es cuando crece sin control.",
    },
    {
      id: "m10-q15",
      question: "¿Qué es un 'vertical slice'?",
      options: [
        "Una demo jugable pulida de una parte del juego",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Vertical slice es una demo pequeña pero pulida que representa la calidad final del juego.",
    },
  ],

  // ============================================
  // MÓDULO 11: Producción del Juego Final
  // ============================================
  "mes-11": [
    // Core Loop
    {
      id: "m11-q1",
      question: "¿Qué es el 'core loop' de un juego?",
      options: [
        "El ciclo principal de gameplay que se repite",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Core loop es el ciclo principal de acciones que el jugador repite (ej: combatir, lootear, mejorar).",
    },
    {
      id: "m11-q2",
      question: "¿Qué hace un core loop bueno?",
      options: [
        "Engancha al jugador y lo mantiene jugando",
        "Más FPS",
        "Mejores gráficos",
        "Menos código"
      ],
      correctAnswer: 0,
      explanation: "Un buen core loop es adictivo y mantiene al jugador enganchado jugando una y otra vez.",
    },
    // Contenido
    {
      id: "m11-q3",
      question: "¿Qué es un 'nivel' en diseño de juegos?",
      options: [
        "Un área de juego con desafíos específicos",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Un nivel es un área de juego diseñada con desafíos, enemigos y objetivos específicos.",
    },
    {
      id: "m11-q4",
      question: "¿Qué es la 'curva de dificultad'?",
      options: [
        "Cómo aumenta la dificultad a lo largo del juego",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Curva de dificultad define cómo progresa la dificultad para mantener el juego desafiante pero justo.",
    },
    // Menus y UX
    {
      id: "m11-q5",
      question: "¿Qué es un 'flow' de UI?",
      options: [
        "El flujo de navegación entre pantallas de UI",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Flow de UI es cómo el jugador navega entre menús y pantallas de forma intuitiva.",
    },
    {
      id: "m11-q6",
      question: "¿Qué es 'localización' en juegos?",
      options: [
        "Traducir y adaptar el juego a diferentes idiomas y regiones",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Localización traduce textos y adapta contenido culturalmente para diferentes regiones.",
    },
    // Polish
    {
      id: "m11-q7",
      question: "¿Qué es 'game feel' o 'juice'?",
      options: [
        "La sensación satisfactoria del gameplay con feedback visual/sonoro",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Game feel/juice es el feedback satisfactorio (partículas, screenshake, sonido) que hace el juego divertido.",
    },
    {
      id: "m11-q8",
      question: "¿Qué es 'screen shake'?",
      options: [
        "Un efecto de cámara que vibra para impacto",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Screen shake es un efecto de vibración de cámara que añade impacto a acciones.",
    },
    {
      id: "m11-q9",
      question: "¿Qué son 'particle effects'?",
      options: [
        "Efectos visuales hechos de partículas",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Particle effects son efectos visuales (explosiones, fuego, magia) hechos de muchas partículas pequeñas.",
    },
    // Optimización Final
    {
      id: "m11-q10",
      question: "¿Qué es 'profiling final'?",
      options: [
        "Analizar rendimiento antes del lanzamiento para optimizar",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Profiling final analiza el rendimiento completo del juego para identificar y arreglar bottlenecks.",
    },
    {
      id: "m11-q11",
      question: "¿Qué es 'bug fixing'?",
      options: [
        "Arreglar errores y problemas del juego",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Bug fixing es el proceso de encontrar y arreglar errores antes del lanzamiento.",
    },
    // Lanzamiento
    {
      id: "m11-q12",
      question: "¿Qué es itch.io?",
      options: [
        "Una plataforma para publicar y distribuir juegos indie",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "itch.io es una plataforma popular para publicar juegos indie y obtener feedback.",
    },
    {
      id: "m11-q13",
      question: "¿Qué es 'feedback externo'?",
      options: [
        "Opiniones de jugadores fuera del equipo de desarrollo",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Feedback externo son opiniones de jugadores reales que ayudan a mejorar el juego.",
    },
    {
      id: "m11-q14",
      question: "¿Qué es una 'Alpha' en desarrollo?",
      options: [
        "Una versión jugable pero incompleta del juego",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Alpha es una versión jugable con features principales pero incompleta, para testing interno.",
    },
    {
      id: "m11-q15",
      question: "¿Qué es una 'Beta' en desarrollo?",
      options: [
        "Una versión casi completa para testing externo",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Beta es una versión casi completa, estable, para testing externo antes del lanzamiento.",
    },
  ],

  // ============================================
  // MÓDULO 12: Portfolio y Documentación
  // ============================================
  "mes-12": [
    // Librería Lua
    {
      id: "m12-q1",
      question: "¿Qué es un 'Lua Toolkit'?",
      options: [
        "Una colección de módulos Lua reutilizables",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Lua Toolkit es una colección de módulos y utilidades reutilizables para futuros proyectos.",
    },
    {
      id: "m12-q2",
      question: "¿Qué es 'refactorizar' código?",
      options: [
        "Mejorar la estructura del código sin cambiar su comportamiento",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Refactorizar mejora la estructura, legibilidad y mantenibilidad sin cambiar funcionalidad.",
    },
    // Documentación
    {
      id: "m12-q3",
      question: "¿Qué es EmmyLua?",
      options: [
        "Un sistema de annotations para documentar código Lua",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "EmmyLua usa annotations (@param, @return) para documentar código y mejorar autocompletado.",
    },
    {
      id: "m12-q4",
      question: "¿Qué annotation se usa para parámetros en EmmyLua?",
      options: ["@param", "@return", "@type", "@class"],
      correctAnswer: 0,
      explanation: "@param se usa para documentar parámetros de función en EmmyLua.",
    },
    {
      id: "m12-q5",
      question: "¿Qué es un README?",
      options: [
        "Un archivo que documenta cómo usar un proyecto",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "README es un archivo (generalmente .md) que explica cómo usar y contribuir a un proyecto.",
    },
    // Contenido Público
    {
      id: "m12-q6",
      question: "¿Qué es un 'post técnico'?",
      options: [
        "Un artículo que explica aspectos técnicos del desarrollo",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Post técnico es un artículo de blog que comparte conocimiento técnico con la comunidad.",
    },
    {
      id: "m12-q7",
      question: "¿Qué es un 'devlog'?",
      options: [
        "Un video o blog que documenta el proceso de desarrollo",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Devlog es un diario de desarrollo que muestra el progreso y decisiones del proyecto.",
    },
    {
      id: "m12-q8",
      question: "¿Qué es 'open source'?",
      options: [
        "Código fuente disponible públicamente para usar y contribuir",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Open source es software con código fuente disponible para usar, modificar y distribuir.",
    },
    // Portfolio
    {
      id: "m12-q9",
      question: "¿Qué debe incluir un portfolio de desarrollador?",
      options: [
        "Proyectos documentados, código, y descripciones de tu rol",
        "Solo el juego final",
        "Solo código",
        "Nada"
      ],
      correctAnswer: 0,
      explanation: "Un buen portfolio muestra proyectos variados con documentación clara de tu contribución.",
    },
    {
      id: "m12-q10",
      question: "¿Qué es mejor en un portfolio?",
      options: [
        "Pocos proyectos bien documentados que muchos sin contexto",
        "Muchos proyectos sin documentación",
        "Solo el juego final",
        "Nada"
      ],
      correctAnswer: 0,
      explanation: "Calidad sobre cantidad: pocos proyectos bien documentados muestran mejor tus habilidades.",
    },
    {
      id: "m12-q11",
      question: "¿Dónde se puede alojar un portfolio?",
      options: [
        "GitHub Pages, sitio web personal, PDF",
        "Solo en papel",
        "Solo en GitHub",
        "Ninguna"
      ],
      correctAnswer: 0,
      explanation: "Un portfolio puede estar en GitHub Pages, sitio web propio, o incluso un PDF bien diseñado.",
    },
    // Comunidad
    {
      id: "m12-q12",
      question: "¿Qué es contribuir a open source?",
      options: [
        "Ayudar a proyectos públicos con código, documentación, etc.",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Contribuir a open source es ayudar a proyectos públicos con código, bugs, documentación, etc.",
    },
    {
      id: "m12-q13",
      question: "¿Qué es un 'pull request' en GitHub?",
      options: [
        "Una solicitud para fusionar cambios en un repositorio",
        "Un tipo de material",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Pull request es una solicitud para revisar y fusionar cambios en un repositorio.",
    },
    {
      id: "m12-q14",
      question: "¿Por qué es importante compartir conocimiento?",
      options: [
        "Ayuda a otros, establece tu reputación, y refuerza tu aprendizaje",
        "No es importante",
        "Solo para famosos",
        "Pérdida de tiempo"
      ],
      correctAnswer: 0,
      explanation: "Compartir conocimiento ayuda a la comunidad, establece tu reputación, y refuerza tu propio aprendizaje.",
    },
    {
      id: "m12-q15",
      question: "¿Qué es el 'networking' en la industria de juegos?",
      options: [
        "Construir relaciones profesionales con otros desarrolladores",
        "Un tipo de red",
        "Una función de Lua",
        "Un componente de UI"
      ],
      correctAnswer: 0,
      explanation: "Networking es construir relaciones profesionales que pueden llevar a oportunidades y colaboraciones.",
    },
  ],
};

// Función helper para obtener preguntas de un módulo
export function getQuizQuestions(moduleId: string): QuizQuestion[] {
  return quizQuestionsByModule[moduleId] || [];
}

// Función helper para verificar si un módulo tiene preguntas
export function hasQuizQuestions(moduleId: string): boolean {
  return quizQuestionsByModule[moduleId] !== undefined;
}

// Función helper para obtener todos los IDs de módulos con preguntas
export function getModulesWithQuizzes(): string[] {
  return Object.keys(quizQuestionsByModule);
}
