import { useGetExercisesByMultipleIds } from "@/src/services/exercises/get-exercises-by-multiple-ids.service";
import { Tables } from "@/src/types/database.types";
import { capitalize } from "lodash";
import { format } from "date-fns";

export const useGetAlternativeTitle = (
  ended: string,
  workoutExercises?: Tables<"workout_exercises">[],
) => {
  const exerciseIds = workoutExercises?.map((exercise) => exercise.exercise_id);

  const { data: exercises } = useGetExercisesByMultipleIds(exerciseIds);

  const bodyParts = capitalize(
    exercises?.map((exercise) => exercise.bodyPart).join(", "),
  );

  const dayOfWeek = format(new Date(ended), "EEEE");

  const alternativeTitle = bodyParts
    ? `${bodyParts} workout`
    : `${dayOfWeek} workout`;

  return alternativeTitle;
};
