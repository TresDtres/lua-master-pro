# 📚 Estructura del Curso: Lua Scripting con Unreal Engine 5

**Basado en el Plan de Estudio de 12 Meses**  
**Total: 730 horas | 12 Módulos | 4 Proyectos Principales | 1 Juego Completo**

---

## 🎯 Objetivo del Curso

Este curso sigue el plan de estudio de 12 meses para dominar Lua Scripting en Unreal Engine 5.6. Cada módulo corresponde a un mes del plan, con 2 horas diarias de contenido (~60 horas por módulo).

---

## 📋 Estructura de Cada Módulo

Cada módulo debe contener:

```markdown
## Módulo X: [Nombre]

**Duración:** 4 semanas | ~60 horas

**Objetivos:**
- Lista de objetivos claros y medibles

**Lecciones:**
1. Lección 1.1 - [Tema]
2. Lección 1.2 - [Tema]
...

**Ejemplos de Código Relacionados:**
- Enlaces a ejemplos en el editor

**Quiz de Evaluación:**
- 10-15 preguntas por módulo

**Entregable del Mes:**
- Proyecto práctico a completar
```

---

## 📖 Módulos del Curso

---

### **Módulo 1: Lua desde Cero** ✅

**Duración:** 4 semanas | ~60 horas

**Estado:** ✅ Contenido base implementado

**Objetivos:**
- [x] Entender la sintaxis y semántica de Lua 5.4
- [x] Dominar tipos de datos, operadores y control de flujo
- [x] Manejar funciones, closures y el sistema de módulos
- [x] Comprender las tablas como estructura de datos central
- [x] Escribir scripts Lua standalone

**Lecciones:**
1. **Semana 1: Sintaxis Básica**
   - 1.1 - Introducción a Lua
   - 1.2 - Variables y Tipos de Datos (nil, boolean, number, string, table, function)
   - 1.3 - Operadores (aritméticos, relacionales, lógicos)
   - 1.4 - Comentarios y buenas prácticas

2. **Semana 2: Control de Flujo**
   - 2.1 - Condicionales (if/elseif/else)
   - 2.2 - Bucles (while, repeat-until)
   - 2.3 - For numérico
   - 2.4 - For genérico (pairs, ipairs)

3. **Semana 3: Funciones**
   - 3.1 - Definición de funciones
   - 3.2 - Parámetros y retornos múltiples
   - 3.3 - Funciones variádicas
   - 3.4 - Closures y ámbito léxico

4. **Semana 4: Tablas**
   - 4.1 - Tablas como arrays
   - 4.2 - Tablas como diccionarios
   - 4.3 - Metatables básicas
   - 4.4 - Metamétodos comunes

**Ejemplos de Código Relacionados:**
- 📜 [Hola Mundo](/editor?example=lua-1) - Primer programa en Lua
- 🧮 [Calculadora Completa](/editor?example=lua-2) - Funciones y condicionales
- 📊 [Sistema de Inventario](/editor?example=lua-3) - Tablas anidadas
- 🎲 [Sistema de Dados RPG](/editor?example=lua-4) - Aleatoriedad
- 🔐 [Sistema de Contraseñas](/editor?example=lua-5) - Strings y validación
- 📈 [Analizador de Texto](/editor?example=lua-6) - Manipulación de strings

**Quiz de Evaluación:**
- 15 preguntas sobre sintaxis básica
- 5 ejercicios prácticos de código

**Entregable del Mes:**
> **Scripts Lua Standalone:** Calculadora, gestor de inventario simple, sistema de puntuación.
> Publicar en GitHub como repositorio `lua-basico-mes1`

**Criterios de Aprobación:**
- [ ] Los 3 scripts funcionan sin errores
- [ ] Código subido a GitHub
- [ ] Quiz completado con ≥80% de aciertos

---

### **Módulo 2: POO en Lua y Primeros Pasos en UE5** ✅

