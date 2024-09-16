import { OrSeparator } from "@/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { spacing } from "@/constants/spacing.constants";
import { router } from "expo-router";
import { View, StyleSheet } from "react-native";

export const ActiveExercisesFooter = () => {
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

      <ThemedButton text="Cancel workout" variant="error" size="sm" />
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
