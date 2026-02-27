# GitHub Setup Guide - Lua Master Pro

Guía rápida para subir el proyecto a GitHub.

---

## 📋 Pasos Rápidos

### 1. Crear Repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repositorio: `lua-master-pro`
3. Descripción: "Plataforma educativa interactiva para aprender Lua Scripting en Unreal Engine 5"
4. **NO** inicialices con README (ya tienes uno)
5. Click "Create repository"

### 2. Inicializar Git Localmente

```bash
cd C:\Users\Admin\Documents\proyecto\hub_central_proyect

# Inicializar repositorio (si no está ya inicializado)
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit - Lua Master Pro v1.0

- 73 lecciones en 12 módulos
- Editor Monaco integrado
- Sistema de validación automática
- Gamificación con XP y medallas
- Quizzes y exámenes
- Dark mode responsive"
```

### 3. Conectar con GitHub

```bash
# Agregar remote (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/lua-master-pro.git

# Renombrar rama a main
git branch -M main

# Hacer push
git push -u origin main
```

### 4. Verificar en GitHub

1. Ve a `https://github.com/TU_USUARIO/lua-master-pro`
2. Verifica que todos los archivos estén presentes
3. Revisa que el README se muestre correctamente

---

## 📁 Archivos Incluidos para GitHub

### Documentación Principal
- ✅ `README.md` - Documentación principal
- ✅ `LICENSE` - Licencia MIT
- ✅ `DEPLOYMENT.md` - Guía de deployment
- ✅ `CONTRIBUTING.md` - Guía de contribución

### GitHub Configuration
- ✅ `.github/ISSUE_TEMPLATE/bug_report.md`
- ✅ `.github/ISSUE_TEMPLATE/feature_request.md`
- ✅ `.github/ISSUE_TEMPLATE/content_issue.md`
- ✅ `.github/pull_request_template.md`
- ✅ `.github/CONTRIBUTING.md`
- ✅ `.github/CODEOWNERS`

### Archivos de Proyecto
- ✅ `package.json` - Dependencias
- ✅ `tsconfig.json` - Configuración TypeScript
- ✅ `next.config.ts` - Configuración Next.js
- ✅ `.gitignore` - Archivos ignorados
- ✅ `.env.example` - Ejemplo de variables de entorno

### Código Fuente
- ✅ `src/app/` - Next.js App Router
- ✅ `src/components/` - Componentes React
- ✅ `src/lib/lessons/` - 12 módulos con 73 lecciones
- ✅ `src/types/` - TypeScript types
- ✅ `src/hooks/` - Custom React hooks

### Base de Datos
- ✅ `supabase-schema.sql` - Schema de Supabase

---

## 🔒 Archivos que NO se suben (.gitignore)

- `node_modules/` - Dependencias
- `.next/` - Build output
- `.env.local` - Variables de entorno locales
- `.env*.local` - Variables de entorno
- `*.log` - Logs
- `.DS_Store` - macOS metadata
- `Thumbs.db` - Windows thumbnails

---

## 🏷️ Agregar Tags y Releases

### Crear Primer Release

```bash
# Crear tag
git tag -a v1.0.0 -m "Initial release - Lua Master Pro"

# Push del tag
git push origin --tags
```

### Crear Release en GitHub

1. Ve a `github.com/TU_USUARIO/lua-master-pro/releases`
2. Click "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `Lua Master Pro v1.0.0 - Initial Release`
5. Descripción:
   ```markdown
   ## 🎉 Initial Release

   ### Features
   - 73 lecciones en 12 módulos (~730 horas de contenido)
   - Editor Monaco integrado con ejecución de Lua
   - Sistema de validación automática de ejercicios
   - Gamificación: XP, medallas, leaderboards
   - Quizzes y exámenes por módulo
   - Dark mode responsive
   - Autenticación con Supabase
   - Progress tracking

   ### Tech Stack
   - Next.js 16.1.6
   - React 19
   - TypeScript 5
   - Tailwind CSS 4
   - Supabase 2.39.0
   - Monaco Editor 0.55.1

   ### Getting Started
   Ver README.md para instrucciones de instalación y deployment.
   ```
