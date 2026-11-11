import React from "react";
import { Tabs } from "expo-router";
import { Compass, Search, Wrench, User } from "lucide-react-native";
import { resolveColor } from "@/design-system/tokens/colors";
import { useAppTranslation } from "@/core/i18n/useAppTranslation";

export default function TabLayout() {
  const { t } = useAppTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: resolveColor("brand.primary"),
        tabBarInactiveTintColor: resolveColor("text.muted"),
        tabBarStyle: {
          backgroundColor: resolveColor("surface.card"),
          borderTopColor: resolveColor("border.subtle"),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("nav.explore"),
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t("nav.search"),
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="service"
        options={{
          title: t("nav.service"),
          tabBarIcon: ({ color, size }) => <Wrench color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("nav.profile"),
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
