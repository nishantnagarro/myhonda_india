import React from "react";
import { Image, useColorScheme, View } from "react-native";

import { splashScreenDark, splashScreenLight } from "../../../../assets/images";

import { styles } from "./SplashScreenView.styles";

export const SplashScreenView: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={isDark ? styles.containerDark : styles.containerLight}>
      <Image
        source={isDark ? splashScreenDark : splashScreenLight}
        style={styles.image}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel="MyHonda Splash Screen"
      />
    </View>
  );
};
