/**
 * Vehicle Domain Entity
 * Pure TypeScript. Zero dependencies on React, UI, or Network libraries.
 */

export type VehicleCategory = "motorcycle" | "scooter" | "bigbike";

export interface Vehicle {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly category: VehicleCategory;
  readonly exShowroomPriceINR: number;
  readonly engineCapacityCC: number;
  readonly mileageKMPL: number;
  readonly maxPowerBHP: number;
  readonly imageUrl: string;
  readonly isFeatured: boolean;
}
