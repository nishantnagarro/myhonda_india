import { StyleSheet } from "react-native";
import { resolveColor } from "@/design-system/tokens/colors";
import { radius } from "@/design-system/tokens/spacing";

export const styles = StyleSheet.create({
  base: {
    backgroundColor: resolveColor("surface.subtle"),
    borderRadius: radius.xs,
  },
});
