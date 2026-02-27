"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { InteractiveExample } from "@/types/lesson";
import CodeEditor from "./CodeEditor";

interface InteractiveCodeProps {
  example: InteractiveExample;
  onExecute?: (code: string, output: string) => void;
  onComplete?: () => void;
}

/**
 * Componente para código ejecutable dentro de lecciones
 * 
 * CARACTERÍSTICAS IMPLEMENTADAS:
 * - Divisor ajustable (resizable) entre editor y resultado
 * - Layout horizontal en desktop, vertical en móvil
 * - Editor con wordWrap y automaticLayout
 * - Minimapa oculto en móviles
 * - Altura mínima de 500px en desktop, 300px en móvil
 */
export default function InteractiveCode({
  example,
  onExecute,
  onComplete,
}: InteractiveCodeProps) {
  const [code, setCode] = useState(example.starterCode);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  
  // Estado para responsive
  const [isMobile, setIsMobile] = useState(false);
  
  // Estado para divisor ajustable (en pixels)
  const [leftPanelWidth, setLeftPanelWidth] = useState<number>(50); // porcentaje
  
  // Refs para el divisor
  const containerRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Detectar móvil
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      // Ajustar ancho inicial según pantalla
      if (width >= 1200) {
        setLeftPanelWidth(50); // 50% en desktop grande
      } else if (width >= 768) {
        setLeftPanelWidth(55); // 55% en desktop pequeño
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // ResizeObserver para notificar al editor cuando el contenedor cambia
  useEffect(() => {
    const container = editorContainerRef.current;
    if (!container) return;

    // Crear ResizeObserver
    resizeObserverRef.current = new ResizeObserver(() => {
      // Dispatch custom event para que el CodeEditor lo escuche
      window.dispatchEvent(new CustomEvent('editor-container-resize'));
    });

    resizeObserverRef.current.observe(container);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(container);
      }
    };
  }, []);

  // Manejar resize del divisor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      
      // Limitar entre 30% y 70%
      if (newWidth >= 30 && newWidth <= 70) {
        setLeftPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'none';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    if (isMobile) return; // No permitir resize en móvil
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");

    try {
      const response = await fetch("/api/lua/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (result.success) {
        setOutput(result.output || "(sin salida)");
        setHasExecuted(true);
        
        if (onExecute) {
          onExecute(code, result.output);
        }

        if (example.expectedOutput && result.output.includes(example.expectedOutput)) {
          onComplete?.();
        }
      } else {
        setOutput(`Error: ${result.error}`);
      }
    } catch (error) {
      setOutput(`Error de ejecución: ${error instanceof Error ? error.message : "Desconocido"}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, example.expectedOutput, onExecute, onComplete]);

  const resetCode = () => {
    setCode(example.starterCode);
    setOutput("");
    setHasExecuted(false);
  };

  // Altura mínima: 500px en desktop, 300px en móvil
  const minHeight = isMobile ? "min-h-[300px]" : "min-h-[500px]";

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-colors ${minHeight} flex flex-col`}>
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base sm:text-lg">🎮 {example.title}</h3>
            <p className="text-xs sm:text-sm text-purple-100 mt-1">{example.description}</p>
          </div>
          {hasExecuted && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full hidden sm:inline">
              ✓ Completado
            </span>
          )}
        </div>
      </div>

      {/* Contenedor principal con divisor ajustable */}
      <div 
        ref={containerRef}
        className={`flex-1 flex ${isMobile ? 'flex-col' : 'flex-row'} overflow-hidden`}
      >
        {/* Panel Izquierdo: Editor */}
        <div 
          className={`${isMobile ? 'w-full' : ''} overflow-hidden flex flex-col`}
          style={!isMobile ? { flex: `0 0 ${leftPanelWidth}%` } : undefined}
        >
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              💻 Editor
            </span>
            <button
              onClick={resetCode}
              className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              title="Restablecer código original"
            >
              🔄 Reset
            </button>
          </div>
          {/* Editor con altura dinámica y ResizeObserver */}
          <div ref={editorContainerRef} className="flex-1 overflow-hidden">
            <CodeEditor
              initialCode={code}
              onCodeChange={setCode}
              environment={example.environment}
              readOnly={false}
              height="100%"
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Divisor ajustable (solo desktop) */}
        {!isMobile && (
          <div
            onMouseDown={handleMouseDown}
            className="w-2 bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 cursor-col-resize transition-colors flex items-center justify-center flex-shrink-0"
            title="Arrastra para redimensionar"
          >
            <div className="flex flex-col gap-1">
              <div className="w-0.5 h-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div className="w-0.5 h-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div className="w-0.5 h-4 bg-gray-400 dark:bg-gray-500 rounded"></div>
            </div>
          </div>
        )}

        {/* Panel Derecho/Inferior: Resultado */}
        <div 
          className={`${isMobile ? 'w-full border-t' : 'border-l'} border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0`}
          style={!isMobile ? { flex: `0 0 ${100 - leftPanelWidth}%` } : undefined}
        >
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              📤 Resultado
            </span>
            {example.expectedOutput && (
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                Expected: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded text-xs">{example.expectedOutput}</code>
              </span>
            )}
          </div>
          {/* Output con scroll */}
          <div className="flex-1 p-3 sm:p-4 bg-gray-900 text-gray-100 font-mono text-xs sm:text-sm overflow-auto">
            {isRunning ? (
              <div className="flex items-center gap-2 text-gray-400">
                <span className="animate-spin">⏳</span> <span className="hidden sm:inline">Ejecutando...</span><span className="sm:hidden">...</span>
              </div>
            ) : output ? (
              <pre className="whitespace-pre-wrap break-words">{output}</pre>
            ) : (
              <div className="text-gray-500 italic text-xs sm:text-sm">
                Presiona &quot;Ejecutar&quot; para ver el resultado...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botón de ejecutar - Sticky en el fondo */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-2 sm:gap-4 flex-shrink-0">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
          <span className="hidden sm:inline">💡 Modifica el código y presiona Ejecutar</span>
          <span className="sm:hidden">💡 Edita y ejecuta</span>
        </p>
        <button
          onClick={runCode}
          disabled={isRunning}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm whitespace-nowrap"
        >
          {isRunning ? (
            <>
              <span className="animate-spin">⏳</span> <span className="hidden sm:inline">Ejecutando...</span><span className="sm:hidden">...</span>
            </>
          ) : (
            <>
              <span>▶️</span> <span className="hidden sm:inline">Ejecutar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
