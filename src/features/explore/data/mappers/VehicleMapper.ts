import { VehicleDTO } from "../dto/VehicleDTO";
import { Vehicle } from "../../domain/entities/Vehicle";

/**
 * Pure Functional Vehicle Mapper
 */
export function toVehicleDomain(dto: VehicleDTO): Vehicle {
  return {
    id: dto.id,
    name: dto.model_name,
    tagline: dto.punchline,
    category: dto.segment,
    exShowroomPriceINR: dto.price_inr,
    engineCapacityCC: dto.displacement_cc,
    mileageKMPL: dto.fuel_efficiency_kmpl,
    maxPowerBHP: dto.power_bhp,
    imageUrl: dto.hero_image_url,
    isFeatured: dto.featured,
  };
}

export function toVehicleDomainList(dtos: VehicleDTO[]): Vehicle[] {
  return dtos.map(toVehicleDomain);
}
