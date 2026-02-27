# 📚 Biblioteca de Ejemplos - Lua Master Pro

Esta biblioteca contiene **ejemplos de código funcionales** para cada entorno soportado, diseñados para que los estudiantes puedan aprender Lua en contexto real.

---

## 📊 Resumen de Ejemplos

| Entorno | Cantidad | Dificultades |
|---------|----------|--------------|
| **Lua Estándar** | 6 ejemplos | Principiante → Avanzado |
| **Roblox** | 6 ejemplos | Principiante → Avanzado |
| **Unreal Engine (UnLua)** | 5 ejemplos | Principiante → Avanzado |
| **Minecraft (ComputerCraft)** | 5 ejemplos | Principiante → Avanzado |

**Total: 22 ejemplos funcionales**

---

## 📜 Lua Estándar

### 1. 📜 Hola Mundo (`beginner`)
**Descripción:** Tu primer programa en Lua  
**Conceptos:** Variables, strings, operaciones básicas, tablas

```lua
print("¡Hola, Mundo!")
local nombre = "Estudiante"
local nivel = 1
```

### 2. 🧮 Calculadora Completa (`beginner`)
**Descripción:** Sistema de calculadora con todas las operaciones  
**Conceptos:** Funciones, condicionales, operadores matemáticos

```lua
local function calculadora(a, b, operacion)
  if operacion == "suma" then
    return a + b
  end
  -- ... más operaciones
end
```

### 3. 📊 Sistema de Inventario (`intermediate`)
**Descripción:** Gestión de items con tablas  
**Conceptos:** Tablas anidadas, iteración, funciones

```lua
local inventario = {
  pociones = {
    nombre = "Poción de Salud",
    cantidad = 5,
    valor = 10
  }
}
```

### 4. 🎲 Sistema de Dados RPG (`intermediate`)
**Descripción:** Simulador de tiradas de dados  
**Conceptos:** Aleatoriedad, matemáticas, formatos de texto

```lua
math.randomseed(os.time())
local function tirarDado(caras)
  return math.random(1, caras)
end
```

### 5. 🔐 Sistema de Contraseñas (`advanced`)
**Descripción:** Generador y validador de contraseñas  
**Conceptos:** Strings, patrones, validación, seguridad

```lua
local function generarPassword(longitud, usarMayus, usarNum, usarEsp)
  -- Genera contraseña segura
end
```

### 6. 📈 Analizador de Texto (`intermediate`)
**Descripción:** Analiza estadísticas de texto  
**Conceptos:** Manipulación de strings, patrones, estadísticas

```lua
local function analizarTexto(texto)
  resultado.longitud = #texto
  resultado.palabras = #palabras
  -- ... más análisis
end
```

---

## 🎮 Roblox

### 1. 🎮 Leaderstats System (`beginner`)
**Descripción:** Sistema de monedas y gemas para tu juego  
**Conceptos:** DataStore, leaderstats, eventos de jugador

```lua
local Players = game:GetService("Players")
local function createLeaderstats(player)
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  -- ...
end
```

### 2. 🚪 Puerta Automática (`beginner`)
**Descripción:** Puerta que se abre con ProximityPrompt  
**Conceptos:** ProximityPrompt, TweenService, animaciones

```lua
local prompt = door:FindFirstChildOfClass("ProximityPrompt")
prompt.Triggered:Connect(function(player)
  openDoor()
end)
```

### 3. ⚔️ Sistema de Combate (`intermediate`)
**Descripción:** Sistema de daño y salud entre jugadores  
**Conceptos:** Salud, daño, regeneración, eventos

```lua
function damagePlayer(target, amount, attacker)
  data.health = math.max(0, data.health - amount)
  -- ...
end
```

### 4. 🎯 Sistema de Misiones (`advanced`)
**Descripción:** Quests con objetivos y recompensas  
**Conceptos:** Misiones, progreso, recompensas, tracking

```lua
local QuestDefinitions = {
  ["FirstSteps"] = {
    title = "Primeros Pasos",
    objective = {type = "collect", target = "Apple", amount = 5}
  }
}
```

