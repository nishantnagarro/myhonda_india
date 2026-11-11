import React from "react";
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "@/design-system/primitives/AppText";
import { AppButton } from "@/design-system/primitives/AppButton";
import { resolveColor } from "@/design-system/tokens/colors";
import { useResponsive } from "@/design-system/tokens/responsive";
import { ScreenContainerProps } from "./ScreenContainer.types";
import { styles } from "./ScreenContainer.styles";

/**
 * ScreenContainer Primitive
 *
 * Guarantees cross-device consistency:
 * 1. Safe Area Insets (Notch, Dynamic Island, Home Indicator) via `edges`.
 * 2. KeyboardAvoidingView on iOS & Android inputs.
 * 3. Responsive tablet constraint (maxWidth: 720dp centered on iPads/Foldables).
 * 4. Tap-handled ScrollView to prevent keyboard tap dismissal blocking.
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  isLoading = false,
  error = null,
  onRetry,
  style,
  contentContainerStyle,
  edges = ["top", "left", "right"],
  keyboardAvoiding = false,
  keyboardVerticalOffset = 0,
  scrollable = false,
}) => {
  const { isTablet } = useResponsive();

  if (isLoading) {
    return (
      <SafeAreaView edges={edges} style={styles.centerContainer}>
        <ActivityIndicator size="large" color={resolveColor("brand.primary")} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView edges={edges} style={styles.centerContainer}>
        <AppText
          variant="h3"
          color="status.error"
          align="center"
          style={styles.errorTitle}
        >
          Something went wrong
        </AppText>
        <AppText
          variant="bodyMedium"
          color="text.secondary"
          align="center"
          style={styles.errorMessage}
        >
          {error}
        </AppText>
        {onRetry && (
          <View style={styles.retryButtonContainer}>
            <AppButton title="Retry" variant="primary" onPress={onRetry} />
          </View>
        )}
      </SafeAreaView>
    );
  }

  const tabletWrapperStyle = isTablet ? styles.tabletConstraint : undefined;

  let body = (
    <View style={[styles.innerContent, tabletWrapperStyle, style]}>
      {children}
    </View>
  );

  if (scrollable) {
    body = (
      <ScrollView
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.innerContent, tabletWrapperStyle, style]}>
          {children}
        </View>
      </ScrollView>
    );
  }

  if (keyboardAvoiding) {
    body = (
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {body}
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView edges={edges} style={styles.container}>
      {body}
    </SafeAreaView>
  );
};
