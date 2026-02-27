/**
 * Lección 2.4: UnLua Setup
 */

import { Lesson } from "@/types/lesson";

export const lesson04: Lesson = {
  id: "mes-02-l04",
  moduleId: "mes-02",
  lessonNumber: 4,
  title: "UnLua Setup",
  description: "Instalación, configuración y tu primer script en Unreal Engine 5.",
  estimatedTime: 25,
  difficulty: "beginner",
  theory: {
    title: "UnLua Setup",
    objectives: [
      "Instalar UnLua en un proyecto UE5",
      "Configurar el entorno de desarrollo",
      "Crear y ejecutar tu primer script Lua",
      "Entender la estructura de archivos de UnLua",
    ],
    estimatedTime: 25,
    sections: [
      {
        heading: "¿Qué es UnLua?",
        content: `**UnLua** es el binding oficial de Lua para Unreal Engine 5, desarrollado por Tencent.

**Características principales:**
- **Hot reload** - Cambia código sin recompilar
- **Performance** - Casi nativo con JIT
- **Sintaxis simple** - Lua es fácil de aprender
- **Acceso completo** - Todas las APIs de UE5

**Casos de uso:**
- Lógica de juego rápida de iterar
- Scripts de eventos y diálogos
- IA de NPCs
- Sistemas de UI`,
        codeExamples: [
          {
            title: "Hello UnLua",
            code: `-- MyFirstScript.lua
local UE = UE or {}

function UE.BeginPlay()
    print("¡Hola desde UnLua!")
end

return UE`,
            language: "lua",
            description: "Script básico de UnLua con evento BeginPlay.",
          },
        ],
      },
      {
        heading: "Instalación Paso a Paso",
        content: `**Paso 1: Descargar UnLua**
\`\`\`bash
git clone https://github.com/Tencent/UnLua.git
\`\`\`

**Paso 2: Copiar al proyecto**
- Copia la carpeta \`UnLua\` a \`TuProyecto/Plugins/\`
- Si no existe Plugins/, créala

**Paso 3: Habilitar el plugin**
- Abre tu proyecto en UE5
- Ve a Edit → Plugins
- Busca "UnLua" y actívalo
- Reinicia el editor

**Paso 4: Configurar directorio de scripts**
- Crea carpeta \`Content/Scripts/\`
- Ahí irán tus archivos \`.lua\`

**Estructura resultante:**
\`\`\`
MiProyecto/
├── Content/
│   └── Scripts/
│       ├── MyActor.lua
│       └── MyGameMode.lua
├── Plugins/
│   └── UnLua/
└── MiProyecto.uproject
\`\`\``,
      },
      {
        heading: "Configuración del Proyecto",
        content: `**En \`.uproject\`**:
\`\`\`json
{
    "Modules": [
        {
            "Name": "MiProyecto",
            "Type": "Runtime",
            "LoadingPhase": "Default"
        },
        {
            "Name": "UnLua",
            "Type": "Runtime",
            "LoadingPhase": "Default"
        }
    ]
}
\`\`\`

**En \`DefaultEngine.ini\`**:
\`\`\`ini
[/Script/UnLua.UnLuaSettings]
bEnable = true
ScriptsPath = /Game/Scripts
\`\`\`

**Verificar instalación:**
1. Abre Consola (~)
2. Escribe \`lua print("Test")\`
3. Deberías ver "Test" en output`,
      },
      {
        heading: "Tu Primer Script",
        content: `**Crear script para Actor:**

1. Crea \`Content/Scripts/MyActor.lua\`
2. Escribe el código
3. Asigna el script al Actor en UE5

**Código del script:**
\`\`\`lua
local MyActor = {}

function MyActor:BeginPlay()
    print("MyActor ha iniciado!")
    
    -- Obtener ubicación
    local location = self:GetActorLocation()
    print("Ubicación: " .. tostring(location))
end

function MyActor:Tick(deltaTime)
    -- Se llama cada frame
    local rotation = self:GetActorRotation()
    self:SetActorRotation(rotation + FRotator(0, 1, 0))
end

return MyActor
\`\`\`

**Asignar en UE5:**
1. Selecciona tu Actor
2. En Details, busca "UnLua"
3. Asigna el script \`MyActor.lua\`
4. Play!`,
        codeExamples: [
          {
            title: "Script completo de Actor",
            code: `local MyActor = {}

function MyActor:BeginPlay()
    print("¡Script funcionando!")
    self:MiFuncionPersonalizada()
end

function MyActor:MiFuncionPersonalizada()
    print("Función personalizada ejecutada")
end

function MyActor:Tick(deltaTime)
    -- Rotar el actor
    local rot = self:GetActorRotation()
    rot.Yaw = rot.Yaw + deltaTime * 45
    self:SetActorRotation(rot)
end

return MyActor`,
            language: "lua",
            description: "Script completo con BeginPlay, Tick y función personalizada.",
          },
        ],
      },
    ],
    summary: `UnLua es el binding de Lua para UE5. Instala en Plugins/, habilita en editor, crea Scripts/. Los scripts se asignan a actores desde el panel Details. Usa BeginPlay para init, Tick para updates.`,
  },
  examples: [
    {
      title: "Script de GameMode",
      code: `local MyGameMode = {}

function MyGameMode:BeginPlay()
    print("GameMode iniciado")
    self.Score = 0
end

function MyGameMode:AddScore(points)
    self.Score = self.Score + points
    print("Score: " .. self.Score)
end

function MyGameMode:OnPlayerKilled(player)
    print(player .. " ha muerto")
    self:AddScore(-10)
end

return MyGameMode`,
      language: "lua",
      description: "GameMode con sistema de score simple.",
    },
    {
      title: "Script de UI Widget",
      code: `local MyHUD = {}

function MyHUD:BeginPlay()
    self.HealthBar = self:GetHealthBar()
    self:UpdateHealth(100)
end

function MyHUD:UpdateHealth(current, max)
    local percent = current / max * 100
    self.HealthBar:SetPercent(percent / 100)
end

function MyHUD:ShowMessage(msg)
    self.TextBlock:SetText(msg)
end

return MyHUD`,
      language: "lua",
      description: "Widget de UI con barra de vida y mensajes.",
    },
    {
      title: "Script de Enemy AI",
      code: `local EnemyAI = {}

function EnemyAI:BeginPlay()
    self.Target = nil
    self.DetectionRange = 500
end

function EnemyAI:Tick(deltaTime)
    if self.Target then
        self:MoveToTarget()
    else
        self:Patrol()
    end
end

function EnemyAI:MoveToTarget()
    local targetLoc = self.Target:GetActorLocation()
    self:SimpleMoveToLocation(targetLoc)
end

function EnemyAI:Patrol()
    -- Lógica de patrulla
end

return EnemyAI`,
      language: "lua",
      description: "IA básica de enemigo con patrulla y persecución.",
    },
  ],
  interactive: {
    title: "Simula Script UnLua",
    description: "Prueba la estructura de un script sin UE5",
    starterCode: `-- Simulación de entorno UnLua
local UE = {}

function UE:BeginPlay()
    print("=== BeginPlay ===")
    print("Actor iniciado correctamente")
end

function UE:Tick(deltaTime)
    -- Se llamaría cada frame
    print("Tick: " .. deltaTime .. "s")
end

-- Ejecutar
UE:BeginPlay()
UE:Tick(0.016)  -- 60 FPS`,
    environment: "lua",
    expectedOutput: "BeginPlay",
  },
  miniExercise: {
    id: "mes-02-l04-ej1",
    lessonId: "mes-02-l04",
    title: "Crea tu Primer Script",
    instructions: `Crea un script UnLua completo:

1. Declara la tabla del script (ej: \`MyScript = {}\`)
2. Implementa \`BeginPlay()\` que imprima "Script cargado"
3. Implementa \`Tick(deltaTime)\` que acumule tiempo
4. Después de 1 segundo, imprime "1 segundo transcurrido"
5. Retorna la tabla al final

**Salida esperada (simulada):**
\`\`\`
Script cargado
1 segundo transcurrido
\`\`\``,
    starterCode: `local MyScript = {}

local tiempoAcumulado = 0

function MyScript:BeginPlay()
    -- Imprimir mensaje de carga
end

function MyScript:Tick(deltaTime)
    -- Acumular tiempo
    -- Si >= 1 segundo, imprimir y resetear
end

return MyScript`,
    solution: `local MyScript = {}
local tiempoAcumulado = 0

function MyScript:BeginPlay()
    print("Script cargado")
end

function MyScript:Tick(deltaTime)
    tiempoAcumulado = tiempoAcumulado + deltaTime
    if tiempoAcumulado >= 1 then
        print("1 segundo transcurrido")
        tiempoAcumulado = 0
    end
end

return MyScript`,
    tests: [
      {
        type: "output_contains",
        expected: "Script cargado",
        message: "Debe imprimir mensaje de carga",
      },
      {
        type: "code_contains",
        expected: "return MyScript",
        message: "Debe retornar la tabla",
      },
      {
        type: "code_contains",
        expected: "deltaTime",
        message: "Debe usar deltaTime en Tick",
      },
    ],
    hints: [
      "Acumula deltaTime en una variable",
      "Usa if tiempoAcumulado >= 1 then",
      "No olvides retornar la tabla al final",
    ],
    xpReward: 35,
    difficulty: "beginner",
  },
  summary: `UnLua permite scripting Lua en UE5. Instala en Plugins/, crea Content/Scripts/, asigna scripts a actores. BeginPlay para init, Tick para updates. Hot reload permite cambios sin recompilar.`,
  resources: [
    {
      title: "UnLua GitHub Oficial",
      url: "https://github.com/Tencent/UnLua",
      type: "tool",
      description: "Repositorio oficial con documentación",
    },
    {
      title: "UnLua Documentation",
      url: "https://github.com/Tencent/UnLua/blob/master/Docs/README.md",
      type: "documentation",
      description: "Documentación completa de UnLua",
    },
    {
      title: "UnLua Examples",
      url: "https://github.com/Tencent/UnLua/tree/master/Source/UnLua/Tests",
      type: "article",
      description: "Ejemplos de código de UnLua",
    },
  ],
  prerequisites: ["mes-02-l03"],
};

export default lesson04;
