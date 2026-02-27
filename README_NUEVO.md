# 🎮 Lua Master Pro - Plataforma de Aprendizaje Interactivo

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-en%20desarrollo-yellow)

Plataforma web completa para aprender **Lua Scripting en Unreal Engine 5.6** en 12 meses.

## ✨ Características

- 📚 **12 módulos progresivos** (730 horas de contenido)
- 💻 **Editor Lua online** integrado con soporte de ejecución
- 🤖 **Chat con IA** especializado en Lua y UE5
- 📊 **Seguimiento de progreso** en tiempo real
- 🎯 **Proyectos prácticos** con entregas tangibles
- 🔐 **Autenticación segura** con registro/login
- 💳 **Sistema de pago** con FreeTier y Premium
- 📜 **Certificados** descargables al completar módulos
- 🌙 **Dark Mode** optimizado para desarrollo

## 🚀 Quick Start

### Requirements

- Node.js 18+
- npm o yarn
- Git

### Install

```bash
# Clonar repo
git clone https://github.com/tu-usuario/lua-master-pro
cd hub_central_proyect

# Instalar dependencias
npm install

# Copiar env
cp .env.example .env.local

# Editar .env.local con tus credenciales
# (Ver DEPLOYMENT.md para detalles)

# Dev server
npm run dev
```

Abre [http://localhost:3001](http://localhost:3001) ✨

### Build para producción

```bash
npm run build
npm start
```

---

## 📚 Contenido del Curso

### Fase I: Fundamentos (Meses 1-3)

| Módulo | Tema | Horas |
|--------|------|-------|
| Mes 1 | Lua desde Cero | 60h |
| Mes 2 | POO + Primeros Pasos en UE5 | 60h |
| Mes 3 | Blueprints ↔ Lua Communication | 60h |

### Fase II: Integración (Meses 4-6)

| Módulo | Tema | Horas |
|--------|------|-------|
| Mes 4 | Sistemas: Inventario y Stats | 60h |
| Mes 5 | UI y Sistema de Diálogos | 60h |
| Mes 6 | Inteligencia Artificial de NPCs | 60h |

### Fase III: Avanzado (Meses 7-9)

| Módulo | Tema | Horas |
|--------|------|-------|
| Mes 7 | Multijugador y Replicación | 60h |
| Mes 8 | Optimización y Editor Tools | 60h |
| Mes 9 | Procedural, Shaders, Audio | 60h |

### Fase IV: Maestría (Meses 10-12)

| Módulo | Tema | Horas |
|--------|------|-------|
| Mes 10 | Arquitectura y Design Patterns | 60h |
| Mes 11 | Producción del Juego Final | 60h |
| Mes 12 | Portfolio y Comunidad | 60h |

---

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 16.1.6** - React framework con App Router
- **React 19.2.3** - UI library
- **Tailwind CSS 4** - Utility-first CSS
- **Monaco Editor** - Editor de código profesional
- **TypeScript** - Type safety

### Backend

- **Next.js API Routes** - Serverless functions
- **Middleware** - Auth, CORS

### Servicios Externos

- **Supabase** - PostgreSQL + Auth + Storage
- **Anthropic Claude** - IA para chat en tiempo real
- **Stripe** - Sistema de pagos (opcional)

### Deployment

- **Vercel** - Hosting optimizado para Next.js (gratuito)
- **Railway/Render** - Servidor Lua execution (opcional)

---

## 📁 Estructura de Carpetas

```
hub_central_proyect/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Rutas de autenticación
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/           # Panel principal del estudiante
│   │   ├── course/[moduleId]/   # Página de módulo individual
│   │   ├── editor/              # Editor Lua online
│   │   ├── chat/                # Chat con IA
│   │   ├── profile/             # Perfil del usuario
│   │   ├── api/                 # API endpoints
│   │   ├── page.tsx             # Homepage
│   │   ├── layout.tsx           # Layout global
│   │   └── globals.css
│   ├── components/              # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   ├── CodeEditor.tsx
│   │   └── ModuleCard.tsx
│   ├── lib/                     # Funciones utilitarias
│   │   ├── constants.ts         # Datos del curso
│   │   └── supabase.ts          # Cliente Supabase
│   └── types/                   # TypeScript interfaces
│       └── index.ts
├── public/                      # Recursos estáticos
├── .env.example                 # Variables de entorno
├── package.json
├── tsconfig.json
└── DEPLOYMENT.md               # Guía de deployment
```

---

## 🔧 Configuración Necesaria

### Variables de Entorno

Crear `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Claude IA
ANTHROPIC_API_KEY=sk-ant-...

# Stripe (opcional)
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Ejecutor Lua (opcional)
LUA_SERVER_URL=https://lua-server.railway.app
```

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para setups detallados.

---

## 🎯 Roadmap

- [x] Estructura base y landing page
- [x] Sistema de autenticación
- [ ] Integración Supabase
- [ ] Editor Monaco mejorado
- [ ] Chat con Claude IA
- [ ] Seguimiento de progreso
- [ ] Sistema de certificados
- [ ] Pagos con Stripe
- [ ] Deployment Vercel
- [ ] Servidor Lua execution
- [ ] Tests automatizados
- [ ] Documentación API

---

## 📈 Pricing

### Plan Gratuito

- ✅ Módulos 1-3 (Fundamentos)
- ✅ Hasta 5 ejercicios/semana
- ✅ Editor Lua básico
- ✅ Chat IA limitado (100 msg/mes)

### Plan Premium ($29.99/mes)

- ✅ **Todos** los 12 módulos
- ✅ Ejercicios ilimitados
- ✅ Editor Lua avanzado
- ✅ Chat IA sin límites
- ✅ Mentoría grupal bi-semanal
- ✅ Comunidad privada
- ✅ Certificados profesionales

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repo
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Commits descriptivos: `git commit -m "feat: agrego nueva característica"`
4. Push: `git push origin feature/mi-feature`
5. Abre un Pull Request

---

## 📝 License

MIT © 2024 Lua Master Pro

---

## 🆘 Soporte

¿Preguntas o problemas?

- 📧 Email: support@luamasterpro.com
- 💬 Discord: [Comunidad](https://discord.gg/luamasterpro)
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/lua-master-pro/issues)

---

## 🙏 Agradecimientos

- Lua.org por el excelente lenguaje
- Epic Games por Unreal Engine
- Vercel por el hosting gratuito
- La comunidad de desarrolladores

---

**Hecho con ❤️ para desarrolladores que quieren dominar Lua en UE5**
