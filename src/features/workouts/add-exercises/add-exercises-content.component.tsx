import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { spacing } from "@/src/constants/spacing.constants";
import { Exercise } from "@/src/types/api/exercise.types";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { AddIcon } from "./add-icon/add-icon.component";
import { FoundExercises } from "./found-exercises/found-exercises.component";
import { SearchAndFilter } from "./search-and-filter/search-and-filter.component";

export const AddExercisesContent = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  return (
    <View style={styles.container}>
      <SearchAndFilter />

      <VerticalSpacing size={8} />

      <FoundExercises
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />

      {selectedExercises.length > 0 && (
        <AddIcon selectedExercises={selectedExercises} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    flex: 1,
    paddingBottom: 0,
  },
});
