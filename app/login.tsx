import { useNavigation } from "expo-router";
import { router } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  Platform,
  StyleSheet,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text weight="700" style={[styles.title, { color: primaryColor }]}>
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
            router.replace("reset");
          }}
        >
          <Text
            weight="600"
            style={[
              styles.forgot,
              { color: primaryColor, textDecorationLine: "underline" },
            ]}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
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
            No account? Signup
          </Text>
        </TouchableOpacity>
        <Button
          title="Login"
          onPress={() => {
            router.replace("(tabs)");
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
  overbuttonText: {
    marginBottom: 30,
    alignSelf: "center",
  },
  errorInput: {
    borderColor: "#A8200D",
  },
  errorText: {
    fontSize: 14,
    color: "#A8200D",
    alignSelf: "flex-start",
  },
  forgot: {
    marginBottom: 30,
    alignSelf: "flex-end",
  },
  paddingbutton: {
    paddingHorizontal: 30,
  },
});
