import { supabase } from "@/src/lib/supabase";
import { Tables } from "@/src/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_FOLLOWING_QUERY_KEY, IS_ACCOUNT_FOLLOWED_QUERY_KEY } from "./keys";
import { HOME_GYM_SUGGESTIONS_QUERY_KEY } from "../suggestions/keys";

const followAccount = async (profileToFollow: Tables<"profiles">) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("followAccount", userError);
    throw new Error(userError.message);
  }

  const { error } = await supabase.rpc("follow_account", {
    p_follower_id: userData.user?.id,
    p_followed_id: profileToFollow.id,
  });

  if (error) {
    console.error("followAccount", error);
    throw new Error(error.message);
  }
};

export const useFollowAccount = (followedId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followAccount,
    onMutate: async () => {
      // We only care about the isAccountFollowed query
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [IS_ACCOUNT_FOLLOWED_QUERY_KEY, followedId],
      });

      // Snapshot previous values
      const previousIsAccountFollowed = queryClient.getQueryData<boolean>([
        IS_ACCOUNT_FOLLOWED_QUERY_KEY,
        followedId,
      ]);

      // Optimistically update
      queryClient.setQueryData(
        [IS_ACCOUNT_FOLLOWED_QUERY_KEY, followedId],
        true,
      );

      return { previousIsAccountFollowed };
    },
    onError: (_, __, rollback) => {
      queryClient.setQueryData(
        [IS_ACCOUNT_FOLLOWED_QUERY_KEY, followedId],
        rollback,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [IS_ACCOUNT_FOLLOWED_QUERY_KEY, followedId],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_FOLLOWING_QUERY_KEY, undefined],
      });

      queryClient.invalidateQueries({
        queryKey: [HOME_GYM_SUGGESTIONS_QUERY_KEY],
      });
    },
  });
};
