import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView, Platform, StyleSheet, StatusBar, View, TouchableOpacity } from "react-native";
import Button from "@/components/button";
import Text from "@/components/text";
import { primaryColor } from "@/constants/Colors";
import { router } from "expo-router";
import TextInputWithLabel from "@/components/TextInput";


const isAndroid = Platform.OS === "android";

export default function singUp() {
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
      router.replace("login")
      
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text weight="700" style={[styles.title, { color: primaryColor }]}>
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
          style={confirmPassword && password !== confirmPassword ? styles.errorInput : null}
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
      <View>
        <TouchableOpacity onPress={()=>{router.replace("login")}}>
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
    paddingHorizontal: 30,
  },
  content: {
    marginTop: 60,
    flex: 1,
    flexDirection: "column",
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

    fontSize:14,
    color: "#A8200D",
    alignSelf: "flex-start",
  },
});
