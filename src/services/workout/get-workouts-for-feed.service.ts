import { supabase } from "@/src/lib/supabase";
import { getFollowing } from "../follows/get-following.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const GET_WORKOUTS_FOR_FEED_QUERY_KEY = "getWorkoutsForFeed";

type Props = {
  limit: number;
  page: number;
};

const getWorkoutsForFeed = async ({ limit, page }: Props) => {
  const following = await getFollowing();

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .in(
      "user_id",
      following.map((follow) => follow.profiles?.id),
    )
    .order("ended", { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    console.error("getWorkoutsForFeed", error);
    throw new Error(error.message);
  }

  return {
    workouts: data,
    nextPage: data.length === limit ? page + 1 : undefined,
  };
};

export const useGetInfiniteWorkoutsForFeed = () => {
  return useInfiniteQuery({
    queryKey: [GET_WORKOUTS_FOR_FEED_QUERY_KEY],
    queryFn: ({ pageParam }) =>
      getWorkoutsForFeed({ limit: 25, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
