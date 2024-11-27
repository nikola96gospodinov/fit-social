import { supabase } from "@/src/lib/supabase";
import { getFollowing } from "../follows/get-following.service";
import { useQuery } from "@tanstack/react-query";

export const GET_WORKOUTS_FOR_FEED_QUERY_KEY = "getWorkoutsForFeed";

const getWorkoutsForFeed = async () => {
  const following = await getFollowing();

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .in(
      "user_id",
      following.map((follow) => follow.profiles?.id),
    );

  if (error) {
    console.error("getWorkoutsForFeed", error);
    throw new Error(error.message);
  }

  return data;
};

export const useGetWorkoutsForFeed = () => {
  return useQuery({
    queryKey: [GET_WORKOUTS_FOR_FEED_QUERY_KEY],
    queryFn: getWorkoutsForFeed,
  });
};
