import React from "react";
import { type Href, router } from "expo-router";

import { useAppTranslation } from "@/core/i18n/useAppTranslation";
import { Vehicle } from "@/features/explore/domain/entities/Vehicle";
import { useExploreVehicles } from "@/features/explore/presentation/hooks/useExploreVehicles";

import { ExplorePresenter } from "./ExplorePresenter";

/**
 * Smart Container for Explore Feature
 *
 * Orchestrates hooks, state, navigation, and translations.
 * Renders pure ExplorePresenter.
 */
export const ExploreContainer: React.FC = () => {
  const {
    data: vehicles,
    isLoading,
    isError,
    error,
    refetch,
  } = useExploreVehicles();
  const { t, currentLanguage, changeLanguage } = useAppTranslation();

  const handleToggleLanguage = () => {
    const nextLang = currentLanguage === "en" ? "hi" : "en";
    void changeLanguage(nextLang);
  };

  const handleSearchPress = () => {
    router.push("/(tabs)/search");
  };

  const handleVehiclePress = (vehicle: Vehicle) => {
    router.push(`/vehicle/${vehicle.id}` as Href);
  };

  return (
    <ExplorePresenter
      vehicles={vehicles ?? []}
      isLoading={isLoading}
      error={isError ? (error?.message ?? t("common.error")) : null}
      currentLanguage={currentLanguage}
      titleText={t("explore.title")}
      subtitleText={t("explore.subtitle")}
      searchPlaceholder={t("explore.searchPlaceholder")}
      featuredTitle={t("explore.featuredModels")}
      onToggleLanguage={handleToggleLanguage}
      onSearchPress={handleSearchPress}
      onVehiclePress={handleVehiclePress}
      onRetry={refetch}
    />
  );
};
