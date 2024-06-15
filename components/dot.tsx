import React from "react";
import { StyleSheet, View } from "react-native";

import { primaryColor } from "@/constants/Colors";

type DotProps = {
  active?: boolean;
};

export default function Dot({ active }: DotProps) {
  return (
    <View
      style={[
        styles.dot,
        {
          opacity: active ? 1 : 0.5,
          width: active ? 13 : 10,
          height: active ? 13 : 10,
        },
      ]}
    ></View>
  );
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 13,
    backgroundColor: primaryColor,
    margin: 5,
  },
});
