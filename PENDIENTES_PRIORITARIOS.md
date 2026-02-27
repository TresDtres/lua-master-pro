# 📋 Tareas Pendientes - Lua Master Pro

**Fecha:** Febrero 2026  
**Última actualización:** Febrero 2026

---

## ✅ Tareas Completadas

### Fase 1: Editor de Código
- [x] Editor Monaco con IntelliSense
- [x] Definiciones de API (Roblox, UE5, Minecraft)
- [x] Ejecución de código con Fengari
- [x] 40+ snippets de código
- [x] Tema personalizado "lua-dark"

### Fase 1.5: Ejemplos Funcionales
- [x] 22 ejemplos de código (6 Lua, 6 Roblox, 5 UE5, 5 Minecraft)
- [x] Selector de entornos en el editor
- [x] Etiquetas de dificultad

### Fase 1.7: Sistema de Quiz
- [x] 90 preguntas para módulos 1-6 (15 por módulo)
- [x] Componente Quiz con carga dinámica
- [x] Feedback inmediato con explicación
- [x] Sistema de puntuación

### Fase 1.8: Editor en Cursos
- [x] Integración en páginas `/course/[moduleId]`
- [x] Sistema de pestañas (contenido/editor)
- [x] Detección automática de entorno
- [x] Botón "Ejecutar en Editor"

---

## 🔥 PRIORIDAD ALTA - Pendientes

### 1. Ejercicios Prácticos por Módulo ⏳
**Estado:** Pendiente  
**Complejidad:** Alta  
**Tiempo estimado:** 2-3 días

**Descripción:**
Crear ejercicios prácticos para cada lección de los módulos 1-6. Cada ejercicio debe:
- Tener instrucciones claras
- Incluir código inicial (starter code)
- Tener una solución de referencia
- Validar automáticamente el resultado
- Integrarse con el editor en la página del curso

**Estructura por ejercicio:**
```typescript
{
  id: "ejercicio-1-1",
  titulo: "Crear variables y imprimir",
  instrucciones: "Crea 3 variables y muestra su valor...",
  starterCode: "-- Escribe tu código aquí\n",
  solucion: "local x = 5\nlocal y = 10\nprint(x + y)",
  tests: [
    { tipo: "output", esperado: "15" },
    { tipo: "contains", esperado: "print" }
  ],
  pistas: ["Usa local para declarar", "Usa print() para mostrar"],
  dificultad: "beginner",
  xpRecompensa: 50
}
```

**Archivos a crear:**
- `src/lib/exercises/mes01Exercises.ts`
- `src/lib/exercises/mes02Exercises.ts`
- ... (módulos 3-6)
- `src/components/ExerciseRunner.tsx`
- Actualizar `src/app/course/[moduleId]/page.tsx`

---

### 2. Quizzes para Módulos 7-12 ⏳
**Estado:** Pendiente  
**Complejidad:** Media  
**Tiempo estimado:** 1 día

**Descripción:**
Crear 15 preguntas para cada uno de los módulos restantes (7-12).

**Módulos pendientes:**
- [ ] mes-07: Multijugador y Replicación
- [ ] mes-08: Optimización y Herramientas
- [ ] mes-09: Sistemas Avanzados
- [ ] mes-10: Arquitectura de Proyecto
- [ ] mes-11: Producción del Juego Final
- [ ] mes-12: Portfolio

**Total:** 90 preguntas adicionales

**Archivo a actualizar:**
- `src/lib/quizQuestions.ts`

---

### 3. Validación Automática de Ejercicios ⏳
**Estado:** Pendiente  
**Complejidad:** Muy Alta  
**Tiempo estimado:** 3-4 días

**Descripción:**
Sistema que valida automáticamente el código escrito por el estudiante.

**Características:**
- Ejecutar código del estudiante
- Comparar output con resultado esperado
- Verificar uso de conceptos específicos
- Proporcionar feedback detallado
- Sistema de tests unitarios para Lua

**Componentes:**
- `src/lib/exerciseValidator.ts`
- `src/components/ExerciseFeedback.tsx`
- API endpoint: `/api/exercises/validate`

---

