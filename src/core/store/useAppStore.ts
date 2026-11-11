/**
 * Client-Only Global State (Zustand v5 + Fast MMKV Persistence)
 *
 * Strict Architecture Rule:
 * ONLY ephemeral or persistent client-side UI/user states belong here.
 * Server data (vehicles, bookings) must stay in TanStack Query (no duplicate state).
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { localStorage } from "@/core/storage/localStorage";

// Fast Synchronous MMKV Storage Engine for Zustand
const mmkvZustandStorage = {
  getItem: (name: string): string | null => {
    return localStorage.getString(name) ?? null;
  },
  setItem: (name: string, value: string): void => {
    localStorage.setString(name, value);
  },
  removeItem: (name: string): void => {
    localStorage.delete(name);
  },
};

export interface AppStoreState {
  bookmarkedVehicleIds: string[];
  recentSearchQueries: string[];
  toggleBookmark: (vehicleId: string) => void;
  isBookmarked: (vehicleId: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set, get) => ({
      bookmarkedVehicleIds: [],
      recentSearchQueries: [],

      toggleBookmark: (vehicleId: string) => {
        const current = get().bookmarkedVehicleIds;
        const exists = current.includes(vehicleId);
        set({
          bookmarkedVehicleIds: exists
            ? current.filter((id) => id !== vehicleId)
            : [...current, vehicleId],
        });
      },

      isBookmarked: (vehicleId: string) => {
        return get().bookmarkedVehicleIds.includes(vehicleId);
      },

      addRecentSearch: (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        const current = get().recentSearchQueries.filter(
          (q) => q.toLowerCase() !== trimmed.toLowerCase(),
        );
        set({
          recentSearchQueries: [trimmed, ...current].slice(0, 5), // Keep latest 5
        });
      },

      clearRecentSearches: () => {
        set({ recentSearchQueries: [] });
      },
    }),
    {
      name: "myhonda-client-storage",
      storage: createJSONStorage(() => mmkvZustandStorage),
    },
  ),
);
