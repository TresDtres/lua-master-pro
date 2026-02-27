"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getQuizQuestions, hasQuizQuestions } from "@/lib/quizQuestions";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  moduleId: string;
  questions?: QuizQuestion[];
}

const FALLBACK_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "¿Cuál es el tipo de dato fundamental en Lua que puede almacenar cualquier cosa?",
    options: ["string", "number", "table", "boolean"],
    correctAnswer: 2,
    explanation: "Las tablas en Lua son estructuras versátiles que pueden actuar como arrays, diccionarios, objetos y más. Son el tipo de dato más importante en Lua.",
  },
  {
    id: "q2",
    question: "¿Qué función se usa para imprimir valores en la consola en Lua?",
    options: ["console.log()", "print()", "echo()", "printf()"],
    correctAnswer: 1,
    explanation: "print() es la función estándar de Lua para imprimir en la consola. Es equivalente a console.log en JavaScript.",
  },
  {
    id: "q3",
    question: "¿Cómo declares una variable con alcance local en Lua?",
    options: ["var x = 10", "local x = 10", "let x = 10", "x = 10"],
    correctAnswer: 1,
    explanation: "En Lua, 'local' define el alcance de una variable. Sin 'local', la variable es global. Es buena práctica usar 'local' casi siempre.",
  },
  {
    id: "q4",
    question: "¿Cuál es el operador correcto para concatenar strings en Lua?",
    options: ["+", ".", "..", "&"],
    correctAnswer: 2,
    explanation: "El operador .. (dos puntos) en Lua se usa para concatenar strings. Ejemplo: 'Hola' .. ' ' .. 'Mundo' = 'Hola Mundo'",
  },
  {
    id: "q5",
    question: "¿En Unreal Engine 5, qué lenguaje se integra junto a C++ para scripting?",
    options: ["Python", "JavaScript", "Lua", "C#"],
    correctAnswer: 2,
    explanation: "Lua se integra en Unreal Engine 5 para proporcionar scripting flexible y dinámico. Es perfecto para lógica de juegos y rapidez en desarrollo.",
  },
  {
    id: "q6",
    question: "¿Cuál es la sintaxis correcta para crear una función en Lua?",
    options: [
      "function nombre() end",
      "function = nombre() end",
      "def nombre(): pass",
      "function nombre name() return end"
    ],
    correctAnswer: 0,
    explanation: "La sintaxis en Lua es 'function nombre() ... end'. Dentro colocas el código y retornas con 'return'. Ej: function sum(a,b) return a+b end",
  },
  {
    id: "q7",
    question: "¿Cómo se accede a un elemento de una tabla (array) en Lua?",
    options: [
      "tabla[0]",
      "tabla[1]",
      "tabla.get(1)",
      "tabla->1"
    ],
    correctAnswer: 1,
    explanation: "Lua usa indexado de 1 (no 0 como muchos lenguajes). Se accede con tabla[1], tabla[2], etc. Esta es una característica única de Lua.",
  },
  {
    id: "q8",
    question: "¿Qué es una metatbl (metatable) en Lua?",
    options: [
      "Una tabla que almacena datos",
      "Una tabla especial que modifica el comportamiento de otra tabla",
      "Una tabla del sistema",
      "Una tabla con protección"
    ],
    correctAnswer: 1,
    explanation: "Una metatable es una tabla que asocia operaciones y comportamientos customizados a otra tabla. Permite crear comportamientos avanzados como sobrecarga de operadores.",
  },
  {
    id: "q9",
    question: "En Roblox, ¿cuál es el objeto principal que representa el mundo del juego?",
    options: ["Game", "Workspace", "Instance", "Player"],
    correctAnswer: 1,
    explanation: "Workspace (o game.Workspace) es el contenedor principal de todos los objetos visibles en un juego Roblox. Es donde existen las partes, modelos, etc.",
  },
  {
    id: "q10",
    question: "¿Cuál es la diferencia entre 'print()' y 'warn()' en Lua?",
    options: [
      "print() hace error, warn() imprime",
      "print() es para debug, warn() para producción",
      "print() es blanco, warn() es amarillo en consola",
      "No hay diferencia"
    ],
    correctAnswer: 2,
    explanation: "print() muestra mensajes normales en blanco. warn() muestra mensajes de advertencia en color amarillo. Ambas son útiles para debugging.",
  },
];

