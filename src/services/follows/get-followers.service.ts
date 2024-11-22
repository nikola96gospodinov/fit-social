import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const GET_FOLLOWERS_QUERY_KEY = "get-followers";

const getFollowers = async (handle: string) => {
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("followed_handle", handle);

  if (error) {
    console.error(error);
    throw new Error("Failed to get followers");
  }

  return data;
};

export const useGetFollowers = (handle: string) => {
  return useQuery({
    queryKey: [GET_FOLLOWERS_QUERY_KEY, handle],
    queryFn: () => getFollowers(handle),
  });
};