**Duración:** 4 semanas | ~60 horas

**Estado:** ✅ Ejemplos implementados

**Objetivos:**
- [x] Implementar programación orientada a objetos con metatables
- [x] Instalar y configurar el plugin UnLua en UE5
- [x] Crear tu primer Actor controlado por script Lua
- [x] Entender el ciclo BeginPlay / Tick / EndPlay
- [x] Acceder a propiedades y llamar funciones desde Lua

**Lecciones:**
1. **Semana 1: POO en Lua**
   - 1.1 - Clases y objetos con metatables
   - 1.2 - Herencia y polimorfismo
   - 1.3 - Patrón de clase estándar
   - 1.4 - Ejercicio: Crear sistema de clases

2. **Semana 2: Setup UnLua**
   - 2.1 - Instalación del plugin UnLua
   - 2.2 - Configuración del proyecto UE5
   - 2.3 - Primer script .lua ligado a Actor BP
   - 2.4 - Debugging básico

3. **Semana 3: Ciclo de Vida**
   - 3.1 - BeginPlay desde Lua
   - 3.2 - Tick y DeltaTime
   - 3.3 - EndPlay y limpieza
   - 3.4 - Logging con UE_LOG

4. **Semana 4: Interacciones Básicas**
   - 4.1 - Mover actores desde Lua
   - 4.2 - Cambiar materiales
   - 4.3 - Spawner de objetos
   - 4.4 - Ejercicio: Sistema de partículas

**Ejemplos de Código Relacionados:**
- 🎯 [Actor Básico UE5](/editor?example=unlua-1) - Actor rotatorio
- 🏃 [Character Movement](/editor?example=unlua-2) - Control de personaje
- 💀 [Enemy AI Básico](/editor?example=unlua-3) - IA con patrulla

**Quiz de Evaluación:**
- 12 preguntas sobre POO en Lua
- 8 preguntas sobre UnLua en UE5
- 5 ejercicios de código

**Entregable del Mes:**
> **Prototipo 'Hello Unreal World':** Escena con 10 cubos cuyo comportamiento (movimiento, color, escala) es 100% controlado por scripts Lua.

**Criterios de Aprobación:**
- [ ] 10 cubos con comportamientos únicos
- [ ] Todos los scripts en Lua (sin lógica en BP)
- [ ] Video demostrativo (1-2 min)
- [ ] Quiz completado con ≥80%

---

### **Módulo 3: Comunicación entre Blueprints y Lua** ⏳

**Duración:** 4 semanas | ~60 horas

**Estado:** ⏳ Pendiente de implementación

**Objetivos:**
- [ ] Exponer funciones Lua al sistema de Blueprints
- [ ] Llamar funciones Blueprint desde Lua
- [ ] Trabajar con el sistema de Input desde Lua
- [ ] Usar delegates y events desde Lua
- [ ] Gestionar el ciclo de un nivel completo

**Lecciones:**
1. **Semana 1: Binding Blueprint ↔ Lua**
   - 1.1 - UFUNCTION export desde Lua
   - 1.2 - Override de funciones BP en Lua
   - 1.3 - Paso de parámetros entre BP y Lua
   - 1.4 - Ejercicio: Sistema de eventos

2. **Semana 2: Input en Lua**
   - 2.1 - Enhanced Input System
   - 2.2 - Bindings de acciones
   - 2.3 - Bindings de ejes
   - 2.4 - Soporte para gamepad

3. **Semana 3: Delegates y Eventos**
   - 3.1 - Crear delegates desde Lua
   - 3.2 - Bind a eventos de UE5
   - 3.3 - Dispatch de eventos
   - 3.4 - Event Dispatchers personalizados

4. **Semana 4: Mini-Proyecto Integrador**
   - 4.1 - Diseño del personaje
   - 4.2 - Implementación de controles
   - 4.3 - Sistema de interacción
   - 4.4 - Polish y testing

