/**
 * MyHonda Design System - Typography Tokens
 */
import { TextStyle } from "react-native";

export const typography = {
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
  } as TextStyle,
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
  } as TextStyle,
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  } as TextStyle,
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  } as TextStyle,
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  } as TextStyle,
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  } as TextStyle,
  button: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  } as TextStyle,
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "500",
  } as TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
