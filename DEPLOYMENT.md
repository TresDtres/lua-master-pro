# 🚀 Deployment Guide - Lua Master Pro

Guía completa para desplegar **Lua Master Pro** en producción.

---

## 📋 Tabla de Contenidos

1. [Prerrequisitos](#prerrequisitos)
2. [Deploy en Vercel (Recomendado)](#deploy-en-vercel-recomendado)
3. [Deploy en Netlify](#deploy-en-netlify)
4. [Deploy en Railway](#deploy-en-railway)
5. [Deploy Manual con Docker](#deploy-manual-con-docker)
6. [Configuración de Supabase](#configuración-de-supabase)
7. [Configuración de Dominio Personalizado](#configuración-de-dominio-personalizado)
8. [Variables de Entorno](#variables-de-entorno)
9. [Post-Deploy Checklist](#post-deploy-checklist)
10. [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)

---

## Prerrequisitos

- ✅ Cuenta de GitHub
- ✅ Cuenta de Supabase (gratuita)
- ✅ Cuenta en plataforma de hosting (Vercel/Netlify/Railway)
- ✅ Node.js 18+ instalado localmente

---

## Deploy en Vercel (Recomendado)

### ¿Por qué Vercel?

- ✅ Creado por los mismos creadores de Next.js
- ✅ Deploy automático en cada push a GitHub
- ✅ SSL automático
- ✅ CDN global incluido
- ✅ Serverless functions incluidas
- ✅ Preview deployments para PRs
- ✅ Analytics incluido (gratis)

### Pasos para Deploy

#### 1. Preparar Repositorio

```bash
# Asegúrate de que tu código esté en GitHub
git init
git add .
git commit -m "Initial commit - Lua Master Pro"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/lua-master-pro.git
git push -u origin main
```

#### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Sign Up" (usa tu cuenta de GitHub)
3. Click en "Add New Project"
4. Selecciona "Import Git Repository"
5. Busca tu repositorio `lua-master-pro`
6. Click en "Import"

#### 3. Configurar Build

```
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next (default)
Install Command: npm install (default)
```

#### 4. Agregar Variables de Entorno

En Vercel Dashboard > Settings > Environment Variables:

```env
# Production
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXTAUTH_URL=https://lua-master-pro.vercel.app
NEXTAUTH_SECRET=tu_secreto_generado
ANTHROPIC_API_KEY=xxx (opcional)
```

#### 5. Deploy

```bash
# Click en "Deploy"
# Vercel construirá tu aplicación (~2-3 minutos)
```

#### 6. Verificar Deploy

- Tu sitio estará en: `https://lua-master-pro.vercel.app`
- Verifica que todas las rutas funcionen
- Revisa los logs en Vercel Dashboard

### Deploy Automático

Cada push a `main` triggera un deploy automático:

```bash
git add .
git commit -m "Fix: something important"
git push origin main
# Vercel deploya automáticamente
```

### Preview Deployments

Cada PR crea un preview deployment:

```bash
git checkout -b feature/new-feature
git commit -m "Add new feature"
git push origin feature/new-feature
# Crea PR en GitHub
# Vercel crea preview deployment
```

---

## Deploy en Netlify

### Pasos

1. Ve a [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Conecta GitHub
4. Selecciona tu repositorio
5. Configura build:
   ```
   Build command: npm run build
   Publish directory: .next
   ```
6. Agrega variables de entorno
7. Click "Deploy site"

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NEXT_PUBLIC_SUPABASE_URL = "https://xxx.supabase.co"
  NEXT_PUBLIC_SUPABASE_ANON_KEY = "xxx"
```

---

## Deploy en Railway

### Pasos

1. Ve a [railway.app](https://railway.app)
2. Click "New Project"
3. "Deploy from GitHub repo"
4. Selecciona tu repositorio
5. Agrega variables de entorno
6. Railway detectará Next.js automáticamente
7. Deploy automático

### railway.toml

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/"
healthcheckTimeout = 100
```

---

## Deploy Manual con Docker

### Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Run application
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  lua-master-pro:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=xxx
    restart: unless-stopped
```

### Build y Run

```bash
# Build
docker build -t lua-master-pro .

# Run
docker run -p 3000:3000 lua-master-pro

# Or with docker-compose
docker-compose up -d
```

---

## Configuración de Supabase

### 1. Crear Proyecto

1. Ve a [supabase.com](https://supabase.com)
2. Click "New Project"
3. Completa detalles del proyecto
4. Espera ~2 minutos para que se cree

### 2. Obtener Credenciales

1. Settings > API
2. Copia `Project URL`
3. Copia `anon/public` key

### 3. Ejecutar Schema

1. SQL Editor > New Query
2. Copia contenido de `supabase-schema.sql`
3. Click "Run"

### 4. Configurar Auth

Authentication > Providers > Email:
- ✅ Enable Email Provider
- ✅ Enable confirm email
- Configurar templates de email

### 5. Row Level Security (RLS)

```sql
-- Habilitar RLS
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;

-- Policy para usuarios
CREATE POLICY "Users can view own progress"
  ON user_lesson_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_lesson_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_lesson_progress
  FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## Configuración de Dominio Personalizado

### En Vercel

1. Ve a Project Settings > Domains
2. Agrega tu dominio: `lua-master-pro.com`
3. Configura DNS en tu registrador:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### En Netlify

1. Domain Settings > Add custom domain
2. Agrega tu dominio
3. Configura DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5 (Netlify IP)
   ```

### SSL Automático

Ambas plataformas proveen SSL automático con Let's Encrypt.

---

## Variables de Entorno

### Desarrollo (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local_anon_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev_secret_change_in_production

# Anthropic (opcional)
ANTHROPIC_API_KEY=dev_key
```

### Producción

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# NextAuth
NEXTAUTH_URL=https://lua-master-pro.vercel.app
NEXTAUTH_SECRET=genera_con_openssl_rand_base64_32

# Anthropic (opcional)
ANTHROPIC_API_KEY=xxx
```

### Generar NEXTAUTH_SECRET

```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

---

## Post-Deploy Checklist

### Funcionalidad

- [ ] Landing page carga correctamente
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Dashboard carga
- [ ] Lecciones cargan
- [ ] Editor Monaco funciona
- [ ] Ejercicios validan correctamente
- [ ] Quizzes funcionan
- [ ] Profile page funciona

### Performance

- [ ] Lighthouse score > 90
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] TTI < 3.0s

### SEO

- [ ] Meta tags presentes
- [ ] Open Graph tags presentes
- [ ] Sitemap generado
- [ ] Robots.txt configurado

### Seguridad

- [ ] HTTPS habilitado
- [ ] Headers de seguridad presentes
- [ ] RLS policies activas
- [ ] API routes protegidas

### Monitoreo

- [ ] Vercel Analytics habilitado
- [ ] Error tracking configurado (Sentry opcional)
- [ ] Uptime monitoring activo

---

## Monitoreo y Mantenimiento

### Vercel Analytics

1. Ve a Vercel Dashboard > Analytics
2. Habilita Web Analytics
3. Monitorea:
   - Page views
   - Unique visitors
   - Bounce rate
   - Performance metrics

### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

```typescript
// next.config.js
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(nextConfig, {
  org: "tu-org",
  project: "lua-master-pro",
});
```

### Uptime Monitoring

Usa servicios como:
- [UptimeRobot](https://uptimerobot.com) (gratis)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

### Backups de Base de Datos

Supabase hace backups automáticos diarios. Para backups manuales:

```bash
# Usando Supabase CLI
supabase db dump -f backup.sql
```

### Actualizaciones

```bash
# Mantener dependencias actualizadas
npm outdated
npm update

# Actualizar a últimas versiones
npm install next@latest react@latest
```

---

## Troubleshooting

### Build falla en Vercel

```bash
# Verifica logs en Vercel Dashboard
# Ejecuta build localmente
npm run build

# Verifica Node version
node --version  # Debe ser 18+
```

### Errores de Supabase

```bash
# Verifica credenciales
# Verifica RLS policies
# Revisa logs en Supabase Dashboard > Logs
```

### Performance lento

```bash
# Analiza bundle
npm run build
# Revisa .next/static/chunks

# Usa next/bundle-analyzer
ANALYZE=true npm run build
```

---

## Recursos Adicionales

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [NextAuth.js Docs](https://next-auth.js.org)

---

**¡Listo para producción!** 🚀

*Última actualización: Febrero 2026*
