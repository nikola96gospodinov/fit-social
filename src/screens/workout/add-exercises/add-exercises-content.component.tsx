import { VerticalSpacing } from "@/src/components/ui/layout/vertical-spacing/vertical-spacing.component";
import { spacing } from "@/src/constants/spacing.constants";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useExerciseFilterStore } from "@/src/store/exercise-filter-store";
import { Exercise } from "@/src/types/api/exercise.types";
import { useState } from "react";
import { View } from "react-native";
import { AddIcon } from "./add-icon/add-icon.component";
import { FoundExercises } from "./found-exercises/found-exercises.component";
import { SearchAndFilter } from "./search-and-filter/search-and-filter.component";

export const AddExercisesContent = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const { activeSearch } = useExerciseFilterStore();

  const debouncedActiveSearch = useDebounce<string>({ value: activeSearch });

  return (
    <View style={{ padding: spacing[4], flex: 1, paddingBottom: 0 }}>
      <SearchAndFilter />

      <VerticalSpacing size={8} />

      <FoundExercises
        search={debouncedActiveSearch}
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
      />

      {selectedExercises.length > 0 && (
        <AddIcon selectedExercises={selectedExercises} />
      )}
    </View>
  );
};
