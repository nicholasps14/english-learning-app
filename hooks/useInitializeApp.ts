import { useEffect, useState } from "react";
import { useUserStore, useProgressStore, useVocabularyStore, useAuthStore } from "@/stores";
import { allMockVocabulary } from "@/data";

/**
 * Hook to initialize the app with data from AsyncStorage or mock data
 * This should be called once in the root layout
 */
export function useInitializeApp() {
  const [isReady, setIsReady] = useState(false);
  const loadUser = useAuthStore((state) => state.loadUser);
  const setCurrentUser = useProgressStore((state) => state.setCurrentUser);
  const setVocabulary = useVocabularyStore((state) => state.setVocabulary);

  useEffect(() => {
    async function initialize() {
      try {
        // Load authenticated user first
        await loadUser();

        // Get the authenticated user
        const user = useAuthStore.getState().user;

        // If user is authenticated, load their progress
        if (user) {
          await setCurrentUser(user.email);
        }

        // Load vocabulary (in production, this would come from a database/API)
        setVocabulary(allMockVocabulary);

        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize app:", error);
        setIsReady(true); // Continue anyway
      }
    }

    initialize();
  }, []);

  return isReady;
}
