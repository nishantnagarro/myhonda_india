import { useEffect } from "react";
import {
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from "react-native";

/**
 * Memory-safe AppState change listener.
 * Guarantees zero memory leaks by removing subscription on component teardown.
 */
export function useSafeAppState(
  onActive: () => void,
  onBackground?: () => void,
) {
  useEffect(() => {
    let isMounted = true;

    const subscription: NativeEventSubscription = AppState.addEventListener(
      "change",
      (nextStatus: AppStateStatus) => {
        if (!isMounted) return;

        if (nextStatus === "active") {
          onActive();
        } else if (nextStatus === "background" && onBackground) {
          onBackground();
        }
      },
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, [onActive, onBackground]);
}
