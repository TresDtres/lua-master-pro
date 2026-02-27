/**
 * Módulo 5: Diálogos e UI - Todas las lecciones completas
 */

import { Lesson } from "@/types/lesson";

// ============================================
// LECCIÓN 5.1: UMG desde Lua
// ============================================

export const lesson01: Lesson = {
  id: "mes-05-l01",
  moduleId: "mes-05",
  lessonNumber: 1,
  title: "UMG desde Lua",
  description: "Crear widgets, bind de propiedades y eventos desde scripts Lua.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "UMG desde Lua",
    objectives: [
      "Crear y mostrar widgets UMG desde Lua",
      "Hacer bind de propiedades a variables",
      "Manejar eventos de UI (click, hover, etc.)",
      "Actualizar UI dinámicamente",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Crear Widgets desde Lua",
        content: `**UMG (Unreal Motion Graphics)** es el sistema de UI de UE5.

**Crear widget básico:**
\`\`\`lua
function MiWidget:BeginPlay()
    -- Obtener referencias
    self.TextBlock = self:GetTextBlock("TextBlock_Name")
    self.Button = self:GetButton("Button_Start")
    self.ProgressBar = self:GetProgressBar("ProgressBar_Health")
    
    -- Configurar valores iniciales
    self.TextBlock:SetText("¡Hola Mundo!")
    self.ProgressBar:SetPercent(0.75)
    
    -- Bind de eventos
    self.Button.OnClicked:Add(self, self.OnButtonClicked)
end

function MiWidget:OnButtonClicked()
    print("¡Button clickeado!")
    self.TextBlock:SetText("¡Click recibido!")
end
\`\`\`

**Tipos de widgets comunes:**
- TextBlock - Texto estático
- EditableTextBox - Input de texto
- Button - Botón clicable
- ProgressBar - Barra de progreso
- Image - Imagen/Icono
- CanvasPanel - Contenedor absoluto
- GridPanel - Contenedor en grilla`,
        codeExamples: [
          {
            title: "Widget completo",
            code: `local MiHUD = {}

function MiHUD:BeginPlay()
    -- Referencias
    self.lblNombre = self:GetTextBlock("lblNombre")
    self.lblNivel = self:GetTextBlock("lblNivel")
    self.barVida = self:GetProgressBar("barVida")
    self.barMana = self:GetProgressBar("barMana")
    self.btnAtacar = self:GetButton("btnAtacar")
    
    -- Configurar
    self:ActualizarStats()
    
    -- Eventos
    self.btnAtacar.OnClicked:Add(self, self.Atacar)
end

function MiHUD:ActualizarStats()
    self.lblNombre:SetText(self.playerNombre)
    self.lblNivel:SetText("Nvl " .. self.nivel)
    self.barVida:SetPercent(self.vida / self.vidaMax)
    self.barMana:SetPercent(self.mana / self.manaMax)
end

function MiHUD:Atacar()
    print("¡Atacando!")
    self.player:Attack()
end

return MiHUD`,
            language: "lua",
            description: "HUD completo con referencias, bind y eventos.",
          },
        ],
      },
      {
        heading: "Bind de Propiedades",
        content: `**Bind dinámico** actualiza la UI automáticamente:

**Bind de texto:**
\`\`\`lua
function MiWidget:BindText()
    self.lblOro:BindText(function()
        return "Oro: " .. self.jugador.oro
    end)
end
\`\`\`

**Bind de visibilidad:**
\`\`\`lua
function MiWidget:BindVisibilidad()
    self.imgAlerta:BindVisibility(function()
        return self.jugador.vida < 30 and "Visible" or "Collapsed"
    end)
end
\`\`\`

**Bind de color:**
\`\`\`lua
function MiWidget:BindColor()
    self.lblVida:BindColor(function()
        if self.jugador.vida < 30 then
            return FLinearColor(1, 0, 0, 1)  -- Rojo
        else
            return FLinearColor(1, 1, 1, 1)  -- Blanco
        end
    end)
end
\`\`\``,
        codeExamples: [
          {
            title: "Binds automáticos",
            code: `local StatsWidget = {}

function StatsWidget:BeginPlay()
    self.jugador = self:GetPlayer()
    
    -- Bind de texto
    self.lblNombre:BindText(function()
        return "Nombre: " .. self.jugador.nombre
    end)
    
    -- Bind de progreso
    self.barXP:BindPercent(function()
        return self.jugador.xp / self.jugador.xpMax
    end)
    
    -- Bind de visibilidad
    self.panelLowHP:BindVisibility(function()
        return self.jugador.vida < 30 and "Visible" or "Collapsed"
    end)
    
    -- Bind de color
    self.lblVida:BindColor(function()
        local r = 1 - (self.jugador.vida / 100)
        return FLinearColor(r, 0, 0, 1)
    end)
end

return StatsWidget`,
            language: "lua",
            description: "Binds automáticos que actualizan la UI.",
          },
        ],
      },
      {
        heading: "Eventos de UI",
        content: `**Eventos comunes:**

**Button:**
\`\`\`lua
button.OnClicked:Add(self, self.OnClick)
button.OnHovered:Add(self, self.OnHover)
button.OnUnhovered:Add(self, self.OnUnhover)
\`\`\`

**EditableTextBox:**
\`\`\`lua
textbox.OnTextChanged:Add(self, self.OnTextChanged)
textbox.OnTextCommitted:Add(self, self.OnTextCommitted)
\`\`\`

**Slider:**
\`\`\`lua
slider.OnValueChanged:Add(self, self.OnValueChange)
\`\`\`

**CheckBox:**
\`\`\`lua
checkbox.OnCheckStateChanged:Add(self, self.OnCheckChange)
\`\`\``,
        codeExamples: [
          {
            title: "Manejo de eventos",
            code: `local FormWidget = {}

function FormWidget:BeginPlay()
    self.inputNombre = self:GetEditableTextBox("inputNombre")
    self.sliderVolumen = self:GetSlider("sliderVolumen")
    self.checkboxFullscreen = self:GetCheckBox("checkboxFullscreen")
    self.btnGuardar = self:GetButton("btnGuardar")
    
    -- Eventos
    self.inputNombre.OnTextChanged:Add(self, function(text)
        print("Nombre cambiado: " .. text)
    end)
    
    self.sliderVolumen.OnValueChanged:Add(self, function(value)
        print("Volumen: " .. value)
        self:ActualizarVolumen(value)
    end)
    
    self.checkboxFullscreen.OnCheckStateChanged:Add(self, function(checked)
        print("Fullscreen: " .. tostring(checked))
        self:SetFullscreen(checked)
    end)
    
    self.btnGuardar.OnClicked:Add(self, self.GuardarConfig)
end

return FormWidget`,
            language: "lua",
            description: "Eventos de input, slider, checkbox y button.",
          },
        ],
      },
    ],
    summary: `UMG desde Lua: GetTextBlock, GetButton, GetProgressBar para referencias. BindText, BindPercent, BindVisibility para actualización automática. OnClicked, OnHovered, OnTextChanged para eventos.`,
  },
  examples: [],
  interactive: {
    title: "Simula Widget UI",
    description: "Crea interfaz simple",
    starterCode: `local Widget = {
    texto = "Hola",
    botonTexto = "Click me",
    clicks = 0
}

function Widget:GetTextBlock(name)
    return {text = self.texto}
end

function Widget:GetButton(name)
    return {
        OnClicked = {
            Add = function(self, callback)
                -- Simular click
            end
        }
    }
end

function Widget:SetText(text)
    self.texto = text
    print("Texto: " .. text)
end

-- Simular
Widget:SetText("¡Nuevo texto!")
print("Texto actual: " .. Widget.texto)`,
    environment: "lua",
    expectedOutput: "¡Nuevo texto!",
  },
  miniExercise: {
    id: "mes-05-l01-ej1",
    lessonId: "mes-05-l01",
    title: "Widget de Stats",
    instructions: `Crea un widget de stats de personaje:

1. Widget tiene \`vida = 100\`, \`vidaMax = 100\`, \`nivel = 1\`
2. Función \`GetTextBlock(name)\` retorna objeto con setText
3. Función \`GetProgressBar(name)\` retorna objeto con setPercent
4. Función \`Actualizar()\` que:
   - Actualiza texto de vida
   - Actualiza barra de progreso
5. Imprime los valores actualizados

**Salida esperada:**
\`\`\`
Texto Vida: 100/100
Barra Vida: 1.0
Nivel: 1
\`\`\``,
    starterCode: `local StatsWidget = {
    vida = 100,
    vidaMax = 100,
    nivel = 1
}

function StatsWidget:GetTextBlock(name)
    return {
        setText = function(self, text)
            print("Texto " .. name .. ": " .. text)
        end
    }
end

function StatsWidget:GetProgressBar(name)
    return {
        setPercent = function(self, percent)
            print("Barra " .. name .. ": " .. percent)
        end
    }
end

function StatsWidget:Actualizar()
    -- Implementar
end

-- Inicializar
StatsWidget.lblVida = StatsWidget:GetTextBlock("Vida")
StatsWidget.barVida = StatsWidget:GetProgressBar("Vida")

-- Actualizar
StatsWidget:Actualizar()`,
    solution: `local StatsWidget = {
    vida = 100,
    vidaMax = 100,
    nivel = 1
}

function StatsWidget:GetTextBlock(name)
    return {
        setText = function(self, text)
            print("Texto " .. name .. ": " .. text)
        end
    }
end

function StatsWidget:GetProgressBar(name)
    return {
        setPercent = function(self, percent)
            print("Barra " .. name .. ": " .. percent)
        end
    }
end

function StatsWidget:Actualizar()
    self.lblVida:setText(self.vida .. "/" .. self.vidaMax)
    self.barVida:setPercent(self.vida / self.vidaMax)
    print("Nivel: " .. self.nivel)
end

StatsWidget.lblVida = StatsWidget:GetTextBlock("Vida")
StatsWidget.barVida = StatsWidget:GetProgressBar("Vida")
StatsWidget:Actualizar()`,
    tests: [
      { type: "output_contains", expected: "Texto Vida: 100/100", message: "Debe mostrar vida" },
      { type: "output_contains", expected: "Barra Vida: 1.0", message: "Debe mostrar barra" },
      { type: "output_contains", expected: "Nivel: 1", message: "Debe mostrar nivel" },
    ],
    hints: ["Concatena vida .. '/' .. vidaMax", "Divide vida / vidaMax para el percent"],
    xpReward: 40,
    difficulty: "intermediate",
  },
  summary: "UMG: GetTextBlock, GetButton, GetProgressBar. BindText, BindPercent para auto-update. OnClicked, OnHovered para eventos.",
  resources: [
    { title: "UMG Documentation", url: "https://docs.unrealengine.com/5.0/en-US/umg-ui-designer-for-unreal-engine/", type: "documentation" },
  ],
  prerequisites: ["mes-04-l06"],
};

