import { supabase } from "@/src/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import {
  IS_COMMENT_LIKED_QUERY_KEY,
  NUMBER_OF_COMMENT_LIKES_QUERY_KEY,
} from "./keys";

const unlikeComment = async (commentId: string) => {
  const { error } = await supabase.rpc("unlike_comment", {
    p_comment_id: commentId,
  });

  if (error) {
    console.error("unlikeComment", error);
    throw new Error(error.message);
  }

  return commentId;
};

export const useUnlikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unlikeComment,
    onMutate: async (commentId: string) => {
      await queryClient.cancelQueries({
        queryKey: [NUMBER_OF_COMMENT_LIKES_QUERY_KEY, commentId],
      });
      await queryClient.cancelQueries({
        queryKey: [IS_COMMENT_LIKED_QUERY_KEY, commentId],
      });

      const previousNumberOfLikes = queryClient.getQueryData([
        NUMBER_OF_COMMENT_LIKES_QUERY_KEY,
        commentId,
      ]);
      const previousIsLiked = queryClient.getQueryData([
        IS_COMMENT_LIKED_QUERY_KEY,
        commentId,
      ]);

      queryClient.setQueryData(
        [NUMBER_OF_COMMENT_LIKES_QUERY_KEY, commentId],
        (old: number) => old - 1,
      );
      queryClient.setQueryData([IS_COMMENT_LIKED_QUERY_KEY, commentId], false);

      return { previousNumberOfLikes, previousIsLiked };
    },
    onError: (_, commentId, rollback) => {
      queryClient.setQueryData(
        [NUMBER_OF_COMMENT_LIKES_QUERY_KEY, commentId],
        rollback?.previousNumberOfLikes,
      );
      queryClient.setQueryData(
        [IS_COMMENT_LIKED_QUERY_KEY, commentId],
        rollback?.previousIsLiked,
      );
    },
    onSettled: (commentId) => {
      queryClient.invalidateQueries({
        queryKey: [NUMBER_OF_COMMENT_LIKES_QUERY_KEY, commentId],
      });
      queryClient.invalidateQueries({
        queryKey: [IS_COMMENT_LIKED_QUERY_KEY, commentId],
      });
    },
  });
};