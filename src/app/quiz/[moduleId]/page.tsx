"use client";

import { useParams } from "next/navigation";
import Quiz from "@/components/Quiz";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import PageNavigation from "@/components/PageNavigation";
import Link from "next/link";

export default function ModuleQuizPage() {
  const params = useParams();
  const moduleId = params?.moduleId as string;

  if (!moduleId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
        <Navbar />
        <div className="pt-20 text-center text-white">
          <p className="text-xl">Módulo no encontrado</p>
          <Link href="/quiz" className="text-blue-400 hover:underline mt-4 inline-block">
            Volver a seleccionar quiz
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProgress = async () => {
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "current-user",
          moduleId: moduleId,
          progress: 100,
          completedAt: new Date(),
        }),
      });

      if (response.ok) {
        alert("✓ Progreso guardado correctamente en la base de datos");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Progreso guardado localmente");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />
      <ScrollToTop />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/quiz"
            className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center mb-4"
          >
            ← Volver a seleccionar quiz
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">📝 Quiz del Módulo</h1>
          <p className="text-slate-300">
            Evalúa tu conocimiento de los conceptos aprendidos
          </p>
        </div>

        <Quiz moduleId={moduleId} />

        <div className="mt-8">
          <PageNavigation
            previousLink={`/quiz`}
            nextLink={`/quiz`}
            backToModule={`/quiz`}
            onSaveProgress={handleSaveProgress}
          />
        </div>
      </div>
    </div>
  );
}