// ============================================
// LECCIÓN 5.2: Sistema de Diálogos
// ============================================

export const lesson02: Lesson = {
  id: "mes-05-l02",
  moduleId: "mes-05",
  lessonNumber: 2,
  title: "Sistema de Diálogos",
  description: "JSON, ramificación, opciones múltiples y consecuencias.",
  estimatedTime: 40,
  difficulty: "advanced",
  theory: {
    title: "Sistema de Diálogos",
    objectives: [
      "Estructurar diálogos en JSON",
      "Implementar ramificación de opciones",
      "Manejar consecuencias de decisiones",
      "Crear sistema de quests desde diálogos",
    ],
    estimatedTime: 40,
    sections: [
      {
        heading: "Estructura de Diálogos JSON",
        content: `**Formato JSON para diálogos:**
\`\`\`json
{
    "dialogos": [
        {
            "id": "inicio",
            "npc": "Mercader",
            "texto": "¡Saludos, viajero! ¿Qué necesitas?",
            "opciones": [
                {
                    "texto": "Ver comercio",
                    "next": "comercio"
                },
                {
                    "texto": "¿Tienes información?",
                    "next": "informacion"
                },
                {
                    "texto": "Adiós",
                    "next": "fin"
                }
            ]
        },
        {
            "id": "comercio",
            "npc": "Mercader",
            "texto": "Tengo los mejores objetos de la región.",
            "opciones": [
                {
                    "texto": "Mostrar objetos",
                    "accion": "abrirTienda",
                    "next": "comercio"
                },
                {
                    "texto": "Volver",
                    "next": "inicio"
                }
            ]
        }
    ]
}
\`\`\``,
        codeExamples: [
          {
            title: "Cargar diálogo JSON",
            code: `local DialogoSystem = {}

function DialogoSystem:Load()
    self.dialogos = {
        ["inicio"] = {
            npc = "Mercader",
            texto = "¡Saludos, viajero!",
            opciones = {
                {texto = "Ver comercio", next = "comercio"},
                {texto = "Adiós", next = "fin"}
            }
        },
        ["comercio"] = {
            npc = "Mercader",
            texto = "Tengo los mejores objetos.",
            opciones = {
                {texto = "Ver objetos", accion = "abrirTienda"},
                {texto = "Volver", next = "inicio"}
            }
        }
    }
end

function DialogoSystem:IniciarDialogo(dialogoId)
    self.dialogoActual = self.dialogos[dialogoId]
    self:MostrarDialogo()
end

function DialogoSystem:SeleccionarOpcion(index)
    local opcion = self.dialogoActual.opciones[index]
    
    if opcion.accion then
        self:EjecutarAccion(opcion.accion)
    end
    
    if opcion.next then
        self.dialogoActual = self.dialogos[opcion.next]
        self:MostrarDialogo()
    end
end

return DialogoSystem`,
            language: "lua",
            description: "Sistema de diálogos cargado desde JSON.",
          },
        ],
      },
      {
        heading: "Ramificación de Diálogos",
        content: `**Tipos de ramificación:**

**Lineal simple:**
\`\`\`
inicio → opcion1 → camino1 → fin
       → opcion2 → camino2 → fin
\`\`\`

**Con condiciones:**
\`\`\`lua
{
    id = "mision",
    texto = "¿Aceptas la misión?",
    opciones = {
        {
            texto = "Aceptar",
            next = "aceptar",
            requisito = function()
                return jugador.nivel >= 10
            end
        },
        {
            texto = "Rechazar",
            next = "rechazar"
        }
    }
}
\`\`\`

**Consecuencias:**
\`\`\`lua
{
    texto = "¿Le das oro al mendigo?",
    opciones = {
        {
            texto = "Dar 50 oro",
            next = "agradece",
            consecuencia = function()
                jugador.oro = jugador.oro - 50
                reputacion.ciudad = reputacion.ciudad + 10
            end
        }
    }
}
\`\`\``,
        codeExamples: [
          {
            title: "Diálogo con condiciones",
            code: `local DialogoCondicional = {}

function DialogoCondicional:VerificarRequisitos(opcion)
    if opcion.requisito and not opcion.requisito() then
        return false
    end
    return true
end

function DialogoCondicional:MostrarOpciones()
    print(self.dialogoActual.npc .. ": " .. self.dialogoActual.texto)
    print("\\nOpciones:")
    
    for i, opcion in ipairs(self.dialogoActual.opciones) do
        if self:VerificarRequisitos(opcion) then
            print(i .. ". " .. opcion.texto)
        else
            print(i .. ". [Bloqueado] " .. opcion.texto)
        end
    end
end

function DialogoCondicional:Seleccionar(index)
    local opcion = self.dialogoActual.opciones[index]
    
    if not self:VerificarRequisitos(opcion) then
        print("No cumples los requisitos")
        return
    end
    
    if opcion.consecuencia then
        opcion.consecuencia()
    end
    
    if opcion.next then
        self.dialogoActual = self.dialogos[opcion.next]
        self:MostrarOpciones()
    end
end

return DialogoCondicional`,
            language: "lua",
            description: "Diálogo con verificación de requisitos.",
          },
        ],
      },
      {
        heading: "Sistema de Quests desde Diálogos",
        content: `**Integrar quests en diálogos:**
\`\`\`lua
{
    id = "quest_inicio",
    texto = "Necesito ayuda para derrotar un dragón.",
    opciones = {
        {
            texto = "Yo lo derrotaré",
            next = "quest_aceptada",
            quest = {
                id = "dragon_quest",
                nombre = "Cazador de Dragones",
                objetivo = "Derrotar al dragón",
                recompensa = {oro = 500, xp = 1000}
            }
        }
    }
}
\`\`\`

**Verificar progreso:**
\`\`\`lua
{
    id = "quest_check",
    texto = function()
        if jugador:Completado("dragon_quest") then
            return "¡Gracias por derrotar al dragón!"
        else
            return "¿Ya derrotaste al dragón?"
        end
    end,
    opciones = {
        {
            texto = "Entregar quest",
            next = "quest_completa",
            requisito = function()
                return jugador:Completado("dragon_quest")
            end
        }
    }
}
\`\`\``,
        codeExamples: [
          {
            title: "Quests en diálogos",
            code: `local QuestDialogo = {}

function QuestDialogo:IniciarQuest(opcion)
    local questData = opcion.quest
    local quest = {
        id = questData.id,
        nombre = questData.nombre,
        objetivo = questData.objetivo,
        completada = false,
        recompensa = questData.recompensa
    }
    
    table.insert(self.jugador.quests, quest)
    print("Quest aceptada: " .. quest.nombre)
    print("Objetivo: " .. quest.objetivo)
end

function QuestDialogo:CompletarQuest(questId)
    for i, quest in ipairs(self.jugador.quests) do
        if quest.id == questId and quest.completada then
            print("Quest completada: " .. quest.nombre)
            print("Recompensa:")
            print("  Oro: " .. quest.recompensa.oro)
            print("  XP: " .. quest.recompensa.xp)
            
            self.jugador.oro = self.jugador.oro + quest.recompensa.oro
            self.jugador.xp = self.jugador.xp + quest.recompensa.xp
            
            table.remove(self.jugador.quests, i)
            return
        end
    end
end

return QuestDialogo`,
            language: "lua",
            description: "Sistema de quests integrado en diálogos.",
          },
        ],
      },
    ],
    summary: `Diálogos en JSON con id, npc, texto, opciones. Ramificación con next. Condiciones con requisito(). Consecuencias con funcion consecuencia(). Quests integradas con quest data.`,
  },
  examples: [],
  interactive: {
    title: "Simula Diálogo Ramificado",
    description: "Crea diálogo simple con opciones",
    starterCode: `local Dialogo = {
    actual = "inicio",
    dialogos = {
        ["inicio"] = {
            npc = "Guardia",
            texto = "¡Alto! ¿Quién eres?",
            opciones = {
                {texto = "Soy un viajero", next = "viajero"},
                {texto = "Nada que te importe", next = "hostil"}
            }
        },
        ["viajero"] = {
            npc = "Guardia",
            texto = "Bienvenido, viajero.",
            opciones = {}
        },
        ["hostil"] = {
            npc = "Guardia",
            texto = "¡Entonces fuera!",
            opciones = {}
        }
    }
}

function Dialogo:Mostrar()
    local d = self.dialogos[self.actual]
    print(d.npc .. ": " .. d.texto)
    for i, op in ipairs(d.opciones) do
        print(i .. ". " .. op.texto)
    end
end

Dialogo:Mostrar()`,
    environment: "lua",
    expectedOutput: "Guardia: ¡Alto!",
  },
  miniExercise: {
    id: "mes-05-l02-ej1",
    lessonId: "mes-05-l02",
    title: "Diálogo con Quest",
    instructions: `Crea un diálogo que ofrece una quest:

1. NPC "Anciano" pide ayuda
2. Opción "Aceptar" inicia quest "Buscar Hierbas"
3. Opción "Rechazar" termina diálogo
4. Si acepta, imprime detalles de la quest
5. Si rechaza, imprime despedida

**Salida esperada:**
\`\`\`
Anciano: Necesito hierbas para una poción.
1. Aceptar misión
2. Rechazar
> 1
Quest aceptada: Buscar Hierbas
Objetivo: Recoger 5 hierbas
Recompensa: 100 oro, 50 XP
\`\`\``,
    starterCode: `local DialogoQuest = {
    dialogos = {
        ["inicio"] = {
            npc = "Anciano",
            texto = "Necesito hierbas para una poción.",
            opciones = {
                {texto = "Aceptar misión", quest = {...}},
                {texto = "Rechazar", next = "rechazar"}
            }
        }
    }
}

function DialogoQuest:MostrarOpciones()
    -- Implementar
end

DialogoQuest:MostrarOpciones()`,
    solution: `local DialogoQuest = {
    dialogos = {
        ["inicio"] = {
            npc = "Anciano",
            texto = "Necesito hierbas para una poción.",
            opciones = {
                {
                    texto = "Aceptar misión",
                    quest = {
                        nombre = "Buscar Hierbas",
                        objetivo = "Recoger 5 hierbas",
                        recompensa = {oro = 100, xp = 50}
                    }
                },
                {texto = "Rechazar", next = "rechazar"}
            }
        },
        ["rechazar"] = {
            npc = "Anciano",
            texto = "Entiendo. Quizás otro viajero me ayude.",
            opciones = {}
        }
    }
}

function DialogoQuest:MostrarOpciones()
    local d = self.dialogos["inicio"]
    print(d.npc .. ": " .. d.texto)
    
    for i, op in ipairs(d.opciones) do
        print(i .. ". " .. op.texto)
    end
    
    print("> 1")
    local opcion = d.opciones[1]
    
    if opcion.quest then
        print("Quest aceptada: " .. opcion.quest.nombre)
        print("Objetivo: " .. opcion.quest.objetivo)
        print("Recompensa: " .. opcion.quest.recompensa.oro .. " oro, " .. opcion.quest.recompensa.xp .. " XP")
    end
end

DialogoQuest:MostrarOpciones()`,
    tests: [
      { type: "output_contains", expected: "Anciano:", message: "Debe mostrar NPC" },
      { type: "output_contains", expected: "Quest aceptada: Buscar Hierbas", message: "Debe aceptar quest" },
      { type: "output_contains", expected: "100 oro", message: "Debe mostrar recompensa" },
    ],
    hints: ["Estructura el diálogo con opciones", "La opción 1 tiene data de quest", "Imprime nombre, objetivo y recompensa"],
    xpReward: 55,
    difficulty: "advanced",
  },
  summary: "JSON con id, npc, texto, opciones. Ramificación con next. Condiciones con requisito(). Consecuencias modifican estado. Quests integradas.",
  resources: [],
  prerequisites: ["mes-05-l01"],
};

