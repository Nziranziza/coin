import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import Text from "./text";

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export default function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className="bg-primary flex-row justify-center items-center rounded-full py-[15px] px-6 min-h-[48px]"
      {...props}
    >
      <Text lightColor="white" weight="600">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