### 5. 🌟 Sistema de Partículas (`intermediate`)
**Descripción:** Efectos visuales con ParticleEmitter  
**Conceptos:** Partículas, efectos, animaciones visuales

```lua
local function createFireEffect(parent)
  local fire = createParticleEmitter(parent, {
    rate = 50,
    lifetime = NumberRange.new(0.5, 1)
  })
end
```

### 6. 📦 Sistema de Tienda (`advanced`)
**Descripción:** Tienda con compras e inventario  
**Conceptos:** Economía, inventario, transacciones

```lua
local ShopConfig = {
  Items = {
    ["HealthPotion"] = {
      price = 25,
      category = "consumable"
    }
  }
}
```

---

## 🎯 Unreal Engine (UnLua)

### 1. 🎯 Actor Básico UE5 (`beginner`)
**Descripción:** Actor rotatorio con colisión  
**Conceptos:** AActor, ReceiveTick, rotación, colisiones

```lua
local MyRotatingActor = {}
function MyRotatingActor:ReceiveTick(DeltaTime)
  local rotation = self:GetActorRotation()
  rotation.Yaw = rotation.Yaw + self.RotationSpeed * DeltaTime
end
```

### 2. 🏃 Character Movement (`intermediate`)
**Descripción:** Control de personaje con salto doble  
**Conceptos:** CharacterMovement, input, salto, sprint

```lua
function MyCharacter:Jump()
  if self.JumpCount < self.MaxJumps then
    self:LaunchCharacter(FVector(0, 0, self.CharacterMovement.JumpZVelocity))
  end
end
```

### 3. 💀 Enemy AI Básico (`advanced`)
**Descripción:** IA con patrulla y persecución  
**Conceptos:** IA, máquina de estados, patrulla, persecución

```lua
function EnemyAI:UpdateAI(DeltaTime)
  local player = self:GetNearestPlayer()
  if player and distance <= self.AttackRange then
    self:AttackPlayer(player)
  end
end
```

### 4. 📦 Sistema de Inventario UE5 (`advanced`)
**Descripción:** Inventario con slots y items  
**Conceptos:** Inventario, items, equipamiento, rareza

```lua
local InventorySystem = {
  MaxSlots = 20,
  ItemDefinitions = {
    ["SwordIron"] = {
      Type = "Weapon",
      Damage = 25
    }
  }
}
```

### 5. 🎮 Widget UI Básico (`intermediate`)
**Descripción:** Interfaz de usuario con UMG  
**Conceptos:** UMG, widgets, barras de progreso, UI

```lua
function MyHUDWidget:UpdateHealth()
  local percent = self.CurrentHealth / self.MaxHealth
  self.HealthBar:SetPercent(percent)
end
```

---

## ⛏️ Minecraft (ComputerCraft)

### 1. ⛏️ Turtle Miner Básico (`beginner`)
**Descripción:** Turtle que mina automáticamente en línea recta  
**Conceptos:** Turtle API, minería, inventario

```lua
local function mineForward()
  while turtle.detect() do
    turtle.dig()
  end
  turtle.forward()
end
```

### 2. 🌲 Turtle Forest (`intermediate`)
**Descripción:** Turtle que planta y cosecha árboles  
**Conceptos:** Agricultura automática, plantar, cosechar

```lua
local function harvestTree()
  for i = 1, TREE_HEIGHT do
    turtle.digUp()
    turtle.up()
  end
end
```

### 3. 🔴 Redstone Controller (`intermediate`)
**Descripción:** Controlador automático de sistemas de redstone  
**Conceptos:** Redstone, automatización, sensores

```lua
local function automaticDoor()
  if isInputActive(INPUT_SIDE) then
    turnOn()
  end
end
```

### 4. 📊 Monitor Display (`advanced`)
**Descripción:** Sistema de información en monitor avanzado  
**Conceptos:** Monitores, gráficos, UI, eventos

