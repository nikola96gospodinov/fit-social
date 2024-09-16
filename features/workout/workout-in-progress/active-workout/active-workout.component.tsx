import { OrSeparator } from "@/components/or-separator/or-separator.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { ThemedButton } from "@/components/ui/themed-button/themed-button.component";
import { ThemedText } from "@/components/ui/themed-text/themed-text.component";
import { spacing } from "@/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { useRouter } from "expo-router";
import { View, FlatList, StyleSheet } from "react-native";

export const ActiveWorkout = () => {
  const { exercises } = useActiveWorkoutStore();

  const router = useRouter();

  return (
    <View style={{ padding: spacing[4], flex: 1, paddingBottom: 0 }}>
      <FlatList
        data={exercises}
        renderItem={({ item: exercise }) => (
          <ThemedText>{exercise.name}</ThemedText>
        )}
        ListFooterComponent={() => (
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
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ctaContainer: {
    marginTop: spacing[4],
    justifyContent: "center",
    alignItems: "center",
  },
});
