import * as Clipboard from "expo-clipboard";
import { useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";

export function useCopy(text: string) {
  const [isCopied, setIsCopied] = useState(false);
  const [lastCopiedCode, setLastCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (lastCopiedCode && lastCopiedCode !== text) {
      setIsCopied(false);
    }
  }, [text, lastCopiedCode]);

  const checkClipboard = useCallback(async () => {
    if (!isCopied) return;
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      if (clipboardContent !== lastCopiedCode) {
        setIsCopied(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  }, [isCopied, lastCopiedCode]);

  const handleCopy = useCallback(async () => {
    try {
      await Clipboard.setStringAsync(text);
      setIsCopied(true);
      setLastCopiedCode(text);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      Alert.alert("Error", "Failed to copy short code");
    }
  }, [text]);

  return { isCopied, handleCopy, checkClipboard };
}
