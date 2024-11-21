import { View } from "react-native";
import { Tables } from "@/src/types/database.types";
import { useGetExerciseSets } from "@/src/services/workout/get-exercise-sets.service";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { capitalize } from "lodash";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { Set } from "./set/set.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { useGetWorkoutPRs } from "@/src/services/workout/get-workout-prs.service";

type Props = {
  exercise: Tables<"workout_exercises">;
  isLast: boolean;
  workout: Tables<"workouts">;
};

export const ExerciseWithSetsBox = ({ exercise, isLast, workout }: Props) => {
  const { data: exerciseSets } = useGetExerciseSets(exercise.id);

  const { data: workoutPRs } = useGetWorkoutPRs({
    ended: workout.ended,
    workoutId: workout.id,
    handle: workout.user_handle,
  });

  return (
    <View>
      <Flex direction="row" justify="space-between">
        <ThemedText type="small" numberOfLines={1} ellipsizeMode="tail">
          {capitalize(exercise.name)}
        </ThemedText>

        <ThemedText type="small">1RM</ThemedText>
      </Flex>

      <VerticalSpacing size={1} />

      {exerciseSets?.map((set, index) => (
        <Set
          set={set}
          index={index}
          isLast={index === (exerciseSets?.length ?? 0) - 1}
          key={set.id}
          isPR={workoutPRs?.some((pr) => pr.set_id === set.id)}
        />
      ))}

      {!isLast && <VerticalSpacing size={3} />}
    </View>
  );
};
