import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile, UserPreferences } from "@/lib/types";

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;

  // Actions
  setProfile: (profile: UserProfile) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  completeOnboarding: () => void;
  loadProfile: () => Promise<void>;
  saveProfile: () => Promise<void>;
  clearProfile: () => void;
}

const STORAGE_KEY = "@englishflow:user_profile";

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isLoading: false,
  hasCompletedOnboarding: false,

  setProfile: (profile) => {
    set({ profile });
    get().saveProfile();
  },

  updatePreferences: (preferences) => {
    const { profile } = get();
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      preferences: {
        ...profile.preferences,
        ...preferences,
      },
    };
    set({ profile: updatedProfile });
    get().saveProfile();
  },

  completeOnboarding: () => {
    set({ hasCompletedOnboarding: true });
    AsyncStorage.setItem("@englishflow:onboarding_complete", "true");
  },

  loadProfile: async () => {
    set({ isLoading: true });
    try {
      const [profileData, onboardingData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem("@englishflow:onboarding_complete"),
      ]);

      if (profileData) {
        const profile = JSON.parse(profileData);
        // Convert date strings back to Date objects
        profile.createdAt = new Date(profile.createdAt);
        set({ profile, hasCompletedOnboarding: onboardingData === "true" });
      }
    } catch (error) {
      console.error("Failed to load user profile:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  saveProfile: async () => {
    const { profile } = get();
    if (!profile) return;

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error("Failed to save user profile:", error);
    }
  },

  clearProfile: () => {
    set({ profile: null, hasCompletedOnboarding: false });
    AsyncStorage.multiRemove([STORAGE_KEY, "@englishflow:onboarding_complete"]);
  },
}));
