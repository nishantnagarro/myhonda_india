/**
 * Composition Root (Pure Functional Services Registry)
 *
 * Assembles all application dependencies using pure factory closures.
 * Zero class reflection, zero runtime container overhead, 100% type-safe.
 */
import React, { createContext, ReactNode, useContext } from "react";

import { createExploreRepository } from "@/features/explore/data/repositories/ExploreRepositoryImpl";
import { IExploreRepository } from "@/features/explore/domain/repositories/IExploreRepository";

import { createHttpClient } from "./network/axiosHttpClient";
import { IHttpClient } from "./network/httpClient";
import {
  IPushNotificationService,
  pushNotificationService,
} from "./notifications/pushNotificationService";
import {
  crashlyticsService,
  ICrashlyticsService,
} from "./observability/crashlyticsService";
import { ILogger, logger } from "./observability/logger";
import { ILocalStorage, localStorage } from "./storage/localStorage";
import { ISecureStorage, secureStorage } from "./storage/secureStorage";

// Base API URL
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://api.myhonda.in";

// Initialize core HTTP client
const httpClient: IHttpClient = createHttpClient(BASE_URL, secureStorage);

// Assemble feature repositories via pure functional factory
const exploreRepo: IExploreRepository = createExploreRepository(httpClient);

export interface AppServices {
  httpClient: IHttpClient;
  secureStorage: ISecureStorage;
  localStorage: ILocalStorage;
  logger: ILogger;
  crashlytics: ICrashlyticsService;
  pushNotifications: IPushNotificationService;
  exploreRepo: IExploreRepository;
}

export const services: AppServices = {
  httpClient,
  secureStorage,
  localStorage,
  logger,
  crashlytics: crashlyticsService,
  pushNotifications: pushNotificationService,
  exploreRepo,
};

// React Context for Functional Dependency Injection & Zero-Mock Testing
export const ServicesContext = createContext<AppServices>(services);

export function ServicesProvider({
  children,
  value = services,
}: {
  children: ReactNode;
  value?: AppServices;
}) {
  return React.createElement(ServicesContext.Provider, { value }, children);
}

/**
 * Functional hook to access app services with 100% compile-time type safety.
 * Defaults to production services without needing an explicit wrapper in app code,
 * but allows seamless mock injection in component tests.
 */
export function useServices(): AppServices {
  return useContext(ServicesContext);
}
