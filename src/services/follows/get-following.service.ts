import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../profile/get-profile.service";

const GET_FOLLOWING_QUERY_KEY = "get-following";

export const getFollowing = async (handle?: string | null) => {
  let followingHandle = handle;

  if (!followingHandle) {
    const data = await getProfile();

    followingHandle = data?.handle;
  }

  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("following_handle", followingHandle!);

  if (error) {
    console.error(error);
    throw new Error("Failed to get following");
  }

  return data;
};

export const useGetFollowing = (handle?: string | null) => {
  return useQuery({
    queryKey: [GET_FOLLOWING_QUERY_KEY, handle],
    queryFn: () => getFollowing(handle),
  });
};
