import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { COMMENTS_QUERY_KEY } from "./keys";

const getComments = async (workoutId: string) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("workout_id", workoutId);

  if (error) {
    console.error("getComments", error);
    throw new Error(error.message);
  }

  return data;
};

export const useGetComments = (workoutId: string) => {
  return useQuery({
    queryKey: [COMMENTS_QUERY_KEY, workoutId],
    queryFn: () => getComments(workoutId),
  });
};
