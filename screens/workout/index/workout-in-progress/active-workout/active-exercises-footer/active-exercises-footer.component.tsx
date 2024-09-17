import { OrSeparator } from "@/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { spacing } from "@/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { router } from "expo-router";
import { View, StyleSheet, useColorScheme } from "react-native";
import { createCancelWorkoutAlert } from "./create-cancel-workout-modal";

export const ActiveExercisesFooter = () => {
  const theme = useColorScheme() ?? "light";

  const { finishWorkout } = useActiveWorkoutStore();

  return (
    <View style={styles.ctaContainer}>
      <ThemedButton
        text="Add exercise(s)"
        onPress={() => router.push("/workout/add-exercise")}
        size="sm"
      />

      <VerticalSpacing size={2} />

      <OrSeparator textType="small" />

      <VerticalSpacing size={2} />

      <ThemedButton
        text="Cancel workout"
        variant="error"
        size="sm"
        onPress={() =>
          createCancelWorkoutAlert({
            cancelWorkout: finishWorkout,
            colorScheme: theme,
          })
        }
      />
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
