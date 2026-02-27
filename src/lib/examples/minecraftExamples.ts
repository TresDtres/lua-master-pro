import { ExampleCode } from "@/components/CodeEditor";

export const minecraftExamples: ExampleCode[] = [
  {
    name: "⛏️ Turtle Miner Básico",
    description: "Turtle que mina automáticamente en línea recta",
    difficulty: "beginner",
    code: `-- ============================================
-- TURTLE MINER BÁSICO
-- Mina automáticamente en línea recta
-- ============================================

-- Configuración
local TUNNEL_LENGTH = 10  -- Bloques a minar
local CHEST_SLOT = 16     -- Slot del cofre para guardar

-- ============================================
-- FUNCIONES DE MINERÍA
-- ============================================

local function mineForward()
  -- Minar hacia adelante
  while turtle.detect() do
    turtle.dig()
    sleep(0.2)
  end
  
  -- Avanzar
  while not turtle.forward() do
    -- Si no puede avanzar, seguir intentando
    sleep(0.1)
  end
  
  -- Recoger items
  turtle.suck()
end

local function mineUp()
  -- Minar hacia arriba
  while turtle.detectUp() do
    turtle.digUp()
    sleep(0.2)
  end
  
  -- Subir
  while not turtle.up() do
    sleep(0.1)
  end
  
  turtle.suckUp()
end

local function mineDown()
  -- Minar hacia abajo
  while turtle.detectDown() do
    turtle.digDown()
    sleep(0.2)
  end
  
  -- Bajar
  while not turtle.down() do
    sleep(0.1)
  end
  
  turtle.suckDown()
end

-- ============================================
-- GESTIÓN DE INVENTARIO
-- ============================================

local function isInventoryFull()
  for i = 1, 16 do
    if turtle.getItemCount(i) == 0 then
      return false
    end
  end
  return true
end

local function depositItems()
  print("📦 Depositando items...")
  
  -- Verificar si hay cofre adelante
  if not turtle.detect() then
    print("❌ No hay cofre adelante")
    return false
  end
  
  -- Depositar todos los items excepto del slot 16
  for i = 1, 15 do
    if turtle.getItemCount(i) > 0 then
      turtle.select(i)
      turtle.drop()
    end
  end
  
  turtle.select(1)
  print("✅ Items depositados")
  return true
end

-- ============================================
-- FUNCIÓN PRINCIPAL
-- ============================================

local function mineTunnel(length)
  print("⛏️ Iniciando minería de túnel...")
  print("📏 Longitud: " .. length .. " bloques")
  print("")
  
  local blocksMined = 0
  
  for i = 1, length do
    print("📍 Bloque " .. i .. "/" .. length)
    
    -- Verificar inventario
    if isInventoryFull() then
      print("⚠️ Inventario lleno, depositando...")
      depositItems()
    end
    
    -- Minar y avanzar
    mineForward()
    blocksMined = blocksMined + 1
    
    -- Minar techo y suelo
    mineUp()
    mineDown()
    
    sleep(0.1)
  end
  
  print("")
  print("✅ ¡Minería completada!")
  print("📊 Bloques minados: " .. blocksMined)
  
  -- Depositar items al final
  depositItems()
end

-- ============================================
-- EJECUCIÓN
-- ============================================

print("=== TURTLE MINER ===")
print("Combustible: " .. turtle.getFuelLevel() .. " bloques")
print("")

-- Verificar combustible
local fuelNeeded = TUNNEL_LENGTH * 2  -- Ida y vuelta
if turtle.getFuelLevel() < fuelNeeded then
  print("⚠️ Combustible insuficiente!")
  print("   Necesario: " .. fuelNeeded)
  print("   Actual: " .. turtle.getFuelLevel())
  print("")
  print("💡 Consejo: Rellena el turtle con carbón o lava")
else
  mineTunnel(TUNNEL_LENGTH)
end`,
  },
  {
    name: "🌲 Turtle Forest",
    description: "Turtle que planta y cosecha árboles automáticamente",
    difficulty: "intermediate",
    code: `-- ============================================
-- TURTLE FOREST
-- Planta y cosecha árboles automáticamente
-- ============================================

-- Configuración
local SAPLING_SLOT = 1      -- Slot con plántulas
local BONE_MEAL_SLOT = 2    -- Slot con harina de hueso
local TREE_HEIGHT = 4       -- Altura esperada del árbol
local FARM_SIZE = 3         -- Tamaño de la granja (3x3)

-- ============================================
-- FUNCIONES DE MOVIMIENTO
-- ============================================

local function moveForward()
  if turtle.detect() then
    turtle.dig()
  end
  return turtle.forward()
end

local function moveBack()
  return turtle.back()
end

local function turnAround()
  turtle.turnRight()
  turtle.turnRight()
end

-- ============================================
-- PLANTAR ÁRBOLES
-- ============================================

local function plantTree()
  print("🌱 Plantando árbol...")
  
  -- Seleccionar plántula
  turtle.select(SAPLING_SLOT)
  
  -- Verificar si hay bloque abajo
  if not turtle.detectDown() then
    print("❌ No hay suelo abajo")
    return false
  end
  
  -- Plantar
  if turtle.placeDown() then
    print("✅ Árbol plantado")
    return true
  else
    print("❌ No se pudo plantar")
    return false
  end
end

local function applyBoneMeal()
  print("💀 Aplicando harina de hueso...")
  
  turtle.select(BONE_MEAL_SLOT)
  
  -- Aplicar hacia abajo (donde está la plántula)
  for i = 1, 5 do
    turtle.placeDown()
    sleep(0.2)
  end
  
  sleep(2) -- Esperar a que crezca
end

-- ============================================
-- COSECHAR ÁRBOL
-- ============================================

local function harvestTree()
  print("🪓 Cosechando árbol...")
  
  local blocksHarvested = 0
  
  -- Subir por el tronco
  for i = 1, TREE_HEIGHT do
    -- Moverse hacia arriba
    if not turtle.up() then
      -- Si no puede subir, minar arriba
      if turtle.detectUp() then
        turtle.digUp()
        turtle.up()
      else
        break
      end
    end
    
    -- Minar tronco
    if turtle.detect() then
      turtle.dig()
      blocksHarvested = blocksHarvested + 1
    end
    
    -- Recoger items
    turtle.suck()
  end
  
  -- Bajar al inicio
  for i = 1, TREE_HEIGHT do
    turtle.down()
  end
  
  -- Minar el tronco base
  if turtle.detect() then
    turtle.dig()
    blocksHarvested = blocksHarvested + 1
    turtle.suck()
  end
  
  print("✅ Árbol cosechado: " .. blocksHarvested .. " bloques")
  return blocksHarvested
end

-- ============================================
-- DETECTAR ÁRBOL
-- ============================================

local function isTreePresent()
  -- Verificar si hay un árbol adelante
  return turtle.detect()
end

local function isSaplingPresent()
  -- Verificar si hay una plántula plantada
  return turtle.detectDown()
end

-- ============================================
-- CICLO DE TRABAJO
-- ============================================

local function farmCycle()
  print("🌲 === CICLO DE GRANJA ===")
  print("")
  
  -- Verificar si hay árbol para cosechar
  if isTreePresent() then
    print("🪓 Árbol detectado, cosechando...")
    harvestTree()
    print("")
  end
  
  -- Plantar nuevo árbol
  print("🌱 Plantando nuevo árbol...")
  plantTree()
  
  -- Crecer con harina de hueso
  applyBoneMeal()
  
  print("")
  print("✅ Ciclo completado")
end

-- ============================================
-- CONFIGURACIÓN INICIAL
-- ============================================

local function setup()
  print("=== TURTLE FOREST ===")
  print("Configuración:")
  print("  Slot plántulas: " .. SAPLING_SLOT)
  print("  Slot harina: " .. BONE_MEAL_SLOT)
  print("  Tamaño granja: " .. FARM_SIZE .. "x" .. FARM_SIZE)
  print("")
  
  -- Verificar items
  turtle.select(SAPLING_SLOT)
  local saplings = turtle.getItemCount()
  print("📦 Plántulas: " .. saplings)
  
  turtle.select(BONE_MEAL_SLOT)
  local boneMeal = turtle.getItemCount()
  print("💀 Harina de hueso: " .. boneMeal)
  
  print("")
  
  if saplings < 1 then
    print("❌ ¡No hay plántulas!")
    return false
  end
  
  if boneMeal < 1 then
    print("⚠️ ¡No hay harina de hueso!")
    return false
  end
  
  return true
end

-- ============================================
-- EJECUCIÓN PRINCIPAL
-- ============================================

if setup() then
  -- Ejecutar un ciclo
  farmCycle()
  
  print("")
  print("💡 Para ejecutar continuamente, usa:")
  print("   while true do")
  print("     farmCycle()")
  print("     sleep(60)")
  print("   end")
end`,
  },
  {
    name: "🔴 Redstone Controller",
    description: "Controlador automático de sistemas de redstone",
    difficulty: "intermediate",
    code: `-- ============================================
-- REDSTONE CONTROLLER
-- Controla sistemas de redstone automáticamente
-- ============================================

-- Configuración
local INPUT_SIDE = "front"   -- Lado del sensor
local OUTPUT_SIDE = "top"    -- Lado de salida
local DELAY_ON = 2           -- Segundos para activar
local DELAY_OFF = 5          -- Segundos para desactivar

-- ============================================
-- FUNCIONES DE REDSTONE
-- ============================================

local function isInputActive(side)
  side = side or INPUT_SIDE
  return redstone.getInput(side)
end

local function setOutput(side, level)
  side = side or OUTPUT_SIDE
  level = level or 0
  redstone.setOutput(side, level)
end

local function turnOn()
  setOutput(OUTPUT_SIDE, 15)
  print("✅ Salida: ON")
end

local function turnOff()
  setOutput(OUTPUT_SIDE, 0)
  print("❌ Salida: OFF")
end

-- ============================================
-- SISTEMA DE PUERTA AUTOMÁTICA
-- ============================================

local function automaticDoor()
  print("🚪 === PUERTA AUTOMÁTICA ===")
  print("Sensor: " .. INPUT_SIDE)
  print("Salida: " .. OUTPUT_SIDE)
  print("")
  
  local doorOpen = false
  
  while true do
    if isInputActive(INPUT_SIDE) then
      -- Alguien presionó el botón
      if not doorOpen then
        print("🔓 Abriendo puerta...")
        turnOn()
        doorOpen = true
      end
      
      -- Mantener abierta
      sleep(DELAY_OFF)
      
      -- Cerrar si no hay más input
      if not isInputActive(INPUT_SIDE) then
        print("🔒 Cerrando puerta...")
        turnOff()
        doorOpen = false
      end
    else
      -- Asegurar que esté cerrada
      if doorOpen then
        turnOff()
        doorOpen = false
      end
    end
    
    sleep(0.1)
  end
end

-- ============================================
-- SISTEMA DE ALARMA
-- ============================================

local function alarmSystem()
  print("🚨 === SISTEMA DE ALARMA ===")
  print("Sensores: front, back, left, right")
  print("")
  
  local alarmActive = false
  local sides = {"front", "back", "left", "right"}
  
  while true do
    for _, side in ipairs(sides) do
      if isInputActive(side) then
        if not alarmActive then
          print("🚨 ¡ALERTA! Intruso detectado en: " .. side)
          alarmActive = true
          
          -- Activar alarma
          for i = 1, 10 do
            setOutput("top", 15)
            sleep(0.2)
            setOutput("top", 0)
            sleep(0.2)
          end
          
          -- Enviar mensaje (si hay modem)
          if peripheral.find("modem") then
            sendAlert(side)
          end
        end
      end
    end
    
    -- Desactivar alarma después de un tiempo
    if alarmActive then
      sleep(5)
      alarmActive = false
      print("✅ Alarma desactivada")
    end
    
    sleep(0.1)
  end
end

-- ============================================
-- SISTEMA DE RIEGO AUTOMÁTICO
-- ============================================

local function irrigationSystem()
  print("💧 === RIEGO AUTOMÁTICO ===")
  print("")
  
  local WATER_INTERVAL = 60  -- Regar cada 60 segundos
  local WATER_DURATION = 5   -- Duración del riego
  
  while true do
    print("💧 Regando...")
    turnOn()
    
    sleep(WATER_DURATION)
    
    turnOff()
    print("✅ Riego completado")
    
    sleep(WATER_INTERVAL - WATER_DURATION)
  end
end

-- ============================================
-- SISTEMA DE LUZ AUTOMÁTICA
-- ============================================

local function automaticLight()
  print("💡 === LUZ AUTOMÁTICA ===")
  print("")
  
  while true do
    -- Obtener hora del juego
    local time = os.time()
    local hour = (time % 24000) / 1000
    
    -- Encender de noche (18-6)
    if hour >= 18 or hour <= 6 then
      turnOn()
    else
      turnOff()
    end
    
    sleep(10) -- Verificar cada 10 segundos
  end
end

-- ============================================
-- COMUNICACIÓN INALÁMBRICA
-- ============================================

local function sendAlert(triggerSide)
  local modem = peripheral.wrap("modem_0")
  
  if not modem then
    print("⚠️ No hay módem disponible")
    return
  end
  
  local CHANNEL = 10
  modem.open(CHANNEL)
  
  local message = {
    type = "alert",
    side = triggerSide,
    time = os.time(),
    computer = os.getComputerID()
  }
  
  modem.transmit(CHANNEL, CHANNEL, message)
  print("📡 Alerta enviada")
end

-- ============================================
-- MENÚ PRINCIPAL
-- ============================================

local function showMenu()
  print("=== REDSTONE CONTROLLER ===")
  print("")
  print("1. Puerta Automática")
  print("2. Sistema de Alarma")
  print("3. Riego Automático")
  print("4. Luz Automática")
  print("5. Salir")
  print("")
  
  io.write("Opción: ")
  local choice = io.read()
  
  if choice == "1" then
    automaticDoor()
  elseif choice == "2" then
    alarmSystem()
  elseif choice == "3" then
    irrigationSystem()
  elseif choice == "4" then
    automaticLight()
  else
    print("👋 ¡Hasta luego!")
  end
end

-- ============================================
-- EJECUCIÓN
-- ============================================

showMenu()`,
  },
  {
    name: "📊 Monitor Display",
    description: "Sistema de información en monitor avanzado",
    difficulty: "advanced",
    code: `-- ============================================
-- MONITOR DISPLAY
-- Sistema de información en pantalla grande
-- ============================================

-- ============================================
-- INICIALIZACIÓN
-- ============================================

local function setupMonitor()
  -- Buscar monitor
  local monitor = peripheral.wrap("monitor_0")
  
  if not monitor then
    print("❌ No se encontró monitor")
    return nil
  end
  
  -- Configurar monitor
  monitor.setBackgroundColor(colors.black)
  monitor.setTextColor(colors.white)
  monitor.clear()
  
  -- Obtener tamaño
  local width, height = monitor.getSize()
  print("✅ Monitor encontrado: " .. width .. "x" .. height)
  
  return monitor
end

-- ============================================
-- FUNCIONES DE DIBUJO
-- ============================================

local function drawBox(monitor, x, y, w, h, color)
  local oldColor = monitor.getBackgroundColor(monitor)
  monitor.setBackgroundColor(color)
  
  for i = y, y + h - 1 do
    monitor.setCursorPos(x, i)
    monitor.write(string.rep(" ", w))
  end
  
  monitor.setBackgroundColor(oldColor)
end

local function drawText(monitor, x, y, text, color)
  local oldColor = monitor.getTextColor(monitor)
  if color then
    monitor.setTextColor(color)
  end
  
  monitor.setCursorPos(x, y)
  monitor.write(text)
  
  monitor.setTextColor(oldColor)
end

local function drawCenteredText(monitor, y, text, color)
  local width, _ = monitor.getSize()
  local x = math.floor((width - #text) / 2) + 1
  drawText(monitor, x, y, text, color)
end

local function drawBar(monitor, x, y, w, percent, color)
  local filled = math.floor(w * percent)
  local empty = w - filled
  
  local oldBg = monitor.getBackgroundColor(monitor)
  local oldFg = monitor.getTextColor(monitor)
  
  -- Fondo
  monitor.setBackgroundColor(colors.gray)
  monitor.setCursorPos(x, y)
  monitor.write(string.rep(" ", w))
  
  -- Barra
  monitor.setBackgroundColor(color)
  monitor.setCursorPos(x, y)
  monitor.write(string.rep("█", filled))
  
  monitor.setBackgroundColor(oldBg)
  monitor.setTextColor(oldFg)
end

-- ============================================
-- PANTALLAS
-- ============================================

local function drawHeader(monitor, title)
  local width, _ = monitor.getSize()
  
  drawBox(monitor, 1, 1, width, 2, colors.blue)
  drawCenteredText(monitor, 1, "=== " .. title .. " ===", colors.white)
end

local function drawSystemInfo(monitor)
  -- Información del sistema
  drawText(monitor, 2, 4, "ID: " .. os.getComputerID(), colors.lightGray)
  drawText(monitor, 2, 5, "Label: " .. (os.getComputerLabel() or "Sin etiqueta"), colors.lightGray)
  drawText(monitor, 2, 6, "Tiempo: " .. os.time(), colors.lightGray)
end

local function drawResourceBar(monitor, label, value, max, y, color)
  local width, _ = monitor.getSize()
  local barWidth = width - 20
  local percent = value / max
  
  drawText(monitor, 2, y, label .. ":", colors.white)
  drawBar(monitor, 15, y, barWidth, percent, color)
  drawText(monitor, width - 5, y, math.floor(percent * 100) .. "%", colors.white)
end

local function drawClock(monitor)
  local width, height = monitor.getSize()
  local time = os.time()
  local hour = math.floor(time / 1000) % 24
  local minute = math.floor(time % 1000 / 10)
  
  local timeStr = string.format("%02d:%02d", hour, minute)
  
  drawBox(monitor, width - 10, 1, 9, 2, colors.gray)
  drawCenteredText(monitor, 1, timeStr, colors.yellow)
end

-- ============================================
-- PANTALLA PRINCIPAL
-- ============================================

local function drawMainScreen(monitor)
  monitor.clear()
  
  drawHeader(monitor, "SISTEMA DE INFO")
  drawClock(monitor)
  drawSystemInfo(monitor)
  
  -- Barras de recurso (simuladas)
  drawResourceBar(monitor, "CPU", math.random(20, 80), 100, 9, colors.red)
  drawResourceBar(monitor, "Memoria", math.random(30, 90), 100, 10, colors.lightBlue)
  drawResourceBar(monitor, "Red", math.random(10, 60), 100, 11, colors.green)
  
  -- Mensaje
  drawCenteredText(monitor, 14, "Sistema en línea", colors.green)
  drawCenteredText(monitor, 15, "Presiona 'q' para salir", colors.gray)
end

-- ============================================
-- PANTALLA DE ESTADÍSTICAS
-- ============================================

local function drawStatsScreen(monitor)
  monitor.clear()
  
  drawHeader(monitor, "ESTADÍSTICAS")
  
  -- Contadores
  drawText(monitor, 2, 4, "Items procesados: 1,234", colors.white)
  drawText(monitor, 2, 5, "Energía usada: 567 RF", colors.yellow)
  drawText(monitor, 2, 6, "Tiempo activo: 12h 34m", colors.lightGreen)
  
  -- Gráfico simple
  drawText(monitor, 2, 9, "Actividad:", colors.white)
  
  local graphData = {5, 8, 3, 9, 6, 4, 7, 8, 5, 6}
  local maxBar = 5
  
  for i, value in ipairs(graphData) do
    local barHeight = math.floor(value / maxBar * 4)
    for j = 1, 4 do
      if j <= barHeight then
        drawText(monitor, 1 + i, 14 - j, "█", colors.lightBlue)
      else
        drawText(monitor, 1 + i, 14 - j, "░", colors.gray)
      end
    end
  end
end

-- ============================================
-- INTERFAZ INTERACTIVA
-- ============================================

local function runInteractive()
  local monitor = setupMonitor()
  
  if not monitor then
    return
  end
  
  local currentScreen = 1
  local running = true
  
  -- Evento de teclado
  os.startTimer(0.1)
  
  while running do
    drawMainScreen(monitor)
    
    local event, p1, p2, p3 = os.pullEvent()
    
    if event == "key" then
      if p2 == keys.q then
        running = false
      elseif p2 == keys.s then
        drawStatsScreen(monitor)
        os.pullEvent("key")
      end
    end
  end
  
  monitor.clear()
  print("👋 Monitor apagado")
end

-- ============================================
-- EJECUCIÓN
-- ============================================

print("=== MONITOR DISPLAY ===")
print("")
print("Iniciando sistema...")
print("")

runInteractive()`,
  },
  {
    name: "📡 Red Inalámbrica",
    description: "Sistema de comunicación entre computadoras",
    difficulty: "advanced",
    code: `-- ============================================
-- RED INALÁMBRICA
-- Comunicación entre computadoras con módem
-- ============================================

-- Configuración
local CHANNEL = 10
local COMPUTER_ID = os.getComputerID()

-- ============================================
-- INICIALIZAR MÓDEM
-- ============================================

local function setupModem()
  local modem = peripheral.find("modem")
  
  if not modem then
    print("❌ No se encontró módem")
    return nil
  end
  
  -- Abrir canal
  if not modem.isOpen(CHANNEL) then
    modem.open(CHANNEL)
  end
  
  print("✅ Módem listo en canal " .. CHANNEL)
  return modem
end

-- ============================================
-- ENVIAR MENSAJES
-- ============================================

local function sendMessage(target, messageType, data)
  local modem = peripheral.find("modem")
  
  if not modem then
    print("❌ No hay módem")
    return false
  end
  
  local message = {
    type = messageType,
    sender = COMPUTER_ID,
    timestamp = os.time(),
    data = data
  }
  
  -- Enviar a todos (broadcast) o a un target específico
  if target == "all" or target == "broadcast" then
    modem.transmit(CHANNEL, CHANNEL, message)
    print("📡 Broadcast enviado")
  else
    modem.transmit(target, CHANNEL, message)
    print("📡 Mensaje enviado a: " .. target)
  end
  
  return true
end

-- ============================================
-- RECIBIR MENSAJES
-- ============================================

local function receiveMessages()
  print("📡 Escuchando mensajes...")
  print("   Canal: " .. CHANNEL)
  print("   ID: " .. COMPUTER_ID)
  print("")
  
  while true do
    local event, modemSide, senderChannel, replyChannel, message, distance = os.pullEvent("modem_message")
    
    -- Filtrar mensajes
    if message and type(message) == "table" then
      print("📨 Mensaje recibido:")
      print("   De: " .. tostring(message.sender))
      print("   Tipo: " .. tostring(message.type))
      print("   Datos: " .. textutils.serialize(message.data or {}))
      print("")
      
      -- Responder automáticamente a pings
      if message.type == "ping" then
        sendMessage(message.sender, "pong", {
          reply_to = message.timestamp,
          rtt = distance
        })
      end
    end
  end
end

-- ============================================
-- COMANDOS
-- ============================================

local function sendPing(target)
  sendMessage(target, "ping", {timestamp = os.time()})
  print("🏓 Ping enviado a: " .. target)
end

local function sendChat(target, text)
  sendMessage(target, "chat", {message = text})
  print("💬 Mensaje enviado: " .. text)
end

local function sendCommand(target, command)
  sendMessage(target, "command", {cmd = command})
  print("⚙️ Comando enviado: " .. command)
end

local function broadcastStatus()
  sendMessage("all", "status", {
    uptime = os.time(),
    label = os.getComputerLabel()
  })
  print("📢 Estado broadcast enviado")
end

-- ============================================
-- CHAT ROOM
-- ============================================

local function runChatRoom()
  local modem = setupModem()
  
  if not modem then
    return
  end
  
  print("")
  print("=== CHAT ROOM ===")
  print("Escribe '/quit' para salir")
  print("")
  
  -- Iniciar listener en paralelo
  local function listener()
    while true do
      local event, modemSide, senderChannel, replyChannel, message, distance = os.pullEvent("modem_message")
      
      if message and message.type == "chat" then
        local sender = message.sender or "Desconocido"
        local text = message.data and message.data.message or ""
        print("[" .. sender .. "]: " .. text)
      end
    end
  end
  
  -- Ejecutar listener
  parallel.setup(listener)
  
  -- Loop principal
  while true do
    io.write("> ")
    local input = io.read()
    
    if input == "/quit" then
      break
    elseif input:sub(1, 4) == "/msg" then
      local parts = {input:match("(/msg)%s+(%d+)%s+(.+)")}
      if #parts == 3 then
        sendChat(tonumber(parts[2]), parts[3])
      end
    elseif input:sub(1, 6) == "/ping" then
      local target = input:match("/ping%s+(%d+)")
      if target then
        sendPing(tonumber(target))
      end
    else
      sendChat("all", input)
    end
  end
end

-- ============================================
-- SERVIDOR DE COMANDOS
-- ============================================

local function runCommandServer()
  local modem = setupModem()
  
  print("")
  print("=== SERVIDOR DE COMANDOS ===")
  print("Escuchando comandos...")
  print("")
  
  while true do
    local event, modemSide, senderChannel, replyChannel, message, distance = os.pullEvent("modem_message")
    
    if message and message.type == "command" then
      local cmd = message.data and message.data.cmd or ""
      local sender = message.sender
      
      print("⚙️ Comando recibido de " .. sender .. ": " .. cmd)
      
      -- Ejecutar comando
      local result = "Comando ejecutado"
      
      if cmd == "status" then
        result = "Sistema en línea"
      elseif cmd == "time" then
        result = "Hora: " .. os.time()
      elseif cmd == "reboot" then
        result = "Reiniciando..."
        os.reboot()
      end
      
      -- Responder
      sendMessage(sender, "command_result", {
        original = cmd,
        result = result
      })
    end
  end
end

-- ============================================
-- MENÚ PRINCIPAL
-- ============================================

local function showMenu()
  print("=== RED INALÁMBRICA ===")
  print("")
  print("1. Chat Room")
  print("2. Servidor de Comandos")
  print("3. Enviar Ping")
  print("4. Broadcast")
  print("5. Salir")
  print("")
  
  io.write("Opción: ")
  local choice = io.read()
  
  if choice == "1" then
    runChatRoom()
  elseif choice == "2" then
    runCommandServer()
  elseif choice == "3" then
    io.write("ID destino: ")
    local target = io.read()
    sendPing(tonumber(target))
    receiveMessages()
  elseif choice == "4" then
    broadcastStatus()
  else
    print("👋 ¡Hasta luego!")
  end
end

-- ============================================
-- EJECUCIÓN
-- ============================================

showMenu()`,
  },
];
