import { locationHandler } from "./handlers/locationHandler";
import { notificationsHandler } from "./handlers/notificationsHandler";
import { AppPermission, IPermissionHandler } from "./types";

export const permissionHandlers: Record<AppPermission, IPermissionHandler> = {
  location: locationHandler,
  notifications: notificationsHandler,
};
