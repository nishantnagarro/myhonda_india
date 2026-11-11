import { StyleSheet } from "react-native";

import { resolveColor } from "@/design-system/tokens/colors";
import { radius, spacing } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  label: {
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: radius.md,
    backgroundColor: resolveColor("surface.card"),
    paddingHorizontal: spacing.md,
    height: 48,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: "100%",
    color: resolveColor("text.primary"),
    fontSize: 15,
  },
  errorText: {
    marginTop: spacing.xxs,
  },
});
