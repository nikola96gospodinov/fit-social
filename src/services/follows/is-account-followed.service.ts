import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { IS_ACCOUNT_FOLLOWED_QUERY_KEY } from "./keys";

const isAccountFollowed = async (followedId: string) => {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("isAccountFollowed", userError);
    throw new Error(userError.message);
  }

  const { data, error } = await supabase
    .from("follows")
    .select("id")
    .match({ follower_id: userData.user?.id, followed_id: followedId });

  if (error) {
    console.error("isAccountFollowed", error);
    throw new Error(error.message);
  }

  return !!data?.length;
};

export const useIsAccountFollowed = (followedId: string) => {
  return useQuery({
    queryKey: [IS_ACCOUNT_FOLLOWED_QUERY_KEY, followedId],
    queryFn: () => isAccountFollowed(followedId),
  });
};
