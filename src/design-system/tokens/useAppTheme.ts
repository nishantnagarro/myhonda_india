import { useColorScheme } from "react-native";

import {
  ColorPalette,
  ColorScheme,
  ColorToken,
  resolveColor,
  themeColors,
} from "./colors";

export interface AppTheme {
  colorScheme: ColorScheme;
  isDark: boolean;
  colors: ColorPalette;
  getColor: (token: ColorToken) => string;
}

/**
 * Hook to access active color scheme and theme colors based on device settings.
 */
export function useAppTheme(): AppTheme {
  const systemScheme = useColorScheme();
  const colorScheme: ColorScheme = systemScheme === "dark" ? "dark" : "light";
  const isDark = colorScheme === "dark";
  const activeColors = themeColors[colorScheme];

  const getColor = (token: ColorToken): string =>
    resolveColor(token, colorScheme);

  return {
    colorScheme,
    isDark,
    colors: activeColors,
    getColor,
  };
}
