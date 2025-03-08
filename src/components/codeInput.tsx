import React, { useRef } from "react";
import { TextInput, View, Keyboard } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";

type VerificationCodeInputProps = {
  numberOfInputs?: number;
};

export default function VerificationCodeInput({
  numberOfInputs = 4,
}: VerificationCodeInputProps) {
  const [code, setCode] = React.useState(Array(numberOfInputs).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);
  const colorScheme = useColorScheme();

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length > 0 && index < numberOfInputs - 1) {
      inputs.current[index + 1]?.focus();
    } else if (index === numberOfInputs - 1) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-between items-center">
      {code.map((value, index) => (
        <TextInput
          key={index}
          value={value}
          className={`w-[50px] border rounded-lg py-2.5 px-4 text-base text-center ${
            colorScheme === "dark"
              ? "text-white border-white"
              : "text-black border-primary"
          }`}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          ref={(ref) => (inputs.current[index] = ref)}
        />
      ))}
    </View>
  );
}
