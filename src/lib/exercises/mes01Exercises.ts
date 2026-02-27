import { Exercise } from "@/components/ExerciseRunner";

export const mes01Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: Introducción a Lua
  // ============================================
  {
    id: "mes-01-leccion-1-ej-1",
    lessonId: "l1-intro",
    title: "Tu Primer Programa",
    instructions: 'Escribe tu primer programa en Lua que imprima "¡Hola, Lua!" en la consola.\n\n**Requisitos:**\n- Usa la función `print()`\n- El mensaje debe ser exactamente "¡Hola, Lua!"',
    starterCode: '-- Escribe tu código aquí\n\n',
    solution: 'print("¡Hola, Lua!")',
    tests: [
      { type: "output_contains", expected: "¡Hola, Lua!", message: "El mensaje debe contener '¡Hola, Lua!'" },
    ],
    hints: [
      "Usa print() seguido del texto entre paréntesis",
      "El texto debe estar entre comillas dobles o simples",
    ],
    difficulty: "beginner",
    xpReward: 25,
  },
  {
    id: "mes-01-leccion-1-ej-2",
    lessonId: "l1-intro",
    title: "Declarar Variables",
    instructions: 'Declara dos variables locales:\n1. `nombre` con tu nombre (string)\n2. `edad` con tu edad (number)\n\nLuego imprime ambas variables usando `print()`.\n\n**Requisitos:**\n- Usa `local` para declarar las variables\n- Imprime al menos una de las variables',
    starterCode: '-- Declara tus variables aquí\n\n-- Imprime el resultado\n',
    solution: 'local nombre = "Juan"\nlocal edad = 25\nprint(nombre)\nprint(edad)',
    tests: [
      { type: "code_contains", expected: "local", message: "Debes usar 'local' para declarar variables" },
      { type: "code_contains", expected: "print", message: "Debes usar print() para mostrar el valor" },
    ],
    hints: [
      "La sintaxis es: local variable = valor",
      "Los strings van entre comillas, los números no",
    ],
    difficulty: "beginner",
    xpReward: 30,
  },
  {
    id: "mes-01-leccion-1-ej-3",
    lessonId: "l1-intro",
    title: "Concatenar Strings",
    instructions: 'Crea una variable `saludo` que contenga "Hola" y otra `nombre` que contenga "Estudiante".\n\nLuego crea una tercera variable `mensaje` que concatene ambas con un espacio en el medio.\n\nFinalmente, imprime el `mensaje`.\n\n**Resultado esperado:** "Hola Estudiante"',
    starterCode: 'local saludo = "Hola"\nlocal nombre = "Estudiante"\n\n-- Concatena y muestra el resultado\n',
    solution: 'local saludo = "Hola"\nlocal nombre = "Estudiante"\nlocal mensaje = saludo .. " " .. nombre\nprint(mensaje)',
    tests: [
      { type: "output_equals", expected: "Hola Estudiante", message: "El mensaje debe ser 'Hola Estudiante'" },
      { type: "code_contains", expected: "..", message: "Debes usar el operador .. para concatenar" },
    ],
    hints: [
      "En Lua, el operador .. se usa para concatenar strings",
      "No olvides agregar el espacio entre las palabras: .. \" \" ..",
    ],
    difficulty: "beginner",
    xpReward: 35,
  },

  // ============================================
  // LECCIÓN 2: Tipos de Datos
  // ============================================
  {
    id: "mes-01-leccion-2-ej-1",
    lessonId: "l2-types",
    title: "Explorar Tipos de Datos",
    instructions: 'Crea variables de los siguientes tipos y usa `type()` para mostrar su tipo:\n\n1. Un string llamado `texto`\n2. Un number llamado `numero`\n3. Un boolean llamado `verdadero`\n4. Una table llamada `tabla`\n\n**Salida esperada:**\ntexto: string\nnumero: number\nverdadero: boolean\ntabla: table',
    starterCode: '-- Crea las variables\n\n-- Muestra sus tipos\n',
    solution: 'local texto = "Hola"\nlocal numero = 42\nlocal verdadero = true\nlocal tabla = {}\n\nprint("texto:", type(texto))\nprint("numero:", type(numero))\nprint("verdadero:", type(verdadero))\nprint("tabla:", type(tabla))',
    tests: [
      { type: "output_contains", expected: "string", message: "Debe mostrar 'string'" },
      { type: "output_contains", expected: "number", message: "Debe mostrar 'number'" },
      { type: "output_contains", expected: "boolean", message: "Debe mostrar 'boolean'" },
      { type: "output_contains", expected: "table", message: "Debe mostrar 'table'" },
    ],
    hints: [
      "Usa type(variable) para obtener el tipo de dato",
      "true es un valor booleano válido",
      "{} crea una tabla vacía",
    ],
    difficulty: "beginner",
    xpReward: 40,
  },
  {
    id: "mes-01-leccion-2-ej-2",
    lessonId: "l2-types",
    title: "Operaciones Matemáticas",
    instructions: 'Declara dos variables numéricas `a` y `b` con los valores 10 y 5.\n\nLuego realiza las siguientes operaciones e imprime los resultados:\n- Suma: a + b\n- Resta: a - b\n- Multiplicación: a * b\n- División: a / b\n- Potencia: a ^ b\n\n**Formato de salida:**\nSuma: 15\nResta: 5\nMultiplicación: 50\nDivisión: 2\nPotencia: 100000',
    starterCode: 'local a = 10\nlocal b = 5\n\n-- Realiza las operaciones\n',
    solution: 'local a = 10\nlocal b = 5\n\nprint("Suma:", a + b)\nprint("Resta:", a - b)\nprint("Multiplicación:", a * b)\nprint("División:", a / b)\nprint("Potencia:", a ^ b)',
    tests: [
      { type: "output_contains", expected: "Suma: 15", message: "La suma debe ser 15" },
      { type: "output_contains", expected: "División: 2", message: "La división debe ser 2" },
    ],
    hints: [
      "El operador ^ se usa para potencia en Lua",
      "La división en Lua siempre retorna número con punto flotante",
    ],
    difficulty: "beginner",
    xpReward: 40,
  },

  // ============================================
  // LECCIÓN 3: Control de Flujo
  // ============================================
  {
    id: "mes-01-leccion-3-ej-1",
    lessonId: "l3-flow",
    title: "Condicional Simple",
    instructions: 'Crea una variable `edad` con valor 18.\n\nEscribe un condicional que:\n- Si la edad es mayor o igual a 18, imprima "Eres mayor de edad"\n- Si no, imprima "Eres menor de edad"\n\n**Pista:** Usa `if`, `then`, `else`, y `end`.',
    starterCode: 'local edad = 18\n\n-- Escribe tu condicional aquí\n',
    solution: 'local edad = 18\n\nif edad >= 18 then\n  print("Eres mayor de edad")\nelse\n  print("Eres menor de edad")\nend',
    tests: [
      { type: "output_contains", expected: "mayor de edad", message: "Debe imprimir el mensaje correcto" },
      { type: "code_contains", expected: "if", message: "Debes usar 'if' para el condicional" },
      { type: "code_contains", expected: "end", message: "No olvides cerrar con 'end'" },
    ],
    hints: [
      "La sintaxis es: if condición then ... else ... end",
      "Usa >= para 'mayor o igual'",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-01-leccion-3-ej-2",
    lessonId: "l3-flow",
    title: "Bucle For Numérico",
    instructions: 'Usa un bucle `for` para imprimir los números del 1 al 10.\n\n**Salida esperada:**\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n\n**Pista:** La sintaxis es `for i = 1, 10 do ... end`',
    starterCode: '-- Escribe tu bucle for aquí\n',
    solution: 'for i = 1, 10 do\n  print(i)\nend',
    tests: [
      { type: "output_contains", expected: "1", message: "Debe imprimir 1" },
      { type: "output_contains", expected: "10", message: "Debe imprimir 10" },
      { type: "code_contains", expected: "for", message: "Debes usar un bucle 'for'" },
      { type: "output_lines", expected: 10, message: "Debe imprimir exactamente 10 líneas" },
    ],
    hints: [
      "El bucle for numérico es: for i = inicio, fin do",
      "No olvides la palabra clave 'do' después de los números",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-01-leccion-3-ej-3",
    lessonId: "l3-flow",
    title: "Tabla de Multiplicar",
    instructions: 'Crea un programa que imprima la tabla de multiplicar del 5 (del 1 al 10).\n\n**Salida esperada:**\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n...\n5 x 10 = 50\n\n**Pista:** Usa un bucle for y concatenación de strings.',
    starterCode: 'local numero = 5\n\n-- Escribe tu bucle aquí\n',
    solution: 'local numero = 5\n\nfor i = 1, 10 do\n  print(numero .. " x " .. i .. " = " .. (numero * i))\nend',
    tests: [
      { type: "output_contains", expected: "5 x 1 = 5", message: "Primera línea incorrecta" },
      { type: "output_contains", expected: "5 x 10 = 50", message: "Última línea incorrecta" },
      { type: "output_lines", expected: 10, message: "Debe imprimir exactamente 10 líneas" },
    ],
    hints: [
      "Usa un bucle for del 1 al 10",
      "Concatena con .. para formar el mensaje",
      "La multiplicación va entre paréntesis: (numero * i)",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },

  // ============================================
  // LECCIÓN 4: Funciones
  // ============================================
  {
    id: "mes-01-leccion-4-ej-1",
    lessonId: "l4-functions",
    title: "Crear Función Simple",
    instructions: 'Crea una función llamada `saludar` que:\n- No reciba parámetros\n- Imprima "¡Hola desde mi función!"\n\nLuego llama a la función para ejecutarla.',
    starterCode: '-- Define tu función aquí\n\n-- Llama a la función\n',
    solution: 'function saludar()\n  print("¡Hola desde mi función!")\nend\n\nsaludar()',
    tests: [
      { type: "output_contains", expected: "¡Hola desde mi función!", message: "La función debe imprimir el mensaje correcto" },
      { type: "code_contains", expected: "function", message: "Debes usar 'function' para definir" },
      { type: "code_contains", expected: "end", message: "No olvides cerrar con 'end'" },
    ],
    hints: [
      "La sintaxis es: function nombre() ... end",
      "Para llamar la función, escribe su nombre seguido de paréntesis",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-01-leccion-4-ej-2",
    lessonId: "l4-functions",
    title: "Función con Parámetros",
    instructions: 'Crea una función llamada `sumar` que:\n- Reciba dos parámetros: `a` y `b`\n- Retorne la suma de ambos\n\nLuego llama a la función con los valores 7 y 3, e imprime el resultado.\n\n**Salida esperada:** `10`',
    starterCode: '-- Define tu función aquí\n\n-- Llama y muestra el resultado\n',
    solution: 'function sumar(a, b)\n  return a + b\nend\n\nprint(sumar(7, 3))',
    tests: [
      { type: "output_equals", expected: "10", message: "El resultado debe ser 10" },
      { type: "code_contains", expected: "return", message: "Debes usar 'return' para retornar el valor" },
    ],
    hints: [
      "Los parámetros van entre paréntesis: function sumar(a, b)",
      "Usa 'return' para devolver el resultado",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-01-leccion-4-ej-3",
    lessonId: "l4-functions",
    title: "Función con Múltiples Retornos",
    instructions: 'Lua permite retornar múltiples valores. Crea una función `operaciones` que:\n- Reciba dos números `a` y `b`\n- Retorne 4 valores: suma, resta, multiplicación y división\n\nLuego llama a la función con 20 y 4, e imprime los 4 resultados.\n\n**Salida esperada:**\nSuma: 24\nResta: 16\nMultiplicación: 80\nDivisión: 5',
    starterCode: '-- Define tu función con múltiples retornos\n\n-- Llama y muestra los resultados\n',
    solution: 'function operaciones(a, b)\n  return a + b, a - b, a * b, a / b\nend\n\nlocal suma, resta, multi, divi = operaciones(20, 4)\nprint("Suma:", suma)\nprint("Resta:", resta)\nprint("Multiplicación:", multi)\nprint("División:", divi)',
    tests: [
      { type: "output_contains", expected: "Suma: 24", message: "Suma incorrecta" },
      { type: "output_contains", expected: "División: 5", message: "División incorrecta" },
      { type: "code_contains", expected: "return", message: "Debes usar 'return'" },
    ],
    hints: [
      "En Lua puedes retornar múltiples valores separados por comas",
      "Puedes recibir los múltiples retornos en múltiples variables",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },

  // ============================================
  // LECCIÓN 5: Tablas
  // ============================================
  {
    id: "mes-01-leccion-5-ej-1",
    lessonId: "l5-tables",
    title: "Crear Tabla Array",
    instructions: 'Crea una tabla llamada `frutas` que contenga 3 frutas:\n- Posición 1: "Manzana"\n- Posición 2: "Banana"\n- Posición 3: "Naranja"\n\nLuego imprime la segunda fruta (debe mostrar "Banana").\n\n**Nota:** En Lua, los arrays comienzan en el índice 1, no en 0.',
    starterCode: '-- Crea tu tabla aquí\n\n-- Imprime la segunda fruta\n',
    solution: 'local frutas = {"Manzana", "Banana", "Naranja"}\nprint(frutas[2])',
    tests: [
      { type: "output_equals", expected: "Banana", message: "Debe imprimir 'Banana'" },
      { type: "code_contains", expected: "{}", message: "Debes usar {} para crear la tabla" },
    ],
    hints: [
      "Las tablas se crean con llaves: {}",
      "Los elementos se separan por comas",
      "Accede con tabla[indice]",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-01-leccion-5-ej-2",
    lessonId: "l5-tables",
    title: "Iterar sobre Tabla con ipairs",
    instructions: 'Crea una tabla `numeros` con los valores {10, 20, 30, 40, 50}.\n\nUsa `ipairs` para iterar sobre la tabla e imprimir cada número multiplicado por 2.\n\n**Salida esperada:**\n20\n40\n60\n80\n100',
    starterCode: 'local numeros = {10, 20, 30, 40, 50}\n\n-- Itera y muestra el resultado\n',
    solution: 'local numeros = {10, 20, 30, 40, 50}\n\nfor indice, valor in ipairs(numeros) do\n  print(valor * 2)\nend',
    tests: [
      { type: "output_contains", expected: "20", message: "Primer valor incorrecto" },
      { type: "output_contains", expected: "100", message: "Último valor incorrecto" },
      { type: "code_contains", expected: "ipairs", message: "Debes usar ipairs para iterar" },
      { type: "output_lines", expected: 5, message: "Debe imprimir 5 líneas" },
    ],
    hints: [
      "ipairs retorna índice y valor: for i, v in ipairs(tabla)",
      "Multiplica el valor por 2 dentro del bucle",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },
  {
    id: "mes-01-leccion-5-ej-3",
    lessonId: "l5-tables",
    title: "Tabla como Diccionario",
    instructions: 'Crea una tabla llamada `jugador` que represente un personaje con:\n- nombre = "Guerrero"\n- nivel = 25\n- salud = 100\n- vivo = true\n\nLuego imprime los datos en el siguiente formato:\n\n**Salida esperada:**\nNombre: Guerrero\nNivel: 25\nSalud: 100\nVivo: true\n\n**Pista:** Puedes acceder a las propiedades con `tabla.propiedad` o `tabla["propiedad"]`.',
    starterCode: '-- Crea la tabla jugador\n\n-- Imprime los datos\n',
    solution: 'local jugador = {\n  nombre = "Guerrero",\n  nivel = 25,\n  salud = 100,\n  vivo = true\n}\n\nprint("Nombre:", jugador.nombre)\nprint("Nivel:", jugador.nivel)\nprint("Salud:", jugador.salud)\nprint("Vivo:", jugador.vivo)',
    tests: [
      { type: "output_contains", expected: "Nombre: Guerrero", message: "Nombre incorrecto" },
      { type: "output_contains", expected: "Nivel: 25", message: "Nivel incorrecto" },
      { type: "code_contains", expected: "=", message: "Debes asignar valores con =" },
    ],
    hints: [
      "Las tablas como diccionario usan clave = valor",
      "Accede a las propiedades con punto: jugador.nombre",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },

  // ============================================
  // EJERCICIO FINAL - Integrador
  // ============================================
  {
    id: "mes-01-final-proyecto",
    lessonId: "l5-tables",
    title: "Proyecto Final: Sistema de Inventario",
    instructions: 'Crea un sistema de inventario simple que incluya:\n\n1. Una tabla `inventario` con al menos 3 items (cada item es una tabla con nombre, cantidad y valor)\n2. Una función `mostrarInventario` que imprima todos los items\n3. Una función `agregarItem` que agregue un item al inventario\n4. Una función `calcularValorTotal` que retorne el valor total del inventario\n\n**Requisitos:**\n- El inventario debe comenzar con 3 items\n- Debes agregar 1 item adicional usando la función\n- Debes mostrar el inventario completo\n- Debes mostrar el valor total',
    starterCode: '-- Crea tu sistema de inventario aquí\n\n-- Prueba las funciones\n',
    solution: 'local inventario = {\n  {nombre = "Pocion", cantidad = 5, valor = 10},\n  {nombre = "Espada", cantidad = 1, valor = 100},\n  {nombre = "Escudo", cantidad = 2, valor = 75}\n}\n\nfunction mostrarInventario()\n  print("=== INVENTARIO ===")\n  for _, item in ipairs(inventario) do\n    print("- " .. item.nombre .. " x" .. item.cantidad .. " (valor: " .. (item.valor * item.cantidad) .. ")")\n  end\nend\n\nfunction agregarItem(nombre, cantidad, valor)\n  table.insert(inventario, {nombre = nombre, cantidad = cantidad, valor = valor})\nend\n\nfunction calcularValorTotal()\n  local total = 0\n  for _, item in ipairs(inventario) do\n    total = total + (item.valor * item.cantidad)\n  end\n  return total\nend\n\n-- Pruebas\nagregarItem("Arco", 1, 75)\nmostrarInventario()\nprint("\\nValor total:", calcularValorTotal())',
    tests: [
      { type: "output_contains", expected: "=== INVENTARIO ===", message: "Debe mostrar el encabezado" },
      { type: "output_contains", expected: "Valor total:", message: "Debe mostrar el valor total" },
      { type: "code_contains", expected: "function", message: "Debes crear funciones" },
      { type: "code_contains", expected: "table.insert", message: "Debes usar table.insert para agregar items" },
    ],
    hints: [
      "Cada item es una tabla con nombre, cantidad y valor",
      "Usa table.insert para agregar items al inventario",
      "Recorre el inventario con ipairs para mostrar y calcular el total",
    ],
    difficulty: "advanced",
    xpReward: 150,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes01Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes01Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes01Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
