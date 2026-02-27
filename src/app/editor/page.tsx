"use client";

import Navbar from "@/components/Navbar";
import CodeEditor, { ExampleCode } from "@/components/CodeEditor";
import Link from "next/link";
import { useState } from "react";
import { luaExamples } from "@/lib/examples/luaExamples";
import { robloxExamples } from "@/lib/examples/robloxExamples";
import { unluaExamples } from "@/lib/examples/unluaExamples";
import { minecraftExamples } from "@/lib/examples/minecraftExamples";

type Environment = "lua" | "roblox" | "unlua" | "minecraft";

const examplesByEnvironment: Record<Environment, ExampleCode[]> = {
  lua: luaExamples,
  roblox: robloxExamples,
  unlua: unluaExamples,
  minecraft: minecraftExamples,
};

const environmentInfo = {
  lua: { name: "Lua Estándar", icon: "📜", color: "blue" },
  roblox: { name: "Roblox", icon: "🎮", color: "red" },
  unlua: { name: "Unreal Engine", icon: "🎯", color: "white" },
  minecraft: { name: "ComputerCraft", icon: "⛏️", color: "green" },
};

export default function EditorPage() {
  const [savedCode, setSavedCode] = useState<
    { id: string; name: string; code: string; date: string }[]
  >([]);
  const [environment, setEnvironment] = useState<Environment>("lua");
  const [currentCode, setCurrentCode] = useState(luaExamples[0].code);

  const handleSave = (code: string) => {
    const newFile = {
      id: Date.now().toString(),
      name: `script_${new Date().toLocaleTimeString()}`,
      code,
      date: new Date().toLocaleString(),
    };
    setSavedCode([...savedCode, newFile]);
  };

  const loadExample = (example: ExampleCode) => {
    setCurrentCode(example.code);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "intermediate":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "advanced":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "Principiante";
      case "intermediate":
        return "Intermedio";
      case "advanced":
        return "Avanzado";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1800px] mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block"
          >
            ← Volver al dashboard
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Editor Lua Profesional
              </h1>
              <p className="text-slate-400">
                IDE completo con IntelliSense, autocompletado y ejecución en tiempo real
              </p>
            </div>
            
            {/* Selector de Entorno */}
            <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1 border border-slate-700">
              {(Object.keys(environmentInfo) as Environment[]).map((env) => (
                <button
                  key={env}
                  onClick={() => setEnvironment(env)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${
                    environment === env
                      ? env === "roblox"
                        ? "bg-red-600 text-white"
                        : env === "unlua"
                        ? "bg-white text-black"
                        : env === "minecraft"
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  <span>{environmentInfo[env].icon}</span>
                  <span className="hidden sm:inline">{environmentInfo[env].name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Scripts Guardados */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <span>📁</span> Mis Scripts
              </h3>

              {savedCode.length === 0 ? (
                <p className="text-slate-400 text-sm">
                  No hay scripts guardados
                </p>
              ) : (
                <ul className="space-y-2 max-h-40 overflow-auto">
                  {savedCode.map((file) => (
                    <li
                      key={file.id}
                      className="p-2 bg-slate-900 rounded hover:bg-slate-700 cursor-pointer transition"
                    >
                      <div className="font-mono text-xs text-blue-400 truncate">
                        {file.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {file.date}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Ejemplos por Entorno */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <span>📚</span> Ejemplos
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                {environment === "lua" && "Ejemplos de Lua estándar"}
                {environment === "roblox" && "Ejemplos de Roblox API"}
                {environment === "unlua" && "Ejemplos de Unreal Engine 5"}
                {environment === "minecraft" && "Ejemplos de ComputerCraft"}
              </p>
              <ul className="space-y-2 max-h-[400px] overflow-auto">
                {examplesByEnvironment[environment].map((example, index) => (
                  <li key={index}>
                    <button
                      onClick={() => loadExample(example)}
                      className="w-full text-left p-3 rounded hover:bg-slate-700 transition group border border-transparent hover:border-slate-600"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white group-hover:text-blue-400 transition">
                          {example.name}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition text-blue-400">
                          →
                        </span>
                      </div>
                      {example.description && (
                        <p className="text-xs text-slate-400 mb-2 line-clamp-2">
                          {example.description}
                        </p>
                      )}
                      {example.difficulty && (
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${getDifficultyColor(example.difficulty)}`}>
                          {getDifficultyLabel(example.difficulty)}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-700/30 rounded-lg p-4">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <span>💡</span> Tips
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">▸</span>
                  <span>Ctrl+Space para autocompletar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">▸</span>
                  <span>Hover para ver documentación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">▸</span>
                  <span>Escribe "for", "if", "func" + Tab para snippets</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-3">
            <CodeEditor
              environment={environment}
              initialCode={currentCode}
              height="600px"
              onRun={handleSave}
              onCodeChange={setCurrentCode}
            />
          </div>
        </div>

        {/* Documentación Rápida */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <span>📖</span> Sintaxis Básica
            </h3>
            <div className="space-y-2 text-xs text-slate-300 font-mono bg-slate-900/50 p-3 rounded">
              <div><span className="text-purple-400">local</span> x = <span className="text-green-400">10</span></div>
              <div><span className="text-purple-400">if</span> x <span className="text-blue-400">&gt;</span> <span className="text-green-400">5</span> <span className="text-purple-400">then</span> <span className="text-slate-500">-- condición</span></div>
              <div><span className="text-purple-400">for</span> i = <span className="text-green-400">1</span>, <span className="text-green-400">10</span> <span className="text-purple-400">do</span> <span className="text-slate-500">-- bucle</span></div>
              <div><span className="text-purple-400">function</span> <span className="text-yellow-400">miFunc</span>() <span className="text-slate-500">-- función</span></div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <span>🎯</span> Características
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> IntelliSense contextual
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Autocompletado de API
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Snippets de código
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Ejecución en navegador
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> {examplesByEnvironment[environment].length} ejemplos disponibles
              </li>
            </ul>
          </div>

          <div className="bg-slate-800 rounded-lg p-5 border border-slate-700">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <span>🚀</span> Atajos
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="bg-slate-900 p-2 rounded">
                <kbd className="text-blue-400">Ctrl+Space</kbd>
                <div className="text-slate-500 mt-1">Autocompletar</div>
              </div>
              <div className="bg-slate-900 p-2 rounded">
                <kbd className="text-blue-400">Ctrl+F</kbd>
                <div className="text-slate-500 mt-1">Buscar</div>
              </div>
              <div className="bg-slate-900 p-2 rounded">
                <kbd className="text-blue-400">Ctrl+/</kbd>
                <div className="text-slate-500 mt-1">Comentar</div>
              </div>
              <div className="bg-slate-900 p-2 rounded">
                <kbd className="text-blue-400">Tab</kbd>
                <div className="text-slate-500 mt-1">Snippet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
