import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const GET_NUMBER_OF_FOLLOWERS_QUERY_KEY = "get-number-of-followers";

const getNumberOfFollowers = async (handle: string) => {
  const { data, error } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("followed_handle", handle);

  if (error) {
    console.error(error);
    throw new Error("Failed to get number of followers");
  }

  return data;
};

export const useGetNumberOfFollowers = (handle: string) => {
  return useQuery({
    queryKey: [GET_NUMBER_OF_FOLLOWERS_QUERY_KEY, handle],
    queryFn: () => getNumberOfFollowers(handle),
  });
};
