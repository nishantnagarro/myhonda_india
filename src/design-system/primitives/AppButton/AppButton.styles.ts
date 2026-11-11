import { StyleSheet } from "react-native";
import { spacing, radius } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
  },
});
