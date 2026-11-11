import { TouchableOpacityProps } from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export interface AppButtonProps extends Omit<TouchableOpacityProps, "style"> {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}
