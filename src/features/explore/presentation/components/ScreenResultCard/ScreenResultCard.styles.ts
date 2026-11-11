import { StyleSheet } from "react-native";
import { resolveColor } from "@/design-system/tokens/colors";
import { spacing, radius } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: resolveColor("surface.card"),
    padding: spacing.base,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: resolveColor("border.subtle"),
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: resolveColor("surface.subtle"),
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xxs,
  },
  title: {
    marginRight: spacing.sm,
  },
  badge: {
    backgroundColor: resolveColor("surface.subtle"),
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radius.xs,
  },
  arrowContainer: {
    marginLeft: spacing.sm,
  },
});
