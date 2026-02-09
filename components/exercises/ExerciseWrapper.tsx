import { ReactNode } from "react";
import { View, Text } from "react-native";
import { ProgressBar } from "@/components";

interface ExerciseWrapperProps {
  children: ReactNode;
  currentQuestion: number;
  totalQuestions: number;
  xpEarned: number;
  mode?: "tech" | "life";
  showProgress?: boolean;
}

export default function ExerciseWrapper({
  children,
  currentQuestion,
  totalQuestions,
  xpEarned,
  mode = "tech",
  showProgress = true,
}: ExerciseWrapperProps) {
  const progress = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <View className="flex-1 bg-white">
      {/* Header with Progress */}
      {showProgress && (
        <View className="bg-neutral-50 p-lg border-b border-neutral-200">
          <View className="flex-row items-center justify-between mb-sm">
            <Text className="text-body-sm text-neutral-600">
              Question {currentQuestion} of {totalQuestions}
            </Text>
            <Text className="text-body-sm font-semibold text-primary">
              +{xpEarned} XP
            </Text>
          </View>
          <ProgressBar
            progress={progress}
            variant={mode}
            height="sm"
          />
        </View>
      )}

      {/* Exercise Content */}
      <View className="flex-1">{children}</View>
    </View>
  );
}
