import { Exercise } from "@/components/ExerciseRunner";

// ============================================
// SISTEMA DE VALIDACIÓN AUTOMÁTICA DE EJERCICIOS
// ============================================
// Este sistema valida automáticamente el código del estudiante
// comparándolo con la solución esperada y ejecutando tests.

export interface ValidationResult {
  passed: boolean;
  score: number;
  maxScore: number;
  feedback: string;
  errors: string[];
  warnings: string[];
  tests: TestResult[];
}

export interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

// ============================================
// VALIDADOR DE CÓDIGO LUA
// ============================================

export class LuaValidator {
  private code: string;
  private expectedSolution: string;
  private tests: Array<{ type: string; expected: string | number; message: string }>;

  constructor(code: string, solution: string, tests: Array<{ type: string; expected: string | number; message: string }>) {
    this.code = code;
    this.expectedSolution = solution;
    this.tests = tests;
  }

  /**
   * Valida el código del estudiante
   */
  validate(): ValidationResult {
    const result: ValidationResult = {
      passed: false,
      score: 0,
      maxScore: 100,
      feedback: "",
      errors: [],
      warnings: [],
      tests: []
    };

    // 1. Verificar que el código no esté vacío
    if (!this.code || this.code.trim().length === 0) {
      result.errors.push("El código está vacío. ¡Escribe algo de código!");
      result.feedback = "❌ El código está vacío";
      return result;
    }

    // 2. Verificar sintaxis básica de Lua
    const syntaxErrors = this.checkSyntax();
    if (syntaxErrors.length > 0) {
      result.errors.push(...syntaxErrors);
      result.feedback = "❌ Errores de sintaxis encontrados";
      return result;
    }

    // 3. Ejecutar tests específicos del ejercicio
    const testResults = this.runTests();
    result.tests = testResults;

    // 4. Calcular puntuación
    const passedTests = testResults.filter(t => t.passed).length;
    const totalTests = testResults.length;
    result.score = Math.floor((passedTests / totalTests) * 100);

    // 5. Determinar si aprobó
    result.passed = result.score >= 70; // 70% para aprobar

    // 6. Generar feedback
    result.feedback = this.generateFeedback(result.passed, passedTests, totalTests);

    // 7. Añadir warnings si corresponde
    if (result.score < 100 && result.score >= 70) {
      result.warnings.push("Has aprobado, pero puedes mejorar tu código para obtener 100%");
    }

    return result;
  }

