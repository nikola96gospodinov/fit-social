import { supabase } from "@/src/lib/supabase";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useMutation } from "@tanstack/react-query";
import { getOwnProfile } from "../profile/get-own-profile.service";

const addWorkout = async () => {
  const profile = await getOwnProfile();

  const { exercises, started, sets } = useActiveWorkoutStore.getState();

  const { data, error } = await supabase
    .from("workouts")
    .insert({
      started: started?.toISOString() ?? new Date().toISOString(),
      user_handle: String(profile.handle),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  const { data: workoutExercises, error: workoutExercisesError } =
    await supabase
      .from("workout_exercises")
      .insert(
        exercises.map((exercise) => ({ ...exercise, workout_id: data.id })),
      )
      .select();

  if (workoutExercisesError) throw new Error(workoutExercisesError.message);

  const { data: workoutSets, error: workoutSetsError } = await supabase
    .from("exercise_sets")
    .insert(
      sets.map((set) => ({
        ...set,
        workout_exercise_id: workoutExercises.find(
          (exercise) => exercise.exercise_id === set.workout_exercise_id,
        )?.id,
      })),
    );

  if (workoutSetsError) throw new Error(workoutSetsError.message);

  return workoutSets;
};

export const useAddWorkout = () => {
  const { resetWorkout } = useActiveWorkoutStore();

  return useMutation({
    mutationFn: addWorkout,
    onSuccess: resetWorkout,
  });
};
