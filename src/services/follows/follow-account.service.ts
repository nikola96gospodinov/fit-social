import { supabase } from "@/src/lib/supabase";
import { Tables } from "@/src/types/database.types";
import { useMutation } from "@tanstack/react-query";

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

export const useFollowAccount = () => {
  return useMutation({
    mutationFn: followAccount,
  });
};