// ============================================
// LECCIÓN 5.3: HUD
// ============================================

export const lesson03: Lesson = {
  id: "mes-05-l03",
  moduleId: "mes-05",
  lessonNumber: 3,
  title: "HUD",
  description: "Barras de vida/mana, textos dinámicos, iconos y notificaciones.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "HUD",
    objectives: [
      "Crear barras de vida y mana dinámicas",
      "Mostrar textos e iconos actualizables",
      "Implementar sistema de notificaciones",
      "Animar elementos del HUD",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Barras de Vida y Mana",
        content: `**Implementar barras dinámicas:**
\`\`\`lua
local HUD = {}

function HUD:BeginPlay()
    self.barVida = self:GetProgressBar("barVida")
    self.barMana = self:GetProgressBar("barMana")
    self.txtVida = self:GetTextBlock("txtVida")
    self.txtMana = self:GetTextBlock("txtMana")
end

function HUD:ActualizarStats(vida, vidaMax, mana, manaMax)
    -- Actualizar barras
    self.barVida:SetPercent(vida / vidaMax)
    self.barMana:SetPercent(mana / manaMax)
    
    -- Actualizar textos
    self.txtVida:SetText(vida .. " / " .. vidaMax)
    self.txtMana:SetText(mana .. " / " .. manaMax)
    
    -- Color dinámico
    if vida / vidaMax < 0.3 then
        self.txtVida:SetColor(FLinearColor(1, 0, 0, 1))
    else
        self.txtVida:SetColor(FLinearColor(1, 1, 1, 1))
    end
end

return HUD
\`\`\``,
        codeExamples: [
          {
            title: "HUD completo",
            code: `local GameHUD = {}

function GameHUD:BeginPlay()
    -- Referencias
    self.barVida = self:GetProgressBar("barVida")
    self.barMana = self:GetProgressBar("barMana")
    self.barXP = self:GetProgressBar("barXP")
    self.txtVida = self:GetTextBlock("txtVida")
    self.txtNivel = self:GetTextBlock("txtNivel")
    self.txtOro = self:GetTextBlock("txtOro")
end

function GameHUD:Actualizar(player)
    -- Vida
    local vidaPercent = player.vida / player.vidaMax
    self.barVida:SetPercent(vidaPercent)
    self.txtVida:SetText(math.floor(player.vida) .. " / " .. player.vidaMax)
    
    -- Color de alerta
    if vidaPercent < 0.3 then
        self.barVida:SetFillColor(FLinearColor(1, 0, 0, 1))
    else
        self.barVida:SetFillColor(FLinearColor(0, 1, 0, 1))
    end
    
    -- Mana
    self.barMana:SetPercent(player.mana / player.manaMax)
    
    -- XP
    self.barXP:SetPercent(player.xp / player.xpMax)
    
    -- Info
    self.txtNivel:SetText("Nvl " .. player.nivel)
    self.txtOro:SetText("💰 " .. player.oro)
end

return GameHUD`,
            language: "lua",
            description: "HUD completo con barras y textos dinámicos.",
          },
        ],
      },
      {
        heading: "Iconos y Notificaciones",
        content: `**Mostrar iconos:**
\`\`\`lua
function HUD:ActualizarIconos(inventario)
    for i, item in ipairs(inventario) do
        local img = self:GetImage("iconSlot" .. i)
        img:SetBrushFromTexture(item.iconTexture)
        img:SetVisibility("Visible")
    end
end
\`\`\`

**Notificaciones:**
\`\`\`lua
function HUD:MostrarNotificacion(titulo, mensaje, tipo)
    local notif = {
        titulo = titulo,
        mensaje = mensaje,
        tipo = tipo or "info"
    }
    
    table.insert(self.notificaciones, notif)
    self:ActualizarListaNotificaciones()
    
    -- Auto-eliminar después de 5 segundos
    self:Timer(5, function()
        table.remove(self.notificaciones, 1)
        self:ActualizarListaNotificaciones()
    end)
end
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de notificaciones",
            code: `local NotificacionSystem = {}

function NotificacionSystem:BeginPlay()
    self.notificaciones = {}
    self.panelNotifs = self:GetPanel("panelNotifs")
end

function NotificacionSystem:Mostrar(titulo, mensaje, tipo)
    local notif = {
        titulo = titulo,
        mensaje = mensaje,
        tipo = tipo or "info",
        tiempo = 5
    }
    
    table.insert(self.notificaciones, notif)
    self:Render()
    
    print("[" .. tipo .. "] " .. titulo .. ": " .. mensaje)
end

function NotificacionSystem:Render()
    -- Limpiar panel
    self.panelNotifs:ClearChildren()
    
    -- Renderizar notificaciones
    for i, notif in ipairs(self.notificaciones) do
        local widget = self:CrearWidgetNotificacion(notif)
        self.panelNotifs:AddChild(widget)
    end
end

function NotificacionSystem:Tick(deltaTime)
    for i = #self.notificaciones, 1, -1 do
        local notif = self.notificaciones[i]
        notif.tiempo = notif.tiempo - deltaTime
        
        if notif.tiempo <= 0 then
            table.remove(self.notificaciones, i)
            self:Render()
        end
    end
end

return NotificacionSystem`,
            language: "lua",
            description: "Sistema de notificaciones con auto-eliminación.",
          },
        ],
      },
      {
        heading: "Minimapa y Brújula",
        content: `**Minimapa básico:**
\`\`\`lua
function HUD:ActualizarMinimapa()
    local playerPos = self.player:GetActorLocation()
    local playerRot = self.player:GetActorRotation()
    
    -- Actualizar flecha del jugador
    self.arrowPlayer:SetPosition(playerPos.X, playerPos.Y)
    self.arrowPlayer:SetRotation(playerRot.Yaw)
    
    -- Actualizar markers de enemigos
    for i, enemy in ipairs(self.enemies) do
        local marker = self:GetImage("enemyMarker" .. i)
        local dist = self.player:GetDistanceTo(enemy)
        
        if dist < self.rangoDeteccion then
            marker:SetVisibility("Visible")
            marker:SetPosition(self:WorldToMinimap(enemy:GetActorLocation()))
        else
            marker:SetVisibility("Collapsed")
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Minimapa funcional",
            code: `local Minimap = {}

function Minimap:BeginPlay()
    self.arrowPlayer = self:GetImage("arrowPlayer")
    self.rangoDeteccion = 1000
end

function Minimap:Actualizar(player, objetivos)
    -- Posición del jugador
    local loc = player:GetActorLocation()
    local rot = player:GetActorRotation()
    
    self.arrowPlayer:SetPosition(loc.X / 10, loc.Y / 10)
    self.arrowPlayer:SetRotation(rot.Yaw)
    
    -- Objetivos
    for i, obj in ipairs(objetivos) do
        local marker = self:GetImage("objMarker" .. i)
        if marker then
            local x, y = self:WorldToMinimap(obj:GetActorLocation())
            marker:SetPosition(x, y)
            marker:SetVisibility("Visible")
        end
    end
end

function Minimap:WorldToMinimap(worldLoc)
    -- Convertir coordenadas del mundo a minimapa
    local scaleX, scaleY = 0.1, 0.1
    return worldLoc.X * scaleX, worldLoc.Y * scaleY
end

return Minimap`,
            language: "lua",
            description: "Minimapa con jugador y markers de objetivos.",
          },
        ],
      },
    ],
    summary: `HUD con barras (SetPercent), textos (SetText), iconos (SetBrush). Notificaciones con cola y auto-eliminación. Minimapa con conversión world-to-minimap.`,
  },
  examples: [],
  interactive: {
    title: "Simula HUD",
    description: "Crea HUD simple",
    starterCode: `local HUD = {
    vida = 100,
    vidaMax = 100,
    mana = 50,
    manaMax = 100
}

function HUD:Actualizar()
    local vidaPercent = self.vida / self.vidaMax
    local manaPercent = self.mana / self.manaMax
    
    print("Vida: " .. math.floor(vidaPercent * 100) .. "%")
    print("Mana: " .. math.floor(manaPercent * 100) .. "%")
    
    if vidaPercent < 0.3 then
        print("⚠️ ¡VIDA BAJA!")
    end
end

-- Probar
HUD:Actualizar()
HUD.vida = 25
HUD:Actualizar()`,
    environment: "lua",
    expectedOutput: "Vida: 100%",
  },
  miniExercise: {
    id: "mes-05-l03-ej1",
    lessonId: "mes-05-l03",
    title: "HUD de Juego",
    instructions: `Crea un HUD completo:

1. Jugador tiene: vida=75, vidaMax=100, mana=40, manaMax=100, nivel=5, oro=250
2. Función \`Actualizar()\` que imprime:
   - "Vida: \[vida]/\[vidaMax] (\[percent]%)"
   - "Mana: \[mana]/\[manaMax]"
   - "Nivel: \[nivel]"
   - "Oro: \[oro]"
3. Si vida < 30%, imprime "⚠️ ¡VIDA BAJA!"
4. Ejecuta Actualizar() dos veces (vida normal y vida baja)

**Salida esperada:**
\`\`\`
=== HUD ===
Vida: 75/100 (75%)
Mana: 40/100
Nivel: 5
Oro: 250
=== HUD ===
Vida: 25/100 (25%)
Mana: 40/100
Nivel: 5
Oro: 250
⚠️ ¡VIDA BAJA!
\`\`\``,
    starterCode: `local HUD = {
    vida = 75,
    vidaMax = 100,
    mana = 40,
    manaMax = 100,
    nivel = 5,
    oro = 250
}

function HUD:Actualizar()
    print("=== HUD ===")
    -- Implementar
end

-- Probar
HUD:Actualizar()
HUD.vida = 25
HUD:Actualizar()`,
    solution: `local HUD = {
    vida = 75,
    vidaMax = 100,
    mana = 40,
    manaMax = 100,
    nivel = 5,
    oro = 250
}

function HUD:Actualizar()
    print("=== HUD ===")
    
    local vidaPercent = (self.vida / self.vidaMax) * 100
    
    print("Vida: " .. self.vida .. "/" .. self.vidaMax .. " (" .. math.floor(vidaPercent) .. "%)")
    print("Mana: " .. self.mana .. "/" .. self.manaMax)
    print("Nivel: " .. self.nivel)
    print("Oro: " .. self.oro)
    
    if vidaPercent < 30 then
        print("⚠️ ¡VIDA BAJA!")
    end
end

HUD:Actualizar()
HUD.vida = 25
HUD:Actualizar()`,
    tests: [
      { type: "output_contains", expected: "Vida: 75/100 (75%)", message: "Vida normal correcta" },
      { type: "output_contains", expected: "⚠️ ¡VIDA BAJA!", message: "Alerta de vida baja" },
      { type: "output_contains", expected: "Oro: 250", message: "Oro mostrado" },
    ],
    hints: ["Calcula percent = (vida / vidaMax) * 100", "Verifica if percent < 30"],
    xpReward: 45,
    difficulty: "intermediate",
  },
  summary: "HUD: barras con SetPercent, textos con SetText, iconos con SetBrush. Notificaciones con cola. Minimapa con world-to-map.",
  resources: [],
  prerequisites: ["mes-05-l02"],
};

