import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { textColor } from "@/constants/Colors";

import Eye from "./icons/eye";
import Text from "./text";

type TextInputWithLabelProps = TextInput["props"] & {
  label: string;
  isPassword?: boolean;
};

export default function TextInputWithLabel({
  label,
  style,
  isPassword,
  ...props
}: TextInputWithLabelProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === "dark";
  const dynamicTextColor = isDarkMode ? "#fff" : textColor;
  const dynamicLabelStyle = isDarkMode ? styles.labelDark : {};

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, dynamicLabelStyle]}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, style, isDarkMode && styles.inputDark]}
          secureTextEntry={isPassword && !isPasswordVisible}
          placeholderTextColor={dynamicTextColor}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Eye />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
    color: textColor,
  },
  labelDark: {
    color: "#fff",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: textColor,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 13,
    color: "#000",
  },
  inputDark: {
    color: "#fff",
    borderColor: "#fff",
  },
  iconContainer: {
    position: "absolute",
    right: 8,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
