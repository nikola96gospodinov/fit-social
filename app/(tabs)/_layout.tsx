import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/tab-bar-icon.component";
import { colors } from "@/constants/colors.constants";
import { useColorScheme } from "react-native";
import { useStore } from "@/store";
import { WorkoutTimer } from "@/features/workout/workout-in-progress/header/workout-timer/workout-timer.component";
import { FinishWorkout } from "@/features/workout/workout-in-progress/header/finish-workout/finish-workout.component";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { workout } = useStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? "light"].tabIconSelected,
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
          headerLeft: () => <WorkoutTimer />,
          headerRight: () => <FinishWorkout />,
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
