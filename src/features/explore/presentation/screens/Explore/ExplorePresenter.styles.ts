import { StyleSheet } from "react-native";
import { resolveColor } from "@/design-system/tokens/colors";
import { spacing, radius } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.xxl,
  },
  header: {
    paddingTop: spacing.base,
    paddingBottom: spacing.md,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  langButton: {
    backgroundColor: resolveColor("brand.primary"),
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  subtitle: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
});
