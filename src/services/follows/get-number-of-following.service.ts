import { supabase } from "@/src/lib/supabase";
import { getProfile } from "../profile/get-profile.service";
import { useQuery } from "@tanstack/react-query";
import { GET_NUMBER_OF_FOLLOWING_QUERY_KEY } from "./keys";

const getNumberOfFollowing = async (id?: string | null) => {
  let followerId = id;

  if (!followerId) {
    const data = await getProfile();

    followerId = data?.id;
  }

  const { error, count } = await supabase
    .from("follows")
    .select("id", { count: "exact" })
    .match({ follower_id: followerId!, status: "accepted" });

  if (error) {
    console.error("getNumberOfFollowing", error);
    throw new Error("Failed to get number of following");
  }

  return count;
};

export const useGetNumberOfFollowing = (id?: string | null) => {
  return useQuery({
    queryKey: [GET_NUMBER_OF_FOLLOWING_QUERY_KEY, id],
    queryFn: () => getNumberOfFollowing(id),
  });
};
