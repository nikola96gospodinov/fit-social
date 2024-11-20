import { useGetAllExerciseSetsForWorkout } from "@/src/services/workout/get-all-exercise-sets-for-workout.service";

export const useGetTotalWeight = (workoutId: string) => {
  const { data: exerciseSets } = useGetAllExerciseSetsForWorkout(workoutId);

  const totalWeight = exerciseSets?.reduce(
    (acc, set) => acc + (set.weight ?? 0) * (set.reps ?? 0),
    0,
  );

  return totalWeight?.toLocaleString();
};
