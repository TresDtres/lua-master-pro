# CodeEditor - Características Profesionales

El componente `CodeEditor` ha sido mejorado para proporcionar una experiencia de desarrollo profesional similar a VS Code, específicamente diseñado para aprender Lua en diferentes entornos.

## 🎯 Características Principales

### 1. **IntelliSense Completo**

El editor proporciona autocompletado contextual inteligente para:

- **Funciones globales** de Lua (`print`, `type`, `tonumber`, etc.)
- **Servicios** del entorno seleccionado (ej. `game:GetService("Players")`)
- **Clases y sus métodos** (ej. `Instance.new`, `part:Clone()`)
- **Tipos de datos** (ej. `Vector3.new`, `CFrame.lookAt`)
- **Propiedades** de objetos (ej. `part.Position`, `part.Size`)
- **Snippets** de código predefinidos

**Activación:** 
- Automático al escribir `.` o `:`
- Manual con `Ctrl+Space`

### 2. **Signature Help (Parámetros de Funciones)**

Muestra los parámetros esperados mientras escribes una llamada a función:

```lua
Vector3.new(x: number, y: number, z: number)
-- Muestra qué parámetro estás completando
```

**Activación:** Automático al escribir `(` o `,`

### 3. **Documentación Hover (Tooltips)**

Pasa el mouse sobre cualquier función, clase o variable para ver:
- Firma completa de la función
- Descripción detallada
- Tipo de retorno
- Ejemplos de uso (cuando disponibles)

### 4. **Snippets de Código**

Atajos para insertar plantillas de código comunes:

| Prefijo | Descripción |
|---------|-------------|
| `for` | Bucle for numérico |
| `foreach` | Bucle for ipairs |
| `forpair` | Bucle for pairs |
| `if` | Sentencia if |
| `ifel` | Sentencia if-else |
| `func` | Función local |
| `while` | Bucle while |
| `repeat` | Bucle repeat-until |
| `pcall` | Llamada protegida |
| `connect` | Conexión a evento |
| `tween` | Crear tween (Roblox) |
| `datastore` | Plantilla DataStore |
| `gui` | GUI básica |
| `class` | Patrón de clase |
| `module` | ModuleScript |

**Uso:** Escribe el prefijo y presiona `Tab` o `Enter`

### 5. **Coloración de Sintaxis Avanzada**

Tema personalizado "lua-dark" con resaltado para:
- Palabras clave (`function`, `local`, `return`, etc.)
- Funciones (en negrita)
- Strings (color naranja)
- Números (color verde claro)
- Comentarios (en cursiva, color verde)
- Operadores y delimitadores

### 6. **Validación en Tiempo Real**

El editor detecta y marca:
- Errores de sintaxis
- Variables no declaradas (advertencia)
- Parámetros incorrectos
- Tipos incompatibles

### 7. **Características de Edición**

- **Minimapa** para navegación rápida
- **Números de línea** con resaltado activo
- **Guías de indentación** activas
- **Auto-cierre** de paréntesis, corchetes y comillas
- **Formato automático** al pegar o escribir
- **Plegado de código** (folding)
- **Resaltado de paréntesis** coincidentes
- **Búsqueda y reemplazo** (Ctrl+F, Ctrl+H)
- **Múltiples cursores** (Alt+Click)
- **Reglas de columna** en 80 y 120 caracteres

### 8. **Ejecución de Código**

- **Fengari-web**: Motor Lua en el navegador
- **Sandbox seguro**: Timeout de 5 segundos
- **Captura de output**: Redirección de `print()`
- **Manejo de errores**: Mensajes descriptivos
- **Fallback a API**: Ejecución en servidor si falla Fengari

## 🎮 Entornos Soportados

### Lua Estándar (`environment="lua"`)
- Funciones globales de Lua 5.1
- Bibliotecas estándar (`string`, `table`, `math`, `os`, `io`, `debug`)
- Snippets básicos

### Roblox (`environment="roblox"`)
- **Servicios:** Players, TweenService, RunService, DataStoreService, etc.
- **Clases:** Instance, Part, Model, Player, Script, LocalScript, etc.
- **Tipos de datos:** Vector3, CFrame, Color3, UDim2, TweenInfo, etc.
- **Eventos:** RemoteEvent, RemoteFunction
- **GUI:** ScreenGui, Frame, TextLabel, TextButton, etc.
- **Snippets específicos:** tween, datastore, leaderstats, tool, etc.

