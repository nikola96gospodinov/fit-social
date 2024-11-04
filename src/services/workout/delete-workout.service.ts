import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { WORKOUT_QUERY_KEY } from "./profile-keys";
import { router } from "expo-router";

export const deleteWorkout = async (workoutId: string) => {
  const { error } = await supabase
    .from("workouts")
    .delete()
    .eq("id", workoutId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const useDeleteWorkout = (handle?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY, handle] });
      router.push(`/profile`);
    },
  });
};
