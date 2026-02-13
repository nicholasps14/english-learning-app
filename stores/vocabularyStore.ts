import { create } from "zustand";
import { VocabularyItem, SRSData, LearningMode } from "@/lib/types";

interface VocabularyState {
  vocabulary: VocabularyItem[];
  srsData: Record<string, SRSData>; // vocabularyId -> SRSData
  isLoading: boolean;

  // Actions
  setVocabulary: (vocabulary: VocabularyItem[]) => void;
  getVocabularyByMode: (mode: LearningMode) => VocabularyItem[];
  getVocabularyByCategory: (category: string) => VocabularyItem[];
  getDueForReview: () => VocabularyItem[];
  updateSRS: (vocabularyId: string, quality: number, timeSpent?: number) => void;
  initializeSRS: (vocabularyId: string) => void;
}

// SM-2 Algorithm for spaced repetition
const calculateNextReview = (
  srs: SRSData,
  quality: number // 0-5
): { easeFactor: number; interval: number; repetitions: number } => {
  let { easeFactor, interval, repetitions } = srs;

  // Update ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Update repetitions and interval
  if (quality < 3) {
    // Incorrect response, reset
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  return { easeFactor, interval, repetitions };
};

export const useVocabularyStore = create<VocabularyState>((set, get) => ({
  vocabulary: [],
  srsData: {},
  isLoading: false,

  setVocabulary: (vocabulary) => {
    set({ vocabulary });
  },

  getVocabularyByMode: (mode) => {
    return get().vocabulary.filter((item) => item.mode === mode);
  },

  getVocabularyByCategory: (category) => {
    return get().vocabulary.filter((item) => item.category === category);
  },

  getDueForReview: () => {
    const { vocabulary, srsData } = get();
    const now = new Date();

    return vocabulary.filter((item) => {
      const srs = srsData[item.id];
      if (!srs) return false;
      return new Date(srs.nextReviewDate) <= now;
    });
  },

  updateSRS: (vocabularyId, quality, timeSpent = 0) => {
    const { srsData } = get();
    const currentSRS = srsData[vocabularyId];

    if (!currentSRS) {
      console.error("SRS data not found for vocabulary:", vocabularyId);
      return;
    }

    const { easeFactor, interval, repetitions } = calculateNextReview(
      currentSRS,
      quality
    );

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    const newSRS: SRSData = {
      ...currentSRS,
      easeFactor,
      interval,
      repetitions,
      nextReviewDate,
      lastReviewDate: new Date(),
      reviewHistory: [
        ...currentSRS.reviewHistory,
        {
          date: new Date(),
          quality,
          timeSpent, // Track actual time spent
        },
      ],
    };

    set({
      srsData: {
        ...srsData,
        [vocabularyId]: newSRS,
      },
    });
  },

  initializeSRS: (vocabularyId) => {
    const { srsData } = get();

    if (srsData[vocabularyId]) return; // Already initialized

    const initialSRS: SRSData = {
      vocabularyId,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReviewDate: new Date(), // Due immediately
      reviewHistory: [],
    };

    set({
      srsData: {
        ...srsData,
        [vocabularyId]: initialSRS,
      },
    });
  },
}));
