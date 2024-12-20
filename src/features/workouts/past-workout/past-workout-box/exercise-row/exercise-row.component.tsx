import { Flex } from "@/src/components/ui/layout/flex/flex.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { getBestSet } from "@/src/features/workouts/utils/get-best-set.utils";
import { METRIC } from "@/src/screens/profile/edit/edit-profile-form/edit-profile-form.schema";
import { useGetProfile } from "@/src/services/profile/get-profile.service";
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
  const { data: profile } = useGetProfile();

  const bestSet = getBestSet(sets);

  const weightUnit = profile?.measurement_system === METRIC ? "kg" : "lbs";

  const text = (() => {
    if (bestSet.weight === 0)
      return `${bestSet.reps} rep${bestSet.reps === 1 ? "" : "s"}`;
    return `${bestSet.weight} ${weightUnit} x ${bestSet.reps} rep${bestSet.reps === 1 ? "" : "s"}`;
  })();

  return (
    <View>
      <Flex justify="space-between" align="flex-end" direction="row" gap={4}>
        <View style={{ flex: 1 }}>
          <ThemedText
            type="extraSmall"
            key={exercise.id}
            numberOfLines={1}
            ellipsizeMode="tail">
            <ThemedText type="extraSmall" color="supporting">
              {sets?.length} x
            </ThemedText>{" "}
            {capitalize(exercise.name)}
          </ThemedText>
        </View>

        <Flex direction="row" gap={2} align="center" style={{ flexShrink: 1 }}>
          <FontAwesome name="star-o" size={14} color={colors[theme].icon} />

          <ThemedText type="extraSmall">{text}</ThemedText>
        </Flex>
      </Flex>

      {index !== exercisesLength - 1 && <VerticalSpacing size={3} />}
    </View>
  );
};
