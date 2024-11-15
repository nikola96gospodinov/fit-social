import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const GET_NUMBER_OF_FOLLOWING_QUERY_KEY = "get-number-of-following";
const getNumberOfFollowing = async (handle: string) => {
  const { data, error } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_handle", handle);

  if (error) {
    console.error(error);
    throw new Error("Failed to get number of following");
  }

  return data;
};

export const useGetNumberOfFollowing = (handle: string) => {
  return useQuery({
    queryKey: [GET_NUMBER_OF_FOLLOWING_QUERY_KEY, handle],
    queryFn: () => getNumberOfFollowing(handle),
  });
};
