import { Tables } from "@/src/types/database.types";

export const getBestSet = (sets?: Tables<"exercise_sets">[]) => {
  return sets?.reduce(
    (prev, current) => {
      const prevEpley = (prev.weight ?? 0) * (1 + (prev.reps ?? 0) / 30);
      const currentEpley =
        (current.weight ?? 0) * (1 + (current.reps ?? 0) / 30);
      return currentEpley > prevEpley ? current : prev;
    },
    { weight: 0, reps: 0 } as Tables<"exercise_sets">,
  );
};
