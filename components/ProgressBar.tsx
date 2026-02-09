import { View, Text } from "react-native";

type ProgressBarVariant = "primary" | "tech" | "life" | "success";

interface ProgressBarProps {
  progress: number; // 0-100
  variant?: ProgressBarVariant;
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export default function ProgressBar({
  progress,
  variant = "primary",
  height = "md",
  showLabel = false,
  label,
  animated = true,
}: ProgressBarProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  // Height styles
  const heightClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  // Variant colors for the filled portion
  const variantClasses = {
    primary: "bg-primary",
    tech: "bg-tech-primary",
    life: "bg-life-primary",
    success: "bg-success",
  };

  return (
    <View className="w-full">
      {showLabel && (
        <View className="flex-row justify-between mb-xs">
          <Text className="text-body-sm text-neutral-600">
            {label || "Progress"}
          </Text>
          <Text className="text-body-sm font-semibold text-neutral-700">
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
      <View className={`w-full bg-neutral-200 rounded-full overflow-hidden ${heightClasses[height]}`}>
        <View
          className={`${variantClasses[variant]} rounded-full ${heightClasses[height]} ${animated ? "transition-all duration-300" : ""}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </View>
    </View>
  );
}
