import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMENTS_QUERY_KEY } from "./keys";

type Props = {
  comment: string;
  workoutId: string;
};

const addComment = async ({ comment, workoutId }: Props) => {
  const { error } = await supabase.rpc("add_comment", {
    p_content: comment,
    p_workout_id: workoutId,
  });

  if (error) {
    console.error("addComment", error);
    throw new Error("Failed to add comment");
  }

  return workoutId;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (workoutId) => {
      queryClient.invalidateQueries({
        queryKey: [COMMENTS_QUERY_KEY, workoutId],
      });
    },
  });
};
