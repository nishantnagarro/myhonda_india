import { Vehicle } from "./Vehicle";

export interface ScreenResult {
  readonly id: string;
  readonly title: string;
  readonly titleHi: string;
  readonly description: string;
  readonly descriptionHi: string;
  readonly route: string;
  readonly category: "screen" | "action";
  readonly icon: string;
}

export interface UnifiedSearchResults {
  readonly screens: ScreenResult[];
  readonly vehicles: Vehicle[];
}
