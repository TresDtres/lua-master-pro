// ============================================
// SISTEMA DE GAMIFICACIÓN - XP, NIVELES, INSIGNIAS
// ============================================

export interface UserProgress {
  userId: string;
  totalXP: number;
  currentLevel: number;
  xpInCurrentLevel: number;
  xpNeededForNextLevel: number;
  completedExercises: string[];
  completedQuizzes: { moduleId: string; score: number }[];
  badges: Badge[];
  stats: UserStats;
  streaks: Streaks;
}

export interface UserStats {
  totalExercisesCompleted: number;
  totalQuizzesCompleted: number;
  totalPlayTimeMinutes: number;
  averageQuizScore: number;
  perfectQuizzes: number;
  exercisesByDifficulty: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  modulesCompleted: number;
  totalAttempts: number;
}

export interface Streaks {
  currentDayStreak: number;
  longestDayStreak: number;
  lastActivityDate: string;
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  xpReward: number;
  unlockedAt?: string;
  requirements: BadgeRequirements;
}

export type BadgeCategory = 
  | "progress"      // Progreso general
  | "exercises"     // Ejercicios completados
  | "quizzes"       // Quizzes completados
  | "streak"        // Rachas
  | "mastery"       // Maestría
  | "special";      // Especiales

export type BadgeRarity = 
  | "common"      // Gris
  | "uncommon"    // Verde
  | "rare"        // Azul
  | "epic"        // Morado
  | "legendary";  // Dorado

export interface BadgeRequirements {
  type: string;
  target: number | string;
  description: string;
}

// ============================================
// SISTEMA DE NIVELES
// ============================================

export class LevelSystem {
  private static readonly BASE_XP = 100;
  private static readonly GROWTH_FACTOR = 1.5;

  /**
   * Calcula el XP necesario para el siguiente nivel
   */
  static getXpForLevel(level: number): number {
    return Math.floor(this.BASE_XP * Math.pow(level, this.GROWTH_FACTOR));
  }

  /**
   * Calcula el nivel actual basado en el XP total
   */
  static getLevelFromXp(totalXp: number): { level: number; xpInLevel: number; xpNeeded: number } {
    let level = 1;
    let xpNeeded = this.getXpForLevel(level);
    let xpAccumulated = 0;

    while (totalXp >= xpNeeded) {
      xpAccumulated += xpNeeded;
      level++;
      xpNeeded = this.getXpForLevel(level);
    }

    const xpInCurrentLevel = totalXp - xpAccumulated;
    const xpForNextLevel = this.getXpForLevel(level);

    return {
      level,
      xpInLevel: xpInCurrentLevel,
      xpNeeded: xpForNextLevel - xpInCurrentLevel
    };
  }

  /**
   * Calcula el progreso de nivel (0-100%)
   */
  static getLevelProgress(xpInLevel: number, xpNeeded: number): number {
    return Math.min(100, Math.floor((xpInLevel / xpNeeded) * 100));
  }

  /**
   * Obtiene el título del nivel
   */
  static getLevelTitle(level: number): string {
    const titles: Record<number, string> = {
      1: "Novato",
      2: "Aprendiz",
      3: "Estudiante",
      4: "Programador",
      5: "Desarrollador",
      6: "Scripter",
      7: "Experto",
      8: "Maestro",
      9: "Legendario",
      10: "Épico",
      11: "Divino",
      12: "Transcendente",
      13: "Infinito",
      14: "Omnipotente",
      15: "Eterno",
      16: "Cósmico",
      17: "Universal",
      18: "Multiversal",
      19: "Omnisciente",
      20: "Dios del Código"
    };

    if (level <= 20) {
      return titles[level] || `Nivel ${level}`;
    }

    // Niveles más allá de 20
    const prestige = Math.floor((level - 1) / 20);
    const levelInPrestige = ((level - 1) % 20) + 1;
    const prestigeNames = ["", "Maestro ", "Gran Maestro ", "Legendario ", "Divino "];
    const prestigeName = prestigeNames[Math.min(prestige, 4)] || `Prestigio ${prestige} `;
    
    return `${prestigeName}${titles[levelInPrestige] || `Nivel ${levelInPrestige}`}`;
  }

