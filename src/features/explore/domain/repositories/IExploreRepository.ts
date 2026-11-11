import { Vehicle } from "../entities/Vehicle";

/**
 * Explore Repository Interface (SOLID: Dependency Inversion & Interface Segregation)
 * Domain defines the contract; Data layer implements it.
 */
export interface IExploreRepository {
  getFeaturedVehicles(): Promise<Vehicle[]>;
  getAllVehicles(): Promise<Vehicle[]>;
  searchVehicles(query: string): Promise<Vehicle[]>;
  getVehicleById(id: string): Promise<Vehicle | null>;
}
