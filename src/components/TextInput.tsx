import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  useColorScheme,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import { textColor } from "@/constants/Colors";
import { cn } from "@/utils/tailwindcss";

import Eye from "./icons/eye";
import Text from "./text";

type TextInputWithLabelProps = TextInputProps & {
  label: string;
  isPassword?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function TextInputWithLabel({
  label,
  style,
  isPassword,
  className,
  ...props
}: TextInputWithLabelProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === "dark";
  const dynamicTextColor = isDarkMode ? "#fff" : textColor;

  return (
    <View className="w-full mb-4">
      <Text
        className={`mb-1 text-sm font-medium ${isDarkMode ? "text-white" : "text-[#333]"}`}
      >
        {label}
      </Text>
      <View className="relative flex-row items-center">
        <TextInput
          className={cn(
            "flex-1 border rounded-lg py-2.5 px-4 text-sm",
            isDarkMode ? "text-white border-white" : "text-black border-[#333]",
            className,
          )}
          secureTextEntry={isPassword && !isPasswordVisible}
          placeholderTextColor={dynamicTextColor}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            className="absolute right-2 h-full justify-center items-center p-2.5"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Eye />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
