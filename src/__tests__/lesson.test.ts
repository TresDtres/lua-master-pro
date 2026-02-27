/**
 * Unit Tests for Lesson Types
 * Tests para verificar la integridad de las lecciones
 */

import { Lesson, LessonSummary } from "@/types/lesson";

// Mock de una lección válida
const createMockLesson = (): Lesson => ({
  id: "test-l01",
  moduleId: "test-01",
  lessonNumber: 1,
  title: "Test Lesson",
  description: "Test Description",
  theory: {
    title: "Test Theory",
    objectives: ["Objective 1", "Objective 2"],
    sections: [
      {
        heading: "Test Section",
        content: "Test content",
      },
    ],
    summary: "Test summary",
    estimatedTime: 10,
  },
  examples: [
    {
      title: "Test Example",
      code: "print('Hello')",
      language: "lua",
      description: "Test description",
    },
  ],
  interactive: {
    title: "Test Interactive",
    description: "Test interactive example",
    starterCode: "-- Write code here",
    environment: "lua",
    expectedOutput: "Hello",
  },
  miniExercise: {
    id: "test-exercise-01",
    lessonId: "test-l01",
    title: "Test Exercise",
    instructions: "Complete the exercise",
    starterCode: "-- Write code here",
    solution: "print('Solution')",
    tests: [
      {
        type: "output_equals",
        expected: "Hello",
        message: "Should print Hello",
      },
    ],
    hints: ["Hint 1", "Hint 2"],
    xpReward: 10,
    difficulty: "beginner",
  },
  summary: "Test lesson summary",
  resources: [
    {
      title: "Test Resource",
      url: "https://example.com",
      type: "article",
    },
  ],
  estimatedTime: 20,
  difficulty: "beginner",
});

