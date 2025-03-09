import { Tabs } from "expo-router";
import { Pulse, GearSix } from "phosphor-react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Summary",
            tabBarIcon: ({ color, focused }) => (
              <Pulse
                size={28}
                color={color}
                weight={focused ? "bold" : "regular"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, focused }) => (
              <GearSix
                size={28}
                color={color}
                weight={focused ? "fill" : "regular"}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
