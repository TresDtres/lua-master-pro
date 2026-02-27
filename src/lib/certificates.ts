// ============================================
// SISTEMA DE CERTIFICADOS DE COMPLETACIÓN
// ============================================

import { supabase, isSupabaseConfigured } from './supabase';

// ============================================
// TIPOS DE DATOS
// ============================================

export interface Certificate {
  id: string;
  user_id: string;
  username: string;
  module_id: string;
  module_name: string;
  certificate_number: string;
  issued_date: string;
  grade: number;
  instructor: string;
  download_url?: string;
}

export interface CourseCompletionCertificate {
  id: string;
  user_id: string;
  username: string;
  certificate_number: string;
  issued_date: string;
  completion_date: string;
  total_modules: number;
  average_grade: number;
  total_xp: number;
  instructor: string;
  download_url?: string;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  background_color: string;
  border_color: string;
  logo_url?: string;
  signature_url?: string;
}

// ============================================
// SERVICIO DE CERTIFICADOS
// ============================================

export const CertificateService = {
  /**
   * Generar número único de certificado
   */
  generateCertificateNumber(moduleId: string, userId: string): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CERT-${moduleId.toUpperCase()}-${year}${month}-${random}`;
  },

  /**
   * Generar certificado para un módulo
   */
  async generateCertificate(
    userId: string,
    username: string,
    moduleId: string,
    moduleName: string,
    grade: number
  ): Promise<{ success: boolean; error?: string; data?: any; alreadyExists?: boolean }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // Verificar si ya existe
      const { data: existing } = await (supabase as any)
        .from('certificates')
        .select('*')
        .eq('user_id', userId)
        .eq('module_id', moduleId)
        .single();

      if (existing) {
        return { success: true, data: existing, alreadyExists: true };
      }

      // Generar número único de certificado
      const certificateNumber = this.generateCertificateNumber(moduleId, userId);

      const { data, error } = await (supabase as any)
        .from('certificates')
        .insert({
          user_id: userId,
          username,
          module_id: moduleId,
          module_name: moduleName,
          certificate_number: certificateNumber,
          issued_date: new Date().toISOString(),
          grade
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data, alreadyExists: false };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Generar certificado final del curso (completar 100%)
   */
  async generateCourseCompletionCertificate(userId: string, username: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // Verificar si ya existe certificado final
      const { data: existing } = await (supabase as any)
        .from('course_certificates')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existing) {
        return { success: true, data: existing, alreadyExists: true };
      }

      // Obtener todos los módulos completados
      const { data: progress } = await (supabase as any)
        .from('user_progress')
        .select('module_id, quiz_score, completed_at')
        .eq('user_id', userId)
        .eq('completed', true);

      if (!progress || progress.length < 12) {
        return { 
          success: false, 
          error: `Solo has completado ${progress?.length || 0}/12 módulos. ¡Completa todos para obtener el certificado final!` 
        };
      }

      // Calcular promedio
      const totalScore = progress.reduce((sum: number, p: any) => sum + (p.quiz_score || 0), 0);
      const averageGrade = Math.round(totalScore / progress.length);

      // Obtener XP total
      const { data: gamification } = await (supabase as any)
        .from('user_gamification')
        .select('total_xp')
        .eq('user_id', userId)
        .single();

      // Generar número único de certificado
      const certificateNumber = this.generateCourseCertificateNumber(userId);

      const { data, error } = await (supabase as any)
        .from('course_certificates')
        .insert({
          user_id: userId,
          username,
          certificate_number: certificateNumber,
          issued_date: new Date().toISOString(),
          completion_date: new Date().toISOString(),
          total_modules: 12,
          average_grade: averageGrade,
          total_xp: gamification?.total_xp || 0,
          instructor: 'Lua Master Pro Team'
        })
        .select()
        .single();

      if (error) throw error;

      return { 
        success: true, 
        data, 
        alreadyExists: false,
        message: `¡Felicidades! Has completado los 12 módulos con ${averageGrade}% de promedio.`
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Verificar si usuario puede obtener certificado final
   */
  async canGetCourseCertificate(userId: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // Contar módulos completados
      const { data: progress } = await (supabase as any)
        .from('user_progress')
        .select('module_id, completed')
        .eq('user_id', userId)
        .eq('completed', true);

      const completedCount = progress?.length || 0;
      const percentage = (completedCount / 12) * 100;

      return {
        success: true,
        data: {
          canGet: completedCount >= 12,
          completedCount,
          totalModules: 12,
          percentage: Math.round(percentage)
        }
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Generar número único de certificado de curso
   */
  generateCourseCertificateNumber(userId: string): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Formato: LUA-COURSE-2026-02-ABC123
    return `LUA-COURSE-${year}-${month}-${random}`;
  },

  /**
   * Obtener certificado de usuario
   */
  async getUserCertificates(userId: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('certificates')
        .select('*')
        .eq('user_id', userId)
        .order('issued_date', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener certificado por número (para verificación)
   */
  async getCertificateByNumber(certificateNumber: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('certificates')
        .select('*')
        .eq('certificate_number', certificateNumber)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Verificar autenticidad de certificado
   */
  async verifyCertificate(certificateNumber: string) {
    const result = await this.getCertificateByNumber(certificateNumber);
    
    if (!result.success) {
      return {
        valid: false,
        message: "Certificado no encontrado"
      };
    }

    const cert = result.data;
    
    return {
      valid: true,
      message: "Certificado válido",
      certificate: {
        username: cert.username,
        module_name: cert.module_name,
        issued_date: cert.issued_date,
        grade: cert.grade
      }
    };
  },

  /**
   * Generar PDF del certificado (client-side)
   */
  async generatePDF(certificate: Certificate): Promise<Blob> {
    // En producción, usar una librería como jsPDF o pdfmake
    // Por ahora, retornamos un blob dummy
    
    const svg = this.generateSVG(certificate);
    
    // Convertir SVG a Blob
    return new Blob([svg], { type: 'image/svg+xml' });
  },

  /**
   * Generar SVG del certificado
   */
  generateSVG(certificate: Certificate): string {
    const date = new Date(certificate.issued_date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="600" fill="#1e293b"/>
  
  <!-- Border -->
  <rect x="20" y="20" width="760" height="560" fill="none" stroke="#3b82f6" stroke-width="4"/>
  <rect x="30" y="30" width="740" height="540" fill="none" stroke="#60a5fa" stroke-width="2"/>
  
  <!-- Header -->
  <text x="400" y="100" text-anchor="middle" font-family="Arial" font-size="36" font-weight="bold" fill="#ffffff">
    CERTIFICADO DE COMPLETACIÓN
  </text>
  
  <!-- Subtitle -->
  <text x="400" y="140" text-anchor="middle" font-family="Arial" font-size="18" fill="#94a3b8">
    Lua Master Pro
  </text>
  
  <!-- Student Name -->
  <text x="400" y="200" text-anchor="middle" font-family="Arial" font-size="28" font-weight="bold" fill="#ffffff">
    ${certificate.username}
  </text>
  
  <!-- Completion Text -->
  <text x="400" y="250" text-anchor="middle" font-family="Arial" font-size="16" fill="#cbd5e1">
    Ha completado exitosamente el módulo
  </text>
  
  <!-- Module Name -->
  <text x="400" y="290" text-anchor="middle" font-family="Arial" font-size="24" font-weight="bold" fill="#60a5fa">
    ${certificate.module_name}
  </text>
  
  <!-- Grade -->
  <text x="400" y="340" text-anchor="middle" font-family="Arial" font-size="18" fill="#94a3b8">
    Calificación: ${certificate.grade}%
  </text>
  
  <!-- Date -->
  <text x="400" y="390" text-anchor="middle" font-family="Arial" font-size="14" fill="#64748b">
    ${date}
  </text>
  
  <!-- Certificate Number -->
  <text x="400" y="440" text-anchor="middle" font-family="Arial" font-size="12" fill="#475569">
    Número de Certificado: ${certificate.certificate_number}
  </text>
  
  <!-- Verification URL -->
  <text x="400" y="470" text-anchor="middle" font-family="Arial" font-size="10" fill="#334155">
    Verificar en: https://luamasterpro.com/verify/${certificate.certificate_number}
  </text>
  
  <!-- Decorative Elements -->
  <circle cx="100" cy="100" r="50" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.3"/>
  <circle cx="700" cy="500" r="50" fill="none" stroke="#3b82f6" stroke-width="2" opacity="0.3"/>
  
  <!-- Seal -->
  <circle cx="650" cy="450" r="60" fill="#3b82f6" opacity="0.2"/>
  <text x="650" y="455" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#60a5fa">
    OFFICIAL
  </text>
  <text x="650" y="475" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#60a5fa">
    SEAL
  </text>
</svg>`;
  },

  /**
   * Descargar certificado como imagen
   */
  async downloadCertificate(certificate: Certificate, format: 'svg' | 'png' = 'svg') {
    const svg = this.generateSVG(certificate);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `certificado-${certificate.certificate_number}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Compartir en LinkedIn
   */
  shareOnLinkedIn(certificate: Certificate) {
    const text = encodeURIComponent(
      `¡Acabo de obtener mi certificado de ${certificate.module_name} en Lua Master Pro! 🎓`
    );
    
    const url = encodeURIComponent('https://luamasterpro.com');
    
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`,
      '_blank'
    );
  },

  /**
   * Compartir en Twitter
   */
  shareOnTwitter(certificate: Certificate) {
    const text = encodeURIComponent(
      `¡Acabo de obtener mi certificado de ${certificate.module_name} en Lua Master Pro! 🎓 #Lua #Programming #GameDev`
    );
    
    window.open(
      `https://twitter.com/intent/tweet?text=${text}`,
      '_blank'
    );
  }
};

