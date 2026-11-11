import React from "react";
import { View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import { ScreenContainer, AppText } from "@/design-system/primitives";
import { spacing } from "@/design-system/tokens/spacing";

export default function NotFoundScreen() {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ title: "Screen Not Found" }} />
      <View style={styles.container}>
        <AppText variant="h2" color="text.primary" style={styles.title}>
          Screen doesn't exist
        </AppText>
        <Link href="/(tabs)" style={styles.link}>
          <AppText variant="button" color="brand.primary">
            Go to Explore Home
          </AppText>
        </Link>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  title: {
    marginBottom: spacing.md,
  },
  link: {
    marginTop: spacing.base,
    paddingVertical: spacing.base,
  },
});