```lua
local function drawBar(monitor, x, y, w, percent, color)
  monitor.setBackgroundColor(color)
  monitor.write(string.rep("█", filled))
end
```

### 5. 📡 Red Inalámbrica (`advanced`)
**Descripción:** Comunicación entre computadoras  
**Conceptos:** Módem, red, comunicación, chat

```lua
local function sendMessage(target, messageType, data)
  modem.transmit(target, CHANNEL, {
    type = messageType,
    data = data
  })
end
```

---

## 🎯 Cómo Usar los Ejemplos

### En el Editor

1. **Selecciona un entorno** (Lua, Roblox, Unreal, Minecraft)
2. **Elige un ejemplo** de la lista lateral
3. **Haz clic** para cargarlo en el editor
4. **Ejecuta** para ver el resultado
5. **Modifica** el código para experimentar

### Estructura de Archivos

```
src/lib/examples/
├── index.ts              # Exportaciones
├── luaExamples.ts        # 6 ejemplos de Lua
├── robloxExamples.ts     # 6 ejemplos de Roblox
├── unluaExamples.ts      # 5 ejemplos de UnLua
└── minecraftExamples.ts  # 5 ejemplos de ComputerCraft
```

### Importar Ejemplos

```typescript
import { luaExamples } from "@/lib/examples/luaExamples";
import { robloxExamples } from "@/lib/examples/robloxExamples";

// Usar en tu componente
const primerEjemplo = luaExamples[0];
console.log(primerEjemplo.code);
```

---

## 📈 Niveles de Dificultad

### 🟢 Principiante (`beginner`)
- Conceptos básicos
- Código corto y simple
- Ideal para primeros pasos

### 🟡 Intermedio (`intermediate`)
- Múltiples conceptos
- Funciones personalizadas
- Requiere comprensión básica

### 🔴 Avanzado (`advanced`)
- Sistemas complejos
- Múltiples archivos/módulos
- Patrones de diseño

---

## 🎓 Beneficios para Estudiantes

### ✅ Aprendizaje Contextual
- Código que **funciona en plataformas reales**
- Ejemplos que **resuelven problemas concretos**
- **Progresión natural** de dificultad

### ✅ Experiencia Profesional
- Mismo código que usan **desarrolladores reales**
- **Buenas prácticas** desde el inicio
- **Patrones comunes** de la industria

### ✅ Motivación
- Resultados **inmediatos y visibles**
- Sensación de **progreso real**
- Capacidad de **crear proyectos propios**

---

## 🚀 Próximos Ejemplos (Sugeridos)

### Lua Estándar
- [ ] Sistema de archivos
- [ ] Cliente HTTP
- [ ] Base de datos simple

### Roblox
- [ ] Sistema de amigos
- [ ] Tienda de items
- [ ] Minijuego completo

### Unreal Engine
- [ ] Sistema de guardado
- [ ] Diálogos con NPCs
- [ ] Misiones dinámicas

### Minecraft
- [ ] Fábrica automática
- [ ] Sistema de seguridad
- [ ] Red de transporte

---

## 📝 Contribuir Ejemplos

Para añadir nuevos ejemplos:

1. Crea el archivo en `src/lib/examples/`
2. Sigue la estructura `ExampleCode[]`
3. Incluye descripción y dificultad
4. Añade comentarios explicativos
5. Prueba que el código funcione

```typescript
import { ExampleCode } from "@/components/CodeEditor";

export const nuevosEjemplos: ExampleCode[] = [
  {
    name: "🎯 Nombre del Ejemplo",
    description: "Descripción clara",
    difficulty: "beginner",
    code: `-- Código comentado`
  }
];
```

---

## 🎉 Conclusión

Con **22 ejemplos funcionales** distribuidos en 4 entornos, los estudiantes tienen:

- ✅ **Variedad** suficiente para explorar diferentes aspectos
- ✅ **Progresión** clara de dificultad
- ✅ **Contexto real** de aplicación
- ✅ **Base sólida** para proyectos propios

**¡El mejor way to learn is by doing!** 🚀
