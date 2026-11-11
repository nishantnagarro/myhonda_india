import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { FlashList } from "@shopify/flash-list";

import { AppInput } from "@/design-system/primitives/AppInput";
import { AppText } from "@/design-system/primitives/AppText";
import { ScreenContainer } from "@/design-system/primitives/ScreenContainer";
import { Vehicle } from "@/features/explore/domain/entities/Vehicle";
import {
  VehicleCard,
  VehicleCardSkeleton,
} from "@/features/explore/presentation/components";

import { ExplorePresenterProps } from "./ExplorePresenter.types";

import { styles } from "./ExplorePresenter.styles";

/**
 * Pure Presenter for the Explore Discovery View
 *
 * - 0 Network calls
 * - 0 Hook side-effects
 * - 100% Declarative & Storybook / Snapshot Test Ready
 */
export const ExplorePresenter: React.FC<ExplorePresenterProps> = ({
  vehicles,
  isLoading,
  error,
  currentLanguage,
  titleText,
  subtitleText,
  searchPlaceholder,
  featuredTitle,
  onToggleLanguage,
  onSearchPress,
  onVehiclePress,
  onRetry,
}) => {
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View>
          <AppText variant="caption" color="brand.primary">
            HONDA 2-WHEELERS INDIA
          </AppText>
          <AppText variant="h1" color="text.primary">
            {titleText}
          </AppText>
        </View>

        {/* Language Switcher Button */}
        <TouchableOpacity
          onPress={onToggleLanguage}
          style={styles.langButton}
          activeOpacity={0.7}
        >
          <AppText variant="caption" color="text.inverse">
            {currentLanguage === "en" ? "हिन्दी" : "English"}
          </AppText>
        </TouchableOpacity>
      </View>

      <AppText
        variant="bodySmall"
        color="text.secondary"
        style={styles.subtitle}
      >
        {subtitleText}
      </AppText>

      {/* Tappable Search Field */}
      <TouchableOpacity activeOpacity={0.9} onPress={onSearchPress}>
        <AppInput
          placeholder={searchPlaceholder}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <AppText variant="h2" color="text.primary" style={styles.sectionTitle}>
        {featuredTitle}
      </AppText>
    </View>
  );

  if (isLoading) {
    return (
      <ScreenContainer error={error} onRetry={onRetry}>
        <View style={styles.listContainer}>
          <ScrollView
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {renderHeader()}
            <VehicleCardSkeleton />
            <VehicleCardSkeleton />
            <VehicleCardSkeleton />
          </ScrollView>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer error={error} onRetry={onRetry}>
      <View style={styles.listContainer}>
        <FlashList<Vehicle>
          data={vehicles}
          renderItem={({ item }) => (
            <VehicleCard vehicle={item} onPress={onVehiclePress} />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenContainer>
  );
};
