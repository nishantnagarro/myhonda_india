import { Vehicle } from "@/features/explore/domain/entities/Vehicle";

export interface VehicleCardProps {
  vehicle: Vehicle;
  onPress?: (vehicle: Vehicle) => void;
}
