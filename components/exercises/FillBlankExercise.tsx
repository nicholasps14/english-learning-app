import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Card, Button } from "@/components";
import { Exercise } from "@/lib/types";

interface FillBlankExerciseProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export default function FillBlankExercise({
  exercise,
  onAnswer,
}: FillBlankExerciseProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when exercise changes
  useEffect(() => {
    setUserAnswer("");
    setHasAnswered(false);
    setIsCorrect(false);
  }, [exercise.id]);

  const handleSubmit = () => {
    if (hasAnswered || !userAnswer.trim()) return;

    const correct =
      userAnswer.trim().toLowerCase() ===
      exercise.correctAnswer.trim().toLowerCase();

    setIsCorrect(correct);
    setHasAnswered(true);
    onAnswer(correct);
  };

  return (
    <View className="flex-1 justify-center p-lg gap-lg">
      <View className="gap-sm">
        <Text className="text-h3 font-bold text-neutral-800 text-center">
          Fill in the blank
        </Text>
        {exercise.hint && (
          <View className="bg-primary/10 p-md rounded-lg border border-primary/30">
            <Text className="text-body text-neutral-700 text-center">
              💡 Hint: {exercise.hint}
            </Text>
          </View>
        )}
      </View>

      <Card padding="lg">
        <Text className="text-body text-neutral-800 text-center leading-8">
          {exercise.question.split("_____").map((part, index, arr) => (
            <Text key={index}>
              {part}
              {index < arr.length - 1 && (
                <Text className="font-bold text-primary underline">
                  {hasAnswered ? exercise.correctAnswer : "_____"}
                </Text>
              )}
            </Text>
          ))}
        </Text>
      </Card>

      {!hasAnswered && (
        <View className="gap-md">
          <TextInput
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Type your answer here"
            placeholderTextColor="#9CA3AF"
            className="bg-white border-2 border-neutral-300 px-lg py-md rounded-lg text-body text-neutral-800"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={handleSubmit}
          />
          <Button variant="primary" onPress={handleSubmit} disabled={!userAnswer.trim()}>
            Submit
          </Button>
        </View>
      )}

      {hasAnswered && (
        <View className="mt-md">
          {isCorrect ? (
            <Text className="text-body text-success-dark text-center font-semibold">
              ✓ Correct! Well done!
            </Text>
          ) : (
            <View className="gap-xs">
              <Text className="text-body text-error-dark text-center font-semibold">
                ✗ Not quite.
              </Text>
              <Text className="text-body-sm text-neutral-600 text-center">
                You wrote: "{userAnswer}"
              </Text>
              <Text className="text-body-sm text-neutral-600 text-center">
                Correct answer: "{exercise.correctAnswer}"
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
