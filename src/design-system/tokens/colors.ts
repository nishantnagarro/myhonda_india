/**
 * MyHonda Design System - Colors (Light & Dark Themes)
 *
 * STRICT RULE: All colors in the application must reference this file.
 * ESLint 'react-native/no-color-literals' will fail any hardcoded hex/rgb strings.
 */

export interface ColorPalette {
  brand: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    accent: string;
  };
  surface: {
    background: string;
    card: string;
    modal: string;
    subtle: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    brand: string;
  };
  border: {
    subtle: string;
    default: string;
    focus: string;
  };
  status: {
    success: string;
    successLight: string;
    error: string;
    errorLight: string;
    warning: string;
    warningLight: string;
    info: string;
    infoLight: string;
  };
  neutral: {
    white: string;
    black: string;
    transparent: string;
  };
}

export const lightColors = {
  brand: {
    primary: "#CC0000", // Official Honda Red
    primaryDark: "#990000",
    primaryLight: "#FF3333",
    secondary: "#1A1A1A",
    accent: "#D32F2F",
  },
  surface: {
    background: "#F8F9FA",
    card: "#FFFFFF",
    modal: "#FFFFFF",
    subtle: "#F1F3F5",
  },
  text: {
    primary: "#111827",
    secondary: "#4B5563",
    muted: "#9CA3AF",
    inverse: "#FFFFFF",
    brand: "#CC0000",
  },
  border: {
    subtle: "#E5E7EB",
    default: "#D1D5DB",
    focus: "#CC0000",
  },
  status: {
    success: "#10B981",
    successLight: "#D1FAE5",
    error: "#EF4444",
    errorLight: "#FEE2E2",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    info: "#3B82F6",
    infoLight: "#DBEAFE",
  },
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  },
} as const satisfies ColorPalette;

export const darkColors = {
  brand: {
    primary: "#CC0000", // Official Honda Red
    primaryDark: "#990000",
    primaryLight: "#FF3333",
    secondary: "#F3F4F6",
    accent: "#EF4444",
  },
  surface: {
    background: "#121212",
    card: "#1E1E1E",
    modal: "#242424",
    subtle: "#2A2A2A",
  },
  text: {
    primary: "#F9FAFB",
    secondary: "#D1D5DB",
    muted: "#9CA3AF",
    inverse: "#111827",
    brand: "#FF4D4D",
  },
  border: {
    subtle: "#2E2E2E",
    default: "#3F3F46",
    focus: "#FF4D4D",
  },
  status: {
    success: "#10B981",
    successLight: "#064E3B",
    error: "#EF4444",
    errorLight: "#7F1D1D",
    warning: "#F59E0B",
    warningLight: "#78350F",
    info: "#3B82F6",
    infoLight: "#1E3A8A",
  },
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  },
} as const satisfies ColorPalette;

// Default exported palette maintains backwards compatibility
export const colors = lightColors;

export type ColorScheme = "light" | "dark";

export const themeColors: Record<ColorScheme, ColorPalette> = {
  light: lightColors,
  dark: darkColors,
};

// Flattened recursive union type of dot-notated color keys: e.g. "brand.primary" | "surface.card"
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type ColorToken = NestedKeyOf<typeof lightColors>;

/**
 * Resolves a dot-notation ColorToken into its hex string at runtime.
 * Supports explicit ColorScheme parameter ("light" | "dark"), defaulting to "light".
 * Guarantees zero type-mismatch and 100% type safety.
 */
export function resolveColor(
  token: ColorToken,
  scheme: ColorScheme = "light",
): string {
  const parts = token.split(".");
  const selectedTheme = themeColors[scheme] ?? lightColors;
  let current: unknown = selectedTheme;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      throw new Error(
        `[DesignSystem Error]: Color token "${token}" does not exist in colors.ts`,
      );
    }
  }
  return current as string;
}
