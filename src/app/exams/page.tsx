"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import ExamPreview from "@/components/ExamPreview";
import Quiz from "@/components/Quiz";

export default function ExamsPage() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [examStarted, setExamStarted] = useState(false);

  const exams = [
    {
      id: "fundamentals",
      name: "Examen: Fundamentos de Lua",
      difficulty: "easy",
      duration: 30,
      questionCount: 20,
      passingScore: 70,
      modules: ["Mes 01", "Mes 02", "Mes 03"],
    },
    {
      id: "integration",
      name: "Examen: Integración con UE5",
      difficulty: "medium",
      duration: 45,
      questionCount: 25,
      passingScore: 75,
      modules: ["Mes 04", "Mes 05", "Mes 06"],
    },
    {
      id: "advanced",
      name: "Examen: Avanzado",
      difficulty: "hard",
      duration: 60,
      questionCount: 30,
      passingScore: 80,
      modules: ["Mes 07", "Mes 08", "Mes 09"],
    },
    {
      id: "mastery",
      name: "Examen: Maestría Final",
      difficulty: "hard",
      duration: 120,
      questionCount: 50,
      passingScore: 85,
      modules: ["Mes 10", "Mes 11", "Mes 12"],
    },
  ];

  const completedExams = ["fundamentals"];
  const passedExams = ["fundamentals"];

  if (examStarted && selectedExam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
        <Navbar />
        <ScrollToTop />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <button
            onClick={() => {
              setExamStarted(false);
              setSelectedExam(null);
            }}
            className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
          >
            ← Volver a Exámenes
          </button>

          <h1 className="text-3xl font-bold text-white mb-8">
            {exams.find((e) => e.id === selectedExam)?.name}
          </h1>

          <Quiz moduleId={selectedExam} />
        </div>
      </div>
    );
  }

  if (selectedExam) {
    const exam = exams.find((e) => e.id === selectedExam);
    if (!exam) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
        <Navbar />
        <ScrollToTop />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedExam(null)}
            className="mb-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
          >
            ← Volver a Exámenes
          </button>

          <ExamPreview
            examName={exam.name}
            difficulty={exam.difficulty}
            duration={exam.duration}
            questionCount={exam.questionCount}
            passingScore={exam.passingScore}
            onStart={() => setExamStarted(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />
      <ScrollToTop />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Exámenes Ficticios</h1>
          <p className="text-slate-300">
            Prepárate con exámenes completos basados en el contenido del curso
          </p>
        </div>


        {/* Exams Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {exams.map((exam) => {
            const isCompleted = completedExams.includes(exam.id);
            const isPassed = passedExams.includes(exam.id);

            return (
              <div
                key={exam.id}
                className={`relative group cursor-pointer transition-transform transform hover:scale-105 ${
                  isCompleted ? "" : "opacity-75 hover:opacity-100"
                }`}
                onClick={() => setSelectedExam(exam.id)}
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-blue-600 transition">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {isPassed ? (
                      <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ✓ Aprobado
                      </span>
                    ) : isCompleted ? (
                      <span className="inline-block bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ! Reprobado
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{exam.name}</h3>

                  <div className="space-y-2 mb-6 text-sm text-slate-400">
                    <div className="flex justify-between">
                      <span>Preguntas:</span>
                      <span className="text-blue-400 font-semibold">{exam.questionCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiempo:</span>
                      <span className="text-blue-400 font-semibold">{exam.duration} minutos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dificultad:</span>
                      <span
                        className={`font-semibold ${
                          exam.difficulty === "easy"
                            ? "text-green-400"
                            : exam.difficulty === "medium"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {exam.difficulty === "easy"
                          ? "Fácil"
                          : exam.difficulty === "medium"
                          ? "Medio"
                          : "Difícil"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mínimo aprobatorio:</span>
                      <span className="text-green-400 font-semibold">{exam.passingScore}%</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700">
                    <div className="text-xs text-slate-500 mb-3">Cubre:</div>
                    <div className="flex flex-wrap gap-2">
                      {exam.modules.map((module) => (
                        <span
                          key={module}
                          className="inline-block bg-slate-700 px-2 py-1 rounded text-xs text-slate-300"
                        >
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                    {isCompleted
                      ? isPassed
                        ? "Reintentar Examen"
                        : "Intentar de Nuevo"
                      : "Comenzar Examen"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-900 border border-blue-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-200 mb-3">💡 Consejos para Exámenes</h3>
          <ul className="space-y-2 text-blue-100 text-sm">
            <li>• Completa todos los módulos de una fase antes de hacer su examen correspondiente</li>
            <li>• Estudia los temas de forma intensiva ya que las preguntas son desafiantes</li>
            <li>• Necesitas al menos {50}% en todos los exámenes para obtener tu certificación</li>
            <li>• Puedes reintentar exámenes tantas veces como necesites</li>
            <li>• Tus mejores puntuaciones serán registradas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
