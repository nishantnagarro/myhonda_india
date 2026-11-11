import { Vehicle } from "../entities/Vehicle";
import { IExploreRepository } from "../repositories/IExploreRepository";

/**
 * Pure Functional UseCase: Searches vehicles by query
 */
export async function searchVehicles(
  repository: IExploreRepository,
  query: string,
): Promise<Vehicle[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return repository.getFeaturedVehicles();
  }
  return repository.searchVehicles(trimmed);
}
