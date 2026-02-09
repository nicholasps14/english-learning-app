import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  ExerciseWrapper,
  MultipleChoiceExercise,
  FillBlankExercise,
  FlashcardExercise,
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
    let filtered = vocabulary.filter((v) => v.mode === mode);

    // For now, just use all vocabulary
    // TODO: Implement category, weakest, recent filtering

    // Limit to 10 exercises for practice
    return filtered.slice(0, 10);
  };

  const generateExercises = (
    vocabItems: VocabularyItem[],
    type: string
  ): Exercise[] => {
    return vocabItems.map((vocab, index) => {
      // For now, generate simple multiple choice exercises
      // TODO: Add more exercise types based on exerciseType parameter
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

    // Move to next exercise or complete
    if (currentIndex < exercises.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 500);
    } else {
      setTimeout(() => setIsComplete(true), 500);
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
      {/* Back Button */}
      <View className="px-lg pt-md">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-sm active:opacity-70"
        >
          <Text className="text-2xl">←</Text>
          <Text className="text-body text-neutral-600">Back</Text>
        </Pressable>
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
    </ExerciseWrapper>
    </View>
  );
}
