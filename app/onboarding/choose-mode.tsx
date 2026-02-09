import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { Card, Button } from "@/components";

export default function ChooseModeScreen() {
  return (
    <View className="flex-1 bg-neutral-50 p-xl justify-center">
      <Text className="text-h1 font-bold text-neutral-800 text-center mb-sm">
        Choose Your Path
      </Text>
      <Text className="text-body text-neutral-600 text-center mb-xl">
        You can switch between modes anytime
      </Text>

      <View className="gap-lg mb-xl">
        {/* Tech Mode Card */}
        <Pressable
          onPress={() => router.push("/onboarding/set-goal")}
          className="active:opacity-80"
        >
          <Card variant="tech" padding="lg">
            <View className="flex-row items-center gap-md mb-md">
              <Text className="text-4xl">💻</Text>
              <View className="flex-1">
                <Text className="text-h3 font-bold text-tech-dark">
                  Tech English
                </Text>
                <Text className="text-body-sm text-neutral-600">
                  For developers & IT professionals
                </Text>
              </View>
            </View>
            <Text className="text-body text-neutral-700 mb-sm">
              Master programming vocabulary, git commands, code reviews, and technical communication
            </Text>
            <View className="flex-row flex-wrap gap-xs">
              <View className="bg-tech-light/30 px-sm py-xs rounded-full">
                <Text className="text-xs text-tech-dark">Variables</Text>
              </View>
              <View className="bg-tech-light/30 px-sm py-xs rounded-full">
                <Text className="text-xs text-tech-dark">Git</Text>
              </View>
              <View className="bg-tech-light/30 px-sm py-xs rounded-full">
                <Text className="text-xs text-tech-dark">APIs</Text>
              </View>
            </View>
          </Card>
        </Pressable>

        {/* Life Mode Card */}
        <Pressable
          onPress={() => router.push("/onboarding/set-goal")}
          className="active:opacity-80"
        >
          <Card variant="life" padding="lg">
            <View className="flex-row items-center gap-md mb-md">
              <Text className="text-4xl">🌟</Text>
              <View className="flex-1">
                <Text className="text-h3 font-bold text-life-dark">
                  Life English
                </Text>
                <Text className="text-body-sm text-neutral-600">
                  For daily life & social situations
                </Text>
              </View>
            </View>
            <Text className="text-body text-neutral-700 mb-sm">
              Navigate grocery stores, make small talk, visit the doctor, and handle everyday conversations
            </Text>
            <View className="flex-row flex-wrap gap-xs">
              <View className="bg-life-light/30 px-sm py-xs rounded-full">
                <Text className="text-xs text-life-dark">Shopping</Text>
              </View>
              <View className="bg-life-light/30 px-sm py-xs rounded-full">
                <Text className="text-xs text-life-dark">Small Talk</Text>
              </View>
              <View className="bg-life-light/30 px-sm py-xs rounded-full">
                <Text className="text-xs text-life-dark">Healthcare</Text>
              </View>
            </View>
          </Card>
        </Pressable>
      </View>

      <Button
        variant="outline"
        size="md"
        onPress={() => router.back()}
      >
        Back
      </Button>

      <View className="mt-xl flex-row justify-center gap-xs">
        <View className="w-2 h-2 rounded-full bg-neutral-300" />
        <View className="w-2 h-2 rounded-full bg-primary" />
        <View className="w-2 h-2 rounded-full bg-neutral-300" />
        <View className="w-2 h-2 rounded-full bg-neutral-300" />
      </View>
    </View>
  );
}
