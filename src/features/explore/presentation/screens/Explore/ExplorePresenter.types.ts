import { Vehicle } from "@/features/explore/domain/entities/Vehicle";

export interface ExplorePresenterProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
  currentLanguage: "en" | "hi";
  titleText: string;
  subtitleText: string;
  searchPlaceholder: string;
  featuredTitle: string;
  onToggleLanguage: () => void;
  onSearchPress: () => void;
  onVehiclePress?: (vehicle: Vehicle) => void;
  onRetry?: () => void;
}
