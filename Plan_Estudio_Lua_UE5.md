

| 馃幃 PLAN DE ESTUDIO Lua Scripting con Unreal Engine 5.6 *12 meses 路 2 horas diarias 路 De cero a experto* |
| :---: |

| 730 h totales | 12 fases | 4 proyectos | 1 juego completo |
| :---: | :---: | :---: | :---: |

# **1\. Introducci贸n y Contexto**

Este plan de estudio est谩 dise帽ado para que, en 12 meses dedicando 2 horas diarias (aproximadamente 730 horas totales), domines el uso de scripts Lua dentro de Unreal Engine 5.6. El recorrido va desde los fundamentos de programaci贸n Lua hasta la creaci贸n de sistemas de juego completos, integrando herramientas profesionales del pipeline de desarrollo.

| 驴Por qu茅 Lua en Unreal Engine? Lua es uno de los lenguajes de scripting m谩s ligeros y eficientes del mundo del videojuego. Integrado en UE5 via plugins como UnLua o Lua Script Plugin, permite prototipado ultra-r谩pido. Ideal para IA de NPCs, sistemas de di谩logo, mec谩nicas de juego y herramientas de editor. Curva de aprendizaje m谩s suave que C++, con acceso directo al potencial de Unreal Engine 5\. Ampliamente usado en producci贸n: Roblox, World of Warcraft, Defold y muchos AAA m谩s. |
| :---- |

## **1.1 Estructura del Plan**

El plan se divide en cuatro grandes fases progresivas. Cada mes incluye objetivos claros, estructura de sesiones diarias y un entregable concreto que te permite medir el progreso real:

| Fase | Contenido principal | Duraci贸n |
| :---- | :---- | :---- |
| Fase I: Fundamentos | Lua base \+ entorno UE5 \+ primeros scripts | Meses 1-3 |
| Fase II: Intermedio | Integraci贸n UE5 avanzada \+ sistemas de juego | Meses 4-6 |
| Fase III: Avanzado | IA, redes, optimizaci贸n y herramientas de editor | Meses 7-9 |
| Fase IV: Maestr铆a | Proyecto final, portfolio y flujo profesional | Meses 10-12 |

## **1.2 Distribuci贸n de Tiempo Diaria**

Cada sesi贸n de 2 horas se estructura en bloques para maximizar la retenci贸n y la pr谩ctica:

| Distribuci贸n recomendada por sesi贸n (120 min) 鈴? 0-15 min   鈫? Repaso de la sesi贸n anterior \+ warm-up 鈴? 15-75 min  鈫? Bloque de aprendizaje principal (teor铆a \+ pr谩ctica) 鈴? 75-105 min 鈫? Ejercicio pr谩ctico o proyecto del mes 鈴? 105-120 min 鈫? Documentaci贸n personal \+ notas en Obsidian/Notion |
| :---- |

# **2\. Requisitos Previos y Herramientas**

## **2.1 Conocimientos Recomendados**

Este plan asume que partes pr谩cticamente desde cero en Lua, pero se beneficia de:

* Nociones b谩sicas de programaci贸n (variables, condicionales, bucles en cualquier lenguaje)

* Familiaridad b谩sica con la interfaz de Unreal Engine 5 (abrir proyectos, navegar el viewport)

* Ingl茅s de lectura (la mayor铆a de documentaci贸n oficial est谩 en ingl茅s)

## **2.2 Stack de Herramientas**

| Herramienta | Uso en el plan | Costo |
| :---- | :---- | :---- |
| Unreal Engine 5.6 | Motor principal de desarrollo | Gratuito |
| Plugin UnLua | Bridge oficial Lua 鈫?UE5 (m谩s completo) | Gratuito/OSS |
| VS Code \+ Lua LSP | Editor de c贸digo con autocompletado | Gratuito |
| EmmyLua Extension | Typings y debugging de Lua en VS Code | Gratuito |
| Git \+ GitHub | Control de versiones de proyectos | Gratuito |
| Obsidian / Notion | Notas y documentaci贸n personal del aprendizaje | Gratuito |