6. Click "Publish release"

---

## 📊 GitHub Features para Habilitar

### 1. GitHub Actions (Opcional)

Crea `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Test
      run: npm test
```

### 2. GitHub Pages (Opcional)

Para demo estática:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 3. Project Board

1. Ve a `Projects` en GitHub
2. Click "New project"
3. Selecciona "Kanban board"
4. Agrega columns: `Backlog`, `In Progress`, `Review`, `Done`

### 4. Wiki (Opcional)

1. Ve a `Wiki` en GitHub
2. Click "Create the first page"
3. Agrega documentación adicional

---

## 🎯 Configurar Repository Settings

### 1. Topics

Agrega topics para mejor descubrimiento:
- `lua`
- `unreal-engine`
- `nextjs`
- `react`
- `typescript`
- `education`
- `gaming`
- `learn-to-code`
- `supabase`
- `tailwindcss`

### 2. Branch Protection

Settings > Branches > Add branch protection rule:
- Branch name pattern: `main`
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging

### 3. Merge Button

Settings > General > Pull Requests:
- ✅ Allow squash merging
- ✅ Allow auto-merge
- ✅ Always suggest updating pull request branches

---

## 📈 GitHub Insights

### 1. Traffic

- Ve a `Insights` > `Traffic`
- Monitorea:
  - Views
  - Unique visitors
  - Referring sites
  - Popular content

### 2. Contributors

- Ve a `Insights` > `Contributors`
- Reconoce contribuidores

### 3. Community Health

- Ve a `Insights` > `Community`
- GitHub muestra:
  - ✅ README present
  - ✅ License
  - ✅ Contributing guidelines
  - ✅ Issue templates
  - ✅ Pull request template

---

## 🔐 Security

### 1. Dependabot

Crea `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

### 2. Security Advisories

Settings > Security & analysis:
- ✅ Enable Dependabot alerts
- ✅ Enable Dependabot security updates
- ✅ Enable automated security fixes

---

## 📣 Promocionar tu Repositorio

### 1. Social Media

Comparte en:
- Twitter/X con hashtags: #Lua #GameDev #NextJS #OpenSource
- LinkedIn
- Reddit: r/gamedev, r/learnprogramming, r/lua
- Discord servers de desarrollo de juegos

### 2. Comunidades

- [Lua Discord](https://discord.gg/lua)
- [Unreal Engine Slack](https://unrealengine.com/slack)
- [Next.js Discord](https://discord.gg/nextjs)
- Foros de desarrollo de juegos

### 3. Directorios

- [Product Hunt](https://producthunt.com)
- [GitHub Topics](https://github.com/topics)
- [Indie Hackers](https://indiehackers.com)

---

## ✅ Pre-Flight Checklist

Antes de subir a GitHub:

- [ ] README.md completo y atractivo
- [ ] LICENSE agregado
- [ ] .gitignore configurado
- [ ] .env.example con variables requeridas
- [ ] Build funciona (`npm run build`)
- [ ] Tests passing (`npm test`)
- [ ] Código formateado
- [ ] No hay secrets o API keys en el código
- [ ] Issue templates creados
- [ ] Contributing guide creado
- [ ] Pull request template creado

---

## 🚀 Post-Push Checklist

Después de subir a GitHub:

- [ ] Verificar que todos los archivos estén presentes
- [ ] Verificar que el README se muestre correctamente
- [ ] Agregar topics al repositorio
- [ ] Configurar branch protection
- [ ] Habilitar Dependabot
- [ ] Crear primer release
- [ ] Configurar GitHub Actions (opcional)
- [ ] Compartir en redes sociales

---

## 📞 Soporte

Si tienes problemas:

1. Revisa [GitHub Docs](https://docs.github.com)
2. Busca en [GitHub Community](https://github.community)
3. Pregunta en [Stack Overflow](https://stackoverflow.com)

---

**¡Listo para compartir con el mundo!** 🌍

*Última actualización: Febrero 2026*
