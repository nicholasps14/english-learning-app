import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Card } from "@/components";
import { Exercise } from "@/lib/types";

interface FlashcardExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export default function FlashcardExercise({
  exercise,
  onAnswer,
}: FlashcardExerciseProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleFlip = () => {
    if (!hasAnswered) {
      setIsFlipped(true);
    }
  };

  const handleResponse = (remembered: boolean) => {
    setHasAnswered(true);
    onAnswer(remembered);
  };

  return (
    <View className="flex-1 items-center justify-center p-lg gap-lg">
      <Text className="text-h3 font-bold text-neutral-800 text-center">
        Tap the card to reveal the translation
      </Text>

      <Pressable
        onPress={handleFlip}
        disabled={isFlipped}
        className="w-full max-w-md"
      >
        <Card
          padding="lg"
          className={`min-h-64 items-center justify-center ${
            isFlipped ? "bg-primary" : "bg-white"
          }`}
        >
          <Text
            className={`text-4xl font-bold text-center ${
              isFlipped ? "text-neutral-800" : "text-neutral-800"
            }`}
          >
            {!isFlipped ? exercise.question : exercise.correctAnswer}
          </Text>

          {isFlipped && exercise.explanation && (
            <Text className="text-body text-neutral-600 mt-md text-center">
              {exercise.explanation}
            </Text>
          )}
        </Card>
      </Pressable>

      {isFlipped && !hasAnswered && (
        <View className="w-full max-w-md gap-sm">
          <Text className="text-body text-neutral-600 text-center mb-sm">
            Did you remember?
          </Text>
          <View className="flex-row gap-sm">
            <Pressable
              onPress={() => handleResponse(false)}
              className="flex-1 bg-error py-lg rounded-lg items-center active:opacity-80"
            >
              <Text className="text-body font-semibold text-white">
                Not Yet
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleResponse(true)}
              className="flex-1 bg-success py-lg rounded-lg items-center active:opacity-80"
            >
              <Text className="text-body font-semibold text-white">
                Got It!
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
