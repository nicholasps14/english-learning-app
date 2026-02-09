import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

// Hardcoded users
const USERS = [
  {
    email: "nicholas.pereira.sabino@hotmail.com",
    password: "letsgo",
    name: "Nicholas",
  },
  {
    email: "larissa_petrini@hotmail.com",
    password: "letsgo",
    name: "Larissa",
  },
];

const AUTH_KEY = "@english_app_user";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Find user with matching credentials
    const user = USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      const userData = { email: user.email, name: user.name };
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      set({ user: userData, isAuthenticated: true });
      return true;
    }

    return false;
  },

  logout: async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    set({ user: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      const userJson = await AsyncStorage.getItem(AUTH_KEY);
      if (userJson) {
        const user = JSON.parse(userJson);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  },
}));
