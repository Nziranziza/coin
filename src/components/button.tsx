import { IconProps } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";

import { cn } from "@/utils/tailwindcss";

import { PressableOpacity, PressableOpacityProps } from "./pressable-opacity";
import Text from "./text";

type ButtonProps = PressableOpacityProps & {
  title: string;
  icon?: React.ComponentType<IconProps>;
  iconPosition?: "left" | "right";
  textClassName?: string;
  iconColor?: string;
  iconSize?: number;
  size?: "sm" | "md";
};

export default function Button({
  title,
  icon: Icon,
  iconPosition = "left",
  textClassName,
  iconColor = "white",
  className,
  iconSize,
  size = "md",
  ...props
}: ButtonProps) {
  const defaultIconSize = size === "sm" ? 16 : 24;
  const finalIconSize = iconSize ?? defaultIconSize;
  const isSmall = size === "sm";

  return (
    <PressableOpacity
      className={cn(
        "bg-primary-500 flex-row justify-center items-center rounded-full py-[15px] px-6 min-h-[48px]",
        {
          "py-1.5 px-4 min-h-[32px]": isSmall,
        },
        className,
      )}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <View className="mr-1.5">
          <Icon weight="bold" size={finalIconSize} color={iconColor} />
        </View>
      )}
      <Text
        weight="600"
        className={cn("text-white", { "text-sm": isSmall }, textClassName)}
      >
        {title}
      </Text>
      {Icon && iconPosition === "right" && (
        <View className="ml-1.5">
          <Icon weight="bold" size={finalIconSize} color={iconColor} />
        </View>
      )}
    </PressableOpacity>
  );
}
