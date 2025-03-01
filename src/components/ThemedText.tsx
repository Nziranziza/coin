import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { cn } from "@/utils/tailwindcss";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[{ color }, style]}
      className={cn(
        {
          "text-base leading-6": type === "default",
          "text-3xl font-bold leading-8": type === "title",
          "text-base leading-6 font-semibold": type === "defaultSemiBold",
          "text-xl font-bold": type === "subtitle",
          "text-base leading-[30px] text-[#0a7ea4]": type === "link",
        },
        className,
      )}
      {...rest}
    />
  );
}
