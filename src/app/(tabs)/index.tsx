import { Image } from "expo-image";
import moment from "moment";
import numeral from "numeral";
import {
  Bank,
  Plus,
  TrendDown,
  ArrowsHorizontal,
  Wallet,
  ArrowRight,
} from "phosphor-react-native";
import { TrendUp } from "phosphor-react-native";
import { View, ScrollView, Dimensions, FlatList } from "react-native";

import Button from "@/components/button";
import Logo from "@/components/icons/logo";
import { PressableOpacity } from "@/components/pressable-opacity";
import ProgressBar from "@/components/progress-bar";
import Text from "@/components/text";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { groceries } from "@/mocks";
import { cn, colors } from "@/utils/tailwindcss";

type TransactionCardProps = {
  name: string;
  amount: number;
  date: string;
  type: "deposit" | "withdrawal";
  image: string;
};

const TransactionCard = ({
  name,
  image,
  date,
  amount,
}: TransactionCardProps) => {
  return (
    <PressableOpacity className="bg-dark-100 dark:bg-dark-800 rounded-lg p-3">
      <View className="flex-row items-start gap-2">
        <View className="w-[42px] h-[42px] rounded-lg bg-gray-500/20 dark:bg-gray-500/50 overflow-hidden">
          <Image source={image} style={{ width: 42, height: 42 }} />
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between flex-1 items-start">
            <Text weight="700" className="leading-none">
              {name}
            </Text>
            <View className="flex-row items-end">
              <Text weight="700" className="text-sm leading-none">
                {numeral(amount * 1400).format("0,0")}
              </Text>
              <Text weight="700" className="uppercase text-[8px] mb-[1px]">
                rwf
              </Text>
            </View>
          </View>
          <Text className="text-xs text-gray-500 dark:text-gray-400">
            {moment(date).format("DD MMM YYYY")}
          </Text>
        </View>
      </View>
    </PressableOpacity>
  );
};

const TrendIcon = ({ direction }: { direction: "up" | "down" | "neutral" }) => {
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

type StatsCardProps = {
  title: string;
  value: number;
  className?: string;
  direction?: "up" | "down" | "neutral";
};

const StatsCard = ({
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
              className={cn("text-lg", {
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

type BudgetBalanceProps = {
  balance: number;
  budget: number;
  caption: string;
};

const BudgetBalance = ({
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
          className={cn("text-4xl uppercase leading-none", {
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

export default function HomeScreen() {
  const themeColor = useThemeColor(
    {
      light: colors.dark[700],
      dark: colors.dark[200],
    },
    "text",
  );
  return (
    <ThemedView className="flex-1 gap-6">
      <View className="flex-row justify-between px-8 items-start">
        <Logo />
        <Button title="Make payment" icon={Wallet} size="sm" />
      </View>
      <View className="px-8">
        <BudgetBalance
          balance={185_250}
          caption="This month balance"
          budget={205_300}
        />
      </View>
      <View className="flex-none gap-6">
        <ScrollView
          contentContainerClassName="gap-4 px-8"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Button title="New Budget" icon={Plus} size="sm" />
          <Button
            title="Shopping cart"
            icon={Plus}
            size="sm"
            className="bg-dark-100 dark:bg-dark-700"
            textClassName="text-dark-700 dark:text-dark-200"
            iconColor={themeColor}
          />
          <Button
            title="New Budget"
            icon={Plus}
            size="sm"
            className="bg-dark-100 dark:bg-dark-700"
            textClassName="text-dark-700 dark:text-dark-200"
            iconColor={themeColor}
          />
          <Button
            title="New Budget"
            icon={Plus}
            size="sm"
            className="bg-dark-100 dark:bg-dark-700"
            textClassName="text-dark-700 dark:text-dark-200"
            iconColor={themeColor}
          />
          <Button
            title="New Budget"
            icon={Plus}
            size="sm"
            className="bg-dark-100 dark:bg-dark-700"
            textClassName="text-dark-700 dark:text-dark-200"
            iconColor={themeColor}
          />
        </ScrollView>
        <ScrollView
          contentContainerClassName="gap-4 px-8"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <StatsCard direction="up" title="This month in" value={185_250} />
          <StatsCard
            direction="neutral"
            title="This month in"
            value={185_250}
          />
          <StatsCard direction="down" title="This month in" value={185_250} />
          <StatsCard direction="up" title="This month in" value={185_250} />
          <StatsCard
            direction="neutral"
            title="This month in"
            value={185_250}
          />
          <StatsCard direction="down" title="This month in" value={185_250} />
        </ScrollView>
      </View>
      <FlatList
        data={groceries}
        renderItem={({ item }) => (
          <TransactionCard
            name={item.name}
            amount={item.price * item.quantity}
            date={item.date}
            type={item.price > 0 ? "deposit" : "withdrawal"}
            image={item.image}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-4 px-8 pb-8"
        ListHeaderComponent={
          <View className="flex-row justify-between items-center">
            <Text weight="700" className="text-2xl">
              Recent transactions
            </Text>
            <Button
              className="bg-primary-500/10 dark:bg-primary-500/10"
              title="See all"
              icon={ArrowRight}
              size="sm"
              textClassName="text-dark-700 dark:text-dark-200"
              iconColor={themeColor}
            />
          </View>
        }
      />
    </ThemedView>
  );
}
