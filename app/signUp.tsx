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
      router.replace("login");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text weight="700" style={[styles.title, { color: primaryColor }]}>
          Enter account details
        </Text>

        <TextInputWithLabel
          containerStyle={styles.input}
          label="Your phone number"
        />
        <TextInputWithLabel
          isPassword
          label="Your Password"
          value={password}
          onChangeText={setPassword}
          containerStyle={styles.input}
        />
        <TextInputWithLabel
          isPassword
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          containerStyle={styles.input}
          error={errorMessage}
        />
      </View>
      <View style={styles.paddingbutton}>
        <TouchableOpacity
          onPress={() => {
            router.replace("login");
          }}
        >
          <Text
            weight="600"
            style={[
              styles.overbuttonText,
              { color: primaryColor, textDecorationLine: "underline" },
            ]}
          >
            Have an account? Login
          </Text>
        </TouchableOpacity>
        <Button title="Signup" onPress={handleSignup} />
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
  input: {
    marginBottom: 40,
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
  paddingbutton: {
    paddingHorizontal: 30,
  },
});