// ============================================
// LECCIÓN 5.4: Localización
// ============================================

export const lesson04: Lesson = {
  id: "mes-05-l04",
  moduleId: "mes-05",
  lessonNumber: 4,
  title: "Localización",
  description: "Sistema multi-idioma, tablas de texto, formato dinámico.",
  estimatedTime: 30,
  difficulty: "intermediate",
  theory: {
    title: "Localización",
    objectives: [
      "Implementar sistema multi-idioma",
      "Crear tablas de texto localizables",
      "Formatear textos dinámicamente",
      "Cambiar idioma en runtime",
    ],
    estimatedTime: 30,
    sections: [
      {
        heading: "Tablas de Localización",
        content: `**Estructura de textos:**
\`\`\`lua
local Localization = {
    idiomas = {"es", "en", "fr", "de"},
    idiomaActual = "es",
    
    textos = {
        ["saludo"] = {
            es = "¡Saludos, viajero!",
            en = "Greetings, traveler!",
            fr = "Salutations, voyageur!",
            de = "Grüße, Reisender!"
        },
        ["inventario"] = {
            es = "Inventario",
            en = "Inventory",
            fr = "Inventaire",
            de = "Inventar"
        }
    }
}

function Localization:Get(key)
    return self.textos[key][self.idiomaActual]
end

function Localization:SetIdioma(idioma)
    self.idiomaActual = idioma
end

-- Uso
print(Localization:Get("saludo"))
-- "¡Saludos, viajero!"
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de localización",
            code: `local Localization = {
    idiomaActual = "es",
    textos = {
        ["menu.jugar"] = {es = "Jugar", en = "Play", fr = "Jouer"},
        ["menu.opciones"] = {es = "Opciones", en = "Options", fr = "Options"},
        ["menu.salir"] = {es = "Salir", en = "Exit", fr = "Quitter"},
        ["hud.vida"] = {es = "Vida", en = "Health", fr = "Vie"},
        ["hud.mana"] = {es = "Mana", en = "Mana", fr = "Mana"}
    }
}

function Localization:Get(key)
    local texto = self.textos[key]
    if not texto then
        return "[MISSING: " .. key .. "]"
    end
    return texto[self.idiomaActual] or texto["en"]
end

function Localization:CambiarIdioma(idioma)
    self.idiomaActual = idioma
    print("Idioma cambiado a: " .. idioma)
end

-- Uso
print(Localization:Get("menu.jugar"))
Localization:CambiarIdioma("en")
print(Localization:Get("menu.jugar"))`,
            language: "lua",
            description: "Sistema completo de localización.",
          },
        ],
      },
      {
        heading: "Textos con Formato",
        content: `**Formato dinámico:**
\`\`\`lua
function Localization:Format(key, ...)
    local texto = self:Get(key)
    return string.format(texto, ...)
end

-- Tabla con placeholders
textos = {
    ["nivel"] = {
        es = "Nivel %d",
        en = "Level %d"
    },
    ["daño"] = {
        es = "%d de daño",
        en = "%d damage"
    },
    ["oro"] = {
        es = "%d oro",
        en = "%d gold"
    }
}

-- Uso
print(Localization:Format("nivel", 25))
-- "Nivel 25"
print(Localization:Format("daño", 150))
-- "150 de daño"
\`\`\``,
        codeExamples: [
          {
            title: "Textos formateados",
            code: `local Localization = {
    idiomaActual = "es",
    textos = {
        ["jugador.nivel"] = {es = "Nivel %d", en = "Level %d"},
        ["jugador.oro"] = {es = "%d oro", en = "%d gold"},
        ["combate.daño"] = {es = "%d de daño", en = "%d damage"},
        ["combate.curacion"] = {es = "Curado %d HP", en = "Healed %d HP"},
        ["mensaje.bienvenida"] = {
            es = "Bienvenido, %s!",
            en = "Welcome, %s!"
        }
    }
}

function Localization:Get(key)
    return self.textos[key][self.idiomaActual]
end

function Localization:Format(key, ...)
    local texto = self:Get(key)
    return string.format(texto, ...)
end

-- Uso
print(Localization:Format("jugador.nivel", 25))
print(Localization:Format("jugador.oro", 1500))
print(Localization:Format("mensaje.bienvenida", "Mario"))`,
            language: "lua",
            description: "Textos con formato dinámico.",
          },
        ],
      },
      {
        heading: "Cambiar Idioma en Runtime",
        content: `**Sistema de cambio:**
\`\`\`lua
function Localization:CambiarIdioma(nuevoIdioma)
    self.idiomaActual = nuevoIdioma
    
    -- Guardar preferencia
    self:GuardarPreferencia(nuevoIdioma)
    
    -- Actualizar toda la UI
    Events.OnIdiomaCambiado:Broadcast(nuevoIdioma)
end

-- Suscribirse al evento
function MiWidget:BeginPlay()
    Events.OnIdiomaCambiado:Add(self, self.ActualizarTextos)
end

function MiWidget:ActualizarTextos(nuevoIdioma)
    self.lblTitulo:SetText(Localization:Get("menu.titulo"))
    self.lblOpcion1:SetText(Localization:Get("menu.opcion1"))
end
\`\`\``,
        codeExamples: [
          {
            title: "Cambio de idioma",
            code: `local Localization = {
    idiomaActual = "es",
    idiomasDisponibles = {"es", "en", "fr"}
}

function Localization:CambiarIdioma(idioma)
    -- Verificar si existe
    local valido = false
    for _, lang in ipairs(self.idiomasDisponibles) do
        if lang == idioma then
            valido = true
            break
        end
    end
    
    if valido then
        self.idiomaActual = idioma
        print("Idioma cambiado a: " .. idioma)
        self:ActualizarUI()
    else
        print("Idioma no disponible")
    end
end

function Localization:ActualizarUI()
    print("Actualizando textos...")
    -- Aquí se actualizarían todos los widgets
end

-- Probar
Localization:CambiarIdioma("en")
Localization:CambiarIdioma("fr")
Localization:CambiarIdioma("jp")  -- No disponible`,
            language: "lua",
            description: "Cambio de idioma con validación.",
          },
        ],
      },
    ],
    summary: `Localización con tablas de textos por idioma. Get(key) retorna texto actual. Format(key, ...) para placeholders. CambiarIdioma() actualiza UI y guarda preferencia.`,
  },
  examples: [],
  interactive: {
    title: "Simula Localización",
    description: "Crea sistema multi-idioma",
    starterCode: `local Localization = {
    idioma = "es",
    textos = {
        ["hola"] = {es = "¡Hola!", en = "Hello!", fr = "Bonjour!"},
        ["adios"] = {es = "¡Adiós!", en = "Goodbye!", fr = "Au revoir!"}
    }
}

function Localization:Get(key)
    return self.textos[key][self.idioma]
end

function Localization:SetIdioma(idioma)
    self.idioma = idioma
end

-- Probar
print(Localization:Get("hola"))
Localization:SetIdioma("en")
print(Localization:Get("hola"))
Localization:SetIdioma("fr")
print(Localization:Get("adios"))`,
    environment: "lua",
    expectedOutput: "¡Hola!",
  },
  miniExercise: {
    id: "mes-05-l04-ej1",
    lessonId: "mes-05-l04",
    title: "Menú Multi-Idioma",
    instructions: `Crea un menú localizable:

1. Crea tabla \`textos\` con 3 opciones de menú en es/en/fr:
   - "jugar": Jugar/Play/Jouer
   - "opciones": Opciones/Options/Options
   - "salir": Salir/Exit/Quitter
2. Función \`Get(key)\` retorna texto del idioma actual
3. Función \`CambiarIdioma(idioma)\`
4. Imprime el menú en español
5. Cambia a inglés e imprime de nuevo

**Salida esperada:**
\`\`\`
=== Menú (es) ===
1. Jugar
2. Opciones
3. Salir
=== Menú (en) ===
1. Play
2. Options
3. Exit
\`\`\``,
    starterCode: `local Localization = {
    idioma = "es",
    textos = {
        -- Agregar textos
    }
}

function Localization:Get(key)
    return self.textos[key][self.idioma]
end

function Localization:CambiarIdioma(idioma)
    self.idioma = idioma
end

function Localization:ImprimirMenu()
    print("=== Menú (" .. self.idioma .. ") ===")
    print("1. " .. self:Get("jugar"))
    print("2. " .. self:Get("opciones"))
    print("3. " .. self:Get("salir"))
end

-- Probar
Localization:ImprimirMenu()
Localization:CambiarIdioma("en")
Localization:ImprimirMenu()`,
    solution: `local Localization = {
    idioma = "es",
    textos = {
        ["jugar"] = {es = "Jugar", en = "Play", fr = "Jouer"},
        ["opciones"] = {es = "Opciones", en = "Options", fr = "Options"},
        ["salir"] = {es = "Salir", en = "Exit", fr = "Quitter"}
    }
}

function Localization:Get(key)
    return self.textos[key][self.idioma]
end

function Localization:CambiarIdioma(idioma)
    self.idioma = idioma
end

function Localization:ImprimirMenu()
    print("=== Menú (" .. self.idioma .. ") ===")
    print("1. " .. self:Get("jugar"))
    print("2. " .. self:Get("opciones"))
    print("3. " .. self:Get("salir"))
end

Localization:ImprimirMenu()
Localization:CambiarIdioma("en")
Localization:ImprimirMenu()`,
    tests: [
      { type: "output_contains", expected: "1. Jugar", message: "Menú en español" },
      { type: "output_contains", expected: "1. Play", message: "Menú en inglés" },
      { type: "output_contains", expected: "Menú (es)", message: "Indicador de idioma" },
    ],
    hints: ["Crea tabla con claves jugar/opciones/salir", "Cada una tiene sub-tabla con es/en/fr", "Get retorna textos[key][idioma]"],
    xpReward: 40,
    difficulty: "intermediate",
  },
  summary: "Tablas de textos por idioma. Get(key) retorna texto actual. Format para placeholders. CambiarIdioma actualiza UI.",
  resources: [],
  prerequisites: ["mes-05-l03"],
};

