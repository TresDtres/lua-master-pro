/**
 * Módulo 7: Multijugador
 * Sistemas de red, replicación, RPCs y sincronización en Unreal Engine 5 con UnLua
 */

import { Lesson, LessonSummary } from "@/types/lesson";
import { lesson01, lesson02, lesson03, lesson04, lesson05, lesson06 } from "./lessons-all";

export const module07Metadata = {
  moduleId: "mes-07",
  moduleTitle: "Multijugador",
  moduleDescription: "Aprende a implementar sistemas multijugador en Unreal Engine 5: arquitectura cliente-servidor, replicación de propiedades, RPCs, sincronización de estado, predicción de movimiento y compensación de lag.",
  totalLessons: 6,
  estimatedTotalTime: 230, // minutos
};

export const module07Lessons: LessonSummary[] = [
  {
    id: "mes-07-l01",
    lessonNumber: 1,
    title: "Redes UE5",
    description: "Arquitectura cliente-servidor, authority, roles y relevancia en Unreal Engine.",
    estimatedTime: 40,
    difficulty: "advanced",
  },
  {
    id: "mes-07-l02",
    lessonNumber: 2,
    title: "Replicación",
    description: "Propiedades replicadas, condiciones de replicación y optimización de ancho de banda.",
    estimatedTime: 40,
    difficulty: "advanced",
  },
  {
    id: "mes-07-l03",
    lessonNumber: 3,
    title: "RPCs",
    description: "Server, Client, Multicast RPCs y cuándo usar cada tipo.",
    estimatedTime: 40,
    difficulty: "advanced",
  },
  {
    id: "mes-07-l04",
    lessonNumber: 4,
    title: "Sincronización",
    description: "Sincronizar posición, rotación, estado de animación y variables entre clientes.",
    estimatedTime: 35,
    difficulty: "intermediate",
  },
  {
    id: "mes-07-l05",
    lessonNumber: 5,
    title: "Lag Compensation",
    description: "Predicción de movimiento, reconciliación y compensación de latencia.",
    estimatedTime: 40,
    difficulty: "advanced",
  },
  {
    id: "mes-07-l06",
    lessonNumber: 6,
    title: "Proyecto: Mini-juego 2 Jugadores",
    description: "Implementa un juego completo con movimiento, acciones y sincronización entre 2 jugadores.",
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
