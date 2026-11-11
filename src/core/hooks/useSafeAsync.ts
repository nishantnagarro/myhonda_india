import { useRef, useEffect, useCallback } from "react";

/**
 * useSafeAsync: Prevents setting state or resolving callbacks after a component has unmounted.
 * Eliminates "Can't perform a React state update on an unmounted component" memory leaks.
 */
export function useSafeAsync() {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const runSafe = useCallback(<T>(fn: () => Promise<T>): Promise<T | void> => {
    return fn().then(
      (result) => {
        if (isMountedRef.current) {
          return result;
        }
        return undefined;
      },
      (error: unknown) => {
        if (isMountedRef.current) {
          throw error;
        }
      },
    );
  }, []);

  return { isMounted: () => isMountedRef.current, runSafe };
}
