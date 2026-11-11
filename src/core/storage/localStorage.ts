/**
 * Fast Key-Value Local Storage
 *
 * In Custom Dev Builds / Release builds: Backed by high-speed MMKV C++ engine.
 * In generic Expo Go: Gracefully falls back to memory storage to prevent native TurboModule crashes.
 */
import { logger } from "@/core/observability/logger";

export interface ILocalStorage {
  getString(key: string): string | undefined;
  setString(key: string, value: string): void;
  getBoolean(key: string): boolean | undefined;
  setBoolean(key: string, value: boolean): void;
  delete(key: string): void;
  clearAll(): void;
}

function createFallbackStorage(): ILocalStorage {
  const memoryMap = new Map<string, string>();

  return {
    getString(key: string): string | undefined {
      return memoryMap.get(key);
    },

    setString(key: string, value: string): void {
      memoryMap.set(key, value);
    },

    getBoolean(key: string): boolean | undefined {
      const val = memoryMap.get(key);
      return val !== undefined ? val === "true" : undefined;
    },

    setBoolean(key: string, value: boolean): void {
      memoryMap.set(key, String(value));
    },

    delete(key: string): void {
      memoryMap.delete(key);
    },

    clearAll(): void {
      memoryMap.clear();
    },
  };
}

function initializeLocalStorage(): ILocalStorage {
  try {
    const { createMMKV } = require("react-native-mmkv");
    const storage = createMMKV({
      id: "myhonda-app-storage",
      encryptionKey: "myhonda-secure-key-2026",
    });

    return {
      getString: (key: string) => storage.getString(key),
      setString: (key: string, value: string) => storage.set(key, value),
      getBoolean: (key: string) => storage.getBoolean(key),
      setBoolean: (key: string, value: boolean) => storage.set(key, value),
      delete: (key: string) => storage.remove(key),
      clearAll: () => storage.clearAll(),
    };
  } catch {
    logger.warn(
      "[Storage] Native MMKV/NitroModules not available in Expo Go. Using fallback storage.",
    );
    return createFallbackStorage();
  }
}

export const localStorage: ILocalStorage = initializeLocalStorage();
