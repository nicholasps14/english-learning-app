import { View, Text, ScrollView } from "react-native";
import { Card, Button, Badge } from "@/components";

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-neutral-50">
      <View className="p-lg gap-lg">
        {/* Header */}
        <Card className="items-center" padding="lg">
          <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-md">
            <Text className="text-4xl font-bold text-white">NS</Text>
          </View>
          <Text className="text-h2 font-bold text-neutral-800">
            Nicholas Sabino
          </Text>
          <Text className="text-body text-neutral-600">
            Brazilian Developer in Canada
          </Text>
          <View className="flex-row gap-sm mt-md">
            <Badge variant="tech">Tech Level 3</Badge>
            <Badge variant="life">Life Level 2</Badge>
          </View>
        </Card>

        {/* Achievements */}
        <Card>
          <Text className="text-h3 font-bold text-neutral-800 mb-md">
            Achievements
          </Text>
          <View className="gap-sm">
            <View className="flex-row items-center gap-md">
              <Text className="text-3xl">🔥</Text>
              <View className="flex-1">
                <Text className="text-body font-semibold text-neutral-800">
                  Week Warrior
                </Text>
                <Text className="text-body-sm text-neutral-600">
                  7 day learning streak
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-md">
              <Text className="text-3xl">💻</Text>
              <View className="flex-1">
                <Text className="text-body font-semibold text-neutral-800">
                  Tech Beginner
                </Text>
                <Text className="text-body-sm text-neutral-600">
                  Complete 10 tech lessons
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-md opacity-50">
              <Text className="text-3xl">🌟</Text>
              <View className="flex-1">
                <Text className="text-body font-semibold text-neutral-800">
                  Polyglot Master
                </Text>
                <Text className="text-body-sm text-neutral-600">
                  Reach Level 5 in both modes
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Settings */}
        <Card>
          <Text className="text-h3 font-bold text-neutral-800 mb-md">
            Settings
          </Text>
          <View className="gap-sm">
            <Button variant="outline" size="md">
              Edit Profile
            </Button>
            <Button variant="outline" size="md">
              Learning Goals
            </Button>
            <Button variant="outline" size="md">
              Notifications
            </Button>
            <Button variant="secondary" size="md">
              Sign Out
            </Button>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
