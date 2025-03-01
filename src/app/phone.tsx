import { useNavigation } from "expo-router";
import { router } from "expo-router";
import React, { useLayoutEffect } from "react";
import { SafeAreaView, Platform, StatusBar, View } from "react-native";

import Button from "@/components/button";
import Text from "@/components/text";
import TextInputWithLabel from "@/components/TextInput";
import { primaryColor } from "@/constants/Colors";

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
      <View className="flex-1 flex-col px-[30px] mt-[60px]">
        <Text
          weight="700"
          className="text-[26px] mb-[30px]"
          style={{ color: primaryColor }}
        >
          Enter Your Phone number
        </Text>
        <TextInputWithLabel label="Your phone number" />
      </View>
      <View className="px-[30px]">
        <Button
          title="Next"
          onPress={() => {
            router.replace("/verify");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
