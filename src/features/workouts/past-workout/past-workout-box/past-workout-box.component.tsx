import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { spacing } from "@/src/constants/spacing.constants";
import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, Pressable } from "react-native";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { useGetWorkoutExercises } from "@/src/services/workout/get-workout-exercises.service";
import { ExerciseRow } from "./exercise-row/exercise-row.component";
import { useGetAlternativeTitle } from "./hooks/use-get-alternative-title";
import { EditWorkoutIcon } from "./edit-workout-icon/edit-workout-icon.component";
import { Poster } from "./poster/poster.component";
import { router, usePathname } from "expo-router";
import { WorkoutStats } from "@/src/features/workouts/past-workout/workout-stats/workout-stats.component";
import { useGetSession } from "@/src/services/auth/get-session.service";
import { Actions } from "./actions/actions.component";
import { Likes } from "./likes/likes.component";

type Props = {
  workout: Tables<"workouts">;
};

export const PastWorkoutBox = ({ workout }: Props) => {
  const { data: workoutExercises } = useGetWorkoutExercises(workout.id);

  const pathname = usePathname();
  const tab = pathname.includes("profile") ? "profile" : "(index)";

  const { data: session } = useGetSession();
  const isYourWorkout = workout.user_id === session?.user.id;

  const alternativeTitle = useGetAlternativeTitle(
    workout.ended,
    workoutExercises,
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          router.push(`/${tab}/view-workout/${workout.id}`);
        }}>
        <Flex direction="row" justify="space-between">
          <Poster workout={workout} />

          {isYourWorkout && (
            <View style={styles.editIconContainer}>
              <EditWorkoutIcon workout={workout} />
            </View>
          )}
        </Flex>

        <VerticalSpacing size={2} />

        <WorkoutStats workout={workout} />

        <VerticalSpacing size={4} />

        <ThemedText style={{ fontWeight: "500" }}>
          {workout.title || alternativeTitle}
        </ThemedText>

        <VerticalSpacing size={3} />

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

        <VerticalSpacing size={4} />
      </Pressable>

      <Actions workoutId={workout.id} />

      <Likes workoutId={workout.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    marginHorizontal: spacing[4],
  },

  editIconContainer: {
    transform: [{ translateX: -spacing[1] }, { translateY: spacing[1] }],
  },
});
