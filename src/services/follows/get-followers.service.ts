import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../profile/get-profile.service";

const GET_FOLLOWERS_QUERY_KEY = "get-followers";

const getFollowers = async (id?: string | null) => {
  let followedId = id;

  if (!followedId) {
    const data = await getProfile();

    followedId = data?.id;
  }

  const { data, error } = await supabase
    .from("follows")
    .select("*, profiles(*)")
    .match({ followed_id: followedId!, status: "accepted" });

  if (error) {
    console.error(error);
    throw new Error("Failed to get followers");
  }

  return data;
};

export const useGetFollowers = (id?: string | null) => {
  return useQuery({
    queryKey: [GET_FOLLOWERS_QUERY_KEY, id],
    queryFn: () => getFollowers(id),
  });
};
