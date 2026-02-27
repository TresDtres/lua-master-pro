/**
 * Módulo 10: Arquitectura - Lección 10.3 (Parte 1)
 * Testing con luaunit: Teoría y Ejemplos
 */

import { LessonTheory, CodeSnippet } from "@/types/lesson";

export const theory: LessonTheory = {
  title: "Testing en Lua con luaunit",
  objectives: [
    "Entender los fundamentos de TDD (Test-Driven Development)",
    "Escribir unit tests con luaunit",
    "Crear integration tests para sistemas completos",
    "Implementar CI/CD para testing automático",
  ],
  estimatedTime: 50,
  sections: [
    {
      heading: "¿Por qué Testing?",
      content: `**Testing** asegura que tu código funcione correctamente y **previene regresiones**.

**Beneficios:**
- **Confianza** - Sabes que el código funciona
- **Documentación** - Los tests muestran cómo usar el código
- **Refactoring seguro** - Cambia código sin miedo
- **Detección temprana** - Encuentra bugs antes del deploy

**Tipos de tests:**

| Tipo | Propósito | Ejemplo |
|------|-----------|---------|
| **Unit Tests** | Testear funciones individuales | \`Player:TakeDamage()\` reduce health |
| **Integration Tests** | Testear interacción entre sistemas | Combat + Inventory + UI |
| **End-to-End** | Testear flujo completo | Start game → Complete quest → Get reward |

**TDD (Test-Driven Development):**
1. RED: Escribe un test que falle
2. GREEN: Escribe código mínimo para pasar el test
3. REFACTOR: Mejora el código manteniendo tests passing`,
      codeExamples: [
        {
          title: "Ejemplo de TDD",
          code: `-- PASO 1: RED - Escribir test que falla
local luaunit = require("luaunit")

function TestPlayer:TestTakeDamage()
    local player = Player:New(100)
    player:TakeDamage(30)
    luaunit.assertEquals(player.health, 70)
end

-- ❌ FAIL: Player no existe todavía

-- PASO 2: GREEN - Implementación mínima
local Player = {}
Player.__index = Player

function Player:New(health)
    local self = setmetatable({}, Player)
    self.health = health
    return self
end

function Player:TakeDamage(amount)
    self.health = self.health - amount
end

-- ✅ PASS: Test pasa

-- PASO 3: REFACTOR - Mejorar implementación
function Player:TakeDamage(amount)
    assert(amount >= 0, "Damage must be positive")
    self.health = math.max(0, self.health - amount)
end

-- ✅ PASS: Test sigue pasando`,
          language: "lua",
          description: "Ciclo completo de TDD: Red → Green → Refactor.",
        },
      ],
    },
    {
      heading: "luaunit: Framework de Testing",
      content: `**luaunit** es un framework de testing ligero para Lua.

**Instalación:**
\`\`\`bash
# Descargar luaunit.lua
# Colocar en tu proyecto
require("luaunit")
\`\`\`

**Aserciones principales:**
- \`luaunit.assertEquals(actual, expected)\`
- \`luaunit.assertTrue(condition)\`
- \`luaunit.assertFalse(condition)\`
- \`luaunit.assertError(func)\`
- \`luaunit.assertTableContains(table, value)\`

**Estructura de test:**
\`\`\`lua
local luaunit = require("luaunit")

TestMyModule = {}

function TestMyModule:setUp()
    -- Se ejecuta antes de cada test
end

function TestMyModule:tearDown()
    -- Se ejecuta después de cada test
end

function TestMyModule:TestSomething()
    luaunit.assertEquals(actual, expected)
end

os.exit(luaunit.LuaUnit.run())
\`\`\``,
      codeExamples: [
        {
          title: "Test Suite Completa",
          code: `-- test_player.lua
local luaunit = require("luaunit")
local Player = require("Player")

TestPlayer = {}

function TestPlayer:setUp()
    self.player = Player:New(100)
end

function TestPlayer:TestPlayerInitialHealth()
    luaunit.assertEquals(self.player.health, 100)
end

function TestPlayer:TestPlayerTakeDamage()
    self.player:TakeDamage(30)
    luaunit.assertEquals(self.player.health, 70)
end

function TestPlayer:TestPlayerDeath()
    self.player:TakeDamage(100)
    luaunit.assertEquals(self.player.health, 0)
    luaunit.assertFalse(self.player.isAlive)
end

os.exit(luaunit.LuaUnit.run())`,
          language: "lua",
          description: "Test suite completo con setUp y múltiples tests.",
        },
      ],
    },
  ],
  summary: `## Resumen: Testing con luaunit

**TDD:**
- Red → Green → Refactor
- Escribe tests primero
- Código mínimo para pasar

**Unit Tests:**
- Una función por test
- Aserciones: assertEquals, assertTrue, assertError
- setUp/tearDown para setup común

**Integration Tests:**
- Múltiples sistemas juntos
- Flujos completos
- Más realistas pero más lentos

**CI/CD:**
- GitHub Actions para automation
- Tests en cada commit
- Previene regresiones`,
};

export const examples: CodeSnippet[] = [
  {
    title: "luaunit Setup",
    code: `-- luaunit_setup.lua
local luaunit = require("luaunit")

-- Configurar path de tests
local testPath = "tests/"

-- Cargar todos los tests
local function loadTests()
    require(testPath .. "test_player")
    require(testPath .. "test_enemy")
    require(testPath .. "test_combat")
    require(testPath .. "test_inventory")
end

-- Ejecutar tests
loadTests()
os.exit(luaunit.LuaUnit.run())`,
    language: "lua",
    description: "Setup para ejecutar múltiples test suites.",
  },
  {
    title: "GitHub Actions CI",
    code: `# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Lua
        uses: leafo/gh-actions-lua@v8
        with:
          luaVersion: "5.4"
      - name: Run Tests
        run: lua tests/run_tests.lua`,
    language: "cpp" as any,  // YAML not in type definition but valid for syntax highlighting
    description: "CI/CD con GitHub Actions para tests automáticos.",
  },
];

export const summary = `## Resumen: Testing con luaunit

**TDD:**
- Red → Green → Refactor
- Escribe tests primero
- Código mínimo para pasar

**Unit Tests:**
- Una función por test
- Aserciones: assertEquals, assertTrue, assertError
- setUp/tearDown para setup común

**Integration Tests:**
- Múltiples sistemas juntos
- Flujos completos
- Más realistas pero más lentos

**CI/CD:**
- GitHub Actions para automation
- Tests en cada commit
- Previene regresiones`;
