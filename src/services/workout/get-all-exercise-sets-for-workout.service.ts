import { supabase } from "@/src/lib/supabase";
import { EXERCISE_SETS_QUERY_KEY } from "./profile-keys";
import { useQuery } from "@tanstack/react-query";

const getAllExerciseSetsForWorkout = async (workoutId: string) => {
  const { data, error } = await supabase
    .from("workout_exercises")
    .select("*")
    .eq("workout_id", workoutId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const exerciseIds = data?.map((exercise) => exercise.id);

  const { data: exerciseSets, error: exerciseSetsError } = await supabase
    .from("exercise_sets")
    .select("*")
    .in("workout_exercise_id", exerciseIds);

  if (exerciseSetsError) {
    console.error("getAllExerciseSetsForWorkout", exerciseSetsError);
    throw new Error(exerciseSetsError.message);
  }

  return exerciseSets;
};

export const useGetAllExerciseSetsForWorkout = (workoutId: string) => {
  return useQuery({
    queryKey: [EXERCISE_SETS_QUERY_KEY, workoutId],
    queryFn: () => getAllExerciseSetsForWorkout(workoutId),
  });
};
