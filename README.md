# 🎯 Lua Master Pro

**Plataforma educativa interactiva para aprender Lua Scripting en Unreal Engine 5**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19.2.3-61dafb?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-2.39.0-3ecf8e?logo=supabase)](https://supabase.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📖 Descripción

**Lua Master Pro** es una plataforma educativa completa que te lleva desde cero hasta dominar Lua Scripting para Unreal Engine 5. Con **73 lecciones** distribuidas en **12 módulos** (~730 horas de contenido), la plataforma combina teoría, ejemplos de código, ejercicios interactivos y validación automática.

### ✨ Características Principales

- 📚 **73 Lecciones** estructuradas en 12 módulos progresivos
- 💻 **Editor de Código Monaco** (mismo motor que VS Code)
- 🏃 **Ejecución de Lua en el navegador** con lua.vm.js
- ✅ **Validación automática** de ejercicios
- 📊 **Tracking de progreso** con Supabase
- 🎮 **Gamificación**: XP, medallas, leaderboards
- 📝 **Quizzes y exámenes** por módulo
- 🌙 **Dark mode** por defecto
- 📱 **Responsive design** para móvil, tablet y desktop

---

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Framework** | Next.js 16 | App Router |
| **Lenguaje** | TypeScript | 5.x |
| **UI** | React 19 + Tailwind CSS 4 | - |
| **Editor** | Monaco Editor | 0.55.1 |
| **Backend** | Supabase | 2.39.0 |
| **Auth** | NextAuth.js | 4.24.0 |
| **Lua Runtime** | lua.vm.js | 0.0.1 |
| **AI** | Anthropic SDK | 0.24.0 |

### Estructura de Directorios

```
hub_central_proyect/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Rutas de autenticación
│   │   ├── course/             # Páginas de curso
│   │   │   └── [moduleId]/
│   │   │       └── [lessonId]/
│   │   ├── dashboard/          # Dashboard principal
│   │   ├── editor/             # Editor de código
│   │   ├── quiz/               # Sistema de quizzes
│   │   ├── exams/              # Exámenes
│   │   ├── analytics/          # Analytics de progreso
│   │   ├── profile/            # Perfil de usuario
│   │   └── api/                # API Routes
│   ├── components/
│   │   ├── LessonViewer.tsx    # Visualizador de teoría
│   │   ├── InteractiveCode.tsx # Código ejecutable
│   │   ├── LessonNavigation.tsx # Navegación
│   │   └── ExerciseRunner.tsx  # Validación de ejercicios
│   ├── lib/
│   │   └── lessons/            # Contenido de lecciones
│   │       ├── mes-01/         # Módulo 1: Lua desde Cero
│   │       ├── mes-02/         # Módulo 2: POO + UE5
│   │       └── ...             # 12 módulos totales
│   ├── types/
│   │   └── lesson.ts           # Interfaces TypeScript
│   └── hooks/
│       └── useAuth.ts          # Hook de autenticación
├── public/                     # Assets estáticos
├── supabase-schema.sql        # Schema de base de datos
└── package.json               # Dependencias
```

---

## 📚 Plan de Estudio

### Fase I - Fundamentos (Meses 1-3)

| Módulo | Lecciones | Tema | Horas |
|--------|-----------|------|-------|
| **Mes 1** | 7 | Lua desde Cero | 60h |
| **Mes 2** | 6 | POO + UE5 Basics | 60h |
| **Mes 3** | 6 | Blueprints ↔ Lua | 60h |

### Fase II - Integración (Meses 4-6)

| Módulo | Lecciones | Tema | Horas |
|--------|-----------|------|-------|
| **Mes 4** | 6 | Inventario y Stats | 60h |
| **Mes 5** | 6 | UI y Diálogos | 60h |
| **Mes 6** | 6 | IA de NPCs | 60h |

### Fase III - Avanzado (Meses 7-9)

| Módulo | Lecciones | Tema | Horas |
|--------|-----------|------|-------|
| **Mes 7** | 6 | Multijugador | 60h |
| **Mes 8** | 6 | Optimización | 60h |
| **Mes 9** | 6 | Sistemas Avanzados | 60h |

### Fase IV - Maestría (Meses 10-12)

| Módulo | Lecciones | Tema | Horas |
|--------|-----------|------|-------|
| **Mes 10** | 6 | Arquitectura | 60h |
| **Mes 11** | 6 | Producción | 60h |
| **Mes 12** | 6 | Portfolio | 60h |

**Total**: 73 lecciones | ~730 horas

---

## 🚀 Quick Start

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratuita)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/lua-master-pro.git
cd lua-master-pro

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase
```

### Variables de Entorno

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto_generado

# Anthropic (opcional, para features de IA)
ANTHROPIC_API_KEY=tu_api_key
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir http://localhost:3000
```

