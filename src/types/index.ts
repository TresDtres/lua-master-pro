// Types for Lua UE5 Course Platform

export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  createdAt: Date;
  progress: ModuleProgress[];
}

export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  lessonsCompleted: string[];
  startedAt: Date;
  completedAt?: Date;
  score?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  totalHours: number;
  phases: Phase[];
}

export interface Phase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  duration: string;
  modules: Module[];
}

export interface Module {
  id: string;
  monthNumber: number;
  title: string;
  description: string;
  objectives: string[];
  weeklyStructure: string[];
  deliverable: string;
  duration: string;
  lessons: Lesson[];
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  codeExamples: CodeExample[];
  exercises: Exercise[];
  duration: number;
}

export interface CodeExample {
  id: string;
  description: string;
  code: string;
  language: "lua" | "cpp" | "typescript";
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  startingCode: string;
  testCases: TestCase[];
  difficulty: "easy" | "medium" | "hard";
  hints: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface LuaEditorSession {
  id: string;
  userId: string;
  code: string;
  language: "lua";
  createdAt: Date;
  updatedAt: Date;
  exerciseId?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  context?: {
    moduleId?: string;
    lessonId?: string;
    code?: string;
  };
}

export interface Subscription {
  userId: string;
  plan: "free" | "premium";
  startDate: Date;
  endDate?: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}
