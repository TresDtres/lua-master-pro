"use client";

import { Module } from "@/types";
import Link from "next/link";

interface ModuleCardProps {
  module: Module;
  completed?: boolean;
}

export default function ModuleCard({
  module,
  completed = false,
}: ModuleCardProps) {
  const difficultyColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-orange-100 text-orange-800",
    expert: "bg-red-100 text-red-800",
  };

  return (
    <Link href={`/course/${module.id}`}>
      <div
        className={`p-6 rounded-lg border-2 cursor-pointer transition hover:shadow-lg ${
          completed
            ? "bg-green-50 border-green-300"
            : "bg-white border-slate-200 hover:border-blue-300"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Mes {module.monthNumber}: {module.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{module.duration}</p>
          </div>
          {completed && (
            <div className="text-2xl">✅</div>
          )}
        </div>

        <p className="text-slate-600 mb-4 text-sm line-clamp-2">
          {module.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`text-xs px-2 py-1 rounded font-semibold ${
              difficultyColors[module.difficulty]
            }`}
          >
            {module.difficulty.charAt(0).toUpperCase() +
              module.difficulty.slice(1)}
          </span>
          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 font-semibold">
            {module.objectives.length} objetivos
          </span>
        </div>

        <p className="text-xs text-slate-500 font-medium">
          Entregable: {module.deliverable.substring(0, 50)}...
        </p>
      </div>
    </Link>
  );
}
