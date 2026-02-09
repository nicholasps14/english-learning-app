import React from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { router } from "expo-router";
import { Card } from "@/components";
import { useProgressStore } from "@/stores";

export default function SettingsScreen() {
  const resetProgress = useProgressStore((state) => state.resetProgress);

  const handleResetProgress = async () => {
    // Use window.confirm for web compatibility
    const confirmed = Platform.OS === 'web'
      ? window.confirm("Are you sure you want to reset all your progress? This cannot be undone.")
      : true; // For native, just confirm

    if (confirmed) {
      await resetProgress();

      // Show success message
      if (Platform.OS === 'web') {
        window.alert("Success! Your progress has been reset. Refreshing...");
        // Force reload to clear state
        window.location.reload();
      } else {
        router.back();
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-lg gap-lg">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.push("/(tabs)/tech")}
            className="active:opacity-70"
          >
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text className="text-h2 font-bold text-neutral-900">Settings</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Account Section */}
        <View className="gap-sm">
          <Text className="text-body font-bold text-neutral-700">Account</Text>
          <Card>
            <Pressable className="py-sm active:opacity-70">
              <Text className="text-body text-neutral-900">Profile Settings</Text>
            </Pressable>
          </Card>
          <Card>
            <Pressable className="py-sm active:opacity-70">
              <Text className="text-body text-neutral-900">Notification Settings</Text>
            </Pressable>
          </Card>
        </View>

        {/* Learning Section */}
        <View className="gap-sm">
          <Text className="text-body font-bold text-neutral-700">Learning</Text>
          <Card>
            <Pressable className="py-sm active:opacity-70">
              <Text className="text-body text-neutral-900">Study Reminders</Text>
            </Pressable>
          </Card>
          <Card>
            <Pressable className="py-sm active:opacity-70">
              <Text className="text-body text-neutral-900">Audio Settings</Text>
            </Pressable>
          </Card>
        </View>

        {/* Data Section */}
        <View className="gap-sm">
          <Text className="text-body font-bold text-neutral-700">Data</Text>
          <Card>
            <Pressable className="py-sm active:opacity-70">
              <Text className="text-body text-neutral-900">Download My Data</Text>
            </Pressable>
          </Card>
          <Card>
            <Pressable className="py-sm active:opacity-70" onPress={handleResetProgress}>
              <Text className="text-body text-error">Reset Progress</Text>
            </Pressable>
          </Card>
        </View>

        {/* About Section */}
        <View className="gap-sm">
          <Text className="text-body font-bold text-neutral-700">About</Text>
          <Card>
            <View className="py-sm">
              <Text className="text-body text-neutral-900">Version</Text>
              <Text className="text-body-sm text-neutral-500 mt-xs">1.0.0</Text>
            </View>
          </Card>
          <Card>
            <Pressable className="py-sm active:opacity-70">
              <Text className="text-body text-neutral-900">Privacy Policy</Text>
            </Pressable>
          </Card>
          <Card>
            <Pressable className="py-sm active:opacity-70">
              <Text className="text-body text-neutral-900">Terms of Service</Text>
            </Pressable>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
