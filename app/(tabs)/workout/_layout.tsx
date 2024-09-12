import { FinishWorkout } from "@/features/workout/workout-in-progress/header/finish-workout/finish-workout.component";
import { WorkoutTimer } from "@/features/workout/workout-in-progress/header/workout-timer/workout-timer.component";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { useExerciseFilterStore } from "@/store/exercise-filter-store";
import { Stack } from "expo-router";

export default function WorkoutLayout() {
  const { workout } = useActiveWorkoutStore();
  const { getTotalNumberOfFilters } = useExerciseFilterStore();

  const totalNumberOfFilters = getTotalNumberOfFilters();

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
          headerShown: !!workout,
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
        }}
      />
    </Stack>
  );
}
