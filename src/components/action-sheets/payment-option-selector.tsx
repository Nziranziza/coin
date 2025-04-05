import { Bank, Check } from "phosphor-react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import { SheetProps } from "react-native-actions-sheet";

import {
  PressableOpacity,
  PressableOpacityProps,
} from "@/components/pressable-opacity";
import Text from "@/components/text";
import { ActionSheetType } from "@/constants/action-sheets";
import { PaymentOption } from "@/types/payments";
import { colors } from "@/utils/tailwindcss";

import { ActionSheet } from "./index";

type PaymentOptionItemProps = PressableOpacityProps & {
  name: string;
  selected: boolean;
};

const PaymentOptionItem = ({
  name,
  selected,
  ...props
}: PaymentOptionItemProps) => {
  return (
    <PressableOpacity
      className="flex-row items-center gap-2 py-4 min-h-[54px] justify-between"
      hitSlop={{
        top: 0,
        bottom: 0,
        left: 32,
        right: 32,
      }}
      disabled={selected}
      {...props}
    >
      <View className="flex-row items-center gap-2">
        <View className="w-[32px] h-[32px] bg-primary-500/20 dark:bg-primary-500/50 items-center justify-center rounded-full">
          <Bank size={18} color={colors.primary[500]} />
        </View>
        <Text weight="600" className="text-dark-700 dark:text-dark-200">
          {name}
        </Text>
      </View>
      {selected && (
        <View className="bg-primary-500/20 rounded-full p-2 w-6 h-6 items-center justify-center">
          <Check weight="bold" size={14} color={colors.primary[500]} />
        </View>
      )}
    </PressableOpacity>
  );
};

type PaymentOptionSelectorProps = SheetProps<ActionSheetType.PaymentOption>;

export const PaymentOptionSelector = ({
  payload,
}: PaymentOptionSelectorProps) => {
  return (
    <ActionSheet>
      <View className="px-8 mb-16">
        <FlatList
          data={payload?.options ?? []}
          renderItem={({ item }) => (
            <PaymentOptionItem
              name={item.name}
              selected={item.id === payload?.value}
              onPress={() => {
                payload?.onChange(item.id as PaymentOption);
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-dark-700/10 dark:bg-dark-200/10" />
          )}
          scrollEnabled={false}
          ListHeaderComponent={() => (
            <View className="flex-row items-center gap-2 pt-4 pb-2">
              <Text
                weight="700"
                className="text-dark-700 dark:text-dark-200 text-3xl"
              >
                Send with
              </Text>
            </View>
          )}
        />
      </View>
    </ActionSheet>
  );
};
