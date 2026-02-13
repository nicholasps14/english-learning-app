import { View, Text, TextInput } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Card, Button } from "@/components";
import { useProgressStore } from "@/stores";

export default function ProfileSetupScreen() {
  const [name, setName] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const completeOnboarding = useProgressStore((state) => state.completeOnboarding);

  const handleStartLearning = () => {
    completeOnboarding();
    router.replace("/(tabs)/tech");
  };

  return (
    <View className="flex-1 bg-neutral-50 p-xl justify-center">
      <Text className="text-h1 font-bold text-neutral-800 text-center mb-sm">
        Create Your Profile
      </Text>
      <Text className="text-body text-neutral-600 text-center mb-xl">
        Help us personalize your experience
      </Text>

      <View className="gap-lg mb-xl">
        <Card padding="md">
          <Text className="text-body-sm font-semibold text-neutral-700 mb-xs">
            What's your name?
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            className="bg-neutral-100 px-md py-sm rounded-lg text-body text-neutral-800"
            placeholderTextColor="#9CA3AF"
          />
        </Card>

        <Card padding="md">
          <Text className="text-body-sm font-semibold text-neutral-700 mb-xs">
            What's your native language?
          </Text>
          <TextInput
            value={nativeLanguage}
            onChangeText={setNativeLanguage}
            placeholder="e.g., Portuguese"
            className="bg-neutral-100 px-md py-sm rounded-lg text-body text-neutral-800"
            placeholderTextColor="#9CA3AF"
          />
          <Text className="text-xs text-neutral-500 mt-xs">
            This helps us provide better translations and examples
          </Text>
        </Card>

        <Card padding="md">
          <View className="flex-row items-center gap-md mb-sm">
            <Text className="text-3xl">🎯</Text>
            <View className="flex-1">
              <Text className="text-body font-bold text-neutral-800">
                Your Goal
              </Text>
              <Text className="text-body-sm text-neutral-600">
                10 min/day - Regular learner
              </Text>
            </View>
          </View>
          <Button variant="outline" size="sm" onPress={() => router.back()}>
            Change Goal
          </Button>
        </Card>
      </View>

      <View className="gap-sm">
        <Button
          variant="primary"
          size="lg"
          disabled={!name || !nativeLanguage}
          onPress={handleStartLearning}
        >
          Start Learning
        </Button>
        <Button variant="outline" size="md" onPress={() => router.back()}>
          Back
        </Button>
      </View>

      <View className="mt-xl flex-row justify-center gap-xs">
        <View className="w-2 h-2 rounded-full bg-neutral-300" />
        <View className="w-2 h-2 rounded-full bg-neutral-300" />
        <View className="w-2 h-2 rounded-full bg-neutral-300" />
        <View className="w-2 h-2 rounded-full bg-primary" />
      </View>
    </View>
  );
}
