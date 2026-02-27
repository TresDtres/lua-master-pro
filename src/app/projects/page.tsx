"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProjectSubmissionForm from "@/components/ProjectSubmissionForm";
import { ProjectService } from "@/lib/projects";
import Link from "next/link";

interface Project {
  id: string;
  user_id: string;
  username: string;
  user_avatar?: string;
  module_id: string;
  module_name: string;
  title: string;
  description: string;
  github_url?: string;
  demo_url?: string;
  likes: number;
  views: number;
  created_at: string;
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"gallery" | "submit">("gallery");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<string>("all");

  useEffect(() => {
    loadProjects();
  }, [selectedModule]);

  const loadProjects = async () => {
    setLoading(true);
    const result = await ProjectService.getAllProjects(50);
    if (result.success && result.data) {
      setProjects(result.data);
    }
    setLoading(false);
  };

  const filteredProjects = selectedModule === "all"
    ? projects
    : projects.filter(p => p.module_id === selectedModule);

  const modules = Array.from(new Set(projects.map(p => p.module_id)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center mb-4"
          >
            ← Volver al Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            🎓 Galería de Proyectos
          </h1>
          <p className="text-slate-400">
            Explora los proyectos de la comunidad y comparte los tuyos
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "gallery"
                ? "bg-slate-700 text-white border-b-2 border-blue-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📚 Galería
          </button>
          <button
            onClick={() => setActiveTab("submit")}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === "submit"
                ? "bg-slate-700 text-white border-b-2 border-blue-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📤 Enviar Proyecto
          </button>
        </div>

        {/* Contenido */}
        {activeTab === "gallery" ? (
          <div>
            {/* Filtro por módulo */}
            <div className="mb-6 flex items-center gap-4">
              <label className="text-sm text-slate-400">Filtrar por módulo:</label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">Todos los módulos</option>
                {modules.map(moduleId => (
                  <option key={moduleId} value={moduleId}>
                    {moduleId}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid de proyectos */}
            {loading ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⏳</div>
                <p className="text-slate-400">Cargando proyectos...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📭</div>
                <p className="text-slate-400">No hay proyectos aún</p>
                <p className="text-sm text-slate-500 mt-2">
                  ¡Sé el primero en enviar un proyecto!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Enviar tu Proyecto
              </h2>
              <ProjectSubmissionForm
                userId="student-123"
                username="Estudiante"
                moduleId="mes-01"
                moduleName="Lua desde Cero"
                onSuccess={() => setActiveTab("gallery")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg">
            {project.user_avatar || "👤"}
          </div>
          <div>
            <div className="font-semibold text-white">{project.username}</div>
            <div className="text-xs text-slate-400">{project.module_name}</div>
          </div>
        </div>
      </div>

      {/* Título y descripción */}
      <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex gap-2 mb-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition"
          >
            💻 GitHub
          </a>
        )}
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
          >
            🌐 Demo
          </a>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-slate-700">
        <div className="flex items-center gap-4">
          <span>❤️ {project.likes}</span>
          <span>👁️ {project.views}</span>
        </div>
        <span className="text-xs">
          {new Date(project.created_at).toLocaleDateString('es-ES')}
        </span>
      </div>
    </div>
  );
}
