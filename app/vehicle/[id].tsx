import React from "react";
import { useLocalSearchParams } from "expo-router";
import { VehicleDetailsContainer } from "@/features/explore";

/**
 * Route: /vehicle/:id
 * Thin route adapter delegating directly to the Feature Container.
 */
export default function VehicleDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <VehicleDetailsContainer id={id} />;
}
