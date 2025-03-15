import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import { cn } from "@/utils/tailwindcss";

import Eye from "./icons/eye";
import Text from "./text";

type TextInputWithLabelProps = TextInputProps & {
  label: string;
  isPassword?: boolean;
  style?: StyleProp<ViewStyle>;
  size?: "sm" | "lg" | "md";
  helpText?: string;
  error?: string;
  rightAdornment?: React.ReactNode;
};

export default function TextInputWithLabel({
  label,
  style,
  isPassword,
  className,
  size = "md",
  helpText,
  error,
  rightAdornment,
  ...props
}: TextInputWithLabelProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSmall = size === "sm";
  const isLarge = size === "lg";
  const isMedium = size === "md";

  return (
    <View className="w-full">
      <Text
        weight="500"
        className={cn("mb-1", {
          "text-sm": isSmall,
          "text-base": isMedium,
          "text-lg": isLarge,
        })}
      >
        {label}
      </Text>
      <View className="relative flex-row items-center">
        <TextInput
          className={cn(
            "text-dark-700 dark:text-dark-200 border rounded-lg dark:border-dark-200 border-dark-700 flex-1",
            {
              "px-3 text-sm min-h-10 leading-none": isSmall,
              "px-4 text-base min-h-12 leading-none": isMedium,
              "px-5 text-lg min-h-14 leading-none": isLarge,
              "border-danger-500 dark:border-danger-500": error,
            },
            className,
          )}
          secureTextEntry={isPassword && !isPasswordVisible}
          style={{
            fontFamily: "InterRegular",
          }}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            className={cn(
              "absolute right-2 h-full justify-center items-center",
              {
                "p-2": isSmall,
                "p-3": isMedium,
                "p-4": isLarge,
              },
            )}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Eye />
          </TouchableOpacity>
        )}
        {rightAdornment && (
          <View className="absolute right-2 h-full justify-center items-center">
            {rightAdornment}
          </View>
        )}
      </View>
      <View className="mt-1 min-h-[18px]">
        {error ? (
          <Text className="text-danger-500 dark:text-danger-500 text-xs">
            {error}
          </Text>
        ) : helpText ? (
          <Text className="text-dark-500 dark:text-dark-400 text-xs">
            {helpText}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
