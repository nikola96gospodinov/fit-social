import { ThemedText } from "@/src/components/ui/themed-text/themed-text.component";
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
        size={20}
        color={colors[theme].textIcon}
      />

      <ThemedText>Add</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: spacing[5],
    right: spacing[4],
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    gap: spacing[0.5],
  },
});
