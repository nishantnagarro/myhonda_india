import React from "react";
import { View } from "react-native";
import {
  ScreenContainer,
  AppText,
  AppButton,
} from "@/design-system/primitives";
import { useAppTranslation } from "@/core/i18n/useAppTranslation";
import { styles } from "./service.styles";

export default function ServiceRoute() {
  const { t } = useAppTranslation();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <AppText variant="h2" color="text.primary" style={styles.title}>
          {t("nav.service")}
        </AppText>
        <AppText
          variant="bodyMedium"
          color="text.secondary"
          align="center"
          style={styles.subtitle}
        >
          Book genuine Honda service, track progress in real-time, and download
          digital service invoices.
        </AppText>
        <AppButton
          title={t("common.bookService")}
          variant="primary"
          onPress={() => {
            // Service booking journey handler
          }}
        />
      </View>
    </ScreenContainer>
  );
}
