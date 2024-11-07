import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { capitalize } from "lodash";
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { DiscardExercise } from "./discard-exercise/discard-excercise.component";
import {
  ActiveExercise,
  useActiveWorkoutStore,
} from "@/src/store/active-workout-store";
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

  const {
    store: { addSet },
  } = useActiveWorkoutStore();

  const handleAddSet = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    addSet(exercise.exercise_id);
  };

  return (
    <>
      <Pressable
        onLongPress={drag}
        disabled={isActive}
        style={[
          {
            backgroundColor: isActive
              ? colors[theme].tintActiveBackground
              : colors[theme].cardBackground,
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
            color={colors[theme].textIcon}
          />
        </Pressable>

        <Pressable
          onPress={() =>
            router.push(`/workout/exercise/${exercise.exercise_id}`)
          }
          style={[
            {
              backgroundColor: colors[theme].tintBackground,
            },
            styles.exerciseNameContainer,
          ]}>
          <ThemedText
            color={theme === "light" ? "inverted" : "default"}
            style={{ fontWeight: "bold" }}>
            {capitalize(exercise.name)}
          </ThemedText>
        </Pressable>

        <VerticalSpacing size={6} />

        <Sets exercise={exercise} isBoxActive={isActive} />

        <VerticalSpacing size={6} />

        <View style={{ alignSelf: "center" }}>
          <ThemedButton
            text="Add a set"
            variant="flat"
            onPress={handleAddSet}
          />
        </View>

        <DiscardExercise id={exercise.exercise_id} />
      </Pressable>

      <VerticalSpacing size={4} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    borderRadius: spacing[3],
    borderWidth: 1,
    paddingBottom: spacing[3],
  },

  exerciseNameContainer: {
    marginLeft: -1,
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