// ============================================
// LECCIÓN 5.5: Animaciones UI
// ============================================

export const lesson05: Lesson = {
  id: "mes-05-l05",
  moduleId: "mes-05",
  lessonNumber: 5,
  title: "Animaciones UI",
  description: "Fade, slide, scale, animaciones complejas de widgets.",
  estimatedTime: 35,
  difficulty: "advanced",
  theory: {
    title: "Animaciones UI",
    objectives: [
      "Implementar animaciones de fade",
      "Crear animaciones de slide",
      "Animar scale de widgets",
      "Combinar múltiples animaciones",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "Animaciones de Fade",
        content: `**Fade in/out:**
\`\`\`lua
function Widget:FadeIn(duracion)
    self.alpha = 0
    self.tiempoFade = 0
    self.duracionFade = duracion or 0.5
    
    self.fadeTimer = self:Timer(duracion, function()
        self:SetOpacity(1)
    end)
end

function Widget:Tick(deltaTime)
    if self.tiempoFade then
        self.tiempoFade = self.tiempoFade + deltaTime
        local percent = self.tiempoFade / self.duracionFade
        
        self:SetOpacity(percent)
        
        if percent >= 1 then
            self.tiempoFade = nil
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Sistema de fade",
            code: `local FadeSystem = {}

function FadeSystem:FadeIn(widget, duracion)
    widget.alpha = 0
    widget.tiempo = 0
    widget.duracion = duracion or 0.5
    widget.animacion = "fadein"
end

function FadeSystem:FadeOut(widget, duracion)
    widget.alpha = 1
    widget.tiempo = 0
    widget.duracion = duracion or 0.5
    widget.animacion = "fadeout"
end

function FadeSystem:Tick(widget, deltaTime)
    if not widget.animacion then return end
    
    widget.tiempo = widget.tiempo + deltaTime
    local percent = widget.tiempo / widget.duracion
    
    if widget.animacion == "fadein" then
        widget:SetOpacity(percent)
    else
        widget:SetOpacity(1 - percent)
    end
    
    if percent >= 1 then
        widget.animacion = nil
        if widget.animacion == "fadeout" then
            widget:SetVisibility("Collapsed")
        end
    end
end

return FadeSystem`,
            language: "lua",
            description: "Sistema completo de fade in/out.",
          },
        ],
      },
      {
        heading: "Animaciones de Slide",
        content: `**Slide desde direcciones:**
\`\`\`lua
function Widget:SlideIn(direccion, duracion)
    self.posicionInicial = self:GetPosition()
    self.tiempoSlide = 0
    self.duracionSlide = duracion
    
    if direccion == "left" then
        self:SetPosition(self.posicionInicial.X - 500, self.posicionInicial.Y)
    elseif direccion == "right" then
        self:SetPosition(self.posicionInicial.X + 500, self.posicionInicial.Y)
    end
    
    self.slideAnim = true
end

function Widget:Tick(deltaTime)
    if self.slideAnim then
        self.tiempoSlide = self.tiempoSlide + deltaTime
        local percent = self.tiempoSlide / self.duracionSlide
        percent = self:EaseOut(percent)  -- Suavizar
        
        local x = self:lerp(self.posicionInicial.X - 500, self.posicionInicial.X, percent)
        self:SetPosition(x, self.posicionInicial.Y)
        
        if percent >= 1 then
            self.slideAnim = false
        end
    end
end
\`\`\``,
        codeExamples: [
          {
            title: "Slide animations",
            code: `local SlideSystem = {}

function SlideSystem:SlideIn(widget, direccion, duracion)
    widget.posInicial = widget:GetPosition()
    widget.tiempo = 0
    widget.duracion = duracion or 0.3
    widget.animacion = "slidein"
    widget.direccion = direccion
    
    -- Posición inicial fuera de pantalla
    if direccion == "left" then
        widget:SetPosition(-500, widget.posInicial.Y)
    elseif direccion == "right" then
        widget:SetPosition(500, widget.posInicial.Y)
    elseif direccion == "top" then
        widget:SetPosition(widget.posInicial.X, -500)
    end
end

function SlideSystem:lerp(a, b, t)
    return a + (b - a) * t
end

function SlideSystem:Tick(widget, deltaTime)
    if not widget.animacion then return end
    
    widget.tiempo = widget.tiempo + deltaTime
    local t = widget.tiempo / widget.duracion
    t = math.min(t, 1)
    
    local x, y = widget.posInicial.X, widget.posInicial.Y
    
    if widget.direccion == "left" or widget.direccion == "right" then
        local startX = widget.direccion == "left" and -500 or 500
        x = self:lerp(startX, widget.posInicial.X, t)
    end
    
    widget:SetPosition(x, y)
    
    if t >= 1 then
        widget.animacion = nil
    end
end

return SlideSystem`,
            language: "lua",
            description: "Animaciones de slide desde direcciones.",
          },
        ],
      },
      {
        heading: "Animaciones de Scale",
        content: `**Scale con easing:**
\`\`\`lua
function Widget:ScaleAnim(scaleFinal, duracion)
    self.scaleInicial = self:GetScale()
    self.scaleFinal = scaleFinal
    self.tiempoScale = 0
    self.duracionScale = duracion
    self.scaleAnim = true
end

function Widget:Tick(deltaTime)
    if self.scaleAnim then
        self.tiempoScale = self.tiempoScale + deltaTime
        local t = self.tiempoScale / self.duracionScale
        t = self:EaseOutBack(t)  -- Efecto rebote
        
        local newScale = self:lerp(self.scaleInicial, self.scaleFinal, t)
        self:SetScale(newScale)
        
        if t >= 1 then
            self.scaleAnim = false
        end
    end
end

-- Funciones de easing
function EaseOut(t)
    return 1 - (1 - t)^3
end

function EaseOutBack(t)
    local c1 = 1.70158
    local c3 = c1 + 1
    return 1 + c3 * (t - 1)^3 + c1 * (t - 1)^2
end
\`\`\``,
        codeExamples: [
          {
            title: "Scale con easing",
            code: `local ScaleSystem = {}

function ScaleSystem:Popup(widget, duracion)
    widget:SetScale(0)
    widget.scaleFinal = 1
    widget.tiempo = 0
    widget.duracion = duracion or 0.4
    widget.animacion = "popup"
end

function ScaleSystem:lerp(a, b, t)
    return a + (b - a) * t
end

function ScaleSystem:EaseOutBack(t)
    local c1 = 1.70158
    local c3 = c1 + 1
    return 1 + c3 * (t - 1)^3 + c1 * (t - 1)^2
end

function ScaleSystem:Tick(widget, deltaTime)
    if not widget.animacion then return end
    
    widget.tiempo = widget.tiempo + deltaTime
    local t = math.min(widget.tiempo / widget.duracion, 1)
    t = self:EaseOutBack(t)
    
    local scale = self:lerp(0, widget.scaleFinal, t)
    widget:SetScale(scale)
    
    if t >= 1 then
        widget.animacion = nil
    end
end

return ScaleSystem`,
            language: "lua",
            description: "Animación de scale con efecto popup.",
          },
        ],
      },
      {
        heading: "Combinar Animaciones",
        content: `**Animaciones en secuencia:**
\`\`\`lua
function Widget:AnimacionCompleta()
    -- 1. Fade in
    self:FadeIn(0.3, function()
        -- 2. Scale popup
        self:ScaleAnim(1.2, 0.2, function()
            -- 3. Scale normal
            self:ScaleAnim(1, 0.2)
        end)
    end)
end
\`\`\`

**Animaciones en paralelo:**
\`\`\`lua
function Widget:Entrada()
    self:FadeIn(0.5)
    self:SlideIn("left", 0.5)
    self:ScaleAnim(1, 0.5)
    -- Todas ocurren simultáneamente
end
\`\`\``,
        codeExamples: [
          {
            title: "Animación combinada",
            code: `local AnimacionUI = {}

function AnimacionUI:EntradaCompleta(widget)
    widget.animaciones = {
        {tipo = "fade", estado = "activo", tiempo = 0, duracion = 0.3},
        {tipo = "slide", estado = "activo", tiempo = 0, duracion = 0.4, desde = -500},
        {tipo = "scale", estado = "activo", tiempo = 0, duracion = 0.5, final = 1}
    }
    
    widget:SetOpacity(0)
    widget:SetPosition(-500, widget.posY)
    widget:SetScale(0.8)
end

function AnimacionUI:Tick(widget, deltaTime)
    for _, anim in ipairs(widget.animaciones) do
        if anim.estado == "activo" then
            anim.tiempo = anim.tiempo + deltaTime
            local t = math.min(anim.tiempo / anim.duracion, 1)
            
            if anim.tipo == "fade" then
                widget:SetOpacity(t)
            elseif anim.tipo == "slide" then
                local x = anim.desde + (0 - anim.desde) * t
                widget:SetPosition(x, widget.posY)
            elseif anim.tipo == "scale" then
                local scale = 0.8 + (anim.final - 0.8) * t
                widget:SetScale(scale)
            end
            
            if t >= 1 then
                anim.estado = "completado"
            end
        end
    end
end

return AnimacionUI`,
            language: "lua",
            description: "Múltiples animaciones en paralelo.",
          },
        ],
      },
    ],
    summary: `Fade: SetOpacity de 0 a 1. Slide: Position lerp desde fuera de pantalla. Scale: SetScale con easing. Combinar múltiples animaciones en paralelo o secuencia.`,
  },
  examples: [],
  interactive: {
    title: "Simula Animación",
    description: "Crea fade simple",
    starterCode: `local Widget = {
    alpha = 0,
    tiempo = 0,
    duracion = 1
}

function Widget:SetOpacity(value)
    self.alpha = value
    print("Opacity: " .. math.floor(value * 100) .. "%")
end

function Widget:FadeIn(duracion)
    self.duracion = duracion
    self.tiempo = 0
end

function Widget:Tick(deltaTime)
    if self.tiempo < self.duracion then
        self.tiempo = self.tiempo + deltaTime
        local percent = self.tiempo / self.duracion
        self:SetOpacity(percent)
    end
end

-- Probar
Widget:FadeIn(1)
for i = 1, 5 do
    Widget:Tick(0.2)
end`,
    environment: "lua",
    expectedOutput: "Opacity: 20%",
  },
  miniExercise: {
    id: "mes-05-l05-ej1",
    lessonId: "mes-05-l05",
    title: "Animación de Panel",
    instructions: `Crea una animación de entrada de panel:

1. Panel inicia con alpha=0, x=-300 (fuera de pantalla)
2. Animación dura 0.5 segundos
3. Cada tick (0.1s) actualiza:
   - alpha: de 0 a 1
   - x: de -300 a 0
4. Imprime estado cada tick

**Salida esperada:**
\`\`\`
Tick 1: Alpha=20%, X=-240
Tick 2: Alpha=40%, X=-180
Tick 3: Alpha=60%, X=-120
Tick 4: Alpha=80%, X=-60
Tick 5: Alpha=100%, X=0
¡Animación completada!
\`\`\``,
    starterCode: `local Panel = {
    alpha = 0,
    x = -300,
    tiempo = 0,
    duracion = 0.5
}

function Panel:AnimarEntrada()
    -- Implementar
end

function Panel:Tick(deltaTime)
    -- Actualizar alpha y x
end

-- Probar
Panel:AnimarEntrada()
for i = 1, 5 do
    Panel:Tick(0.1)
end`,
    solution: `local Panel = {
    alpha = 0,
    x = -300,
    tiempo = 0,
    duracion = 0.5
}

function Panel:AnimarEntrada()
    self.tiempo = 0
    print("Iniciando animación...")
end

function Panel:Tick(deltaTime)
    if self.tiempo < self.duracion then
        self.tiempo = self.tiempo + deltaTime
        local t = self.tiempo / self.duracion
        
        self.alpha = t
        self.x = -300 + (300 * t)
        
        print("Tick " .. math.ceil(self.tiempo * 10) .. ": Alpha=" .. math.floor(self.alpha * 100) .. "%, X=" .. math.floor(self.x))
        
        if self.tiempo >= self.duracion then
            print("¡Animación completada!")
        end
    end
end

Panel:AnimarEntrada()
for i = 1, 5 do
    Panel:Tick(0.1)
end`,
    tests: [
      { type: "output_contains", expected: "Alpha=20%", message: "Primer tick correcto" },
      { type: "output_contains", expected: "Alpha=100%", message: "Último tick correcto" },
      { type: "output_contains", expected: "¡Animación completada!", message: "Mensaje final" },
    ],
    hints: ["alpha = tiempo / duracion", "x = -300 + (300 * t)", "Imprime cada tick"],
    xpReward: 50,
    difficulty: "advanced",
  },
  summary: "Fade: opacity 0→1. Slide: position lerp. Scale: con easing. Combinar fade+slide+scale en paralelo.",
  resources: [],
  prerequisites: ["mes-05-l04"],
};

