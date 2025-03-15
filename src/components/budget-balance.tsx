import numeral from "numeral";
import { View } from "react-native";

import { cn } from "@/utils/tailwindcss";

import { ProgressBar } from "./progress-bar";
import Text from "./text";

type BudgetBalanceProps = {
  balance: number;
  budget: number;
  caption: string;
};

export const BudgetBalance = ({
  balance = 0,
  budget = 0,
  caption = "Balance",
}: BudgetBalanceProps) => {
  const percentage = (balance / budget) * 100;

  const isGood = percentage >= 90;
  const isMedium = percentage >= 50 && percentage < 90;
  const isBad = percentage < 50;

  return (
    <View className="gap-1">
      <Text weight="500">{caption}</Text>
      <View className="flex-row items-end">
        <Text
          weight="900"
          className={cn("text-5xl uppercase leading-none", {
            "text-success-500 dark:text-success-400": isGood,
            "text-secondary-500 dark:text-secondary-400": isMedium,
            "text-danger-500 dark:text-danger-400": isBad,
          })}
        >
          {numeral(balance).format("0,0")}
        </Text>
        <Text
          weight="900"
          className={cn("uppercase mb-1", {
            "text-success-500 dark:text-success-400": isGood,
            "text-secondary-500 dark:text-secondary-400": isMedium,
            "text-danger-500 dark:text-danger-400": isBad,
          })}
        >
          rwf
        </Text>
      </View>
      <ProgressBar
        progress={percentage}
        containerClassName={cn({
          "bg-success-500/50": isGood,
          "bg-secondary-500/50": isMedium,
          "bg-danger-500/50": isBad,
        })}
        className={cn({
          "bg-success-500": isGood,
          "bg-secondary-500": isMedium,
          "bg-danger-500": isBad,
        })}
      />
    </View>
  );
};
