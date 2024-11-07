import { ClearFilter } from "@/src/screens/workout/filters/header/clear-filters/clear-filter.component";
import { FinishWorkout } from "@/src/screens/workout/index/header/finish-workout/finish-workout.component";
import { WorkoutTimer } from "@/src/screens/workout/index/header/workout-timer/workout-timer.component";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useExerciseFilterStore } from "@/src/store/exercise-filter-store";
import { Stack } from "expo-router";

export default function WorkoutLayout() {
  const {
    store: { started },
  } = useActiveWorkoutStore();
  const { filters } = useExerciseFilterStore();

  const totalNumberOfFilters = filters.length;

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitleStyle: {
          fontSize: 16,
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Workout",
          headerShown: !!started,
          headerLeft: () => <WorkoutTimer />,
          headerRight: () => <FinishWorkout />,
        }}
      />

      <Stack.Screen
        name="add-exercise"
        options={{
          title: "Add exercise(s)",
        }}
      />

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

      <Stack.Screen
        name="exercise/[id]"
        options={{
          presentation: "modal",
          title: "Loading...", // Title is being re-set in the route file once fetch is complete
        }}
      />
    </Stack>
  );
}
