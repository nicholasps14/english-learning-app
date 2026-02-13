import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  ExerciseWrapper,
  MultipleChoiceExercise,
  FillBlankExercise,
  FlashcardExercise,
  TranslateSentence,
  ListenAndType,
  UnscrambleSentence,
} from "@/components/exercises";
import { Button } from "@/components";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import { useProgressStore } from "@/stores/progressStore";
import { LearningMode, Exercise, VocabularyItem } from "@/lib/types";
import { XP_REWARDS } from "@/lib/types";

export default function PracticeSessionScreen() {
  const params = useLocalSearchParams<{
    mode?: string;
    exerciseType?: string;
    source?: string;
  }>();

  const mode = (params.mode || "tech") as LearningMode;
  const exerciseType = params.exerciseType || "mix";
  const source = params.source || "all";

  const vocabulary = useVocabularyStore((state) => state.vocabulary);
  const addXP = useProgressStore((state) => state.addXP);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    xpEarned: 0,
    startTime: Date.now(),
  });
  const [isComplete, setIsComplete] = useState(false);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [filterInfo, setFilterInfo] = useState<string>("");

  useEffect(() => {
    // Generate exercises from vocabulary
    const filteredVocab = getFilteredVocabulary();
    const generatedExercises = generateExercises(filteredVocab, exerciseType);
    setExercises(generatedExercises);

    if (generatedExercises.length === 0) {
      // No exercises available
      router.back();
    }
  }, []);

  const getFilteredVocabulary = (): VocabularyItem[] => {
    const progress = useProgressStore.getState().progress;
    const srsData = useVocabularyStore.getState().srsData;

    let filtered = vocabulary.filter((v) => v.mode === mode);

    // Apply source filter
    if (source === "category") {
      // Group by category and let user select (for now, randomize across categories)
      const categories = [...new Set(filtered.map(v => v.category))];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      filtered = filtered.filter(v => v.category === randomCategory);
      setFilterInfo(`📚 Category: ${randomCategory}`);
    } else if (source === "weakest") {
      // Get words with lowest performance (most incorrect reviews or lowest quality)
      const learnedVocab = filtered.filter(v =>
        progress?.learnedVocabularyIds.includes(v.id)
      );

      const vocabWithScores = learnedVocab.map(v => {
        const srs = srsData[v.id];
        if (!srs || srs.reviewHistory.length === 0) {
          return { vocab: v, score: 2.5 }; // Default score
        }

        // Calculate average quality from review history
        const avgQuality = srs.reviewHistory.reduce((sum, review) => sum + review.quality, 0) / srs.reviewHistory.length;
        return { vocab: v, score: avgQuality };
      });

      // Sort by lowest score first
      vocabWithScores.sort((a, b) => a.score - b.score);
      filtered = vocabWithScores.slice(0, 15).map(v => v.vocab);
      setFilterInfo(`💪 Practicing your weakest ${filtered.length} words`);
    } else if (source === "recent") {
      // Get vocabulary learned in last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recentVocab = filtered.filter(v => {
        const srs = srsData[v.id];
        if (!srs || !srs.lastReviewDate) return false;

        const lastReview = new Date(srs.lastReviewDate);
        return lastReview >= sevenDaysAgo;
      });

      filtered = recentVocab.length > 0 ? recentVocab : filtered;
      setFilterInfo(`🆕 Recently learned (last 7 days): ${filtered.length} words`);
    } else {
      setFilterInfo(`📖 Practicing all ${filtered.length} learned words`);
    }
    // "all" - use all vocabulary (default)

    // Shuffle and limit to 10 exercises for practice
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  };

  const generateExercises = (
    vocabItems: VocabularyItem[],
    type: string
  ): Exercise[] => {
    return vocabItems.map((vocab, index) => {
      // Generate different exercise types based on the type parameter
      let exerciseType = type;
      if (type === "mix") {
        const types = ["multiple-choice", "fill-blank", "flashcard", "translate", "listen-type", "unscramble"];
        exerciseType = types[Math.floor(Math.random() * types.length)];
      }

      // Generate multiple-choice exercise
      if (exerciseType === "multiple-choice") {
        const incorrectOptions = vocabulary
          .filter((v) => v.id !== vocab.id && v.mode === mode)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map((v) => v.translation);

        const allOptions = [vocab.translation, ...incorrectOptions].sort(
          () => Math.random() - 0.5
        );

        return {
          id: `exercise-${index}`,
          type: "multiple-choice",
          question: `What does "${vocab.word}" mean?`,
          correctAnswer: vocab.translation,
          options: allOptions,
          hint: vocab.exampleSentence,
          vocabularyId: vocab.id,
        };
      }

      // Generate fill-blank exercise
      if (exerciseType === "fill-blank") {
        // Use the example sentence with the word replaced by a blank
        const question = vocab.exampleSentence.replace(
          new RegExp(vocab.word, "gi"),
          "_____"
        );

        return {
          id: `exercise-${index}`,
          type: "fill-blank",
          question: question,
          correctAnswer: vocab.word,
          hint: `Translation: ${vocab.translation}`,
          vocabularyId: vocab.id,
        };
      }

      // Generate translate exercise
      if (exerciseType === "translate") {
        return {
          id: `exercise-${index}`,
          type: "translate",
          question: vocab.exampleTranslation,
          correctAnswer: vocab.exampleSentence,
          hint: `Use the word: ${vocab.word}`,
          vocabularyId: vocab.id,
        };
      }

      // Generate listen-type exercise
      if (exerciseType === "listen-type") {
        return {
          id: `exercise-${index}`,
          type: "listen-type",
          question: `Listen and type: ${vocab.word}`,
          correctAnswer: vocab.word,
          hint: `Translation: ${vocab.translation}`,
          vocabularyId: vocab.id,
        };
      }

      // Generate unscramble exercise
      if (exerciseType === "unscramble") {
        return {
          id: `exercise-${index}`,
          type: "unscramble",
          question: vocab.exampleSentence,
          correctAnswer: vocab.exampleSentence,
          hint: `Translation: ${vocab.exampleTranslation}`,
          vocabularyId: vocab.id,
        };
      }

      // Generate flashcard exercise (default)
      return {
        id: `exercise-${index}`,
        type: "flashcard",
        question: vocab.word,
        correctAnswer: vocab.translation,
        explanation: vocab.exampleSentence,
        vocabularyId: vocab.id,
      };
    });
  };

  const handleAnswer = (isCorrect: boolean) => {
    const xpGain = isCorrect ? XP_REWARDS.EXERCISE_CORRECT : 0;

    setSessionStats((prev) => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      xpEarned: prev.xpEarned + xpGain,
    }));

    // Add XP
    if (isCorrect && addXP) {
      addXP(xpGain, mode);
    }

    // Mark current question as answered
    setHasAnsweredCurrent(true);
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasAnsweredCurrent(false);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setHasAnsweredCurrent(false);
    }
  };

  const handleFinish = () => {
    router.back();
  };

  if (exercises.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-body text-neutral-600">Loading exercises...</Text>
      </View>
    );
  }

  if (isComplete) {
    const timeSpent = Math.floor((Date.now() - sessionStats.startTime) / 1000);
    const accuracy = Math.round(
      (sessionStats.correct / exercises.length) * 100
    );

    return (
      <View className="flex-1 bg-white items-center justify-center p-lg">
        <View className="w-full max-w-md gap-lg">
          <View className="items-center mb-md">
            <Text className="text-6xl mb-sm">🎉</Text>
            <Text className="text-h1 font-bold text-neutral-900 text-center">
              Practice Complete!
            </Text>
          </View>

          <View className="bg-white rounded-2xl p-xl border border-neutral-200 gap-md">
            <View className="items-center py-md border-b border-neutral-200">
              <Text className="text-body-sm text-neutral-600 mb-xs">
                XP Earned
              </Text>
              <Text className="text-4xl font-bold text-primary">
                +{sessionStats.xpEarned}
              </Text>
            </View>

            <View className="gap-sm">
              <View className="flex-row justify-between items-center py-sm">
                <Text className="text-body text-neutral-600">
                  Total Questions
                </Text>
                <Text className="text-body font-bold text-neutral-900">
                  {exercises.length}
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-sm">
                <Text className="text-body text-neutral-600">Correct</Text>
                <Text className="text-body font-bold text-success">
                  {sessionStats.correct}
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-sm">
                <Text className="text-body text-neutral-600">Accuracy</Text>
                <Text className="text-body font-bold text-neutral-900">
                  {accuracy}%
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-sm">
                <Text className="text-body text-neutral-600">Time</Text>
                <Text className="text-body font-bold text-neutral-900">
                  {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-sm">
            <Button variant="primary" size="lg" onPress={handleFinish}>
              Done
            </Button>
            <Button
              variant="outline"
              size="lg"
              onPress={() => router.push(`/practice?mode=${mode}`)}
            >
              Practice Again
            </Button>
          </View>
        </View>
      </View>
    );
  }

  const currentExercise = exercises[currentIndex];

  return (
    <View className="flex-1 bg-white">
      {/* Back Button & Filter Info */}
      <View className="px-lg pt-md gap-sm">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-sm active:opacity-70"
        >
          <Text className="text-2xl">←</Text>
          <Text className="text-body text-neutral-600">Back</Text>
        </Pressable>
        {filterInfo && (
          <View className="bg-primary/10 px-md py-sm rounded-lg">
            <Text className="text-body-sm text-primary font-medium">
              {filterInfo}
            </Text>
          </View>
        )}
      </View>

      <ExerciseWrapper
        currentQuestion={currentIndex + 1}
        totalQuestions={exercises.length}
        xpEarned={sessionStats.xpEarned}
        mode={mode}
        showProgress={true}
      >
        {currentExercise.type === "multiple-choice" && (
          <MultipleChoiceExercise
            exercise={currentExercise}
            onAnswer={handleAnswer}
          />
        )}
        {currentExercise.type === "fill-blank" && (
          <FillBlankExercise exercise={currentExercise} onAnswer={handleAnswer} />
        )}
        {currentExercise.type === "flashcard" && (
          <FlashcardExercise exercise={currentExercise} onAnswer={handleAnswer} />
        )}
        {currentExercise.type === "translate" && (
          <TranslateSentence exercise={currentExercise} onAnswer={handleAnswer} />
        )}
        {currentExercise.type === "listen-type" && (
          <ListenAndType exercise={currentExercise} onAnswer={handleAnswer} />
        )}
        {currentExercise.type === "unscramble" && (
          <UnscrambleSentence exercise={currentExercise} onAnswer={handleAnswer} />
        )}
      </ExerciseWrapper>

      {/* Navigation Buttons */}
      <View className="px-lg pb-lg gap-sm">
        <View className="flex-row justify-between items-center">
          <Button
            variant="outline"
            size="lg"
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            ← Previous
          </Button>
          <Button
            variant="primary"
            size="lg"
            onPress={handleNext}
            disabled={!hasAnsweredCurrent}
          >
            {currentIndex === exercises.length - 1 ? "Finish" : "Next →"}
          </Button>
        </View>
        {!hasAnsweredCurrent && (
          <Text className="text-body-sm text-neutral-500 text-center">
            Answer the question to continue
          </Text>
        )}
      </View>
    </View>
  );
}
