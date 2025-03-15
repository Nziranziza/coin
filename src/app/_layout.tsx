import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ThemedView, ThemedView as View } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import "@/components/action-sheets/config";

import "../../global.css";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    InterThin: require("../assets/fonts/Inter-Thin.ttf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterLight: require("../assets/fonts/Inter-Light.ttf"),
    InterExtraLight: require("../assets/fonts/Inter-ExtraLight.ttf"),
    InterExtraBold: require("../assets/fonts/Inter-ExtraBold.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
    InterBlack: require("../assets/fonts/Inter-Black.ttf"),
  });
  const isAndroid = Platform.OS === "android";

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SheetProvider>
          <View className="flex-1">
            <StatusBar
              style={colorScheme === "dark" ? "light" : "dark"}
              translucent
            />
            <Stack
              screenOptions={{
                headerShown: false,
                navigationBarColor: Colors[colorScheme ?? "light"].background,
                contentStyle: {
                  backgroundColor: Colors[colorScheme ?? "light"].background,
                },
              }}
              initialRouteName="(tabs)"
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="index" />
              <Stack.Screen
                name="sendMoney"
                options={{
                  presentation: "modal",
                  headerShown: isAndroid,
                  headerTitle: "",
                  headerBackground: () => <ThemedView className="flex-1" />,
                }}
              />
            </Stack>
          </View>
        </SheetProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
