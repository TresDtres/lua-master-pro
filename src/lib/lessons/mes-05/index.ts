/**
 * Módulo 5: Diálogos e UI
 * Sistemas de interfaz de usuario, diálogos ramificados y HUD en Unreal Engine 5 con UnLua
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01, lesson02, lesson03, lesson04, lesson05, lesson06 } from "./lessons-all";

export const module05Metadata = {
  moduleId: "mes-05",
  moduleTitle: "Diálogos e UI",
  moduleDescription: "Aprende a crear interfaces de usuario con UMG, sistemas de diálogos ramificados, HUD dinámico, localización multi-idioma y animaciones UI en Unreal Engine 5.",
  totalLessons: 6,
  estimatedTotalTime: 210, // minutos
};

export const module05Lessons: LessonSummary[] = [
  {
    id: "mes-05-l01",
    lessonNumber: 1,
    title: "UMG desde Lua",
    description: "Crear widgets, bind de propiedades y eventos desde scripts Lua.",
    estimatedTime: 35,
    difficulty: "intermediate",
  },
  {
    id: "mes-05-l02",
    lessonNumber: 2,
    title: "Sistema de Diálogos",
    description: "JSON, ramificación, opciones múltiples y consecuencias.",
    estimatedTime: 40,
    difficulty: "advanced",
  },
  {
    id: "mes-05-l03",
    lessonNumber: 3,
    title: "HUD",
    description: "Barras de vida/mana, textos dinámicos, iconos y notificaciones.",
    estimatedTime: 35,
    difficulty: "intermediate",
  },
  {
    id: "mes-05-l04",
    lessonNumber: 4,
    title: "Localización",
    description: "Sistema multi-idioma, tablas de texto, formato dinámico.",
    estimatedTime: 30,
    difficulty: "intermediate",
  },
  {
    id: "mes-05-l05",
    lessonNumber: 5,
    title: "Animaciones UI",
    description: "Fade, slide, scale, animaciones complejas de widgets.",
    estimatedTime: 35,
    difficulty: "advanced",
  },
  {
    id: "mes-05-l06",
    lessonNumber: 6,
    title: "Proyecto: NPC con Diálogos",
    description: "Integra UI, diálogos ramificados y consecuencias en un NPC.",
    estimatedTime: 35,
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
];

// Exportar individualmente para uso directo
export {
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
};
