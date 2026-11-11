/**
 * Explore Feature Public Surface
 * Cleanly exports screens, presenters, components, and domain entities.
 */
export * from "./presentation/screens";
export * from "./presentation/components";

export type { Vehicle, VehicleCategory } from "./domain/entities/Vehicle";
export type {
  ScreenResult,
  UnifiedSearchResults,
} from "./domain/entities/SearchResult";
