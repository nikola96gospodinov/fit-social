import { useGetExercisesByMultipleIds } from "@/src/services/exercises/get-exercises-by-multiple-ids.service";
import { Tables } from "@/src/types/database.types";
import { capitalize, uniq } from "lodash";
import { format } from "date-fns";

export const useGetAlternativeTitle = (
  ended: string,
  workoutExercises?: Tables<"workout_exercises">[],
) => {
  const exerciseIds = workoutExercises?.map((exercise) => exercise.exercise_id);

  const { data: exercises } = useGetExercisesByMultipleIds(exerciseIds);

  const bodyParts = (() => {
    if (!exercises) return "";

    const bodyParts = uniq(exercises?.map((exercise) => exercise.bodyPart));

    if (bodyParts.length === 1) return capitalize(bodyParts[0]);

    const firstBodyParts = bodyParts.slice(0, -1);
    const lastBodyPart = bodyParts.slice(-1)[0];

    return `${capitalize(firstBodyParts.join(", "))} & ${lastBodyPart}`;
  })();

  const dayOfWeek = format(new Date(ended), "EEEE");

  const alternativeTitle = bodyParts
    ? `${bodyParts} workout`
    : `${dayOfWeek} workout`;

  return alternativeTitle;
};
