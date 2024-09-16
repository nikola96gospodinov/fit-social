import { Flex } from "@/components/ui/layout/flex/flex.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { Exercise } from "@/types/api/exercise.types";
import { FontAwesome6 } from "@expo/vector-icons";
import { capitalize } from "lodash";
import { Pressable, useColorScheme, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { useRouter } from "expo-router";

type Props = {
  exercise: Exercise;
  selectedExercises: Exercise[];
  setSelectedExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

export const ExerciseBox = ({
  exercise,
  selectedExercises,
  setSelectedExercises,
}: Props) => {
  const theme = useColorScheme() ?? "light";

  const router = useRouter();

  const { exercises } = useActiveWorkoutStore();

  const onExercisePress = (exercise: Exercise) => {
    const isSelected = selectedExercises.find(({ id }) => id === exercise.id);

    if (isSelected) {
      setSelectedExercises(
        selectedExercises.filter(({ id }) => id !== exercise.id),
      );
    } else {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const onExerciseLongPress = (exercise: Exercise) => {
    router.push(`/workout/exercise/${exercise.id}`);
  };

  const isSelected = !!selectedExercises.find(({ id }) => id === exercise.id);
  const isDisabled = !!exercises.find(({ id }) => id === exercise.id);

  return (
    <Pressable
      onPress={() => onExercisePress(exercise)}
      onLongPress={() => onExerciseLongPress(exercise)}
      style={[
        {
          backgroundColor: isSelected
            ? colors[theme].background
            : "transparent",
          opacity: isDisabled ? 0.5 : 1,
        },
        styles.container,
      ]}
      disabled={isDisabled}>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        gap={spacing[1]}>
        <Flex direction="row" gap={spacing[1]} style={{ flexShrink: 1 }}>
          {isSelected || isDisabled ? (
            <View
              style={[
                {
                  backgroundColor: colors[theme].fillTextColor,
                },
                styles.checkIconContainer,
              ]}>
              <FontAwesome6 name="check" size={20} color={colors[theme].tint} />
            </View>
          ) : (
            <Image source={{ uri: exercise.gifUrl }} style={styles.image} />
          )}

          <Flex style={{ flexShrink: 1, gap: spacing[0.5] }}>
            <ThemedText>{capitalize(exercise.name)}</ThemedText>
            <ThemedText type="small" color="supporting">
              {exercise.bodyPart}
            </ThemedText>
          </Flex>
        </Flex>

        <Pressable
          style={[
            {
              backgroundColor: isSelected
                ? colors[theme].border
                : colors[theme].background,
            },
            styles.questionIconContainer,
          ]}
          onPress={() => onExerciseLongPress(exercise)}>
          <FontAwesome6 name="question" size={18} color={colors[theme].icon} />
        </Pressable>
      </Flex>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: spacing[3],
  },

  checkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },

  questionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});