## **2.3 Configuraci贸n Inicial del Entorno**

Antes de comenzar el Mes 1, dedica una sesi贸n extra (no incluida en el plan) a:

1. Instalar Unreal Engine 5.6 desde Epic Games Launcher

2. Clonar el repositorio de UnLua desde GitHub y compilarlo con el engine

3. Configurar VS Code con las extensiones Lua, EmmyLua y UE5 Integration

4. Crear un proyecto de plantilla en blanco en UE5 para usar durante los primeros meses

5. Configurar Git y crear un repositorio privado en GitHub para tus proyectos del plan

# **3\. Fase I 鈥?Fundamentos S贸lidos (Meses 1-3)**

La Fase I construye la base sobre la que se apoya todo el aprendizaje posterior. Al terminarla, ser谩s capaz de escribir scripts Lua funcionales y conectarlos al ciclo de vida b谩sico de Unreal Engine 5\.

| MES 1  Lua desde Cero |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Entender la sintaxis y sem谩ntica de Lua 5.4 Dominar tipos de datos, operadores y control de flujo Manejar funciones, closures y el sistema de m贸dulos Comprender las tablas como estructura de datos central de Lua Escribir scripts Lua standalone ejecutados desde terminal **馃搮 Estructura semanal** Semana 1: Sintaxis b谩sica 鈥?variables, tipos (nil, boolean, number, string, table, function) Semana 2: Control de flujo 鈥?if/elseif/else, while, repeat-until, for num茅rico y gen茅rico Semana 3: Funciones 鈥?definici贸n, par谩metros variadicos, m煤ltiples retornos, closures Semana 4: Tablas como arrays, diccionarios y objetos; metatables y metam茅todos b谩sicos **鉁?Entregable del mes** *Scripts Lua standalone: calculadora, gestor de inventario simple, sistema de puntuaci贸n. Publicados en GitHub.* |

| MES 2  Orientaci贸n a Objetos en Lua y Primeros Pasos en UE5 |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Implementar programaci贸n orientada a objetos con metatables en Lua Instalar y configurar el plugin UnLua en un proyecto UE5 Crear tu primer Actor controlado por script Lua en UE5 Entender el ciclo BeginPlay / Tick / EndPlay desde Lua Acceder a propiedades y llamar funciones de Actores desde Lua **馃搮 Estructura semanal** Semana 1: POO en Lua 鈥?clases, herencia, polimorfismo con metatables; patr贸n de clase est谩ndar Semana 2: Setup UnLua 鈥?configuraci贸n del plugin, primer script .lua ligado a un Actor BP Semana 3: Ciclo de vida 鈥?BeginPlay, Tick (DeltaTime), EndPlay; logging con UE\_LOG desde Lua Semana 4: Interacciones b谩sicas 鈥?mover actores, cambiar materiales, spawner de objetos **鉁?Entregable del mes** *Prototipo 'Hello Unreal World': escena con 10 cubos cuyo comportamiento (movimiento, color, escala) es 100% controlado por scripts Lua.* |

| MES 3  Comunicaci贸n entre Blueprints y Lua |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Exponer funciones Lua al sistema de Blueprints de UE5 Llamar funciones Blueprint y C++ nativas desde Lua Trabajar con el sistema de Input (teclado/rat贸n/gamepad) desde Lua Usar el sistema de delegates y events desde scripts Lua Gestionar el ciclo de un nivel completo desde Lua **馃搮 Estructura semanal** Semana 1: Binding BP 鈫?Lua 鈥?UFUNCTION export, UFUNCTIONs override en Lua Semana 2: Input en Lua 鈥?Enhanced Input System, bindings de acciones y ejes Semana 3: Delegates y eventos 鈥?crear, bind y dispatch desde Lua Semana 4: Mini-proyecto integrador 鈥?control completo de personaje simplificado en Lua **鉁?Entregable del mes** *Mini-juego 'Lua Controller': personaje navegable en tercera persona cuyo movimiento, animaciones b谩sicas e interacci贸n con objetos est谩n 铆ntegramente en scripts Lua.* |

