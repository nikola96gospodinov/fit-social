import { supabase } from "@/src/lib/supabase";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getOwnProfile } from "../profile/get-own-profile.service";
import { WORKOUT_QUERY_KEY } from "./profile-keys";
import { useExerciseFilterStore } from "@/src/store/exercise-filter-store";

const addWorkout = async () => {
  const profile = await getOwnProfile();
  const { exercises, started, sets, title } = useActiveWorkoutStore.getState();

  // We don't want to save sets that have no reps or are not done
  const filteredSets = sets.filter(
    (set) => set.reps && set.reps > 0 && set.is_done,
  );

  const { error } = await supabase.rpc("add_workout_with_exercises_and_sets", {
    p_started: started?.toISOString() ?? new Date().toISOString(),
    p_user_handle: String(profile.handle),
    p_exercises: exercises,
    p_sets: filteredSets,
    p_title: title,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return profile.handle;
};

export const useAddWorkout = () => {
  const { resetWorkout } = useActiveWorkoutStore();
  const { clearFilters } = useExerciseFilterStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addWorkout,
    onSuccess: (handle) => {
      queryClient.invalidateQueries({
        queryKey: [WORKOUT_QUERY_KEY, handle],
      });

      resetWorkout();
      clearFilters();
    },
  });
};
