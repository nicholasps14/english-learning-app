import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Card, Button, Badge } from "@/components";
import { LearningMode } from "@/lib/types";

type ExerciseType = "flashcard" | "multiple-choice" | "fill-blank" | "translate" | "listen-type" | "unscramble" | "match-pairs" | "mix";
type VocabularySource = "all" | "category" | "weakest" | "recent";

export default function PracticeConfigScreen() {
  const params = useLocalSearchParams<{ mode?: string }>();
  const mode = (params.mode || "tech") as LearningMode;

  const [selectedExerciseType, setSelectedExerciseType] = useState<ExerciseType>("mix");
  const [selectedSource, setSelectedSource] = useState<VocabularySource>("all");

  const exerciseTypes: Array<{ id: ExerciseType; label: string; icon: string }> = [
    { id: "mix", label: "Mix (Random)", icon: "🎲" },
    { id: "flashcard", label: "Flashcards", icon: "🃏" },
    { id: "multiple-choice", label: "Multiple Choice", icon: "✓" },
    { id: "fill-blank", label: "Fill in the Blank", icon: "📝" },
    { id: "translate", label: "Translate Sentence", icon: "🌐" },
    { id: "listen-type", label: "Listen & Type", icon: "🔊" },
    { id: "unscramble", label: "Unscramble", icon: "🔀" },
    // Note: match-pairs requires special data structure (array of pairs)
    // { id: "match-pairs", label: "Match Pairs", icon: "🔗" },
  ];

  const vocabularySources: Array<{ id: VocabularySource; label: string; description: string }> = [
    { id: "all", label: "All Learned Words", description: "Practice everything you've learned" },
    { id: "category", label: "Random Category", description: "Focus on a random category" },
    { id: "weakest", label: "Weakest Words", description: "Words with lowest review scores" },
    { id: "recent", label: "Recently Learned", description: "Words reviewed in last 7 days" },
  ];

  const handleStartPractice = () => {
    router.push({
      pathname: "/practice/session",
      params: {
        mode,
        exerciseType: selectedExerciseType,
        source: selectedSource,
      },
    });
  };

  const modeColor = mode === "tech" ? "tech" : "life";

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-lg gap-lg">
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-sm active:opacity-70"
        >
          <Text className="text-2xl">←</Text>
          <Text className="text-body text-neutral-600">Back</Text>
        </Pressable>

        {/* Header */}
        <View
          className={`p-xl rounded-2xl ${
            mode === "tech" ? "bg-tech-pastel" : "bg-life-pastel"
          }`}
        >
          <Text className="text-h1 font-bold text-neutral-900">
            Practice {mode === "tech" ? "Tech" : "Life"} English
          </Text>
          <Text className="text-body text-neutral-600 mt-xs">
            Configure your practice session
          </Text>
        </View>

        {/* Exercise Type Selection */}
        <View className="gap-sm">
          <Text className="text-h3 font-semibold text-neutral-900">
            Exercise Type
          </Text>
          <View className="gap-sm">
            {exerciseTypes.map((type) => (
              <Pressable
                key={type.id}
                onPress={() => setSelectedExerciseType(type.id)}
                className="active:opacity-80"
              >
                <Card
                  padding="md"
                  className={`flex-row items-center justify-between ${
                    selectedExerciseType === type.id
                      ? mode === "tech"
                        ? "bg-tech-pastel border-tech-primary border-2"
                        : "bg-life-pastel border-life-primary border-2"
                      : "border-neutral-200 border"
                  }`}
                >
                  <View className="flex-row items-center gap-md">
                    <Text className="text-2xl">{type.icon}</Text>
                    <Text className="text-body font-semibold text-neutral-900">
                      {type.label}
                    </Text>
                  </View>
                  {selectedExerciseType === type.id && (
                    <Text className="text-xl">✓</Text>
                  )}
                </Card>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Vocabulary Source Selection */}
        <View className="gap-sm">
          <Text className="text-h3 font-semibold text-neutral-900">
            Vocabulary Source
          </Text>
          <View className="gap-sm">
            {vocabularySources.map((source) => (
              <Pressable
                key={source.id}
                onPress={() => setSelectedSource(source.id)}
                className="active:opacity-80"
              >
                <Card
                  padding="md"
                  className={`${
                    selectedSource === source.id
                      ? mode === "tech"
                        ? "bg-tech-pastel border-tech-primary border-2"
                        : "bg-life-pastel border-life-primary border-2"
                      : "border-neutral-200 border"
                  }`}
                >
                  <View className="flex-row items-center justify-between mb-xs">
                    <Text className="text-body font-semibold text-neutral-900">
                      {source.label}
                    </Text>
                    {selectedSource === source.id && (
                      <Text className="text-xl">✓</Text>
                    )}
                  </View>
                  <Text className="text-body-sm text-neutral-600">
                    {source.description}
                  </Text>
                </Card>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Start Button */}
        <View className="mt-md">
          <Button
            variant={modeColor}
            size="lg"
            onPress={handleStartPractice}
          >
            Start Practice Session
          </Button>
        </View>

        {/* Info Card */}
        <Card padding="md" className="bg-neutral-50">
          <Text className="text-body-sm text-neutral-600 text-center">
            💡 Practice sessions help reinforce your learning without affecting your SRS schedule
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
}
