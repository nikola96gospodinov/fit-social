import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const EXERCISE_SETS_QUERY_KEY = "exercise-sets";

const getExerciseSets = async (workoutExerciseId: string) => {
  const { data, error } = await supabase
    .from("exercise_sets")
    .select("*")
    .eq("workout_exercise_id", workoutExerciseId);

  if (error) throw new Error(error.message);

  return data;
};

export const useGetExerciseSets = (workoutExerciseId: string) => {
  return useQuery({
    queryKey: [EXERCISE_SETS_QUERY_KEY, workoutExerciseId],
    queryFn: () => getExerciseSets(workoutExerciseId),
  });
};
