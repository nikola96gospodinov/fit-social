import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IS_ACCOUNT_FOLLOWED_QUERY_KEY, GET_FOLLOWING_QUERY_KEY } from "./keys";
import { HOME_GYM_SUGGESTIONS_QUERY_KEY } from "../suggestions/keys";

const unfollowAccount = async (followedId: string) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("unfollowAccount", userError);
    throw new Error(userError.message);
  }

  const { error } = await supabase
    .from("follows")
    .delete()
    .match({ follower_id: userData.user?.id, followed_id: followedId });

  if (error) {
    console.error("unfollowAccount", error);
    throw new Error(error.message);
  }
};

export const useUnfollowAccount = (followedId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [IS_ACCOUNT_FOLLOWED_QUERY_KEY, followedId],
      });

      queryClient.invalidateQueries({
        queryKey: [GET_FOLLOWING_QUERY_KEY, undefined],
      });

      queryClient.invalidateQueries({
        queryKey: [HOME_GYM_SUGGESTIONS_QUERY_KEY],
      });
    },
  });
};
