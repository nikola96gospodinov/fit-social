import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetWorkoutExercises } from "@/src/services/workout/get-workout-exercises.service";
import { ExerciseRow } from "./exercise-row/exercise-row.component";
import { useGetAlternativeTitle } from "./hooks/use-get-alternative-title";
import { EditWorkoutIcon } from "./edit-workout-icon/edit-workout-icon.component";
import { useIsOwnProfile } from "@/src/hooks/use-is-own-profile";
import { Poster } from "./poster/poster.component";
import { WorkoutStats } from "./workout-stats/workout-stats.component";

type Props = {
  workout: Tables<"workouts">;
};

export const PastWorkoutBox = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: workoutExercises } = useGetWorkoutExercises(workout.id);

  const isYourProfile = useIsOwnProfile();

  const alternativeTitle = useGetAlternativeTitle(
    workout.ended,
    workoutExercises,
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[theme].cardBackground },
      ]}>
      <Flex direction="row" justify="space-between">
        <Poster workout={workout} />

        {isYourProfile && (
          <View style={styles.editIconContainer}>
            <EditWorkoutIcon workout={workout} />
          </View>
        )}
      </Flex>

      <ThemedText style={{ fontWeight: "500" }}>
        {workout.title || alternativeTitle}
      </ThemedText>

      <VerticalSpacing size={2} />

      <WorkoutStats workout={workout} />

      <VerticalSpacing size={6} />

      {workoutExercises?.map((exercise, index) => {
        return (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            index={index}
            exercisesLength={workoutExercises.length}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[3],
    borderRadius: 16,
    marginHorizontal: spacing[4],
  },

  editIconContainer: {
    transform: [{ translateX: -spacing[1] }, { translateY: spacing[1] }],
  },
});
