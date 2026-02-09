import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Card, Button } from "@/components";

export default function SetGoalScreen() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    {
      id: "casual",
      emoji: "☕",
      title: "Casual",
      description: "5 min/day",
      xp: "Learn at your own pace",
    },
    {
      id: "regular",
      emoji: "📚",
      title: "Regular",
      description: "10 min/day",
      xp: "Build consistent habits",
    },
    {
      id: "serious",
      emoji: "🎯",
      title: "Serious",
      description: "20 min/day",
      xp: "Fast-track your learning",
    },
    {
      id: "intense",
      emoji: "🔥",
      title: "Intense",
      description: "30 min/day",
      xp: "Maximum progress mode",
    },
  ];

  return (
    <View className="flex-1 bg-neutral-50 p-xl justify-center">
      <Text className="text-h1 font-bold text-neutral-800 text-center mb-sm">
        Set Your Daily Goal
      </Text>
      <Text className="text-body text-neutral-600 text-center mb-xl">
        How much time can you commit each day?
      </Text>

      <View className="gap-md mb-xl">
        {goals.map((goal) => (
          <Pressable
            key={goal.id}
            onPress={() => setSelectedGoal(goal.id)}
            className="active:opacity-80"
          >
            <Card
              padding="md"
              className={
                selectedGoal === goal.id
                  ? "border-2 border-primary"
                  : "border-2 border-transparent"
              }
            >
              <View className="flex-row items-center gap-md">
                <Text className="text-3xl">{goal.emoji}</Text>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-xs">
                    <Text className="text-body font-bold text-neutral-800">
                      {goal.title}
                    </Text>
                    <Text className="text-body-sm font-semibold text-primary">
                      {goal.description}
                    </Text>
                  </View>
                  <Text className="text-body-sm text-neutral-600">
                    {goal.xp}
                  </Text>
                </View>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      <View className="gap-sm">
        <Button
          variant="primary"
          size="lg"
          disabled={!selectedGoal}
          onPress={() => router.push("/onboarding/profile-setup")}
        >
          Continue
        </Button>
        <Button variant="outline" size="md" onPress={() => router.back()}>
          Back
        </Button>
      </View>

      <View className="mt-xl flex-row justify-center gap-xs">
        <View className="w-2 h-2 rounded-full bg-neutral-300" />
        <View className="w-2 h-2 rounded-full bg-neutral-300" />
        <View className="w-2 h-2 rounded-full bg-primary" />
        <View className="w-2 h-2 rounded-full bg-neutral-300" />
      </View>
    </View>
  );
}
