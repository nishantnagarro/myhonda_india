import { Dimensions, StyleSheet } from "react-native";

import { resolveColor } from "@/design-system/tokens/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  containerLight: {
    ...StyleSheet.absoluteFill,
    backgroundColor: resolveColor("neutral.white", "light"),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  containerDark: {
    ...StyleSheet.absoluteFill,
    backgroundColor: resolveColor("neutral.black", "dark"),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  image: {
    width,
    height,
  },
});
