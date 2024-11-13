import { supabase } from "@/src/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

type Props = {
  workoutId: string;
  workoutTitle: string;
  workoutStarted: string;
  workoutEnded: string;
  exercisesData: string;
  setsData: string;
};

const editWorkout = async ({
  workoutId,
  workoutTitle,
  workoutStarted,
  workoutEnded,
  exercisesData,
  setsData,
}: Props) => {
  const { error } = await supabase.rpc("update_workout", {
    p_workout_id: workoutId,
    p_workout_title: workoutTitle,
    p_workout_started: workoutStarted,
    p_workout_ended: workoutEnded,
    p_exercises_data: exercisesData,
    p_sets_data: setsData,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to edit workout");
  }
};

export const useEditWorkout = () => {
  return useMutation({
    mutationFn: editWorkout,
    onSuccess: () => {
      router.push("/profile");
    },
  });
};
