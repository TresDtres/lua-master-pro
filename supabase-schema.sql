-- ============================================
-- LUA MASTER PRO - SUPABASE DATABASE SCHEMA
-- ============================================
-- Ejecutar en SQL Editor de Supabase:
-- https://app.supabase.com/project/_/sql

-- ============================================
-- 1. TABLA DE USUARIOS
-- ============================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. TABLA DE PROGRESO DE MÓDULOS
-- ============================================

CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  exercises_completed INTEGER DEFAULT 0,
  total_exercises INTEGER NOT NULL,
  quiz_score INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_module_id ON user_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed ON user_progress(completed);

-- Trigger para actualizar updated_at
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. TABLA DE EJERCICIOS COMPLETADOS
-- ============================================

CREATE TABLE IF NOT EXISTS user_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  attempts INTEGER DEFAULT 1,
  xp_earned INTEGER DEFAULT 0,
  hints_used INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exercise_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_exercises_user_id ON user_exercises(user_id);
CREATE INDEX IF NOT EXISTS idx_user_exercises_exercise_id ON user_exercises(exercise_id);
CREATE INDEX IF NOT EXISTS idx_user_exercises_completed ON user_exercises(completed);

-- ============================================
-- 4. TABLA DE QUIZZES COMPLETADOS
-- ============================================

CREATE TABLE IF NOT EXISTS user_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  xp_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_quizzes_user_id ON user_quizzes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quizzes_module_id ON user_quizzes(module_id);

-- ============================================
-- 4b. TABLA DE PROGRESO DE LECCIONES (FASE 2)
-- ============================================

CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  module_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  theory_read BOOLEAN DEFAULT FALSE,
  examples_viewed INTEGER DEFAULT 0,
  interactive_executed BOOLEAN DEFAULT FALSE,
  exercise_completed BOOLEAN DEFAULT FALSE,
  exercise_attempts INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_user_id ON user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_lesson_id ON user_lesson_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_module_id ON user_lesson_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_user_lesson_progress_completed ON user_lesson_progress(completed);

-- Trigger para actualizar updated_at
CREATE TRIGGER update_user_lesson_progress_updated_at
  BEFORE UPDATE ON user_lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. TABLA DE GAMIFICACIÓN
-- ============================================

CREATE TABLE IF NOT EXISTS user_gamification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  xp_in_level INTEGER DEFAULT 0,
  xp_needed INTEGER DEFAULT 100,
  badges TEXT[] DEFAULT '{}',
  streaks_current INTEGER DEFAULT 0,
  streaks_longest INTEGER DEFAULT 0,
  last_activity_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_gamification_user_id ON user_gamification(user_id);
CREATE INDEX IF NOT EXISTS idx_user_gamification_level ON user_gamification(current_level);

-- Trigger para actualizar updated_at
CREATE TRIGGER update_user_gamification_updated_at
  BEFORE UPDATE ON user_gamification
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. TABLA DE ACTIVIDAD
-- ============================================

CREATE TABLE IF NOT EXISTS user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_earned INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity(created_at DESC);

-- ============================================
-- 7. TABLA DE PROYECTOS (ENTREGAS)
-- ============================================

CREATE TABLE IF NOT EXISTS project_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  user_avatar TEXT,
  module_id TEXT NOT NULL,
  module_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  github_url TEXT,
  demo_url TEXT,
  files JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_project_submissions_user_id ON project_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_project_submissions_module_id ON project_submissions(module_id);
CREATE INDEX IF NOT EXISTS idx_project_submissions_status ON project_submissions(status);
CREATE INDEX IF NOT EXISTS idx_project_submissions_created_at ON project_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_submissions_likes ON project_submissions(likes DESC);

-- Trigger para actualizar updated_at
CREATE TRIGGER update_project_submissions_updated_at
  BEFORE UPDATE ON project_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. TABLA DE LIKES DE PROYECTOS
-- ============================================

