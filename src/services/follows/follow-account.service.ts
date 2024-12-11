import { supabase } from "@/src/lib/supabase";
import { Tables } from "@/src/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GET_FOLLOWING_QUERY_KEY,
  ACCOUNT_FOLLOW_STATUS_QUERY_KEY,
  GET_NUMBER_OF_FOLLOWING_QUERY_KEY,
} from "./keys";
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
        true,
      );

      queryClient.setQueryData(
        [GET_NUMBER_OF_FOLLOWING_QUERY_KEY, followedId],
        (previousData: number) => previousData + 1,
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
        (oldData: number) => oldData - 1,
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
