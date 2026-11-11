import { useQuery } from "@tanstack/react-query";
import { services } from "@/core/services";
import { getFeaturedVehicles } from "@/features/explore/domain/usecases/GetFeaturedVehiclesUseCase";
import { Vehicle } from "@/features/explore/domain/entities/Vehicle";

export function useExploreVehicles() {
  return useQuery<Vehicle[], Error>({
    queryKey: ["vehicles", "featured"],
    queryFn: () => getFeaturedVehicles(services.exploreRepo),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000, // 10 minutes memory retention
  });
}
