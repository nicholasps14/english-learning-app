import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
  setCurrentUser: (email: string) => Promise<void>;
  addXP: (amount: number, mode: "tech" | "life") => void;
  completeLesson: (lessonId: string, mode: "tech" | "life", accuracy?: number) => void;
  learnVocabulary: (vocabularyId: string) => void;
  masterVocabulary: (vocabularyId: string) => void;
  updateStreak: () => void;
  addStudyTime: (minutes: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateDailyGoal: (minutes: number) => void;
  completeOnboarding: () => void;
  loadProgress: () => Promise<void>;
  saveProgress: () => Promise<void>;
  resetProgress: () => Promise<void>;
}

const getStorageKey = (email: string) => `@englishflow:user_progress:${email}`;
const getActivitiesKey = (email: string) => `@englishflow:daily_activities:${email}`;

// Get sanitized email for Firestore document ID (remove invalid characters)
const getFirestoreDocId = (email: string) => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};

const createInitialProgress = (): UserProgress => ({
  userId: "default",
  hasCompletedOnboarding: false,
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
  bestLessonAccuracy: 0,
  hasPerfectLesson: false,
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

  completeLesson: (lessonId, mode, accuracy = 0) => {
    const { progress, addXP } = get();
    if (!progress) return;

    // Only add XP and count if not already completed
    if (!progress.completedLessonIds.includes(lessonId)) {
      const newProgress = { ...progress };

      // Add to completed lessons
      newProgress.completedLessonIds.push(lessonId);

      // Remove from in-progress if it was there
      newProgress.inProgressLessonIds = newProgress.inProgressLessonIds.filter(
        (id) => id !== lessonId
      );

      // Increment total lessons completed
      newProgress.totalLessonsCompleted += 1;

      // Update accuracy tracking
      if (accuracy > newProgress.bestLessonAccuracy) {
        newProgress.bestLessonAccuracy = accuracy;
      }
      if (accuracy === 100) {
        newProgress.hasPerfectLesson = true;
      }

      set({ progress: newProgress });
      get().saveProgress();

      // Add XP reward
      addXP(XP_REWARDS.LESSON_COMPLETE, mode);
    }
  },

  learnVocabulary: (vocabularyId) => {
    const { progress } = get();
    if (!progress || progress.learnedVocabularyIds.includes(vocabularyId))
      return;

    const newProgress = { ...progress };
    newProgress.learnedVocabularyIds.push(vocabularyId);
    newProgress.totalVocabularyLearned += 1;

    set({ progress: newProgress });
    get().saveProgress();
  },

  masterVocabulary: (vocabularyId) => {
    const { progress } = get();
    if (!progress || progress.masteredVocabularyIds.includes(vocabularyId))
      return;

    const newProgress = { ...progress };
    if (!newProgress.learnedVocabularyIds.includes(vocabularyId)) {
      newProgress.learnedVocabularyIds.push(vocabularyId);
    }
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

  updateDailyGoal: (minutes) => {
    const { progress } = get();
    if (!progress) return;

    const newProgress = { ...progress };
    newProgress.dailyGoalMinutes = minutes;

    set({ progress: newProgress });
    get().saveProgress();
  },

  completeOnboarding: () => {
    const { progress } = get();
    if (!progress) return;

    const newProgress = { ...progress };
    newProgress.hasCompletedOnboarding = true;

    set({ progress: newProgress });
    get().saveProgress();
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
      const docId = getFirestoreDocId(currentUserEmail);

      // Try to load from Firebase first
      try {
        const docRef = doc(db, "userProgress", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const progress = docSnap.data() as UserProgress;

          // Convert Firestore timestamps back to Date objects
          if (progress.lastStudyDate) {
            progress.lastStudyDate = new Date(progress.lastStudyDate);
          }

          set({ progress });

          // Cache in AsyncStorage for offline access
          const STORAGE_KEY = getStorageKey(currentUserEmail);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

          console.log("✅ Loaded progress from Firebase");
        } else {
          // No Firebase data, try AsyncStorage (offline cache)
          const STORAGE_KEY = getStorageKey(currentUserEmail);
          const progressData = await AsyncStorage.getItem(STORAGE_KEY);

          if (progressData) {
            const progress = JSON.parse(progressData);
            if (progress.lastStudyDate) {
              progress.lastStudyDate = new Date(progress.lastStudyDate);
            }
            set({ progress });

            // Sync to Firebase
            await get().saveProgress();
            console.log("✅ Loaded from AsyncStorage, synced to Firebase");
          } else {
            // No data anywhere, create initial
            const progress = createInitialProgress();
            set({ progress });
            await get().saveProgress();
            console.log("✅ Created new progress");
          }
        }
      } catch (firebaseError) {
        console.warn("Firebase unavailable, using AsyncStorage:", firebaseError);

        // Fallback to AsyncStorage only
        const STORAGE_KEY = getStorageKey(currentUserEmail);
        const progressData = await AsyncStorage.getItem(STORAGE_KEY);

        const progress = progressData
          ? JSON.parse(progressData)
          : createInitialProgress();

        if (progress.lastStudyDate) {
          progress.lastStudyDate = new Date(progress.lastStudyDate);
        }

        set({ progress });
      }
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
      const docId = getFirestoreDocId(currentUserEmail);

      // Save to Firebase
      try {
        const docRef = doc(db, "userProgress", docId);
        await setDoc(docRef, {
          ...progress,
          lastStudyDate: progress.lastStudyDate?.toISOString(),
          updatedAt: new Date().toISOString(),
        });
        console.log("✅ Saved to Firebase");
      } catch (firebaseError) {
        console.warn("Firebase unavailable:", firebaseError);
      }

      // Also save to AsyncStorage as backup
      const STORAGE_KEY = getStorageKey(currentUserEmail);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
  },

  resetProgress: async () => {
    const { currentUserEmail } = get();
    if (!currentUserEmail) return;

    const newProgress = createInitialProgress();
    set({ progress: newProgress, dailyActivities: [] });

    try {
      const docId = getFirestoreDocId(currentUserEmail);
      const STORAGE_KEY = getStorageKey(currentUserEmail);
      const ACTIVITIES_KEY = getActivitiesKey(currentUserEmail);

      // Reset in Firebase
      try {
        const docRef = doc(db, "userProgress", docId);
        await setDoc(docRef, {
          ...newProgress,
          updatedAt: new Date().toISOString(),
        });
      } catch (firebaseError) {
        console.warn("Firebase unavailable:", firebaseError);
      }

      // Reset in AsyncStorage
      await AsyncStorage.multiRemove([STORAGE_KEY, ACTIVITIES_KEY]);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error("Failed to reset progress:", error);
    }
  },
}));
