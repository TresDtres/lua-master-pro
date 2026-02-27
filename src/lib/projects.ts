// ============================================
// SISTEMA DE ENTREGA DE PROYECTOS
// ============================================

import { supabase, isSupabaseConfigured } from './supabase';
import type { Database } from './supabase.types';

// ============================================
// TIPOS DE DATOS
// ============================================

export interface ProjectSubmission {
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
  files?: ProjectFile[];
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  rating?: number;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface ProjectReview {
  id: string;
  project_id: string;
  reviewer_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

// ============================================
// SERVICIO DE PROYECTOS
// ============================================

export const ProjectService = {
  /**
   * Enviar proyecto
   */
  async submitProject(submission: Omit<ProjectSubmission, 'id' | 'status' | 'views' | 'likes' | 'created_at' | 'updated_at'>) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('project_submissions')
        .insert({
          ...submission,
          status: 'pending',
          views: 0,
          likes: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener proyectos de un usuario
   */
  async getUserProjects(userId: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('project_submissions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener proyectos de un módulo
   */
  async getModuleProjects(moduleId: string, limit: number = 20) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('project_submissions')
        .select('*')
        .eq('module_id', moduleId)
        .eq('status', 'approved')
        .order('likes', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener todos los proyectos (gallery)
   */
  async getAllProjects(limit: number = 50) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('project_submissions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener un proyecto por ID
   */
  async getProject(projectId: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('project_submissions')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;

      // Incrementar vistas
      await (supabase as any)
        .from('project_submissions')
        .update({ views: data.views + 1 })
        .eq('id', projectId);

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Actualizar estado del proyecto
   */
  async updateProjectStatus(projectId: string, status: 'pending' | 'approved' | 'rejected', feedback?: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('project_submissions')
        .update({
          status,
          feedback,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Dar like a un proyecto
   */
  async likeProject(projectId: string, userId: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // Verificar si ya dio like
      const { data: existingLike } = await (supabase as any)
        .from('project_likes')
        .select('*')
        .eq('project_id', projectId)
        .eq('user_id', userId)
        .single();

      if (existingLike) {
        // Remove like
        await (supabase as any)
          .from('project_likes')
          .delete()
          .eq('id', existingLike.id);

        const { data: project } = await (supabase as any)
          .from('project_submissions')
          .select('likes')
          .eq('id', projectId)
          .single();

        await (supabase as any)
          .from('project_submissions')
          .update({ likes: project.likes - 1 })
          .eq('id', projectId);

        return { success: true, liked: false };
      } else {
        // Add like
        await (supabase as any)
          .from('project_likes')
          .insert({
            project_id: projectId,
            user_id: userId,
            created_at: new Date().toISOString()
          });

        const { data: project } = await (supabase as any)
          .from('project_submissions')
          .select('likes')
          .eq('id', projectId)
          .single();

        await (supabase as any)
          .from('project_submissions')
          .update({ likes: project.likes + 1 })
          .eq('id', projectId);

        return { success: true, liked: true };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Subir archivo a Storage
   */
  async uploadFile(file: File, projectId: string, userId: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${projectId}/${Date.now()}.${fileExt}`;

      const { data, error } = await (supabase as any)
        .storage
        .from('project-files')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = (supabase as any).storage
        .from('project-files')
        .getPublicUrl(fileName);

      return {
        success: true,
        data: {
          name: file.name,
          url: publicUrl,
          size: file.size,
          type: file.type
        }
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Eliminar proyecto
   */
  async deleteProject(projectId: string, userId: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      // Verificar que el usuario es el dueño
      const { data: project } = await (supabase as any)
        .from('project_submissions')
        .select('user_id')
        .eq('id', projectId)
        .single();

      if (project.user_id !== userId) {
        return { success: false, error: "No autorizado" };
      }

      // Eliminar archivos primero
      const { data: files } = await (supabase as any)
        .storage
        .from('project-files')
        .list(`${userId}/${projectId}`);

      if (files) {
        await (supabase as any)
          .storage
          .from('project-files')
          .remove(files.map((f: any) => `${userId}/${projectId}/${f.name}`));
      }

      // Eliminar proyecto
      const { error } = await (supabase as any)
        .from('project_submissions')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};

// ============================================
// SERVICIO DE REVIEWS
// ============================================

export const ReviewService = {
  /**
   * Añadir review a proyecto
   */
  async addReview(projectId: string, userId: string, userName: string, rating: number, comment: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('project_reviews')
        .insert({
          project_id: projectId,
          reviewer_id: userId,
          reviewer_name: userName,
          rating,
          comment,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Obtener reviews de un proyecto
   */
  async getProjectReviews(projectId: string) {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: "Supabase no configurado" };
    }

    try {
      const { data, error } = await (supabase as any)
        .from('project_reviews')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
};

export default {
  ProjectService,
  ReviewService
};
