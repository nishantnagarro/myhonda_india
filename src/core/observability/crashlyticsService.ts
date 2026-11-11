/**
 * Pure Functional Crashlytics Service Abstraction
 */

export interface ICrashlyticsService {
  log(message: string): void;
  recordError(error: Error, jsErrorAttributes?: Record<string, unknown>): void;
  setUserId(userId: string): void;
  setAttribute(key: string, value: string): void;
}

export function createCrashlyticsService(): ICrashlyticsService {
  return {
    log(message: string): void {
      if (__DEV__) {
        console.log(`[Crashlytics Breadcrumb] ${message}`);
      }
    },

    recordError(
      error: Error,
      jsErrorAttributes?: Record<string, unknown>,
    ): void {
      if (__DEV__) {
        console.error(
          `[Crashlytics Non-Fatal] ${error.message}`,
          jsErrorAttributes,
        );
      }
    },

    setUserId(userId: string): void {
      if (__DEV__) {
        console.log(`[Crashlytics User] ${userId}`);
      }
    },

    setAttribute(key: string, value: string): void {
      if (__DEV__) {
        console.log(`[Crashlytics Attr] ${key}: ${value}`);
      }
    },
  };
}

export const crashlyticsService = createCrashlyticsService();