### Build de Producción

```bash
# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start
```

---

## 🎯 Estructura de Cada Lección

Cada lección sigue una estructura consistente:

```typescript
interface Lesson {
  id: string;              // ej: "mes-01-l01"
  moduleId: string;        // ej: "mes-01"
  lessonNumber: number;    // ej: 1
  title: string;           // ej: "Introducción a Lua"
  description: string;
  theory: LessonTheory;    // Contenido teórico
  examples: CodeSnippet[]; // 3-5 ejemplos de código
  interactive: InteractiveExample; // Código ejecutable
  miniExercise: MiniExercise; // Ejercicio con validación
  summary: string;
  resources: LessonResource[];
  estimatedTime: number;   // minutos
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
}
```

### Ejemplo de Uso

```typescript
// Importar lección
import { lesson01 } from "@/lib/lessons/mes-01";

// Acceder a teoría
console.log(lesson01.theory.title);

// Ejecutar código interactivo
console.log(lesson01.interactive.starterCode);

// Validar ejercicio
const passed = lesson01.miniExercise.tests.every(test => {
  // lógica de validación
});
```

---

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm test

# Verificar tipos TypeScript
npx tsc --noEmit
```

### Cobertura de Tests

- ✅ 31 tests unitarios para tipos de lecciones
- ✅ Tests de estructura de lecciones
- ✅ Tests de ejemplos y ejercicios

---

## 📊 Estado del Proyecto

### Contenido

| Estado | Cantidad |
|--------|----------|
| Lecciones totales | 73 |
| Módulos completados | 12/12 ✅ |
| Teoría | ~30,000 palabras |
| Ejemplos de código | ~250 |
| Ejercicios | 73 |

### Build

| Métrica | Valor |
|---------|-------|
| Tiempo de compilación | ~24s |
| Bundle size | ~2.5 MB |
| Errores TypeScript | 0 |
| Lecciones accesibles | 73/73 (100%) |

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

-- user_quizzes
CREATE TABLE user_quizzes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  module_id TEXT,
  score INTEGER,
  completed_at TIMESTAMPTZ
);

-- user_achievements
CREATE TABLE user_achievements (
  user_id UUID REFERENCES auth.users(id),
  achievement_id TEXT,
  unlocked_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, achievement_id)
);
```

Ver `supabase-schema.sql` para el schema completo.

---

## 🎨 Componentes Principales

### LessonViewer.tsx

Renderiza el contenido teórico de la lección:
- Markdown rendering
- Objetivos de aprendizaje
- Navegación entre secciones

### InteractiveCode.tsx

Editor Monaco con ejecución de Lua:
- Syntax highlighting
- Ejecución en sandbox con lua.vm.js
- Comparación de output esperado vs real

### ExerciseRunner.tsx

Validador de ejercicios:
- Ejecuta tests automáticos
- Muestra hints si falla
- Otorga XP al completar

### LessonNavigation.tsx

Navegación entre lecciones:
- Botones anterior/siguiente
- Progreso del módulo
- Indicador de completado

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo

