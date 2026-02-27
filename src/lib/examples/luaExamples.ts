import { ExampleCode } from "@/components/CodeEditor";

export const luaExamples: ExampleCode[] = [
  {
    name: "📜 Hola Mundo",
    description: "Tu primer programa en Lua",
    difficulty: "beginner",
    code: `-- ============================================
-- HOLA MUNDO EN LUA
-- Tu primer programa en Lua Master Pro
-- ============================================

print("¡Hola, Mundo!")
print("Bienvenido a Lua Master Pro")
print("")

-- Variables básicas
local nombre = "Estudiante"
local nivel = 1
local experiencia = 0
local salud = 100

-- Imprimir información
print("=== Ficha de Personaje ===")
print("Nombre:", nombre)
print("Nivel:", nivel)
print("Experiencia:", experiencia)
print("Salud:", salud)
print("")

-- Operaciones matemáticas
local nuevoNivel = nivel + 1
local experienciaNecesaria = nivel * 100

print("Próximo nivel:", nuevoNivel)
print("Experiencia necesaria:", experienciaNecesaria)
print("")

-- Concatenación de strings
print("Mensaje de bienvenida: " .. "¡Vamos a aprender Lua!")
print("Tu nombre tiene " .. #nombre .. " letras")`,
  },
  {
    name: "🧮 Calculadora Completa",
    description: "Sistema de calculadora con todas las operaciones",
    difficulty: "beginner",
    code: `-- ============================================
-- CALCULADORA EN LUA
-- Operaciones matemáticas básicas
-- ============================================

local function calculadora(a, b, operacion)
  if operacion == "suma" or operacion == "+" then
    return a + b
  elseif operacion == "resta" or operacion == "-" then
    return a - b
  elseif operacion == "multiplicacion" or operacion == "*" then
    return a * b
  elseif operacion == "division" or operacion == "/" then
    if b ~= 0 then
      return a / b
    else
      return "❌ Error: División por cero"
    end
  elseif operacion == "potencia" or operacion == "^" then
    return a ^ b
  elseif operacion == "raiz" then
    return math.sqrt(a)
  elseif operacion == "modulo" or operacion == "%" then
    return a % b
  else
    return "❌ Operación inválida: " .. tostring(operacion)
  end
end

-- ============================================
-- PRUEBAS DE LA CALCULADORA
-- ============================================

print("=== CALCULADORA LUA ===")
print("")

local num1, num2 = 10, 5

print("Números: " .. num1 .. " y " .. num2)
print("")

print("Suma:         " .. num1 .. " + " .. num2 .. " = " .. calculadora(num1, num2, "suma"))
print("Resta:        " .. num1 .. " - " .. num2 .. " = " .. calculadora(num1, num2, "resta"))
print("Multiplicación: " .. num1 .. " * " .. num2 .. " = " .. calculadora(num1, num2, "multiplicacion"))
print("División:     " .. num1 .. " / " .. num2 .. " = " .. calculadora(num1, num2, "division"))
print("Potencia:     " .. num1 .. " ^ " .. num2 .. " = " .. calculadora(num1, num2, "potencia"))
print("Raíz de " .. num1 .. ":    √" .. num1 .. " = " .. calculadora(num1, 0, "raiz"))
print("Módulo:       " .. num1 .. " % " .. num2 .. " = " .. calculadora(num1, num2, "modulo"))
print("")

-- Caso especial: división por cero
print("División por cero: " .. num1 .. " / 0 = " .. tostring(calculadora(num1, 0, "division")))`,
  },
  {
    name: "📊 Sistema de Inventario",
    description: "Gestión de inventario con tablas",
    difficulty: "intermediate",
    code: `-- ============================================
-- SISTEMA DE INVENTARIO
-- Gestión de items con tablas
-- ============================================

-- Crear inventario
local inventario = {
  pociones = {
    nombre = "Poción de Salud",
    cantidad = 5,
    valor = 10
  },
  espada = {
    nombre = "Espada de Hierro",
    cantidad = 1,
    valor = 50,
    daño = 15
  },
  escudo = {
    nombre = "Escudo de Madera",
    cantidad = 1,
    valor = 30,
    defensa = 10
  }
}

-- Función para mostrar inventario
local function mostrarInventario(inv)
  print("=== INVENTARIO DEL JUGADOR ===")
  print("")
  
  local totalValor = 0
  local totalItems = 0
  
  for key, item in pairs(inv) do
    print("📦 " .. item.nombre)
    print("   Cantidad: " .. item.cantidad)
    print("   Valor: " .. item.valor .. " oro")
    
    if item.daño then
      print("   ⚔️  Daño: " .. item.daño)
    end
    
    if item.defensa then
      print("   🛡️  Defensa: " .. item.defensa)
    end
    
    totalValor = totalValor + (item.valor * item.cantidad)
    totalItems = totalItems + item.cantidad
    print("")
  end
  
  print("─────────────────────────────")
  print("Total de items: " .. totalItems)
  print("Valor total: " .. totalValor .. " oro")
  print("─────────────────────────────")
end

-- Función para agregar item
local function agregarItem(inv, nombre, cantidad, valor)
  inv[nombre] = {
    nombre = nombre,
    cantidad = cantidad,
    valor = valor
  }
  print("✅ Item agregado: " .. nombre)
end

-- Función para usar item
local function usarItem(inv, nombre)
  if inv[nombre] and inv[nombre].cantidad > 0 then
    inv[nombre].cantidad = inv[nombre].cantidad - 1
    print("🧪 Usaste: " .. nombre)
    
    if inv[nombre].cantidad == 0 then
      print("⚠️  ¡Se agotó el item!")
      inv[nombre] = nil
    end
  else
    print("❌ No tienes: " .. nombre)
  end
end

-- ============================================
-- DEMOSTRACIÓN
-- ============================================

mostrarInventario(inventario)

print("")
print("=== USANDO ITEMS ===")
usarItem(inventario, "pociones")
usarItem(inventario, "pociones")
usarItem(inventario, "pociones")
usarItem(inventario, "pociones")
usarItem(inventario, "pociones")
usarItem(inventario, "espada")

print("")
agregarItem(inventario, "Arco", 1, 75)

print("")
mostrarInventario(inventario)`,
  },
  {
    name: "🎲 Sistema de Dados RPG",
    description: "Simulador de dados para juegos de rol",
    difficulty: "intermediate",
    code: `-- ============================================
-- SISTEMA DE DADOS RPG
-- Simulador de tiradas de dados
-- ============================================

math.randomseed(os.time())

-- Función para tirar un dado
local function tirarDado(caras)
  return math.random(1, caras)
end

-- Función para tirar múltiples dados
local function tirarDados(cantidad, caras)
  local total = 0
  local resultados = {}
  
  for i = 1, cantidad do
    local resultado = tirarDado(caras)
    table.insert(resultados, resultado)
    total = total + resultado
  end
  
  return total, resultados
end

-- Función para mostrar tirada
local function mostrarTirada(nombre, total, resultados)
  local detalles = table.concat(resultados, " + ")
  print(string.format("%-12s: %s = %d", nombre, detalles, total))
end

-- ============================================
-- DEMOSTRACIÓN DE TIRADAS
-- ============================================

print("=== SISTEMA DE DADOS RPG ===")
print("")

-- Dados comunes
print("=== TIPOS DE DADOS ===")
mostrarTirada("d4", tirarDados(1, 4))
mostrarTirada("d6", tirarDados(1, 6))
mostrarTirada("d8", tirarDados(1, 8))
mostrarTirada("d10", tirarDados(1, 10))
mostrarTirada("d12", tirarDados(1, 12))
mostrarTirada("d20", tirarDados(1, 20))
mostrarTirada("d100", tirarDados(1, 100))

print("")
print("=== COMBINACIONES ===")

-- Combinaciones comunes de D&D
mostrarTirada("2d4", tirarDados(2, 4))
mostrarTirada("2d6", tirarDados(2, 6))
mostrarTirada("3d6", tirarDados(3, 6))
mostrarTirada("2d8", tirarDados(2, 8))
mostrarTirada("2d10", tirarDados(2, 10))
mostrarTirada("2d12", tirarDados(2, 12))

print("")
print("=== TIRADA DE ATRIBUTOS (4d6, descartar el menor) ===")

local function tirarAtributo()
  local dados = {}
  for i = 1, 4 do
    table.insert(dados, tirarDado(6))
  end
  
  -- Ordenar y descartar el menor
  table.sort(dados)
  table.remove(dados, 1)
  
  local total = 0
  for _, valor in ipairs(dados) do
    total = total + valor
  end
  
  return total, dados
end

for i = 1, 6 do
  local total, dados = tirarAtributo()
  print(string.format("Atributo %d: %d + %d + %d = %d", 
    i, dados[1], dados[2], dados[3], total))
end

print("")
print("=== TIRADA CRÍTICA (d20) ===")

for i = 1, 10 do
  local resultado = tirarDado(20)
  local icono = "○"
  
  if resultado == 20 then
    icono = "🎯 ¡CRÍTICO!"
  elseif resultado == 1 then
    icono = "💀 ¡FALLO CRÍTICO!"
  elseif resultado >= 15 then
    icono = "✅ Éxito"
  elseif resultado >= 10 then
    icono = "✔️  Normal"
  else
    icono = "❌ Fallo"
  end
  
  print(string.format("Tirada %2d: [%2d] %s", i, resultado, icono))
end`,
  },
  {
    name: "🔐 Sistema de Contraseñas",
    description: "Generador y validador de contraseñas",
    difficulty: "advanced",
    code: `-- ============================================
-- SISTEMA DE CONTRASEÑAS
-- Generador y validador de seguridad
-- ============================================

math.randomseed(os.time())

-- Caracteres para contraseñas
local minusculas = "abcdefghijklmnopqrstuvwxyz"
local mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
local numeros = "0123456789"
local especiales = "!@#$%^&*()_+-=[]{}|;:,.<>?"

-- Función para elegir caracter aleatorio
local function elegirCaracter(cadena)
  local indice = math.random(1, #cadena)
  return cadena:sub(indice, indice)
end

-- Función para generar contraseña
local function generarPassword(longitud, usarMayus, usarNum, usarEsp)
  local caracteres = minusculas
  local password = ""
  
  if usarMayus then
    caracteres = caracteres .. mayusculas
  end
  
  if usarNum then
    caracteres = caracteres .. numeros
  end
  
  if usarEsp then
    caracteres = caracteres .. especiales
  end
  
  -- Generar contraseña
  for i = 1, longitud do
    password = password .. elegirCaracter(caracteres)
  end
  
  return password
end

-- Función para validar fortaleza
local function validarPassword(password)
  local puntaje = 0
  local comentarios = {}
  
  -- Longitud
  if #password >= 8 then
    puntaje = puntaje + 20
  else
    table.insert(comentarios, "❌ Muy corta (mínimo 8 caracteres)")
  end
  
  if #password >= 12 then
    puntaje = puntaje + 10
  end
  
  if #password >= 16 then
    puntaje = puntaje + 10
  end
  
  -- Mayúsculas
  if password:match("[A-Z]") then
    puntaje = puntaje + 15
  else
    table.insert(comentarios, "⚠️  Agrega mayúsculas")
  end
  
  -- Números
  if password:match("[0-9]") then
    puntaje = puntaje + 15
  else
    table.insert(comentarios, "⚠️  Agrega números")
  end
  
  -- Especiales
  if password:match("[!@#$%^&*()_+%-%[\\]{}|;:,.<>?]") then
    puntaje = puntaje + 20
  else
    table.insert(comentarios, "⚠️  Agrega caracteres especiales")
  end
  
  -- Variedad
  local tiposCaracteres = 0
  if password:match("[a-z]") then tiposCaracteres = tiposCaracteres + 1 end
  if password:match("[A-Z]") then tiposCaracteres = tiposCaracteres + 1 end
  if password:match("[0-9]") then tiposCaracteres = tiposCaracteres + 1 end
  if password:match("[!@#$%^&*()_+%-%[\\]{}|;:,.<>?]") then tiposCaracteres = tiposCaracteres + 1 end
  
  if tiposCaracteres >= 4 then
    puntaje = puntaje + 20
  end
  
  -- Determinar nivel
  local nivel = "Débil"
  local icono = "💔"
  
  if puntaje >= 80 then
    nivel = "¡Excelente!"
    icono = "🏆"
  elseif puntaje >= 60 then
    nivel = "Fuerte"
    icono = "💪"
  elseif puntaje >= 40 then
    nivel = "Regular"
    icono = "😐"
  end
  
  return puntaje, nivel, icono, comentarios
end

-- ============================================
-- DEMOSTRACIÓN
-- ============================================

print("=== GENERADOR DE CONTRASEÑAS ===")
print("")

print("Generando 5 contraseñas seguras:")
print("")

for i = 1, 5 do
  local pass = generarPassword(12, true, true, true)
  local puntaje, nivel, icono = validarPassword(pass)
  print(string.format("%d. %s  %s %s (%d%%)", i, pass, icono, nivel, puntaje))
end

print("")
print("=== VALIDADOR DE CONTRASEÑAS ===")
print("")

local testPasswords = {
  "123456",
  "password",
  "Hola123",
  "MiClave2024!",
  "X9#mK2$pL7@nQ4!",
  "SuperSegura2024#Password!"
}

for _, pass in ipairs(testPasswords) do
  local puntaje, nivel, icono, comentarios = validarPassword(pass)
  print("Contraseña: " .. pass)
  print("  " .. icono .. " " .. nivel .. " (" .. puntaje .. "%)")
  
  if #comentarios > 0 then
    print("  Mejoras:")
    for _, comentario in ipairs(comentarios) do
      print("    " .. comentario)
    end
  end
  print("")
end`,
  },
  {
    name: "📈 Analizador de Texto",
    description: "Analiza estadísticas de texto",
    difficulty: "intermediate",
    code: `-- ============================================
-- ANALIZADOR DE TEXTO
-- Estadísticas y análisis de strings
-- ============================================

local function analizarTexto(texto)
  local resultado = {}
  
  -- Contar caracteres
  resultado.longitud = #texto
  resultado.caracteresConEspacios = #texto
  
  -- Contar espacios
  resultado.espacios = select(2, texto:gsub("%s", ""))
  
  -- Contar vocales
  resultado.vocales = select(2, texto:gsub("[aeiouAEIOU]", ""))
  
  -- Contar consonantes
  resultado.consonantes = select(2, texto:gsub("[bcdfghjklmnñpqrstvwxyzBCDFGHJKLMNÑPQRSTVWXYZ]", ""))
  
  -- Contar números
  resultado.numeros = select(2, texto:gsub("[0-9]", ""))
  
  -- Contar palabras
  local palabras = {}
  for palabra in texto:gmatch("%S+") do
    table.insert(palabras, palabra)
  end
  resultado.palabras = #palabras
  resultado.listaPalabras = palabras
  
  -- Contar oraciones
  resultado.oraciones = select(2, texto:gsub("[.!?]", ""))
  
  -- Longitud promedio de palabras
  if resultado.palabras > 0 then
    resultado.longitudPromedio = math.floor((resultado.longitud - resultado.espacios) / resultado.palabras * 100) / 100
  end
  
  -- Palabra más larga
  local palabraMasLarga = ""
  for _, palabra in ipairs(palabras) do
    if #palabra > #palabraMasLarga then
      palabraMasLarga = palabra
    end
  end
  resultado.palabraMasLarga = palabraMasLarga
  
  -- Frecuencia de letras
  resultado.frecuencia = {}
  for letra in texto:gmatch("[a-zA-Z]") do
    letra = letra:lower()
    resultado.frecuencia[letra] = (resultado.frecuencia[letra] or 0) + 1
  end
  
  return resultado
end

local function mostrarAnalisis(texto)
  print("=== TEXTO ANALIZADO ===")
  print('"' .. texto .. '"')
  print("")
  
  local analisis = analizarTexto(texto)
  
  print("=== ESTADÍSTICAS ===")
  print("📊 Longitud total: " .. analisis.longitud .. " caracteres")
  print("📝 Palabras: " .. analisis.palabras)
  print("💬 Oraciones: " .. analisis.oraciones)
  print("📏 Longitud promedio: " .. analisis.longitudPromedio .. " caracteres/palabra")
  print("")
  
  print("=== COMPOSICIÓN ===")
  print("🔤 Vocales: " .. analisis.vocales)
  print("🔠 Consonantes: " .. analisis.consonantes)
  print("🔢 Números: " .. analisis.numeros)
  print("␣ Espacios: " .. analisis.espacios)
  print("")
  
  print("=== PALABRA MÁS LARGA ===")
  print('"' .. analisis.palabraMasLarga .. '" (' .. #analisis.palabraMasLarga .. " letras)")
  print("")
  
  print("=== FRECUENCIA DE LETRAS ===")
  
  -- Ordenar por frecuencia
  local frecuencias = {}
  for letra, freq in pairs(analisis.frecuencia) do
    table.insert(frecuencias, {letra = letra, freq = freq})
  end
  
  table.sort(frecuencias, function(a, b) return a.freq > b.freq end)
  
  -- Mostrar las 5 más comunes
  print("Top 5 letras:")
  for i = 1, math.min(5, #frecuencias) do
    local item = frecuencias[i]
    local barra = string.rep("█", item.freq)
    print(string.format("  %s: %s (%d)", item.letra:upper(), barra, item.freq))
  end
end

-- ============================================
-- DEMOSTRACIÓN
-- ============================================

local textoEjemplo = [[
Lua es un lenguaje de programación poderoso, rápido,
ligero y embeddable. Fue diseñado, implementado y
mantenido por Roberto Ierusalimschy, Waldemar Celes,
y Luiz Henrique de Figueiredo.
]]

mostrarAnalisis(textoEjemplo)

print("")
print("=== OTRO EJEMPLO ===")
print("")

local texto2 = "Hello World 123! Lua es increíble. ¿Te gusta programar?"
mostrarAnalisis(texto2)`,
  },
];
