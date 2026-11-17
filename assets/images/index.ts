import { ImageSourcePropType } from "react-native";

export const splashScreenDark: ImageSourcePropType = require("./splash-screen-dark.png");
export const splashScreenLight: ImageSourcePropType = require("./splash-screen-light.png");

export const splashImages = {
  dark: splashScreenDark,
  light: splashScreenLight,
} as const;
