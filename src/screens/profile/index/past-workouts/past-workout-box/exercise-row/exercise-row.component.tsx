import { Divider } from "@/src/components/ui/layout/divider/divider.component";
import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { useGetExerciseSets } from "@/src/services/workout/get-exercise-sets.service";
import { Tables } from "@/src/types/database.types";
import { FontAwesome } from "@expo/vector-icons";
import { capitalize } from "lodash";
import { useColorScheme, View } from "react-native";

type Props = {
  exercise: Tables<"workout_exercises">;
  index: number;
  exercisesLength: number;
};

export const ExerciseRow = ({ exercise, index, exercisesLength }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { data: sets } = useGetExerciseSets(exercise.id);

  return (
    <View>
      <Flex justify="space-between" align="flex-end" direction="row" gap={4}>
        <View style={{ flex: 1 }}>
          <ThemedText type="extraSmall" key={exercise.id}>
            {capitalize(exercise.name)}
          </ThemedText>

          <ThemedText type="extraSmall" color="supporting">
            {sets?.length} sets
          </ThemedText>
        </View>

        <Flex direction="row" gap={2} align="center" style={{ flexShrink: 1 }}>
          <FontAwesome name="star-o" size={14} color={colors[theme].icon} />

          <ThemedText type="extraSmall">
            {(() => {
              const bestSet = sets?.reduce(
                (prev, current) =>
                  (current.weight ?? 0) > (prev.weight ?? 0) ? current : prev,
                { weight: 0, reps: 0 } as Tables<"exercise_sets">,
              );
              return `${bestSet?.weight ?? 0} kg x ${bestSet?.reps ?? 0} reps`;
            })()}{" "}
          </ThemedText>
        </Flex>
      </Flex>

      {index !== exercisesLength - 1 && (
        <>
          <VerticalSpacing size={3} />

          <Divider />

          <VerticalSpacing size={3} />
        </>
      )}
    </View>
  );
};
