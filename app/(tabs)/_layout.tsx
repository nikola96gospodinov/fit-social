import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/tab-bar-icon.component";
import { colors } from "@/constants/colors.constants";
import { useColorScheme } from "react-native";
import { useStore } from "@/store";
import { ThemedText } from "@/components/ui/themed-text.component";
import { useGetTimer } from "@/hooks/use-get-timer";
import { getFormattedTimeFromMilliseconds } from "@/utils/dates.utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { WorkoutTimer } from "@/features/workout/workout-in-progress/workout-timer/workout-timer.component";

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
            const icon = workout ? "barbell" : "add-circle";

            return (
              <TabBarIcon
                name={focused ? icon : `${icon}-outline`}
                color={color}
              />
            );
          },
          headerShown: !!workout,
          headerRight: () => <WorkoutTimer />,
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
