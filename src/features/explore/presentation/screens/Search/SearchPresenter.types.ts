import { ScreenResult } from "@/features/explore/domain/entities/SearchResult";
import { Vehicle } from "@/features/explore/domain/entities/Vehicle";

export interface SearchPresenterProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
  screens: ScreenResult[];
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
  currentLanguage: "en" | "hi";
  emptyMessage: string;
  autoFocus?: boolean;
  onRetry?: () => void;
  onVehiclePress?: (vehicle: Vehicle) => void;
  onScreenPress?: (screen: ScreenResult) => void;
}
