import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { GET_LIKES_FOR_WORKOUT_QUERY_KEY } from "./keys";

const getLikesForWorkout = async (workoutId: string) => {
  const { data, error } = await supabase
    .from("likes")
    .select("*, profiles(*)")
    .eq("workout_id", workoutId);

  if (error) {
    console.error("getLikesForWorkout", error);
    throw new Error("Failed to get likes for workout");
  }

  return data;
};

export const useGetLikesForWorkout = (workoutId: string) => {
  return useQuery({
    queryKey: [GET_LIKES_FOR_WORKOUT_QUERY_KEY, workoutId],
    queryFn: () => getLikesForWorkout(workoutId),
  });
};
