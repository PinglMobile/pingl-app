import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  size: number;
  color: string;
}) {
  return (
    <FontAwesome style={{ marginBottom: -10, paddingBottom: 5 }} {...props} />
  );
}
const AUTH = false;
export default function TabLayout() {
  const colorScheme = useColorScheme();

  <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#FF7366", //Colors[colorScheme ?? 'light'].tint,
      // Disable the static render of the header on web
      // to prevent a hydration error in React Navigation v6.
      headerShown: useClientOnlyValue(false, true),
    }}
  >
    <Tabs.Screen
      name="home/index"
      options={{
        title: "Home",
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="home" color={color} size={23} />
        ),
        headerRight: () => (
          <Link href="/modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    />
    <Tabs.Screen
      name="events/index"
      options={{
        title: "Events",
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="map" color={color} size={17} />
        ),
      }}
    />
  </Tabs>;
}
