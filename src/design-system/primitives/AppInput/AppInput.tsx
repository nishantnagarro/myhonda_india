import React from "react";
import { View, TextInput } from "react-native";
import { AppText } from "@/design-system/primitives/AppText";
import { resolveColor } from "@/design-system/tokens/colors";
import { AppInputProps } from "./AppInput.types";
import { styles } from "./AppInput.styles";

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  leftIcon,
  style,
  ...rest
}) => {
  const borderColor = error
    ? resolveColor("status.error")
    : resolveColor("border.default");

  return (
    <View style={styles.container}>
      {label && (
        <AppText
          variant="bodySmall"
          color="text.secondary"
          style={styles.label}
        >
          {label}
        </AppText>
      )}
      <View style={[styles.inputWrapper, { borderColor }]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          placeholderTextColor={resolveColor("text.muted")}
          style={[styles.input, style]}
          {...rest}
        />
      </View>
      {error && (
        <AppText
          variant="caption"
          color="status.error"
          style={styles.errorText}
        >
          {error}
        </AppText>
      )}
    </View>
  );
};