describe("Lesson Type Tests", () => {
  describe("Lesson Structure", () => {
    it("should create a valid lesson object", () => {
      const lesson = createMockLesson();
      expect(lesson.id).toBeDefined();
      expect(lesson.moduleId).toBeDefined();
      expect(lesson.title).toBeDefined();
      expect(lesson.theory).toBeDefined();
      expect(lesson.examples).toBeDefined();
      expect(lesson.interactive).toBeDefined();
      expect(lesson.miniExercise).toBeDefined();
    });

    it("should have valid lesson ID format", () => {
      const lesson = createMockLesson();
      expect(lesson.id).toMatch(/^[a-z0-9-]+$/);
    });

    it("should have at least one theory section", () => {
      const lesson = createMockLesson();
      expect(lesson.theory.sections.length).toBeGreaterThan(0);
    });

    it("should have at least one example", () => {
      const lesson = createMockLesson();
      expect(lesson.examples.length).toBeGreaterThan(0);
    });

    it("should have valid difficulty level", () => {
      const lesson = createMockLesson();
      const validDifficulties = ["beginner", "intermediate", "advanced", "expert"];
      expect(validDifficulties).toContain(lesson.difficulty);
    });
  });

  describe("Lesson Theory", () => {
    it("should have valid theory structure", () => {
      const lesson = createMockLesson();
      expect(lesson.theory.title).toBeDefined();
      expect(lesson.theory.objectives).toBeDefined();
      expect(lesson.theory.sections).toBeDefined();
      expect(lesson.theory.summary).toBeDefined();
      expect(lesson.theory.estimatedTime).toBeGreaterThan(0);
    });

    it("should have at least one objective", () => {
      const lesson = createMockLesson();
      expect(lesson.theory.objectives.length).toBeGreaterThan(0);
    });

    it("should have valid estimated time", () => {
      const lesson = createMockLesson();
      expect(lesson.theory.estimatedTime).toBeGreaterThan(0);
      expect(lesson.theory.estimatedTime).toBeLessThanOrEqual(120);
    });
  });

  describe("Lesson Examples", () => {
    it("should have valid example structure", () => {
      const lesson = createMockLesson();
      const example = lesson.examples[0];
      expect(example.title).toBeDefined();
      expect(example.code).toBeDefined();
      expect(example.language).toBeDefined();
    });

    it("should have valid language", () => {
      const lesson = createMockLesson();
      const example = lesson.examples[0];
      const validLanguages = ["lua", "cpp", "typescript"];
      expect(validLanguages).toContain(example.language);
    });

    it("should have non-empty code", () => {
      const lesson = createMockLesson();
      const example = lesson.examples[0];
      expect(example.code.length).toBeGreaterThan(0);
    });
  });

  describe("Lesson Interactive", () => {
    it("should have valid interactive structure", () => {
      const lesson = createMockLesson();
      expect(lesson.interactive.title).toBeDefined();
      expect(lesson.interactive.description).toBeDefined();
      expect(lesson.interactive.starterCode).toBeDefined();
      expect(lesson.interactive.environment).toBeDefined();
    });

    it("should have valid environment", () => {
      const lesson = createMockLesson();
      const validEnvironments = ["lua", "roblox", "unlua", "minecraft"];
      expect(validEnvironments).toContain(lesson.interactive.environment);
    });

    it("should have non-empty starter code", () => {
      const lesson = createMockLesson();
      expect(lesson.interactive.starterCode.length).toBeGreaterThan(0);
    });
  });

  describe("Lesson Exercise", () => {
    it("should have valid exercise structure", () => {
      const lesson = createMockLesson();
      const exercise = lesson.miniExercise;
      expect(exercise.id).toBeDefined();
      expect(exercise.lessonId).toBeDefined();
      expect(exercise.title).toBeDefined();
      expect(exercise.instructions).toBeDefined();
      expect(exercise.starterCode).toBeDefined();
      expect(exercise.solution).toBeDefined();
      expect(exercise.tests).toBeDefined();
      expect(exercise.hints).toBeDefined();
      expect(exercise.xpReward).toBeDefined();
      expect(exercise.difficulty).toBeDefined();
    });

    it("should have at least one test", () => {
      const lesson = createMockLesson();
      expect(lesson.miniExercise.tests.length).toBeGreaterThan(0);
    });

    it("should have at least one hint", () => {
      const lesson = createMockLesson();
      expect(lesson.miniExercise.hints.length).toBeGreaterThan(0);
    });

    it("should have valid XP reward", () => {
      const lesson = createMockLesson();
      expect(lesson.miniExercise.xpReward).toBeGreaterThan(0);
      expect(lesson.miniExercise.xpReward).toBeLessThanOrEqual(100);
    });

    it("should have valid exercise difficulty", () => {
      const lesson = createMockLesson();
      const validDifficulties = ["beginner", "intermediate", "advanced", "expert"];
      expect(validDifficulties).toContain(lesson.miniExercise.difficulty);
    });
  });

  describe("Lesson Resources", () => {
    it("should have at least one resource", () => {
      const lesson = createMockLesson();
      expect(lesson.resources.length).toBeGreaterThan(0);
    });

    it("should have valid resource structure", () => {
      const lesson = createMockLesson();
      const resource = lesson.resources[0];
      expect(resource.title).toBeDefined();
      expect(resource.url).toBeDefined();
      expect(resource.type).toBeDefined();
    });

    it("should have valid resource type", () => {
      const lesson = createMockLesson();
      const resource = lesson.resources[0];
      const validTypes = ["video", "article", "documentation", "tool"];
      expect(validTypes).toContain(resource.type);
    });

    it("should have valid URL format", () => {
      const lesson = createMockLesson();
      const resource = lesson.resources[0];
      expect(resource.url).toMatch(/^https?:\/\/.+/);
    });
  });

  describe("Lesson Summary", () => {
    it("should have non-empty summary", () => {
      const lesson = createMockLesson();
      expect(lesson.summary.length).toBeGreaterThan(0);
    });

    it("should have total estimated time", () => {
      const lesson = createMockLesson();
      expect(lesson.estimatedTime).toBeGreaterThan(0);
    });
  });
});

describe("LessonSummary Type Tests", () => {
  const createMockLessonSummary = (): LessonSummary => ({
    id: "test-l01",
    lessonNumber: 1,
    title: "Test Lesson",
    description: "Test Description",
    estimatedTime: 20,
    difficulty: "beginner",
  });

  it("should create a valid lesson summary", () => {
    const summary = createMockLessonSummary();
    expect(summary.id).toBeDefined();
    expect(summary.lessonNumber).toBeDefined();
    expect(summary.title).toBeDefined();
    expect(summary.description).toBeDefined();
    expect(summary.estimatedTime).toBeDefined();
    expect(summary.difficulty).toBeDefined();
  });

  it("should have valid lesson number", () => {
    const summary = createMockLessonSummary();
    expect(summary.lessonNumber).toBeGreaterThan(0);
  });

  it("should have valid estimated time", () => {
    const summary = createMockLessonSummary();
    expect(summary.estimatedTime).toBeGreaterThan(0);
    expect(summary.estimatedTime).toBeLessThanOrEqual(120);
  });

  it("should have valid difficulty", () => {
    const summary = createMockLessonSummary();
    const validDifficulties = ["beginner", "intermediate", "advanced", "expert"];
    expect(validDifficulties).toContain(summary.difficulty);
  });
});

// Export for use in other test files
export { createMockLesson };
