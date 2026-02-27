/**
 * Módulo 10: Arquitectura - Lección 10.3 (Parte 2)
 * Testing con luaunit: Interactivo y Ejercicio
 */

import { InteractiveExample, MiniExercise, LessonResource } from "@/types/lesson";

export const interactive: InteractiveExample = {
  title: "Simulador de Tests con luaunit",
  description: "Escribe y ejecuta tests unitarios con luaunit",
  starterCode: `-- Test Simulator
local luaunit = {}

-- Mock de luaunit para simulación
luaunit.assertEquals = function(actual, expected)
    if actual == expected then
        print("✓ PASS: " .. tostring(actual) .. " == " .. tostring(expected))
        return true
    else
        print("✗ FAIL: " .. tostring(actual) .. " ~= " .. tostring(expected))
        return false
    end
end

luaunit.assertTrue = function(condition)
    if condition then
        print("✓ PASS: condition is true")
        return true
    else
        print("✗ FAIL: condition is false")
        return false
    end
end

-- Test de ejemplo
local function testAddition()
    local result = 2 + 2
    luaunit.assertEquals(result, 4)
end

-- Ejecutar test
testAddition()
print("Tests complete")`,
  environment: "lua",
  expectedOutput: "✓ PASS: 4 == 4\nTests complete",
};

export const miniExercise: MiniExercise = {
  id: "mes-10-l03-exercise",
  lessonId: "mes-10-l03",
  title: "Test Suite para Damage Calculator",
  instructions: `Crea una **Test Suite completa** para un Damage Calculator:

1. **Tests para CalculateDamage** - Daño base vs armor
2. **Tests para ApplyCrit** - Daño normal vs crítico
3. **Tests para CalculateTotalDamage** - Combinación completa
4. **Edge cases** - Daño cero, armor máximo

**Requisitos:**
- Mínimo 6 tests unitarios
- Usar setUp para configuración común
- Tests para casos normales y edge cases
- Todos los tests deben pasar`,
  starterCode: `-- test_damage_calculator.lua
local luaunit = require("luaunit")
local DamageCalculator = require("DamageCalculator")

TestDamageCalculator = {}

function TestDamageCalculator:setUp()
    -- TODO: Configurar datos comunes
end

-- TODO: Tests para CalculateDamage
function TestDamageCalculator:TestDamageNoArmor()
    -- luaunit.assertEquals(...)
end

-- TODO: Tests para ApplyCrit
function TestDamageCalculator:TestCritNormal()
    -- luaunit.assertEquals(...)
end

-- TODO: Tests para CalculateTotalDamage
function TestDamageCalculator:TestTotalNoCritNoArmor()
    -- luaunit.assertEquals(...)
end

os.exit(luaunit.LuaUnit.run())`,
  solution: `-- test_damage_calculator.lua
local luaunit = require("luaunit")
local DamageCalculator = require("DamageCalculator")

TestDamageCalculator = {}

function TestDamageCalculator:setUp()
    self.baseDamage = 100
    self.zeroArmor = 0
    self.halfArmor = 100
    self.maxArmor = 300
end

-- Tests para CalculateDamage
function TestDamageCalculator:TestDamageNoArmor()
    luaunit.assertEquals(
        DamageCalculator.CalculateDamage(self.baseDamage, self.zeroArmor),
        100
    )
end

function TestDamageCalculator:TestDamageHalfArmor()
    luaunit.assertEquals(
        DamageCalculator.CalculateDamage(self.baseDamage, self.halfArmor),
        50
    )
end

function TestDamageCalculator:TestDamageZeroDamage()
    luaunit.assertEquals(DamageCalculator.CalculateDamage(0, 0), 0)
end

function TestDamageCalculator:TestDamageHighArmor()
    local damage = DamageCalculator.CalculateDamage(100, 300)
    luaunit.assertTrue(damage < 30)
end

-- Tests para ApplyCrit
function TestDamageCalculator:TestCritNormal()
    luaunit.assertEquals(DamageCalculator.ApplyCrit(50, false), 50)
end

function TestDamageCalculator:TestCritHit()
    luaunit.assertEquals(DamageCalculator.ApplyCrit(50, true), 100)
end

function TestDamageCalculator:TestCritZero()
    luaunit.assertEquals(DamageCalculator.ApplyCrit(0, true), 0)
end

-- Tests para CalculateTotalDamage
function TestDamageCalculator:TestTotalNoCritNoArmor()
    luaunit.assertEquals(
        DamageCalculator.CalculateTotalDamage(100, 0, false),
        100
    )
end

function TestDamageCalculator:TestTotalWithCritNoArmor()
    luaunit.assertEquals(
        DamageCalculator.CalculateTotalDamage(100, 0, true),
        200
    )
end

function TestDamageCalculator:TestTotalWithCritAndArmor()
    local damage = DamageCalculator.CalculateTotalDamage(100, 100, true)
    luaunit.assertEquals(damage, 100)
end

os.exit(luaunit.LuaUnit.run())`,
  tests: [
    {
      type: "output_contains",
      expected: "OK",
      message: "Todos los tests deben pasar",
    },
    {
      type: "output_contains",
      expected: "tests passed",
      message: "Debe mostrar cantidad de tests passing",
    },
  ],
  hints: [
    "Usa `luaunit.assertEquals(actual, expected)`",
    "Para armor 100, la reducción es del 50%",
    "Crit multiplica por 2 el daño",
    "Incluye tests para casos base (0 damage, 0 armor)",
  ],
  xpReward: 150,
  difficulty: "advanced",
};

export const resources: LessonResource[] = [
  {
    title: "luaunit Documentation",
    url: "https://github.com/bluebird75/luaunit",
    type: "documentation",
    description: "Documentación oficial de luaunit",
  },
  {
    title: "Test-Driven Development",
    url: "https://en.wikipedia.org/wiki/Test-driven_development",
    type: "article",
    description: "Wikipedia sobre TDD",
  },
  {
    title: "GitHub Actions for Lua",
    url: "https://github.com/marketplace/actions/github-action-for-lua",
    type: "documentation",
    description: "Setup de GitHub Actions para proyectos Lua",
  },
];
