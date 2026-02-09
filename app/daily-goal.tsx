import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { Card, Button } from "@/components";

const GOAL_OPTIONS = [
  { xp: 10, time: "5 min", level: "Casual", icon: "🌱" },
  { xp: 20, time: "10 min", level: "Regular", icon: "🎯" },
  { xp: 50, time: "20 min", level: "Serious", icon: "🔥" },
  { xp: 100, time: "30 min", level: "Intense", icon: "⚡" },
];

export default function DailyGoalScreen() {
  const [selectedGoal, setSelectedGoal] = React.useState(20);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-lg gap-lg">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.push("/(tabs)/tech")} className="active:opacity-70">
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text className="text-h2 font-bold text-neutral-900">Daily Goal</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Info Card */}
        <Card>
          <Text className="text-body text-neutral-700">
            Set a daily XP goal to stay motivated. We'll remind you to practice and
            track your progress!
          </Text>
        </Card>

        {/* Goal Options */}
        <View className="gap-md">
          <Text className="text-h3 font-bold text-neutral-900">Choose Your Goal</Text>

          {GOAL_OPTIONS.map((option) => (
            <Pressable
              key={option.xp}
              onPress={() => setSelectedGoal(option.xp)}
              className="active:opacity-70"
            >
              <Card
                className={
                  selectedGoal === option.xp
                    ? "border-2 border-primary"
                    : "border border-neutral-200"
                }
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-md flex-1">
                    <Text className="text-4xl">{option.icon}</Text>
                    <View className="flex-1">
                      <Text className="text-body font-bold text-neutral-900">
                        {option.level}
                      </Text>
                      <Text className="text-body-sm text-neutral-600 mt-xs">
                        {option.xp} XP · {option.time}/day
                      </Text>
                    </View>
                  </View>
                  {selectedGoal === option.xp && (
                    <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                      <Text className="text-white text-xs font-bold">✓</Text>
                    </View>
                  )}
                </View>
              </Card>
            </Pressable>
          ))}
        </View>

        {/* Save Button */}
        <Button
          variant="primary"
          size="lg"
          onPress={() => {
            // TODO: Save goal to store
            router.push("/(tabs)/tech");
          }}
        >
          Save Goal
        </Button>

        {/* Current Streak Info */}
        <View
          className="rounded-2xl p-xl border border-neutral-200"
          style={{ backgroundColor: "#FFF3CD" }}
        >
          <View className="flex-row items-center gap-md">
            <Text className="text-3xl">🔥</Text>
            <View className="flex-1">
              <Text className="text-body font-bold" style={{ color: "#856404" }}>
                Keep Your Streak!
              </Text>
              <Text className="text-body-sm text-neutral-700 mt-xs">
                Practice every day to build your streak and unlock achievements.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