  /**
   * Obtiene el color del nivel
   */
  static getLevelColor(level: number): string {
    if (level <= 5) return "text-gray-400";      // Gris
    if (level <= 10) return "text-green-400";    // Verde
    if (level <= 15) return "text-blue-400";     // Azul
    if (level <= 20) return "text-purple-400";   // Morado
    return "text-yellow-400";                     // Dorado
  }

  /**
   * Obtiene el badge del nivel
   */
  static getLevelBadge(level: number): string {
    if (level <= 5) return "🌱";      // Brote
    if (level <= 10) return "🌿";     // Planta
    if (level <= 15) return "🌳";     // Árbol
    if (level <= 20) return "⭐";     // Estrella
    return "👑";                       // Corona
  }
}

// ============================================
// SISTEMA DE INSIGNIAS
// ============================================

export class BadgeSystem {
  private static readonly BADGES: Badge[] = [
    // ============================================
    // PROGRESO GENERAL
    // ============================================
    {
      id: "first_steps",
      name: "Primeros Pasos",
      description: "Completa tu primer ejercicio",
      icon: "👣",
      category: "progress",
      rarity: "common",
      xpReward: 50,
      requirements: {
        type: "exercises_completed",
        target: 1,
        description: "Completa 1 ejercicio"
      }
    },
    {
      id: "getting_started",
      name: "Empezando",
      description: "Completa 10 ejercicios",
      icon: "🚀",
      category: "progress",
      rarity: "common",
      xpReward: 100,
      requirements: {
        type: "exercises_completed",
        target: 10,
        description: "Completa 10 ejercicios"
      }
    },
    {
      id: "dedicated",
      name: "Dedicado",
      description: "Completa 50 ejercicios",
      icon: "💪",
      category: "progress",
      rarity: "uncommon",
      xpReward: 250,
      requirements: {
        type: "exercises_completed",
        target: 50,
        description: "Completa 50 ejercicios"
      }
    },
    {
      id: "master",
      name: "Maestro",
      description: "Completa 100 ejercicios",
      icon: "🏆",
      category: "progress",
      rarity: "rare",
      xpReward: 500,
      requirements: {
        type: "exercises_completed",
        target: 100,
        description: "Completa 100 ejercicios"
      }
    },
    {
      id: "legendary",
      name: "Legendario",
      description: "Completa todos los ejercicios",
      icon: "👑",
      category: "progress",
      rarity: "legendary",
      xpReward: 1000,
      requirements: {
        type: "exercises_completed",
        target: 142,
        description: "Completa 142 ejercicios"
      }
    },

    // ============================================
    // QUIZZES
    // ============================================
    {
      id: "quiz_novice",
      name: "Novato de Quizzes",
      description: "Completa tu primer quiz",
      icon: "📝",
      category: "quizzes",
      rarity: "common",
      xpReward: 50,
      requirements: {
        type: "quizzes_completed",
        target: 1,
        description: "Completa 1 quiz"
      }
    },
    {
      id: "quiz_expert",
      name: "Experto de Quizzes",
      description: "Completa 50 quizzes con 80% o más",
      icon: "🎓",
      category: "quizzes",
      rarity: "rare",
      xpReward: 300,
      requirements: {
        type: "quizzes_perfect",
        target: 50,
        description: "50 quizzes con 80%+"
      }
    },
    {
      id: "perfect_score",
      name: "Puntuación Perfecta",
      description: "Obtén 100% en un quiz",
      icon: "💯",
      category: "quizzes",
      rarity: "uncommon",
      xpReward: 150,
      requirements: {
        type: "quiz_score",
        target: 100,
        description: "100% en un quiz"
      }
    },

    // ============================================
    // RACHAS
    // ============================================
    {
      id: "first_streak",
      name: "Primera Racha",
      description: "Mantén una racha de 3 días",
      icon: "🔥",
      category: "streak",
      rarity: "uncommon",
      xpReward: 100,
      requirements: {
        type: "day_streak",
        target: 3,
        description: "3 días consecutivos"
      }
    },
    {
      id: "week_warrior",
      name: "Guerrero Semanal",
      description: "Mantén una racha de 7 días",
      icon: "⚔️",
      category: "streak",
      rarity: "rare",
      xpReward: 250,
      requirements: {
        type: "day_streak",
        target: 7,
        description: "7 días consecutivos"
      }
    },
    {
      id: "monthly_master",
      name: "Maestro Mensual",
      description: "Mantén una racha de 30 días",
      icon: "🌟",
      category: "streak",
      rarity: "epic",
      xpReward: 500,
      requirements: {
        type: "day_streak",
        target: 30,
        description: "30 días consecutivos"
      }
    },

    // ============================================
    // MAESTRÍA POR DIFICULTAD
    // ============================================
    {
      id: "beginner_master",
      name: "Maestro Principiante",
      description: "Completa 20 ejercicios de nivel principiante",
      icon: "🌱",
      category: "mastery",
      rarity: "uncommon",
      xpReward: 200,
      requirements: {
        type: "difficulty_completed",
        target: 20,
        description: "20 ejercicios beginner"
      }
    },
    {
      id: "intermediate_master",
      name: "Maestro Intermedio",
      description: "Completa 30 ejercicios de nivel intermedio",
      icon: "🌿",
      category: "mastery",
      rarity: "rare",
      xpReward: 350,
      requirements: {
        type: "difficulty_completed",
        target: 30,
        description: "30 ejercicios intermediate"
      }
    },
    {
      id: "advanced_master",
      name: "Maestro Avanzado",
      description: "Completa 20 ejercicios de nivel avanzado",
      icon: "🔥",
      category: "mastery",
      rarity: "epic",
      xpReward: 500,
      requirements: {
        type: "difficulty_completed",
        target: 20,
        description: "20 ejercicios advanced"
      }
    },

    // ============================================
    // ESPECIALES
    // ============================================
    {
      id: "speed_demon",
      name: "Demonio de Velocidad",
      description: "Completa un ejercicio en menos de 2 minutos",
      icon: "⚡",
      category: "special",
      rarity: "rare",
      xpReward: 200,
      requirements: {
        type: "exercise_time",
        target: 120,
        description: "< 2 minutos en ejercicio"
      }
    },
    {
      id: "no_hints",
      name: "Sin Ayudas",
      description: "Completa 10 ejercicios sin ver hints",
      icon: "🛡️",
      category: "special",
      rarity: "epic",
      xpReward: 400,
      requirements: {
        type: "no_hints",
        target: 10,
        description: "10 ejercicios sin hints"
      }
    },
    {
      id: "first_try",
      name: "Al Primer Intento",
      description: "Completa 5 ejercicios al primer intento",
      icon: "🎯",
      category: "special",
      rarity: "epic",
      xpReward: 450,
      requirements: {
        type: "first_attempt",
        target: 5,
        description: "5 ejercicios al primer intento"
      }
    },
    {
      id: "course_complete",
      name: "Curso Completado",
      description: "Completa todos los módulos del curso",
      icon: "🎓",
      category: "special",
      rarity: "legendary",
      xpReward: 2000,
      requirements: {
        type: "modules_completed",
        target: 12,
        description: "12 módulos completados"
      }
    }
  ];

