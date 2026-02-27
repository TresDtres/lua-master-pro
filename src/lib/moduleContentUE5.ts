// src/lib/moduleContentUE5.ts
// Módulos 6-12: Unreal Engine 5 Development

export const UE5_MODULES = {
  "mes-06": {
    id: "mes-06",
    title: "Mes 06 - Introducción a Unreal Engine 5",
    description: "Primeros pasos en desarrollo con UE5 y programación visual",
    overview:
      "Unreal Engine 5 es el motor de juegos más poderoso del mundo. Este módulo te introduce a la interfaz, herramientas fundamentales, y cómo crear tu primer proyecto.",
    learningObjectives: [
      "Instalar y configurar Unreal Engine 5",
      "Entender la interfaz de UE5",
      "Crear tu primer proyecto",
      "Navegar la vista 3D",
      "Entender Assets y Content Browser",
    ],
    lessons: [
      {
        id: "l6-intro-ue5",
        title: "Introducción a Unreal Engine 5",
        description: "¿Qué es UE5 y por qué es importante?",
        content:
          "Unreal Engine 5 es el motor de juegos utilizado para crear juegos AAA profesionales. Soporta múltiples plataformas y ofrece herramientas avanzadas para programación visual y código C++.",
        keyPoints: [
          "UE5 es gratuito y de código abierto",
          "Soporta Linux, Windows, Mac, móviles, consolas",
          "Blueprint es programación visual",
          "C++ para lógica más compleja",
          "UE Marketplace ofrece Assets",
        ],
        codeExample: {
          title: "Crear un Actor en C++",
          code: `// En Visual Studio o Rider
UCLASS()
class YOURPROJECT_API AMyActor : public AActor
{
    GENERATED_BODY()

public:
    AMyActor();

    virtual void BeginPlay() override;
    virtual void Tick(float DeltaTime) override;
};`,
          language: "cpp",
        },
      },
      {
        id: "l6-interface",
        title: "Interfaz de UE5",
        description: "Conocer la interfaz principal",
        content:
          "La interfaz de UE5 está dividida en varias áreas. Viewport (vista 3D), Content Browser (assets), Outliner (objetos de la escena), Details (propiedades), y más.",
        keyPoints: [
          "Viewport: Vista 3D principal",
          "Content Browser: Explorador de assets",
          "Outliner: Árbol de objetos",
          "Details Panel: Propiedades de objetos",
          "Output Log: Mensajes de debug",
        ],
        codeExample: {
          title: "Desplegable de Debug",
          code: `// En Blueprint o C++
void AMyActor::BeginPlay()
{
    Super::BeginPlay();
    
    // Mensaje en output
    UE_LOG(LogClass, Warning, TEXT("¡Hola, UE5!"));
}`,
          language: "cpp",
        },
      },
      {
        id: "l6-first-level",
        title: "Crear tu Primer Nivel",
        description: "Construir un nivel simple",
        content:
          "En UE5, los 'niveles' son tus mapas. Aquí colocas objetos, enemigos, cámaras, y construyes tu mundo.",
        keyPoints: [
          "Levels se guardan como .umap",
          "Arrastra Assets al Viewport para colocar objetos",
          "Usa herramientas de movimiento (W, E, R)",
          "La posición se muestra en el Header",
          "Guarda frecuentemente (Ctrl+S)",
        ],
        codeExample: {
          title: "Crear un Blueprintable Actor",
          code: `UCLASS(Blueprintable)
class YOURPROJECT_API AGameActor : public AActor
{
    GENERATED_BODY()

public:
    UPROPERTY(BlueprintReadWrite, EditAnywhere)
    class UStaticMeshComponent* MeshComponent;

    AGameActor();

    virtual void BeginPlay() override;
};`,
          language: "cpp",
        },
      },
      {
        id: "l6-assets",
        title: "Trabajar con Assets",
        description: "Importar y usar assets en tu proyecto",
        content:
          "Los Assets son modelos 3D, texturas, sonidos, etc. El Content Browser es donde los organizas y accedes.",
        keyPoints: [
          "Importa modelos desde Blender o Maya",
          "Luego formatos: FBX, 3DS, OBJ",
          "Organiza en carpetas lógicas",
          "Etiqueta assets para fácil búsqueda",
          "Reutiliza assets existentes",
        ],
        codeExample: {
          title: "Cargar Asset en runtime",
          code: `// Cargar modelo en C++
FString AssetPath = TEXT("/Game/Assets/Models/Character");
UBlueprint* Blueprint = LoadObject<UBlueprint>(nullptr, *AssetPath);

if (Blueprint) {
    UClass* BPClass = Blueprint->GetBlueprintClass();
    AActor* NewActor = GetWorld()->SpawnActor<AActor>(BPClass);
}`,
          language: "cpp",
        },
      },
    ],
    resources: [
      {
        title: "UE5 Official Documentation",
        url: "https://docs.unrealengine.com/5.0/en-US/",
        type: "documentation",
      },
      {
        title: "Getting Started with UE5",
        url: "https://www.youtube.com/watch?v=28EQFD8-N2Q",
        type: "video",
      },
    ],
  },
  "mes-07": {
    id: "mes-07",
    title: "Mes 07 - Blueprint y Programación Visual",
    description: "Domina Blueprint para crear lógica sin código C++",
    overview:
      "Blueprint es el sistema de programación visual de UE5. Permite crear lógica compleja sin escribir una sola línea de código.",
    learningObjectives: [
      "Entender nodos Blueprint",
      "Crear Blueprints funcionales",
      "Usar variables y bucles",
      "Implementar eventos",
      "Comunicación entre Blueprints",
    ],
    lessons: [
      {
        id: "l7-blueprint-basics",
        title: "Fundamentos de Blueprint",
        description: "Conceptos básicos de Blueprint",
        content:
          "Blueprint funciona con nodos conectados. Cada nodo representa una acción o decisión. Los datos fluyen entre nodos a través de cables.",
        keyPoints: [
          "Nodos son unidades de lógica",
          "Cables conectan nodos",
          "Pines son entrada/salida",
          "Colores indican tipos de datos",
          "Comentarios documentan lógica",
        ],
        codeExample: {
          title: "Evento BeginPlay",
          code: `// En Blueprint Visual Script:
// Event BeginPlay
// -> Print String ("Hola, mundo!")
// -> Delay (2.0 segundos)
// -> Destroy Actor (Self)

// Equivalente en C++:
void AMyActor::BeginPlay()
{
    Super::BeginPlay();
    UE_LOG(LogClass, Warning, TEXT("Hola, mundo!"));
    GetWorldTimerManager().SetTimer(TimerHandle, 
        this, &AMyActor::Destroy, 2.0f, false);
}`,
          language: "cpp",
        },
      },
      {
        id: "l7-variables",
        title: "Variables en Blueprint",
        description: "Crear y usar variables",
        content:
          "Las variables almacenan datos. En Blueprint, puedes crear variables de diferentes tipos y editarlas en el editor.",
        keyPoints: [
          "Haz clic '+' en My Blueprint para crear variable",
          "Elige tipo: Integer, Float, String, etc.",
          "Checkbox 'Compilable' para usarla",
          "Usa Get/Set para acceso",
          "Inicializa en Construction Script",
        ],
        codeExample: {
          title: "Variables en Blueprint",
          code: `UPROPERTY(BlueprintReadWrite, EditAnywhere)
int32 HealthPoints = 100;

UPROPERTY(BlueprintReadWrite, EditAnywhere)
FString PlayerName = "Hero";

UPROPERTY(BlueprintReadOnly)
bool bIsAlive = true;`,
          language: "cpp",
        },
      },
      {
        id: "l7-flow-control",
        title: "Control de Flujo",
        description: "If, Loops, y decisiones",
        content:
          "Controla el flujo de ejecución con if/else, bucles for, bucles while. En Blueprint, estos son nodos visuales.",
        keyPoints: [
          "Branch node = if/else",
          "ForLoop node = for loop",
          "WhileLoop node = while loop",
          "Flip Flop alterna entre opciones",
          "Encienda con True/False",
        ],
        codeExample: {
          title: "If/Else en Blueprint",
          code: `if (Health <= 0) {
    Die();
} else if (Health < 25) {
    PlayCriticalSound();
} else {
    // Estamos bien
}

// En Blueprint: Branch (Condition) conecta a True y False`,
          language: "cpp",
        },
      },
      {
        id: "l7-events",
        title: "Eventos en Blueprint",
        description: "Crear y disparar eventos personalizados",
        content:
          "Los eventos son acciones que se disparan en momentos específicos. Puedes crear eventos personalizados.",
        keyPoints: [
          "Event BeginPlay dispara al iniciar",
          "Event Tick dispara cada frame",
          "Event Destroyed dispara al destruir",
          "Crea eventos personalizados con +",
          "Call (Dispara) evento desde otro nodo",
        ],
        codeExample: {
          title: "Evento personalizado",
          code: `// En Blueprint:
// Custom Event: OnPlayerDeath
// -> Bind al evento
// -> Llama desde otro lado con "Call OnPlayerDeath"

// En C++:
DECLARE_EVENT(AMyCharacter, FOnPlayerDeath)
FOnPlayerDeath OnPlayerDeath;

// Disparar:
OnPlayerDeath.Broadcast();`,
          language: "cpp",
        },
      },
    ],
    resources: [
      {
        title: "Blueprint Documentation",
        url: "https://docs.unrealengine.com/5.0/en-US/blueprints-visual-scripting-in-unreal-engine/",
        type: "documentation",
      },
      {
        title: "Blueprint Tutorial Series",
        url: "https://www.youtube.com/watch?v=1CkNkC3fN8s",
        type: "video",
      },
    ],
  },
  "mes-08": {
    id: "mes-08",
    title: "Mes 08 - Personajes y Entrada",
    description: "Crear personajes controlables y sistemas de entrada",
    overview:
      "Aprende a crear personajes que los jugadores pueden controlar. Implementa movimiento, salto, rotación de cámara.",
    learningObjectives: [
      "Usar Character Blueprint",
      "Implementar control de movimiento",
      "Configurar controles",
      "Animar movimiento",
      "Implementar cámara siguiendo al personaje",
    ],
    lessons: [
      {
        id: "l8-character-basics",
        title: "Fundamentos de Personajes",
        description: "Crear un personaje controlable",
        content:
          "En UE5, los Personajes son Pawns especiales con capacidad de movimiento. Incluyen collisión, animación, y entrada.",
        keyPoints: [
          "Character clase base para personajes jugables",
          "CharacterMovementComponent maneja movimiento",
          "Capsule collision para el cuerpo",
          "Skeletal mesh para animaciones",
          "Camera para vista primera/tercera persona",
        ],
        codeExample: {
          title: "Crear un Character en C++",
          code: `UCLASS()
class YOURPROJECT_API AMyCharacter : public ACharacter
{
    GENERATED_BODY()

public:
    AMyCharacter();

    virtual void BeginPlay() override;
    virtual void SetupPlayerInputComponent(UInputComponent* Input) override;
};`,
          language: "cpp",
        },
      },
      {
        id: "l8-input-handling",
        title: "Manejo de Entrada",
        description: "Detectar entrada del jugador",
        content:
          "Los controles (WASD, mouse, etc.) se procesan en SetupPlayerInputComponent.",
        keyPoints: [
          "SetupPlayerInputComponent configura entrada",
          "BindAxis para entrada analógica",
          "BindAction para botones",
          "MappingContext para esquema de controles",
          "Soporta teclado, mouse, gamepad",
        ],
        codeExample: {
          title: "Entrada básica",
          code: `void AMyCharacter::SetupPlayerInputComponent(class UInputComponent* I)
{
    Super::SetupPlayerInputComponent(I);

    // Movimiento WASD
    I->BindAxis(TEXT("MoveForward"), this, 
        &AMyCharacter::MoveForward);
    I->BindAxis(TEXT("MoveRight"), this, 
        &AMyCharacter::MoveRight);

    // Saltar
    I->BindAction(TEXT("Jump"), IE_Pressed, 
        this, &ACharacter::Jump);
}`,
          language: "cpp",
        },
      },
      {
        id: "l8-animation",
        title: "Animación de Personaje",
        description: "Crear animaciones de movimiento",
        content:
          "Las animaciones dan vida al personaje. Estado idle, correr, saltar, caer.",
        keyPoints: [
          "Animation Blueprint controla animaciones",
          "State machine define transiciones",
          "Blend spaces interpolan entre poses",
          "Animation montages para acciones especiales",
          "Montage playback sincroniza con código",
        ],
        codeExample: {
          title: "Reproducir animación",
          code: `// En Blueprint o C++:
UAnimMontage* AttackMontage = 
    LoadObject<UAnimMontage>(nullptr, AttackMontageAsset);

if (GetMesh()->GetAnimInstance()) {
    GetMesh()->GetAnimInstance()
        ->Montage_Play(AttackMontage);
}`,
          language: "cpp",
        },
      },
      {
        id: "l8-camera",
        title: "Sistema de Cámara",
        description: "Implementar cámara siguiendo personaje",
        content:
          "La cámara sigue al personaje y responde a la entrada del mouse.",
        keyPoints: [
          "Spring arm permite distancia de cámara",
          "Look input rota la cámara",
          "Freelook permite rotación manual",
          "Lag suaviza movimiento",
          "Collision evita pasar a través de objetos",
        ],
        codeExample: {
          title: "Configurar cámara",
          code: `// En Constructor
CameraBoom = CreateDefaultSubobject<USpringArmComponent>(
    TEXT("CameraBoom"));
CameraBoom->SetupAttachment(RootComponent);
CameraBoom->TargetArmLength = 400.0f;
CameraBoom->bUsePawnControlRotation = true;

FollowCamera = CreateDefaultSubobject<UCameraComponent>(
    TEXT("FollowCamera"));
FollowCamera->SetupAttachment(CameraBoom);`,
          language: "cpp",
        },
      },
    ],
    resources: [
      {
        title: "Character Documentation",
        url: "https://docs.unrealengine.com/5.0/en-US/API/Runtime/Engine/GameFramework/ACharacter/",
        type: "documentation",
      },
      {
        title: "Input System",
        url: "https://docs.unrealengine.com/5.0/en-US/input-in-unreal-engine/",
        type: "documentation",
      },
    ],
  },
};

export default UE5_MODULES;
