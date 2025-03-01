import { useNavigation } from "expo-router";
import { router } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";

import Button from "@/components/button";
import Text from "@/components/text";
import TextInputWithLabel from "@/components/TextInput";
import { primaryColor } from "@/constants/Colors";

const isAndroid = Platform.OS === "android";

export default function SignUp() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");

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
          style={{ color: primaryColor }}
        >
          Login
        </Text>

        <TextInputWithLabel label="Your phone number" />
        <TextInputWithLabel
          isPassword
          label="Your Password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => {
            router.replace("/reset");
          }}
        >
          <Text
            weight="600"
            className="mb-[30px] self-end"
            style={{ color: primaryColor, textDecorationLine: "underline" }}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
      <View className="px-[30px]">
        <TouchableOpacity>
          <Text
            weight="600"
            className="mb-[30px] self-center"
            style={{ color: primaryColor, textDecorationLine: "underline" }}
          >
            No account? Signup
          </Text>
        </TouchableOpacity>
        <Button
          title="Login"
          onPress={() => {
            router.replace("/(tabs)");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
