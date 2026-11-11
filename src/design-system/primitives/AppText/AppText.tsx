import React from "react";
import { Text as RNText } from "react-native";
import { resolveColor } from "@/design-system/tokens/colors";
import { typography } from "@/design-system/tokens/typography";
import { AppTextProps } from "./AppText.types";

/**
 * AppText Primitive
 * Enforces Design System typography variants, ColorToken types, and safe accessibility bounds.
 * Hardcoded colors cannot be passed without TypeScript compiler rejection.
 */
export const AppText: React.FC<AppTextProps> = ({
  color = "text.primary",
  variant = "bodyMedium",
  align = "left",
  maxFontSizeMultiplier = 1.35,
  style,
  children,
  ...rest
}) => {
  const resolvedColor = resolveColor(color);
  const variantStyle = typography[variant];

  return (
    <RNText
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[variantStyle, { color: resolvedColor, textAlign: align }, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
};
