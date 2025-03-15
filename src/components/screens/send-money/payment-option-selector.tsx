import { ArrowRight } from "phosphor-react-native";
import { Bank } from "phosphor-react-native";
import { View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

import Button from "@/components/button";
import Text from "@/components/text";
import { ActionSheetContext } from "@/constants/action-sheets";
import { ActionSheetType } from "@/constants/action-sheets";
import { PAYMENT_OPTIONS } from "@/constants/payments";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PaymentOption } from "@/types/payments";
import { colors } from "@/utils/tailwindcss";

export const PaymentOptionSelector = ({
  value,
  onChange,
}: {
  value: PaymentOption;
  onChange: (value: PaymentOption) => void;
}) => {
  const themeColor = useThemeColor(
    {
      light: colors.dark[700],
      dark: colors.dark[200],
    },
    "text",
  );

  const handleOpenModal = () => {
    SheetManager.show(ActionSheetType.PaymentOption, {
      context: ActionSheetContext.SendMoney,
      payload: {
        value,
        onChange,
        options: PAYMENT_OPTIONS,
      },
    });
  };

  return (
    <View>
      <Text weight="500" className="mb-1 text-lg">
        Sending with
      </Text>
      <View className="border border-dark-700 dark:border-dark-200 rounded-lg px-4 py-2 flex-row items-center gap-2 min-h-[56px]">
        <View className="w-[32px] h-[32px] bg-primary-500/20 dark:bg-primary-500/50 items-center justify-center rounded-full">
          <Bank size={18} color={colors.primary[500]} />
        </View>
        <Text weight="600" className="text-primary-500 dark:text-primary-500">
          {PAYMENT_OPTIONS.find((option) => option.id === value)?.name}
        </Text>
        <Button
          title="Change"
          size="sm"
          className="ml-auto bg-primary-500/10 dark:bg-primary-500/10"
          icon={ArrowRight}
          iconPosition="right"
          textClassName="text-dark-700 dark:text-dark-200"
          iconColor={themeColor}
          onPress={handleOpenModal}
        />
      </View>
    </View>
  );
};
