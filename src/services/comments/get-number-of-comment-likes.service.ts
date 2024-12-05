import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { NUMBER_OF_COMMENT_LIKES_QUERY_KEY } from "./keys";

const getNumberOfCommentLikes = async (commentId: string) => {
  const { count, error } = await supabase
    .from("comment_likes")
    .select("id", { count: "exact" })
    .eq("comment_id", commentId);

  if (error) {
    console.error("getCommentLikes", error);
    throw new Error(error.message);
  }

  return count;
};

export const useGetNumberOfCommentLikes = (commentId: string) => {
  return useQuery({
    queryKey: [NUMBER_OF_COMMENT_LIKES_QUERY_KEY, commentId],
    queryFn: () => getNumberOfCommentLikes(commentId),
  });
};
