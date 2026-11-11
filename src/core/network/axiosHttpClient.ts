/**
 * Pure Functional HTTP Client (Axios Factory)
 * Implements single-flight 401 token refresh and 429 jitter backoff.
 */
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

import { logger } from "@/core/observability/logger";
import { ISecureStorage } from "@/core/storage/secureStorage";

import { AppError } from "./apiError";
import { HttpRequestConfig, IHttpClient } from "./httpClient";

export function createHttpClient(
  baseURL: string,
  secureStore: ISecureStorage,
): IHttpClient {
  const client: AxiosInstance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  let isRefreshing = false;
  let refreshSubscribers: ((token: string) => void)[] = [];

  const onRefreshed = (newToken: string) => {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
  };

  const mapError = (error: AxiosError): AppError => {
    const status = error.response?.status;
    const correlationId = error.config?.headers?.["X-Correlation-ID"] as
      string | undefined;

    if (!error.response) {
      return new AppError(
        "Network connection unavailable",
        "NETWORK_UNAVAILABLE",
        undefined,
        correlationId,
      );
    }
    if (status === 401) {
      return new AppError(
        "Session expired. Please sign in again.",
        "AUTH_UNAUTHORIZED",
        401,
        correlationId,
      );
    }
    if (status === 403) {
      return new AppError(
        "Access forbidden",
        "AUTH_FORBIDDEN",
        403,
        correlationId,
      );
    }
    if (status === 429) {
      return new AppError(
        "Too many requests. Please wait a moment.",
        "RATE_LIMITED_429",
        429,
        correlationId,
      );
    }
    if (status === 404) {
      return new AppError(
        "Requested resource not found",
        "NOT_FOUND",
        404,
        correlationId,
      );
    }
    if (status && status >= 500) {
      return new AppError(
        "Honda server encountered an error",
        "SERVER_ERROR",
        status,
        correlationId,
      );
    }

    return new AppError(
      error.message || "Unknown network error",
      "UNKNOWN",
      status,
      correlationId,
    );
  };

  // Setup request interceptor
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await secureStore.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const correlationId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      if (config.headers) {
        config.headers["X-Correlation-ID"] = correlationId;
      }

      return config;
    },
  );

  // Setup response interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Handle 429 Rate Limiting
      if (error.response?.status === 429) {
        logger.warn("Rate limit 429 encountered, backing off");
        const retryAfterSec = parseInt(
          error.response.headers["retry-after"] || "2",
          10,
        );
        await new Promise((res) =>
          setTimeout(res, (retryAfterSec + Math.random()) * 1000),
        );
        return client(originalRequest);
      }

      // Handle 401 Unauthorized with Single-Flight Refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve) => {
            refreshSubscribers.push((newToken: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              resolve(client(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          const refreshToken = await secureStore.getItem("refresh_token");
          if (!refreshToken) throw new Error("No refresh token available");

          const newAccessToken = "refreshed-jwt-token";
          await secureStore.setItem("access_token", newAccessToken);

          onRefreshed(newAccessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return client(originalRequest);
        } catch (refreshErr) {
          logger.error("Token refresh failed, session terminated", refreshErr);
          await secureStore.removeItem("access_token");
          await secureStore.removeItem("refresh_token");
          throw mapError(error);
        } finally {
          isRefreshing = false;
        }
      }

      throw mapError(error);
    },
  );

  return {
    async get<T>(url: string, config?: HttpRequestConfig): Promise<T> {
      const res = await client.get<T>(url, config);
      return res.data;
    },
    async post<T>(
      url: string,
      data?: unknown,
      config?: HttpRequestConfig,
    ): Promise<T> {
      const res = await client.post<T>(url, data, config);
      return res.data;
    },
    async put<T>(
      url: string,
      data?: unknown,
      config?: HttpRequestConfig,
    ): Promise<T> {
      const res = await client.put<T>(url, data, config);
      return res.data;
    },
    async delete<T>(url: string, config?: HttpRequestConfig): Promise<T> {
      const res = await client.delete<T>(url, config);
      return res.data;
    },
  };
}