  /**
   * Obtiene todas las insignias disponibles
   */
  static getAllBadges(): Badge[] {
    return this.BADGES;
  }

  /**
   * Obtiene insignias por categoría
   */
  static getBadgesByCategory(category: BadgeCategory): Badge[] {
    return this.BADGES.filter(b => b.category === category);
  }

  /**
   * Obtiene insignias por rareza
   */
  static getBadgesByRarity(rarity: BadgeRarity): Badge[] {
    return this.BADGES.filter(b => b.rarity === rarity);
  }

  /**
   * Verifica si se cumplen los requisitos de una insignia
   */
  static checkBadgeRequirements(badge: Badge, progress: UserProgress): boolean {
    const req = badge.requirements;

    switch (req.type) {
      case "exercises_completed":
        return progress.completedExercises.length >= (req.target as number);

      case "quizzes_completed":
        return progress.completedQuizzes.length >= (req.target as number);

      case "quizzes_perfect":
        return progress.completedQuizzes.filter(q => q.score >= 80).length >= (req.target as number);

      case "quiz_score":
        return progress.completedQuizzes.some(q => q.score === 100);

      case "day_streak":
        return progress.streaks.currentDayStreak >= (req.target as number);

      case "difficulty_completed":
        return progress.stats.exercisesByDifficulty.beginner >= (req.target as number) ||
               progress.stats.exercisesByDifficulty.intermediate >= (req.target as number) ||
               progress.stats.exercisesByDifficulty.advanced >= (req.target as number);

      case "exercise_time":
        // Implementar tracking de tiempo por ejercicio
        return false;

      case "no_hints":
        // Implementar tracking de hints usados
        return false;

      case "first_attempt":
        // Implementar tracking de intentos
        return false;

      case "modules_completed":
        return progress.stats.modulesCompleted >= (req.target as number);

      default:
        return false;
    }
  }

