import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { AppText } from "@/design-system/primitives/AppText";
import { resolveColor } from "@/design-system/tokens/colors";
import { AppButtonProps } from "./AppButton.types";
import { styles } from "./AppButton.styles";

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = "primary",
  isLoading = false,
  disabled = false,
  onPress,
  ...rest
}) => {
  const isActionDisabled = disabled || isLoading;

  const getBackgroundColor = () => {
    if (isActionDisabled) return resolveColor("border.subtle");
    switch (variant) {
      case "primary":
        return resolveColor("brand.primary");
      case "secondary":
        return resolveColor("brand.secondary");
      case "outline":
      case "ghost":
        return resolveColor("neutral.transparent");
    }
  };

  const getBorderColor = () => {
    if (variant === "outline") {
      return isActionDisabled
        ? resolveColor("border.subtle")
        : resolveColor("brand.primary");
    }
    return resolveColor("neutral.transparent");
  };

  const getTextColor = () => {
    if (isActionDisabled) return "text.muted" as const;
    switch (variant) {
      case "primary":
      case "secondary":
        return "text.inverse" as const;
      case "outline":
        return "text.brand" as const;
      case "ghost":
        return "text.primary" as const;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isActionDisabled}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
      ]}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={resolveColor(getTextColor())} />
      ) : (
        <AppText variant="button" color={getTextColor()}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};
