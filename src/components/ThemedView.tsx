import {
  ScrollView,
  ScrollViewProps,
  View,
  type ViewProps,
} from "react-native";

import { cn } from "@/utils/tailwindcss";

export type ThemedViewProps = ViewProps & {};

export type ThemedScrollViewProps = ScrollViewProps & {};

export function ThemedView({ className, ...otherProps }: ThemedViewProps) {
  return (
    <View
      className={cn("bg-dark-50 dark:bg-dark-900", className)}
      {...otherProps}
    />
  );
}

export function ThemedScrollView({
  className,
  ...otherProps
}: ThemedScrollViewProps) {
  return (
    <ScrollView
      className={cn("bg-dark-50 dark:bg-dark-900", className)}
      {...otherProps}
    />
  );
}