CREATE TABLE IF NOT EXISTS project_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES project_submissions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_project_likes_project_id ON project_likes(project_id);
CREATE INDEX IF NOT EXISTS idx_project_likes_user_id ON project_likes(user_id);

-- ============================================
-- 9. TABLA DE REVIEWS DE PROYECTOS
-- ============================================

CREATE TABLE IF NOT EXISTS project_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES project_submissions(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_project_reviews_project_id ON project_reviews(project_id);
CREATE INDEX IF NOT EXISTS idx_project_reviews_reviewer_id ON project_reviews(reviewer_id);

-- ============================================
-- 10. STORAGE BUCKET PARA ARCHIVOS
-- ============================================

-- Crear bucket para archivos de proyectos (se ejecuta una vez)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-files', 'project-files', true);

-- ============================================
-- 11. TABLA DE CERTIFICADOS
-- ============================================

CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  module_id TEXT NOT NULL,
  module_name TEXT NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  issued_date TIMESTAMPTZ DEFAULT NOW(),
  grade INTEGER CHECK (grade >= 0 AND grade <= 100),
  instructor TEXT DEFAULT 'Lua Master Pro Team',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_module_id ON certificates(module_id);
CREATE INDEX IF NOT EXISTS idx_certificates_number ON certificates(certificate_number);
CREATE INDEX IF NOT EXISTS idx_certificates_issued_date ON certificates(issued_date DESC);

-- ============================================
-- 11b. TABLA DE CERTIFICADO FINAL DEL CURSO
-- ============================================

CREATE TABLE IF NOT EXISTS course_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  issued_date TIMESTAMPTZ DEFAULT NOW(),
  completion_date TIMESTAMPTZ DEFAULT NOW(),
  total_modules INTEGER DEFAULT 12,
  average_grade INTEGER CHECK (average_grade >= 0 AND average_grade <= 100),
  total_xp INTEGER DEFAULT 0,
  instructor TEXT DEFAULT 'Lua Master Pro Team',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_course_certificates_user_id ON course_certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_course_certificates_number ON course_certificates(certificate_number);
CREATE INDEX IF NOT EXISTS idx_course_certificates_completion_date ON course_certificates(completion_date DESC);

-- ============================================
-- 12. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ÍNDICES ADICIONALES PARA LEADERBOARD
-- ============================================

-- Índice compuesto para leaderboard global
CREATE INDEX IF NOT EXISTS idx_gamification_xp_level 
  ON user_gamification(total_xp DESC, current_level DESC);

-- Índice para actividades recientes (tendencias)
CREATE INDEX IF NOT EXISTS idx_activity_recent 
  ON user_activity(created_at DESC, xp_earned DESC);

-- ============================================
-- POLICIES PARA CERTIFICATES
-- ============================================

-- Usuarios pueden ver sus propios certificados
CREATE POLICY "Users can view own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = user_id);

-- Sistema puede insertar certificados (usar service role en producción)
CREATE POLICY "System can insert certificates"
  ON certificates FOR INSERT
  WITH CHECK (true);

-- Nadie puede actualizar certificados (son inmutables)
CREATE POLICY "No one can update certificates"
  ON certificates FOR UPDATE
  USING (false);

-- Nadie puede eliminar certificados (son permanentes)
CREATE POLICY "No one can delete certificates"
  ON certificates FOR DELETE
  USING (false);

-- ============================================
-- POLICIES PARA USERS
-- ============================================

-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- POLICIES PARA PROJECT_SUBMISSIONS
-- ============================================

-- Todos pueden ver proyectos aprobados
CREATE POLICY "Anyone can view approved projects"
  ON project_submissions FOR SELECT
  USING (status = 'approved' OR auth.uid() = user_id);

-- Usuarios autenticados pueden enviar proyectos
CREATE POLICY "Authenticated users can submit projects"
  ON project_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Usuarios pueden actualizar sus propios proyectos
CREATE POLICY "Users can update own projects"
  ON project_submissions FOR UPDATE
  USING (auth.uid() = user_id);

-- Usuarios pueden eliminar sus propios proyectos
CREATE POLICY "Users can delete own projects"
  ON project_submissions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- POLICIES PARA PROJECT_LIKES
-- ============================================

-- Todos pueden ver likes
CREATE POLICY "Anyone can view likes"
  ON project_likes FOR SELECT
  USING (true);

-- Usuarios autenticados pueden dar like
CREATE POLICY "Authenticated users can like projects"
  ON project_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Usuarios pueden eliminar sus propios likes
CREATE POLICY "Users can delete own likes"
  ON project_likes FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- POLICIES PARA PROJECT_REVIEWS
-- ============================================

-- Todos pueden ver reviews
CREATE POLICY "Anyone can view reviews"
  ON project_reviews FOR SELECT
  USING (true);

-- Usuarios autenticados pueden añadir reviews
CREATE POLICY "Authenticated users can add reviews"
  ON project_reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Usuarios pueden eliminar sus propias reviews
CREATE POLICY "Users can delete own reviews"
  ON project_reviews FOR DELETE
  USING (auth.uid() = reviewer_id);

-- ============================================
-- POLICIES PARA USER_PROGRESS, EXERCISES, QUIZZES, GAMIFICATION, ACTIVITY
-- ============================================

-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- POLICIES PARA USER_PROGRESS
-- ============================================

-- Los usuarios pueden ver su propio progreso
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Los usuarios pueden insertar su propio progreso
CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden actualizar su propio progreso
CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- POLICIES PARA USER_EXERCISES
-- ============================================

CREATE POLICY "Users can view own exercises"
  ON user_exercises FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exercises"
  ON user_exercises FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- POLICIES PARA USER_QUIZZES
-- ============================================

CREATE POLICY "Users can view own quizzes"
  ON user_quizzes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quizzes"
  ON user_quizzes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- POLICIES PARA USER_GAMIFICATION
-- ============================================

CREATE POLICY "Users can view own gamification"
  ON user_gamification FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own gamification"
  ON user_gamification FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- POLICIES PARA USER_ACTIVITY
-- ============================================

CREATE POLICY "Users can view own activity"
  ON user_activity FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
  ON user_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 8. FUNCIONES UTILITARIAS
-- ============================================

-- Función para obtener estadísticas de usuario
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
  total_exercises INTEGER,
  total_quizzes INTEGER,
  total_xp INTEGER,
  current_level INTEGER,
  badges_count INTEGER,
  modules_completed INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM user_exercises WHERE user_id = user_uuid) AS total_exercises,
    (SELECT COUNT(*) FROM user_quizzes WHERE user_id = user_uuid) AS total_quizzes,
    (SELECT total_xp FROM user_gamification WHERE user_id = user_uuid) AS total_xp,
    (SELECT current_level FROM user_gamification WHERE user_id = user_uuid) AS current_level,
    (SELECT array_length(badges, 1) FROM user_gamification WHERE user_id = user_uuid) AS badges_count,
    (SELECT COUNT(*) FROM user_progress WHERE user_id = user_uuid AND completed = TRUE) AS modules_completed;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener leaderboard
CREATE OR REPLACE FUNCTION get_leaderboard(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  avatar TEXT,
  total_xp INTEGER,
  current_level INTEGER,
  rank BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    u.id,
    u.username,
    u.avatar,
    g.total_xp,
    g.current_level,
    RANK() OVER (ORDER BY g.total_xp DESC) AS rank
  FROM users u
  JOIN user_gamification g ON u.id = g.user_id
  ORDER BY g.total_xp DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. DATOS INICIALES (OPCIONAL)
-- ============================================

-- Insertar módulos iniciales (opcional, se pueden añadir dinámicamente)
-- INSERT INTO user_progress (user_id, module_id, total_exercises) VALUES
--   ('user-uuid', 'mes-01', 16),
--   ('user-uuid', 'mes-02', 9),
--   ... etc;

-- ============================================
-- FIN DEL SCHEMA
-- ============================================
