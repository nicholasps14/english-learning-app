import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, Platform } from "react-native";
import { useAuthStore, useProgressStore } from "@/stores";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const setCurrentUser = useProgressStore((state) => state.setCurrentUser);

  const handleLogin = async () => {
    if (!email || !password) {
      if (Platform.OS === "web") {
        window.alert("Please enter both email and password");
      } else {
        Alert.alert("Error", "Please enter both email and password");
      }
      return;
    }

    setLoading(true);
    const success = await login(email, password);

    if (success) {
      // Set current user for progress tracking
      await setCurrentUser(email);

      // Check if user has completed onboarding
      const progress = useProgressStore.getState().progress;
      setLoading(false);

      if (progress && !progress.hasCompletedOnboarding) {
        router.replace("/onboarding/welcome");
      } else {
        router.replace("/(tabs)/tech");
      }
    } else {
      setLoading(false);
      if (Platform.OS === "web") {
        window.alert("Invalid email or password");
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center p-lg">
      <View className="w-full max-w-md gap-lg">
        {/* Logo/Title */}
        <View className="items-center gap-sm mb-lg">
          <Text className="text-6xl">📚</Text>
          <Text className="text-h1 font-bold text-neutral-900">English Flow</Text>
          <Text className="text-body text-neutral-600">
            Learn tech & life English
          </Text>
        </View>

        {/* Email Input */}
        <View className="gap-sm">
          <Text className="text-body-sm font-semibold text-neutral-700">
            Email
          </Text>
          <TextInput
            className="bg-neutral-50 border border-neutral-200 rounded-xl px-md py-md text-body"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
        </View>

        {/* Password Input */}
        <View className="gap-sm">
          <Text className="text-body-sm font-semibold text-neutral-700">
            Password
          </Text>
          <TextInput
            className="bg-neutral-50 border border-neutral-200 rounded-xl px-md py-md text-body"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
        </View>

        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#9CA3AF" : "#007AFF",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
          className="active:opacity-80"
        >
          <Text className="text-body font-bold text-white">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>

        {/* Info Text */}
        <Text className="text-body-sm text-neutral-500 text-center mt-md">
          This app is private. Please use your credentials to access.
        </Text>
      </View>
    </View>
  );
}
