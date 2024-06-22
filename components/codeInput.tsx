import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { primaryColor } from "@/constants/Colors";

type VerificationCodeInputProps = {
  numberOfInputs?: number;
  
};

export default function VerificationCodeInput({ numberOfInputs = 4 }: VerificationCodeInputProps) {

  const [code, setCode] = React.useState(Array(numberOfInputs).fill(''));

 

  return (
    <View style={styles.container}>
      {code.map((value, index) => (
        <TextInput
         key={index}
         value={value}
         style={styles.input}
         keyboardType="numeric"
         maxLength={1}
       
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
    width: 50, 
},
});
