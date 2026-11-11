import { Vehicle } from "@/features/explore/domain/entities/Vehicle";

export interface VehicleDetailsPresenterProps {
  vehicle: Vehicle | null;
  isLoading: boolean;
  error: string | null;
  formattedPrice: string;
  engineLabel: string;
  mileageLabel: string;
  powerLabel: string;
  priceLabel: string;
  onEnquirePress: () => void;
  onRetry?: () => void;
}

export interface VehicleDetailsContainerProps {
  id?: string;
  onEnquire?: (vehicle: Vehicle) => void;
}
