import { OrSeparator } from "@/src/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/src/components/ui/themed-button/themed-button.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/src/store/active-workout-store";
import { router } from "expo-router";
import { View, StyleSheet, useColorScheme } from "react-native";
import { createCancelWorkoutAlert } from "./create-cancel-workout-modal";

export const ActiveExercisesFooter = () => {
  const theme = useColorScheme() ?? "light";

  const { resetWorkout } = useActiveWorkoutStore();

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

      <ThemedButton
        text="Cancel workout"
        variant="error"
        size="sm"
        onPress={() =>
          createCancelWorkoutAlert({
            cancelWorkout: resetWorkout,
            colorScheme: theme,
          })
        }
        isFullWidth
      />

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
