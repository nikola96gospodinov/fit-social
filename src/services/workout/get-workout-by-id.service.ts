import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const WORKOUT_BY_ID_QUERY_KEY = "workout-by-id";

export const getWorkoutById = async (id: string) => {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const useGetWorkoutById = (id: string) => {
  return useQuery({
    queryKey: [WORKOUT_BY_ID_QUERY_KEY, id],
    queryFn: () => getWorkoutById(id),
  });
};
