# 🚀 Guía Rápida - Subir a GitHub y Deploy

## Opción 1: Desde Visual Studio Code (Más Fácil)

### Paso 1: Inicializar Git (si no está hecho)
```powershell
# En la carpeta del proyecto
cd c:\Users\Admin\Documents\proyecto\hub_central_proyect

# Inicializar git
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit - Lua Master Pro Platform"
```

### Paso 2: Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Haz click en el "+" arriba a la derecha
3. Selecciona "New repository"
4. **Nombre del repo**: `lua-master-pro`
5. **Descripción**: `Plataforma de aprendizaje interactivo para Lua en Unreal Engine 5.6`
6. **Público** (para que se indexe)
7. NO inicialices con README
8. Click "Create repository"

### Paso 3: Conectar y Subir

```powershell
# Agregar remoto (cambia USERNAME por tu usuario)
git remote add origin https://github.com/USERNAME/lua-master-pro.git

# Cambiar rama a main (GitHub usa main por defecto)
git branch -M main

# Subir código
git push -u origin main
```

**¡Listo! Tu código está en GitHub 🎉**

---

## Opción 2: Usar GitHub CLI (Automático)

Si tienes [GitHub CLI](https://cli.github.com/) instalado:

```powershell
# Login
gh auth login

# Crear repo y subir automáticamente
gh repo create lua-master-pro --public --source=. --remote=origin --push
```

---

## Opción 3: Desde GitHub.com UI (Sin Terminal)

1. Ve a [github.com/new](https://github.com/new)
2. Crea el repositorio vacío
3. Abre VS Code Terminal
4. Copia y pega exactamente esto:

```powershell
git init
git add .
git commit -m "Initial commit - Lua Master Pro"
git remote add origin https://github.com/TU_USUARIO/lua-master-pro.git
git branch -M main
git push -u origin main
```

---

## Paso 4: Deploy en Vercel

### Opción A: Automático desde GitHub (RECOMENDADO)

1. Ve a [vercel.com](https://vercel.com)
2. Click "New Project"
3. "Import Git Repository"
4. Conecta GitHub
5. Selecciona `lua-master-pro`
6. En "Environment Variables" agrega:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_aqui
ANTHROPIC_API_KEY=tu_api_key_aqui
```

7. Click "Deploy"

**¡Tu sitio estará en vivo en 2-3 minutos!** 🚀

URL: `https://lua-master-pro.vercel.app`

### Opción B: Desde Terminal

```powershell
# Instalar Vercel CLI
npm install -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Vercel auto-detecta Next.js y configura todo
```

---

## Verificar que Todo Funciona

```powershell
# En la carpeta del proyecto
npm run build  # Build de producción

# Si no tiene errores, está listo ✅
```

---

## Actualizaciones Futuras

Cada vez que hagas cambios, solo necesitas:

```powershell
git add .
git commit -m "feat: descripción del cambio"
git push
```

**Vercel auto-detectará los cambios y hará el deploy automáticamente** ⚡

---

## Monitorear Deployment

### Dashboard de Vercel
- https://vercel.com/dashboard
- Ver builds, logs, analíticas
- Rollback si es necesario

### Analytics en Tiempo Real
- Clicks
- Pageviews
- Performance
- Web Vitals

---

## Troubleshooting

### ❌ "Rama protegida"
```powershell
# Si sale error de rama
git config --global user.email "tu@email.com"
git config --global user.name "Tu Nombre"
```

### ❌ "Credenciales incorrectas"
1. Ve a GitHub Settings → Personal access tokens
2. Genera un nuevo token
3. Usa el token como contraseña

### ❌ ".gitignore no funciona"
```powershell
# Para limpiar archivos ignorados del tracking
git rm --cached -r .
git add .
git commit -m "Actualizar .gitignore"
git push
```

### ❌ "Build failed en Vercel"
1. Verifica que `npm install` funcione localmente
2. Revisa los logs en Dashboard de Vercel
3. Verifica las variables de entorno

---

## Próximas Mejoras (Post-Deploy)

**Después de que esté en vivo:**

1. **Dominio personalizado**
   - Compra en [namecheap.com](https://namecheap.com) (~$1-2/año)
   - Conecta en Vercel Settings → Domains
   
2. **Email notifications**
   - Integra Resend.dev (gratuito: 100 emails/día)
   - O SendGrid (gratuito: 40k emails/mes)

3. **Analytics**
   - Instala Posthog (freemium)
   - O Google Analytics (gratis)

4. **Monitoring**
   - Configura Sentry (errores)
   - O UptimeRobot (downtime alerts)

---

## Checklist Final

- [ ] Git inicializado localmente
- [ ] Repo creado en GitHub
- [ ] Código subido a GitHub
- [ ] Vercel conectado
- [ ] Environment variables en Vercel
- [ ] Build sin errores
- [ ] Sitio en vivo y accesible
- [ ] URLs guardadas en documento

---

## URLs Importantes

Guarda esto:

```
GitHub Repo:     https://github.com/USERNAME/lua-master-pro
Vercel Project:  https://vercel.com/dashboard
Live Site:       https://lua-master-pro.vercel.app
Admin Dashboard: https://vercel.com/USERNAME/lua-master-pro

# Si añades dominio personalizado:
Live Site:       https://tudominio.com
```

---

## Soporte Rápido

| Problema | Solución |
|----------|----------|
| GitHub no reconoce archivos | `git add .` después de cambios |
| Vercel dice "404" | Espera 2 min, recarga |
| Variables de entorno no funcionan | Redeploy desde Vercel UI |
| Código no actualiza | Borra `.next` y haz redeploy |
| Email no funciona | Configura proveedor (Resend) |

---

## 🎉 ¡Hecho!

Tu plataforma estará:
- ✅ En GitHub
- ✅ En vivo 24/7
- ✅ Con auto-deploy
- ✅ SSL gratis
- ✅ CDN global
- ✅ Sin costo de hosting

**Solo necesitas:**
1. Configurar Supabase
2. Configurar Claude API
3. Agregar dominio (opcional)

**Eso es todo.** 🚀

---

*Tiempo total estimado: 15-20 minutos*
