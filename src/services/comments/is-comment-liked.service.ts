import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { IS_COMMENT_LIKED_QUERY_KEY } from "./keys";

const isCommentLiked = async (commentId: string) => {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error("isCommentLiked", sessionError);
    throw new Error("Failed to get session");
  }

  const { data, error, count } = await supabase
    .from("comment_likes")
    .select("*", { count: "exact" })
    .match({ comment_id: commentId, user_id: session?.session?.user.id });

  if (count === 0) {
    return false;
  }

  if (error) {
    console.error("isCommentLiked", error);
    throw new Error("Failed to check if comment is liked");
  }

  return !!data;
};

export const useIsCommentLiked = (commentId: string) => {
  return useQuery({
    queryKey: [IS_COMMENT_LIKED_QUERY_KEY, commentId],
    queryFn: () => isCommentLiked(commentId),
  });
};
