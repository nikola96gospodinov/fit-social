import { Tabs, usePathname } from "expo-router";
import { TabBarIcon } from "@/components/navigation/tab-bar-icon.component";
import { colors } from "@/constants/colors.constants";
import { Platform, useColorScheme } from "react-native";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { WorkoutIcon } from "@/features/workout/workout-in-progress/header/workout-icon/workout-icon.component";
import { useGetTimer } from "@/hooks/use-get-timer";
import { getFormattedTimeFromMilliseconds } from "@/utils/dates.utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";

  const insets = useSafeAreaInsets();

  const { workout } = useActiveWorkoutStore();

  const pathname = usePathname();

  const timeSinceStarted = useGetTimer({
    startTime: workout?.started,
  });

  const formattedTime = getFormattedTimeFromMilliseconds(timeSinceStarted);

  const workoutTabTitle = (() => {
    const isPathnameWorkout = pathname.includes("/workout");

    if (workout && isPathnameWorkout) return "Workout";

    return workout ? formattedTime : "Add";
  })();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme].tabIconSelected,
        headerShown: false,
        headerTitleAlign: "center",
        tabBarStyle: {
          paddingBottom: Platform.OS === "android" ? 12 : insets.bottom,
          height: Platform.OS === "android" ? 56 : 80,
        },
      }}>
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
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <WorkoutIcon color={color} focused={focused} />
          ),
          title: workoutTabTitle,
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
