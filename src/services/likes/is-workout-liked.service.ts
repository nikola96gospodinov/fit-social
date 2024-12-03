import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { IS_WORKOUT_LIKED_QUERY_KEY } from "./keys";

const isWorkoutLiked = async (workoutId: string) => {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error("isWorkoutLiked", sessionError);
    throw new Error("Failed to get session");
  }

  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .match({
      workout_id: workoutId,
      user_id: session.session?.user.id,
    })
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("isWorkoutLiked", error);
    throw new Error("Failed to check if workout is liked");
  }

  return !!data;
};

export const useIsWorkoutLiked = (workoutId: string) => {
  return useQuery({
    queryKey: [IS_WORKOUT_LIKED_QUERY_KEY, workoutId],
    queryFn: () => isWorkoutLiked(workoutId),
  });
};
