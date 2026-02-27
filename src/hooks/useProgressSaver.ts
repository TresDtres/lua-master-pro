// Hook: useProgressSaver
"use client";

import { useCallback, useState } from "react";

interface ProgressData {
  userId: string;
  moduleId: string;
  progress: number;
  score?: number;
  completedAt?: Date;
  lessonIds?: string[];
}

interface UseSaveProgressReturn {
  saveProgress: (data: ProgressData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useProgressSaver(): UseSaveProgressReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveProgress = useCallback(async (data: ProgressData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to save progress: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        console.log("✓ Progreso guardado:", result.message);
        return true;
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      console.error("Error al guardar progreso:", errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { saveProgress, loading, error, success };
}

// Hook: useProgressTracker
export function useProgressTracker() {
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({});
  const { saveProgress } = useProgressSaver();

  const updateProgress = useCallback(
    async (
      userId: string,
      moduleId: string,
      progress: number,
      score?: number
    ) => {
      setModuleProgress((prev) => ({
        ...prev,
        [moduleId]: progress,
      }));

      // Auto-save progress
      await saveProgress({
        userId,
        moduleId,
        progress,
        score,
        completedAt: progress === 100 ? new Date() : undefined,
      });
    },
    [saveProgress]
  );

  const getTotalProgress = useCallback(() => {
    const values = Object.values(moduleProgress);
    if (values.length === 0) return 0;
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  }, [moduleProgress]);

  return { updateProgress, getTotalProgress, moduleProgress };
}

// Hook: useChatWithAI
export async function useChatWithAI(
  message: string,
  userId?: string,
  moduleId?: string
) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        userId,
        moduleId,
        useAI: !!process.env.NEXT_PUBLIC_USE_CLAUDE,
      }),
    });

    if (!response.ok) {
      throw new Error("Chat request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Chat error:", error);
    throw error;
  }
}

export default useProgressSaver;
