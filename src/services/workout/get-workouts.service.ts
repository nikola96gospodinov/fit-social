import { supabase } from "@/src/lib/supabase";
import { useInfiniteQuery } from "@tanstack/react-query";
import { WORKOUT_QUERY_KEY } from "./profile-keys";

type Props = {
  userId?: string | null;
  limit: number;
  page: number;
};

const getWorkouts = async ({ userId, limit, page }: Props) => {
  const { data, error, count } = await supabase
    .from("workouts")
    .select("*", { count: "exact" })
    .eq("user_id", userId ?? "")
    .order("started", { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) throw new Error(error.message);

  return {
    workouts: data,
    nextPage: data.length === limit ? page + 1 : undefined,
    count,
  };
};

export const useGetInfiniteWorkouts = ({
  userId,
}: Omit<Props, "limit" | "page">) => {
  return useInfiniteQuery({
    queryKey: [WORKOUT_QUERY_KEY, userId],
    queryFn: ({ pageParam }) =>
      getWorkouts({ userId, limit: 25, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    enabled: !!userId,
  });
};