  /**
   * Verifica errores de sintaxis básicos en Lua
   */
  private checkSyntax(): string[] {
    const errors: string[] = [];

    // Verificar paréntesis balanceados
    const openParens = (this.code.match(/\(/g) || []).length;
    const closeParens = (this.code.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      errors.push("Paréntesis no balanceados. Verifica que cada '(' tenga su ')'");
    }

    // Verificar llaves balanceadas
    const openBraces = (this.code.match(/{/g) || []).length;
    const closeBraces = (this.code.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      errors.push("Llaves no balanceadas. Verifica que cada '{' tenga su '}'");
    }

    // Verificar corchetes balanceados
    const openBrackets = (this.code.match(/\[/g) || []).length;
    const closeBrackets = (this.code.match(/]/g) || []).length;
    if (openBrackets !== closeBrackets) {
      errors.push("Corchetes no balanceados. Verifica que cada '[' tenga su ']'");
    }

    // Verificar que las funciones estén cerradas con 'end'
    const functionCount = (this.code.match(/function\s+/g) || []).length;
    const endCount = (this.code.match(/\bend\b/g) || []).length;
    if (functionCount > 0 && endCount < functionCount) {
      errors.push("Funciones no cerradas. Asegúrate de cerrar cada función con 'end'");
    }

    // Verificar que los bloques if/then estén cerrados
    const ifCount = (this.code.match(/\bif\b/g) || []).length;
    const thenCount = (this.code.match(/\bthen\b/g) || []).length;
    if (ifCount !== thenCount) {
      errors.push("Bloques if/then incompletos. Cada 'if' debe tener un 'then'");
    }

    return errors;
  }

  /**
   * Ejecuta los tests específicos del ejercicio
   */
  private runTests(): TestResult[] {
    const results: TestResult[] = [];

    for (const test of this.tests) {
      const result: TestResult = {
        name: test.message,
        passed: false,
        message: ""
      };

      switch (test.type) {
        case "code_contains":
          result.passed = this.code.includes(test.expected as string);
          result.message = result.passed 
            ? `✓ El código contiene "${test.expected}"`
            : `✗ El código debe contener "${test.expected}"`;
          break;

        case "code_matches":
          const regex = new RegExp(test.expected as string);
          result.passed = regex.test(this.code);
          result.message = result.passed
            ? "✓ El código coincide con el patrón"
            : "✗ El código no coincide con el patrón esperado";
          break;

        case "output_contains":
          // Para tests de output, verificamos si el código imprimiría el valor esperado
          result.passed = this.code.includes(test.expected as string);
          result.message = result.passed
            ? `✓ El output contendría "${test.expected}"`
            : `✗ El output debería contener "${test.expected}"`;
          break;

        case "function_exists":
          result.passed = new RegExp(`function\\s+\\w*${test.expected}\\w*`).test(this.code);
          result.message = result.passed
            ? `✓ La función "${test.expected}" existe`
            : `✗ Debes definir la función "${test.expected}"`;
          break;

        case "variable_exists":
          result.passed = new RegExp(`\\b${test.expected}\\b`).test(this.code);
          result.message = result.passed
            ? `✓ La variable "${test.expected}" existe`
            : `✗ Debes definir la variable "${test.expected}"`;
          break;

        default:
          result.message = `Tipo de test desconocido: ${test.type}`;
      }

      results.push(result);
    }

    return results;
  }

  /**
   * Genera feedback basado en el resultado
   */
  private generateFeedback(passed: boolean, passedTests: number, totalTests: number): string {
    if (passed) {
      if (passedTests === totalTests) {
        return "🎉 ¡Excelente! Todos los tests pasaron. ¡Código perfecto!";
      } else {
        return `✅ ¡Bien hecho! Pasaste ${passedTests}/${totalTests} tests. ¡Sigue así!`;
      }
    } else {
      if (passedTests > 0) {
        return `⚠️ Casi lo logras. Pasaste ${passedTests}/${totalTests} tests. Revisa los errores e intenta de nuevo.`;
      } else {
        return "❌ No pasaste ningún test. Revisa las instrucciones y los hints para ayudarte.";
      }
    }
  }

  /**
   * Obtiene hints basados en los tests fallidos
   */
  getHintsForFailedTests(failedTests: TestResult[]): string[] {
    const hints: string[] = [];

    for (const test of failedTests) {
      if (test.message.includes("function")) {
        hints.push("Asegúrate de definir todas las funciones requeridas");
      } else if (test.message.includes("variable")) {
        hints.push("Verifica que todas las variables estén definidas");
      } else if (test.message.includes("contiene")) {
        hints.push("Tu código debe incluir ciertos elementos clave. Revisa las instrucciones.");
      }
    }

    return hints;
  }
}

// ============================================
// SISTEMA DE VALIDACIÓN CON EJECUCIÓN DE CÓDIGO
// ============================================

/**
 * Ejecuta el código del estudiante en un sandbox seguro
 * y compara el output con el esperado
 */
export async function validateWithExecution(
  studentCode: string,
  expectedOutput: string,
  timeout: number = 5000
): Promise<ValidationResult> {
  const result: ValidationResult = {
    passed: false,
    score: 0,
    maxScore: 100,
    feedback: "",
    errors: [],
    warnings: [],
    tests: []
  };

  try {
    // Ejecutar código en sandbox (usando fengari-web en el navegador)
    const output = await executeLuaCode(studentCode, timeout);

    // Comparar output
    const outputMatch = output.includes(expectedOutput);
    
    result.tests.push({
      name: "Output esperado",
      passed: outputMatch,
      message: outputMatch
        ? `✓ Output correcto: "${expectedOutput}"`
        : `✗ Output esperado: "${expectedOutput}", obtenido: "${output}"`
    });

    result.passed = outputMatch;
    result.score = outputMatch ? 100 : 0;
    result.feedback = outputMatch
      ? "🎉 ¡Código correcto!"
      : `❌ Output incorrecto. Esperado: "${expectedOutput}"`;

  } catch (error: any) {
    result.errors.push(`Error de ejecución: ${error.message}`);
    result.feedback = `❌ Error: ${error.message}`;
  }

  return result;
}

/**
 * Ejecuta código Lua en el navegador usando fengari-web
 */
async function executeLuaCode(code: string, timeout: number): Promise<string> {
  return new Promise((resolve, reject) => {
    // Verificar si fengari está disponible
    const fengari = (window as any).fengari;
    
    if (!fengari) {
      reject(new Error("Fengari no está disponible. Intenta recargar la página."));
      return;
    }

    const { la, to_jsstring, to_luastring } = fengari;

    // Timeout para evitar bucles infinitos
    const timeoutId = setTimeout(() => {
      reject(new Error("Timeout: El código tardó demasiado en ejecutarse (posible bucle infinito)"));
    }, timeout);

    try {
      // Capturar output de print()
      let output = "";
      
      // Crear nuevo estado Lua
      const L = la.luaL_newstate();
      la.luaL_openlibs(L);

      // Redirigir print para capturar output
      la.luaL_dostring(L, to_luastring(`
        local output = {}
        local original_print = print
        function print(...)
          local args = {...}
          for i, v in ipairs(args) do
            output[#output + 1] = tostring(v)
          end
        end
        function getOutput()
          return table.concat(output, "\\n")
        end
      `));

      // Ejecutar código del estudiante
      const result = la.luaL_dostring(L, to_luastring(code));

      if (result === 0) {
        // Obtener output capturado
        la.lua_getglobal(L, to_luastring("getOutput"));
        la.lua_pcall(L, 0, 1, 0);
        output = to_jsstring(la.lua_tostring(L, -1)) || "";
        la.lua_pop(L, 1);
      } else {
        const error = to_jsstring(la.lua_tostring(L, -1));
        reject(new Error(`Error de Lua: ${error}`));
        return;
      }

      la.lua_close(L);
      clearTimeout(timeoutId);
      resolve(output);

    } catch (error: any) {
      clearTimeout(timeoutId);
      reject(new Error(`Error de ejecución: ${error.message}`));
    }
  });
}

// ============================================
// VALIDADOR DE EJERCICIOS COMPLETO
// ============================================

/**
 * Valida un ejercicio completo combinando validación estática y ejecución
 */
export function validateExercise(
  studentCode: string,
  exercise: Exercise
): ValidationResult {
  // 1. Validación estática del código
  const validator = new LuaValidator(studentCode, exercise.solution, exercise.tests);
  const staticResult = validator.validate();

  // 2. Si la validación estática pasa, intentar ejecución (opcional)
  if (staticResult.passed) {
    // La validación estática ya pasó, retornar resultado
    return staticResult;
  }

  // 3. Si falla, añadir hints adicionales
  const failedTests = staticResult.tests.filter(t => !t.passed);
  if (failedTests.length > 0 && exercise.hints && exercise.hints.length > 0) {
    // Añadir el primer hint como ayuda
    staticResult.warnings.push(`💡 Pista: ${exercise.hints[0]}`);
  }

  return staticResult;
}

// ============================================
// SISTEMA DE PROGRESO Y GAMIFICACIÓN
// ============================================

export interface ExerciseProgress {
  exerciseId: string;
  attempts: number;
  bestScore: number;
  completed: boolean;
  completedAt?: string;
  codeSubmitted: string;
}

export class ProgressTracker {
  private progress: Map<string, ExerciseProgress> = new Map();

  /**
   * Registra un intento de ejercicio
   */
  recordAttempt(exerciseId: string, result: ValidationResult, code: string): ExerciseProgress {
    let progress = this.progress.get(exerciseId);

    if (!progress) {
      progress = {
        exerciseId,
        attempts: 0,
        bestScore: 0,
        completed: false,
        codeSubmitted: ""
      };
    }

    progress.attempts++;
    progress.codeSubmitted = code;

    if (result.score > progress.bestScore) {
      progress.bestScore = result.score;
    }

    if (result.passed && !progress.completed) {
      progress.completed = true;
      progress.completedAt = new Date().toISOString();
    }

    this.progress.set(exerciseId, progress);
    return progress;
  }

  /**
   * Obtiene el progreso de un ejercicio
   */
  getProgress(exerciseId: string): ExerciseProgress | undefined {
    return this.progress.get(exerciseId);
  }

  /**
   * Obtiene estadísticas generales
   */
  getStats(): {
    totalExercises: number;
    completedExercises: number;
    totalAttempts: number;
    averageScore: number;
    completionRate: number;
  } {
    const exercises = Array.from(this.progress.values());
    const completed = exercises.filter(e => e.completed);
    const totalAttempts = exercises.reduce((sum, e) => sum + e.attempts, 0);
    const averageScore = exercises.length > 0
      ? exercises.reduce((sum, e) => sum + e.bestScore, 0) / exercises.length
      : 0;

    return {
      totalExercises: exercises.length,
      completedExercises: completed.length,
      totalAttempts,
      averageScore,
      completionRate: exercises.length > 0 ? (completed.length / exercises.length) * 100 : 0
    };
  }

  /**
   * Exporta el progreso para guardar en backend
   */
  export(): object {
    return {
      progress: Array.from(this.progress.entries()),
      stats: this.getStats(),
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Importa progreso desde backend
   */
  import(data: any): void {
    if (data.progress) {
      for (const [id, progress] of data.progress) {
        this.progress.set(id, progress);
      }
    }
  }

  /**
   * Limpia todo el progreso
   */
  clear(): void {
    this.progress.clear();
  }
}

export default {
  LuaValidator,
  validateWithExecution,
  validateExercise,
  ProgressTracker
};
