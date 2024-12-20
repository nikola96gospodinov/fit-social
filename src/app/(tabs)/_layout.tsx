import { Redirect, Tabs, usePathname } from "expo-router";
import { TabBarIcon } from "@/src/components/navigation/tab-bar-icon.component";
import { colors } from "@/src/constants/colors.constants";
import { Platform, useColorScheme } from "react-native";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { WorkoutIcon } from "@/src/screens/workout/index/header/workout-icon/workout-icon.component";
import { useGetTimer } from "@/src/hooks/use-get-timer";
import { getFormattedTimeFromMilliseconds } from "@/src/utils/dates.utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetSession } from "@/src/services/auth/get-session.service";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";

  const insets = useSafeAreaInsets();

  const workoutTabTitle = useGetWorkoutTabTitle();

  const { data: session } = useGetSession();

  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme].activeIcon,
        headerTitleAlign: "center",
        tabBarStyle: {
          paddingBottom: Platform.OS === "android" ? 12 : insets.bottom,
          height: Platform.OS === "android" ? 56 : 80,
        },
      }}>
      <Tabs.Screen
        name="(index)"
        options={{
          title: "Feed",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people-circle" : "people-circle-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
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
          headerShown: false,
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

const useGetWorkoutTabTitle = () => {
  const { addStartedTime } = useActiveWorkoutStore();

  const pathname = usePathname();

  const timeSinceStarted = useGetTimer({
    startTime: addStartedTime,
  });

  const formattedTime = getFormattedTimeFromMilliseconds(timeSinceStarted);

  const workoutTabTitle = (() => {
    const isPathnameWorkout = pathname.includes("/workout");

    if (addStartedTime && isPathnameWorkout) return "Workout";

    return addStartedTime ? formattedTime : "Add";
  })();

  return workoutTabTitle;
};
