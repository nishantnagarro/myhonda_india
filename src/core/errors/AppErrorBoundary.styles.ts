import { StyleSheet } from "react-native";

import { resolveColor } from "@/design-system/tokens/colors";
import { radius, spacing } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: resolveColor("surface.background"),
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: resolveColor("surface.subtle"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  message: {
    marginBottom: spacing.xl,
    maxWidth: 320,
  },
  devErrorBox: {
    backgroundColor: resolveColor("surface.card"),
    padding: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: resolveColor("border.subtle"),
    marginBottom: spacing.xl,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 220,
  },
});
