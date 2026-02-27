"use client";

import { useState } from "react";
import { ProjectService } from "@/lib/projects";

interface ProjectSubmissionFormProps {
  userId: string;
  username: string;
  userAvatar?: string;
  moduleId: string;
  moduleName: string;
  onSuccess?: () => void;
}

export default function ProjectSubmissionForm({
  userId,
  username,
  userAvatar,
  moduleId,
  moduleName,
  onSuccess
}: ProjectSubmissionFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!title || !description) {
      setError("Título y descripción son requeridos");
      setLoading(false);
      return;
    }

    const result = await ProjectService.submitProject({
      user_id: userId,
      username,
      user_avatar: userAvatar,
      module_id: moduleId,
      module_name: moduleName,
      title,
      description,
      github_url: githubUrl || undefined,
      demo_url: demoUrl || undefined,
      files: []
    });

    if (result.success) {
      setSuccess("¡Proyecto enviado exitosamente! Será revisado pronto.");
      setTitle("");
      setDescription("");
      setGithubUrl("");
      setDemoUrl("");
      setTimeout(() => {
        onSuccess?.();
      }, 2000);
    } else {
      setError(result.error || "Error al enviar proyecto");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-400 mb-1">
          Título del Proyecto *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          placeholder="Mi solución para..."
          required
        />
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">
          Descripción *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          placeholder="Describe tu solución, características principales, etc."
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            GitHub URL (opcional)
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="https://github.com/..."
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Demo URL (opcional)
          </label>
          <input
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="https://tu-demo.com"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 text-red-200 text-sm">
          ❌ {error}
        </div>
      )}

      {success && (
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 text-green-200 text-sm">
          ✅ {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-semibold transition"
      >
        {loading ? "Enviando..." : "📤 Enviar Proyecto"}
      </button>

      <p className="text-xs text-slate-400 text-center">
        Tu proyecto será revisado antes de publicarse en la galería
      </p>
    </form>
  );
}