### Unreal Engine - UnLua (`environment="unlua"`)
- **Clases UE5:** UObject, AActor, APawn, ACharacter
- **Componentes:** UActorComponent, USceneComponent, UInputComponent
- **Estructuras:** FVector, FRotator, FHitResult, FLinearColor
- **Utilidades:** UGameplayStatics, UKismetSystemLibrary

### Minecraft - ComputerCraft (`environment="minecraft"`)
- **API principal:** cc, peripheral, redstone
- **Periféricos:** turtle, monitor, disk, speaker, modem
- **Utilidades:** http, gps, commands, events
- **Constantes:** colors, sides

## 📝 Uso del Componente

```tsx
import CodeEditor from "@/components/CodeEditor";

// Uso básico
<CodeEditor 
  environment="roblox"
  initialCode='print("Hello, Roblox!")'
  onRun={(code) => console.log("Código:", code)}
/>

// Con todas las opciones
<CodeEditor 
  environment="roblox"
  initialCode='local part = Instance.new("Part")'
  height="600px"
  showOutput={true}
  readOnly={false}
  onRun={(code) => {
    // Manejar ejecución
  }}
  onCodeChange={(code) => {
    // Manejar cambios
  }}
/>
```

## ⚙️ Props Disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `environment` | `"lua" \| "roblox" \| "unlua" \| "minecraft"` | `"lua"` | Entorno de API |
| `initialCode` | `string` | `-- Escribe tu código...` | Código inicial |
| `height` | `string \| number` | `"500px"` | Altura del editor |
| `readOnly` | `boolean` | `false` | Solo lectura |
| `showOutput` | `boolean` | `true` | Mostrar panel de salida |
| `onRun` | `(code: string) => void` | - | Callback al ejecutar |
| `onCodeChange` | `(code: string) => void` | - | Callback al cambiar |

## 🎨 Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl+Space` | Activar autocompletado |
| `Ctrl+F` | Buscar |
| `Ctrl+H` | Reemplazar |
| `Ctrl+Z` | Deshacer |
| `Ctrl+Y` | Rehacer |
| `Ctrl+/` | Comentar/descomentar línea |
| `Alt+↑/↓` | Mover línea |
| `Shift+Alt+↑/↓` | Copiar línea |
| `Alt+Click` | Múltiples cursores |
| `Ctrl+D` | Seleccionar siguiente coincidencia |
| `F3` | Buscar siguiente |
| `Shift+F3` | Buscar anterior |
| `F12` | Ir a definición |
| `Alt+F12` | Ver definición en ventana |
| `Ctrl+`**\`** | Abrir terminal integrada |

## 🔧 Configuración del Editor

El editor incluye:

- **Fuente:** JetBrains Mono con ligaduras
- **Tamaño:** 14px
- **Tabulación:** 2 espacios
- **Auto-indentación:** Completa
- **Minimapa:** Habilitado (máx. 100 columnas)
- **Highlight de línea:** Todos
- **Cursor:** Animación suave, parpadeo smooth
- **Scroll:** Suavizado
- **Padding:** 10px arriba/abajo

## 📊 Estadísticas en Tiempo Real

El panel muestra:
- Número de líneas
- Número de caracteres
- Estado del motor Lua (cargando/listo)

## 🚀 Rendimiento

- **Carga diferida** de definiciones de API
- **Disposal correcto** de proveedores al cambiar entorno
- **Memoización** de callbacks con `useCallback`
- **Procesamiento eficiente** de definiciones JSON

## 🐛 Solución de Problemas

### El autocompletado no aparece
- Verifica que el entorno esté cargado (indicador verde "Ready")
- Presiona `Ctrl+Space` manualmente
- Revisa la consola del navegador por errores

### La ejecución falla
- Espera a que Fengari cargue (indicador verde)
- Verifica que el código sea Lua válido
- Revisa el timeout (5 segundos máximo)

### Los snippets no funcionan
- Asegúrate de que `snippetSuggestions` esté en "top"
- Escribe el prefijo completo y presiona Tab

## 📚 Recursos Adicionales

- [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)
- [Fengari Web](https://github.com/fengari-lua/fengari-web)
- [Roblox API Reference](https://create.roblox.com/docs/reference/engine)
- [UnLua Documentation](https://github.com/Tencent/UnLua)
- [ComputerCraft Docs](https://tweaked.cc/)
