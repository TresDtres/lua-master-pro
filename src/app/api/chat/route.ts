// API Route: Chat with Claude Integration
import { NextRequest, NextResponse } from "next/server";
import { generateClaudeResponse } from "@/lib/claude";

// Mock database for conversation history (in production, use Supabase)
const conversationHistory: Record<string, Array<{ role: string; content: string }>> = {};

const ALLOWED_TOPICS = [
  "lua",
  "roblox",
  "unreal engine",
  "ue5",
  "scripting",
  "programación",
  "código",
  "función",
  "tabla",
  "variable",
  "loop",
  "if",
  "while",
  "for",
  "print",
  "string",
  "number",
  "debug",
  "coroutine",
  "metatable",
  "api",
  "bloque",
  "juego",
  "engine",
  "error",
  "concat",
];

function isTopicAllowed(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return ALLOWED_TOPICS.some(topic => lowerMessage.includes(topic));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, userId, moduleId, useAI = true } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Validate topic
    if (!isTopicAllowed(message)) {
      return NextResponse.json({
        success: false,
        response: "⚠️ Solo puedo responder preguntas sobre Lua, Roblox, Unreal Engine 5 y programación. Por favor, haz una pregunta relacionada con el curso.",
        isOnTopic: false,
      });
    }

    // Initialize conversation history for user if needed
    const sessionKey = userId || "anonymous";
    if (!conversationHistory[sessionKey]) {
      conversationHistory[sessionKey] = [];
    }

    try {
      let response: string;

      if (useAI) {
        // Use Claude API if available
        response = await generateClaudeResponse(message, {
          moduleId,
        }, conversationHistory[sessionKey]);
      } else {
        // Fallback to mock response
        response = generateMockResponse(message);
      }

      // Add to conversation history
      conversationHistory[sessionKey].push({
        role: "user",
        content: message,
      });
      conversationHistory[sessionKey].push({
        role: "assistant",
        content: response,
      });

      // Keep only last 20 messages to save memory
      if (conversationHistory[sessionKey].length > 40) {
        conversationHistory[sessionKey] = conversationHistory[sessionKey].slice(-40);
      }

      return NextResponse.json({
        success: true,
        response,
        isOnTopic: true,
        conversationLength: conversationHistory[sessionKey].length,
      });
    } catch (claudeError) {
      console.error("Claude API error, falling back to mock:", claudeError);

      // Fallback to mock response
      const mockResponse = generateMockResponse(message);
      conversationHistory[sessionKey].push({
        role: "user",
        content: message,
      });
      conversationHistory[sessionKey].push({
        role: "assistant",
        content: mockResponse,
      });

      return NextResponse.json({
        success: true,
        response: mockResponse,
        isOnTopic: true,
        usingFallback: true,
      });
    }
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateMockResponse(message: string): string {
  const lowerInput = message.toLowerCase();

  if (lowerInput.includes("variable")) {
    return "En Lua, las variables se declaran con 'local':\n\nlocal nombre = 'Juan'\nlocal edad = 25\nlocal esAprobado = true\n\nUsa 'local' siempre para limitar alcance y evitar variables globales.";
  }
  if (lowerInput.includes("tabla")) {
    return "Las tablas en Lua son estructuras versátiles:\n\nlocal persona = {\n  nombre = 'Juan',\n  edad = 25\n}\n\nAcceso: persona.nombre\nLongitud: #tabla";
  }
  if (lowerInput.includes("función")) {
    return "Sintaxis de funciones:\n\nfunction saludar(nombre)\n  return 'Hola ' .. nombre\nend\n\nprint(saludar('Juan')) -- Output: Hola Juan";
  }
  if (lowerInput.includes("loop") || lowerInput.includes("for")) {
    return "Loops en Lua:\n\n-- For numérico\nfor i = 1, 10 do print(i) end\n\n-- While\nwhile x < 10 do x = x + 1 end";
  }
  if (lowerInput.includes("error")) {
    return "Para debugging:\n\nprint() - Imprime valores\nwarn() - Advertencias (amarillo)\nerror() - Detiene ejecución\n\nTip: Usa warn() en Roblox para mensajes de debug.";
  }
  if (lowerInput.includes("roblox")) {
    return "Roblox características:\n\n- Workspace: Contenedor principal\n- Players: Jugadores\n- Script vs LocalScript\n- RemoteEvents y RemoteFunctions\n\n¿Necesitas ayuda con algo específico?";
  }
  if (lowerInput.includes("unreal") || lowerInput.includes("ue5")) {
    return "En UE5, Lua es ideal para:\n\n- Scripting rápido\n- Lógica de juegos\n- Prototipos\n- Integración con C++\n\n¿Qué aspecto de UE5 necesitas?";
  }
  if (lowerInput.includes("concat")) {
    return "Concatenación en Lua con ..:\n\nlocal saludo = 'Hola ' .. 'Mundo'\nlocal info = 'Edad: ' .. 25\n\nEste operador funciona también con números convertidos a strings.";
  }

  return "Gracias por tu pregunta. Para ayudarte mejor, por favor pregunta algo relacionado con Lua, Roblox, Unreal Engine 5 o programación en general.";
}

