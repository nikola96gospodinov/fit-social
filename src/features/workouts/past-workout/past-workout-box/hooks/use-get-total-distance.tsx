import { useGetAllExerciseSetsForWorkout } from "@/src/services/workout/get-all-exercise-sets-for-workout.service";

export const useGetTotalDistance = (workoutId: string) => {
  const { data: exerciseSets } = useGetAllExerciseSetsForWorkout(workoutId);

  const totalDistance = exerciseSets?.reduce(
    (acc, set) => acc + (set.distance ?? 0),
    0,
  );

  return totalDistance;
};
