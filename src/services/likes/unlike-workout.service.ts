import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GET_LIKES_FOR_WORKOUT_QUERY_KEY,
  IS_WORKOUT_LIKED_QUERY_KEY,
} from "./keys";

const unlikeWorkout = async (workoutId: string) => {
  const { error } = await supabase.rpc("unlike_workout", {
    p_workout_id: workoutId,
  });

  if (error) {
    console.error("unlikeWorkout", error);
    throw new Error("Failed to unlike workout");
  }

  return workoutId;
};

export const useUnlikeWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikeWorkout,
    onMutate: async (workoutId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [IS_WORKOUT_LIKED_QUERY_KEY, workoutId],
      });

      // Snapshot previous values
      const previousIsWorkoutLiked = queryClient.getQueryData<boolean>([
        IS_WORKOUT_LIKED_QUERY_KEY,
        workoutId,
      ]);

      // Optimistically update
      queryClient.setQueryData([IS_WORKOUT_LIKED_QUERY_KEY, workoutId], false);

      return { previousIsWorkoutLiked };
    },
    onError: (_, workoutId, rollback) => {
      queryClient.setQueryData(
        [IS_WORKOUT_LIKED_QUERY_KEY, workoutId],
        rollback,
      );
    },
    onSettled: (_, workoutId) => {
      queryClient.invalidateQueries({
        queryKey: [IS_WORKOUT_LIKED_QUERY_KEY, workoutId],
      });
    },
    onSuccess: (_, workoutId) => {
      queryClient.invalidateQueries({
        queryKey: [GET_LIKES_FOR_WORKOUT_QUERY_KEY, workoutId],
      });
    },
  });
};
