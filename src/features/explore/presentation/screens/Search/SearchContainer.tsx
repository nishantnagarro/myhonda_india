import React, { useEffect } from "react";
import { useLocalSearchParams, router, type Href } from "expo-router";
import { useVehicleSearch } from "@/features/explore/presentation/hooks/useVehicleSearch";
import { useAppTranslation } from "@/core/i18n/useAppTranslation";
import { useAppStore } from "@/core/store/useAppStore";
import { SearchPresenter } from "./SearchPresenter";
import { Vehicle } from "@/features/explore/domain/entities/Vehicle";
import { ScreenResult } from "@/features/explore/domain/entities/SearchResult";

/**
 * Smart Container for Search Feature
 *
 * Orchestrates search hooks, deep link parameters, recent search store, and navigation.
 * Renders pure SearchPresenter.
 */
export const SearchContainer: React.FC = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const initialQuery = params.query ?? "";

  const {
    query,
    setQuery,
    screens,
    vehicles,
    isLoading,
    isError,
    error,
    refetch,
  } = useVehicleSearch(initialQuery);

  const { t, currentLanguage } = useAppTranslation();
  const addRecentSearch = useAppStore((s) => s.addRecentSearch);

  // Sync incoming route params (e.g. from deep links)
  useEffect(() => {
    if (params.query && params.query !== query) {
      setQuery(params.query);
    }
  }, [params.query, query, setQuery]);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (text.trim().length >= 3) {
      addRecentSearch(text.trim());
    }
  };

  const handleVehiclePress = (vehicle: Vehicle) => {
    router.push(`/vehicle/${vehicle.id}` as Href);
  };

  const handleScreenPress = (screen: ScreenResult) => {
    router.push(screen.route as Href);
  };

  const placeholder =
    currentLanguage === "hi"
      ? "स्क्रीन, सर्विस या वाहन खोजें (जैसे Service, Activa)"
      : "Search screens, service or models (e.g. Service, Activa)";

  return (
    <SearchPresenter
      query={query}
      onQueryChange={handleQueryChange}
      placeholder={placeholder}
      screens={screens}
      vehicles={vehicles}
      isLoading={isLoading}
      error={isError ? (error ?? t("common.error")) : null}
      currentLanguage={currentLanguage}
      emptyMessage={t("explore.emptySearchResults")}
      autoFocus={!initialQuery}
      onRetry={refetch}
      onVehiclePress={handleVehiclePress}
      onScreenPress={handleScreenPress}
    />
  );
};
