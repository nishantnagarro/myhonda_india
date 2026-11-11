import { StyleSheet } from "react-native";

import { resolveColor } from "@/design-system/tokens/colors";
import { radius, spacing } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
  },
  heroImage: {
    width: "100%",
    height: 260,
    backgroundColor: resolveColor("surface.subtle"),
  },
  body: {
    padding: spacing.base,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: resolveColor("surface.subtle"),
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.xs,
    marginBottom: spacing.xs,
  },
  title: {
    marginBottom: spacing.xxs,
  },
  tagline: {
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: resolveColor("surface.card"),
    padding: spacing.base,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: resolveColor("border.subtle"),
    marginBottom: spacing.xl,
  },
  cardTitle: {
    marginBottom: spacing.md,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.base,
  },
  ctaButton: {
    flex: 0.6,
  },
});
