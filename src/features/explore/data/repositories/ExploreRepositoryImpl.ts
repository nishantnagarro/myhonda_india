import { IHttpClient } from "@/core/network/httpClient";
import { logger } from "@/core/observability/logger";
import { Vehicle } from "@/features/explore/domain/entities/Vehicle";
import { IExploreRepository } from "@/features/explore/domain/repositories/IExploreRepository";

import {
  VehicleDTO,
  VehicleDTOSchema,
  VehicleListDTOSchema,
} from "../dto/VehicleDTO";
import { toVehicleDomain, toVehicleDomainList } from "../mappers/VehicleMapper";

// Mock datasets for offline / local prototype before AWS Gateway is connected
const MOCK_VEHICLES_DTO: VehicleDTO[] = [
  {
    id: "activa-6g",
    model_name: "Honda Activa 6G",
    punchline: "The undisputed king of Indian scooters",
    segment: "scooter",
    price_inr: 76234,
    displacement_cc: 109.51,
    fuel_efficiency_kmpl: 60.0,
    power_bhp: 7.79,
    hero_image_url:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    id: "hness-cb350",
    model_name: "Honda Hness CB350",
    punchline: "Your Highness on the highway",
    segment: "motorcycle",
    price_inr: 209857,
    displacement_cc: 348.36,
    fuel_efficiency_kmpl: 35.0,
    power_bhp: 20.78,
    hero_image_url:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    id: "shine-125",
    model_name: "Honda Shine 125",
    punchline: "India’s favorite 125cc commuter motorcycle",
    segment: "motorcycle",
    price_inr: 79800,
    displacement_cc: 123.94,
    fuel_efficiency_kmpl: 65.0,
    power_bhp: 10.59,
    hero_image_url:
      "https://images.unsplash.com/photo-1558980664-3a031cf67ea8?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    id: "hornet-2-0",
    model_name: "Honda Hornet 2.0",
    punchline: "Fly against the wind with streetfighter aggression",
    segment: "motorcycle",
    price_inr: 139000,
    displacement_cc: 184.4,
    fuel_efficiency_kmpl: 45.0,
    power_bhp: 17.03,
    hero_image_url:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
    featured: false,
  },
  {
    id: "dio-125",
    model_name: "Honda Dio 125",
    punchline: "Sporty edge with Smart Key technology",
    segment: "scooter",
    price_inr: 83400,
    displacement_cc: 123.92,
    fuel_efficiency_kmpl: 55.0,
    power_bhp: 8.16,
    hero_image_url:
      "https://images.unsplash.com/photo-1558980664-10e7170b5df9?auto=format&fit=crop&w=600&q=80",
    featured: false,
  },
];

/**
 * Pure Functional Explore Repository Factory (Closure Pattern)
 */
export function createExploreRepository(
  httpClient: IHttpClient,
): IExploreRepository {
  return {
    async getFeaturedVehicles(): Promise<Vehicle[]> {
      try {
        const response = await httpClient.get<unknown>(
          "/v1/vehicles/featured",
          { timeoutMs: 2000 },
        );
        const validated = VehicleListDTOSchema.parse(response);
        return toVehicleDomainList(validated);
      } catch {
        logger.info("Using local mock data for featured vehicles");
        const featured = MOCK_VEHICLES_DTO.filter((v) => v.featured);
        return toVehicleDomainList(featured);
      }
    },

    async getAllVehicles(): Promise<Vehicle[]> {
      try {
        const response = await httpClient.get<unknown>("/v1/vehicles", {
          timeoutMs: 2000,
        });
        const validated = VehicleListDTOSchema.parse(response);
        return toVehicleDomainList(validated);
      } catch {
        logger.info("Using local mock data for all vehicles");
        return toVehicleDomainList(MOCK_VEHICLES_DTO);
      }
    },

    async searchVehicles(query: string): Promise<Vehicle[]> {
      const lower = query.toLowerCase();
      const matched = MOCK_VEHICLES_DTO.filter(
        (v) =>
          v.model_name.toLowerCase().includes(lower) ||
          v.segment.toLowerCase().includes(lower) ||
          v.punchline.toLowerCase().includes(lower),
      );

      return toVehicleDomainList(matched);
    },

    async getVehicleById(id: string): Promise<Vehicle | null> {
      try {
        const response = await httpClient.get<unknown>(`/v1/vehicles/${id}`, {
          timeoutMs: 2000,
        });
        const validated = VehicleDTOSchema.parse(response);
        return toVehicleDomain(validated);
      } catch {
        logger.info("Using local mock vehicle by id", { id });
        const found = MOCK_VEHICLES_DTO.find((v) => v.id === id);
        return found ? toVehicleDomain(found) : null;
      }
    },
  };
}
