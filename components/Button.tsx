import { Pressable, Text, ActivityIndicator } from "react-native";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "tech" | "life";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<any, ButtonProps>(
  (
    {
      children,
      onPress,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
    },
    ref
  ) => {
    const baseClasses = "rounded-lg items-center justify-center";

    // Variant styles
    const variantClasses = {
      primary: "bg-primary active:bg-primary-dark",
      secondary: "bg-neutral-200 active:bg-neutral-300",
      outline: "bg-transparent border-2 border-primary active:bg-primary/10",
      tech: "bg-tech-primary active:bg-tech-dark",
      life: "bg-life-primary active:bg-life-dark",
    };

    // Size styles
    const sizeClasses = {
      sm: "px-md py-sm",
      md: "px-lg py-md",
      lg: "px-xl py-lg",
    };

    // Text color based on variant
    const textColorClasses = {
      primary: "text-white",
      secondary: "text-neutral-800",
      outline: "text-primary",
      tech: "text-white",
      life: "text-white",
    };

    // Text size based on button size
    const textSizeClasses = {
      sm: "text-body-sm",
      md: "text-body",
      lg: "text-body-lg",
    };

    const buttonClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full",
      disabled && "opacity-50",
    ]
      .filter(Boolean)
      .join(" ");

    const textClasses = [
      "font-semibold",
      textColorClasses[variant],
      textSizeClasses[size],
    ].join(" ");

    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        disabled={disabled || loading}
        className={buttonClasses}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === "outline" ? "#6C5CE7" : "#FFFFFF"}
          />
        ) : (
          <Text className={textClasses}>{children}</Text>
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export default Button;
