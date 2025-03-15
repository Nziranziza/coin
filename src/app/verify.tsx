import { useNavigation } from "expo-router";
import { router } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";

import Button from "@/components/button";
import VerificationCodeInput from "@/components/codeInput";
import Text from "@/components/text";
import { colors } from "@/utils/tailwindcss";

const isAndroid = Platform.OS === "android";

export default function Login() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      className={`flex-1 pb-[30px] ${isAndroid ? "" : "pt-0"}`}
      style={isAndroid ? { paddingTop: StatusBar.currentHeight } : undefined}
    >
      <View className="mt-[60px] flex-1 flex-col px-[30px]">
        <Text
          weight="700"
          className="text-[26px] mb-[30px]"
          style={{ color: colors.primary[500] }}
        >
          Enter Your Phone number
        </Text>
        <View className="mb-[30px]">
          <Text>A verification code was sent to your phone number</Text>
        </View>
        <VerificationCodeInput numberOfInputs={5} />
      </View>
      <View className="px-[30px]">
        <TouchableOpacity>
          <Text
            weight="600"
            className="mb-[30px] self-center underline"
            style={{ color: colors.primary[500] }}
          >
            Resend Code
          </Text>
        </TouchableOpacity>
        <Button
          title="Verify"
          onPress={() => {
            router.replace("/signUp");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
