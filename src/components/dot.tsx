import React from "react";
import { View } from "react-native";

import { cn } from "@/utils/tailwindcss";

type DotProps = {
  active?: boolean;
};

export default function Dot({ active }: DotProps) {
  return (
    <View
      className={cn("rounded-full bg-primary-500 m-1.5", {
        "opacity-100 w-3.5 h-3.5": active,
        "opacity-50 w-2.5 h-2.5": !active,
      })}
    ></View>
  );
}
