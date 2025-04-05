import { Image } from "expo-image";
import moment from "moment";
import numeral from "numeral";
import { ArrowDown, ArrowUp } from "phosphor-react-native";
import { View } from "react-native";

import { colors } from "@/utils/tailwindcss";

import { PressableOpacity } from "./pressable-opacity";
import Text from "./text";

type TransactionCardProps = {
  name: string;
  amount: number;
  date: string;
  type: "deposit" | "withdrawal";
  image: string;
};

const TransactionIcon = ({ type }: { type: TransactionCardProps["type"] }) => {
  if (type === "deposit") {
    return (
      <View className="absolute -bottom-1 -right-1 bg-success-500 items-center justify-center rounded-full p-1">
        <ArrowUp weight="bold" size={12} color={colors.white} />
      </View>
    );
  }
  return (
    <View className="absolute -bottom-1 -right-1 bg-danger-500 items-center justify-center rounded-full p-1">
      <ArrowDown weight="bold" size={12} color={colors.white} />
    </View>
  );
};

export const TransactionCard = ({
  name,
  image,
  date,
  amount,
  type,
}: TransactionCardProps) => {
  return (
    <PressableOpacity className="bg-dark-100 dark:bg-dark-800 rounded-lg p-3">
      <View className="flex-row items-start gap-2">
        <View className="relative">
          <View className="w-[48px] h-[48px] rounded-lg bg-gray-500/20 dark:bg-gray-500/50 overflow-hidden">
            <Image
              source={image}
              style={{ width: 48, height: 48 }}
              contentFit="cover"
            />
          </View>
          <TransactionIcon type={type} />
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between flex-1 items-start">
            <Text className="leading-none">{name}</Text>
            <Text className="text-xs text-gray-500 dark:text-gray-400 leading-none">
              {moment(date).format("DD MMM YYYY")}
            </Text>
          </View>
          <View className="flex-row items-end">
            <Text weight="500" className="leading-none text-2xl">
              {numeral(amount * 1400).format("0,0")}
            </Text>
            <Text weight="700" className="uppercase text-xs mb-[1px]">
              rwf
            </Text>
          </View>
        </View>
      </View>
    </PressableOpacity>
  );
};
