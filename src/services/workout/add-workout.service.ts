import { supabase } from "@/src/lib/supabase";
import type { State as Workout } from "@/src/store/active-workout-store";
import { getSession } from "../auth/get-session.service";

const addWorkout = async (workout: Workout) => {
  const session = await getSession();

  const { data, error } = await supabase.from("workouts").insert({
    started: workout.started?.toISOString(),
    ended: new Date().toISOString(),
    exercises: workout.exercises,
    user_id: session!.user.id,
  });

  if (error) throw new Error(error.message);

  return data;
};
