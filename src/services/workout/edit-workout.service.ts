import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  EXERCISE_SETS_QUERY_KEY,
  WORKOUT_EXERCISES_QUERY_KEY,
  WORKOUT_QUERY_KEY,
  WORKOUT_SETS_QUERY_KEY,
} from "./profile-keys";
import { ActiveExercise, ActiveSet } from "@/src/store/active-workout-store";
import { convertTimeToSeconds } from "@/src/utils/dates.utils";

type Props = {
  workoutId: string;
  workoutTitle: string;
  workoutStarted: string;
  workoutEnded: string;
  exercisesData: ActiveExercise[];
  setsData: ActiveSet[];
};

const editWorkout = async ({
  workoutId,
  workoutTitle,
  workoutStarted,
  workoutEnded,
  exercisesData,
  setsData,
}: Props) => {
  const formattedSetsData = setsData.map((set) => ({
    ...set,
    reps: set.reps ? parseInt(set.reps) : null,
    weight: set.weight ? parseFloat(set.weight) : null,
    time: set.time ? convertTimeToSeconds(set.time) : null,
    distance: set.distance ? parseFloat(set.distance) : null,
  }));

  const { error } = await supabase.rpc("update_workout", {
    p_workout_id: workoutId,
    p_workout_title: workoutTitle,
    p_workout_started: workoutStarted,
    p_workout_ended: workoutEnded,
    p_exercises_data: exercisesData,
    p_sets_data: formattedSetsData,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to edit workout");
  }

  return {
    workoutId,
    exerciseIds: exercisesData.map((exercise) => exercise.id),
  };
};

export const useEditWorkout = (userId?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editWorkout,
    onSuccess: ({ workoutId, exerciseIds }) => {
      // Workout
      queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY, userId] });

      // Exercises
      queryClient.invalidateQueries({
        queryKey: [WORKOUT_EXERCISES_QUERY_KEY, workoutId],
      });

      // Sets
      queryClient.invalidateQueries({
        queryKey: [WORKOUT_SETS_QUERY_KEY, workoutId],
      });
      for (let i = 0; i < exerciseIds.length; i++) {
        queryClient.invalidateQueries({
          queryKey: [EXERCISE_SETS_QUERY_KEY, exerciseIds[i]],
        });
      }

      router.push("/profile");
    },
  });
};
