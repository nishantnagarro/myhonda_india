import { z } from "zod";

/**
 * Runtime validation schema for vehicle responses from AWS API Gateway
 */
export const VehicleDTOSchema = z.object({
  id: z.string(),
  model_name: z.string(),
  punchline: z.string(),
  segment: z.enum(["motorcycle", "scooter", "bigbike"]),
  price_inr: z.number().positive(),
  displacement_cc: z.number().positive(),
  fuel_efficiency_kmpl: z.number().positive(),
  power_bhp: z.number().positive(),
  hero_image_url: z.string().url(),
  featured: z.boolean().default(false),
});

export type VehicleDTO = z.infer<typeof VehicleDTOSchema>;
export const VehicleListDTOSchema = z.array(VehicleDTOSchema);
