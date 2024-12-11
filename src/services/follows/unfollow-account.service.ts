import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ACCOUNT_FOLLOW_STATUS_QUERY_KEY,
  GET_FOLLOWING_QUERY_KEY,
  GET_NUMBER_OF_FOLLOWING_QUERY_KEY,
} from "./keys";
import { HOME_GYM_SUGGESTIONS_QUERY_KEY } from "../suggestions/keys";

const unfollowAccount = async (followedId: string) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("unfollowAccount", userError);
    throw new Error(userError.message);
  }

  const { error } = await supabase.rpc("unfollow_account", {
    p_follower_id: userData.user?.id,
    p_followed_id: followedId,
  });

  if (error) {
    console.error("unfollowAccount", error);
    throw new Error(error.message);
  }
};

export const useUnfollowAccount = (followedId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowAccount,
    onMutate: async () => {
      // We only care about the isAccountFollowed and getNumberOfFollowing queries
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followedId],
      });

      await queryClient.cancelQueries({
        queryKey: [GET_NUMBER_OF_FOLLOWING_QUERY_KEY, followedId],
      });

      // Snapshot previous values
      const previousIsAccountFollowed = queryClient.getQueryData<boolean>([
        ACCOUNT_FOLLOW_STATUS_QUERY_KEY,
        followedId,
      ]);

      // Optimistically update
      queryClient.setQueryData(
        [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followedId],
        false,
      );

      queryClient.setQueryData(
        [GET_NUMBER_OF_FOLLOWING_QUERY_KEY, followedId],
        (previousData: number) => previousData - 1,
      );

      return previousIsAccountFollowed;
    },
    onError: (_, __, rollback) => {
      queryClient.setQueryData(
        [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followedId],
        rollback,
      );

      queryClient.setQueryData(
        [GET_NUMBER_OF_FOLLOWING_QUERY_KEY, followedId],
        (oldData: number) => oldData + 1,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followedId],
      });

      queryClient.invalidateQueries({
        queryKey: [GET_NUMBER_OF_FOLLOWING_QUERY_KEY, followedId],
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
