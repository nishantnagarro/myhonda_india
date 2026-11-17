import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

import { logger } from "@/core/observability/logger";

import { IPermissionHandler, PermissionState } from "../types";

export const notificationsHandler: IPermissionHandler = {
  async check(): Promise<PermissionState> {
    try {
      const response = await Notifications.getPermissionsAsync();
      return {
        status: response.status,
        granted: response.status === "granted",
        canAskAgain: response.canAskAgain,
      };
    } catch (error) {
      logger.error("NotificationsHandler.check error", { error });
      return {
        status: "undetermined",
        granted: false,
        canAskAgain: true,
      };
    }
  },

  async request(): Promise<PermissionState> {
    try {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        });
      }

      const current = await Notifications.getPermissionsAsync();
      if (current.status === "granted") {
        return {
          status: "granted",
          granted: true,
          canAskAgain: current.canAskAgain,
        };
      }

      if (!current.canAskAgain) {
        return {
          status: "blocked",
          granted: false,
          canAskAgain: false,
        };
      }

      const response = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });

      return {
        status: response.status,
        granted: response.status === "granted",
        canAskAgain: response.canAskAgain,
      };
    } catch (error) {
      logger.error("NotificationsHandler.request error", { error });
      return {
        status: "denied",
        granted: false,
        canAskAgain: false,
      };
    }
  },
};