**Ejemplos de Código Relacionados:**
- *Pendiente de crear*

**Quiz de Evaluación:**
- 10 preguntas sobre binding BP-Lua
- 10 preguntas sobre sistema de input
- 5 ejercicios prácticos

**Entregable del Mes:**
> **Mini-juego 'Lua Controller':** Personaje navegable en tercera persona cuyo movimiento, animaciones básicas e interacción con objetos están íntegramente en scripts Lua.

**Criterios de Aprobación:**
- [ ] Personaje controlable 100% desde Lua
- [ ] Sistema de interacción funcional
- [ ] Input para teclado/ratón y gamepad
- [ ] Quiz completado con ≥80%

---

### **Módulo 4: Sistemas de Juego - Inventario y Stats** ✅

**Duración:** 4 semanas | ~60 horas

**Estado:** ✅ Ejemplos implementados

**Objetivos:**
- [x] Diseñar arquitectura de datos limpia en Lua
- [x] Implementar sistema de inventario completo
- [x] Crear sistema de estadísticas de personaje
- [x] Integrar persistencia con SaveGame
- [x] Aplicar patrones de diseño (Observer, State, Command)

**Lecciones:**
1. **Semana 1: Arquitectura de Datos**
   - 1.1 - DataAssets y DataTables
   - 1.2 - Acceso a datos desde Lua
   - 1.3 - Estructuras de datos eficientes
   - 1.4 - Ejercicio: Database de items

2. **Semana 2: Sistema de Inventario**
   - 2.1 - Clase Item base
   - 2.2 - Contenedores y slots
   - 2.3 - Reglas de negocio (stack, peso)
   - 2.4 - Drag & Drop conceptual

3. **Semana 3: Sistema de Stats**
   - 3.1 - Stats básicos (HP, mana, stamina)
   - 3.2 - Modificadores y buffs
   - 3.3 - Debuffs y efectos temporales
   - 3.4 - Cálculos con metatables

4. **Semana 4: SaveGame**
   - 4.1 - Serializar estado en Lua
   - 4.2 - Guardado automático
   - 4.3 - Carga de partidas
   - 4.4 - Ejercicio: Sistema completo

**Ejemplos de Código Relacionados:**
- 📦 [Sistema de Inventario UE5](/editor?example=unlua-4) - Slots y items
- 🎮 [Leaderstats System](/editor?example=roblox-1) - Stats de jugador (conceptos aplicables)
- 📦 [Sistema de Tienda](/editor?example=roblox-6) - Economía y transacciones

**Quiz de Evaluación:**
- 10 preguntas sobre arquitectura de datos
- 10 preguntas sobre sistemas de inventario
- 5 ejercicios de implementación

**Entregable del Mes:**
> **Sistema RPG Base:** Inventario de 20 slots, 6 estadísticas de personaje, guardado/cargado de partida. Todo gestionado por módulos Lua reutilizables.

**Criterios de Aprobación:**
- [ ] Inventario funcional con 20 slots
- [ ] 6+ estadísticas implementadas
- [ ] Sistema de guardado/cargado
- [ ] Módulos reutilizables documentados
- [ ] Quiz completado con ≥80%

---

### **Módulo 5: Sistema de Diálogos e Interfaz de Usuario** ⏳

**Duración:** 4 semanas | ~60 horas

**Estado:** ⏳ Pendiente de implementación

**Objetivos:**
- [ ] Crear y controlar widgets UMG desde Lua
- [ ] Diseñar sistema de diálogos con árbol no lineal
- [ ] Implementar localización básica de textos
- [ ] Integrar animaciones de UI desde Lua
- [ ] Construir HUD dinámico conectado a stats

**Lecciones:**
1. **Semana 1: UMG desde Lua**
   - 1.1 - Crear widgets desde Lua
   - 1.2 - Bindear datos a widgets
   - 1.3 - Mostrar/ocultar UI
   - 1.4 - Ejercicio: Menú básico

