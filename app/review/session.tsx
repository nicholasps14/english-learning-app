import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import FlashCard from "@/components/FlashCard";
import ReviewSummary from "@/components/ReviewSummary";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useProgressStore } from "@/stores/progressStore";
import { ProgressBar } from "@/components";
import { XP_REWARDS } from "@/lib/types";

export default function ReviewSessionScreen() {
  const getDueForReview = useVocabularyStore((state) => state.getDueForReview);
  const updateSRS = useVocabularyStore((state) => state.updateSRS);
  const vocabulary = useVocabularyStore((state) => state.vocabulary);
  const addXP = useProgressStore((state) => state.addXP);
  const updateStreak = useProgressStore((state) => state.updateStreak);

  const [dueCards, setDueCards] = useState<typeof vocabulary>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    correct: 0,
    xpEarned: 0,
    startTime: Date.now(),
  });
  const [isComplete, setIsComplete] = useState(false);
  const [cardStartTime, setCardStartTime] = useState(Date.now());

  useEffect(() => {
    // Load due cards on mount
    const cards = getDueForReview();
    setDueCards(cards);

    if (cards.length === 0) {
      // No cards to review, go back
      router.back();
    } else {
      // Start timer for first card
      setCardStartTime(Date.now());
    }
  }, []);

  const handleRating = (quality: number) => {
    const currentCard = dueCards[currentIndex];
    if (!currentCard) return;

    // Calculate time spent on this card (in seconds)
    const timeSpent = Math.floor((Date.now() - cardStartTime) / 1000);

    // Update SRS data with time tracking
    updateSRS(currentCard.id, quality, timeSpent);

    // Track stats
    const isCorrect = quality >= 3; // 3, 4, or 5 are considered correct
    const xpGain = isCorrect ? XP_REWARDS.EXERCISE_CORRECT : 0;

    setSessionStats((prev) => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      xpEarned: prev.xpEarned + xpGain,
    }));

    // Add XP if correct
    if (isCorrect && addXP) {
      addXP(xpGain, currentCard.mode);
    }

    // Move to next card or complete session
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCardStartTime(Date.now()); // Reset timer for next card
    } else {
      // Session complete
      completeSession();
    }
  };

  const completeSession = () => {
    // Update streak
    if (updateStreak) {
      updateStreak();
    }

    setIsComplete(true);
  };

  const handleDone = () => {
    router.back();
  };

  if (dueCards.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-body text-neutral-600">Loading...</Text>
      </View>
    );
  }

  if (isComplete) {
    const timeSpent = Math.floor((Date.now() - sessionStats.startTime) / 1000);
    return (
      <ReviewSummary
        cardsReviewed={sessionStats.reviewed}
        correctCount={sessionStats.correct}
        xpEarned={sessionStats.xpEarned}
        timeSpent={timeSpent}
        onDone={handleDone}
      />
    );
  }

  const currentCard = dueCards[currentIndex];
  const progress = Math.round(((currentIndex + 1) / dueCards.length) * 100);

  return (
    <View className="flex-1 bg-white">
      {/* Header with Progress */}
      <View className="bg-neutral-50 p-lg border-b border-neutral-200">
        <View className="flex-row items-center justify-between mb-sm">
          <Text className="text-body-sm text-neutral-600">
            Card {currentIndex + 1} of {dueCards.length}
          </Text>
          <Text className="text-body-sm font-semibold text-primary">
            +{sessionStats.xpEarned} XP
          </Text>
        </View>
        <ProgressBar
          progress={progress}
          variant={currentCard.mode === "tech" ? "tech" : "life"}
          height="sm"
        />
      </View>

      {/* FlashCard */}
      <View className="flex-1 items-center justify-center p-lg">
        <FlashCard
          key={currentCard.id}
          word={currentCard.word}
          translation={currentCard.translation}
          pronunciation={currentCard.pronunciation}
          example={currentCard.exampleSentence}
          exampleTranslation={currentCard.exampleTranslation}
          onRate={handleRating}
          showRating={true}
        />
      </View>
    </View>
  );
}