# Build
npm run build            # Compilar para producción
npm run start            # Iniciar servidor de producción

# Testing
npm test                 # Ejecutar tests unitarios
npx tsc --noEmit         # Verificar tipos TypeScript

# Linting
npm run lint             # Ejecutar linter (si está configurado)
```

---

## 📱 Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page |
| `/dashboard` | Dashboard principal |
| `/course/[moduleId]` | Vista de módulo |
| `/course/[moduleId]/[lessonId]` | Lección individual |
| `/editor` | Editor de código |
| `/quiz` | Sistema de quizzes |
| `/quiz/[moduleId]` | Quiz por módulo |
| `/exams` | Exámenes ficticios |
| `/analytics` | Analytics de progreso |
| `/profile` | Perfil de usuario |
| `/leaderboard` | Tabla de líderes |
| `/certificates` | Certificados |

---

## 🔐 Autenticación

La autenticación está manejada por **NextAuth.js** con **Supabase Auth**:

- ✅ Registro con email/password
- ✅ Login seguro
- ✅ Sesiones persistentes
- ✅ Protección de rutas
- ✅ Reset de contraseña

---

## 🎮 Gamificación

### Sistema de XP

| Acción | XP |
|--------|-----|
| Completar lección | 100 XP |
| Ejercicio perfecto | +50 XP bonus |
| Quiz completado | 200 XP |
| Examen aprobado | 500 XP |
| Racha de 7 días | 100 XP bonus |

### Medallas

- 🥇 **Primeros Pasos** - Completar primera lección
- 📚 **Estudiante Dedicado** - 10 horas de estudio
- 🏆 **Maestro de Lua** - Completar todos los módulos
- ⚡ **Racha de Fuego** - 7 días consecutivos
- 💯 **Perfeccionista** - Todos los ejercicios perfectos

---

## 🌐 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Pasos para Deploy en Vercel

1. Conectar repositorio de GitHub
2. Agregar variables de entorno
3. Deploy automático en cada push

### Variables de Entorno para Producción

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=xxx
```

---

## 🤝 Contribuyendo

Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Ver [CONTRIBUTING.md](.github/CONTRIBUTING.md) para más detalles.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Contacto

- **Sitio Web**: [tu-sitio-web.com](https://tu-sitio-web.com)
- **Twitter**: [@tu_usuario](https://twitter.com/tu_usuario)
- **LinkedIn**: [tu-perfil](https://linkedin.com/in/tu-perfil)
- **Email**: tu@email.com

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org) - Framework React
- [Supabase](https://supabase.com) - Backend como servicio
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Editor de código
- [lua.vm.js](https://github.com/jamesreggio/lua.vm.js) - Runtime de Lua en JS
- [Tailwind CSS](https://tailwindcss.com) - Framework de CSS
- [Anthropic](https://anthropic.com) - API de IA

---

## 📈 Roadmap

### Q1 2026
- [ ] Integración completa con Supabase
- [ ] Sistema de certificados PDF
- [ ] Leaderboard global
- [ ] Modo offline (PWA)

### Q2 2026
- [ ] App móvil (React Native)
- [ ] Integración con GitHub para portfolios
- [ ] Sistema de mentores
- [ ] Contenido en inglés

### Q3 2026
- [ ] Comunidad y foros
- [ ] Webinars en vivo
- [ ] Certificación oficial
- [ ] Partnerships con estudios

---

## 📊 Métricas de Rendimiento

| Métrica | Valor | Objetivo |
|---------|-------|----------|
| First Contentful Paint | < 1.5s | ✅ |
| Largest Contentful Paint | < 2.5s | ✅ |
| Time to Interactive | < 3.0s | ✅ |
| Lighthouse Score | 90+ | ✅ |

---

**Hecho con ❤️ usando Next.js, TypeScript y Tailwind CSS**

---

*Última actualización: Febrero 2026*
*Versión: 1.0.0*
#   l u a - m a s t e r - p r o  
 #   l u a - m a s t e r - p r o  
 