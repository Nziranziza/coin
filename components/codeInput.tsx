import React, { useRef } from "react";
import { StyleSheet, View, Keyboard, useColorScheme } from "react-native";

import { primaryColor } from "@/constants/Colors";

import TextInput from "./TextInput";

type VerificationCodeInputProps = {
  numberOfInputs?: number;
};

export default function VerificationCodeInput({
  numberOfInputs = 4,
}: VerificationCodeInputProps) {
  const [code, setCode] = React.useState(Array(numberOfInputs).fill(""));
  const inputs = useRef<(typeof TextInput | null)[]>([]);
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
    <View style={styles.container}>
      {code.map((value, index) => (
        <TextInput
          key={index}
          value={value}
          style={[styles.input, colorScheme === "dark" && styles.inputDark]}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          ref={(ref) => (inputs.current[index] = ref)}
          containerStyle={{ width: 50 }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  inputDark: {
    color: "#fff",
    borderColor: "#fff",
  },
});
