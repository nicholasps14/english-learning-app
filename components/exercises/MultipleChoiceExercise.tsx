import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Card } from "@/components";
import { Exercise } from "@/lib/types";

interface MultipleChoiceExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export default function MultipleChoiceExercise({
  exercise,
  onAnswer,
}: MultipleChoiceExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Reset state when exercise changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [exercise.id]);

  const handleSelect = (answer: string) => {
    if (hasAnswered) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);

    const isCorrect = answer === exercise.correctAnswer;
    onAnswer(isCorrect);
  };

  const getOptionStyle = (option: string) => {
    if (!hasAnswered) {
      return selectedAnswer === option
        ? "border-primary border-2 bg-primary/10"
        : "border-neutral-300 border-2 bg-white";
    }

    if (option === exercise.correctAnswer) {
      return "border-success border-2 bg-success/10";
    }

    if (selectedAnswer === option && option !== exercise.correctAnswer) {
      return "border-error border-2 bg-error/10";
    }

    return "border-neutral-300 border bg-white opacity-50";
  };

  const getOptionTextStyle = (option: string) => {
    if (!hasAnswered) {
      return "text-neutral-800";
    }

    if (option === exercise.correctAnswer) {
      return "text-success-dark";
    }

    if (selectedAnswer === option) {
      return "text-error-dark";
    }

    return "text-neutral-600";
  };

  return (
    <View className="flex-1 justify-center p-lg gap-lg">
      <View className="gap-sm">
        <Text className="text-h3 font-bold text-neutral-800 text-center">
          {exercise.question}
        </Text>
        {exercise.hint && !hasAnswered && (
          <Text className="text-body-sm text-neutral-600 text-center">
            💡 {exercise.hint}
          </Text>
        )}
      </View>

      <View className="gap-md">
        {exercise.options?.map((option) => (
          <Pressable
            key={option}
            onPress={() => handleSelect(option)}
            disabled={hasAnswered}
            className="active:opacity-80"
          >
            <Card padding="md" className={getOptionStyle(option)}>
              <Text
                className={`text-body font-semibold text-center ${getOptionTextStyle(
                  option
                )}`}
              >
                {option}
              </Text>
            </Card>
          </Pressable>
        ))}
      </View>

      {hasAnswered && (
        <View className="mt-md">
          {selectedAnswer === exercise.correctAnswer ? (
            <Text className="text-body text-success-dark text-center font-semibold">
              ✓ Correct! Great job!
            </Text>
          ) : (
            <Text className="text-body text-error-dark text-center font-semibold">
              ✗ Not quite. The answer is "{exercise.correctAnswer}"
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
