/**
 * Módulo 1: Lua desde Cero
 * 7 lecciones completas con teoría, ejemplos y ejercicios
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01 } from "./lesson-01";
import { lesson02 } from "./lesson-02";
import { lesson03 } from "./lesson-03";
import { lesson04 } from "./lesson-04";
import { lesson05 } from "./lesson-05";
import { lesson06 } from "./lesson-06";
import { lesson07 } from "./lesson-07";

export const module01Metadata = {
  moduleId: "mes-01",
  moduleTitle: "Lua desde Cero",
  moduleDescription: "Aprende los fundamentos de Lua desde cero. Ideal para principiantes sin experiencia en programación.",
  totalLessons: 7,
  estimatedTotalTime: 185, // minutos
};

export const module01Lessons: LessonSummary[] = [
  {
    id: "mes-01-l01",
    lessonNumber: 1,
    title: "Introducción a Lua",
    description: "¿Qué es Lua? Historia, características y casos de uso en videojuegos.",
    estimatedTime: 20,
    difficulty: "beginner",
  },
  {
    id: "mes-01-l02",
    lessonNumber: 2,
    title: "Variables y Tipos de Datos",
    description: "Aprende a declarar variables y conoce los 8 tipos de datos de Lua.",
    estimatedTime: 25,
    difficulty: "beginner",
  },
  {
    id: "mes-01-l03",
    lessonNumber: 3,
    title: "Operadores",
    description: "Operadores aritméticos, relacionales y lógicos para realizar cálculos.",
    estimatedTime: 25,
    difficulty: "beginner",
  },
  {
    id: "mes-01-l04",
    lessonNumber: 4,
    title: "Strings (Cadenas de Texto)",
    description: "Manipulación de texto, concatenación y métodos de strings.",
    estimatedTime: 25,
    difficulty: "beginner",
  },
  {
    id: "mes-01-l05",
    lessonNumber: 5,
    title: "Condicionales",
    description: "Toma de decisiones con if, elseif, else y operador ternario.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
  {
    id: "mes-01-l06",
    lessonNumber: 6,
    title: "Bucles (Loops)",
    description: "Repetición de código con for, while y repeat-until.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
  {
    id: "mes-01-l07",
    lessonNumber: 7,
    title: "Funciones",
    description: "Crea funciones reutilizables con parámetros y retorno de valores.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
];

// Exportar todas las lecciones del módulo
export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
];

// Exportar individualmente para uso directo
export {
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
};
