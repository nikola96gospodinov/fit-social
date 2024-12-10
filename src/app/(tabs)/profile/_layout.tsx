import { ClearFilter } from "@/src/features/workouts/filters/header/clear-filters/clear-filter.component";
import { EditWorkoutHeaderTitle } from "@/src/screens/profile/edit-workout/header-title/header-title.component";
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
    ? "Change home gym"
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
        options={{
          headerRight: EditWorkoutRightHeader,
          headerTitle: EditWorkoutHeaderTitle,
        }}
      />

      <Stack.Screen
        name="view-workout/[id]"
        options={{
          presentation: "modal",
          title: "Loading...", // Title is being re-set in the route file once fetch is complete
        }}
      />

      <Stack.Screen
        name="follows"
        options={{ title: "Loading...", presentation: "modal" }}
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

      <Stack.Screen
        name="workout-likes/[id]"
        options={{ presentation: "modal", title: "Likes" }}
      />

      <Stack.Screen
        name="add-comment/[id]"
        options={{ presentation: "modal", title: "Add comment" }}
      />

      <Stack.Screen
        name="other-profile/[id]"
        options={{ title: "Loading..." }}
      />

      <Stack.Screen
        name="follow-requests"
        options={{ title: "Follow requests", presentation: "modal" }}
      />
    </Stack>
  );
}
