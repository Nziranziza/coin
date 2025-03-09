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
import { colors } from "@/utils/tailwindcss";
import { cn } from "@/utils/tailwindcss";

const isAndroid = Platform.OS === "android";

export default function SignUp() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords must match");
    } else {
      setErrorMessage("");
      router.replace("/login");
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 pb-8 ${isAndroid ? "" : "pt-0"}`}
      style={isAndroid ? { paddingTop: StatusBar.currentHeight } : undefined}
    >
      <View className="mt-15 flex-1 flex-col px-8">
        <Text
          weight="700"
          className="text-2xl mb-8"
          style={{ color: colors.primary[500] }}
        >
          Enter account details
        </Text>

        <TextInputWithLabel label="Your phone number" />
        <TextInputWithLabel
          isPassword
          label="Your Password"
          value={password}
          onChangeText={setPassword}
        />
        <TextInputWithLabel
          isPassword
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className={cn({
            "border-[#A8200D]": confirmPassword && password !== confirmPassword,
          })}
        />
        {errorMessage ? (
          <Text className="text-[#A8200D] text-sm self-start">
            {errorMessage}
          </Text>
        ) : null}
      </View>
      <View className="px-8">
        <TouchableOpacity
          onPress={() => {
            router.replace("/login");
          }}
        >
          <Text
            weight="600"
            className="mb-8 self-center underline"
            style={{ color: colors.primary[500] }}
          >
            Have an account? Login
          </Text>
        </TouchableOpacity>
        <Button title="Signup" onPress={handleSignup} />
      </View>
    </SafeAreaView>
  );
}
