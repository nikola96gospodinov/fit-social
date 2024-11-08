import { OrSeparator } from "@/src/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { spacing } from "@/src/constants/spacing.constants";
import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { CancelWorkoutButton } from "./cancel-workout-button/cancel-workout-button.component";
import {
  useActiveWorkoutStore,
  WORKOUT_ACTION,
} from "@/src/store/active-workout-store";
import { DeleteWorkoutButton } from "./delete-workout-button/delete-workout-button.component";

export const ActiveExercisesFooter = () => {
  const {
    store: { action },
  } = useActiveWorkoutStore();

  const isEdit = action === WORKOUT_ACTION.EDIT;

  return (
    <View style={styles.ctaContainer}>
      <ThemedButton
        text="Add exercise(s)"
        onPress={() => router.push("/workout/add-exercise")}
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
    marginTop: spacing[8],
    justifyContent: "center",
    alignItems: "center",
  },
});
