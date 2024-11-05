import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const GET_PREVIOUS_SETS_FOR_EXERCISE_QUERY_KEY =
  "get_previous_sets_for_exercise";

const getPreviousSetsForExercise = async (exercise_id: string) => {
  const { data, error } = await supabase.rpc("get_previous_sets_for_exercise", {
    current_exercise_id: exercise_id,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const useGetPreviousSetsForExercise = (exercise_id: string) => {
  return useQuery({
    queryKey: [GET_PREVIOUS_SETS_FOR_EXERCISE_QUERY_KEY, exercise_id],
    queryFn: () => getPreviousSetsForExercise(exercise_id),
  });
};
