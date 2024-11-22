import { supabase } from "@/src/lib/supabase";
import { Tables } from "@/src/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IS_ACCOUNT_FOLLOWED_QUERY_KEY } from "./keys";

const followAccount = async (profileToFollow: Tables<"profiles">) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("followAccount", userError);
    throw new Error(userError.message);
  }

  if (profileToFollow.is_public) {
    const { error } = await supabase.from("follows").insert({
      follower_id: userData.user?.id,
      followed_id: profileToFollow.id,
      status: "accepted",
      accepted_at: new Date().toISOString(),
    });

    if (error) {
      console.error("followAccount", error);
      throw new Error(error.message);
    }

    return;
  }

  const { error } = await supabase.from("follows").insert({
    follower_id: userData.user?.id,
    followed_id: profileToFollow.id,
    status: "pending",
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [IS_ACCOUNT_FOLLOWED_QUERY_KEY, followedId],
      });
    },
  });
};
