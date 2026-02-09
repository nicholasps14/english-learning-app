import { View, Text } from "react-native";

type BadgeVariant = "primary" | "tech" | "life" | "success" | "warning" | "neutral";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  icon,
}: BadgeProps) {
  // Variant styles
  const variantClasses = {
    primary: "bg-primary/10 border-primary/20",
    tech: "bg-tech-light/20 border-tech-primary/30",
    life: "bg-life-light/20 border-life-primary/30",
    success: "bg-success/10 border-success/20",
    warning: "bg-warning/10 border-warning/20",
    neutral: "bg-neutral-100 border-neutral-300",
  };

  // Text color based on variant
  const textColorClasses = {
    primary: "text-primary-dark",
    tech: "text-tech-dark",
    life: "text-life-dark",
    success: "text-success-dark",
    warning: "text-warning-dark",
    neutral: "text-neutral-700",
  };

  // Size styles
  const sizeClasses = {
    sm: "px-xs py-xs",
    md: "px-sm py-xs",
    lg: "px-md py-sm",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-body-sm",
    lg: "text-body",
  };

  const badgeClasses = [
    "rounded-full border flex-row items-center gap-xs",
    variantClasses[variant],
    sizeClasses[size],
  ].join(" ");

  const textClasses = [
    "font-semibold",
    textColorClasses[variant],
    textSizeClasses[size],
  ].join(" ");

  return (
    <View className={badgeClasses}>
      {icon}
      <Text className={textClasses}>{children}</Text>
    </View>
  );
}
