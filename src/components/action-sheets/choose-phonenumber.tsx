import { FlatList, View } from "react-native";
import { SheetProps } from "react-native-actions-sheet";

import {
  PressableOpacity,
  PressableOpacityProps,
} from "@/components/pressable-opacity";
import Text from "@/components/text";
import { ActionSheetType } from "@/constants/action-sheets";

import { ActionSheet } from "./index";

type ChoosePhoneNumberProps = SheetProps<ActionSheetType.ChoosePhoneNumber>;

type PhoneNumberItemProps = PressableOpacityProps & {
  phoneNumber: string;
};

const PhoneNumberItem = ({ phoneNumber, ...props }: PhoneNumberItemProps) => {
  return (
    <PressableOpacity
      className="flex-row items-center gap-2 min-h-[56px]"
      {...props}
    >
      <Text>{phoneNumber}</Text>
    </PressableOpacity>
  );
};

export const ChoosePhoneNumber = ({ payload }: ChoosePhoneNumberProps) => {
  return (
    <ActionSheet>
      <View className="px-8 py-3">
        <FlatList
          data={payload?.data.phoneNumbers}
          renderItem={({ item }) => (
            <PhoneNumberItem
              phoneNumber={item}
              onPress={() => payload?.data.onSelect(item)}
            />
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => (
            <View className="h-[1px] bg-dark-700/10 dark:bg-dark-200/10" />
          )}
          ListHeaderComponent={() => (
            <View className="flex-row items-center">
              <Text
                weight="700"
                className="text-dark-700 dark:text-dark-200 text-3xl"
              >
                Choose a number
              </Text>
            </View>
          )}
        />
      </View>
    </ActionSheet>
  );
};
