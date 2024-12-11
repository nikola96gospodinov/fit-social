import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { GET_NUMBER_OF_LIKES_FOR_WORKOUT_QUERY_KEY } from "./keys";

const getNumberOfLikesForWorkout = async (workoutId: string) => {
  const { error, count } = await supabase
    .from("likes")
    .select("id", { count: "exact" })
    .eq("workout_id", workoutId);

  if (error) {
    console.error("getNumberOfLikesForWorkout", error);
    throw new Error("Failed to get number of likes for workout");
  }

  return count;
};

export const useGetNumberOfLikesForWorkout = (workoutId: string) => {
  return useQuery({
    queryKey: [GET_NUMBER_OF_LIKES_FOR_WORKOUT_QUERY_KEY, workoutId],
    queryFn: () => getNumberOfLikesForWorkout(workoutId),
  });
};
