// ============================================================================
// DATA MODELS - EnglishFlow App
// Based on PLAN.md specifications
// ============================================================================

export type LearningMode = "tech" | "life";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type ExerciseType = "flashcard" | "multiple-choice" | "fill-blank" | "translate" | "listen-type" | "unscramble" | "match-pairs" | "pronunciation" | "conversation";

// ============================================================================
// VOCABULARY
// ============================================================================

export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  pronunciation: string; // IPA notation
  definition: string;
  exampleSentence: string;
  exampleTranslation: string;
  category: string;
  subcategory: string;
  mode: LearningMode;
  difficulty: DifficultyLevel;
  audioUrl?: string;
  imageUrl?: string;
  synonyms?: string[];
  antonyms?: string[];
  relatedWords?: string[];
  tags?: string[];
}

// ============================================================================
// SPACED REPETITION SYSTEM (SRS)
// ============================================================================

export interface SRSData {
  vocabularyId: string;
  easeFactor: number; // SM-2 algorithm: starts at 2.5
  interval: number; // Days until next review
  repetitions: number; // Number of successful reviews
  nextReviewDate: Date;
  lastReviewDate?: Date;
  reviewHistory: SRSReview[];
}

export interface SRSReview {
  date: Date;
  quality: number; // 0-5 (0 = complete blackout, 5 = perfect response)
  timeSpent: number; // Seconds spent on review
}

// ============================================================================
// LESSONS & EXERCISES
// ============================================================================

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  mode: LearningMode;
  difficulty: DifficultyLevel;
  order: number;
  xpReward: number;
  estimatedMinutes: number;
  vocabularyIds: string[];
  exercises: Exercise[];
  isLocked: boolean;
  unlockRequirement?: {
    level?: number;
    completedLessonIds?: string[];
  };
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  correctAnswer: string;
  options?: string[]; // For multiple-choice
  hint?: string;
  explanation?: string;
  vocabularyId?: string;
}

// ============================================================================
// CATEGORIES
// ============================================================================

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  mode: LearningMode;
  order: number;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  lessonIds: string[];
  vocabularyCount: number;
}

// ============================================================================
// USER PROGRESS
// ============================================================================

export interface UserProgress {
  userId: string;
  hasCompletedOnboarding: boolean;

  // Overall Stats
  totalXP: number;
  techXP: number;
  lifeXP: number;
  currentStreak: number;
  longestStreak: number;
  lastStudyDate?: Date;

  // Levels (calculated from XP)
  techLevel: number;
  lifeLevel: number;

  // Learning Progress
  completedLessonIds: string[];
  inProgressLessonIds: string[];
  learnedVocabularyIds: string[];
  masteredVocabularyIds: string[];

  // Daily Goals
  dailyGoalMinutes: number;
  dailyGoalCompleted: boolean;
  studyTimeToday: number; // minutes

  // Achievements
  unlockedAchievementIds: string[];

  // Stats
  totalLessonsCompleted: number;
  totalVocabularyLearned: number;
  totalStudyTime: number; // minutes
  accuracyRate: number; // 0-100
  bestLessonAccuracy: number; // Best accuracy achieved in any lesson
  hasPerfectLesson: boolean; // Has completed at least one lesson with 100%
}

// ============================================================================
// USER PROFILE
// ============================================================================

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  nativeLanguage: string;
  profilePictureUrl?: string;
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  preferredMode: LearningMode;
  dailyGoalMinutes: number;
  notificationsEnabled: boolean;
  soundEffectsEnabled: boolean;
  autoPlayAudio: boolean;
  showTranslations: boolean;
  theme: "light" | "dark" | "auto";
}

// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: "streak" | "xp" | "lessons" | "vocabulary" | "accuracy";
    value: number;
    mode?: LearningMode;
  };
  xpReward: number;
  isSecret?: boolean;
}

// ============================================================================
// DAILY ACTIVITY
// ============================================================================

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  studyMinutes: number;
  xpEarned: number;
  lessonsCompleted: number;
  vocabularyLearned: number;
  exercisesCompleted: number;
  accuracyRate: number;
}

// ============================================================================
// XP SYSTEM (from PLAN.md)
// ============================================================================

export const XP_REWARDS = {
  LESSON_COMPLETE: 50,
  VOCABULARY_LEARNED: 10,
  EXERCISE_CORRECT: 5,
  DAILY_GOAL_COMPLETE: 25,
  STREAK_BONUS_PER_DAY: 5,
  ACHIEVEMENT_UNLOCK: 100,
} as const;

// Level progression: exponential growth
// Level 1: 0 XP
// Level 2: 100 XP
// Level 3: 250 XP
// Level 4: 500 XP
// Level 5: 1000 XP
export const calculateLevel = (xp: number): number => {
  if (xp < 100) return 1;
  if (xp < 250) return 2;
  if (xp < 500) return 3;
  if (xp < 1000) return 4;
  if (xp < 2000) return 5;
  if (xp < 3500) return 6;
  if (xp < 5500) return 7;
  if (xp < 8000) return 8;
  if (xp < 11000) return 9;
  return 10;
};

export const getXPForNextLevel = (currentLevel: number): number => {
  const levels = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000, 15000];
  return levels[currentLevel] || levels[levels.length - 1];
};
