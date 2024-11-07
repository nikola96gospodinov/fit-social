import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const WORKOUT_EXERCISES_QUERY_KEY = "workout-exercises";

export const getWorkoutExercises = async (workoutId: string) => {
  const { data, error } = await supabase
    .from("workout_exercises")
    .select("*")
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