2. **Semana 2: Sistema de Diálogos**
   - 2.1 - Estructura de conversación (JSON/tabla)
   - 2.2 - Parser de diálogos
   - 2.3 - Ramificación y condiciones
   - 2.4 - Ejercicio: 15+ líneas de diálogo

3. **Semana 3: HUD Completo**
   - 3.1 - Barras de vida/mana
   - 3.2 - Minimapa Lua-driven
   - 3.3 - Sistema de notificaciones
   - 3.4 - Conexión con stats del jugador

4. **Semana 4: Polish de UI**
   - 4.1 - Transiciones y animaciones
   - 4.2 - Feedback visual
   - 4.3 - Accesibilidad básica
   - 4.4 - Proyecto integrador

**Ejemplos de Código Relacionados:**
- 🎮 [Widget UI Básico](/editor?example=unlua-5) - UMG y barras de progreso
- *Pendiente: Sistema de diálogos*

**Quiz de Evaluación:**
- 10 preguntas sobre UMG
- 10 preguntas sobre sistema de diálogos
- 5 ejercicios de UI

**Entregable del Mes:**
> **Demo 'Story Engine':** NPC con 15+ líneas de diálogo ramificado, HUD funcional conectado a stats, sistema de notificaciones. Todo controlado por Lua.

**Criterios de Aprobación:**
- [ ] NPC con diálogo ramificado funcional
- [ ] HUD con barras de vida/mana
- [ ] Sistema de notificaciones
- [ ] Quiz completado con ≥80%

---

### **Módulo 6: Inteligencia Artificial de NPCs** ✅

**Duración:** 4 semanas | ~60 horas

**Estado:** ✅ Ejemplo base implementado

**Objetivos:**
- [x] Entender Behavior Trees y Blackboard en UE5
- [x] Implementar FSM para NPCs en Lua puro
- [x] Crear sistema de percepción (visión, sonido)
- [x] Diseñar comportamientos de combate básico
- [x] Optimizar scripts para múltiples NPCs

**Lecciones:**
1. **Semana 1: FSM en Lua**
   - 1.1 - Estados y transiciones
   - 1.2 - Guards y condiciones
   - 1.3 - NPC con 4 estados (idle, patrol, alert, chase)
   - 1.4 - Ejercicio: FSM completa

2. **Semana 2: Percepción**
   - 2.1 - Raycasts desde Lua
   - 2.2 - Cone de visión
   - 2.3 - Rango de escucha
   - 2.4 - Ejercicio: Sistema de detección

3. **Semana 3: Behavior Trees + Lua**
   - 3.1 - BTTasks en Lua via UnLua
   - 3.2 - BTDecorators desde Lua
   - 3.3 - Blackboard operations
   - 3.4 - Ejercicio: BT completo

4. **Semana 4: Combate Básico**
   - 4.1 - Sistema de ataque/defensa
   - 4.2 - Flee behavior
   - 4.3 - NPCs coordinados en grupo
   - 4.4 - Proyecto: Smart Guards

**Ejemplos de Código Relacionados:**
- 💀 [Enemy AI Básico](/editor?example=unlua-3) - IA con patrulla y persecución

**Quiz de Evaluación:**
- 10 preguntas sobre FSM
- 10 preguntas sobre Behavior Trees
- 5 ejercicios de IA

**Entregable del Mes:**
> **Demo 'Smart Guards':** Escenario de sigilo con 5 guardias con IA completa (patrulla, persecución, alerta, búsqueda) implementada enteramente en Lua.

**Criterios de Aprobación:**
- [ ] 5 NPCs con IA funcional
- [ ] 4 estados de comportamiento
- [ ] Sistema de percepción working
- [ ] Quiz completado con ≥80%

---

### **Módulo 7: Multijugador y Replicación** ⏳

