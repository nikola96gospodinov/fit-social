import { useGetExercisesByMultipleIds } from "@/src/services/exercises/get-exercises-by-multiple-ids.service";
import { Tables } from "@/src/types/database.types";
import { capitalize } from "lodash";

export const useGetAlternativeTitle = (
  workoutExercises?: Tables<"workout_exercises">[],
) => {
  const exerciseIds = workoutExercises?.map((exercise) => exercise.exercise_id);

  const { data: exercises } = useGetExercisesByMultipleIds(exerciseIds);

  const bodyParts = capitalize(
    exercises?.map((exercise) => exercise.bodyPart).join(", "),
  );

  const alternativeTitle = bodyParts
    ? `${bodyParts} workout`
    : "Untitled workout";

  return alternativeTitle;
};
