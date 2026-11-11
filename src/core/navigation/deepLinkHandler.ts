/**
 * Pure Functional Deep Link Handler
 *
 * Maps incoming URL schemes (e.g. `myhonda://vehicle/activa-6g`, `myhonda://search?query=cb350`)
 * to type-safe Expo Router destinations.
 */
import * as Linking from "expo-linking";
import { router, type Href } from "expo-router";
import { logger } from "@/core/observability/logger";

export interface ParsedDeepLink {
  path: string;
  queryParams?: Record<string, string | undefined>;
}

export function parseDeepLink(url: string): ParsedDeepLink {
  const parsed = Linking.parse(url);
  return {
    path: parsed.path ?? "",
    queryParams: parsed.queryParams as Record<string, string | undefined>,
  };
}

export function navigateToDeepLink(url: string): void {
  logger.info("Resolving deep link navigation", { url });
  const { path, queryParams } = parseDeepLink(url);

  // Route: myhonda://vehicle/:id
  if (path.startsWith("vehicle/")) {
    const vehicleId = path.replace("vehicle/", "");
    router.push(`/vehicle/${vehicleId}` as Href);
    return;
  }

  // Route: myhonda://search?query=...
  if (path === "search" || path === "(tabs)/search") {
    const query = queryParams?.query ?? "";
    router.push({
      pathname: "/(tabs)/search",
      params: { query },
    });
    return;
  }

  // Default fallback
  router.push("/(tabs)");
}

export function getInitialDeepLink(): Promise<string | null> {
  return Linking.getInitialURL();
}
