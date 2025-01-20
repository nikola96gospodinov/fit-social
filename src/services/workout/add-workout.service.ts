import { supabase } from "@/src/lib/supabase";
import {
  ActiveExercise,
  ActiveSet,
  useActiveWorkoutStore,
} from "@/src/store/active-workout-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WORKOUT_QUERY_KEY } from "./profile-keys";
import { useExerciseFilterStore } from "@/src/store/exercise-filter-store";
import { getProfile } from "../profile/get-profile.service";
import { convertTimeToSeconds } from "@/src/utils/dates.utils";

type AddWorkoutProps = {
  exercises: ActiveExercise[];
  started?: Date;
  sets: ActiveSet[];
  title: string;
};

const addWorkout = async ({
  exercises,
  started,
  sets,
  title,
}: AddWorkoutProps) => {
  const profile = await getProfile();

  const filteredSets = sets.map((set) => ({
    ...set,
    reps: set.reps ? parseInt(set.reps) : null,
    weight: set.weight ? parseFloat(set.weight) : null,
    time: set.time ? convertTimeToSeconds(set.time) : null,
    distance: set.distance ? parseFloat(set.distance) : null,
  }));

  const { error } = await supabase.rpc("add_workout_with_exercises_and_sets", {
    p_started: started?.toISOString() ?? new Date().toISOString(),
    p_exercises: exercises,
    p_sets: filteredSets,
    p_title: title,
  });

  if (error) {
    console.error("Error adding workout", error);
    throw new Error(error.message);
  }

  return profile.id;
};

export const useAddWorkout = () => {
  const {
    store: { resetWorkout },
  } = useActiveWorkoutStore();
  const { clearFilters } = useExerciseFilterStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addWorkout,
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: [WORKOUT_QUERY_KEY, id],
      });

      resetWorkout();
      clearFilters();
    },
  });
};
