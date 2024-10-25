import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, useColorScheme } from "react-native";
import { formatDistance, intervalToDuration } from "date-fns";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ActiveExercise, ExerciseSet } from "@/src/types/workout.types";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { capitalize } from "lodash";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Divider } from "@/src/components/ui/layout/divider/divider.component";

type Props = {
  workout: Tables<"workouts">;
};

export const PastWorkoutBox = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";
  const exercises = workout.exercises as ActiveExercise[];

  const duration = intervalToDuration({
    start: new Date(workout.started),
    end: new Date(workout.ended ?? workout.started),
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[theme].cardBackground },
      ]}>
      <Flex justify="space-between" direction="row" gap={2} align="center">
        <View>
          <ThemedText style={{ fontWeight: "500", fontSize: 18 }}>
            Chest workout
          </ThemedText>

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

      <VerticalSpacing size={6} />

      <Flex direction="row" gap={4} justify="space-between" align="center">
        <Flex direction="row" gap={2} align="center">
          <Ionicons name="timer-outline" size={16} color={colors[theme].icon} />

          <ThemedText type="extraSmall">{duration.minutes}m</ThemedText>
        </Flex>

        <Flex direction="row" gap={2} align="center">
          <FontAwesome6 name="dumbbell" size={14} color={colors[theme].icon} />

          <ThemedText type="extraSmall">10,050 kg</ThemedText>
        </Flex>

        <Flex direction="row" gap={2} align="center">
          <Ionicons
            name="trophy-outline"
            size={16}
            color={colors[theme].icon}
          />

          <ThemedText type="extraSmall">2 PRs</ThemedText>
        </Flex>
      </Flex>

      <VerticalSpacing size={6} />

      {exercises?.map((exercise, index) => {
        return (
          <View key={exercise.id}>
            <Flex
              justify="space-between"
              align="flex-end"
              direction="row"
              gap={4}>
              <View style={{ flex: 1 }}>
                <ThemedText type="small" key={exercise.id}>
                  {capitalize(exercise.name)}
                </ThemedText>

                <ThemedText type="extraSmall" color="supporting">
                  {exercise.sets?.length} sets
                </ThemedText>
              </View>

              <Flex
                direction="row"
                gap={2}
                align="center"
                style={{ flexShrink: 1 }}>
                <FontAwesome
                  name="star-o"
                  size={14}
                  color={colors[theme].icon}
                />

                <ThemedText type="extraSmall">
                  {(() => {
                    const bestSet = exercise.sets?.reduce(
                      (prev, current) =>
                        (current.weight ?? 0) > (prev.weight ?? 0)
                          ? current
                          : prev,
                      { weight: 0, reps: 0 } as ExerciseSet,
                    );
                    return `${bestSet?.weight ?? 0} kg x ${bestSet?.reps ?? 0} reps`;
                  })()}{" "}
                </ThemedText>
              </Flex>
            </Flex>

            {index !== exercises.length - 1 && (
              <>
                <VerticalSpacing size={3} />

                <Divider />

                <VerticalSpacing size={3} />
              </>
            )}
          </View>
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
