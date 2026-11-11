import { StyleSheet } from "react-native";

import { resolveColor } from "@/design-system/tokens/colors";
import { radius, spacing } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: resolveColor("surface.card"),
    borderRadius: radius.md,
    marginBottom: spacing.base,
    borderWidth: 1,
    borderColor: resolveColor("border.subtle"),
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: resolveColor("surface.subtle"),
  },
  content: {
    padding: spacing.base,
  },
  badgeRow: {
    flexDirection: "row",
    marginBottom: spacing.xs,
  },
  badge: {
    backgroundColor: resolveColor("surface.subtle"),
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.xs,
  },
  name: {
    marginBottom: spacing.xxs,
  },
  tagline: {
    marginBottom: spacing.md,
  },
  specsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: resolveColor("border.subtle"),
    marginBottom: spacing.md,
  },
  specItem: {
    alignItems: "center",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
