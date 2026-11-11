import { StyleSheet } from "react-native";
import { resolveColor } from "@/design-system/tokens/colors";
import { spacing } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  searchHeader: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: spacing.sm,
    backgroundColor: resolveColor("surface.card"),
    borderBottomWidth: 1,
    borderBottomColor: resolveColor("border.subtle"),
  },
  title: {
    marginBottom: spacing.xs,
  },
  scrollContent: {
    padding: spacing.base,
    paddingBottom: spacing.xxxl,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    marginBottom: spacing.sm,
  },
  emptyContainer: {
    paddingVertical: spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
  },
});
