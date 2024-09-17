import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { colors } from "@/constants/colors.constants";
import { spacing } from "@/constants/spacing.constants";
import { ActiveExercise } from "@/types/workout.types";
import { capitalize } from "lodash";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { DiscardExercise } from "./discard-exercise/discard-excercise.component";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { Sets } from "./sets/sets.component";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

type Props = {
  exercise: ActiveExercise;
  drag: () => void;
  isActive: boolean;
};

export const ActiveExerciseBox = ({ exercise, drag, isActive }: Props) => {
  const theme = useColorScheme() ?? "light";

  const { addSet } = useActiveWorkoutStore();

  return (
    <>
      <Pressable
        onLongPress={drag}
        disabled={isActive}
        style={[
          {
            backgroundColor: isActive
              ? colors[theme].tintText
              : colors[theme].fillTextColor,
            borderColor: isActive
              ? colors[theme].borderFocused
              : colors[theme].border,
          },
          styles.container,
        ]}>
        <Pressable onPressIn={drag} style={styles.dragIndicator}>
          <MaterialIcons
            name="drag-indicator"
            size={20}
            color={colors[theme].text}
          />
        </Pressable>

        <Pressable
          onPress={() => router.push(`/workout/exercise/${exercise.id}`)}
          style={[
            {
              backgroundColor: colors[theme].borderFocused,
            },
            styles.exerciseNameContainer,
          ]}>
          <ThemedText
            color={theme === "light" ? "defaultInverted" : "default"}
            style={{ fontWeight: "bold" }}>
            {capitalize(exercise.name)}
          </ThemedText>
        </Pressable>

        <VerticalSpacing size={4} />

        <Sets exercise={exercise} />

        <VerticalSpacing size={4} />

        <ThemedButton
          text="Add a set"
          variant="flat"
          isCentered
          onPress={() => addSet(exercise.id)}
        />

        <DiscardExercise id={exercise.id} />
      </Pressable>

      <VerticalSpacing size={4} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[3],
    paddingTop: 0,
    borderRadius: spacing[3],
    borderWidth: 1,
  },

  exerciseNameContainer: {
    marginLeft: -(spacing[3] + 1),
    marginTop: -1,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderTopLeftRadius: spacing[3],
    borderBottomRightRadius: spacing[3],
    alignSelf: "flex-start",
  },

  dragIndicator: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: spacing[2],
  },
});
