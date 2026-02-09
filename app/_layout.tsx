import { Stack } from "expo-router";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View, ActivityIndicator } from "react-native";
import { useInitializeApp } from "@/hooks/useInitializeApp";
import { DrawerProvider } from "@/components";
import "../global.css";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const isAppReady = useInitializeApp();

  useEffect(() => {
    if (fontsLoaded && isAppReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isAppReady]);

  if (!fontsLoaded || !isAppReady) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <DrawerProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </DrawerProvider>
  );
}
