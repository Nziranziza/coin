import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import resolveConfig from "tailwindcss/resolveConfig";
import { DefaultColors } from "tailwindcss/types/generated/colors";

import tailwindConfig from "../../tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

type Color = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

type ExtendedColors = DefaultColors & {
  primary: Color;
  danger: Color;
  success: Color;
  secondary: Color;
  dark: Color;
};

const colors = theme.colors as ExtendedColors;

export { colors };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
