import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useGetWorkoutExercises } from "@/src/services/workout/get-workout-exercises.service";
import { ExerciseRow } from "./exercise-row/exercise-row.component";
import { useGetAlternativeTitle } from "./hooks/use-get-alternative-title";
import {
  getWorkoutDistance,
  getWorkoutDuration,
} from "./past-workout-box.utils";
import { useGetTotalWeight } from "./hooks/use-get-total-weight";
import { useGetWorkoutPRs } from "@/src/services/workout/get-workout-prs.service";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
import { METRIC } from "../../../edit/edit-profile-form/edit-profile-form.schema";
import { EditWorkoutIcon } from "./edit-workout-icon/edit-workout-icon.component";

type Props = {
  workout: Tables<"workouts">;
};

export const PastWorkoutBox = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: workoutExercises } = useGetWorkoutExercises(workout.id);

  const { data: profile } = useGetProfile();

  const alternativeTitle = useGetAlternativeTitle(
    workout.ended,
    workoutExercises,
  );
  const distance = getWorkoutDistance(workout.started, workout.ended);
  const totalWeight = useGetTotalWeight(workout.id);
  const duration = getWorkoutDuration(workout.started, workout.ended);
  const weightUnit = profile?.measurement_system === METRIC ? "kg" : "lbs";

  const { data: workoutPRs } = useGetWorkoutPRs({
    ended: workout.ended,
    workoutId: workout.id,
    handle: workout.user_handle,
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[theme].cardBackground },
      ]}>
      <Flex justify="space-between" direction="row" gap={2} align="center">
        <View>
          <ThemedText style={{ fontWeight: "500" }}>
            {workout.title || alternativeTitle}
          </ThemedText>

          <VerticalSpacing size={0.5} />

          <ThemedText type="extraSmall" color="supporting">
            {distance}
          </ThemedText>
        </View>

        <EditWorkoutIcon workout={workout} />
      </Flex>

      <VerticalSpacing size={4} />

      <Flex direction="row" gap={4} justify="space-between" align="center">
        <Flex direction="row" gap={2} align="center">
          <Ionicons name="timer-outline" size={14} color={colors[theme].icon} />

          <ThemedText type="extraSmall">{duration}</ThemedText>
        </Flex>

        <Flex direction="row" gap={2} align="center">
          <FontAwesome6 name="dumbbell" size={14} color={colors[theme].icon} />

          <ThemedText type="extraSmall">
            {totalWeight} {weightUnit}
          </ThemedText>
        </Flex>

        <Flex direction="row" gap={2} align="center">
          <Ionicons
            name="trophy-outline"
            size={14}
            color={colors[theme].icon}
          />

          <ThemedText type="extraSmall">
            {workoutPRs ?? 0} PR{workoutPRs === 1 ? "" : "s"}
          </ThemedText>
        </Flex>
      </Flex>

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
    padding: spacing[4],
    borderRadius: 8,
    marginHorizontal: spacing[4],
  },
});
