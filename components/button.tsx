import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { primaryColor } from "@/constants/Colors";

import Text from "./text";

type ButtonProps = TouchableOpacity["props"] & {
  title: string;
};

export default function Button({ title, style, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text lightColor="white" weight="600">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: primaryColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 24,
    minHeight: 48,
  },
});
