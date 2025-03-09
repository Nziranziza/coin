import { View } from "react-native";

import { cn } from "@/utils/tailwindcss";

type ProgressBarProps = {
  progress: number;
  height?: number;
  className?: string;
  containerClassName?: string;
};

export default function ProgressBar({
  progress,
  height = 5,
  className,
  containerClassName,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  return (
    <View
      className={cn(
        "w-full rounded-full overflow-hidden bg-primary-500/50",
        containerClassName,
      )}
      style={{ height }}
    >
      <View
        className={cn("h-full rounded-full bg-primary-500", className)}
        style={{
          width: `${clampedProgress}%`,
        }}
      />
    </View>
  );
}
