import { supabase } from "@/src/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const WORKOUT_QUERY_KEY = "workouts";

type Props = {
  handle?: string | null;
};

const getWorkouts = async ({ handle }: Props) => {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_handle", handle ?? "");

  if (error) throw new Error(error.message);

  return data;
};

export const useGetWorkouts = ({ handle }: Props) => {
  return useQuery({
    queryKey: [WORKOUT_QUERY_KEY, handle],
    queryFn: () => getWorkouts({ handle }),
    enabled: !!handle,
  });
};
