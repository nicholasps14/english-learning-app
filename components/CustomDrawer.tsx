import { View, Text, Pressable, ScrollView } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router } from "expo-router";
import { useProgressStore } from "@/stores";

interface DrawerItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

function DrawerItem({ icon, label, onPress }: DrawerItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-md px-lg py-md active:bg-neutral-100 rounded-lg mx-sm"
    >
      <Text className="text-2xl">{icon}</Text>
      <Text className="text-body text-neutral-900">{label}</Text>
    </Pressable>
  );
}

function DrawerDivider() {
  return <View className="h-px bg-neutral-200 my-sm mx-lg" />;
}

export default function CustomDrawer(props: any) {
  const progress = useProgressStore((state) => state.progress);

  if (!progress) return null;

  return (
    <DrawerContentScrollView {...props} className="flex-1 bg-white">
      <View className="flex-1">
        {/* Profile Section */}
        <View className="p-lg pb-md">
          <View className="flex-row items-center gap-md mb-xs">
            <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
              <Text className="text-h3 text-white font-bold">U</Text>
            </View>
            <View className="flex-1">
              <Text className="text-body font-bold text-neutral-900">Learner</Text>
              <Text className="text-body-sm text-neutral-600">
                {progress.totalXP} XP earned
              </Text>
            </View>
          </View>
        </View>

        <DrawerDivider />

        {/* Streak Info */}
        <View className="px-lg py-md">
          <View className="bg-warning-pastel rounded-xl p-md">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-h3 font-bold text-warning-dark">
                  {progress.currentStreak} Day Streak 🔥
                </Text>
                <Text className="text-body-sm text-neutral-600 mt-xs">
                  Keep it up! You're on fire.
                </Text>
              </View>
              <Text className="text-4xl font-bold text-warning-dark">
                {progress.currentStreak}
              </Text>
            </View>
          </View>
        </View>

        <DrawerDivider />

        {/* Navigation Items */}
        <View className="py-sm">
          <DrawerItem
            icon="📊"
            label="Progress & Stats"
            onPress={() => {
              props.navigation.closeDrawer();
              router.push("/(tabs)/progress");
            }}
          />
          <DrawerItem
            icon="📚"
            label="Vocabulary List"
            onPress={() => {
              props.navigation.closeDrawer();
              // TODO: Create vocabulary list screen
              console.log("Navigate to vocabulary");
            }}
          />
          <DrawerItem
            icon="🏆"
            label="Achievements"
            onPress={() => {
              props.navigation.closeDrawer();
              // TODO: Create achievements screen
              console.log("Navigate to achievements");
            }}
          />
          <DrawerItem
            icon="🎯"
            label="Daily Goal"
            onPress={() => {
              props.navigation.closeDrawer();
              // TODO: Create goal settings
              console.log("Navigate to goal settings");
            }}
          />
        </View>

        <DrawerDivider />

        {/* Settings & Help */}
        <View className="py-sm">
          <DrawerItem
            icon="⚙️"
            label="Settings"
            onPress={() => {
              props.navigation.closeDrawer();
              // TODO: Create settings screen
              console.log("Navigate to settings");
            }}
          />
          <DrawerItem
            icon="❓"
            label="Help & Feedback"
            onPress={() => {
              props.navigation.closeDrawer();
              // TODO: Create help screen
              console.log("Navigate to help");
            }}
          />
        </View>

        {/* App Version */}
        <View className="px-lg py-md mt-auto">
          <Text className="text-xs text-neutral-400 text-center">
            EnglishFlow v1.0.0
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
