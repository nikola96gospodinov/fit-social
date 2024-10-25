import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { Tables } from "@/src/types/database.types";
import { View, StyleSheet, useColorScheme } from "react-native";
import { formatDistance } from "date-fns";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { ActiveExercise, ExerciseSet } from "@/src/types/workout.types";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { capitalize } from "lodash";

type Props = {
  workout: Tables<"workouts">;
};

export const PastWorkoutBox = ({ workout }: Props) => {
  const theme = useColorScheme() ?? "light";
  const exercises = workout.exercises as ActiveExercise[];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[theme].sectionBackground },
      ]}>
      <Flex justify="space-between" direction="row" gap={2} align="center">
        <ThemedText style={{ fontWeight: "500", fontSize: 18 }}>
          Chest workout
        </ThemedText>

        <ThemedText type="extraSmall" color="supporting">
          {formatDistance(
            new Date(workout.ended ?? workout.started),
            new Date(),
          )}{" "}
          ago
        </ThemedText>
      </Flex>

      <VerticalSpacing size={6} />

      {exercises?.map((exercise) => {
        return (
          <>
            <Flex justify="space-between" direction="row" gap={4}>
              <View style={{ flex: 1 }}>
                <ThemedText type="small" key={exercise.id}>
                  {capitalize(exercise.name)}
                </ThemedText>

                <ThemedText type="extraSmall" color="supporting">
                  {exercise.sets?.length} sets
                </ThemedText>
              </View>

              <View style={{ flexShrink: 1 }}>
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
              </View>
            </Flex>

            <VerticalSpacing size={3} />
          </>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    borderRadius: spacing[4],
  },
});
