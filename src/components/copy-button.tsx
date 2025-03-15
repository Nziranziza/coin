import { useFocusEffect } from "expo-router";
import { CheckCircle, CopySimple } from "phosphor-react-native";
import { useCallback } from "react";

import Button, { ButtonProps } from "@/components/button";
import { useCopy } from "@/hooks/useCopy";
import { colors } from "@/utils/tailwindcss";

export function CopyButton(props: ButtonProps) {
  const { isCopied, handleCopy, checkClipboard } = useCopy(props.title);

  useFocusEffect(
    useCallback(() => {
      // Only run the interval when the screen is focused and isCopied is true
      let checkInterval: NodeJS.Timeout | null = null;

      if (isCopied) {
        checkInterval = setInterval(checkClipboard, 2000);
      }

      return () => {
        if (checkInterval) {
          clearInterval(checkInterval);
        }
      };
    }, [checkClipboard, isCopied]),
  );

  return (
    <Button
      {...props}
      onPress={handleCopy}
      onFocus={checkClipboard}
      icon={isCopied ? CheckCircle : CopySimple}
      iconColor={isCopied ? colors.success[500] : colors.primary[500]}
    />
  );
}
