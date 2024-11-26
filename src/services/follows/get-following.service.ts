import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../profile/get-profile.service";
import { GET_FOLLOWING_QUERY_KEY } from "./keys";

export const getFollowing = async (id?: string | null) => {
  let followerId = id;

  if (!followerId) {
    const data = await getProfile();

    followerId = data?.id;
  }

  const { data, error } = await supabase
    .from("follows")
    .select("*, profiles(*)")
    .match({ follower_id: followerId!, status: "accepted" });

  if (error) {
    console.error(error);
    throw new Error("Failed to get following");
  }

  return data;
};

export const useGetFollowing = (id?: string | null) => {
  return useQuery({
    queryKey: [GET_FOLLOWING_QUERY_KEY, id],
    queryFn: () => getFollowing(id),
  });
};