## 💎 PRIORIDAD MEDIA - Pendientes

### 4. Sistema de Gamificación ⏳
**Estado:** Pendiente  
**Complejidad:** Alta  
**Tiempo estimado:** 2-3 días

**Descripción:**
Sistema de XP, niveles e insignias para motivar a los estudiantes.

**Características:**
- XP por completar lecciones
- XP por aprobar quizzes
- Bonus por racha diaria
- Niveles con títulos (Novato, Estudiante, Experto, Maestro)
- Insignias por logros específicos

**Archivos a crear:**
- `src/lib/gamification.ts`
- `src/components/XPBar.tsx`
- `src/components/Badges.tsx`

---

### 5. Perfil de Usuario ⏳
**Estado:** Pendiente  
**Complejidad:** Media  
**Tiempo estimado:** 1-2 días

**Descripción:**
Página de perfil que muestra progreso, estadísticas y logros.

**Características:**
- Nivel actual y XP
- Progreso por módulo
- Insignias obtenidas
- Racha de días
- Tiempo total de estudio
- Ejercicios completados

**Archivo a actualizar:**
- `src/app/profile/page.tsx`

---

### 6. Backend con Supabase ⏳
**Estado:** Pendiente  
**Complejidad:** Muy Alta  
**Tiempo estimado:** 4-5 días

**Descripción:**
Integración completa con Supabase para guardar progreso en la nube.

**Características:**
- Autenticación de usuarios
- Guardar progreso de lecciones
- Guardar puntuaciones de quizzes
- Guardar ejercicios completados
- Sincronización entre dispositivos
- Tablas de clasificación

**Tablas necesarias:**
- `users` (ya existe)
- `user_progress`
- `user_exercises`
- `user_badges`
- `quiz_scores`

**Archivos a crear/actualizar:**
- `src/lib/supabase.ts` (ya existe, completar)
- `src/app/api/progress/route.ts`
- `src/app/api/exercises/route.ts`

---

### 7. Sistema de Entrega de Proyectos ⏳
**Estado:** Pendiente  
**Complejidad:** Alta  
**Tiempo estimado:** 2-3 días

**Descripción:**
Sistema para que los estudiantes entreguen los proyectos de cada módulo.

**Características:**
- Upload de archivos .lua
- Enlaces a repositorios GitHub
- Rúbricas de evaluación
- Feedback del sistema
- Historial de entregas

**Archivos a crear:**
- `src/components/ProjectSubmitter.tsx`
- `src/app/api/projects/submit/route.ts`

---

## 🔽 PRIORIDAD BAJA - Pendientes

### 8. Tablas de Clasificación ⏳
**Estado:** Pendiente  
**Complejidad:** Media  
**Tiempo estimado:** 1 día

### 9. Certificados de Completación ⏳
**Estado:** Pendiente  
**Complejidad:** Media  
**Tiempo estimado:** 1 día

### 10. Modo Oscuro/Claro Personalizable ⏳
**Estado:** Pendiente  
**Complejidad:** Baja  
**Tiempo estimado:** 0.5 días

### 11. Exportar Código a GitHub Gist ⏳
**Estado:** Pendiente  
**Complejidad:** Baja  
**Tiempo estimado:** 0.5 días

### 12. Sistema de Pistas en Ejercicios ⏳
**Estado:** Pendiente  
**Complejidad:** Media  
**Tiempo estimado:** 1 día

---

## 📊 Resumen de Pendientes

| Prioridad | Tareas | Tiempo Total |
|-----------|--------|--------------|
| **Alta** | 3 | 6-10 días |
| **Media** | 4 | 8-11 días |
| **Baja** | 5 | 4 días |
| **TOTAL** | 12 | 18-25 días |

---

## 🎯 Siguiente Tarea a Implementar

**#1: Ejercicios Prácticos por Módulo**

Comenzar con el Módulo 1 (Lua desde Cero):
- Crear 5-10 ejercicios por lección
- Implementar componente ExerciseRunner
- Integrar en página del curso
- Sistema de validación básico

---

**Documento creado:** Febrero 2026  
**Próxima revisión:** Cuando se completen los ejercicios prácticos
