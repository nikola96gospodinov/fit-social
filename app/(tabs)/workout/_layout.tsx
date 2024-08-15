import { FinishWorkout } from "@/features/workout/workout-in-progress/header/finish-workout/finish-workout.component";
import { WorkoutTimer } from "@/features/workout/workout-in-progress/header/workout-timer/workout-timer.component";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { Stack } from "expo-router";

export default function WorkoutLayout() {
  const { workout } = useActiveWorkoutStore();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitleStyle: {
          fontSize: 16,
        },
      }}
    >
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
          title: "Exercise filters",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}