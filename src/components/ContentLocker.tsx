"use client";

import { useState, useEffect } from "react";

interface ContentLockerProps {
  children: React.ReactNode;
  isLocked: boolean;
  lockedMessage: string;
  adSlot?: React.ReactNode;
  onUnlock?: () => void;
  lockDuration?: number;
}

export default function ContentLocker({
  children,
  isLocked,
  lockedMessage,
  adSlot,
  onUnlock,
  lockDuration = 30,
}: ContentLockerProps) {
  const [timeRemaining, setTimeRemaining] = useState(lockDuration);
  const [userAcknowledged, setUserAcknowledged] = useState(!isLocked);

  useEffect(() => {
    if (!isLocked || userAcknowledged) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setUserAcknowledged(true);
          onUnlock?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, userAcknowledged, onUnlock]);

  const handleUnlock = () => {
    setUserAcknowledged(true);
    onUnlock?.();
    // Save progress when unlocking
    try {
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "current-user",
          moduleId: "current-module",
          progress: 50,
          completedAt: new Date(),
        }),
      });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  if (isLocked && !userAcknowledged) {
    return (
      <div className="bg-gradient-to-br from-orange-900 to-orange-800 border-2 border-orange-600 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h3 className="text-2xl font-bold text-white mb-3">{lockedMessage}</h3>
        <p className="text-orange-100 mb-6 max-w-md mx-auto">
          Para continuar con el siguiente módulo, por favor visualiza este breve contenido o espera {lockDuration} segundos
        </p>

        {adSlot ? (
          <div className="bg-black/30 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center border border-orange-600">
            <div className="text-center">
              {adSlot}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-orange-800 to-orange-700 rounded-lg p-6 mb-6 border border-orange-500">
            <div className="text-center">
              <p className="text-orange-200 text-sm mb-4">⏱️ Tiempo restante:</p>
              <div className="text-5xl font-bold text-orange-300 font-mono mb-4">
                {timeRemaining}s
              </div>
              <div className="w-full bg-orange-900 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-300 h-full transition-all"
                  style={{ width: `${(timeRemaining / lockDuration) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleUnlock}
            className="w-full px-8 py-3 bg-white hover:bg-gray-100 text-orange-900 rounded-lg font-bold transition"
          >
            ✓ Continuar ({timeRemaining}s)
          </button>

          <a
            href="/register?plan=premium"
            className="block w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-bold transition"
          >
            ✨ Premium: Acceso Ilimitado
          </a>
        </div>

        <p className="text-xs text-orange-200 mt-4">
          Usuarios Premium no ven bloqueos de contenido
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
