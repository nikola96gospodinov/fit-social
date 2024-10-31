import { supabase } from "@/src/lib/supabase";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useMutation } from "@tanstack/react-query";
import { getOwnProfile } from "../profile/get-own-profile.service";

const addWorkout = async () => {
  console.log("Adding workout");

  const profile = await getOwnProfile();
  const { exercises, started, sets } = useActiveWorkoutStore.getState();

  const { error } = await supabase.rpc("add_workout_with_exercises_and_sets", {
    p_started: started?.toISOString() ?? new Date().toISOString(),
    p_user_handle: String(profile.handle),
    p_exercises: exercises,
    p_sets: sets,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const useAddWorkout = () => {
  const { resetWorkout } = useActiveWorkoutStore();

  return useMutation({
    mutationFn: addWorkout,
    onSuccess: resetWorkout,
  });
};
