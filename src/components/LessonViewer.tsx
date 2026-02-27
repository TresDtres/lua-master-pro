"use client";

import React, { useState } from "react";
import { LessonTheory, CodeSnippet } from "@/types/lesson";

interface LessonViewerProps {
  theory: LessonTheory;
  examples: CodeSnippet[];
  onRunExample?: (code: string) => void;
}

/**
 * Componente para mostrar el contenido teórico de una lección
 * Soporta Markdown básico y ejemplos de código
 * 
 * Mejoras:
 * - Tema claro/oscuro consistente en todos los elementos
 * - Secciones colapsables para mejor navegación
 */
export default function LessonViewer({
  theory,
  examples,
  onRunExample,
}: LessonViewerProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      // Encabezados
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100">
            {line.replace("## ", "")}
          </h2>
        );
      }
      // Negritas
      if (line.includes("**")) {
        const parts = line.split("**");
        return (
          <p key={index} className="mb-2 text-gray-700 dark:text-gray-300">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold">{part}</strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      // Listas
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={index} className="ml-4 text-gray-700 dark:text-gray-300">
            {line.substring(2)}
          </li>
        );
      }
      // Código inline
      if (line.includes("`") && !line.startsWith("```")) {
        const parts = line.split("`");
        return (
          <p key={index} className="mb-2 text-gray-700 dark:text-gray-300">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <code key={i} className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
                  {part}
                </code>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      // Párrafos normales
      if (line.trim()) {
        return (
          <p key={index} className="mb-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            {line}
          </p>
        );
      }
      return <br key={index} />;
    });
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
      {/* Header de la lección */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {theory.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>⏱️ {theory.estimatedTime} min</span>
          <span>📚 {theory.sections.length} secciones</span>
        </div>
      </div>

      {/* Objetivos de aprendizaje */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm">
          🎯 Objetivos de Aprendizaje
        </h3>
        <ul className="space-y-1">
          {theory.objectives.map((obj, index) => (
            <li key={index} className="text-blue-800 dark:text-blue-200 text-sm flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">▸</span>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Secciones de teoría - Colapsables */}
      <div className="space-y-3">
        {theory.sections.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedSection(expandedSection === index ? null : index)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 text-left font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
            >
              <span className="text-sm">{section.heading}</span>
              <span className="text-gray-400 text-sm">
                {expandedSection === index ? "▼" : "▶"}
              </span>
            </button>
            {expandedSection === index && (
              <div className="px-4 py-4 bg-white dark:bg-gray-900 space-y-4">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {renderContent(section.content)}
                </div>
                {/* Ejemplos de código en la sección */}
                {section.codeExamples && section.codeExamples.length > 0 && (
                  <div className="space-y-3 mt-4">
                    {section.codeExamples.map((example, exIndex) => (
                      <div key={exIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                          <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                            {example.title}
                          </span>
                          {onRunExample && (
                            <button
                              onClick={() => onRunExample(example.code)}
                              className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                            >
                              ▶️ Ejecutar
                            </button>
                          )}
                        </div>
                        <pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto text-sm font-mono max-h-48 overflow-auto">
                          <code>{example.code}</code>
                        </pre>
                        {example.description && (
                          <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800/50 text-sm text-gray-600 dark:text-gray-400">
                            <strong>Explicación:</strong> {example.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 p-4 rounded-r-lg">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 text-sm">
          📝 Resumen
        </h3>
        <div className="text-green-800 dark:text-green-200 text-sm leading-relaxed">
          {renderContent(theory.summary)}
        </div>
      </div>
    </div>
  );
}
