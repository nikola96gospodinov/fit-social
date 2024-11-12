import { ClearFilter } from "@/src/features/workouts/filters/header/clear-filters/clear-filter.component";
import { EditWorkoutRightHeader } from "@/src/screens/profile/edit-workout/right-header/right-header.component";
import { ProfileEditHeaderRight } from "@/src/screens/profile/edit/header-right/header-right.component";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { useActionStore, WORKOUT_ACTION } from "@/src/store/action-store";
import { useExerciseFilterStore } from "@/src/store/exercise-filter-store";
import { Stack, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function ProfileLayout() {
  const { data: profile } = useGetProfile();

  const { setAction } = useActionStore();

  const navigation = useNavigation();

  const { filters } = useExerciseFilterStore();

  const totalNumberOfFilters = filters.length;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setAction(WORKOUT_ACTION.EDIT);
    });

    return unsubscribe;
  }, [setAction, navigation]);

  const homeGymTitle = profile?.home_gym_name
    ? "Edit home gym"
    : "Set home gym";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Profile" }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Edit profile",
          headerRight: () => <ProfileEditHeaderRight />,
        }}
      />

      <Stack.Screen name="set-home-gym" options={{ title: homeGymTitle }} />

      <Stack.Screen
        name="edit-workout/[id]"
        options={{ title: "Edit workout", headerRight: EditWorkoutRightHeader }}
      />

      {/* The next 3 screens are duplicates. Currently Expo doesn't support a back button when moving from one tab to another hence why it's needed - https://github.com/expo/expo/issues/30141 */}
      <Stack.Screen
        name="exercise/[id]"
        options={{
          presentation: "modal",
          title: "Loading...", // Title is being re-set in the route file once fetch is complete
        }}
      />

      {/* Duplicate screen */}
      <Stack.Screen
        name="filters"
        options={{
          title: `Exercise filters${
            totalNumberOfFilters ? ` (${totalNumberOfFilters})` : ""
          }`,
          presentation: "modal",
          headerRight: ClearFilter,
        }}
      />

      {/* Duplicate screen */}
      <Stack.Screen
        name="add-exercise"
        options={{
          title: "Add exercise(s)",
        }}
      />
    </Stack>
  );
}
