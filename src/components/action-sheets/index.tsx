import DefaultActionSheet, {
  ActionSheetProps as DefaultActionSheetProps,
} from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { colors } from "@/utils/tailwindcss";

type ActionSheetProps = DefaultActionSheetProps & {};

export const ActionSheet = ({ children, ...props }: ActionSheetProps) => {
  const insets = useSafeAreaInsets();
  const backgroundColor =
    useColorScheme() === "dark"
      ? Colors.dark.background
      : Colors.light.background;
  const indicatorColor =
    useColorScheme() === "dark" ? colors.dark[700] : colors.dark[200];
  return (
    <DefaultActionSheet
      gestureEnabled
      useBottomSafeAreaPadding
      enableGesturesInScrollView={false}
      containerStyle={{
        backgroundColor,
      }}
      indicatorStyle={{
        backgroundColor: indicatorColor,
      }}
      safeAreaInsets={insets}
      openAnimationConfig={{
        damping: 80,
        mass: 0.5,
        stiffness: 300,
        restSpeedThreshold: 5,
        restDisplacementThreshold: 5,
      }}
      {...props}
    >
      {children}
    </DefaultActionSheet>
  );
};