**Duración:** 4 semanas | ~60 horas

**Estado:** ⏳ Pendiente de implementación

**Objetivos:**
- [ ] Comprender modelo cliente-servidor de UE5
- [ ] Implementar replicación de propiedades desde Lua
- [ ] Crear RPCs (Remote Procedure Calls) desde Lua
- [ ] Sincronizar posición, estado, inventario
- [ ] Manejar predicción y reconciliación

**Lecciones:**
1. **Semana 1: Fundamentos de Red**
   - 1.1 - Modelo C/S en UE5
   - 1.2 - Authority y NetMode
   - 1.3 - Acceso desde Lua
   - 1.4 - Ejercicio: Setup multijugador

2. **Semana 2: Replicación de Propiedades**
   - 2.1 - UPROPERTY Replicated
   - 2.2 - Clases Lua-bound
   - 2.3 - RepNotify desde Lua
   - 2.4 - Ejercicio: Variable replicada

3. **Semana 3: RPCs en Lua**
   - 3.1 - Server RPCs
   - 3.2 - Client RPCs
   - 3.3 - NetMulticast
   - 3.4 - Ejercicio: Sistema de eventos

4. **Semana 4: Mini-Juego Multijugador**
   - 4.1 - Diseño del juego
   - 4.2 - Sincronización de posición
   - 4.3 - Eventos de red
   - 4.4 - Testing local

**Ejemplos de Código Relacionados:**
- *Pendiente de crear*

**Quiz de Evaluación:**
- 10 preguntas sobre redes en UE5
- 10 preguntas sobre replicación
- 5 ejercicios de sincronización

**Entregable del Mes:**
> **Mini-juego Online 2 Jugadores:** Mecánica simple (p.ej. pong 3D o tag) con posición, puntuación y eventos sincronizados por red vía scripts Lua.

**Criterios de Aprobación:**
- [ ] 2 jugadores conectados
- [ ] Posición sincronizada
- [ ] Eventos de red funcionando
- [ ] Quiz completado con ≥80%

---

### **Módulo 8: Optimización y Herramientas de Editor** ⏳

**Duración:** 4 semanas | ~60 horas

**Estado:** ⏳ Pendiente de implementación

**Objetivos:**
- [ ] Profiling de scripts Lua con Unreal Insights
- [ ] Técnicas de optimización (pooling, caching)
- [ ] Crear Custom Editor Tools con Slate API
- [ ] Automatizar tareas del pipeline
- [ ] Implementar hot-reload de scripts

**Lecciones:**
1. **Semana 1: Profiling**
   - 1.1 - Unreal Insights
   - 1.2 - Identificar bottlenecks
   - 1.3 - Métricas de frame
   - 1.4 - Ejercicio: Profile de script

2. **Semana 2: Optimización**
   - 2.1 - Object pooling
   - 2.2 - Coroutines con UE5 tasks
   - 2.3 - Memory management
   - 2.4 - Ejercicio: Pool de objetos

3. **Semana 3: Editor Tools**
   - 3.1 - Ventanas custom con Slate
   - 3.2 - Property editors
   - 3.3 - Batch operations
   - 3.4 - Ejercicio: Herramienta simple

4. **Semana 4: Pipeline Automation**
   - 4.1 - Importar assets desde Lua
   - 4.2 - Generar DataTables
   - 4.3 - Batch testing
   - 4.4 - Proyecto: 3 herramientas

**Ejemplos de Código Relacionados:**
- *Pendiente de crear*

**Quiz de Evaluación:**
- 10 preguntas sobre profiling
- 10 preguntas sobre optimización
- 5 ejercicios de herramientas

**Entregable del Mes:**
> **Toolkit de Editor:** 3 herramientas custom (generador de niveles procedural, validador de assets, batch renamer) implementadas como plugins Lua de editor.

**Criterios de Aprobación:**
- [ ] 3 herramientas funcionales
- [ ] Documentación de cada herramienta
- [ ] Quiz completado con ≥80%

