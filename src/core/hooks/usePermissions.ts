import { useCallback, useMemo, useRef, useState } from "react";

import { logger } from "@/core/observability/logger";
import {
  AppPermission,
  IPermissionHandler,
  permissionHandlers,
  PermissionResults,
  PermissionState,
} from "@/core/permissions";

export interface UsePermissionsReturn<T extends AppPermission> {
  statuses: Record<T, PermissionState | undefined>;
  allGranted: boolean;
  isLoading: boolean;
  check: () => Promise<PermissionResults<T>>;
  request: () => Promise<PermissionResults<T>>;
}

/**
 * Enterprise-grade, generic permissions hook.
 *
 * Supports single or multiple permissions with strong TypeScript inference,
 * strategy-pattern handlers, sequential prompts, and observable state.
 *
 * @example
 * const { check, request, allGranted } = usePermissions(["location", "notifications"]);
 * const { request: requestCamera } = usePermissions("camera");
 */
export function usePermissions<T extends AppPermission = AppPermission>(
  permissions: T | readonly T[] | T[],
): UsePermissionsReturn<T> {
  const permissionKeys = useMemo<T[]>(() => {
    return Array.isArray(permissions) ? [...permissions] : [permissions as T];
  }, [permissions]);

  const [statuses, setStatuses] = useState<
    Record<T, PermissionState | undefined>
  >(() => {
    const initial = {} as Record<T, PermissionState | undefined>;
    for (const key of permissionKeys) {
      initial[key] = undefined;
    }
    return initial;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  const getHandler = useCallback((key: T): IPermissionHandler => {
    const handler = permissionHandlers[key];
    if (!handler) {
      throw new Error(
        `[usePermissions]: No handler registered for permission "${key}"`,
      );
    }
    return handler;
  }, []);

  /**
   * Silently checks all specified permissions in parallel.
   */
  const check = useCallback(async (): Promise<PermissionResults<T>> => {
    setIsLoading(true);
    const results = {} as Record<T, PermissionState>;

    try {
      const checks = permissionKeys.map(async (key) => {
        const handler = getHandler(key);
        const state = await handler.check();
        return { key, state };
      });

      const settled = await Promise.all(checks);
      let allGranted = true;

      for (const item of settled) {
        results[item.key] = item.state;
        if (!item.state.granted) {
          allGranted = false;
        }
      }

      if (isMountedRef.current) {
        setStatuses((prev) => ({ ...prev, ...results }));
      }

      logger.info("Permissions check completed", { results, allGranted });
      return { allGranted, results };
    } catch (error) {
      logger.error("Permissions check failed", { error });
      return { allGranted: false, results };
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [permissionKeys, getHandler]);

  /**
   * Sequentially requests permissions that are not yet granted.
   * Prompts are run in series to prevent OS dialog collision on iOS/Android.
   */
  const request = useCallback(async (): Promise<PermissionResults<T>> => {
    setIsLoading(true);
    const results = {} as Record<T, PermissionState>;

    try {
      let allGranted = true;

      for (const key of permissionKeys) {
        const handler = getHandler(key);
        const state = await handler.request();
        results[key] = state;

        if (!state.granted) {
          allGranted = false;
        }
      }

      if (isMountedRef.current) {
        setStatuses((prev) => ({ ...prev, ...results }));
      }

      logger.info("Permissions request completed", { results, allGranted });
      return { allGranted, results };
    } catch (error) {
      logger.error("Permissions request failed", { error });
      return { allGranted: false, results };
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [permissionKeys, getHandler]);

  const allGranted = useMemo(() => {
    return permissionKeys.every((key) => statuses[key]?.granted === true);
  }, [permissionKeys, statuses]);

  return {
    statuses,
    allGranted,
    isLoading,
    check,
    request,
  };
}
