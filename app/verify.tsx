import { useNavigation } from "expo-router";
import { router } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";

import Button from "@/components/button";
import VerificationCodeInput from "@/components/codeInput";
import Text from "@/components/text";
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text weight="700" style={[styles.title, { color: primaryColor }]}>
          Enter Your Phone number
        </Text>
        <View style={styles.codeinput}>
          <Text>A verification code was sent to your phone number</Text>
        </View>
        <VerificationCodeInput numberOfInputs={5} />
      </View>
      <View style={styles.paddingbutton}>
        <TouchableOpacity>
          <Text
            weight="600"
            style={[
              styles.overbuttonText,
              { color: primaryColor, textDecorationLine: "underline" },
            ]}
          >
            Resend Code
          </Text>
        </TouchableOpacity>
        <Button
          title="Verify"
          onPress={() => {
            router.replace("signUp");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isAndroid ? StatusBar.currentHeight : 0,
    paddingBottom: 30,
  },
  content: {
    marginTop: 60,
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    marginBottom: 30,
  },
  codeinput: {
    marginBottom: 30,
  },
  overbuttonText: {
    marginBottom: 30,
    alignSelf: "center",
  },
  paddingbutton: {
    paddingHorizontal: 30,
  },
});