---

### **Módulo 9: Sistemas Avanzados - Procedural, Shaders y Audio** ⏳

**Duración:** 4 semanas | ~60 horas

**Estado:** ⏳ Pendiente de implementación

**Objetivos:**
- [ ] Generación procedural de contenido desde Lua
- [ ] Controlar materiales dinámicos y MPCs
- [ ] Integrar Metasounds y sistema de audio
- [ ] Implementar sistema de quests complejo
- [ ] Crear Game Events Bus

**Lecciones:**
1. **Semana 1: Generación Procedural**
   - 1.1 - Algoritmos de dungeon
   - 1.2 - WFC básico en Lua
   - 1.3 - Terrain generation
   - 1.4 - Ejercicio: Dungeon simple

2. **Semana 2: Materiales Dinámicos**
   - 2.1 - Material Parameter Collections
   - 2.2 - Dynamic material instances
   - 2.3 - Control desde Lua
   - 2.4 - Ejercicio: Material animado

3. **Semana 3: Audio**
   - 3.1 - Metasound parameters
   - 3.2 - Audio component control
   - 3.3 - Música adaptativa
   - 3.4 - Ejercicio: Sistema de audio

4. **Semana 4: Quest System**
   - 4.1 - Objetivos y tracking
   - 4.2 - Rewards
   - 4.3 - Events bus
   - 4.4 - Proyecto: 5 misiones

**Ejemplos de Código Relacionados:**
- 🎯 [Sistema de Misiones](/editor?example=roblox-4) - Quests con objetivos (conceptos aplicables)

**Quiz de Evaluación:**
- 10 preguntas sobre generación procedural
- 10 preguntas sobre materiales/audio
- 5 ejercicios de quests

**Entregable del Mes:**
> **Dungeon Crawler Procedural:** Cada ejecución genera un nivel único, con enemigos, audio adaptativo al peligro y sistema de 5 misiones encadenadas. Todo en Lua.

**Criterios de Aprobación:**
- [ ] Generación procedural funcional
- [ ] Audio adaptativo
- [ ] 5 misiones encadenadas
- [ ] Quiz completado con ≥80%

---

### **Módulo 10: Arquitectura de Proyecto Real** ⏳

**Duración:** 4 semanas | ~60 horas

**Estado:** ⏳ Pendiente de implementación

**Objetivos:**
- [ ] Diseñar arquitectura del juego final
- [ ] Implementar Game Framework en Lua
- [ ] Crear sistema data-driven desde Lua
- [ ] Diseñar APIs internas reutilizables
- [ ] Aplicar TDD básico a módulos críticos

**Lecciones:**
1. **Semana 1: Diseño del Juego Final**
   - 1.1 - GDD simplificado
   - 1.2 - Lista de sistemas necesarios
   - 1.3 - Scope y timeline
   - 1.4 - Documento de arquitectura

2. **Semana 2: Game Framework Lua**
   - 2.1 - GameMode en Lua
   - 2.2 - GameState y PlayerState
   - 2.3 - Flow de sesiones
   - 2.4 - Transiciones entre niveles

3. **Semana 3: Data-Driven Design**
   - 3.1 - JSON/CSV como fuente de verdad
   - 3.2 - Hot-reload en desarrollo
   - 3.3 - Balance de juego
   - 3.4 - Ejercicio: DataTables

4. **Semana 4: Testing**
   - 4.1 - Framework de tests unitarios
   - 4.2 - luaunit
   - 4.3 - Integración con CI básico
   - 4.4 - Ejercicio: Tests automatizados

**Ejemplos de Código Relacionados:**
- *Pendiente de crear*

**Quiz de Evaluación:**
- 10 preguntas sobre arquitectura
- 10 preguntas sobre Game Framework
- 5 ejercicios de testing

