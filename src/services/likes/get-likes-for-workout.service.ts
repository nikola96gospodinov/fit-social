import { supabase } from "@/src/lib/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GET_LIKES_FOR_WORKOUT_QUERY_KEY } from "./keys";

type Props = {
  workoutId: string;
  pageParam?: number;
  pageSize?: number;
};

const getLikesForWorkout = async ({
  workoutId,
  pageParam = 0,
  pageSize = 25,
}: Props) => {
  const { data, error } = await supabase
    .from("likes")
    .select("*, profiles(*)")
    .eq("workout_id", workoutId)
    .order("created_at", { ascending: false })
    .range(pageParam * pageSize, (pageParam + 1) * pageSize - 1);

  if (error) {
    console.error("getLikesForWorkout", error);
    throw new Error("Failed to get likes for workout");
  }

  return {
    items: data,
    nextPage: data.length === pageSize ? pageParam + 1 : undefined,
  };
};

export const useGetInfiniteLikesForWorkout = (workoutId: string) => {
  return useInfiniteQuery({
    queryKey: [GET_LIKES_FOR_WORKOUT_QUERY_KEY, workoutId],
    queryFn: ({ pageParam }) => getLikesForWorkout({ workoutId, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
