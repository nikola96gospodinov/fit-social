import { Tables } from "@/src/types/database.types";

export const getBestSet = (sets?: Tables<"exercise_sets">[]) => {
  if (!sets?.length) return { weight: 0, reps: 0 } as Tables<"exercise_sets">;

  const hasWeight = sets.some((set) => set.weight && set.weight > 0);

  if (!hasWeight) {
    return sets.reduce((prev, current) => {
      return (current.reps ?? 0) > (prev.reps ?? 0) ? current : prev;
    });
  }

  return sets.reduce(
    (prev, current) => {
      const prevEpley = (prev.weight ?? 0) * (1 + (prev.reps ?? 0) / 30);
      const currentEpley =
        (current.weight ?? 0) * (1 + (current.reps ?? 0) / 30);
      return currentEpley > prevEpley ? current : prev;
    },
    { weight: 0, reps: 0 } as Tables<"exercise_sets">,
  );
};
