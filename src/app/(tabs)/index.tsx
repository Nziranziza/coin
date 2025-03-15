import { router } from "expo-router";
import { Plus, Wallet, ArrowRight } from "phosphor-react-native";
import { View, ScrollView, FlatList } from "react-native";

import { BudgetBalance } from "@/components/budget-balance";
import Button from "@/components/button";
import Logo from "@/components/icons/logo";
import { StatsCard } from "@/components/stats-card";
import Text from "@/components/text";
import { ThemedView } from "@/components/ThemedView";
import { TransactionCard } from "@/components/transaction-card";
import { useThemeColor } from "@/hooks/useThemeColor";
import { groceries } from "@/mocks";
import { colors } from "@/utils/tailwindcss";
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
        <Button
          title="Make payment"
          icon={Wallet}
          size="sm"
          onPress={() => router.push("/sendMoney")}
        />
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
        renderItem={({ item, index }) => (
          <TransactionCard
            name={item.name}
            amount={item.price * item.quantity}
            date={item.date}
            type={index % 2 === 0 ? "deposit" : "withdrawal"}
            image={item.image}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-2 px-8 pb-8"
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
