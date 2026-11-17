import "@/core/i18n/i18n"; // Initialize i18next

import React, { useEffect, useRef, useState } from "react";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppErrorBoundary } from "@/core/errors";
import { usePermissions } from "@/core/hooks/usePermissions";
import {
  getInitialDeepLink,
  navigateToDeepLink,
} from "@/core/navigation/deepLinkHandler";
import { logger } from "@/core/observability/logger";
import { SplashScreenView } from "@/features/splash";

// Prevent native splash screen from hiding automatically until JS mounts
SplashScreen.preventAutoHideAsync().catch(() => {});

// Create TanStack Query Client with optimal mobile defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 3, // 3 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const SPLASH_MIN_DURATION_MS = 5000;

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const { check, request } = usePermissions(["location", "notifications"]);
  const isStartupHandled = useRef(false);

  useEffect(() => {
    if (isStartupHandled.current) return;
    isStartupHandled.current = true;

    async function handleSplashLifecycle() {
      // 1. Hide native splash so the seamless in-app splash view takes over
      await SplashScreen.hideAsync().catch(() => {});

      const startTime = Date.now();

      // 2. Silently check existing permissions in background
      const { allGranted } = await check();

      // 3. Ensure at least 5 seconds have elapsed on splash
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, SPLASH_MIN_DURATION_MS - elapsedTime);
      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      // 4. If permissions are already allowed, proceed immediately
      if (allGranted) {
        logger.info("Permissions already granted. Proceeding to main screen.");
        setShowSplash(false);
        return;
      }

      // 5. App stays on splash while asking for Location and Notifications
      logger.info("Requesting startup permissions from user.");
      await request();

      // 6. Once user accepts or denies, dismiss splash and continue
      logger.info("Permissions answered. Dismissing splash screen.");
      setShowSplash(false);
    }

    void handleSplashLifecycle();
  }, [check, request]);

  useEffect(() => {
    // Zero-Leak Deep Linking Listener
    const handleInitialUrl = async () => {
      const initialUrl = await getInitialDeepLink();
      if (initialUrl) {
        logger.info("App opened via deep link", { url: initialUrl });
        navigateToDeepLink(initialUrl);
      }
    };

    void handleInitialUrl();

    const subscription = Linking.addEventListener("url", (event) => {
      logger.info("Incoming deep link event", { url: event.url });
      navigateToDeepLink(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppErrorBoundary>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="vehicle/[id]"
              options={{
                headerShown: true,
                headerTitle: "Vehicle Details",
                headerBackTitle: "Back",
              }}
            />
            <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
          </Stack>
          {showSplash && <SplashScreenView />}
        </QueryClientProvider>
      </SafeAreaProvider>
    </AppErrorBoundary>
  );
}
