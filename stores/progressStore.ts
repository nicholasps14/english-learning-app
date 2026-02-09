import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserProgress,
  DailyActivity,
  calculateLevel,
  XP_REWARDS,
} from "@/lib/types";

interface ProgressState {
  progress: UserProgress | null;
  dailyActivities: DailyActivity[];
  isLoading: boolean;
  currentUserEmail: string | null;

  // Actions
  setCurrentUser: (email: string) => void;
  addXP: (amount: number, mode: "tech" | "life") => void;
  completeLesson: (lessonId: string, mode: "tech" | "life") => void;
  learnVocabulary: (vocabularyId: string) => void;
  masterVocabulary: (vocabularyId: string) => void;
  updateStreak: () => void;
  addStudyTime: (minutes: number) => void;
  unlockAchievement: (achievementId: string) => void;
  loadProgress: () => Promise<void>;
  saveProgress: () => Promise<void>;
  resetProgress: () => Promise<void>;
}

const getStorageKey = (email: string) => `@englishflow:user_progress:${email}`;
const getActivitiesKey = (email: string) => `@englishflow:daily_activities:${email}`;

const createInitialProgress = (): UserProgress => ({
  userId: "default",
  totalXP: 0,
  techXP: 0,
  lifeXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  techLevel: 1,
  lifeLevel: 1,
  completedLessonIds: [],
  inProgressLessonIds: [],
  learnedVocabularyIds: [],
  masteredVocabularyIds: [],
  dailyGoalMinutes: 10,
  dailyGoalCompleted: false,
  studyTimeToday: 0,
  unlockedAchievementIds: [],
  totalLessonsCompleted: 0,
  totalVocabularyLearned: 0,
  totalStudyTime: 0,
  accuracyRate: 0,
});

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: null,
  dailyActivities: [],
  isLoading: false,
  currentUserEmail: null,

  setCurrentUser: async (email) => {
    set({ currentUserEmail: email });
    await get().loadProgress();
  },

  addXP: (amount, mode) => {
    const { progress } = get();
    if (!progress) return;

    const newProgress = { ...progress };
    newProgress.totalXP += amount;

    if (mode === "tech") {
      newProgress.techXP += amount;
      newProgress.techLevel = calculateLevel(newProgress.techXP);
    } else {
      newProgress.lifeXP += amount;
      newProgress.lifeLevel = calculateLevel(newProgress.lifeXP);
    }

    set({ progress: newProgress });
    get().saveProgress();
  },

  completeLesson: (lessonId, mode) => {
    const { progress, addXP } = get();
    if (!progress) return;

    const newProgress = { ...progress };

    // Add to completed lessons
    if (!newProgress.completedLessonIds.includes(lessonId)) {
      newProgress.completedLessonIds.push(lessonId);
      newProgress.totalLessonsCompleted += 1;
    }

    // Remove from in-progress
    newProgress.inProgressLessonIds = newProgress.inProgressLessonIds.filter(
      (id) => id !== lessonId
    );

    set({ progress: newProgress });
    addXP(XP_REWARDS.LESSON_COMPLETE, mode);
  },

  learnVocabulary: (vocabularyId) => {
    const { progress, addXP } = get();
    if (!progress) return;

    if (progress.learnedVocabularyIds.includes(vocabularyId)) return;

    const newProgress = { ...progress };
    newProgress.learnedVocabularyIds.push(vocabularyId);
    newProgress.totalVocabularyLearned += 1;

    set({ progress: newProgress });
    addXP(XP_REWARDS.VOCABULARY_LEARNED, "tech"); // Default to tech, adjust as needed
  },

  masterVocabulary: (vocabularyId) => {
    const { progress } = get();
    if (!progress) return;

    if (progress.masteredVocabularyIds.includes(vocabularyId)) return;

    const newProgress = { ...progress };
    newProgress.masteredVocabularyIds.push(vocabularyId);

    set({ progress: newProgress });
    get().saveProgress();
  },

  updateStreak: () => {
    const { progress } = get();
    if (!progress) return;

    const today = new Date();
    const lastStudy = progress.lastStudyDate ? new Date(progress.lastStudyDate) : null;

    if (!lastStudy) {
      // First study session
      const newProgress = {
        ...progress,
        currentStreak: 1,
        longestStreak: 1,
        lastStudyDate: today,
      };
      set({ progress: newProgress });
      get().saveProgress();
      return;
    }

    const daysDiff = Math.floor(
      (today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff === 0) {
      // Same day, no change
      return;
    } else if (daysDiff === 1) {
      // Consecutive day, increment streak
      const newStreak = progress.currentStreak + 1;
      const newProgress = {
        ...progress,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, progress.longestStreak),
        lastStudyDate: today,
      };
      set({ progress: newProgress });
      get().saveProgress();
    } else {
      // Streak broken
      const newProgress = {
        ...progress,
        currentStreak: 1,
        lastStudyDate: today,
      };
      set({ progress: newProgress });
      get().saveProgress();
    }
  },

  addStudyTime: (minutes) => {
    const { progress } = get();
    if (!progress) return;

    const newProgress = { ...progress };
    newProgress.studyTimeToday += minutes;
    newProgress.totalStudyTime += minutes;

    // Check if daily goal is completed
    if (
      !newProgress.dailyGoalCompleted &&
      newProgress.studyTimeToday >= newProgress.dailyGoalMinutes
    ) {
      newProgress.dailyGoalCompleted = true;
      // Add bonus XP
      get().addXP(XP_REWARDS.DAILY_GOAL_COMPLETE, "tech");
    }

    set({ progress: newProgress });
    get().updateStreak();
  },

  unlockAchievement: (achievementId) => {
    const { progress, addXP } = get();
    if (!progress) return;

    if (progress.unlockedAchievementIds.includes(achievementId)) return;

    const newProgress = { ...progress };
    newProgress.unlockedAchievementIds.push(achievementId);

    set({ progress: newProgress });
    addXP(XP_REWARDS.ACHIEVEMENT_UNLOCK, "tech");
  },

  loadProgress: async () => {
    const { currentUserEmail } = get();
    if (!currentUserEmail) {
      console.log("No user email set, skipping load");
      return;
    }

    set({ isLoading: true });
    try {
      const STORAGE_KEY = getStorageKey(currentUserEmail);
      const ACTIVITIES_KEY = getActivitiesKey(currentUserEmail);

      const [progressData, activitiesData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(ACTIVITIES_KEY),
      ]);

      const progress = progressData
        ? JSON.parse(progressData)
        : createInitialProgress();

      // Convert date strings back to Date objects
      if (progress.lastStudyDate) {
        progress.lastStudyDate = new Date(progress.lastStudyDate);
      }

      const dailyActivities = activitiesData ? JSON.parse(activitiesData) : [];

      set({ progress, dailyActivities });
    } catch (error) {
      console.error("Failed to load progress:", error);
      set({ progress: createInitialProgress() });
    } finally {
      set({ isLoading: false });
    }
  },

  saveProgress: async () => {
    const { progress, currentUserEmail } = get();
    if (!progress || !currentUserEmail) return;

    try {
      const STORAGE_KEY = getStorageKey(currentUserEmail);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  },

  resetProgress: async () => {
    const { currentUserEmail } = get();
    if (!currentUserEmail) return;

    const STORAGE_KEY = getStorageKey(currentUserEmail);
    const ACTIVITIES_KEY = getActivitiesKey(currentUserEmail);

    const newProgress = createInitialProgress();
    set({ progress: newProgress, dailyActivities: [] });
    try {
      await AsyncStorage.multiRemove([STORAGE_KEY, ACTIVITIES_KEY]);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error("Failed to reset progress:", error);
    }
  },
}));
