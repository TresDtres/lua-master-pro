/**
 * Tipos para el sistema de Lecciones Teóricas - FASE 2
 */

/**
 * Contenido teórico de una lección
 */
export interface LessonTheory {
  title: string;
  objectives: string[];
  sections: TheorySection[];
  summary: string;
  estimatedTime: number; // minutos
}

/**
 * Sección individual de teoría
 */
export interface TheorySection {
  heading: string;
  content: string; // Markdown
  codeExamples?: CodeSnippet[];
}

/**
 * Fragmento de código con sintaxis resaltada
 */
export interface CodeSnippet {
  title: string;
  code: string;
  language: "lua" | "cpp" | "typescript";
  description?: string;
}

/**
 * Ejemplo interactivo ejecutable
 */
export interface InteractiveExample {
  title: string;
  description: string;
  starterCode: string;
  environment: "lua" | "roblox" | "unlua" | "minecraft";
  expectedOutput?: string;
}

/**
 * Mini-ejercicio para practicar
 */
export interface MiniExercise {
  id: string;
  lessonId: string;  // Para compatibilidad con ExerciseRunner
  title: string;
  instructions: string;
  starterCode: string;
  solution: string;
  tests: ExerciseTest[];
  hints: string[];
  xpReward: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
}

/**
 * Test de validación de ejercicio
 */
export interface ExerciseTest {
  type: "output_equals" | "output_contains" | "output_lines" | "code_contains";
  expected: string | number;
  message: string;
}

/**
 * Recurso adicional
 */
export interface LessonResource {
  title: string;
  url: string;
  type: "video" | "article" | "documentation" | "tool";
  description?: string;
}

/**
 * Lección completa
 */
export interface Lesson {
  id: string;
  moduleId: string;
  lessonNumber: number;
  title: string;
  description: string;
  theory: LessonTheory;
  examples: CodeSnippet[];
  interactive: InteractiveExample;
  miniExercise: MiniExercise;
  summary: string;
  resources: LessonResource[];
  prerequisites?: string[]; // IDs de lecciones previas
  estimatedTime: number; // minutos totales
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
}

/**
 * Progreso de un usuario en una lección
 */
export interface UserLessonProgress {
  userId: string;
  lessonId: string;
  moduleId: string;
  completed: boolean;
  theoryRead: boolean;
  examplesViewed: number; // cantidad de ejemplos vistos
  interactiveExecuted: boolean;
  exerciseCompleted: boolean;
  exerciseAttempts: number;
  xpEarned: number;
  startedAt: Date;
  completedAt?: Date;
}

/**
 * Metadata de un módulo con lecciones
 */
export interface ModuleLessonMetadata {
  moduleId: string;
  moduleTitle: string;
  moduleDescription: string;
  lessons: LessonSummary[];
  totalLessons: number;
  estimatedTotalTime: number; // minutos
}

/**
 * Resumen de lección para listados
 */
export interface LessonSummary {
  id: string;
  lessonNumber: number;
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  isCompleted?: boolean;
}
