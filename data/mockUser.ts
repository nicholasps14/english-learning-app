import { UserProfile, UserProgress } from "@/lib/types";

export const mockUserProfile: UserProfile = {
  id: "user_001",
  name: "Nicholas Sabino",
  email: "nicholas@example.com",
  nativeLanguage: "Portuguese (Brazilian)",
  createdAt: new Date("2026-01-15"),
  preferences: {
    preferredMode: "tech",
    dailyGoalMinutes: 10,
    notificationsEnabled: true,
    soundEffectsEnabled: true,
    autoPlayAudio: true,
    showTranslations: true,
    theme: "auto",
  },
};

export const mockUserProgress: UserProgress = {
  userId: "user_001",

  // Overall Stats
  totalXP: 892,
  techXP: 650,
  lifeXP: 242,
  currentStreak: 7,
  longestStreak: 12,
  lastStudyDate: new Date(),

  // Levels (calculated from XP)
  techLevel: 3,
  lifeLevel: 2,

  // Learning Progress
  completedLessonIds: [
    "lesson_tech_var_01",
    "lesson_tech_var_02",
    "lesson_tech_var_03",
    "lesson_life_grocery_01",
    "lesson_life_grocery_02",
  ],
  inProgressLessonIds: ["lesson_tech_git_01", "lesson_life_talk_01"],
  learnedVocabularyIds: [
    "tech_var_001",
    "tech_var_002",
    "tech_var_003",
    "tech_var_004",
    "tech_git_001",
    "tech_git_002",
    "life_grocery_001",
    "life_grocery_002",
    "life_grocery_003",
    "life_small_talk_001",
    "life_small_talk_002",
  ],
  masteredVocabularyIds: ["tech_var_001", "life_grocery_001"],

  // Daily Goals
  dailyGoalMinutes: 10,
  dailyGoalCompleted: true,
  studyTimeToday: 12,

  // Achievements
  unlockedAchievementIds: ["achievement_first_lesson", "achievement_week_warrior"],

  // Stats
  totalLessonsCompleted: 5,
  totalVocabularyLearned: 11,
  totalStudyTime: 87, // minutes
  accuracyRate: 87,
};
