import React from "react";
import { View } from "react-native";

import { useAppTranslation } from "@/core/i18n/useAppTranslation";
import { AppText, ScreenContainer } from "@/design-system/primitives";

import { styles } from "./profile.styles";

export default function ProfileRoute() {
  const { t, currentLanguage, changeLanguage } = useAppTranslation();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <AppText variant="h2" color="text.primary" style={styles.title}>
          {t("nav.profile")}
        </AppText>
        <AppText
          variant="bodyMedium"
          color="text.secondary"
          style={styles.info}
        >
          {`Language: ${currentLanguage === "en" ? "English" : "हिन्दी"}`}
        </AppText>
        <AppText
          variant="button"
          color="brand.primary"
          onPress={() => changeLanguage(currentLanguage === "en" ? "hi" : "en")}
        >
          {`Switch to ${currentLanguage === "en" ? "हिन्दी" : "English"}`}
        </AppText>
      </View>
    </ScreenContainer>
  );
}
