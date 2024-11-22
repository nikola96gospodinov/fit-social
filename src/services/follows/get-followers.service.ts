import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const GET_FOLLOWERS_QUERY_KEY = "get-followers";

const getFollowers = async (id: string) => {
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("followed_id", id);

  if (error) {
    console.error(error);
    throw new Error("Failed to get followers");
  }

  return data;
};

export const useGetFollowers = (id: string) => {
  return useQuery({
    queryKey: [GET_FOLLOWERS_QUERY_KEY, id],
    queryFn: () => getFollowers(id),
  });
};
