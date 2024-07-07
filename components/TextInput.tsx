import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import {
  StyleSheet,
  TextInput as DefaulfTextInput,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";

import { textColor } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

import Eye from "./icons/eye";
import Text from "./text";

type TextInputWithLabelProps = TextInputProps & {
  label?: string;
  isPassword?: boolean;
  lightColor?: string;
  darkColor?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  error?: string | boolean;
};

const TextInput = forwardRef<DefaulfTextInput, TextInputWithLabelProps>(
  (
    {
      label,
      style,
      isPassword,
      lightColor,
      darkColor,
      containerStyle,
      labelStyle,
      error,
      ...props
    }: TextInputWithLabelProps,
    ref: ForwardedRef<DefaulfTextInput>,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
    const textInputRef = React.createRef<DefaulfTextInput>();

    useImperativeHandle(ref, () => textInputRef.current!);

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text
            style={[
              styles.label,
              labelStyle,
              error ? styles.colorDanger : null,
            ]}
            weight="500"
          >
            {label}
          </Text>
        )}
        <View style={styles.inputContainer}>
          <DefaulfTextInput
            style={[
              styles.input,
              style,
              error ? [styles.colorDanger, styles.borderDanger] : null,
            ]}
            secureTextEntry={isPassword && !isPasswordVisible}
            placeholderTextColor={color}
            ref={textInputRef}
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
        {Boolean(error) && (
          <Text style={[styles.errorText, styles.colorDanger]}>{error}</Text>
        )}
      </View>
    );
  },
);

export default TextInput;

TextInput.displayName = "TextInput";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
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
  colorDanger: {
    color: "#A8200D",
  },
  borderDanger: {
    borderColor: "#A8200D",
    borderWidth: 2,
  },
  errorText: {
    fontSize: 14,
  },
});
