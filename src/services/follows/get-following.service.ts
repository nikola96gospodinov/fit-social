import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../profile/get-profile.service";

const GET_FOLLOWING_QUERY_KEY = "get-following";

export const getFollowing = async (id?: string | null) => {
  let followingId = id;

  if (!followingId) {
    const data = await getProfile();

    followingId = data?.id;
  }

  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("following_id", followingId!);

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
