import React, { createContext, useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { useProgressStore, useAuthStore } from "@/stores";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(width * 0.8, 320);

interface DrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  toggleDrawer: () => {},
});

export const useDrawer = () => useContext(DrawerContext);

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

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const progress = useProgressStore((state) => state.progress);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    closeDrawer();
    await logout();
    router.replace("/login");
  };

  const openDrawer = () => {
    setIsOpen(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -DRAWER_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsOpen(false));
  };

  const toggleDrawer = () => {
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, toggleDrawer }}>
      {children}

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}
      >
        <View className="flex-1 flex-row">
          {/* Overlay */}
          <Pressable
            className="flex-1 bg-black/50"
            onPress={closeDrawer}
            style={{ flex: 1 }}
          />

          {/* Drawer Content */}
          <Animated.View
            style={{
              width: DRAWER_WIDTH,
              transform: [{ translateX: slideAnim }],
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: { width: 2, height: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <ScrollView className="flex-1">
              {progress && (
                <>
                  {/* Profile Section */}
                  <View className="p-lg pb-md pt-16">
                    <View className="flex-row items-center gap-md mb-xs">
                      <View className="w-12 h-12 rounded-full bg-primary items-center justify-center">
                        <Text className="text-h3 text-white font-bold">
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-body font-bold text-neutral-900">
                          {user?.name || "Learner"}
                        </Text>
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
                        closeDrawer();
                        router.push("/(tabs)/progress");
                      }}
                    />
                    <DrawerItem
                      icon="📚"
                      label="Vocabulary List"
                      onPress={() => {
                        closeDrawer();
                        router.push("/vocabulary");
                      }}
                    />
                    <DrawerItem
                      icon="🏆"
                      label="Achievements"
                      onPress={() => {
                        closeDrawer();
                        router.push("/achievements");
                      }}
                    />
                    <DrawerItem
                      icon="🎯"
                      label="Daily Goal"
                      onPress={() => {
                        closeDrawer();
                        router.push("/daily-goal");
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
                        closeDrawer();
                        router.push("/settings");
                      }}
                    />
                    <DrawerItem
                      icon="❓"
                      label="Help & Feedback"
                      onPress={() => {
                        closeDrawer();
                        router.push("/help");
                      }}
                    />
                  </View>

                  <DrawerDivider />

                  {/* Logout */}
                  <View className="py-sm">
                    <DrawerItem
                      icon="🚪"
                      label="Logout"
                      onPress={handleLogout}
                    />
                  </View>

                  {/* App Version */}
                  <View className="px-lg py-md mt-auto">
                    <Text className="text-xs text-neutral-400 text-center">
                      EnglishFlow v1.0.0
                    </Text>
                  </View>
                </>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </DrawerContext.Provider>
  );
}
