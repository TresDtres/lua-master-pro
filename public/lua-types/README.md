# Lua Types - API Definitions

Este directorio contiene las definiciones de API para los diferentes entornos de Lua soportados por Lua Master Pro.

## Estructura

```
public/lua-types/
├── roblox/        # API de Roblox
├── unlua/         # API de Unreal Engine (UnLua)
└── minecraft/     # API de Minecraft (ComputerCraft)
```

## Formatos

Cada entorno tiene su propia estructura de archivos. Actualmente se utiliza `api.json` que contiene:

- **classes**: Definiciones de clases con propiedades y métodos
- **datatypes**: Tipos de datos estructurados (Vector3, CFrame, etc.)
- **namespaces**: Funciones globales y utilidades
- **constructors**: Constructores para tipos de datos

## Uso con Monaco Editor

El editor carga dinámicamente estas definiciones según el entorno seleccionado:

```typescript
// Ejemplo de carga
const response = await fetch('/lua-types/roblox/api.json');
const definitions = await response.json();
// Monaco usa estas definiciones para IntelliSense
```

## Entornos Soportados

### Roblox (`roblox/api.json`)
- Clases principales: `Instance`, `Workspace`, `Part`, `Script`, `Player`
- Servicios: `TweenService`, `RunService`, `DataStoreService`, `HttpService`
- Tipos de datos: `Vector3`, `CFrame`, `Color3`, `TweenInfo`
- Eventos: `RemoteEvent`, `RemoteFunction`

### Unreal Engine - UnLua (`unlua/api.json`)
- Clases UE5: `UObject`, `AActor`, `APawn`, `ACharacter`
- Componentes: `UActorComponent`, `USceneComponent`, `UInputComponent`
- Estructuras: `FVector`, `FRotator`, `FHitResult`, `FLinearColor`
- Utilidades: `UGameplayStatics`, `UKismetSystemLibrary`

### Minecraft - ComputerCraft (`minecraft/api.json`)
- API principal: `cc`, `peripheral`, `redstone`
- Periféricos: `turtle`, `monitor`, `disk`, `speaker`, `modem`
- Utilidades: `http`, `gps`, `commands`, `events`
- Constantes: `colors`, `sides`

## Añadir Nuevas Definiciones

Para agregar más APIs:

1. Crea una nueva carpeta en `public/lua-types/`
2. Añade el archivo `api.json` con la estructura correspondiente
3. Actualiza el componente `CodeEditor.tsx` para reconocer el nuevo entorno

## Referencias

- [Roblox API](https://create.roblox.com/docs/reference/engine)
- [UnLua Documentation](https://github.com/Tencent/UnLua)
- [ComputerCraft Docs](https://tweaked.cc/)
