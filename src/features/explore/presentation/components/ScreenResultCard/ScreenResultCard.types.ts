import { ScreenResult } from "@/features/explore/domain/entities/SearchResult";

export interface ScreenResultCardProps {
  screen: ScreenResult;
  onPress?: (screen: ScreenResult) => void;
}
