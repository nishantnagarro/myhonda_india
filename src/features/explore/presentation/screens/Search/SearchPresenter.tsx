import React from "react";
import { ScrollView, View } from "react-native";

import { AppInput } from "@/design-system/primitives/AppInput";
import { AppText } from "@/design-system/primitives/AppText";
import { ScreenContainer } from "@/design-system/primitives/ScreenContainer";
import {
  ScreenResultCard,
  VehicleCard,
} from "@/features/explore/presentation/components";

import { SearchPresenterProps } from "./SearchPresenter.types";

import { styles } from "./SearchPresenter.styles";

/**
 * Pure Presenter for the Search Screen
 *
 * - 0 Network calls
 * - 0 Hooks or Route dependencies
 * - Purely declarative rendering
 */
export const SearchPresenter: React.FC<SearchPresenterProps> = ({
  query,
  onQueryChange,
  placeholder,
  screens,
  vehicles,
  isLoading,
  error,
  currentLanguage,
  emptyMessage,
  autoFocus = false,
  onRetry,
  onVehiclePress,
  onScreenPress,
}) => {
  const hasScreens = screens.length > 0;
  const hasVehicles = vehicles.length > 0;
  const isEmpty =
    !isLoading && !hasScreens && !hasVehicles && query.trim().length > 0;

  return (
    <ScreenContainer keyboardAvoiding={true} error={error} onRetry={onRetry}>
      <View style={styles.container}>
        <View style={styles.searchHeader}>
          <AppText variant="h2" color="text.primary" style={styles.title}>
            {currentLanguage === "hi" ? "खोजें" : "Search"}
          </AppText>
          <AppInput
            value={query}
            onChangeText={onQueryChange}
            placeholder={placeholder}
            autoFocus={autoFocus}
            clearButtonMode="while-editing"
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* SECTION 1: MATCHING APP SCREENS & ACTIONS */}
          {hasScreens && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AppText variant="caption" color="brand.primary">
                  {currentLanguage === "hi"
                    ? "ऐप स्क्रीन और फीचर्स"
                    : "APP SCREENS & FEATURES"}
                </AppText>
              </View>
              {screens.map((item) => (
                <ScreenResultCard
                  key={item.id}
                  screen={item}
                  onPress={onScreenPress}
                />
              ))}
            </View>
          )}

          {/* SECTION 2: MATCHING VEHICLES */}
          {hasVehicles && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AppText variant="caption" color="brand.primary">
                  {currentLanguage === "hi" ? "वाहन मॉडल्स" : "VEHICLE MODELS"}
                </AppText>
              </View>
              {vehicles.map((item) => (
                <VehicleCard
                  key={item.id}
                  vehicle={item}
                  onPress={onVehiclePress}
                />
              ))}
            </View>
          )}

          {/* EMPTY STATE */}
          {isEmpty && (
            <View style={styles.emptyContainer}>
              <AppText variant="bodyMedium" color="text.muted" align="center">
                {emptyMessage}
              </AppText>
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};
