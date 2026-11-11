import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { type Href, router } from "expo-router";

import { useAppTranslation } from "@/core/i18n/useAppTranslation";
import { AppText } from "@/design-system/primitives/AppText";

import { VehicleCardProps } from "./VehicleCard.types";

import { styles } from "./VehicleCard.styles";

/**
 * Pure Presentational Vehicle Card Component
 */
export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onPress,
}) => {
  const { t } = useAppTranslation();

  const handlePress = () => {
    if (onPress) {
      onPress(vehicle);
    } else {
      router.push(`/vehicle/${vehicle.id}` as Href);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(vehicle.exShowroomPriceINR);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      style={styles.card}
    >
      <Image
        source={{ uri: vehicle.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <AppText variant="caption" color="brand.primary">
              {vehicle.category.toUpperCase()}
            </AppText>
          </View>
        </View>

        <AppText variant="h3" color="text.primary" style={styles.name}>
          {vehicle.name}
        </AppText>
        <AppText
          variant="bodySmall"
          color="text.secondary"
          numberOfLines={1}
          style={styles.tagline}
        >
          {vehicle.tagline}
        </AppText>

        <View style={styles.specsRow}>
          <View style={styles.specItem}>
            <AppText variant="caption" color="text.muted">
              {t("explore.specs.engine")}
            </AppText>
            <AppText variant="bodySmall" color="text.primary">
              {`${vehicle.engineCapacityCC} cc`}
            </AppText>
          </View>
          <View style={styles.specItem}>
            <AppText variant="caption" color="text.muted">
              {t("explore.specs.mileage")}
            </AppText>
            <AppText variant="bodySmall" color="text.primary">
              {`${vehicle.mileageKMPL} kmpl`}
            </AppText>
          </View>
          <View style={styles.specItem}>
            <AppText variant="caption" color="text.muted">
              {t("explore.specs.power")}
            </AppText>
            <AppText variant="bodySmall" color="text.primary">
              {`${vehicle.maxPowerBHP} bhp`}
            </AppText>
          </View>
        </View>

        <View style={styles.priceRow}>
          <View>
            <AppText variant="caption" color="text.muted">
              {t("common.priceExShowroom")}
            </AppText>
            <AppText variant="h3" color="brand.primary">
              {formattedPrice}
            </AppText>
          </View>
          <AppText variant="button" color="brand.primary">
            {t("common.viewDetails")}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
