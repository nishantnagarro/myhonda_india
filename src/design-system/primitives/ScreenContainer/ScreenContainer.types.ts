import { ViewStyle } from "react-native";
import { Edge } from "react-native-safe-area-context";

export interface ScreenContainerProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  edges?: Edge[];
  keyboardAvoiding?: boolean;
  keyboardVerticalOffset?: number;
  scrollable?: boolean;
}