  /**
   * Verifica nuevas insignias desbloqueadas
   */
  static checkNewBadges(progress: UserProgress): Badge[] {
    const newBadges: Badge[] = [];

    for (const badge of this.BADGES) {
      // Si ya tiene la insignia, saltar
      if (progress.badges.some(b => b.id === badge.id)) {
        continue;
      }

      // Verificar requisitos
      if (this.checkBadgeRequirements(badge, progress)) {
        newBadges.push({
          ...badge,
          unlockedAt: new Date().toISOString()
        });
      }
    }

    return newBadges;
  }

  /**
   * Obtiene el color de rareza
   */
  static getRarityColor(rarity: BadgeRarity): string {
    const colors: Record<BadgeRarity, string> = {
      common: "text-gray-400 border-gray-400 bg-gray-400/10",
      uncommon: "text-green-400 border-green-400 bg-green-400/10",
      rare: "text-blue-400 border-blue-400 bg-blue-400/10",
      epic: "text-purple-400 border-purple-400 bg-purple-400/10",
      legendary: "text-yellow-400 border-yellow-400 bg-yellow-400/10"
    };
    return colors[rarity];
  }
}

// ============================================
// TRACKER DE GAMIFICACIÓN
// ============================================

export class GamificationTracker {
  private progress: UserProgress;

  constructor(userId: string) {
    this.progress = this.initializeProgress(userId);
  }

  private initializeProgress(userId: string): UserProgress {
    const levelInfo = LevelSystem.getLevelFromXp(0);
    
    return {
      userId,
      totalXP: 0,
      currentLevel: levelInfo.level,
      xpInCurrentLevel: levelInfo.xpInLevel,
      xpNeededForNextLevel: levelInfo.xpNeeded,
      completedExercises: [],
      completedQuizzes: [],
      badges: [],
      stats: {
        totalExercisesCompleted: 0,
        totalQuizzesCompleted: 0,
        totalPlayTimeMinutes: 0,
        averageQuizScore: 0,
        perfectQuizzes: 0,
        exercisesByDifficulty: {
          beginner: 0,
          intermediate: 0,
          advanced: 0
        },
        modulesCompleted: 0,
        totalAttempts: 0
      },
      streaks: {
        currentDayStreak: 0,
        longestDayStreak: 0,
        lastActivityDate: "",
        weeklyGoal: 5,
        weeklyProgress: 0
      }
    };
  }

  /**
   * Añade XP al usuario
   */
  addXp(amount: number, source: string): { leveledUp: boolean; newLevel: number } {
    const oldLevel = this.progress.currentLevel;
    this.progress.totalXP += amount;
    
    const levelInfo = LevelSystem.getLevelFromXp(this.progress.totalXP);
    this.progress.currentLevel = levelInfo.level;
    this.progress.xpInCurrentLevel = levelInfo.xpInLevel;
    this.progress.xpNeededForNextLevel = levelInfo.xpNeeded;

    const leveledUp = this.progress.currentLevel > oldLevel;

    return {
      leveledUp,
      newLevel: this.progress.currentLevel
    };
  }

