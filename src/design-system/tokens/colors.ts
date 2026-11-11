/**
 * MyHonda Design System - Colors
 *
 * STRICT RULE: All colors in the application must reference this file.
 * ESLint 'react-native/no-color-literals' will fail any hardcoded hex/rgb strings.
 */

export const colors = {
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
} as const;

// Flattened recursive union type of dot-notated color keys: e.g. "brand.primary" | "surface.card"
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type ColorToken = NestedKeyOf<typeof colors>;

/**
 * Resolves a dot-notation ColorToken into its hex string at runtime.
 * Guarantees zero type-mismatch and 100% type safety.
 */
export function resolveColor(token: ColorToken): string {
  const parts = token.split(".");
  let current: unknown = colors;
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
