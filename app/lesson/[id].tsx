import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import { ProgressBar, Button } from "@/components";
import { allLessons } from "@/data/allLessons";
import { Exercise } from "@/lib/types";
import FlashcardExercise from "@/components/exercises/FlashcardExercise";
import MultipleChoiceExercise from "@/components/exercises/MultipleChoiceExercise";
import FillBlankExercise from "@/components/exercises/FillBlankExercise";
import TranslateSentence from "@/components/exercises/TranslateSentence";
import ListenAndType from "@/components/exercises/ListenAndType";
import UnscrambleSentence from "@/components/exercises/UnscrambleSentence";
import { useProgressStore } from "@/stores";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);

  const lesson = allLessons.find((l) => l.id === id);

  console.log('Looking for lesson:', id);
  console.log('Found lesson:', lesson ? lesson.title : 'NOT FOUND');

  const completeLesson = useProgressStore((state) => state.completeLesson);
  const addXP = useProgressStore((state) => state.addXP);
  const addStudyTime = useProgressStore((state) => state.addStudyTime);

  if (!lesson) {
    return (
      <View className="flex-1 items-center justify-center p-lg">
        <Text className="text-h3 font-bold text-neutral-800 mb-md">
          Lesson not found
        </Text>
        <Button variant="primary" onPress={() => router.back()}>
          Go Back
        </Button>
      </View>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Mark current exercise as answered
    setHasAnsweredCurrent(true);
  };

  const handleNext = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setHasAnsweredCurrent(false);
    } else {
      // Lesson completed
      const accuracyRate = Math.round((correctAnswers / lesson.exercises.length) * 100);
      setIsCompleted(true);
      completeLesson(lesson.id, lesson.mode, accuracyRate);
      addStudyTime(lesson.estimatedMinutes);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
      setHasAnsweredCurrent(false);
    }
  };

  const handleExit = () => {
    router.back();
  };

  const handleContinue = () => {
    router.back();
  };

  if (isCompleted) {
    const accuracyRate = Math.round((correctAnswers / lesson.exercises.length) * 100);
    const earnedXP = lesson.xpReward;

    return (
      <View className="flex-1 bg-neutral-50 p-lg justify-center items-center gap-lg">
        <Text className="text-6xl mb-md">🎉</Text>
        <Text className="text-h1 font-bold text-neutral-800 text-center">
          Lesson Complete!
        </Text>
        <Text className="text-body text-neutral-600 text-center">
          Great job completing "{lesson.title}"
        </Text>

        <View className="w-full max-w-md gap-md mt-lg">
          <View className="bg-white rounded-xl p-lg gap-md">
            <View className="flex-row justify-between items-center">
              <Text className="text-body text-neutral-600">Accuracy</Text>
              <Text className="text-h3 font-bold text-primary">
                {accuracyRate}%
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-body text-neutral-600">Correct Answers</Text>
              <Text className="text-h3 font-bold text-success">
                {correctAnswers}/{lesson.exercises.length}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-body text-neutral-600">XP Earned</Text>
              <Text className="text-h3 font-bold text-warning">
                +{earnedXP} XP
              </Text>
            </View>
          </View>

          <Button variant="primary" size="lg" onPress={handleContinue}>
            Continue
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50">
      {/* Header */}
      <View className="bg-white border-b border-neutral-200 p-md gap-sm">
        <View className="flex-row justify-between items-center">
          <Button variant="outline" size="sm" onPress={handleExit}>
            Exit
          </Button>
          <Text className="text-body-sm font-semibold text-neutral-700">
            {currentExerciseIndex + 1} / {lesson.exercises.length}
          </Text>
        </View>
        <ProgressBar progress={progress} variant={lesson.mode} height="sm" />
      </View>

      {/* Exercise Content */}
      <View className="flex-1">
        {currentExercise.type === "flashcard" && (
          <FlashcardExercise
            exercise={currentExercise}
            onAnswer={handleAnswer}
          />
        )}
        {currentExercise.type === "multiple-choice" && (
          <MultipleChoiceExercise
            exercise={currentExercise}
            onAnswer={handleAnswer}
          />
        )}
        {currentExercise.type === "fill-blank" && (
          <FillBlankExercise
            exercise={currentExercise}
            onAnswer={handleAnswer}
          />
        )}
        {currentExercise.type === "translate" && (
          <TranslateSentence
            exercise={currentExercise}
            onAnswer={handleAnswer}
          />
        )}
        {currentExercise.type === "listen-type" && (
          <ListenAndType
            exercise={currentExercise}
            onAnswer={handleAnswer}
          />
        )}
        {currentExercise.type === "unscramble" && (
          <UnscrambleSentence
            exercise={currentExercise}
            onAnswer={handleAnswer}
          />
        )}
      </View>

      {/* Navigation Buttons */}
      <View className="bg-white border-t border-neutral-200 px-lg py-md gap-sm">
        <View className="flex-row justify-between items-center">
          <Button
            variant="outline"
            size="lg"
            onPress={handlePrevious}
            disabled={currentExerciseIndex === 0}
          >
            ← Previous
          </Button>
          <Button
            variant="primary"
            size="lg"
            onPress={handleNext}
            disabled={!hasAnsweredCurrent}
          >
            {currentExerciseIndex === lesson.exercises.length - 1 ? "Finish" : "Next →"}
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
