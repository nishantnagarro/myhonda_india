import * as Location from "expo-location";

import { logger } from "@/core/observability/logger";

import { IPermissionHandler, PermissionState } from "../types";

export const locationHandler: IPermissionHandler = {
  async check(): Promise<PermissionState> {
    try {
      const response = await Location.getForegroundPermissionsAsync();
      return {
        status: response.status,
        granted: response.status === "granted",
        canAskAgain: response.canAskAgain,
      };
    } catch (error) {
      logger.error("LocationHandler.check error", { error });
      return {
        status: "undetermined",
        granted: false,
        canAskAgain: true,
      };
    }
  },

  async request(): Promise<PermissionState> {
    try {
      const current = await Location.getForegroundPermissionsAsync();
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

      const response = await Location.requestForegroundPermissionsAsync();
      return {
        status: response.status,
        granted: response.status === "granted",
        canAskAgain: response.canAskAgain,
      };
    } catch (error) {
      logger.error("LocationHandler.request error", { error });
      return {
        status: "denied",
        granted: false,
        canAskAgain: false,
      };
    }
  },
};
