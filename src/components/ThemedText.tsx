import { Text, type TextProps } from "react-native";

import { cn } from "@/utils/tailwindcss";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  lightColor,
  darkColor,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={cn(
        "text-dark-700 dark:text-dark-200",
        {
          "text-base leading-6": type === "default",
          "text-3xl font-bold leading-8": type === "title",
          "text-base leading-6 font-semibold": type === "defaultSemiBold",
          "text-xl font-bold": type === "subtitle",
          "text-base leading-[30px] text-primary-500": type === "link",
        },
        className,
      )}
      {...rest}
    />
  );
}
