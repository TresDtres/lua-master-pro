# Lua Master Pro - Contexto del Proyecto

## 📋 Descripción General

**Lua Master Pro** es una plataforma educativa interactiva para aprender **Lua Scripting en Unreal Engine 5**. El curso sigue un plan de estudio de **12 módulos** (~730 horas total) que va desde Lua básico hasta un juego completo publicado.

**Estado Actual:** 75% completado (55/73 lecciones) - Fase 2 en progreso

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Framework** | Next.js 16 | App Router |
| **Lenguaje** | TypeScript | 5.x |
| **UI** | React 19 + Tailwind CSS 4 | - |
| **Editor de Código** | Monaco Editor | 0.55.1 |
| **Backend** | Supabase | 2.39.0 |
| **Auth** | NextAuth.js | 4.24.0 |
| **Lua Runtime** | lua.vm.js | 0.0.1 |
| **AI** | Anthropic SDK | 0.24.0 |

### Estructura de Directorios

```
hub_central_proyect/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── quiz/              # Sistema de quiz
│   │   ├── exams/             # Exámenes
│   │   ├── analytics/         # Analytics de progreso
│   │   ├── profile/           # Perfil de usuario
│   │   ├── course/            # Páginas de curso
│   │   │   └── [moduleId]/
│   │   │       └── [lessonId]/
│   │   │           └── page.tsx  # Página dinámica de lección
│   │   └── editor/            # Editor de código
│   ├── components/
│   │   ├── LessonViewer.tsx   # Visualizador de teoría
│   │   ├── InteractiveCode.tsx # Código ejecutable (Monaco)
│   │   ├── LessonNavigation.tsx # Navegación entre lecciones
│   │   └── ExerciseRunner.tsx # Validación de ejercicios
│   ├── lib/
│   │   └── lessons/           # Contenido de lecciones
│   │       ├── mes-01/        # Módulo 1: Lua desde Cero ✅
│   │       ├── mes-02/        # Módulo 2: POO + UE5 ✅
│   │       ├── mes-03/        # Módulo 3: Blueprints ↔ Lua ✅
│   │       ├── mes-04/        # Módulo 4: Inventario y Stats ✅
│   │       ├── mes-05/        # Módulo 5: Diálogos e UI ✅
│   │       ├── mes-06/        # Módulo 6: IA de NPCs ✅
│   │       ├── mes-07/        # Módulo 7: Multijugador ✅
│   │       ├── mes-08/        # Módulo 8: Optimización ✅
│   │       ├── mes-09/        # Módulo 9: Sistemas Avanzados ✅
│   │       ├── mes-10/        # Módulo 10: Arquitectura ✅
│   │       ├── mes-11/        # Módulo 11: Producción ⏳
│   │       └── mes-12/        # Módulo 12: Portfolio ⏳
│   ├── types/
│   │   └── lesson.ts          # Interfaces TypeScript
│   └── hooks/
│       └── useAuth.ts         # Hook de autenticación
├── public/                     # Assets estáticos
├── supabase-schema.sql        # Schema de base de datos
├── package.json               # Dependencias
├── tsconfig.json              # Configuración TypeScript
└── next.config.ts             # Configuración Next.js
```

---

## 🎯 Sistema de Lecciones

### Estructura de Cada Lección

Cada lección (`Lesson` interface) contiene:

```typescript
interface Lesson {
  id: string;              // ej: "mes-10-l01"
  moduleId: string;        // ej: "mes-10"
  lessonNumber: number;    // ej: 1
  title: string;           // ej: "Game Framework"
  description: string;
  theory: LessonTheory;    // Contenido teórico (Markdown)
  examples: CodeSnippet[]; // 3-5 ejemplos de código
  interactive: InteractiveExample; // Código ejecutable
  miniExercise: MiniExercise; // Ejercicio con validación
  summary: string;
  resources: LessonResource[];
  estimatedTime: number;   // minutos
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
}
```

### Ejemplo de Lección Completa

```typescript
// src/lib/lessons/mes-10/01-game-framework.ts
export const lesson01: Lesson = {
  id: "mes-10-l01",
  moduleId: "mes-10",
  lessonNumber: 1,
  title: "Game Framework",
  theory: {
    title: "Game Framework: Arquitectura Central",
    objectives: [...],
    sections: [
      {
        heading: "¿Qué es un Game Framework?",
        content: "Markdown content...",
        codeExamples: [...]
      }
    ]
  },
  examples: [...],
  interactive: {
    title: "Simulador de Game Framework",
    starterCode: "-- Código inicial...",
    environment: "lua"
  },
  miniExercise: {
    id: "mes-10-l01-exercise",
    title: "Crea un GameMode de Supervivencia",
    starterCode: "...",
    solution: "...",
    tests: [...],
    hints: [...]
  }
}
```

---

