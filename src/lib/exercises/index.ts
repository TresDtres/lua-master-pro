// Índice de ejercicios para Lua Master Pro
import { Exercise } from "@/components/ExerciseRunner";
import { mes01Exercises, getExercisesByLesson as getMes01Exercises } from "./mes01Exercises";
import { mes02Exercises, getExercisesByLesson as getMes02Exercises } from "./mes02Exercises";
import { mes03Exercises, getExercisesByLesson as getMes03Exercises } from "./mes03Exercises";
import { mes04Exercises, getExercisesByLesson as getMes04Exercises } from "./mes04Exercises";
import { mes05Exercises, getExercisesByLesson as getMes05Exercises } from "./mes05Exercises";
import { mes06Exercises, getExercisesByLesson as getMes06Exercises } from "./mes06Exercises";
import { mes07Exercises, getExercisesByLesson as getMes07Exercises } from "./mes07Exercises";
import { mes08Exercises, getExercisesByLesson as getMes08Exercises } from "./mes08Exercises";
import { mes09Exercises, getExercisesByLesson as getMes09Exercises } from "./mes09Exercises";
import { mes10Exercises, getExercisesByLesson as getMes10Exercises } from "./mes10Exercises";
import { mes11Exercises, getExercisesByLesson as getMes11Exercises } from "./mes11Exercises";
import { mes12Exercises, getExercisesByLesson as getMes12Exercises } from "./mes12Exercises";

// ¡Todos los módulos completados!

// Función genérica para obtener ejercicios por módulo y lección
export function getExercisesByModuleAndLesson(moduleId: string, lessonId: string): Exercise[] {
  if (moduleId === "mes-01") {
    return getMes01Exercises(lessonId);
  } else if (moduleId === "mes-02") {
    return getMes02Exercises(lessonId);
  } else if (moduleId === "mes-03") {
    return getMes03Exercises(lessonId);
  } else if (moduleId === "mes-04") {
    return getMes04Exercises(lessonId);
  } else if (moduleId === "mes-05") {
    return getMes05Exercises(lessonId);
  } else if (moduleId === "mes-06") {
    return getMes06Exercises(lessonId);
  } else if (moduleId === "mes-07") {
    return getMes07Exercises(lessonId);
  } else if (moduleId === "mes-08") {
    return getMes08Exercises(lessonId);
  } else if (moduleId === "mes-09") {
    return getMes09Exercises(lessonId);
  } else if (moduleId === "mes-10") {
    return getMes10Exercises(lessonId);
  } else if (moduleId === "mes-11") {
    return getMes11Exercises(lessonId);
  } else if (moduleId === "mes-12") {
    return getMes12Exercises(lessonId);
  }
  return [];
}

// Exportar ejercicios por módulo
export { mes01Exercises, mes02Exercises, mes03Exercises, mes04Exercises, mes05Exercises, mes06Exercises, mes07Exercises, mes08Exercises, mes09Exercises, mes10Exercises, mes11Exercises, mes12Exercises };

// Exportar funciones helper específicas de cada módulo
export { getMes01Exercises, getMes02Exercises, getMes03Exercises, getMes04Exercises, getMes05Exercises, getMes06Exercises, getMes07Exercises, getMes08Exercises, getMes09Exercises, getMes10Exercises, getMes11Exercises, getMes12Exercises };
