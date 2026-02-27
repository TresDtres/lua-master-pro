"use client";

import { useState } from "react";
import { Certificate, CertificateService, generateCertificatePreview } from "@/lib/certificates";

interface CertificateCardProps {
  certificate: Certificate;
  onShare?: (type: 'linkedin' | 'twitter') => void;
}

export default function CertificateCard({ certificate, onShare }: CertificateCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    await CertificateService.downloadCertificate(certificate, 'svg');
    setDownloading(false);
  };

  const handleShareLinkedIn = () => {
    CertificateService.shareOnLinkedIn(certificate);
    onShare?.('linkedin');
  };

  const handleShareTwitter = () => {
    CertificateService.shareOnTwitter(certificate);
    onShare?.('twitter');
  };

  const handleVerify = () => {
    const url = `/verify/${certificate.certificate_number}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/30 rounded-lg p-6 hover:border-blue-500 transition">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🎓</div>
            <div>
              <h3 className="text-lg font-bold text-white">Certificado de Completación</h3>
              <p className="text-xs text-slate-400">{certificate.certificate_number}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-400">{certificate.grade}%</div>
            <div className="text-xs text-slate-400">Calificación</div>
          </div>
        </div>

        {/* Module Name */}
        <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
          <p className="text-sm text-slate-400 mb-1">Módulo Completado</p>
          <p className="text-lg font-bold text-blue-400">{certificate.module_name}</p>
        </div>

        {/* Student Name */}
        <div className="mb-4">
          <p className="text-sm text-slate-400 mb-1">Otorgado a</p>
          <p className="text-xl font-bold text-white">{certificate.username}</p>
        </div>

        {/* Date */}
        <div className="flex items-center justify-between text-sm text-slate-400 mb-6">
          <span>
            📅 {new Date(certificate.issued_date).toLocaleDateString('es-ES')}
          </span>
          <span>
            👨‍🏫 {certificate.instructor}
          </span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowPreview(true)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition text-sm"
          >
            👁️ Ver
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-semibold transition text-sm"
          >
            {downloading ? "⏳ Descargando..." : "📥 Descargar"}
          </button>
          <button
            onClick={handleShareLinkedIn}
            className="px-4 py-2 bg-[#0077b5] hover:bg-[#006699] text-white rounded-lg font-semibold transition text-sm"
          >
            💼 LinkedIn
          </button>
          <button
            onClick={handleShareTwitter}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition text-sm"
          >
            🐦 Twitter
          </button>
        </div>

        {/* Verification */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <button
            onClick={handleVerify}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            🔍 Verificar autenticidad →
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Vista Previa del Certificado</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div dangerouslySetInnerHTML={{ __html: generateCertificatePreview(certificate) }} />
            </div>
            <div className="sticky bottom-0 bg-slate-800 p-4 border-t border-slate-700 flex justify-end gap-2">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
              >
                Cerrar
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                📥 Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
