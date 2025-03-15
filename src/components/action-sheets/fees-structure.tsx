import numeral from "numeral";
import { FlatList, View } from "react-native";
import { SheetProps } from "react-native-actions-sheet";

import Text from "@/components/text";
import { ActionSheetType } from "@/constants/action-sheets";
import { MoMoCharges } from "@/constants/transfer";
import { cn } from "@/utils/tailwindcss";

import { ActionSheet } from "./index";

type ColumnProps = {
  label: string;
  value: string | number;
  align?: "left" | "right";
  highlight?: boolean;
  className?: string;
};

function Column({
  label,
  value,
  align = "left",
  highlight,
  className = "",
}: ColumnProps) {
  return (
    <View
      className={cn(className, {
        "items-end": align === "right",
      })}
    >
      <Text className="text-dark-400 dark:text-dark-500 text-xs mb-1">
        {label}
      </Text>
      <Text
        weight={highlight ? "500" : "400"}
        className={cn("text-base", {
          "text-primary-500 dark:text-primary-500 text-2xl": highlight,
        })}
      >
        {value}
        <Text
          weight={highlight ? "500" : "400"}
          className={cn("text-[8px]", {
            "text-primary-500 dark:text-primary-500 text-xs": highlight,
          })}
        >
          RWF
        </Text>
      </Text>
    </View>
  );
}

type FeeGroup = {
  charge: number;
  ranges: { min: number; max: number }[];
};

function groupFees(charges: typeof MoMoCharges): FeeGroup[] {
  return charges.reduce((groups: FeeGroup[], current) => {
    const existingGroup = groups.find((g) => g.charge === current.charge);
    if (existingGroup) {
      existingGroup.ranges.push({ min: current.min, max: current.max });
    } else {
      groups.push({
        charge: current.charge,
        ranges: [{ min: current.min, max: current.max }],
      });
    }
    return groups;
  }, []);
}

function FeesStructureItem({ item }: { item: FeeGroup }) {
  const rangeText = item.ranges
    .map(
      (range) =>
        `${numeral(range.min).format("0,0")} - ${numeral(range.max).format("0,0")}`,
    )
    .join("\n");

  return (
    <View className="flex-row items-center justify-between py-3 px-4 rounded-lg bg-dark-100 dark:bg-dark-800">
      <Column label="Amount" value={rangeText} className="flex-[2]" />
      <Column
        label="Fee"
        value={`${numeral(item.charge).format("0,0")}`}
        align="right"
        highlight
      />
    </View>
  );
}

type FeesStructureProps = SheetProps<ActionSheetType.FeesStructure>;
export const FeesStructure = ({ payload }: FeesStructureProps) => {
  const groupedFees = groupFees(MoMoCharges);

  return (
    <ActionSheet>
      <View className="px-8 mb-4">
        <FlatList
          data={groupedFees}
          renderItem={({ item }) => <FeesStructureItem item={item} />}
          contentContainerClassName="gap-y-2"
          ListHeaderComponent={() => (
            <View className="flex-1">
              <View className="mb-2">
                <Text weight="700" className="text-3xl pt-4 pb-1">
                  <Text
                    weight="700"
                    className="text-primary-500 dark:text-primary-500 text-3xl"
                  >
                    {payload?.title}
                  </Text>
                  {"\n"}
                  Fees Structure
                </Text>
                <Text className="text-xs text-dark-400 dark:text-dark-400">
                  The fees are charged based on the amount you send. All fees
                  are in RWF. For more information, please contact your
                  provider.
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </ActionSheet>
  );
};
