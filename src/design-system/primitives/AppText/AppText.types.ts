import { TextProps as RNTextProps } from "react-native";

import { ColorToken } from "@/design-system/tokens/colors";
import { TypographyVariant } from "@/design-system/tokens/typography";

export interface AppTextProps extends Omit<RNTextProps, "style"> {
  color?: ColorToken;
  variant?: TypographyVariant;
  align?: "left" | "center" | "right";
  style?: RNTextProps["style"];
  children: React.ReactNode;
  maxFontSizeMultiplier?: number;
}
