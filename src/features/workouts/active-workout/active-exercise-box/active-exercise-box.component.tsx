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
import {
  ActiveExercise,
  useActiveWorkoutStore,
} from "@/src/store/active-workout-store";
import { Sets } from "./sets/sets.component";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { useActionStore, WORKOUT_ACTION } from "@/src/store/action-store";

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

  const { action } = useActionStore();

  const tab = action === WORKOUT_ACTION.EDIT ? "profile" : "workout";

  const handleAddSet = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    addSet(exercise.id);
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
              : "transparent",
          },
          styles.container,
        ]}>
        <Pressable
          onPressIn={drag}
          style={[
            styles.dragIndicator,
            {
              backgroundColor: colors[theme].sectionBackground,
            },
          ]}>
          <Entypo
            name="select-arrows"
            size={18}
            color={colors[theme].textIcon}
          />
        </Pressable>

        <Pressable
          onPress={() =>
            router.push(`/${tab}/exercise/${exercise.exercise_id}`)
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

        <VerticalSpacing size={4} />

        <View style={{ marginHorizontal: spacing[2] }}>
          <ThemedButton
            text="Add a set"
            variant="flat"
            onPress={handleAddSet}
            isFullWidth
            style={{
              backgroundColor: colors[theme].cardBackground,
            }}
          />
        </View>
      </Pressable>

      <VerticalSpacing size={6} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[4],
  },

  exerciseNameContainer: {
    marginLeft: -1,
    marginTop: -1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[1] + spacing[0.5],
    borderBottomRightRadius: spacing[4],
    borderTopRightRadius: spacing[4],
    alignSelf: "flex-start",
  },

  dragIndicator: {
    position: "absolute",
    top: spacing[4],
    right: 0,
    padding: spacing[2],
    marginRight: spacing[2],
    borderRadius: spacing[4],
  },
});
