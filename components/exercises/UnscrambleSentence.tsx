import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Card, Button } from "@/components";
import { Exercise } from "@/lib/types";

interface UnscrambleSentenceProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export default function UnscrambleSentence({
  exercise,
  onAnswer,
}: UnscrambleSentenceProps) {
  // Scramble the words initially
  const [availableWords] = useState(() => {
    const words = exercise.correctAnswer.split(" ");
    const scrambled = [...words];
    for (let i = scrambled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }
    return scrambled.map((word, idx) => ({ id: `word-${idx}`, word }));
  });

  const [selectedWords, setSelectedWords] = useState<
    Array<{ id: string; word: string }>
  >([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleWordPress = (wordObj: { id: string; word: string }) => {
    if (hasAnswered) return;
    setSelectedWords([...selectedWords, wordObj]);
  };

  const handleRemoveWord = (index: number) => {
    if (hasAnswered) return;
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (hasAnswered || selectedWords.length === 0) return;

    const userSentence = selectedWords.map((w) => w.word).join(" ");
    const correct =
      userSentence.toLowerCase().trim() ===
      exercise.correctAnswer.toLowerCase().trim();

    setIsCorrect(correct);
    setHasAnswered(true);

    setTimeout(() => onAnswer(correct), 1500);
  };

  const handleReset = () => {
    setSelectedWords([]);
  };

  const getRemainingWords = () => {
    const selectedIds = new Set(selectedWords.map((w) => w.id));
    return availableWords.filter((w) => !selectedIds.has(w.id));
  };

  return (
    <View className="flex-1 justify-center p-lg gap-lg">
      <View className="gap-sm">
        <Text className="text-h3 font-bold text-neutral-800 text-center">
          Unscramble the Sentence
        </Text>
        <Text className="text-body-sm text-neutral-600 text-center">
          Tap the words in the correct order
        </Text>
        {exercise.hint && !hasAnswered && (
          <Text className="text-body-sm text-neutral-600 text-center">
            💡 {exercise.hint}
          </Text>
        )}
      </View>

      {/* Answer Area */}
      <Card
        padding="lg"
        className={`min-h-24 ${
          hasAnswered
            ? isCorrect
              ? "bg-success/10 border-success"
              : "bg-error/10 border-error"
            : "bg-neutral-50 border-neutral-300"
        }`}
      >
        <View className="flex-row flex-wrap gap-sm justify-center">
          {selectedWords.length === 0 ? (
            <Text className="text-body text-neutral-400 text-center">
              Tap words below to build your sentence
            </Text>
          ) : (
            selectedWords.map((wordObj, index) => (
              <Pressable
                key={`selected-${wordObj.id}-${index}`}
                onPress={() => handleRemoveWord(index)}
                disabled={hasAnswered}
                className="active:opacity-80"
              >
                <View className="bg-primary px-md py-sm rounded-lg">
                  <Text className="text-body text-white font-semibold">
                    {wordObj.word}
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </Card>

      {/* Available Words */}
      {!hasAnswered && (
        <View className="gap-md">
          <View className="flex-row flex-wrap gap-sm justify-center">
            {getRemainingWords().map((wordObj) => (
              <Pressable
                key={wordObj.id}
                onPress={() => handleWordPress(wordObj)}
                className="active:opacity-80"
              >
                <View className="bg-white border-2 border-neutral-300 px-md py-sm rounded-lg">
                  <Text className="text-body text-neutral-800 font-semibold">
                    {wordObj.word}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          <View className="flex-row gap-sm">
            <View className="flex-1">
              <Button variant="outline" onPress={handleReset}>
                Reset
              </Button>
            </View>
            <View className="flex-1">
              <Button
                variant="primary"
                onPress={handleSubmit}
                disabled={selectedWords.length === 0}
              >
                Check
              </Button>
            </View>
          </View>
        </View>
      )}

      {hasAnswered && (
        <View className="mt-md">
          {isCorrect ? (
            <Text className="text-body text-success-dark text-center font-semibold">
              ✓ Perfect! That's the correct sentence!
            </Text>
          ) : (
            <View className="gap-xs">
              <Text className="text-body text-error-dark text-center font-semibold">
                ✗ Not quite right
              </Text>
              <Text className="text-body-sm text-neutral-600 text-center">
                Your answer: "{selectedWords.map((w) => w.word).join(" ")}"
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
