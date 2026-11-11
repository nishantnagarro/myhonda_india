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
  imageSkeleton: {
    height: 180,
    width: "100%",
  },
  content: {
    padding: spacing.base,
  },
  badgeSkeleton: {
    width: 90,
    height: 20,
    marginBottom: spacing.sm,
  },
  titleSkeleton: {
    width: "65%",
    height: 24,
    marginBottom: spacing.xs,
  },
  taglineSkeleton: {
    width: "85%",
    height: 14,
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
    width: 70,
    height: 32,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceSkeleton: {
    width: 120,
    height: 28,
  },
  buttonSkeleton: {
    width: 100,
    height: 20,
  },
});
