import { supabase } from "@/src/lib/supabase";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { getSession } from "../auth/get-session.service";
import { useMutation } from "@tanstack/react-query";

const addWorkout = async () => {
  const session = await getSession();

  const { exercises, started } = useActiveWorkoutStore.getState();

  const { data, error } = await supabase.from("workouts").insert({
    started: started?.toISOString() ?? new Date().toISOString(),
    exercises: exercises,
    user_handle: session!.user.id,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const useAddWorkout = () => {
  const { resetWorkout } = useActiveWorkoutStore();

  return useMutation({
    mutationFn: addWorkout,
    onSuccess: resetWorkout,
  });
};
