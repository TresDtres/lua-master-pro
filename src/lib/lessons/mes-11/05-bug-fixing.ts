/**
 * Módulo 11: Producción - Lección 11.5
 * Bug Fixing: debug, logs, crash reports
 * 
 * NOTE: Placeholder lesson - full content needs to be restored from backup
 */

import { Lesson } from "@/types/lesson";

export const lesson05: Lesson = {
  id: "mes-11-l05",
  moduleId: "mes-11",
  lessonNumber: 5,
  title: "Bug Fixing",
  description: "Debugging: logs, crash reports, y técnicas de debugging.",
  estimatedTime: 40,
  difficulty: "intermediate",
  theory: {
    title: "Debugging Profesional",
    objectives: ["Usar logs efectivamente", "Analizar crash reports", "Debug en tiempo real"],
    estimatedTime: 40,
    sections: [{ heading: "Técnicas de Debug", content: "El debugging es esencial para encontrar y fixear bugs.", codeExamples: [] }],
    summary: "Debugging requiere logs, paciencia y método sistemático.",
  },
  examples: [],
  interactive: {
    title: "Debug Logger",
    description: "Sistema de logging para debug",
    starterCode: `local Logger = {}\nLogger.DEBUG = 1\nLogger.WARN = 2\nLogger.ERROR = 3\n\nfunction Logger:Log(level, message)\n    print("[LOG] " .. message)\nend\n\nLogger:Log(Logger.DEBUG, "Test message")`,
    environment: "lua",
    expectedOutput: "[LOG] Test message",
  },
  miniExercise: {
    id: "mes-11-l05-exercise",
    lessonId: "mes-11-l05",
    title: "Sistema de Logs",
    instructions: "Crea un logger con niveles DEBUG, WARN, ERROR.",
    starterCode: `local Logger = {DEBUG = 1, WARN = 2, ERROR = 3}\nfunction Logger:Log(msg) print("[LOG] " .. msg) end\nLogger:Log("Hello")`,
    solution: `local Logger = {DEBUG = 1, WARN = 2, ERROR = 3}\nfunction Logger:Log(msg) print("[LOG] " .. msg) end\nLogger:Log("Hello")`,
    tests: [{ type: "output_contains", expected: "[LOG]", message: "Debe mostrar prefijo [LOG]" }],
    hints: ["Define los niveles como constantes"],
    xpReward: 100,
    difficulty: "beginner",
  },
  summary: "Debugging usa logs, breakpoints, y análisis sistemático de errores.",
  resources: [{ title: "Debugging Lua", url: "https://example.com", type: "article" }],
  prerequisites: ["mes-11-l04"],
};
