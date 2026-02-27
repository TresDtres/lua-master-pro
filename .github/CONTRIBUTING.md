# Contributing to Lua Master Pro

¡Gracias por tu interés en contribuir a **Lua Master Pro**! Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Features](#sugerir-features)
- [Pull Requests](#pull-requests)
- [Estilo de Código](#estilo-de-código)
- [Tests](#tests)

---

## Código de Conducta

Este proyecto y todos los participantes están regidos por el [Código de Conducta de Contributor Covenant](https://www.contributor-covenant.org/). Al participar, se espera que respetes este código. Reporta comportamiento inaceptable a [tu-email@example.com].

---

## Cómo Contribuir

### Formas de Contribuir

1. **Reportar bugs** - Abre un issue describiendo el problema
2. **Sugerir features** - Propón nuevas funcionalidades
3. **Corregir typos** - Errores ortográficos en lecciones
4. **Mejorar documentación** - README, comentarios, guías
5. **Agregar tests** - Tests unitarios o de integración
6. **Optimizar performance** - Mejoras de velocidad o bundle size
7. **Traducciones** - Traducir contenido a otros idiomas

### Flujo de Contribución

```bash
# 1. Fork el repositorio
git clone https://github.com/TU_USUARIO/lua-master-pro.git

# 2. Crea una rama para tu feature
git checkout -b feature/AmazingFeature

# 3. Haz tus cambios y commit
git add .
git commit -m "Add AmazingFeature"

# 4. Push a tu rama
git push origin feature/AmazingFeature

# 5. Abre un Pull Request
```

---

## Reportar Bugs

Los bugs se reportan usando el [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md).

### Un buen bug report incluye:

- ✅ Descripción clara del problema
- ✅ Pasos para reproducir
- ✅ Comportamiento esperado vs actual
- ✅ Environment (OS, browser, versión)
- ✅ Capturas de pantalla si aplica
- ✅ Logs de error si disponibles

### Ejemplo de Bug Report

```markdown
## Descripción
El editor Monaco no carga en Safari 15.

## Pasos para reproducir
1. Abrir Safari 15
2. Ir a /course/mes-01/lesson-01
3. Click en pestaña "Interactive"
4. Ver pantalla blanca

## Expected
El editor Monaco debería cargar con el código inicial.

## Actual
Pantalla blanca, error en consola: "Monaco is not defined"
```

---

## Sugerir Features

Las features se sugieren usando el [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md).

### Un buen feature request incluye:

- ✅ Problema que resuelve
- ✅ Descripción de la solución
- ✅ Alternativas consideradas
- ✅ Casos de uso
- ✅ Mockups si aplica

---

## Pull Requests

### Proceso de PR

1. **Crea tu rama** desde `main`
2. **Haz tus cambios** siguiendo el estilo de código
3. **Agrega tests** si es necesario
4. **Actualiza documentación** si es necesario
5. **Verifica el build** `npm run build`
6. **Solicita review** de maintainers

### Título de PR

Usa un formato claro:
- `feat: Add new quiz system`
- `fix: Resolve Monaco loading issue in Safari`
- `docs: Update README with deployment steps`
- `refactor: Improve lesson loading performance`

### Descripción de PR

```markdown
## Descripción
Breve descripción de los cambios.

## Cambios
- [ ] Cambio 1
- [ ] Cambio 2

## Testing
- [ ] Tests agregados
- [ ] Build verificado
- [ ] Probado en Chrome/Firefox/Safari

## Screenshots
Si aplica, agrega screenshots de los cambios.

## Related Issues
Closes #123
```

---

## Estilo de Código

### TypeScript

```typescript
// ✅ Usa tipos explícitos
const lesson: Lesson = {
  id: "mes-01-l01",
  title: "Introduction",
  // ...
};

// ✅ Usa unknown en lugar de any
function parseData(data: unknown): Lesson {
  // validación
}

// ✅ Usa type guards
function isLesson(obj: unknown): obj is Lesson {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "title" in obj
  );
}
```

### React Components

```tsx
// ✅ Functional components con TypeScript
interface LessonCardProps {
  lesson: Lesson;
  completed: boolean;
  onComplete: (id: string) => void;
}

export default function LessonCard({
  lesson,
  completed,
  onComplete,
}: LessonCardProps) {
  return (
    <div className="lesson-card">
      <h3>{lesson.title}</h3>
      {/* ... */}
    </div>
  );
}
```

### Naming Conventions

- **Archivos**: `kebab-case.ts` (e.g., `lesson-viewer.tsx`)
- **Componentes**: `PascalCase` (e.g., `LessonViewer`)
- **Funciones/Variables**: `camelCase` (e.g., `loadLesson`)
- **Constantes**: `UPPER_SNAKE_CASE` (e.g., `MAX_XP`)
- **Types/Interfaces**: `PascalCase` (e.g., `LessonTheory`)

---

## Tests

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests con coverage
npm test -- --coverage

# Tests específicos
npx jest src/__tests__/lesson.test.ts
```

### Escribir Tests

```typescript
// ✅ Test unitario ejemplo
describe("Lesson Structure", () => {
  it("should have required properties", () => {
    const lesson = lesson01;
    
    expect(lesson).toHaveProperty("id");
    expect(lesson).toHaveProperty("title");
    expect(lesson).toHaveProperty("theory");
    expect(lesson).toHaveProperty("examples");
  });

  it("should have valid difficulty", () => {
    const validDifficulties = ["beginner", "intermediate", "advanced", "expert"];
    expect(validDifficulties).toContain(lesson01.difficulty);
  });
});
```

---

## Documentación

### Actualizar README

Si agregas una feature nueva, actualiza el README:

1. Agrega a la sección de **Features**
2. Actualiza **Comandos Útiles** si hay nuevos scripts
3. Agrega ejemplos de uso si aplica

### Comentarios en Código

```typescript
/**
 * Carga una lección por ID
 * 
 * @param lessonId - ID de la lección a cargar
 * @param moduleId - ID del módulo donde buscar
 * @returns La lección encontrada o null si no existe
 * 
 * @example
 * const lesson = loadLesson("mes-01-l01", "mes-01");
 */
function loadLesson(lessonId: string, moduleId: string): Lesson | null {
  // implementación
}
```

---

## Review Process

### Qué buscan los reviewers:

- ✅ Código sigue el estilo del proyecto
- ✅ Tests agregados y passing
- ✅ Documentación actualizada
- ✅ No hay console.logs o debug code
- ✅ Manejo de errores apropiado
- ✅ Performance considerado

### Timeline de Review

- **Primera respuesta**: 2-3 días hábiles
- **Review completo**: 5-7 días hábiles
- **Merge después de aprobación**: 1-2 días

---

## Reconocimiento

Los contribuidores son reconocidos en:

1. **README.md** - Sección de Contributors
2. **RELEASE NOTES** - Mención en changelog
3. **Sitio Web** - Página de contributors (próximamente)

---

## Preguntas Frecuentes

### ¿Puedo contribuir si soy principiante?

¡Absolutamente! Hay issues etiquetados como `good first issue` perfectos para empezar.

### ¿Necesito saber Lua?

No necesariamente. Puedes contribuir con:
- Documentación
- Tests
- UI/UX improvements
- Bug fixes
- Traducciones

### ¿Cómo sé qué issues están disponibles?

Revisa la sección de [Issues](https://github.com/TU_USUARIO/lua-master-pro/issues) y filtra por:
- `good first issue` - Para principiantes
- `help wanted` - Se busca ayuda
- `bug` - Bugs para fixear
- `enhancement` - Nuevas features

---

## ¡Gracias por Contribuir!

Tu contribución hace que **Lua Master Pro** sea mejor para todos. ¡Apreciamos tu tiempo y esfuerzo!

Si tienes preguntas, no dudes en abrir un issue o contactar a los maintainers.

---

**Última actualización:** Febrero 2026
**Versión:** 1.0.0