**Entregable del Mes:**
> **Documento de Arquitectura + Game Framework funcional** con al menos 3 sistemas core integrados y con tests automatizados.

**Criterios de Aprobación:**
- [ ] Documento de arquitectura completo
- [ ] Game Framework funcional
- [ ] 3+ sistemas core
- [ ] Tests automatizados
- [ ] Quiz completado con ≥80%

---

### **Módulo 11: Producción del Juego Final** ⏳

**Duración:** 4 semanas | ~60 horas

**Estado:** ⏳ Pendiente de implementación

**Objetivos:**
- [ ] Construir juego completo integrando todos los sistemas
- [ ] Aplicar polish de gameplay (juice, game feel)
- [ ] Implementar menús (principal, opciones, pausa)
- [ ] Realizar playtesting y ajustar balance
- [ ] Optimizar para 60fps en hardware medio

**Lecciones:**
1. **Semana 1: Construcción Core Loop**
   - 1.1 - Mecánica principal jugable
   - 1.2 - Gameplay de principio a fin
   - 1.3 - Testing continuo
   - 1.4 - Iteración de diseño

2. **Semana 2: Contenido**
   - 2.1 - 3 niveles mínimo
   - 2.2 - 3 tipos de enemigos
   - 2.3 - 5 armas/habilidades
   - 2.4 - Balance de dificultad

3. **Semana 3: Menús y UX**
   - 3.1 - Menú principal
   - 3.2 - Opciones y settings
   - 3.3 - Pausa y game over
   - 3.4 - Save/load, localización

4. **Semana 4: Polish y Optimización**
   - 4.1 - Particle effects
   - 4.2 - Audio final
   - 4.3 - Profiling y optimización
   - 4.4 - Bug fixing

**Ejemplos de Código Relacionados:**
- *Todos los ejemplos anteriores son aplicables*

**Quiz de Evaluación:**
- Evaluación práctica del juego (no quiz tradicional)

**Entregable del Mes:**
> **Juego Completo Alpha:** Vertical slice jugable con inicio-medio-fin, publicado en itch.io o similar para feedback externo.

**Criterios de Aprobación:**
- [ ] Juego jugable de principio a fin
- [ ] 3 niveles completados
- [ ] Menús funcionales
- [ ] Publicado en itch.io
- [ ] Feedback de al menos 5 testers

---

### **Módulo 12: Portfolio, Documentación y Comunidad** ⏳

**Duración:** 4 semanas | ~60 horas

**Estado:** ⏳ Pendiente de implementación

**Objetivos:**
- [ ] Crear librería personal de módulos Lua reutilizables
- [ ] Documentar código con EmmyLua annotations
- [ ] Escribir post técnico sobre arquitectura Lua
- [ ] Contribuir a open source o crear plugin público
- [ ] Preparar portfolio profesional

**Lecciones:**
1. **Semana 1: Lua Toolkit**
   - 1.1 - Refactorizar mejores módulos
   - 1.2 - Crear librería reutilizable
   - 1.3 - Estructura de proyecto
   - 1.4 - Publicación en GitHub

2. **Semana 2: Documentación**
   - 2.1 - EmmyLua annotations
   - 2.2 - README detallados
   - 2.3 - Wiki interna
   - 2.4 - Ejercicio: Documentar módulo

3. **Semana 3: Contenido Público**
   - 3.1 - Artículo técnico (blog, dev.to)
   - 3.2 - Vídeo devlog
   - 3.3 - Release en itch.io/GitHub
   - 3.4 - Compartir en comunidades

4. **Semana 4: Portfolio Final**
   - 4.1 - Página web o PDF
   - 4.2 - 5 proyectos documentados
   - 4.3 - Código de GitHub organizado
   - 4.4 - Preparar para entrevistas

**Ejemplos de Código Relacionados:**
- *Todos los ejemplos creados durante el curso*

**Quiz de Evaluación:**
- No hay quiz tradicional
- Evaluación del portfolio completo

