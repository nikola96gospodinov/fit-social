import { supabase } from "@/src/lib/supabase/index";
import { useQuery } from "@tanstack/react-query";

const WORKOUT_PRS_QUERY_KEY = "workout-prs";

type Props = {
  ended: string;
  workoutId: string;
  handle: string;
};

const getWorkoutPRs = async ({ ended, workoutId, handle }: Props) => {
  const { data, error } = await supabase.rpc("get_workout_prs", {
    current_workout_id: workoutId,
    handle,
    current_workout_ended: ended,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const useGetWorkoutPRs = ({ ended, workoutId, handle }: Props) => {
  return useQuery({
    queryKey: [WORKOUT_PRS_QUERY_KEY, ended, workoutId, handle],
    queryFn: () => getWorkoutPRs({ ended, workoutId, handle }),
  });
};
