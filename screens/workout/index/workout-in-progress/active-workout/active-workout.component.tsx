import { spacing } from "@/constants/spacing.constants";
import { useActiveWorkoutStore } from "@/store/active-workout-store";
import { View, FlatList, StyleSheet } from "react-native";
import { ActiveExercisesFooter } from "./active-exercises-footer/active-exercises-footer.component";
import { ActiveExerciseBox } from "./active-exercise-box/active-exercise-box.component";
import { VerticalSpacing } from "@/components/ui/layout/vertical-spacing/vertical-spacing.component";

export const ActiveWorkout = () => {
  const { exercises } = useActiveWorkoutStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item: exercise }) => (
          <ActiveExerciseBox exercise={exercise} />
        )}
        ListFooterComponent={() => <ActiveExercisesFooter />}
        ItemSeparatorComponent={() => <VerticalSpacing size={4} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    paddingBottom: 0,
  },
});