## 🚀 Comandos de Desarrollo

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
# Abre http://localhost:3000
```

### Build de Producción

```bash
npm run build
npm run start
```

### Testing

```bash
npm test
# o
npx jest
```

---

## 📊 Progreso del Contenido

### Módulos Completados (10/12)

| Módulo | Lecciones | Tema | Estado |
|--------|-----------|------|--------|
| 1 | 7/7 | Lua desde Cero | ✅ |
| 2 | 6/6 | POO + UE5 | ✅ |
| 3 | 6/6 | Blueprints ↔ Lua | ✅ |
| 4 | 6/6 | Inventario y Stats | ✅ |
| 5 | 6/6 | Diálogos e UI | ✅ |
| 6 | 6/6 | IA de NPCs | ✅ |
| 7 | 6/6 | Multijugador | ✅ |
| 8 | 6/6 | Optimización | ✅ |
| 9 | 6/6 | Sistemas Avanzados | ✅ |
| 10 | 6/6 | Arquitectura | ✅ |
| 11 | 2/6 | Producción | ⏳ |
| 12 | 0/6 | Portfolio | ⏳ |

**Total:** 61/73 lecciones (84%)

---

## 🔑 Características Principales

### 1. Editor de Código Interactivo

- **Monaco Editor** (mismo motor que VS Code)
- Soporte para **Lua, TypeScript, C++**
- **Ejecución en navegador** con lua.vm.js
- Validación automática de ejercicios

### 2. Sistema de Progreso

- Tracking de horas de estudio
- Checklist semanal
- Medallas y logros
- Sistema de XP

### 3. Evaluación

- **Quizzes** por módulo (10-15 preguntas)
- **Exámenes** ficticios con certificación
- **Ejercicios prácticos** con validación automática
- Analytics de errores

### 4. Gamificación

- Niveles y XP
- Rachas de estudio
- Medallas desbloqueables
- Leaderboard (próximamente)

---

## 🗄️ Base de Datos (Supabase)

### Tablas Principales

```sql
-- user_lesson_progress
CREATE TABLE user_lesson_progress (
  user_id UUID REFERENCES auth.users(id),
  lesson_id TEXT,
  module_id TEXT,
  completed BOOLEAN,
  theory_read BOOLEAN,
  examples_viewed INTEGER,
  interactive_executed BOOLEAN,
  exercise_completed BOOLEAN,
  xp_earned INTEGER,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, lesson_id)
);
```

### Schema Completo

Ver `supabase-schema.sql` para el schema completo.

---

## 🎨 Componentes Clave

### LessonViewer.tsx

```typescript
// Muestra el contenido teórico de la lección
// - Renderiza Markdown
// - Muestra objetivos
// - Navegación entre secciones
```

### InteractiveCode.tsx

```typescript
// Editor Monaco con ejecución de Lua
// - Resaltado de sintaxis
// - Ejecución en sandbox
// - Comparación output esperado vs real
```

### ExerciseRunner.tsx

```typescript
// Validador de ejercicios
// - Ejecuta tests automáticos
// - Muestra hints si falla
// - Otorga XP al completar
```

---

## 📝 Convenciones de Desarrollo

### Naming de Lecciones

```
mes-{numero}/{orden}-{tema}.ts
// Ejemplo: mes-10/01-game-framework.ts
```

### Estructura de Teoría

Cada sección de teoría debe tener:
1. **Heading** claro y descriptivo
2. **Content** en Markdown (300-500 palabras)
3. **CodeExamples** (1-3 ejemplos relevantes)

### Ejercicios

Cada ejercicio debe tener:
- **Instructions** claras y medibles
- **StarterCode** con TODOs marcados
- **Solution** completa
- **Tests** de validación (3-5 tests)
- **Hints** progresivos (3-4 hints)

---

## 🔧 Configuración

### Variables de Entorno (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
ANTHROPIC_API_KEY=your_api_key
```

### TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 📚 Recursos de Referencia

### Documentación Oficial

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)

### Lua Específico

- [Lua 5.4 Manual](https://www.lua.org/manual/5.4/)
- [UnLua Plugin](https://github.com/Tencent/UnLua)
- [Lua Game Patterns](https://gameprogrammingpatterns.com/)

---

## 🎯 Próximos Pasos

### Prioridad Inmediata

1. **Completar Módulo 11** (4 lecciones pendientes)
   - 11.3: Menús (principal, opciones, pausa, HUD)
   - 11.4: Polish (partículas, audio, juice)
   - 11.5: Bug Fixing (debug, logs, crash reports)
   - 11.6: Proyecto: Alpha Jugable

2. **Completar Módulo 12** (6 lecciones)
   - 12.1: Lua Toolkit
   - 12.2: Documentación (EmmyLua)
   - 12.3: Artículo Técnico
   - 12.4: Devlog
   - 12.5: Portfolio
   - 12.6: Networking

3. **Implementar Quizzes** por módulo
4. **Sistema de entrega** de proyectos

### Features Futuras

- [ ] Integración con GitHub para portfolios
- [ ] Sistema de certificados
- [ ] Leaderboard global
- [ ] Modo offline (PWA)
- [ ] App móvil (React Native)

---

## 🆘 Troubleshooting Común

### Build falla con errores de tipo

```bash
# Limpiar cache y rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Monaco Editor no carga

```bash
# Verificar imports de Monaco
# Asegurar que monaco-editor está en dependencies
```

### Supabase connection error

```bash
# Verificar .env.local
# Asegurar que las URLs son correctas
# Verificar que el schema está aplicado
```

---

## 📞 Contacto y Contribución

**Repositorio:** GitHub (privado actualmente)
**Issues:** Reportar bugs en el tracker
**Contribuciones:** Seguir guía de contribución

---

*Documento creado: Febrero 2026*
*Última actualización: Febrero 2026*
*Versión: 1.0*
