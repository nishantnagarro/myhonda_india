import { Vehicle } from "../entities/Vehicle";
import { IExploreRepository } from "../repositories/IExploreRepository";

/**
 * Pure Functional UseCase: Retrieves & sorts featured vehicles
 */
export async function getFeaturedVehicles(
  repository: IExploreRepository,
): Promise<Vehicle[]> {
  const vehicles = await repository.getFeaturedVehicles();
  return [...vehicles].sort(
    (a, b) => b.exShowroomPriceINR - a.exShowroomPriceINR,
  );
}