# **4\. Fase II 鈥?Integraci贸n Intermedia (Meses 4-6)**

La Fase II te lleva al nivel donde puedes construir sistemas de juego reales y reconocibles: inventarios, di谩logos, IA de NPCs y gesti贸n de niveles. Aqu铆 el 茅nfasis pasa de 'hacer que funcione' a 'hacerlo bien'.

| MES 4  Sistemas de Juego: Inventario y Stats |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Dise帽ar una arquitectura de datos limpia en Lua para sistemas de juego Implementar un sistema de inventario completo (items, stack, drag-drop conceptual) Crear un sistema de estad铆sticas de personaje (HP, mana, stamina, atributos) Integrar persistencia de datos con UE5 SaveGame desde Lua Aprender patrones de dise帽o aplicados a Lua: Observer, State, Command **馃搮 Estructura semanal** Semana 1: Arquitectura de datos 鈥?DataAssets, DataTables de UE5 accedidos desde Lua Semana 2: Sistema de inventario 鈥?Item class, contenedores, reglas de negocio en Lua Semana 3: Sistema de stats 鈥?c谩lculos, modificadores, buffs/debuffs con metatables Semana 4: SaveGame 鈥?serializar/deserializar estado de juego en Lua, guardado autom谩tico **鉁?Entregable del mes** *Sistema RPG Base: inventario de 20 slots, 6 estad铆sticas de personaje, guardado/cargado de partida. Todo gestionado por m贸dulos Lua reutilizables.* |

| MES 5  Sistema de Di谩logos e Interfaz de Usuario |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Crear y controlar widgets UMG de UE5 desde scripts Lua Dise帽ar un sistema de di谩logos con 谩rbol de conversaci贸n no lineal Implementar localizaci贸n b谩sica de textos controlada desde Lua Integrar animaciones de UI (fade, slide, scale) activadas desde Lua Construir un HUD din谩mico conectado al sistema de stats del Mes 4 **馃搮 Estructura semanal** Semana 1: UMG desde Lua 鈥?crear widgets, bindear datos, mostrar/ocultar Semana 2: Sistema de di谩logos 鈥?estructura JSON/tabla de conversaci贸n, parser en Lua Semana 3: HUD completo 鈥?barras de vida/mana, minimapa, notifications Lua-driven Semana 4: Polish UI 鈥?transiciones, animaciones, feedback visual, accesibilidad b谩sica **鉁?Entregable del mes** *Demo 'Story Engine': NPC con 15+ l铆neas de di谩logo ramificado, HUD funcional conectado a stats del jugador, sistema de notificaciones. Todo controlado por Lua.* |

| MES 6  Inteligencia Artificial de NPCs |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Entender el sistema de IA de UE5 (Behavior Trees, Blackboard) e integrarlo con Lua Implementar m谩quinas de estado finitas (FSM) para comportamiento de NPCs en Lua puro Crear un sistema de percepci贸n (visi贸n, sonido) controlado desde Lua Dise帽ar comportamientos de combate b谩sico y pathfinding assistido Optimizar scripts de IA para m煤ltiples NPCs simult谩neos **馃搮 Estructura semanal** Semana 1: FSM en Lua 鈥?states, transitions, guards; NPC con 4 estados (idle, patrol, alert, chase) Semana 2: Percepci贸n 鈥?raycasts desde Lua, cone de visi贸n, rango de escucha Semana 3: Behavior Trees \+ Lua 鈥?BTTasks y BTDecorators implementados en Lua via UnLua Semana 4: Combate b谩sico 鈥?sistema de ataque/defensa, flee behavior, grupo de NPCs coordinado **鉁?Entregable del mes** *Demo 'Smart Guards': escenario de sigilo con 5 guardias con IA completa (patrulla, persecuci贸n, alerta, b煤squeda) implementada enteramente en Lua.* |

