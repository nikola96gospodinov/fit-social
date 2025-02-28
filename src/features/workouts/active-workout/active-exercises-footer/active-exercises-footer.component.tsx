import { OrSeparator } from "@/src/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { spacing } from "@/src/constants/spacing.constants";
import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { CancelWorkoutButton } from "./cancel-workout-button/cancel-workout-button.component";
import { DeleteWorkoutButton } from "./delete-workout-button/delete-workout-button.component";
import { useActionStore, WORKOUT_ACTION } from "@/src/store/action-store";

export const ActiveExercisesFooter = () => {
  const { action } = useActionStore();

  const isEdit = action === WORKOUT_ACTION.EDIT;

  const tab = isEdit ? "profile" : "workout";

  return (
    <View style={styles.ctaContainer}>
      <ThemedButton
        text="Add exercise(s)"
        onPress={() => router.push(`/${tab}/add-exercise`)}
        size="sm"
        isFullWidth
      />

      <VerticalSpacing size={3} />

      <OrSeparator textType="small" />

      <VerticalSpacing size={3} />

      {isEdit ? <DeleteWorkoutButton /> : <CancelWorkoutButton />}

      <VerticalSpacing size={8} />
    </View>
  );
};

const styles = StyleSheet.create({
  ctaContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing[4],
  },
});
