import { supabase } from "@/src/lib/supabase/index";
import { useQuery } from "@tanstack/react-query";

const WORKOUT_PRS_QUERY_KEY = "workout-prs";

type Props = {
  ended: string;
  workoutId: string;
};

const getWorkoutPRs = async ({ ended, workoutId }: Props) => {
  const { data, error } = await supabase.rpc("get_workout_prs", {
    current_workout_id: workoutId,
    current_workout_ended: ended,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const useGetWorkoutPRs = ({ ended, workoutId }: Props) => {
  return useQuery({
    queryKey: [WORKOUT_PRS_QUERY_KEY, ended, workoutId],
    queryFn: () => getWorkoutPRs({ ended, workoutId }),
  });
};
