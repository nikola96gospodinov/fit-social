import { colors } from "@/src/constants/colors.constants";
import { spacing } from "@/src/constants/spacing.constants";
import { useActionStore, WORKOUT_ACTION } from "@/src/store/action-store";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { Exercise } from "@/src/types/api/exercise.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { Pressable, useColorScheme, StyleSheet } from "react-native";

type Props = {
  selectedExercises: Exercise[];
};

export const AddIcon = ({ selectedExercises }: Props) => {
  const theme = useColorScheme() ?? "light";

  const {
    store: { addExercises, id },
  } = useActiveWorkoutStore();

  const { action } = useActionStore();

  const tab =
    action === WORKOUT_ACTION.EDIT
      ? (`/profile/edit-workout/${id}` as Href<string>)
      : "/workout";
  const onPress = () => {
    addExercises(selectedExercises);
    router.push(tab);
  };

  return (
    <Pressable
      style={[
        {
          backgroundColor: colors[theme].tintBackground,
        },
        styles.container,
      ]}
      onPress={onPress}>
      <MaterialCommunityIcons
        name="plus"
        size={32}
        color={colors[theme].tintBackgroundText}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: spacing[4],
    right: spacing[4],
    padding: spacing[1],
    borderRadius: 100,
  },
});
