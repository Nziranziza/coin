import React, { useState } from "react";
import {
  Pressable,
  PressableProps,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type PressableOpacityProps = PressableProps & {
  style?: StyleProp<ViewStyle>;
};

export const PressableOpacity = ({
  children,
  style,
  hitSlop = { top: 10, bottom: 10, left: 4, right: 4 },
  ...props
}: PressableOpacityProps) => {
  const [opacity] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  return (
    <AnimatedPressable
      hitSlop={hitSlop}
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[{ opacity }, style]}
    >
      {children}
    </AnimatedPressable>
  );
};
