import { ScreenResult, UnifiedSearchResults } from "../entities/SearchResult";
import { IExploreRepository } from "../repositories/IExploreRepository";

/**
 * Pure Functional UseCase: Unified Search (Screens + Vehicles)
 */
export async function unifiedSearch(
  repository: IExploreRepository,
  screenSearchProvider: (query: string) => ScreenResult[],
  query: string,
): Promise<UnifiedSearchResults> {
  const trimmed = query.trim();
  if (!trimmed) {
    const featuredVehicles = await repository.getFeaturedVehicles();
    return {
      screens: [],
      vehicles: featuredVehicles,
    };
  }

  // 1. Search App Screens & Actions
  const matchingScreens = screenSearchProvider(trimmed);

  // 2. Search Vehicle Models
  const matchingVehicles = await repository.searchVehicles(trimmed);

  return {
    screens: matchingScreens,
    vehicles: matchingVehicles,
  };
}
