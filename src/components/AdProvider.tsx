// Ads Architecture and Management
"use client";

import React, { useState, useEffect } from "react";

export interface AdSlot {
  id: string;
  type: "banner" | "interstitial" | "reward";
  placement: "header" | "sidebar" | "footer" | "modal";
  priority: number;
  targetAudience?: string[];
  duration?: number; // in seconds
}

export interface AdCampaign {
  id: string;
  title: string;
  enabled: boolean;
  slots: AdSlot[];
  startDate: Date;
  endDate?: Date;
}

// Mock ad inventory (in production, use Adserver API)
const AD_INVENTORY: Record<string, AdCampaign> = {
  "premium-upgrade": {
    id: "premium-upgrade",
    title: "Upgrade to Premium",
    enabled: true,
    slots: [
      {
        id: "ad-1",
        type: "banner",
        placement: "header",
        priority: 1,
        duration: 5,
      },
      {
        id: "ad-2",
        type: "interstitial",
        placement: "modal",
        priority: 2,
        duration: 30,
      },
    ],
    startDate: new Date(),
  },
  "course-recommendation": {
    id: "course-recommendation",
    title: "Related Courses",
    enabled: true,
    slots: [
      {
        id: "ad-3",
        type: "banner",
        placement: "sidebar",
        priority: 1,
      },
    ],
    startDate: new Date(),
  },
};

export function AdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>([]);
  const [impressions, setImpressions] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load active campaigns
    const activeCampaigns = Object.values(AD_INVENTORY).filter(
      (campaign) => campaign.enabled
    );
    setCampaigns(activeCampaigns);
  }, []);

  const trackImpression = (adSlotId: string) => {
    setImpressions((prev) => ({
      ...prev,
      [adSlotId]: (prev[adSlotId] || 0) + 1,
    }));
  };

  const trackClick = (adSlotId: string, targetUrl: string) => {
    trackImpression(adSlotId);
    // In production: send to analytics service
    console.log(`Ad clicked: ${adSlotId} -> ${targetUrl}`);
  };

  return (
    <AdContext.Provider value={{ campaigns, trackImpression, trackClick }}>
      {children}
    </AdContext.Provider>
  );
}

export interface AdContextType {
  campaigns: AdCampaign[];
  trackImpression: (adSlotId: string) => void;
  trackClick: (adSlotId: string, targetUrl: string) => void;
}

export const AdContext = React.createContext<AdContextType>({
  campaigns: [],
  trackImpression: () => {},
  trackClick: () => {},
});

// Helper to get appropriate ad for a slot
export function getAdForSlot(
  placement: "header" | "sidebar" | "footer" | "modal"
): AdSlot | null {
  for (const campaign of Object.values(AD_INVENTORY)) {
    if (!campaign.enabled) continue;

    const slot = campaign.slots.find((s) => s.placement === placement);
    if (slot) return slot;
  }
  return null;
}

// Get ad content based on slot
export function getAdContent(slot: AdSlot): React.ReactNode {
  switch (slot.id) {
    case "ad-1":
      return (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded text-white text-center">
          <p className="font-bold mb-2">🎓 Actualiza a Premium</p>
          <p className="text-sm mb-3">Acceso ilimitado a todo el contenido + IA tutor</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded font-semibold hover:bg-purple-100 transition">
            Suscribirse Ahora
          </button>
        </div>
      );

    case "ad-2":
      return (
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-lg text-white text-center">
          <p className="text-2xl font-bold mb-3">✨ Premium Unlocked</p>
          <p className="mb-4">Obtén acceso a función de IA tutor avanzada y contenido exclusivo</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition">
            Activar Premium
          </button>
        </div>
      );

    case "ad-3":
      return (
        <div className="bg-slate-700 border border-slate-600 p-4 rounded">
          <p className="font-semibold text-white mb-2">📚 Cursos Relacionados</p>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Advanced Lua Patterns</li>
            <li>• Roblox Game Development</li>
            <li>• UE5 Blueprints Mastery</li>
          </ul>
        </div>
      );

    default:
      return null;
  }
}

export default AdProvider;
