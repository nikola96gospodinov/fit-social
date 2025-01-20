import { supabase } from "@/src/lib/supabase";
import { getWorkoutExercises } from "./get-workout-exercises.service";
import { useQuery } from "@tanstack/react-query";
import { WORKOUT_SETS_QUERY_KEY } from "./profile-keys";

const getWorkoutSets = async (workoutId: string) => {
  const exercises = await getWorkoutExercises(workoutId);

  const exerciseIds = exercises.map((exercise) => exercise.id);

  const { data, error } = await supabase
    .from("exercise_sets")
    .select("*")
    .in("workout_exercise_id", exerciseIds);

  if (error) {
    console.error("getWorkoutSets", error);
    throw new Error(error.message);
  }

  const sets = data.map((set) => {
    const exercise = exercises.find(
      (exercise) => exercise.id === set.workout_exercise_id,
    );

    return {
      ...set,
      exercise_id: exercise!.exercise_id,
    };
  });

  return sets;
};

export const useGetWorkoutSets = (workoutId: string) => {
  return useQuery({
    queryKey: [WORKOUT_SETS_QUERY_KEY, workoutId],
    queryFn: () => getWorkoutSets(workoutId),
  });
};
