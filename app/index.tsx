import { Redirect } from "expo-router";
import { useAuthStore } from "@/stores";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Redirect based on authentication status
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/tech" />;
  }

  return <Redirect href="/login" />;
}
