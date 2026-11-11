import React, { useEffect, useState } from "react";

import { useAppTranslation } from "@/core/i18n/useAppTranslation";
import { services } from "@/core/services";
import { Vehicle } from "@/features/explore/domain/entities/Vehicle";

import { VehicleDetailsPresenter } from "./VehicleDetailsPresenter";
import { VehicleDetailsContainerProps } from "./VehicleDetailsPresenter.types";

/**
 * Smart Container for Vehicle Details Feature
 *
 * Fetches vehicle data by ID from pure functional repository, formats values,
 * and renders pure VehicleDetailsPresenter.
 */
export const VehicleDetailsContainer: React.FC<
  VehicleDetailsContainerProps
> = ({ id, onEnquire }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useAppTranslation();

  const fetchVehicle = () => {
    if (!id) {
      setError("Vehicle ID is missing.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    let isMounted = true;
    services.exploreRepo
      .getVehicleById(id)
      .then((result) => {
        if (isMounted) {
          if (result) {
            setVehicle(result);
          } else {
            setError("Vehicle model not found.");
          }
          setIsLoading(false);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err.message || "Failed to load vehicle details.");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    const cleanup = fetchVehicle();
    return () => {
      if (cleanup) cleanup();
    };
  }, [id]);

  const formattedPrice = vehicle
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(vehicle.exShowroomPriceINR)
    : "";

  const handleEnquirePress = () => {
    if (vehicle && onEnquire) {
      onEnquire(vehicle);
    }
  };

  return (
    <VehicleDetailsPresenter
      vehicle={vehicle}
      isLoading={isLoading}
      error={error}
      formattedPrice={formattedPrice}
      engineLabel={t("explore.specs.engine")}
      mileageLabel={t("explore.specs.mileage")}
      powerLabel={t("explore.specs.power")}
      priceLabel={t("common.priceExShowroom")}
      onEnquirePress={handleEnquirePress}
      onRetry={fetchVehicle}
    />
  );
};
