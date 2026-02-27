"use client";

import Link from "next/link";

interface PageNavigationProps {
  previousLink?: string;
  nextLink?: string;
  previousLabel?: string;
  nextLabel?: string;
  backToModule?: string;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
  onSaveProgress?: () => void;
}

export default function PageNavigation({
  previousLink,
  nextLink,
  previousLabel = "← Anterior",
  nextLabel = "Siguiente →",
  backToModule,
  canGoNext = false,
  canGoPrevious = false,
  onSaveProgress,
}: PageNavigationProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center pt-8 border-t border-slate-700">
      <div className="flex gap-2">
        {previousLink && (
          <Link
            href={previousLink}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              canGoPrevious
                ? "bg-slate-700 hover:bg-slate-600 text-white"
                : "bg-slate-800 text-slate-400 cursor-not-allowed opacity-50"
            }`}
          >
            {previousLabel}
          </Link>
        )}

        {backToModule && (
          <Link
            href={backToModule}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
          >
            ⬅ Volver al Módulo
          </Link>
        )}
      </div>

      <div className="flex gap-2">
        {onSaveProgress && (
          <button
            onClick={onSaveProgress}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
          >
            💾 Guardar Progreso
          </button>
        )}

        {nextLink && (
          <Link
            href={nextLink}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              canGoNext
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-800 text-slate-400 cursor-not-allowed opacity-50"
            }`}
          >
            {nextLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