export default function Quiz({ moduleId, questions: propQuestions }: QuizProps) {
  // Estado para las preguntas (se cargan según el módulo)
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  
  // Estado del quiz
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Cargar preguntas del módulo cuando cambia moduleId
  useEffect(() => {
    const moduleQuestions = propQuestions || getQuizQuestions(moduleId);
    
    // Si no hay preguntas específicas, usar fallback
    const questionsToUse = moduleQuestions.length > 0 ? moduleQuestions : FALLBACK_QUESTIONS;
    
    setQuestions(questionsToUse);
    setAnswered(new Array(questionsToUse.length).fill(false));
    setSelectedAnswers(new Array(questionsToUse.length).fill(-1));
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  }, [moduleId, propQuestions]);

  // Si las preguntas aún no se cargaron, mostrar loading
  if (questions.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded mb-4"></div>
          <div className="h-4 bg-slate-700 rounded mb-4"></div>
          <div className="h-4 bg-slate-700 rounded"></div>
        </div>
        <p className="text-slate-400 mt-4">Cargando preguntas del quiz...</p>
      </div>
    );
  }

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    if (answered[questionIndex]) return;

    const newAnswered = [...answered];
    newAnswered[questionIndex] = true;
    setAnswered(newAnswered);

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    if (answerIndex === questions[questionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const percentageScore = Math.round((score / questions.length) * 100);

  if (showResults) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl font-bold text-blue-400 mb-2">{percentageScore}%</div>
          <div className="text-2xl font-bold text-white mb-4">
            {score} de {questions.length} correcetas
          </div>

          <div className={`inline-block px-4 py-2 rounded-lg font-semibold mb-6 ${
            percentageScore >= 80
              ? "bg-green-900 text-green-200"
              : percentageScore >= 60
              ? "bg-yellow-900 text-yellow-200"
              : "bg-red-900 text-red-200"
          }`}>
            {percentageScore >= 80
              ? "¡Excelente! 🎉"
              : percentageScore >= 60
              ? "Bien hecho ✓"
              : "Necesitas practicar más 📚"}
          </div>
        </div>

        {/* Results breakdown */}
        <div className="space-y-3 mb-8 text-left">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className={`p-4 rounded border-l-4 ${
                selectedAnswers[idx] === q.correctAnswer
                  ? "bg-green-900 border-green-600"
                  : "bg-red-900 border-red-600"
              }`}
            >
              <div className="text-sm font-semibold text-white">
                {selectedAnswers[idx] === q.correctAnswer ? "✓" : "✗"} {q.question}
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Tu respuesta: {q.options[selectedAnswers[idx]]}
              </div>
              {selectedAnswers[idx] !== q.correctAnswer && (
                <div className="text-xs text-green-300 mt-1">
                  Respuesta correcta: {q.options[q.correctAnswer]}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setAnswered(new Array(questions.length).fill(false));
              setSelectedAnswers(new Array(questions.length).fill(-1));
              setShowResults(false);
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Reintentar Quiz
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
          >
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = answered[currentQuestion];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-slate-300">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
          <span className="text-sm font-semibold text-blue-400">
            Puntuación: {score}/{questions.length}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-6">{question.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isCorrect = idx === question.correctAnswer;
            const isSelected = selectedAnswers[currentQuestion] === idx;

            let bgClass = "bg-slate-700 border-slate-600 hover:bg-slate-600";
            if (isAnswered) {
              if (isCorrect) {
                bgClass = "bg-green-900 border-green-600";
              } else if (isSelected && !isCorrect) {
                bgClass = "bg-red-900 border-red-600";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQuestion, idx)}
                disabled={isAnswered}
                className={`w-full p-4 text-left border-2 rounded-lg transition ${bgClass} disabled:cursor-not-allowed ${
                  isSelected ? "border-blue-500" : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center text-sm font-bold ${
                      isAnswered && isCorrect
                        ? "bg-green-600 border-green-600 text-white"
                        : isAnswered && isSelected && !isCorrect
                        ? "bg-red-600 border-red-600 text-white"
                        : "border-slate-500"
                    }`}
                  >
                    {isAnswered && isCorrect && "✓"}
                    {isAnswered && isSelected && !isCorrect && "✗"}
                  </div>
                  <span className="text-white font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation (shown after answer) */}
      {isAnswered && (
        <div
          className={`mb-8 p-4 rounded-lg border-l-4 ${
            selectedAnswers[currentQuestion] === question.correctAnswer
              ? "bg-green-900 border-green-600"
              : "bg-blue-900 border-blue-600"
          }`}
        >
          <div className="font-semibold text-white mb-2">
            {selectedAnswers[currentQuestion] === question.correctAnswer
              ? "¡Correcto! ✓"
              : "Respuesta incorrecta ✗"}
          </div>
          <p className="text-sm text-slate-200">{question.explanation}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 text-white rounded-lg font-semibold transition"
        >
          ← Anterior
        </button>

        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:opacity-50 text-white rounded-lg font-semibold transition"
        >
          {currentQuestion === questions.length - 1 ? "Ver Resultados" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
}
