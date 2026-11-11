/**
 * Explore Feature Public Surface
 * Cleanly exports screens, presenters, components, and domain entities.
 */
export type {
  ScreenResult,
  UnifiedSearchResults,
} from "./domain/entities/SearchResult";
export type { Vehicle, VehicleCategory } from "./domain/entities/Vehicle";
export * from "./presentation/components";
export * from "./presentation/screens";
