export type AppPermission = "location" | "notifications";

export type PermissionStatus =
  "granted" | "denied" | "undetermined" | "blocked";

export interface PermissionState {
  status: PermissionStatus;
  granted: boolean;
  canAskAgain: boolean;
}

export interface IPermissionHandler {
  check(): Promise<PermissionState>;
  request(): Promise<PermissionState>;
}

export interface PermissionResults<T extends AppPermission = AppPermission> {
  allGranted: boolean;
  results: Record<T, PermissionState>;
}
