import { View, Text, ScrollView } from "react-native";
import { Card, Badge, ProgressBar } from "@/components";

export default function ProgressScreen() {
  return (
    <ScrollView className="flex-1 bg-neutral-50">
      <View className="p-lg gap-lg">
        {/* Header */}
        <View className="bg-primary p-xl rounded-2xl">
          <Text className="text-h1 text-white font-bold">Your Progress</Text>
          <Text className="text-body text-white/90 mt-xs">
            Track your learning journey
          </Text>
        </View>

        {/* Stats Overview */}
        <View className="flex-row gap-sm">
          <Card className="flex-1" padding="md">
            <Text className="text-3xl font-bold text-primary">892</Text>
            <Text className="text-body-sm text-neutral-600 mt-xs">
              Total XP
            </Text>
          </Card>
          <Card className="flex-1" padding="md">
            <Text className="text-3xl font-bold text-success">7</Text>
            <Text className="text-body-sm text-neutral-600 mt-xs">
              Day Streak
            </Text>
          </Card>
        </View>

        {/* Learning Modes */}
        <Card>
          <Text className="text-h3 font-bold text-neutral-800 mb-md">
            Learning Modes
          </Text>
          <View className="gap-md">
            <View>
              <View className="flex-row items-center justify-between mb-xs">
                <Text className="text-body font-semibold text-tech-dark">
                  Tech English
                </Text>
                <Badge variant="tech">Level 3</Badge>
              </View>
              <ProgressBar
                progress={65}
                variant="tech"
                showLabel
                label="450 / 700 XP"
              />
            </View>
            <View>
              <View className="flex-row items-center justify-between mb-xs">
                <Text className="text-body font-semibold text-life-dark">
                  Life English
                </Text>
                <Badge variant="life">Level 2</Badge>
              </View>
              <ProgressBar
                progress={45}
                variant="life"
                showLabel
                label="180 / 400 XP"
              />
            </View>
          </View>
        </Card>

        {/* Recent Activity */}
        <Card>
          <Text className="text-h3 font-bold text-neutral-800 mb-md">
            Recent Activity
          </Text>
          <View className="gap-sm">
            <View className="flex-row items-center justify-between py-sm border-b border-neutral-200">
              <View>
                <Text className="text-body font-semibold text-neutral-800">
                  Variables & Data Types
                </Text>
                <Text className="text-body-sm text-neutral-600">
                  Completed lesson 3
                </Text>
              </View>
              <Badge variant="tech" size="sm">
                +50 XP
              </Badge>
            </View>
            <View className="flex-row items-center justify-between py-sm border-b border-neutral-200">
              <View>
                <Text className="text-body font-semibold text-neutral-800">
                  At the Grocery Store
                </Text>
                <Text className="text-body-sm text-neutral-600">
                  Completed lesson 2
                </Text>
              </View>
              <Badge variant="life" size="sm">
                +30 XP
              </Badge>
            </View>
            <View className="flex-row items-center justify-between py-sm">
              <View>
                <Text className="text-body font-semibold text-neutral-800">
                  Git & Version Control
                </Text>
                <Text className="text-body-sm text-neutral-600">
                  Started learning
                </Text>
              </View>
              <Badge variant="neutral" size="sm">
                Today
              </Badge>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
