import { Formik } from "formik";
import { ArrowRight, AddressBook } from "phosphor-react-native";
import { useCallback, useState } from "react";
import { Linking, ScrollView, View } from "react-native";
import { Platform } from "react-native";
import { Alert } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { SheetProvider } from "react-native-actions-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/button";
import { CopyButton } from "@/components/copy-button";
import { PaymentOptionSelector } from "@/components/screens/send-money";
import Text from "@/components/text";
import TextInputWithLabel from "@/components/TextInput";
import { ThemedView } from "@/components/ThemedView";
import { ActionSheetContext, ActionSheetType } from "@/constants/action-sheets";
import { Regex } from "@/constants/regex";
import { sendMoneyForm } from "@/forms/send-money";
import { useThemeColor } from "@/hooks/useThemeColor";
import { PaymentOption } from "@/types/payments";
import { PaymentOptionTitle } from "@/types/payments";
import { getContacts } from "@/utils/contacts";
import { getMoMoCharges, getShortCode } from "@/utils/payments";
import { cn, colors } from "@/utils/tailwindcss";

export default function SendMoneyScreen() {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentOption>(PaymentOption.MTN_MOMO);
  const isIOS = Platform.OS === "ios";
  const isAirtelMoney = selectedPaymentOption === PaymentOption.AIRTEL_MONEY;

  const themeColor = useThemeColor(
    {
      light: colors.dark[700],
      dark: colors.dark[200],
    },
    "text",
  );

  const handlePaymentOptionChange = useCallback(
    (value: PaymentOption) => {
      setSelectedPaymentOption(value);
      SheetManager.hide(ActionSheetType.PaymentOption, {
        context: ActionSheetContext.SendMoney,
      });
    },
    [setSelectedPaymentOption],
  );

  const handleFeesStructureChange = useCallback(() => {
    SheetManager.show(ActionSheetType.FeesStructure, {
      context: ActionSheetContext.SendMoney,
      payload: {
        title: isAirtelMoney
          ? PaymentOptionTitle.AIRTEL_MONEY
          : PaymentOptionTitle.MTN_MOMO,
      },
    });
  }, [isAirtelMoney]);

  const handleSubmit = useCallback(
    (values: any) => {
      const shortCode = encodeURIComponent(
        getShortCode({
          phoneNumber: values.phoneNumber,
          amount: values.amount,
          paymentOption: selectedPaymentOption,
        }),
      );
      const url = `tel:${shortCode}`;
      Linking.openURL(url).catch((error) => {
        return Alert.alert(
          "Error",
          "Could not open dialer. Please dial the shortcode manually.",
        );
      });
    },
    [selectedPaymentOption],
  );

  const pickContact = useCallback(
    async (setFieldValue: (field: string, value: any) => void) => {
      getContacts((phoneNumber) => {
        setFieldValue("phoneNumber", phoneNumber);
      });
    },
    [],
  );

  const isAirtelNumber = useCallback((phoneNumber: string) => {
    return phoneNumber.match(new RegExp(Regex.AIRTEL_NUMBER));
  }, []);

  return (
    <SheetProvider context={ActionSheetContext.SendMoney}>
      <ThemedView className="flex-1">
        <Formik
          initialValues={{
            phoneNumber: "",
            amount: 0,
          }}
          validationSchema={sendMoneyForm}
          validateOnMount
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            errors,
            touched,
            setFieldValue,
          }) => {
            const isAirtelToAirtel =
              isAirtelNumber(values.phoneNumber) && isAirtelMoney;
            return (
              <SafeAreaView className="flex-1">
                <ScrollView
                  className={cn("flex-1 px-8", {
                    "pt-16": isIOS,
                  })}
                >
                  <View className="gap-4">
                    <Text
                      weight="700"
                      className="text-primary-500 dark:text-primary-500 text-4xl"
                    >
                      Send Money
                    </Text>
                    <TextInputWithLabel
                      label="Phone number"
                      size="lg"
                      keyboardType="phone-pad"
                      returnKeyType="done"
                      value={values.phoneNumber}
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      error={
                        touched.phoneNumber ? errors.phoneNumber : undefined
                      }
                      rightAdornment={
                        <Button
                          className="ml-auto bg-primary-500/10 dark:bg-primary-500/10"
                          icon={AddressBook}
                          iconPosition="right"
                          textClassName="text-dark-700 dark:text-dark-200"
                          onPress={() => pickContact(setFieldValue)}
                          title="Pick contact"
                          size="sm"
                          iconColor={themeColor}
                        />
                      }
                    />
                    <TextInputWithLabel
                      label="Amount"
                      size="lg"
                      keyboardType="numeric"
                      returnKeyType="done"
                      value={values.amount.toString()}
                      onChangeText={handleChange("amount")}
                      onBlur={handleBlur("amount")}
                      error={touched.amount ? errors.amount : undefined}
                    />
                    <PaymentOptionSelector
                      value={selectedPaymentOption}
                      onChange={handlePaymentOptionChange}
                    />
                    {isValid && (
                      <View className="gap-4 mt-8 bg-dark-100 dark:bg-dark-800 rounded-lg p-4">
                        <View className="flex-row items-center justify-between">
                          <Text
                            weight="600"
                            className={cn("text-sm", {
                              "text-base": isAirtelToAirtel,
                            })}
                          >
                            {isAirtelToAirtel
                              ? "No fees Airtel to Airtel"
                              : "Include fees"}
                          </Text>
                          {!isAirtelToAirtel && (
                            <Button
                              title={`${getMoMoCharges(values.amount)} RWF`}
                              size="sm"
                              className="bg-primary-500/10 dark:bg-primary-500/10"
                              icon={ArrowRight}
                              iconPosition="right"
                              textClassName="text-dark-700 dark:text-dark-200"
                              iconColor={themeColor}
                              onPress={handleFeesStructureChange}
                            />
                          )}
                        </View>
                        <View className="h-[1px] bg-dark-700/10 dark:bg-dark-200/10" />
                        <View className="flex-row items-center gap-1 justify-between">
                          <Text weight="600" className="mb-1 text-sm">
                            USDD Code
                          </Text>
                          <View className="flex-row items-center gap-2">
                            <CopyButton
                              title={getShortCode({
                                phoneNumber: values.phoneNumber,
                                amount: values.amount,
                                paymentOption: selectedPaymentOption,
                              })}
                              size="sm"
                              iconPosition="right"
                              iconSize={20}
                              className="bg-transparent dark:bg-transparent px-0"
                              textClassName="text-dark-700 dark:text-dark-200"
                            />
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </ScrollView>
                <View className="px-8">
                  <Button title="Send" onPress={() => handleSubmit()} />
                </View>
              </SafeAreaView>
            );
          }}
        </Formik>
      </ThemedView>
    </SheetProvider>
  );
}
