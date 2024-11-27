import { supabase } from "@/src/lib/supabase/index";
import { useQuery } from "@tanstack/react-query";

const WORKOUT_PRS_QUERY_KEY = "workout-prs";

type Props = {
  ended: string;
  workoutId: string;
  userId: string;
};

const getWorkoutPRs = async ({ ended, workoutId, userId }: Props) => {
  const { data, error } = await supabase.rpc("get_workout_prs", {
    current_workout_id: workoutId,
    p_user_id: userId,
    current_workout_ended: ended,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const useGetWorkoutPRs = ({ ended, workoutId, userId }: Props) => {
  return useQuery({
    queryKey: [WORKOUT_PRS_QUERY_KEY, ended, workoutId, userId],
    queryFn: () => getWorkoutPRs({ ended, workoutId, userId }),
  });
};
