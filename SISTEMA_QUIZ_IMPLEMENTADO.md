# 📝 Sistema de Quiz - Implementación Completa

**Fecha:** Febrero 2026  
**Estado:** ✅ Completado para Módulos 1-6

---

## 🎯 Objetivo del Sistema de Quiz

Cada módulo del curso tiene un quiz de evaluación con **15 preguntas** para verificar el conocimiento adquirido por los estudiantes.

---

## 📊 Estructura del Sistema

### Archivos Creados

| Archivo | Descripción | Estado |
|---------|-------------|--------|
| `src/lib/quizQuestions.ts` | Banco de preguntas por módulo | ✅ |
| `src/components/Quiz.tsx` | Componente actualizado | ✅ |
| `src/app/quiz/page.tsx` | Página de selección de quizzes | ✅ |
| `src/app/quiz/[moduleId]/page.tsx` | Página del quiz por módulo | ✅ |

---

## 📋 Preguntas por Módulo

### ✅ Módulo 1: Lua desde Cero (15 preguntas)

**Temas:**
- Sintaxis básica (5 preguntas)
- Control de flujo (3 preguntas)
- Funciones (2 preguntas)
- Tablas y metatables (5 preguntas)

**Ejemplo de pregunta:**
```
¿Cuál es el tipo de dato fundamental en Lua que puede almacenar cualquier cosa?
○ string
● table (correcta)
○ number
○ boolean
```

### ✅ Módulo 2: POO en Lua + UE5 (15 preguntas)

**Temas:**
- POO en Lua (4 preguntas)
- UnLua en UE5 (4 preguntas)
- Interacciones básicas (2 preguntas)
- Código práctico (3 preguntas)
- UnLua avanzado (2 preguntas)

**Ejemplo de pregunta:**
```
¿Cómo se implementa la herencia en Lua?
○ Con la palabra clave 'extends'
● Con metatables y __index (correcta)
○ Con clases abstractas
○ Lua no soporta herencia
```

### ✅ Módulo 3: Blueprints ↔ Lua (15 preguntas)

**Temas:**
- Binding BP-Lua (3 preguntas)
- Input System (3 preguntas)
- Delegates y eventos (3 preguntas)
- Código práctico (4 preguntas)
- Conceptos avanzados (2 preguntas)

**Ejemplo de pregunta:**
```
¿Qué es un Delegate en UE5?
● Un tipo de evento o callback (correcta)
○ Una función de Lua
○ Una variable de Blueprint
○ Un componente de Actor
```

### ✅ Módulo 4: Inventario y Stats (15 preguntas)

**Temas:**
- Arquitectura de datos (3 preguntas)
- Sistema de inventario (4 preguntas)
- Sistema de stats (3 preguntas)
- SaveGame (2 preguntas)
- Código práctico (3 preguntas)

**Ejemplo de pregunta:**
```
¿Qué patrón de diseño es útil para un sistema de inventario?
● Command, Observer, State (correcta)
○ Singleton únicamente
○ Factory únicamente
○ Ninguno
```

### ✅ Módulo 5: Diálogos e UI (15 preguntas)

**Temas:**
- UMG desde Lua (4 preguntas)
- Sistema de diálogos (3 preguntas)
- HUD y notificaciones (3 preguntas)
- Localización (2 preguntas)
- Código práctico (3 preguntas)

**Ejemplo de pregunta:**
```
¿Qué es UMG en UE5?
● Unreal Motion Graphics - sistema de UI (correcta)
○ Un tipo de material
○ Una función de Lua
○ Un componente de sonido
```

### ✅ Módulo 6: IA de NPCs (15 preguntas)

**Temas:**
- FSM (3 preguntas)
- Percepción (2 preguntas)
- Behavior Trees (4 preguntas)
- Pathfinding (2 preguntas)
- Optimización (2 preguntas)
- Código práctico (2 preguntas)

**Ejemplo de pregunta:**
```
¿Qué es una FSM (Finite State Machine)?
● Una máquina de estados finitos para comportamiento de IA (correcta)
○ Un tipo de sonido
○ Una función de Lua
○ Un componente de UI
```

### ⏳ Módulos 7-12 (Pendientes)

Los módulos 7-12 necesitarán preguntas cuando se implemente su contenido:
- Módulo 7: Multijugador y Replicación
- Módulo 8: Optimización y Herramientas
- Módulo 9: Sistemas Avanzados
- Módulo 10: Arquitectura de Proyecto
- Módulo 11: Producción del Juego Final
- Módulo 12: Portfolio

---

## 🎮 Características del Componente Quiz

### UI/UX

- ✅ **Barra de progreso** visual
- ✅ **Navegación** entre preguntas (anterior/siguiente)
- ✅ **Feedback inmediato** después de cada respuesta
- ✅ **Explicación detallada** de cada respuesta correcta
- ✅ **Resultados finales** con porcentaje y desglose
- ✅ **Diseño responsivo** para móviles y desktop
- ✅ **Estado de loading** mientras cargan las preguntas

### Funcionalidad

- ✅ **Carga dinámica** según el moduleId
- ✅ **15 preguntas** por módulo
- ✅ **Puntuación** en tiempo real
- ✅ **Validación** de respuestas
- ✅ **Reintentar** quiz completado
- ✅ **Fallback** a preguntas genéricas si no hay específicas

### Sistema de Puntuación

| Puntuación | Mensaje | Color |
|------------|---------|-------|
| ≥ 80% | "¡Excelente! 🎉" | Verde |
| ≥ 60% | "Bien hecho ✓" | Amarillo |
| < 60% | "Necesitas practicar más 📚" | Rojo |

