import React from "react";
import { View } from "react-native";

type DotProps = {
  active?: boolean;
};

export default function Dot({ active }: DotProps) {
  return (
    <View
      className={`rounded-full bg-primary m-1.5 ${
        active ? "opacity-100 w-3.5 h-3.5" : "opacity-50 w-2.5 h-2.5"
      }`}
    ></View>
  );
}
