import { View } from "react-native";
import { Tables } from "@/src/types/database.types";
import { useGetExerciseSets } from "@/src/services/workout/get-exercise-sets.service";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { Set } from "./set/set.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { useGetWorkoutPRs } from "@/src/services/workout/get-workout-prs.service";
import { getBestSet } from "@/src/features/workouts/utils/get-best-set.utils";
import { MEASUREMENT_TYPE } from "@/src/constants/workout.constants";

type Props = {
  exercise: Tables<"workout_exercises"> & {
    exercises: Tables<"exercises"> | null;
  };
  isLast: boolean;
  workout: Tables<"workouts">;
};

export const ExerciseWithSetsBox = ({ exercise, isLast, workout }: Props) => {
  const { data: exerciseSets } = useGetExerciseSets(exercise.id);

  const { data: workoutPRs } = useGetWorkoutPRs({
    ended: workout.ended,
    workoutId: workout.id,
  });

  const hasExercisePRs = workoutPRs?.some((pr) =>
    exerciseSets?.some((set) => set.id === pr.set_id),
  );
  const bestSet = getBestSet({
    sets: exerciseSets,
    measurementType: exercise.exercises?.measurement_type,
  });

  const showOneRMorPace =
    exercise.exercises?.measurement_type ===
      MEASUREMENT_TYPE.REPS_AND_ADDED_WEIGHT ||
    exercise.exercises?.measurement_type === MEASUREMENT_TYPE.TIME_AND_DISTANCE;
  const text =
    exercise.exercises?.measurement_type ===
    MEASUREMENT_TYPE.REPS_AND_ADDED_WEIGHT
      ? "1RM"
      : "Pace";

  return (
    <View>
      <Flex direction="row" justify="space-between">
        <ThemedText type="small" numberOfLines={1} ellipsizeMode="tail">
          {exercise.exercises?.name}
        </ThemedText>

        {showOneRMorPace && <ThemedText type="small">{text}</ThemedText>}
      </Flex>

      <VerticalSpacing size={1} />

      {exerciseSets?.map((set, index) => {
        const isPR =
          hasExercisePRs && workoutPRs?.some((pr) => pr.set_id === set.id);
        const isBestSet = bestSet?.id === set.id;

        return (
          <Set
            set={set}
            index={index}
            isLast={index === (exerciseSets?.length ?? 0) - 1}
            key={set.id}
            isPR={isPR}
            isBestSet={hasExercisePRs ? false : isBestSet}
            measurementType={exercise.exercises?.measurement_type}
          />
        );
      })}

      {!isLast && <VerticalSpacing size={3} />}
    </View>
  );
};
