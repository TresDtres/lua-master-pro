"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CertificateCard from "@/components/CertificateCard";
import { CertificateService, Certificate } from "@/lib/certificates";
import Link from "next/link";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifyNumber, setVerifyNumber] = useState("");
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [showVerify, setShowVerify] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    // En producción, obtener userId del contexto de autenticación
    const userId = "student-123";
    const result = await CertificateService.getUserCertificates(userId);
    if (result.success && result.data) {
      setCertificates(result.data);
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!verifyNumber.trim()) return;
    
    const result = await CertificateService.verifyCertificate(verifyNumber.trim());
    setVerifyResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/profile"
            className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center mb-4"
          >
            ← Volver a mi Perfil
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            🎓 Mis Certificados
          </h1>
          <p className="text-slate-400">
            Certificados de los módulos completados
          </p>
        </div>

        {/* Verificar Certificado */}
        <div className="mb-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">🔍 Verificar Certificado</h2>
            <button
              onClick={() => setShowVerify(!showVerify)}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              {showVerify ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          
          {showVerify && (
            <div className="flex gap-2">
              <input
                type="text"
                value={verifyNumber}
                onChange={(e) => setVerifyNumber(e.target.value)}
                placeholder="Número de certificado (LUA-2026-...)"
                className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleVerify}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                Verificar
              </button>
            </div>
          )}

          {verifyResult && (
            <div className={`mt-4 p-4 rounded-lg ${
              verifyResult.valid 
                ? "bg-green-900/30 border border-green-600" 
                : "bg-red-900/30 border border-red-600"
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{verifyResult.valid ? "✅" : "❌"}</span>
                <div>
                  <div className="font-bold text-white">{verifyResult.message}</div>
                  {verifyResult.valid && verifyResult.certificate && (
                    <div className="text-sm text-slate-300 mt-1">
                      {verifyResult.certificate.username} - {verifyResult.certificate.module_name}
                      {" "}| Calificación: {verifyResult.certificate.grade}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Certificates Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-slate-400">Cargando certificados...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-xl font-bold text-white mb-2">
              No tienes certificados aún
            </h3>
            <p className="text-slate-400 mb-6">
              Completa módulos para obtener tus certificados
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Ir al Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map(cert => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onShare={(type) => console.log(`Shared on ${type}`)}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        {certificates.length > 0 && (
          <div className="mt-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">📊 Estadísticas</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{certificates.length}</div>
                <div className="text-sm text-slate-400">Certificados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {Math.round(certificates.reduce((sum, c) => sum + c.grade, 0) / certificates.length)}%
                </div>
                <div className="text-sm text-slate-400">Promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {certificates.filter(c => c.grade >= 90).length}
                </div>
                <div className="text-sm text-slate-400">Excelencia</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
