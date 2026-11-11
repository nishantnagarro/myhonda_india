import React, { Component, ErrorInfo } from "react";
import { SafeAreaView, View } from "react-native";

import { AlertTriangle } from "lucide-react-native";

import { crashlyticsService } from "@/core/observability/crashlyticsService";
import { logger } from "@/core/observability/logger";
import { AppButton, AppText } from "@/design-system/primitives";
import { resolveColor } from "@/design-system/tokens/colors";

import {
  AppErrorBoundaryProps,
  AppErrorBoundaryState,
} from "./AppErrorBoundary.types";

import { styles } from "./AppErrorBoundary.styles";

/**
 * Enterprise React Error Boundary
 *
 * Prevents the "White Screen of Death" by catching unhandled render crashes,
 * logging non-fatal breadcrumbs to Crashlytics, and rendering a graceful recovery UI.
 */
export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error(
      `[AppErrorBoundary] Unhandled render crash: ${error.message}`,
      error,
      {
        componentStack: errorInfo.componentStack,
      },
    );

    crashlyticsService.recordError(error, {
      componentStack: errorInfo.componentStack,
    });

    if (this.props.onCatch) {
      this.props.onCatch(error, errorInfo);
    }
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (!hasError || !error) {
      return children;
    }

    if (typeof fallback === "function") {
      return fallback({ error, resetError: this.resetError });
    }

    if (fallback) {
      return fallback;
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.iconWrapper}>
          <AlertTriangle color={resolveColor("brand.primary")} size={32} />
        </View>

        <AppText
          variant="h2"
          color="text.primary"
          align="center"
          style={styles.title}
        >
          Something went wrong
        </AppText>

        <AppText
          variant="bodyMedium"
          color="text.secondary"
          align="center"
          style={styles.message}
        >
          An unexpected error occurred. Our engineering team has been
          automatically notified.
        </AppText>

        {__DEV__ && (
          <View style={styles.devErrorBox}>
            <AppText variant="caption" color="status.error" numberOfLines={3}>
              {error.message}
            </AppText>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <AppButton
            title="Try Again"
            variant="primary"
            onPress={this.resetError}
          />
        </View>
      </SafeAreaView>
    );
  }
}
