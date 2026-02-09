import { View, Text } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-primary p-xl justify-center items-center">
      <Text className="text-6xl mb-lg">👋</Text>
      <Text className="text-h1 text-white font-bold text-center mb-sm">
        Welcome to EnglishFlow
      </Text>
      <Text className="text-body text-white/90 text-center mb-xl max-w-sm">
        Your personalized English learning companion for tech and daily life
      </Text>

      <View className="w-full max-w-sm gap-md">
        <Button
          variant="secondary"
          size="lg"
          onPress={() => router.push("/onboarding/choose-mode")}
        >
          Get Started
        </Button>
        <Button
          variant="outline"
          size="lg"
          onPress={() => router.push("/(tabs)/tech")}
        >
          I Already Have an Account
        </Button>
      </View>

      <View className="mt-xl flex-row gap-xs">
        <View className="w-2 h-2 rounded-full bg-white" />
        <View className="w-2 h-2 rounded-full bg-white/30" />
        <View className="w-2 h-2 rounded-full bg-white/30" />
        <View className="w-2 h-2 rounded-full bg-white/30" />
      </View>
    </View>
  );
}
