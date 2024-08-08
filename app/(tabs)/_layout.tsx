import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/tab-bar-icon.component";
import { colors } from "@/constants/colors.constants";
import { useColorScheme, View } from "react-native";
import { useStore } from "@/store";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { workout } = useStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people-circle" : "people-circle-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="workout"
        options={{
          title: workout ? "Workout" : "Add",
          tabBarIcon: ({ color, focused }) => {
            if (workout) {
              return (
                <TabBarIcon
                  name={focused ? "barbell" : "barbell-outline"}
                  color={color}
                />
              );
            }

            return (
              <TabBarIcon
                name={focused ? "add-circle" : "add-circle-outline"}
                color={color}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
