import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { useProgressStore } from "@/stores";
import { Card } from "@/components";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export default function AchievementsScreen() {
  const progress = useProgressStore((state) => state.progress);

  if (!progress) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  const achievements: Achievement[] = [
    {
      id: "first_lesson",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      unlocked: progress.completedLessonIds.length > 0,
    },
    {
      id: "streak_3",
      title: "On Fire",
      description: "Maintain a 3-day streak",
      icon: "🔥",
      unlocked: progress.currentStreak >= 3,
    },
    {
      id: "streak_7",
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "⚡",
      unlocked: progress.currentStreak >= 7,
    },
    {
      id: "xp_100",
      title: "Centurion",
      description: "Earn 100 XP",
      icon: "💯",
      unlocked: progress.totalXP >= 100,
      progress: Math.min(progress.totalXP, 100),
      target: 100,
    },
    {
      id: "xp_500",
      title: "Power User",
      description: "Earn 500 XP",
      icon: "⭐",
      unlocked: progress.totalXP >= 500,
      progress: Math.min(progress.totalXP, 500),
      target: 500,
    },
    {
      id: "lessons_10",
      title: "Dedicated Learner",
      description: "Complete 10 lessons",
      icon: "📚",
      unlocked: progress.completedLessonIds.length >= 10,
      progress: Math.min(progress.completedLessonIds.length, 10),
      target: 10,
    },
    {
      id: "vocab_50",
      title: "Vocabulary Master",
      description: "Learn 50 words",
      icon: "🎓",
      unlocked: progress.learnedVocabularyIds.length >= 50,
      progress: Math.min(progress.learnedVocabularyIds.length, 50),
      target: 50,
    },
    {
      id: "perfect_lesson",
      title: "Perfectionist",
      description: "Complete a lesson with 100% accuracy",
      icon: "💎",
      unlocked: progress.hasPerfectLesson,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-lg gap-lg">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.push("/(tabs)/tech")} className="active:opacity-70">
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text className="text-h2 font-bold text-neutral-900">Achievements</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Stats */}
        <Card>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-h3 font-bold text-neutral-900">
                {unlockedCount} / {achievements.length}
              </Text>
              <Text className="text-body-sm text-neutral-600 mt-xs">
                Achievements Unlocked
              </Text>
            </View>
            <Text className="text-4xl">🏆</Text>
          </View>
        </Card>

        {/* Achievements List */}
        <View className="gap-sm">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={achievement.unlocked ? "" : "opacity-60"}
            >
              <View className="flex-row items-center gap-md">
                <Text className="text-5xl">{achievement.icon}</Text>
                <View className="flex-1">
                  <Text className="text-body font-bold text-neutral-900">
                    {achievement.title}
                  </Text>
                  <Text className="text-body-sm text-neutral-600 mt-xs">
                    {achievement.description}
                  </Text>
                  {!achievement.unlocked && achievement.progress !== undefined && (
                    <View className="mt-sm">
                      <View className="flex-row items-center justify-between mb-xs">
                        <Text className="text-xs text-neutral-500">
                          {achievement.progress} / {achievement.target}
                        </Text>
                      </View>
                      <View className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <View
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${
                              ((achievement.progress || 0) / (achievement.target || 1)) *
                              100
                            }%`,
                          }}
                        />
                      </View>
                    </View>
                  )}
                </View>
                {achievement.unlocked && (
                  <View className="bg-success rounded-full p-sm">
                    <Text className="text-white font-bold">✓</Text>
                  </View>
                )}
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
