import { useNavigation } from "expo-router";
import { router } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar,
  View,
} from "react-native";

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text weight="700" style={[styles.title, { color: primaryColor }]}>
          Enter Your Phone number
        </Text>
        <TextInputWithLabel label="Your phone number" />
      </View>
      <View style={styles.paddingbutton}>
        <Button
          title="Next"
          onPress={() => {
            router.replace("verify");
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
  paddingbutton: {
    paddingHorizontal: 30,
  },
});