# **5\. Fase III 鈥?Nivel Avanzado (Meses 7-9)**

La Fase III aborda las disciplinas que distinguen a un desarrollador senior: redes multijugador, optimizaci贸n de rendimiento, creaci贸n de herramientas de editor propias y arquitecturas escalables. Cada tema tiene aplicaci贸n directa en producci贸n real.

| MES 7  Multijugador y Replicaci贸n |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Comprender el modelo cliente-servidor de UE5 y su integraci贸n con Lua Implementar replicaci贸n de propiedades y RPCs (Remote Procedure Calls) desde Lua Crear sistemas multijugador b谩sicos: sincronizaci贸n de posici贸n, estado, inventario Manejar predicci贸n del lado del cliente y reconciliaci贸n desde scripts Lua Testear y depurar escenarios multijugador en local con m煤ltiples instancias de UE5 **馃搮 Estructura semanal** Semana 1: Fundamentos de red UE5 鈥?modelo C/S, authority, NetMode; acceso desde Lua Semana 2: Replicaci贸n de propiedades 鈥?UPROPERTY Replicated en clases Lua-bound Semana 3: RPCs en Lua 鈥?Server, Client, NetMulticast functions desde scripts Semana 4: Mini-juego multijugador 鈥?2 jugadores, sincronizaci贸n de posici贸n y puntuaci贸n **鉁?Entregable del mes** *Mini-juego online 2 jugadores: mec谩nica simple (p.ej. pong 3D o tag) con posici贸n, puntuaci贸n y eventos sincronizados por red v铆a scripts Lua.* |

| MES 8  Optimizaci贸n y Herramientas de Editor |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Profiling de scripts Lua con Unreal Insights y lua-profiler T茅cnicas de optimizaci贸n: pooling de objetos, lazy evaluation, caching en Lua Crear Custom Editor Tools y ventanas de editor con UE5 Slate API desde Lua Automatizar tareas del pipeline de arte y dise帽o con scripts Lua de editor Implementar hot-reload de scripts Lua en tiempo real durante el desarrollo **馃搮 Estructura semanal** Semana 1: Profiling 鈥?Unreal Insights, identificar bottlenecks en Lua, m茅tricas de frame Semana 2: Optimizaci贸n 鈥?object pooling, coroutines con UE5 tasks, memory management Semana 3: Editor Tools 鈥?ventanas custom, property editors, batch operations desde Lua Semana 4: Pipeline automation 鈥?importar assets, generar DataTables, batch testing con Lua **鉁?Entregable del mes** *Toolkit de editor: 3 herramientas custom (generador de niveles procedural, validador de assets, batch renamer) implementadas como plugins Lua de editor.* |

| MES 9  Sistemas Avanzados: Procedural, Shaders y Audio |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Generaci贸n procedural de contenido (niveles, terreno, vegetaci贸n) desde Lua Controlar el sistema de materiales din谩micos y Material Parameter Collections desde Lua Integrar Metasounds y el sistema de audio de UE5 con scripts Lua Implementar un sistema de quests/misiones complejo con Lua Crear un sistema de eventos de juego (Game Events Bus) con publisher/subscriber en Lua **馃搮 Estructura semanal** Semana 1: Generaci贸n procedural 鈥?algoritmos de dungeon, WFC b谩sico implementado en Lua Semana 2: Materiales din谩micos 鈥?MPC, dynamic material instances controlados desde Lua Semana 3: Audio 鈥?Metasound parameters, audio component control, m煤sica adaptativa en Lua Semana 4: Quest system 鈥?objetivos, tracking, rewards, events bus; sistema completo en Lua **鉁?Entregable del mes** *Dungeon Crawler procedural: cada ejecuci贸n genera un nivel 煤nico, con enemigos, audio adaptativo al peligro y sistema de 5 misiones encadenadas. Todo en Lua.* |

