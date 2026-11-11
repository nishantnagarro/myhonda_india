import React from "react";
import { Image, ScrollView, View } from "react-native";

import { AppButton } from "@/design-system/primitives/AppButton";
import { AppText } from "@/design-system/primitives/AppText";
import { ScreenContainer } from "@/design-system/primitives/ScreenContainer";

import { VehicleDetailsPresenterProps } from "./VehicleDetailsPresenter.types";

import { styles } from "./VehicleDetailsPresenter.styles";

/**
 * Pure Presenter for the Vehicle Details View
 *
 * - 0 Network calls
 * - 0 Hook side-effects
 * - 100% Storybook and Visual Snapshot Test Ready
 */
export const VehicleDetailsPresenter: React.FC<
  VehicleDetailsPresenterProps
> = ({
  vehicle,
  isLoading,
  error,
  formattedPrice,
  engineLabel,
  mileageLabel,
  powerLabel,
  priceLabel,
  onEnquirePress,
  onRetry,
}) => {
  return (
    <ScreenContainer
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      edges={["top", "bottom", "left", "right"]}
    >
      {vehicle && (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{ uri: vehicle.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <View style={styles.body}>
            <View style={styles.badge}>
              <AppText variant="caption" color="brand.primary">
                {vehicle.category.toUpperCase()}
              </AppText>
            </View>

            <AppText variant="h1" color="text.primary" style={styles.title}>
              {vehicle.name}
            </AppText>

            <AppText
              variant="bodyLarge"
              color="text.secondary"
              style={styles.tagline}
            >
              {vehicle.tagline}
            </AppText>

            <View style={styles.card}>
              <AppText
                variant="h3"
                color="text.primary"
                style={styles.cardTitle}
              >
                Key Specifications
              </AppText>

              <View style={styles.specRow}>
                <AppText variant="bodyMedium" color="text.secondary">
                  {engineLabel}
                </AppText>
                <AppText variant="bodyMedium" color="text.primary">
                  {`${vehicle.engineCapacityCC} cc`}
                </AppText>
              </View>

              <View style={styles.specRow}>
                <AppText variant="bodyMedium" color="text.secondary">
                  {mileageLabel}
                </AppText>
                <AppText variant="bodyMedium" color="text.primary">
                  {`${vehicle.mileageKMPL} kmpl`}
                </AppText>
              </View>

              <View style={styles.specRow}>
                <AppText variant="bodyMedium" color="text.secondary">
                  {powerLabel}
                </AppText>
                <AppText variant="bodyMedium" color="text.primary">
                  {`${vehicle.maxPowerBHP} bhp`}
                </AppText>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <View>
                <AppText variant="caption" color="text.muted">
                  {priceLabel}
                </AppText>
                <AppText variant="h1" color="brand.primary">
                  {formattedPrice}
                </AppText>
              </View>

              <View style={styles.ctaButton}>
                <AppButton
                  title="Enquire Now"
                  variant="primary"
                  onPress={onEnquirePress}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </ScreenContainer>
  );
};
