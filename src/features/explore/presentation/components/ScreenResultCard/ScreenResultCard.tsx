import React from "react";
import { TouchableOpacity, View } from "react-native";
import { type Href, router } from "expo-router";

import {
  ChevronRight,
  Compass,
  FileText,
  Shield,
  User,
  Wrench,
} from "lucide-react-native";

import { useAppTranslation } from "@/core/i18n/useAppTranslation";
import { AppText } from "@/design-system/primitives/AppText";
import { resolveColor } from "@/design-system/tokens/colors";

import { ScreenResultCardProps } from "./ScreenResultCard.types";

import { styles } from "./ScreenResultCard.styles";

/**
 * Pure Presentational Screen Result Card
 */
export const ScreenResultCard: React.FC<ScreenResultCardProps> = ({
  screen,
  onPress,
}) => {
  const { currentLanguage } = useAppTranslation();

  const handlePress = () => {
    if (onPress) {
      onPress(screen);
    } else {
      router.push(screen.route as Href);
    }
  };

  const title = currentLanguage === "hi" ? screen.titleHi : screen.title;
  const description =
    currentLanguage === "hi" ? screen.descriptionHi : screen.description;

  const renderIcon = () => {
    const iconColor = resolveColor("brand.primary");
    const size = 22;
    switch (screen.icon) {
      case "wrench":
        return <Wrench color={iconColor} size={size} />;
      case "user":
        return <User color={iconColor} size={size} />;
      case "compass":
        return <Compass color={iconColor} size={size} />;
      case "file-text":
        return <FileText color={iconColor} size={size} />;
      case "shield":
        return <Shield color={iconColor} size={size} />;
      default:
        return <Compass color={iconColor} size={size} />;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={styles.card}
    >
      <View style={styles.iconContainer}>{renderIcon()}</View>

      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <AppText variant="h3" color="text.primary" style={styles.title}>
            {title}
          </AppText>
          <View style={styles.badge}>
            <AppText variant="caption" color="brand.primary">
              {screen.category.toUpperCase()}
            </AppText>
          </View>
        </View>

        <AppText variant="bodySmall" color="text.secondary" numberOfLines={2}>
          {description}
        </AppText>
      </View>

      <View style={styles.arrowContainer}>
        <ChevronRight color={resolveColor("text.muted")} size={20} />
      </View>
    </TouchableOpacity>
  );
};
