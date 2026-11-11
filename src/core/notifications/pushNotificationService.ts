/**
 * Pure Functional Push Notification Service
 */
import { type Href, router } from "expo-router";

import { logger } from "@/core/observability/logger";

export interface NotificationPayload {
  title?: string;
  body?: string;
  data?: {
    screen?: string;
    vehicleId?: string;
    bookingId?: string;
    url?: string;
  };
}

export interface IPushNotificationService {
  requestPermissions(): Promise<boolean>;
  getDeviceToken(): Promise<string | null>;
  handleNotificationTap(payload: NotificationPayload): void;
}

export function createPushNotificationService(): IPushNotificationService {
  return {
    async requestPermissions(): Promise<boolean> {
      logger.info("Requesting push notification permissions");
      return true;
    },

    async getDeviceToken(): Promise<string | null> {
      logger.info("Retrieving FCM device token");
      return "mock-fcm-device-token";
    },

    handleNotificationTap(payload: NotificationPayload): void {
      logger.info("Push notification tapped", { data: payload.data });

      const screen = payload.data?.screen;
      const vehicleId = payload.data?.vehicleId;

      if (screen === "vehicle-details" && vehicleId) {
        router.push(`/vehicle/${vehicleId}` as Href);
      } else if (screen === "search") {
        router.push("/(tabs)/search");
      } else {
        router.push("/(tabs)");
      }
    },
  };
}

export const pushNotificationService = createPushNotificationService();