  /**
   * Registra ejercicio completado
   */
  completeExercise(exerciseId: string, difficulty: string, attempts: number): number {
    // Evitar duplicados
    if (this.progress.completedExercises.includes(exerciseId)) {
      return 0;
    }

    this.progress.completedExercises.push(exerciseId);
    this.progress.stats.totalExercisesCompleted++;
    this.progress.stats.totalAttempts += attempts;

    // Actualizar por dificultad
    if (difficulty === "beginner") {
      this.progress.stats.exercisesByDifficulty.beginner++;
    } else if (difficulty === "intermediate") {
      this.progress.stats.exercisesByDifficulty.intermediate++;
    } else if (difficulty === "advanced") {
      this.progress.stats.exercisesByDifficulty.advanced++;
    }

    // Actualizar racha
    this.updateStreak();

    // Verificar nuevas insignias
    const newBadges = BadgeSystem.checkNewBadges(this.progress);
    this.progress.badges.push(...newBadges);

    // Calcular XP ganada
    const xpEarned = this.calculateExerciseXp(difficulty, attempts);
    this.addXp(xpEarned, `exercise:${exerciseId}`);

    return xpEarned;
  }

  /**
   * Registra quiz completado
   */
  completeQuiz(moduleId: string, score: number): number {
    this.progress.completedQuizzes.push({ moduleId, score });
    this.progress.stats.totalQuizzesCompleted++;

    // Actualizar promedio
    const totalScore = this.progress.completedQuizzes.reduce((sum, q) => sum + q.score, 0);
    this.progress.stats.averageQuizScore = Math.floor(totalScore / this.progress.completedQuizzes.length);

    // Quiz perfecto
    if (score === 100) {
      this.progress.stats.perfectQuizzes++;
    }

    // Actualizar racha
    this.updateStreak();

    // Verificar insignias
    const newBadges = BadgeSystem.checkNewBadges(this.progress);
    this.progress.badges.push(...newBadges);

    // Calcular XP
    const xpEarned = this.calculateQuizXp(score);
    this.addXp(xpEarned, `quiz:${moduleId}`);

    return xpEarned;
  }

  /**
   * Calcula XP por ejercicio
   */
  private calculateExerciseXp(difficulty: string, attempts: number): number {
    const baseXp: Record<string, number> = {
      beginner: 50,
      intermediate: 75,
      advanced: 100
    };

    const difficultyMultiplier = baseXp[difficulty] || 50;
    const attemptPenalty = Math.max(0.5, 1 - (attempts - 1) * 0.1);

    return Math.floor(difficultyMultiplier * attemptPenalty);
  }

  /**
   * Calcula XP por quiz
   */
  private calculateQuizXp(score: number): number {
    const baseXp = 100;
    const scoreMultiplier = score / 100;
    
    return Math.floor(baseXp * scoreMultiplier);
  }

  /**
   * Actualiza la racha de actividad
   */
  private updateStreak() {
    const today = new Date().toDateString();
    const lastActivity = this.progress.streaks.lastActivityDate;

    if (lastActivity === today) {
      // Ya activó hoy
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActivity === yesterday.toDateString()) {
      // Racha continúa
      this.progress.streaks.currentDayStreak++;
    } else {
      // Racha se reinicia
      this.progress.streaks.currentDayStreak = 1;
    }

    // Actualizar racha más larga
    if (this.progress.streaks.currentDayStreak > this.progress.streaks.longestDayStreak) {
      this.progress.streaks.longestDayStreak = this.progress.streaks.currentDayStreak;
    }

    this.progress.streaks.lastActivityDate = today;
    this.progress.streaks.weeklyProgress++;
  }

  /**
   * Obtiene el progreso actual
   */
  getProgress(): UserProgress {
    return { ...this.progress };
  }

  /**
   * Exporta el progreso para guardar
   */
  export(): object {
    return {
      progress: this.progress,
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Importa progreso desde guardado
   */
  import(data: any): void {
    if (data.progress) {
      this.progress = data.progress;
    }
  }
}

export default {
  LevelSystem,
  BadgeSystem,
  GamificationTracker
};
