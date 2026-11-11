import { IExploreRepository } from "../repositories/IExploreRepository";
import { Vehicle } from "../entities/Vehicle";

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