---

## 🔧 Cómo Funciona

### 1. Selección del Módulo

El estudiante va a `/quiz` y selecciona el módulo:

```
/quiz
├── mes-01 (Lua desde Cero)
├── mes-02 (POO + UE5)
├── mes-03 (Blueprints ↔ Lua)
├── mes-04 (Inventario/Stats)
├── mes-05 (Diálogos/UI)
└── mes-06 (IA de NPCs)
```

### 2. Carga de Preguntas

El componente carga las preguntas específicas del módulo:

```typescript
useEffect(() => {
  const moduleQuestions = getQuizQuestions(moduleId);
  setQuestions(moduleQuestions);
}, [moduleId]);
```

### 3. Respuesta y Feedback

El estudiante responde y recibe feedback inmediato:

```
1. Selecciona una opción
2. Click en "Siguiente"
3. Ve si acertó (verde) o falló (rojo)
4. Lee la explicación
5. Continúa a la siguiente
```

### 4. Resultados Finales

Al completar las 15 preguntas:

```
┌─────────────────────────────────┐
│         87%                     │
│     13 de 15 correctas          │
│                                 │
│      ¡Excelente! 🎉             │
│                                 │
│  [Reintentar]  [Volver]         │
└─────────────────────────────────┘
```

---

## 📈 Métricas del Sistema

| Métrica | Valor |
|---------|-------|
| **Total de preguntas** | 90 (6 módulos × 15) |
| **Preguntas por módulo** | 15 |
| **Tiempo estimado por quiz** | 15-20 minutos |
| **Puntuación para aprobar** | 70% (11/15 correctas) |
| **Reintentos permitidos** | Ilimitados |

---

## 🎯 Criterios de Aprobación por Módulo

Para considerar un módulo completado:

- [ ] Quiz completado con **≥ 70%** de aciertos (11/15 preguntas)
- [ ] Entregable del mes completado
- [ ] Checklist semanal completada

---

## 🔮 Próximas Mejoras

### Prioridad Alta:
1. [ ] Guardar progreso del quiz en backend (Supabase)
2. [ ] Sistema de reintentos con mejor puntuación
3. [ ] Certificados de completación por módulo

### Prioridad Media:
4. [ ] Preguntas aleatorias (banco de 30 por módulo)
5. [ ] Límite de tiempo opcional
6. [ ] Sistema de hints/ayudas

### Prioridad Baja:
7. [ ] Leaderboard de mejores puntuaciones
8. [ ] Logros por quizzes completados
9. [ ] Exportar resultados a PDF

---

## 📝 Cómo Añadir Preguntas para Nuevos Módulos

Para añadir preguntas a un módulo nuevo (ej: mes-07):

```typescript
// En src/lib/quizQuestions.ts

export const quizQuestionsByModule: Record<string, QuizQuestion[]> = {
  // ... módulos existentes
  
  "mes-07": [
    {
      id: "m7-q1",
      question: "¿Tu pregunta aquí?",
      options: ["Opción A", "Opción B", "Opción C", "Opción D"],
      correctAnswer: 0, // índice de la opción correcta (0-3)
      explanation: "Explicación de por qué esta es la respuesta correcta.",
    },
    // ... 14 preguntas más
  ],
};
```

### Reglas para las Preguntas:

1. **15 preguntas por módulo** (mínimo 10, máximo 20)
2. **4 opciones** por pregunta (A, B, C, D)
3. **1 sola respuesta correcta**
4. **Explicación clara** después de responder
5. **Dificultad progresiva** (fácil → difícil)
6. **Mezclar teoría y código** (70% teoría, 30% práctica)

---

## 🎨 Ejemplo de Pregunta Bien Formateada

```typescript
{
  id: "m1-q1",
  question: "¿Cuál es el tipo de dato fundamental en Lua que puede almacenar cualquier cosa?",
  options: [
    "string",
    "table",      // ← Correcta (índice 1)
    "number",
    "boolean"
  ],
  correctAnswer: 1,  // ← Índice de la opción correcta
  explanation: "Las tablas en Lua son estructuras versátiles que pueden actuar como arrays, " +
               "diccionarios, objetos y más. Son el tipo de dato más importante en Lua.",
}
```

---

## ✅ Checklist de Implementación

- [x] Crear archivo `quizQuestions.ts`
- [x] Añadir 90 preguntas (15 × 6 módulos)
- [x] Actualizar componente `Quiz.tsx`
- [x] Implementar carga dinámica por módulo
- [x] Añadir feedback visual de respuestas
- [x] Implementar sistema de puntuación
- [x] Crear página de resultados
- [x] Añadir función de reintentar
- [x] Verificar build sin errores
- [x] Documentar el sistema

---

## 📊 Estado Actual

| Módulo | Preguntas | Estado |
|--------|-----------|--------|
| mes-01 | 15/15 | ✅ |
| mes-02 | 15/15 | ✅ |
| mes-03 | 15/15 | ✅ |
| mes-04 | 15/15 | ✅ |
| mes-05 | 15/15 | ✅ |
| mes-06 | 15/15 | ✅ |
| mes-07 | 0/15 | ⏳ Pendiente |
| mes-08 | 0/15 | ⏳ Pendiente |
| mes-09 | 0/15 | ⏳ Pendiente |
| mes-10 | 0/15 | ⏳ Pendiente |
| mes-11 | 0/15 | ⏳ Pendiente |
| mes-12 | 0/15 | ⏳ Pendiente |

**Progreso: 6/12 módulos (50%)**

---

**Documento creado:** Febrero 2026  
**Próxima actualización:** Cuando se añadan preguntas para los módulos 7-12
