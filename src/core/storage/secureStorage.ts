/**
 * Pure Functional Secure Storage (Keychain / Keystore)
 * Used exclusively for sensitive credentials: JWT access token, refresh token.
 */
import * as SecureStore from "expo-secure-store";
import { logger } from "@/core/observability/logger";

export interface ISecureStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export function createSecureStorage(): ISecureStorage {
  return {
    async getItem(key: string): Promise<string | null> {
      try {
        return await SecureStore.getItemAsync(key);
      } catch (error) {
        logger.error(`Error reading key ${key} from SecureStore`, error);
        return null;
      }
    },

    async setItem(key: string, value: string): Promise<void> {
      try {
        await SecureStore.setItemAsync(key, value);
      } catch (error) {
        logger.error(`Error writing key ${key} to SecureStore`, error);
        throw error;
      }
    },

    async removeItem(key: string): Promise<void> {
      try {
        await SecureStore.deleteItemAsync(key);
      } catch (error) {
        logger.error(`Error removing key ${key} from SecureStore`, error);
      }
    },
  };
}

export const secureStorage = createSecureStorage();
