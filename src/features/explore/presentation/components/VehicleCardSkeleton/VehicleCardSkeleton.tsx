import React from "react";
import { View } from "react-native";
import { Skeleton } from "@/design-system/primitives/Skeleton";
import { styles } from "./VehicleCardSkeleton.styles";

/**
 * Skeleton Placeholder for VehicleCard
 * Replicates the exact layout of the real card to eliminate layout shifts (CLS).
 */
export const VehicleCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      <Skeleton style={styles.imageSkeleton} />

      <View style={styles.content}>
        <Skeleton style={styles.badgeSkeleton} />
        <Skeleton style={styles.titleSkeleton} />
        <Skeleton style={styles.taglineSkeleton} />

        <View style={styles.specsRow}>
          <Skeleton style={styles.specItem} />
          <Skeleton style={styles.specItem} />
          <Skeleton style={styles.specItem} />
        </View>

        <View style={styles.priceRow}>
          <Skeleton style={styles.priceSkeleton} />
          <Skeleton style={styles.buttonSkeleton} />
        </View>
      </View>
    </View>
  );
};
