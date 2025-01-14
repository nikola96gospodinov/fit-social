import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { WORKOUT_EXERCISES_QUERY_KEY } from "./profile-keys";

export const getWorkoutExercises = async (workoutId: string) => {
  const { data, error } = await supabase
    .from("workout_exercises")
    .select("*, exercises(*)")
    .eq("workout_id", workoutId);

  if (error) throw new Error(error.message);

  return data;
};

export const useGetWorkoutExercises = (workoutId: string) => {
  return useQuery({
    queryKey: [WORKOUT_EXERCISES_QUERY_KEY, workoutId],
    queryFn: () => getWorkoutExercises(workoutId),
  });
};
