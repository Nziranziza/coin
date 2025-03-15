import numeral from "numeral";
import { Bank } from "phosphor-react-native";
import { Dimensions } from "react-native";
import { View } from "react-native";

import { cn, colors } from "@/utils/tailwindcss";

import { PressableOpacity } from "./pressable-opacity";
import Text from "./text";
import { TrendIcon } from "./trend-icon";

type StatsCardProps = {
  title: string;
  value: number;
  className?: string;
  direction?: "up" | "down" | "neutral";
};

export const StatsCard = ({
  title,
  value,
  className,
  direction = "neutral",
}: StatsCardProps) => {
  const isGood = direction === "up";
  const isBad = direction === "down";
  return (
    <PressableOpacity
      className={cn(
        "gap-7 p-4 bg-dark-100 dark:bg-dark-800 rounded-lg",
        className,
      )}
      style={{
        width: (Dimensions.get("window").width / 5) * 3,
      }}
    >
      <View className="flex-row items-center gap-2">
        <View className="w-[38px] h-[38px] bg-primary-500/20 dark:bg-primary-500/50 items-center justify-center rounded-full">
          <Bank size={20} color={colors.primary[500]} />
        </View>
        <Text weight="700" className="text-primary-500 dark:text-primary-500">
          MTN MoMo
        </Text>
      </View>
      <View className="gap-1">
        <Text className="leading-none">{title}</Text>
        <View className="flex-row items-center gap-1">
          <TrendIcon direction={direction} />
          <View className="flex-row items-end">
            <Text
              weight="900"
              className={cn("text-2xl", {
                "text-danger-500 dark:text-danger-500": isBad,
                "text-success-500 dark:text-success-500": isGood,
              })}
            >
              {numeral(value).format("0,0")}
            </Text>
            <Text
              weight="900"
              className={cn("text-[10px] uppercase mb-1", {
                "text-danger-500 dark:text-danger-500": isBad,
                "text-success-500 dark:text-success-500": isGood,
              })}
            >
              rwf
            </Text>
          </View>
        </View>
      </View>
    </PressableOpacity>
  );
};
