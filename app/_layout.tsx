import "@/core/i18n/i18n"; // Initialize i18next

import React, { useEffect } from "react";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppErrorBoundary } from "@/core/errors";
import {
  getInitialDeepLink,
  navigateToDeepLink,
} from "@/core/navigation/deepLinkHandler";
import { logger } from "@/core/observability/logger";

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

export default function RootLayout() {
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
          <StatusBar style="dark" />
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
        </QueryClientProvider>
      </SafeAreaProvider>
    </AppErrorBoundary>
  );
}
