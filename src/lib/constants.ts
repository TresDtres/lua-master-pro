import { Course, Phase, Module } from "@/types";

export const COURSE_DATA: Course = {
  id: "lua-ue5-12months",
  title: "Lua Scripting con Unreal Engine 5.6",
  description:
    "12 meses · 2 horas diarias · De cero a experto en Lua con UE5",
  duration: "12 meses",
  totalHours: 730,
  phases: [
    {
      id: "phase-1",
      phaseNumber: 1,
      title: "Fundamentos Sólidos",
      description:
        "Lua base + entorno UE5 + primeros scripts",
      duration: "Meses 1-3",
      modules: [
        {
          id: "mes-01",
          monthNumber: 1,
          title: "Lua desde Cero",
          description:
            "Sintaxis básica, tipos de datos, operadores y control de flujo",
          difficulty: "beginner",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Entender la sintaxis y semántica de Lua 5.4",
            "Dominar tipos de datos y operadores",
            "Manejar funciones, closures y módulos",
            "Comprender tablas como estructura de datos",
            "Escribir scripts Lua standalone",
          ],
          weeklyStructure: [
            "Semana 1: Sintaxis básica – variables, tipos, operadores",
            "Semana 2: Control de flujo – if, while, for",
            "Semana 3: Funciones – definición, parámetros variadicos",
            "Semana 4: Tablas – arrays, diccionarios, metatables",
          ],
          deliverable:
            "Scripts Lua standalone: calculadora, gestor de inventario simple, sistema de puntuación",
          lessons: [],
        },
        {
          id: "mes-02",
          monthNumber: 2,
          title: "Orientación a Objetos en Lua y Primeros Pasos en UE5",
          description: "POO con Lua + Setup UnLua + Primer Actor",
          difficulty: "beginner",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Implementar POO con metatables en Lua",
            "Instalar y configurar UnLua plugin",
            "Crear primer Actor controlado por Lua",
            "Entender ciclo BeginPlay/Tick/EndPlay",
            "Acceder a propiedades de Actores desde Lua",
          ],
          weeklyStructure: [
            "Semana 1: POO en Lua – clases, herencia, polimorfismo",
            "Semana 2: Setup UnLua – instalación y configuración",
            "Semana 3: Ciclo de vida – BeginPlay, Tick, EndPlay",
            "Semana 4: Interacciones básicas – mover actores, cambiar materiales",
          ],
          deliverable:
            "Prototipo 'Hello Unreal World': 10 cubos controlados 100% por scripts Lua",
          lessons: [],
        },
        {
          id: "mes-03",
          monthNumber: 3,
          title: "Comunicación entre Blueprints y Lua",
          description: "Binding BP-Lua, Input System, Delegates",
          difficulty: "beginner",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Exponer funciones Lua al sistema de Blueprints",
            "Llamar funciones Blueprint y C++ desde Lua",
            "Trabajar con Input System desde Lua",
            "Usar delegates y events",
            "Gestionar ciclo de nivel desde Lua",
          ],
          weeklyStructure: [
            "Semana 1: Binding BP-Lua – UFUNCTION export",
            "Semana 2: Input en Lua – Enhanced Input System",
            "Semana 3: Delegates y eventos – crear, bind, dispatch",
            "Semana 4: Mini-proyecto integrador – personaje en Lua",
          ],
          deliverable:
            "Mini-juego 'Lua Controller': personaje navegable con movimiento, animaciones e interacciones en Lua",
          lessons: [],
        },
      ],
    },
    {
      id: "phase-2",
      phaseNumber: 2,
      title: "Integración Intermedia",
      description: "Sistemas de juego, diálogos, IA de NPCs",
      duration: "Meses 4-6",
      modules: [
        {
          id: "mes-04",
          monthNumber: 4,
          title: "Sistemas de Juego: Inventario y Stats",
          description: "Arquitectura de datos, inventario, estadísticas",
          difficulty: "intermediate",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Diseñar arquitectura de datos limpia en Lua",
            "Implementar sistema de inventario completo",
            "Crear sistema de estadísticas de personaje",
            "Integrar persistencia con SaveGame",
            "Aprender patrones de diseño",
          ],
          weeklyStructure: [
            "Semana 1: Arquitectura de datos – DataAssets, DataTables",
            "Semana 2: Sistema de inventario – items, contenedores",
            "Semana 3: Sistema de stats – cálculos, modificadores",
            "Semana 4: SaveGame – serializar/deserializar estado",
          ],
          deliverable:
            "Sistema RPG Base: inventario de 20 slots, 6 estadísticas, guardado/cargado de partida",
          lessons: [],
        },
        {
          id: "mes-05",
          monthNumber: 5,
          title: "Sistema de Diálogos e Interfaz de Usuario",
          description: "UMG desde Lua, diálogos, localización",
          difficulty: "intermediate",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Crear y controlar widgets UMG desde Lua",
            "Diseñar sistema de diálogos no lineal",
            "Implementar localización de textos",
            "Integrar animaciones de UI",
            "Construir HUD dinámico",
          ],
          weeklyStructure: [
            "Semana 1: UMG desde Lua – crear widgets, bindear datos",
            "Semana 2: Sistema de diálogos – árbol de conversación",
            "Semana 3: HUD completo – barras, minimapa, notificaciones",
            "Semana 4: Polish UI – transiciones, animaciones",
          ],
          deliverable:
            "Demo 'Story Engine': NPC con 15+ líneas de diálogo, HUD funcional, sistema de notificaciones",
          lessons: [],
        },
        {
          id: "mes-06",
          monthNumber: 6,
          title: "Inteligencia Artificial de NPCs",
          description: "FSM, máquinas de estado, percepción, combate",
          difficulty: "intermediate",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Entender sistema de IA de UE5",
            "Implementar máquinas de estado finitas (FSM)",
            "Crear sistema de percepción",
            "Diseñar comportamientos de combate",
            "Optimizar scripts de IA",
          ],
          weeklyStructure: [
            "Semana 1: FSM en Lua – states, transitions, guards",
            "Semana 2: Percepción – raycasts, cono de visión",
            "Semana 3: Behavior Trees – BTTasks en Lua",
            "Semana 4: Combate básico – ataque, defensa, coordinación",
          ],
          deliverable:
            "Demo 'Smart Guards': escenario de sigilo con 5 guardias IA completa en Lua",
          lessons: [],
        },
      ],
    },
    {
      id: "phase-3",
      phaseNumber: 3,
      title: "Nivel Avanzado",
      description: "Multijugador, optimización, herramientas de editor",
      duration: "Meses 7-9",
      modules: [
        {
          id: "mes-07",
          monthNumber: 7,
          title: "Multijugador y Replicación",
          description: "Modelo cliente-servidor, RPCs, sincronización",
          difficulty: "advanced",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Comprender modelo cliente-servidor de UE5",
            "Implementar replicación de propiedades",
            "Crear sistemas multijugador básicos",
            "Manejar predicción de cliente",
            "Testear escenarios multijugador",
          ],
          weeklyStructure: [
            "Semana 1: Fundamentos de red UE5 – modelo C/S, authority",
            "Semana 2: Replicación de propiedades – UPROPERTY Replicated",
            "Semana 3: RPCs en Lua – Server, Client, NetMulticast",
            "Semana 4: Mini-juego multijugador – 2 jugadores",
          ],
          deliverable:
            "Mini-juego online 2 jugadores: sincronización de posición y puntuación",
          lessons: [],
        },
        {
          id: "mes-08",
          monthNumber: 8,
          title: "Optimización y Herramientas de Editor",
          description: "Profiling, pooling, custom editor tools",
          difficulty: "advanced",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Profiling de scripts Lua",
            "Aplicar técnicas de optimización",
            "Crear Custom Editor Tools",
            "Automatizar tareas del pipeline",
            "Implementar hot-reload de scripts",
          ],
          weeklyStructure: [
            "Semana 1: Profiling – Unreal Insights, bottlenecks",
            "Semana 2: Optimización – pooling, coroutines, memory",
            "Semana 3: Editor Tools – ventanas custom, property editors",
            "Semana 4: Pipeline automation – batch operations",
          ],
          deliverable:
            "Toolkit de editor: generador de niveles, validador de assets, batch renamer",
          lessons: [],
        },
        {
          id: "mes-09",
          monthNumber: 9,
          title: "Sistemas Avanzados: Procedural, Shaders y Audio",
          description: "Generación procedural, materiales dinámicos, audio",
          difficulty: "advanced",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Generación procedural de contenido",
            "Controlar materiales dinámicos",
            "Integrar Metasounds y audio",
            "Implementar sistema de quests",
            "Crear Event Bus de juego",
          ],
          weeklyStructure: [
            "Semana 1: Generación procedural – dungeon, WFC",
            "Semana 2: Materiales dinámicos – MPC, instances",
            "Semana 3: Audio – Metasound, música adaptativa",
            "Semana 4: Quest system – objetivos, tracking, rewards",
          ],
          deliverable:
            "Dungeon Crawler procedural: generación dinámica, enemigos, audio, 5 misiones",
          lessons: [],
        },
      ],
    },
    {
      id: "phase-4",
      phaseNumber: 4,
      title: "Maestría y Proyecto Final",
      description: "Arquitectura real, juego completo, portfolio",
      duration: "Meses 10-12",
      modules: [
        {
          id: "mes-10",
          monthNumber: 10,
          title: "Arquitectura de Proyecto Real y Diseño de Sistemas",
          description:
            "Game Framework, data-driven design, testing",
          difficulty: "expert",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Diseñar arquitectura completa del juego",
            "Implementar Game Framework robusto",
            "Crear sistema de configuración data-driven",
            "Diseñar APIs internas reutilizables",
            "Aplicar TDD a módulos críticos",
          ],
          weeklyStructure: [
            "Semana 1: Diseño del juego final – GDD, scope",
            "Semana 2: Game Framework Lua – GameMode, flow",
            "Semana 3: Data-driven design – JSON/CSV, hot-reload",
            "Semana 4: Testing – framework de tests unitarios",
          ],
          deliverable:
            "Documento de Arquitectura + Game Framework funcional con 3 sistemas core y tests",
          lessons: [],
        },
        {
          id: "mes-11",
          monthNumber: 11,
          title: "Producción del Juego Final",
          description: "Construcción completa, content, polish, optimización",
          difficulty: "expert",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Construir juego completo",
            "Aplicar polish de gameplay",
            "Implementar menú y UI",
            "Realizar playtesting y ajustes",
            "Optimizar para 60fps",
          ],
          weeklyStructure: [
            "Semana 1: Construcción core loop – mecánica principal",
            "Semana 2: Contenido – 3 niveles, enemigos, armas",
            "Semana 3: Menus y UX – flujo completo, localización",
            "Semana 4: Polish y optimización – particles, audio, profiling",
          ],
          deliverable:
            "Juego Completo Alpha: vertical slice jugable, lanzado en itch.io",
          lessons: [],
        },
        {
          id: "mes-12",
          monthNumber: 12,
          title: "Portfolio, Documentación y Comunidad",
          description: "Librería Lua, documentación, contenido público",
          difficulty: "expert",
          duration: "4 semanas · 60 horas",
          objectives: [
            "Crear librería personal de módulos Lua reutilizables",
            "Documentar código con EmmyLua annotations",
            "Escribir post técnico sobre Lua en UE5",
            "Contribuir a proyectos open source",
            "Preparar portfolio profesional",
          ],
          weeklyStructure: [
            "Semana 1: Lua Toolkit – refactorizar módulos",
            "Semana 2: Documentación – EmmyLua, READMEs",
            "Semana 3: Contenido público – artículo, vídeo, release",
            "Semana 4: Portfolio final – 5 proyectos documentados",
          ],
          deliverable:
            "Portfolio profesional: 5 proyectos, librería open source, artículo publicado",
          lessons: [],
        },
      ],
    },
  ],
};

export const FREE_TIER_FEATURES = [
  "Acceso a Módulos 1-3 (Fundamentos)",
  "Hasta 5 ejercicios por semana",
  "Chat de IA con limite (100 mensajes/mes)",
  "Editor de Lua online",
];

export const PREMIUM_TIER_FEATURES = [
  "Acceso a TODO el contenido (12 meses)",
  "Ejercicios y proyectos ilimitados",
  "Chat de IA sin limites con contexto de código",
  "Editor de Lua avanzado con auto-complete",
  "Mentoría grupal bi-semanal en vivo",
  "Comunidad privada de estudiantes",
  "Certificado de finalización profesional",
  "Acceso a recursos y herramientas premium",
];

export const PRICING = {
  monthly: { free: 0, premium: 29.99 },
  annually: { free: 0, premium: 199.99 },
};
