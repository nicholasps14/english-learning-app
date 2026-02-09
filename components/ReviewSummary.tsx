import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import Card from "./Card";
import Button from "./Button";

interface ReviewSummaryProps {
  cardsReviewed: number;
  correctCount: number;
  xpEarned: number;
  timeSpent: number; // in seconds
  onDone: () => void;
}

export default function ReviewSummary({
  cardsReviewed,
  correctCount,
  xpEarned,
  timeSpent,
  onDone,
}: ReviewSummaryProps) {
  const accuracy = cardsReviewed > 0 ? Math.round((correctCount / cardsReviewed) * 100) : 0;
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  return (
    <View className="flex-1 bg-white items-center justify-center p-lg">
      <View className="w-full max-w-md gap-lg">
        {/* Success Icon */}
        <View className="items-center mb-md">
          <Text className="text-6xl mb-sm">🎉</Text>
          <Text className="text-h1 font-bold text-neutral-900 text-center">
            Review Complete!
          </Text>
          <Text className="text-body text-neutral-600 text-center mt-xs">
            Great work! Keep it up.
          </Text>
        </View>

        {/* Stats Card */}
        <Card>
          <View className="gap-md">
            {/* XP Earned */}
            <View className="items-center py-lg border-b border-neutral-200">
              <Text className="text-body-sm text-neutral-600 mb-xs">XP Earned</Text>
              <Text className="text-4xl font-bold text-primary">+{xpEarned}</Text>
            </View>

            {/* Stats Grid */}
            <View className="gap-sm">
              <View className="flex-row justify-between items-center py-sm">
                <Text className="text-body text-neutral-600">Cards Reviewed</Text>
                <Text className="text-body font-bold text-neutral-900">{cardsReviewed}</Text>
              </View>

              <View className="flex-row justify-between items-center py-sm">
                <Text className="text-body text-neutral-600">Correct Answers</Text>
                <Text className="text-body font-bold text-success">{correctCount}</Text>
              </View>

              <View className="flex-row justify-between items-center py-sm">
                <Text className="text-body text-neutral-600">Accuracy</Text>
                <Text className="text-body font-bold text-neutral-900">{accuracy}%</Text>
              </View>

              <View className="flex-row justify-between items-center py-sm">
                <Text className="text-body text-neutral-600">Time Spent</Text>
                <Text className="text-body font-bold text-neutral-900">
                  {minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Actions */}
        <View className="gap-sm">
          <Button variant="primary" size="lg" onPress={onDone}>
            Done
          </Button>
          <Button variant="outline" size="lg" onPress={() => router.push("/review")}>
            Review More
          </Button>
        </View>
      </View>
    </View>
  );
}
