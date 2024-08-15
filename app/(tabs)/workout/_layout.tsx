import { FinishWorkout } from "@/features/workout/workout-in-progress/header/finish-workout/finish-workout.component";
import { WorkoutTimer } from "@/features/workout/workout-in-progress/header/workout-timer/workout-timer.component";
import { useStore } from "@/store";
import { Stack } from "expo-router";

export default function WorkoutLayout() {
  const { workout } = useStore();

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
    </Stack>
  );
}
