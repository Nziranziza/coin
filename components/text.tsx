import React from "react";
import { Text as DefaultText, TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type CustomProps = TextProps & {
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  lightColor?: string;
  darkColor?: string;
};

const fontFamilies = {
  100: "InterThin",
  200: "InterExtraLight",
  300: "InterLight",
  400: "InterRegular",
  500: "InterMedium",
  600: "InterSemiBold",
  700: "InterBold",
  800: "InterExtraBold",
  900: "InterBlack",
};

export default function Text({
  style,
  weight = "400",
  lightColor,
  darkColor,
  ...props
}: CustomProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <DefaultText
      style={[{ fontFamily: fontFamilies[weight], color }, style]}
      {...props}
    />
  );
}
