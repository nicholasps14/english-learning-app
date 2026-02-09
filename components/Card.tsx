import { View, ViewProps } from "react-native";
import { ReactNode } from "react";

type CardVariant = "default" | "tech" | "life";
type CardElevation = "none" | "sm" | "md" | "lg";

interface CardProps extends ViewProps {
  children: ReactNode;
  variant?: CardVariant;
  elevation?: CardElevation;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
  children,
  variant = "default",
  elevation = "md",
  padding = "md",
  className,
  ...props
}: CardProps) {
  const baseClasses = "bg-white rounded-xl";

  // Elevation (shadow) styles
  const elevationClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  // Padding styles
  const paddingClasses = {
    none: "",
    sm: "p-sm",
    md: "p-md",
    lg: "p-lg",
  };

  // Variant-specific border/background
  const variantClasses = {
    default: "",
    tech: "border-l-4 border-tech-primary bg-tech-bg",
    life: "border-l-4 border-life-primary bg-life-bg",
  };

  const cardClasses = [
    baseClasses,
    elevationClasses[elevation],
    paddingClasses[padding],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <View className={cardClasses} {...props}>
      {children}
    </View>
  );
}
