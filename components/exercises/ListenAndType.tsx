import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Card, Button } from "@/components";
import { Exercise } from "@/lib/types";

interface ListenAndTypeProps {
  exercise: Exercise;
  onAnswer: (isCorrect: boolean) => void;
}

export default function ListenAndType({
  exercise,
  onAnswer,
}: ListenAndTypeProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (isPlaying) return;

    setIsPlaying(true);

    // Use Web Speech API for TTS
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(exercise.correctAnswer);
      utterance.lang = "en-US";
      utterance.rate = 0.9; // Slightly slower for learning

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback: just show a message
      alert("Audio not available in this browser");
      setIsPlaying(false);
    }
  };

  const handleSubmit = () => {
    if (hasAnswered || !userAnswer.trim()) return;

    const correct =
      userAnswer.trim().toLowerCase() ===
      exercise.correctAnswer.trim().toLowerCase();

    setIsCorrect(correct);
    setHasAnswered(true);

    setTimeout(() => onAnswer(correct), 1500);
  };

  return (
    <View className="flex-1 justify-center p-lg gap-lg">
      <View className="gap-sm">
        <Text className="text-h3 font-bold text-neutral-800 text-center">
          Listen and Type
        </Text>
        <Text className="text-body-sm text-neutral-600 text-center">
          Listen carefully and type what you hear
        </Text>
      </View>

      {/* Speaker Button */}
      <View className="items-center">
        <Pressable
          onPress={playAudio}
          disabled={isPlaying}
          className="active:opacity-80"
        >
          <Card
            padding="lg"
            className={`items-center justify-center ${
              isPlaying ? "bg-primary/10 border-primary" : "bg-white"
            }`}
          >
            <Text className="text-6xl mb-sm">{isPlaying ? "🔊" : "🔉"}</Text>
            <Text className="text-body-sm text-neutral-600">
              {isPlaying ? "Playing..." : "Tap to listen"}
            </Text>
          </Card>
        </Pressable>
      </View>

      {exercise.hint && !hasAnswered && (
        <Text className="text-body-sm text-neutral-600 text-center">
          💡 {exercise.hint}
        </Text>
      )}

      {!hasAnswered && (
        <View className="gap-md">
          <TextInput
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Type what you heard..."
            placeholderTextColor="#9CA3AF"
            className="bg-white border-2 border-neutral-300 px-lg py-md rounded-lg text-body text-neutral-800"
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
        <View className="mt-md">
          {isCorrect ? (
            <Text className="text-body text-success-dark text-center font-semibold">
              ✓ Perfect! You heard it correctly!
            </Text>
          ) : (
            <View className="gap-xs">
              <Text className="text-body text-error-dark text-center font-semibold">
                ✗ Not quite
              </Text>
              <Text className="text-body-sm text-neutral-600 text-center">
                You wrote: "{userAnswer}"
              </Text>
              <Text className="text-body-sm text-neutral-600 text-center">
                Correct answer: "{exercise.correctAnswer}"
              </Text>
              <Pressable onPress={playAudio} className="mt-sm">
                <Text className="text-body-sm text-primary text-center underline">
                  Listen again
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
