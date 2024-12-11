import { Tables } from "@/src/types/database.types";
import { format } from "date-fns";

export const groupWorkoutsByYearAndMonth = (
  workouts?: Tables<"workouts">[],
) => {
  if (!workouts || !workouts.length) return [];

  const grouped = new Map<string, Tables<"workouts">[]>();

  for (const workout of workouts) {
    const monthYear = format(new Date(workout.started), "MMMM yyyy");
    const existing = grouped.get(monthYear) || [];
    grouped.set(monthYear, [...existing, workout]);
  }

  const result: (string | Tables<"workouts">)[] = [];
  for (const [monthYear, monthWorkouts] of grouped) {
    result.push(monthYear, ...monthWorkouts);
  }

  return result;
};
