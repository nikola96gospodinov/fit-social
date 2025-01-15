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

  const muscleGroups = (() => {
    if (!exercises) return "";

    const muscleGroups = uniq(
      exercises?.map((exercise) => exercise.muscle_group_name),
    );

    if (muscleGroups.length === 1) return capitalize(muscleGroups[0]);

    const firstMuscleGroups = muscleGroups.slice(0, -1);
    const lastMuscleGroup = muscleGroups.slice(-1)[0];

    return `${capitalize(firstMuscleGroups.join(", "))} & ${lastMuscleGroup}`;
  })();

  const dayOfWeek = format(new Date(ended), "EEEE");

  const alternativeTitle = muscleGroups
    ? `${muscleGroups} workout`
    : `${dayOfWeek} workout`;

  return alternativeTitle;
};
