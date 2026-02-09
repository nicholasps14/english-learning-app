import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Card, Button } from "@/components";
import { Exercise } from "@/lib/types";

interface TranslateSentenceProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

// Simple fuzzy matching - checks if key words are present
const fuzzyMatch = (userAnswer: string, correctAnswer: string): boolean => {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:]/g, "");

  const userNormalized = normalize(userAnswer);
  const correctNormalized = normalize(correctAnswer);

  // Exact match
  if (userNormalized === correctNormalized) return true;

  // Split into words and check if most key words are present
  const correctWords = correctNormalized.split(/\s+/).filter((w) => w.length > 2);
  const userWords = new Set(userNormalized.split(/\s+/));

  const matchedWords = correctWords.filter((word) => userWords.has(word));
  const matchRatio = matchedWords.length / correctWords.length;

  // Accept if 80% of key words match
  return matchRatio >= 0.8;
};

export default function TranslateSentence({
  exercise,
  onAnswer,
}: TranslateSentenceProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (hasAnswered || !userAnswer.trim()) return;

    const correct = fuzzyMatch(userAnswer, exercise.correctAnswer);

    setIsCorrect(correct);
    setHasAnswered(true);

    setTimeout(() => onAnswer(correct), 1500);
  };

  return (
    <View className="flex-1 justify-center p-lg gap-lg">
      <View className="gap-sm">
        <Text className="text-h3 font-bold text-neutral-800 text-center">
          Translate this sentence
        </Text>
        {exercise.hint && !hasAnswered && !showHint && (
          <Pressable onPress={() => setShowHint(true)}>
            <Text className="text-body-sm text-primary text-center underline">
              Show hint
            </Text>
          </Pressable>
        )}
        {showHint && exercise.hint && (
          <Text className="text-body-sm text-neutral-600 text-center">
            💡 {exercise.hint}
          </Text>
        )}
      </View>

      <Card padding="lg">
        <Text className="text-body text-neutral-800 text-center leading-7">
          "{exercise.question}"
        </Text>
      </Card>

      {!hasAnswered && (
        <View className="gap-md">
          <TextInput
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Type your translation..."
            placeholderTextColor="#9CA3AF"
            className="bg-white border-2 border-neutral-300 px-lg py-md rounded-lg text-body text-neutral-800"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            autoCapitalize="sentences"
            autoCorrect={false}
            onSubmitEditing={handleSubmit}
          />
          <Button
            variant="primary"
            onPress={handleSubmit}
            disabled={!userAnswer.trim()}
          >
            Check Answer
          </Button>
        </View>
      )}

      {hasAnswered && (
        <View className="mt-md gap-sm">
          {isCorrect ? (
            <Text className="text-body text-success-dark text-center font-semibold">
              ✓ Excellent translation!
            </Text>
          ) : (
            <View className="gap-xs">
              <Text className="text-body text-error-dark text-center font-semibold">
                ✗ Not quite right
              </Text>
              <Card padding="md" className="bg-neutral-50">
                <Text className="text-body-sm text-neutral-600 text-center mb-xs">
                  Your answer:
                </Text>
                <Text className="text-body text-neutral-800 text-center mb-md">
                  "{userAnswer}"
                </Text>
                <Text className="text-body-sm text-neutral-600 text-center mb-xs">
                  Correct translation:
                </Text>
                <Text className="text-body text-success-dark text-center font-semibold">
                  "{exercise.correctAnswer}"
                </Text>
              </Card>
            </View>
          )}
          {exercise.explanation && (
            <Card padding="md" className="bg-primary/5 border border-primary/20">
              <Text className="text-body-sm text-neutral-700 text-center">
                {exercise.explanation}
              </Text>
            </Card>
          )}
        </View>
      )}
    </View>
  );
}
