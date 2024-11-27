import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { WORKOUT_QUERY_KEY } from "./profile-keys";

type Props = {
  userId?: string | null;
};

const getWorkouts = async ({ userId }: Props) => {
  const { data, error, count } = await supabase
    .from("workouts")
    .select("*", { count: "exact" })
    .eq("user_id", userId ?? "")
    .order("started", { ascending: false });

  if (error) throw new Error(error.message);

  return { data, count };
};

export const useGetWorkouts = ({ userId }: Props) => {
  return useQuery({
    queryKey: [WORKOUT_QUERY_KEY, userId],
    queryFn: () => getWorkouts({ userId }),
    enabled: !!userId,
  });
};
