import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { slate } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, useColorScheme, Pressable } from "react-native";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetWorkoutExercises } from "@/src/services/workout/get-workout-exercises.service";
import { ExerciseRow } from "./exercise-row/exercise-row.component";
import { useGetAlternativeTitle } from "./hooks/use-get-alternative-title";
import { EditWorkoutIcon } from "./edit-workout-icon/edit-workout-icon.component";
import { Poster } from "./poster/poster.component";
import { router } from "expo-router";
import { WorkoutStats } from "@/src/features/workouts/past-workout/workout-stats/workout-stats.component";
import { LinearGradient } from "expo-linear-gradient";
import { useGetSession } from "@/src/services/auth/get-session.service";

const profileBackground = {
  light: [slate[200], slate[100]],
  dark: [slate[800], slate[900]],
};

type Props = {
  workout: Tables<"workouts">;
};

export const PastWorkoutBox = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: workoutExercises } = useGetWorkoutExercises(workout.id);

  const { data: session } = useGetSession();
  const isYourWorkout = workout.user_id === session?.user.id;

  const alternativeTitle = useGetAlternativeTitle(
    workout.ended,
    workoutExercises,
  );

  return (
    <Pressable
      onPress={() => {
        router.push(`/profile/view-workout/${workout.id}`);
      }}>
      <LinearGradient
        colors={profileBackground[theme]}
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}>
        <Flex direction="row" justify="space-between">
          <Poster workout={workout} />

          {isYourWorkout && (
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
      </LinearGradient>
    </Pressable>
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
