import React from "react";
import { SearchScreen } from "@/features/explore";

/**
 * Thin Route: Search Tab
 * Supports incoming deep links with query parameters: myhonda://search?query=Activa
 */
export default function SearchRoute() {
  return <SearchScreen />;
}