// ============================================
// COMPONENTE DE VISTA PREVIA DE CERTIFICADO
// ============================================

/**
 * Generar vista previa HTML del certificado
 */
export function generateCertificatePreview(certificate: Certificate): string {
  const date = new Date(certificate.issued_date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<div style="
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 4px solid #3b82f6;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  color: #ffffff;
">
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="font-size: 36px; margin-bottom: 10px; color: #ffffff;">
      🎓 CERTIFICADO DE COMPLETACIÓN
    </h1>
    <p style="font-size: 18px; color: #94a3b8;">Lua Master Pro</p>
  </div>
  
  <div style="text-align: center; margin: 40px 0;">
    <p style="font-size: 16px; color: #cbd5e1;">Este certificado se otorga a</p>
    <h2 style="font-size: 32px; margin: 20px 0; color: #ffffff;">${certificate.username}</h2>
    <p style="font-size: 16px; color: #cbd5e1;">por completar exitosamente el módulo</p>
    <h3 style="font-size: 28px; margin: 20px 0; color: #60a5fa;">${certificate.module_name}</h3>
  </div>
  
  <div style="text-align: center; margin: 30px 0;">
    <div style="display: inline-block; padding: 10px 30px; background: #3b82f6; border-radius: 20px;">
      <span style="font-size: 18px; font-weight: bold;">Calificación: ${certificate.grade}%</span>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #334155;">
    <p style="font-size: 14px; color: #64748b;">${date}</p>
    <p style="font-size: 12px; color: #475569; margin-top: 10px;">
      Número de Certificado: ${certificate.certificate_number}
    </p>
    <p style="font-size: 10px; color: #334155; margin-top: 5px;">
      Verificar en: luamasterpro.com/verify/${certificate.certificate_number}
    </p>
  </div>
  
  <div style="text-align: right; margin-top: 30px;">
    <div style="display: inline-block; padding: 20px; border: 2px solid #3b82f6; border-radius: 50%; width: 100px; height: 100px; line-height: 60px; text-align: center;">
      <span style="font-size: 14px; font-weight: bold; color: #60a5fa;">OFFICIAL<br/>SEAL</span>
    </div>
  </div>
</div>
  `;
}

export default {
  CertificateService,
  generateCertificatePreview
};
