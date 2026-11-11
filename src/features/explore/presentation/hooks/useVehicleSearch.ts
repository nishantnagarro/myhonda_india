import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { services } from "@/core/services";
import { searchVehicles } from "@/features/explore/domain/usecases/SearchVehiclesUseCase";
import { searchAppScreens } from "@/core/navigation/searchableScreens";
import { Vehicle } from "@/features/explore/domain/entities/Vehicle";

export function useVehicleSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce query for vehicle API/search by 150ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Synchronous, instant 0ms App Screen Search (Spotlight pattern)
  const screens = useMemo(() => {
    return searchAppScreens(debouncedQuery);
  }, [debouncedQuery]);

  // Asynchronous Vehicle Search with caching
  const vehicleQuery = useQuery<Vehicle[], Error>({
    queryKey: ["search", "vehicles", debouncedQuery],
    queryFn: () => searchVehicles(services.exploreRepo, debouncedQuery),
    staleTime: 60 * 1000,
  });

  return {
    query,
    setQuery,
    debouncedQuery,
    screens,
    vehicles: vehicleQuery.data ?? [],
    isLoading: vehicleQuery.isLoading,
    isError: vehicleQuery.isError,
    error: vehicleQuery.error?.message ?? null,
    refetch: vehicleQuery.refetch,
  };
}
