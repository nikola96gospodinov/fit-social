import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GET_LIKES_FOR_WORKOUT_QUERY_KEY,
  GET_NUMBER_OF_LIKES_FOR_WORKOUT_QUERY_KEY,
  IS_WORKOUT_LIKED_QUERY_KEY,
} from "./keys";

const likeWorkout = async (workoutId: string) => {
  const { error } = await supabase.rpc("like_workout", {
    p_workout_id: workoutId,
  });

  if (error) {
    console.error("likeWorkout", error);
    throw new Error("Failed to like workout");
  }

  return workoutId;
};

export const useLikeWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeWorkout,
    onMutate: async (workoutId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [IS_WORKOUT_LIKED_QUERY_KEY, workoutId],
      });

      await queryClient.cancelQueries({
        queryKey: [GET_NUMBER_OF_LIKES_FOR_WORKOUT_QUERY_KEY, workoutId],
      });

      // Snapshot previous values
      const previousIsWorkoutLiked = queryClient.getQueryData<boolean>([
        IS_WORKOUT_LIKED_QUERY_KEY,
        workoutId,
      ]);

      // Optimistically update
      queryClient.setQueryData([IS_WORKOUT_LIKED_QUERY_KEY, workoutId], true);
      queryClient.setQueryData(
        [GET_NUMBER_OF_LIKES_FOR_WORKOUT_QUERY_KEY, workoutId],
        (oldData: number) => oldData + 1,
      );

      return previousIsWorkoutLiked;
    },
    onError: (_, workoutId, rollback) => {
      queryClient.setQueryData(
        [IS_WORKOUT_LIKED_QUERY_KEY, workoutId],
        rollback,
      );

      queryClient.setQueryData(
        [GET_NUMBER_OF_LIKES_FOR_WORKOUT_QUERY_KEY, workoutId],
        (oldData: number) => oldData - 1,
      );
    },
    onSettled: (_, workoutId) => {
      queryClient.invalidateQueries({
        queryKey: [IS_WORKOUT_LIKED_QUERY_KEY, workoutId],
      });

      queryClient.invalidateQueries({
        queryKey: [GET_NUMBER_OF_LIKES_FOR_WORKOUT_QUERY_KEY, workoutId],
      });
    },
    onSuccess: (_, workoutId) => {
      queryClient.invalidateQueries({
        queryKey: [GET_LIKES_FOR_WORKOUT_QUERY_KEY, workoutId],
      });
    },
  });
};
