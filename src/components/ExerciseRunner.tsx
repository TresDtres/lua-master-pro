"use client";

import { useState } from "react";
import CodeEditor from "./CodeEditor";
import { validateExercise, ProgressTracker } from "@/lib/exerciseValidator";
import { GamificationTracker } from "@/lib/gamification";

export interface Exercise {
  id: string;
  lessonId: string;
  title: string;
  instructions: string;
  starterCode: string;
  solution: string;
  tests: ExerciseTest[];
  hints: string[];
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  xpReward: number;
}

export interface ExerciseTest {
  type: "output_equals" | "output_contains" | "output_lines" | "code_contains";
  expected: string | number;
  message: string;
}

interface ExerciseRunnerProps {
  exercise: Exercise;
  environment?: "lua" | "roblox" | "unlua" | "minecraft";
  onComplete?: (exerciseId: string, passed: boolean, xpEarned: number) => void;
  userId?: string;
  compact?: boolean; // Modo compacto para menos altura
}

// Trackers globales
const progressTracker = new ProgressTracker();
let gamificationTracker: GamificationTracker | null = null;

export default function ExerciseRunner({
  exercise,
  environment = "lua",
  onComplete,
  userId = "student",
  compact = false,
}: ExerciseRunnerProps) {
  // Inicializar gamification tracker
  if (!gamificationTracker && userId) {
    gamificationTracker = new GamificationTracker(userId);
  }

  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState("");
  const [validationResult, setValidationResult] = useState<any>(null);
  const [testResults, setTestResults] = useState<Array<{
    passed: boolean;
    message: string;
  }>>([]);
  const [hintsRevealed, setHintsRevealed] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const validateCode = (codeOutput: string) => {
    setIsValidating(true);
    
    // Usar el validador automático
    const result = validateExercise(code, exercise);
    
    setValidationResult(result);
    setAttempts(prev => prev + 1);
    
    // Convertir resultados para la UI
    const formattedResults = result.tests.map((test: any) => ({
      passed: test.passed,
      message: test.message
    }));
    
    setTestResults(formattedResults);
    
    // Registrar progreso
    const progress = progressTracker.recordAttempt(exercise.id, result, code);
    
    // Si completó el ejercicio
    if (result.passed && !completed) {
      setCompleted(true);
      
      // Calcular XP ganada
      let xp = exercise.xpReward;
      
      // Penalización por hints
      const hintsUsed = hintsRevealed.length;
      if (hintsUsed > 0) {
        xp = Math.floor(xp * Math.max(0.5, 1 - (hintsUsed * 0.1)));
      }
      
      // Penalización por intentos
      if (attempts > 1) {
        xp = Math.floor(xp * Math.max(0.5, 1 - ((attempts - 1) * 0.05)));
      }
      
      setXpEarned(xp);
      
      // Actualizar gamificación
      if (gamificationTracker) {
        gamificationTracker.completeExercise(exercise.id, exercise.difficulty, attempts);
      }
      
      onComplete?.(exercise.id, true, xp);
    }
    
    setIsValidating(false);
    
    return result.passed;
  };

  const handleRun = (codeOutput: string) => {
    setOutput(codeOutput);
    validateCode(codeOutput);
  };

  const revealHint = (index: number) => {
    if (!hintsRevealed.includes(index)) {
      setHintsRevealed([...hintsRevealed, index]);
    }
  };

  const showSolution = () => {
    if (confirm("¿Estás seguro de que quieres ver la solución? Perderás el 50% de la XP.")) {
      setCode(exercise.solution);
      // Reducir XP a la mitad por mostrar solución
      onComplete?.(exercise.id, false, Math.floor(exercise.xpReward * 0.5));
    }
  };

  const resetExercise = () => {
    setCode(exercise.starterCode);
    setOutput("");
    setValidationResult(null);
    setTestResults([]);
    setHintsRevealed([]);
    setCompleted(false);
    setAttempts(0);
  };

  const getDifficultyColor = () => {
    switch (exercise.difficulty) {
      case "beginner":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "intermediate":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "advanced":
        return "text-red-400 bg-red-400/10 border-red-400/20";
    }
  };

  const getDifficultyLabel = () => {
    switch (exercise.difficulty) {
      case "beginner":
        return "Principiante";
      case "intermediate":
        return "Intermedio";
      case "advanced":
        return "Avanzado";
    }
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(r => r.passed);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 border-b border-slate-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-bold text-white">{exercise.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor()}`}>
                {getDifficultyLabel()}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>🏆 {exercise.xpReward} XP</span>
              <span>📝 {exercise.tests.length} tests</span>
              <span>👥 {attempts} intentos</span>
              {completed && (
                <span className="text-green-400 font-semibold">✓ Completado</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetExercise}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition text-sm"
            >
              🔄 Reiniciar
            </button>
            {!completed && (
              <button
                onClick={showSolution}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition text-sm"
              >
                💡 Ver Solución
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Panel Izquierdo: Instrucciones */}
        <div className="p-6 border-r border-slate-700 max-h-[600px] overflow-auto">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <span>📋</span> Instrucciones
          </h4>
          <div className="prose prose-invert prose-sm max-w-none mb-6">
            <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
              {exercise.instructions}
            </div>
          </div>

          {/* Pistas */}
          <div className="mb-6">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <span>💡</span> Pistas
            </h4>
            <div className="space-y-2">
              {exercise.hints.map((hint, index) => (
                <div key={index}>
                  {hintsRevealed.includes(index) ? (
                    <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-sm text-slate-300">
                      <span className="font-semibold text-blue-400">Pista {index + 1}:</span> {hint}
                    </div>
                  ) : (
                    <button
                      onClick={() => revealHint(index)}
                      className="w-full text-left px-3 py-2 bg-slate-700/30 hover:bg-slate-700/50 border border-dashed border-slate-600 rounded-lg text-sm text-slate-400 hover:text-slate-300 transition"
                    >
                      🔒 Pista {index + 1} (haz clic para revelar)
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resultados de Validación */}
          {validationResult && (
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span>✅</span> Resultados
              </h4>
              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 text-sm ${
                      result.passed
                        ? "bg-green-900/30 border-green-600 text-green-200"
                        : "bg-red-900/30 border-red-600 text-red-200"
                    }`}
                  >
                    <span className="font-bold mr-2">{result.passed ? "✓" : "✗"}</span>
                    {result.message}
                  </div>
                ))}
              </div>

              {allTestsPassed ? (
                <div className="mt-4 p-4 bg-green-900/50 border-2 border-green-600 rounded-lg text-center">
                  <div className="text-green-200 font-bold text-lg">
                    🎉 ¡Ejercicio Completado!
                  </div>
                  <div className="text-green-300 text-sm mt-1">
                    +{xpEarned} XP ganados
                  </div>
                  <div className="text-green-400 text-xs mt-2">
                    Intentos: {attempts} {hintsRevealed.length > 0 && `| Hints usados: ${hintsRevealed.length}`}
                  </div>
                </div>
              ) : (
                <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg text-center">
                  <div className="text-yellow-200 text-sm">
                    {validationResult.feedback}
                  </div>
                  {validationResult.warnings && validationResult.warnings.length > 0 && (
                    <div className="mt-2 text-yellow-300 text-xs">
                      {validationResult.warnings[0]}
                    </div>
                  )}
                </div>
              )}

              {/* Progreso del ejercicio */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Progreso</span>
                  <span>{testResults.filter(r => r.passed).length}/{testResults.length}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      allTestsPassed ? "bg-green-600" : "bg-blue-600"
                    }`}
                    style={{ 
                      width: `${(testResults.filter(r => r.passed).length / testResults.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel Derecho: Editor */}
        <div className="flex flex-col">
          <CodeEditor
            environment={environment}
            initialCode={code}
            height={compact ? "300px" : "400px"}
            showOutput={true}
            onCodeChange={setCode}
            onRun={handleRun}
          />
        </div>
      </div>
    </div>
  );
}
