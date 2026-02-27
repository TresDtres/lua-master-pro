"use client";

import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useChatWithAI } from "@/hooks/useProgressSaver";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

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

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente IA especializado en Lua, Roblox y Unreal Engine 5. Puedo ayudarte con preguntas sobre programación, errores, dudas del curso y más. ¿Qué necesitas?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isTopicAllowed = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return ALLOWED_TOPICS.some((topic) => lowerText.includes(topic));
  };

  const generateResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

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
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Validar tema
    if (!isTopicAllowed(input)) {
      setShowWarning(true);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "system",
          content:
            "⚠️ Solo puedo responder preguntas sobre Lua, Roblox, Unreal Engine 5 y programación. Por favor, haz una pregunta relacionada con el curso.",
          timestamp: new Date(),
        },
      ]);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Try to use Claude API first, fallback to mock
      const result = await useChatWithAI(
        input,
        "current-user",
        "chat-session"
      );

      if (result.success && result.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: result.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Track successful interaction
        console.log(`✓ Chat message processed (Using ${result.usingFallback ? "fallback" : "Claude API"})`);
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      // Fallback to mock response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 flex flex-col">
      <Navbar />
      <ScrollToTop />

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-6 border-b border-slate-700">
          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block"
          >
            ← Volver al dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Chat IA</h1>
          <p className="text-slate-400">
            Asistente especializado en Lua y Unreal Engine 5.6
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl p-4 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-slate-800 text-slate-100 border border-slate-700 rounded-bl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === "user"
                      ? "text-blue-200"
                      : "text-slate-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 text-slate-100 border border-slate-700 p-4 rounded-lg rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-700 bg-slate-900 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
              placeholder="Escribe tu pregunta sobre Lua y UE5..."
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded font-semibold transition"
            >
              {loading ? "..." : "Enviar"}
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-3">
            💡 Tip: Puedes pegar código, hacer preguntas específicas y pedir
            explicaciones detalladas.
          </p>
        </div>
      </div>
    </div>
  );
}