# **6\. Fase IV 鈥?Maestr铆a y Proyecto Final (Meses 10-12)**

La Fase IV culmina el plan con la construcci贸n de un juego completo (peque帽o pero pulido), la consolidaci贸n del portfolio profesional y la adopci贸n de flujos de trabajo de estudio/indie profesional. Al terminar, tendr谩s un proyecto demostrable y las habilidades para trabajar en producci贸n real.

| MES 10  Arquitectura de Proyecto Real y Dise帽o de Sistemas |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Dise帽ar la arquitectura completa del juego final usando patrones probados en producci贸n Implementar un Game Framework robusto en Lua (GameMode, GameState, PlayerState) Crear un sistema de configuraci贸n y balance de juego data-driven desde Lua Dise帽ar y documentar APIs internas para sistemas Lua reutilizables Aplicar TDD (Test Driven Development) b谩sico a m贸dulos Lua cr铆ticos **馃搮 Estructura semanal** Semana 1: Dise帽o del juego final 鈥?GDD simplificado, lista de sistemas necesarios, scope Semana 2: Game Framework Lua 鈥?GameMode, flow de sesiones, transiciones entre niveles Semana 3: Data-driven design 鈥?JSON/CSV como fuente de verdad para balance; hot-reload en dev Semana 4: Testing 鈥?framework de tests unitarios para Lua, integraci贸n con CI b谩sico **鉁?Entregable del mes** *Documento de Arquitectura del Juego Final \+ Game Framework funcional en Lua con al menos 3 sistemas core integrados y con tests automatizados.* |

| MES 11  Producci贸n del Juego Final |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Construir el juego completo integrando todos los sistemas aprendidos Aplicar polish de gameplay: juice, game feel, feedback visual y sonoro Implementar men煤 principal, opciones, pausa y pantalla de game over Realizar playtesting y ajustar balance de juego desde datos Lua Optimizar para un target de 60fps estable en hardware de gama media **馃搮 Estructura semanal** Semana 1: Construcci贸n core loop 鈥?mec谩nica principal jugable de principio a fin Semana 2: Contenido 鈥?al menos 3 niveles, 3 tipos de enemigos, 5 armas/habilidades Semana 3: Menus y UX 鈥?flujo completo de UI, settings, save/load, localizaci贸n EN/ES Semana 4: Polish y optimizaci贸n 鈥?particle effects, audio, profiling final, bug fixing **鉁?Entregable del mes** *Juego Completo Alpha: vertical slice jugable con inicio-medio-fin, publicado en itch.io o similar para feedback externo.* |

| MES 12  Portfolio, Documentaci贸n y Comunidad |
| :---- |
| 鈴?4 semanas 路 \~60 horas |
| **馃幆 Objetivos** Crear una librer铆a personal de m贸dulos Lua reutilizables (tu 'Lua Toolkit para UE5') Documentar el c贸digo con EmmyLua annotations para autocompletado en VS Code Escribir un post t茅cnico sobre arquitectura Lua en UE5 (blog, dev.to, GameDev.net) Contribuir a un proyecto open source o crear un plugin p煤blico en GitHub Preparar el portfolio con casos de estudio detallados para cada proyecto del plan **馃搮 Estructura semanal** Semana 1: Lua Toolkit 鈥?refactorizar los mejores m贸dulos del a帽o en una librer铆a reutilizable Semana 2: Documentaci贸n 鈥?EmmyLua annotations completas, README detallados, wiki interna Semana 3: Contenido p煤blico 鈥?art铆culo t茅cnico, v铆deo devlog, release p煤blico en itch.io/GitHub Semana 4: Portfolio final 鈥?p谩gina web o PDF con 5 proyectos documentados \+ c贸digo de GitHub **鉁?Entregable del mes** *Portfolio profesional completo: 5 proyectos documentados, librer铆a Lua open source con README completo, art铆culo t茅cnico publicado, juego publicado en itch.io.* |

