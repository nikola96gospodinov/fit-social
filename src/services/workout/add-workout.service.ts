import { supabase } from "@/src/lib/supabase";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useMutation } from "@tanstack/react-query";
import { getOwnProfile } from "../profile/get-own-profile.service";

const addWorkout = async () => {
  const profile = await getOwnProfile();

  const { exercises, started } = useActiveWorkoutStore.getState();

  const { data, error } = await supabase.from("workouts").insert({
    started: started?.toISOString() ?? new Date().toISOString(),
    exercises: exercises,
    user_handle: String(profile.handle),
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
