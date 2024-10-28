import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, useColorScheme } from "react-native";
import { formatDistance, intervalToDuration } from "date-fns";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useGetWorkoutExercises } from "@/src/services/workout/get-workout-exercises.service";
import { ExerciseRow } from "./exercise-row/exercise-row.component";

type Props = {
  workout: Tables<"workouts">;
};

export const PastWorkoutBox = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";

  const duration = intervalToDuration({
    start: new Date(workout.started),
    end: new Date(workout.ended ?? workout.started),
  });

  const { data: exercises } = useGetWorkoutExercises(workout.id);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[theme].cardBackground },
      ]}>
      <Flex justify="space-between" direction="row" gap={2} align="center">
        <View>
          <ThemedText style={{ fontWeight: "500" }}>Chest workout</ThemedText>

          <VerticalSpacing size={0.5} />

          <ThemedText type="extraSmall" color="supporting">
            {formatDistance(
              new Date(workout.ended ?? workout.started),
              new Date(),
            )}{" "}
            ago
          </ThemedText>
        </View>

        <FontAwesome name="pencil" size={16} color={colors[theme].icon} />
      </Flex>

      <VerticalSpacing size={4} />

      <Flex direction="row" gap={4} justify="space-between" align="center">
        <Flex direction="row" gap={2} align="center">
          <Ionicons name="timer-outline" size={14} color={colors[theme].icon} />

          <ThemedText type="extraSmall">{duration.minutes}m</ThemedText>
        </Flex>

        <Flex direction="row" gap={2} align="center">
          <FontAwesome6 name="dumbbell" size={14} color={colors[theme].icon} />

          <ThemedText type="extraSmall">10,050 kg</ThemedText>
        </Flex>

        <Flex direction="row" gap={2} align="center">
          <Ionicons
            name="trophy-outline"
            size={14}
            color={colors[theme].icon}
          />

          <ThemedText type="extraSmall">2 PRs</ThemedText>
        </Flex>
      </Flex>

      <VerticalSpacing size={6} />

      {exercises?.map((exercise, index) => {
        return (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            index={index}
            exercisesLength={exercises.length}
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
  },
});
