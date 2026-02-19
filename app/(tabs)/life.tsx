import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { Card, Button, Badge, ProgressBar, useDrawer } from "@/components";
import { lifeCategories } from "@/data/life";
import { useProgressStore } from "@/stores";

export default function LifeScreen() {
  const progress = useProgressStore((state) => state.progress);
  const { toggleDrawer } = useDrawer();
  const [showAllCategories, setShowAllCategories] = React.useState(false);

  if (!progress) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  const visibleCategories = showAllCategories ? lifeCategories : lifeCategories.slice(0, 3);
  const completedLifeLessons = progress.completedLessonIds.filter((id) =>
    id.startsWith("life_")
  ).length;
  const totalLifeLessons = lifeCategories.reduce(
    (sum, cat) => sum + (cat.subcategories[0]?.lessonIds.length || 0),
    0
  );
  const lifeProgressPercent =
    totalLifeLessons > 0 ? Math.round((completedLifeLessons / totalLifeLessons) * 100) : 0;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-lg gap-lg">
        {/* Header with Hamburger Menu */}
        <View className="flex-row items-center justify-between mb-sm">
          <Pressable onPress={toggleDrawer} className="p-sm active:opacity-70">
            <Text className="text-3xl">☰</Text>
          </Pressable>
          <View className="flex-row items-center gap-sm">
            <View className="bg-life-pastel px-md py-xs rounded-full">
              <Text className="text-body-sm text-life-dark">Life Mode</Text>
            </View>
            <View className="bg-neutral-100 px-md py-xs rounded-full">
              <Text className="text-body-sm text-neutral-600">Level 2</Text>
            </View>
          </View>
        </View>

        {/* Simplified Progress */}
        <View className="items-center py-lg">
          <View
            className="w-32 h-32 rounded-full items-center justify-center mb-md"
            style={{ backgroundColor: "#34C759" }}
          >
            <Text className="text-4xl font-bold text-white">{lifeProgressPercent}%</Text>
          </View>
          <Text className="text-h2 font-bold text-neutral-900">Life English</Text>
          <Text className="text-body text-neutral-600 mt-xs">
            {completedLifeLessons} / {totalLifeLessons} lessons completed
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="gap-sm">
          {/* Make Practice the PRIMARY action - bigger and more prominent */}
          <Pressable
            onPress={() => router.push("/practice?mode=life")}
            className="active:opacity-80"
            style={{
              backgroundColor: "#34C759",
              padding: 24,
              borderRadius: 16,
              shadowColor: "#34C759",
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
            <Text className="text-h3 font-bold text-neutral-800">Life Categories</Text>
            {!showAllCategories && lifeCategories.length > 3 && (
              <Pressable onPress={() => setShowAllCategories(true)}>
                <Text className="text-body-sm text-life-primary font-semibold">
                  View all {lifeCategories.length} →
                </Text>
              </Pressable>
            )}
          </View>

          {visibleCategories.map((category) => {
            const lessonIds = category.subcategories[0]?.lessonIds || [];
            const completedLessons = progress.completedLessonIds.filter((id) =>
              lessonIds.includes(id)
            ).length;
            const totalLessons = lessonIds.length;
            const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            const nextLessonId =
              lessonIds.find((id) => !progress.completedLessonIds.includes(id)) || lessonIds[0];

            return (
              <Card key={category.id} variant="life">
                <View className="gap-md">
                  <View>
                    <View className="flex-row items-center gap-sm mb-xs">
                      <Text className="text-2xl">{category.icon}</Text>
                      <Text className="text-body font-bold text-life-dark flex-1">
                        {category.name}
                      </Text>
                      <Badge variant="life" size="sm">
                        {`${completedLessons}/${totalLessons}`}
                      </Badge>
                    </View>
                    <Text className="text-body-sm text-neutral-600 mb-sm">
                      {category.description}
                    </Text>
                    <ProgressBar progress={progressPercent} variant="life" height="sm" />
                  </View>
                  <Button
                    variant="life"
                    size="sm"
                    onPress={() => nextLessonId && router.push(`/lesson/${nextLessonId}`)}
                    disabled={!nextLessonId}
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