# **7\. Recursos de Aprendizaje Recomendados**

## **7.1 Documentaci贸n Oficial**

* Lua 5.4 Reference Manual 鈥?lua.org/manual/5.4/

* Unreal Engine 5 Documentation 鈥?docs.unrealengine.com

* UnLua GitHub Wiki 鈥?github.com/Tencent/UnLua/wiki

* EmmyLua Annotations Spec 鈥?emmylua.github.io

## **7.2 Libros Recomendados**

* Programming in Lua (4陋 ed.) 鈥?Roberto Ierusalimschy (autor de Lua)

* Lua 5.3 Quick Start Guide 鈥?Duncan Byne

* Game AI Pro (Vol. 1-3) 鈥?para los meses de IA (cap铆tulos de FSM y BT)

* Game Programming Patterns 鈥?Robert Nystrom (gratuito online) para patrones en Mes 4-6

## **7.3 Canales y Comunidades**

* Unreal Engine YouTube 鈥?tutoriales oficiales con actualizaciones constantes

* Unreal Source Discord 鈥?comunidad de desarrolladores UE5 muy activa

* Lua Users Wiki 鈥?lua-users.org/wiki para snippets y discusiones

* r/unrealengine y r/gamedev 鈥?feedback de comunidad y showcase

## **7.4 Herramientas de Pr谩ctica Adicional**

* L脰VE2D 鈥?framework Lua 2D; ideal para practicar Lua puro en el Mes 1 sin UE5

* Defold Engine 鈥?motor oficial con Lua; ver perspectiva alternativa del lenguaje

* Luaunit 鈥?framework de testing para Lua; usado en el Mes 10

# **8\. Sistema de Seguimiento y M茅tricas**

Mantener la motivaci贸n durante 12 meses requiere medir el progreso de forma tangible. Usa estas m茅tricas para evaluar tu avance cada semana:

| Checklist Semanal de Progreso 鈽? 驴Complet茅 las 14 horas de estudio planificadas esta semana? 鈽? 驴Cre茅 o avanc茅 en el entregable del mes? 鈽? 驴Agregu茅 al menos 3 entradas a mis notas personales? 鈽? 驴Hice commit en GitHub al menos 3 veces? 鈽? 驴Resolv铆 al menos 1 problema nuevo que no hab铆a encontrado antes? |
| :---- |

## **8.1 Se帽ales de Que Vas Bien**

* Mes 3: Puedes crear un Actor en UE5 controlado por Lua sin consultar tutoriales

* Mes 6: Puedes implementar un sistema de juego completo en menos de 3 horas

* Mes 9: Puedes leer c贸digo Lua ajeno y entender su arquitectura en minutos

* Mes 12: Puedes estimar con precisi贸n el tiempo para implementar un feature Lua en UE5

## **8.2 Plan de Contingencia**

Si en alg煤n momento vas retrasado respecto al plan:

* Retraso de 1 semana: Reduce los subproyectos opcionales, mant茅n el entregable principal

* Retraso de 2 semanas: Extiende el mes un 50% (3 semanas en vez de 4 para ese m贸dulo)

* Retraso de m谩s de 1 mes: Revisa el scope del entregable, prioriza depth over breadth

* No penalices la calidad de comprensi贸n para mantener el calendario; el plan es gu铆a, no ley

| Consejo Final El mejor plan de estudio es el que realmente sigues. Adapta los meses a tu ritmo real, celebra cada entregable completado y recuerda: 2 horas consistentes durante 12 meses superan con creces a maratones espor谩dicos. 隆Mucho 茅xito en tu camino con Lua y UE5\! |
| :---- |

*鈥?Fin del Plan de Estudio 鈥?