**Entregable del Mes:**
> **Portfolio Profesional Completo:** 5 proyectos documentados, librería Lua open source con README completo, artículo técnico publicado, juego publicado en itch.io.

**Criterios de Aprobación:**
- [ ] 5 proyectos documentados
- [ ] Librería Lua publicada en GitHub
- [ ] Artículo técnico publicado
- [ ] Juego en itch.io
- [ ] Portfolio en formato web o PDF

---

## 📊 Sistema de Progreso del Estudiante

### Tracking de Horas

Cada estudiante debe trackear sus horas de estudio:

| Tipo de Actividad | Horas Estimadas | Horas Reales |
|------------------|-----------------|--------------|
| Lecciones teóricas | 240 h | _ |
| Práctica de código | 300 h | _ |
| Proyectos entregables | 150 h | _ |
| Quizzes y tests | 40 h | _ |
| **Total** | **730 h** | _ |

### Checklist Semanal

Cada semana el estudiante debe completar:

- [ ] ¿Completé las 14 horas de estudio planificadas esta semana?
- [ ] ¿Creé o avancé en el entregable del mes?
- [ ] ¿Agregué al menos 3 entradas a mis notas personales?
- [ ] ¿Hice commit en GitHub al menos 3 veces?
- [ ] ¿Resolví al menos 1 problema nuevo que no había encontrado antes?

### Métricas de Progreso

| Hito | Señal de Progreso Correcto |
|------|---------------------------|
| Mes 3 | Puedes crear un Actor en UE5 controlado por Lua sin consultar tutoriales |
| Mes 6 | Puedes implementar un sistema de juego completo en menos de 3 horas |
| Mes 9 | Puedes leer código Lua ajeno y entender su arquitectura en minutos |
| Mes 12 | Puedes estimar con precisión el tiempo para implementar un feature Lua en UE5 |

---

## 🎯 Resumen del Estado Actual

| Módulo | Estado | Ejemplos | Quiz | Entregable |
|--------|--------|----------|------|------------|
| Módulo 1 | ✅ Completado | 6/6 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 2 | ✅ Base lista | 3/3 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 3 | ⏳ Pendiente | 0/3 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 4 | ✅ Base lista | 3/3 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 5 | ⏳ Pendiente | 1/3 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 6 | ✅ Base lista | 1/3 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 7 | ⏳ Pendiente | 0/3 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 8 | ⏳ Pendiente | 0/3 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 9 | ⏳ Pendiente | 1/3 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 10 | ⏳ Pendiente | 0/3 | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 11 | ⏳ Pendiente | - | ⏳ Pendiente | ⏳ Pendiente |
| Módulo 12 | ⏳ Pendiente | - | ⏳ Pendiente | ⏳ Pendiente |

**Progreso del Contenido:**
- ✅ Ejemplos de código: 15/36 creados (42%)
- ⏳ Quizzes: 0/12 creados (0%)
- ⏳ Sistema de tracking: Pendiente (0%)

---

## 📋 Próximos Pasos

### Prioridad 1: Completar Módulos 1-2
1. [ ] Crear quizzes para Módulos 1 y 2
2. [ ] Implementar sistema de entrega de proyectos
3. [ ] Añadir más ejemplos al Módulo 2

### Prioridad 2: Módulo 3 (Blueprints ↔ Lua)
1. [ ] Crear 3 ejemplos de código
2. [ ] Implementar 4 semanas de lecciones
3. [ ] Crear quiz de evaluación

### Prioridad 3: Sistema de Progreso
1. [ ] Página de progreso del estudiante
2. [ ] Tracking de horas
3. [ ] Checklist semanal
4. [ ] Integración con GitHub

---

**Documento creado:** Febrero 2026  
**Última actualización:** Febrero 2026  
**Próxima revisión:** Cuando se completen los quizzes de los Módulos 1-2
