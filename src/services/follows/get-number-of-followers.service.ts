import { supabase } from "@/src/lib/supabase";
import { getProfile } from "../profile/get-profile.service";
import { useQuery } from "@tanstack/react-query";

const GET_NUMBER_OF_FOLLOWERS_QUERY_KEY = "get-number-of-followers";

const getNumberOfFollowers = async (id?: string | null) => {
  let followedId = id;

  if (!followedId) {
    const data = await getProfile();

    followedId = data?.id;
  }

  const { error, count } = await supabase
    .from("follows")
    .select("id", { count: "exact" })
    .match({ followed_id: followedId!, status: "accepted" });

  if (error) {
    console.error("getNumberOfFollowers", error);
    throw new Error("Failed to get number of followers");
  }

  return count;
};

export const useGetNumberOfFollowers = (id?: string | null) => {
  return useQuery({
    queryKey: [GET_NUMBER_OF_FOLLOWERS_QUERY_KEY, id],
    queryFn: () => getNumberOfFollowers(id),
  });
};
