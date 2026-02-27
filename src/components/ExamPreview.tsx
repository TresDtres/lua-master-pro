"use client";

interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  type: "multiple-choice" | "short-answer";
}

interface ExamPreviewProps {
  examName: string;
  difficulty: string;
  duration: number;
  questionCount: number;
  passingScore: number;
  onStart: () => void;
}

export default function ExamPreview({
  examName,
  difficulty,
  duration,
  questionCount,
  passingScore,
  onStart,
}: ExamPreviewProps) {
  const difficultyColors: Record<string, string> = {
    easy: "bg-green-900 text-green-200",
    medium: "bg-yellow-900 text-yellow-200",
    hard: "bg-red-900 text-red-200",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-4">{examName}</h1>
        <p className="text-blue-100 text-lg">Evalúa tu conocimiento en este módulo</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl font-bold text-blue-400 mb-2">{questionCount}</div>
          <div className="text-slate-300">Preguntas</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl font-bold text-purple-400 mb-2">{duration} min</div>
          <div className="text-slate-300">Tiempo límite</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className={`text-3xl font-bold mb-2 ${difficultyColors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
          <div className="text-slate-300">Dificultad</div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="text-3xl font-bold text-green-400 mb-2">{passingScore}%</div>
          <div className="text-slate-300">Puntuación mínima</div>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Instrucciones</h3>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">•</span>
            <span>Tienes {duration} minutos para completar el examen</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">•</span>
            <span>No puedes volver a preguntas anteriores</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">•</span>
            <span>Necesitas {passingScore}% para pasar</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">•</span>
            <span>Cada pregunta tiene un único tiempo de respuesta</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">•</span>
            <span>Tu puntuación se guardará automáticamente</span>
          </li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-bold text-lg transition"
      >
        Comenzar Examen
      </button>
    </div>
  );
}
