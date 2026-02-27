import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// MÓDULO 7: Multijugador y Replicación
// ============================================
// Basado en el plan de estudio:
// Semana 1: Fundamentos de red UE5 - modelo C/S, authority, NetMode
// Semana 2: Replicación de propiedades - UPROPERTY Replicated
// Semana 3: RPCs en Lua - Server, Client, NetMulticast
// Semana 4: Mini-juego multijugador - 2 jugadores, sincronización
// ============================================
// Entregable del mes: Mini-juego online 2 jugadores con sincronización
// de posición, puntuación y eventos sincronizados por red vía Lua
// ============================================

export const mes07Exercises: Exercise[] = [
  // ============================================
  // LECCIÓN 1: Fundamentos de Red (Semana 1)
  // ============================================
  {
    id: "mes-07-leccion-1-ej-1",
    lessonId: "l7-1-networking",
    title: "Detectar Modo de Red (NetMode)",
    instructions: 'Crea una función que detecte el modo de red actual.\n\n**Requisitos:**\n- `GetNetMode()` debe retornar el modo de red actual\n- Los modos son: "Standalone", "ListenServer", "DedicatedServer", "Client"\n- Usa `self:GetNetMode()` de UE5\n- Imprime el modo de red actual\n- Retorna el modo como string\n\n**Pista:** GetNetMode() retorna un enum que puedes convertir a string',
    starterCode: 'local NetworkManager = {}\n\nfunction NetworkManager:GetNetModeString()\n  -- Detecta y retorna el modo de red\n  local mode = self:GetNetMode()\n  \n  -- Convierte enum a string\nend\n\nreturn NetworkManager',
    solution: 'local NetworkManager = {}\n\nfunction NetworkManager:GetNetModeString()\n  local mode = self:GetNetMode()\n  \n  local modeStrings = {\n    [0] = "Standalone",\n    [1] = "ListenServer",\n    [2] = "DedicatedServer",\n    [3] = "Client"\n  }\n  \n  local modeString = modeStrings[mode] or "Unknown"\n  print("Modo de red: " .. modeString)\n  \n  return modeString\nend\n\nreturn NetworkManager',
    tests: [
      { type: "code_contains", expected: "GetNetMode", message: "Debes usar GetNetMode" },
      { type: "code_contains", expected: "modeStrings", message: "Debes tener mapa de modos" },
      { type: "code_contains", expected: "Standalone", message: "Debes tener modo Standalone" },
      { type: "code_contains", expected: "Client", message: "Debes tener modo Client" },
      { type: "code_contains", expected: "print", message: "Debes imprimir el modo" },
    ],
    hints: [
      "GetNetMode() retorna un enum (0-3)",
      "0 = Standalone, 1 = ListenServer, 2 = DedicatedServer, 3 = Client",
      "Usa una tabla para mapear enum a string",
    ],
    difficulty: "beginner",
    xpReward: 45,
  },
  {
    id: "mes-07-leccion-1-ej-2",
    lessonId: "l7-1-networking",
    title: "Verificar Autoridad sobre Actor",
    instructions: 'Implementa funciones para verificar autoridad en red.\n\n**Requisitos:**\n- `HasAuthority()` retorna true si el servidor tiene autoridad\n- `IsLocalController()` retorna true si es controlador local\n- `IsServer()` retorna true si es servidor (listen o dedicated)\n- Imprime "Tengo autoridad" o "Sin autoridad" según corresponda\n\n**Pista:** El servidor siempre tiene autoridad sobre los actores',
    starterCode: 'local NetworkManager = {}\n\nfunction NetworkManager:HasAuthority()\n  -- Verifica si tiene autoridad\nend\n\nfunction NetworkManager:IsServer()\n  -- Verifica si es servidor\nend\n\nfunction NetworkManager:IsLocalController()\n  -- Verifica si es controlador local\nend\n\nreturn NetworkManager',
    solution: 'local NetworkManager = {}\n\nfunction NetworkManager:HasAuthority()\n  local hasAuth = self:GetLocalRole() >= 2  -- ROLE_Authority = 2\n  \n  if hasAuth then\n    print("Tengo autoridad")\n  else\n    print("Sin autoridad")\n  end\n  \n  return hasAuth\nend\n\nfunction NetworkManager:IsServer()\n  local mode = self:GetNetMode()\n  return mode == 1 or mode == 2  -- ListenServer o DedicatedServer\nend\n\nfunction NetworkManager:IsLocalController()\n  return self:GetLocalRole() == 3  -- ROLE_AutonomousProxy = 3\nend\n\nreturn NetworkManager',
    tests: [
      { type: "code_contains", expected: "HasAuthority", message: "Debes implementar HasAuthority" },
      { type: "code_contains", expected: "IsServer", message: "Debes implementar IsServer" },
      { type: "code_contains", expected: "IsLocalController", message: "Debes implementar IsLocalController" },
      { type: "code_contains", expected: "GetLocalRole", message: "Debes usar GetLocalRole" },
      { type: "code_contains", expected: "GetNetMode", message: "Debes usar GetNetMode" },
    ],
    hints: [
      "GetLocalRole() retorna el rol local (0-3)",
      "ROLE_Authority = 2 significa que tienes autoridad",
      "IsServer verifica si NetMode es 1 o 2",
    ],
    difficulty: "beginner",
    xpReward: 50,
  },
  {
    id: "mes-07-leccion-1-ej-3",
    lessonId: "l7-1-networking",
    title: "Configurar Actor para Replicación",
    instructions: 'Configura un Actor para que se replique en red.\n\n**Requisitos:**\n- `SetupReplication()` debe configurar el actor para replicar\n- Set `bReplicates = true` para habilitar replicación\n- Set `bNetLoadOnClient = true` para cargar en clientes\n- Set `NetDormancy = DORM_DormantAll` para optimización\n- Imprime "Actor configurado para replicación"\n\n**Pista:** La replicación debe habilitarse en BeginPlay',
    starterCode: 'local ReplicatedActor = {}\n\nfunction ReplicatedActor:SetupReplication()\n  -- Configura el actor para replicación\n  -- bReplicates = true\n  -- bNetLoadOnClient = true\nend\n\nreturn ReplicatedActor',
    solution: 'local ReplicatedActor = {}\n\nfunction ReplicatedActor:SetupReplication()\n  -- Habilitar replicación\n  self.bReplicates = true\n  \n  -- Cargar en clientes\n  self.bNetLoadOnClient = true\n  \n  -- Optimizar dormancy\n  self.NetDormancy = "DORM_DormantAll"\n  \n  -- Configurar frecuencia de replicación\n  self.NetCullDistanceSquared = 1000000  -- 1000 unidades\n  \n  print("Actor configurado para replicación")\n  print("bReplicates: " .. tostring(self.bReplicates))\n  print("bNetLoadOnClient: " .. tostring(self.bNetLoadOnClient))\nend\n\nreturn ReplicatedActor',
    tests: [
      { type: "code_contains", expected: "bReplicates", message: "Debes configurar bReplicates" },
      { type: "code_contains", expected: "bNetLoadOnClient", message: "Debes configurar bNetLoadOnClient" },
      { type: "code_contains", expected: "NetDormancy", message: "Debes configurar NetDormancy" },
      { type: "code_contains", expected: "SetupReplication", message: "Debes implementar SetupReplication" },
    ],
    hints: [
      "bReplicates = true habilita la replicación",
      "bNetLoadOnClient = true carga el actor en clientes",
      "NetDormancy optimiza cuando el actor está inactivo",
    ],
    difficulty: "intermediate",
    xpReward: 55,
  },

  // ============================================
  // LECCIÓN 2: Replicación de Propiedades (Semana 2)
  // ============================================
  {
    id: "mes-07-leccion-2-ej-1",
    lessonId: "l7-2-replication",
    title: "Declarar Propiedad Replicada",
    instructions: 'Declara una propiedad que se replique automáticamente.\n\n**Requisitos:**\n- Crea una clase `ReplicatedHealth` con propiedad `health`\n- La propiedad debe replicarse automáticamente\n- Implementa `SetHealth(newHealth)` que actualice y replique\n- Implementa `GetHealth()` que retorne el valor actual\n- Cuando health cambie, imprime "Salud actualizada: [health]"\n\n**Pista:** En UnLua, las propiedades se replican si están en la tabla de la clase',
    starterCode: 'local ReplicatedHealth = {}\nReplicatedHealth.__index = ReplicatedHealth\n\nfunction ReplicatedHealth:new()\n  local self = setmetatable({}, ReplicatedHealth)\n  self.health = 100\n  -- Configurar para replicación\n  return self\nend\n\nfunction ReplicatedHealth:SetHealth(newHealth)\n  -- Actualiza y replica la salud\nend\n\nfunction ReplicatedHealth:GetHealth()\n  -- Retorna la salud actual\nend\n\nreturn ReplicatedHealth',
    solution: 'local ReplicatedHealth = {}\nReplicatedHealth.__index = ReplicatedHealth\n\nfunction ReplicatedHealth:new()\n  local self = setmetatable({}, ReplicatedHealth)\n  self.health = 100\n  self.bReplicates = true\n  return self\nend\n\nfunction ReplicatedHealth:SetHealth(newHealth)\n  local oldHealth = self.health\n  self.health = math.max(0, math.min(100, newHealth))\n  \n  if oldHealth ~= self.health then\n    print("Salud actualizada: " .. self.health)\n    \n    -- En UnLua, esto se replica automáticamente si bReplicates = true\n    self:OnRep_Health(oldHealth)\n  end\n  \n  return self.health\nend\n\nfunction ReplicatedHealth:GetHealth()\n  return self.health\nend\n\nfunction ReplicatedHealth:OnRep_Health(oldHealth)\n  -- Callback cuando health se replica\n  print("Salud replicada: " .. oldHealth .. " -> " .. self.health)\nend\n\nreturn ReplicatedHealth',
    tests: [
      { type: "code_contains", expected: "health", message: "Debes tener propiedad health" },
      { type: "code_contains", expected: "SetHealth", message: "Debes implementar SetHealth" },
      { type: "code_contains", expected: "GetHealth", message: "Debes implementar GetHealth" },
      { type: "code_contains", expected: "bReplicates", message: "Debes habilitar replicación" },
      { type: "code_contains", expected: "OnRep_Health", message: "Debes tener callback OnRep" },
    ],
    hints: [
      "health es la propiedad que se replica",
      "SetHealth actualiza el valor y notifica el cambio",
      "OnRep_Health se llama cuando la propiedad se replica",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-07-leccion-2-ej-2",
    lessonId: "l7-2-replication",
    title: "Replicar Múltiples Propiedades",
    instructions: 'Crea una clase que replique múltiples propiedades.\n\n**Requisitos:**\n- Crea clase `PlayerState` con: score, team, isAlive\n- Todas las propiedades deben replicarse\n- Implementa `SetScore(score)`, `SetTeam(team)`, `SetIsAlive(alive)`\n- Cada propiedad debe tener su callback OnRep\n- Imprime qué propiedad cambió y su nuevo valor\n\n**Pista:** Cada propiedad replicada puede tener su propio OnRep',
    starterCode: 'local PlayerState = {}\nPlayerState.__index = PlayerState\n\nfunction PlayerState:new()\n  local self = setmetatable({}, PlayerState)\n  self.score = 0\n  self.team = 0\n  self.isAlive = true\n  return self\nend\n\nfunction PlayerState:SetScore(score)\n  -- Actualiza y replica score\nend\n\nfunction PlayerState:SetTeam(team)\n  -- Actualiza y replica team\nend\n\nfunction PlayerState:SetIsAlive(alive)\n  -- Actualiza y replica isAlive\nend\n\nreturn PlayerState',
    solution: 'local PlayerState = {}\nPlayerState.__index = PlayerState\n\nfunction PlayerState:new()\n  local self = setmetatable({}, PlayerState)\n  self.score = 0\n  self.team = 0\n  self.isAlive = true\n  self.bReplicates = true\n  return self\nend\n\nfunction PlayerState:SetScore(score)\n  local old = self.score\n  self.score = score\n  if old ~= self.score then\n    print("Score cambiado: " .. old .. " -> " .. self.score)\n    self:OnRep_Score()\n  end\nend\n\nfunction PlayerState:SetTeam(team)\n  local old = self.team\n  self.team = team\n  if old ~= self.team then\n    print("Team cambiado: " .. old .. " -> " .. self.team)\n    self:OnRep_Team()\n  end\nend\n\nfunction PlayerState:SetIsAlive(alive)\n  local old = self.isAlive\n  self.isAlive = alive\n  if old ~= self.isAlive then\n    print("isAlive cambiado: " .. tostring(old) .. " -> " .. tostring(self.isAlive))\n    self:OnRep_IsAlive()\n  end\nend\n\nfunction PlayerState:OnRep_Score()\n  print("Score replicado: " .. self.score)\nend\n\nfunction PlayerState:OnRep_Team()\n  print("Team replicado: " .. self.team)\nend\n\nfunction PlayerState:OnRep_IsAlive()\n  print("isAlive replicado: " .. tostring(self.isAlive))\nend\n\nreturn PlayerState',
    tests: [
      { type: "code_contains", expected: "score", message: "Debes tener propiedad score" },
      { type: "code_contains", expected: "team", message: "Debes tener propiedad team" },
      { type: "code_contains", expected: "isAlive", message: "Debes tener propiedad isAlive" },
      { type: "code_contains", expected: "SetScore", message: "Debes implementar SetScore" },
      { type: "code_contains", expected: "SetTeam", message: "Debes implementar SetTeam" },
      { type: "code_contains", expected: "SetIsAlive", message: "Debes implementar SetIsAlive" },
      { type: "code_contains", expected: "OnRep_", message: "Debes tener callbacks OnRep" },
    ],
    hints: [
      "Cada propiedad (score, team, isAlive) debe replicarse",
      "Cada SetX llama a su OnRep_X correspondiente",
      "OnRep se ejecuta en clientes cuando la propiedad se replica",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-07-leccion-2-ej-3",
    lessonId: "l7-2-replication",
    title: "Replicación con Notificación Automática",
    instructions: 'Implementa replicación con notificación automática de cambios.\n\n**Requisitos:**\n- `ReplicatedProperty(name, initialValue)` crea propiedad replicada\n- Debe registrar callback automático cuando cambie\n- `UpdateProperty(name, value)` actualiza y notifica\n- Debe imprimir "[name] replicado: [old] -> [new]"\n- Soporta múltiples propiedades en una tabla\n\n**Pista:** Usa metatables para interceptar cambios de propiedades',
    starterCode: 'local ReplicatedObject = {}\nReplicatedObject.__index = ReplicatedObject\n\nfunction ReplicatedObject:new()\n  local self = setmetatable({}, ReplicatedObject)\n  self.replicatedProps = {}\n  self.bReplicates = true\n  return self\nend\n\nfunction ReplicatedObject:RegisterProperty(name, initialValue)\n  -- Registra propiedad replicada\nend\n\nfunction ReplicatedObject:UpdateProperty(name, value)\n  -- Actualiza propiedad y notifica\nend\n\nreturn ReplicatedObject',
    solution: 'local ReplicatedObject = {}\nReplicatedObject.__index = ReplicatedObject\n\nfunction ReplicatedObject:new()\n  local self = setmetatable({}, ReplicatedObject)\n  self.replicatedProps = {}\n  self.bReplicates = true\n  return self\nend\n\nfunction ReplicatedObject:RegisterProperty(name, initialValue)\n  self.replicatedProps[name] = {\n    value = initialValue,\n    oldValue = initialValue\n  }\n  print("Propiedad registrada: " .. name .. " = " .. tostring(initialValue))\nend\n\nfunction ReplicatedObject:UpdateProperty(name, value)\n  if not self.replicatedProps[name] then\n    print("Propiedad no registrada: " .. name)\n    return false\n  end\n  \n  local prop = self.replicatedProps[name]\n  prop.oldValue = prop.value\n  prop.value = value\n  \n  print(name .. " replicado: " .. tostring(prop.oldValue) .. " -> " .. tostring(prop.value))\n  \n  -- Llamar callback si existe\n  local callbackName = "OnRep_" .. name\n  if self[callbackName] then\n    self[callbackName](self, prop.oldValue)\n  end\n  \n  return true\nend\n\nfunction ReplicatedObject:GetProperty(name)\n  if self.replicatedProps[name] then\n    return self.replicatedProps[name].value\n  end\n  return nil\nend\n\nreturn ReplicatedObject',
    tests: [
      { type: "code_contains", expected: "replicatedProps", message: "Debes tener tabla replicatedProps" },
      { type: "code_contains", expected: "RegisterProperty", message: "Debes implementar RegisterProperty" },
      { type: "code_contains", expected: "UpdateProperty", message: "Debes implementar UpdateProperty" },
      { type: "code_contains", expected: "GetProperty", message: "Debes implementar GetProperty" },
      { type: "code_contains", expected: "OnRep_", message: "Debes soportar callbacks OnRep" },
    ],
    hints: [
      "replicatedProps almacena el estado de cada propiedad",
      "RegisterProperty crea una nueva propiedad replicada",
      "UpdateProperty actualiza y notifica el cambio",
      "OnRep_[name] se llama automáticamente si existe",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },

  // ============================================
  // LECCIÓN 3: RPCs en Lua (Semana 3)
  // ============================================
  {
    id: "mes-07-leccion-3-ej-1",
    lessonId: "l7-3-rpc",
    title: "Implementar Server RPC",
    instructions: 'Crea un Server RPC que se ejecute solo en el servidor.\n\n**Requisitos:**\n- `Server_RequestDamage(target, damage)` es un Server RPC\n- Solo debe ejecutarse si se llama desde un cliente\n- Verifica autoridad con `HasAuthority()`\n- Aplica el daño al target\n- Imprime "Server RPC: [target] recibió [damage] daño"\n\n**Pista:** Los Server RPCs van del cliente al servidor',
    starterCode: 'local CombatRPC = {}\n\nfunction CombatRPC:Server_RequestDamage(target, damage)\n  -- Server RPC: cliente -> servidor\n  -- Solo se ejecuta en el servidor\n  \n  -- Verifica que se llama desde cliente\n  -- Aplica daño al target\nend\n\nreturn CombatRPC',
    solution: 'local CombatRPC = {}\n\nfunction CombatRPC:Server_RequestDamage(target, damage)\n  -- Verifica que esto se ejecuta en el servidor\n  if not self:HasAuthority() then\n    print("Error: Server RPC debe ejecutarse en servidor")\n    return\n  end\n  \n  -- Valida el daño\n  if damage <= 0 then\n    print("Daño inválido")\n    return\n  end\n  \n  -- Aplica daño al target\n  if target and target.health then\n    target.health = math.max(0, target.health - damage)\n    print("Server RPC: " .. target.name .. " recibió " .. damage .. " daño")\n    print(target.name .. " salud restante: " .. target.health)\n    \n    -- Notifica a todos los clientes\n    self:Client_OnDamageApplied(target, damage)\n  end\nend\n\nfunction CombatRPC:Client_OnDamageApplied(target, damage)\n  -- Client RPC: se ejecuta en todos los clientes\n  print("Cliente: " .. target.name .. " recibió " .. damage .. " daño")\nend\n\nreturn CombatRPC',
    tests: [
      { type: "code_contains", expected: "Server_RequestDamage", message: "Debes implementar Server_RequestDamage" },
      { type: "code_contains", expected: "HasAuthority", message: "Debes verificar autoridad" },
      { type: "code_contains", expected: "target.health", message: "Debes aplicar daño" },
      { type: "code_contains", expected: "Client_OnDamageApplied", message: "Debes notificar a clientes" },
    ],
    hints: [
      "Server RPC solo se ejecuta en el servidor",
      "Verifica con HasAuthority()",
      "Aplica el daño al target",
      "Puedes llamar Client RPC para notificar",
    ],
    difficulty: "intermediate",
    xpReward: 65,
  },
  {
    id: "mes-07-leccion-3-ej-2",
    lessonId: "l7-3-rpc",
    title: 'Implementar Client RPC',
    instructions: 'Crea un Client RPC que se ejecute en un cliente específico.\n\n**Requisitos:**\n- `Client_ShowMessage(message)` es un Client RPC\n- Solo debe ejecutarse en el cliente\n- Muestra el mensaje en la UI del cliente\n- Imprime "Client RPC: [message]"\n- Verifica que es cliente con `IsLocalController()`\n\n**Pista:** Los Client RPCs van del servidor a un cliente específico',
    starterCode: 'local UIRPC = {}\n\nfunction UIRPC:Client_ShowMessage(message)\n  -- Client RPC: servidor -> cliente\n  -- Solo se ejecuta en el cliente\n  \n  -- Verifica que es cliente\n  -- Muestra mensaje en UI\nend\n\nreturn UIRPC',
    solution: 'local UIRPC = {}\n\nfunction UIRPC:Client_ShowMessage(message)\n  -- Verifica que esto se ejecuta en un cliente\n  if self:HasAuthority() then\n    print("Warning: Client RPC no debería ejecutarse en servidor")\n  end\n  \n  -- Muestra mensaje en UI (simulado)\n  print("Client RPC: " .. message)\n  \n  -- En implementación real, actualizaría widget UMG\n  if self.NotificationWidget then\n    self.NotificationWidget.Text:SetText(message)\n    self.NotificationWidget:SetRenderOpacity(1.0)\n  end\nend\n\nfunction UIRPC:Client_UpdateScore(score)\n  -- Otro Client RPC para actualizar score\n  print("Client RPC: Score actualizado a " .. score)\n  \n  if self.ScoreText then\n    self.ScoreText:SetText("Score: " .. score)\n  end\nend\n\nreturn UIRPC',
    tests: [
      { type: "code_contains", expected: "Client_ShowMessage", message: "Debes implementar Client_ShowMessage" },
      { type: "code_contains", expected: "HasAuthority", message: "Debes verificar rol" },
      { type: "code_contains", expected: "NotificationWidget", message: "Debes actualizar UI" },
      { type: "code_contains", expected: "Client_UpdateScore", message: "Debes tener otro Client RPC" },
    ],
    hints: [
      "Client RPC se ejecuta en el cliente específico",
      "Verifica que no sea servidor con HasAuthority()",
      "Actualiza la UI del cliente",
    ],
    difficulty: "intermediate",
    xpReward: 60,
  },
  {
    id: "mes-07-leccion-3-ej-3",
    lessonId: "l7-3-rpc",
    title: 'Implementar NetMulticast RPC',
    instructions: 'Crea un NetMulticast RPC que se ejecute en todos los clientes y servidor.\n\n**Requisitos:**\n- `Multicast_PlaySound(soundName)` es NetMulticast RPC\n- Se ejecuta en TODOS los clientes y en el servidor\n- Imprime "Multicast: Reproduciendo [soundName]"\n- Cada instancia reproduce el sonido localmente\n- Útil para efectos visuales/sonoros sincronizados\n\n**Pista:** NetMulticast se ejecuta en todas las instancias',
    starterCode: 'local EffectRPC = {}\n\nfunction EffectRPC:Multicast_PlaySound(soundName)\n  -- NetMulticast RPC: se ejecuta en TODOS\n  -- Servidor y todos los clientes\n  \n  -- Reproduce sonido localmente\nend\n\nreturn EffectRPC',
    solution: 'local EffectRPC = {}\n\nfunction EffectRPC:Multicast_PlaySound(soundName)\n  -- NetMulticast se ejecuta en TODAS las instancias\n  print("Multicast: Reproduciendo " .. soundName)\n  \n  -- Cada instancia reproduce el sonido localmente\n  if self:HasAudioComponent() then\n    self:PlaySoundAtLocation(soundName, self:GetActorLocation())\n  end\nend\n\nfunction EffectRPC:Multicast_SpawnParticles(effectName, location)\n  -- Otro NetMulticast para partículas\n  print("Multicast: Spawnando partículas " .. effectName .. " en " .. tostring(location))\n  \n  -- Cada instancia spawn las partículas localmente\n  self:SpawnEmitterAtLocation(effectName, location)\nend\n\nfunction EffectRPC:Multicast_Explosion(location, radius)\n  -- Efecto de explosión sincronizado\n  print("Multicast: Explosión en " .. tostring(location) .. " radio " .. radius)\n  \n  -- Reproducir sonido\n  self:Multicast_PlaySound("ExplosionSound")\n  \n  -- Spawnar partículas\n  self:Multicast_SpawnParticles("ExplosionEffect", location)\n  \n  -- Screen shake en todos los clientes\n  self:Client_ShakeCamera(radius)\nend\n\nfunction EffectRPC:Client_ShakeCamera(intensity)\n  -- Client RPC para screen shake\n  print("Client: Screen shake intensidad " .. intensity)\nend\n\nreturn EffectRPC',
    tests: [
      { type: "code_contains", expected: "Multicast_PlaySound", message: "Debes implementar Multicast_PlaySound" },
      { type: "code_contains", expected: "Multicast_SpawnParticles", message: "Debes implementar Multicast_SpawnParticles" },
      { type: "code_contains", expected: "Multicast_Explosion", message: "Debes implementar Multicast_Explosion" },
      { type: "code_contains", expected: "Client_ShakeCamera", message: "Debes implementar Client_ShakeCamera" },
    ],
    hints: [
      "NetMulticast se ejecuta en TODAS las instancias",
      "Útil para efectos sincronizados (sonido, partículas)",
      "Cada instancia ejecuta el efecto localmente",
    ],
    difficulty: "advanced",
    xpReward: 75,
  },

  // ============================================
  // LECCIÓN 4: Mini-Juego Multijugador (Semana 4)
  // ============================================
  {
    id: "mes-07-leccion-4-ej-1",
    lessonId: "l7-4-minigame",
    title: 'Sincronizar Posición de Jugador',
    instructions: 'Implementa sincronización de posición entre clientes.\n\n**Requisitos:**\n- `SyncPosition(x, y, z)` sincroniza la posición\n- El servidor autoriza la nueva posición\n- Todos los clientes ven la posición actualizada\n- Imprime "Posición sincronizada: [x, y, z]"\n- Incluye validación anti-cheat básica\n\n**Pista:** El cliente pide movimiento, servidor valida, todos sincronizan',
    starterCode: 'local PositionSync = {}\n\nfunction PositionSync:SyncPosition(x, y, z)\n  -- Sincroniza posición entre clientes\n  -- Servidor valida, todos reciben actualización\nend\n\nreturn PositionSync',
    solution: 'local PositionSync = {}\n\nfunction PositionSync:SyncPosition(x, y, z)\n  -- Validación básica anti-cheat\n  if not self:IsValidPosition(x, y, z) then\n    print("Posición inválida detectada (posible cheat)")\n    return false\n  end\n  \n  -- Si es servidor, replica a todos\n  if self:HasAuthority() then\n    self:SetActorLocation(FVector(x, y, z))\n    print("Posición sincronizada: [" .. x .. ", " .. y .. ", " .. z .. "]")\n    \n    -- Notifica a todos los clientes\n    self:Multicast_UpdatePosition(x, y, z)\n    return true\n  else\n    -- Si es cliente, pide al servidor\n    self:Server_RequestPositionUpdate(x, y, z)\n    return true\n  end\nend\n\nfunction PositionSync:Server_RequestPositionUpdate(x, y, z)\n  -- Client -> Server RPC\n  print("Cliente pide actualizar posición: [" .. x .. ", " .. y .. ", " .. z .. "]")\n  \n  -- Servidor valida y actualiza\n  if self:IsValidPosition(x, y, z) then\n    self:SyncPosition(x, y, z)\n  end\nend\n\nfunction PositionSync:Multicast_UpdatePosition(x, y, z)\n  -- Server -> Todos los clientes\n  print("Multicast: Posición actualizada a [" .. x .. ", " .. y .. ", " .. z .. "]")\n  \n  if not self:HasAuthority() then\n    self:SetActorLocation(FVector(x, y, z))\n  end\nend\n\nfunction PositionSync:IsValidPosition(x, y, z)\n  -- Validación básica anti-cheat\n  local maxSpeed = 1000\n  local bounds = 10000\n  \n  return math.abs(x) <= bounds and \n         math.abs(y) <= bounds and \n         math.abs(z) <= bounds\nend\n\nreturn PositionSync',
    tests: [
      { type: "code_contains", expected: "SyncPosition", message: "Debes implementar SyncPosition" },
      { type: "code_contains", expected: "Server_RequestPositionUpdate", message: "Debes implementar Server RPC" },
      { type: "code_contains", expected: "Multicast_UpdatePosition", message: "Debes implementar Multicast" },
      { type: "code_contains", expected: "IsValidPosition", message: "Debes validar posición" },
      { type: "code_contains", expected: "HasAuthority", message: "Debes verificar autoridad" },
    ],
    hints: [
      "Cliente pide movimiento con Server RPC",
      "Servidor valida y replica con Multicast",
      "Todos los clientes actualizan la posición",
      "Incluye validación anti-cheat básica",
    ],
    difficulty: "advanced",
    xpReward: 80,
  },
  {
    id: "mes-07-leccion-4-ej-2",
    lessonId: "l7-4-minigame",
    title: 'Sincronizar Puntuación entre Jugadores',
    instructions: 'Implementa sincronización de puntuación para un minijuego.\n\n**Requisitos:**\n- `AddScore(playerId, points)` añade puntos a un jugador\n- El servidor valida y replica la puntuación\n- Todos los clientes ven la puntuación actualizada\n- `GetLeaderboard()` retorna tabla con scores ordenados\n- Imprime "[player] ganó [points] puntos, total: [total]"\n\n**Pista:** Mantén un diccionario de scores por jugador',
    starterCode: 'local ScoreSync = {}\n\nfunction ScoreSync:new()\n  local self = setmetatable({}, ScoreSync)\n  self.scores = {}  -- playerId -> score\n  return self\nend\n\nfunction ScoreSync:AddScore(playerId, points)\n  -- Añade puntos y sincroniza\nend\n\nfunction ScoreSync:GetLeaderboard()\n  -- Retorna leaderboard ordenado\nend\n\nreturn ScoreSync',
    solution: 'local ScoreSync = {}\nScoreSync.__index = ScoreSync\n\nfunction ScoreSync:new()\n  local self = setmetatable({}, ScoreSync)\n  self.scores = {}  -- playerId -> score\n  self.bReplicates = true\n  return self\nend\n\nfunction ScoreSync:AddScore(playerId, points)\n  -- Inicializa si no existe\n  if not self.scores[playerId] then\n    self.scores[playerId] = 0\n  end\n  \n  local oldScore = self.scores[playerId]\n  self.scores[playerId] = oldScore + points\n  \n  print("Jugador " .. playerId .. " ganó " .. points .. " puntos, total: " .. self.scores[playerId])\n  \n  -- Replica a todos los clientes\n  if self:HasAuthority() then\n    self:Multicast_UpdateScore(playerId, self.scores[playerId])\n  end\nend\n\nfunction ScoreSync:Multicast_UpdateScore(playerId, newScore)\n  -- Se ejecuta en todos los clientes\n  print("Multicast: Jugador " .. playerId .. " tiene " .. newScore .. " puntos")\n  \n  if not self:HasAuthority() then\n    self.scores[playerId] = newScore\n  end\nend\n\nfunction ScoreSync:GetLeaderboard()\n  -- Ordena scores de mayor a menor\n  local leaderboard = {}\n  \n  for playerId, score in pairs(self.scores) do\n    table.insert(leaderboard, { playerId = playerId, score = score })\n  end\n  \n  table.sort(leaderboard, function(a, b) return a.score > b.score end)\n  \n  return leaderboard\nend\n\nfunction ScoreSync:PrintLeaderboard()\n  print("=== LEADERBOARD ===")\n  local leaderboard = self:GetLeaderboard()\n  \n  for i, entry in ipairs(leaderboard) do\n    print(i .. ". Jugador " .. entry.playerId .. ": " .. entry.score .. " puntos")\n  end\n  print("==================")\nend\n\nreturn ScoreSync',
    tests: [
      { type: "code_contains", expected: "AddScore", message: "Debes implementar AddScore" },
      { type: "code_contains", expected: "GetLeaderboard", message: "Debes implementar GetLeaderboard" },
      { type: "code_contains", expected: "scores", message: "Debes tener tabla scores" },
      { type: "code_contains", expected: "Multicast_UpdateScore", message: "Debes implementar Multicast" },
      { type: "code_contains", expected: "table.sort", message: "Debes ordenar leaderboard" },
    ],
    hints: [
      "scores es diccionario playerId -> score",
      "AddScore actualiza y replica con Multicast",
      "GetLeaderboard ordena scores de mayor a menor",
      "Imprime leaderboard ordenado",
    ],
    difficulty: "advanced",
    xpReward: 80,
  },
  {
    id: "mes-07-leccion-4-ej-3",
    lessonId: "l7-4-minigame",
    title: 'Sincronizar Eventos de Juego',
    instructions: 'Implementa sincronización de eventos para un minijuego completo.\n\n**Requisitos:**\n- `StartGame()` inicia el juego en todos los clientes\n- `EndGame(winnerId)` termina el juego y anuncia ganador\n- `SyncEvent(eventName, data)` sincroniza evento genérico\n- Todos los clientes deben estar sincronizados\n- Imprime estado del juego en cada cliente\n\n**Pista:** Usa NetMulticast para eventos que todos deben ver',
    starterCode: 'local GameSync = {}\n\nfunction GameSync:new()\n  local self = setmetatable({}, GameSync)\n  self.gameState = "Waiting"  -- Waiting, Playing, Ended\n  self.players = {}\n  return self\nend\n\nfunction GameSync:StartGame()\n  -- Inicia juego en todos los clientes\nend\n\nfunction GameSync:EndGame(winnerId)\n  -- Termina juego y anuncia ganador\nend\n\nfunction GameSync:SyncEvent(eventName, data)\n  -- Sincroniza evento genérico\nend\n\nreturn GameSync',
    solution: 'local GameSync = {}\nGameSync.__index = GameSync\n\nfunction GameSync:new()\n  local self = setmetatable({}, GameSync)\n  self.gameState = "Waiting"  -- Waiting, Playing, Ended\n  self.players = {}\n  self.bReplicates = true\n  return self\nend\n\nfunction GameSync:StartGame()\n  if self:HasAuthority() then\n    self.gameState = "Playing"\n    print("=== JUEGO INICIADO ===")\n    \n    -- Notifica a todos los clientes\n    self:Multicast_GameState("Playing")\n  end\nend\n\nfunction GameSync:EndGame(winnerId)\n  if self:HasAuthority() then\n    self.gameState = "Ended"\n    print("=== JUEGO TERMINADO ===")\n    print("¡Ganador: Jugador " .. winnerId .. "!")\n    \n    -- Notifica a todos los clientes\n    self:Multicast_GameState("Ended")\n    self:Multicast_AnnounceWinner(winnerId)\n  end\nend\n\nfunction GameSync:Multicast_GameState(state)\n  -- Se ejecuta en todos los clientes\n  print("Multicast: Estado del juego = " .. state)\n  \n  if not self:HasAuthority() then\n    self.gameState = state\n  end\n  \n  if state == "Playing" then\n    print("¡El juego ha comenzado!")\n  elseif state == "Ended" then\n    print("El juego ha terminado")\n  end\nend\n\nfunction GameSync:Multicast_AnnounceWinner(winnerId)\n  -- Anuncia ganador en todos los clientes\n  print("Multicast: ¡Jugador " .. winnerId .. " es el ganador!")\nend\n\nfunction GameSync:SyncEvent(eventName, data)\n  -- Sincroniza evento genérico\n  print("Evento sincronizado: " .. eventName)\n  \n  if self:HasAuthority() then\n    self:Multicast_Event(eventName, data)\n  end\nend\n\nfunction GameSync:Multicast_Event(eventName, data)\n  -- Evento genérico para todos\n  print("Multicast Evento: " .. eventName .. " = " .. tostring(data))\nend\n\nfunction GameSync:AddPlayer(playerId)\n  table.insert(self.players, playerId)\n  print("Jugador " .. playerId .. " se unió. Total: " .. #self.players)\nend\n\nreturn GameSync',
    tests: [
      { type: "code_contains", expected: "StartGame", message: "Debes implementar StartGame" },
      { type: "code_contains", expected: "EndGame", message: "Debes implementar EndGame" },
      { type: "code_contains", expected: "SyncEvent", message: "Debes implementar SyncEvent" },
      { type: "code_contains", expected: "Multicast_GameState", message: "Debes implementar Multicast_GameState" },
      { type: "code_contains", expected: "Multicast_AnnounceWinner", message: "Debes implementar Multicast_AnnounceWinner" },
      { type: "code_contains", expected: "gameState", message: "Debes tener gameState" },
      { type: "code_contains", expected: "players", message: "Debes tener tabla players" },
    ],
    hints: [
      "gameState puede ser Waiting, Playing, Ended",
      "StartGame cambia a Playing y notifica a todos",
      "EndGame cambia a Ended y anuncia ganador",
      "Usa Multicast para sincronizar estado",
    ],
    difficulty: "advanced",
    xpReward: 85,
  },

  // ============================================
  // PROYECTO FINAL DEL MÓDULO 7
  // ============================================
  {
    id: "mes-07-final-proyecto",
    lessonId: "l7-4-minigame",
    title: 'Proyecto: Mini-Juego Online 2 Jugadores',
    instructions: 'Crea el entregable del Mes 7: Mini-juego online con sincronización completa.\n\n**Requisitos:**\n1. Sincronización de Posición:\n   - Server RPC para validar movimiento\n   - Multicast para replicar posición a todos\n   - Validación anti-cheat básica\n\n2. Sistema de Puntuación:\n   - AddScore con replicación\n   - Leaderboard sincronizado\n   - Notificación de cambios de score\n\n3. Eventos de Juego:\n   - StartGame, EndGame sincronizados\n   - Eventos de power-ups sincronizados\n   - Estado del juego replicado\n\n4. 2 Jugadores Conectados:\n   - Cada jugador controla su personaje\n   - Ve al otro jugador moverse\n   - Ve puntuaciones actualizadas\n\n**Pista:** Integra Server RPC, Client RPC, y Multicast',
    starterCode: '-- Mini-Juego Online 2 Jugadores\nlocal OnlineMinigame = {}\n\nfunction OnlineMinigame:new()\n  local self = setmetatable({}, OnlineMinigame)\n  self.gameState = "Waiting"\n  self.players = {}\n  self.scores = {}\n  return self\nend\n\n-- 1. Sincronización de Posición\nfunction OnlineMinigame:SyncPlayerPosition(playerId, x, y, z)\n  -- Valida y sincroniza posición\nend\n\n-- 2. Sistema de Puntuación\nfunction OnlineMinigame:AddScore(playerId, points)\n  -- Añade puntos y sincroniza\nend\n\n-- 3. Eventos de Juego\nfunction OnlineMinigame:StartGame()\n  -- Inicia juego para todos\nend\n\nfunction OnlineMinigame:EndGame(winnerId)\n  -- Termina juego y anuncia ganador\nend\n\nreturn OnlineMinigame',
    solution: '-- Mini-Juego Online 2 Jugadores\nlocal OnlineMinigame = {}\nOnlineMinigame.__index = OnlineMinigame\n\nfunction OnlineMinigame:new()\n  local self = setmetatable({}, OnlineMinigame)\n  self.gameState = "Waiting"\n  self.players = {}\n  self.scores = {}\n  self.playerPositions = {}\n  self.bReplicates = true\n  return self\nend\n\n-- ============================================\n-- 1. SINCRONIZACIÓN DE POSICIÓN\n-- ============================================\nfunction OnlineMinigame:SyncPlayerPosition(playerId, x, y, z)\n  -- Validación anti-cheat\n  if not self:IsValidPosition(x, y, z) then\n    print("Posición inválida para jugador " .. playerId)\n    return false\n  end\n  \n  if self:HasAuthority() then\n    -- Servidor actualiza y replica\n    self.playerPositions[playerId] = {x = x, y = y, z = z}\n    print("Servidor: Jugador " .. playerId .. " en [" .. x .. ", " .. y .. ", " .. z .. "]")\n    \n    self:Multicast_UpdatePosition(playerId, x, y, z)\n    return true\n  else\n    -- Cliente pide al servidor\n    self:Server_RequestPositionUpdate(playerId, x, y, z)\n    return true\n  end\nend\n\nfunction OnlineMinigame:Server_RequestPositionUpdate(playerId, x, y, z)\n  print("Cliente " .. playerId .. " pide actualizar posición")\n  self:SyncPlayerPosition(playerId, x, y, z)\nend\n\nfunction OnlineMinigame:Multicast_UpdatePosition(playerId, x, y, z)\n  print("Multicast: Jugador " .. playerId .. " se movió a [" .. x .. ", " .. y .. ", " .. z .. "]")\n  \n  if not self:HasAuthority() then\n    self.playerPositions[playerId] = {x = x, y = y, z = z}\n    -- Actualizar visualmente el otro jugador\n  end\nend\n\nfunction OnlineMinigame:IsValidPosition(x, y, z)\n  local bounds = 10000\n  return math.abs(x) <= bounds and math.abs(y) <= bounds and math.abs(z) <= bounds\nend\n\n-- ============================================\n-- 2. SISTEMA DE PUNTUACIÓN\n-- ============================================\nfunction OnlineMinigame:AddScore(playerId, points)\n  if not self.scores[playerId] then\n    self.scores[playerId] = 0\n  end\n  \n  local oldScore = self.scores[playerId]\n  self.scores[playerId] = oldScore + points\n  \n  print("Jugador " .. playerId .. " ganó " .. points .. " puntos (total: " .. self.scores[playerId] .. ")")\n  \n  if self:HasAuthority() then\n    self:Multicast_UpdateScore(playerId, self.scores[playerId])\n  end\nend\n\nfunction OnlineMinigame:Multicast_UpdateScore(playerId, score)\n  print("Multicast: Score Jugador " .. playerId .. " = " .. score)\n  \n  if not self:HasAuthority() then\n    self.scores[playerId] = score\n  end\nend\n\nfunction OnlineMinigame:GetLeaderboard()\n  local leaderboard = {}\n  for playerId, score in pairs(self.scores) do\n    table.insert(leaderboard, {playerId = playerId, score = score})\n  end\n  table.sort(leaderboard, function(a, b) return a.score > b.score end)\n  return leaderboard\nend\n\n-- ============================================\n-- 3. EVENTOS DE JUEGO\n-- ============================================\nfunction OnlineMinigame:StartGame()\n  if self:HasAuthority() then\n    self.gameState = "Playing"\n    print("=== JUEGO INICIADO ===")\n    print("Jugadores conectados: " .. #self.players)\n    \n    -- Inicializa scores\n    for _, playerId in ipairs(self.players) do\n      self.scores[playerId] = 0\n    end\n    \n    self:Multicast_GameState("Playing")\n  end\nend\n\nfunction OnlineMinigame:EndGame(winnerId)\n  if self:HasAuthority() then\n    self.gameState = "Ended"\n    print("=== JUEGO TERMINADO ===")\n    print("¡GANADOR: Jugador " .. winnerId .. " con " .. self.scores[winnerId] .. " puntos!")\n    \n    self:Multicast_GameState("Ended")\n    self:Multicast_AnnounceWinner(winnerId)\n    \n    -- Imprime leaderboard final\n    print("\\n=== LEADERBOARD FINAL ===")\n    local leaderboard = self:GetLeaderboard()\n    for i, entry in ipairs(leaderboard) do\n      print(i .. ". Jugador " .. entry.playerId .. ": " .. entry.score .. " puntos")\n    end\n  end\nend\n\nfunction OnlineMinigame:Multicast_GameState(state)\n  print("Multicast: Estado = " .. state)\n  \n  if not self:HasAuthority() then\n    self.gameState = state\n  end\nend\n\nfunction OnlineMinigame:Multicast_AnnounceWinner(winnerId)\n  print("Multicast: ¡Jugador " .. winnerId .. " GANA!")\nend\n\n-- ============================================\n-- 4. GESTIÓN DE JUGADORES\n-- ============================================\nfunction OnlineMinigame:AddPlayer(playerId)\n  table.insert(self.players, playerId)\n  self.scores[playerId] = 0\n  self.playerPositions[playerId] = {x = 0, y = 0, z = 0}\n  print("Jugador " .. playerId .. " se unió. Total: " .. #self.players)\nend\n\nfunction OnlineMinigame:RemovePlayer(playerId)\n  for i, pid in ipairs(self.players) do\n    if pid == playerId then\n      table.remove(self.players, i)\n      break\n    end\n  end\n  print("Jugador " .. playerId .. " salió. Total: " .. #self.players)\nend\n\nreturn OnlineMinigame',
    tests: [
      { type: "code_contains", expected: "SyncPlayerPosition", message: "Debes implementar SyncPlayerPosition" },
      { type: "code_contains", expected: "AddScore", message: "Debes implementar AddScore" },
      { type: "code_contains", expected: "StartGame", message: "Debes implementar StartGame" },
      { type: "code_contains", expected: "EndGame", message: "Debes implementar EndGame" },
      { type: "code_contains", expected: "Multicast_UpdatePosition", message: "Debes implementar Multicast para posición" },
      { type: "code_contains", expected: "Multicast_UpdateScore", message: "Debes implementar Multicast para score" },
      { type: "code_contains", expected: "Multicast_GameState", message: "Debes implementar Multicast para estado" },
      { type: "code_contains", expected: "GetLeaderboard", message: "Debes implementar GetLeaderboard" },
      { type: "code_contains", expected: "IsValidPosition", message: "Debes validar posición anti-cheat" },
      { type: "code_contains", expected: "HasAuthority", message: "Debes verificar autoridad" },
      { type: "code_contains", expected: "players", message: "Debes tener tabla players" },
      { type: "code_contains", expected: "scores", message: "Debes tener tabla scores" },
    ],
    hints: [
      "Sincroniza posición con Server RPC + Multicast",
      "Añade score con replicación a todos los clientes",
      "StartGame y EndGame sincronizados con Multicast",
      "Leaderboard ordenado por score",
      "Validación anti-cheat básica para posición",
      "2 jugadores conectados y sincronizados",
    ],
    difficulty: "advanced",
    xpReward: 400,
  },
];

// Función helper para obtener ejercicios de una lección específica
export function getExercisesByLesson(lessonId: string): Exercise[] {
  return mes07Exercises.filter(ex => ex.lessonId === lessonId);
}

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return mes07Exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener el total de XP disponible
export function getTotalXP(): number {
  return mes07Exercises.reduce((total, ex) => total + ex.xpReward, 0);
}
