import { TrendUp, TrendDown, ArrowsHorizontal } from "phosphor-react-native";
import { View } from "react-native";

import { colors } from "@/utils/tailwindcss";

export const TrendIcon = ({
  direction,
}: {
  direction: "up" | "down" | "neutral";
}) => {
  if (direction === "up") {
    return (
      <View className="w-[30px] h-[30px] bg-success-500/20 dark:bg-success-500/50 items-center justify-center rounded-full">
        <TrendUp weight="bold" size={20} color={colors.green[500]} />
      </View>
    );
  }
  if (direction === "down") {
    return (
      <View className="w-[30px] h-[30px] bg-danger-500/20 dark:bg-danger-500/50 items-center justify-center rounded-full">
        <TrendDown weight="bold" size={20} color={colors.red[500]} />
      </View>
    );
  }
  return (
    <View className="w-[30px] h-[30px] bg-gray-500/20 dark:bg-gray-500/50 items-center justify-center rounded-full">
      <ArrowsHorizontal weight="bold" size={20} color={colors.gray[500]} />
    </View>
  );
};
