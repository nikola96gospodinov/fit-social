import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { WORKOUT_QUERY_KEY } from "./profile-keys";

type Props = {
  handle?: string | null;
};

const getWorkouts = async ({ handle }: Props) => {
  const { data, error, count } = await supabase
    .from("workouts")
    .select("*", { count: "exact" })
    .eq("user_handle", handle ?? "")
    .order("started", { ascending: false });

  if (error) throw new Error(error.message);

  return { data, count };
};

export const useGetWorkouts = ({ handle }: Props) => {
  return useQuery({
    queryKey: [WORKOUT_QUERY_KEY, handle],
    queryFn: () => getWorkouts({ handle }),
    enabled: !!handle,
  });
};
