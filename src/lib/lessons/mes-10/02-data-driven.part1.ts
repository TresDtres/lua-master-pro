/**
 * Módulo 10: Arquitectura - Lección 10.2 (Parte 1)
 * Data-Driven Design: Teoría y Ejemplos
 */

import { CodeSnippet } from "@/types/lesson";

export const theory = {
  title: "Data-Driven Design en Lua",
  objectives: [
    "Implementar sistemas data-driven en Lua",
    "Cargar y parsear configuración desde JSON",
    "Crear sistema de hot-reload para cambios en tiempo real",
    "Separar datos de la lógica del juego",
  ] as string[],
  estimatedTime: 45,
  sections: [
    {
      heading: "¿Qué es Data-Driven Design?",
      content: `**Data-Driven Design** separa los **datos** de la **lógica** del juego.

**Ventajas:**
- **Flexibilidad** - Cambia balance sin recompilar código
- **Iteración rápida** - Diseñadores editan JSON directamente
- **Modding** - La comunidad puede crear contenido
- **Localización** - Textos separados del código
- **A/B Testing** - Cambia valores para testing

**Ejemplos de datos externalizables:**
- Stats de enemigos (health, damage, exp)
- Configuración de items (precio, rareza, efectos)
- Diálogos y textos de quests
- Balance del juego (drop rates, scaling)
- Configuración de niveles (spawns, triggers)

**Formatos comunes:**
- **JSON** - Legible, universal, fácil de editar
- **XML** - Verboso pero estructurado
- **YAML** - Limpio, usado en Unity
- **Lua tables** - Nativo, máximo rendimiento`,
      codeExamples: [
        {
          title: "Datos hardcodeados vs data-driven",
          code: `-- ❌ HARDCODED (MALO)
local Enemy = {}
function Enemy:New()
    local self = setmetatable({}, Enemy)
    self.health = 100
    self.damage = 25
    self.expReward = 50
    return self
end

-- ✅ DATA-DRIVEN (BUENO)
local Enemy = {}
local enemyConfig = require("config.enemies")
function Enemy:New(enemyType)
    local self = setmetatable({}, Enemy)
    local data = enemyConfig[enemyType]
    self.health = data.health
    self.damage = data.damage
    self.expReward = data.expReward
    return self
end`,
          language: "lua" as unknown as "lua" | "cpp" | "typescript",
          description: "Comparación: código hardcodeado vs data-driven.",
        },
      ] as unknown as CodeSnippet[],
    },
    {
      heading: "Cargar JSON en Lua",
      content: `Lua no tiene JSON nativo, pero podemos usar librerías o implementarlo manualmente.

**Opciones para JSON en Lua:**

1. **dkjson** - Librería popular, pura Lua
2. **json.lua** - Implementación simple
3. **UE5 JSON parser** - Nativo de Unreal Engine

**En Unreal Engine con UnLua:**
- Usar FJsonParser de UE5
- Cargar desde archivos .json en Content/
- Parsear a tablas Lua automáticamente`,
      codeExamples: [
        {
          title: "JSON Parser simple",
          code: `-- json.lua (simplificado)
local json = {}

function json.decode(jsonString)
    -- Implementación simplificada
    local func = loadstring("return " .. jsonString)
    if func then
        return func()
    end
    return nil
end

return json`,
          language: "lua" as unknown as "lua" | "cpp" | "typescript",
          description: "Parser JSON básico para Lua.",
        },
      ] as unknown as CodeSnippet[],
    },
  ] as Array<{ heading: string; content: string; codeExamples?: CodeSnippet[] }>,
  summary: `## Resumen: Data-Driven Design

**JSON para configuración:**
- Separa datos de la lógica
- Editable sin recompilar
- Fácil de versionar

**Hot-Reload:**
- Detecta cambios en archivos
- Recarga sin reiniciar
- Notifica via callbacks

**Sistemas data-driven:**
- Enemies, Items, Quests, Skills
- Localización multi-idioma
- Balance y configuración

**Validación:**
- Schema de campos requeridos
- Rangos válidos por stat
- Valores por defecto`,
};

export const examples: CodeSnippet[] = [
  {
    title: "Config Loader",
    code: `-- ConfigLoader.lua
local ConfigLoader = {}
ConfigLoader.__index = ConfigLoader

function ConfigLoader:New()
    local self = setmetatable({}, ConfigLoader)
    self.configs = {}
    return self
end

function ConfigLoader:LoadJSON(path)
    local file = io.open(path, "r")
    if not file then
        error("Config not found: " .. path)
    end
    local content = file:read("*all")
    file:close()
    return self:ParseJSON(content)
end

function ConfigLoader:ParseJSON(str)
    local func = loadstring("return " .. str)
    if func then
        return func()
    end
    return nil
end

return ConfigLoader`,
    language: "lua" as unknown as "lua" | "cpp" | "typescript",
    description: "Cargador de configuración JSON.",
  },
] as unknown as CodeSnippet[];
