/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { colors } from "@/utils/tailwindcss";

export const Colors = {
  light: {
    text: colors.dark[700],
    background: colors.dark[50],
    tint: colors.primary[500],
    icon: colors.dark[400],
    tabIconDefault: colors.dark[400],
    tabIconSelected: colors.primary[500],
  },
  dark: {
    text: colors.dark[200],
    background: colors.dark[900],
    tint: colors.primary[500],
    icon: colors.dark[400],
    tabIconDefault: colors.dark[400],
    tabIconSelected: colors.dark[50],
  },
};