// ============================================
// LECCIÓN 5.6: Proyecto NPC con Diálogos
// ============================================

export const lesson06: Lesson = {
  id: "mes-05-l06",
  moduleId: "mes-05",
  lessonNumber: 6,
  title: "Proyecto: NPC con Diálogos",
  description: "Integra UI, diálogos ramificados y consecuencias en un NPC.",
  estimatedTime: 35,
  difficulty: "intermediate",
  theory: {
    title: "Proyecto: NPC con Diálogos",
    objectives: [
      "Integrar UI de diálogos",
      "Implementar ramificación con consecuencias",
      "Crear sistema de reputación",
      "Conectar diálogos con quests",
    ],
    estimatedTime: 35,
    sections: [
      {
        heading: "NPC Completo con Diálogos",
        content: `**Estructura del proyecto:**
\`\`\`
NPC_Dialogo/
├── DialogoSystem.lua    # Gestión de diálogos
├── NPCWidget.lua        # UI del NPC
├── Consecuencias.lua    # Sistema de reputación
└── Datos/
    └── dialogos.json    # Datos de diálogos
\`\`\`

**Flujo completo:**
1. Jugador interactúa con NPC
2. Se abre widget de diálogo
3. Jugador selecciona opciones
4. Sistema aplica consecuencias
5. Quests se actualizan
6. UI refleja cambios`,
        codeExamples: [
          {
            title: "NPC completo",
            code: `local NPC_Dialogo = {}

function NPC_Dialogo:BeginPlay()
    self.widget = self:CreateWidget("WBP_Dialogo")
    self.dialogoSystem = require("DialogoSystem")
    self.reputacion = require("Reputacion")
    
    self.dialogoSystem:Load("mercader")
end

function NPC_Dialogo:Interact(jugador)
    self.jugador = jugador
    self.widget:SetVisibility("Visible")
    self.dialogoSystem:Iniciar("inicio")
end

function NPC_Dialogo:SeleccionarOpcion(index)
    local opcion = self.dialogoSystem:ObtenerOpcion(index)
    
    -- Aplicar consecuencias
    if opcion.consecuencia then
        opcion.consecuencia(self.jugador)
    end
    
    -- Actualizar UI
    self.widget:Actualizar(self.dialogoSystem.dialogoActual)
end

return NPC_Dialogo`,
            language: "lua",
            description: "NPC completo con sistema de diálogo.",
          },
        ],
      },
      {
        heading: "Widget de Diálogo",
        content: `**UI del diálogo:**
\`\`\`lua
local DialogoWidget = {}

function DialogoWidget:BeginPlay()
    self.txtNPC = self:GetTextBlock("txtNPC")
    self.txtDialogo = self:GetTextBlock("txtDialogo")
    self.panelOpciones = self:GetPanel("panelOpciones")
    
    self:FadeIn(0.3)
end

function DialogoWidget:Actualizar(dialogo)
    self.txtNPC:SetText(dialogo.npc)
    self.txtDialogo:SetText(dialogo.texto)
    
    -- Limpiar opciones anteriores
    self.panelOpciones:ClearChildren()
    
    -- Crear botones de opciones
    for i, opcion in ipairs(dialogo.opciones) do
        local btn = self:CrearBoton(opcion.texto)
        btn.OnClicked:Add(self, function()
            self:OnOpcionSeleccionada(i)
        end)
        self.panelOpciones:AddChild(btn)
    end
end

return DialogoWidget
\`\`\``,
        codeExamples: [
          {
            title: "Widget de diálogo",
            code: `local DialogoWidget = {}

function DialogoWidget:BeginPlay()
    self.txtNPC = self:GetTextBlock("txtNPC")
    self.txtDialogo = self:GetTextBlock("txtDialogo")
    self.panelOpciones = self:GetPanel("panelOpciones")
    self.btnCerrar = self:GetButton("btnCerrar")
    
    self.btnCerrar.OnClicked:Add(self, function()
        self:Cerrar()
    end)
end

function DialogoWidget:Mostrar(dialogo)
    self.txtNPC:SetText(dialogo.npc)
    self.txtDialogo:SetText(dialogo.texto)
    
    self.panelOpciones:ClearChildren()
    
    for i, opcion in ipairs(dialogo.opciones) do
        local btn = self:CrearBoton(i, opcion.texto)
        btn.OnClicked:Add(self, function()
            self.OnOpcionSeleccionada(i)
        end)
        self.panelOpciones:AddChild(btn)
    end
    
    self:FadeIn(0.2)
end

function DialogoWidget:Cerrar()
    self:FadeOut(0.2, function()
        self:SetVisibility("Collapsed")
    end)
end

return DialogoWidget`,
            language: "lua",
            description: "Widget completo de diálogo con UI.",
          },
        ],
      },
      {
        heading: "Consecuencias y Reputación",
        content: `**Sistema de reputación:**
\`\`\`lua
local Reputacion = {
    facciones = {
        mercaderes = 0,
        guardia = 0,
        ladrones = 0
    }
}

function Reputacion:Modificar(faccion, cantidad)
    self.facciones[faccion] = self.facciones[faccion] + cantidad
    print("Reputación " .. faccion .. ": " .. self.facciones[faccion])
end

function Reputacion:Obtener(faccion)
    return self.facciones[faccion]
end

-- En diálogo
{
    texto = "¿Le das oro al mendigo?",
    opciones = {
        {
            texto = "Dar 50 oro",
            consecuencia = function(jugador)
                jugador.oro = jugador.oro - 50
                Reputacion:Modificar("pueblo", 10)
            end
        }
    }
}
\`\`\``,
        codeExamples: [
          {
            title: "Consecuencias completas",
            code: `local Consecuencias = {}

function Consecuencias:Aplicar(opcion, jugador)
    if not opcion.consecuencia then return end
    
    -- Guardar estado anterior
    local estadoAnterior = {
        oro = jugador.oro,
        reputacion = jugador.reputacion
    }
    
    -- Aplicar consecuencia
    opcion.consecuencia(jugador)
    
    -- Mostrar cambio
    if jugador.oro ~= estadoAnterior.oro then
        print("Oro: " .. estadoAnterior.oro .. " → " .. jugador.oro)
    end
    
    if jugador.reputacion ~= estadoAnterior.reputacion then
        print("Reputación: " .. estadoAnterior.reputacion .. " → " .. jugador.reputacion)
    end
end

return Consecuencias`,
            language: "lua",
            description: "Sistema de consecuencias con tracking.",
          },
        ],
      },
    ],
    summary: `NPC con widget de diálogo. UI muestra npc, texto, opciones. Consecuencias modifican oro, reputación, quests. Fade in/out para apertura/cierre.`,
  },
  examples: [],
  interactive: {
    title: "Simula NPC Diálogo",
    description: "NPC con diálogo simple",
    starterCode: `local NPC = {
    nombre = "Mercader",
    dialogos = {
        ["inicio"] = {
            texto = "¡Saludos! ¿Quieres ver mis objetos?",
            opciones = {
                {texto = "Ver comercio", next = "comercio"},
                {texto = "Adiós", next = "fin"}
            }
        },
        ["comercio"] = {
            texto = "Tengo objetos excelentes.",
            opciones = {
                {texto = "Volver", next = "inicio"}
            }
        }
    }
}

function NPC:IniciarDialogo()
    local d = self.dialogos["inicio"]
    print(self.nombre .. ": " .. d.texto)
    for i, op in ipairs(d.opciones) do
        print(i .. ". " .. op.texto)
    end
end

NPC:IniciarDialogo()`,
    environment: "lua",
    expectedOutput: "Mercader: ¡Saludos!",
  },
  miniExercise: {
    id: "mes-05-l06-ej1",
    lessonId: "mes-05-l06",
    title: "NPC con Quest",
    instructions: `Crea un NPC que ofrece quest:

1. NPC "Cazador" tiene diálogo inicial
2. Opción "Aceptar" da quest "Cazar Lobos"
3. Quest requiere matar 5 lobos
4. Recompensa: 200 oro, 100 XP
5. Imprime aceptación y detalles de quest

**Salida esperada:**
\`\`\`
Cazador: Necesito ayuda con los lobos.
1. Aceptar misión
2. Rechazar
> 1
¡Quest aceptada!
Cazar Lobos
Objetivo: Matar 5 lobos
Recompensa: 200 oro, 100 XP
\`\`\``,
    starterCode: `local NPC = {
    nombre = "Cazador",
    dialogos = {
        ["inicio"] = {
            texto = "Necesito ayuda con los lobos.",
            opciones = {
                {
                    texto = "Aceptar misión",
                    quest = {
                        nombre = "Cazar Lobos",
                        objetivo = "Matar 5 lobos",
                        recompensa = {oro = 200, xp = 100}
                    }
                },
                {texto = "Rechazar", next = "rechazar"}
            }
        }
    }
}

function NPC:MostrarDialogo()
    -- Implementar
end

NPC:MostrarDialogo()`,
    solution: `local NPC = {
    nombre = "Cazador",
    dialogos = {
        ["inicio"] = {
            texto = "Necesito ayuda con los lobos.",
            opciones = {
                {
                    texto = "Aceptar misión",
                    quest = {
                        nombre = "Cazar Lobos",
                        objetivo = "Matar 5 lobos",
                        recompensa = {oro = 200, xp = 100}
                    }
                },
                {texto = "Rechazar", next = "rechazar"}
            }
        },
        ["rechazar"] = {
            texto = "Entiendo. Buena suerte.",
            opciones = {}
        }
    }
}

function NPC:MostrarDialogo()
    local d = self.dialogos["inicio"]
    print(self.nombre .. ": " .. d.texto)
    
    for i, op in ipairs(d.opciones) do
        print(i .. ". " .. op.texto)
    end
    
    print("> 1")
    local opcion = d.opciones[1]
    
    if opcion.quest then
        print("¡Quest aceptada!")
        print(opcion.quest.nombre)
        print("Objetivo: " .. opcion.quest.objetivo)
        print("Recompensa: " .. opcion.quest.recompensa.oro .. " oro, " .. opcion.quest.recompensa.xp .. " XP")
    end
end

NPC:MostrarDialogo()`,
    tests: [
      { type: "output_contains", expected: "Cazador:", message: "NPC muestra nombre" },
      { type: "output_contains", expected: "¡Quest aceptada!", message: "Quest aceptada" },
      { type: "output_contains", expected: "200 oro", message: "Recompensa mostrada" },
    ],
    hints: ["Muestra diálogo con opciones", "Opción 1 tiene data de quest", "Imprime nombre, objetivo y recompensa"],
    xpReward: 60,
    difficulty: "intermediate",
  },
  summary: "NPC con widget UI. Diálogo ramificado con consecuencias. Quests integradas. Reputación modificable. Fade animations.",
  resources: [],
  prerequisites: ["mes-05-l05"],
};

// Exportar todas las lecciones del módulo 5
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
];
