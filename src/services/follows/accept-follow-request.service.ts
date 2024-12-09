import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACCOUNT_FOLLOW_STATUS_QUERY_KEY } from "./keys";
import { Enums } from "@/src/types/database.types";

const acceptFollowRequest = async (followerId: string) => {
  const { error } = await supabase.rpc("accept_follow_request", {
    p_follower_id: followerId,
  });

  if (error) {
    console.error("acceptFollowRequest", error);
    throw new Error("Failed to accept follow request");
  }

  return followerId;
};

export const useAcceptFollowRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptFollowRequest,
    onMutate: async (followerId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followerId],
      });

      // Snapshot the previous value
      const previousFollowStatus = queryClient.getQueryData<
        Enums<"follow_status">
      >([ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followerId]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followerId],
        "accepted",
      );

      return { previousFollowStatus };
    },
    onError: (_, followerId, rollback) => {
      queryClient.setQueryData(
        [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followerId],
        rollback,
      );
    },
    onSettled: (_, followerId) => {
      queryClient.invalidateQueries({
        queryKey: [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followerId],
      });
    },
    onSuccess: (_, followerId) => {
      queryClient.invalidateQueries({
        queryKey: [ACCOUNT_FOLLOW_STATUS_QUERY_KEY, followerId],
      });
    },
  });
};
