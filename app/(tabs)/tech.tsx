import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { Card, Button, Badge, ProgressBar, useDrawer } from "@/components";
import { useProgressStore } from "@/stores";
import { getXPForNextLevel } from "@/lib/types";
import { techCategories } from "@/data/tech";

export default function TechScreen() {
  const progress = useProgressStore((state) => state.progress);
  const { toggleDrawer } = useDrawer();

  if (!progress) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  // Calculate tech progress percentage
  const techLevel = progress.techLevel;
  const currentXP = progress.techXP;
  const nextLevelXP = getXPForNextLevel(techLevel);
  const previousLevelXP = techLevel > 1 ? getXPForNextLevel(techLevel - 1) : 0;
  const progressPercent = Math.round(
    ((currentXP - previousLevelXP) / (nextLevelXP - previousLevelXP)) * 100
  );

  // Show only first 3 categories by default
  const [showAllCategories, setShowAllCategories] = React.useState(false);
  const visibleCategories = showAllCategories ? techCategories : techCategories.slice(0, 3);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-lg gap-lg">
        {/* Header with Hamburger Menu */}
        <View className="flex-row items-center justify-between mb-sm">
          <Pressable onPress={toggleDrawer} className="p-sm active:opacity-70">
            <Text className="text-3xl">☰</Text>
          </Pressable>
          <View className="flex-row items-center gap-sm">
            <View className="bg-tech-pastel px-md py-xs rounded-full">
              <Text className="text-body-sm text-tech-dark">Tech Mode</Text>
            </View>
            <View className="bg-neutral-100 px-md py-xs rounded-full">
              <Text className="text-body-sm text-neutral-600">Level {techLevel}</Text>
            </View>
          </View>
        </View>

        {/* Simplified Progress */}
        <View className="items-center py-lg">
          <View className="w-32 h-32 rounded-full items-center justify-center mb-md" style={{ backgroundColor: '#007AFF' }}>
            <Text className="text-4xl font-bold text-white">{progressPercent}%</Text>
          </View>
          <Text className="text-h2 font-bold text-neutral-900">Tech English</Text>
          <Text className="text-body text-neutral-600 mt-xs">
            {currentXP} / {nextLevelXP} XP to Level {techLevel + 1}
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="gap-sm">
          {/* Make Practice the PRIMARY action - bigger and more prominent */}
          <Pressable
            onPress={() => router.push("/practice?mode=tech")}
            className="active:opacity-80"
            style={{
              backgroundColor: "#007AFF",
              padding: 24,
              borderRadius: 16,
              shadowColor: "#007AFF",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <View className="items-center gap-sm">
              <Text className="text-5xl">🎯</Text>
              <Text className="text-h2 font-bold text-white">Practice Now</Text>
              <Text className="text-body-sm text-white/80">
                Learn through interactive exercises
              </Text>
            </View>
          </Pressable>

          {/* Secondary action - smaller */}
          <Button
            variant="outline"
            size="md"
            onPress={() => router.push("/review")}
          >
            Daily Review
          </Button>
        </View>

        {/* Categories */}
        <View className="gap-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-h3 font-semibold text-neutral-900">
              Tech Categories
            </Text>
            {!showAllCategories && techCategories.length > 3 && (
              <Pressable onPress={() => setShowAllCategories(true)}>
                <Text className="text-body-sm text-tech-primary font-semibold">
                  View all {techCategories.length} →
                </Text>
              </Pressable>
            )}
          </View>

          {visibleCategories.map((category) => {
            const firstLessonId = category.subcategories[0]?.lessonIds[0];
            const completedLessons = progress.completedLessonIds.filter((id) =>
              category.subcategories[0]?.lessonIds.includes(id)
            ).length;
            const totalLessons = category.subcategories[0]?.lessonIds.length || 0;
            const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

            return (
              <Card key={category.id} variant="tech">
                <View className="gap-md">
                  <View>
                    <View className="flex-row items-center gap-sm mb-xs">
                      <Text className="text-2xl">{category.icon}</Text>
                      <Text className="text-body font-bold text-tech-dark flex-1">
                        {category.name}
                      </Text>
                      <Badge variant="tech" size="sm">
                        {`${completedLessons}/${totalLessons}`}
                      </Badge>
                    </View>
                    <Text className="text-body-sm text-neutral-600 mb-sm">
                      {category.description}
                    </Text>
                    <ProgressBar progress={progressPercent} variant="tech" height="sm" />
                  </View>
                  <Button
                    variant="tech"
                    size="sm"
                    onPress={() => firstLessonId && router.push(`/lesson/${firstLessonId}`)}
                    disabled={!firstLessonId}
                  >
                    {completedLessons > 0 ? "Continue Learning" : "Start Learning"}
                  </Button>
                </View>
              </Card>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
