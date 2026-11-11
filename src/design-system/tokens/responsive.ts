/**
 * Responsive Scaling & Device Adaptation Utilities
 *
 * Provides guideline-based scaling for consistent UI across:
 * - Ultra-compact phones (iPhone SE, budget Android ~360dp)
 * - Standard phones (iPhone 15/16, Pixel ~390-412dp)
 * - Pro Max / Plus phones (~430-440dp)
 * - Foldables & Tablets (iPads, Android tablets >= 768dp)
 */
import { useWindowDimensions } from "react-native";

// Standard mobile baseline (iPhone 13/14/15 standard viewport)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export function scaleSize(size: number, windowWidth: number): number {
  return Math.round((windowWidth / BASE_WIDTH) * size);
}

export function verticalScaleSize(size: number, windowHeight: number): number {
  return Math.round((windowHeight / BASE_HEIGHT) * size);
}

export function moderateScaleSize(
  size: number,
  windowWidth: number,
  factor = 0.5,
): number {
  return Math.round(size + (scaleSize(size, windowWidth) - size) * factor);
}

export interface ResponsiveInfo {
  width: number;
  height: number;
  isSmallDevice: boolean; // Width < 375 (iPhone SE, budget 360dp phones)
  isTablet: boolean; // Width >= 768 (iPads, large foldables, tablets)
  isLandscape: boolean;
  scale: (size: number) => number;
  verticalScale: (size: number) => number;
  moderateScale: (size: number, factor?: number) => number;
  maxContentWidth: number; // Constrains content on tablets (prevents awkward stretching)
  numColumns: number; // 1 for phone, 2 for tablet grid
}

/**
 * Reactive responsive layout hook
 */
export function useResponsive(): ResponsiveInfo {
  const { width, height } = useWindowDimensions();

  const isSmallDevice = width < 375;
  const isTablet = width >= 768;
  const isLandscape = width > height;

  return {
    width,
    height,
    isSmallDevice,
    isTablet,
    isLandscape,
    scale: (size: number) => scaleSize(size, width),
    verticalScale: (size: number) => verticalScaleSize(size, height),
    moderateScale: (size: number, factor = 0.5) =>
      moderateScaleSize(size, width, factor),
    maxContentWidth: isTablet ? 720 : width,
    numColumns: isTablet ? 2 : 1,
  };
}
