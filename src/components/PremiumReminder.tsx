"use client";

import Link from "next/link";
import { useState } from "react";

export default function PremiumReminder() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-30 max-w-sm bg-gradient-to-r from-purple-900 to-pink-900 border-2 border-purple-600 rounded-lg p-4 shadow-xl animate-pulse">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <h4 className="font-bold text-white text-sm mb-1">✨ Actualiza a Premium</h4>
          <p className="text-purple-100 text-xs mb-3">
            Desbloquea todos los módulos, exámenes sin límite y soporte IA 24/7
          </p>
          <div className="flex gap-2">
            <Link
              href="/register?plan=premium"
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded font-semibold transition"
            >
              Actualizar
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded transition"
            >
              Más tarde
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-purple-200 hover:text-white transition text-lg leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
