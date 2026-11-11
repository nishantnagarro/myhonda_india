import { StyleSheet } from "react-native";

import { resolveColor } from "@/design-system/tokens/colors";
import { spacing } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: resolveColor("surface.background"),
  },
  keyboardContainer: {
    flex: 1,
  },
  innerContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  tabletConstraint: {
    maxWidth: 720,
    width: "100%",
    alignSelf: "center",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: resolveColor("surface.background"),
    padding: spacing.xl,
  },
  errorTitle: {
    marginBottom: spacing.sm,
  },
  errorMessage: {
    marginBottom: spacing.lg,
  },
  retryButtonContainer: {
    width: "100%",
    maxWidth: 200,
  },
});
